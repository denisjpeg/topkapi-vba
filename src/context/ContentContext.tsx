import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { defaultContent, type SiteContent } from '../data/defaultContent';
import { supabase, isSupabaseConfigured, SITE_CONTENT_ROW_ID } from '../config/supabase';

const STORAGE_KEY = 'topkapi_vba_content_v1';

interface ContentContextValue {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  updateContent: (patch: Partial<SiteContent>) => void;
  resetToDefaults: () => void;
  /** true once a saved override (local or remote) has been applied over the defaults */
  isCustomized: boolean;
  /** Supabase bağlıyken: ilk içerik henüz sunucudan çekiliyor mu */
  isSyncing: boolean;
  /** Supabase bağlıyken: son okuma/yazma sunucu isteği başarısız oldu mu */
  syncError: string | null;
  /** true when Supabase is configured, i.e. edits publish globally, not just locally */
  isGlobal: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

function loadStoredContent(): SiteContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Shallow-merge over defaults so newly added fields in code updates
    // don't get wiped out by an older saved snapshot.
    return { ...defaultContent, ...parsed };
  } catch {
    return null;
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() => loadStoredContent() ?? defaultContent);
  const [isCustomized, setIsCustomized] = useState(() => loadStoredContent() !== null);
  const [isSyncing, setIsSyncing] = useState(isSupabaseConfigured);
  const [syncError, setSyncError] = useState<string | null>(null);

  const hasLoadedRemote = useRef(false);
  const skipNextSave = useRef(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // İlk yüklemede Supabase'de kayıtlı en güncel (global) içeriği çek.
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', SITE_CONTENT_ROW_ID)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        setSyncError('Sunucudan içerik alınamadı — bu tarayıcıdaki en son kopya gösteriliyor.');
      } else if (data?.content) {
        skipNextSave.current = true; // az önce sunucudan okuduğumuzu hemen geri yazmayalım
        setContentState({ ...defaultContent, ...(data.content as Partial<SiteContent>) });
        setIsCustomized(true);
      }

      hasLoadedRemote.current = true;
      setIsSyncing(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // localStorage her zaman bir çevrimdışı yedek olarak güncel tutulur.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  // Supabase bağlıysa değişiklikleri sunucuya yaz (yazma bitince, kısa bir
  // gecikmeyle — her tuş vuruşunda değil).
  useEffect(() => {
    if (!supabase || !hasLoadedRemote.current) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: SITE_CONTENT_ROW_ID, content, updated_at: new Date().toISOString() });
      setSyncError(
        error ? 'Değişiklikler sunucuya kaydedilemedi — sadece bu tarayıcıda saklandı.' : null
      );
    }, 700);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [content]);

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      setContent: (next) => {
        setContentState(next);
        setIsCustomized(true);
      },
      updateContent: (patch) => {
        setContentState((prev) => ({ ...prev, ...patch }));
        setIsCustomized(true);
      },
      resetToDefaults: () => {
        localStorage.removeItem(STORAGE_KEY);
        setContentState(defaultContent);
        setIsCustomized(false);
      },
      isCustomized,
      isSyncing,
      syncError,
      isGlobal: isSupabaseConfigured,
    }),
    [content, isCustomized, isSyncing, syncError]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}
