import type { Metadata } from 'next';
import { ArrowLeft, FileText, ImageIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Parhae Likhae',
  description: 'Read the Terms of Service for using the Parhae Likhae website and placing orders.',
};

const SECTIONS = [
  {
    title: '1. ✏️ Section — e.g. Acceptance of Terms',
    body: '✏️ Add your acceptance clause here. E.g.: "By accessing or using the Parhae Likhae website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website."',
  },
  {
    title: '2. ✏️ Section — e.g. Use of Website',
    body: '✏️ Describe acceptable use. E.g.: "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the site."',
  },
  {
    title: '3. ✏️ Section — e.g. Product Information & Pricing',
    body: '✏️ Add your product/pricing disclaimer. E.g.: "We strive to ensure all product information and prices are accurate. We reserve the right to correct errors and update prices without prior notice."',
  },
  {
    title: '4. ✏️ Section — e.g. Orders & Payment',
    body: '✏️ Describe order and payment terms. E.g.: "By placing an order, you confirm that the information provided is accurate. We accept Cash on Delivery, EasyPaisa, JazzCash, and bank transfer."',
  },
  {
    title: '5. ✏️ Section — e.g. Delivery',
    body: '✏️ Add your delivery terms. E.g.: "Delivery times are estimates only. Parhae Likhae is not liable for delays caused by courier services or circumstances beyond our control."',
  },
  {
    title: '6. ✏️ Section — e.g. Intellectual Property',
    body: '✏️ Add your IP clause. E.g.: "All content on this website — including text, images, logos and product designs — is the property of Parhae Likhae and may not be reproduced without written permission."',
  },
  {
    title: '7. ✏️ Section — e.g. Limitation of Liability',
    body: '✏️ Add your liability limitation. E.g.: "To the maximum extent permitted by law, Parhae Likhae shall not be liable for any indirect or consequential loss arising from the use of our website or products."',
  },
  {
    title: '8. ✏️ Section — e.g. Governing Law',
    body: '✏️ Add your jurisdiction. E.g.: "These Terms are governed by the laws of Pakistan. Any disputes shall be subject to the jurisdiction of the courts of Lahore, Punjab."',
  },
  {
    title: '9. ✏️ Section — e.g. Changes to Terms',
    body: '✏️ Add your amendment clause. E.g.: "We may update these Terms at any time. Continued use of the website after changes constitutes your acceptance of the revised Terms."',
  },
  {
    title: '10. ✏️ Section — e.g. Contact',
    body: '✏️ Add contact info. E.g.: "For questions about these Terms, contact us at hello@parhaelikhae.pk or +92 300 123 4567."',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-quicksand font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center flex-shrink-0">
              <FileText size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-fredoka text-4xl font-bold text-white">Terms of Service</h1>
              <p className="text-white/60 font-quicksand mt-1 text-sm">
                ✏️ Effective Date: DD Month YYYY &nbsp;|&nbsp; Last Updated: DD Month YYYY
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-8">

        {/* Intro card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 grid sm:grid-cols-3 gap-8 items-center">
          <div className="sm:col-span-2">
            <p className="text-slate-500 font-quicksand text-sm leading-relaxed">
              ✏️ Write an introduction paragraph here. E.g.: &ldquo;Welcome to Parhae Likhae! These Terms of Service
              govern your use of our website located at parhaelikhae.pk and your purchase of our products.
              Please read them carefully before using our site.&rdquo;
            </p>
          </div>
          <div className="h-36 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400">
            <ImageIcon size={24} className="text-slate-300" />
            <p className="text-xs font-quicksand font-semibold text-center">📷 Optional Image</p>
          </div>
        </div>

        {/* Terms sections */}
        <div className="space-y-4">
          {SECTIONS.map(({ title, body }, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-fredoka text-lg font-bold text-slate-800 mb-3">{title}</h2>
              <p className="text-sm text-slate-400 font-quicksand leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center py-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-quicksand mb-3">
            ✏️ &ldquo;By using our website you agree to these Terms of Service.&rdquo;
          </p>
          <Link href="/contact" className="inline-block px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-semibold font-quicksand hover:bg-indigo-600 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            Questions? Contact Us →
          </Link>
        </div>

      </div>
    </div>
  );
}
