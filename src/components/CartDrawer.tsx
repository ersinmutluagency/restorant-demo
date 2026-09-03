import React, { useState } from 'react';
import { MenuItem, RestaurantProfile } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, CheckCircle, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  profile: RestaurantProfile;
  language: 'tr' | 'en';
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  profile,
  language,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'table'>('table');
  const [tableNumber, setTableNumber] = useState('12');
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const currency = cart[0]?.dish.currency || '₺';

  const handleWhatsAppOrder = () => {
    let text = `*Yeni Sipariş (${profile.brandName})*\n`;
    text += `*Tarih:* ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}\n`;
    text += `*Müşteri:* ${customerName || 'Misafir'}\n`;
    text += orderType === 'table' ? `*Masa No:* ${tableNumber}\n` : `*Adres:* ${address || 'Paket Servis Adresi'}\n`;
    text += `--------------------------\n`;
    cart.forEach((item) => {
      text += `• ${item.quantity}x ${item.dish.name} (${item.dish.currency}${item.dish.price * item.quantity})\n`;
    });
    text += `--------------------------\n`;
    text += `*TOPLAM:* ${currency}${total}\n\n`;
    text += `Lütfen siparişimi hazırlar mısınız?`;

    window.open(`https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDirectOrder = () => {
    setIsOrderPlaced(true);
    try {
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    } catch {
      // safe
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141418] border-l border-zinc-800 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between bg-[#18181e]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#ea580c]" />
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {language === 'tr' ? 'Sipariş Sepetiniz' : 'Your Order Basket'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isOrderPlaced ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-2xl text-white font-bold">
                  {language === 'tr' ? 'Siparişiniz Alındı!' : 'Order Placed!'}
                </h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  {language === 'tr'
                    ? 'Siparişiniz mutfağa iletildi. Şeflerimiz hemen hazırlamaya başlıyor.'
                    : 'Your order was submitted directly to the kitchen. Thank you!'}
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{language === 'tr' ? 'WhatsApp’tan Durumu Sor' : 'Check via WhatsApp'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsOrderPlaced(false);
                      onClearCart();
                      onClose();
                    }}
                    className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
                  >
                    {language === 'tr' ? 'Kapat' : 'Close'}
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-zinc-500">
                <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-zinc-600" />
                <p className="text-sm font-medium">
                  {language === 'tr' ? 'Sepetiniz henüz boş.' : 'Your basket is empty.'}
                </p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  {language === 'tr'
                    ? 'Menüden beğendiğiniz nefis lezzetleri sepete ekleyerek sipariş verebilirsiniz.'
                    : 'Explore the menu and add your favorite dishes.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.dish.id}
                    className="flex items-center gap-3.5 bg-zinc-900/70 p-3 rounded-2xl border border-zinc-800"
                  >
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-zinc-700 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.dish.name}
                      </h4>
                      <span className="text-xs text-[#ea580c] font-bold">
                        {item.dish.currency}{item.dish.price * item.quantity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white min-w-[14px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                        className="text-zinc-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Delivery or Table Selector */}
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800 text-xs">
                    <button
                      onClick={() => setOrderType('table')}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                        orderType === 'table' ? 'bg-[#ea580c] text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {language === 'tr' ? 'Masaya Servis' : 'Dine-In (Table)'}
                    </button>
                    <button
                      onClick={() => setOrderType('delivery')}
                      className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                        orderType === 'delivery' ? 'bg-[#ea580c] text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {language === 'tr' ? 'Paket Servis / Gel-Al' : 'Takeaway / Delivery'}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder={language === 'tr' ? 'Adınız Soyadınız' : 'Your Full Name'}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ea580c]"
                    />

                    {orderType === 'table' ? (
                      <input
                        type="text"
                        placeholder={language === 'tr' ? 'Masa Numarası (Örn: Masa 7)' : 'Table Number (e.g. 7)'}
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ea580c]"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={language === 'tr' ? 'Teslimat Adresi veya Gel-Al Notu' : 'Delivery Address'}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ea580c]"
                      />
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {!isOrderPlaced && cart.length > 0 && (
            <div className="p-6 bg-[#18181e] border-t border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">{language === 'tr' ? 'Ara Toplam' : 'Subtotal'}</span>
                <span className="text-xl font-serif-luxury font-bold text-white">
                  {currency}{total}
                </span>
              </div>

              <div className="space-y-2">
                {/* WhatsApp Direct Order Button (Extremely attractive for Turkish businesses) */}
                <button
                  id="cart-whatsapp-checkout-btn"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'tr' ? 'WhatsApp ile Siparişi Gönder' : 'Submit via WhatsApp'}</span>
                </button>

                {/* Direct Order Confirm Button */}
                <button
                  id="cart-direct-checkout-btn"
                  onClick={handleDirectOrder}
                  className="w-full py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{language === 'tr' ? 'Siparişi Mutfağa İlet' : 'Send to Kitchen'}</span>
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center">
                {language === 'tr' ? 'Komisyonsuz doğrudan işletme siparişi.' : 'Direct order with no hidden fees.'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
