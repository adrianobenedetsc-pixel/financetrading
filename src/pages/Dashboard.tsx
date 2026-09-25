import { useWallets } from '../store/useStore';
import { usePrices } from '../hooks/usePrices';
import { DollarSign, Bitcoin } from 'lucide-react';

function convertToUSD(currency: string, balance: number, prices: ReturnType<typeof usePrices>['prices']): number {
  switch (currency) {
    case 'BRL': return balance * prices.brl.usd;
    case 'USD': return balance;
    case 'BTC': return balance * prices.btc.usd;
    default: return 0;
  }
}

function convertToBRL(currency: string, balance: number, prices: ReturnType<typeof usePrices>['prices']): number {
  switch (currency) {
    case 'BRL': return balance;
    case 'USD': return balance * prices.usd.brl;
    case 'BTC': return balance * prices.btc.brl;
    default: return 0;
  }
}

function convertToBTC(currency: string, balance: number, prices: ReturnType<typeof usePrices>['prices']): number {
  switch (currency) {
    case 'BRL': return prices.btc.brl > 0 ? balance / prices.btc.brl : 0;
    case 'USD': return prices.btc.usd > 0 ? balance / prices.btc.usd : 0;
    case 'BTC': return balance;
    default: return 0;
  }
}

export default function Dashboard() {
  const { wallets } = useWallets();
  const { prices } = usePrices();

  const totalUSD = wallets.reduce((sum, w) => sum + convertToUSD(w.currency, w.balance, prices), 0);
  const totalBRL = wallets.reduce((sum, w) => sum + convertToBRL(w.currency, w.balance, prices), 0);
  const totalBTC = wallets.reduce((sum, w) => sum + convertToBTC(w.currency, w.balance, prices), 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Resumo</h1>
        <p className="text-apple-secondary mt-1">Visão geral do seu portfólio</p>
      </div>

      {/* Saldo Geral */}
      <div className="bg-apple-card rounded-2xl border border-apple-border p-8 mb-6">
        <h2 className="text-lg font-semibold mb-6">Saldo Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign size={16} className="text-apple-green" />
              <span className="text-xs font-medium text-apple-secondary uppercase tracking-wider">USD</span>
            </div>
            <p className="text-2xl font-semibold tracking-tight">
              ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center border-x border-apple-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign size={16} className="text-apple-green" />
              <span className="text-xs font-medium text-apple-secondary uppercase tracking-wider">BRL</span>
            </div>
            <p className="text-2xl font-semibold tracking-tight">
              R$ {totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bitcoin size={16} className="text-apple-orange" />
              <span className="text-xs font-medium text-apple-secondary uppercase tracking-wider">BTC</span>
            </div>
            <p className="text-2xl font-semibold tracking-tight">
              ₿ {totalBTC.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 })}
            </p>
          </div>
        </div>
      </div>

      {/* Total em USD - Caixa Grande */}
      <div className="bg-gradient-to-br from-apple-accent/5 to-apple-accent/10 rounded-2xl border border-apple-accent/20 p-10 text-center">
        <p className="text-sm font-medium text-apple-secondary uppercase tracking-wider mb-3">Patrimônio Total</p>
        <p className="text-5xl font-bold tracking-tight text-apple-accent">
          ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-apple-secondary mt-3">Valor total convertido para USD</p>
      </div>
    </div>
  );
}
