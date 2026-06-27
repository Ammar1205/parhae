// Mock data for development - mirrors the exact Firestore schema from schema.ts
// In production, these are fetched from Firestore using optimized queries with composite indexes

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO EDIT ACCORDION CONTENT ON THE PRODUCT PAGE
// ─────────────────────────────────────────────────────────────────────────────
//
//  Each product has THREE manually editable fields:
//
//  1. description   → shown in the "📖 Description"    accordion tab
//  2. whatsInside   → shown in the "🎁 What's Inside"  accordion tab
//  3. ageLearning   → shown in the "🧠 Age & Learning" accordion tab
//
//  All three support HTML formatting:
//    <b>bold text</b>          → bold
//    <u>underline</u>          → underline
//    <br />                    → new line
//    <i>italic</i>             → italic
//
//  The other three tabs (Shipping & Delivery, Returns, Care & Safety)
//  are hardcoded globally and do not need to be edited per product.
//
// ─────────────────────────────────────────────────────────────────────────────

import { Product, Category } from './firebase/schema';

export const MOCK_PRODUCTS: Product[] = [
  // ── PRODUCT 1 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-001',
    name: '30 Read and Rhyme Flip Books - 300 Words Phonics Set',
    description: "As parents, you may have wondered how to develop your child's vocabulary. Our fun and interactive Phonics Flip Book Set makes it easy and enjoyable for little learners. 🎉💡\nThese playful books help children recognise patterns, build reading confidence, explore sounds, rhyme, and strengthen sight word skills through hands on learning that feels just like play. 📚✨\nProduct Details: This exciting set includes 30 sturdy flip books, each with 10 words, giving your child 300 vocabulary boosting words to discover. 🚀💕",
    whatsInside: "📦 <b>30 Flip Books</b> — each with 10 unique phonics words (300 words total)<br /><br />🃏 <b>Sturdy board pages</b> — designed to withstand little hands<br /><br />🔤 <b>300 vocabulary-boosting words</b> — carefully selected for early readers<br /><br />🎁 Neatly gift-boxed and ready to present",
    ageLearning: "👶 <b>Recommended Age:</b> 3–6 years<br /><br />🎯 <b>Skills Developed:</b><br />• Phonics awareness &amp; letter-sound recognition<br />• Rhyme pattern identification<br />• Sight word fluency<br />• Reading confidence &amp; vocabulary building<br /><br />🌍 <b>Language:</b> Bilingual (English &amp; Urdu)<br /><br />Designed with guidance from early childhood education specialists to make learning feel like play.",
    price: 2250,
    originalPrice: 3500,
    category: 'sentence-series',
    images: [
      '/products/phonics/prod-001/img1.webp',
      '/products/phonics/prod-001/vid1.mp4',
      '/products/phonics/prod-001/img2.webp',
      '/products/phonics/prod-001/img3.webp',
      '/products/phonics/prod-001/img4.webp',
      '/products/phonics/prod-001/img5.webp',
      '/products/phonics/prod-001/img6.webp',
    ],
    tags: ['phonics', 'reading', 'bestseller', 'age-3-6'],
    stock: 10,
    rating: 4.9,
    reviewCount: 312,
    featured: true,
    isFlashDeal: true,
    dealEndsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    slug: '30-read-and-rhyme-flip-books',
    ageRange: '3-6 years',
    language: 'bilingual',
  },

  // ── PRODUCT 2 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-002',
    name: 'Prophets Stories Books from Quran 20 Books Box Set',
    description: "Introduce your child to the inspiring stories from the Quran with this beautifully curated 20-book box set. Each book in this collection brings to life the journeys, teachings, and important lessons, providing a valuable introduction to Islamic history and values in an engaging way.\nCrafted with young readers in mind, each story is told in simple language that's easy for children to understand, paired with colorful illustrations that capture their attention and imagination.",
    whatsInside: "📦 <b>20 illustrated story books</b> — one for each prophet<br /><br />🎨 <b>Full-colour artwork</b> on every page<br /><br />📖 <b>Simple, child-friendly language</b> — easy for young readers<br /><br />🎁 Presented in a beautiful gift box — perfect for Eid or birthdays",
    ageLearning: "👶 <b>Recommended Age:</b> 5–10 years<br /><br />🎯 <b>Skills &amp; Values Developed:</b><br />• Knowledge of Islamic history<br />• Moral values: patience, kindness, and faith<br />• Reading comprehension<br />• Love for the Quran<br /><br />🌍 <b>Language:</b> Bilingual (English &amp; Urdu)",
    price: 1700,
    originalPrice: 2500,
    category: 'prophet-stories',
    images: [
      '/products/story-books/prod-002/isl_img1.webp',
      '/products/story-books/prod-002/isl_vid1.mp4',
      '/products/story-books/prod-002/isl_img2.webp',
      '/products/story-books/prod-002/isl_img3.webp',
      '/products/story-books/prod-002/isl_img4.webp',
      '/products/story-books/prod-002/isl_img5.webp',
      '/products/story-books/prod-002/isl_img6.webp',
      '/products/story-books/prod-002/isl_img7.webp',
    ],
    tags: ['islamic', 'stories', 'bilingual', 'age-5-10'],
    stock: 19,
    rating: 4.75,
    reviewCount: 38,
    featured: true,
    isFlashDeal: false,
    createdAt: new Date().toISOString(),
    slug: 'prophet-stories-collection',
    ageRange: '5-10 years',
    language: 'bilingual',
  },

  // ── PRODUCT 3 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-003',
    name: '🧠 150 Islamic Quiz Cards – Fun & Educational Learning for Kids & Adults',
    description: "<b>Make Islamic learning exciting with this set of 150 Islamic quiz cards, designed to test and expand knowledge about Islam in a fun and interactive way! Perfect for kids and adults alike, these Islamic quiz cards cover essential topics, including Prophets, Quran, Islamic history, and daily life in Islam.</b>",
    whatsInside: "📦 <b>150 Islamic Quiz Cards — packed with questions &amp; answers<br /><br />🃏 Premium laminated finish — durable and long-lasting<br /><br />🎁 Neatly packaged and ready to gift</b>",
    ageLearning: "👶 <b>Recommended Age: 3–6 years<br /><br />🎯 <b>Skills Developed:</b><br />• Arabic letter recognition<br />• Islamic vocabulary<br />• Memory and recall<br /><br />🌍 <b>Language: Bilingual (English &amp; Urdu)</b>",
    price: 1200,
    originalPrice: 1750,
    category: 'islamic-cards',
    images: [
      '/products/islamic-cards/Prod-003/p003_img1.webp',
      '/products/islamic-cards/Prod-003/p003_vid1.mp4',
      '/products/islamic-cards/Prod-003/p003_img2.webp',
      '/products/islamic-cards/Prod-003/p003_img3.webp',
      '/products/islamic-cards/Prod-003/p003_img4.webp',
      '/products/islamic-cards/Prod-003/p003_img5.webp',
      '/products/islamic-cards/Prod-003/p003_img6.webp',
      '/products/islamic-cards/Prod-003/p003_img7.webp',
    ],
    tags: ['islamic', 'arabic', 'flash-cards', 'age-2-5'],
    stock: 85,
    rating: 4.7,
    reviewCount: 241,
    featured: true,
    isFlashDeal: true,
    dealEndsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    slug: 'islamic-abc-flash-cards',
    ageRange: '2-5 years',
    language: 'bilingual',
  },

  // ── PRODUCT 4 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-004',
    name: 'Dua Cards - Pack of 30 Cards | Daily Dua for Kids in English / Urdu',
    description: "Strengthen your connection with Allah with 30 Pocket-Sized Dua Cards in English & Urdu. Perfect for kids & adults to learn Masnoon Duain easily. 🌙🤲\n <b>📖 What’s Inside?</b>\n ✔ Daily Duas for Kids – Easy-to-learn supplications for everyday life\n ✔ Dua for Astaghfar – Seek forgiveness with powerful duas\n ✔ Duas for Relief from Difficulties – Find comfort in times of hardship\n ✔ Masnoon Duain for Kids & Adults – Authentic supplications from the Quran and Hadith\n ✔ Bilingual (English & Urdu) – Perfect for learners of all ages",
    whatsInside: "📦 <b>30 flip books · 300 words · sturdy board pages.</b>",
    ageLearning: "👶 <b>Recommended Age: 3–6 years<br /><br />🎯 <b>Skills Developed:</b><br />• Arabic letter recognition<br />• Islamic vocabulary<br />• Easy Dua memorization<br /><br />🌍 <b>Language: Bilingual (English &amp; Urdu)</b>",
    price: 1050,
    originalPrice: 1500,
    category: 'islamic-cards',
    images: [
             '/products/islamic-cards/prod-004/p004_img1.webp',
             '/products/islamic-cards/prod-004/p004_vid1.mp4',
             '/products/islamic-cards/prod-004/p004_img2.webp',
             '/products/islamic-cards/prod-004/p004_img3.webp',
             '/products/islamic-cards/prod-004/p004_img4.webp',
             '/products/islamic-cards/prod-004/p004_img5.webp',
             '/products/islamic-cards/prod-004/p004_img6.webp',
             '/products/islamic-cards/prod-004/p004_img7.webp',
    ],
    tags: ['tracing', 'writing', 'motor-skills', 'age-3-6'],
    stock: 60,
    rating: 4.6,
    reviewCount: 175,
    featured: false,
    isFlashDeal: false,
    createdAt: new Date().toISOString(),
    slug: 'tracing-workbook-bundle',
    ageRange: '3-6 years',
    language: 'english',
  },

  // ── PRODUCT 5 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-005',
    name: 'Write & Wipe Children 10 Pcs Book Set',
    description: "<b>Help your child master early learning skills with this Write & Wipe 10-Book Set, designed for preschoolers, kindergarteners, and early learners! These dry-erase books allow kids to practice writing letters, numbers, tracing, and more, then simply wipe and start again.</b>",
    whatsInside: "<b>✔ Write & Wipe Alphabet Practice – Uppercase & lowercase letters<br /><br />✔ Write & Wipe ABC 123 – Numbers, counting, and handwriting<br /><br />✔ Read, Write & Wipe Workbook – Early learning activities<br /><br />✔ 30 flip books · 300 words · sturdy board pages.",
    ageLearning: "👶 <b>Recommended Age:</b> 5–8 years<br /><br />🎯 <b>Skills Developed:</b><br />• Sentence construction<br />• Reading fluency<br />• Early literacy and grammar<br />• Vocabulary expansion<br /><br />🌍 <b>Language:</b> English",
    price: 1300,
    originalPrice: 2250,
    category: 'sentence-series',
    images: [
             '/products/story-books/prod-005/p005_img1.webp',
             '/products/story-books/prod-005/p005_vid1.mp4',
             '/products/story-books/prod-005/p005_img2.webp',
             '/products/story-books/prod-005/p005_img3.webp',
             '/products/story-books/prod-005/p005_img4.webp',
             '/products/story-books/prod-005/p005_img5.webp',
             '/products/story-books/prod-005/p005_img6.webp',
             '/products/story-books/prod-005/p005_img7.webp',
            ],
    tags: ['sentences', 'reading', 'literacy', 'age-5-8'],
    stock: 33,
    rating: 4.8,
    reviewCount: 89,
    featured: false,
    isFlashDeal: false,
    createdAt: new Date().toISOString(),
    slug: 'sentence-series-book-1',
    ageRange: '5-8 years',
    language: 'english',
  },

  // ── PRODUCT 6 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-006',
    name: 'Islamic & Educational Mega Bundle - 150 Islamic Quiz Cards & Write & Wipe Children 10 Pcs Book Set',
    description: "Our bestselling bundle: 150 Islamic Quiz Cards + Write & Wipe Children 10 Pcs Book Set – the perfect learning starter kit for Islamic and Educational knowledge.",
    whatsInside: "📦 <b>150 Islamic Quiz Cards</b><br /><br />✏️ <b>150 Islamic Quiz Cards — packed with questions & answers</b><br /><br /><b>Write & Wipe Children 10 Pcs Book Set</b> ✔ Write & Wipe Alphabet Practice – Uppercase & lowercase letters<br /><br /><b>✔ 30 flip books · 300 words · sturdy board pages</b>",
    ageLearning: "👶 <b>Recommended Age:</b> 3–7 years<br /><br />🎯 <b>Skills Developed:</b><br />• • Arabic letter recognition<br />• Islamic vocabulary<br />• Sentence construction<br />• Reading fluency<br /><br />• Early literacy and grammar<br /><br />🌍 <b>Language:</b> Bilingual (English &amp; Arabic)",
    price: 2299,
    originalPrice: 2599,
    category: 'bundles',
    images: [
             '/products/bundles/prod-006/p005_img1.webp',
             '/products/bundles/prod-006/p003_img1.webp',
             '/products/bundles/prod-006/p006_vid1.mp4',
             '/products/bundles/prod-006/p003_img2.webp',
             '/products/bundles/prod-006/p005_img2.webp',
             '/products/bundles/prod-006/p003_img2.webp',
             '/products/bundles/prod-006/p005_img3.webp',
             '/products/bundles/prod-006/p003_img3.webp',
    ],
    tags: ['bundle', 'bestseller', 'value', 'age-3-7'],
    stock: 20,
    rating: 5.0,
    reviewCount: 423,
    featured: true,
    isFlashDeal: false,
    createdAt: new Date().toISOString(),
    slug: 'educational-mega-bundle',
    ageRange: '3-7 years',
    language: 'bilingual',
  },

  // ── PRODUCT 7 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-007',
    name: 'Alphabet Wooden Puzzle',
    description: "Chunky, child-safe wooden puzzle with 26 colourful letter pieces and matching illustrated tray.",
    whatsInside: "🧩 <b>26 chunky wooden letter pieces</b> — A to Z<br /><br />🖼️ <b>Illustrated matching tray</b> — guides correct placement<br /><br />🎨 <b>Non-toxic, child-safe paint</b> — safe for little hands<br /><br />🎁 Packaged in a sturdy box",
    ageLearning: "👶 <b>Recommended Age:</b> 2–5 years<br /><br />🎯 <b>Skills Developed:</b><br />• Alphabet recognition<br />• Hand-eye coordination<br />• Fine motor skills<br />• Problem-solving through play<br /><br />🌍 <b>Language:</b> English",
    price: 1099,
    originalPrice: 1400,
    category: 'toys',
    images: ['/images/products/wooden-puzzle.jpg'],
    tags: ['toys', 'puzzle', 'wooden', 'age-2-5'],
    stock: 50,
    rating: 4.5,
    reviewCount: 134,
    featured: false,
    isFlashDeal: false,
    createdAt: new Date().toISOString(),
    slug: 'alphabet-wooden-puzzle',
    ageRange: '2-5 years',
    language: 'english',
  },

  // ── PRODUCT 8 ──────────────────────────────────────────────────────────────
  {
    id: 'prod-008',
    name: 'Story Books – Urdu Classics',
    description: "A set of 5 beloved Urdu children's classics retold with modern illustrations for today's young readers.",
    whatsInside: "📚 <b>5 classic Urdu story books</b> — beloved tales retold<br /><br />🎨 <b>Modern illustrations</b> — vibrant and engaging for young readers<br /><br />📖 <b>Simple Urdu language</b> — easy to read and understand<br /><br />🎁 Beautifully presented as a set",
    ageLearning: "👶 <b>Recommended Age:</b> 5–10 years<br /><br />🎯 <b>Skills Developed:</b><br />• Urdu reading and comprehension<br />• Love for classical literature<br />• Imagination and creativity<br />• Cultural appreciation<br /><br />🌍 <b>Language:</b> Urdu",
    price: 1799,
    originalPrice: 2200,
    category: 'story-books',
    images: ['/images/products/urdu-classics.jpg'],
    tags: ['stories', 'urdu', 'classics', 'age-5-10'],
    stock: 25,
    rating: 4.9,
    reviewCount: 207,
    featured: false,
    isFlashDeal: false,
    createdAt: new Date().toISOString(),
    slug: 'story-books-urdu-classics',
    ageRange: '5-10 years',
    language: 'urdu',
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-001', name: 'Story Books', slug: 'story-books', icon: '📚', color: 'from-violet-400 to-purple-500', productCount: 12, order: 1 },
  { id: 'cat-002', name: 'Phonics', slug: 'phonics', icon: '🔤', color: 'from-emerald-400 to-green-500', productCount: 8, order: 2 },
  { id: 'cat-003', name: 'Tracing', slug: 'tracing', icon: '✏️', color: 'from-yellow-400 to-amber-500', productCount: 6, order: 3 },
  { id: 'cat-004', name: 'Toys', slug: 'toys', icon: '🧩', color: 'from-pink-400 to-rose-500', productCount: 15, order: 4 },
  { id: 'cat-005', name: 'Flash Cards', slug: 'flash-cards', icon: '🃏', color: 'from-sky-400 to-blue-500', productCount: 10, order: 5 },
  { id: 'cat-006', name: 'Bundles', slug: 'bundles', icon: '🎁', color: 'from-orange-400 to-amber-500', productCount: 5, order: 6 },
];

export const FLASH_DEAL_PRODUCT = MOCK_PRODUCTS.find(p => p.isFlashDeal && p.featured) || MOCK_PRODUCTS[0];
export const SPOTLIGHT_PRODUCT = MOCK_PRODUCTS.find(p => p.category === 'bundles') || MOCK_PRODUCTS[5];
