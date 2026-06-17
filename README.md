# SafeVision AI

## Sistema Inteligente de Segurança Proativa Industrial

### Challenge 2026 — FIAP × SPI Integrações

---

# Integrantes

- Ana Luiza Oliveira Dourado — RM558793
- Carlos Augusto da Cruz Possi — RM558758
- Fabio Henrique Santos Faria — RM552453
- João Pedro Bernardes Santos da Silva — RM557142
- Leonardo Tanaka Cortez — RM556781

Professor Responsável:
- Hercules Lima Ramos

---

# Visão Geral do Projeto

O SafeVision AI é uma plataforma inteligente de monitoramento operacional industrial desenvolvida para atuar diretamente no contexto do Metaindústria, utilizando Inteligência Artificial, Visão Computacional e processamento em tempo real para prevenção proativa de acidentes industriais.

A solução foi concebida para transformar o modelo tradicional de segurança ocupacional, substituindo processos reativos e dependentes exclusivamente de supervisão humana por um ecossistema inteligente capaz de monitorar continuamente ambientes industriais críticos.

O sistema realiza análise automatizada de fluxos de vídeo industriais para identificação de:

- ausência de Equipamentos de Proteção Individual (EPIs)
- riscos ergonômicos
- comportamentos inseguros
- movimentações críticas
- padrões recorrentes de não conformidade
- situações de risco operacional

Além da identificação automática das irregularidades, a plataforma fornece alertas instantâneos, rastreabilidade histórica, dashboards operacionais e relatórios analíticos estratégicos voltados à gestão industrial.

---

# Contextualização do Problema

No cenário industrial moderno, a Segurança e Saúde do Trabalho deixou de ser apenas uma obrigação regulatória e passou a representar um fator estratégico diretamente relacionado à produtividade, continuidade operacional e sustentabilidade corporativa.

Apesar disso, grande parte das indústrias ainda utiliza processos tradicionais de fiscalização baseados em:

- inspeções manuais
- auditorias periódicas
- supervisão presencial limitada
- preenchimento manual de relatórios
- monitoramento não contínuo

Esse modelo apresenta limitações severas em ambientes industriais complexos:

## Limitações Operacionais

- impossibilidade de monitoramento integral da planta industrial
- falhas humanas de observação
- dificuldade de rastreamento histórico
- demora na identificação de riscos
- ausência de previsibilidade operacional

## Impactos Industriais

- aumento de acidentes ocupacionais
- crescimento de afastamentos ergonômicos
- redução da produtividade
- aumento de passivos trabalhistas
- elevação de custos operacionais
- comprometimento dos indicadores de SST

Além disso, o modelo tradicional atua predominantemente de forma reativa, respondendo apenas após a ocorrência do incidente.

O SafeVision AI propõe exatamente a ruptura desse paradigma, promovendo uma abordagem baseada em monitoramento contínuo, prevenção inteligente e tomada de decisão orientada por dados.

---

# Objetivo Geral

Desenvolver uma solução inteligente de segurança industrial capaz de automatizar o monitoramento de EPIs e detectar riscos operacionais em tempo real através de Inteligência Artificial e Visão Computacional.

---

# Objetivos Específicos

- Automatizar o processo de fiscalização operacional
- Detectar ausência de EPIs em tempo real
- Identificar riscos ergonômicos durante movimentação de carga
- Emitir alertas instantâneos para supervisores
- Consolidar indicadores de conformidade operacional
- Criar histórico rastreável de ocorrências
- Apoiar tomada de decisão estratégica
- Reduzir acidentes industriais
- Melhorar indicadores de SST
- Promover cultura de segurança preventiva

---

# Escopo do Projeto

## Dentro do Escopo

- monitoramento contínuo de EPIs
- análise de conformidade operacional
- detecção de postura inadequada
- análise de movimentação industrial
- alertas operacionais em tempo real
- dashboard gerencial
- relatórios analíticos
- armazenamento histórico
- classificação de níveis de risco
- monitoramento por câmeras industriais

## Fora do Escopo

- diagnósticos médicos
- reconhecimento facial biométrico
- integração com folha de pagamento
- controle de recursos humanos
- desenvolvimento de hardware
- monitoramento externo à planta industrial
- alarmes sonoros industriais
- automação física de máquinas

---

# Arquitetura da Solução

O sistema foi estruturado utilizando arquitetura modular distribuída para garantir:

- escalabilidade
- confiabilidade
- baixa latência
- flexibilidade operacional
- facilidade de manutenção
- desacoplamento entre módulos

---

## Fluxo Operacional

```text
[Câmeras Industriais]
            ↓
[Captura Contínua de Vídeo]
            ↓
[Processamento Computacional]
            ↓
[YOLO26 + OpenCV]
            ↓
[Motor de Regras]
            ↓
[Classificação de Risco]
            ↓
[API de Processamento]
            ↓
[Banco de Dados]
            ↓
[Dashboard Operacional]
            ↓
[Supervisor Industrial]
```

---

# Tecnologias Selecionadas

| Tecnologia | Aplicação |
|---|---|
| Python | Inteligência Artificial e processamento |
| YOLO26 | Detecção de objetos industriais |
| OpenCV | Processamento de imagem |
| FastAPI | Comunicação entre serviços |
| PostgreSQL | Persistência de dados |
| React | Dashboard operacional |
| TypeScript | Estruturação do frontend |
| WebSockets | Atualizações em tempo real |

---

# Justificativa Técnica

## YOLO26

Selecionado devido à alta capacidade de inferência em tempo real, permitindo análise contínua de múltiplos elementos simultaneamente em ambientes industriais complexos.

## OpenCV

Utilizado para tratamento computacional das imagens, pré-processamento visual e integração com os modelos de inferência.

## FastAPI

Escolhido pela alta performance, baixa latência e excelente capacidade de integração com sistemas distribuídos.

## PostgreSQL

Responsável por garantir integridade transacional, rastreabilidade histórica e confiabilidade industrial.

## React + TypeScript

Permitem construção de dashboards modernos, escaláveis e responsivos voltados ao monitoramento operacional.

## WebSockets

Garantem comunicação instantânea entre o backend e os dashboards industriais.

---

# Funcionalidades Principais

- monitoramento contínuo de EPIs
- detecção automática de irregularidades
- análise ergonômica operacional
- classificação inteligente de risco
- geração de alertas críticos
- dashboards operacionais
- relatórios analíticos
- rastreabilidade de conformidade
- histórico de eventos críticos
- consolidação de indicadores industriais

---

# Resultados Esperados

A solução busca reduzir significativamente:

- acidentes operacionais
- afastamentos ergonômicos
- falhas de conformidade
- tempo de resposta operacional
- dependência exclusiva de supervisão manual

Além disso, espera-se:

- fortalecimento da cultura preventiva
- aumento da produtividade
- melhoria dos indicadores de SST
- maior rastreabilidade industrial
- decisões orientadas por dados

---

# Status do Projeto

🚧 Sprint 1 — Engenharia, arquitetura e modelagem documental
