export enum Perfil {
  ADMIN = 'Administrador',
  GESTOR = 'Gestor de Segurança',
  SUPERVISOR = 'Supervisor Industrial',
  OPERADOR = 'Operador Industrial'
}

export enum Risco {
  BAIXO = 'Baixo',
  MEDIO = 'Médio',
  ALTO = 'Alto',
  CRITICO = 'Crítico'
}

export enum StatusAlerta {
  ATIVO = 'Ativo',
  RECONHECIDO = 'Reconhecido',
  RESOLVIDO = 'Resolvido'
}

export enum StatusCamera {
  ATIVA = 'Ativa',
  INATIVA = 'Inativa'
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  status: 'Ativo' | 'Bloqueado';
  avatar?: string;
  cadastroDate: string;
}

export interface Camera {
  id: string;
  nome: string;
  localizacao: string;
  setor: string;
  rtspUrl: string;
  status: StatusCamera;
  regras: {
    capacete: boolean;
    colete: boolean;
    invasaoArea: boolean;
    tempoLimite: number; // em segundos
  };
}

export interface Operador {
  id: string;
  nome: string;
  matricula: string;
  cargo: string;
}

export interface Ocorrencia {
  id: string;
  timestamp: string;
  risco: Risco;
  descricao: string;
  imagemPrompt: string; // descritor visual do frame
  camera: string;
  setor: string;
  operador?: string | null;
  tipo: 'Sem Capacete' | 'Sem Colete' | 'Área Restrita' | 'Operador Desmaiado' | 'Sem Luvas' | 'Sem Óculos';
  status: 'Pendente' | 'Investigando' | 'Resolvido';
  comentarios: { autor: string; texto: string; data: string }[];
}

export interface Alerta {
  id: string;
  ocorrenciaId: string;
  timestamp: string;
  prioridade: Risco;
  status: StatusAlerta;
  mensagem: string;
  setor: string;
  cameraName: string;
}

export interface Indicador {
  id: string;
  nome: string;
  valor: number | string;
  variacao: string; // ex: "+12%" ou "-3%"
  tipo: 'positivo' | 'negativo' | 'neutro';
}

export interface ConfigAI {
  thresholdConfianca: number; // ex: 75%
  tempoRetencaoDias: number; // ex: 90 dias
  alertasPush: boolean;
  alertasEmail: boolean;
  alertasWhatsapp: boolean;
  webhookUrl: string;
  integracaoSlack: boolean;
}
