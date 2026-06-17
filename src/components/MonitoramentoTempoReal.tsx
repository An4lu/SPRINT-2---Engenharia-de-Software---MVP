import React, { useState, useEffect, useRef } from 'react';
import { Camera as CameraIcon, Shield, ShieldAlert, Heart, RefreshCw, AlertOctagon, Info, Play, Pause, Radio, Zap } from 'lucide-react';
import { Camera, Ocorrencia, Risco, Alerta, StatusAlerta, Perfil, Usuario } from '../types';
import { INITIAL_CAMERAS, INITIAL_OPERADORES } from '../data';

interface MonitoramentoTempoRealProps {
  cameras: Camera[];
  currentUser: Usuario;
  onAddOccurrence: (occurrence: Ocorrencia) => void;
  onAddAlert: (alert: Alerta) => void;
}

export default function MonitoramentoTempoReal({
  cameras,
  currentUser,
  onAddOccurrence,
  onAddAlert
}: MonitoramentoTempoRealProps) {
  const [selectedCameraId, setSelectedCameraId] = useState<string>(cameras[0]?.id || 'cam-1');
  const [isLive, setIsLive] = useState(true);
  const selectedCamera = cameras.find(c => c.id === selectedCameraId) || cameras[0];
  const [simulationStatus, setSimulationStatus] = useState<string>('');
  
  // States of detected items (animating in canvas/HTML overlay)
  const [frameTick, setFrameTick] = useState(0);

  // Auto tick to simulate bounding box animation flickering/movement slightly representing the AI track
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setFrameTick(prev => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [isLive]);

  // Handle simulated action trigger
  const handleTriggerSimulation = (type: 'capacete' | 'colete' | 'invasao') => {
    const randomOperator = INITIAL_OPERADORES[Math.floor(Math.random() * INITIAL_OPERADORES.length)];
    const occId = 'oc-sim-' + Math.floor(Math.random() * 1000 + 100);
    const alertId = 'al-sim-' + Math.floor(Math.random() * 1000 + 100);
    const timestamp = new Date().toISOString();

    let desc = '';
    let label: 'Sem Capacete' | 'Sem Colete' | 'Área Restrita' = 'Sem Capacete';
    let risk = Risco.ALTO;

    if (type === 'capacete') {
      desc = `Operador ${randomOperator.nome} (Matrícula: ${randomOperator.matricula}) identificado na área de risco de ${selectedCamera.setor} sem o CAPACETE de segurança obrigatório.`;
      label = 'Sem Capacete';
      risk = Risco.CRITICO;
    } else if (type === 'colete') {
      desc = `Operador ${randomOperator.nome} (Matrícula: ${randomOperator.matricula}) visualizado sem COLETE REFLETIVO de sinalização ativa em zona de circulação pesada.`;
      label = 'Sem Colete';
      risk = Risco.MEDIO;
    } else {
      desc = `Operador ${randomOperator.nome} (Matrícula: ${randomOperator.matricula}) violou o isolamento óptico de segurança no perímetro do setor ${selectedCamera.setor}.`;
      label = 'Área Restrita';
      risk = Risco.CRITICO;
    }

    const newOcc: Ocorrencia = {
      id: occId,
      timestamp,
      risco: risk,
      descricao: desc,
      imagemPrompt: label === 'Área Restrita' ? 'Homem de uniforme cruzando barreira amarela' : `Trabalhador sem ${type}`,
      camera: selectedCamera.nome,
      setor: selectedCamera.setor,
      operador: randomOperator.nome,
      tipo: label,
      status: 'Pendente',
      comentarios: [
        {
          autor: 'SafeVision Computação Gráfica (AI)',
          texto: `Geração automática de trigger solicitado pelo supervisor ${currentUser.nome}. Confiança IA: 98%`,
          data: timestamp
        }
      ]
    };

    const newAlert: Alerta = {
      id: alertId,
      ocorrenciaId: occId,
      timestamp,
      prioridade: risk,
      status: StatusAlerta.ATIVO,
      mensagem: `${label.toUpperCase()} EM ${selectedCamera.nome.toUpperCase()} - ${randomOperator.cargo.toUpperCase()}`,
      setor: selectedCamera.setor,
      cameraName: selectedCamera.nome
    };

    onAddOccurrence(newOcc);
    onAddAlert(newAlert);
    
    setSimulationStatus(`Sucesso! Medida protetiva falhou. Ocorrência #${occId} e Alerta #${alertId} foram expedidos em tempo real para o SESMT.`);
    
    // Play a brief high-pitched tone indicating an industrial alarm (safely generated using AudioContext if supported)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(680, audioCtx.currentTime); // high safety pitch
      oscillator.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.6);
      
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // AudioContext blocker fallback
    }

    // Reset status banner
    setTimeout(() => {
      setSimulationStatus('');
    }, 6000);
  };

  // Simulating slightly shifting coordinates for AI tracking box
  const shift = (frameTick % 2 === 0) ? 4 : 0;
  const confidenceHelmet = 95 + (frameTick % 4);
  const confidenceVest = 91 - (frameTick % 3);

  return (
    <div className="space-y-6" id="realtime-monitoring">
      
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-[#511024] animate-sensor-pulse" /> IA Inference Streaming Terminal
          </span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Monitoramento em Tempo Real</h1>
          <p className="text-xs text-slate-500">
            Câmeras industriais processadas por algoritmos YOLO em tempo real sobre infraestrutura de borda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 ${
            isLive ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-600 animate-pulse' : 'bg-slate-400'}`} />
            {isLive ? 'LIVE INFERENCE: ATIVO' : 'STREAMING PAUSADO'}
          </span>

          <button
            onClick={() => setIsLive(!isLive)}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1"
            type="button"
          >
            {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isLive ? 'Congelar Frame' : 'Retomar Stream'}
          </button>
        </div>
      </div>

      {/* Simulator Response Alert Action */}
      {simulationStatus && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2.5 animate-bounce">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{simulationStatus}</span>
        </div>
      )}

      {/* Grid Canvas and Sidebar Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 cols: Selected Camera Canvas Streaming */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-950 shadow-lg relative aspect-video flex flex-col justify-between">
            {/* Camera Overlay HUD (Scanline and top telemetry) */}
            <div className="absolute inset-0 bg-[#000000]/2 opacity-[0.03] pointer-events-none" />
            
            {/* Live blinking sensor overlay */}
            {isLive && <div className="animate-scanning pointer-events-none" />}

            {/* Top HUD Telemetry */}
            <div className="relative z-10 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between text-white font-mono text-[10px] md:text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-sensor-pulse" />
                  <span className="font-bold uppercase">{selectedCamera.nome}</span>
                </div>
                <div className="text-slate-400 flex items-center gap-1">
                  <span>URL:</span>
                  <span className="text-slate-300 select-all">{selectedCamera.rtspUrl}</span>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <div>UTC TIME: 2026-06-16 22:56:{frameTick % 60 < 10 ? '0' + (frameTick % 60) : frameTick % 60}</div>
                <div className="text-red-400">FPS: 30.2 • INFERENCE TIME: 16ms • GPU: 44.8°C</div>
              </div>
            </div>

            {/* Simulated Live Frame Background (Unsplash Premium Industry photo covered with AI grids) */}
            <div className="absolute inset-0 select-none">
              {selectedCamera.id === 'cam-1' && (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000')" }} />
              )}
              {selectedCamera.id === 'cam-2' && (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000')" }} />
              )}
              {selectedCamera.id === 'cam-3' && (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000')" }} />
              )}
              {selectedCamera.id === 'cam-4' && (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000')" }} />
              )}
              {selectedCamera.id === 'cam-5' && (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000')" }} />
              )}
              {selectedCamera.id === 'cam-6' && (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1000')" }} />
              )}

              {/* General Camera status cover if inactive */}
              {selectedCamera.status === 'Inativa' && (
                <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center text-white text-center p-8 z-20 space-y-2">
                  <AlertOctagon className="w-12 h-12 text-slate-500 animate-pulse" />
                  <div className="font-display font-medium text-sm md:text-base">TRANSMISSÃO RTSP OFFLINE</div>
                  <div className="text-xs text-slate-400 font-mono">CÂMERA EM CONFIGURAÇÃO DE ROTINA OU MANUTENÇÃO</div>
                </div>
              )}
            </div>

            {/* Simulated Live Floating AI Bounding Boxes (Only visible when camera is active and playing live) */}
            {isLive && selectedCamera.status === 'Ativa' && (
              <div className="absolute inset-0 z-10 pointer-events-none" id="ai-bounding-overlay">
                
                {/* Operator 1 bounding box: Safe compliant worker */}
                <div
                  className="absolute border-2 border-emerald-500 bg-emerald-500/10 text-white font-mono text-[9px] transition-all duration-1000"
                  style={{
                    top: `${30 + shift}%`,
                    left: `${20 + shift / 2}%`,
                    width: '18%',
                    height: '55%'
                  }}
                >
                  <div className="bg-emerald-600 px-1 py-0.5 font-bold flex flex-col">
                    <span>OPERADOR 01 [CONFORME]</span>
                    <span>CONF: 98%</span>
                  </div>
                  {/* Internal sub-bounding box: Helmet */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 border border-emerald-400 bg-emerald-600/30 px-1 font-semibold text-[8px]">
                    CAPACETE {confidenceHelmet}%
                  </div>
                  {/* Internal sub-bounding box: Vest */}
                  <div className="absolute top-[25%] left-1 w-[90%] border border-emerald-400 bg-emerald-600/30 text-center font-semibold text-[8px]">
                    COLETE {confidenceVest}%
                  </div>
                </div>

                {/* Operator 2: Flagged non-conformity bounding box (faking incident indicator overlay) */}
                <div
                  className="absolute border-2 border-rose-600 bg-rose-600/5 text-white font-mono text-[9px] transition-all duration-1000"
                  style={{
                    top: `${40 - shift / 4}%`,
                    left: `${65 - shift / 6}%`,
                    width: '15%',
                    height: '45%'
                  }}
                >
                  <div className="bg-rose-600 px-1 py-0.5 font-bold flex flex-col">
                    <span className="flex items-center gap-0.5">⚠️ OPERADOR DETECTADO</span>
                    <span>CONF: 94%</span>
                  </div>

                  {/* Helmet Sub-box: INFRACAO flag */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 border-2 border-red-500 bg-red-700/80 px-1 py-0.5 text-[8px] font-bold text-red-100 animate-pulse text-center leading-none">
                    AUSÊNTE CAPACETE<br/>ALERTA SESMT
                  </div>
                </div>
                
                {/* Geofence area polygon outline (Restricted area geofence) */}
                {selectedCamera.regras.invasaoArea && (
                  <div className="absolute bottom-4 right-1/4 w-44 h-24 border-2 border-dashed border-red-500 bg-red-600/10 rounded-lg flex items-center justify-center font-mono text-[9px] text-red-400">
                    <span className="bg-slate-900/80 px-1.5 py-0.5 rounded border border-red-500/20 uppercase tracking-wider font-bold">POLÍGONO ISOLAMENTO ATIVO</span>
                  </div>
                )}
              </div>
            )}

            {/* Bottom HUD Metadata */}
            <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end text-neutral-200">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#511024] bg-white rounded px-2 py-0.5 font-bold">EDGE-AI AGENT ON</span>
                <h4 className="text-sm font-bold truncate max-w-xs">{selectedCamera.localizacao}</h4>
              </div>

              <div className="flex gap-2 text-xs font-mono">
                <span className="bg-slate-800/80 px-2 py-1 rounded">Regras: {selectedCamera.regras.capacete ? 'Capacete' : ''} {selectedCamera.regras.colete ? '• Colete' : ''} {selectedCamera.regras.invasaoArea ? '• Área Restrita' : ''}</span>
              </div>
            </div>
          </div>

          {/* Quick interactive incident simulator panel for demonstration testing (critical criteria: "Gerar alertas automáticos", "Eventos críticos devem gerar alerta imediato. Dashboard atualiza em tempo real") */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#511024]" />
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Gatilho de Simulação Operacional — Teste de IA</h3>
                  <p className="text-[11px] text-slate-500">Forçe falhas do operador para estressar o motor SafeVision e validar o disparo dos alertas em tempo real.</p>
                </div>
              </div>
              <span className="bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 rounded font-mono uppercase tracking-wider font-bold">Modo Supervisor</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleTriggerSimulation('capacete')}
                className="p-3 bg-red-50/50 hover:bg-slate-50 border border-red-200 rounded-xl hover:border-[#511024] transition-all text-left text-xs group cursor-pointer"
                disabled={selectedCamera.status === 'Inativa'}
                type="button"
              >
                <div className="font-bold text-red-950 flex items-center gap-1.5 mb-1 justify-between">
                  <span>Trabalhador sem Capacete</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-red-600 text-white rounded">HIGH RISK</span>
                </div>
                <p className="text-slate-500 text-[10px] leading-relaxed group-hover:text-slate-800 transition-colors">Simula entrada no alto forno desprotegido. Dispara flash crítico.</p>
              </button>

              <button
                onClick={() => handleTriggerSimulation('colete')}
                className="p-3 bg-amber-50/30 hover:bg-slate-50 border border-amber-200 rounded-xl hover:border-[#511024] transition-all text-left text-xs group cursor-pointer"
                disabled={selectedCamera.status === 'Inativa'}
                type="button"
              >
                <div className="font-bold text-amber-950 flex items-center gap-1.5 mb-1 justify-between">
                  <span>Falta de Sinalização Colete</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-amber-500 text-slate-950 rounded">MÉDIO</span>
                </div>
                <p className="text-slate-500 text-[10px] leading-relaxed group-hover:text-slate-800 transition-colors">Simula operador de pátio na doca com colete oculto.</p>
              </button>

              <button
                onClick={() => handleTriggerSimulation('invasao')}
                className="p-3 bg-red-50/50 hover:bg-slate-50 border border-red-200 rounded-xl hover:border-[#511024] transition-all text-left text-xs group cursor-pointer"
                disabled={selectedCamera.status === 'Inativa' || !selectedCamera.regras.invasaoArea}
                type="button"
              >
                <div className="font-bold text-red-950 flex items-center gap-1.5 mb-1 justify-between">
                  <span>Invasão de Limite Óptico</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-red-600 text-white rounded">CRITICAL</span>
                </div>
                <p className="text-slate-500 text-[10px] leading-relaxed group-hover:text-slate-800 transition-colors">Simula operador cruzando os limites demarcados sob a ponte.</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 col: Interactive list of cameras */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-950">Selecione o Canal</h3>
            <div className="space-y-2 max-h-[440px] overflow-y-auto">
              {cameras.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setSelectedCameraId(cam.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col gap-1 cursor-pointer ${
                    selectedCameraId === cam.id
                      ? 'border-[#511024] bg-red-50/20'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/30'
                  }`}
                  id={`camera-selector-${cam.id}`}
                  type="button"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 truncate block max-w-[130px]">{cam.nome}</span>
                    <span className={`w-2 h-2 rounded-full ${cam.status === 'Ativa' ? 'bg-emerald-500 animate-sensor-pulse' : 'bg-slate-400'}`} />
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{cam.setor}</div>
                  <div className="text-[9px] font-mono text-slate-500 mt-1 truncate bg-slate-50 p-1 rounded select-all">{cam.rtspUrl}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-2">
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#511024]" />
              <h4 className="text-xs font-bold text-slate-950">Dicas SESMT</h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed md:leading-normal">
              O feed de streams em tempo real é simulado localmente. Caso queira cadastrar novos canais de vídeo operacionais com suas respectivas regras, visite a tela de <strong>Gestão de Câmeras</strong> na barra lateral esquerda.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
