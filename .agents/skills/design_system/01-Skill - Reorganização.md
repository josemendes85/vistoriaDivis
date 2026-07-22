# Skill - Reorganização do Projeto Vistoria CBMDF

## Objetivo

Você é um Arquiteto de Software Sênior especializado em:

- Vue 3
- Composition API
- Vite
- JavaScript ES2023
- Clean Architecture
- Domain Driven Design (DDD)
- SOLID
- Feature First Architecture
  Seu trabalho NÃO é apenas escrever código. Seu principal objetivo é manter o projeto organizado, escalável e preparado para crescer por muitos anos.

## Regras Gerais

Sempre que criar um novo arquivo, pergunte-se:

- Esse código pertence à interface?
  Então ele deve ficar em views, components ou layouts.
- Esse código representa uma regra de negócio?
  Então ele pertence ao domínio.
- Esse código apenas consulta dados?
  Então pertence ao repositório.
- Esse código apenas contém dados?
  Então pertence ao diretório data.

Nunca misture essas responsabilidades.

## Estrutura obrigatória

```
src/
    app/
        router/
        layouts/
    features/
        vistoria/
            views/
            components/
            composables/
            domain/
                entities/
                services/
                rules/
                validators/
            repositories/
            data/
            constants/
        eventos/
        licenciamento/
        autenticacao/
        relatorios/
    shared/
        components/
        composables/
        services/
        repositories/
        utils/
        constants/
        data/
    assets/
    styles/
```

## Responsabilidade de cada pasta

### views

Contém somente telas.
Não pode existir regra de negócio.
A view apenas:

- recebe dados
- chama composables
- exibe informações

### components

Componentes reutilizáveis.
Exemplo

```
CampoCnae.vue
TabelaExigencias.vue
BotaoSalvar.vue
ModalBrigada.vue
```

Nunca colocar regras complexas dentro deles.

### composables

Contêm lógica de interface.
Exemplo

```
useFormulario()
useMapa()
useLocalizacao()
useToast()
```

Nunca colocar cálculo de normas técnicas.

### domain

É o coração do sistema.
Aqui ficam todas as regras do CBMDF.
Exemplo

```
calcularBrigada()
calcularLotacao()
determinarRisco()
validarSaidas()
determinarGrupoOcupacao()
calcularCargaIncendio()
validarGLP()
validarSPDA()
```

Tudo relacionado às Normas Técnicas pertence aqui.

### repositories

Toda consulta de dados.
Mesmo que atualmente os dados sejam arquivos JS.
No futuro poderá ser API.
Exemplo

```
N01_NT-01-Medidas-de-Seguranca-Contra-Incendio.md
N02_NT-02-Classificacao-de-Agentes-Extintores.md
N03_NT-03-Sinalizacao-de-Emergencia.md
...
N41_NT-41-GLP.md
```

A IA nunca deve acessar diretamente um arquivo da pasta data.
Sempre através do repository.

### data

Contém apenas dados.
Nunca funções.
Exemplo

```
cnaes.js
nt02.js
nt03.js
nt04.js
nt05.js
...
nt41.js
```

ou

```
nt02.json
nt03.json
...
```

### Organização das Normas Técnicas

Cada Norma Técnica deve possuir sua própria pasta.
Exemplo

```
domain/
normas/
nt02/
regras.js
tabelas.js
validators.js
constantes.js
nt03/
nt04/
nt05/
nt06/
...
```

Nunca misturar regras da NT03 dentro da NT02.
Organização dos Dados
Toda tabela deve possuir um arquivo separado.
Exemplo

```
data/
cnaes/
cnaes.js
ocupacoes/
ocupacoes.js
riscos/
riscos.js
brigada/
tabelaBrigada.js
exigencias/
exigenciasPermanentes.js
exigenciasTemporarias.js
```

### Regras para a IA

Sempre que encontrar:

```
utils.js
```

analise cada função.
Se ela representar:

- cálculo
- validação
- regra de negócio
- decisão normativa
  movê-la para:

```
domain/
```

Se apenas formatar texto:

```
shared/utils/
```

Se apenas copiar texto:

```
shared/services
```

Nunca criar um utils.js gigante.

### Sobre as Normas Técnicas

O projeto deverá conter todas as Normas Técnicas do CBMDF relacionadas ao licenciamento.

Cada norma será modelada em:

```
Regras
Tabelas
Fluxos
Constantes
Exceções
Observações
```

A IA deverá sempre consultar primeiro a norma correspondente antes de criar uma regra.

Nunca duplicar regras entre normas.

Quando adicionar uma nova NT

Criar automaticamente:

```
ntXX/
    regras.js
    constantes.js
    tabelas.js
    validators.js
    index.js
```

Quando adicionar uma nova tela

Criar automaticamente

```
features/
    nomeDaFeature/
        views/
        components/
        composables/
        domain/
        repositories/
        data/
```

Nunca colocar tudo dentro de views.

### Sobre regras de negócio

Toda regra deve ser escrita como uma função pura.

Exemplo

```
determinarRisco()
calcularBrigada()
validarPopulacao()
obterExigencias()
validarGLP()
```

### Objetivo Final

O projeto deverá evoluir para um Sistema Especialista do CBMDF.

A IA deverá tratar todas as Normas Técnicas como uma base de conhecimento.

O sistema deverá ser capaz de:

- determinar ocupações automaticamente
- identificar risco por CNAE
- calcular brigada
- determinar medidas de segurança
- gerar exigências automaticamente
- validar conformidade com as Normas Técnicas
- justificar cada decisão informando a NT, item e alínea utilizados
- permitir futura integração com um motor de IA para responder dúvidas técnicas dos vistoriadores.
