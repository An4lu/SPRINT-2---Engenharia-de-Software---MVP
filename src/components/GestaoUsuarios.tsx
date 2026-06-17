import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail, Calendar, LogIn, Trash2, Edit3, Check, X } from 'lucide-react';
import { Usuario, Perfil } from '../types';

interface GestaoUsuariosProps {
  usuarios: Usuario[];
  onAddUsuario: (user: Usuario) => void;
  onToggleUserStatus: (id: string) => void;
  onUpdateUserRole: (id: string, role: Perfil) => void;
}

export default function GestaoUsuarios({
  usuarios,
  onAddUsuario,
  onToggleUserStatus,
  onUpdateUserRole
}: GestaoUsuariosProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newNome, setNewNome] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPerfil, setNewPerfil] = useState<Perfil>(Perfil.SUPERVISOR);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNome || !newEmail) return;

    const newUser: Usuario = {
      id: 'u-' + (usuarios.length + 11),
      nome: newNome,
      email: newEmail,
      perfil: newPerfil,
      status: 'Ativo',
      cadastroDate: new Date().toISOString().split('T')[0]
    };

    onAddUsuario(newUser);
    setNewNome('');
    setNewEmail('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6" id="users-management">
      
      {/* Title Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-[#511024] font-semibold tracking-wider uppercase">Controle de Segurança Logic-Gate</span>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Gestão de Usuários</h1>
          <p className="text-xs text-slate-500">
            Gerencie credenciais de acesso, perfis funcionais e status da equipe do SESMT.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-[#511024] hover:bg-[#701c38] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          type="button"
        >
          <UserPlus className="w-4 h-4" />
          {isAdding ? 'Ver Listagem' : 'Cadastrar Membro'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Create Form or instructions banner */}
        <div className="lg:col-span-1">
          {isAdding ? (
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs space-y-4 animate-fadeIn">
              <h3 className="text-xs font-mono text-[#511024] font-bold tracking-wider uppercase mb-3">Novo Usuário</h3>
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="user-name">
                  Nome Completo
                </label>
                <input
                  id="user-name"
                  type="text"
                  placeholder="Carlos Souza Ramos"
                  value={newNome}
                  onChange={(e) => setNewNome(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#511024]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="user-email">
                  E-mail Corporativo
                </label>
                <input
                  id="user-email"
                  type="email"
                  placeholder="carlos@siderurgica.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#511024]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-400 block" htmlFor="user-profile">
                  Perfil de Acesso
                </label>
                <select
                  id="user-profile"
                  value={newPerfil}
                  onChange={(e) => setNewPerfil(e.target.value as Perfil)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-700 outline-none cursor-pointer"
                >
                  <option value={Perfil.SUPERVISOR}>{Perfil.SUPERVISOR}</option>
                  <option value={Perfil.GESTOR}>{Perfil.GESTOR}</option>
                  <option value={Perfil.ADMIN}>{Perfil.ADMIN}</option>
                  <option value={Perfil.OPERADOR}>{Perfil.OPERADOR}</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#511024] hover:bg-[#701c38] text-white text-xs font-semibold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4" /> Registrar no SESMT
              </button>
            </form>
          ) : (
            <div className="bg-[#511024] rounded-xl p-5 text-white space-y-3 relative overflow-hidden shadow-xs border border-[#701c38]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-6 -mt-6" />
              <Shield className="w-6 h-6 text-red-200 animate-sensor-pulse" />
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase">Políticas de Permissão</h3>
              <p className="text-xs text-red-100 leading-relaxed">
                A plataforma SafeVision AI adota controle de acesso baseado em funções (RBAC). Apenas Administradores podem cadastrar câmeras e reconfigurar caminhos de endpoints RTSP.
              </p>
            </div>
          )}
        </div>

        {/* Users lists tabular column */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto font-sans">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-700 font-bold uppercase tracking-wider font-mono text-[10px]">
                    <th className="py-3 px-4">Usuário</th>
                    <th className="py-3 px-4">Função SESMT</th>
                    <th className="py-3 px-4">Data Registro</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right font-mono">Alterar Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {usuarios.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* User Profile info */}
                      <td className="py-3 px-4 font-sans flex items-center gap-2.5">
                        <img
                          src={usr.avatar || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=60&auto=format&fit=crop'}
                          alt={usr.nome}
                          className="w-8 h-8 rounded-full border bg-slate-100"
                        />
                        <div>
                          <div className="font-bold text-slate-800 text-xs">{usr.nome}</div>
                          <div className="text-slate-400 font-mono text-[10px] flex items-center gap-0.5"><Mail className="w-3 h-3" /> {usr.email}</div>
                        </div>
                      </td>

                      {/* Role selection dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={usr.perfil}
                          onChange={(e) => onUpdateUserRole(usr.id, e.target.value as Perfil)}
                          className="bg-slate-50 border border-slate-100 rounded px-2 py-1 text-xs text-slate-700 outline-none cursor-pointer"
                        >
                          <option value={Perfil.ADMIN}>{Perfil.ADMIN}</option>
                          <option value={Perfil.GESTOR}>{Perfil.GESTOR}</option>
                          <option value={Perfil.SUPERVISOR}>{Perfil.SUPERVISOR}</option>
                          <option value={Perfil.OPERADOR}>{Perfil.OPERADOR}</option>
                        </select>
                      </td>

                      {/* Created Date */}
                      <td className="py-3 px-4 font-mono">
                        {usr.cadastroDate}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          usr.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {usr.status}
                        </span>
                      </td>

                      {/* Reset Status Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onToggleUserStatus(usr.id)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded transition-all cursor-pointer ${
                            usr.status === 'Ativo'
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                          type="button"
                        >
                          {usr.status === 'Ativo' ? 'Bloquear' : 'Desbloquear'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
