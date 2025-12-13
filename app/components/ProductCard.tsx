'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import Image from 'next/image';
import ProductDetailDialog from './ProductDetailDialog';

interface ProductCardProps {
  readonly title: string;
  readonly price: string;
  readonly bgColor: string;
  readonly logo: string;
  readonly image?: string;
  readonly hasBorder?: boolean;
  readonly description?: string;
  readonly pricingOptions?: { duration: string; price: string }[];
  readonly isSoldOut?: boolean;
}

export default function ProductCard({ 
  title, 
  price, 
  bgColor, 
  logo,
  image,
  hasBorder = false,
  description,
  pricingOptions,
  isSoldOut = false
}: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[logo] || Icons.Box;
  const isWhiteBg = bgColor.includes('white');
  
  return (
    <>
      <div 
        onClick={() => !isSoldOut && setIsDialogOpen(true)}
        className={`
          group flex flex-col rounded-lg sm:rounded-xl overflow-hidden w-full
          bg-[#0a1628] border border-[#8AABF2]/10 cursor-pointer
          transition-all duration-300 ease-out
          ${isSoldOut ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-xl hover:shadow-[#8AABF2]/10 hover:border-[#8AABF2]/30'}
          ${hasBorder ? 'ring-2 ring-[#9DE4F0]' : ''}
        `}
      >
        {/* Image/Logo Section - Top (square on mobile, 16:9 on desktop) */}
        <div 
          className={`
            relative aspect-square sm:aspect-video flex items-center justify-center overflow-hidden
            ${bgColor}
          `}
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-transform duration-500 ${isSoldOut ? 'grayscale' : 'group-hover:scale-105'}`}
            />
          ) : (
            <IconComponent 
              className={`
                w-6 h-6 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
                transition-transform duration-300 ease-out
                ${isSoldOut ? 'opacity-30' : 'group-hover:scale-110'}
                ${isWhiteBg ? 'text-black' : 'text-white'}
              `}
              strokeWidth={1.5}
            />
          )}
          
          {/* Sold Out Overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-[#040A26]/80 flex items-center justify-center">
              <span className="px-1.5 py-0.5 sm:px-4 sm:py-2 bg-[#0a1628] border border-[#8AABF2]/30 rounded text-[#8AABF2] font-semibold text-[8px] sm:text-sm">
                TẠM NGƯNG
              </span>
            </div>
          )}
        </div>
        
        {/* Info Section - Bottom */}
        <div className="p-1.5 sm:p-3 bg-[#0a1628]">
          <h3 className={`text-[10px] sm:text-base font-semibold leading-tight line-clamp-1 ${isSoldOut ? 'text-[#8AABF2]/50' : 'text-white'}`}>
            {title}
          </h3>
          <p className="mt-0.5 sm:mt-1 flex items-baseline gap-0.5 sm:gap-1 flex-wrap">
            <span className="text-[#8AABF2]/60 text-[8px] sm:text-sm font-medium">chỉ từ</span>
            <span className={`font-bold text-[11px] sm:text-lg ${isSoldOut ? 'text-[#8AABF2]/40' : 'text-[#EEC5EF]'}`}>{price}</span>
          </p>
        </div>
      </div>

      {!isSoldOut && (
        <ProductDetailDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={title}
          logo={logo}
          bgColor={bgColor}
          image={image}
          description={description}
          pricingOptions={pricingOptions}
        />
      )}
    </>
  );
}
