# Topkapı VBA — Kulüp Web Sitesi

Topkapı Üniversitesi Veri Bilimi ve Analitiği Kulübü için React (Vite) + TypeScript + Tailwind CSS v4
ile geliştirilmiş, yönetim panelli tek sayfalık tanıtım sitesi.

## Başlarken

```bash
npm install
npm run dev       # geliştirme sunucusu — http://localhost:5173
npm run build     # üretim derlemesi -> dist/
npm run preview   # üretim derlemesini yerelde önizle
```

---

## 1) Metin ve görselleri nasıl değiştiririm?

İki yolu var:

### A) Yönetim panelinden (kolay, kalıcı değil)
Siteye `/#admin` ekleyerek gir (ör. `http://localhost:5173/#admin` veya yayındaki adresin sonuna).
Şifre `src/config/site.ts` içinde `ADMIN_PASSWORD` — varsayılan `topkapi2026`, **ilk iş olarak
değiştir**. Panelden başlık/metinleri, logoyu, etkinlikleri ve galeri fotoğraflarını
düzenleyebilirsin. Aşağıdaki "Yönetim Paneli" bölümünde önemli bir kısıtı anlatıyorum — mutlaka oku.

### B) Kod üzerinden (kalıcı, herkes görür)
Gerçek ve kalıcı içerik kaynağı `src/data/defaultContent.ts` dosyasıdır. Başlıkları, açıklamaları,
etkinlikleri, galeri öğelerini ve sosyal medya bağlantılarını burada değiştirip `npm run build`
çalıştırdığında (veya deploy ettiğinde) her ziyaretçi görür.

Görseller için:
- **Logo**: `public/logo.jpg` dosyasının üzerine yeni dosyayı aynı isimle koy.
- **Galeri fotoğrafları**: dosyaları `public/gallery/` altına koy, `defaultContent.ts` içindeki
  ilgili `gallery` öğesinin `image` alanına yolunu yaz, ör. `image: '/gallery/etkinlik-1.jpg'`.
- **Favicon**: `public/favicon-32.png` ve `public/favicon-256.png` dosyalarını değiştir.

---

## 2) Yazılar, Formlar ve Anketler

- **Yazılar**: Ana sayfada "Yazılar" bölümü olarak görünür. Panelden `Yazılar` sekmesinden ekle/düzenle/sil
  yapabilirsin — başlık, kapak görseli, kısa özet, tam metin, tarih ve etiket girilir. Karta tıklayınca yazının
  tamamı bir pencerede açılır.
- **Formlar**: Üyelik formundan ayrı, `/#formlar` adresinde kendi sayfası var (Navbar'da "Formlar" linki).
  Panelden `Formlar` sekmesinden form ekle — her form bir başlık, açıklama ve dışarıya link (ör. bir Google
  Forms bağlantısı) içerir; ziyaretçi "Formu Doldur" ile o linke gider.
- **Anketler**: Aynı `/#formlar` sayfasında oylanabilir anket kartları olarak görünür. Panelden `Anketler`
  sekmesinden soru ve seçenekleri gir. Ziyaretçi bir seçeneğe tıklayınca oyu tarayıcısına kaydedilir (tekrar
  oy kullanamaz) ve sonuç yüzdesi gösterilir. Bu site backend'siz olduğu için **toplu/gerçek sonuçları görmek
  istiyorsan** `src/config/site.ts` içindeki `FORMSPREE_POLL_ENDPOINT`'i bir Formspree formunun endpoint'iyle
  doldurmalısın (üyelik formuyla aynı yöntem) — her oy o forma da gider, sonuçları Formspree panelinden
  görürsün. Doldurmazsan anket sadece o ziyaretçinin kendi tarayıcısında çalışır, gerçek toplu sonuç oluşmaz.
- **İletişim**: `src/config/site.ts` içindeki `CONTACT_EMAIL` ve panelde `Ayarlar → İletişim E-postası`
  alanı — footer'da ve Formlar sayfasında gösterilir. Varsayılan: `topkapiveribilimi@gmail.com`.

---

## 3) Üyelik formu verileri nereye düşüyor?

**Formspree** ile bağladım (seçtiğin seçenek). Kurulumu tamamlamak için:

1. https://formspree.io adresinden ücretsiz bir hesap aç.
2. Yeni bir form oluştur, sana verdiği endpoint'i kopyala
   (`https://formspree.io/f/xxxxabcd` gibi görünür).
3. `src/config/site.ts` içindeki `FORMSPREE_ENDPOINT` değerini bununla değiştir.
4. Yeniden derleyip yayınla.

Bu ayarı yapana kadar form **sadece tarayıcıda simüle edilir** — başarı bildirimi görünür ama
hiçbir yere gönderilmez (kullanıcıya bunu küçük bir notla belirtiyoruz). Endpoint'i girdikten sonra
her başvuru doğrudan Formspree hesabına bağlı e-postana düşer; Formspree panelinden dışa aktarabilir
veya Zapier/Google Sheets entegrasyonu (ücretli planlarda) ekleyebilirsin.

---

## 5) Supabase ile global yayın (opsiyonel ama önerilen)

Varsayılan olarak panel değişiklikleri sadece senin tarayıcında saklanır (bkz. yukarıdaki kısıt).
**Panelden yapılan değişikliklerin herkese, her cihazda görünmesini istiyorsan** ücretsiz bir
Supabase projesi bağlaman yeterli — sunucu kurmana gerek kalmaz.

1. **Proje oluştur**: https://supabase.com üzerinde ücretsiz bir hesap/proje aç.
2. **Tabloyu oluştur**: Supabase panelinde SQL Editor'ü aç, aşağıdaki SQL'i çalıştır:

   ```sql
   create table if not exists site_content (
     id text primary key,
     content jsonb not null,
     updated_at timestamptz not null default now()
   );

   alter table site_content enable row level security;

   create policy "Public can read site content"
     on site_content for select
     using (true);

   create policy "Public can insert site content"
     on site_content for insert
     with check (true);

   create policy "Public can update site content"
     on site_content for update
     using (true)
     with check (true);
   ```

3. **Bağlantı bilgilerini gir**: Project Settings → API sayfasından "Project URL" ve "anon public"
   key'i kopyala, `src/config/supabase.ts` içindeki `SUPABASE_URL` ve `SUPABASE_ANON_KEY` değerlerine yapıştır.
4. **Paketi yükle**: `npm install` (yeni eklenen `@supabase/supabase-js` paketini indirir).
5. **Derle ve yeniden yayınla**: `npm run build`, ardından her zamanki gibi deploy et.
6. **Test et**: `/#admin`'den bir değişiklik yap; başka bir cihazdan veya gizli sekmeden siteye
   girip değişikliğin göründüğünü doğrula.

Bağlantı kurulduktan sonra panel her değişiklikte otomatik olarak Supabase'e kaydeder (kısa bir
gecikmeyle, her tuş vuruşunda değil) ve site açılışta önce sunucudaki en güncel içeriği çeker.
localStorage hâlâ çevrimdışı yedek olarak kullanılmaya devam eder.

**Güvenlik notu**: Yukarıdaki SQL "herkes okuyabilir + herkes yazabilir" şeklinde basit bir politika
kurar — `ADMIN_PASSWORD` gibi bu da gerçek bir güvenlik katmanı değil, sadece rastgele ziyaretçiyi
caydırır. anon key ve tablo adını bilen biri teorik olarak admin şifresini atlayıp doğrudan
Supabase API'sine yazabilir. Kulüp sitesi için kabul edilebilir bir risk; daha sıkı bir kurulum
(Supabase Auth ile sadece giriş yapmış adminin yazabilmesi) istersen ayrıca kurulabilir.

---

## 6) Yönetim Paneli

`/#admin` adresinden erişilir, `src/config/site.ts` içindeki `ADMIN_PASSWORD` ile korunur.
Sekmeler: Genel (logo), Ana Sayfa, Hakkımızda, Etkinlikler (ekle/düzenle/sil), Yazılar
(ekle/düzenle/sil), Galeri (fotoğraf yükle, açıklama yaz), Formlar (form linki ekle/düzenle/sil),
Anketler (soru/seçenek ekle/düzenle/sil), Ayarlar (footer, sosyal medya, ilgi alanları, iletişim
e-postası, yedekleme).

### ⚠️ Önemli kısıt — mutlaka oku
Bu site **backend'siz, tamamen statik** bir uygulama. Bu iki şey anlamına geliyor:

- **Şifre gerçek bir güvenlik değil.** Tarayıcıda çalıştığı için, derlenmiş JS dosyasına bakan biri
  şifreyi bulabilir. Sadece rastgele ziyaretçileri caydırır, kasıtlı birini durdurmaz. Başka yerde
  kullandığın bir şifreyi buraya koyma.
- **Panelde yaptığın değişiklikler sadece senin tarayıcında saklanır** (`localStorage`). Başka bir
  cihazdan, gizli sekmeden veya başka bir ziyaretçinin tarayıcısından siteye girildiğinde bu
  değişiklikler **görünmez** — herkes hâlâ `defaultContent.ts`'deki (veya en son deploy edilen)
  içeriği görür.

Yani panel şu an için en çok şuna yarar: içeriği görsel olarak deneyip beğendiğinde
**Ayarlar → JSON dışa aktar** ile indirip, o metinleri `src/data/defaultContent.ts` dosyasına elle
kopyalamak. Bu "taslak hazırlama" iş akışı için gayet kullanışlı.

**Gerçek anlamda "panelden değiştir, herkes görsün" istiyorsan** aşağıdaki "Supabase ile global
yayın" bölümünü uygula — birkaç adımda ücretsiz bir veritabanı bağlayıp bu kısıtı kaldırabilirsin.

---

## Yapı

```
public/
  logo.jpg                     # kulüp logosu
  favicon-32.png / favicon-256.png
  gallery/                     # gerçek galeri fotoğraflarını buraya koy (kendin oluştur)
src/
  components/
    Navbar.tsx, Hero.tsx, About.tsx, Events.tsx, Posts.tsx, Gallery.tsx, JoinForm.tsx, Footer.tsx
    FormsPage.tsx               # /#formlar sayfası — formlar + anketler + iletişim
    PollCard.tsx                # tek bir anket kartı (oylama mantığı)
    ui/                        # ChevronMark, SectionHeading, Badge, Toast
    admin/                     # AdminGate (şifre ekranı), AdminPanel, AdminField
  context/ContentContext.tsx   # site içeriğini localStorage ile senkron tutan React context
  data/defaultContent.ts       # GERÇEK İÇERİK KAYNAĞI — kalıcı değişiklikler burada yapılır
  config/site.ts               # ADMIN_PASSWORD ve FORMSPREE_ENDPOINT
  index.css                    # tasarım token'ları (renk / tipografi) + global stiller
```

## Tasarım notları

- **Renk paleti** doğrudan logodan örneklendi: koyu lacivert zemin (`--color-void`, `--color-ridge`),
  metalik çelik-mavi vurgu (`--color-steel-500`) ve buz mavisi parlama tonu (`--color-ice-200`).
- **İmza öğesi**: logodaki "V3A" şeklinin sadeleştirilmiş hali `ChevronMark` bileşeni olarak eyebrow
  etiketlerinde, footer'da ve liste işaretlerinde tekrar eder. Hero ve galeri arka planlarındaki
  dikey "pileli kumaş" dokusu (`.ridge-texture`) logonun arka planından esinlenildi.
- **Tipografi**: başlıklar için Space Grotesk, gövde metni için Inter, tarih/etiket gibi veri
  unsurları için JetBrains Mono.
