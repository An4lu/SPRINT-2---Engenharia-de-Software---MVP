import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Layers,
  Camera as CameraIcon,
  BellRing,
  AlertTriangle,
  FileText,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Info,
  Menu,
  X,
  Volume2,
  VolumeX,
  Compass,
  Cpu
} from 'lucide-react';

import {
  Usuario,
  Camera,
  Ocorrencia,
  Alerta,
  ConfigAI,
  StatusAlerta,
  Perfil,
  Risco
} from './types';

import {
  INITIAL_USUARIOS,
  INITIAL_CAMERAS,
  INITIAL_OCORRENCIAS,
  INITIAL_ALERTAS,
  DEFAULT_CONFIG_AI
} from './data';

// Component imports
import Login from './components/Login';
import DashboardExecutivo from './components/DashboardExecutivo';
import MonitoramentoTempoReal from './components/MonitoramentoTempoReal';
import CentralAlertas from './components/CentralAlertas';
import Ocorrencias from './components/Ocorrencias';
import Relatorios from './components/Relatorios';
import GestaoUsuarios from './components/GestaoUsuarios';
import GestaoCameras from './components/GestaoCameras';
import Configuracoes from './components/Configuracoes';
import DesignDocs from './components/DesignDocs';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<Usuario | null>(() => {
    const saved = localStorage.getItem('safevision_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Database application State
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const saved = localStorage.getItem('safevision_usuarios');
    return saved ? JSON.parse(saved) : INITIAL_USUARIOS;
  });

  const [cameras, setCameras] = useState<Camera[]>(() => {
    const saved = localStorage.getItem('safevision_cameras');
    return saved ? JSON.parse(saved) : INITIAL_CAMERAS;
  });

  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(() => {
    const saved = localStorage.getItem('safevision_ocorrencias');
    return saved ? JSON.parse(saved) : INITIAL_OCORRENCIAS;
  });

  const [alertas, setAlertas] = useState<Alerta[]>(() => {
    const saved = localStorage.getItem('safevision_alertas');
    return saved ? JSON.parse(saved) : INITIAL_ALERTAS;
  });

  const [config, setConfig] = useState<ConfigAI>(() => {
    const saved = localStorage.getItem('safevision_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG_AI;
  });

  // UI Navigation tabs state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedSector, setSelectedSector] = useState<string>('Geral - Todos os Setores');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Sync state changes to local storage for realistic persistent mock data
  useEffect(() => {
    localStorage.setItem('safevision_usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('safevision_cameras', JSON.stringify(cameras));
  }, [cameras]);

  useEffect(() => {
    localStorage.setItem('safevision_ocorrencias', JSON.stringify(ocorrencias));
  }, [ocorrencias]);

  useEffect(() => {
    localStorage.setItem('safevision_alertas', JSON.stringify(alertas));
  }, [alertas]);

  useEffect(() => {
    localStorage.setItem('safevision_config', JSON.stringify(config));
  }, [config]);

  const handleLogin = (user: Usuario) => {
    setCurrentUser(user);
    localStorage.setItem('safevision_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('safevision_current_user');
  };

  // State modifiers - triggered in sub-components
  const handleAddOccurrence = (newOcc: Ocorrencia) => {
    setOcorrencias(prev => [newOcc, ...prev]);
  };

  const handleAddAlert = (newAlert: Alerta) => {
    setAlertas(prev => [newAlert, ...prev]);
    
    // Play sound notification if not muted
    if (!isMuted) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // high warning pitch
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {
        // audio muted fallback
      }
    }
  };

  const handleAcknowledgeAlert = (alertId: string, userName: string) => {
    setAlertas(prev => prev.map(a => {
      if (a.id === alertId) {
        // Appends acknowledgement tag inside corresponding occurrence comments too
        const occurrenceObj = ocorrencias.find(o => o.id === a.ocorrenciaId);
        if (occurrenceObj) {
          const updatedComments = [
            ...occurrenceObj.comentarios,
            {
              autor: userName,
              texto: `Alerta imediato reconhecido pelo operador de rede corporativa. Investigação ativa iniciada.`,
              data: new Date().toISOString()
            }
          ];
          setOcorrencias(orig => orig.map(o => o.id === occurrenceObj.id ? { ...o, comentarios: updatedComments, status: 'Investigando' } : o));
        }
        return { ...a, status: StatusAlerta.RECONHECIDO };
      }
      return a;
    }));
  };

  const handleResolveAlert = (alertId: string, userName: string) => {
    setAlertas(prev => prev.map(a => {
      if (a.id === alertId) {
        // Appends resolution logs
        const occurrenceObj = ocorrencias.find(o => o.id === a.ocorrenciaId);
        if (occurrenceObj) {
          const updatedComments = [
            ...occurrenceObj.comentarios,
            {
                autor: userName,
                texto: `Medidas tomadas com sucesso. Ocorrência resolvida com recolocação de EPI pelo operador.`,
                data: new Date().toISOString()
            }
          ];
          setOcorrencias(orig => orig.map(o => o.id === occurrenceObj.id ? { ...o, comentarios: updatedComments, status: 'Resolvido' } : o));
        }
        return { ...a, status: StatusAlerta.RESOLVIDO };
      }
      return a;
    }));
  };

  const handleUpdateOccurrenceStatus = (id: string, status: 'Pendente' | 'Investigando' | 'Resolvido') => {
    setOcorrencias(prev => prev.map(o => {
      if (o.id === id) {
        // Sync alert state if is resolved
        if (status === 'Resolvido') {
          setAlertas(orig => orig.map(a => a.ocorrenciaId === id ? { ...a, status: StatusAlerta.RESOLVIDO } : a));
        } else if (status === 'Investigando') {
          setAlertas(orig => orig.map(a => a.ocorrenciaId === id ? { ...a, status: StatusAlerta.RECONHECIDO } : a));
        }
        return { ...o, status };
      }
      return o;
    }));
  };

  const handleAddComment = (id: string, author: string, text: string) => {
    setOcorrencias(prev => prev.map(o => {
      if (o.id === id) {
        return {
          ...o,
          comentarios: [
            ...o.comentarios,
            { autor: author, texto: text, data: new Date().toISOString() }
          ]
        };
      }
      return o;
    }));
  };

  const handleAddUsuario = (newUser: Usuario) => {
    setUsuarios(prev => [newUser, ...prev]);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsuarios(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Ativo' ? 'Bloqueado' : 'Ativo' };
      }
      return u;
    }));
  };

  const handleUpdateUserRole = (id: string, role: Perfil) => {
    setUsuarios(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, perfil: role };
      }
      return u;
    }));
  };

  const handleAddCamera = (newCam: Camera) => {
    setCameras(prev => [newCam, ...prev]);
  };

  const handleToggleCameraStatus = (id: string) => {
    setCameras(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Ativa' ? 'Inativa' : 'Ativa' };
      }
      return c;
    }));
  };

  const handleUpdateCameraRules = (id: string, rules: any) => {
    setCameras(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, regras: rules };
      }
      return c;
    }));
  };

  const handleSaveConfig = (updated: ConfigAI) => {
    setConfig(updated);
  };

  // Check if there is any Active Critical Alert in the alerts state
  const criticalActiveAlerts = alertas.filter(a => a.status === StatusAlerta.ATIVO && a.prioridade === Risco.CRITICO);
  const showEmergencyBanner = criticalActiveAlerts.length > 0;

  // Render auth gate if user is not logged in
  if (!currentUser) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  // Sidebar navigation options
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Executivo', icon: Layers, badge: 0 },
    { id: 'realtime', label: 'Tempo Real (YOLO)', icon: CameraIcon, badge: 0 },
    { id: 'alertas', label: 'Central de Alertas', icon: BellRing, badge: alertas.filter(a => a.status === StatusAlerta.ATIVO).length },
    { id: 'ocorrencias', label: 'Controle de Ocorrências', icon: AlertTriangle, badge: ocorrencias.filter(o => o.status === 'Pendente').length },
    { id: 'relatorios', label: 'Expedir Relatórios', icon: FileText, badge: 0 },
    { id: 'usuarios', label: 'Gestão de Usuários', icon: Users, badge: 0 },
    { id: 'cameras', label: 'Gestão de Câmeras', icon: SettingsIcon, badge: 0 },
    { id: 'config', label: 'Ajustes IA & Sensibilidade', icon: Cpu, badge: 0 },
    { id: 'docs', label: 'Figma e UX Specs', icon: Compass, badge: 0 }
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e2e8f0] flex flex-col font-sans relative" id="safevision-framework-root">
      
      {/* ⚠️ REAL-TIME CRITICAL INCIDENT OVERLAY HUD (EPI warning buzzer notification banner) */}
      {showEmergencyBanner && (
        <div className="bg-red-600 text-white font-mono p-3 px-4 shadow-xl z-50 flex flex-col md:flex-row justify-between items-center gap-3 animate-pulse border-b border-red-500">
          <div className="flex items-center gap-3 text-xs md:text-sm">
            <div className="p-1 px-2 bg-white text-red-600 rounded font-bold uppercase text-[10px] tracking-wider shrink-0 animate-sensor-pulse">
              POLÍGONO EM PERIGO CRÍTICO
            </div>
            <p className="font-bold leading-tight">
              ALERTA CRÍTICO ATIVO: {criticalActiveAlerts[0].mensagem} ({criticalActiveAlerts[0].setor})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-white shrink-0 cursor-pointer"
              title="Alternar áudio de sinaleira"
              type="button"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-200" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
            
            <button
              onClick={() => handleAcknowledgeAlert(criticalActiveAlerts[0].id, currentUser.nome)}
              className="px-3.5 py-1 bg-white text-red-700 hover:bg-red-50 text-[11px] font-bold rounded-md transition-all shadow-md shrink-0 cursor-pointer"
              type="button"
            >
              Reconhecer Risco
            </button>
          </div>
        </div>
      )}

      {/* Main SaaS Frame Body */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Mobile Navigation toggle bar */}
        <div className="md:hidden bg-slate-900 text-white p-3.5 flex justify-between items-center border-b border-slate-950 z-30">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span className="font-display font-medium text-xs tracking-tight">SafeVision AI (Mobile UI)</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 bg-slate-800 rounded text-slate-300 hover:text-white"
            type="button"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* 🗺️ SIDEBAR PANEL: Swiss modern layout, pure steel gray aesthetics with red wine accents */}
        <aside
          style={{ backgroundColor: '#1a1d23' }}
          className={`w-72 text-slate-100 flex flex-col justify-between border-r border-slate-950 px-4 py-6 z-40 transition-transform md:translate-x-0 ${
            sidebarOpen ? 'absolute md:relative inset-y-0 left-0 translate-x-0' : 'absolute md:relative -translate-x-full md:translate-x-0'
          }`}
          id="saas-navigation-rail"
        >
          <div className="space-y-6">
            
            {/* Header Platform Logo */}
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 bg-[#511024] rounded-xl border border-red-500/20">
                <ShieldAlert className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-sm font-display font-bold text-white tracking-tight" style={{ backgroundColor: '#1a1d23', color: '#511024' }}>SafeVision <span className="text-red-400">AI</span></h2>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Siderurgia &amp; Mineração</p>
              </div>
            </div>

            {/* Selection menu widgets */}
            <nav className="space-y-1.5" id="navigation-list">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      activeTab === item.id
                        ? 'bg-[#511024] text-white font-bold border border-red-500/20'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                    }`}
                    id={`nav-item-${item.id}`}
                    type="button"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${activeTab === item.id ? 'text-red-300' : 'text-slate-500'}`} />
                      <span style={item.id === 'dashboard' ? { color: '#ffa2a2' } : undefined}>{item.label}</span>
                    </div>

                    {item.badge > 0 && (
                      <span className="px-1.5 py-0.5 bg-rose-600 text-white font-mono text-[9px] font-bold rounded-full animate-sensor-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Logged user footer card */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-3 px-2">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=60&auto=format&fit=crop'}
                alt={currentUser.nome}
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-800"
              />
              <div className="truncate">
                <h4 className="text-xs font-bold text-slate-200 truncate">{currentUser.nome}</h4>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.perfil}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 bg-slate-800/40 hover:bg-slate-800 hover:text-red-300 text-slate-400 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-slate-800/20"
              type="button"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair da Sessão</span>
            </button>
          </div>
        </aside>

        {/* Content Viewer viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          
          {/* Dashboard Executivo */}
          {activeTab === 'dashboard' && (
            <DashboardExecutivo
              ocorrencias={ocorrencias}
              alertas={alertas}
              onSetTab={setActiveTab}
              onFilterSector={setSelectedSector}
              selectedSector={selectedSector}
            />
          )}

          {/* Tempo Real Stream Frame overlay */}
          {activeTab === 'realtime' && (
            <MonitoramentoTempoReal
              cameras={cameras}
              currentUser={currentUser}
              onAddOccurrence={handleAddOccurrence}
              onAddAlert={handleAddAlert}
            />
          )}

          {/* Central de Alertas */}
          {activeTab === 'alertas' && (
            <CentralAlertas
              alertas={alertas}
              currentUser={currentUser}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onResolveAlert={handleResolveAlert}
            />
          )}

          {/* Controle de Ocorrências */}
          {activeTab === 'ocorrencias' && (
            <Ocorrencias
              ocorrencias={ocorrencias}
              currentUser={currentUser}
              onUpdateOccurrenceStatus={handleUpdateOccurrenceStatus}
              onAddComment={handleAddComment}
            />
          )}

          {/* Expedir Relatórios */}
          {activeTab === 'relatorios' && (
            <Relatorios
              ocorrencias={ocorrencias}
              alertas={alertas}
            />
          )}

          {/* Gestão de Usuários */}
          {activeTab === 'usuarios' && (
            <GestaoUsuarios
              usuarios={usuarios}
              onAddUsuario={handleAddUsuario}
              onToggleUserStatus={handleToggleUserStatus}
              onUpdateUserRole={handleUpdateUserRole}
            />
          )}

          {/* Gestão de Câmeras */}
          {activeTab === 'cameras' && (
            <GestaoCameras
              cameras={cameras}
              onAddCamera={handleAddCamera}
              onToggleCameraStatus={handleToggleCameraStatus}
              onUpdateCameraRules={handleUpdateCameraRules}
            />
          )}

          {/* Ajustes de Sensibilidade IA */}
          {activeTab === 'config' && (
            <Configuracoes
              config={config}
              onSaveConfig={handleSaveConfig}
            />
          )}

          {/* Design System & Sprint 1 Documentation of Decisions */}
          {activeTab === 'docs' && (
            <DesignDocs />
          )}

        </main>
      </div>
    </div>
  );
}
