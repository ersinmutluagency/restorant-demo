import React, { useState } from 'react';
import { MenuItem, RestaurantProfile } from '../types';
import { Heart, Star, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Plus, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onDishSelect: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
  onOpenFullMenu: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  profile,
  language,
  onDishSelect,
  onAddToCart,
  onOpenFullMenu,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [startIndex, setStartIndex] = useState<number>(0);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter items based on active category
  const filteredDishes = profile.allMenu.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Cycle navigation
  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % filteredDishes.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + filteredDishes.length) % filteredDishes.length);
  };

  // Reorder dishes for sliding window view
  const visibleDishes = filteredDishes.length <= 3 
    ? filteredDishes 
    : [
        filteredDishes[startIndex % filteredDishes.length],
        filteredDishes[(startIndex + 1) % filteredDishes.length],
        filteredDishes[(startIndex + 2) % filteredDishes.length],
      ].filter(Boolean);

  return (
    <section id="menu" aria-label="Öne Çıkan Restoran Menüsü" className="py-24 bg-[#0a0a0c] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching reference screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {language === 'tr' ? 'Mutfak Sanatımızın' : 'Indulge in'}{' '}
              <span className="block italic text-zinc-100 font-serif-luxury mt-1">
                {language === 'tr' ? 'Seçkin Tatları' : 'Culinary Artistry'}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              {language === 'tr'
                ? 'Dünya standartlarında ustalık, taze yerel malzemeler ve benzersiz lezzet dokunuşlarıyla hazırlanan seçkilerimiz.'
                : 'Explore our finest selections, crafted to perfection by world-class chefs.'}
            </p>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 no-scrollbar">
          {profile.categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setStartIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-zinc-800 text-white border border-[#ea580c] shadow-lg shadow-orange-950/40'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {cat.name}
            </button>
          ))}

          <button
            onClick={onOpenFullMenu}
            className="ml-auto px-4 py-2 rounded-full text-xs font-semibold text-[#ea580c] hover:text-orange-400 border border-orange-500/30 hover:border-orange-500/60 bg-orange-950/20 whitespace-nowrap transition-colors"
          >
            {language === 'tr' ? 'Tüm Dijital Menü (QR) ↗' : 'View Full QR Menu ↗'}
          </button>
        </div>

        {/* 3 Main Dish Cards matching screenshot (Top overlapping plate layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">
          <AnimatePresence mode="popLayout">
            {visibleDishes.map((dish, idx) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => onDishSelect(dish)}
                className="group relative bg-[#131317] border border-zinc-800/80 rounded-3xl pt-24 pb-6 px-6 flex flex-col justify-between hover:border-zinc-700 hover:bg-[#16161b] transition-all duration-300 shadow-xl cursor-pointer"
              >
                {/* Overlapping circular plate image matching screenshot */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 shadow-[0_12px_30px_rgba(0,0,0,0.85)] relative">
                    <img
                      src={dish.image}
                      alt={language === 'tr' ? dish.turkishName : dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:rotate-6 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/30 pointer-events-none" />
                  </div>

                  {dish.badge && (
                    <span className="absolute bottom-0 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ea580c] text-white shadow-md border border-black/40">
                      {dish.badge}
                    </span>
                  )}
                </div>

                {/* Dish Information */}
                <div className="text-center mt-6 space-y-2">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium group-hover:text-orange-400 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 px-2 font-light">
                    {language === 'tr' ? dish.turkishDescription : dish.description}
                  </p>
                </div>

                {/* Price & Favorite Row */}
                <div className="pt-5 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif-luxury font-bold text-white">
                      {dish.currency}{dish.price}
                    </span>
                    <span className="text-[11px] text-zinc-500">/ porsiyon</span>
                  </div>

                  {/* Heart Favorite Button */}
                  <button
                    id={`fav-btn-${dish.id}`}
                    onClick={(e) => toggleFavorite(dish.id, e)}
                    className="p-2 rounded-full text-zinc-400 hover:text-red-400 hover:bg-zinc-800/80 transition-colors"
                    aria-label="Add to favorites"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        favorites[dish.id] ? 'text-red-500 fill-red-500' : 'text-zinc-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Action Row: Orange "Order Now" Button & Star Rating */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    id={`order-dish-${dish.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(dish);
                    }}
                    className="inline-flex items-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md shadow-orange-950/40 transition-all transform hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <span>{language === 'tr' ? 'Sipariş Ver' : 'Order Now'}</span>
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-semibold bg-zinc-900/90 px-2.5 py-1.5 rounded-full border border-zinc-800">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{dish.rating.toFixed(1)}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Slider Arrows matching screenshot bottom */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t border-zinc-800/80">
          <button
            id="prev-menu-slide-btn"
            onClick={prevSlide}
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Previous dishes"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>{language === 'tr' ? 'Seçkin tabakları kaydırın' : 'Slide through signature dishes'}</span>
          </div>

          <button
            id="next-menu-slide-btn"
            onClick={nextSlide}
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Next dishes"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
