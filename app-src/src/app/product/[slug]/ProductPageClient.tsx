'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/firebase/schema';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Share2, Check, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';


interface ProductPageClientProps {
  product: Product;
}

// ─── Accordion Section Data ───────────────────────────────────────────────────
interface AccordionSection {
  id: string;
  icon: string;
  title: string;
  content: (product: Product) => React.ReactNode;
}

const ACCORDION_SECTIONS: AccordionSection[] = [
  {
    id: 'description',
    icon: '📖',
    title: 'Description',
    content: (product) => (
      <div
        suppressHydrationWarning
        className="font-quicksand text-base text-slate-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }}
      />
    ),
  },
  {
    id: 'whats-inside',
    icon: '🎁',
    title: "What's Inside",
    content: (product) =>
      product.whatsInside ? (
        <div
          suppressHydrationWarning
          className="font-quicksand text-base text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.whatsInside }}
        />
      ) : (
        <ul className="font-quicksand text-base text-slate-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            <span>All items included in the <strong>{product.name}</strong> set</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            <span>Premium, child-safe materials and finishes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            <span>Full instructions and learning guide included</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
            <span>Neatly packaged — perfect for gifting 🎀</span>
          </li>
        </ul>
      ),
  },
  {
    id: 'age-learning',
    icon: '🧠',
    title: 'Age & Learning',
    content: (product) =>
      product.ageLearning ? (
        <div
          suppressHydrationWarning
          className="font-quicksand text-base text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.ageLearning }}
        />
      ) : (
        <div className="font-quicksand text-base text-slate-700 space-y-3">
          {product.ageRange && (
            <p>
              <span className="font-bold text-slate-800">Recommended Age:</span>{' '}
              {product.ageRange}
            </p>
          )}
          {product.language && (
            <p>
              <span className="font-bold text-slate-800">Language:</span>{' '}
              <span className="capitalize">{product.language}</span>
            </p>
          )}
          <p>
            <span className="font-bold text-slate-800">Category:</span>{' '}
            <span className="capitalize">{product.category.replace(/-/g, ' ')}</span>
          </p>
          <p className="text-slate-600">
            Designed by early childhood education experts to build key cognitive, language, and motor skills through play-based learning.
          </p>
        </div>
      ),
  },
  {
    id: 'shipping',
    icon: '🚚',
    title: 'Shipping & Delivery',
    content: () => (
      <div className="font-quicksand text-base text-slate-700 space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-xl">📦</span>
          <p>Orders are processed within <strong>1–2 business days</strong> after confirmation.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">🗓️</span>
          <p>Standard delivery across Pakistan takes <strong>3–5 working days</strong>.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">💵</span>
          <p>We accept <strong>Cash on Delivery</strong>, <strong>EasyPaisa</strong>, and <strong>JazzCash</strong>.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">🎉</span>
          <p>Free shipping on orders above <strong>Rs. 2,500</strong>!</p>
        </div>
      </div>
    ),
  },
  {
    id: 'returns',
    icon: '🔄',
    title: 'Returns',
    content: () => (
      <div className="font-quicksand text-base text-slate-700 space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-xl">✅</span>
          <p>We offer a <strong>7-day easy return policy</strong> on all unopened, undamaged items.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">📞</span>
          <p>To initiate a return, contact our support team via WhatsApp or email within 7 days of delivery.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p>Items that have been opened or used are not eligible for return unless they are defective.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">💳</span>
          <p>Refunds are processed within <strong>3–5 business days</strong> after we receive the returned item.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'care-safety',
    icon: '🛡️',
    title: 'Care & Safety',
    content: () => (
      <div className="font-quicksand text-base text-slate-700 space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔬</span>
          <p>All products are made with <strong>non-toxic, child-safe materials</strong> and tested to international safety standards.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">🧹</span>
          <p>Wipe clean with a damp cloth. Do not submerge in water or use harsh chemicals.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">👨‍👩‍👧</span>
          <p>Adult supervision is recommended for children under 3 years of age.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xl">🌿</span>
          <p>Packaging is eco-friendly and recyclable — we care about our planet too! 🌍</p>
        </div>
      </div>
    ),
  },
];

// ─── Accordion Item Component ─────────────────────────────────────────────────
function AccordionItem({
  section,
  product,
  isOpen,
  onToggle,
}: {
  section: AccordionSection;
  product: Product;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: isOpen ? '2px solid #FCD34D' : '2px solid #FEF3C7',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Header Trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-200"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #FCD34D 0%, #FDE68A 100%)'
            : 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
        }}
      >
        {/* Left: Emoji Icon */}
        <span className="text-2xl flex-shrink-0">{section.icon}</span>

        {/* Centre: Title */}
        <span className="flex-1 font-quicksand font-bold text-slate-800 text-base sm:text-lg">
          {section.title}
        </span>

        {/* Right: Chevron with CSS transition (avoids SSR hydration mismatch) */}
        <span
          className="flex-shrink-0 text-slate-700 transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown size={22} strokeWidth={2.5} />
        </span>
      </button>

      {/* Animated Content Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 py-5 bg-white">
              {section.content(product)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductPageClient({ product }: ProductPageClientProps) {
  const { addItem, openDrawer } = useCart();
  const [adding, setAdding] = useState(false);
  const [activeMedia, setActiveMedia] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openSection, setOpenSection] = useState<string>('description');

  const mediaList = product.images && product.images.length > 0 ? product.images : [];

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setAdding(true);
    addItem({
      productId: product.id,
      qty: 1,
      price: product.price,
      name: product.name,
      image: mediaList[0] || '',
      slug: product.slug,
    });
    await new Promise((r) => setTimeout(r, 300));
    setAdding(false);
    openDrawer();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  const isVideo = (url: string) =>
    url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');

  const handleToggle = (id: string) => {
    setOpenSection((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="min-h-screen bg-white pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: Media Gallery ── */}
          <div className="space-y-4">
            {/* Main Display */}
            <div className="relative aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 flex items-center justify-center">
              {mediaList.length > 0 ? (
                isVideo(mediaList[activeMedia]) ? (
                  <video
                    src={mediaList[activeMedia]}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mediaList[activeMedia]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="text-9xl">📚</div>
              )}

              {/* Navigation Arrows */}
              {mediaList.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveMedia((prev) =>
                        prev === 0 ? mediaList.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 hover:bg-white shadow-lg transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveMedia((prev) =>
                        prev === mediaList.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 hover:bg-white shadow-lg transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-sm font-quicksand">
                    -{discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {mediaList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {mediaList.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMedia(idx)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeMedia === idx
                        ? 'border-emerald-500 opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {isVideo(media) ? (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-xs font-quicksand">
                        Video
                      </div>
                    ) : (
                      <img src={media} alt="Thumbnail" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product Details ── */}
          <div className="flex flex-col justify-center">

            {/* Category & Age */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full font-quicksand uppercase tracking-wider">
                {product.category.replace(/-/g, ' ')}
              </span>
              {product.ageRange && (
                <span className="text-sm text-slate-500 font-quicksand font-semibold">
                  Ages {product.ageRange}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="font-fredoka text-4xl sm:text-5xl font-bold text-slate-800 leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= Math.round(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200 fill-slate-200'
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-quicksand text-slate-500 underline decoration-slate-300 underline-offset-4">
                {product.reviewCount} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-6">
              <span className="font-fredoka text-5xl font-bold text-emerald-600">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-quicksand text-xl text-slate-400 line-through mb-1.5">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 20px 40px rgba(5,150,105,0.2)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={adding || product.stock === 0}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 font-quicksand shadow-lg shadow-emerald-200"
              >
                {adding ? (
                  <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingCart size={22} />
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </>
                )}
              </motion.button>

              <button
                onClick={handleShare}
                className="w-16 flex items-center justify-center bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 hover:text-slate-800 transition-colors"
                title="Share this product"
              >
                {copied ? <Check size={22} className="text-emerald-500" /> : <Share2 size={22} />}
              </button>
            </div>

            {/* ── Accordion ── */}
            <div className="flex flex-col gap-3 mb-6">
              {ACCORDION_SECTIONS.map((section) => (
                <AccordionItem
                  key={section.id}
                  section={section}
                  product={product}
                  isOpen={openSection === section.id}
                  onToggle={() => handleToggle(section.id)}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
