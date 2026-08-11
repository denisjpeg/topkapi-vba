import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { Toast } from './ui/Toast';
import { useContent } from '../context/ContentContext';
import { FORMSPREE_ENDPOINT } from '../config/site';

interface FormState {
  fullName: string;
  studentId: string;
  department: string;
  email: string;
  phone: string;
}

const initialState: FormState = {
  fullName: '',
  studentId: '',
  department: '',
  email: '',
  phone: '',
};

export function JoinForm() {
  const { content } = useContent();
  const [form, setForm] = useState<FormState>(initialState);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleInterest = (interest: string) =>
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );

  const isConfigured = FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID') === false;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const payload = { ...form, ilgiAlanlari: interests.join(', ') };

    try {
      if (isConfigured) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Gönderim başarısız');
      } else {
        // Formspree endpoint not configured yet — simulate so the flow is demo-able.
        await new Promise((r) => setTimeout(r, 600));
      }
      setShowToast(true);
      setForm(initialState);
      setInterests([]);
    } catch {
      setErrorMsg('Başvuru gönderilemedi. Lütfen tekrar dene veya bize doğrudan e-posta ile ulaş.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="katil" className="relative py-24 sm:py-32 border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Katıl"
              title="Kulübe üye olmak sadece iki dakika sürer."
              description="Formu doldur, ilgi alanlarını seç; ekibimiz seninle e-posta üzerinden iletişime geçsin."
            />
            <div className="mt-8 hidden lg:block p-6 rounded-md border border-line bg-panel/60">
              <p className="text-sm text-mist-500 leading-relaxed">
                Üyelik ücretsizdir ve Topkapı Üniversitesi'nde kayıtlı tüm bölümlerden öğrencilere açıktır.
                Deneyim seviyesi fark etmeksizin herkesi bekliyoruz.
              </p>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-md border border-line bg-panel/60"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Ad Soyad" required>
                <input
                  required
                  value={form.fullName}
                  onChange={update('fullName')}
                  placeholder="Ayşe Yılmaz"
                  className="input-field"
                />
              </Field>
              <Field label="Öğrenci Numarası" required>
                <input
                  required
                  value={form.studentId}
                  onChange={update('studentId')}
                  placeholder="2024123456"
                  className="input-field"
                />
              </Field>
              <Field label="Bölüm" required>
                <input
                  required
                  value={form.department}
                  onChange={update('department')}
                  placeholder="Bilgisayar Mühendisliği"
                  className="input-field"
                />
              </Field>
              <Field label="E-posta" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="ayse@topkapi.edu.tr"
                  className="input-field"
                />
              </Field>
              <Field label="Telefon" className="sm:col-span-2">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="05XX XXX XX XX"
                  className="input-field"
                />
              </Field>
            </div>

            <div className="mt-6">
              <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-3">
                İlgi Alanları
              </label>
              <div className="flex flex-wrap gap-2">
                {content.interestAreas.map((interest) => {
                  const active = interests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      aria-pressed={active}
                      className={`focus-ring px-3.5 py-2 rounded-sm border text-sm transition-colors ${
                        active
                          ? 'bg-steel-500 border-steel-500 text-void font-medium'
                          : 'border-line text-mist-300 hover:border-steel-700'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {errorMsg && (
              <p className="mt-4 text-sm text-red-400" role="alert">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="focus-ring mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-steel-500 text-void font-semibold hover:bg-steel-400 transition-colors disabled:opacity-60"
            >
              {submitting ? 'Gönderiliyor…' : 'Üyelik Başvurumu Gönder'}
              {!submitting && <Send size={16} />}
            </button>

            {!isConfigured && (
              <p className="mt-3 text-xs text-mist-500">
                Not: Formspree bağlantısı henüz ayarlanmadı — gönderimler şu an sadece bu tarayıcıda simüle
                ediliyor.{' '}
                <code className="text-steel-400">src/config/site.ts</code> içindeki{' '}
                <code className="text-steel-400">FORMSPREE_ENDPOINT</code>'i doldurunca gerçek e-postana
                düşmeye başlar.
              </p>
            )}
          </motion.form>
        </div>
      </div>

      <Toast
        show={showToast}
        message="Başvurun alındı! Kısa süre içinde e-posta ile seninle iletişime geçeceğiz."
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

function Field({
  label,
  required,
  className = '',
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-2">
        {label} {required && <span className="text-steel-400">*</span>}
      </label>
      {children}
    </div>
  );
}
