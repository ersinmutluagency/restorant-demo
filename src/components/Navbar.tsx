import React, { useState, useEffect } from 'react';
import { RestaurantProfile } from '../types';
import { ArrowUpRight, Menu as MenuIcon, X, ShoppingBag, PhoneCall, Calendar } from 'lucide-react';

interface NavbarProps {
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenuModal: () => void;
  onOpenReservationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  language,
  cartCount,
  onOpenCart,
  onOpenMenuModal,
  onOpenReservationModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: language === 'tr' ? 'Ana Sayfa' : 'Home', href: '#' },
    { name: language === 'tr' ? 'Menü' : 'Menu', href: '#menu' },
    { name: language === 'tr' ? 'Hakkımızda' : 'About Us', href: '#about' },
    { name: language === 'tr' ? 'Deneyim' : 'Gallery', href: '#experience' },
    { name: language === 'tr' ? 'Şefler' : 'Chefs', href: '#chefs' },
    { name: language === 'tr' ? 'Rezervasyon' : 'Reserve', href: '#reservation' },
    { name: language === 'tr' ? 'İletişim' : 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0c0e]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="group flex flex-col focus:outline-none" id="brand-logo-link">
          <span className="font-serif-luxury text-2xl sm:text-3xl tracking-tight text-white font-medium group-hover:text-[#ea580c] transition-colors">
            {profile.brandName}
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-sans-ui -mt-1 group-hover:text-zinc-300 transition-colors">
            {profile.subTitle}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 tracking-wide hover:underline underline-offset-8 decoration-[#ea580c] decoration-2"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center space-x-3">
          {/* Cart / Order trigger with count badge */}
          <button
            id="open-cart-btn"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors border border-transparent hover:border-zinc-700"
            title={language === 'tr' ? 'Sipariş Sepeti' : 'Order Basket'}
            aria-label="Sipariş Sepeti"
          >
            <ShoppingBag className="w-5 h-5 text-zinc-200" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ea580c] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0c0c0e]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Reserve Anchor Button */}
          <a
            href="#reservation"
            id="nav-quick-reserve-btn"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>{language === 'tr' ? 'Masa Ayırt' : 'Book Table'}</span>
          </a>

          {/* Primary Orange Order / Action Button matching reference screenshot */}
          <button
            id="nav-order-now-btn"
            onClick={onOpenMenuModal}
            className="inline-flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-orange-950/40 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>{language === 'tr' ? 'Sipariş Ver' : 'Order Now'}</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121216] border-b border-zinc-800 px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-200 hover:text-[#ea580c] py-2 border-b border-zinc-800/60"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMenuModal();
              }}
              className="w-full py-3 rounded-full bg-[#ea580c] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-900/30"
            >
              <span>{language === 'tr' ? 'Menüyü İncele & Sipariş Ver' : 'View Menu & Order'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${profile.phone}`}
              className="w-full py-2.5 rounded-full bg-zinc-800 text-zinc-300 font-medium text-center flex items-center justify-center gap-2 text-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{profile.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
