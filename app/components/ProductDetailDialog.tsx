'use client';

import { useEffect, useState } from 'react';
import { X, Shield, AlertCircle, CheckSquare, Ban, Minus, Plus, Check } from 'lucide-react';
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
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const MESSENGER_URL = 'https://www.facebook.com/messages/t/939214932606743';

  // Reset quantity when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedOption(0);
      setShowCopiedNotification(false);
      setCountdown(2);
    }
  }, [isOpen]);

  // Calculate total price
  const calculateTotal = () => {
    if (pricingOptions.length === 0) return '0đ';
    const priceStr = pricingOptions[selectedOption].price;
    const priceNum = parseInt(priceStr.replace(/\D/g, ''));
    const total = priceNum * quantity;
    return total.toLocaleString('vi-VN') + 'đ';
  };

  // Handle purchase - copy text and redirect to messenger
  const handlePurchase = async () => {
    const selectedPricing = pricingOptions[selectedOption];
    const orderText = `${title}
${selectedPricing.duration} x ${quantity} - ${calculateTotal()}`;
    
    try {
      await navigator.clipboard.writeText(orderText);
      setShowCopiedNotification(true);
      setCountdown(2);
      
          // Start countdown
      let count = 2;
      const countdownInterval = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(countdownInterval);
          if (isMobile) {
            window.location.href = MESSENGER_URL;
          } else {
            window.open(MESSENGER_URL, '_blank');
          }
          setShowCopiedNotification(false);
          onClose();
        }
      }, 1000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = orderText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setShowCopiedNotification(true);
      setCountdown(2);
      
      let count = 2;
      const countdownInterval = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(countdownInterval);
          if (isMobile) {
            window.location.href = MESSENGER_URL;
          } else {
            window.open(MESSENGER_URL, '_blank');
          }
          setShowCopiedNotification(false);
          onClose();
        }
      }, 1000);
    }
  };

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
                    onClick={() => setSelectedOption(index)}
                    className={`group relative py-5 px-4 border rounded-2xl transition-all duration-300 text-center overflow-hidden ${
                      selectedOption === index
                        ? 'bg-[#9DE4F0]/15 border-[#9DE4F0]/50 ring-2 ring-[#9DE4F0]/30'
                        : 'bg-[#8AABF2]/5 border-[#8AABF2]/10 hover:border-[#9DE4F0]/50 hover:bg-[#9DE4F0]/10'
                    }`}
                  >
                    {/* Selected indicator */}
                    {selectedOption === index && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#9DE4F0]" />
                    )}
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9DE4F0]/0 to-[#EEC5EF]/0 group-hover:from-[#9DE4F0]/5 group-hover:to-[#EEC5EF]/5 transition-all duration-300" />
                    
                    <span className={`relative block text-sm mb-1 transition-colors ${
                      selectedOption === index ? 'text-[#9DE4F0]' : 'text-[#8AABF2]/70 group-hover:text-[#9DE4F0]'
                    }`}>
                      {option.duration}
                    </span>
                    <span className={`relative block font-bold text-xl sm:text-2xl transition-colors ${
                      selectedOption === index ? 'text-[#9DE4F0]' : 'text-white group-hover:text-[#9DE4F0]'
                    }`}>
                      {option.price}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quantity selector */}
              <div className="flex items-center justify-between p-4 bg-[#8AABF2]/5 border border-[#8AABF2]/10 rounded-2xl">
                <span className="text-[#8AABF2]/80 text-sm">Số lượng</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-xl bg-[#8AABF2]/10 hover:bg-[#8AABF2]/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4 text-[#9DE4F0]" />
                  </button>
                  <span className="w-10 text-center text-white font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(99, quantity + 1))}
                    disabled={quantity >= 99}
                    className="w-9 h-9 rounded-xl bg-[#8AABF2]/10 hover:bg-[#8AABF2]/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#9DE4F0]" />
                  </button>
                </div>
              </div>

              {/* Total price */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#9DE4F0]/10 via-[#8AABF2]/10 to-[#EEC5EF]/10 border border-[#8AABF2]/20 rounded-2xl">
                <span className="text-white font-medium">Tổng cộng</span>
                <span className="text-[#9DE4F0] font-bold text-2xl">{calculateTotal()}</span>
              </div>

              {/* CTA Button */}
              <button 
                onClick={handlePurchase}
                className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#9DE4F0] via-[#8AABF2] to-[#EEC5EF] hover:opacity-90 text-[#040A26] font-semibold text-lg rounded-2xl transition-all duration-300 shadow-lg shadow-[#8AABF2]/30 hover:shadow-[#8AABF2]/50 hover:scale-[1.02] active:scale-[0.98] mt-auto"
              >
                Mua hàng
              </button>
            </div>

          </div>
        </div>

        {/* Copied Notification Overlay */}
        {showCopiedNotification && (
          <div className="absolute inset-0 bg-[#040A26]/95 backdrop-blur-md flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
            {/* Success Icon */}
            <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
              <Check className="w-12 h-12 text-green-500" strokeWidth={3} />
            </div>
            
            {/* Title */}
            <h3 className="text-white text-2xl font-bold mb-3">Tin nhắn đã được copy</h3>
            
            {/* Description */}
            <p className="text-[#8AABF2]/80 text-center px-8 mb-6">
              Hãy paste tin nhắn đó và gửi đến Freemium (Messenger) sắp được mở
            </p>

            {/* Loading indicator */}
            <div className="flex items-center gap-2 text-[#9DE4F0] text-lg font-medium">
              <span>Chuyển hướng sau</span>
              <span className="w-8 h-8 rounded-full bg-[#9DE4F0]/20 flex items-center justify-center text-[#9DE4F0] font-bold animate-pulse">
                {countdown}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
