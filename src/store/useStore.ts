import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Wallet, Transaction, Currency, PortfolioSnapshot, TransactionType, AppData } from '../types';

const WALLETS_KEY = 'trader_finance_wallets';
const TRANSACTIONS_KEY = 'trader_finance_transactions';
const SNAPSHOTS_KEY = 'trader_finance_snapshots';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, payload: T): void {
  localStorage.setItem(key, JSON.stringify(payload));
}

export function useWallets() {
  const [wallets, setWallets] = useState<Wallet[]>(() => loadFromStorage(WALLETS_KEY, []));

  useEffect(() => {
    saveToStorage(WALLETS_KEY, wallets);
  }, [wallets]);

  const addWallet = useCallback((name: string, currency: Currency, balance: number) => {
    const newWallet: Wallet = {
      id: uuidv4(),
      name,
      currency,
      balance,
      createdAt: new Date().toISOString(),
    };
    setWallets(prev => [...prev, newWallet]);

    // Cria transação automática de depósito inicial
    const depositTx: Transaction = {
      id: uuidv4(),
      walletId: newWallet.id,
      type: 'deposit',
      amount: balance,
      currency,
      description: `Depósito inicial — carteira ••••${name}`,
      date: new Date().toISOString(),
    };
    const existing = loadFromStorage<Transaction[]>(TRANSACTIONS_KEY, []);
    saveToStorage(TRANSACTIONS_KEY, [depositTx, ...existing]);

    // Força re-render das transactions em outras partes do app
    window.dispatchEvent(new CustomEvent('trader-data-updated'));

    return newWallet;
  }, []);

  const updateWallet = useCallback((id: string, updates: Partial<Wallet>) => {
    setWallets(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  }, []);

  const deleteWallet = useCallback((id: string) => {
    setWallets(prev => prev.filter(w => w.id !== id));
  }, []);

  return { wallets, addWallet, updateWallet, deleteWallet };
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadFromStorage(TRANSACTIONS_KEY, []));

  useEffect(() => {
    saveToStorage(TRANSACTIONS_KEY, transactions);
  }, [transactions]);

  // Escuta eventos de atualização de dados
  useEffect(() => {
    const handler = () => {
      setTransactions(loadFromStorage<Transaction[]>(TRANSACTIONS_KEY, []));
    };
    window.addEventListener('trader-data-updated', handler);
    return () => window.removeEventListener('trader-data-updated', handler);
  }, []);

  const addTransaction = useCallback((walletId: string, type: TransactionType, amount: number, description?: string) => {
    const wallet = loadFromStorage<Wallet[]>(WALLETS_KEY, []);
    const w = wallet.find(w => w.id === walletId);
    const newTx: Transaction = {
      id: uuidv4(),
      walletId,
      type,
      amount,
      currency: w?.currency || 'BRL',
      description,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTx, ...prev]);
    return newTx;
  }, []);

  const reverseTransaction = useCallback((txId: string) => {
    const allTx = loadFromStorage<Transaction[]>(TRANSACTIONS_KEY, []);
    const original = allTx.find(t => t.id === txId);
    if (!original || original.reversed) return;

    const reverseType: TransactionType = 
      original.type === 'deposit' ? 'withdraw' :
      original.type === 'withdraw' ? 'deposit' :
      original.type === 'transfer' ? 'transfer' :
      original.type === 'swap' ? 'swap' : 'snapshot';

    const reversalTx: Transaction = {
      id: uuidv4(),
      walletId: original.walletId,
      type: reverseType,
      amount: original.amount,
      currency: original.currency,
      description: `Estorno de ${original.description || original.type}`,
      date: new Date().toISOString(),
      reversalOf: txId,
    };

    setTransactions(prev => {
      const updated = prev.map(t => 
        t.id === txId ? { ...t, reversed: true, reversedAt: new Date().toISOString() } : t
      );
      return [reversalTx, ...updated];
    });
  }, []);

  const deleteTransaction = useCallback((txId: string) => {
    setTransactions(prev => prev.filter(t => t.id !== txId));
  }, []);

  return { transactions, addTransaction, reverseTransaction, deleteTransaction };
}

export function useSnapshots() {
  const [snapshots, setSnapshots] = useState<PortfolioSnapshot[]>(() => loadFromStorage(SNAPSHOTS_KEY, []));

  useEffect(() => {
    saveToStorage(SNAPSHOTS_KEY, snapshots);
  }, [snapshots]);

  const addSnapshot = useCallback((totalUSD: number) => {
    const newSnapshot: PortfolioSnapshot = {
      id: uuidv4(),
      date: new Date().toISOString(),
      totalUSD,
    };
    setSnapshots(prev => [...prev, newSnapshot]);

    // Cria transação automática de snapshot
    const snapshotTx: Transaction = {
      id: uuidv4(),
      walletId: 'portfolio',
      type: 'snapshot',
      amount: totalUSD,
      currency: 'USD',
      description: `Registro de patrimônio — $${totalUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      date: new Date().toISOString(),
    };
    const existing = loadFromStorage<Transaction[]>(TRANSACTIONS_KEY, []);
    saveToStorage(TRANSACTIONS_KEY, [snapshotTx, ...existing]);

    window.dispatchEvent(new CustomEvent('trader-data-updated'));

    return newSnapshot;
  }, []);

  const deleteSnapshot = useCallback((id: string) => {
    setSnapshots(prev => prev.filter(s => s.id !== id));
  }, []);

  const clearSnapshots = useCallback(() => {
    setSnapshots([]);
  }, []);

  return { snapshots, addSnapshot, deleteSnapshot, clearSnapshots };
}

export function useData() {
  const exportData = (): AppData => {
    return {
      wallets: loadFromStorage<Wallet[]>(WALLETS_KEY, []),
      transactions: loadFromStorage<Transaction[]>(TRANSACTIONS_KEY, []),
      snapshots: loadFromStorage<PortfolioSnapshot[]>(SNAPSHOTS_KEY, []),
      exportedAt: new Date().toISOString(),
      version: '1.2',
    };
  };

  const downloadJSON = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `trader-finance-backup-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (json: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(json) as AppData;
      if (!data.wallets || !Array.isArray(data.wallets)) {
        return { success: false, message: 'Arquivo inválido: wallets ausente' };
      }
      saveToStorage(WALLETS_KEY, data.wallets);
      if (data.transactions) saveToStorage(TRANSACTIONS_KEY, data.transactions);
      if (data.snapshots) saveToStorage(SNAPSHOTS_KEY, data.snapshots);
      window.dispatchEvent(new CustomEvent('trader-data-updated'));
      window.location.reload();
      return { success: true, message: 'Dados importados com sucesso!' };
    } catch (err) {
      return { success: false, message: 'Erro ao ler arquivo JSON' };
    }
  };

  const clearAll = () => {
    localStorage.removeItem(WALLETS_KEY);
    localStorage.removeItem(TRANSACTIONS_KEY);
    localStorage.removeItem(SNAPSHOTS_KEY);
    window.location.reload();
  };

  const getStats = () => {
    const wallets = loadFromStorage<Wallet[]>(WALLETS_KEY, []);
    const transactions = loadFromStorage<Transaction[]>(TRANSACTIONS_KEY, []);
    const snapshots = loadFromStorage<PortfolioSnapshot[]>(SNAPSHOTS_KEY, []);
    const data = exportData();
    const size = new Blob([JSON.stringify(data)]).size;
    return {
      walletCount: wallets.length,
      transactionCount: transactions.length,
      snapshotCount: snapshots.length,
      dataSize: size,
    };
  };

  return { exportData, downloadJSON, importData, clearAll, getStats };
}
