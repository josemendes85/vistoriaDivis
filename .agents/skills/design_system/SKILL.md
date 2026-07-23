---
name: design_system
description: Design system, visual standards, and CSS architecture for the Vistoria DIVIS application (Vue 3 + Bootstrap 5 + custom CSS variables)
---

# SKILL: Design System — Vistoria DIVIS

## Contexto do Projeto

Aplicação Vue 3 (Vite) para gestão de vistorias do CBMDF (Corpo de Bombeiros Militar do Distrito Federal).
Stack: **Vue 3 Composition API** + **Bootstrap 5** + **Bootstrap Icons** + **CSS customizado via variáveis CSS**.

Arquivo principal de estilos: `src/styles/style.css`
Layout principal: `src/app/layouts/BaseLayout.vue`

---

## 1. Variáveis CSS (`:root`)

**NUNCA usar cores HEX diretamente.** Sempre usar as variáveis definidas no `:root` de `style.css`.

### Paleta de Cores (sempre disponíveis)

```css
/* Cores principais */
var(--primary-color)    /* #4E7D9A — azul acinzentado */
var(--primary-hover)    /* #3b6680 */
var(--success-color)    /* #70A288 — verde sálvia */
var(--success-hover)    /* #5c8b72 */
var(--warning-color)    /* #D6B55E — dourado */
var(--warning-hover)    /* #c2a14b */
var(--danger-color)     /* #CD6A6A — vermelho suave */
var(--danger-hover)     /* #b75757 */
var(--info-color)       /* #599CA8 — teal */
var(--info-hover)       /* #498590 */
var(--secondary-color)  /* #7E8A96 — cinza azulado */
var(--secondary-hover)  /* #697682 */
var(--purple-color)     /* #8F75A8 */
var(--orange-color)     /* #D78B5D */
var(--dark-color)       /* #323842 */
var(--dark-hover)       /* #242930 */
var(--light-green-color)/* #C8E2D6 */
var(--white)            /* #ffffff */
var(--black)            /* #000000 */
```

### Cores de Tema (Light/Dark — NÃO hardcodar)

```css
var(--app-bg)              /* fundo da aplicação */
var(--form-section-bg)     /* fundo das seções de formulário */
var(--card-bg)             /* fundo dos cards */
var(--text-dark)           /* cor do texto principal */
var(--border-color)        /* cor das bordas */
var(--border-color-hover)  /* bordas em hover */
var(--table-bg)            /* fundo de tabelas */
var(--table-color)         /* texto em tabelas */
var(--autocomplete-bg)     /* fundo do autocomplete */
var(--tag-bg)              /* fundo dos tags */
var(--tag-hover-bg)        /* hover dos tags */
var(--icon-unmarked-color) /* ícone não marcado */
```

---

## 2. Tema Escuro

O sistema suporta **tema escuro e claro** com alternância via botão na navbar.
O tema é aplicado via `data-theme="dark"` e `data-bs-theme="dark"` no `<html>`.
O valor é salvo no `localStorage` com a chave `"theme"`.

**REGRA:** Toda nova tela DEVE ser compatível com ambos os temas.

```css
/* CORRETO */
background: var(--card-bg);
color: var(--text-dark);

/* ERRADO */
background: white;
color: black;
background: #ffffff;
```

---

## 3. Bootstrap 5

Priorizar classes Bootstrap antes de criar CSS custom.

### Botões disponíveis (mapeados sobre as variáveis CSS)

```
btn-primary     → var(--primary-color)
btn-success     → var(--success-color)
btn-warning     → var(--warning-color)
btn-danger      → var(--danger-color)
btn-info        → var(--info-color)
btn-secondary   → var(--secondary-color)
btn-dark        → var(--dark-color)

btn-outline-primary
btn-outline-success
btn-outline-danger
btn-outline-info
btn-outline-warning
```

**NUNCA criar botão personalizado se já existir equivalente Bootstrap.**

---

## 4. Componentes do Design System

### 4.1. Cards

```html
<div class="card shadow-sm">
  <div class="card-body">...</div>
</div>
```

Cards tipados (por função do vistoriador):

```html
<div class="card card-supervisor">...</div>
<!-- borda azul topo -->
<div class="card card-chefe">...</div>
<!-- borda laranja topo -->
<div class="card card-particular">...</div>
<!-- borda vermelha topo -->
<div class="card card-voluntario">...</div>
<!-- borda verde topo -->
```

### 4.2. Seções de Formulário

```html
<div class="form-section mb-4">
  <h4 class="section-title"><i class="bi bi-building me-2"></i>Título da Seção</h4>
  <div class="row g-3">
    <!-- campos -->
  </div>
</div>
```

- `form-section` tem padding, border-radius, e usa `var(--form-section-bg)`
- `section-title` tem borda inferior `var(--primary-color)`, font-weight 600

**Nunca criar seções com cores manuais ou divs coloridas.**

### 4.3. Classes de Status

Classes de status (aplicadas em navbar, cards, badges, headers de tabela):

```
.status-pendente      → warning amarelo
.status-analise       → info teal
.status-vistoria      → roxo #6f42c1
.status-aprovado      → success verde
.status-reprovado     → danger vermelho
.status-cancelado     → secondary cinza
.status-nao-realizada → laranja #fd7e14
.status-sem-status    → primary azul
.status-concluido     → light-green
.status-a-fazer       → secondary cinza
```

**Nunca criar cores de status manualmente.**

### 4.4. Tags (exigências)

```html
<div class="tag">
  <span>Texto da exigência</span>
  <div class="tag-actions">
    <i class="bi bi-check-circle-fill check-cumprido-icon text-secondary tag-action-icon"></i>
    <i class="bi bi-pencil-fill anotacao-icon text-secondary tag-action-icon"></i>
    <i class="bi bi-x-circle-fill tag-close-icon tag-action-icon"></i>
  </div>
</div>
```

- `tag-actions`: coluna de ícones à direita, separada por borda
- `check-cumprido-icon`: verde quando marcado (`text-success`), cinza quando não
- `anotacao-icon`: azul info quando com conteúdo (`text-primary`), cinza quando vazio

**Nunca reinventar este componente.**

### 4.5. Autocomplete

```html
<div class="autocomplete-container">
  <input class="form-control" ... />
  <div class="autocomplete-list shadow-lg" v-if="show">
    <div class="autocomplete-item" v-for="item in items">{{ item }}</div>
  </div>
</div>
```

**Nunca criar dropdowns próprios.**

### 4.6. Tabelas

```html
<table class="table table-hover table-striped">
  <thead class="table-light">
    ...
  </thead>
  <tbody>
    ...
  </tbody>
</table>
```

**Nunca sobrescrever cores de tabela diretamente.**

### 4.7. Toasts / Notificações

**NÃO usar o toast do Bootstrap diretamente.** Usar o composable global:

```js
import { showToast, dismissToast } from "@/shared/composables/useToast.js";

showToast("Mensagem de sucesso!", "success");
showToast("Erro ao salvar.", "danger");
showToast("Processando...", "info", 0); // duração 0 = permanente, retorna id
dismissToast(activeToastId); // dismiss manual
```

Tipos: `'success'`, `'danger'`, `'warning'`, `'info'`

### 4.8. Ícones

Usar exclusivamente **Bootstrap Icons**.

```html
<i class="bi bi-building me-2"></i> <i class="bi bi-geo-alt-fill"></i>
```

**Nunca usar imagens PNG para ícones.**

---

## 5. Layout Global

### Hierarquia obrigatória

```
BaseLayout (src/app/layouts/BaseLayout.vue)
  └── <slot />
        └── <div class="pt-2 px-1">
              └── .form-section
                    └── .section-title + .row.g-3
```

### BaseLayout — Props disponíveis

```js
props: {
  title: String,       // título na navbar
  backRoute: String,   // rota do botão "Voltar" (ex: '/processos')
  backText: String,    // texto do botão "Voltar"
  navbarClass: String  // classe de status para colorir a navbar
}
```

### Navbar

A navbar muda de cor com base no status do processo (`:navbarClass`).

Itens do menu:

- **Processos** → `/processos`
- **Checklist** → `/checklist`
- **Backup** → `/backup`
- **Links** → `/links`
- **Termos de Uso** (modal)
- **Sobre** → `/sobre`

Botões fixos à direita:

- **Alternar tema** (☀️/🌙)
- **Equipe** (abre `EquipeModal` global — chave de API Gemini, dados da equipe)

---

## 6. Utilitários CSS Customizados

Classes disponíveis em `style.css` (não recriar):

```css
.navbar-default-bg        /* navbar padrão azul primary */
.main-content             /* margin-top: 80px, padding-bottom: 50px */
.modal-header-info        /* header de modal azul info */
.cnae-motivo-box          /* caixa info azul transparente */
.cnae-warning-box         /* caixa warning amarela transparente */
.text-theme-info          /* texto info color */
.badge-info-custom        /* badge info pequena */
.font-small-normal        /* 0.8rem, não uppercase */
.badge-cnae-risco         /* badge de risco CNAE */
.modal-overlay-custom     /* overlay de modal z-index 1060 */
.controls-bar-sticky      /* sticky top: 80px */
.description-text-small   /* 0.75rem, line-height 1.2 */
.col-width-50             /* coluna 50px */
.col-width-130            /* coluna 130px */
.text-small-normal        /* 0.75rem, font-weight normal */
.exigencia-item           /* item de lista de exigências */
```

---

## 7. Responsividade

```html
<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-4">...</div>
</div>
```

Breakpoint principal: `md` (768px).
Evitar novas media queries — o CSS já cobre os casos existentes.

---

## 8. Regras / Proibições

```
NUNCA:
- style="" com cores
- cores HEX diretamente
- !important sem necessidade documentada
- duplicar componentes existentes
- criar novos tons de cores
- usar background: white ou color: black
```

> Antes de escrever qualquer HTML ou CSS: **"Existe componente ou variável no Design System?"**
> Sim → reutilizar. Não → criar seguindo o mesmo padrão.
