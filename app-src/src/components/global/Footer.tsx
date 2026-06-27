'use client';
// Footer with multi-column layout + Pakistani payment badges (GSAP ScrollTrigger)
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SHOP_LINKS = [
  { label: 'Story Books', href: '/category/story-books' },
  { label: 'Phonics Sets', href: '/category/phonics' },
  { label: 'Islamic Cards', href: '/category/islamic-cards' },
  { label: 'Prophet Stories', href: '/category/prophet-stories' },
  { label: 'Tracing Books', href: '/category/tracing' },
  { label: 'Bundles', href: '/category/bundles' },
];

const SUPPORT_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Return Policy', href: '/returns' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const PAYMENT_BADGES = [
  { name: 'Cash on Delivery', emoji: '💵', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'EasyPaisa', emoji: '📱', color: 'bg-green-100 text-green-700' },
  { name: 'JazzCash', emoji: '🔴', color: 'bg-red-100 text-red-700' },
  { name: 'Bank Transfer', emoji: '🏦', color: 'bg-blue-100 text-blue-700' },
];

const FacebookIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-col',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="footer-col space-y-5 opacity-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={17} className="text-white" />
              </div>
              <div>
                <span className="font-fredoka text-lg font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">Parhae</span>
                <span className="font-fredoka text-lg font-bold text-teal-400 group-hover:text-teal-300 transition-colors"> Likhae</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 font-quicksand leading-relaxed">
              Pakistan's premium educational toy & book brand. Making learning fun for kids aged 2–10 since 2020.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              <a href="tel:+923001234567" className="group flex items-center gap-2.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors font-quicksand">
                <Phone size={14} className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                +92 300 123 4567
              </a>
              <a href="mailto:hello@parhaelikhae.pk" className="group flex items-center gap-2.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors font-quicksand">
                <Mail size={14} className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                hello@parhaelikhae.pk
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-400 font-quicksand">
                <MapPin size={14} className="text-emerald-500 flex-shrink-0" />
                Lahore, Punjab, Pakistan
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/50 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="footer-col opacity-0">
            <h4 className="font-fredoka text-base font-bold text-white mb-5">Shop</h4>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center text-sm text-slate-400 hover:text-emerald-400 transition-colors font-quicksand"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out flex-shrink-0 text-emerald-400">
                      <ChevronRight size={14} />
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300 ease-out">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-col opacity-0">
            <h4 className="font-fredoka text-base font-bold text-white mb-5">Support</h4>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center text-sm text-slate-400 hover:text-emerald-400 transition-colors font-quicksand"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-out flex-shrink-0 text-emerald-400">
                      <ChevronRight size={14} />
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300 ease-out">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment + Newsletter */}
          <div className="footer-col space-y-6 opacity-0">
            <div>
              <h4 className="font-fredoka text-base font-bold text-white mb-4">We Accept</h4>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_BADGES.map(({ name, emoji, color }) => (
                  <div
                    key={name}
                    className="flex items-center gap-1.5 px-2.5 py-2 bg-slate-800 rounded-xl border border-slate-700"
                  >
                    <span className="text-sm">{emoji}</span>
                    <span className="text-[10px] font-semibold text-slate-300 font-quicksand leading-tight">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-fredoka text-base font-bold text-white mb-3">Stay Updated</h4>
              <p className="text-xs text-slate-400 font-quicksand mb-3">Get deals & new product alerts.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-quicksand"
                />
                <button className="px-3 py-2 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors font-quicksand">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-quicksand">
            © {new Date().getFullYear()} Parhae Likhae. All rights reserved. Made with 💚 in Pakistan.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-quicksand">
            <span>🔒 Secure Payments</span>
            <span className="mx-2">•</span>
            <span>🚚 Nationwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
