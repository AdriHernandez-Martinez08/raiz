import React, { useState } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  artisanName: string;
  location: string;
  imageUrl: string;
  quantity: number;
  unit: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onClearCart: () => void;
  onOrderConfirmed?: (summary: string) => void;
  onExploreProducts?: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onOrderConfirmed,
  onExploreProducts
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      const summaryText = items
        .map((it) => `${it.quantity}x ${it.title} ($${it.price * it.quantity} MXN - ${it.artisanName})`)
        .join(', ');
      onClearCart();
      setIsSuccess(false);
      onClose();
      if (onOrderConfirmed) {
        onOrderConfirmed(summaryText);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#fcf9f3] rounded-3xl overflow-hidden shadow-2xl border border-[#c1c8c2]/50 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#c1c8c2]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#032517]">local_mall</span>
            <h3 className="text-[18px] font-bold text-[#032517]">Bolsa de Compra Directa</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eee8] hover:bg-[#ebe8e2] active:scale-90 text-[#1c1c18] flex items-center justify-center cursor-pointer transition-all"
            aria-label="Cerrar bolsa de compra"
            title="Cerrar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {items.length === 0 ? (
            <div className="py-10 text-center text-[#424843] flex flex-col items-center">
              <span className="material-symbols-outlined text-[48px] text-[#c1c8c2] block mb-2">
                shopping_bag
              </span>
              <p className="text-[16px] font-bold text-[#032517]">Tu bolsa está vacía</p>
              <p className="text-[13px] mt-1 text-[#727973] max-w-xs leading-relaxed">
                Descubre café de altura, artesanías de palma, barro y textiles directos de la Mixteca.
              </p>
              {onExploreProducts && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="mt-4 px-5 py-2.5 bg-[#a73918] hover:bg-[#6c1900] text-white rounded-full font-bold text-[13px] flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  <span>Explorar Vitrina de Productos</span>
                </button>
              )}
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 border border-[#c1c8c2]/40 flex gap-3 shadow-2xs"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover bg-[#f0eee8] shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[14px] font-bold text-[#032517] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-[#424843]">
                      {item.artisanName} · {item.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[14px] font-bold text-[#a73918]">
                      ${item.price * item.quantity} MXN
                    </span>

                    <div className="flex items-center gap-2 bg-[#f0eee8] rounded-full px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity(item.id, item.quantity - 1);
                          } else {
                            onRemoveItem(item.id);
                          }
                        }}
                        className="text-[#032517] hover:text-[#a73918] font-bold text-[16px] px-1"
                      >
                        -
                      </button>
                      <span className="text-[12px] font-bold text-[#032517]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-[#032517] hover:text-[#a73918] font-bold text-[16px] px-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Fair trade pledge */}
          {items.length > 0 && (
            <div className="p-3 bg-[#f6f3ed] rounded-2xl border border-[#c1c8c2]/40 text-[12px] text-[#424843] flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#032517] mt-0.5">
                verified_user
              </span>
              <p>
                <strong>100% Pago Directo al Artesano/Productor:</strong> Esta plataforma comunitaria no retiene intermediación sobre el precio acordado.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#c1c8c2]/30 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[14px] font-medium text-[#424843]">Total de Comercio Justo:</span>
              <span className="text-[22px] font-bold text-[#032517]">${total} MXN</span>
            </div>

            <button
              type="button"
              disabled={isSuccess}
              onClick={handleCheckout}
              className="w-full h-12 bg-[#a73918] hover:bg-[#6c1900] text-white rounded-full font-bold text-[15px] flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
            >
              {isSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">
                    progress_activity
                  </span>
                  <span>Procesando pago directo...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">handshake</span>
                  <span>Confirmar y Enlazar Pedido</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
