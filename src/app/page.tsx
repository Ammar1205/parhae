// Home Page - Server Component (data fetching)
// In production: replace mock data with Firestore queries via server actions (backend.md: separation of concerns)
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductGrid from '@/components/home/ProductGrid';
import FeaturedSpotlight from '@/components/home/FeaturedSpotlight';
import FlashDealBanner from '@/components/home/FlashDealBanner';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, FLASH_DEAL_PRODUCT, SPOTLIGHT_PRODUCT } from '@/lib/mockData';

// In production this would be:
// import { getProducts, getCategories } from '@/lib/actions/products';
// const products = await getProducts({ limit: 8, featured: true });

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured);
  const allProducts = MOCK_PRODUCTS;

  return (
    <>
      <HeroSection />
      <CategoryGrid categories={MOCK_CATEGORIES} />
      <ProductGrid
        products={featuredProducts}
        title="Crowd Favourites"
        subtitle="Loved by thousands of families across Pakistan — hand-picked, high-quality, and genuinely fun."
        badge="🔥 Best Sellers"
      />
      <FeaturedSpotlight product={SPOTLIGHT_PRODUCT} />
      <ProductGrid
        products={allProducts}
        title="Explore Everything"
        subtitle="Browse our complete collection of books, cards, toys, and learning bundles."
        badge="✨ Full Collection"
      />
      <FlashDealBanner product={FLASH_DEAL_PRODUCT} />
    </>
  );
}
