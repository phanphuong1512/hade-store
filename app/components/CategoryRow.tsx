'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: string;
  readonly logo: string;
  readonly bgColor: string;
  readonly image?: string;
  readonly hasBorder?: boolean;
  readonly isSoldOut?: boolean;
  readonly pricingOptions?: { duration: string; price: string }[];
}

interface CategoryRowProps {
  readonly categoryName: string;
  readonly categoryIcon: string;
  readonly categoryColor: string;
  readonly products: Product[];
}

export default function CategoryRow({ 
  categoryName, 
  categoryIcon, 
  categoryColor,
  products 
}: CategoryRowProps) {
  const [startIndex, setStartIndex] = useState(0);
  const productsPerPage = 4;
  const totalProducts = products.length;
  const hasEnoughProducts = totalProducts > productsPerPage;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[categoryIcon] || Icons.Folder;
  
  // Get visible products with rotation (loop around)
  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < productsPerPage; i++) {
      const index = (startIndex + i) % totalProducts;
      visible.push(products[index]);
    }
    return visible;
  };
  
  const visibleProducts = totalProducts <= productsPerPage 
    ? products 
    : getVisibleProducts();
  
  // Rotate left by 1 product (loop)
  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
  };
  
  // Rotate right by 1 product (loop)
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalProducts);
  };
  
  return (
    <div className="mb-4">
      {/* Navigation arrows - only show if more than 4 products */}
      <div className="flex justify-end gap-2 mb-4">
        <button 
          onClick={handlePrev}
          disabled={!hasEnoughProducts}
          className="w-9 h-9 rounded-full bg-[#0a1628] border border-[#8AABF2]/30 hover:bg-[#8AABF2]/10 hover:border-[#8AABF2]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-5 h-5 text-[#9DE4F0]" />
        </button>
        <button 
          onClick={handleNext}
          disabled={!hasEnoughProducts}
          className="w-9 h-9 rounded-full bg-[#0a1628] border border-[#8AABF2]/30 hover:bg-[#8AABF2]/10 hover:border-[#8AABF2]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          aria-label="Next product"
        >
          <ChevronRight className="w-5 h-5 text-[#9DE4F0]" />
        </button>
      </div>
      
      {/* Category + Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        {/* Category Card - full height with gradient */}
        <div 
          className={`
            rounded-xl overflow-hidden cursor-pointer 
            transition-all duration-300 hover:scale-[1.02]
            flex flex-col items-center justify-center
            ${categoryColor}
          `}
          style={{ minHeight: 'calc((100% - 0px))' }}
        >
          <IconComponent className="w-12 h-12 md:w-14 md:h-14 text-white mb-3" strokeWidth={1.5} />
          <span className="text-white font-bold text-lg md:text-xl">{categoryName}</span>
        </div>
        
        {/* Product Cards */}
        {visibleProducts.map((product, idx) => (
          <ProductCard
            key={`${product.id}-${startIndex}-${idx}`}
            title={product.title}
            price={product.price}
            logo={product.logo}
            bgColor={product.bgColor}
            image={product.image}
            hasBorder={product.hasBorder}
            isSoldOut={product.isSoldOut}
            pricingOptions={product.pricingOptions}
          />
        ))}
        
        {/* Empty placeholders if less than 4 products */}
        {visibleProducts.length < productsPerPage && 
          Array.from({ length: productsPerPage - visibleProducts.length }).map((_, i) => (
            <div key={`placeholder-${categoryName}-${i}`} className="rounded-xl bg-zinc-900/30" />
          ))
        }
      </div>
    </div>
  );
}
