import type { Metadata } from 'next';
import { ArrowLeft, RefreshCcw, ImageIcon, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Parhae Likhae',
  description: 'Learn about our hassle-free return and refund policy for Parhae Likhae orders.',
};

const STEPS = [
  { step: '01', title: '✏️ Step Title Here', desc: '✏️ Describe the first step of your return process. E.g.: "Contact us within 7 days of receiving your order."' },
  { step: '02', title: '✏️ Step Title Here', desc: '✏️ Describe step two. E.g.: "Send photos of the product showing the issue to our WhatsApp or email."' },
  { step: '03', title: '✏️ Step Title Here', desc: '✏️ Describe step three. E.g.: "We will arrange a free pickup or ask you to drop off at your nearest courier."' },
  { step: '04', title: '✏️ Step Title Here', desc: '✏️ Describe step four. E.g.: "Once received and inspected, your refund will be processed within 3–5 business days."' },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-4xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-quicksand font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center flex-shrink-0">
              <RefreshCcw size={28} className="text-white" />
            </div>
            <div>
              <h1 className="font-fredoka text-4xl font-bold text-white">Return & Refund Policy</h1>
              <p className="text-white/70 font-quicksand mt-1">
                ✏️ Add your policy effective date here. E.g.: &ldquo;Last updated: January 2025&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-12">

        {/* ── OVERVIEW CARD ──────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-fredoka text-2xl font-bold text-slate-800 mb-4">Our Promise to You</h2>
            <p className="text-slate-400 font-quicksand text-sm leading-relaxed mb-3">
              ✏️ Write your opening policy statement here. E.g.: &ldquo;At Parhae Likhae, your satisfaction is our priority.
              If you receive a damaged or incorrect product, we will make it right — no questions asked.&rdquo;
            </p>
            <p className="text-slate-400 font-quicksand text-sm leading-relaxed">
              ✏️ Add any key conditions here. E.g.: &ldquo;Returns are accepted within 7 days of delivery.
              Items must be unused and in original packaging.&rdquo;
            </p>
          </div>
          <div className="h-44 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400">
            <ImageIcon size={28} className="text-slate-300" />
            <p className="font-quicksand text-sm font-semibold">📷 Policy Image / Illustration</p>
            <p className="font-quicksand text-xs text-slate-300">Recommended: 600 × 350 px</p>
          </div>
        </div>

        {/* ── WHAT CAN BE RETURNED ───────────────────────────── */}
        <div>
          <h2 className="font-fredoka text-2xl font-bold text-slate-800 mb-6">What Can Be Returned?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              '✏️ Eligible condition 1 — e.g. Damaged or defective items',
              '✏️ Eligible condition 2 — e.g. Wrong item received',
              '✏️ Eligible condition 3 — e.g. Sealed / unopened products within 7 days',
              '✏️ Non-eligible — e.g. Opened books or used activity sheets',
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-2xl border ${
                  i < 3 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <CheckCircle2
                  size={18}
                  className={`flex-shrink-0 mt-0.5 ${i < 3 ? 'text-emerald-500' : 'text-red-400'}`}
                />
                <p className={`text-sm font-quicksand ${i < 3 ? 'text-emerald-800' : 'text-red-700'}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW TO RETURN STEPS ────────────────────────────── */}
        <div>
          <h2 className="font-fredoka text-2xl font-bold text-slate-800 mb-6">How to Return in 4 Steps</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex gap-4">
                <span className="font-fredoka text-3xl font-bold text-emerald-200 flex-shrink-0">{step}</span>
                <div>
                  <p className="font-fredoka font-bold text-slate-700 mb-1">{title}</p>
                  <p className="text-sm text-slate-400 font-quicksand leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTACT PROMPT ─────────────────────────────────── */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center">
          <p className="font-fredoka text-xl font-bold text-amber-800 mb-2">Need to start a return?</p>
          <p className="text-sm text-amber-700 font-quicksand mb-5">
            ✏️ Add your WhatsApp number or email here.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl font-quicksand hover:bg-amber-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-300 transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}
