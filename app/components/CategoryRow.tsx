'use client';

import { useState, useEffect } from 'react';
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
  // Initialize with mobile value to prevent hydration mismatch
  const [productsPerPage, setProductsPerPage] = useState(3);
  const totalProducts = products.length;
  const hasEnoughProducts = totalProducts > productsPerPage;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[categoryIcon] || Icons.Folder;
  
  // Update products per page based on screen size
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth < 640) {
        setProductsPerPage(3); // Mobile: 3 products
      } else if (window.innerWidth < 768) {
        setProductsPerPage(2); // Small tablet: 2 products + category card
      } else if (window.innerWidth < 1024) {
        setProductsPerPage(3); // Tablet: 3 products + category card
      } else {
        setProductsPerPage(4); // Desktop: 4 products + category card
      }
    };
    
    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);
  
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
    <div className="mb-4 sm:mb-6">
      {/* Desktop: Navigation arrows on top right */}
      <div className="hidden sm:flex justify-end gap-2 mb-4">
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
      
      {/* Mobile Layout: Category tab + arrows row, then gradient container */}
      <div className="sm:hidden">
        {/* Top row: Category tab + Navigation arrows */}
        <div className="flex items-center justify-between mb-0">
          <div className={`
            px-5 py-2 rounded-t-xl
            ${categoryColor}
          `}>
            <span className="text-[#040A26] font-bold text-sm">{categoryName}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              disabled={!hasEnoughProducts}
              className="w-8 h-8 rounded-full bg-[#0a1628] border border-[#8AABF2]/30 hover:bg-[#8AABF2]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-4 h-4 text-[#9DE4F0]" />
            </button>
            <button 
              onClick={handleNext}
              disabled={!hasEnoughProducts}
              className="w-8 h-8 rounded-full bg-[#0a1628] border border-[#8AABF2]/30 hover:bg-[#8AABF2]/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              aria-label="Next product"
            >
              <ChevronRight className="w-4 h-4 text-[#9DE4F0]" />
            </button>
          </div>
        </div>
        
        {/* Products container with gradient background */}
        <div className={`
          rounded-xl rounded-tl-none overflow-hidden
          ${categoryColor}
        `}>
          <div className="grid grid-cols-3 gap-1.5 p-1.5">
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
          </div>
        </div>
      </div>
      
      {/* Desktop Layout: Category card + Products grid */}
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        {/* Category Card */}
        <div 
          className={`
            rounded-xl overflow-hidden cursor-pointer 
            transition-all duration-300 hover:scale-[1.02]
            flex flex-col items-center justify-center
            min-h-[180px]
            ${categoryColor}
          `}
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
        
        {/* Empty placeholders */}
        {visibleProducts.length < productsPerPage && 
          Array.from({ length: productsPerPage - visibleProducts.length }).map((_, i) => (
            <div key={`placeholder-${categoryName}-${i}`} className="rounded-xl bg-zinc-900/30 min-h-[180px]" />
          ))
        }
      </div>
    </div>
  );
}
