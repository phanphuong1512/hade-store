'use client';

import { useEffect } from 'react';
import { X, Shield, AlertCircle, CheckSquare, Ban } from 'lucide-react';
import * as Icons from 'lucide-react';
import Image from 'next/image';

interface PricingOption {
  readonly duration: string;
  readonly price: string;
}

interface ProductDetailProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly logo: string;
  readonly bgColor: string;
  readonly image?: string;
  readonly description?: string;
  readonly pricingOptions?: PricingOption[];
}

export default function ProductDetailDialog({
  isOpen,
  onClose,
  title,
  logo,
  bgColor,
  image,
  description = 'Thêm tài khoản của bạn vào Team và sử dụng Workspace HADE STORE để nhận toàn bộ tính năng cao cấp',
  pricingOptions = [
    { duration: '1 tháng', price: '90.000đ' },
    { duration: '3 tháng', price: '230.000đ' },
    { duration: '1 tuần', price: '30.000đ' },
    { duration: '1 ngày', price: '5.000đ' },
  ]
}: ProductDetailProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[logo] || Icons.Box;
  const isWhiteBg = bgColor.includes('white');

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#040A26]/90 backdrop-blur-lg"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0a1628] to-[#040A26] rounded-2xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.7)] border border-[#8AABF2]/20 animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#8AABF2]/10 hover:bg-[#8AABF2]/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group"
        >
          <X className="w-5 h-5 text-[#8AABF2] group-hover:text-[#9DE4F0] transition-colors" />
        </button>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Mobile: Stack layout, Desktop: 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-4">
              {/* Product Image - 16:9 with overlay effect */}
              <div 
                className={`
                  relative aspect-video rounded-2xl overflow-hidden
                  ring-1 ring-[#8AABF2]/20
                  shadow-lg
                  ${bgColor}
                `}
              >
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <IconComponent 
                        className={`w-12 h-12 ${isWhiteBg ? 'text-black' : 'text-white'}`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Terms & Warranty box */}
              <div className="flex-1 p-4 sm:p-5 bg-[#8AABF2]/5 backdrop-blur-sm border border-[#8AABF2]/10 rounded-2xl">
                <h4 className="text-[#8AABF2] text-xs uppercase tracking-wider font-medium mb-3">Điều khoản & Bảo hành</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-lg bg-[#9DE4F0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-[#9DE4F0]" />
                    </div>
                    <span className="text-[#9DE4F0]/90 text-sm leading-relaxed">Bảo hành toàn bộ thời gian sử dụng</span>
                  </div>
                  
                  <div className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-lg bg-[#EEC5EF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#EEC5EF]" />
                    </div>
                    <span className="text-[#EEC5EF]/90 text-sm leading-relaxed">Không đảm bảo lịch sử chat - dữ liệu chỉ được giữ trong 1 tháng và được reset hàng tháng hoặc khi bị lỗi (nếu có)</span>
                  </div>
                  
                  <div className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-lg bg-[#9DE4F0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckSquare className="w-3.5 h-3.5 text-[#9DE4F0]" />
                    </div>
                    <span className="text-[#9DE4F0]/90 text-sm leading-relaxed">Có thể sử dụng model suy nghĩ cao nhất GPT5-Pro</span>
                  </div>
                  
                  <div className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-lg bg-[#8AABF2]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Ban className="w-3.5 h-3.5 text-[#8AABF2]" />
                    </div>
                    <span className="text-[#8AABF2]/90 text-sm leading-relaxed">Không được phép mời email khác vào Team - bạn chỉ mua cho chính bạn!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-4">
              {/* Product Description box */}
              <div className="p-4 sm:p-5 bg-[#8AABF2]/5 backdrop-blur-sm border border-[#8AABF2]/10 rounded-2xl">
                <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">{title}</h3>
                <p className="text-[#8AABF2]/80 text-sm sm:text-base leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Pricing options - 2x2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {pricingOptions.slice(0, 4).map((option, index) => (
                  <button
                    key={index}
                    className="group relative py-5 px-4 bg-[#8AABF2]/5 border border-[#8AABF2]/10 rounded-2xl hover:border-[#9DE4F0]/50 hover:bg-[#9DE4F0]/10 transition-all duration-300 text-center overflow-hidden"
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9DE4F0]/0 to-[#EEC5EF]/0 group-hover:from-[#9DE4F0]/5 group-hover:to-[#EEC5EF]/5 transition-all duration-300" />
                    
                    <span className="relative block text-[#8AABF2]/70 text-sm mb-1 group-hover:text-[#9DE4F0] transition-colors">
                      {option.duration}
                    </span>
                    <span className="relative block text-white font-bold text-xl sm:text-2xl group-hover:text-[#9DE4F0] transition-colors">
                      {option.price}
                    </span>
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#9DE4F0] via-[#8AABF2] to-[#EEC5EF] hover:opacity-90 text-[#040A26] font-semibold text-lg rounded-2xl transition-all duration-300 shadow-lg shadow-[#8AABF2]/30 hover:shadow-[#8AABF2]/50 hover:scale-[1.02] active:scale-[0.98] mt-auto">
                Mua hàng
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
