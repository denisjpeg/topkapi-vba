export interface StatItem {
  label: string;
  value: string;
}

export interface TrackItem {
  title: string;
  detail: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  tags: string[];
  status: 'upcoming' | 'past';
  description: string;
}

export interface GalleryItem {
  id: string;
  caption: string;
  /** Data URL (uploaded via admin panel) or a path under /public. Empty = placeholder tile. */
  image: string;
}

export interface PostItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  /** Data URL (uploaded via admin panel) or a path under /public. Empty = no image. */
  image: string;
  date: string;
  author: string;
  tags: string[];
}

export interface FormItem {
  id: string;
  title: string;
  description: string;
  /** External link — Google Forms, Formspree-hosted form, vb. */
  url: string;
}

export interface PollOption {
  id: string;
  label: string;
}

export interface PollItem {
  id: string;
  question: string;
  description: string;
  options: PollOption[];
}

export interface SiteContent {
  logo: string; // path or data URL
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: StatItem[];
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    tracks: TrackItem[];
  };
  events: EventItem[];
  gallery: GalleryItem[];
  posts: PostItem[];
  forms: FormItem[];
  polls: PollItem[];
  interestAreas: string[];
  contact: {
    email: string;
  };
  footer: {
    tagline: string;
    instagramUrl: string;
    tiktokUrl: string;
  };
}

export const defaultContent: SiteContent = {
  logo: '/logo.jpg',
  hero: {
    eyebrow: 'Topkapı Üniversitesi',
    title: 'Veri Bilimi ve Analitiği Kulübü',
    subtitle:
      'Veri dünyasını keşfetmek, yapay zeka ve analitik projeler geliştirmek için bir aradayız.',
    stats: [
      { label: 'Aktif Üye', value: '120+' },
      { label: 'Atölye / Yıl', value: '18' },
      { label: 'Proje', value: '32' },
    ],
  },
  about: {
    title: 'Topkapı Üniversitesi çatısı altında, veriyle üreten bir topluluk.',
    description:
      "Topkapı Veri Bilimi ve Analitiği Kulübü, öğrencileri gerçek veri setleri, açık kaynak araçlar ve birbirinden öğrenme kültürüyle bir araya getirir. Amacımız; teoriyi projeye, merakı yetkinliğe dönüştürmek.",
    mission:
      'Öğrencilere veri okuryazarlığı, analitik düşünme ve uygulamalı yapay zeka becerileri kazandırarak sektöre hazır bireyler yetiştirmek.',
    vision:
      "Topkapı Üniversitesi'nin veri bilimi alanında referans gösterilen, üretken ve iş birliğine açık öğrenci topluluğu olmak.",
    tracks: [
      {
        title: 'Python',
        detail: "Temel sözdiziminden veri işleme kütüphanelerine, Python'ı veri biliminin ortak dili olarak öğreniyoruz.",
      },
      {
        title: 'Yapay Zeka & ML',
        detail: 'Denetimli ve denetimsiz öğrenme algoritmalarını gerçek projelerle, sıfırdan modelleyerek kavrıyoruz.',
      },
      {
        title: 'Veri Görselleştirme',
        detail: 'Sayıları anlamlı hikayelere çeviren, karar destekleyen grafik ve panolar tasarlıyoruz.',
      },
      {
        title: 'Kaggle Yarışmaları',
        detail: 'Takım halinde aktif yarışmalara katılıp uçtan uca bir veri bilimi iş akışını deneyimliyoruz.',
      },
    ],
  },
  events: [
    {
      id: 'evt-01',
      title: 'Python ile Veri Analizine Giriş',
      date: '18 Eyl 2026',
      time: '17:30',
      location: 'B Blok, Amfi 2',
      speaker: 'Kulüp Eğitim Ekibi',
      tags: ['Python', 'Pandas', 'Başlangıç'],
      status: 'upcoming',
      description: 'Pandas ve NumPy temelleriyle gerçek bir veri setini uçtan uca temizleyip analiz ediyoruz.',
    },
    {
      id: 'evt-02',
      title: 'Kaggle Gecesi: Takım Sprintleri',
      date: '2 Eki 2026',
      time: '19:00',
      location: 'Veri Lab, Kat 3',
      speaker: 'Misafir: Kaggle Master',
      tags: ['Kaggle', 'Yarışma', 'Takım Çalışması'],
      status: 'upcoming',
      description: 'Küçük takımlar halinde aktif bir Kaggle yarışmasına saldırıyoruz; mentorluk eşliğinde canlı kod.',
    },
    {
      id: 'evt-03',
      title: 'Makine Öğrenmesine Giriş Atölyesi',
      date: '21 Eki 2026',
      time: '18:00',
      location: 'Online / Zoom',
      speaker: 'Öğr. Gör. Konuk Akademisyen',
      tags: ['Machine Learning', 'Scikit-learn'],
      status: 'upcoming',
      description: 'Denetimli öğrenmenin temel algoritmalarını sıfırdan bir proje üzerinden inşa ediyoruz.',
    },
    {
      id: 'evt-04',
      title: 'Veri Görselleştirme Bootcamp',
      date: '14 May 2026',
      time: '17:00',
      location: 'B Blok, Amfi 1',
      speaker: 'Kulüp Eğitim Ekibi',
      tags: ['Matplotlib', 'Seaborn', 'Bootcamp'],
      status: 'past',
      description: 'Ham verilerden karar destekleyen, okunabilir grafikler üretmenin pratik kurallarını işledik.',
    },
    {
      id: 'evt-05',
      title: '24 Saatlik Kampüs Hackathonu',
      date: '2 Nis 2026',
      time: '10:00',
      location: 'Ana Kampüs, Etkinlik Salonu',
      speaker: 'Sanayi Danışmanları',
      tags: ['Hackathon', 'Takım Çalışması'],
      status: 'past',
      description: 'Sektörden gelen gerçek bir problem üzerinde 24 saat boyunca uçtan uca bir çözüm geliştirdik.',
    },
    {
      id: 'evt-06',
      title: 'SQL ile Veri Sorgulama Atölyesi',
      date: '11 Mar 2026',
      time: '17:30',
      location: 'Bilgisayar Lab 2',
      speaker: 'Kulüp Eğitim Ekibi',
      tags: ['SQL', 'Başlangıç'],
      status: 'past',
      description: 'İlişkisel veritabanlarında sorgu yazmayı gerçek bir sipariş veritabanı üzerinden öğrendik.',
    },
  ],
  gallery: [
    { id: 'g1', caption: 'Kaggle Gecesi — takım sprintleri', image: '' },
    { id: 'g2', caption: 'Bootcamp — veri görselleştirme', image: '' },
    { id: 'g3', caption: 'Hackathon — final sunumları', image: '' },
    { id: 'g4', caption: 'Haftalık buluşma — B Blok', image: '' },
    { id: 'g5', caption: 'Konuk konuşmacı oturumu', image: '' },
    { id: 'g6', caption: 'Yeni üye oryantasyonu', image: '' },
  ],
  posts: [
    {
      id: 'post-01',
      title: 'Yeni Döneme Merhaba: Bu Sene Neler Yapıyoruz?',
      excerpt: 'Bu dönem işleyeceğimiz konu başlıkları, planladığımız atölyeler ve yeni üyeler için ilk adımlar.',
      content:
        'Bu dönem kulüp olarak veri analizi, makine öğrenmesi ve veri görselleştirme başlıklarında düzenli atölyeler yapmayı planlıyoruz. Yeni katılan arkadaşlarımız için başlangıç seviyesinde bir Python serisiyle başlıyoruz; ardından Kaggle yarışmalarına takım halinde katılacağız. Etkinlikler sayfasından güncel takvimi takip edebilir, Katıl formundan aramıza katılabilirsin.',
      image: '',
      date: '1 Eyl 2026',
      author: 'Kulüp Yönetimi',
      tags: ['Duyuru'],
    },
  ],
  forms: [],
  polls: [],
  interestAreas: [
    'Veri Analizi',
    'Yapay Zeka',
    'Machine Learning',
    'Veri Görselleştirme',
    'Kaggle Yarışmaları',
    'Derin Öğrenme',
  ],
  contact: {
    email: 'topkapiveribilimi@gmail.com',
  },
  footer: {
    tagline: "Topkapı Üniversitesi bünyesinde faaliyet gösteren resmi öğrenci kulübüdür.",
    instagramUrl: 'https://www.instagram.com/topkapiveribilimi/',
    tiktokUrl: 'https://www.tiktok.com/@topkapiveribilimi?lang=tr-TR',
  },
};
