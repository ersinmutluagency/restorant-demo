import React, { useState } from 'react';
import { RestaurantProfile, MenuItem } from '../types';
import { X, Search, Star, ShoppingBag, ArrowUpRight, Flame } from 'lucide-react';

interface MenuDrawerModalProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
}

export const MenuDrawerModal: React.FC<MenuDrawerModalProps> = ({
  profile,
  language,
  isOpen,
  onClose,
  onSelectDish,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  if (!isOpen) return null;

  const filtered = profile.allMenu.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.turkishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121216] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[88vh] text-white">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between bg-[#16161b]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                {profile.brandName} {language === 'tr' ? 'Dijital Menü' : 'Digital Menu'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ea580c] text-white uppercase">
                QR Menü
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {language === 'tr' ? 'Masaya servis veya paket sipariş için seçim yapabilirsiniz.' : 'Explore our complete culinary catalog.'}
            </p>
          </div>

          <button
            id="close-menu-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category filter */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/80 bg-zinc-950/60 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'tr' ? 'Yemek, kebap veya tatlı ara...' : 'Search dishes, pasta, dessert...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ea580c]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {profile.categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === c.id
                    ? 'bg-[#ea580c] text-white shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dish List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-sm">
              {language === 'tr' ? 'Aradığınız kriterlere uygun yemek bulunamadı.' : 'No dishes match your search.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectDish(item)}
                  className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-4 flex gap-4 items-center transition-all cursor-pointer group"
                >
                  {/* Round Dish Plate Thumbnail */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-800 shrink-0 shadow-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-luxury font-bold text-white text-base group-hover:text-orange-400 transition-colors truncate">
                        {item.name}
                      </h4>
                      <span className="font-bold text-white text-sm shrink-0">
                        {item.currency}{item.price}
                      </span>
                    </div>

                    <span className="text-[11px] text-zinc-400 block truncate mt-0.5">
                      {language === 'tr' ? item.turkishDescription : item.description}
                    </span>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>

                      <button
                        id={`quick-add-menu-btn-${item.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(item);
                        }}
                        className="px-3 py-1 rounded-full bg-[#ea580c]/20 hover:bg-[#ea580c] text-orange-400 hover:text-white border border-[#ea580c]/40 text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>{language === 'tr' ? 'Ekle' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#16161b] border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>{filtered.length} {language === 'tr' ? 'lezzet listeleniyor' : 'dishes available'}</span>
          <a
            href={`tel:${profile.phone}`}
            className="text-white hover:text-orange-400 font-semibold flex items-center gap-1"
          >
            <span>{language === 'tr' ? 'Rezervasyon & Telefon:' : 'Phone:'} {profile.phone}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
