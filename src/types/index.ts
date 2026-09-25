export type Currency = 'BRL' | 'USD' | 'BTC';

export interface Wallet {
  id: string;
  /** Os últimos 4 dígitos do endereço servem como nome da carteira */
  name: string;
  currency: Currency;
  balance: number;
  createdAt: string;
}

export type TransactionType = 'deposit' | 'withdraw' | 'swap' | 'transfer' | 'snapshot';

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description?: string;
  date: string;
  reversed?: boolean;
  reversedAt?: string;
  /** ID da transação original que esta transação reverte */
  reversalOf?: string;
}

export interface PortfolioSnapshot {
  id: string;
  date: string; // ISO timestamp
  totalUSD: number;
}

export interface Prices {
  btc: { usd: number; brl: number };
  brl: { usd: number };
  usd: { brl: number };
}

export interface AppData {
  wallets: Wallet[];
  transactions: Transaction[];
  snapshots: PortfolioSnapshot[];
  exportedAt: string;
  version: string;
}
