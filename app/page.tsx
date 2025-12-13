'use client';

import { useState, useMemo, useEffect } from 'react';
import CategoryRow from './components/CategoryRow';
import { Menu, Search, SlidersHorizontal, X } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Categories with their products - wrapped in useMemo to prevent recreation on every render
  const categories = useMemo(() => [
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
        { id: 10, title: 'Figma Edu', price: '90.000đ', logo: 'Figma', bgColor: 'bg-zinc-900', image: '/mmo-product-image/figma.webp' },
        { id: 11, title: 'IntelliJ Edu', price: '90.000đ', logo: 'Code', bgColor: 'bg-zinc-900', image: '/mmo-product-image/intelliJ.webp' },
        { id: 12, title: 'Coursera Plus', price: '150.000đ', logo: 'Award', bgColor: 'bg-blue-600', image: '/mmo-product-image/coursera_plus.webp', isSoldOut: true },
        { id: 13, title: 'Grammarly Premium', price: '50.000đ', logo: 'PenTool', bgColor: 'bg-green-600', image: '/mmo-product-image/grammally.webp', isSoldOut: true },
      ]
    },
    {
      name: 'Hiệu suất',
      icon: 'Zap',
      color: 'bg-gradient-to-br from-[#EEC5EF] via-[#8AABF2] to-[#9DE4F0]',
      products: [
        { id: 14, title: 'Canva (tài khoản cấp)', price: '10.000đ', logo: 'Palette', bgColor: 'bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500', image: '/products/canva.webp' },
        { id: 20, title: 'Cursor trial', price: '20.000đ', logo: 'Code', bgColor: 'bg-zinc-900', image: '/mmo-product-image/cursor_trial.webp' },
        { id: 21, title: 'Microsoft 365', price: '30.000đ', logo: 'Package', bgColor: 'bg-white', image: '/mmo-product-image/microsoft365_ver2.webp', isSoldOut: true },
        { id: 22, title: 'CapCut Pro', price: '50.000đ', logo: 'Scissors', bgColor: 'bg-zinc-800', image: '/mmo-product-image/capcut.webp', isSoldOut: true },
        { id: 23, title: 'Notion Plus', price: '40.000đ', logo: 'FileText', bgColor: 'bg-zinc-800', image: '/mmo-product-image/notion.webp', isSoldOut: true },
      ]
    },
    {
      name: 'Bảo mật',
      icon: 'Shield',
      color: 'bg-gradient-to-br from-[#9DE4F0] via-[#8AABF2] to-[#EEC5EF]',
      products: [
        { id: 24, title: 'Express VPN', price: '20.000đ', logo: 'Shield', bgColor: 'bg-red-600', image: '/mmo-product-image/expressVPN.webp' },
        { id: 25, title: 'Ariva Security & VPN', price: '60.000đ', logo: 'Lock', bgColor: 'bg-blue-700', image: '/mmo-product-image/avira.webp' },
        { id: 26, title: 'NordVPN Premium', price: '35.000đ', logo: 'Lock', bgColor: 'bg-blue-700', image: '/mmo-product-image/NordVPN.webp', isSoldOut: true },
      ]
    },
  ], []);

  // Filter categories and products based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase().trim();
    
    return categories
      .map(category => {
        // Filter products that match the search query
        const filteredProducts = category.products.filter(product =>
          product.title.toLowerCase().includes(query)
        );
        
        // Return category with filtered products if any match
        if (filteredProducts.length > 0) {
          return { ...category, products: filteredProducts };
        }
        
        // Also include category if category name matches
        if (category.name.toLowerCase().includes(query)) {
          return category;
        }
        
        return null;
      })
      .filter(Boolean) as typeof categories;
  }, [searchQuery, categories]);

  // Get all matching products for search results dropdown
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const results: Array<{
      product: typeof categories[0]['products'][0];
      categoryName: string;
      categoryColor: string;
    }> = [];
    
    categories.forEach(category => {
      category.products.forEach(product => {
        if (product.title.toLowerCase().includes(query)) {
          results.push({
            product,
            categoryName: category.name,
            categoryColor: category.color
          });
        }
      });
    });
    
    return results.slice(0, 8); // Limit to 8 results
  }, [searchQuery, categories]);

  // Handle keyboard shortcut (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        searchInput?.focus();
      }
      if (e.key === 'Escape') {
        setShowSearchResults(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#040A26]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#040A26] pt-2 sm:pt-3">
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 h-14 sm:h-16">
          {/* Logo */}
          <Image 
            src="/hade-logo.svg" 
            alt="HADE Store" 
            width={200} 
            height={56}
            className="h-10 sm:h-14 w-auto"
          />
          
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
      <main className="pt-20 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Search Section */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-[#8AABF2] z-10" />
            <input 
              id="search-input"
              type="text"
              placeholder="Tìm Kiếm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="w-full bg-[#0a1628] border border-[#8AABF2]/30 rounded-full pl-11 sm:pl-14 pr-10 sm:pr-28 py-3 sm:py-3.5 text-white placeholder-[#8AABF2]/50 focus:outline-none focus:ring-2 focus:ring-[#9DE4F0]/50 focus:border-[#9DE4F0]/50 text-sm sm:text-base shadow-lg shadow-black/30"
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute right-4 sm:right-24 top-1/2 -translate-y-1/2 p-1 hover:bg-[#8AABF2]/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-[#8AABF2]" />
              </button>
            )}
            {/* Keyboard shortcuts - hidden on mobile and when searching */}
            {!searchQuery && (
              <div className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1.5">
                <kbd className="w-8 h-8 flex items-center justify-center bg-[#8AABF2]/20 text-[#9DE4F0] text-xs rounded-lg font-medium">⌘</kbd>
                <kbd className="w-8 h-8 flex items-center justify-center bg-[#8AABF2]/20 text-[#9DE4F0] text-sm rounded-lg font-medium">K</kbd>
              </div>
            )}
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a1628] border border-[#8AABF2]/30 rounded-2xl overflow-hidden shadow-xl shadow-black/50 z-50">
                <div className="p-2">
                  <p className="text-xs text-[#8AABF2]/60 px-3 py-2">
                    Tìm thấy {searchResults.length} sản phẩm
                  </p>
                  {searchResults.map(({ product, categoryName }) => (
                    <button
                      key={product.id}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#8AABF2]/10 rounded-xl transition-colors text-left"
                      onClick={() => {
                        setSearchQuery(product.title);
                        setShowSearchResults(false);
                      }}
                    >
                      {/* Product Image or Icon */}
                      <div className={`w-14 h-8 rounded-lg ${product.bgColor || 'bg-[#8AABF2]/20'} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={56}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Search className="w-4 h-4 text-[#9DE4F0]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{product.title}</p>
                        <p className="text-[#8AABF2]/60 text-xs">{categoryName} • {product.price}</p>
                      </div>
                      {product.isSoldOut && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                          Hết hàng
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* No Results */}
            {showSearchResults && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a1628] border border-[#8AABF2]/30 rounded-2xl overflow-hidden shadow-xl shadow-black/50 z-50">
                <div className="p-6 text-center">
                  <Search className="w-10 h-10 text-[#8AABF2]/30 mx-auto mb-3" />
                  <p className="text-[#8AABF2]/60 text-sm">
                    Không tìm thấy sản phẩm nào cho &quot;{searchQuery}&quot;
                  </p>
                </div>
              </div>
            )}
          </div>
          <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-3.5 bg-[#0a1628] border border-[#8AABF2]/30 rounded-full text-sm text-[#9DE4F0] hover:bg-[#8AABF2]/10 hover:border-[#8AABF2]/50 transition-colors shadow-lg shadow-black/30">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Bộ lọc</span>
          </button>
        </div>

        {/* Search Result Info */}
        {searchQuery && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[#8AABF2]/80 text-sm">
              {filteredCategories.length > 0 ? (
                <>Kết quả cho &quot;<span className="text-[#9DE4F0]">{searchQuery}</span>&quot;</>
              ) : (
                <>Không tìm thấy kết quả cho &quot;<span className="text-[#9DE4F0]">{searchQuery}</span>&quot;</>
              )}
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#EEC5EF] text-sm hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Categories with Products */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
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
      <footer className="py-6 sm:py-8 px-4 text-center border-t border-[#8AABF2]/20">
        <p className="text-[#8AABF2]/60 text-xs sm:text-sm">
          © 2025 HADE Store. All rights reserved.{' '}
          <br className="sm:hidden" />
          <span className="text-[#9DE4F0] underline cursor-pointer hover:text-[#EEC5EF] transition-colors">HADE Store Terms of Service</span>
        </p>
      </footer>

      {/* Social Icons */}
      <div className="fixed right-3 sm:right-6 md:right-10 bottom-6 sm:bottom-8 flex flex-col gap-2 sm:gap-4 z-50">
        {/* Facebook */}
        <a 
          href="https://www.facebook.com/profile.php?id=61584575767990" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8AABF2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#8AABF2]/30" 
          aria-label="Facebook"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white" viewBox="0 0 24 24">
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 36.6 36.6 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
          </svg>
        </a>
        {/* Messenger */}
        <a 
          href="https://www.facebook.com/messages/t/939214932606743" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#9DE4F0] via-[#8AABF2] to-[#EEC5EF] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#8AABF2]/30" 
          aria-label="Messenger"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white" viewBox="0 0 24 24">
            <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 0 0-.64.05l-2.39 1.05a.96.96 0 0 1-1.35-.85l-.07-2.14a.97.97 0 0 0-.32-.68A11.39 11.389 0 0 1 .002 11.64Zm8.32-2.19-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 0 0-2.61.48Z"/>
          </svg>
        </a>
        {/* Instagram */}
        <a 
          href="https://www.facebook.com/profile.php?id=61584575767990" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#EEC5EF] via-[#8AABF2] to-[#9DE4F0] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-[#EEC5EF]/30" 
          aria-label="Instagram"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 2.982c2.937 0 3.285.011 4.445.064 1.072.049 1.655.228 2.042.379.514.2.88.438 1.265.823.385.385.623.751.823 1.265.151.387.33.97.379 2.042.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445c-.049 1.072-.228 1.655-.379 2.042-.2.514-.438.88-.823 1.265a3.398 3.398 0 0 1-1.265.823c-.387.151-.97.33-2.042.379-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064c-1.072-.049-1.655-.228-2.042-.379a3.398 3.398 0 0 1-1.265-.823 3.398 3.398 0 0 1-.823-1.265c-.151-.387-.33-.97-.379-2.042-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445c.049-1.072.228-1.655.379-2.042.2-.514.438-.88.823-1.265a3.398 3.398 0 0 1 1.265-.823c.387-.151.97-.33 2.042-.379 1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066-1.171.054-1.97.24-2.67.512a5.392 5.392 0 0 0-1.949 1.268 5.392 5.392 0 0 0-1.269 1.949c-.271.7-.457 1.499-.511 2.67C1.013 8.638 1 9.013 1 12s.013 3.362.066 4.535c.054 1.171.24 1.97.511 2.67a5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269c.7.271 1.499.457 2.67.511C8.638 22.987 9.013 23 12 23s3.362-.013 4.535-.066c1.171-.054 1.97-.24 2.67-.511a5.392 5.392 0 0 0 1.949-1.269 5.392 5.392 0 0 0 1.269-1.949c.271-.7.457-1.499.511-2.67.053-1.173.066-1.548.066-4.535s-.013-3.362-.066-4.535c-.054-1.171-.24-1.97-.511-2.67a5.392 5.392 0 0 0-1.269-1.949 5.392 5.392 0 0 0-1.949-1.268c-.7-.272-1.499-.458-2.67-.512C15.362 1.013 14.987 1 12 1Zm0 5.351a5.649 5.649 0 1 0 0 11.298 5.649 5.649 0 0 0 0-11.298Zm0 9.316a3.667 3.667 0 1 1 0-7.334 3.667 3.667 0 0 1 0 7.334Zm7.192-9.539a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
