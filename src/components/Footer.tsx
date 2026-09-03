import React from 'react';
import { RestaurantProfile } from '../types';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Globe } from 'lucide-react';

interface FooterProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onOpenMenu: () => void;
  onBookTable: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  language,
  onOpenMenu,
  onBookTable,
}) => {
  return (
    <footer id="contact" aria-label="Restoran İletişim ve Alt Bilgi" className="bg-[#08080a] text-zinc-400 pt-20 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-800/60">
          
          {/* Left Column (Brand + Socials) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-white tracking-tight block">
                {profile.brandName}
              </span>
              <p className="text-zinc-400 text-sm mt-2 font-light">
                {language === 'tr' ? 'Lezzetin Zarafetle Buluştuğu Yer' : 'Where Taste Meets Elegance'}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block">
                {language === 'tr' ? 'Bizi Takip Edin' : 'Visit Us'}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#ea580c] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#ea580c] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#ea580c] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Twitter X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#ea580c] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Google Reviews"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column (Links) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-lg text-white font-medium tracking-wide">
              {profile.brandName}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {language === 'tr' ? 'Ana Sayfa' : 'Home'}
                </a>
              </li>
              <li>
                <button onClick={onOpenMenu} className="hover:text-white transition-colors text-left">
                  {language === 'tr' ? 'Menümüz' : 'Our Menu'}
                </button>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  {language === 'tr' ? 'Tadım Deneyimi' : 'Tasting Experience'}
                </a>
              </li>
              <li>
                <button onClick={onBookTable} className="hover:text-white transition-colors text-left">
                  {language === 'tr' ? 'Masa Rezervasyonu' : 'Book a Table'}
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {language === 'tr' ? 'Özel Davet & Organizasyon' : 'Private Dining'}
                </a>
              </li>
              <li>
                <a href="#chefs" className="hover:text-white transition-colors">
                  {language === 'tr' ? 'Usta Şeflerimiz' : 'Our Chefs'}
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column (Connect With Us) matching screenshot */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif-luxury text-lg text-white font-medium tracking-wide">
              {language === 'tr' ? 'İletişim & Lokasyon' : 'Connect With Us'}
            </h4>
            
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ea580c] shrink-0 mt-1" />
                <span className="text-zinc-300 leading-snug">{profile.address}</span>
              </li>
              
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ea580c] shrink-0" />
                <a href={`tel:${profile.phone}`} className="text-zinc-300 hover:text-white transition-colors">
                  {profile.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ea580c] shrink-0" />
                <a href="mailto:rezervasyon@restoran.com" className="text-zinc-300 hover:text-white transition-colors">
                  rezervasyon@{profile.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#ea580c] shrink-0" />
                <span className="text-zinc-300">{profile.workingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 {profile.brandName} Restaurant. {language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              {language === 'tr' ? 'Şartlar & Koşullar' : 'Terms & Conditions'}
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              {language === 'tr' ? 'KVKK ve Erişilebilirlik' : 'Accessibility'}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
