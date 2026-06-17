import React, { useState } from 'react';
import { Search, X, MessageSquare, AlertTriangle, UserCheck, Calendar, Clock, MapPin, CheckCircle, ArrowRight, UserMinus } from 'lucide-react';
import { Ocorrencia, Risco, Usuario } from '../types';
import { SECTORS } from '../data';

interface OcorrenciasProps {
  ocorrencias: Ocorrencia[];
  currentUser: Usuario;
  onUpdateOccurrenceStatus: (id: string, status: 'Pendente' | 'Investigando' | 'Resolvido') => void;
  onAddComment: (id: string, author: string, text: string) => void;
}

export default function Ocorrencias({
  ocorrencias,
  currentUser,
  onUpdateOccurrenceStatus,
  onAddComment
}: OcorrenciasProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOcorrenciaId, setSelectedOcorrenciaId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [commentInput, setCommentInput] = useState('');

  const selectedOcorrencia = ocorrencias.find(o => o.id === selectedOcorrenciaId);

  // Filter list based on search and parameters
  const filteredOcorrencias = ocorrencias.filter(o => {
    const matchesSearch = 
      o.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.operador && o.operador.toLowerCase().includes(searchQuery.toLowerCase())) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || o.tipo === filterType;

    return matchesSearch && matchesType;
  });

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedOcorrenciaId) return;
    onAddComment(selectedOcorrenciaId, currentUser.nome, commentInput);
    setCommentInput('');
  };

  const getRiscoBadgeClass = (r: Risco) => {
    switch (r) {
      case Risco.CRITICO:
        return 'bg-red-50 text-red-700 border-red-200';
      case Risco.ALTO:
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case Risco.MEDIO:
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolvido':
        return 'bg-emerald-500 text-white';
      case 'Investigando':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-rose-500 text-white';
    }
  };

  const formatDateTimeFull = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="space-y-6" id="occurrences-registry">
      
      {/* Upper header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase">Histórico Geral de Não-Conformidade</span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Ocorrências Operacionais</h1>
          <p className="text-xs text-slate-500">
            Registro cronológico completo e imutável para conformidade regulatória NR-6 e auditorias internas do SESMT.
          </p>
        </div>
      </div>

      {/* Interface filter row */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar matricula, operador, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#511024] focus:border-[#511024]"
            id="search-occurrences-input"
          />
        </div>

        {/* Filter type */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Tipo de Infração:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 outline-none cursor-pointer"
            id="type-occurrence-select"
          >
            <option value="all">Todas as Ausências</option>
            <option value="Sem Capacete">Ausência de Capacete</option>
            <option value="Sem Colete">Ausência de Colete</option>
            <option value="Área Restrita">Invasão Perímetro</option>
            <option value="Sem Luvas">Falta de Luva Térmica</option>
            <option value="Sem Óculos">Falta de Óculos</option>
          </select>
        </div>

      </div>

      {/* Table grid listing */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-700 font-bold uppercase tracking-wider font-mono text-[10px]">
                <th className="py-3 px-4">Registro ID</th>
                <th className="py-3 px-4">Data & Hora</th>
                <th className="py-3 px-4">Infração Capturada</th>
                <th className="py-3 px-4">Operador Identificado</th>
                <th className="py-3 px-4">Risco IA</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Inspecionar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredOcorrencias.map((occ) => (
                <tr key={occ.id} className="hover:bg-slate-50/50 transition-colors">
                  
                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-[#511024]">
                    #{occ.id}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 font-mono">
                    {formatDateTimeFull(occ.timestamp).split(' às ')[0]}
                    <span className="block text-[10px] text-slate-400">{formatDateTimeFull(occ.timestamp).split(' às ')[1] || ''}</span>
                  </td>

                  {/* Infração */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{occ.tipo}</div>
                    <div className="text-slate-400 text-[11px] truncate max-w-sm">{occ.descricao}</div>
                  </td>

                  {/* Operador */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {occ.operador ? (
                      <div className="font-medium text-slate-800 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {occ.operador}
                      </div>
                    ) : (
                      <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                        <UserMinus className="w-3.5 h-3.5 text-red-500" />
                        Não Identificado (Perfilamento IA falhou)
                      </div>
                    )}
                  </td>

                  {/* Risco */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] uppercase font-mono font-bold tracking-wider ${getRiscoBadgeClass(occ.risco)}`}>
                      {occ.risco}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${getStatusBadge(occ.status)}`}>
                      {occ.status}
                    </span>
                  </td>

                  {/* Inspect */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOcorrenciaId(occ.id)}
                      className="text-[#511024] hover:text-[#701c38] font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                      type="button"
                    >
                      <span>Auditar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advanced Snapshot & Timeline Comment Audit Sidebar/Modal */}
      {selectedOcorrencia && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" id="audit-occurrence-modal">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Top Header Bar */}
            <div className="bg-[#511024] text-white p-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono text-red-200 tracking-wider">MÓDULO DE AUDITORIA LEGAL • COD-EPI-#{selectedOcorrencia.id}</span>
                <h3 className="font-display font-bold text-lg">{selectedOcorrencia.tipo} em {selectedOcorrencia.camera}</h3>
              </div>
              <button
                onClick={() => setSelectedOcorrenciaId(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all cursor-pointer"
                title="Fechar Auditoria"
                type="button"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              
              {/* Left Column: Media & metadata highlights */}
              <div className="space-y-4">
                
                {/* Simulated frame snapshot box */}
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center">
                  
                  {/* Photo representing snapshot of breach */}
                  <div className="absolute inset-0 bg-cover bg-center select-none" style={{
                    backgroundImage: selectedOcorrencia.tipo === 'Sem Capacete'
                      ? "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600')"
                      : selectedOcorrencia.tipo === 'Área Restrita'
                      ? "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600')"
                      : "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600')"
                  }} />

                  {/* Visual warning border representing a breach snapshot crop */}
                  <div className="absolute top-4 left-4 border-2 border-red-600 bg-red-600/20 text-white font-mono text-[9px] px-2 py-1 rounded font-bold animate-pulse z-10">
                    SNA_SHOT COMPLICITY ERROR: AUSÊNCIA EPI
                  </div>

                  {/* Hard highlight crop bounding box simulating AI output */}
                  <div className="absolute border-2 border-red-500 bg-red-600/10 w-24 h-24 rounded top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/4 z-10 flex flex-col justify-between p-1">
                    <span className="text-[7px] font-mono text-white bg-red-600 font-bold px-1 py-0.5 rounded leading-none w-max">INFRATOR 94%</span>
                    <span className="text-[7px] font-mono text-red-100 bg-red-900 border border-red-500 font-bold px-0.5. py-0.5 rounded leading-none text-center">FALHA {selectedOcorrencia.tipo.toUpperCase()}</span>
                  </div>

                  {/* Dark transparent HUD layer */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white font-mono text-[9px] flex justify-between">
                    <span>SECTOR: {selectedOcorrencia.setor}</span>
                    <span>TIMESTAMP: {formatDateTimeFull(selectedOcorrencia.timestamp)}</span>
                  </div>
                </div>

                {/* Audit details metadata */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-3">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide font-mono text-[10px]">Detalhamento Legal SESMT</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 uppercase tracking-wide text-[9px] block">Data & Hora:</span>
                      <span className="font-medium text-slate-800">{formatDateTimeFull(selectedOcorrencia.timestamp)}</span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-400 uppercase tracking-wide text-[9px] block">Localização Câmera:</span>
                      <span className="font-medium text-slate-800">{selectedOcorrencia.camera}</span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-400 uppercase tracking-wide text-[9px] block">Perfil do Operador:</span>
                      <span className="font-bold text-slate-800">{selectedOcorrencia.operador || 'Rastro Não Conhecido'}</span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-400 uppercase tracking-wide text-[9px] block">Grau de Risco:</span>
                      <span className="font-medium text-[#511024] font-bold underline decoration-red-500 decoration-2">{selectedOcorrencia.risco.toUpperCase()}</span>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wide text-[9px] block">Narrativa da IA SafeVision:</span>
                    <p className="text-slate-600 text-xs italic leading-relaxed md:leading-normal">
                      &quot;{selectedOcorrencia.descricao}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive resolution track & comments */}
              <div className="flex flex-col space-y-4">
                
                {/* Status action toggle buttons */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide font-mono text-[10px]">Modificar Estado da Auditoria</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { status: 'Pendente', label: 'Pendente', bg: 'bg-[#511024] text-white hover:bg-[#701c38]', border: 'border-transparent' },
                      { status: 'Investigando', label: 'Investigar', bg: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200', border: 'border-amber-200' },
                      { status: 'Resolvido', label: 'Resolvido', bg: 'bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-200', border: 'border-emerald-200' }
                    ] as const).map((btn) => (
                      <button
                        key={btn.status}
                        onClick={() => onUpdateOccurrenceStatus(selectedOcorrencia.id, btn.status)}
                        className={`text-center py-2 rounded-lg text-xs font-medium cursor-pointer transition-all border ${
                          selectedOcorrencia.status === btn.status
                            ? `${btn.bg} shadow-xs font-bold scale-102`
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                        type="button"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Commentary logging timeline thread */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wide font-mono text-[10px] mb-2 flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-[#511024]" /> Histórico de Intervenções ({selectedOcorrencia.comentarios.length})
                    </h4>
                    
                    <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
                      {selectedOcorrencia.comentarios.map((c, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] leading-relaxed relative">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-slate-800">{c.autor}</span>
                            <span className="text-[9px] font-mono text-slate-400">{formatDateTimeFull(c.data).split(' às ')[1] || c.data}</span>
                          </div>
                          <p className="text-slate-600 font-sans">{c.texto}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comment submit formulation */}
                  <form onSubmit={handlePostComment} className="pt-2 border-t border-slate-100 space-y-2">
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Adicione um parecer técnico de encerramento da não-conformidade..."
                      rows={2}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#511024] resize-none"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#511024] text-white hover:bg-[#701c38] font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" /> Registrar Intervenção SESMT
                    </button>
                  </form>

                </div>

              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
