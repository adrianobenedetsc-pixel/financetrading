import { useState } from 'react';
import { usePrices } from '../hooks/usePrices';
import { Save, Bitcoin, DollarSign, RefreshCw, Clock } from 'lucide-react';

export default function Prices() {
  const { prices, updateBtcPrice, updateUsdBrl, hasPrices } = usePrices();
  
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [btcUsd, setBtcUsd] = useState(prices.btc.usd.toString());
  const [usdBrl, setUsdBrl] = useState(prices.usd.brl.toString());
  const [lastUpdate, setLastUpdate] = useState<string | null>(
    localStorage.getItem('trader_finance_last_update')
  );
  
  const [saved, setSaved] = useState(false);

  const handleUpdate = () => {
    updateBtcPrice(parseFloat(btcUsd) || 0, 0);
    updateUsdBrl(parseFloat(usdBrl) || 0);
    
    const now = new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setLastUpdate(now);
    localStorage.setItem('trader_finance_last_update', now);
    
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowUpdateForm(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Cotações</h1>
          <p className="text-apple-secondary mt-1">Atualize as cotações manualmente</p>
        </div>
      </div>

      {/* Última Atualização */}
      {lastUpdate && (
        <div className="bg-apple-card rounded-2xl border border-apple-border p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-apple-green/10 flex items-center justify-center">
              <Clock size={20} className="text-apple-green" />
            </div>
            <div>
              <p className="text-xs text-apple-secondary">Última atualização</p>
              <p className="text-sm font-semibold">{lastUpdate}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cotações Atuais */}
      {hasPrices && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bitcoin */}
          <div className="bg-apple-card rounded-2xl border border-apple-border p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-apple-orange/10 flex items-center justify-center">
                <Bitcoin size={28} className="text-apple-orange" />
              </div>
              <div>
                <p className="text-lg font-semibold">Bitcoin</p>
                <p className="text-sm text-apple-secondary">BTC / USD</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-apple-secondary mb-2">Cotação Atual</p>
              <p className="text-4xl font-bold tracking-tight">
                ${prices.btc.usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Câmbio */}
          <div className="bg-apple-card rounded-2xl border border-apple-border p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-apple-green/10 flex items-center justify-center">
                <DollarSign size={28} className="text-apple-green" />
              </div>
              <div>
                <p className="text-lg font-semibold">Câmbio</p>
                <p className="text-sm text-apple-secondary">USD ↔ BRL</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-apple-secondary mb-2">1 USD em BRL</p>
                <p className="text-4xl font-bold tracking-tight">
                  R$ {prices.usd.brl.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-apple-secondary mb-2">1 BRL em USD</p>
                <p className="text-2xl font-semibold text-apple-secondary">
                  ${prices.brl.usd.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Atualizar */}
      {!showUpdateForm ? (
        <button
          onClick={() => setShowUpdateForm(true)}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-apple-accent text-white rounded-2xl text-base font-medium hover:bg-apple-accent-hover transition-all mb-6"
        >
          <RefreshCw size={20} />
          Atualizar Cotações
        </button>
      ) : (
        <div className="bg-apple-card rounded-2xl border border-apple-accent/30 p-8 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Atualizar Cotações</h3>
              <p className="text-sm text-apple-secondary mt-1">Insira os valores atuais</p>
            </div>
            <button
              onClick={() => setShowUpdateForm(false)}
              className="text-apple-secondary hover:text-apple-text transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm text-apple-secondary mb-2 block font-medium">
                Bitcoin (USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={btcUsd}
                onChange={(e) => setBtcUsd(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-apple-border bg-apple-bg/50 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-apple-secondary mb-2 block font-medium">
                1 USD em BRL
              </label>
              <input
                type="number"
                step="0.0001"
                value={usdBrl}
                onChange={(e) => setUsdBrl(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-apple-border bg-apple-bg/50 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-apple-accent/20 focus:border-apple-accent transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-medium transition-all ${
              saved 
                ? 'bg-apple-green text-white' 
                : 'bg-apple-accent text-white hover:bg-apple-accent-hover'
            }`}
          >
            <Save size={18} />
            {saved ? 'Cotações Atualizadas!' : 'Salvar Cotações'}
          </button>
        </div>
      )}

      {/* Aviso se não tem cotações */}
      {!hasPrices && !showUpdateForm && (
        <div className="bg-apple-orange/10 border border-apple-orange/20 rounded-xl p-6 text-center">
          <p className="text-base text-apple-orange font-medium mb-2">
            ⚠️ Nenhuma cotação configurada
          </p>
          <p className="text-sm text-apple-secondary">
            Clique em "Atualizar Cotações" para começar
          </p>
        </div>
      )}

      {/* Info */}
      <div className="bg-apple-bg/50 rounded-xl p-5 mt-6">
        <p className="text-sm text-apple-secondary">
          💡 <strong>Dica:</strong> Atualize as cotações sempre que necessário. Os valores são salvos automaticamente e usados em todos os cálculos do sistema.
        </p>
      </div>
    </div>
  );
}
