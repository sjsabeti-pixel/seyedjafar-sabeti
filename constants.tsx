import React from 'react';
import { SymbolDef, PrizeDef, SymbolId } from './types';

const LOGO_BASE64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAgACADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAEFBv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAYgCoKKIoigAAAAAigAAigAAAAACKACKCKCKIoigAAA//xAAZEAEBAQADAAAAAAAAAAAAAAABAgADEQT/2gAIAQEAAQUC0U5L4T3//xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAEDAQE/AQ//xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAECAQE/AQ//xAAdEAACAQQDAAAAAAAAAAAAAAAAASECABESIzFR/9oACAEBAAY/AqNiJbLHIeV//8QAGhABAQEAAwEAAAAAAAAAAAAAAQARITFBUf/aAAgBAQABPyHaHOfcFrALZ3gnUV//2gAMAwEAAgADAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAwEBPxAn/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAIAQIBAT8QJ//EABsQAQEBAQEAAwAAAAAAAAAAAAERACExQVFh/9oACAEBAAE/EF1AbAt8G2E7Yd5E48gI8VPT8Ptf/9k=';

// --- SVG Icons ---

const JackpotIcon = () => <img src={LOGO_BASE64} alt="جایزه ویژه" className="w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow(0 0 8px #facc15) contrast-125 brightness-125" />;
const HookahIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 20v-5h8v5h-8zM12 15V8m-4-2h8M12 8a4 4 0 100-8 4 4 0 000 8zM10 4h4"/></svg>;
const OmeletIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a4 4 0 00-4 4h8a4 4 0 00-4-4zM2 12h-2"/></svg>;
const SausageEggIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a4 4 0 11-8 0 4 4 0 018 0z"/><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2"/><path d="M18 12a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>;
const CoffeeIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 00-12 0v2a6 6 0 006 6h2a4 4 0 004-4v-4zM6 8V6a6 6 0 1112 0v2"/><path d="M15 18h.01"/></svg>;
const CashIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h-4M18 12h4"/></svg>;
const TeapotIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM20 12h-4M8 12H4M12 8V4M12 20v-4"/><path d="M18 18l-4-4-4 4"/></svg>;
const DatesIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M12 9v6m-6 0h12"/></svg>;
const BackgammonIcon = ({ className = "w-16 h-16" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 12h18M12 3v18"/><path d="m3 3 18 18M3 21 21 3"/></svg>;

// --- Symbol Definitions ---

export const SYMBOLS: SymbolDef[] = [
  { id: 'jackpot', name: 'جایزه ویژه', component: <JackpotIcon /> },
  { id: 'weekly_hookah', name: 'یک هفته قلیان رایگان', component: <div className="relative text-amber-300"><HookahIcon /><span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">۷</span></div> },
  { id: 'cash_1m', name: 'یک میلیون تومان', component: <div className="text-green-400"><CashIcon /></div> },
  { id: 'cash_500k', name: 'پانصد هزار تومان', component: <div className="text-green-500"><CashIcon className="w-14 h-14" /></div> },
  { id: 'hookah', name: 'قلیان رایگان', component: <div className="text-sky-400"><HookahIcon /></div> },
  { id: 'omelet', name: 'املت رایگان', component: <div className="text-yellow-400"><OmeletIcon /></div> },
  { id: 'sausage_egg', name: 'سوسیس تخم مرغ رایگان', component: <div className="text-orange-400"><SausageEggIcon /></div> },
  { id: 'coffee', name: 'قهوه رایگان', component: <div className="text-stone-400"><CoffeeIcon /></div> },
  { id: 'filler_teapot', name: 'قوری', component: <div className="text-gray-500"><TeapotIcon /></div> },
  { id: 'filler_dates', name: 'خرما', component: <div className="text-amber-700"><DatesIcon /></div> },
  { id: 'filler_backgammon', name: 'تخته نرد', component: <div className="text-gray-400"><BackgammonIcon /></div> },
];

export const SYMBOL_MAP = SYMBOLS.reduce((acc, symbol) => {
  acc[symbol.id] = symbol;
  return acc;
}, {} as Record<SymbolId, SymbolDef>);

// --- Prize Definitions ---

export const PRIZES: PrizeDef[] = [
  { id: 'p1', name: '۱۱۰ میلیون تومان جایزه ویژه', combination: ['jackpot', 'jackpot', 'jackpot'], component: SYMBOL_MAP['jackpot'].component },
  { id: 'p2', name: 'یک هفته قلیان رایگان', combination: ['weekly_hookah', 'weekly_hookah', 'weekly_hookah'], component: SYMBOL_MAP['weekly_hookah'].component },
  { id: 'p3', name: 'یک میلیون تومان وجه نقد', combination: ['cash_1m', 'cash_1m', 'cash_1m'], component: SYMBOL_MAP['cash_1m'].component },
  { id: 'p4', name: 'پانصد هزار تومان وجه نقد', combination: ['cash_500k', 'cash_500k', 'cash_500k'], component: SYMBOL_MAP['cash_500k'].component },
  { id: 'p5', name: 'قلیان رایگان', combination: ['hookah', 'hookah', 'hookah'], component: SYMBOL_MAP['hookah'].component },
  { id: 'p6', name: 'املت رایگان', combination: ['omelet', 'omelet', 'omelet'], component: SYMBOL_MAP['omelet'].component },
  { id: 'p7', name: 'سوسیس تخم مرغ رایگان', combination: ['sausage_egg', 'sausage_egg', 'sausage_egg'], component: SYMBOL_MAP['sausage_egg'].component },
  { id: 'p8', name: 'قهوه رایگان', combination: ['coffee', 'coffee', 'coffee'], component: SYMBOL_MAP['coffee'].component },
];