
import { ReactNode } from 'react';

export type SymbolId =
  | 'jackpot'
  | 'weekly_hookah'
  | 'cash_1m'
  | 'cash_500k'
  | 'hookah'
  | 'omelet'
  | 'sausage_egg'
  | 'coffee'
  | 'filler_teapot'
  | 'filler_dates'
  | 'filler_backgammon';

export interface SymbolDef {
  id: SymbolId;
  component: ReactNode;
  name: string;
}

export interface PrizeDef {
  id: string;
  name: string;
  combination: [SymbolId, SymbolId, SymbolId];
  component: ReactNode;
}
