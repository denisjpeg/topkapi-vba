/**
 * Site-wide configuration.
 *
 * FORMSPREE_ENDPOINT — the "Kulübe Katıl" form posts here.
 *   1. Go to https://formspree.io and create a free account.
 *   2. Create a new form, copy the endpoint it gives you
 *      (looks like "https://formspree.io/f/xxxxabcd").
 *   3. Paste it below, replacing the placeholder.
 *   Until you do this, the form falls back to a local-only simulation
 *   (it will still show the success toast, but nothing is actually sent).
 *
 * FORMSPREE_POLL_ENDPOINT — Formlar sayfasındaki anket (oylama) oyları buraya gider.
 *   Formspree'de ikinci bir form oluşturup endpoint'ini buraya yapıştır (ücretsiz
 *   planda birden fazla form açılabilir). Boş bırakılırsa oylar sadece tarayıcıda
 *   simüle edilir ve hiçbir yere gönderilmez — bkz. PollCard bileşenindeki not.
 *
 * ADMIN_PASSWORD — gate for the /#admin content panel.
 *   IMPORTANT: this is a static site with no server, so this password is
 *   only a light deterrent (anyone who reads the deployed JS can find it).
 *   Do not use a password you reuse elsewhere, and don't rely on this for
 *   anything sensitive.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maewovzd';

export const FORMSPREE_POLL_ENDPOINT = 'https://formspree.io/f/xjybwldr';

export const ADMIN_PASSWORD = 'topkapi2026';

/** İletişim e-postası — Formlar sayfası ve footer'da gösterilir. */
export const CONTACT_EMAIL = 'topkapiveribilimi@gmail.com';
