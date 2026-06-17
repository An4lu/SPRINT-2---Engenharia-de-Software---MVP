import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Key, AlertTriangle, Cpu, Terminal } from 'lucide-react';
import { Usuario } from '../types';
import { INITIAL_USUARIOS } from '../data';

interface LoginProps {
  onLoginSuccess: (usuario: Usuario) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, informe seu e-mail corporativo.');
      return;
    }
    setError('');
    setLoading(true);

    // Look for matching user in seed database
    setTimeout(() => {
      const match = INITIAL_USUARIOS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (match) {
        if (match.status === 'Bloqueado') {
          setError('Este perfil está bloqueado temporariamente por auditoria de segurança.');
          setLoading(false);
          return;
        }
        onLoginSuccess(match);
      } else {
        // Fallback or create mock user if not matches
        const fallbackUser: Usuario = {
          id: 'u-custom',
          nome: email.split('@')[0].toUpperCase(),
          email: email,
          perfil: email.includes('admin') ? 'Administrador' as any : 'Gestor de Segurança' as any,
          status: 'Ativo',
          cadastroDate: new Date().toISOString().split('T')[0]
        };
        onLoginSuccess(fallbackUser);
      }
      setLoading(false);
    }, 800);
  };

  const selectQuickProfile = (u: Usuario) => {
    setEmail(u.email);
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FBF9F8]" id="login-screen">
      {/* Visual Industrial Branding Column */}
      <div className="w-full md:w-1/2 bg-[#511024] flex flex-col justify-between p-8 md:p-12 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-black/40 via-[#511024] to-[#701c38]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl border border-white/25">
            <Shield className="w-6 h-6 text-red-100" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold tracking-tight">SafeVision <span className="text-red-400">AI</span></h1>
            <p className="text-[10px] text-red-200 tracking-wider font-mono uppercase">Industrial Safety Suite</p>
          </div>
        </div>

        <div className="relative z-10 my-auto py-12 max-w-md space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-950/40 text-red-300 text-xs font-mono rounded-full border border-red-500/20">
            <Cpu className="w-3.5 h-3.5" /> IA & VISÃO COMPUTACIONAL 24X7
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight">
            Monitoramento preventivo de alta acurácia operacional
          </h2>
          <p className="text-red-100/80 text-sm leading-relaxed">
            Elimine auditorias reativas. Detectamos desvios crítico de EPIs, invasões de áreas perigosas e quedas de operadores em tempo real com menos de 1s de latência.
          </p>

          <div className="pt-4 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-white/15 rounded text-[10px] font-mono border border-white/10">YOLOv11 Edge Inference</span>
            <span className="px-2 py-1 bg-white/15 rounded text-[10px] font-mono border border-white/10">RTSP Frame Engine</span>
            <span className="px-2 py-1 bg-white/15 rounded text-[10px] font-mono border border-white/10">ISO 45001 Audits</span>
          </div>
        </div>

        <div className="relative z-10 text-xs text-red-300/60 font-mono flex items-center gap-2">
          <Terminal className="w-4 h-4" /> SECURE DEPLOYMENT ENGINE V2.14 • CLOUD RUN
        </div>
      </div>

      {/* Form Credentials Column */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-14 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Acesse a Plataforma</h3>
            <p className="text-slate-500 text-sm">
              Insira suas credenciais corporativas registradas no SESMT.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2.5 text-xs text-red-800 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="email-input">
                E-mail Corporativo
              </label>
              <div className="relative">
                <input
                  id="email-input"
                  type="email"
                  placeholder="usuario@siderurgica.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-4 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#511024] focus:border-[#511024] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-700 uppercase tracking-wider" htmlFor="password-input">
                  Senha de Acesso
                </label>
                <button
                  type="button"
                  className="text-xs text-[#511024] hover:underline"
                  onClick={() => setError('Por favor, solicite a redefinição de chave física junto ao administrador de rede (Ana Luísa).')}
                >
                  Esqueceu?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#511024] focus:border-[#511024] transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#511024]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#511024] hover:bg-[#701c38] disabled:bg-slate-300 text-white font-medium text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Validando token corporativo...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Entrar com Segurança</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Sandbox Profiles Switcher */}
          <div className="pt-6 border-t border-slate-100">
            <span className="block text-[11px] font-mono tracking-wider uppercase text-slate-400 mb-3 text-center">
              Sandbox - Perfis de Acesso Rápido
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {INITIAL_USUARIOS.filter(u => u.status === 'Ativo').slice(0, 3).map((u) => (
                <button
                  key={u.id}
                  onClick={() => selectQuickProfile(u)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    email.toLowerCase() === u.email.toLowerCase()
                      ? 'border-[#511024] bg-red-50/30'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  type="button"
                >
                  <div className="font-bold text-xs text-slate-800 leading-tight truncate">{u.nome.split(' ')[0]} {u.nome.split(' ').slice(-1)[0]}</div>
                  <div className="text-[10px] text-[#511024] font-medium mt-0.5">{u.perfil}</div>
                  <div className="text-[9px] text-slate-400 font-mono mt-1 break-all truncate">{u.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
