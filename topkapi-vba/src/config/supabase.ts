import { createClient } from '@supabase/supabase-js';

/**
 * Supabase bağlantısı — admin panelden yapılan değişikliklerin sadece senin
 * tarayıcında değil, HERKESTE görünmesi (global yayın) için kullanılır.
 *
 * Kurulum:
 *   1. https://supabase.com üzerinde ücretsiz bir proje oluştur.
 *   2. Project Settings → API sayfasından "Project URL" ve "anon public" key'i kopyala.
 *   3. Aşağıdaki iki değeri onlarla değiştir.
 *   4. Supabase SQL Editor'de README.md'deki "Supabase ile global yayın" bölümündeki
 *      SQL'i çalıştırarak `site_content` tablosunu oluştur.
 *   5. `npm install` çalıştırıp yeniden derle/yayınla.
 *
 * Bu iki değer doldurulmadığı sürece site eskisi gibi (sadece o an bakan
 * tarayıcıda saklanan, localStorage tabanlı) çalışmaya devam eder — hiçbir şey
 * bozulmaz.
 *
 * GÜVENLİK NOTU: ADMIN_PASSWORD gibi, bu da istemci tarafında (tarayıcıda)
 * çalışan bir bağlantı. anon key derlenmiş JS'in içinde görünür durumda olur.
 * Aşağıdaki SQL, "herkes okuyabilir + herkes yazabilir" şeklinde bir politika
 * kurar (basit tutmak için) — yani teorik olarak anon key'i ve tablo adını
 * bilen biri admin şifresini atlayıp doğrudan Supabase API'sine yazabilir.
 * Bu, mevcut ADMIN_PASSWORD kısıtıyla aynı sınıfta bir risk (caydırıcı, gerçek
 * güvenlik değil). Kulüp sitesi için kabul edilebilir; ileride daha sıkı bir
 * kurulum istersen (Supabase Auth + sadece giriş yapmış admin yazabilsin)
 * bunu ayrıca kurabiliriz.
 */co
export const SUPABASE_URL = 'https://ufmpeguubkhappjzmste.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_DJ9LPLUCJogeDtrFoqPC2Q_O5k-cfxv';

export const isSupabaseConfigured =
  SUPABASE_URL.includes('YOUR_PROJECT') === false && SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY') === false;

export const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/** site_content tablosundaki tek satırın sabit id'si. */
export const SITE_CONTENT_ROW_ID = 'default';