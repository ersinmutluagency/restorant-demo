import React from 'react';
import { RestaurantProfile } from '../types';
import { ArrowUpRight, Star, ChefHat, Sparkles, Flame, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onReserveClick: () => void;
  onExploreDish: (dishName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  language,
  onReserveClick,
  onExploreDish,
}) => {
  const currentDishImage = profile.id === 'kebap' ? profile.featuredDishes[0]?.image : profile.featuredDishes[1]?.image || profile.allMenu[3]?.image;

  return (
    <section
      id="hero"
      aria-label="Restoran Karşılama Alanı"
      className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 lg:py-20"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-8 text-left z-10"
          >
            {/* Top Concept Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-orange-400">
              <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{profile.badgeText}</span>
            </div>

            {/* Main Headline matching reference */}
            <div className="relative">
              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-white font-normal">
                {profile.heroTitle1}{' '}
                <span className="block text-[#ea580c] font-serif-luxury italic font-medium mt-1">
                  {profile.heroTitleHighlight}
                </span>
              </h1>

              {/* Decorative curved hand-drawn arrow pointing to the dish on large screens */}
              <div className="hidden lg:block absolute -top-4 right-12 text-zinc-500 pointer-events-none select-none">
                <svg
                  width="110"
                  height="70"
                  viewBox="0 0 110 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-70 stroke-zinc-400"
                >
                  <path
                    d="M10 50 C 40 10, 80 15, 100 35"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <path
                    d="M93 25 L 102 36 L 88 38"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-zinc-400 font-light max-w-xl leading-relaxed">
              {profile.heroDescription}
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-reserve-btn"
                onClick={onReserveClick}
                className="inline-flex items-center justify-center gap-3 bg-[#ea580c] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-xl shadow-orange-950/50 hover:shadow-orange-700/30 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>{language === 'tr' ? 'Masa Ayırtın' : 'Reserve Your Table'}</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
                </div>
              </button>

              <a
                href="#menu"
                id="hero-explore-menu-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 hover:bg-zinc-800/60 transition-all"
              >
                <span>{language === 'tr' ? 'Menüyü İnceleyin' : 'Explore Menu'}</span>
              </a>
            </div>

            {/* 3 Bullets with Icons matching screenshot */}
            <div className="pt-6 space-y-4 border-t border-zinc-800/70 max-w-lg">
              {/* Item 1: Special Events */}
              <div className="flex items-start gap-3.5 group cursor-pointer" onClick={onReserveClick}>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-amber-400 group-hover:border-zinc-700 transition-colors shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {language === 'tr' ? 'Özel Davetler & Kutlamalar' : 'Special Events'}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {language === 'tr'
                      ? 'Özel günleriniz ve iş toplantılarınız için VIP salon & zengin menü'
                      : 'Let us bring luxury to your special event'}
                  </p>
                </div>
              </div>

              {/* Item 2: Chef's Experience */}
              <div className="flex items-start gap-3.5 group cursor-pointer" onClick={() => onExploreDish(profile.featuredDishes[0]?.name || '')}>
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-[#ea580c] group-hover:border-zinc-700 transition-colors shrink-0">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                    {language === 'tr' ? 'Şefin Tadım Deneyimi' : "Chef's Experience"}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {language === 'tr'
                      ? 'Mutfak sanatının ön sırasında eşsiz bir lezzet yolculuğu'
                      : 'Enjoy a front-row seat to culinary excellence'}
                  </p>
                </div>
              </div>

              {/* Item 3: Signature Hero Dish */}
              <div
                className="flex items-start gap-3.5 group cursor-pointer"
                onClick={() => onExploreDish(profile.heroDishName)}
              >
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-red-400 group-hover:border-zinc-700 transition-colors shrink-0">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                    {profile.heroDishName}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {profile.heroDishTag}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Round Dish matching reference screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Subtle glow behind the plate */}
            <div className="absolute inset-0 max-w-[440px] max-h-[440px] mx-auto bg-gradient-to-tr from-orange-600/20 to-amber-500/10 rounded-full blur-2xl -z-10" />

            <div className="relative w-72 sm:w-88 md:w-96 lg:w-[450px] aspect-square rounded-full p-2 group">
              {/* Spinning subtle circular border ring */}
              <div className="absolute inset-0 rounded-full border border-zinc-800/80 group-hover:border-orange-500/40 transition-colors duration-700" />

              {/* Main Food Image on Circular Plate */}
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full h-full rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-4 border-[#1c1c22] relative cursor-pointer"
                onClick={() => onExploreDish(profile.heroDishName)}
              >
                <img
                  src={currentDishImage}
                  alt={profile.heroDishName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle dark gradient overlay on image edge */}
                <div className="absolute inset-0 rounded-full bg-radial from-transparent via-transparent to-black/50 pointer-events-none" />
              </motion.div>

              {/* Floating Chef Recommendation Badge */}
              <div className="absolute bottom-6 -left-4 sm:left-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ea580c]/20 border border-[#ea580c]/40 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium block">
                    {language === 'tr' ? 'İmza Tabak' : 'Signature Plate'}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {profile.heroDishName}
                  </span>
                </div>
              </div>

              {/* Top rating badge */}
              <div className="absolute top-4 -right-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold text-white">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>5.0</span>
                <span className="text-zinc-500 font-normal">| Gurme</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
