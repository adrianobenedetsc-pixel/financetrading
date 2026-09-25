import { useState, useMemo } from 'react';
import { useWallets } from '../store/useStore';
import { usePrices } from '../hooks/usePrices';
import { useSnapshots } from '../store/useStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';

function convertToUSD(currency: string, balance: number, prices: ReturnType<typeof usePrices>['prices']): number {
  switch (currency) {
    case 'BRL': return balance * prices.brl.usd;
    case 'USD': return balance;
    case 'BTC': return balance * prices.btc.usd;
    default: return 0;
  }
}

export default function Chart() {
  const { wallets } = useWallets();
  const { prices } = usePrices();
  const { snapshots, addSnapshot, deleteSnapshot, clearSnapshots } = useSnapshots();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const currentTotalUSD = useMemo(() => {
    return wallets.reduce((sum, w) => sum + convertToUSD(w.currency, w.balance, prices), 0);
  }, [wallets, prices]);

  const handleAddPoint = () => {
    addSnapshot(currentTotalUSD);
  };

  const chartData = useMemo(() => {
    return [...snapshots]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((s, idx) => ({
        date: new Date(s.date).toLocaleString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        value: s.totalUSD,
        fullDate: s.date,
        index: idx,
      }));
  }, [snapshots]);

  const minVal = chartData.length > 0 ? Math.min(...chartData.map(d => d.value)) : 0;
  const maxVal = chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 0;
  const padding = (maxVal - minVal) * 0.1 || 100;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Gráfico</h1>
          <p className="text-apple-secondary mt-1">Evolução do patrimônio em USD</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddPoint}
            disabled={wallets.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-apple-accent text-white rounded-xl text-sm font-medium hover:bg-apple-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Registrar Ponto
          </button>
        </div>
      </div>

      {/* Current Value & Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-apple-card rounded-2xl border border-apple-border p-5">
          <p className="text-xs text-apple-secondary mb-1">Patrimônio Atual</p>
          <p className="text-2xl font-semibold tracking-tight">
            ${currentTotalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-apple-card rounded-2xl border border-apple-border p-5">
          <p className="text-xs text-apple-secondary mb-1">Pontos Registrados</p>
          <p className="text-2xl font-semibold tracking-tight">{snapshots.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-apple-card rounded-2xl border border-apple-border p-6 mb-6">
        {chartData.length < 2 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-apple-accent/10 flex items-center justify-center mb-4">
              <Plus size={24} className="text-apple-accent" />
            </div>
            <p className="text-apple-secondary text-sm font-medium">
              {chartData.length === 0 ? 'Nenhum ponto registrado' : 'Registre mais um ponto para ver o gráfico'}
            </p>
            <p className="text-apple-secondary/60 text-xs mt-1 text-center max-w-xs">
              Clique em "Registrar Ponto" para capturar o valor atual do seu portfólio. Registre quantas vezes quiser.
            </p>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#86868b' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#86868b' }}
                  domain={[minVal - padding, maxVal + padding]}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    border: '1px solid #e8e8ed',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Valor']}
                  labelStyle={{ color: '#86868b', marginBottom: '4px' }}
                />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#0071e3"
                  strokeWidth={2}
                  dot={{ r: 5, fill: '#0071e3', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#0071e3', stroke: '#fff', strokeWidth: 2 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Points List */}
      {snapshots.length > 0 && (
        <div className="bg-apple-card rounded-2xl border border-apple-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Histórico de Pontos</h2>
            {showConfirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-apple-red">Confirmar exclusão?</span>
                <button onClick={clearSnapshots} className="text-xs px-3 py-1 bg-apple-red text-white rounded-lg">Sim</button>
                <button onClick={() => setShowConfirmClear(false)} className="text-xs px-3 py-1 bg-black/5 rounded-lg">Não</button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="text-xs text-apple-secondary hover:text-apple-red transition-colors"
              >
                Limpar tudo
              </button>
            )}
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {[...snapshots]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((snapshot) => (
                <div key={snapshot.id} className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-apple-bg/50 group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-apple-accent" />
                    <span className="text-sm font-medium">
                      {new Date(snapshot.date).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tabular-nums">
                      ${snapshot.totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => deleteSnapshot(snapshot.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-apple-secondary/50 hover:text-apple-red transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
