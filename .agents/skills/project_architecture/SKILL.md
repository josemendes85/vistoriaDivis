---
name: project_architecture
description: Arquitetura, estrutura de pastas, convenções de código e padrões do projeto Vistoria DIVIS (Vue 3 + Feature-First + DDD)
---

# SKILL: Arquitetura do Projeto — Vistoria DIVIS

## Visão Geral

Sistema de gestão de vistorias do CBMDF (Corpo de Bombeiros Militar do Distrito Federal).
Usado pela equipe DIVIS para controle de processos de licenciamento.

**Stack:**
- Vue 3 (Composition API, `<script setup>`)
- Vite
- Vue Router (hash history)
- Bootstrap 5 + Bootstrap Icons
- SortableJS (drag & drop no dashboard)
- PDF.js (leitura de PDFs no cliente)
- Gemini AI (preenchimento automático de formulários via PDF)
- Persistência: `localStorage` (sem backend)

---

## Estrutura de Diretórios

```
src/
  app/
    layouts/
      BaseLayout.vue          ← Layout global com navbar + tema + modais
    router/
      index.js                ← Rotas da aplicação
  features/
    vistoria/                 ← Feature principal
      views/
        ProcessosDashboard.vue  ← Painel de processos (kanban/tabela)
        ProcessoForm.vue        ← Formulário de criação/edição de processos
      components/
        AnotacaoModal.vue     ← Modal de anotação em exigência
        BrigadaModal.vue      ← Modal de cálculo de brigada (NT 07)
        CnaesModal.vue        ← Modal de atividades CNAE
        EquipeModal.vue       ← Config global da equipe (chave Gemini, vistoriadores)
      domain/
        normas/
          nt01/               ← NT 01/2016 - Medidas de Segurança (só .md)
          nt02/               ← NT 02/2016 - Risco/Carga de Incêndio
            regras.js         ← Funções puras de domínio
            tabelas.js        ← Tabela 2 (CNAE → ocupação → risco)
            constantes.js
            validators.js
            index.js
          nt07/               ← NT 07/2017 - Brigada de Incêndio (só .md)
          nt09/               ← NT 09/2022 - Eventos Temporários (pasta vazia)
      repositories/
        cnaeRepository.js     ← Acesso aos dados de CNAEs
        sistemaRepository.js  ← Acesso aos dados do sistema
      data/
        cnaes/
          cnaes.js            ← Base de CNAEs (147KB)
        dadosSistema/
          dadosSistema.js     ← Exigências, categorias, dados de domínio (315KB)
      constants/
        eventualConstants.js  ← Constantes para vistoria eventual (RAs, empresas brigada,
                                 Google Forms, checklist NT09, condicionantes padrão)
    autenticacao/             ← Feature de autenticação (Termos de Uso)
      components/
    checklist/                ← Feature de checklist de vistoriador
      views/
        ChecklistView.vue
    links/                    ← Feature de links úteis
      views/
        LinksView.vue
    backup/                   ← Feature de backup/restore do localStorage
      views/
        BackupView.vue
    sobre/                    ← Página Sobre
      views/
  shared/
    components/
      ToastNotification.vue   ← Componente de toast
    composables/
      useToast.js             ← Composable global de toasts (showToast, dismissToast)
    services/
      clipboardService.js     ← Cópia para clipboard
    utils/
      cnaeUtils.js            ← Utilitários de CNAE
      numberUtils.js          ← parseNumber e similares
    constants/
      config.js               ← Constantes globais
  styles/
    style.css                 ← Design system completo (variáveis CSS, componentes)
  assets/                     ← Imagens e recursos estáticos
```

---

## Rotas da Aplicação

```
/              → ProcessosDashboard (Painel)
/processos     → redirect para /
/processo/:id? → ProcessoForm (novo ou editar processo)
/checklist     → ChecklistView
/backup        → BackupView
/links         → LinksView
/sobre         → SobreView
```

---

## Persistência de Dados

O sistema usa **localStorage** como banco de dados (sem backend).

### Chaves do localStorage

```
processo-{id}                    → dados completos de um processo
vistorias_process_item_order_{status} → ordem dos processos por status (drag & drop)
equipeVistoria                   → configuração da equipe (JSON: { geminiApiKey, vistoriadores... })
termosAceitos                    → 'true' se os termos foram aceitos
theme                            → 'light' ou 'dark'
```

### Estrutura de um Processo

Todo processo é salvo como JSON com a chave `processo-{id}`.

**Campos comuns a todos os tipos:**
```js
{
  id, tipo, processoBusca, status,
  inicio, fim, checkConcluido,
  observacao
}
```

**Campos para vistorias padrão (RLE, RT, ADP, DPV, PPCI, FTruck, Outros):**
```js
{
  cnpj, instituicao, endereco, localizacao,
  ocupacao, grauRisco, area, alturaAscendente, alturaDescendente,
  pavimentosSuperiores, pavimentosInferiores, populacaoFixa, qtdBrigadistas,
  responsavel, responsavelFuncao, responsavelTelefone, responsavelEmail,
  acompanhante, funcao, termo, retorno,
  cnaePrincipal, cnaeSecundarios, metodoGps,
  activeCategoryCodes, exigenciasAtivas, ...
}
```

**Campos exclusivos do tipo "Eventual":**
```js
{
  ev_evento, ev_ra, ev_endereco, ev_geo,
  ev_data_inicio, ev_data_fim, ev_obs_periodo,
  ev_publico, ev_area, ev_vistoria_realizada,
  ev_responsavel, ev_cpf, ev_telefone,
  ev_tem_brigada, ev_cert_brigadista, ev_qtd_brigadistas, ev_empresa_brigada,
  ev_possui_estrutura, ev_cercamento, ev_laudo_inflamabilidade,
  ev_q_tendas, ev_q_palcos, ev_q_arqui, ev_q_porticos, ev_q_eletro,
  ev_q_camarotes, ev_q_inflaveis,
  ev_eletrica_provisoria, ev_q_quadros, ev_q_geradores, ev_q_extintores,
  ev_extintores_validos, ev_qd_dr, ev_itens_gerador_ok, ev_estruturas_aterradas,
  ev_glp, ev_central_glp, ev_q_p13, ev_parametros_p13,
  ev_q_food_trucks, ev_fogos_artificio, ev_liquido_inflamavel,
  ev_saidas_iluminadas, ev_saidas_desobstruidas, ev_distancias_cumpridas,
  ev_art_estruturas, ev_art_eletrica, ev_croqui_evento,
  ev_cert_foodtruck, ev_contrato_brigada, ev_declaracao_gerador,
  ev_status_eventual, ev_parecer_final, ev_condicionantes, ev_restricoes,
  ev_motivo_cancelamento, ev_checkboxes,
  ev_vistoriador01, ev_vistoriador02, ev_viatura, ev_regime, ev_email_usuario
}
```

---

## Tipos de Vistoria

```
RLE     → Registro de Licenciamento de Empresas
RT      → Relatório Técnico
ADP     → Análise de Dilação de Prazo
DPV     → Dilação de Prazo Vencida
PPCI    → Plano de Prevenção Contra Incêndio
FTruck  → Food Truck
Outros  → Outros
Eventual → Evento temporário (fluxo completamente diferente)
```

---

## Funcionalidades do Sistema

### Dashboard (`ProcessosDashboard.vue`)
- Lista processos agrupados por status
- Filtro por status e busca por texto (processo/instituição/CNPJ)
- Toggle para exibir processos concluídos
- Paginação (15 por página)
- **Drag & Drop** entre colunas de status (SortableJS)
- Arrastar processo muda seu status automaticamente
- Link direto para Google Maps via coordenadas GPS

### Formulário de Processo (`ProcessoForm.vue` — 3.366 linhas)
- Modo Criar e Editar (via `:id` na rota)
- Dois containers distintos:
  - **Padrão** (todos os tipos exceto Eventual)
  - **Eventual** (fluxo especializado para eventos)

**Padrão:**
- Busca automática de CNPJ (preenchimento de razão social)
- Formatação automática de CNPJ e telefone
- Autocomplete de Termo (Tabela 2 da NT02)
- Determinação automática de Grau de Risco via CNAE + área
- Cálculo de exigências de segurança por categoria (NT01, NT02)
- GPS automático via geolocalização do browser
- Links para Google Maps e Waze
- Seção de Exigências de Segurança (atualmente desativada com `v-if="false"`)
- Checklist de exigências com check, anotação e exclusão

**Eventual:**
- **Preenchimento automático via Gemini AI**: upload de PDF → extração de texto → análise por IA → 52 campos preenchidos
- Formulário com 8 seções: Identificação, Equipe, Período/Capacidade, Responsáveis/Brigada, Estruturas, Segurança/Riscos, Checklist Docs, Resultado/Parecer
- **Google Forms**: botão para enviar os dados para formulário Google pré-configurado
- Condicionantes e restrições padrão pré-definidas

### Configuração da Equipe (`EquipeModal.vue`)
- Cadastro de vistoriadores (nome + matrícula)
- Configuração da chave de API do Gemini
- Dados salvos em `localStorage` como `equipeVistoria`

### Checklist (`ChecklistView.vue`)
- Checklist de itens para o vistoriador durante a vistoria

### Backup (`BackupView.vue`)
- Exportar todos os dados do `localStorage` como JSON
- Importar JSON para restaurar dados

### Links (`LinksView.vue`)
- Links úteis para o trabalho de vistoria

### Termos de Uso
- Exibido obrigatoriamente no primeiro acesso
- Controle via `localStorage.termosAceitos`

---

## Convenções de Código

### Responsabilidades por Camada

| Camada | Responsabilidade |
|--------|-----------------|
| `views/` | Apenas tela: recebe dados, chama composables/services, exibe |
| `components/` | Componentes reutilizáveis sem regras complexas |
| `domain/normas/` | Funções puras de regras de negócio (NT CBMDF) |
| `repositories/` | Acesso e consulta de dados (abstração de `data/`) |
| `data/` | Apenas dados estáticos (arrays, objetos), sem funções |
| `constants/` | Constantes de domínio e configuração |
| `shared/composables/` | Lógica de interface reutilizável entre features |
| `shared/utils/` | Formatação de texto, parsing, helpers puros |
| `shared/services/` | Operações com efeitos colaterais (clipboard, etc.) |

### Regras Fundamentais

1. **Nunca misturar responsabilidades**: regra de negócio não entra em `views/`
2. **Nunca acessar `data/` diretamente**: sempre via `repositories/`
3. **Funções puras no domínio**: `calcularBrigada()`, `determinarRisco()`, etc.
4. **Composables para lógica de interface**: `useToast()`, não para cálculos normativos
5. **Sem `utils.js` gigante**: separar por responsabilidade

### Ao criar uma nova feature

```
features/
  nomeDaFeature/
    views/          ← telas
    components/     ← componentes da feature
    composables/    ← lógica de interface (se necessário)
    domain/         ← regras de negócio
    repositories/   ← acesso a dados
    data/           ← dados estáticos
    constants/      ← constantes
```

### Ao adicionar uma nova Norma Técnica

```
domain/normas/ntXX/
  NT-XX-YYYY-Nome_da_Norma.md   ← texto completo da norma (referência)
  regras.js                     ← funções puras das regras
  tabelas.js                    ← tabelas e constantes de dados
  constantes.js                 ← valores fixos
  validators.js                 ← validações
  index.js                      ← exportações
```

**Nunca misturar regras de NTs diferentes.**

---

## Domínio CBMDF — Normas Implementadas

### NT 02/2016 — Risco de Incêndio (implementada)

Localização: `src/features/vistoria/domain/normas/nt02/`

- `tabelas.js`: Tabela 2 completa (grupos → níveis → exemplos de CNAE → ocupação → risco)
- `regras.js`: `determinarGrauRisco()`, `calcularRiscoPorCnae()`, `calcularRiscoPorArea()`
- Integrada ao `ProcessoForm.vue` para preenchimento automático de Grau de Risco

### NT 07/2017 — Brigada de Incêndio (texto disponível, cálculo no componente)

- Texto em `domain/normas/nt07/NT-07-2017-Brigada_de_Incendio.md`
- Lógica de cálculo do quantitativo mínimo de brigadistas em `BrigadaModal.vue`

### NT 09/2022 — Eventos Temporários (em implementação)

- Pasta `domain/normas/nt09/` existe mas está vazia
- Regras aplicadas indiretamente via prompt do Gemini AI no `ProcessoForm.vue`
- Checklist em `constants/eventualConstants.js` com todas as verificações da NT09

---

## Integração com Gemini AI

Usada exclusivamente no tipo **Eventual** para preenchimento automático.

**Fluxo:**
1. Usuário faz upload de PDF do processo SEI
2. PDF.js extrai texto do PDF (client-side)
3. Texto é enviado para `gemini-3.6-flash` via API REST
4. Resposta JSON tipada preenche automaticamente 52 campos do formulário
5. Chave de API configurada pelo usuário em `EquipeModal`

**Arquivo:** `src/features/vistoria/views/ProcessoForm.vue` (função `handlePdfUpload` + `parseProcessPdfWithAi`)

---

## Objetivo do Sistema

Evoluir para um **Sistema Especialista do CBMDF** capaz de:

- Determinar ocupações automaticamente via CNAE
- Identificar grau de risco
- Calcular brigada necessária
- Determinar medidas de segurança exigidas
- Gerar exigências automaticamente com base nas NTs
- Validar conformidade (NT, item, alínea)
- Integrar com IA para responder dúvidas técnicas dos vistoriadores
