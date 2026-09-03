import React from 'react';
import { RestaurantProfile } from '../types';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialsSectionProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  profile,
  language,
}) => {
  return (
    <section id="reviews" aria-label="Müşteri Yorumları ve İncelemeler" className="py-24 bg-[#0a0a0c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {language === 'tr' ? 'Misafirlerimizin' : 'Praise from'}{' '}
              <span className="block italic text-zinc-200 font-serif-luxury mt-1">
                {language === 'tr' ? 'Övgüleri' : 'Our Patrons'}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              {language === 'tr'
                ? 'Gerçek sesler, samimi övgüler. Masalarımızda paylaşılan unutulmaz anların tanıklıkları.'
                : 'Real voices. Honest praise. Unforgettable moments shared at our table.'}
            </p>
          </div>
        </div>

        {/* 3 Testimonial Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="bg-[#121216] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 shadow-xl group"
            >
              <div>
                {/* Author Info: Avatar + Name + Title */}
                <div className="flex items-center gap-3.5 mb-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700 group-hover:border-orange-500/60 transition-colors"
                  />
                  <div>
                    <h4 className="text-base font-semibold text-white font-serif-luxury group-hover:text-orange-300 transition-colors">
                      {t.name}
                    </h4>
                    <span className="text-xs text-zinc-400 block font-sans-ui">
                      {language === 'tr' ? t.turkishRole : t.role}
                    </span>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Review Quote */}
                <p className="text-zinc-300 text-sm leading-relaxed font-light italic">
                  "{language === 'tr' ? t.turkishComment : t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                <span>{language === 'tr' ? 'Doğrulanmış Rezervasyon' : 'Verified Diner'}</span>
                <Quote className="w-4 h-4 text-zinc-700 group-hover:text-orange-500/50 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation Arrows matching screenshot */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t border-zinc-800/80">
          <button
            id="prev-testimonial-btn"
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs text-zinc-500">
            {language === 'tr' ? '1.200+ Beş Yıldızlı Google & Tripadvisor Değerlendirmesi' : '1,200+ Five Star Dining Reviews'}
          </span>

          <button
            id="next-testimonial-btn"
            className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
