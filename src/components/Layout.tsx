import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Wallet, LineChart, DollarSign, Database } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-apple-sidebar backdrop-blur-xl border-r border-apple-border flex flex-col fixed h-full z-10">
        <div className="p-6 pb-4">
          <h1 className="text-xl font-semibold tracking-tight text-apple-text">
            Trader Finance
          </h1>
          <p className="text-xs text-apple-secondary mt-1">Gestão de carteiras</p>
        </div>

        <nav className="flex-1 px-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                isActive
                  ? 'bg-apple-accent/10 text-apple-accent'
                  : 'text-apple-secondary hover:text-apple-text hover:bg-black/5'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Resumo
          </NavLink>
          <NavLink
            to="/wallets"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                isActive
                  ? 'bg-apple-accent/10 text-apple-accent'
                  : 'text-apple-secondary hover:text-apple-text hover:bg-black/5'
              }`
            }
          >
            <Wallet size={18} />
            Carteiras
          </NavLink>

          <div className="my-3 mx-4 border-t border-apple-border" />

          <NavLink
            to="/chart"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                isActive
                  ? 'bg-apple-accent/10 text-apple-accent'
                  : 'text-apple-secondary hover:text-apple-text hover:bg-black/5'
              }`
            }
          >
            <LineChart size={18} />
            Gráfico
          </NavLink>
          <NavLink
            to="/prices"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                isActive
                  ? 'bg-apple-accent/10 text-apple-accent'
                  : 'text-apple-secondary hover:text-apple-text hover:bg-black/5'
              }`
            }
          >
            <DollarSign size={18} />
            Cotações
          </NavLink>
          <NavLink
            to="/data"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                isActive
                  ? 'bg-apple-accent/10 text-apple-accent'
                  : 'text-apple-secondary hover:text-apple-text hover:bg-black/5'
              }`
            }
          >
            <Database size={18} />
            Dados
          </NavLink>
        </nav>

        <div className="p-4 border-t border-apple-border">
          <p className="text-[10px] text-apple-secondary text-center">
            v1.2 — Dados salvos localmente
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="max-w-5xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
