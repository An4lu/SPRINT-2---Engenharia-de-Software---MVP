import React from 'react';
import { BookOpen, Shield, Users, Layers, Cpu, Compass, HelpCircle, FileText } from 'lucide-react';

export default function DesignDocs() {
  return (
    <div className="space-y-8" id="design-docs-container">
      {/* Hero Banner */}
      <div className="bg-[#511024] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-[#701c38]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#701c38] text-red-200 text-xs font-mono tracking-wider rounded-full border border-red-500/30">
            <BookOpen className="w-3.5 h-3.5" /> WORKSPACE DESIGN SYSTEM & UX SPECIFICATION
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight">
            SafeVision AI — Design & Sprint 1 Documentation
          </h1>
          <p className="text-red-100 font-sans text-sm md:text-base leading-relaxed">
            Decisões e justificativas UX do protótipo de alta fidelidade da plataforma de segurança industrial baseada em Visão Computacional.
          </p>
        </div>
      </div>

      {/* Grid of Key Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Design Decisions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Decisões Visuais & Cores */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-display font-bold text-slate-950 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#511024]" /> Diretrizes Visuais & Paleta Industrial
            </h2>
            <div className="p-4 bg-slate-50 rounded-lg text-xs leading-relaxed text-slate-600 font-sans border border-slate-100 space-y-2">
              <p>
                <strong>Vibe e Tom do Sistema:</strong> Desenhado com um visual corporativo de alta observabilidade operacional que remete aos modernos ambientes siderúrgicos e petroquímicos. Buscamos conciliar segurança de dados extrema com visual elegante.
              </p>
              <p>
                <strong>Decisões de Cores Reais:</strong>
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-[#511024] rounded-lg border border-[#701c38] text-white">
                <div className="font-mono text-xs font-bold">#511024</div>
                <div className="text-xs text-red-200 mt-1">Vinho Industrial</div>
                <div className="text-[10px] text-red-300">Cor Principal. Representa calor siderúrgico e autoridade operacional.</div>
              </div>

              <div className="p-3 bg-[#535657] rounded-lg border border-slate-400 text-white">
                <div className="font-mono text-xs font-bold">#535657</div>
                <div className="text-xs text-slate-200 mt-1">Cinza Aço</div>
                <div className="text-[10px] text-slate-300">Estruturas neutras, trilhos e componentes secundários.</div>
              </div>

              <div className="p-3 bg-amber-500 rounded-lg text-slate-950">
                <div className="font-mono text-xs font-bold">#F59E0B</div>
                <div className="text-xs text-[#511024] mt-1 font-semibold">Alerta Médio/Alto</div>
                <div className="text-[10px] text-amber-950">Indica atenção e ausências mitigadas de EPI.</div>
              </div>

              <div className="p-3 bg-red-600 rounded-lg text-white">
                <div className="font-mono text-xs font-bold">#EF4444</div>
                <div className="text-xs text-red-100 mt-1">Alerta Crítico</div>
                <div className="text-[10px] text-red-950">Área vermelha. Risco fatal imediato / Invasões críticas de segurança.</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-slate-800">Tipografia Integrada:</h3>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                <li><strong className="font-display">Space Grotesk:</strong> Utilizada em grandes displays, contadores numéricos e cabeçalhos principais para estabelecer o teor moderno e tecnológico.</li>
                <li><strong>Inter:</strong> Utilizada em parágrafos e inputs para manter alta legibilidade e conformidade regulatória nas tabelas.</li>
                <li><strong className="font-mono text-xs">JetBrains Mono:</strong> Aplicada a IDs de câmeras, coordenadas UTM, logs do terminal de IA, timestamps de alerta e URLs RTSP para simular os feeds reais das redes industriais.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Casos de Uso Sprint 1 e Mapa de Navegação */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-display font-bold text-slate-950 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#511024]" /> Mapeamento de Casos de Uso & Matriz da Sprint 1
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-700 font-bold">
                    <th className="py-2 px-3">Caso de Uso (Sprint 1)</th>
                    <th className="py-2 px-3">Telas Relacionadas</th>
                    <th className="py-2 px-3">Interações Simuladas no Protótipo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-800"> Autenticação Segura (Login)</td>
                    <td className="py-3 px-3">Tela 1: Login Splash</td>
                    <td className="py-3 px-3">Barra de segurança do usuário, validação de permissões prévias para administradores ou supervisores.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-800"> Monitoramento de EPIs & Alertas de Perímetros</td>
                    <td className="py-3 px-3">Tela 3: Feed Tempo Real, Tela 4: Central de Alertas</td>
                    <td className="py-3 px-3">Feed interativo das câmeras com caixa delimitadora (bounding boxes). Gerador de testes manuais para forçar detecção em tempo real e ver a propagação imediata dos alertas no feed.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-800"> Auditoria Rastreável de Não-Conformidade</td>
                    <td className="py-3 px-3">Tela 5: Histórico de Ocorrências</td>
                    <td className="py-3 px-3">Navegação e filtros nas ocorrências, abertura de modal com crop visual simulado da câmera, logs cronológicos de comentários da IA, e fluxo para encerrar/mudar status de conformidade.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-800"> Consolidado de Conformidade Executiva</td>
                    <td className="py-3 px-3">Tela 2: Dashboard Executivo, Tela 6: Relatórios</td>
                    <td className="py-3 px-3">Análise global de KPIs operacionais diários, tendências e filtros unificados por período industrial com possibilidade de exportação de dados em PDF ou Excel.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h3 className="text-xs font-bold text-[#511024] mb-1">Caminho de Navegabilidade Real:</h3>
              <p className="text-xs leading-relaxed text-stone-700">
                A barra lateral industrial unifica todas as telas do protótipo: o usuário pode circular livremente entre o <strong>Dashboard Executivo</strong> para analisar compliance, a tela de <strong>Monitoramento em Tempo Real</strong> para lidar com incidentes imediatos ou as <strong>Configurações</strong> do threshold de sensibilidade da visão computacional. Alertas gerados via simulador disparam efeitos visuais imediatos por todo o sistema.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Personas & IA Architecture */}
        <div className="space-y-8">
          
          {/* Section 3: Personas Integradas */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-display font-bold text-slate-950 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#511024]" /> Personas em Segurança Industrial
            </h2>
            
            <div className="space-y-4 divide-y divide-slate-100">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#511024]/10 text-[#511024] flex items-center justify-center font-bold text-xs">
                    CE
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Carlos Eduardo Ramos</h4>
                    <p className="text-[10px] text-slate-500">Gestor de Segurança do Trabalho e SESMT</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Necessidades:</strong> Exportar relatórios mensais consolidados de conformidade para auditorias de ISO 45001. Acompanhar a redução de ocorrências e identificar setores gargalo de não-conformidade de EPIs.
                </p>
              </div>

              <div className="space-y-2 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#535657]/10 text-[#535657] flex items-center justify-center font-bold text-xs">
                    MV
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Marcus Vinícius Souza</h4>
                    <p className="text-[10px] text-slate-500">Supervisor de Saúde Ocupacional - Alto Forno</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Necessidades:</strong> Ver incidentes de uso incorreto na tela em menos de 3 segundos para acionar alarmes sonoros. Precisa identificar rapidamente qual operador está irregular usando a busca rápida por matrícula.
                </p>
              </div>

              <div className="space-y-2 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#701c38]/10 text-[#701c38] flex items-center justify-center font-bold text-xs">
                    AO
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Ana Luísa Oliveira</h4>
                    <p className="text-[10px] text-slate-500">Administradora de TI Corporativo</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Necessidades:</strong> Cadastrar novas câmeras e alimentar os caminhos das streams RTSP de baixa latência, customizando as assinaturas de visão computacional por área operacional.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: IA Architecture & Pipeline */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-display font-bold text-slate-950 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#511024]" /> Fluxo da Visão Computacional
            </h2>
            <div className="relative border-l-2 border-[#511024]/30 pl-4 space-y-4 text-xs text-slate-600">
              <div className="relative">
                <span className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-[#511024] border-2 border-white shadow-xs" />
                <h5 className="font-bold text-slate-800">1. Captura & Streaming</h5>
                <p className="text-slate-500 text-[10px]">Câmeras industriais enviam fluxos RTSP de 1080p a 30 FPS diretamente à unidade edge.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-[#535657] border-2 border-white shadow-xs" />
                <h5 className="font-bold text-slate-800">2. Inferência YOLO YOLOv8/v11</h5>
                <p className="text-slate-500 text-[10px]">Detecção de múltiplos limites de interesse (Bounding Boxes) envolvendo operadores e classes protetoras.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-xs" />
                <h5 className="font-bold text-slate-800">3. Classificação Cruzada</h5>
                <p className="text-slate-500 text-[10px]">A matriz cruza se o operador detectado na caixa está vestindo capacete e colete refletor simultaneamente.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white shadow-xs" />
                <h5 className="font-bold text-slate-800">4. Alerta & Notificação</h5>
                <p className="text-slate-500 text-[10px]">Caso falhe, gera uma ocorrência no banco, dispara webhook e alerta via rádio/dashboard em menos de 0.8s.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
