import CategoryRow from './components/CategoryRow';
import { Eye, Menu, Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  // Categories with their products
  const categories = [
    {
      name: 'AI',
      icon: 'Brain',
      color: 'bg-gradient-to-br from-[#8AABF2] to-[#EEC5EF]',
      products: [
        { 
          id: 1, 
          title: 'GPT Business', 
          price: '50.000đ', 
          logo: 'Bot', 
          bgColor: 'bg-zinc-800', 
          image: '/products/chatgpt-3.webp',
          pricingOptions: [
            { duration: '1 tháng', price: '50.000đ' },
          ]
        },
        { 
          id: 2, 
          title: 'GPT Go', 
          price: '60.000đ', 
          logo: 'Bot', 
          bgColor: 'bg-zinc-800', 
          image: '/products/chatgpt-3.webp',
          pricingOptions: [
            { duration: '3 tháng', price: '60.000đ' },
            { duration: '1 năm', price: '120.000đ' },
          ]
        },
        { 
          id: 3, 
          title: 'Google AI Pro', 
          price: '20.000đ', 
          logo: 'Gem', 
          bgColor: 'bg-white', 
          image: '/products/gemini.webp',
          pricingOptions: [
            { duration: '1 tháng', price: '20.000đ' },
            { duration: '6 tháng', price: '80.000đ' },
            { duration: '1 năm', price: '160.000đ' },
          ]
        },
        { 
          id: 4, 
          title: 'Perplexity (chính chủ)', 
          price: '250.000đ', 
          logo: 'Sparkles', 
          bgColor: 'bg-zinc-900', 
          image: '/products/perplexity.webp',
          pricingOptions: [
            { duration: '1 năm', price: '250.000đ' },
          ]
        },
        { 
          id: 5, 
          title: 'Grok AI Super', 
          price: '300.000đ', 
          logo: 'Rocket', 
          bgColor: 'bg-zinc-900', 
          image: '/products/grok-ai.webp', 
          isSoldOut: true,
          pricingOptions: [
            { duration: '1 tháng', price: '300.000đ' },
          ]
        },
      ]
    },
    {
      name: 'Giải trí',
      icon: 'Tv',
      color: 'bg-gradient-to-br from-[#EEC5EF] to-[#8AABF2]',
      products: [
        { id: 16, title: 'Youtube Premium', price: '50.000đ', logo: 'Play', bgColor: 'bg-red-600', image: '/products/youtube_premium.webp' },
        { id: 17, title: 'Spotify Premium', price: '30.000đ', logo: 'Music', bgColor: 'bg-green-500', image: '/products/spotify.png.jpg', isSoldOut: true },
        { id: 18, title: 'Netflix Premium', price: '80.000đ', logo: 'Film', bgColor: 'bg-red-700', image: '/products/netflix.avif', isSoldOut: true },
      ]
    },
    {
      name: 'Học tập',
      icon: 'GraduationCap',
      color: 'bg-gradient-to-br from-[#9DE4F0] to-[#8AABF2]',
      products: [
        { id: 9, title: 'Quizlet', price: '10.000đ', logo: 'BookOpen', bgColor: 'bg-indigo-600', image: '/products/quizlet.png' },
        { id: 10, title: 'Figma Edu', price: '90.000đ', logo: 'Figma', bgColor: 'bg-zinc-900' },
        { id: 11, title: 'IntelliJ Edu', price: '90.000đ', logo: 'Code', bgColor: 'bg-zinc-900' },
        { id: 12, title: 'Coursera Plus', price: '150.000đ', logo: 'Award', bgColor: 'bg-blue-600', isSoldOut: true },
        { id: 13, title: 'Grammarly Premium', price: '50.000đ', logo: 'PenTool', bgColor: 'bg-green-600', isSoldOut: true },
      ]
    },
    {
      name: 'Hiệu suất',
      icon: 'Zap',
      color: 'bg-gradient-to-br from-[#EEC5EF] via-[#8AABF2] to-[#9DE4F0]',
      products: [
        { id: 14, title: 'Canva (tài khoản cấp)', price: '10.000đ', logo: 'Palette', bgColor: 'bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500', image: '/products/canva.webp' },
        { id: 20, title: 'Cursor trial', price: '20.000đ', logo: 'Code', bgColor: 'bg-zinc-900' },
        { id: 21, title: 'Microsoft 365', price: '30.000đ', logo: 'Package', bgColor: 'bg-white', isSoldOut: true },
        { id: 22, title: 'CapCut Pro', price: '50.000đ', logo: 'Scissors', bgColor: 'bg-zinc-800', isSoldOut: true },
        { id: 23, title: 'Notion Plus', price: '40.000đ', logo: 'FileText', bgColor: 'bg-zinc-800', isSoldOut: true },
      ]
    },
    {
      name: 'Bảo mật',
      icon: 'Shield',
      color: 'bg-gradient-to-br from-[#9DE4F0] via-[#8AABF2] to-[#EEC5EF]',
      products: [
        { id: 24, title: 'Express VPN', price: '20.000đ', logo: 'Shield', bgColor: 'bg-red-600' },
        { id: 25, title: 'Ariva Security & VPN', price: '60.000đ', logo: 'Lock', bgColor: 'bg-blue-700' },
        { id: 26, title: 'NordVPN Premium', price: '35.000đ', logo: 'Lock', bgColor: 'bg-blue-700', isSoldOut: true },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#040A26]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#040A26]">
        <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 h-16">
          {/* Logo - 85-90% of header height (h-16 = 64px, so ~54-58px) */}
          <Image 
            src="/hade-logo.svg" 
            alt="HADE Store" 
            width={200} 
            height={56}
            className="h-14 w-auto"
          />
          
          {/* Center - View Count */}
          <div className="flex items-center gap-1.5 text-[#8AABF2]">
            <Eye className="w-5 h-5" />
            <span className="text-sm">2</span>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden md:block px-4 py-1.5 bg-[#0a1628] border border-[#8AABF2]/30 rounded-full text-sm text-[#9DE4F0] hover:bg-[#8AABF2]/10 hover:border-[#8AABF2]/50 transition-colors">
              Điều khoản & Dịch vụ
            </button>
            <button className="p-2 bg-[#0a1628] border border-[#8AABF2]/30 hover:bg-[#8AABF2]/10 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-[#9DE4F0]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-8 md:px-16 lg:px-24">
        {/* Search Section */}
        <div className="flex justify-center gap-3 mb-4">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8AABF2]" />
            <input 
              type="text"
              placeholder="Tìm Kiếm"
              className="w-full bg-[#0a1628] border border-[#8AABF2]/30 rounded-full pl-14 pr-28 py-3.5 text-white placeholder-[#8AABF2]/50 focus:outline-none focus:ring-2 focus:ring-[#9DE4F0]/50 focus:border-[#9DE4F0]/50 text-base shadow-lg shadow-black/30"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <kbd className="w-8 h-8 flex items-center justify-center bg-[#8AABF2]/20 text-[#9DE4F0] text-xs rounded-lg font-medium">⌘</kbd>
              <kbd className="w-8 h-8 flex items-center justify-center bg-[#8AABF2]/20 text-[#9DE4F0] text-sm rounded-lg font-medium">K</kbd>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-3.5 bg-[#0a1628] border border-[#8AABF2]/30 rounded-full text-sm text-[#9DE4F0] hover:bg-[#8AABF2]/10 hover:border-[#8AABF2]/50 transition-colors shadow-lg shadow-black/30">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Bộ lọc</span>
          </button>
        </div>

        {/* Categories with Products */}
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryRow
              key={category.name}
              categoryName={category.name}
              categoryIcon={category.icon}
              categoryColor={category.color}
              products={category.products}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#8AABF2]/20">
        <p className="text-[#8AABF2]/60 text-sm">
          © 2025 HADE Store. All rights reserved.{' '}
          <span className="text-[#9DE4F0] underline cursor-pointer hover:text-[#EEC5EF] transition-colors">HADE Store Terms of Service</span>
        </p>
      </footer>

      {/* Social Icons */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {/* Facebook */}
        <a 
          href="#" 
          className="w-12 h-12 rounded-full bg-[#8AABF2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#8AABF2]/30" 
          aria-label="Facebook"
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 36.6 36.6 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
          </svg>
        </a>
        {/* Messenger */}
        <a 
          href="#" 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9DE4F0] via-[#8AABF2] to-[#EEC5EF] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#8AABF2]/30" 
          aria-label="Messenger"
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 0 0-.64.05l-2.39 1.05a.96.96 0 0 1-1.35-.85l-.07-2.14a.97.97 0 0 0-.32-.68A11.39 11.389 0 0 1 .002 11.64Zm8.32-2.19-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 0 0-2.61.48Z"/>
          </svg>
        </a>
        {/* Instagram */}
        <a 
          href="#" 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EEC5EF] via-[#8AABF2] to-[#9DE4F0] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#EEC5EF]/30" 
          aria-label="Instagram"
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 2.982c2.937 0 3.285.011 4.445.064 1.072.049 1.655.228 2.042.379.514.2.88.438 1.265.823.385.385.623.751.823 1.265.151.387.33.97.379 2.042.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445c-.049 1.072-.228 1.655-.379 2.042-.2.514-.438.88-.823 1.265a3.398 3.398 0 0 1-1.265.823c-.387.151-.97.33-2.042.379-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064c-1.072-.049-1.655-.228-2.042-.379a3.398 3.398 0 0 1-1.265-.823 3.398 3.398 0 0 1-.823-1.265c-.151-.387-.33-.97-.379-2.042-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445c.049-1.072.228-1.655.379-2.042.2-.514.438-.88.823-1.265a3.398 3.398 0 0 1 1.265-.823c.387-.151.97-.33 2.042-.379 1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066-1.171.054-1.97.24-2.67.512a5.392 5.392 0 0 0-1.949 1.268 5.392 5.392 0 0 0-1.269 1.949c-.271.7-.457 1.499-.511 2.67C1.013 8.638 1 9.013 1 12s.013 3.362.066 4.535c.054 1.171.24 1.97.511 2.67a5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269c.7.271 1.499.457 2.67.511C8.638 22.987 9.013 23 12 23s3.362-.013 4.535-.066c1.171-.054 1.97-.24 2.67-.511a5.392 5.392 0 0 0 1.949-1.269 5.392 5.392 0 0 0 1.269-1.949c.271-.7.457-1.499.511-2.67.053-1.173.066-1.548.066-4.535s-.013-3.362-.066-4.535c-.054-1.171-.24-1.97-.511-2.67a5.392 5.392 0 0 0-1.269-1.949 5.392 5.392 0 0 0-1.949-1.268c-.7-.272-1.499-.458-2.67-.512C15.362 1.013 14.987 1 12 1Zm0 5.351a5.649 5.649 0 1 0 0 11.298 5.649 5.649 0 0 0 0-11.298Zm0 9.316a3.667 3.667 0 1 1 0-7.334 3.667 3.667 0 0 1 0 7.334Zm7.192-9.539a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
