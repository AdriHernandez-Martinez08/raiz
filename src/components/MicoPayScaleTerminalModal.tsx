import React, { useState } from 'react';

interface MicoPayScaleTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  elderMode?: boolean;
}

interface CommodityConfig {
  id: string;
  name: string;
  unit: string;
  defaultWeight: number;
  pricePerUnit: number;
  minGuardrail: number;
  producerDefault: string;
  community: string;
  icon: string;
}

const COMMODITIES: CommodityConfig[] = [
  {
    id: 'cafe_pergamino',
    name: 'Café Pergamino de Altura',
    unit: 'kg',
    defaultWeight: 125.4,
    pricePerUnit: 95.0,
    minGuardrail: 90.0,
    producerDefault: 'Don Aurelio Gómez',
    community: 'Magdalena Peñasco, Oax.',
    icon: '☕'
  },
  {
    id: 'miel_campanilla',
    name: 'Miel Virgen de Campanilla',
    unit: 'kg',
    defaultWeight: 42.0,
    pricePerUnit: 130.0,
    minGuardrail: 120.0,
    producerDefault: 'Comité Apícola Mixteco',
    community: 'San Mateo Peñasco, Oax.',
    icon: '🍯'
  },
  {
    id: 'mezcal_yautepec',
    name: 'Mezcal Puro de Maguey Espadín',
    unit: 'L',
    defaultWeight: 20.0,
    pricePerUnit: 320.0,
    minGuardrail: 280.0,
    producerDefault: 'Don Celso / David Mendoza',
    community: 'San Carlos Yautepec / Tlaxiaco',
    icon: '🍶'
  },
  {
    id: 'jitomate_invernadero',
    name: 'Jitomate de Invernadero',
    unit: 'kg',
    defaultWeight: 180.0,
    pricePerUnit: 26.0,
    minGuardrail: 22.0,
    producerDefault: 'Josué Gerardo Sanjuan',
    community: 'San Antonio Nduaxico, Oax.',
    icon: '🍅'
  },
  {
    id: 'textil_triqui',
    name: 'Huipil Tradicional en Telar',
    unit: 'pieza',
    defaultWeight: 1.0,
    pricePerUnit: 18000.0,
    minGuardrail: 17000.0,
    producerDefault: 'Doña Reyna (56a)',
    community: 'San José Xochixtlán, Oax.',
    icon: '🧵'
  }
];

export const MicoPayScaleTerminalModal: React.FC<MicoPayScaleTerminalModalProps> = ({
  isOpen,
  onClose,
  elderMode = false
}) => {
  const [selectedProduct, setSelectedProduct] = useState<CommodityConfig>(COMMODITIES[0]);
  const [currentWeight, setCurrentWeight] = useState<number>(COMMODITIES[0].defaultWeight);
  const [tareActive, setTareActive] = useState<boolean>(false);
  const [scaleConnected, setScaleConnected] = useState<boolean>(true);
  const [dispenseState, setDispenseState] = useState<'idle' | 'calibrating' | 'attesting' | 'dispensed'>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [attestationUid, setAttestationUid] = useState<string>('');

  if (!isOpen) return null;

  const effectiveWeight = tareActive ? Math.max(0, currentWeight - 2.5) : currentWeight;
  const grossAmount = effectiveWeight * selectedProduct.pricePerUnit;
  const tequioAmount = grossAmount * 0.02; // 2% Fondo de Tequio Comunal
  const netCashAmount = grossAmount - tequioAmount; // 98% Efectivo al campesino

  const calculateBanknotes = (amount: number) => {
    let rem = Math.floor(amount);
    const b500 = Math.floor(rem / 500);
    rem %= 500;
    const b200 = Math.floor(rem / 200);
    rem %= 200;
    const b100 = Math.floor(rem / 100);
    rem %= 100;
    const b50 = Math.floor(rem / 50);
    rem %= 50;
    const b20 = Math.floor(rem / 20);
    const coins = rem % 20 + (amount - Math.floor(amount));
    return { b500, b200, b100, b50, b20, coins: coins.toFixed(2) };
  };

  const banknotes = calculateBanknotes(netCashAmount);

  const handleProductChange = (prod: CommodityConfig) => {
    setSelectedProduct(prod);
    setCurrentWeight(prod.defaultWeight);
    setDispenseState('idle');
  };

  const handleTriggerDispense = () => {
    setDispenseState('calibrating');
    setTimeout(() => {
      setDispenseState('attesting');
      const mockUid = '0xATT_SCALE_' + Math.random().toString(16).slice(2, 10).toUpperCase();
      const mockTx = '0xSTELLAR_SOROBAN_' + Math.random().toString(16).slice(2, 14).toUpperCase();
      setAttestationUid(mockUid);
      setTxHash(mockTx);
      setTimeout(() => {
        setDispenseState('dispensed');
      }, 900);
    }, 800);
  };

  const handleReset = () => {
    setDispenseState('idle');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal de Báscula y Cajero MicoPay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div className="bg-[#121815] border-2 border-emerald-500/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-white my-auto flex flex-col">
        {/* Terminal Header */}
        <div className="bg-linear-to-r from-emerald-950 via-[#0a2318] to-neutral-950 px-4 py-3.5 border-b border-emerald-600/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 font-black text-xl shadow-inner">
              ⚖️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white tracking-wide">
                  Terminal Báscula MicoPay™
                </h3>
                <span className="bg-emerald-400 text-neutral-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  IoT Scale v2.4
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80 font-mono">
                Nodo Comunitario #SCALE-OAX-042 · Tlaxiaco / Magdalena Peñasco
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Cerrar terminal"
          >
            ✕
          </button>
        </div>

        {/* Status Bar */}
        <div className="bg-neutral-900/90 px-4 py-1.5 border-b border-neutral-800 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Celda de Carga Conectada
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">
              Riel: <strong className="text-amber-300">FairEscrow MicoPayScaleCash (1)</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setTareActive(!tareActive)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
              tareActive
                ? 'bg-amber-500 text-neutral-950 border-amber-400'
                : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            {tareActive ? 'Tara: -2.5 kg (Activa)' : 'Tarar Báscula (Tara)'}
          </button>
        </div>

        {/* Main Terminal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* 1. Selector de Producto / Cosecha */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              1. Seleccionar Producto en Báscula de Acopio:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {COMMODITIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleProductChange(c)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedProduct.id === c.id
                      ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-sm ring-1 ring-emerald-400/50'
                      : 'bg-neutral-900 border-neutral-800 text-gray-400 hover:border-neutral-600 hover:text-gray-200'
                  }`}
                >
                  <span className="text-xl mb-1">{c.icon}</span>
                  <div>
                    <div className="text-[11px] font-bold leading-tight truncate">{c.name}</div>
                    <div className="text-[10px] text-emerald-300 font-mono mt-0.5">
                      ${c.pricePerUnit} MXN/{c.unit}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Pantalla Digital de la Báscula (Display Fluorescente Industrial) */}
          <div className="bg-[#050a08] border-2 border-emerald-500/50 rounded-2xl p-4 shadow-inner relative overflow-hidden">
            <div className="absolute top-2 right-3 text-[10px] font-mono text-emerald-400/60 uppercase">
              Báscula Calibrada NOM-010-SCFI
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Peso Digital */}
              <div className="sm:col-span-2 space-y-1">
                <span className="text-[11px] font-mono text-emerald-400/80 uppercase tracking-widest block">
                  LECTURA DE PESO NETO
                </span>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                    {effectiveWeight.toFixed(2)}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-emerald-500">
                    {selectedProduct.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-gray-400">
                  <span>Productor:</span>
                  <span className="text-white font-bold">{selectedProduct.producerDefault}</span>
                  <span>·</span>
                  <span className="text-emerald-300">{selectedProduct.community}</span>
                </div>
              </div>

              {/* Ajuste Rápido de Peso */}
              <div className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800 space-y-2">
                <span className="text-[10px] font-mono text-gray-400 block">SIMULAR PESO (BULTOS):</span>
                <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
                  {[25, 50, 80, 120, 250, 500].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => {
                        setCurrentWeight(w);
                        setDispenseState('idle');
                      }}
                      className="py-1 px-1 rounded bg-neutral-800 hover:bg-neutral-700 text-emerald-300 font-bold text-center cursor-pointer border border-neutral-700"
                    >
                      {w} {selectedProduct.unit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Desglose Financiero Anti-Coyote y Tequio */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3.5 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between text-gray-400 text-[11px] pb-1 border-b border-neutral-800">
              <span>Concepto de Liquidación</span>
              <span>Monto en Pesos (MXN)</span>
            </div>

            <div className="flex items-center justify-between text-gray-300">
              <span>
                Subtotal Bruto ({effectiveWeight.toFixed(2)} {selectedProduct.unit} × ${selectedProduct.pricePerUnit} MXN)
              </span>
              <span className="font-bold text-white">${grossAmount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span>
            </div>

            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-1">
                <span>🏛️</span>
                <span>Fondo de Reserva Tequio Comunal (2.0%)</span>
              </span>
              <span>- ${tequioAmount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</span>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-sm sm:text-base font-extrabold text-amber-300">
              <span>TOTAL EFECTIVO A ENTREGAR (98% NETO):</span>
              <span className="text-xl sm:text-2xl text-emerald-400 drop-shadow-sm">
                ${netCashAmount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
              </span>
            </div>
          </div>

          {/* 4. Panel de Acción: Dispensación de Efectivo MicoPay */}
          {dispenseState === 'idle' && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleTriggerDispense}
                className="w-full py-4 px-5 rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:brightness-110 active:scale-[0.98] transition-all text-neutral-950 font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-950/50 cursor-pointer"
              >
                <span>💵</span>
                <span>DISPENSAR EFECTIVO EN MANO (MICOPAY)</span>
              </button>
              <p className="text-center text-[11px] text-gray-400">
                La báscula emitirá la atestación <code className="text-emerald-300">delivery_attestation_uid</code> en Soroban y liberará los billetes del fondo de liquidez comunal.
              </p>
            </div>
          )}

          {dispenseState === 'calibrating' && (
            <div className="bg-neutral-900 border border-amber-500/40 rounded-2xl p-5 text-center space-y-2 animate-pulse font-mono">
              <span className="text-2xl">⏳</span>
              <div className="text-sm font-bold text-amber-300">Fijando Peso de Tara y Firmando Celda de Carga...</div>
              <div className="text-[11px] text-gray-400">Verificando tolerancia ±0.05% y coordenadas GPS del centro de acopio</div>
            </div>
          )}

          {dispenseState === 'attesting' && (
            <div className="bg-neutral-900 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-2 animate-pulse font-mono">
              <span className="text-2xl">⚡</span>
              <div className="text-sm font-bold text-emerald-400">Ejecutando Smart Contract FairEscrow en Soroban...</div>
              <div className="text-[11px] text-gray-400">Transfiriendo USDC bloqueado hacia MicoPayTerminalAuthority</div>
            </div>
          )}

          {dispenseState === 'dispensed' && (
            <div className="space-y-4 animate-fade-in">
              {/* Ticket Térmico de Báscula */}
              <div className="bg-[#fffdf7] text-neutral-900 rounded-2xl p-4 sm:p-5 font-mono text-xs shadow-xl border border-amber-200/80 space-y-3">
                <div className="text-center border-b border-dashed border-neutral-300 pb-3">
                  <div className="font-black text-sm uppercase tracking-wider">MICOPAY TERMINAL ACREDITADA</div>
                  <div className="text-[10px] text-neutral-600">Alianza Open Hub TecNM · Red de Básculas Comunitarias</div>
                  <div className="text-[10px] text-neutral-500 mt-1">Folio Báscula: #REC-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>

                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Fecha / Hora:</span>
                    <span className="font-bold">{new Date().toLocaleString('es-MX')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Productor:</span>
                    <span className="font-bold">{selectedProduct.producerDefault}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Comunidad:</span>
                    <span>{selectedProduct.community}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Producto:</span>
                    <span className="font-bold">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Peso Neto Báscula:</span>
                    <span className="font-bold text-emerald-800">{effectiveWeight.toFixed(2)} {selectedProduct.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Precio FairTrade:</span>
                    <span>${selectedProduct.pricePerUnit} MXN/{selectedProduct.unit}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-neutral-300 pt-1 font-bold">
                    <span>Efectivo Entregado:</span>
                    <span className="text-sm font-black text-emerald-900">
                      ${netCashAmount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                    </span>
                  </div>
                </div>

                {/* Desglose de Billetes Físicos en Mano */}
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 text-[10px] space-y-1">
                  <span className="font-bold text-amber-950 block">💵 Desglose de Efectivo Entregado en Mano:</span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-center font-bold">
                    <div className="bg-white p-1 rounded border border-amber-200">
                      <div className="text-[9px] text-gray-500">$500</div>
                      <div className="text-emerald-700">{banknotes.b500} pcs</div>
                    </div>
                    <div className="bg-white p-1 rounded border border-amber-200">
                      <div className="text-[9px] text-gray-500">$200</div>
                      <div className="text-emerald-700">{banknotes.b200} pcs</div>
                    </div>
                    <div className="bg-white p-1 rounded border border-amber-200">
                      <div className="text-[9px] text-gray-500">$100</div>
                      <div className="text-emerald-700">{banknotes.b100} pcs</div>
                    </div>
                    <div className="bg-white p-1 rounded border border-amber-200">
                      <div className="text-[9px] text-gray-500">$50</div>
                      <div className="text-emerald-700">{banknotes.b50} pcs</div>
                    </div>
                    <div className="bg-white p-1 rounded border border-amber-200">
                      <div className="text-[9px] text-gray-500">$20</div>
                      <div className="text-emerald-700">{banknotes.b20} pcs</div>
                    </div>
                    <div className="bg-white p-1 rounded border border-amber-200">
                      <div className="text-[9px] text-gray-500">Monedas</div>
                      <div className="text-emerald-700">${banknotes.coins}</div>
                    </div>
                  </div>
                </div>

                {/* Sellos Criptográficos Soroban */}
                <div className="pt-2 border-t border-dashed border-neutral-300 text-[9px] text-neutral-500 space-y-0.5">
                  <div className="truncate">
                    <strong>Atestación Báscula:</strong> {attestationUid}
                  </div>
                  <div className="truncate">
                    <strong>Soroban Stellar Tx:</strong> {txHash}
                  </div>
                  <div className="text-center text-[10px] text-emerald-800 font-bold pt-1">
                    ✓ 100% Sin Comisiones Bancarias · Fondos Inmediatos
                  </div>
                </div>
              </div>

              {/* Botón Nueva Pesada */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors cursor-pointer border border-neutral-700 flex items-center justify-center gap-2"
                >
                  <span>🔄</span>
                  <span>Nueva Pesada en Báscula</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-black text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>🖨️</span>
                  <span>Imprimir Ticket Físico</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
