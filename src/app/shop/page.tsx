'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/shop/ProductCard';
import { ArrowLeft, ArrowDownUp } from 'lucide-react';
import Link from 'next/link';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const sortedProducts = useMemo(() => {
    const products = [...MOCK_PRODUCTS];
    if (sortBy === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    }
    return products;
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 text-sm font-quicksand font-semibold mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="font-fredoka text-4xl font-bold text-slate-800 mb-2">All Products</h1>
              <p className="text-slate-500 font-quicksand">Browse our entire educational collection.</p>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm">
              <ArrowDownUp size={16} className="text-slate-400" />
              <label htmlFor="sort" className="text-sm font-semibold text-slate-600 font-quicksand whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-sm font-quicksand text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
