import React from 'react';
import { AppLanguage, NavigationTab } from '../types';

interface BottomNavBarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  elderMode?: boolean;
  appLanguage?: AppLanguage;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
  elderMode = false,
  appLanguage = 'es'
}) => {
  const isMixteco = appLanguage === 'mix';

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 bg-[#fcf9f3] border-t border-[#c1c8c2]/40 shadow-lg ${
        elderMode ? 'py-3 min-h-[68px]' : 'py-2 min-h-[58px]'
      }`}
    >
      {/* Tab 1: Chat / Tu'un */}
      <button
        type="button"
        onClick={() => onSelectTab('chat')}
        className={`flex flex-col items-center justify-center rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
          elderMode ? 'min-w-[96px] py-2 px-3.5 min-h-[56px]' : 'min-w-[76px] py-1.5 px-3 min-h-[46px]'
        } ${
          currentTab === 'chat'
            ? 'bg-[#fe7952] text-[#6c1900] shadow-xs'
            : 'text-[#424843] hover:bg-[#f0eee8]'
        }`}
        aria-label={isMixteco ? "Tu'un Raíz" : 'Compañero TecNM'}
      >
        <span
          className={`material-symbols-outlined ${elderMode ? 'text-[28px]' : 'text-[24px]'}`}
          style={currentTab === 'chat' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          chat
        </span>
        <span
          className={`${elderMode ? 'text-[15px] font-black' : 'text-[13px]'} mt-0.5 ${
            currentTab === 'chat' ? 'font-bold' : 'font-medium'
          }`}
        >
          {isMixteco ? "Tu'un" : 'Chat'}
        </span>
      </button>

      {/* Tab 2: Menú / Koto */}
      <button
        type="button"
        onClick={() => onSelectTab('menu')}
        className={`flex flex-col items-center justify-center rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
          elderMode ? 'min-w-[96px] py-2 px-3.5 min-h-[56px]' : 'min-w-[76px] py-1.5 px-3 min-h-[46px]'
        } ${
          currentTab === 'menu'
            ? 'bg-[#fe7952] text-[#6c1900] shadow-xs'
            : 'text-[#424843] hover:bg-[#f0eee8]'
        }`}
        aria-label={isMixteco ? 'Koto Menú' : 'Menú Principal'}
      >
        <span
          className={`material-symbols-outlined ${elderMode ? 'text-[28px]' : 'text-[24px]'}`}
          style={currentTab === 'menu' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          menu_book
        </span>
        <span
          className={`${elderMode ? 'text-[15px] font-black' : 'text-[13px]'} mt-0.5 ${
            currentTab === 'menu' ? 'font-bold' : 'font-medium'
          }`}
        >
          {isMixteco ? 'Koto' : 'Menú'}
        </span>
      </button>

      {/* Tab 3: Productos / Chichi */}
      <button
        type="button"
        onClick={() => onSelectTab('productos')}
        className={`flex flex-col items-center justify-center rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
          elderMode ? 'min-w-[96px] py-2 px-3.5 min-h-[56px]' : 'min-w-[76px] py-1.5 px-3 min-h-[46px]'
        } ${
          currentTab === 'productos'
            ? 'bg-[#fe7952] text-[#6c1900] shadow-xs'
            : 'text-[#424843] hover:bg-[#f0eee8]'
        }`}
        aria-label={isMixteco ? 'Chichi Tienda' : 'Tienda de Productos'}
      >
        <span
          className={`material-symbols-outlined ${elderMode ? 'text-[28px]' : 'text-[24px]'}`}
          style={currentTab === 'productos' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          storefront
        </span>
        <span
          className={`${elderMode ? 'text-[15px] font-black' : 'text-[13px]'} mt-0.5 ${
            currentTab === 'productos' ? 'font-bold' : 'font-medium'
          }`}
        >
          {isMixteco ? 'Chichi' : 'Productos'}
        </span>
      </button>
    </nav>
  );
};
