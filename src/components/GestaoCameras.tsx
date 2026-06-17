import React, { useState } from 'react';
import { Camera as CameraIcon, Play, AlertCircle, Check, Settings, Trash2, ShieldAlert, Cpu } from 'lucide-react';
import { Camera, StatusCamera } from '../types';
import { SECTORS } from '../data';

interface GestaoCamerasProps {
  cameras: Camera[];
  onAddCamera: (camera: Camera) => void;
  onToggleCameraStatus: (id: string) => void;
  onUpdateCameraRules: (id: string, rules: any) => void;
}

export default function GestaoCameras({
  cameras,
  onAddCamera,
  onToggleCameraStatus,
  onUpdateCameraRules
}: GestaoCamerasProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [cameraName, setCameraName] = useState('');
  const [cameraSetor, setCameraSetor] = useState('Alto Forno');
  const [cameraLocation, setCameraLocation] = useState('');
  const [cameraRtsp, setCameraRtsp] = useState('rtsp://10.120.');
  const [ruleCapacete, setRuleCapacete] = useState(true);
  const [ruleColete, setRuleColete] = useState(true);
  const [ruleInvasao, setRuleInvasao] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cameraName || !cameraRtsp) return;

    const newCam: Camera = {
      id: 'cam-' + (cameras.length + 1),
      nome: cameraName,
      localizacao: cameraLocation || 'Galpão de Atividade',
      setor: cameraSetor,
      rtspUrl: cameraRtsp,
      status: StatusCamera.ATIVA,
      regras: {
        capacete: ruleCapacete,
        colete: ruleColete,
        invasaoArea: ruleInvasao,
        tempoLimite: 60
      }
    };

    onAddCamera(newCam);
    // Reset fields
    setCameraName('');
    setCameraLocation('');
    setCameraRtsp('rtsp://10.120.');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6" id="cameras-management-panel">
      
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase">Monitoramento Físico de Streams</span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Gestão de Câmeras</h1>
          <p className="text-xs text-slate-500">
            Cadastre canais de fluxo de vídeo e configure as assinaturas de visão computacional ativa por área.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-[#511024] hover:bg-[#701c38] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          type="button"
        >
          <CameraIcon className="w-4 h-4" />
          {isAdding ? 'Ver Listagem' : 'Cadastrar Ponto RTSP'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: list of active cameras / creation form */}
        <div className="lg:col-span-2 space-y-4">
          {isAdding ? (
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs space-y-4 animate-fadeIn">
              <h3 className="text-xs font-mono text-[#511024] font-bold tracking-wider uppercase">Novo Nó Sinaleiro de Vídeo (IP)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="camera-name">
                    Identificação da Câmera
                  </label>
                  <input
                    id="camera-name"
                    type="text"
                    placeholder="Ex: Câmera AF-03 Sul"
                    value={cameraName}
                    onChange={(e) => setCameraName(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#511024]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="camera-zone">
                    Área / Setor Industrial
                  </label>
                  <select
                    id="camera-zone"
                    value={cameraSetor}
                    onChange={(e) => setCameraSetor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-700 outline-none cursor-pointer"
                  >
                    {SECTORS.filter(s => s !== 'Geral - Todos os Setores').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="camera-location">
                    Localização Física Detalhada
                  </label>
                  <input
                    id="camera-location"
                    type="text"
                    placeholder="Ex: Plataforma secundária, acima do misturador"
                    value={cameraLocation}
                    onChange={(e) => setCameraLocation(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#511024]"
                    required
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="camera-rtsp">
                    Caminho de Transmissão RTSP Segura
                  </label>
                  <input
                    id="camera-rtsp"
                    type="text"
                    placeholder="rtsp://10.120.44.xx:554/stream"
                    value={cameraRtsp}
                    onChange={(e) => setCameraRtsp(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#511024]"
                    required
                  />
                </div>
              </div>

              {/* AI Rules set in creation */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
                <span className="text-[10px] font-mono text-[#511024] font-bold block uppercase tracking-wider mb-1">Regras de Visão Computacional</span>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center gap-1 text-[11px] text-slate-700">
                    <input type="checkbox" checked={ruleCapacete} onChange={(e) => setRuleCapacete(e.target.checked)} />
                    Exigir Capacete
                  </label>
                  <label className="flex items-center gap-1 text-[11px] text-slate-700">
                    <input type="checkbox" checked={ruleColete} onChange={(e) => setRuleColete(e.target.checked)} />
                    Exigir Colete
                  </label>
                  <label className="flex items-center gap-1 text-[11px] text-slate-700">
                    <input type="checkbox" checked={ruleInvasao} onChange={(e) => setRuleInvasao(e.target.checked)} />
                    Isolamento Cerca
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#511024] hover:bg-[#701c38] text-white text-xs font-semibold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4" /> Comissionar Câmera
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              {cameras.map((cam) => (
                <div key={cam.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-xs flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="p-2.5 bg-slate-50 hover:bg-[#511024]/10 rounded-lg shrink-0 border border-slate-100 flex items-center justify-center text-slate-500">
                      <CameraIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-800 text-xs">{cam.nome}</h4>
                        <span className={`w-2 h-2 rounded-full ${cam.status === 'Ativa' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      </div>
                      <p className="text-[10px] text-slate-400">{cam.localizacao}</p>
                      <span className="text-[9px] font-mono text-slate-500 bg-slate-50 rounded px-1 mt-1 inline-block">{cam.rtspUrl}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end justify-between gap-2 text-right">
                    <div className="flex gap-1">
                      {cam.regras.capacete && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-red-50 text-red-700 border border-red-200 uppercase font-bold font-mono">capacete</span>
                      )}
                      {cam.regras.colete && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-50 text-amber-700 border border-amber-200 uppercase font-bold font-mono">colete</span>
                      )}
                      {cam.regras.invasaoArea && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-rose-50 text-rose-700 border border-rose-200 uppercase font-bold font-mono">área restrita</span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleCameraStatus(cam.id)}
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded transition-all cursor-pointer ${
                        cam.status === 'Ativa' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                      type="button"
                    >
                      {cam.status === 'Ativa' ? 'Suspender Stream' : 'Ativar Stream'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side: AI edge node status summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Configuração AI Edge Node</h3>
          
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg flex gap-3 text-xs text-slate-600">
            <Cpu className="w-5 h-5 text-[#511024] shrink-0 animate-pulse" />
            <div className="space-y-1">
              <span className="font-bold text-slate-800 text-xs">Unidade Edge-Station #02</span>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                As conexões operam sob codec H.264 comprimido no cluster de GPUs Nvidia Jetson Orin Nano, com decodificação direta de baixa latência em barramento interno.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Largura de banda de streaming</span>
              <span className="font-mono text-slate-700 font-bold">14.2 Mbps</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Média de FPS calculada</span>
              <span className="font-mono text-slate-700 font-bold">29.8 fps</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Câmeras sintonizadas no nó</span>
              <span className="font-mono text-slate-700 font-bold">5 de 6</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
