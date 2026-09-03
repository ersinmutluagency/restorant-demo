import React, { useState } from 'react';
import { ConceptType, MenuItem, ReservationData } from './types';
import { restaurantProfiles } from './data/restaurantData';
import { PitchDemoBanner } from './components/PitchDemoBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ServiceFeaturesSection } from './components/ServiceFeaturesSection';
import { DiningExperienceSection } from './components/DiningExperienceSection';
import { ChefsSection } from './components/ChefsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReservationSection } from './components/ReservationSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { MenuDrawerModal } from './components/MenuDrawerModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { ReservationSuccessModal } from './components/ReservationSuccessModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

export default function App() {
  const [currentConcept, setCurrentConcept] = useState<ConceptType>('finedining');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [reservationSuccessData, setReservationSuccessData] = useState<ReservationData | null>(null);

  const profile = restaurantProfiles[currentConcept] || restaurantProfiles.finedining;

  // Cart operations
  const handleAddToCart = (dish: MenuItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { dish, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.dish.id !== dishId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.dish.id === dishId ? { ...item, quantity } : item))
      );
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] font-sans-ui selection:bg-[#ea580c] selection:text-white flex flex-col">
      {/* 1. Seller Pitch Demo Customizer Banner */}
      <PitchDemoBanner
        currentConcept={currentConcept}
        onSelectConcept={setCurrentConcept}
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'))}
      />

      {/* 2. Main Navigation Bar */}
      <Navbar
        profile={profile}
        language={language}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenuModal={() => setIsMenuModalOpen(true)}
        onOpenReservationModal={scrollToReservation}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 3. Hero Section matching reference screenshot */}
        <HeroSection
          profile={profile}
          language={language}
          onReserveClick={scrollToReservation}
          onExploreDish={(dishName) => {
            const found = profile.allMenu.find((d) => d.name === dishName || d.turkishName === dishName) || profile.featuredDishes[0];
            setSelectedDish(found);
          }}
        />

        {/* 4. Section 2: Indulge in Culinary Artistry (Dishes cards with circular plates popping out) */}
        <MenuSection
          profile={profile}
          language={language}
          onDishSelect={(dish) => setSelectedDish(dish)}
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          onOpenFullMenu={() => setIsMenuModalOpen(true)}
        />

        {/* 5. Section 3: Serving You Better (6 feature grid + waitress collage) */}
        <ServiceFeaturesSection
          profile={profile}
          language={language}
          onBookTable={scrollToReservation}
        />

        {/* 6. Section 4: Luxury dining starts here (Multi-photo collage + copy) */}
        <DiningExperienceSection
          profile={profile}
          language={language}
          onBookTable={scrollToReservation}
        />

        {/* 7. Section 5: Crafted by Experts (3 Arch-top Chefs portraits) */}
        <ChefsSection
          profile={profile}
          language={language}
        />

        {/* 8. Section 6: Praise from Our Patrons (3 Testimonials with ratings) */}
        <TestimonialsSection
          profile={profile}
          language={language}
        />

        {/* 9. Section 7: Reserve Your Table (Full width section + floating card form) */}
        <ReservationSection
          profile={profile}
          language={language}
          onReservationSuccess={(data) => setReservationSuccessData(data)}
        />

        {/* 10. Section 8: Let Flavor Lead the Way (Dark slate CTA banner) */}
        <CallToActionBanner
          profile={profile}
          language={language}
          onBookTable={scrollToReservation}
        />
      </main>

      {/* 11. Footer matching reference screenshot */}
      <Footer
        profile={profile}
        language={language}
        onOpenMenu={() => setIsMenuModalOpen(true)}
        onBookTable={scrollToReservation}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsAppButton
        whatsappNumber={profile.whatsappNumber}
        brandName={profile.brandName}
        language={language}
      />

      {/* Modals & Slide-out Drawers */}
      <DishDetailModal
        dish={selectedDish}
        language={language}
        whatsappNumber={profile.whatsappNumber}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(dish, qty) => handleAddToCart(dish, qty)}
      />

      <MenuDrawerModal
        profile={profile}
        language={language}
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onSelectDish={(dish) => {
          setSelectedDish(dish);
          setIsMenuModalOpen(false);
        }}
        onAddToCart={(dish) => handleAddToCart(dish, 1)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        profile={profile}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      <ReservationSuccessModal
        data={reservationSuccessData}
        profile={profile}
        language={language}
        onClose={() => setReservationSuccessData(null)}
      />
    </div>
  );
}
