'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/shop/ProductCard';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 text-sm font-quicksand font-semibold mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="font-fredoka text-4xl font-bold text-slate-800 mb-6">Search Products</h1>
          
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input
              type="text"
              autoFocus
              placeholder="Search for books, toys, flash cards..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-100 rounded-2xl text-lg font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Results */}
        {query.trim() === '' ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="font-fredoka text-2xl text-slate-700 mb-2">What are you looking for?</h2>
            <p className="text-slate-500 font-quicksand">Type above to search our entire catalog of educational fun!</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🙈</div>
            <h2 className="font-fredoka text-2xl text-slate-700 mb-2">No results found</h2>
            <p className="text-slate-500 font-quicksand">We couldn't find anything matching "{query}". Try checking your spelling or using different words.</p>
          </div>
        ) : (
          <div>
            <p className="text-slate-500 font-quicksand mb-6 font-semibold">
              Found {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
