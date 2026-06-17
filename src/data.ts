import { Perfil, Risco, StatusAlerta, StatusCamera, Camera, Operador, Ocorrencia, Alerta, Usuario, ConfigAI, Indicador } from './types';

export const INITIAL_USUARIOS: Usuario[] = [
  {
    id: 'u-1',
    nome: 'Carlos Eduardo Ramos',
    email: 'gestor.seguranca@safevision.com.br',
    perfil: Perfil.GESTOR,
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    cadastroDate: '2025-01-15'
  },
  {
    id: 'u-2',
    nome: 'Ana Luísa Oliveira',
    email: 'emaildaanaludooutlook@gmail.com', // User email from metadata
    perfil: Perfil.ADMIN,
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    cadastroDate: '2025-02-10'
  },
  {
    id: 'u-3',
    nome: 'Marcus Vinícius Souza',
    email: 'supervisor.altoforno@safevision.com.br',
    perfil: Perfil.SUPERVISOR,
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    cadastroDate: '2025-03-22'
  },
  {
    id: 'u-4',
    nome: 'Letícia Barbosa Cruz',
    email: 'seguranca.laminacao@safevision.com.br',
    perfil: Perfil.SUPERVISOR,
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    cadastroDate: '2025-04-05'
  },
  {
    id: 'u-5',
    nome: 'Jeferson Silva Santos',
    email: 'jeferson.santos@safevision.com.br',
    perfil: Perfil.OPERADOR,
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop',
    cadastroDate: '2025-05-12'
  },
  {
    id: 'u-6',
    nome: 'Rodrigo Antunes Mello',
    email: 'rodrigo.antunes@safevision.com.br',
    perfil: Perfil.SUPERVISOR,
    status: 'Bloqueado',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    cadastroDate: '2025-01-20'
  }
];

export const INITIAL_OPERADORES: Operador[] = [
  { id: 'op-1', nome: 'Antônio Ferreira Lima', matricula: 'MTR-9821', cargo: 'Operador de Alto Forno' },
  { id: 'op-2', nome: 'Bruno Alencar Neves', matricula: 'MTR-1452', cargo: 'Operador de Lingotamento' },
  { id: 'op-3', nome: 'Cláudio Duarte Reis', matricula: 'MTR-3079', cargo: 'Operador de Laminação' },
  { id: 'op-4', nome: 'Daniel Cavalcanti Dias', matricula: 'MTR-7541', cargo: 'Auxiliar Operacional' },
  { id: 'op-5', nome: 'Eduardo Gouveia Luz', matricula: 'MTR-8812', cargo: 'Sinalizador de Pátio' },
  { id: 'op-6', nome: 'Fernanda Martins Chaves', matricula: 'MTR-2640', cargo: 'Operadora de Ponte Rolante' }
];

export const INITIAL_CAMERAS: Camera[] = [
  {
    id: 'cam-1',
    nome: 'Câmera AF-03 Norte',
    localizacao: 'Plataforma Superior - Alto Forno 03',
    setor: 'Alto Forno',
    rtspUrl: 'rtsp://10.120.44.11:554/stream1',
    status: StatusCamera.ATIVA,
    regras: { capacete: true, colete: true, invasaoArea: true, tempoLimite: 120 }
  },
  {
    id: 'cam-2',
    nome: 'Câmera LING-01 Vert',
    localizacao: 'Canal de Corrida de Gusa - Lingotamento',
    setor: 'Lingotamento',
    rtspUrl: 'rtsp://10.120.44.12:554/stream1',
    status: StatusCamera.ATIVA,
    regras: { capacete: true, colete: true, invasaoArea: false, tempoLimite: 300 }
  },
  {
    id: 'cam-3',
    nome: 'Câmera PATIO-05 Port',
    localizacao: 'Área de Estocagem de Minério - Pátio',
    setor: 'Pátio de Matérias-Primas',
    rtspUrl: 'rtsp://10.120.45.15:554/stream1',
    status: StatusCamera.ATIVA,
    regras: { capacete: true, colete: true, invasaoArea: true, tempoLimite: 0 }
  },
  {
    id: 'cam-4',
    nome: 'Câmera LAMIN-02 Feed',
    localizacao: 'Esteira de Entrada - Laminação',
    setor: 'Galpão de Laminação',
    rtspUrl: 'rtsp://10.120.46.22:554/stream2',
    status: StatusCamera.ATIVA,
    regras: { capacete: true, colete: true, invasaoArea: true, tempoLimite: 45 }
  },
  {
    id: 'cam-5',
    nome: 'Câmera EXP-01 Docas',
    localizacao: 'Galpão de Despacho 02 - Expedição',
    setor: 'Terminal de Expedição',
    rtspUrl: 'rtsp://10.120.47.01:554/stream1',
    status: StatusCamera.ATIVA,
    regras: { capacete: false, colete: true, invasaoArea: false, tempoLimite: 0 }
  },
  {
    id: 'cam-6',
    nome: 'Câmera MANUT-08 Ofic',
    localizacao: 'Corredor Central - Oficinas de Manutenção',
    setor: 'Manutenção Geral',
    rtspUrl: 'rtsp://10.120.48.08:554/stream1',
    status: StatusCamera.INATIVA,
    regras: { capacete: true, colete: true, invasaoArea: false, tempoLimite: 0 }
  }
];

export const INITIAL_OCORRENCIAS: Ocorrencia[] = [
  {
    id: 'oc-101',
    timestamp: '2026-06-16T15:24:10-07:00',
    risco: Risco.CRITICO,
    descricao: 'Operador identificado transitando sem CAPACETE e sem COLETE REfLETIVO na área de vazamento do Alto Forno 03, em local com alto risco de respingo.',
    imagemPrompt: 'Metalurgista sem capacete ao lado do canal de alto forno com metal fundido brilhante e faíscas ao redor.',
    camera: 'Câmera AF-03 Norte',
    setor: 'Alto Forno',
    operador: 'Antônio Ferreira Lima',
    tipo: 'Sem Capacete',
    status: 'Pendente',
    comentarios: [
      {
        autor: 'Sistema SafeVision AI',
        texto: 'Detecção automática: Confiança de 94.6% para ausência de capacete e 91.2% para ausência de colete em zona demarcada.',
        data: '2026-06-16T15:24:12-07:00'
      }
    ]
  },
  {
    id: 'oc-102',
    timestamp: '2026-06-16T14:15:33-07:00',
    risco: Risco.ALTO,
    descricao: 'Presença não autorizada detectada na zona sob a ponte rolante em operação ativa, ignorando os limites indicativos da faixa de pedestre.',
    imagemPrompt: 'Operador atravessando área isolada por fitas amarelas debaixo de uma ponte rolante suspendendo chapa de metal gigante.',
    camera: 'Câmera LAMIN-02 Feed',
    setor: 'Galpão de Laminação',
    operador: 'Daniel Cavalcanti Dias',
    tipo: 'Área Restrita',
    status: 'Investigando',
    comentarios: [
      {
        autor: 'Sistema SafeVision AI',
        texto: 'Detecção automática: Invasão de área bloqueada ativa. Tempo de permanência: 48s.',
        data: '2026-06-16T14:15:35-07:00'
      },
      {
        autor: 'Leticia Barbosa Cruz (Supervisor)',
        texto: 'Acionei o radiofone local para orientar o operador a se retirar imediatamente da área de içamento.',
        data: '2026-06-16T14:18:20-07:00'
      }
    ]
  },
  {
    id: 'oc-103',
    timestamp: '2026-06-16T11:02:45-07:00',
    risco: Risco.CRITICO,
    descricao: 'Operador entrou no perímetro de risco do canal de corrida de gusa com luvas e calçados inadequados.',
    imagemPrompt: 'Operador de costas manipulando amostra sem luvas de raspa de couro perto de canal incandescente com fumaça e fogo.',
    camera: 'Câmera LING-01 Vert',
    setor: 'Lingotamento',
    operador: 'Bruno Alencar Neves',
    tipo: 'Sem Luvas',
    status: 'Pendente',
    comentarios: [
      {
        autor: 'Sistema SafeVision AI',
        texto: 'Detecção automática: Ausência de luvas aluminizadas em ambiente térmico extremo. Risco de queimaduras severas.',
        data: '2026-06-16T11:02:47-07:00'
      }
    ]
  },
  {
    id: 'oc-104',
    timestamp: '2026-06-16T09:40:12-07:00',
    risco: Risco.MEDIO,
    descricao: 'Operador identificado sem óculos de proteção contra radiação de fusão na frente do módulo de carregamento.',
    imagemPrompt: 'Trabalhador olhando diretamente para o alto forno brilhante sem a viseira de proteção dourada ou óculos cinza.',
    camera: 'Câmera LING-01 Vert',
    setor: 'Lingotamento',
    operador: 'Cláudio Duarte Reis',
    tipo: 'Sem Óculos',
    status: 'Resolvido',
    comentarios: [
      {
        autor: 'Sistema SafeVision AI',
        texto: 'Detecção automática: Ausência de óculos de segurança contra impacto em oficina conectada.',
        data: '2026-06-16T09:40:14-07:00'
      },
      {
        autor: 'Carlos Eduardo Ramos (Gestor)',
        texto: 'Operador orientado e advertido oralmente. Óculos de proteção foi colocado imediatamente. Ocorrência encerrada.',
        data: '2026-06-16T10:10:00-07:00'
      }
    ]
  },
  {
    id: 'oc-105',
    timestamp: '2026-06-15T16:11:22-07:00',
    risco: Risco.BAIXO,
    descricao: 'Ponte rolante movimentando bobinas de aço com sinalizador de pátio sem o colete refletivo ativo nas docas externas.',
    imagemPrompt: 'Operador movimentando bobinas de aço cinzentas, colete refletivo encoberto por casaco escuro.',
    camera: 'Câmera EXP-01 Docas',
    setor: 'Terminal de Expedição',
    operador: 'Eduardo Gouveia Luz',
    tipo: 'Sem Colete',
    status: 'Resolvido',
    comentarios: [
      {
        autor: 'Sistema SafeVision AI',
        texto: 'Detecção automática: Ausência de vestimenta de alta visibilidade classe 2 em doca de carregamento.',
        data: '2026-06-15T16:11:24-07:00'
      },
      {
        autor: 'Carlos Eduardo Ramos (Gestor)',
        texto: 'O operador abotoou a jaqueta cobrindo o colete, foi orientado a manter o colete por cima de qualquer proteção térmica.',
        data: '2026-06-15T16:45:00-07:00'
      }
    ]
  }
];

export const INITIAL_ALERTAS: Alerta[] = [
  {
    id: 'al-1',
    ocorrenciaId: 'oc-101',
    timestamp: '2026-06-16T15:24:10-07:00',
    prioridade: Risco.CRITICO,
    status: StatusAlerta.ATIVO,
    mensagem: 'OPERADOR SEM CAPACETE EM ÁREA DE METAL DE FUSÃO NO ALTO FORNO 03',
    setor: 'Alto Forno',
    cameraName: 'Câmera AF-03 Norte'
  },
  {
    id: 'al-2',
    ocorrenciaId: 'oc-102',
    timestamp: '2026-06-16T14:15:33-07:00',
    prioridade: Risco.ALTO,
    status: StatusAlerta.RECONHECIDO,
    mensagem: 'INVASÃO DE ÁREA EXCLUSIVA DE PONTE ROLANTE NA LAMEAÇÃO FEED',
    setor: 'Galpão de Laminação',
    cameraName: 'Câmera LAMIN-02 Feed'
  },
  {
    id: 'al-3',
    ocorrenciaId: 'oc-103',
    timestamp: '2026-06-16T11:02:45-07:00',
    prioridade: Risco.CRITICO,
    status: StatusAlerta.ATIVO,
    mensagem: 'FORNO DE LINGOTAMENTO: MANIPULAÇÃO EXTREMA SEM LUVAS TÉRMICAS',
    setor: 'Lingotamento',
    cameraName: 'Câmera LING-01 Vert'
  }
];

export const INITIAL_INDICADORES: Indicador[] = [
  { id: 'ind-1', nome: 'Ocorrências Hoje', valor: 4, variacao: '+33% vs ontem', tipo: 'negativo' },
  { id: 'ind-2', nome: 'Alertas Críticos Ativos', valor: 2, variacao: '-50% vs média', tipo: 'positivo' },
  { id: 'ind-3', nome: 'Taxa de Conformidade PPE', valor: '94.8%', variacao: '+1.5% este mês', tipo: 'positivo' },
  { id: 'ind-4', nome: 'Operadores Monitorados', valor: 142, variacao: '+8 ativos', tipo: 'neutral' as any },
  { id: 'ind-5', nome: 'Câmeras Ativas', valor: '5 / 6', variacao: '1 em manutenção', tipo: 'neutral' as any }
];

export const DEFAULT_CONFIG_AI: ConfigAI = {
  thresholdConfianca: 80,
  tempoRetencaoDias: 180,
  alertasPush: true,
  alertasEmail: true,
  alertasWhatsapp: false,
  webhookUrl: 'https://api.siderurgica.com.br/v1/safevision-events',
  integracaoSlack: true
};

export const SECTORS = [
  'Geral - Todos os Setores',
  'Alto Forno',
  'Lingotamento',
  'Pátio de Matérias-Primas',
  'Galpão de Laminação',
  'Terminal de Expedição',
  'Manutenção Geral'
];

export const INCIDENT_TYPES = [
  { value: 'Sem Capacete', label: 'Ausência de Capacete' },
  { value: 'Sem Colete', label: 'Ausência de Colete' },
  { value: 'Área Restrita', label: 'Invasão de Área Restrita' },
  { value: 'Sem Luvas', label: 'Ausência de Luvas Aluminizadas' },
  { value: 'Sem Óculos', label: 'Ausência de Óculos de Segurança' }
];
