import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Star, Clock, Flame, ShieldAlert, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';

interface DishDetailModalProps {
  dish: MenuItem | null;
  language: 'tr' | 'en';
  whatsappNumber: string;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  language,
  whatsappNumber,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!dish) return null;

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Merhaba! Web sitenizden sipariş vermek istiyorum:\n\n🍽️ Ürün: ${dish.name} (${dish.turkishName})\n🔢 Adet: ${quantity}\n💰 Tutar: ${dish.currency}${dish.price * quantity}\n\nLütfen siparişimi onaylar mısınız?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141418] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          id="close-dish-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Plate Image */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto -mt-2 mb-4">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-zinc-800 shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
            <img
              src={dish.image}
              alt={dish.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          {dish.badge && (
            <span className="absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-bold bg-[#ea580c] text-white shadow-lg">
              {dish.badge}
            </span>
          )}
        </div>

        {/* Dish Title & Price */}
        <div className="text-center space-y-1">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            {dish.name}
          </h3>
          <p className="text-sm text-orange-400 font-medium font-sans-ui">
            {dish.turkishName}
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
              {dish.currency}{dish.price}
            </span>
            <div className="flex items-center gap-1 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{dish.rating.toFixed(1)}</span>
              <span className="text-zinc-500 font-normal">({dish.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-300 text-center font-light mt-4 leading-relaxed">
          {language === 'tr' ? dish.turkishDescription : dish.description}
        </p>

        {/* Prep Time & Calories */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-zinc-800/80 text-xs">
          <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/60">
            <Clock className="w-4 h-4 text-[#ea580c]" />
            <div>
              <span className="block text-zinc-500">{language === 'tr' ? 'Hazırlanma' : 'Prep Time'}</span>
              <span className="font-medium text-zinc-200">{dish.prepTime || '15-20 dk'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/60">
            <Flame className="w-4 h-4 text-[#ea580c]" />
            <div>
              <span className="block text-zinc-500">{language === 'tr' ? 'Kalori Değeri' : 'Energy'}</span>
              <span className="font-medium text-zinc-200">{dish.calories || '580'} kcal</span>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        {dish.ingredients && dish.ingredients.length > 0 && (
          <div className="mt-4">
            <span className="text-xs text-zinc-400 font-semibold block mb-2">
              {language === 'tr' ? 'İçindekiler & Malzemeler' : 'Ingredients'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {dish.ingredients.map((ing, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 text-xs border border-zinc-800">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Allergens */}
        {dish.allergens && dish.allergens.length > 0 && (
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-300/80 bg-amber-950/20 p-2 rounded-xl border border-amber-800/30">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{language === 'tr' ? 'Alerjen Bildirimi: ' : 'Allergens: '}{dish.allergens.join(', ')}</span>
          </div>
        )}

        {/* Quantity & Actions */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400">
              {language === 'tr' ? 'Porsiyon Adedi' : 'Portion Quantity'}
            </span>
            
            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1">
              <button
                id="decrease-qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-white min-w-[20px] text-center">{quantity}</span>
              <button
                id="increase-qty-btn"
                onClick={() => setQuantity(quantity + 1)}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              id="add-to-cart-modal-btn"
              onClick={() => {
                onAddToCart(dish, quantity);
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {language === 'tr' ? 'Sepete Ekle' : 'Add to Cart'} ({dish.currency}{dish.price * quantity})
              </span>
            </button>

            <button
              id="whatsapp-order-modal-btn"
              onClick={handleWhatsAppOrder}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'tr' ? 'WhatsApp ile Sipariş' : 'Order via WhatsApp'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
