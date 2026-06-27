// Dynamic Category Page — /category/[slug]
// Handles: story-books, phonics, islamic-cards, prophet-stories, tracing, bundles
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CategoryPageClient from './CategoryPageClient';

const CATEGORY_META: Record<string, { name: string; emoji: string; color: string; description: string }> = {
  'story-books':      { name: 'Story Books',      emoji: '📖', color: 'from-violet-500 to-purple-600', description: 'Imaginative tales and classic stories to spark a lifelong love of reading.' },
  'phonics':          { name: 'Phonics Sets',      emoji: '🔤', color: 'from-emerald-500 to-teal-600', description: 'Fun, structured phonics kits that turn letter sounds into confident readers.' },
  'islamic-cards':    { name: 'Islamic Cards',     emoji: '🕌', color: 'from-teal-500 to-cyan-600',    description: 'Beautiful flash cards introducing Arabic letters, duas, and Islamic values.' },
  'prophet-stories':  { name: 'Prophet Stories',   emoji: '📚', color: 'from-amber-500 to-orange-600', description: 'Illustrated bilingual books narrating the inspiring lives of the prophets.' },
  'tracing':          { name: 'Tracing Books',     emoji: '✏️', color: 'from-yellow-500 to-amber-600', description: 'Wipe-clean tracing sets for letters, numbers, shapes and Urdu script.' },
  'bundles':          { name: 'Value Bundles',     emoji: '🎁', color: 'from-rose-500 to-pink-600',    description: 'Hand-picked multi-product bundles — save up to 35% vs buying separately.' },
  'flash-cards':      { name: 'Flash Cards',       emoji: '🃏', color: 'from-sky-500 to-blue-600',     description: 'Colourful, laminated flash cards covering alphabets, numbers, shapes and more.' },
  'sentence-series':  { name: 'Sentence Series',   emoji: '📝', color: 'from-indigo-500 to-violet-600', description: 'Step-by-step sentence building curriculum for early readers aged 5–8.' },
  'toys':             { name: 'Educational Toys',  emoji: '🧩', color: 'from-pink-500 to-rose-600',    description: 'Safe, child-friendly wooden puzzles and learning toys for hands-on play.' },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) return { title: 'Category Not Found' };
  return {
    title: `${meta.name} | Parhae Likhae`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) notFound();
  return <CategoryPageClient slug={slug} meta={meta} />;
}
