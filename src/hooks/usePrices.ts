import { useState, useEffect, useCallback } from 'react';
import { Prices } from '../types';

const PRICES_KEY = 'trader_finance_prices';

// Cotações padrão
const DEFAULT_PRICES: Prices = {
  btc: { usd: 0, brl: 0 },
  brl: { usd: 0 },
  usd: { brl: 0 },
};

function loadPrices(): Prices {
  try {
    const data = localStorage.getItem(PRICES_KEY);
    return data ? JSON.parse(data) : DEFAULT_PRICES;
  } catch {
    return DEFAULT_PRICES;
  }
}

function savePrices(prices: Prices): void {
  localStorage.setItem(PRICES_KEY, JSON.stringify(prices));
}

export function usePrices() {
  const [prices, setPrices] = useState<Prices>(loadPrices);

  useEffect(() => {
    savePrices(prices);
  }, [prices]);

  const updatePrices = useCallback((newPrices: Partial<Prices>) => {
    setPrices(prev => {
      const updated = { ...prev, ...newPrices };
      
      // Calcula automaticamente os inversos
      if (newPrices.usd?.brl) {
        updated.brl = { usd: 1 / newPrices.usd.brl };
      }
      if (newPrices.brl?.usd) {
        updated.usd = { brl: 1 / newPrices.brl.usd };
      }
      
      return updated;
    });
  }, []);

  const updateBtcPrice = useCallback((usd: number, brl: number) => {
    setPrices(prev => ({
      ...prev,
      btc: { usd, brl },
    }));
  }, []);

  const updateUsdBrl = useCallback((usdToBrl: number) => {
    setPrices(prev => ({
      ...prev,
      usd: { brl: usdToBrl },
      brl: { usd: usdToBrl > 0 ? 1 / usdToBrl : 0 },
    }));
  }, []);

  const hasPrices = prices.btc.usd > 0 || prices.usd.brl > 0;

  return { 
    prices, 
    loading: false, 
    error: null,
    updatePrices,
    updateBtcPrice,
    updateUsdBrl,
    hasPrices,
  };
}
