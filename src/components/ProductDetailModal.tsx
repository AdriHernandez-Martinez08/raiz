import React, { useState } from 'react';
import { ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (item: {
    id: string;
    title: string;
    price: number;
    artisanName: string;
    location: string;
    imageUrl: string;
    quantity: number;
    unit: string;
  }) => void;
  onDirectContact: (artisanName: string, productTitle: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectContact
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      artisanName: product.artisanName,
      location: product.location,
      imageUrl: product.imageUrl,
      quantity,
      unit: 'pieza'
    });
    onClose();
  };

  const handleChat = () => {
    onDirectContact(product.artisanName, product.title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-[#fcf9f3] rounded-3xl overflow-hidden shadow-2xl border border-[#c1c8c2]/50 max-h-[92vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-64 w-full bg-[#f0eee8] overflow-hidden shrink-0">
          <img
            src={product.imageUrl}
            alt={product.imageAlt || product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all"
            aria-label="Cerrar detalle"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#a73918] text-white text-xs font-bold shadow-sm">
              {product.badge}
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[12px] uppercase font-bold text-[#c7ebd4] tracking-wider block">
              {product.craftType} · {product.category}
            </span>
            <h2 className="text-[20px] font-bold leading-tight mt-0.5">
              {product.title}
            </h2>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-[#1c1c18]">
          {/* Price and Artisan Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#c1c8c2]/30">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#ffdbd1] text-[#3b0900] flex items-center justify-center font-bold text-sm border-2 border-[#fe7952]">
                {product.artisanInitials}
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#032517] leading-tight">
                  {product.artisanName}
                </p>
                <p className="text-[12px] text-[#424843] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-[#a73918]">pin_drop</span>
                  {product.location}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#424843] block">Precio artesano</span>
              <span className="text-[22px] font-bold text-[#a73918] leading-none">
                ${product.price} <span className="text-[13px] font-normal text-[#424843]">MXN</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[13px] font-bold text-[#032517] uppercase tracking-wide mb-1">
              Descripción y Técnica de Origen
            </h3>
            <p className="text-[14px] text-[#424843] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Community & Ecological Guarantees */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-white p-3 rounded-xl border border-[#c1c8c2]/40 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#032517] font-bold text-[13px] mb-0.5">
                <span className="material-symbols-outlined text-[17px] text-[#a73918]">nature</span>
                Materiales
              </div>
              <p className="text-[12px] text-[#424843]">
                100% materias primas locales recolectadas de forma sustentable.
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#c1c8c2]/40 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#032517] font-bold text-[13px] mb-0.5">
                <span className="material-symbols-outlined text-[17px] text-[#032517]">verified_user</span>
                Trato Justo
              </div>
              <p className="text-[12px] text-[#424843]">
                Sin comisión intermediaria: 100% liquidación al taller familiar.
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-[#c1c8c2]/30">
            <span className="text-[13px] font-semibold text-[#032517]">
              Piezas a encargar:
            </span>
            <div className="flex items-center gap-3 bg-white border border-[#c1c8c2]/60 rounded-full px-3 py-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-[#a73918] hover:bg-[#f0eee8] rounded-full"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="text-[15px] font-bold text-[#032517] w-6 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-[#a73918] hover:bg-[#f0eee8] rounded-full"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-[#c1c8c2]/30 flex gap-2">
          <button
            type="button"
            onClick={handleChat}
            className="flex-1 h-12 rounded-full border-2 border-[#032517] text-[#032517] hover:bg-[#c7ebd4]/30 active:scale-98 transition-all font-bold text-[13px] flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Mensaje Directo</span>
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 h-12 rounded-full bg-[#a73918] hover:bg-[#6c1900] text-white active:scale-98 transition-all font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Añadir (${product.price * quantity} MXN)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
