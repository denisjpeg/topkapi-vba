import { useState } from 'react';
import { Plus, Trash2, Download, Upload, RotateCcw, ExternalLink } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import type { EventItem, GalleryItem, PostItem, FormItem, PollItem } from '../../data/defaultContent';
import { AdminField, AdminImageField } from './AdminField';
import { ChevronMark } from '../ui/ChevronMark';

type Tab =
  | 'genel'
  | 'anasayfa'
  | 'hakkimizda'
  | 'etkinlikler'
  | 'yazilar'
  | 'galeri'
  | 'formlar'
  | 'anketler'
  | 'ayarlar';

const tabs: { id: Tab; label: string }[] = [
  { id: 'genel', label: 'Genel' },
  { id: 'anasayfa', label: 'Ana Sayfa' },
  { id: 'hakkimizda', label: 'Hakkımızda' },
  { id: 'etkinlikler', label: 'Etkinlikler' },
  { id: 'yazilar', label: 'Yazılar' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'formlar', label: 'Formlar' },
  { id: 'anketler', label: 'Anketler' },
  { id: 'ayarlar', label: 'Ayarlar' },
];

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

export function AdminPanel() {
  const { content, updateContent, setContent, resetToDefaults, isSyncing, syncError, isGlobal } = useContent();
  const [tab, setTab] = useState<Tab>('genel');
  const [savedFlash, setSavedFlash] = useState(false);

  const flash = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'topkapi-vba-icerik.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        setContent(parsed);
        flash();
      } catch {
        alert('Dosya okunamadı — geçerli bir JSON dosyası seç.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-void">
      <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronMark className="w-4 h-4 text-steel-400" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-steel-400">
              Topkapı VBA — Yönetim Paneli
            </span>
          </div>
          <a
            href="#top"
            className="focus-ring inline-flex items-center gap-1.5 text-sm text-mist-300 hover:text-paper transition-colors"
          >
            Siteyi görüntüle <ExternalLink size={14} />
          </a>
        </div>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-3 -mt-1">
          {isSyncing ? (
            <p className="text-xs font-mono text-mist-500">Sunucudan güncel içerik alınıyor…</p>
          ) : isGlobal ? (
            syncError ? (
              <p className="text-xs font-mono text-red-400">{syncError}</p>
            ) : (
              <p className="text-xs font-mono text-steel-400">
                Bağlı: değişiklikler otomatik olarak sunucuya kaydedilip herkese yayınlanır.
              </p>
            )
          ) : (
            <p className="text-xs font-mono text-mist-500">
              Sunucu bağlantısı yok: değişiklikler yalnızca bu tarayıcıda saklanır (bkz. Ayarlar altındaki not).
            </p>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-wrap gap-1 p-1 rounded-sm border border-line bg-panel/60 mb-8 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`focus-ring px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-steel-500 text-void' : 'text-mist-300 hover:text-paper'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'genel' && (
          <div className="max-w-md space-y-6">
            <AdminImageField
              label="Kulüp Logosu"
              value={content.logo}
              onChange={(v) => updateContent({ logo: v || '/logo.jpg' })}
            />
            <p className="text-xs text-mist-500">
              Navbar, footer ve favicon bu görseli kullanır (favicon değişikliği için siteyi yeniden
              derlemen gerekir, ama navbar/footer anında güncellenir).
            </p>
          </div>
        )}

        {tab === 'anasayfa' && (
          <div className="max-w-xl space-y-6">
            <AdminField
              label="Üst Etiket (Eyebrow)"
              value={content.hero.eyebrow}
              onChange={(v) => updateContent({ hero: { ...content.hero, eyebrow: v } })}
            />
            <AdminField
              label="Başlık"
              value={content.hero.title}
              onChange={(v) => updateContent({ hero: { ...content.hero, title: v } })}
            />
            <AdminField
              label="Alt Başlık"
              multiline
              value={content.hero.subtitle}
              onChange={(v) => updateContent({ hero: { ...content.hero, subtitle: v } })}
            />
            <div>
              <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-2">
                İstatistikler
              </label>
              <div className="space-y-3">
                {content.hero.stats.map((s, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <input
                      value={s.label}
                      onChange={(e) => {
                        const stats = [...content.hero.stats];
                        stats[i] = { ...stats[i], label: e.target.value };
                        updateContent({ hero: { ...content.hero, stats } });
                      }}
                      placeholder="Etiket"
                      className="input-field"
                    />
                    <input
                      value={s.value}
                      onChange={(e) => {
                        const stats = [...content.hero.stats];
                        stats[i] = { ...stats[i], value: e.target.value };
                        updateContent({ hero: { ...content.hero, stats } });
                      }}
                      placeholder="Değer"
                      className="input-field"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'hakkimizda' && (
          <div className="max-w-xl space-y-6">
            <AdminField
              label="Başlık"
              multiline
              value={content.about.title}
              onChange={(v) => updateContent({ about: { ...content.about, title: v } })}
            />
            <AdminField
              label="Açıklama"
              multiline
              value={content.about.description}
              onChange={(v) => updateContent({ about: { ...content.about, description: v } })}
            />
            <AdminField
              label="Misyon"
              multiline
              value={content.about.mission}
              onChange={(v) => updateContent({ about: { ...content.about, mission: v } })}
            />
            <AdminField
              label="Vizyon"
              multiline
              value={content.about.vision}
              onChange={(v) => updateContent({ about: { ...content.about, vision: v } })}
            />

            <div>
              <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-3">
                Öğrenme Alanları
              </label>
              <div className="space-y-4">
                {content.about.tracks.map((track, i) => (
                  <div key={i} className="p-4 rounded-md border border-line bg-panel/60 space-y-3">
                    <input
                      value={track.title}
                      onChange={(e) => {
                        const tracks = [...content.about.tracks];
                        tracks[i] = { ...tracks[i], title: e.target.value };
                        updateContent({ about: { ...content.about, tracks } });
                      }}
                      placeholder="Başlık"
                      className="input-field"
                    />
                    <textarea
                      value={track.detail}
                      onChange={(e) => {
                        const tracks = [...content.about.tracks];
                        tracks[i] = { ...tracks[i], detail: e.target.value };
                        updateContent({ about: { ...content.about, tracks } });
                      }}
                      placeholder="Açıklama"
                      rows={2}
                      className="input-field resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'etkinlikler' && (
          <EventsEditor
            events={content.events}
            onChange={(events) => updateContent({ events })}
          />
        )}

        {tab === 'yazilar' && (
          <PostsEditor posts={content.posts} onChange={(posts) => updateContent({ posts })} />
        )}

        {tab === 'galeri' && (
          <GalleryEditor
            gallery={content.gallery}
            onChange={(gallery) => updateContent({ gallery })}
          />
        )}

        {tab === 'formlar' && (
          <FormsEditor forms={content.forms} onChange={(forms) => updateContent({ forms })} />
        )}

        {tab === 'anketler' && (
          <PollsEditor polls={content.polls} onChange={(polls) => updateContent({ polls })} />
        )}

        {tab === 'ayarlar' && (
          <div className="max-w-xl space-y-8">
            <div className="space-y-6">
              <AdminField
                label="Footer Açıklaması"
                multiline
                value={content.footer.tagline}
                onChange={(v) => updateContent({ footer: { ...content.footer, tagline: v } })}
              />
              <AdminField
                label="Instagram Bağlantısı"
                value={content.footer.instagramUrl}
                onChange={(v) => updateContent({ footer: { ...content.footer, instagramUrl: v } })}
              />
              <AdminField
                label="TikTok Bağlantısı"
                value={content.footer.tiktokUrl}
                onChange={(v) => updateContent({ footer: { ...content.footer, tiktokUrl: v } })}
              />
              <AdminField
                label="İletişim E-postası"
                value={content.contact.email}
                onChange={(v) => updateContent({ contact: { ...content.contact, email: v } })}
              />
              <div>
                <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-2">
                  İlgi Alanları (üyelik formu — virgülle ayır)
                </label>
                <input
                  value={content.interestAreas.join(', ')}
                  onChange={(e) =>
                    updateContent({
                      interestAreas: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="input-field"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-line space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wide text-mist-500">Yedekleme</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={exportJson}
                  className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors"
                >
                  <Download size={15} /> JSON dışa aktar
                </button>
                <label className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors cursor-pointer">
                  <Upload size={15} /> JSON içe aktar
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={(e) => importJson(e.target.files?.[0])}
                  />
                </label>
                <button
                  onClick={() => {
                    if (confirm('Tüm değişiklikler silinip varsayılan içeriğe dönülecek. Emin misin?')) {
                      resetToDefaults();
                    }
                  }}
                  className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-line text-sm text-red-400 hover:border-red-400/50 transition-colors"
                >
                  <RotateCcw size={15} /> Varsayılana sıfırla
                </button>
              </div>
              <p className="text-xs text-mist-500 leading-relaxed max-w-md">
                {isGlobal
                  ? 'Sunucu bağlı olduğu için değişiklikler otomatik olarak herkese yayınlanır. "JSON dışa aktar" yine de düzenli yedek almak için önerilir.'
                  : 'Değişiklikler yalnızca bu tarayıcıda saklanır. Başka bir cihazdan veya gizli sekmeden bakıldığında görünmez. Herkese açık, kalıcı yayın için Supabase bağlantısını kur (README → "Supabase ile global yayın"). O zamana kadar değişiklikleri kalıcı hale getirmek veya başka bir cihaza taşımak için "JSON dışa aktar" ile yedek al.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {savedFlash && (
        <div className="fixed bottom-6 right-6 px-4 py-2.5 rounded-sm bg-steel-500 text-void text-sm font-medium shadow-xl">
          İçerik güncellendi
        </div>
      )}
    </div>
  );
}

function EventsEditor({
  events,
  onChange,
}: {
  events: EventItem[];
  onChange: (events: EventItem[]) => void;
}) {
  const update = (i: number, patch: Partial<EventItem>) => {
    const next = [...events];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(events.filter((_, idx) => idx !== i));

  const add = () =>
    onChange([
      ...events,
      {
        id: newId('evt'),
        title: 'Yeni Etkinlik',
        date: '',
        time: '',
        location: '',
        speaker: '',
        tags: [],
        status: 'upcoming',
        description: '',
      },
    ]);

  return (
    <div className="max-w-2xl space-y-4">
      {events.map((ev, i) => (
        <div key={ev.id} className="p-5 rounded-md border border-line bg-panel/60 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <input
              value={ev.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Etkinlik başlığı"
              className="input-field flex-1 font-semibold"
            />
            <button
              onClick={() => remove(i)}
              className="focus-ring p-2.5 rounded-sm border border-line text-red-400 hover:border-red-400/50 shrink-0"
              aria-label="Etkinliği sil"
            >
              <Trash2 size={15} />
            </button>
          </div>
          <textarea
            value={ev.description}
            onChange={(e) => update(i, { description: e.target.value })}
            placeholder="Açıklama"
            rows={2}
            className="input-field resize-y"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <input value={ev.date} onChange={(e) => update(i, { date: e.target.value })} placeholder="Tarih" className="input-field" />
            <input value={ev.time} onChange={(e) => update(i, { time: e.target.value })} placeholder="Saat" className="input-field" />
            <input value={ev.location} onChange={(e) => update(i, { location: e.target.value })} placeholder="Konum" className="input-field" />
            <input value={ev.speaker} onChange={(e) => update(i, { speaker: e.target.value })} placeholder="Konuşmacı" className="input-field" />
          </div>
          <div className="flex items-center gap-3">
            <input
              value={ev.tags.join(', ')}
              onChange={(e) => update(i, { tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              placeholder="Etiketler (virgülle ayır)"
              className="input-field flex-1"
            />
            <select
              value={ev.status}
              onChange={(e) => update(i, { status: e.target.value as EventItem['status'] })}
              className="input-field w-auto"
            >
              <option value="upcoming">Yaklaşan</option>
              <option value="past">Geçmiş</option>
            </select>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-dashed border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors"
      >
        <Plus size={15} /> Etkinlik ekle
      </button>
    </div>
  );
}

function PostsEditor({
  posts,
  onChange,
}: {
  posts: PostItem[];
  onChange: (posts: PostItem[]) => void;
}) {
  const update = (i: number, patch: Partial<PostItem>) => {
    const next = [...posts];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(posts.filter((_, idx) => idx !== i));

  const add = () =>
    onChange([
      {
        id: newId('post'),
        title: 'Yeni Yazı',
        excerpt: '',
        content: '',
        image: '',
        date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }),
        author: '',
        tags: [],
      },
      ...posts,
    ]);

  return (
    <div className="max-w-2xl space-y-4">
      <button
        onClick={add}
        className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-dashed border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors"
      >
        <Plus size={15} /> Yeni yazı ekle
      </button>
      {posts.map((post, i) => (
        <div key={post.id} className="p-5 rounded-md border border-line bg-panel/60 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <input
              value={post.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Yazı başlığı"
              className="input-field flex-1 font-semibold"
            />
            <button
              onClick={() => remove(i)}
              className="focus-ring p-2.5 rounded-sm border border-line text-red-400 hover:border-red-400/50 shrink-0"
              aria-label="Yazıyı sil"
            >
              <Trash2 size={15} />
            </button>
          </div>
          <AdminImageField label="Görsel" value={post.image} onChange={(v) => update(i, { image: v })} />
          <textarea
            value={post.excerpt}
            onChange={(e) => update(i, { excerpt: e.target.value })}
            placeholder="Kısa özet (kart görünümünde gösterilir)"
            rows={2}
            className="input-field resize-y"
          />
          <textarea
            value={post.content}
            onChange={(e) => update(i, { content: e.target.value })}
            placeholder="Yazının tam içeriği"
            rows={5}
            className="input-field resize-y"
          />
          <div className="grid grid-cols-2 gap-3">
            <input value={post.date} onChange={(e) => update(i, { date: e.target.value })} placeholder="Tarih" className="input-field" />
            <input value={post.author} onChange={(e) => update(i, { author: e.target.value })} placeholder="Yazar (opsiyonel)" className="input-field" />
          </div>
          <input
            value={post.tags.join(', ')}
            onChange={(e) => update(i, { tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            placeholder="Etiketler (virgülle ayır)"
            className="input-field"
          />
        </div>
      ))}
    </div>
  );
}

function FormsEditor({
  forms,
  onChange,
}: {
  forms: FormItem[];
  onChange: (forms: FormItem[]) => void;
}) {
  const update = (i: number, patch: Partial<FormItem>) => {
    const next = [...forms];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(forms.filter((_, idx) => idx !== i));

  const add = () =>
    onChange([...forms, { id: newId('form'), title: 'Yeni Form', description: '', url: '' }]);

  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-xs text-mist-500 max-w-md">
        Buraya eklenen formlar <code className="text-steel-400">/#formlar</code> sayfasında listelenir. Bağlantı
        alanına Google Forms veya başka bir form servisinin linkini yapıştır.
      </p>
      {forms.map((f, i) => (
        <div key={f.id} className="p-5 rounded-md border border-line bg-panel/60 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <input
              value={f.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Form başlığı"
              className="input-field flex-1 font-semibold"
            />
            <button
              onClick={() => remove(i)}
              className="focus-ring p-2.5 rounded-sm border border-line text-red-400 hover:border-red-400/50 shrink-0"
              aria-label="Formu sil"
            >
              <Trash2 size={15} />
            </button>
          </div>
          <textarea
            value={f.description}
            onChange={(e) => update(i, { description: e.target.value })}
            placeholder="Açıklama"
            rows={2}
            className="input-field resize-y"
          />
          <input
            value={f.url}
            onChange={(e) => update(i, { url: e.target.value })}
            placeholder="Form bağlantısı (https://...)"
            className="input-field"
          />
        </div>
      ))}
      <button
        onClick={add}
        className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-dashed border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors"
      >
        <Plus size={15} /> Form ekle
      </button>
    </div>
  );
}

function PollsEditor({
  polls,
  onChange,
}: {
  polls: PollItem[];
  onChange: (polls: PollItem[]) => void;
}) {
  const update = (i: number, patch: Partial<PollItem>) => {
    const next = [...polls];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(polls.filter((_, idx) => idx !== i));

  const add = () =>
    onChange([
      ...polls,
      {
        id: newId('poll'),
        question: 'Yeni anket sorusu',
        description: '',
        options: [
          { id: newId('opt'), label: 'Seçenek 1' },
          { id: newId('opt'), label: 'Seçenek 2' },
        ],
      },
    ]);

  const updateOption = (pollIdx: number, optIdx: number, label: string) => {
    const poll = polls[pollIdx];
    const options = [...poll.options];
    options[optIdx] = { ...options[optIdx], label };
    update(pollIdx, { options });
  };

  const addOption = (pollIdx: number) => {
    const poll = polls[pollIdx];
    update(pollIdx, { options: [...poll.options, { id: newId('opt'), label: 'Yeni seçenek' }] });
  };

  const removeOption = (pollIdx: number, optIdx: number) => {
    const poll = polls[pollIdx];
    update(pollIdx, { options: poll.options.filter((_, idx) => idx !== optIdx) });
  };

  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-xs text-mist-500 max-w-md">
        Anketler <code className="text-steel-400">/#formlar</code> sayfasında oylanabilir kartlar olarak
        gösterilir. Toplu sonuçları görmek için{' '}
        <code className="text-steel-400">src/config/site.ts</code> içindeki{' '}
        <code className="text-steel-400">FORMSPREE_POLL_ENDPOINT</code>'i ayarlaman gerekir.
      </p>
      {polls.map((poll, i) => (
        <div key={poll.id} className="p-5 rounded-md border border-line bg-panel/60 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <input
              value={poll.question}
              onChange={(e) => update(i, { question: e.target.value })}
              placeholder="Anket sorusu"
              className="input-field flex-1 font-semibold"
            />
            <button
              onClick={() => remove(i)}
              className="focus-ring p-2.5 rounded-sm border border-line text-red-400 hover:border-red-400/50 shrink-0"
              aria-label="Anketi sil"
            >
              <Trash2 size={15} />
            </button>
          </div>
          <textarea
            value={poll.description}
            onChange={(e) => update(i, { description: e.target.value })}
            placeholder="Açıklama (opsiyonel)"
            rows={2}
            className="input-field resize-y"
          />
          <div className="space-y-2">
            {poll.options.map((opt, optIdx) => (
              <div key={opt.id} className="flex items-center gap-2">
                <input
                  value={opt.label}
                  onChange={(e) => updateOption(i, optIdx, e.target.value)}
                  placeholder="Seçenek"
                  className="input-field flex-1"
                />
                <button
                  onClick={() => removeOption(i, optIdx)}
                  disabled={poll.options.length <= 2}
                  className="focus-ring p-2 rounded-sm border border-line text-red-400 hover:border-red-400/50 disabled:opacity-40 shrink-0"
                  aria-label="Seçeneği sil"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addOption(i)}
              className="focus-ring inline-flex items-center gap-1.5 text-xs text-mist-300 hover:text-paper"
            >
              <Plus size={13} /> Seçenek ekle
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="focus-ring inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-dashed border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors"
      >
        <Plus size={15} /> Anket ekle
      </button>
    </div>
  );
}

function GalleryEditor({
  gallery,
  onChange,
}: {
  gallery: GalleryItem[];
  onChange: (gallery: GalleryItem[]) => void;
}) {
  const update = (i: number, patch: Partial<GalleryItem>) => {
    const next = [...gallery];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(gallery.filter((_, idx) => idx !== i));

  const add = () => onChange([...gallery, { id: newId('gal'), caption: 'Yeni fotoğraf', image: '' }]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      {gallery.map((item, i) => (
        <div key={item.id} className="p-4 rounded-md border border-line bg-panel/60 space-y-3">
          <AdminImageField label="Fotoğraf" value={item.image} onChange={(v) => update(i, { image: v })} />
          <input
            value={item.caption}
            onChange={(e) => update(i, { caption: e.target.value })}
            placeholder="Açıklama"
            className="input-field"
          />
          <button
            onClick={() => remove(i)}
            className="focus-ring inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300"
          >
            <Trash2 size={13} /> Kaldır
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="focus-ring flex flex-col items-center justify-center gap-2 p-4 rounded-md border border-dashed border-line text-sm text-mist-300 hover:text-paper hover:border-steel-700/70 transition-colors min-h-[180px]"
      >
        <Plus size={18} /> Fotoğraf ekle
      </button>
    </div>
  );
}
