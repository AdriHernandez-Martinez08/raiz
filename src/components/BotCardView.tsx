import React, { useState } from 'react';
import { BotCardData, DigitalPassportLot, ScreenView } from '../types';

interface BotCardViewProps {
  card: BotCardData;
  onNavigateScreen: (screen: ScreenView) => void;
  onOpenDictamen?: () => void;
  onOpenLots?: () => void;
  onOpenPayments?: () => void;
  onOpenCart?: () => void;
  onAddToCart?: (item: any) => void;
  onSendChatMessage?: (text: string) => void;
  selectedLot?: DigitalPassportLot;
}

export const BotCardView: React.FC<BotCardViewProps> = ({
  card,
  onNavigateScreen,
  onOpenDictamen,
  onOpenLots,
  onOpenPayments,
  onOpenCart,
  onAddToCart,
  onSendChatMessage,
  selectedLot
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [stellarVerified, setStellarVerified] = useState<'idle' | 'checking' | 'verified'>('idle');
  const [addedToCart, setAddedToCart] = useState(false);

  const hashString = card.data?.hash || selectedLot?.hash || '0x8f3c4e204a9e527a98bc19d44e510f2c814407ab198762f0592';

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(hashString);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2200);
  };

  const handleVerifyStellar = () => {
    setStellarVerified('checking');
    setTimeout(() => {
      setStellarVerified('verified');
    }, 1200);
  };

  const handleQuickAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        id: card.data?.id || 'prod-4',
        title: card.data?.title || 'Café Arábica Pluma Típica (1kg)',
        price: card.data?.price || 240,
        artisanName: card.data?.artisanName || 'Coop. Yuu Savi',
        imageUrl:
          card.data?.imageUrl ||
          'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80',
        quantity: 1
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  // CARD 1: DICTAMEN NORMATIVO & STELLAR
  if (card.type === 'dictamen_stellar') {
    return (
      <div className="w-full bg-[#1b3b2b] text-white rounded-2xl p-4 shadow-md border border-[#c1c8c2]/30 flex flex-col gap-3 my-1">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[14px]">
              ⛓️
            </span>
            <div>
              <p className="text-[13px] font-extrabold tracking-wide uppercase text-emerald-400">
                Stellar Network • Notaría Inmutable
              </p>
              <h4 className="text-[15px] font-bold leading-tight">
                {card.title || 'Dictamen Agroecológico Mixteco'}
              </h4>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
            Ledger Testnet
          </span>
        </div>

        {/* Lab Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-xl p-2 border border-white/10">
            <span className="text-[10px] text-emerald-200 block uppercase font-medium">Humedad</span>
            <span className="text-[14px] font-bold text-white">11.4%</span>
            <span className="text-[9px] text-emerald-300 block">Óptimo</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2 border border-white/10">
            <span className="text-[10px] text-emerald-200 block uppercase font-medium">Broca / Def.</span>
            <span className="text-[14px] font-bold text-white">&lt; 1.2%</span>
            <span className="text-[9px] text-emerald-300 block">Exportación</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2 border border-white/10">
            <span className="text-[10px] text-emerald-200 block uppercase font-medium">Semilla</span>
            <span className="text-[14px] font-bold text-white">100% Nativa</span>
            <span className="text-[9px] text-emerald-300 block">Libre OGM</span>
          </div>
        </div>

        {/* Cryptographic Hash Details */}
        <div className="bg-black/30 rounded-xl p-2.5 border border-white/10 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#abcfb8]">
            <span className="font-mono">Firma SHA-256 en Stellar:</span>
            <button
              type="button"
              onClick={handleCopyHash}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copiedHash ? 'check' : 'content_copy'}
              </span>
              <span>{copiedHash ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
          <p className="font-mono text-[11px] text-emerald-100 break-all bg-black/40 p-1.5 rounded-lg border border-white/5">
            {hashString}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-emerald-200/80">
              Nodo: Raíz • Bloque #52,491,802
            </span>
            <button
              type="button"
              onClick={handleVerifyStellar}
              className="text-[10px] font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              {stellarVerified === 'idle' && 'Verificar en Horizon'}
              {stellarVerified === 'checking' && 'Consultando Ledger...'}
              {stellarVerified === 'verified' && '✓ Validado en Testnet'}
            </button>
          </div>
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={onOpenDictamen}
            className="w-full py-2 px-3 rounded-xl bg-white text-[#1b3b2b] hover:bg-[#f0eee8] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Ver Dictamen</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateScreen('pasaporte_digital')}
            className="w-full py-2 px-3 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Pasaporte Digital</span>
          </button>
        </div>
      </div>
    );
  }

  // CARD 2: REGISTRO DE COSECHA / LOTE
  if (card.type === 'lote_registro') {
    return (
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#c1c8c2]/60 flex flex-col gap-3 my-1">
        <div className="flex items-center justify-between border-b border-[#c1c8c2]/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#ffdbd1] text-[#a73918] flex items-center justify-center font-bold text-[16px]">
              ☕
            </span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#a73918]">
                Módulo Cosecha • Mini-Card
              </p>
              <h4 className="text-[15px] font-bold text-[#1c1c18] leading-tight">
                {card.title || 'Lote de Café Pergamino Lavado'}
              </h4>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-[#f0eee8] text-[#424843] px-2 py-0.5 rounded-full">
            Folio #884
          </span>
        </div>

        <div className="bg-[#fcf9f3] p-3 rounded-xl border border-[#c1c8c2]/40 text-[13px] flex flex-col gap-1.5">
          <div className="flex justify-between">
            <span className="text-[#727973]">Productor:</span>
            <span className="font-bold text-[#1c1c18]">Don Aurelio López B.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#727973]">Ubicación:</span>
            <span className="font-semibold text-[#1c1c18]">San Mateo Peñasco (1,750 msnm)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#727973]">Volumen Declarado:</span>
            <span className="font-bold text-[#a73918]">450 kg (9 bultos de 50 kg)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#727973]">Certificación:</span>
            <span className="font-semibold text-[#032517] inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
              Agroecológico Mixteco
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onNavigateScreen('catalogo_producto')}
            className="w-full py-2 px-3 rounded-xl bg-[#a73918] hover:bg-[#6c1900] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Nuevo Lote</span>
          </button>
          <button
            type="button"
            onClick={onOpenLots}
            className="w-full py-2 px-3 rounded-xl bg-white text-[#1c1c18] hover:bg-[#f0eee8] border border-[#c1c8c2]/60 text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            <span>Ver Mis Lotes</span>
          </button>
        </div>
      </div>
    );
  }

  // CARD 3: BILLETERA STELLAR & SALDO DE ACOPIO
  if (card.type === 'billetera_pago') {
    return (
      <div className="w-full bg-[#fcf9f3] rounded-2xl p-4 shadow-sm border border-[#c1c8c2]/60 flex flex-col gap-3 my-1">
        <div className="flex items-center justify-between border-b border-[#c1c8c2]/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#032517] text-white flex items-center justify-center font-bold text-[14px]">
              💳
            </span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#032517]">
                Billetera Comunitaria • Stellar
              </p>
              <h4 className="text-[15px] font-bold text-[#1c1c18] leading-tight">
                Saldo Acumulado en Acopio
              </h4>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
            ● Activa
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#c1c8c2]/40">
          <span className="text-[12px] text-[#727973] block">Saldo Disponible para Cobro:</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-[24px] font-black text-[#032517] tracking-tight">
              $38,250.00 <span className="text-[13px] font-semibold text-[#424843]">MXN</span>
            </span>
            <span className="text-[12px] font-mono text-[#727973] bg-[#f0eee8] px-2 py-0.5 rounded-md">
              ≈ 1,912.50 USDC
            </span>
          </div>

          <div className="mt-2 pt-2 border-t border-[#c1c8c2]/20 flex items-center justify-between text-[11px] text-[#424843]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">lock_clock</span>
              Contrato Escrow Soroban: Activo
            </span>
            <span className="text-[#727973]">Retiro en: Tlaxiaco</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              if (onSendChatMessage) {
                onSendChatMessage(
                  'Solicito formalmente el retiro de mis $38,250.00 MXN en efectivo en el centro de acopio de Tlaxiaco.'
                );
              }
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#032517] hover:bg-[#1b3b2b] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span>Pedir Retiro</span>
          </button>
          <button
            type="button"
            onClick={onOpenPayments}
            className="w-full py-2 px-3 rounded-xl bg-white text-[#1c1c18] hover:bg-[#f0eee8] border border-[#c1c8c2]/60 text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
            <span>Ver Recibos</span>
          </button>
        </div>
      </div>
    );
  }

  // CARD 4: PRODUCTO VITRINA CON ESCROW
  if (card.type === 'producto_vitrina') {
    const pTitle = card.data?.title || 'Café Arábica Pluma Típica (1kg)';
    const pPrice = card.data?.price || 240;
    const pArtisan = card.data?.artisanName || 'Coop. Yuu Savi';
    const pImg =
      card.data?.imageUrl ||
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=80';

    return (
      <div className="w-full bg-white rounded-2xl p-3.5 shadow-sm border border-[#c1c8c2]/60 flex flex-col gap-3 my-1">
        <div className="flex items-center justify-between border-b border-[#c1c8c2]/30 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px]">🛍️</span>
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#a73918]">
              Vitrina Mixteca • Compra Protegida
            </p>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            Escrow Stellar
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={pImg}
            alt={pTitle}
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#c1c8c2]/40"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-[14px] font-bold text-[#1c1c18] truncate">{pTitle}</h4>
            <p className="text-[12px] text-[#727973]">Por {pArtisan}</p>
            <p className="text-[16px] font-black text-[#a73918] mt-0.5">
              ${pPrice}{' '}
              <span className="text-[11px] font-semibold text-[#424843]">MXN / pieza</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2 px-3 rounded-xl bg-[#a73918] hover:bg-[#6c1900] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {addedToCart ? 'done' : 'shopping_bag'}
            </span>
            <span>{addedToCart ? '¡Agregado!' : 'Comprar'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateScreen('vitrina_productos')}
            className="w-full py-2 px-3 rounded-xl bg-[#f0eee8] hover:bg-[#e4e1d8] text-[#1c1c18] text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span>Ver Vitrina</span>
          </button>
        </div>
      </div>
    );
  }

  // CARD 5: TRAZABILIDAD PASAPORTE DIGITAL
  if (card.type === 'trazabilidad_pasaporte') {
    return (
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#c1c8c2]/60 flex flex-col gap-3 my-1">
        <div className="flex items-center justify-between border-b border-[#c1c8c2]/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#1b3b2b] text-white flex items-center justify-center font-bold text-[14px]">
              🏷️
            </span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#1b3b2b]">
                Pasaporte Digital • Trazabilidad
              </p>
              <h4 className="text-[15px] font-bold text-[#1c1c18]">Lote #884 • Origen Mixteco</h4>
            </div>
          </div>
          <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Verificado
          </span>
        </div>

        {/* Micro timeline */}
        <div className="space-y-2 py-1 text-[12px]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-[#1c1c18]">1. Cosecha selectiva</span>
            <span className="text-[#727973] ml-auto">San Mateo Peñasco</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-[#1c1c18]">2. Beneficio ecológico</span>
            <span className="text-[#727973] ml-auto">Fermentación 24h</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-semibold text-[#1c1c18]">3. Certificación de laboratorio</span>
            <span className="text-[#727973] ml-auto">Humedad 11.4%</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="font-semibold text-[#1c1c18]">4. Notarización Blockchain</span>
            <span className="text-[#727973] ml-auto font-mono">Stellar Hash</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateScreen('pasaporte_digital')}
          className="w-full py-2.5 px-3 rounded-xl bg-[#1b3b2b] hover:bg-[#032517] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
          <span>Abrir Pasaporte Completo</span>
        </button>
      </div>
    );
  }

  // CARD 7: AGENTE LOGÍSTICO Y COYOTE ALIADO
  if (card.type === 'logistica_coyote') {
    return (
      <div className="w-full bg-[#1b2a3b] text-white rounded-2xl p-4 shadow-md border border-cyan-500/30 flex flex-col gap-3 my-1">
        <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[18px]">
              🚚
            </span>
            <div>
              <p className="text-[11px] font-extrabold tracking-wide uppercase text-cyan-400">
                Logística Rural Inclusiva • Contrato Soroban
              </p>
              <h4 className="text-[15px] font-bold">
                {card.title || 'Transporte Comunitario y Cajero Móvil'}
              </h4>
            </div>
          </div>
          <span className="text-[11px] bg-cyan-950/80 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/40 font-bold">
            Escrow Activo
          </span>
        </div>

        <p className="text-[12px] text-cyan-100/90 leading-relaxed">
          El transportista local ya no fija precios arbitrarios ni especula. El flete y la recolección se garantizan mediante contrato inteligente y actúa como <strong>cajero móvil</strong> en la parcela.
        </p>

        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
            <span className="text-[10px] text-cyan-300 block uppercase font-medium">Ruta de Carga</span>
            <span className="text-[13px] font-bold text-white block mt-0.5">Yucuhiti ➔ Tlaxiaco</span>
            <span className="text-[10px] text-cyan-200">15 costales (675 kg café)</span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
            <span className="text-[10px] text-cyan-300 block uppercase font-medium">Flete Asegurado</span>
            <span className="text-[14px] font-extrabold text-emerald-400 block mt-0.5">$1,350 MXN</span>
            <span className="text-[10px] text-emerald-200">Tarifa fija $2.00 / kg</span>
          </div>
        </div>

        {/* Cajero Comunitario Móvil */}
        <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">💵</span>
            <div>
              <p className="text-[11px] font-bold text-cyan-200">Cajero Comunitario en Parcela</p>
              <p className="text-[10px] text-white/80">Efectivo disponible en camioneta: $8,500 MXN</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-500/40">
            1% Comisión
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSendChatMessage?.('Confirmar asignación de flete y recolección de 15 sacos con el transportista en Yucuhiti')}
            className="flex-1 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-[12px] font-bold transition-all active:scale-95 cursor-pointer shadow"
          >
            Aceptar Ruta de Carga
          </button>
          <button
            type="button"
            onClick={() => onSendChatMessage?.('Simular liquidación de efectivo en parcela con código QR MicoPay')}
            className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-200 text-[12px] font-semibold border border-white/15 transition-all cursor-pointer"
          >
            Cobrar en Efectivo QR
          </button>
        </div>
      </div>
    );
  }

  // CARD 8: REGALÍAS PERPETUAS Y MERCADO SECUNDARIO
  if (card.type === 'regalias_mercado') {
    return (
      <div className="w-full bg-[#3b1d28] text-white rounded-2xl p-4 shadow-md border border-rose-500/30 flex flex-col gap-3 my-1">
        <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-[18px]">
              💎
            </span>
            <div>
              <p className="text-[11px] font-extrabold tracking-wide uppercase text-rose-400">
                Regalías Perpetuas On-Chain • Soroban
              </p>
              <h4 className="text-[15px] font-bold">
                {card.title || 'Huipil Ceremonial de Algodón (Lote #88)'}
              </h4>
            </div>
          </div>
          <span className="text-[11px] bg-rose-950/80 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/40 font-bold">
            10% Regalía
          </span>
        </div>

        <p className="text-[12px] text-rose-100/90 leading-relaxed">
          Protección contra el despojo artesanal: Cada vez que esta pieza se revende en galerías o boutiques de México o el extranjero, el contrato transfiere automáticamente el 10% a la artesana original.
        </p>

        <div className="bg-black/25 rounded-xl p-3 border border-white/10 flex flex-col gap-2 text-[12px]">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Artesana Creadora:</span>
            <span className="font-bold text-white">Doña Carmen Bautista (San Juan Ñumí)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Venta Inicial (Tlaxiaco):</span>
            <span className="font-semibold text-rose-200">$2,000.00 MXN (100 USDC)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Reventa en Galería (Berlín):</span>
            <span className="font-extrabold text-amber-300">$10,000.00 MXN (500 USDC)</span>
          </div>
          <div className="border-t border-white/15 pt-2 flex items-center justify-between">
            <span className="font-bold text-emerald-400">Regalía Depositada a Doña Carmen:</span>
            <span className="text-[14px] font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/40">
              +$1,000.00 MXN (50 USDC)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-rose-200/80 bg-white/5 rounded-lg p-2">
          <span>Stellar Ledger #52,499,104</span>
          <span className="font-mono text-[10px] text-emerald-300">Hash: 0x3a9f...c281 ✓</span>
        </div>

        <button
          type="button"
          onClick={() => onSendChatMessage?.('Ver detalles del contrato inteligente Soroban de regalías perpetuas para artesanas')}
          className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[12px] font-bold transition-all active:scale-95 cursor-pointer shadow"
        >
          Consultar Historial de Regalías On-Chain
        </button>
      </div>
    );
  }

  // CARD 6: CONSOLA MULTIAGENTE
  return (
    <div className="w-full bg-[#032517] text-white rounded-2xl p-4 shadow-md border border-[#c1c8c2]/30 flex flex-col gap-3 my-1">
      <div className="flex items-center justify-between border-b border-white/15 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-[16px]">
            🌱
          </span>
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-emerald-300">
              Acompañamiento TecNM
            </p>
            <h4 className="text-[14px] font-bold">4 Módulos de Apoyo Comunitario</h4>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
          En línea
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[12px]">
        <button
          type="button"
          onClick={() => onSendChatMessage?.('¿Cuál es la asesoría sobre la calidad de la cosecha?')}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-left border border-white/10 transition-colors cursor-pointer"
        >
          <p className="font-bold text-emerald-300">🌿 Asesoría Agronómica</p>
          <p className="text-[11px] text-white/80 mt-0.5">Control de humedad y broca</p>
        </button>
        <button
          type="button"
          onClick={() => onSendChatMessage?.('Solicitar comprobante de certificación notarial Stellar')}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-left border border-white/10 transition-colors cursor-pointer"
        >
          <p className="font-bold text-emerald-300">⛓️ Certificación Notarial</p>
          <p className="text-[11px] text-white/80 mt-0.5">Notarización en blockchain</p>
        </button>
        <button
          type="button"
          onClick={() => onSendChatMessage?.('Consultar saldo con Tesorería y Fondos Comunitarios')}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-left border border-white/10 transition-colors cursor-pointer"
        >
          <p className="font-bold text-emerald-300">💰 Tesorería y Pagos</p>
          <p className="text-[11px] text-white/80 mt-0.5">Contratos Escrow y pagos</p>
        </button>
        <button
          type="button"
          onClick={() => onSendChatMessage?.('Ver ofertas en la Vitrina Comunitaria')}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-left border border-white/10 transition-colors cursor-pointer"
        >
          <p className="font-bold text-emerald-300">🛍️ Enlace Comercial</p>
          <p className="text-[11px] text-white/80 mt-0.5">Fletes y pedidos mayoreo</p>
        </button>
      </div>
    </div>
  );
};
