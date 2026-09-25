import { useState } from 'react';
import { useWallets } from '../store/useStore';
import { usePrices } from '../hooks/usePrices';
import { Plus, Trash2, Wallet } from 'lucide-react';
import { Currency } from '../types';

const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: 'BRL', label: 'Real', symbol: 'R$' },
  { value: 'USD', label: 'Dólar', symbol: '$' },
  { value: 'BTC', label: 'Bitcoin', symbol: '₿' },
];

const CURRENCY_COLORS: Record<Currency, string> = {
  BRL: 'bg-apple-green',
  USD: 'bg-apple-accent',
  BTC: 'bg-apple-orange',
};

function convertToUSD(currency: string, balance: number, prices: ReturnType<typeof usePrices>['prices']): number {
  switch (currency) {
    case 'BRL': return balance * prices.brl.usd;
    case 'USD': return balance;
    case 'BTC': return balance * prices.btc.usd;
    default: return 0;
  }
}

function getSymbol(currency: Currency): string {
  return CURRENCIES.find(c => c.value === currency)?.symbol || '';
}

export default function Wallets() {
  const { wallets, addWallet, deleteWallet } = useWallets();
  const { prices } = usePrices();
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [last4, setLast4] = useState('');
  const [currency, setCurrency] = useState<Currency>('BRL');
  const [balance, setBalance] = useState('');

  const selectedCurrency = CURRENCIES.find(c => c.value === currency)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!last4 || last4.length !== 4 || !balance) return;
    addWallet(last4.toUpperCase(), currency, parseFloat(balance));
    setLast4('');
    setBalance('');
    setCurrency('BRL');
    setShowForm(false);
  };

  // Group wallets by currency
  const groupedWallets = CURRENCIES.map(c => ({
    ...c,
    wallets: wallets.filter(w => w.currency === c.value),
  })).filter(g => g.wallets.length > 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Carteiras</h1>
          <p className="text-apple-secondary mt-1">Gerencie suas wallets pelo endereço</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-apple-accent text-white rounded-xl text-sm font-medium hover:bg-apple-accent-hover transition-colors"
        >
          <Plus size={16} />
          Nova Carteira
        </button>
      </div>

      {/* Add Wallet Form */}
      {showForm && (
        <div className="bg-apple-card rounded-2xl border border-apple-border p-6 mb-6 animate-fade-in">
          <h3 className="text-base font-semibold mb-4">Adicionar Carteira</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-apple-secondary mb-1.5 block">
                  Últimos 4 dígitos do endereço
                </label>
                <input
                  type="text"
                  value={last4}
                  onChange={e => setLast4(e.target.value.replace(/[^a-fA-F0-9]/g, '').slice(0, 4))}
                  placeholder="A1B2"
                  maxLength={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-apple-border bg-apple-bg/50 text-sm focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all font-mono uppercase tracking-[0.3em] text-center text-lg"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-apple-secondary mb-1.5 block">Moeda</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value as Currency)}
                  className="w-full px-4 py-2.5 rounded-xl border border-apple-border bg-apple-bg/50 text-sm focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label} ({c.value})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-apple-secondary mb-1.5 block">
                  Saldo ({selectedCurrency.symbol} {selectedCurrency.value})
                </label>
                <input
                  type="number"
                  step="any"
                  value={balance}
                  onChange={e => setBalance(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-xl border border-apple-border bg-apple-bg/50 text-sm focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={last4.length !== 4}
                className="px-5 py-2.5 bg-apple-accent text-white rounded-xl text-sm font-medium hover:bg-apple-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 text-apple-secondary rounded-xl text-sm font-medium hover:bg-black/5 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Wallets List */}
      {wallets.length === 0 ? (
        <div className="bg-apple-card rounded-2xl border border-apple-border p-12 text-center">
          <Wallet size={40} className="mx-auto text-apple-secondary/30 mb-4" />
          <p className="text-apple-secondary text-sm font-medium">Nenhuma carteira cadastrada</p>
          <p className="text-apple-secondary/60 text-xs mt-1">Clique em "Nova Carteira" para começar</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedWallets.map(group => (
            <div key={group.value}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${CURRENCY_COLORS[group.value]}`} />
                <span className="text-xs font-medium text-apple-secondary uppercase tracking-wider">
                  {group.label} ({group.value})
                </span>
                <span className="text-xs text-apple-secondary/50">({group.wallets.length})</span>
              </div>
              <div className="space-y-2">
                {group.wallets.map(wallet => (
                  <div
                    key={wallet.id}
                    className="bg-apple-card rounded-xl border border-apple-border p-4 flex items-center justify-between group hover:border-apple-accent/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-lg font-semibold tracking-[0.2em] text-apple-text">
                        {wallet.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-sm font-semibold tabular-nums">
                          {getSymbol(wallet.currency)}{' '}
                          {wallet.balance.toLocaleString('pt-BR', {
                            maximumFractionDigits: wallet.currency === 'BRL' || wallet.currency === 'USD' ? 2 : 8,
                          })}{' '}
                          <span className="text-apple-secondary font-normal">{wallet.currency}</span>
                        </span>
                        <p className="text-xs text-apple-secondary tabular-nums">
                          ≈ ${convertToUSD(wallet.currency, wallet.balance, prices).toLocaleString('en-US', { maximumFractionDigits: 2 })} USD
                        </p>
                      </div>
                      <button
                        onClick={() => deleteWallet(wallet.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-apple-secondary/50 hover:text-apple-red hover:bg-apple-red/5 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
