import React, { useState } from 'react';
import { AlertCircle, Eye, CheckCircle, ShieldAlert, Filter, Calendar, MapPin, Tag } from 'lucide-react';
import { Alerta, Risco, StatusAlerta, Usuario } from '../types';
import { SECTORS } from '../data';

interface CentralAlertasProps {
  alertas: Alerta[];
  currentUser: Usuario;
  onAcknowledgeAlert: (id: string, userName: string) => void;
  onResolveAlert: (id: string, userName: string) => void;
}

export default function CentralAlertas({
  alertas,
  currentUser,
  onAcknowledgeAlert,
  onResolveAlert
}: CentralAlertasProps) {
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('Geral - Todos os Setores');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter alerts based on inputs
  const filteredAlertas = alertas.filter(a => {
    const matchPriority = priorityFilter === 'all' || a.prioridade === priorityFilter;
    const matchSector = sectorFilter === 'Geral - Todos os Setores' || a.setor === sectorFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchPriority && matchSector && matchStatus;
  });

  const getPriorityBadgeClass = (p: Risco) => {
    switch (p) {
      case Risco.CRITICO:
        return 'bg-red-50 text-red-700 border-red-200 animate-pulse font-bold';
      case Risco.ALTO:
        return 'bg-amber-50 text-amber-800 border-amber-200 font-bold';
      case Risco.MEDIO:
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadgeClass = (s: StatusAlerta) => {
    switch (s) {
      case StatusAlerta.ATIVO:
        return 'bg-rose-500 text-white border-transparent';
      case StatusAlerta.RECONHECIDO:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case StatusAlerta.RESOLVIDO:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) {
      return isoString;
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="space-y-6" id="alerts-control-center">
      
      {/* Header Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase">Controle de Alertas Imediatos</span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Central de Alertas</h1>
          <p className="text-xs text-slate-500">
            Ações de contenção prioritárias sobre incidentes de segurança detectados nas zonas fabris.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="px-3.5 py-1.5 bg-red-50 text-[#511024] border border-red-200 text-xs font-mono font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 animate-sensor-pulse" />
            {alertas.filter(a => a.status === StatusAlerta.ATIVO).length} Alertas Ativos
          </div>
        </div>
      </div>

      {/* Filters bar components */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Filtrar:</span>
          </div>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none cursor-pointer"
            id="priority-filter-select"
          >
            <option value="all">Todas as Prioridades</option>
            <option value={Risco.CRITICO}>Invasão / Crítico</option>
            <option value={Risco.ALTO}>Alerta Alto</option>
            <option value={Risco.MEDIO}>Alerta Médio</option>
            <option value={Risco.BAIXO}>Alerta Baixo</option>
          </select>

          {/* Sector filter */}
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none cursor-pointer"
            id="sector-filter-select"
          >
            {SECTORS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none cursor-pointer"
            id="status-filter-select"
          >
            <option value="all">Todos os Status</option>
            <option value={StatusAlerta.ATIVO}>Ativo</option>
            <option value={StatusAlerta.RECONHECIDO}>Reconhecido</option>
            <option value={StatusAlerta.RESOLVIDO}>Resolvido</option>
          </select>
        </div>

        <span className="text-slate-400 text-xs font-mono">
          Exibindo {filteredAlertas.length} registros correspondentes
        </span>
      </div>

      {/* Alertas Index Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-700 font-bold uppercase tracking-wider font-mono text-[10px]">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Local / Câmera</th>
                <th className="py-3.5 px-4">Infracção / Mensagem</th>
                <th className="py-3.5 px-4">Prioridade</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações de Contenção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600 font-sans" id="alerts-table-body">
              {filteredAlertas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Nenhum alerta crítico ativo correspondente aos filtros.
                  </td>
                </tr>
              ) : (
                filteredAlertas.map((alerta) => (
                  <tr key={alerta.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Timestamp */}
                    <td className="py-4 px-4 font-mono">
                      <div className="font-semibold text-slate-800">{formatTime(alerta.timestamp)}</div>
                      <div className="text-[10px] text-slate-400">{formatDate(alerta.timestamp)}</div>
                    </td>

                    {/* Local */}
                    <td className="py-4 px-4 space-y-0.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#511024]" />
                        {alerta.setor}
                      </div>
                      <div className="text-slate-400 font-mono text-[10px]">{alerta.cameraName}</div>
                    </td>

                    {/* Mensagem */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="font-mono text-slate-900 font-medium leading-normal break-words">
                        {alerta.mensagem}
                      </div>
                    </td>

                    {/* Prioridade */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[9px] uppercase font-bold tracking-wider ${getPriorityBadgeClass(alerta.prioridade)}`}>
                        {alerta.prioridade}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[9px] uppercase font-bold tracking-wider ${getStatusBadgeClass(alerta.status)}`}>
                        {alerta.status}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        
                        {/* Acknowledge Action button */}
                        {alerta.status === StatusAlerta.ATIVO && (
                          <button
                            onClick={() => onAcknowledgeAlert(alerta.id, currentUser.nome)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer"
                            title="Reconhecer que viu"
                            type="button"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Reconhecer</span>
                          </button>
                        )}

                        {/* Resolve Action button */}
                        {alerta.status !== StatusAlerta.RESOLVIDO && (
                          <button
                            onClick={() => onResolveAlert(alerta.id, currentUser.nome)}
                            className="bg-[#511024] hover:bg-[#701c38] text-white text-[11px] font-medium px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer"
                            title="Indicar que operador corrigiu"
                            type="button"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Resolver</span>
                          </button>
                        )}

                        {alerta.status === StatusAlerta.RESOLVIDO && (
                          <span className="text-emerald-600 text-xs font-mono font-bold uppercase py-1 px-2.5 bg-emerald-50 rounded border border-emerald-100 select-none">
                            Contido de forma Segura
                          </span>
                        )}
                      </div>
                    </td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
