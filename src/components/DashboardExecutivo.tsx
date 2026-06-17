import React, { useState } from 'react';
import { Camera, Calendar, AlertTriangle, ShieldCheck, Activity, Users, ArrowUpRight, TrendingUp, Filter, RefreshCw, Layers } from 'lucide-react';
import { Indicador, Risco, Ocorrencia, Alerta } from '../types';
import { SECTORS } from '../data';

interface DashboardExecutivoProps {
  ocorrencias: Ocorrencia[];
  alertas: Alerta[];
  onSetTab: (tab: string) => void;
  onFilterSector: (sector: string) => void;
  selectedSector: string;
}

export default function DashboardExecutivo({
  ocorrencias,
  alertas,
  onSetTab,
  onFilterSector,
  selectedSector
}: DashboardExecutivoProps) {
  const [period, setPeriod] = useState<'Hoje' | '7dias' | '30dias'>('Hoje');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter local data based on selected sector & period
  const filteredOcorrencias = ocorrencias.filter(o => {
    const matchSector = selectedSector === 'Geral - Todos os Setores' || o.setor === selectedSector;
    
    if (period === 'Hoje') {
      return matchSector && o.timestamp.includes('2026-06-16');
    } else if (period === '7dias') {
      // simulate 7 days match (all items in our mock fit 7 days)
      return matchSector;
    }
    return matchSector;
  });

  const activeAlertsCount = alertas.filter(a => a.status === 'Ativo').length;
  const criticalOcorrencias = filteredOcorrencias.filter(o => o.risco === Risco.CRITICO).length;
  const totalDetections = filteredOcorrencias.length;

  // Compute standard KPIs dynamically
  const kpis = [
    {
      title: 'Ocorrências Registradas',
      value: filteredOcorrencias.length,
      change: period === 'Hoje' ? '+1 vs ontem' : '+12% vs período anterior',
      status: filteredOcorrencias.length > 2 ? 'negative' : 'positive',
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      action: 'Ver Ocorrências',
      tab: 'ocorrencias'
    },
    {
      title: 'Alertas Críticos Ativos',
      value: activeAlertsCount,
      change: 'Atenção imediata SESMT',
      status: activeAlertsCount > 0 ? 'negative' : 'positive',
      icon: Activity,
      color: 'text-red-700 bg-red-50 border-red-100 animate-pulse',
      action: 'Central de Alertas',
      tab: 'alertas'
    },
    {
      title: 'Conformidade Geral PPE',
      value: selectedSector === 'Alto Forno' ? '91.4%' : selectedSector === 'Lingotamento' ? '93.2%' : '96.5%',
      change: '+1.4% esta semana',
      status: 'positive',
      icon: ShieldCheck,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      action: 'Gerar Relatório',
      tab: 'relatorios'
    },
    {
      title: 'Câmeras de Segurança',
      value: '5 / 6',
      change: '1 em calibração (Oficina)',
      status: 'neutral',
      icon: Camera,
      color: 'text-sky-700 bg-sky-50 border-sky-100',
      action: 'Gerenciar Streams',
      tab: 'cameras'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6" id="dashboard-executivo">
      
      {/* Title Header with interactive actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase">Indicadores Gerenciais SESMT</span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">SafeVision Dashboard Executivo</h1>
          <p className="text-xs text-slate-500">
            Métricas de conformidade industrial agregadas sob as diretrizes NR-6 e NR-12.
          </p>
        </div>

        {/* Global Toolbar filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sector filter dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSector}
              onChange={(e) => onFilterSector(e.target.value)}
              className="bg-transparent border-none outline-none font-medium cursor-pointer"
              id="sector-dashboard-select"
            >
              {SECTORS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Period selector */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center">
            {(['Hoje', '7dias', '30dias'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  period === p
                    ? 'bg-white text-[#511024] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
              >
                {p === 'Hoje' ? 'Hoje' : p === '7dias' ? '7 Dias' : '30 Dias'}
              </button>
            ))}
          </div>

          {/* Refresh Action */}
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-500 hover:text-[#511024] bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-lg transition-all cursor-pointer"
            title="Atualizar Indicadores"
            type="button"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#511024]' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="kpi-grid">
        {kpis.map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between hover:border-red-100 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 block font-medium uppercase tracking-wider">{kpi.title}</span>
                  <div className="text-2xl font-display font-semibold text-slate-900">{kpi.value}</div>
                </div>
                <div className={`p-2 rounded-lg border ${kpi.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                <span className={`text-[11px] font-medium ${
                  kpi.status === 'negative' ? 'text-rose-600' : kpi.status === 'positive' ? 'text-emerald-600' : 'text-slate-500'
                }`}>
                  {kpi.change}
                </span>

                <button
                  onClick={() => onSetTab(kpi.tab)}
                  className="text-xs text-slate-500 group-hover:text-[#511024] font-medium flex items-center gap-0.5 hover:underline cursor-pointer"
                  type="button"
                >
                  {kpi.action} <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Ocorrência por Dia (Line Chart SVG) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#511024]" /> Histórico de Desvios de EPI
              </h3>
              <p className="text-[11px] text-slate-500">Contabilização agregada de incidências nos últimos 6 dias.</p>
            </div>
            <span className="text-[10px] font-mono font-medium text-slate-400">Escala: Ocorrências/Turno</span>
          </div>

          {/* SVG Line Chart */}
          <div className="relative h-48 w-full pt-2">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="10" x2="500" y2="10" stroke="#f1f5f9" strokeWidth="1" />

              {/* Data Points
                  Dates: June 11, 12, 13, 14, 15, 16
                  Values: 6, 3, 5, 2, 8, 4
              */}
              <path
                d="M 20 100 L 110 130 L 200 110 L 290 140 L 380 80 L 470 120"
                fill="none"
                stroke="#511024"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Fill Gradient Area under path */}
              <path
                d="M 20 100 L 110 130 L 200 110 L 290 140 L 380 80 L 470 120 L 470 150 L 20 150 Z"
                fill="url(#wineGradient)"
                opacity="0.1"
              />

              {/* Hot spots dots */}
              <circle cx="20" cy="100" r="4.5" fill="#511024" stroke="#ffffff" strokeWidth="1.5" className="hover:scale-125 transition-transform" />
              <circle cx="110" cy="130" r="4.5" fill="#511024" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="200" cy="110" r="4.5" fill="#511024" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="290" cy="140" r="4.5" fill="#511024" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="380" cy="80" r="4.5" fill="#EF4444" stroke="#ffffff" strokeWidth="1.5" /> {/* Peak */}
              <circle cx="470" cy="120" r="4.5" fill="#511024" stroke="#ffffff" strokeWidth="1.5" />

              {/* Tooltip labels */}
              <text x="20" y="85" fontSize="8" fill="#511024" textAnchor="middle" fontWeight="bold">6</text>
              <text x="110" y="115" fontSize="8" fill="#511024" textAnchor="middle" fontWeight="bold">3</text>
              <text x="200" y="95" fontSize="8" fill="#511024" textAnchor="middle" fontWeight="bold">5</text>
              <text x="290" y="125" fontSize="8" fill="#511024" textAnchor="middle" fontWeight="bold">2</text>
              <text x="380" y="65" fontSize="8" fill="#EF4444" textAnchor="middle" fontWeight="bold">8 (Crítico)</text>
              <text x="470" y="105" fontSize="8" fill="#511024" textAnchor="middle" fontWeight="bold">4 (Hoje)</text>

              {/* X Axis Labels */}
              <text x="20" y="148" fontSize="8" fill="#94a3b8" textAnchor="middle">11/06</text>
              <text x="110" y="148" fontSize="8" fill="#94a3b8" textAnchor="middle">12/06</text>
              <text x="200" y="148" fontSize="8" fill="#94a3b8" textAnchor="middle">13/06</text>
              <text x="290" y="148" fontSize="8" fill="#94a3b8" textAnchor="middle">14/06</text>
              <text x="380" y="148" fontSize="8" fill="#94a3b8" textAnchor="middle">15/06</text>
              <text x="470" y="148" fontSize="8" fill="#94a3b8" textAnchor="middle">Hoje (16/06)</text>

              <defs>
                <linearGradient id="wineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#511024" />
                  <stop offset="100%" stopColor="#1a1d23" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex justify-between items-center pt-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-600"><strong>Tendência Geral:</strong> Desconformidade de capacetes concentrada no turno da noite das docas.</span>
            <span className="text-[#511024] font-medium underline cursor-pointer" onClick={() => onSetTab('relatorios')}>Baixar Auditoria</span>
          </div>
        </div>

        {/* Chart 2: Distribuicao de Riscos (Bento representation) */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#511024]" /> Classificação de Gravidades
            </h3>
            <p className="text-[11px] text-slate-500">Distribuição proporcional por criticidade.</p>
          </div>

          <div className="space-y-3.5 pt-2">
            {[
              { label: 'Crítico (Risco de óbito)', value: criticalOcorrencias + 2, total: 10, percent: '40%', color: 'bg-red-600', text: 'text-red-600' },
              { label: 'Alto (Acidente grave)', value: 4, total: 10, percent: '30%', color: 'bg-amber-500', text: 'text-amber-600' },
              { label: 'Médio (Risco regulatório)', value: 2, total: 10, percent: '15%', color: 'bg-yellow-400', text: 'text-yellow-600' },
              { label: 'Baixo (Não-conformidade leve)', value: 1, total: 10, percent: '15%', color: 'bg-blue-500', text: 'text-blue-600' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className={`font-mono font-bold ${item.text}`}>{item.value} ocorrências ({item.percent})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: item.percent }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-[11px] text-slate-600 leading-relaxed text-center font-mono uppercase tracking-wider">
            Recomenda-se calibração preventiva para detecção de cintos de segurança.
          </div>
        </div>
      </div>

      {/* Grid: Conformidade de Cargas e Setores */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Rank de Conformidade por Área Operacional (Normas SESMT)</h3>
          <p className="text-[11px] text-slate-500">Percentual de conformidade ponderado com base no volume de operadores identificados sem EPI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { area: 'Terminal de Expedição', compliance: 98.4, status: 'safe', cases: 1, color: 'text-emerald-700 border-emerald-100 bg-emerald-50' },
            { area: 'Pátio de Matérias-Primas', compliance: 97.2, status: 'safe', cases: 0, color: 'text-emerald-700 border-emerald-100 bg-emerald-50' },
            { area: 'Galpão de Laminação', compliance: 94.8, status: 'warning', cases: 2, color: 'text-amber-700 border-amber-100 bg-amber-50' },
            { area: 'Lingotamento Técnico', compliance: 91.2, status: 'warning', cases: 3, color: 'text-amber-700 border-amber-100 bg-amber-50' },
            { area: 'Alto Forno 03', compliance: 86.5, status: 'critical', cases: 4, color: 'text-rose-700 border-rose-100 bg-rose-50' }
          ].map((sec, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{sec.area}</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">{sec.cases} infrações detectadas</p>
              </div>

              <div className="text-right space-y-1">
                <span className="text-lg font-display font-bold text-slate-900 block">{sec.compliance}%</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${sec.color}`}>
                  {sec.status === 'safe' ? 'Excelente' : sec.status === 'warning' ? 'Atenção' : 'Ação SESMT'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
