import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';

// Static generation for all known products
export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
