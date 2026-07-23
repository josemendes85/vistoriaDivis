<template>
  <BaseLayout
    :title="isEdit ? 'Editar Processo' : 'Novo Processo'"
    backRoute="/processos"
    backText="Voltar ao Painel"
    :navbarClass="statusClass"
  >
    <div class="pt-2 px-1">
      <!-- Master Form -->
      <form class="needs-validation" novalidate @submit.prevent="salvarRegistro">
        <div class="row">
          <div class="col-12">
            <!-- Vistoria Type & GPS Header -->
            <div class="form-section mb-4">
              <div class="row g-3 align-items-center">
                <div class="col-md-5">
                  <label class="form-label fw-bold text-muted small"
                    >Número do Processo <span v-if="form.tipo !== 'Eventual'" class="text-danger">*</span></label
                  >
                  <div class="input-group">
                    <input
                      :value="form.processoBusca"
                      type="text"
                      class="form-control"
                      placeholder="AAA0000000000 ou 00000-00000000/0000-00"
                      maxlength="22"
                      :required="form.tipo !== 'Eventual'"
                      @input="handleProcessoInput"
                      @blur="handleProcessoBlur"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="copiarProcesso"
                      title="Copiar Processo"
                    >
                      <i class="bi bi-clipboard"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-5">
                  <label class="form-label fw-bold text-muted small"
                    >Tipo de Vistoria <span class="text-danger">*</span></label
                  >
                  <select
                    v-model="form.tipo"
                    class="form-select"
                    required
                    @change="handleTipoChange"
                    @blur="handleTipoBlur"
                  >
                    <option value="">Selecione...</option>
                    <option value="RLE">RLE - Registro de Licenciamento de Empresas</option>
                    <option value="RT">RT - Relatório Técnico</option>
                    <option value="ADP">ADP - Análise de Dilação de Prazo</option>
                    <option value="DPV">DPV - Dilação de Prazo Vencida</option>
                    <option value="PPCI">PPCI - Plano de Prevenção Contra Incêndio</option>
                    <option value="FTruck">FT - Food Truck</option>
                    <option value="Outros">Outros</option>
                    <option value="Eventual">Eventual</option>
                  </select>
                </div>
                <div v-if="form.tipo !== 'Eventual'" class="col-md-2 d-flex gap-2 justify-content-end pt-3">
                  <a
                    v-if="googleMapsUrl"
                    :href="googleMapsUrl"
                    target="_blank"
                    class="btn btn-outline-primary"
                    title="Google Maps"
                  >
                    <i class="bi bi-geo-alt-fill"></i> Maps
                  </a>
                  <a v-if="wazeUrl" :href="wazeUrl" target="_blank" class="btn btn-outline-success" title="Waze">
                    <i class="bi bi-cursor-fill"></i> Waze
                  </a>
                </div>
              </div>
            </div>

            <!-- ================= CONTAINER PADRÃO ================= -->
            <div v-if="form.tipo !== 'Eventual'">
              <!-- Dados da Instituição -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-building me-2"></i>Dados da Instituição</h4>
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">CNPJ <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <input
                        :value="form.cnpj"
                        type="text"
                        class="form-control"
                        placeholder="00.000.000/0000-00"
                        maxlength="18"
                        required
                        :disabled="isCnpjDisabled"
                        @input="handleCnpjInput"
                        @blur="buscarCnpj"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="toggleCnpjLock"
                        :title="isCnpjDisabled ? 'Desbloquear CNPJ' : 'Bloquear CNPJ'"
                      >
                        <i class="bi" :class="isCnpjDisabled ? 'bi-lock-fill text-warning' : 'bi-unlock-fill'"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <label class="form-label fw-bold text-muted small"
                      >Nome Fantasia/Razão Social <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="form.instituicao"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="Nome da Instituição"
                      required
                    />
                  </div>
                  <div class="col-md-8">
                    <label class="form-label fw-bold text-muted small"
                      >Endereço Completo <span class="text-danger">*</span></label
                    >
                    <textarea
                      v-model="form.endereco"
                      class="form-control text-uppercase"
                      rows="2"
                      placeholder="Rua, número, bairro, cidade - UF"
                      required
                    ></textarea>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Coordenadas GPS</label>
                    <div class="input-group">
                      <input
                        v-model="form.localizacao"
                        type="text"
                        class="form-control"
                        placeholder="-00.00000, -00.00000"
                        @input="metodoGps = 'Inserido manualmente'"
                      />
                      <button class="btn btn-outline-success" type="button" @click="obterGps" title="Obter GPS">
                        <i class="bi bi-geo-alt"></i>
                      </button>
                    </div>
                    <div class="form-text small" :class="metodoGpsClass">{{ metodoGps }}</div>
                  </div>
                </div>
              </div>

              <!-- Classificação da Edificação -->
              <div class="form-section mb-4">
                <h4 class="section-title d-flex align-items-center flex-wrap gap-2">
                  <span class="d-flex align-items-center">
                    <i class="bi bi-diagram-3 me-2"></i>Classificação da Edificação
                  </span>
                  <i
                    class="bi bi-info-circle-fill icon-info-cnae"
                    @click="abrirCnaesModal"
                    title="Visualizar atividades (CNAE)"
                  ></i>
                </h4>
                <div class="row g-3">
                  <div class="col-md-4 autocomplete-container">
                    <label class="form-label fw-bold text-muted small">Termo</label>
                    <input
                      v-model="form.termo"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="Busque pelo termo da Tabela 2..."
                      @focus="
                        (e) => {
                          showTermoSugestoes = true;
                          e.target.select();
                        }
                      "
                      @click="(e) => e.target.select()"
                      @blur="hideTermoSugestoes"
                    />
                    <div
                      v-if="showTermoSugestoes && filtradasTermoSugestoes.length > 0"
                      class="autocomplete-list shadow-lg"
                    >
                      <div
                        v-for="sug in filtradasTermoSugestoes"
                        :key="sug.termo + '-' + sug.ocupacao"
                        class="autocomplete-item text-uppercase"
                        @mousedown="selecionarTermo(sug)"
                      >
                        <div class="fw-bold">{{ sug.termo }}</div>
                        <div class="text-muted small">
                          Grupo: {{ sug.grupo }} | Ocupação: {{ sug.ocupacao }} | Risco: {{ sug.risco }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small"
                      >Ocupação <span class="text-danger">*</span></label
                    >
                    <select
                      v-model="form.ocupacao"
                      class="form-select"
                      id="ocupacao"
                      @change="verificarMudancaExigencias()"
                      @blur="determinarGrauRisco(false)"
                      required
                    >
                      <option value="">Selecione a ocupação</option>
                      <optgroup label="Residenciais">
                        <option value="01">01 - Residenciais unifamiliares</option>
                        <option value="02">02 - Residenciais multifamiliares</option>
                      </optgroup>
                      <optgroup label="Transitórias">
                        <option value="03">03 - Habitações coletivas</option>
                        <option value="04">04 - Hotéis</option>
                        <option value="05">05 - Hotéis residenciais</option>
                      </optgroup>
                      <optgroup label="Comerciais">
                        <option value="06">06 - Comércio de pequeno porte</option>
                        <option value="07">07 - Comércio de médio porte</option>
                        <option value="08">08 - Comércio de grande porte</option>
                      </optgroup>
                      <optgroup label="Serviços Profissionais">
                        <option value="09">09 - Escritórios</option>
                        <option value="10">10 - Agências bancárias</option>
                        <option value="11">11 - Laboratórios e estúdios</option>
                        <option value="12">12 - Serviços de reparação</option>
                      </optgroup>
                      <optgroup label="Escolares">
                        <option value="13">13 - Escolas em geral</option>
                        <option value="14">14 - Escolas especiais</option>
                        <option value="15">15 - Locais para cultura física</option>
                        <option value="16">16 - Pré-escolas</option>
                        <option value="17">17 - Escolas para portadores de deficiências</option>
                      </optgroup>
                      <optgroup label="Concentração de Público">
                        <option value="18">18 - Museus e bibliotecas</option>
                        <option value="19">19 - Templos religiosos</option>
                        <option value="20">20 - Centros esportivos e de exibição</option>
                        <option value="21">21 - Terminais de passageiros</option>
                        <option value="22">22 - Artes cênicas e auditórios</option>
                        <option value="23">23 - Clubes sociais</option>
                        <option value="24">24 - Construções provisórias</option>
                        <option value="25">25 - Restaurantes</option>
                      </optgroup>
                      <optgroup label="Garagens">
                        <option value="26">26 - Garagens em geral</option>
                        <option value="27">27 - Oficinas</option>
                        <option value="28">28 - Hangares</option>
                      </optgroup>
                      <optgroup label="Hospitalares">
                        <option value="29">29 - Hospitais veterinários</option>
                        <option value="30">30 - Hospitais em geral</option>
                        <option value="31">31 - Locais para pessoas com limitações físicas ou mentais</option>
                        <option value="32">32 - Clínicas</option>
                      </optgroup>
                      <optgroup label="Industriais">
                        <option value="33">33 - Indústrias ≤ 300 MJ/m²</option>
                        <option value="34">34 - Indústrias > 300 MJ/m² e &lt; 1200 MJ/m²</option>
                        <option value="35">35 - Indústrias ≥ 1200 MJ/m²</option>
                      </optgroup>
                      <optgroup label="Depósitos">
                        <option value="36">36 - Depósitos de material incombustível</option>
                        <option value="37">37 - Depósitos ≤ 300 MJ/m²</option>
                        <option value="38">38 - Depósitos > 300 MJ/m² e &lt; 1200 MJ/m²</option>
                        <option value="39">39 - Depósitos ≥ 1200 MJ/m²</option>
                      </optgroup>
                      <optgroup label="Armazenamento e Instalações de alto risco">
                        <option value="40">40 - Líquidos ou gases inflamáveis e combustíveis</option>
                        <option value="41">41 - Explosivos</option>
                        <option value="42">42 - Produtos perigosos</option>
                      </optgroup>
                      <optgroup label="Especiais">
                        <option value="43">43 - Vegetações</option>
                        <option value="44">44 - Canteiros de obras</option>
                        <option value="45">45 - Centros esportivos (&gt; 2500 pessoas)</option>
                        <option value="46">46 - Parques de diversões</option>
                        <option value="47">47 - Centrais de comunicação e energia</option>
                        <option value="48">48 - Túneis</option>
                        <option value="49">49 - Silos</option>
                        <option value="50">50 - Locais com restrição de liberdade</option>
                      </optgroup>
                      <optgroup label="Mistas">
                        <option value="51">51 - Destinações variáveis</option>
                      </optgroup>
                    </select>
                  </div>
                  <!-- Grau de Risco -->
                  <div class="col-md-2 mt-3">
                    <label class="form-label fw-bold text-muted small">Grau de Risco</label>
                    <select v-model="form.grauRisco" class="form-select" @change="verificarMudancaExigencias()">
                      <option value="">Selecione o grau de risco</option>
                      <option value="A">Baixo (A)</option>
                      <option value="B-1">Médio (B-1)</option>
                      <option value="B-2">Médio (B-2)</option>
                      <option value="C-1">Alto (C-1)</option>
                      <option value="C-2">Alto (C-2)</option>
                    </select>
                  </div>
                  <div class="col-md-2">
                    <label class="form-label fw-bold text-muted small"
                      >Área (m²) <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="form.area"
                      type="number"
                      step="0.01"
                      min="0"
                      class="form-control"
                      placeholder="0.00"
                      @blur="verificarMudancaExigencias()"
                      required
                    />
                  </div>
                  <div class="col-md-2">
                    <label class="form-label fw-bold text-muted small" title="Altura Ascendente">Alt. Asc. (m)</label>
                    <input
                      v-model="form.alturaAscendente"
                      type="number"
                      step="0.01"
                      min="0"
                      class="form-control"
                      placeholder="0.00"
                      @blur="verificarMudancaExigencias()"
                    />
                  </div>
                  <div class="col-md-2">
                    <label class="form-label fw-bold text-muted small" title="Altura Descendente">Alt. Desc. (m)</label>
                    <input
                      v-model="form.alturaDescendente"
                      type="number"
                      step="0.01"
                      min="0"
                      class="form-control"
                      placeholder="0.00"
                      @blur="verificarMudancaExigencias()"
                    />
                  </div>
                  <div class="col-md-2">
                    <label class="form-label fw-bold text-muted small" title="Pavimentos Superiores"
                      >Pav. Superiores</label
                    >
                    <input
                      v-model="form.pavimentosSuperiores"
                      type="number"
                      class="form-control"
                      placeholder="0"
                      @blur="verificarMudancaExigencias()"
                    />
                  </div>
                  <div class="col-md-2">
                    <label class="form-label fw-bold text-muted small" title="Pavimentos Inferiores"
                      >Pav. Inferiores</label
                    >
                    <input
                      v-model="form.pavimentosInferiores"
                      type="number"
                      class="form-control"
                      placeholder="0"
                      @blur="verificarMudancaExigencias()"
                    />
                  </div>
                  <div class="col-md-2">
                    <label class="form-label fw-bold text-muted small">População Fixa</label>
                    <input
                      v-model="form.populacaoFixa"
                      type="number"
                      class="form-control"
                      placeholder="0"
                      @blur="verificarMudancaExigencias()"
                    />
                  </div>

                  <!-- Quantidade de Brigadistas -->
                  <div class="col-md-2 mt-3">
                    <label class="form-label fw-bold text-muted small d-flex align-items-center gap-1">
                      Qtd Brigadistas
                      <i
                        class="bi bi-info-circle-fill text-info cursor-pointer fs-6"
                        @click="abrirBrigadaModal"
                        title="Ver quantitativo necessário (NT 007/2011)"
                      ></i>
                    </label>
                    <input
                      v-model="form.qtdBrigadistas"
                      type="number"
                      min="0"
                      class="form-control"
                      :class="{ 'is-invalid': isQtdBrigadistasInvalid }"
                      :placeholder="placeholderBrigadistas"
                    />
                    <div v-if="isQtdBrigadistasInvalid" class="invalid-feedback d-block">
                      <i class="bi bi-exclamation-circle-fill me-1"></i>Abaixo do mínimo exigido ({{
                        placeholderBrigadistas
                      }}).
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dados da Vistoria -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-clipboard-check me-2"></i>Dados da Vistoria</h4>
                <div class="row g-3">
                  <div class="col-md-8">
                    <label class="form-label fw-bold text-muted small"
                      >Responsável pela Edificação <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="form.responsavel"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="Nome do responsável"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small"
                      >Função/Cargo <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="form.responsavelFuncao"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="Ex: Síndico, Gerente"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small"
                      >Telefone <span class="text-danger">*</span></label
                    >
                    <input
                      :value="form.responsavelTelefone"
                      type="tel"
                      class="form-control"
                      placeholder="(61) 90000-0000"
                      required
                      @input="handlePhoneInput($event, 'responsavelTelefone')"
                    />
                  </div>
                  <div class="col-md-8">
                    <label class="form-label fw-bold text-muted small">E-mail <span class="text-danger">*</span></label>
                    <input
                      v-model="form.responsavelEmail"
                      type="email"
                      class="form-control text-lowercase"
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Início da Vistoria</label>
                    <input v-model="form.inicio" type="datetime-local" class="form-control" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Fim da Vistoria</label>
                    <input v-model="form.fim" type="datetime-local" class="form-control" />
                  </div>
                  <div class="col-md-4" id="divStatus" :class="statusClass">
                    <label class="form-label fw-bold small">Status</label>
                    <select v-model="form.status" class="form-select">
                      <option value="Sem Status">Sem Status</option>
                      <option value="Pendente">Pendente</option>
                      <option value="Análise">Em Análise</option>
                      <option value="Vistoria">Em Vistoria</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Reprovado">Reprovado</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Não Realizada">Não Realizada</option>
                    </select>
                  </div>

                  <!-- Licença Retorno Checkboxes (condicional RLE + Aprovado) -->
                  <div v-if="form.tipo === 'RLE' && form.status === 'Aprovado'" class="col-12 mt-3">
                    <div class="d-flex align-items-center gap-3 bg-light p-3 rounded">
                      <label class="form-label mb-0 fw-bold">Licença aprovada por:</label>
                      <div class="form-check mb-0">
                        <input
                          class="form-check-input"
                          type="radio"
                          v-model="form.retorno"
                          id="retornoSim"
                          value="sim"
                        />
                        <label class="form-check-label" for="retornoSim">1 ano</label>
                      </div>
                      <div class="form-check mb-0">
                        <input
                          class="form-check-input"
                          type="radio"
                          v-model="form.retorno"
                          id="retornoNao"
                          value="nao"
                        />
                        <label class="form-check-label" for="retornoNao">3 anos</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Acompanhante -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-person me-2"></i>Dados do Acompanhante</h4>
                <div class="row g-3">
                  <div class="col-md-7">
                    <label class="form-label fw-bold text-muted small">Nome Completo</label>
                    <input
                      v-model="form.acompanhante"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="Nome do acompanhante"
                    />
                  </div>
                  <div class="col-md-5">
                    <label class="form-label fw-bold text-muted small">Função/Cargo</label>
                    <input
                      v-model="form.funcao"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="Função na empresa"
                    />
                  </div>
                </div>
              </div>

              <!-- ================= EXIGÊNCIAS DE SEGURANÇA DE VISTORIAS ================= -->
              <div class="form-section mb-4">
                <h4 class="section-title">
                  <i class="bi bi-shield-check me-2"></i>Exigências de Segurança Contra Incêndio
                </h4>

                <!-- Badges showing active categories -->
                <div class="d-flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="catCode in activeCategoryCodes"
                    :key="catCode"
                    class="badge bg-danger p-2 fs-6 position-relative d-flex align-items-center gap-2 text-wrap text-start"
                  >
                    {{ categoriasMap[catCode] }}
                    <i
                      class="bi bi-x cursor-pointer text-white"
                      @click="removerCategoria(catCode)"
                      title="Remover categoria"
                    ></i>
                  </span>
                </div>

                <!-- Categories Exigency Cards -->
                <div v-for="catCode in activeCategoryCodes" :key="catCode" class="card mb-3 p-3 border">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0 fw-bold text-body-emphasis">
                      {{ categoriasMap[catCode] }}
                      <!-- Alerta icon if category 009 is required by size check -->
                      <i
                        v-if="catCode === '009' && isSpkRequired"
                        class="bi bi-exclamation-triangle-fill text-warning ms-2"
                        title="Obrigatório pelos critérios de Área/Altura"
                      ></i>
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      @click="removerCategoria(catCode)"
                      aria-label="Remover"
                    ></button>
                  </div>

                  <!-- Input Search Box with dynamic dropdown suggestion -->
                  <div class="mb-3 position-relative">
                    <input
                      v-model="searchExigencias[catCode]"
                      type="text"
                      class="form-control"
                      :placeholder="'Adicionar exigência de ' + categoriasMap[catCode]"
                      @focus="showSugestoes[catCode] = true"
                      @blur="hideSugestoes(catCode)"
                      @keydown.enter.prevent="adicionarCustomExigencia(catCode)"
                    />

                    <!-- Suggestions Dropdown -->
                    <ul
                      v-if="showSugestoes[catCode] && getFiltradasSugestoes(catCode).length > 0"
                      class="list-group position-absolute w-100 shadow-lg dropdown-suggestions"
                    >
                      <li
                        v-for="sugestao in getFiltradasSugestoes(catCode)"
                        :key="sugestao"
                        class="list-group-item list-group-item-action cursor-pointer py-2 small"
                        @mousedown="adicionarExigencia(catCode, sugestao)"
                      >
                        {{ sugestao }}
                      </li>
                    </ul>
                  </div>

                  <!-- List of added items in this category - RESTORED ORIGINAL STYLING -->
                  <div class="d-flex flex-column gap-1">
                    <div v-for="(item, idx) in exigenciasAtivas[catCode]" :key="idx" class="tag">
                      <span :class="{ 'text-decoration-line-through text-muted': item.cumprido }">
                        <strong>{{ item.code }}</strong> - {{ item.text }}
                      </span>
                      <div class="tag-actions">
                        <i
                          class="bi bi-x-circle-fill tag-action-icon tag-close-icon"
                          @click="removerExigenciaItem(catCode, idx)"
                          title="Remover exigência"
                        ></i>
                        <i
                          :class="[
                            'bi',
                            'bi-check-circle-fill',
                            'tag-action-icon',
                            'check-cumprido-icon',
                            item.cumprido ? 'text-success' : 'text-secondary',
                          ]"
                          @click="item.cumprido = !item.cumprido"
                          title="Marcar como cumprida"
                        ></i>
                        <i
                          :class="[
                            'bi',
                            'bi-info-circle-fill',
                            'tag-action-icon',
                            'anotacao-icon',
                            item.anotacao ? 'text-primary' : 'text-secondary',
                          ]"
                          @click="abrirAnotacaoItem(item)"
                          title="Anotações"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Add Category Dropdown -->
                <div class="mb-3">
                  <label class="form-label fw-bold text-muted small">Adicionar Outra Categoria de Exigência:</label>
                  <select class="form-select" @change="adicionarCategoriaNova($event)">
                    <option value="">Selecione uma categoria para adicionar</option>
                    <option
                      v-for="(catName, catCode) in categoriasMap"
                      :key="catCode"
                      :value="catCode"
                      :disabled="activeCategoryCodes.includes(catCode)"
                    >
                      {{ catName }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Observações Gerais -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-journal-text me-2"></i>Observações Gerais</h4>
                <div class="mb-3">
                  <label class="form-label fw-bold text-muted small">Observações da Vistoria</label>
                  <textarea
                    v-model="form.observacao"
                    rows="4"
                    class="form-control"
                    placeholder="Descreva observações relevantes sobre a vistoria..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- ================= CONTAINER EVENTUAL ================= -->
            <div v-else>
              <!-- 1. Identificação do Evento -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-file-text me-2"></i>Identificação do Evento</h4>
                <div class="row g-3">
                  <div class="col-md-8">
                    <label class="form-label fw-bold text-muted small"
                      >Nome do Evento <span class="text-danger">*</span></label
                    >
                    <input v-model="form.ev_evento" type="text" class="form-control text-uppercase" required />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small"
                      >Região Administrativa <span class="text-danger">*</span></label
                    >
                    <select v-model="form.ev_ra" class="form-select" required>
                      <option value="">Selecione...</option>
                      <option v-for="ra in REGIOES_ADMINISTRATIVAS" :key="ra" :value="ra">{{ ra }}</option>
                    </select>
                  </div>
                  <div class="col-md-8">
                    <label class="form-label fw-bold text-muted small">Endereço do Evento</label>
                    <input v-model="form.ev_endereco" type="text" class="form-control text-uppercase" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Coordenadas GPS</label>
                    <div class="input-group">
                      <input v-model="form.ev_geo" type="text" class="form-control" placeholder="-00.0000, -00.0000" />
                      <button class="btn btn-outline-success" type="button" @click="obterGpsEventual" title="Obter GPS">
                        <i class="bi bi-geo-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Equipe de Vistoria -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-people me-2"></i>Equipe de Vistoria</h4>
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Vistoriador 01</label>
                    <input
                      v-model="form.ev_vistoriador01"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="NOME - MATRÍCULA"
                    />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Vistoriador 02</label>
                    <input
                      v-model="form.ev_vistoriador02"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="NOME - MATRÍCULA"
                    />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Viatura</label>
                    <input
                      :value="form.ev_viatura"
                      type="text"
                      class="form-control text-uppercase"
                      placeholder="Ex: ABC 1234"
                      @input="handleViaturaInput"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-bold text-muted small">Regime de Trabalho</label>
                    <select v-model="form.ev_regime" class="form-select">
                      <option value="">Selecione...</option>
                      <option v-for="reg in REGIMES_TRABALHO" :key="reg" :value="reg">{{ reg }}</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-bold text-muted small">E-mail Google</label>
                    <input
                      v-model="form.ev_email_usuario"
                      type="email"
                      class="form-control"
                      placeholder="divis.fiscXX@gmail.com"
                    />
                  </div>
                </div>
              </div>

              <!-- 3. Período e Capacidade -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-calendar-event me-2"></i>Período e Capacidade</h4>
                <div class="row g-3">
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small"
                      >Data Início <span class="text-danger">*</span></label
                    >
                    <input v-model="form.ev_data_inicio" type="date" class="form-control" required />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small"
                      >Data Final <span class="text-danger">*</span></label
                    >
                    <input v-model="form.ev_data_fim" type="date" class="form-control" required />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-bold text-muted small">Observações quanto ao período</label>
                    <input v-model="form.ev_obs_periodo" type="text" class="form-control text-uppercase" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Público do Evento</label>
                    <input v-model="form.ev_publico" type="number" class="form-control" placeholder="0000" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Área total (m²)</label>
                    <input v-model="form.ev_area" type="number" class="form-control" placeholder="0000" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Realizou a vistoria?</label>
                    <select v-model="form.ev_vistoria_realizada" class="form-select">
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 4. Responsáveis e Brigada -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-person-check me-2"></i>Responsáveis e Brigada</h4>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-bold text-muted small">Nome do Responsável</label>
                    <input v-model="form.ev_responsavel" type="text" class="form-control text-uppercase" />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small">CPF do Responsável</label>
                    <input
                      :value="form.ev_cpf"
                      type="text"
                      class="form-control"
                      placeholder="000.000.000-00"
                      @input="handleCpfInput"
                    />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small">Telefone do Responsável</label>
                    <input
                      :value="form.ev_telefone"
                      type="tel"
                      class="form-control"
                      placeholder="(61) 90000-0000"
                      @input="handlePhoneInput($event, 'ev_telefone')"
                    />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small">Terá brigada?</label>
                    <select v-model="form.ev_tem_brigada" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-9">
                    <label class="form-label fw-bold text-muted small">Empresa de brigada</label>
                    <select v-model="form.ev_empresa_brigada" class="form-select">
                      <option value="">Selecione a empresa...</option>
                      <option v-for="emp in EMPRESAS_BRIGADA" :key="emp" :value="emp">{{ emp }}</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-bold text-muted small">Cert. dos Brig. Válidos?</label>
                    <select v-model="form.ev_cert_brigadista" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-bold text-muted small">Qtd. Brigadistas</label>
                    <input v-model="form.ev_qtd_brigadistas" type="number" class="form-control" placeholder="0" />
                  </div>
                </div>
              </div>

              <!-- 5. Estruturas Provisórias -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-building me-2"></i>Estruturas Provisórias</h4>
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Possui estrutura Provisória?</label>
                    <select v-model="form.ev_possui_estrutura" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Evento cercado?</label>
                    <select v-model="form.ev_cercamento" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Laudo Inflamabilidade?</label>
                    <select v-model="form.ev_laudo_inflamabilidade" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>

                  <!-- Quantitativos -->
                  <div class="col-6 col-md-3">
                    <label class="form-label fw-bold text-muted small">Tendas/Barracas</label>
                    <input v-model="form.ev_q_tendas" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-6 col-md-3">
                    <label class="form-label fw-bold text-muted small">Palcos</label>
                    <input v-model="form.ev_q_palcos" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-6 col-md-3">
                    <label class="form-label fw-bold text-muted small">Arquibancadas</label>
                    <input v-model="form.ev_q_arqui" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-6 col-md-3">
                    <label class="form-label fw-bold text-muted small">Pórticos/Cenogr.</label>
                    <input v-model="form.ev_q_porticos" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-6 col-md-4">
                    <label class="form-label fw-bold text-muted small">Brinquedos Eletro.</label>
                    <input v-model="form.ev_q_eletro" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-6 col-md-4">
                    <label class="form-label fw-bold text-muted small">Camarotes</label>
                    <input v-model="form.ev_q_camarotes" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-6 col-md-4">
                    <label class="form-label fw-bold text-muted small">Infláveis</label>
                    <input v-model="form.ev_q_inflaveis" type="number" class="form-control" placeholder="0" />
                  </div>
                </div>
              </div>

              <!-- 6. Segurança e Riscos -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-lightning-charge me-2"></i>Segurança e Riscos</h4>
                <div class="row g-3">
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small">Elétrica provisória?</label>
                    <select v-model="form.ev_eletrica_provisoria" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small">Quadros Energia</label>
                    <input v-model="form.ev_q_quadros" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small">Geradores</label>
                    <input v-model="form.ev_q_geradores" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label fw-bold text-muted small">Extintores</label>
                    <input v-model="form.ev_q_extintores" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-md-8">
                    <label class="form-label fw-bold text-muted small"
                      >Extintores no prazo de validade e conforme o croqui?</label
                    >
                    <select v-model="form.ev_extintores_validos" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Quadros com DR isolados?</label>
                    <select v-model="form.ev_qd_dr" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Itens Gerador OK?</label>
                    <select v-model="form.ev_itens_gerador_ok" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Estrut. Aterradas?</label>
                    <select v-model="form.ev_estruturas_aterradas" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>

                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Uso de GLP?</label>
                    <select v-model="form.ev_glp" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Central GLP?</label>
                    <select v-model="form.ev_central_glp" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Qtd P13</label>
                    <input v-model="form.ev_q_p13" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Parâmetros P-13 estão OK?</label>
                    <select v-model="form.ev_parametros_p13" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Food Trucks</label>
                    <input v-model="form.ev_q_food_trucks" type="number" class="form-control" placeholder="0" />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Fogos de Artifício?</label>
                    <select v-model="form.ev_fogos_artificio" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Líquido Inflamável?</label>
                    <select v-model="form.ev_liquido_inflamavel" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Saídas Iluminadas?</label>
                    <select v-model="form.ev_saidas_iluminadas" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Saídas Desobstruídas?</label>
                    <select v-model="form.ev_saidas_desobstruidas" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Distância Máxima a percorrer de 120m?</label>
                    <select v-model="form.ev_distancias_cumpridas" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 7. Checklist de Documentos -->
              <div class="form-section mb-4">
                <h4 class="section-title"><i class="bi bi-file-earmark-text me-2"></i>Checklist de Documentos</h4>
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">ART Estruturas</label>
                    <select v-model="form.ev_art_estruturas" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">ART Elétrica/Gerador</label>
                    <select v-model="form.ev_art_eletrica" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Croqui do Evento</label>
                    <select v-model="form.ev_croqui_evento" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Certificação Food Truck</label>
                    <select v-model="form.ev_cert_foodtruck" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Contrato Brigada</label>
                    <select v-model="form.ev_contrato_brigada" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label fw-bold text-muted small">Declaração Gerador</label>
                    <select v-model="form.ev_declaracao_gerador" class="form-select">
                      <option value="">Selecione...</option>
                      <option>Não se aplica</option>
                      <option>Sim</option>
                      <option>Não</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- 8. Resultado e Parecer Final -->
              <div class="form-section mb-12">
                <h4 class="section-title"><i class="bi bi-journal-check me-2"></i>Resultado e Parecer Final</h4>
                <div class="row g-3">
                  <div class="col-md-12">
                    <label class="form-label fw-bold text-muted small"
                      >Status da Vistoria <span class="text-danger">*</span></label
                    >
                    <select v-model="form.ev_status_eventual" class="form-select" @change="onEventualStatusChange">
                      <option value="">Selecione...</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Reprovado">Reprovado</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Não Realizada">Não Realizada</option>
                    </select>
                  </div>

                  <div class="col-md-12">
                    <label class="form-label fw-bold text-muted small">Parecer Final</label>
                    <textarea
                      v-model="form.ev_parecer_final"
                      class="form-control text-uppercase"
                      rows="3"
                      placeholder="Descrever parecer final..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions Bar -->
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3 mb-1">
              <div class="d-flex gap-2 flex-wrap">
                <button type="submit" class="btn btn-success"><i class="bi bi-save me-1"></i>Salvar</button>
                <button
                  v-if="form.tipo === 'Eventual'"
                  type="button"
                  class="btn btn-primary"
                  @click="enviarGoogleFormsEventual"
                >
                  <i class="bi bi-send me-1"></i>Enviar ao Google Forms
                </button>
                <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
              </div>

              <div class="d-flex gap-2 align-items-center flex-wrap">
                <button v-if="isEdit" type="button" class="btn btn-info text-white" @click="compartilharProcesso">
                  <i class="bi bi-share me-1"></i>Compartilhar
                </button>
                <button v-if="isEdit" type="button" class="btn btn-danger" @click="excluirRegistro">
                  <i class="bi bi-trash me-1"></i>Excluir
                </button>

                <div class="form-check form-switch ms-2">
                  <input v-model="form.checkConcluido" class="form-check-input" type="checkbox" id="checkConcluido" />
                  <label class="form-check-label fw-bold text-success mb-0" for="checkConcluido">
                    <i class="bi bi-check-circle me-1"></i>Concluído?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Modal de Anotação Individual da Exigência -->
    <AnotacaoModal :item="selectedExigenciaItem" @save="salvarAnotacaoItem" />

    <!-- Modal de Classificação da Edificação (Atividades CNAE) -->
    <CnaesModal
      :motivoRisco="motivoRisco"
      :cnaePrincipal="form.cnaePrincipal"
      :cnaeSecundarios="form.cnaeSecundarios"
    />

    <!-- Modal de Dimensionamento da Brigada de Incêndio -->
    <BrigadaModal :populacaoFixa="form.populacaoFixa" :grauRisco="form.grauRisco" />
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseLayout from "@/app/layouts/BaseLayout.vue";
import AnotacaoModal from "../components/AnotacaoModal.vue";
import CnaesModal from "../components/CnaesModal.vue";
import BrigadaModal from "../components/BrigadaModal.vue";
import { DADOS_SISTEMA, regrasInclusao } from "../data/dadosSistema/dadosSistema.js";
import { showToast } from "@/shared/composables/useToast.js";
import { parseNumber } from "@/shared/utils/numberUtils.js";
import { extrairCodigoCnae } from "@/shared/utils/cnaeUtils.js";
import { obterRiscoPorCnae, calcularBrigada } from "../domain/normas/nt02/regras.js";
import axios from "axios";
import * as bootstrap from "bootstrap";
import { NT02_TABELA2 } from "../domain/normas/nt02/tabelas.js";
import {
  REGIOES_ADMINISTRATIVAS,
  EMPRESAS_BRIGADA,
  REGIMES_TRABALHO,
  enviarEventualGoogleForms,
} from "../constants/eventualConstants.js";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const formId = ref(route.params.id || `process-${Date.now()}`);

const isCnpjDisabled = ref(false);

const toggleCnpjLock = () => {
  isCnpjDisabled.value = !isCnpjDisabled.value;
};

const form = ref({
  tipo: "",
  processoBusca: "",
  cnpj: "",
  instituicao: "",
  endereco: "",
  localizacao: "",
  ocupacao: "",
  termo: "",
  area: "",
  alturaAscendente: "",
  alturaDescendente: "",
  pavimentosSuperiores: "",
  pavimentosInferiores: "",
  populacaoFixa: "",
  responsavel: "",
  responsavelFuncao: "",
  responsavelTelefone: "",
  responsavelEmail: "",
  inicio: "",
  fim: "",
  status: "Sem Status",
  retorno: "nao",
  acompanhante: "",
  funcao: "",
  observacao: "",
  checkConcluido: false,
  cnaePrincipal: "",
  cnaeSecundarios: [],
  grauRisco: "",
  qtdBrigadistas: "",

  // Eventual specific
  ev_email_usuario: "",
  ev_evento: "",
  ev_ra: "",
  ev_endereco: "",
  ev_geo: "",
  ev_vistoriador01: "",
  ev_vistoriador02: "",
  ev_viatura: "",
  ev_regime: "",
  ev_data_inicio: "",
  ev_data_fim: "",
  ev_obs_periodo: "",
  ev_publico: "",
  ev_area: "",
  ev_vistoria_realizada: "Sim",
  ev_responsavel: "",
  ev_cpf: "",
  ev_telefone: "",
  ev_tem_brigada: "",
  ev_empresa_brigada: "",
  ev_cert_brigadista: "",
  ev_qtd_brigadistas: "",

  // Estruturas
  ev_possui_estrutura: "",
  ev_cercamento: "",
  ev_laudo_inflamabilidade: "",
  ev_q_tendas: "",
  ev_q_palcos: "",
  ev_q_arqui: "",
  ev_q_porticos: "",
  ev_q_eletro: "",
  ev_q_camarotes: "",
  ev_q_inflaveis: "",

  // Segurança e Riscos
  ev_eletrica_provisoria: "",
  ev_q_quadros: "",
  ev_q_geradores: "",
  ev_q_extintores: "",
  ev_extintores_validos: "",
  ev_qd_dr: "",
  ev_itens_gerador_ok: "",
  ev_estruturas_aterradas: "",
  ev_glp: "",
  ev_central_glp: "",
  ev_q_p13: "",
  ev_parametros_p13: "",
  ev_q_food_trucks: "",
  ev_fogos_artificio: "",
  ev_liquido_inflamavel: "",
  ev_saidas_iluminadas: "",
  ev_saidas_desobstruidas: "",
  ev_distancias_cumpridas: "",

  // Checklist Documentos
  ev_art_estruturas: "",
  ev_art_eletrica: "",
  ev_croqui_evento: "",
  ev_cert_foodtruck: "",
  ev_contrato_brigada: "",
  ev_declaracao_gerador: "",

  // Resultado e Parecer
  ev_status_eventual: "",
  ev_motivo_cancelamento: "",
  ev_condicionantes: "",
  ev_restricoes: "",
  ev_parecer_final: "",
});

// Dynamic status styling classes
const statusClass = computed(() => {
  const statusLower = (form.value.status || "").toLowerCase();
  if (statusLower === "pendente") return "status-pendente";
  if (statusLower === "análise") return "status-analise";
  if (statusLower === "vistoria") return "status-vistoria";
  if (statusLower === "aprovado") return "status-aprovado";
  if (statusLower === "reprovado") return "status-reprovado";
  if (statusLower === "cancelado") return "status-cancelado";
  if (statusLower === "não realizada") return "status-nao-realizada";
  return "status-sem-status";
});

// Exigencies lists mapping
const categoriasMap = DADOS_SISTEMA.categorias;
const activeCategoryCodes = ref(["002", "003", "004", "005", "008"]);
const exigenciasAtivas = ref({});
const searchExigencias = ref({});
const showSugestoes = ref({});

const metodoGps = ref("Clique para obter a geolocalização atual");
const metodoGpsClass = computed(() => {
  if (metodoGps.value.startsWith("Obtido")) return "text-success fw-medium";
  if (metodoGps.value === "Inserido manualmente") return "text-warning fw-medium";
  return "text-muted";
});

// Individual exigency annotation references
const selectedExigenciaItem = ref(null);
let modalInstance = null;

const abrirAnotacaoItem = (item) => {
  selectedExigenciaItem.value = item;
  const modalEl = document.getElementById("anotacaoModal");
  if (modalEl) {
    modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();
  }
};

const salvarAnotacaoItem = (textoAnotacao) => {
  if (selectedExigenciaItem.value) {
    selectedExigenciaItem.value.anotacao = textoAnotacao;
    showToast("Anotação da exigência salva!", "success");
    if (modalInstance) {
      modalInstance.hide();
    }
  }
};

const isLoaded = ref(false);
let cnaesModalInstance = null;
let brigadaModalInstance = null;
const motivoRisco = ref(null);
const abrirCnaesModal = () => {
  const modalEl = document.getElementById("cnaesModal");
  if (modalEl) {
    cnaesModalInstance = new bootstrap.Modal(modalEl);
    cnaesModalInstance.show();
  }
};

const abrirBrigadaModal = () => {
  const modalEl = document.getElementById("brigadaModal");
  if (modalEl) {
    brigadaModalInstance = new bootstrap.Modal(modalEl);
    brigadaModalInstance.show();
  }
};

const placeholderBrigadistas = computed(() => {
  const pop = parseInt(form.value.populacaoFixa, 10) || 0;
  const risco = form.value.grauRisco || "";
  const b = calcularBrigada(risco, pop);
  return b.particular.toString();
});

const limparQtdSeIgualAoMinimo = () => {
  const calculatedMin = parseInt(placeholderBrigadistas.value, 10) || 0;
  if (
    form.value.qtdBrigadistas !== "" &&
    form.value.qtdBrigadistas !== null &&
    form.value.qtdBrigadistas !== undefined &&
    parseInt(form.value.qtdBrigadistas, 10) === calculatedMin
  ) {
    form.value.qtdBrigadistas = "";
  }
};

const isQtdBrigadistasInvalid = computed(() => {
  if (
    form.value.qtdBrigadistas === "" ||
    form.value.qtdBrigadistas === null ||
    form.value.qtdBrigadistas === undefined
  ) {
    return false;
  }
  const entered = parseInt(form.value.qtdBrigadistas, 10);
  const required = parseInt(placeholderBrigadistas.value, 10);
  return entered < required;
});

const determinarGrauRisco = (silencioso = false) => {
  let highestRisco = "";
  let highestRiscoVal = 0;
  let matchedTermo = "";
  let matchedCnae = "";
  let matchedGrupo = "";
  let matchedOcupacao = "";
  let ajustadoArea = false;
  let originalRisco = "";
  const riscoValues = { A: 1, "B-1": 2, "B-2": 3, "C-1": 4, "C-2": 5 };

  const verificarCnae = (cnaeStr) => {
    const code = extrairCodigoCnae(cnaeStr);
    if (!code) return;

    for (const grupo of NT02_TABELA2) {
      for (const nivel of grupo.niveis) {
        for (const exemplo of nivel.exemplos) {
          if (exemplo.cnaes && exemplo.cnaes.includes(code)) {
            let finalRisco = nivel.risco;
            let finalOcupacao = exemplo.ocupacao;

            // If an occupation is selected, only consider matching examples for that occupation
            if (form.value.ocupacao && finalOcupacao !== form.value.ocupacao) {
              continue;
            }

            let isAdjusted = false;
            const areaVal = parseFloat(form.value.area) || 0;

            if (grupo.grupo === "Comerciais") {
              if (areaVal > 0) {
                if (areaVal <= 750) {
                  finalRisco = "A";
                  finalOcupacao = "06";
                } else if (areaVal > 750 && areaVal <= 1000) {
                  finalRisco = "B-1";
                  finalOcupacao = "07";
                } else {
                  finalRisco = "B-2";
                  finalOcupacao = "08";
                }
                if (finalRisco !== nivel.risco) {
                  isAdjusted = true;
                }
              }
            } else if (grupo.grupo === "Escolares") {
              if (areaVal > 0 && exemplo.termo !== "Escolas para portadores de necessidades especiais") {
                if (areaVal <= 200) {
                  finalRisco = "A";
                } else {
                  finalRisco = "B-1";
                }
                if (finalRisco !== nivel.risco) {
                  isAdjusted = true;
                }
              }
            }

            const currentVal = riscoValues[finalRisco] || 0;
            if (currentVal > highestRiscoVal) {
              highestRiscoVal = currentVal;
              highestRisco = finalRisco;
              matchedTermo = exemplo.termo;
              matchedCnae = cnaeStr;
              matchedGrupo = grupo.grupo;
              matchedOcupacao = finalOcupacao;
              ajustadoArea = isAdjusted;
              originalRisco = nivel.risco;
            }
          }
        }
      }
    }
  };

  if (form.value.cnaePrincipal) {
    verificarCnae(form.value.cnaePrincipal);
  }
  if (form.value.cnaeSecundarios && form.value.cnaeSecundarios.length > 0) {
    form.value.cnaeSecundarios.forEach((sec) => verificarCnae(sec));
  }

  // Fallback 1: if a specific term is written/selected, try to resolve by term first
  if (form.value.termo && !highestRisco) {
    const termLower = form.value.termo.toLowerCase().trim();
    for (const grupo of NT02_TABELA2) {
      for (const nivel of grupo.niveis) {
        for (const exemplo of nivel.exemplos) {
          if (exemplo.termo.toLowerCase().trim() === termLower) {
            // Verify it matches current occupation if selected
            if (!form.value.ocupacao || exemplo.ocupacao === form.value.ocupacao) {
              let finalRisco = nivel.risco;
              let finalOcupacao = exemplo.ocupacao;
              let isAdjusted = false;
              const areaVal = parseFloat(form.value.area) || 0;

              if (grupo.grupo === "Comerciais") {
                if (areaVal > 0) {
                  if (areaVal <= 750) {
                    finalRisco = "A";
                    finalOcupacao = "06";
                  } else if (areaVal > 750 && areaVal <= 1000) {
                    finalRisco = "B-1";
                    finalOcupacao = "07";
                  } else {
                    finalRisco = "B-2";
                    finalOcupacao = "08";
                  }
                  if (finalRisco !== nivel.risco) {
                    isAdjusted = true;
                  }
                }
              } else if (grupo.grupo === "Escolares") {
                if (areaVal > 0 && exemplo.termo !== "Escolas para portadores de necessidades especiais") {
                  if (areaVal <= 200) {
                    finalRisco = "A";
                  } else {
                    finalRisco = "B-1";
                  }
                  if (finalRisco !== nivel.risco) {
                    isAdjusted = true;
                  }
                }
              }

              const currentVal = riscoValues[finalRisco] || 0;
              if (currentVal > highestRiscoVal) {
                highestRiscoVal = currentVal;
                highestRisco = finalRisco;
                matchedTermo = exemplo.termo;
                matchedCnae = "";
                matchedGrupo = grupo.grupo;
                matchedOcupacao = finalOcupacao;
                ajustadoArea = isAdjusted;
                originalRisco = nivel.risco;
              }
            }
          }
        }
      }
    }
  }

  // Fallback 2: if occupation is selected but no direct CNAE mapping exists for it,
  // resolve the risk level of that occupation in NT02_TABELA2
  if (form.value.ocupacao && !highestRisco) {
    for (const grupo of NT02_TABELA2) {
      for (const nivel of grupo.niveis) {
        for (const exemplo of nivel.exemplos) {
          if (exemplo.ocupacao === form.value.ocupacao) {
            const currentVal = riscoValues[nivel.risco] || 0;
            if (currentVal > highestRiscoVal) {
              highestRiscoVal = currentVal;
              highestRisco = nivel.risco;
              matchedTermo = exemplo.termo;
              matchedCnae = "";
              matchedGrupo = grupo.grupo;
              matchedOcupacao = exemplo.ocupacao;
              ajustadoArea = false;
              originalRisco = nivel.risco;
            }
          }
        }
      }
    }
  }

  if (highestRisco) {
    form.value.grauRisco = highestRisco;

    if (matchedOcupacao) {
      form.value.ocupacao = matchedOcupacao;
    }

    motivoRisco.value = {
      termo: matchedTermo,
      cnae: matchedCnae,
      grupo: matchedGrupo,
      risco: highestRisco,
      ajustadoArea,
      areaVal: form.value.area,
      originalRisco,
    };

    if (!silencioso) {
      showToast(`Grau de Risco recalculado: ${highestRisco}`, "info");
    }
  } else {
    motivoRisco.value = null;
  }
};

watch(
  () => form.value.area,
  (newArea) => {
    if (form.value.cnaePrincipal || (form.value.cnaeSecundarios && form.value.cnaeSecundarios.length > 0)) {
      determinarGrauRisco(true);
    }
  },
);

watch(
  () => form.value.termo,
  (newTermo) => {
    if (!newTermo) return;
    const termLower = newTermo.toLowerCase().trim();
    for (const grupo of NT02_TABELA2) {
      for (const nivel of grupo.niveis) {
        for (const exemplo of nivel.exemplos) {
          if (exemplo.termo.toLowerCase().trim() === termLower) {
            if (form.value.ocupacao !== exemplo.ocupacao) {
              form.value.ocupacao = exemplo.ocupacao;
              determinarGrauRisco(true);
              verificarMudancaExigencias(true);
            }
            return;
          }
        }
      }
    }
  },
);

// Autocomplete logic for Termo (Tabela 2)
const todosTermos = computed(() => {
  const list = [];
  for (const grupo of NT02_TABELA2) {
    for (const nivel of grupo.niveis) {
      for (const exemplo of nivel.exemplos) {
        list.push({
          termo: exemplo.termo,
          ocupacao: exemplo.ocupacao,
          risco: nivel.risco,
          grupo: grupo.grupo,
        });
      }
    }
  }
  return list;
});

const showTermoSugestoes = ref(false);

const filtradasTermoSugestoes = computed(() => {
  const query = (form.value.termo || "").toLowerCase().trim();
  if (!query) {
    return todosTermos.value.slice(0, 15);
  }
  return todosTermos.value.filter((item) => item.termo.toLowerCase().includes(query)).slice(0, 15);
});

const hideTermoSugestoes = () => {
  setTimeout(() => {
    showTermoSugestoes.value = false;
  }, 200);
};

const selecionarTermo = (sug) => {
  form.value.termo = sug.termo;
  form.value.ocupacao = sug.ocupacao;
  determinarGrauRisco(false);
  verificarMudancaExigencias();
};

// Auto populate suggestions setup
const getFiltradasSugestoes = (catCode) => {
  const allSugestoes = DADOS_SISTEMA.exigencias[catCode] || [];
  const searchInput = (searchExigencias.value[catCode] || "").toLowerCase();

  const alreadyAddedTexts = (exigenciasAtivas.value[catCode] || []).map((item) => item.text);

  return allSugestoes.filter((sug) => {
    // Normalise text for comparison without the code prefix
    const textWithoutCode = sug.replace(/^(\d{2}\.\d{3}\s*-\s*)/, "");
    const isAdded = alreadyAddedTexts.includes(textWithoutCode);
    if (isAdded) return false;
    return !searchInput || sug.toLowerCase().includes(searchInput);
  });
};

const hideSugestoes = (catCode) => {
  setTimeout(() => {
    showSugestoes.value[catCode] = false;
  }, 200);
};

// Auto check for Sprinklers (009) criteria
const isSpkRequired = computed(() => {
  const oc = parseInt(form.value.ocupacao, 10) || 0;
  const a = parseNumber(form.value.area);
  const h = parseNumber(form.value.alturaAscendente);

  return (
    ([2].includes(oc) && h > 60) ||
    ([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 19, 20, 21, 25, 26, 27, 28, 29, 32, 38].includes(oc) &&
      (h > 12 || a > 5000)) ||
    ([30, 31].includes(oc) && (h > 3 || a > 3000)) ||
    ([17].includes(oc) && (h > 6 || a > 3000)) ||
    ([22].includes(oc) && a > 500) ||
    ([23].includes(oc) && (h > 3 || a > 500)) ||
    ([33, 37].includes(oc) && (h > 15 || a > 7000)) ||
    ([34].includes(oc) && (h > 15 || a > 5000)) ||
    ([35, 39].includes(oc) && (h > 12 || a > 3000)) ||
    ([36].includes(oc) && (h > 15 || a > 10000))
  );
});

// Dynamic evaluation of default categories to auto select
const getCalculatedCategories = () => {
  const cat = ["002", "003", "004", "005", "008"];
  const oc = parseInt(form.value.ocupacao, 10) || 0;
  const areaVal = parseNumber(form.value.area);
  const altVal = parseNumber(form.value.alturaAscendente);

  if (oc > 0) {
    let selectDoc = true;
    if ([3, 4, 5, 18, 19, 20, 21, 24, 29, 32, 33, 34, 35, 37, 38, 39].includes(oc) && areaVal <= 750 && altVal <= 9)
      selectDoc = false;
    if ([25].includes(oc) && areaVal <= 750 && altVal <= 6) selectDoc = false;
    if ([26, 27, 28].includes(oc) && areaVal <= 1200 && altVal <= 3) selectDoc = false;
    if ([2, 6, 7, 8, 9, 10, 11, 12, 15, 36].includes(oc) && areaVal <= 1200 && altVal <= 9) selectDoc = false;
    if ([13, 14, 15, 16, 17].includes(oc) && areaVal <= 1200 && altVal <= 6) selectDoc = false;

    if (selectDoc) cat.unshift("001");

    // Dynamic rules check for systems
    const popVal = parseInt(form.value.populacaoFixa, 10) || 0;
    const riscoVal = form.value.grauRisco || "";
    for (const [codeExigencia, regras] of Object.entries(regrasInclusao)) {
      const match = regras.some((r) => r.grupos.includes(oc) && r.check(altVal, areaVal, popVal, riscoVal));
      if (match && !cat.includes(codeExigencia)) {
        cat.push(codeExigencia);
      }
    }
  }
  return cat;
};

// Watch changes to recalculate active exigency categories
// Recalculate and update active exigency categories
const verificarMudancaExigencias = (silencioso = false) => {
  if (form.value.tipo === "Eventual") return;
  const computedCats = getCalculatedCategories();

  // Add new categories
  computedCats.forEach((code) => {
    if (!activeCategoryCodes.value.includes(code)) {
      activeCategoryCodes.value.push(code);
      if (!exigenciasAtivas.value[code]) {
        exigenciasAtivas.value[code] = [];
      }
    }
  });

  // Remove categories that are no longer required
  const dynamicKeys = ["001", ...Object.keys(regrasInclusao)];
  dynamicKeys.forEach((code) => {
    if (!computedCats.includes(code)) {
      const index = activeCategoryCodes.value.indexOf(code);
      if (index > -1) {
        const hasActiveItems = exigenciasAtivas.value[code] && exigenciasAtivas.value[code].length > 0;
        if (hasActiveItems && !silencioso) {
          removerCategoria(code);
        } else {
          activeCategoryCodes.value.splice(index, 1);
          delete exigenciasAtivas.value[code];
        }
      }
    }
  });
};

// Methods for category manipulation
const adicionarCategoriaNova = (e) => {
  const code = e.target.value;
  if (code && !activeCategoryCodes.value.includes(code)) {
    activeCategoryCodes.value.push(code);
    if (!exigenciasAtivas.value[code]) {
      exigenciasAtivas.value[code] = [];
    }
  }
  e.target.value = "";
};

const removerCategoria = (code) => {
  if (confirm(`Deseja realmente remover a categoria ${categoriasMap[code]} e todas as suas exigências?`)) {
    activeCategoryCodes.value = activeCategoryCodes.value.filter((c) => c !== code);
    delete exigenciasAtivas.value[code];
  }
};

const adicionarExigencia = (catCode, text) => {
  const matchCode = text.match(/^(\d{2}\.\d{3})/);
  const code = matchCode ? matchCode[1] : "";
  const cleanText = text.replace(/^(\d{2}\.\d{3}\s*-\s*)/, "");

  if (!exigenciasAtivas.value[catCode]) {
    exigenciasAtivas.value[catCode] = [];
  }
  exigenciasAtivas.value[catCode].push({
    code,
    text: cleanText,
    cumprido: false,
    anotacao: "",
    isCustom: false,
  });
  searchExigencias.value[catCode] = "";
  showToast("Exigência adicionada!", "success");
};

const adicionarCustomExigencia = (catCode) => {
  const text = searchExigencias.value[catCode];
  if (!text) return;

  if (!exigenciasAtivas.value[catCode]) {
    exigenciasAtivas.value[catCode] = [];
  }
  exigenciasAtivas.value[catCode].push({
    code: "EXT",
    text: text,
    cumprido: false,
    anotacao: "",
    isCustom: true,
  });
  searchExigencias.value[catCode] = "";
  showToast("Exigência manual adicionada!", "success");
};

const removerExigenciaItem = (catCode, idx) => {
  const item = exigenciasAtivas.value[catCode][idx];
  if (confirm(`Deseja realmente remover a exigência "${item.code} - ${item.text}"?`)) {
    exigenciasAtivas.value[catCode].splice(idx, 1);
  }
};

// Mask Inputs Logic
const handleProcessoInput = (e) => {
  let rawValue = e.target.value;
  if (rawValue.length === 0) {
    form.value.processoBusca = "";
    return;
  }
  const forceNumeric = form.value.tipo === "Eventual";
  const firstChar = rawValue.charAt(0);
  const isNumber = /\d/.test(firstChar);

  if (isNumber || forceNumeric) {
    let value = rawValue.replace(/\D/g, "");
    let formattedValue = "";
    if (value.length > 0) formattedValue += value.substring(0, 5);
    if (value.length > 5) formattedValue += "-" + value.substring(5, 13);
    if (value.length > 13) formattedValue += "/" + value.substring(13, 17);
    if (value.length > 17) formattedValue += "-" + value.substring(17, 19);
    form.value.processoBusca = formattedValue;
  } else {
    const matchLetters = rawValue.match(/^[a-zA-Z]+/);
    const letterPart = matchLetters ? matchLetters[0].substring(0, 3).toUpperCase() : "";
    const digitPart = rawValue.substring(letterPart.length).replace(/\D/g, "").substring(0, 10);
    form.value.processoBusca = letterPart + digitPart;
  }
};

const limparCamposVinculadosCnpj = () => {
  form.value.instituicao = "";
  form.value.cnaePrincipal = "";
  form.value.cnaeSecundarios = [];
  form.value.endereco = "";
  form.value.localizacao = "";
  form.value.termo = "";
  form.value.ocupacao = "";
  form.value.grauRisco = "";
  verificarMudancaExigencias(true);
};

const handleCnpjInput = (e) => {
  let v = e.target.value.replace(/\D/g, "");
  if (v.length > 14) v = v.substring(0, 14);

  v = v.replace(/^(\d{2})(\d)/, "$1.$2");
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1-$2");
  form.value.cnpj = v;
};

const handleCpfInput = (e) => {
  let v = e.target.value.replace(/\D/g, "");
  if (v.length > 11) v = v.substring(0, 11);
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  form.value.ev_cpf = v;
};

const handlePhoneInput = (e, field) => {
  let v = e.target.value.replace(/\D/g, "");
  if (v.length > 11) v = v.substring(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  if (v.length > 10) {
    v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
  } else {
    v = v.replace(/(\d{4})(\d{0,4})$/, "$1-$2");
  }
  form.value[field] = v;
};

const handleViaturaInput = (e) => {
  let clean = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.length > 7) clean = clean.substring(0, 7);
  let firstDigitIdx = clean.search(/\d/);
  if (firstDigitIdx !== -1) {
    form.value.ev_viatura = clean.slice(0, firstDigitIdx) + " " + clean.slice(firstDigitIdx);
  } else {
    form.value.ev_viatura = clean;
  }
};

const consultarNominatim = async (queryText) => {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: queryText,
        format: "json",
        limit: 1,
      },
    });
    if (res.data && res.data.length > 0) {
      const item = res.data[0];
      return {
        lat: parseFloat(item.lat).toFixed(6),
        lon: parseFloat(item.lon).toFixed(6),
      };
    }
  } catch (err) {
    console.error("Erro na consulta ao Nominatim:", err);
  }
  return null;
};

const buscarGpsPorEndereco = async (nomeFantasia, razaoSocial, logradouroCompleto, bairro, cidade) => {
  showToast("Buscando coordenadas...", "info");
  let cleanNome = (nomeFantasia || "").trim();
  if (cleanNome.includes(" / ")) {
    cleanNome = cleanNome.split(" / ")[0].trim();
  }
  let cleanRazao = (razaoSocial || "").trim();
  if (cleanRazao.includes(" / ")) {
    cleanRazao = cleanRazao.split(" / ")[0].trim();
  }
  const cleanCidade = (cidade || "").trim();
  const cleanBairro = (bairro || "").trim();

  let cleanLogradouro = (logradouroCompleto || "").trim();
  // Strip block/lot/sala information from query for better geocoding resolution
  const regexExtra = /\s+(bloco|blo|bl|lote|lt|loja|lj|sala|sl|apto|ap|casa|cs|condominio|cond)\b.*/i;
  cleanLogradouro = cleanLogradouro.replace(regexExtra, "").trim();

  // Try 1: razao_social + cidade
  if (cleanRazao && cleanCidade) {
    const q1 = `${cleanRazao}, ${cleanCidade}`;
    const coords = await consultarNominatim(q1);
    if (coords) {
      form.value.localizacao = `${coords.lat}, ${coords.lon}`;
      metodoGps.value = "Obtido pelo Nome Fantasia";
      showToast("Coordenadas obtidas pela Razão Social!", "success");
      return;
    }
  }

  // Try 2: nome_fantasia + cidade
  if (cleanNome && cleanCidade) {
    const q2 = `${cleanNome}, ${cleanCidade}`;
    const coords = await consultarNominatim(q2);
    if (coords) {
      form.value.localizacao = `${coords.lat}, ${coords.lon}`;
      metodoGps.value = "Obtido pelo Nome Fantasia";
      showToast("Coordenadas obtidas pelo Nome Fantasia!", "success");
      return;
    }
  }

  // Try 3: logradouro + bairro + cidade
  if (cleanLogradouro && cleanCidade) {
    const q3 = [cleanLogradouro, cleanBairro, cleanCidade].filter(Boolean).join(", ");
    const coords = await consultarNominatim(q3);
    if (coords) {
      form.value.localizacao = `${coords.lat}, ${coords.lon}`;
      metodoGps.value = "Obtido pelo Endereço";
      showToast("Coordenadas obtidas pelo Endereço!", "success");
      return;
    }
  }

  metodoGps.value = "Clique para obter a geolocalização atual";
  showToast("Não foi possível encontrar as coordenadas automaticamente.", "warning");
};

// Busca de Dados do Processo RLE (Redesim / SCIP CBMDF)
const isBuscandoRle = ref(false);
let ultimoProcessoBuscadoRle = "";

const buscarDadosRle = async () => {
  if (form.value.tipo !== "RLE") return;
  const processoNum = (form.value.processoBusca || "").trim();
  if (!processoNum) return;

  if (isBuscandoRle.value || ultimoProcessoBuscadoRle === processoNum) return;

  isBuscandoRle.value = true;
  showToast("Processando...", "info", 0);

  try {
    let res;
    try {
      res = await axios.get(
        `/scipweb/backend-scip/divis/vistoria/protocolo/${encodeURIComponent(processoNum)}`
      );
    } catch (proxyErr) {
      res = await axios.get(
        `https://sistemas.cbm.df.gov.br/scipweb/backend-scip/divis/vistoria/protocolo/${encodeURIComponent(processoNum)}`
      );
    }

    if (res.data && res.data.divis_vistoria_rle) {
      ultimoProcessoBuscadoRle = processoNum;
      const rle = res.data.divis_vistoria_rle;
      const redesim = rle.json_response_redesim?.registrosRedesim?.registroRedesim?.[0]?.dadosRedesim;

      // 1. Número do Processo (form.processoBusca)
      if (rle.num_protocolo_redesim) {
        form.value.processoBusca = rle.num_protocolo_redesim;
      }

      // 2. CNPJ da Empresa (form.cnpj)
      if (redesim && redesim.cnpj) {
        const cnpjLimpo = redesim.cnpj.replace(/\D/g, "");
        if (cnpjLimpo.length === 14) {
          form.value.cnpj = `${cnpjLimpo.substring(0, 2)}.${cnpjLimpo.substring(2, 5)}.${cnpjLimpo.substring(5, 8)}/${cnpjLimpo.substring(8, 12)}-${cnpjLimpo.substring(12)}`;
        } else {
          form.value.cnpj = redesim.cnpj;
        }
      }

      // 3. Nome Fantasia / Razão Social (form.instituicao)
      if (redesim) {
        const nomeFantasia = (redesim.nomeFantasia || "").trim();
        const nomeEmpresarial = (redesim.nomeEmpresarial || "").trim();
        let nomeCompleto = "";
        if (nomeFantasia && nomeEmpresarial) {
          nomeCompleto = `${nomeFantasia} / ${nomeEmpresarial}`;
        } else {
          nomeCompleto = nomeFantasia || nomeEmpresarial;
        }
        if (nomeCompleto) {
          form.value.instituicao = nomeCompleto.toUpperCase();
        }
      }

      // 4. Endereço Completo (form.endereco)
      if (redesim && redesim.endereco) {
        const end = redesim.endereco;
        const tipoLogradouro = (end.codTipoLogradouro || "").trim();
        const logradouro = (end.logradouro || "").trim();
        const numLogradouro = (end.numLogradouro || "").trim();
        const complemento = (end.complemento || "").trim();
        const bairro = (end.bairro || "").trim();
        const cidade = (end.cidade || redesim.regiaoAdministrativa?.nome || "BRASÍLIA").trim();
        const uf = (end.uf || "DF").trim();

        let cepDigits = (end.cep || "").replace(/\D/g, "");
        let cepFormatado =
          cepDigits.length === 8
            ? `${cepDigits.substring(0, 2)}.${cepDigits.substring(2, 5)}-${cepDigits.substring(5)}`
            : cepDigits;

        const logrCompleto = `${tipoLogradouro} ${logradouro}`.trim();
        const partesLogr = [];
        if (logrCompleto) partesLogr.push(logrCompleto);
        if (numLogradouro) partesLogr.push(numLogradouro);
        if (complemento) partesLogr.push(complemento);

        let enderecoStr = partesLogr.join(", ");
        if (bairro) enderecoStr += `. ${bairro}`;
        if (cidade || uf) enderecoStr += `, ${cidade}/${uf}`;
        if (cepFormatado) enderecoStr += `. CEP: ${cepFormatado}`;

        const pontoRef = (rle.dsc_ponto_referencia || "").trim();
        if (pontoRef) {
          enderecoStr += `. PONTO DE REFERÊNCIA: ${pontoRef}`;
        }

        form.value.endereco = enderecoStr.toUpperCase();
      }

      // 5. Coordenadas GPS (form.localizacao)
      if (rle.vlr_latitude && rle.vlr_longitude) {
        form.value.localizacao = `${rle.vlr_latitude}, ${rle.vlr_longitude}`;
        metodoGps.value = "Obtido do RLE";
      }

      // 6. Responsável Legal (form.responsavel, responsavelFuncao, responsavelTelefone, responsavelEmail)
      if (rle.nom_solicitante) {
        form.value.responsavel = rle.nom_solicitante.toUpperCase();
      }
      if (rle.dsc_funcao_responsavel) {
        form.value.responsavelFuncao = rle.dsc_funcao_responsavel.toUpperCase();
      }
      if (rle.num_telefone1_solicitante) {
        form.value.responsavelTelefone = rle.num_telefone1_solicitante;
      }
      if (rle.dsc_email_solicitante) {
        form.value.responsavelEmail = rle.dsc_email_solicitante;
      }

      // 7. Dados do Acompanhante (form.acompanhante)
      if (rle.nom_responsavel) {
        let acompText = rle.nom_responsavel.toUpperCase();
        if (rle.num_telefone_responsavel) {
          acompText += ` - TEL: ${rle.num_telefone_responsavel}`;
        }
        form.value.acompanhante = acompText;
      }

      // 8. Área (m²) (form.area)
      const areaUtilizada = res.data.num_area_total_utilizada ?? rle.num_area_total_utilizada;
      if (areaUtilizada !== undefined && areaUtilizada !== null && areaUtilizada !== "") {
        form.value.area = areaUtilizada;
      }

      showToast("Dados do processo RLE importados com sucesso!", "success");

      // Chamar buscarCNPJ() para enriquecimento automático de CNAEs e Tabela 2 da NT 02
      if (form.value.cnpj) {
        buscarCnpj();
      }
    } else {
      showToast("Dados do processo RLE não encontrados.", "warning");
    }
  } catch (err) {
    console.error("Erro ao buscar processo RLE:", err);
    showToast("Não foi possível encontrar os dados do processo RLE.", "warning");
  } finally {
    isBuscandoRle.value = false;
  }
};

const handleTipoChange = () => {
  if (form.value.tipo === "RLE" && form.value.processoBusca) {
    buscarDadosRle();
  }
};

const handleTipoBlur = () => {
  if (form.value.tipo === "RLE" && form.value.processoBusca) {
    buscarDadosRle();
  }
};

const handleProcessoBlur = () => {
  if (form.value.tipo === "RLE" && form.value.processoBusca) {
    buscarDadosRle();
  }
};

// CNPJ Public Lookup API
const buscarCnpj = async () => {
  const rawCnpj = form.value.cnpj.replace(/\D/g, "");
  if (rawCnpj.length !== 14) {
    limparCamposVinculadosCnpj();
    return;
  }

  isCnpjDisabled.value = true;
  showToast("Buscando dados do CNPJ...", "info");
  try {
    const res = await axios.get(`https://publica.cnpj.ws/cnpj/${rawCnpj}`);
    if (res.data) {
      const estab = res.data.estabelecimento;
      const nomeFantasia = (estab.nome_fantasia || "").trim();
      const razaoSocial = (res.data.razao_social || "").trim();
      let nomeCompleto = "";
      if (nomeFantasia && razaoSocial) {
        nomeCompleto = `${nomeFantasia} / ${razaoSocial}`;
      } else {
        nomeCompleto = nomeFantasia || razaoSocial || "";
      }
      form.value.instituicao = nomeCompleto.toUpperCase();

      if (estab.atividade_principal) {
        const cnaePriObj = estab.atividade_principal;
        form.value.cnaePrincipal = `${cnaePriObj.subclasse || ""} - ${cnaePriObj.descricao || ""}`.trim().toUpperCase();
      } else {
        form.value.cnaePrincipal = "";
      }

      if (estab.atividades_secundarias && Array.isArray(estab.atividades_secundarias)) {
        form.value.cnaeSecundarios = estab.atividades_secundarias.map((sec) =>
          `${sec.subclasse || ""} - ${sec.descricao || ""}`.trim().toUpperCase(),
        );
      } else {
        form.value.cnaeSecundarios = [];
      }

      determinarGrauRisco();

      // Look up the term in NT02_TABELA2 and fill the form.value.termo field
      let foundTermo = "";
      const codePri = extrairCodigoCnae(form.value.cnaePrincipal);
      if (codePri) {
        for (const grupo of NT02_TABELA2) {
          for (const nivel of grupo.niveis) {
            for (const exemplo of nivel.exemplos) {
              if (exemplo.cnaes && exemplo.cnaes.includes(codePri)) {
                if (!form.value.ocupacao || exemplo.ocupacao === form.value.ocupacao) {
                  foundTermo = exemplo.termo;
                  break;
                }
              }
            }
            if (foundTermo) break;
          }
          if (foundTermo) break;
        }
      }

      if (!foundTermo && form.value.cnaeSecundarios && form.value.cnaeSecundarios.length > 0) {
        for (const secCnae of form.value.cnaeSecundarios) {
          const codeSec = extrairCodigoCnae(secCnae);
          if (!codeSec) continue;
          for (const grupo of NT02_TABELA2) {
            for (const nivel of grupo.niveis) {
              for (const exemplo of nivel.exemplos) {
                if (exemplo.cnaes && exemplo.cnaes.includes(codeSec)) {
                  if (!form.value.ocupacao || exemplo.ocupacao === form.value.ocupacao) {
                    foundTermo = exemplo.termo;
                    break;
                  }
                }
              }
              if (foundTermo) break;
            }
            if (foundTermo) break;
          }
          if (foundTermo) break;
        }
      }

      if (!foundTermo && form.value.ocupacao) {
        for (const grupo of NT02_TABELA2) {
          for (const nivel of grupo.niveis) {
            for (const exemplo of nivel.exemplos) {
              if (exemplo.ocupacao === form.value.ocupacao) {
                foundTermo = exemplo.termo;
                break;
              }
            }
            if (foundTermo) break;
          }
          if (foundTermo) break;
        }
      }

      if (foundTermo) {
        form.value.termo = foundTermo;
      }

      const cepCnpj = (estab.cep || "").replace(/\D/g, "");
      const numero = estab.numero || "";
      const complemento = estab.complemento || "";

      let tipoLogradouro = "";
      let logradouro = "";
      let bairro = "";
      let cidade = "";
      let uf = "";
      let cepFinal = cepCnpj;

      if (cepCnpj) {
        showToast("Buscando endereço pelo CEP...", "info");
        try {
          const cepRes = await axios.get(`https://viacep.com.br/ws/${cepCnpj}/json/`);
          if (cepRes.data && !cepRes.data.erro) {
            const fullLogradouro = cepRes.data.logradouro || "";
            const spaceIdx = fullLogradouro.indexOf(" ");
            if (spaceIdx > 0) {
              tipoLogradouro = fullLogradouro.substring(0, spaceIdx);
              logradouro = fullLogradouro.substring(spaceIdx + 1);
            } else {
              logradouro = fullLogradouro;
            }
            bairro = cepRes.data.bairro || "";
            cidade = cepRes.data.localidade || "";
            uf = cepRes.data.uf || "";
            cepFinal = cepRes.data.cep || cepCnpj;
          } else {
            // fallback
            tipoLogradouro = estab.tipo_logradouro || "";
            logradouro = estab.logradouro || "";
            bairro = estab.bairro || "";
            cidade = estab.cidade?.nome || "";
            uf = estab.estado?.sigla || "";
          }
        } catch (cepErr) {
          console.error("Erro ao buscar CEP:", cepErr);
          // fallback
          tipoLogradouro = estab.tipo_logradouro || "";
          logradouro = estab.logradouro || "";
          bairro = estab.bairro || "";
          cidade = estab.cidade?.nome || "";
          uf = estab.estado?.sigla || "";
        }
      } else {
        // fallback if no CEP in CNPJ
        tipoLogradouro = estab.tipo_logradouro || "";
        logradouro = estab.logradouro || "";
        bairro = estab.bairro || "";
        cidade = estab.cidade?.nome || "";
        uf = estab.estado?.sigla || "";
      }

      // Format CEP to standard XX.XXX-XXX
      const cleanCepDigits = cepFinal.replace(/\D/g, "");
      const cepFormatado =
        cleanCepDigits.length === 8
          ? `${cleanCepDigits.substring(0, 2)}.${cleanCepDigits.substring(2, 5)}-${cleanCepDigits.substring(5)}`
          : cleanCepDigits;

      // Construct address list
      const partes = [];
      const logrCompleto = `${tipoLogradouro} ${logradouro}`.trim();
      if (logrCompleto) partes.push(logrCompleto);
      if (numero) partes.push(numero);
      if (complemento) partes.push(complemento);
      if (bairro) partes.push(bairro);

      const enderecoMontado = partes.join(", ");
      form.value.endereco = `${enderecoMontado}. ${cidade}/${uf}. CEP: ${cepFormatado}`.toUpperCase();

      showToast("Dados do CNPJ preenchidos!", "success");

      // Buscar coordenadas GPS no mesmo momento
      buscarGpsPorEndereco(estab.nome_fantasia, res.data.razao_social, logrCompleto, bairro, cidade);
    }
  } catch (error) {
    console.error(error);
    showToast("Erro ao buscar CNPJ. Preencha manualmente.", "warning");
    limparCamposVinculadosCnpj();
  }
};

// GPS Fetch
const obterGps = () => {
  if (!navigator.geolocation) {
    showToast("Seu navegador não suporta geolocalização.", "danger");
    return;
  }
  showToast("Obtendo localização...", "info");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      form.value.localizacao = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
      metodoGps.value = "Obtido pelo GPS do dispositivo";
      showToast("Localização obtida com sucesso!", "success");
    },
    (err) => {
      console.error(err);
      showToast("Falha ao obter localização.", "danger");
    },
    { timeout: 10000 },
  );
};

const obterGpsEventual = () => {
  if (!navigator.geolocation) {
    showToast("Seu navegador não suporta geolocalização.", "danger");
    return;
  }
  showToast("Obtendo localização...", "info");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      form.value.ev_geo = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      showToast("Localização obtida com sucesso!", "success");
    },
    (err) => {
      console.error(err);
      showToast("Falha ao obter localização.", "danger");
    },
    { timeout: 10000 },
  );
};

const onEventualStatusChange = () => {
  if (form.value.ev_status_eventual) {
    form.value.status = form.value.ev_status_eventual;
  }
};

const enviarGoogleFormsEventual = () => {
  if (!form.value.processoBusca) {
    showToast("Por favor, preencha o número do processo.", "warning");
    return;
  }
  salvarRegistro();
  enviarEventualGoogleForms(form.value);
};

// Maps URLs
const googleMapsUrl = computed(() => {
  if (!form.value.localizacao) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(form.value.localizacao)}`;
});

const wazeUrl = computed(() => {
  if (!form.value.localizacao) return "";
  const parts = form.value.localizacao.split(",");
  if (parts.length !== 2) return "";
  return `https://waze.com/ul?ll=${parts[0].trim()},${parts[1].trim()}&navigate=yes`;
});

// Save record
const salvarRegistro = () => {
  const key = `processo-${formId.value}`;

  if (form.value.tipo === "Eventual" && form.value.ev_status_eventual) {
    form.value.status = form.value.ev_status_eventual;
  }

  limparQtdSeIgualAoMinimo();

  // Format saving payload
  const payload = {
    id: formId.value,
    ...form.value,
    activeCategoryCodes: activeCategoryCodes.value,
    exigenciasAtivas: exigenciasAtivas.value,
  };

  localStorage.setItem(key, JSON.stringify(payload));
  showToast("Registro salvo com sucesso!", "success");
};

const cancelar = () => {
  router.push("/processos");
};

const excluirRegistro = () => {
  if (confirm(`Deseja realmente excluir este processo?`)) {
    localStorage.removeItem(`processo-${formId.value}`);
    showToast("Processo excluído!", "success");
    router.push("/processos");
  }
};

const copiarProcesso = () => {
  if (!form.value.processoBusca) return;
  navigator.clipboard
    .writeText(form.value.processoBusca)
    .then(() => showToast("Número do processo copiado!", "success"));
};

const compartilharProcesso = () => {
  limparQtdSeIgualAoMinimo();

  // Construct payload with all current form and checklist data
  const payload = {
    id: formId.value,
    ...form.value,
    activeCategoryCodes: activeCategoryCodes.value,
    exigenciasAtivas: exigenciasAtivas.value,
  };

  try {
    const jsonStr = JSON.stringify(payload);
    // Base64 encode using safe UTF-8 encoding to preserve accents and special characters
    const base64Data = btoa(unescape(encodeURIComponent(jsonStr)));

    // Create sharing link with the data query param positioned after the hash route
    const link = `${window.location.origin}${window.location.pathname}#/processo/${formId.value}?data=${encodeURIComponent(base64Data)}`;

    navigator.clipboard
      .writeText(link)
      .then(() => showToast("Link de compartilhamento copiado com todos os dados!", "success"))
      .catch(() => showToast("Erro ao copiar link.", "danger"));
  } catch (err) {
    console.error("Erro ao gerar link de compartilhamento:", err);
    showToast("Erro ao gerar link de compartilhamento.", "danger");
  }
};

// Populate dropdowns static
const ocupacoes = [
  { value: "01", text: "01 - Residenciais unifamiliares" },
  { value: "02", text: "02 - Residenciais multifamiliares" },
  { value: "03", text: "03 - Habitações coletivas" },
  { value: "04", text: "04 - Hotéis" },
  { value: "05", text: "05 - Hotéis residenciais" },
  { value: "06", text: "06 - Comércio de pequeno porte" },
  { value: "07", text: "07 - Comércio de médio porte" },
  { value: "08", text: "08 - Comércio de grande porte" },
  { value: "09", text: "09 - Escritórios" },
  { value: "10", text: "10 - Agências bancárias" },
  { value: "11", text: "11 - Laboratórios e estúdios" },
  { value: "12", text: "12 - Serviços de reparação" },
  { value: "13", text: "13 - Escolas em geral" },
  { value: "14", text: "14 - Escolas especiais" },
  { value: "15", text: "15 - Locais para cultura física" },
  { value: "16", text: "16 - Pré-escolas" },
  { value: "17", text: "17 - Escolas para deficientes" },
  { value: "18", text: "18 - Museus e bibliotecas" },
  { value: "19", text: "19 - Templos religiosos" },
  { value: "20", text: "20 - Centros esportivos" },
  { value: "21", text: "21 - Terminais de passageiros" },
  { value: "22", text: "22 - Artes cênicas" },
  { value: "23", text: "23 - Clubes sociais" },
  { value: "24", text: "24 - Construções provisórias" },
  { value: "25", text: "25 - Restaurantes" },
  { value: "26", text: "26 - Garagens em geral" },
  { value: "27", text: "27 - Oficinas" },
  { value: "28", text: "28 - Hangares" },
  { value: "29", text: "29 - Hospitais veterinários" },
  { value: "30", text: "30 - Hospitais em geral" },
  { value: "31", text: "31 - Limitações físicas/mentais" },
  { value: "32", text: "32 - Clínicas" },
  { value: "33", text: "33 - Indústrias ≤ 300 MJ/m²" },
  { value: "34", text: "34 - Indústrias > 300 e < 1200 MJ/m²" },
  { value: "35", text: "35 - Indústrias ≥ 1200 MJ/m²" },
  { value: "36", text: "36 - Depósitos incombustíveis" },
  { value: "37", text: "37 - Depósitos ≤ 300 MJ/m²" },
  { value: "38", text: "38 - Depósitos > 300 e < 1200 MJ/m²" },
  { value: "39", text: "39 - Depósitos ≥ 1200 MJ/m²" },
  { value: "40", text: "40 - Inflamáveis e combustíveis" },
  { value: "41", text: "41 - Explosivos" },
  { value: "42", text: "42 - Produtos perigosos" },
  { value: "43", text: "43 - Vegetações" },
  { value: "44", text: "44 - Canteiros de obras" },
  { value: "45", text: "45 - Centros esportivos > 2500 pessoas" },
  { value: "46", text: "46 - Parques de diversões" },
  { value: "47", text: "47 - Central de comunicação/energia" },
  { value: "48", text: "48 - Túneis" },
  { value: "49", text: "49 - Silos" },
  { value: "50", text: "50 - Restrição de liberdade" },
  { value: "51", text: "51 - Destinações variáveis" },
];

const regioesAdministrativas = [
  "RA 1 - Plano Piloto",
  "RA 2 - Gama",
  "RA 3 - Taguatinga",
  "RA 4 - Brazlândia",
  "RA 5 - Sobradinho",
  "RA 6 - Planaltina",
  "RA 7 - Paranoá",
  "RA 8 - Núcleo Bandeirante",
  "RA 9 - Ceilândia",
  "RA 10 - Guará",
  "RA 11 - Cruzeiro",
  "RA 12 - Samambaia",
  "RA 13 - Santa Maria",
  "RA 14 - São Sebastião",
  "RA 15 - Recanto das Emas",
  "RA 16 - Lago Sul",
  "RA 17 - Riacho Fundo",
  "RA 18 - Lago Norte",
  "RA 19 - Candangolândia",
  "RA 20 - Águas Claras",
  "RA 21 - Riacho Fundo II",
  "RA 22 - Sudoeste/Octogonal",
  "RA 23 - Varjão",
  "RA 24 - Park Way",
  "RA 25 - SCIA",
  "RA 26 - Sobradinho II",
  "RA 27 - Jardim Botânico",
  "RA 28 - Itapoã",
  "RA 29 - SIA",
  "RA 30 - Vicente Pires",
  "RA 31 - Fercal",
  "RA 32 - Sol Nascente/Pôr do Sol",
  "RA 33 - Arniqueira",
  "RA 34 - Arapoanga",
  "RA 35 - Água Quente",
];

const empresasBrigada = [
  "5 ESTRELAS SISTEMA DE SEGURANÇA LTDA - EMP-B/072-07",
  "ADFORT SERVIÇOS GERAIS LTDA - EMP-B/503-23",
  "ÁGIL EMPRESA DE VIGILÂNCIA LTDA - EMP-B/768-18",
  "AGIL SERVIÇOS ESPECIAIS LTDA - EMP-B/195-06",
  "AMPLOS PROTEÇÃO CONTRA INCÊNDIO LTDA - EMP-B/636-15",
  "ATIVA BRIGADISTA LTDA - EMP-B/403-09",
  "BRASFORT ADMINISTRAÇÃO E SERVIÇOS LTDA - EMP-B/430-06",
  "BRASFORT EMPRESA DE SEGURANÇA LTDA - EMP-B/648-16",
  "BRASTEC - SERVIÇOS E TREINAMENTOS LTDA - EMP-B/647-16",
];

// Load on mount
onMounted(() => {
  const id = route.params.id;
  const queryData = route.query.data;
  if (id) {
    if (queryData) {
      try {
        const decodedStr = decodeURIComponent(escape(atob(queryData)));
        const importedData = JSON.parse(decodedStr);

        form.value = { ...form.value, ...importedData };
        form.value.checkConcluido = !!importedData.checkConcluido;

        // Map legacy snake_case contact fields
        form.value.populacaoFixa = importedData.populacaoFixa || importedData.populacao_fixa || "";
        form.value.responsavelFuncao = importedData.responsavelFuncao || importedData.responsavel_funcao || "";
        form.value.responsavelTelefone = importedData.responsavelTelefone || importedData.responsavel_telefone || "";
        form.value.responsavelEmail = importedData.responsavelEmail || importedData.responsavel_email || "";

        const normalizeZero = (val) => {
          if (val === 0 || val === "0" || val === "0.00" || val === null || val === undefined) return "";
          return val.toString();
        };

        // Map legacy altura / pavimentos values
        form.value.alturaAscendente =
          normalizeZero(importedData.alturaAscendente) || normalizeZero(importedData.altura) || "";
        form.value.alturaDescendente = normalizeZero(importedData.alturaDescendente) || "";
        form.value.pavimentosSuperiores =
          normalizeZero(importedData.pavimentosSuperiores) || normalizeZero(importedData.pavimentos) || "";
        form.value.pavimentosInferiores = normalizeZero(importedData.pavimentosInferiores) || "";

        if (importedData.retorno !== undefined) {
          form.value.retorno = importedData.retorno === true || importedData.retorno === "sim" ? "sim" : "nao";
        }

        if (importedData.activeCategoryCodes) {
          activeCategoryCodes.value = importedData.activeCategoryCodes;
        } else if (importedData.categoriasSelecionadas) {
          activeCategoryCodes.value = importedData.categoriasSelecionadas.map((c) => c.padStart(3, "0"));
        }

        if (importedData.exigenciasAtivas) {
          exigenciasAtivas.value = importedData.exigenciasAtivas;
        }

        if (!form.value.grauRisco) {
          determinarGrauRisco(true);
        }

        limparQtdSeIgualAoMinimo();

        // Save imported data in LocalStorage under recipient's browser
        const payloadToSave = {
          id: formId.value,
          ...form.value,
          activeCategoryCodes: activeCategoryCodes.value,
          exigenciasAtivas: exigenciasAtivas.value,
        };
        localStorage.setItem(`processo-${formId.value}`, JSON.stringify(payloadToSave));

        showToast("Dados do processo importados com sucesso via link!", "success");
      } catch (err) {
        console.error("Erro ao decodificar dados compartilhados:", err);
        showToast("Erro ao carregar dados compartilhados do link.", "danger");
      }
    } else {
      // Normal flow: load from LocalStorage
      const raw = localStorage.getItem(`processo-${id}`);
      if (raw) {
        try {
          const data = JSON.parse(raw);
          form.value = { ...form.value, ...data };
          form.value.checkConcluido = !!data.checkConcluido;

          // Map legacy snake_case contact fields
          form.value.populacaoFixa = data.populacaoFixa || data.populacao_fixa || "";
          form.value.responsavelFuncao = data.responsavelFuncao || data.responsavel_funcao || "";
          form.value.responsavelTelefone = data.responsavelTelefone || data.responsavel_telefone || "";
          form.value.responsavelEmail = data.responsavelEmail || data.responsavel_email || "";

          // Helper to normalize empty/zero structural values to empty string
          const normalizeZero = (val) => {
            if (val === 0 || val === "0" || val === "0.00" || val === null || val === undefined) return "";
            return val.toString();
          };

          // Map legacy altura / pavimentos values
          form.value.alturaAscendente = normalizeZero(data.alturaAscendente) || normalizeZero(data.altura) || "";
          form.value.alturaDescendente = normalizeZero(data.alturaDescendente) || "";
          form.value.pavimentosSuperiores =
            normalizeZero(data.pavimentosSuperiores) || normalizeZero(data.pavimentos) || "";
          form.value.pavimentosInferiores = normalizeZero(data.pavimentosInferiores) || "";

          // Map legacy retorno boolean
          if (data.retorno !== undefined) {
            form.value.retorno = data.retorno === true || data.retorno === "sim" ? "sim" : "nao";
          }

          // Map legacy category selections
          if (data.categoriasSelecionadas) {
            activeCategoryCodes.value = data.categoriasSelecionadas.map((c) => c.padStart(3, "0"));
          } else if (data.activeCategoryCodes) {
            activeCategoryCodes.value = data.activeCategoryCodes;
          }

          // Map legacy exigencies list & compliance/observations
          if (data.exigencias && Array.isArray(data.exigencias)) {
            const mappedExigencias = {};
            data.exigencias.forEach((exText) => {
              if (!exText) return;
              const parts = exText.split(" - ");
              if (parts.length < 2) return;
              const code = parts[0].trim();
              const text = exText;

              const categoryNumber = code.split(".")[0].trim();
              const catCode = categoryNumber.padStart(3, "0");

              if (!mappedExigencias[catCode]) {
                mappedExigencias[catCode] = [];
              }

              const anotacao = (data.anotacoesDoProcesso && data.anotacoesDoProcesso[code]) || "";
              const cumprida = (data.exigenciasCumpridas && !!data.exigenciasCumpridas[code]) || false;

              mappedExigencias[catCode].push({
                code,
                text,
                anotacao,
                cumprida,
              });
            });
            exigenciasAtivas.value = mappedExigencias;
          } else if (data.exigenciasAtivas) {
            exigenciasAtivas.value = data.exigenciasAtivas;
          }

          if (!form.value.grauRisco) {
            determinarGrauRisco(true);
          }

          limparQtdSeIgualAoMinimo();

          showToast("Processo carregado com sucesso!", "success");
        } catch (e) {
          console.error("Erro ao carregar processo legível:", e);
        }
      }
    }
  }

  // Auto fill team defaults if saved in localStorage
  const teamRaw = localStorage.getItem("equipeVistoria");
  if (teamRaw) {
    try {
      const team = JSON.parse(teamRaw);
      if (!form.value.ev_vistoriador01 && team.vistoriador01) {
        form.value.ev_vistoriador01 = `${team.patente ? team.patente + " " : ""}${team.vistoriador01}${
          team.matricula ? " - Matr. " + team.matricula : ""
        }`;
      }
      if (!form.value.ev_vistoriador02 && team.vistoriador02) {
        form.value.ev_vistoriador02 = `${team.patente02 ? team.patente02 + " " : ""}${team.vistoriador02}${
          team.matricula02 ? " - Matr. " + team.matricula02 : ""
        }`;
      }
      if (!form.value.ev_viatura && team.viatura) {
        form.value.ev_viatura = team.viatura;
      }
      if (!form.value.ev_regime && team.regime) {
        form.value.ev_regime = team.regime;
      }
      if (!form.value.ev_email_usuario && team.email) {
        form.value.ev_email_usuario = team.email;
      }
    } catch (e) {
      console.error("Erro ao carregar equipeVistoria:", e);
    }
  }

  const rawCnpj = (form.value.cnpj || "").replace(/\D/g, "");
  isCnpjDisabled.value = rawCnpj.length === 14;

  verificarMudancaExigencias(true);
  isLoaded.value = true;
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.dropdown-suggestions {
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;
  background-color: var(--autocomplete-bg);
  border: 1px solid var(--autocomplete-border);
  border-radius: 4px;
}
.dropdown-suggestions li:hover {
  background-color: var(--autocomplete-item-hover);
}
.accordion-button::after {
  filter: grayscale(1);
}
.icon-info-cnae {
  color: var(--info-color);
  cursor: pointer;
  font-size: 1.15rem;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}
.icon-info-cnae:hover {
  transform: scale(1.15);
  opacity: 0.85;
}
</style>
