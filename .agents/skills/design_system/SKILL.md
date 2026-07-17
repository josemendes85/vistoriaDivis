---
name: design_system
description: Guidelines and design system rules for styling components and layouts in Vistoria
---

# Skill: Design System - Vistoria

## Objetivo

Toda tela criada deve seguir exatamente o padrão visual definido em styles.css.
Nunca criar estilos inline.
Nunca criar novas cores se já existir uma variável correspondente.

### 1. Cores

Utilizar apenas as variáveis do :root.
Exemplo:

```css
var(--primary-color)
var(--success-color)
var(--warning-color)
var(--danger-color)
var(--info-color)
var(--secondary-color)
var(--dark-color)
```

Jamais utilizar:

```css
#007bff
#28a745
red
green
blue
```

As cores sempre devem vir das variáveis CSS.

### 2. Tema Escuro

Toda nova tela deve ser compatível with:

```html
data-theme="dark"
```

Nunca usar:

```css
background: white;
color: black;
```

Sempre usar:

```css
background: var(--card-bg);
color: var(--text-dark);
```

### 3. Bootstrap

Priorizar Bootstrap.
Botões:

```
btn-primary
btn-success
btn-warning
btn-danger
btn-info
btn-secondary
btn-dark
```

Nunca criar botão personalizado se já existir equivalente Bootstrap.

### 4. Cards

Sempre utilizar:

```html
<div class="card">
  <div class="card-body"></div>
</div>
```

Nunca criar divs coloridas manualmente.

### 5. Formulários

Cada grupo deve ficar dentro de:

```html
<div class="form-section"></div>
```

Cada bloco deve possuir:

```html
<h5 class="section-title"></h5>
```

Exemplo:

```html
<div class="form-section">
  <h5 class="section-title">Dados Gerais</h5>
  ...
</div>
```

### 6. Status

Sempre utilizar as classes:

```
status-pendente
status-analise
status-vistoria
status-aprovado
status-reprovado
status-cancelado
status-nao-realizada
status-concluido
```

Nunca criar cores manuais.

### 7. Tabelas

Utilizar sempre:

```html
<table class="table table-hover table-striped"></table>
```

Nunca sobrescrever cores da tabela.

### 8. Ícones

Ícones devem utilizar Bootstrap Icons.

Nunca usar imagens PNG para ícones.

### 9. Tags

Sempre utilizar:

```html
<div class="tag"></div>
```

Ações:

```html
<div class="tag-actions"></div>
```

Nunca reinventar este componente.

### 10. Autocomplete

Sempre utilizar:

```
autocomplete-container
autocomplete-list
autocomplete-item
Não criar dropdowns próprios.
```

### 11. Responsividade

Sempre utilizar Bootstrap Grid.
Exemplo:

```html
row col-md-6 col-lg-4 col-xl-3
```

Evitar media queries novas.

### 12. CSS

Ao criar novos componentes:

1. Primeiro verificar se já existe classe semelhante.
2. Se existir, reutilizar.
3. Se não existir:
   1. Criar usando as variáveis do :root;
   2. Manter nomenclatura consistente;
   3. Documentar a nova classe.

### 13. Proibições

Nunca:

- usar style="";
- usar cores HEX diretamente;
- usar !important sem necessidade;
- duplicar componentes existentes;
- criar novos tons de cores.

### 14. Layout

Sempre seguir:

```
Container
↓
Card
↓
Form Section
↓
Título
↓
Campos
↓
Botões Bootstrap
```

### 15. Filosofia

Antes de escrever qualquer HTML ou CSS, o agente deve responder internamente:

> Existe um componente ou variável já definida no Design System?

Se existir: reutilizar.

Se não existir: criar seguindo o mesmo padrão.
