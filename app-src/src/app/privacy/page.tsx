import type { Metadata } from 'next';
import { ArrowLeft, Shield, ImageIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Parhae Likhae',
  description: 'Read our Privacy Policy to understand how Parhae Likhae collects, uses, and protects your personal information.',
};

const SECTIONS = [
  {
    title: '1. ✏️ Section Title — e.g. Information We Collect',
    body: [
      '✏️ Add your first paragraph here. Describe what personal information you collect (name, email, phone, address, etc.).',
      '✏️ Add a second paragraph if needed. E.g.: "We also collect device and usage data to improve our website experience."',
    ],
  },
  {
    title: '2. ✏️ Section Title — e.g. How We Use Your Information',
    body: [
      '✏️ Explain how you use collected data. E.g.: "We use your information to process orders, send order updates, and improve our services."',
      '✏️ Add any additional uses. E.g.: "With your consent, we may send promotional emails about new products and offers."',
    ],
  },
  {
    title: '3. ✏️ Section Title — e.g. Sharing Your Information',
    body: [
      '✏️ Describe your data sharing practices. E.g.: "We do not sell or rent your personal information to third parties."',
      '✏️ List any exceptions. E.g.: "We share data with delivery partners only to fulfil your orders."',
    ],
  },
  {
    title: '4. ✏️ Section Title — e.g. Data Security',
    body: [
      '✏️ Describe your security measures. E.g.: "We implement industry-standard SSL encryption and secure servers to protect your data."',
    ],
  },
  {
    title: '5. ✏️ Section Title — e.g. Cookies',
    body: [
      '✏️ Explain your cookie policy. E.g.: "Our website uses cookies to improve your browsing experience. You can disable cookies in your browser settings."',
    ],
  },
  {
    title: '6. ✏️ Section Title — e.g. Your Rights',
    body: [
      '✏️ List user rights. E.g.: "You have the right to access, correct, or delete your personal data. Contact us at hello@parhaelikhae.pk to make a request."',
    ],
  },
  {
    title: '7. ✏️ Section Title — e.g. Contact Us',
    body: [
      '✏️ Add your privacy contact info. E.g.: "For any privacy-related questions, contact us at hello@parhaelikhae.pk or +92 300 123 4567."',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-quicksand font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0">
              <Shield size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-fredoka text-4xl font-bold text-white">Privacy Policy</h1>
              <p className="text-white/50 font-quicksand mt-1 text-sm">
                ✏️ Effective Date: DD Month YYYY &nbsp;|&nbsp; Last Updated: DD Month YYYY
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-10">

        {/* Intro */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 grid sm:grid-cols-3 gap-8 items-center">
          <div className="sm:col-span-2">
            <p className="text-slate-500 font-quicksand text-sm leading-relaxed">
              ✏️ Write a brief intro paragraph here. E.g.: &ldquo;At Parhae Likhae, we are committed to protecting
              your privacy. This policy explains how we collect, use, and safeguard your personal information
              when you visit our website or place an order.&rdquo;
            </p>
            <p className="text-slate-500 font-quicksand text-sm leading-relaxed mt-3">
              ✏️ Add: &ldquo;By using our website, you agree to the terms of this Privacy Policy.&rdquo;
            </p>
          </div>
          <div className="h-36 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400">
            <ImageIcon size={24} className="text-slate-300" />
            <p className="text-xs font-quicksand font-semibold text-center">📷 Optional Image / Icon</p>
          </div>
        </div>

        {/* Policy sections */}
        <div className="space-y-6">
          {SECTIONS.map(({ title, body }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-fredoka text-lg font-bold text-slate-800 mb-3">{title}</h2>
              {body.map((para, i) => (
                <p key={i} className="text-sm text-slate-400 font-quicksand leading-relaxed mb-2 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center py-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-quicksand">
            ✏️ Add: &ldquo;Parhae Likhae reserves the right to update this Privacy Policy at any time. Changes will be posted on this page.&rdquo;
          </p>
          <Link href="/contact" className="mt-4 inline-block px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold font-quicksand hover:bg-slate-800 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            Questions? Contact Us →
          </Link>
        </div>

      </div>
    </div>
  );
}
