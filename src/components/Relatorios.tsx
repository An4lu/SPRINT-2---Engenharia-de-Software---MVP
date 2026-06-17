import React, { useState } from 'react';
import { FileText, Download, Printer, Calendar, Shield, CheckCircle2, TrendingUp, AlertTriangle, FileSpreadsheet, Sparkles } from 'lucide-react';
import { SECTORS } from '../data';
import { Ocorrencia, Alerta, Risco } from '../types';

interface RelatoriosProps {
  ocorrencias: Ocorrencia[];
  alertas: Alerta[];
}

export default function Relatorios({ ocorrencias, alertas }: RelatoriosProps) {
  const [selectedReportType, setSelectedReportType] = useState<'diario' | 'semanal' | 'mensal'>('diario');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv'>('pdf');
  const [reportSector, setReportSector] = useState('Geral - Todos os Setores');
  const [generationStage, setGenerationStage] = useState<'idle' | 'generating' | 'ready'>('idle');
  const [simulatedReportContent, setSimulatedReportContent] = useState<any>(null);

  const reportsTemplate = {
    diario: {
      title: 'Relatório Diário de Segurança e Conformidade Operacional',
      period: 'Turnos A, B e C — Hoje',
      subtitle: 'Resultados operacionais consolidados das últimas 24 horas',
      summary: 'Durante o período analisado pelas câmeras, o complexo registrou conformidade aceitável de EPIs, com exceção de eventos pontuais no setor de Alto Forno.'
    },
    semanal: {
      title: 'Relatório Consolidado de Conformidade de EPI — Semanal',
      period: 'Período: Últimos 7 dias',
      subtitle: 'Indicadores regulatórios acumulados para comitê da CIPA',
      summary: 'Nas últimas 168 horas registradas, houve aumento no uso de óculos de impacto nas oficinas e detecção assertivas de sinalização de pátio.'
    },
    mensal: {
      title: 'Dossier Analítico Mensal de Segurança Industrial',
      period: 'Período: Últimos 30 dias',
      subtitle: 'Dossiê completo para auditorias das normas regulamentadoras ISO 45001',
      summary: 'Fechamento mensal de faturamento e segurança consolidando a redução de acidentes severos em 42% após o deploy do SafeVision AI.'
    }
  };

  const handleGenerateReport = () => {
    setGenerationStage('generating');
    
    setTimeout(() => {
      // Computes real statistical values from current state to render in preview
      const sectorInstances = reportSector === 'Geral - Todos os Setores'
        ? ocorrencias
        : ocorrencias.filter(o => o.setor === reportSector);

      const criticalCount = sectorInstances.filter(o => o.risco === Risco.CRITICO).length;
      const totalCount = sectorInstances.length;
      const resolvedCount = sectorInstances.filter(o => o.status === 'Resolvido').length;
      const pendingCount = totalCount - resolvedCount;

      const template = reportsTemplate[selectedReportType];
      
      setSimulatedReportContent({
        ...template,
        sector: reportSector,
        format: selectedFormat,
        totalCount,
        criticalCount,
        resolvedCount,
        pendingCount,
        complianceRate: reportSector === 'Alto Forno' ? '91.4%' : '96.5%',
        timestamp: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR')
      });
      setGenerationStage('ready');
    }, 1000);
  };

  const handleSimulatedDownload = () => {
    if (!simulatedReportContent) return;

    if (simulatedReportContent.format === 'csv') {
      // Formulate a real CSV format data table to provoke browser download
      const headers = 'ID,Data,Setor,Infracao,Risco,Status,Descricao\n';
      const rows = ocorrencias
        .filter(o => reportSector === 'Geral - Todos os Setores' || o.setor === reportSector)
        .map(o => `"${o.id}","${o.timestamp}","${o.setor}","${o.tipo}","${o.risco}","${o.status}","${o.descricao}"`)
        .join('\n');
      
      const csvContent = 'data:text/csv;charset=utf-8,' + headers + rows;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `SAFEVISION-AUDIT-REPORT-${selectedReportType.toUpperCase()}-${reportSector.toUpperCase().replace(/ /g, '-')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // PDF format simulated printing call
      window.print();
    }
  };

  return (
    <div className="space-y-6" id="reports-engine">
      
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase">Módulo de Auditorias de Segurança</span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Expedição de Relatórios</h1>
          <p className="text-xs text-slate-500">
            Geração de arquivos auditabilidade e conformidade, exportaçao imediata em PDF ou CSV (compatível com Excel).
          </p>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Config Panel */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">1. Tipo de Fechamento</h3>
            <p className="text-[11px] text-slate-400">Selecione o horizonte de tempo para consolidação dos KPIs.</p>
          </div>

          {/* Cards for Period selector */}
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'diario', title: 'Relatório Diário', desc: 'Últimas 24h de atividade fabril', stats: 'Ideal para DDS matinal' },
              { id: 'semanal', title: 'Consolidado Semanal', desc: 'Agrupado de 7 dias de monitoramento', stats: 'Ideal para comitê técnico CIPA' },
              { id: 'mensal', title: 'Dossiê Mensal Regulatório', desc: 'Balanço de 30 dias com ISO 45001', stats: 'Ideal para Diretoria Industrial' }
            ].map((rep) => (
              <button
                key={rep.id}
                onClick={() => {
                  setSelectedReportType(rep.id as any);
                  setGenerationStage('idle');
                  setSimulatedReportContent(null);
                }}
                className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col gap-1 cursor-pointer ${
                  selectedReportType === rep.id
                    ? 'border-[#511024] bg-red-50/10'
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/20'
                }`}
                id={`report-select-${rep.id}`}
                type="button"
              >
                {selectedReportType === rep.id && (
                  <div className="absolute top-2 right-2 p-1 bg-[#511024] rounded-full text-white text-[9px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="font-bold text-xs text-slate-800 leading-tight">{rep.title}</div>
                <div className="text-[10px] text-slate-400 leading-normal">{rep.desc}</div>
                <div className="text-[9px] font-mono text-[#511024] font-medium mt-1 uppercase tracking-wider">{rep.stats}</div>
              </button>
            ))}
          </div>

          <hr className="border-slate-100" />

          {/* Parameters configurations */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">2. Filtro Setorial & Extensão</h3>
              <p className="text-[11px] text-slate-400">Refine os limites do relatório e a extensão de entrega.</p>
            </div>

            {/* Setor selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="report-sector-select">
                Foco no Setor
              </label>
              <select
                id="report-sector-select"
                value={reportSector}
                onChange={(e) => {
                  setReportSector(e.target.value);
                  setGenerationStage('idle');
                  setSimulatedReportContent(null);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.8 text-xs text-slate-700 outline-none cursor-pointer"
              >
                {SECTORS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Format choice widget */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block">
                Formato do Arquivo
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFormat('pdf');
                    setGenerationStage('idle');
                    setSimulatedReportContent(null);
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedFormat === 'pdf'
                      ? 'border-[#511024] bg-red-50/10 text-[#511024] font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" /> PDF Regulatório
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFormat('csv');
                    setGenerationStage('idle');
                    setSimulatedReportContent(null);
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedFormat === 'csv'
                      ? 'border-[#511024] bg-red-50/10 text-[#511024] font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Planilha Excel
                </button>
              </div>
            </div>

            {/* Trigger generator button */}
            <button
              onClick={handleGenerateReport}
              disabled={generationStage === 'generating'}
              className="w-full py-3 bg-[#511024] hover:bg-[#701c38] text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-300"
              type="button"
            >
              {generationStage === 'generating' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Consolidando dados da nuvem...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-sensor-pulse" />
                  <span>Compilar Relatório Consolidado</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Visualization Preview */}
        <div className="lg:col-span-2">
          {generationStage === 'idle' && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center h-full flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-white rounded-full border border-slate-100 shadow-xs">
                <FileText className="w-8 h-8 text-[#511024]/40" />
              </div>
              <h4 className="font-display font-medium text-sm text-slate-800">Aguardando Parâmetros</h4>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Ajuste os filtros à esquerda e clique em <strong>"Compilar Relatório Consolidado"</strong> para gerar uma visualização em PDF pronta para impressão e download.
              </p>
            </div>
          )}

          {generationStage === 'generating' && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-xs p-12 text-center h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#511024] border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <h4 className="font-display font-medium text-sm text-slate-800">Varrendo Banco de Eventos...</h4>
                <p className="text-xs text-slate-400">Recuperando frames catalogados pelo algoritmo YOLOv11.</p>
              </div>
            </div>
          )}

          {generationStage === 'ready' && simulatedReportContent && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-md p-6 space-y-6 relative animate-fadeIn" id="compiled-report-preview">
              
              {/* Header inside simulated PDF sheet */}
              <div className="border-b-2 border-[#511024] pb-4 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 px-2 bg-[#511024] text-white text-[8px] font-mono font-bold rounded">SESMT</span>
                    <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">SafeVision AI Platform • Relatório Técnico</span>
                  </div>
                  <h3 className="text-base font-display font-bold text-slate-900 leading-tight">
                    {simulatedReportContent.title}
                  </h3>
                  <p className="text-[11px] text-[#511024] font-mono uppercase">{simulatedReportContent.subtitle}</p>
                </div>
                
                <div className="text-right text-[10px] font-mono text-slate-400 space-y-0.5">
                  <div>Gerado: {simulatedReportContent.timestamp}</div>
                  <div>Siderúrgica SafeVision Norte</div>
                  <div className="text-[#511024] font-bold">NORMA NR-6 VIGENTE</div>
                </div>
              </div>

              {/* Statistical review panels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Total de Deteccões</span>
                  <span className="text-xl font-display font-semibold text-slate-900">{simulatedReportContent.totalCount}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Gravidades Críticas</span>
                  <span className="text-xl font-display font-semibold text-red-600 font-bold">{simulatedReportContent.criticalCount}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Casos Resolvidos</span>
                  <span className="text-xl font-display font-semibold text-emerald-600 font-bold">{simulatedReportContent.resolvedCount}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Taxa de Conformidade</span>
                  <span className="text-xl font-display font-semibold text-[#511024] font-bold">{simulatedReportContent.complianceRate}</span>
                </div>
              </div>

              {/* Text review */}
              <div className="space-y-2 text-xs text-slate-700 leading-relaxed md:leading-normal font-sans">
                <h4 className="font-bold text-slate-900 flex items-center gap-1">
                  <Shield className="w-4 h-4 text-[#511024]" /> 1. Resumo Executivo das Ocorrências
                </h4>
                <p className="p-3 bg-stone-50 border-l-2 border-[#511024] rounded-r-lg italic">
                  &quot;{simulatedReportContent.summary}&quot;
                </p>
                
                <p>
                  As assinaturas de rede processadas na área de <strong>{simulatedReportContent.sector}</strong> registraram um total de {simulatedReportContent.totalCount} incidentes operacionais de inconformidade de EPIs nas dependências monitoradas. Do montante indexado, {simulatedReportContent.criticalCount} foram classificados sob classificação de "Perigo Crítico", recomendando-se treinamento das equipes de turno no DDS.
                </p>
              </div>

              {/* Simulated download footer toolbar */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-red-50/50 -mx-6 -mb-6 p-4 rounded-b-xl">
                <span className="text-[10px] font-mono text-slate-600">Arquivo Compilado com Sucesso. Toque para Baixar:</span>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleSimulatedDownload}
                    className="px-4 py-2 bg-[#511024] hover:bg-[#701c38] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    type="button"
                  >
                    <Download className="w-4 h-4" />
                    {simulatedReportContent.format === 'csv' ? 'Baixar Planilha (CSV)' : 'Imprimir / Salvar PDF'}
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
