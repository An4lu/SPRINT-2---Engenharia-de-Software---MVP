import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, Cpu, BellRing, Link2, Sliders, CheckCircle2 } from 'lucide-react';
import { ConfigAI } from '../types';

interface ConfiguracoesProps {
  config: ConfigAI;
  onSaveConfig: (updated: ConfigAI) => void;
}

export default function Configuracoes({ config, onSaveConfig }: ConfiguracoesProps) {
  const [threshold, setThreshold] = useState(config.thresholdConfianca);
  const [retention, setRetention] = useState(config.tempoRetencaoDias);
  const [emailAlert, setEmailAlert] = useState(config.alertasEmail);
  const [pushAlert, setPushAlert] = useState(config.alertasPush);
  const [whatsappAlert, setWhatsappAlert] = useState(config.alertasWhatsapp);
  const [slack, setSlack] = useState(config.integracaoSlack);
  const [webhook, setWebhook] = useState(config.webhookUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ConfigAI = {
      thresholdConfianca: threshold,
      tempoRetencaoDias: retention,
      alertasEmail: emailAlert,
      alertasPush: pushAlert,
      alertasWhatsapp: whatsappAlert,
      webhookUrl: webhook,
      integracaoSlack: slack
    };
    onSaveConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6" id="configurations-panel">
      
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase">Nível de Sensibilidade Operacional</span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Regras e Configurações IA</h1>
          <p className="text-xs text-slate-500">
            Ajuste os parâmetros de ponderação do modelo de visão computacional e canais de entrega SESMT.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2.5 animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Configurações persistidas com sucesso! Os pesos da inferência de borda foram transmitidos ao cluster Nvidia Jetson Orin.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Decisões de Limites IA and Sensibilidade sliders */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#511024]" /> 1. Sensibilidade e Confiança IA (YOLO)
            </h3>
            
            <p className="text-xs text-slate-500 leading-normal">
              Ajuste o limite mínimo de acurácia estatística exigido pelo modelo para decretar não-conformidade de EPI. Limites excessivamente baixos podem causar falsos positivos com reflexos metálicos.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-700">Confidence Threshold (EPI / Operadores)</span>
                <span className="font-mono font-bold text-[#511024] p-1 bg-red-50 rounded border border-red-100">{threshold}% de acerto</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full accent-[#511024] cursor-ew-resize h-1.5 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold uppercase">
                <span>Rápido (Falsos alarmes)</span>
                <span>Ótimo Siderúrgico (Nossa recomendação: 80%)</span>
                <span>Ultraconservador (Pode omitir desvios)</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Retention rules */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#511024] font-bold block uppercase tracking-wider">Tempo de Retenção de Vídeos e Imunidade Legal</span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 90, label: '90 Dias', sub: 'Standard audit' },
                  { value: 180, label: '180 Dias', sub: 'Norma recomendada' },
                  { value: 360, label: '1 Ano', sub: 'Histórico estendido' }
                ].map((ret) => (
                  <button
                    key={ret.value}
                    type="button"
                    onClick={() => setRetention(ret.value)}
                    className={`p-3 text-left rounded-lg border text-xs cursor-pointer transition-all ${
                      retention === ret.value
                        ? 'border-[#511024] bg-red-50/10'
                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-slate-800 leading-tight">{ret.label}</div>
                    <div className="text-[9px] text-slate-400 mt-1 font-mono">{ret.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Webhook and connections URL mappings */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#511024]" /> 2. Integrações / Webhooks Externos
            </h3>
            
            <p className="text-xs text-slate-500 leading-normal">
              Envie payload JSON em tempo real sobre desvios para seu sistema ERP central, software de gestão de incidentes, ou sinaleiras CLP no galpão.
            </p>

            <div className="space-y-1.5 pt-1">
              <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="webhook-endpoint">
                API Endpoint Webhook (POST JSON)
              </label>
              <input
                id="webhook-endpoint"
                type="url"
                placeholder="https://api.empresa.com/v1/eventos"
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#511024]"
              />
            </div>
          </div>
        </div>

        {/* Right side checkmarks delivery */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BellRing className="w-4 h-4 text-[#511024]" /> Canal de Notificações
            </h3>

            <p className="text-[11px] text-slate-400">
              Escolha quais canais de comunicação devem retransmitir os alertas imediatos do SESMT.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { checked: pushAlert, onChange: () => setPushAlert(!pushAlert), label: 'Notificações Push no Desktop', desc: 'Dispare banner vibratório com sinal sonoro de impacto' },
                { checked: emailAlert, onChange: () => setEmailAlert(!emailAlert), label: 'Alertas por E-mail', desc: 'Envia dockets em PDF contendo as evidências visuais' },
                { checked: whatsappAlert, onChange: () => setWhatsappAlert(!whatsappAlert), label: 'Notificações WhatsApp', desc: 'Disparo no telefone do supervisor sobre invasões críticias' },
                { checked: slack, onChange: () => setSlack(!slack), label: 'Canal de Integração Slack / Discord', desc: 'Sincronizar alertas JSON em salas do SESMT' }
              ].map((item, idx) => (
                <label key={idx} className="flex gap-3 text-xs text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={item.onChange}
                    className="mt-0.5 accent-[#511024]"
                  />
                  <div>
                    <span className="font-bold text-slate-800 block">{item.label}</span>
                    <span className="text-[10px] text-slate-400 leading-normal">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <hr className="border-slate-100" />

            <button
              type="submit"
              className="w-full py-3 bg-[#511024] hover:bg-[#701c38] text-white font-bold text-xs rounded-lg cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Salvar Configurações de IA
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
