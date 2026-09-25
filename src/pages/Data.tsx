import { useState, useRef } from 'react';
import { useData } from '../store/useStore';
import { Download, Upload, Database, FileJson, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Data() {
  const { downloadJSON, importData, getStats } = useData();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = getStats();
  const hasData = stats.walletCount > 0 || stats.transactionCount > 0 || stats.snapshotCount > 0;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importData(content);
      setMessage({ type: result.success ? 'success' : 'error', text: result.message });
      setTimeout(() => setMessage(null), 5000);
    };
    reader.onerror = () => {
      setMessage({ type: 'error', text: 'Erro ao ler arquivo' });
      setTimeout(() => setMessage(null), 5000);
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyJSON = () => {
    const { exportData } = useData();
    const data = exportData();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setMessage({ type: 'success', text: 'JSON copiado para a área de transferência!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Dados</h1>
        <p className="text-apple-secondary mt-1">Backup, exportação e gerenciamento</p>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-fade-in ${
          message.type === 'success' 
            ? 'bg-apple-green/10 border border-apple-green/20 text-apple-green' 
            : 'bg-apple-red/10 border border-apple-red/20 text-apple-red'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      {/* Empty State */}
      {!hasData && (
        <div className="bg-apple-card rounded-2xl border border-apple-border p-12 text-center mb-6">
          <Database size={40} className="mx-auto text-apple-secondary/30 mb-4" />
          <p className="text-apple-secondary text-sm font-medium">Nenhum dado configurado</p>
          <p className="text-apple-secondary/60 text-xs mt-1">
            Adicione carteiras e registre movimentações para começar
          </p>
        </div>
      )}

      {/* Stats */}
      {hasData && (
        <div className="bg-apple-card rounded-2xl border border-apple-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-apple-accent/10 flex items-center justify-center">
              <Database size={20} className="text-apple-accent" />
            </div>
            <div>
              <p className="text-base font-semibold">Estatísticas</p>
              <p className="text-xs text-apple-secondary">Resumo dos seus dados</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-apple-bg/50 rounded-xl p-4">
              <p className="text-xs text-apple-secondary mb-1">Carteiras</p>
              <p className="text-2xl font-semibold tabular-nums">{stats.walletCount}</p>
            </div>
            <div className="bg-apple-bg/50 rounded-xl p-4">
              <p className="text-xs text-apple-secondary mb-1">Movimentações</p>
              <p className="text-2xl font-semibold tabular-nums">{stats.transactionCount}</p>
            </div>
            <div className="bg-apple-bg/50 rounded-xl p-4">
              <p className="text-xs text-apple-secondary mb-1">Pontos no Gráfico</p>
              <p className="text-2xl font-semibold tabular-nums">{stats.snapshotCount}</p>
            </div>
            <div className="bg-apple-bg/50 rounded-xl p-4">
              <p className="text-xs text-apple-secondary mb-1">Tamanho Total</p>
              <p className="text-2xl font-semibold tabular-nums">{formatBytes(stats.dataSize)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Export */}
        <div className="bg-apple-card rounded-2xl border border-apple-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-apple-green/10 flex items-center justify-center">
              <Download size={20} className="text-apple-green" />
            </div>
            <div>
              <p className="text-base font-semibold">Exportar Backup</p>
              <p className="text-xs text-apple-secondary">Baixe um arquivo JSON com todos os dados</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={downloadJSON}
              disabled={!hasData}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-apple-accent text-white rounded-xl text-sm font-medium hover:bg-apple-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FileJson size={16} />
              Baixar JSON
            </button>
            <button
              onClick={handleCopyJSON}
              disabled={!hasData}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black/5 text-apple-text rounded-xl text-sm font-medium hover:bg-black/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Copiar JSON
            </button>
          </div>
          {!hasData && (
            <p className="text-xs text-apple-secondary/60 mt-3 text-center">
              Nenhum dado para exportar
            </p>
          )}
        </div>

        {/* Import */}
        <div className="bg-apple-card rounded-2xl border border-apple-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-apple-accent/10 flex items-center justify-center">
              <Upload size={20} className="text-apple-accent" />
            </div>
            <div>
              <p className="text-base font-semibold">Importar Dados</p>
              <p className="text-xs text-apple-secondary">Restaure um backup JSON anterior</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-apple-accent text-white rounded-xl text-sm font-medium hover:bg-apple-accent-hover transition-colors"
          >
            <Upload size={16} />
            Selecionar Arquivo
          </button>
          <p className="text-xs text-apple-secondary/60 mt-3 text-center">
            Os dados atuais serão substituídos
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-apple-bg/50 rounded-xl p-4">
        <p className="text-xs text-apple-secondary">
          💡 <strong>Dica:</strong> Faça backups regulares exportando o JSON. Os dados são armazenados localmente no seu navegador.
        </p>
      </div>
    </div>
  );
}
