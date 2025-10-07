// Configuração Global
		const CONFIG = {
			AUTO_SAVE_DELAY: 1000,
			GEOLOCATION_TIMEOUT: 10000,
			TOAST_DURATION: 3000
		};

		// Utilitários
		const Utils = {
			// Mostra toast de notificação
			showToast(message, type = 'info') {
				const toastContainer = document.querySelector('.toast-container');
				const toastId = 'toast-' + Date.now();

				const toastHTML = `
					<div class="toast" id="${toastId}" role="alert" aria-live="assertive" aria-atomic="true">
						<div class="toast-header">
							<i class="bi bi-${this.getToastIcon(type)} text-${type} me-2"></i>
							<strong class="me-auto">Sistema</strong>
							<button type="button" class="btn-close" data-bs-dismiss="toast"></button>
						</div>
						<div class="toast-body">${message}</div>
					</div>
				`;

				toastContainer.insertAdjacentHTML('beforeend', toastHTML);
				const toastElement = new bootstrap.Toast(document.getElementById(toastId));
				toastElement.show();

				setTimeout(() => {
					document.getElementById(toastId)?.remove();
				}, CONFIG.TOAST_DURATION + 1000);
			},

			getToastIcon(type) {
				const icons = {
					success: 'check-circle',
					danger: 'exclamation-triangle',
					warning: 'exclamation-triangle',
					info: 'info-circle'
				};
				return icons[type] || 'info-circle';
			},

			// Debounce para evitar múltiplas execuções
			debounce(func, wait) {
				let timeout;
				return function executedFunction(...args) {
					const later = () => {
						clearTimeout(timeout);
						func(...args);
					};
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
				};
			},

			// Formatar classe CSS do status
			formatarClasseStatus(status) {
				return 'status-' + status.toLowerCase()
					.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9\-]/g, '');
			},

			// Validar CPF
			validarCPF(cpf) {
				cpf = cpf.replace(/[^\d]+/g, '');

				if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

				let soma = 0;
				for (let i = 0; i < 9; i++) {
					soma += parseInt(cpf.charAt(i)) * (10 - i);
				}

				let resto = 11 - (soma % 11);
				if (resto === 10 || resto === 11) resto = 0;
				if (resto !== parseInt(cpf.charAt(9))) return false;

				soma = 0;
				for (let i = 0; i < 10; i++) {
					soma += parseInt(cpf.charAt(i)) * (11 - i);
				}

				resto = 11 - (soma % 11);
				if (resto === 10 || resto === 11) resto = 0;
				if (resto !== parseInt(cpf.charAt(10))) return false;

				return true;
			}
		};

		// Dados das exigências
		const DADOS_SISTEMA = {
			categorias: {
				'001': "DOCUMENTAÇÃO",
				'002': "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO",
				'003': "ILUMINAÇÃO DE EMERGÊNCIA",
				'004': "SISTEMA DE PROTEÇÃO POR EXTINTORES DE INCÊNDIO",
				'005': "SAÍDAS DE EMERGÊNCIA",
				'006': "SISTEMA DE PROTEÇÃO POR HIDRANTES",
				'007': "SISTEMA DE PROTEÇÃO CONTRA DESCARGAS ATMOSFÉRICAS (SPDA)",
				'008': "SEGURANÇA CONTRA INCÊNDIO NAS INSTALAÇÕES PREDIAIS PARA CONSUMO DE GLP CANALIZADO E RECIPIENTES P-13",
				'009': "SISTEMAS DE DETECÇÃO E ALARME DE INCÊNDIO",
				'010': "SISTEMA DE CHUVEIROS AUTOMÁTICOS",
				'011': "INSPEÇÃO VISUAL EM INSTALAÇÕES ELÉTRICAS DE BAIXA TENSÃO",
				'012': "PLANO DE PREVENÇÃO CONTRA INCÊNDIO E PÂNICO (PPCI)",
				'013': "BRIGADA DE INCÊNDIO",
				'014': "ACESSO DE VIATURAS DE SOCORRO",
				'015': "POSTOS DE COMBUSTÍVEIS",
				'016': "ÁREA DE ARMAZENAMENTO E/OU COMERCIALIZAÇÃO DE RECIPIENTES DE GLP",
				'017': "SEGURANÇA CONTRA INCÊNDIO EM FOOD TRUCK",
				'018': "COMERCIALIZAÇÃO DE FOGOS DE ARTIFÍCIO"
			},

			exigencias: {
				'001': [
					"01.001 - Apresentar o Projeto de Segurança Contra Incêndio e Pânico (Projeto de Incêndio original) impresso, devidamente aprovado pelo Corpo de Bombeiros Militar do Distrito Federal (CBMDF), de acordo com o Decreto nº 21.361/2000. (Arts. 3º, § 1º e 6º, do Dec. 23.154/2002)",
					"01.002 - Apresentar o Projeto de Segurança Contra Incêndio e Pânico de Modificação (Projeto de Incêndio de Alteração), devidamente aprovado pelo CBMDF, com o redimensionamento das medidas de segurança contra incêndio e pânico, em função da ampliação de área, aumento da altura, mudança de ocupação ou layout, aumento da população ou do risco da edificação, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"01.003 - Apresentar a Anotação de Responsabilidade Técnica (ART), Registro de Responsabilidade Técnica (RRT) ou Termo de Responsabilidade Técnica (TRT), de execução ou manutenção das medidas de segurança contra incêndio e pânico instaladas, emitida por responsável técnico e visada junto ao respectivo órgão de classe do Distrito Federal, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"01.004 - Apresentar o laudo do teste de estanqueidade do sistema de alimentação, distribuição e armazenamento de Gás Liquefeito de Petróleo (GLP) da edificação/estabelecimento, juntamente com documento de responsabilidade técnica de sua realização, visado no seu respectivo órgão de classe, de acordo com a NT 05/2021-PARTE I-CBMDF. O referido laudo poderá possuir validade máxima de 05 anos, podendo variar para menos em função de riscos decorrentes das situações construtivas, das condições ambientais e de uso. No caso de troca da empresa fornecedora de gás, troca de componentes, alteração da rede de alimentação ou constatação de desgastes críticos deve ser realizado teste de estanqueidade, de acordo com os itens 5.23.1 e 5.23.2 da NBR 13523/2019 da ABNT e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"01.005 - Apresentar o laudo de continuidade e aterramento elétrico do Sistema de Proteção contra Descargas Atmosféricas (SPDA) da edificação (estruturas contendo munição ou explosivos, ou em locais expostos à corrosão atmosféricas severa ou ainda estruturas pertencentes a fornecedores de serviços considerados essenciais (energia, água, sinais, etc.), com validade máxima de 01 ano e documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe NBR 5419-3:2015 da ABNT. (Arts. 3º, II, m, e 6º, do Dec. 23.154/2002)",
					"01.006 - Apresentar o laudo de continuidade e aterramento elétrico do Sistema de Proteção contra Descargas Atmosféricas (SPDA) da edificação, com validade máxima de 03 anos e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe NBR 5419-3:2015 da ABNT. (Arts. 3º, II, m, e 6º, do Dec. 23.154/2002)",
					"01.007 - Apresentar o documento de responsabilidade técnica que ateste o emprego de materiais para acabamento e de revestimento para obtenção da classificação de reação ao fogo, de acordo com o Item 5.4.2 da NT 17/2023-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"01.008 - Apresentar o laudo de aplicação superficial de produtos retardantes de chama ou inibidores de fumaça para obtenção da classificação de reação ao fogo requerida pela norma, com tempo de validade dos benefícios obtidos pela sua aplicação declarado pelo fornecedor ou fabricante destes produtos, considerando o material que está sendo protegido e o tipo de aplicação utilizada e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe, de acordo como o Item 5.4.3 da NT 17/2023-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"01.009 - Apresentar a ART - Anotação de Responsabilidade Técnica de execução (instalação) do grupo motogerador, quando exigido em Projeto de Incêndio, visada no respectivo órgão de classe, conforme NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"01.010 - Apresentar Anotação de Responsabilidade Técnica (ART), Registro de Responsabilidade Técnica (RRT) ou Termo de Responsabilidade Técnica (TRT), da instalação elétrica predial, emitida por profissional e visada no seu respectivo órgão de classe, de acordo com a NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"01.011 - Apresentar Atestado de Conformidade das Instalações Elétricas e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe, conforme item 6.3.3 da NT 41-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"01.012 - Apresentar ART – Anotação de Responsabilidade Técnica, RRT - Registro de Responsabilidade Técnica, ou TRT – Termo de Responsabilidade Técnica – visados junto ao seu respectivo órgão de classe, acompanhados com Termo ou Declaração de que os materiais de acabamento e/ou de cenário/tendas, possuem baixa velocidade de propagação de chama, de acordo com a NT 9/9022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"01.013 - O documento de requerimento de solicitação de Licença de Funcionamento/Vistoria a Pedido deve estar disponível, especificando o endereço completo, CNPJ atualizado, razão social, nome fantasia, contato telefônico do proprietário e atividade pretendida.",
					"01.014 - Apresentar Alvará de Construção, Atestado de Habilitação de Regularização ou documento similar de regularização fundiária emitido por órgão competente.",
					"01.015 - Apresentar Parecer de Aprovação do Projeto de Segurança Contra Incêndio e Pânico emitido pelo Corpo de Bombeiros Militar do Distrito Federal.",
					"01.016 - Apresentar Parecer de Aprovação do Projeto de Segurança Contra Incêndio e Alvará de Construção (ou documento similar) com áreas equivalentes.",
					"01.017 - Para acompanhamento da vistoria, deverá estar presente o interessado ou representante por ele indicado, portando o(s) Projeto(s) de Incêndio aprovado(s) e impresso(s) para a conferência dos sistemas de segurança contra incêndio e pânico, bem como as chaves para acesso a todas as dependências da edificação, incluindo as áreas técnicas, áreas de risco e assemelhados.", 
	
				],
				'002': [
					"02.001 - A sinalização de segurança contra incêndio e pânico deve ser instalada em conformidade com a NT  22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.002 - O sistema de sinalização de segurança contra incêndio e pânico deve ser instalado em conformidade  com o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec.  23.154/2002)",
					"02.003 - Apresentar documento de responsabilidade técnica de execução ou manutenção do sistema de  sinalização de segurança contra incêndio e pânico instalado, emitido por profissional responsável de acordo  com o conselho de classe a que pertence, de acordo com o item 5.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.004 - Realizar inspeção periódica e manutenção, desde a simples limpeza até a substituição por outra nova,  da sinalização de emergência, quando suas propriedades físicas e químicas deixarem de produzir o efeito visual  para as quais foram confeccionadas, de acordo com o item 5.7.9 da NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.005 - A sinalização de segurança contra incêndio e pânico deve destacar-se em relação à comunicação visual  adotada para outras finalidades, de acordo com a alínea a do item 5.5 da NT 22/2020-CBMDF.  (Arts. 3º, III, b,  e 6º, do Dec. 23.154/2002)",
					"02.006 - A sinalização de segurança contra incêndio e pânico não pode ser neutralizada pelas cores de paredes  e acabamentos, dificultando a sua visualização, de acordo com a alínea b do item 5.5 da NT 22/2020 CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.007 - A sinalização de segurança contra incêndio e pânico deve ser instalada nos corredores de circulação  de pessoas e veículos, escadas e rampas, assegurando as plenas condições de visualização, de acordo com  a alínea c do item 5.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.008 - A sinalização de proibição deve ser instalada de acordo com a NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.009 - A sinalização de proibição deve ser instalada em local visível próximo ao risco isolado, a uma altura de  1,8 m medida do piso acabado à base da placa, ou distribuída ao longo da área de risco generalizado,  distanciadas entre si em no máximo 15 m, de acordo com o item 6.1.1 da NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.010 - A sinalização de proibição deve possuir forma circular, cor de contraste branca, barra diametral e faixa  circular (cor de segurança) vermelha, cor do símbolo preta, margem (opcional) branca e proporcionalidade  paramétricas, de acordo com a Tabela 1.1 do Anexo 1 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.011 - A sinalização de proibição deve ser instalada próximo aos acionadores dos elevadores, indicando a  proibição de sua utilização em caso de incêndio: “Em caso de incêndio não use o elevador”, de acordo com o  Anexo 2 código 4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.012 - A sinalização de alerta deve ser instalada de acordo com a NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.013 - A sinalização de alerta deve ser instalada em local visível próximo ao risco isolado, a uma altura de 1,8  m medida do piso acabado à base da placa, ou distribuída ao longo da área de risco generalizado, distanciadas  entre si em, no máximo, 15 m, de acordo com o item 6.1.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.014 - A sinalização de alerta deve possuir forma triangular, cor do fundo (cor de contraste) amarela, moldura  preta, cor do símbolo (cor de segurança) preta, margem (opcional) amarela e proporcionalidade paramétricas,  de acordo com a Tabela 1.1 do Anexo 1 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.015 - A sinalização de orientação e salvamento deve ser instalada de acordo com a NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.016 - A sinalização de indicação do sentido de saída sobre uma porta que está na rota de saída horizontal,  mas não é a saída definitiva do pavimento ou da edificação, código 14 da tabela “c” do anexo 2, deve ser  localizada imediatamente acima das mesmas, no máximo a 10 cm da verga, ou na impossibilidade, diretamente  na folha da porta, centralizada a uma altura de 1,8 m medida do piso acabado a base da placa de sinalização,  conforme alínea b do item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.017 - A sinalização de indicação de saída definitiva do pavimento ou da edificação deve ser localizada  imediatamente acima das mesmas, no máximo a 10 cm da verga, ou na impossibilidade, diretamente na folha  da porta centralizada a uma altura de 1,8 m medida do piso acabado a base da placa de sinalização, conforme  a alínea e do item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.018 - A mensagem “SAÍDA” deve estar sempre grafada no idioma português. Caso exista a necessidade de  utilização de outras línguas estrangeiras, devem ser aplicados como textos adicionais, conforme alínea e do  item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.019 - A sinalização de indicação da direção e do sentido da saída em rampa, código 15 da tabela “c” do  anexo 2, deve ser instalada nas paredes e elementos de fixação de rampas e patamares, a uma altura de 1,8 m  medida do piso acabado à base da placa de sinalização, conforme alínea c do item 6.1.3 da NT 22/2020 CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.020 - Por alterar ou modificar o Sistema de Sinalização de Emergência sem submeter previamente o projeto  de incêndio à análise, apresentar para análise e aprovação junto ao CBMDF, o respectivo projeto de alteração.  (Art. 6 letra c do Decreto 23.154/2002) (AIA10)",
					"02.021 - A sinalização de indicação da direção e do sentido da saída em escada, código 16 da tabela “c” do  anexo 2, deve ser instalada nas paredes e elementos de fixação dos lanços e patamares, a uma altura de 1,8 m  medida do piso acabado à base da placa de sinalização, conforme alínea d do item 6.1.3 da NT 22/2020 CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.022 - Instalar a sinalização de indicação do sentido de saída das rotas horizontais, códigos 12 e 13 da tabela  “c” do anexo 2, de modo que a distância de percurso de qualquer ponto da rota de saída até a sinalização seja  de no máximo 7,5 m. Adicionalmente, esta sinalização também deve ser instalada, de forma que no sentido de  saída de qualquer ponto seja possível visualizar o ponto seguinte distanciadas entre si em no máximo 15,0 m,  de acordo com a alínea a do item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.023 - Em ambientes destinados à concentração de público, a sinalização de orientação e salvamento deverá  ser instalada em altura superior a 1,8 m, caso não seja possível sua visualização no plano horizontal. As  dimensões das placas de sinalização deverão estar de acordo com o previsto na tabela 1.1 do anexo 1, de  acordo com a alínea h do item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.024 - A sinalização de orientação e salvamento deve possuir forma quadrada ou retangular, cor do fundo  (cor de segurança) verde, cor do símbolo (cor de contraste) branca ou amarela fotoluminescente, margem  (opcional) fotoluminescente e proporcionalidades paramétricas, de acordo com a Tabela 1.1, do Anexo 1, da  NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.025 - A sinalização de orientação e salvamento deve apresentar efeito fotoluminescente, de acordo com  a alínea a do item 5.7.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.026 - A sinalização de indicação numérica (cardinal ou ordinal) e alfabética do pavimento no interior das  escadas e antecâmaras deve estar a uma altura de 1,8 m medido do piso acabado à base da placa de sinalização,  instalada junto à parede, sobre o patamar de acesso de cada pavimento, de tal forma a ser visualizada em  ambos os sentidos da escada, tanto subida quanto descida e na parede da antecâmara ao lado da porta de  acesso à caixa de escada, de acordo com a alínea f do item 6.1.3 da NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.027 - A sinalização de identificação de pavimento deve ser instalada em local sempre visível, de tal forma a  ser visualizada em ambos os sentidos da escada, tanto subida quanto descida, conforme alínea f do item  6.1.3 NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.028 - A sinalização de orientação e salvamento deve assinalar todas as mudanças de direção ou sentido,  saídas, escadas, indicando a rota de fuga, de acordo com o item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b,  e 6º, do Dec. 23.154/2002)",
					"02.029 - Em escadas contínuas, além da identificação do pavimento de descarga no interior da caixa de escada  de emergência, deve-se incluir uma sinalização de porta de saída, de forma a evidenciar o piso de descarga,  conforme código 17 da tabela “c”, do anexo 2 e alínea g do item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b,  e 6º, do Dec. 23.154/2002)",
					"02.030 - A sinalização de equipamentos de combate a incêndio deve ser instalada de acordo com a NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.031 - Na edificação que estiver isenta do projeto de incêndio, nos termos da IN 02/2020-DIVIS/CBMDF, deve  ser instalada sinalização de segurança contra incêndio e pânico, conforme as NBRs 13434-1/04, 13434-2/04 e  13434-3/2005 da ABNT.",
					"02.032 - A sinalização de indicação da localização do avisador sonoro, ou do avisador visual ou do avisador  sonoro - visual do sistema de detecção e alarme de incêndio, código 20 da tabela “d” do anexo 2, deve ser  instalada a uma altura entre 2,20 m e 3,50 m, medida do piso acabado à base da placa de sinalização,  imediatamente ao lado do avisador sinalizado, de acordo com a alínea a do item 6.1.4 da NT 22/2020 CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"02.033 - A sinalização de indicação da localização do acionador manual do sistema de detecção e alarme de  incêndio, código 21 da tabela “d” do anexo 2, deve ser instalada a uma altura entre 0,90 m e 1,35 m, medida  do piso acabado à base da placa de sinalização, imediatamente ao lado do acionador manual sinalizado, de  acordo com a alínea b do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.034 - A sinalização de indicação da localização do telefone ou do interfone de emergência, código 22 da  tabela “d” do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de  sinalização, imediatamente acima do telefone ou do interfone sinalizado, de acordo com a alínea c do item  6.1.4 da NT 22/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"02.035 - A sinalização de indicação da localização do extintor de incêndio portátil ou sobre rodas, código 23 da  tabela “d” do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de  sinalização, imediatamente acima do extintor sinalizado, de acordo com a alínea d do item 6.1.4 da NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.036 - A sinalização de indicação da localização do abrigo do hidrante de incêndio, com ou sem o hidrante  em seu interior, código 24A da tabela “d”, do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do  piso acabado à base da placa de sinalização, imediatamente acima do abrigo do hidrante sinalizado, de acordo  com a alínea e do item 6.1.4 da NT 22/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"02.037 - A sinalização de indicação da localização do hidrante de incêndio, instalado fora do abrigo, código 25  da tabela “d” do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa  de sinalização, imediatamente acima do hidrante sinalizado, de acordo com a alínea f do item 6.1.4 da NT  22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.038 - A sinalização de indicação da localização do mangotinho de incêndio, código 24B da tabela “d” x 2,  deve ser instalada a uma altura de 1,80 m medida do piso acabado à base da placa de sinalização,  imediatamente acima do mangotinho sinalizado, de acordo com a alínea g do item 6.1.4 da NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.039 - A sinalização de indicação da localização da válvula de governo e alarme ou da conexão de teste de  alarme do sistema de proteção por chuveiros automáticos, código 26 da tabela “d” do anexo 2, deve ser  instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, na parede do abrigo  da válvula de governo e alarme e da conexão de teste de alarme sinalizado, de acordo com a alínea h do item  6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.040 - A sinalização de equipamento de combate a incêndio deve possuir forma quadrada ou retangular, cor  do fundo (cor de segurança) vermelha, cor do símbolo (cor de contraste) branca ou amarela fotoluminescente,  margem (opcional) fotoluminescente e proporcionalidades paramétricas, de acordo com a Tabela 1.1 do Anexo  1 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.041 - A sinalização de equipamentos de combate a incêndio deve apresentar efeito fotoluminescente, de  acordo com a alínea b do item 5.7.3 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.042 - Quando os equipamentos de proteção contra incêndio forem instalados em pilares, devem ser  sinalizadas todas as faces de pilar/coluna, preferencialmente à 1,80m de altura, conforme código 28 da tabela  “d” do anexo 2, que estiverem voltadas para os corredores de circulação de pessoas ou veículos, de acordo  com a alínea j do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.043 - A sinalização de piso para indicar a localização e para evitar a obstrução por materiais dos extintores  de incêndio, dos hidrantes de incêndio, dos mangotinhos e dos acionadores manuais, nas indústrias, depósitos  e garagens, código 27 da tabela “d” do anexo 2 (quadrado 1m x 1m, fundo vermelho 0,7m x 0,7m, borda  amarela de largura 0,15m), deve ser pintada nopiso onde deve estar localizado os referidos equipamentos, de  acordo com a alínea i do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.044 - Quando houver obstáculos que dificultem ou impeçam a visualização direta da sinalização dos  equipamentos de proteção contra incêndio no plano vertical, a mesma deve ser repetida a uma altura  suficiente para proporcionar a respectiva visualização, de acordo com a alínea k do item 6.1.4 da NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.045 - Quando a visualização direta do equipamento ou sua sinalização não for possível no plano horizontal  a sua localização deve ser indicada a partir do ponto de boa visibilidade mais próxima. A sinalização deve incluir  o símbolo do equipamento em questão e uma seta indicativa, sendo que o conjunto não deve distar mais que  7,5 m do equipamento, de acordo com a alínea l do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.046 - A sinalização de equipamento de combate a incêndio, quando existirem situações onde a visualização  não seja possível apenas com a instalação da placa acima do equipamento, deve-se adotar placa adicional em  dupla face perpendicularmente à superfície da placa instalada na parede ou pilar do tipo placa angular, de  acordo com o item 5.7.8 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.047 - A sinalização complementar deve ser instalada de acordo com a NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.048 - A sinalização complementar deve ser instalada para a indicação continuada de rotas de saída,  obstáculos e/ou riscos das rotas de saída, como pilares, arestas de paredes, vigas, desnível de piso, rebaixo de  teto, saliências resultantes de elementos construtivos ou equipamentos que reduzam a largura das rotas e etc,  de acordo com o item 6.1.5 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.049 - Para indicar desnível de piso, rebaixo de teto, deve ser instalada a sinalização complementar, código  34 da tabela “g” do anexo 2, por toda a extensão do obstáculo, e verticalmente para saliências resultantes de  elementos construtivos ou equipamentos que reduzam a largura das rotas ou impeçam seu uso, a uma altura  de 0,50 m do piso acabado, com comprimento mínimo de 1,0 m. Deve ser instalada em todas as faces expostas,  com largura mínima de 0,10 m em cada face, de acordo com a alínea f do item 6.1.5 da NT 22/2020 CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.050 - Para indicação continuada das rotas de fuga horizontais e verticais, código 29 da tabela e, do anexo 2,  devem ser instaladas placas na parede a uma altura constante entre 0,25 m e 0,5 m do piso acabado à base da  placa de sinalização com espaçamentos entre cada uma delas de no máximo 3 m na linha horizontal, medida a  partir das suas extremidades, podendo ser aplicada alternadamente à parede direita e esquerda da rota de  saída, de acordo com alínea a do item 6.1.5 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.051 - Quando for instalada sobre o piso, a sinalização complementar deve estar centralizada em relação à  largura da rota de saída, de acordo com alínea a do item 6.1.5 da NT 22/2020-CBMDF.  (Arts. 3º, III, b e 6º, do  Dec. 23.154/2002)",
					"02.052 - A sinalização complementar deve ser usada a cada mudança de direção e sentido, dando o sentido de  fluxo, de acordo com alínea a do item 6.1.5 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.053 - A sinalização complementar é obrigatória em ambientes fechados destinados à concentração de  público, de acordo com a alínea a do item 6.1.5 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec.  23.154/2002)",
					"02.054 - Para indicar forma de acionamento da barra antipânico de acionamento radial e da barra de  acionamento horizontal sob pressão, instalada sobre a porta corta-fogo, código 30 da tabela “f”, do anexo 2,  deve ser instalada placa na porta corta-fogo a uma altura entre 1,20 m e 1,80 m, medida do piso acabado à  base da placa de sinalização, de acordo com a alínea b do item 6.1.5 da NT 22/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"02.055 - Para indicar permanência da porta corta-fogo constantemente fechada, instalada sobre a mesma,  código 31 da tabela “e” do anexo 2, deve ser instalada placa na porta corta-fogo a uma altura entre 1,20 m e  1,80 m, medida do piso acabado à base da placa de sinalização, de acordo com a alínea c do item 6.1.5 da NT  22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.056 - Para indicar telefone de contato da brigada de incêndio da edificação e do telefone de emergência do  Corpo de Bombeiros em caso de emergência, código 32 da tabela “e” do anexo 2, deve ser instalada placa nos  acessos da edificação ou área de risco, nos pavimentos e na sala da brigada a uma altura de 1,80 m, medida do  piso acabado à base da placa de sinalização, de acordo com a alínea d do item 6.1.5 da NT 22/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"02.057 - Para indicar lotação máxima de público sentado e em pé e telefone de emergência do Corpo de  Bombeiros, código 33 da tabela “e” do anexo 2, deve ser instalada placa nos acessos das edificações ou áreas  de risco das ocupações provisórias e permanentes de concentração de público, a uma altura de 1,80 m, medida  do piso acabado à base da placa de sinalização, de acordo com a alínea e do item 6.1.5 da NT 22/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"02.058 - Exclusivamente para boates e danceterias, concentração de público - código 23 da NT 01/2016 CBMDF, a sinalização de lotação máxima de público prevista na alínea e do item 6.1.5 da NT 22/2020 CBMDF, deve ser instalada de forma obrigatória nos acessos destas áreas, a uma altura de 1,80m, medida do  piso acabado à base da placa de sinalização, de acordo com a Decisão Técnica 011/2021-CSESCIP/CBMDF.",
					"02.059 - Instalar sinalização complementar do tipo “Plano de Fuga”, que visem facilitar a identificação de todas  as saídas de emergências nas edificações do tipo escolar, hospitalar, transitórias e concentração de público,  conforme item 5.6.5 da NBR 16820/2022 da ABNT.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.060 - Instalar sinalização complementar em elementos translúcidos ou transparentes, utilizados em  esquadrias destinadas a fechamentos de vãos (portas e painéis divisórias) que fazem parte da rota de saída,  devendo possuir tarja em cor contrastante com o ambiente, com largura mínima de 50 mm, aplicada  horizontalmente em toda sua extensão, na altura constante compreendida entre 1,00 e 1,40 m do piso  acabado, de acordo com a alínea g do item 6.1.5 da NT 22/2020-CBMDF.  (Art. 3º, III, b, do Dec. 23.154/2002)",
					"02.061 - Os produtos líquidos combustíveis armazenados devem conter mensagem por meio de placas  instaladas no acesso principal da área de risco, indicando a quantidade total de recipientes transportáveis ou  tanques, bem como a capacidade máxima individual de cada tipo, em litros ou metros cúbicos, aprovado em  projeto, de acordo com a alínea a do item 6.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.062 - Os gases combustíveis armazenados em tanques fixos devem conter mensagem por meio de placas  instaladas no acesso principal da área de risco, indicando a quantidade total de tanques, bem como a  capacidade máxima individual dos tanques em litros ou metros cúbicos e em quilogramas aprovado em projeto,  de acordo com a alínea b do item 6.2 da NT 22/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"02.063 - Os gases combustíveis armazenados em recipientes transportáveis devem conter mensagem por meio  de placas instaladas no acesso principal da área de risco, indicando a quantidade total de recipientes de acordo  com a capacidade máxima individual de cada tipo, em quilogramas, aprovado em projeto, de acordo com  a alínea c do item 6.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.064 - As classes e capacidade de armazenamento de recipientes transportáveis de Gás Liquefeito de  Petróleo - GLP, em quilogramas para cada uma dessas, por meio de placas instaladas no acesso principal da  área de risco, de acordo com a alínea d do item 6.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.065 - Produtos perigosos armazenados devem conter mensagem por meio de placas instaladas no acesso  principal da área de risco indicando o tipo, a quantidade e os perigos que oferecem as pessoas e meio ambiente,  e próximo aos produtos armazenados, separados por categoria, indicando o nome comercial e científico, de  acordo com a alínea e do inciso I do item 6.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.066 - A abertura das portas em escadas não deve obstruir a visualização de qualquer sinalização, de acordo  com a alínea j do item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.067 - Na sinalização de segurança, as expressões escritas utilizadas devem seguir as regras, termos e  vocábulos da língua portuguesa, podendo, complementarmente, e nunca exclusivamente, ser adotada outra  língua estrangeira, de acordo com a alínea d do item 5.5 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.068 - Os equipamentos de origem estrangeira, instalados na edificação, utilizados na segurança contra  incêndio e pânico, devem possuir as orientações necessárias à sua operação na língua portuguesa, de acordo  com a alínea e do item 5.5 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.069 - As dimensões básicas das letras e das placas de sinalização de segurança devem obedecer à relação  apresentada no anexo 1 da NT 22/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"02.070 - A sinalização de segurança deve possuir os símbolos gráficos, conforme os apresentados no anexo 2  da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.071 - Em ambientes destinados a concentração de público sem aclaramento natural ou artificial suficiente  para permitir acúmulo de energia no elemento fotoluminescente das sinalizações de rota de saída, devem  possuir sinalização constantemente iluminada, sem prejuízo ao sistema de iluminação de emergência de  aclaramento de ambiente. Neste caso, todas as placas que compõem a rota de saída deverão estar iluminadas,  de acordo com a alínea i do item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)",
					"02.072 - Se existirem rotas de saída específicas para uso de portadores de necessidades especiais, estas devem  ser sinalizadas para tal finalidade, conforme a alínea k do item 6.1.3 da NT 22/2020-CBMDF.  (Arts. 3º, III, b, e  6º, do Dec. 23.154/2002)",
					"02.073 - As tubulações dos sistemas hidráulicos fixos de combate a incêndio aparentes, não embutidas na  alvenaria, parede e piso, devem ter pintura na cor vermelha, de acordo com o inciso I do item 6.3, da NT  22/2020-CBMDF. (Arts. 3º, II, g, e 6º, do Dec. 23.154/2002)",
					"02.074 - As portas dos abrigos dos hidrantes, mesmo quando metálicas, podem ser pintadas com cor  combinando com a arquitetura e decoração do ambiente, contudo, devem ser identificadas com o dístico  “incêndio” - fundo vermelho com a inscrição na cor branca ou amarela, ou possuir abertura no centro com área  mínima de 0,04 m², fechada em material transparente (vidro, acrílico etc.), identificado com o dístico  “incêndio” - fundo vermelho com inscrição na cor branca ou amarela, de acordo com as alíneas a e b do inciso  II do item 6.3 da NT 22/2020-CBMDF. (Arts. 3º, II, b, e 6º, do Dec. 23.154/2002)",
					"02.075 - Os acessórios hidráulicos (válvulas de retenção, registros de paragem, válvulas de governo e alarme)  devem receber pintura na cor amarela, de acordo com o inciso III do item 6.3 da NT 22/2020-CBMDF. (Art. 6º,  do Dec. 23.154/2002)",
					"02.076 - A tampa de abrigo do registro de recalque deve ser pintada na cor vermelha, de acordo com o inciso  IV do item 6.3 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.077 - Quando houver dois ou mais registros de recalque na edificação, tratando-se de sistemas distintos de  proteção contra incêndio, sistema de hidrantes e sistema de chuveiros automáticos, deve haver indicação  específica na tampa dos respectivos abrigos: inscrição “H” para hidrantes e “CA” ou “SPK” para chuveiros  automáticos, de acordo com o inciso V do item 6.3 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"02.078 - Nas instalações do gerador deve ser adotada sinalização adequada de segurança, destinada à  advertência e à identificação de riscos de choque elétrico, de acordo com a NR - 26 do Ministério do Trabalho.",
					"02.079 - A sinalização de orientação e salvamento para Elevador de Emergência deve ser instalada de acordo  com a figura S-23 da NBR 16.820/2022. (Art. 6º, do Dec. 23.154/2002)",
				],
				'003': [
					"03.001 - A iluminação de emergência deve ser instalada em conformidade com a NT 21/2020-CBMDF. (Art. 6º,  do Dec. 23.154/2002)",
					"03.002 - O sistema de iluminação de emergência deve ser instalado em conformidade com o Projeto de  Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"03.003 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de  Responsabilidade Técnica - ART/RRT/TRT) de execução ou manutenção do sistema de iluminação de  emergência instalado, emitido por responsável técnico e visado no seu respectivo órgão de classe, de acordo  com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"03.004 - A iluminação de emergência deve ser prevista como iluminação de aclaramento, obrigatória em todos  os locais da edificação que integram uma rota de fuga, vertical ou horizontal, além dos ambientes destinados  a salas de aulas, dormitórios coletivos e aqueles que permitam concentração mínima de 50 pessoas, conforme  item 5.3 da NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.005 - Nas edificações destinadas à concentração de público, a iluminação de aclaramento deve ser  dimensionada inclusive para a área de banheiros, conforme item 5.3.1 da NT 21/2020-CBMDF. (Art. 6º, do Dec.  23.154/2002)",
					"03.006 - O afastamento entre os pontos de luz, com a finalidade de aclaramento, deve ser no máximo o  equivalente a 04 (quatro) vezes a altura de sua instalação em relação ao piso, conforme item 6.2 da NT 21/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.007 - Instalar pontos de luz em altura inferior à que se encontram locais de saída/exaustão de fumaça,  visando minimizar a obstrução da iluminação de emergência por ocorrência de um “colchão” de fumaça no teto,  de acordo com o item 6.4 da NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.008 - Devem ser instaladas faixas com iluminação própria no chão, corredores, rodapés e/ou escadas  favorecendo a localização da saída, nos ambientes em que seja obrigatório o dimensionamento do sistema de  iluminação de emergência e não apresentem ventilação natural cruzada ou não existam aberturas no teto ou  sistemas de exaustão de fumaça, de acordo com o item 6.5 da NT 21/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do  Dec. 23.154/2002)",
					"03.009 - Retirar os projetores ou faróis localizados em escadas ou áreas em desnível, onde sombra ou  ofuscamento podem ocasionar acidentes, de acordo com o item 8.2.8 da NBR 10898/2013 da ABNT. (Art. 6º,  do Dec. 23.154/2002)",
					"03.010 - O ambiente para instalação da fonte energia centralizada deve ser isolado do acesso ao público geral,  seja para o sistema com baterias recarregáveis ou grupo motogerador, conforme item 5.6.1 da NT 21/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.011 - No emprego de fonte de energia centralizada, o ambiente para instalação da fonte de energia  centralizado deve possuir paredes construídas para tempo de resistência ao fogo de 02 (duas) horas, conforme  item 5.6.1 da NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.012 - No emprego de fonte de energia centralizada, o ambiente para instalação deve possuir ventilação para  o exterior da edificação ou dotada de ventilação mecânica adequada, conforme item 5.6.1 da NT 21/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.013 - A localização dos componentes da fonte de energia centralizada deve ser em local que não ofereça  riscos de explosão, fogo ou propagação de fumaça, acidentes em funcionamento, obstrução à saída da  edificação ou dificulte a organização de socorro, possua fácil acesso e espaço para movimentação ao pessoal  especializado para inspeção e manutenção, conforme alínea d do item 4.2 da NBR 10898/2013 da ABNT. (Art.  6º, do Dec. 23.154/2002)",
					"03.014 - Deve ser garantido um tempo máximo de interrupção de 3 segundos para comutação entre baterias  alternativas, conforme item 5.1.1.5 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.015 - A área das baterias do sistema de iluminação de emergência deve ser ventilada, de acordo com a alínea  p do item 4.1.2 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.016 - O sistema centralizado com baterias recarregáveis deve possuir recarga automática com supervisão  permanente em painel de controle, conforme item 5.5.2 da NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.017 - O sistema centralizado com baterias recarregáveis deve possuir sinalização no painel de controle do  sistema e mostrar a situação de recarga, flutuação e o controle das proteções das baterias e estar sob  permanente supervisão humana, conforme alínea i do item 4.1.2 da NBR 10898/13 da ABNT. (Art. 6º, do Dec.  23.154/2002)",
					"03.018 - O sistema centralizado de iluminação de emergência com bateria não pode ser utilizado para alimentar  qualquer outro circuito ou equipamento na edificação, de modo a não interferir no tempo da autonomia da  iluminação de emergência, conforme alínea o do item 4.1.2 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec.  23.154/2002)",
					"03.019 - O tempo máximo de comutação para o grupo motogerador do sistema de iluminação de emergência  deve ser de 12 segundos, de acordo com a alínea a do item 4.1.3 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec.  23.154/2002)",
					"03.020 - O escapamento dos gases do grupo motogerador do sistema de iluminação de emergência deve ser  direcionado para área segura, de acordo com o item 9.4.2 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec.  23.154/2002)",
					"03.021 - A quantidade de combustível destinado ao grupo motogerador do sistema de iluminação de  emergência deve assegurar o funcionamento no tempo garantido de autonomia do sistema do motogerador,  incluindo o consumo nos arranques periódicos essenciais e os testes de manutenção preventivos e corretivos,  com periodicidade de 30 dias, de acordo com a alínea h do item 4.1.3 da NBR 10898/2013 da ABNT. (Art. 6º,  do Dec. 23.154/2002)",
					"03.022 - Os painéis de controle, as baterias de arranque e as instalações de armazenamento de combustível do  sistema do grupo motogerador podem ser compartimentados de forma a evitar a propagação de um eventual  incêndio entre as partes, conforme alínea k do item 4.1.3 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec.  23.154/2002)",
					"03.023 - O sistema centralizado com grupo motogerador de iluminação de emergência deve ter o acesso ao  gerador de forma irrestrita desde a área externa da edificação, sem a passagem por áreas com material  combustível, conforme alínea b do item 4.4.1 da NBR 10898/13 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.024 - O sistema centralizado com grupo motogerador deve possuir painéis de controle com indicador de  quantidade de combustível, botão de arranque manual, supervisão de temperatura de água de resfriamento  do motor em local visível, dispositivos de proteção elétrico do gerador contra sobrecarga, conforme alínea c do  item 4.1.3 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.025 - O sistema centralizado com grupo motogerador deve estar apoiado em base, com isoladores de  vibrações, dreno com filtro de cascalho para absorver a perda de óleo combustível e líquidos lubrificantes e  parafuso de dreno no ponto mais baixo, conforme alínea e do item 4.1.3 da NBR 10898/2013 da ABNT. (Art.  6º, do Dec. 23.154/2002)",
					"03.026 - O sistema grupo motogerador de iluminação de emergência quando possuir tanques de  armazenamento de combustível com volume superior ou igual a 200 litros deve ser montado dentro de bacias  de contenção com dreno e filtro de cascalho, de acordo com a alínea l do item 4.1.3 da NBR 10898/2013 da  ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.027 - O sistema de iluminação de emergência deve estar em perfeito estado de funcionamento, de acordo  com o item 9.1 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.028 - A tensão de alimentação da iluminação de emergência deve ser no máximo de 30 Vcc, em qualquer  área fora das rotas de fuga, protegidas contra fogo ou em áreas com material combustível, devendo ser  respeitada mesmo quando fornecida por grupo motogerador ou conjunto de baterias, conforme itens 5.8.1 e  5.8.2 da NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.029 - A tensão de alimentação poderá ser mantida em 110/220 Vca, nas áreas protegidas para escoamento,  livres de materiais combustíveis e separadas por porta corta-fogo em caso de falta de energia por incêndio e  no uso de grupo motogerador automático com circuitos especiais para iluminação de emergência; deve-se  observar que qualquer passagem dos cabos por áreas de risco proíbe o uso da tensão de 110/220 Vca da rede  nominal ou gerador, de acordo com o item 4.4 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.030 - O nível mínimo de iluminamento no piso deve ser de 05 lux em locais com desnível (escadas ou  passagens com obstáculos) e 03 lux em locais planos (corredores, halls e locais sem obstáculos), de acordo com  as alíneas a e b do item 6.7 da NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.031 - O sistema de iluminação de emergência não pode ter autonomia menor que 1h (uma hora) de  funcionamento, incluindo uma perda não maior que 10% de sua luminosidade inicial, conforme item 5.9.1 da  NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.032 - A comutação deve ser automática para bloco autônomo de acordo com a alínea b do item 4.1.1 da  NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.033 - O invólucro da luminária do sistema de iluminação de emergência deve oferecer resistência contra  impacto de água, sem causar danos mecânicos nem o desprendimento da luminária do local da montagem, de  acordo com o item 4.3.5 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.034 - A luminária do sistema de iluminação de emergência deve ter sua fixação rígida de forma a impedir  queda acidental, remoção sem auxílio de ferramenta, impedindo-a de ser avariada ou colocada fora de serviço,  de acordo com o item 8.1.1 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.035 - Não são admitidas ligações em série de pontos de luz do sistema de iluminação de emergência, de  acordo com o item 4.4.3 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.036 - Os condutores e suas derivações do sistema de iluminação de emergência devem sempre passar em  eletrodutos com caixas de passagem, de acordo com o item 4.4.5 da NBR 10898/2013 da ABNT. (Art. 6º, do  Dec. 23.154/2002)",
					"03.037 - No caso de instalação aparente, a tubulação e as caixas de passagem do sistema de iluminação de  emergência devem ser metálicas, de acordo com o item 4.4.6 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec.  23.154/2002)",
					"03.038 - No caso de bloco autônomo, do sistema de iluminação de emergência, os eletrodutos podem ser de  plástico, e devem ser protegidos contra danos mecânicos, de acordo com o item 4.4.6 da NBR 10898/2013 da  ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.039 - Os eletrodutos utilizados para condutores de iluminação de emergência não podem ser usados para  outros fins, salvo instalação de detecção e alarme de incêndio ou de comunicação, conforme a ABNT NBR 5410,  contanto que as tensões de alimentação estejam abaixo de 30 Vcc e todos os circuitos devidamente protegidos  contra curtos-circuitos, de acordo com o item 4.4.7 da NBR 10898/2013 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"03.040 - Caso seja adotada a iluminação para sinalização a mesma deve possuir fluxo luminoso mínimo igual a  30 lumens. Neste tipo de iluminação, a função de sinalização deve ser obtida pelo emprego de formas, letras,  símbolos gráficos e cores conforme determina a norma técnica específica para sinalização de segurança contra  incêndio e pânico, conforme item 6.8 da NT 21/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"03.041 - As luminárias a serem instaladas em áreas classificadas como de atmosfera explosiva, devem estar  aprovadas de acordo com exigências das respectivas normas que definem a classificação da área e os requisitos  para equipamentos elétricos. Caso o tipo de sistema adotado nesses locais utilize alimentação centralizada, a  bateria deve estar localizada em local fora da área de risco, de acordo com o item 6.9 da NT 21/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"03.042 - Os blocos autônomos de iluminação de emergência não podem conter qualquer tipo de interruptor  manual, do tipo liga/desliga, desativando a bateria do bloco autônomo de emergência, de acordo com a alínea  “i” do item 6.1.2.1 da ABNT NBR 10898/2023. (Art. 6º, do Dec. 23.154/2002)",
					"03.043 - Instalar iluminação de emergência em ambientes de risco, tais como subestações, galerias  subterrâneas, sala de geradores, casa de bombas de incêndio etc., de acordo com o Anexo E, item E.2 da ABNT  NBR 10898/2023. (Art. 6º, do Dec. 23.154/2002)",
				],
				'004': [
					"04.001 - Os aparelhos extintores de incêndio devem ser instalados em conformidade com a NT 03/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.002 - O sistema de proteção por extintores de incêndio deve ser instalado em conformidade com o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"04.003 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de Responsabilidade Técnica - ART/RRT/TRT) de execução ou manutenção do sistema de proteção por extintores de incêndio instalado, emitido por responsável técnico e visado no seu respectivo órgão de classe, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"04.004 - Instalar extintores de incêndio portáteis para a proteção das três classes de fogo A, B e C, de acordo com o item 4.1.1.3 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.004 - Instalar extintores de incêndio portáteis para a proteção das três classes de fogo A, B e C, de acordo com o item 4.1.1.3 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.005 - Instalar extintores de incêndio portáteis para a proteção da classe de fogo A, de acordo com a letra a do item 4.1.1.3 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.006 - Instalar extintores de incêndio portáteis para a proteção da classe de fogo B, de acordo com a letra b do item 4.1.1.3 da NT 03/2015 do CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.007 - Instalar extintores de incêndio portáteis para a proteção da classe de fogo C, de acordo com a letra c do item 4.1.1.3 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.008 - Instalar extintores de incêndio portáteis para a proteção da classe de fogo K, de acordo com o item 6.4.12 da NT 24/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.009 - Os agentes extintores devem ser selecionados de acordo com a natureza do fogo, selecionados conforme Tabela 1 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.010 - A capacidade extintora mínima de cada tipo de extintor portátil, para o combate aos fogos das classes A e B, de acordo com a classificação de risco, deve obedecer a Tabela 2 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.011 - A distância máxima a ser percorrida até se alcançar o extintor portátil, para o combate aos fogos das classes A e B, em conformidade com o risco da edificação ou da área de risco, deve obedecer a Tabela 3 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.012 - A quantidade e a capacidade extintora dos extintores portáteis destinados à proteção das centrais de GLP são definidas pela quantidade total do referido gás, devendo obedecer a Tabela 4 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.013 - A quantidade e a capacidade extintora dos extintores portáteis destinados à proteção das áreas de armazenamento de GLP são definidas pela classe do armazenamento e pela consequente quantidade total de botijões do referido gás prevista para cada classe, devendo obedecer a Tabela 5 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.014 - A quantidade e a capacidade extintora dos extintores portáteis destinados à proteção dos tanques aéreos fechados de armazenamento de líquidos inflamáveis e combustíveis são definidas pela capacidade total de cada tanque, devendo obedecer a Tabela 6 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.015 - Os tanques de armazenamento de líquidos inflamáveis e combustíveis enterrados devem ser atendidos por um extintor portátil de pó com capacidade extintora de 20B, próximo ao local de enchimento e/ou saída (bomba) de cada tanque, independente da sua capacidade de armazenamento, de acordo com o item 4.1.1.10 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.016 - Para a proteção de tanques de armazenamento de líquidos inflamáveis e combustíveis em recipientes abertos deve ser considerada a proporção da capacidade extintora de 20B, para cada metro quadrado de superfície de líquido, de acordo com o item 4.1.1.11 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.017 - Os aparelhos extintores devem ser dimensionados de maneira que haja menor probabilidade do fogo bloquear seus acessos, de acordo com o item 4.1.2.6 e 4.2.2.4 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.018 - Os aparelhos extintores devem ser instalados de maneira que sejam visíveis, para que todos os usuários fiquem familiarizados com a suas localizações, de acordo com o item 4.1.2.6 e 4.2.2.4 da NT 03/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.019 - Os aparelhos extintores devem ser instalados de maneira que permaneçam protegidos contra intempéries e danos físicos em potencial, de acordo com os itens 4.1.2.6 e 4.2.2.4 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.020 - Os aparelhos extintores devem ser instalados de maneira que não fiquem obstruídos por pilhas de mercadorias, matérias-primas ou qualquer outro material, de acordo com os itens 4.1.2.6 e 4.2.2.4 da NT 03/2015-CBMDF. (Arts. 4º, a, e 6º, do Dec. 23.154/2002)",
					"04.021 - Os aparelhos extintores devem ser instalados de maneira que estejam junto aos acessos dos riscos, de acordo com os itens 4.1.2.6 e 4.2.2.4 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.022 - Os aparelhos extintores devem ser instalados de maneira que não fiquem no interior de escadas e de antecâmaras de escadas, de acordo com os itens 4.1.2.6 e 4.2.2.4 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.023 - Os aparelhos extintores devem ser instalados de maneira que não fiquem dentro de vagas de veículos, em garagens, de acordo com os itens 4.1.2.6 e 4.2.2.4 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.024 - Quando os extintores portáteis forem instalados em paredes, pilares ou divisórias, a altura máxima deverá ser de 1,60 m, medido do piso acabado até a sua alça de manuseio, e a altura mínima deverá ser de 10 cm, medido do piso acabado até a sua parte inferior, de acordo com o item 4.1.2.1 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.025 - Os extintores instalados sobre o piso acabado devem permanecer apoiados em suportes apropriados, com altura entre 10 cm e 20 cm do piso, de acordo com o item 4.1.2.2 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.026 - Suportes de piso devem ser fixados no piso onde forem instalados, de tal forma a evitar a remoção, mesmo que temporária, do extintor de incêndio, e danos físicos causados por choques mecânicos, sendo vedada a instalação do extintor diretamente sobre o piso, de acordo com o item 4.1.2.3 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.027 - Os extintores portáteis devem ser instalados nos caminhos normais de passagem, incluindo saídas das áreas, devendo haver no mínimo um extintor de incêndio localizado a não mais de 05 m da porta de acesso da entrada principal da edificação, entrada do pavimento ou entrada da área de risco, de acordo com o item 4.1.2.4 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.028 - Deve ser instalado, no mínimo, um extintor portátil por pavimento e mezanino, independente da área da edificação e área de risco, de acordo com o item 4.1.2.5 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.029 - Os extintores portáteis devem ser corretamente dimensionados, de acordo com item 4.1.2.6 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.030 - Os extintores portáteis devem ser adequados às classes de fogo existentes na edificação ou na área de risco a ser protegida, de acordo com o item 4.1.2.7 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.031 - Quando a edificação possuir riscos especiais tais como: casas de caldeiras, casas de força elétrica, casas de bomba, queimadores, casas de máquinas, central de GLP, galerias de transmissão, e similares, estes devem ser protegidos por extintores portáteis extras, independentemente da proteção geral da edificação, de acordo com o item 4.1.2.8 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.032 - Nos riscos especiais, situados em recintos fechados, os extintores portáteis devem ser instalados no lado externo, a no máximo 05 m da entrada destes riscos, de acordo com o item 4.1.2.9 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.033 - As unidades extintoras devem ser as correspondentes a um só extintor, não sendo aceitas combinações de dois ou mais extintores, com exceção das unidades extintoras destinadas ao combate dos fogos de classe A, para as quais se permite a combinação de no máximo duas unidades extintoras, de acordo com o item 4.1.2.10 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.034 - No mínimo 50% do número total de unidades extintoras exigidas para cada risco devem ser constituídos por extintores portáteis, de acordo com o item 4.1.2.11 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.035 - Instalar extintores de incêndio sobre rodas para a proteção da classe de fogo a ser extinto, de acordo com o item 4.2.1.3 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.036 - Os agentes extintores devem ser selecionados de acordo com a natureza do fogo, selecionados conforme a Tabela 7 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.037 - A capacidade extintora mínima de cada tipo de extintor sobre rodas, para o combate aos fogos das classes A e B, de acordo com a classificação de risco, deve obedecer a Tabela 8 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.038 - A distância máxima a ser percorrida até se alcançar o extintor sobre rodas, para o combate aos fogos das classes A e B, em conformidade com o risco da edificação ou da área de risco deve obedecer a Tabela 9 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.039 - A quantidade e a capacidade extintora dos extintores sobre rodas destinados à proteção das áreas de armazenamento de GLP são definidas pela classe do armazenamento e pela consequente quantidade total de botijões do referido gás prevista para cada classe, devendo obedecer a Tabela 10 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.040 - A quantidade e a capacidade extintora dos extintores sobre rodas destinados à proteção dos tanques aéreos fechados de armazenamento de líquidos inflamáveis e combustíveis são definidas pela capacidade total de cada tanque, devendo obedecer a Tabela 11 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.041 - Devem ser empregados obrigatoriamente extintores sobre rodas nos postos de abastecimento, conforme alínea a do item 4.2.2.1 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.042 - Devem ser empregados obrigatoriamente extintores sobre rodas nos depósitos de GLP com capacidade superior a 6.240 kg ou 480 botijões, conforme alínea b do item 4.2.2.1 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.043 - Devem ser empregados obrigatoriamente extintores sobre rodas nos depósitos de líquidos inflamáveis e combustíveis, com capacidade superior a 5.000 litros, conforme alínea c do item 4.2.2.1 da NT 03/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.044 - Devem ser empregados obrigatoriamente extintores sobre rodas nos depósitos e indústrias de explosivos e fogos de artifício, conforme alínea d do item 4.2.2.1 da NT 03/2015-CBMDF.",
					"04.045 - Devem ser empregados obrigatoriamente extintores sobre rodas nos depósitos e indústrias classificadas como de risco alto, segundo a Norma Técnica específica, conforme alínea e do item 4.2.2.1 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.046 - Devem ser empregados obrigatoriamente extintores sobre rodas nos helipontos e heliportos, conforme alínea f do item 4.2.2.1 da NT 03/2015-CBMDF.",
					"04.047 - Devem ser empregados obrigatoriamente extintores sobre rodas nos hangares, conforme alínea g do item 4.2.2.1 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.048 - Devem ser empregados obrigatoriamente extintores sobre rodas nas subestações elétricas, casa de máquinas de geradores elétricos e setores técnicos de transformadores refrigerados a óleo e acessórios elétricos, em áreas externas, conforme alínea h do item 4.2.2.1 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.049 - Nas edificações e áreas de risco onde é exigido o emprego de extintores sobre rodas, é vedada a soma das capacidades extintoras de vários extintores portáteis, como alternativa para substituí-lo, de acordo com o item 4.2.2.2 da NT 03/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.050 - Não é permitida a proteção de edificações ou áreas de risco unicamente por extintores sobre rodas, admitindo-se no máximo a proteção da metade da área total correspondente ao risco, considerando o complemento por extintores portáteis, de forma alternada entre extintores portáteis e sobre rodas na área de risco, de acordo com o item 4.2.2.3 da NT 03/2015-CBMDF.",
					"04.051 - Os extintores sobre rodas devem ser corretamente dimensionados, de acordo com item 4.2.2.4 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.052 - Os extintores sobre rodas devem ser localizados em pontos estratégicos, e sua proteção deve ser restrita ao nível do piso em que se encontram, de acordo com o item 4.2.2.5 da NT 03/2015-CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154/2002)",
					"04.053 - Os extintores sobre rodas devem ser instalados em locais que permitam o livre acesso a qualquer parte da área protegida, sem impedimentos de portas, soleiras, degraus no piso, materiais e equipamentos, de acordo com o item 4.2.2.6 da NT 03/2015-CBMDF. (Arts. 4º, a, e 6º, do Dec. 23.154/2002)",
					"04.054 - Não é considerado como extintor sobre rodas o conjunto de dois ou mais extintores instalados sobre um mesmo suporte e cujo acionamento seja individualizado, de acordo com o item 4.2.2.7 da NT 03/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.055 - Instalar sinalização de extintores (quadrada ou retangular, fundo vermelho, símbolo branco ou amarelo e margem branca ou amarela), de acordo com a NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.056 - Dever ser instalada sinalização em todas as faces do pilar que possui extintor instalado, de acordo com a alínea j do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.057 - Instalar sinalização de piso, logo abaixo dos extintores (quadrado vermelho 70 x 70 cm com moldura amarela de 15 cm) em garagens, depósitos e indústrias, de acordo com a alínea I do item 6.1.4 da NT 22/2020CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.058 - Os extintores devem estar lacrados, com a pressão adequada e possuir selo de conformidade concedida por órgão credenciado pelo Sistema Brasileiro de Certificação (INMETRO), de acordo com o item 5.2.1 da NT 03/2015-CBMDF.",
					"04.059 - Para efeito de vistoria, o prazo de validade da carga e a garantia de funcionamento dos extintores portáteis e sobre rodas deve ser aquele estabelecido pelo fabricante, se novo, ou pela empresa de manutenção certificada pelo Inmetro e credenciada pelo CBMDF, se recarregado, de acordo com o item 5.2.1 da NT 03/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"04.060 - Os aparelhos extintores de incêndio devem ser vermelhos, de acordo com a NBR 7195/95 da ABNT. (Arts. 3º, I, h, e 6º, do Dec. 23.154/2002)",
					"04.061 - Realizar recarga dos extintores que se encontram descarregados, ou com o prazo de validade e/ou garantia vencidos, conforme a NBR 12962/16 da ABNT. (Arts. 3º, I, b, e 6º, do Dec. 23.154/2002)",
					"04.062 - Realizar teste hidrostático nos extintores que se encontram com este teste vencido, conforme a NBR 12962/16 da ABNT. (Arts. 3º, I, c, e 6º, do Dec. 23.154/2002)",
					"04.063 - Realizar manutenção nos extintores que se encontram com lacre violado ou vencido, de acordo com o item 5.3 da NBR 12962/16 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"04.064 - Realizar manutenção nos extintores que se encontram com o quadro de instrução ilegível ou inexistente, de acordo com o item 5.3 da NBR 12962/16 da ABNT. (Arts. 3º, I, g, e 6º, do Dec. 23.154/2002)",
					"04.065 - Realizar manutenção nos extintores que se encontram com inexistência de algum componente, mangueira de descarga apresentando danos, deformação ou ressecamento, de acordo com o item 5.3 da NBR 12962/16 da ABNT. (Arts. 4º, c, e 6º, do Dec. 23.154/2002)",
					"04.066 - Realizar manutenção nos extintores que se encontram com corrosão no recipiente ou em partes que possam ser submetidas à pressão momentânea ou estejam submetidas à pressão permanente e/ou partes externas contendo mecanismos ou sistema de acionamento mecânico, de acordo com o item 5.3 da NBR 12962/16 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"04.067 - Realizar manutenção nos extintores que se encontram com inexistência ou elegibilidade das gravações originais de fabricação ou do último ensaio hidrostático, de acordo com o item 5.3 da NBR 12962/16 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"04.068 - O anel de identificação da manutenção dos extintores de incêndio deve ser confeccionado de acordo com as opões descritas nas alíneas a ou b, do item C.1, Anexo C, da PORTARIA INMETRO N° 58/2022.",
					"04.069 - O anel de identificação da Manutenção, confeccionado em material plástico, deve ser indeformável nas suas dimensões, na cor referente ao ano de sua manutenção, e com dimensões compatíveis com cada um dos modelos de extintor de incêndio, de modo que o mesmo somente possa ser colocado ou removido com a prévia desmontagem do extintor. Esse anel deve possuir entalhes radiais equidistantes entre si (no mínimo, quatro entalhes), que permitam sua ruptura antes de alcançar uma deformação de 20 mm, de acordo com a alínea a, do item C.1, Anexo C, da Portaria INMETRO N° 58/2022.",
					"04.070 - O anel de identificação da manutenção dos extintores de incêndio em alumínio ou aço inox, deve ser indeformável nas suas dimensões, sem pintura e com dimensões compatíveis com cada um dos modelos de extintor de incêndio, de modo que o mesmo somente possa ser colocado ou removido com a prévia desmontagem do extintor, de acordo com a alínea b, do item C.1, Anexo C, da Portaria INMETRO N° 58/2022.",
					"04.071 - Instalar modelo de anéis de identificação da manutenção nos extintores de incêndio conforme cronograma de cores, de acordo com a tabela do Anexo C, da Portaria INMETRO N° 58/2022: a) 01/01/2020 a 31/12/2020 - anel de manutenção cor verde; b) 01/01/2021 a 31/12/2021 - anel de manutenção cor branca; c) 01/01/2022 a 31/12/2022 - anel de manutenção cor azul; d) 01/01/2023 a 31/12/2023 - anel de manutenção cor preta; e) 01/01/2024 a 31/12/2024 - anel de manutenção cor alaranjada; f) 01/01/2025 a 31/01/2025 - anel de manutenção cor púrpura.",
					"04.072 - O Anel de Identificação da Manutenção deve conter, obrigatoriamente, a identificação do fornecedor, podendo ser usado o nome ou o logotipo deste. Adicionalmente, os anéis de alumínio ou aço inox devem conter também o ano da realização da manutenção, de acordo com o item C.4, do Anexo C, da Portaria INMETRO Nº 58/2022.",
					"04.073 - Nos extintores de incêndio portáteis de pressurização direta, o Anel de Identificação de Manutenção deve ser instalado entre a válvula de descarga e o cilindro ou recipiente do extintor de incêndio, de maneira que não seja possível a retirada desse anel sem a desmontagem da válvula de descarga do cilindro ou recipiente, de acordo com o item C.6, do Anexo C, da Portaria INMETRO Nº 58/2022.",
					"04.074 - Nos extintores de incêndio sobre rodas com pressurização direta, o Anel de Identificação de Manutenção deve ser instalado entre o indicador de pressão e a válvula, de maneira que não seja possível a retirada desse anel sem a retirada do indicador de pressão, de acordo com o item C.6, do Anexo C, da Portaria INMETRO Nº 58/2022.",
					"04.075 - Os selos de identificação da conformidade devem ser gravados de forma visível e legível nos mostradores dos indicadores de pressão dos extintores de incêndio, conforme item 5.1, do Anexo II, da Portaria INMETRO nº 109/2022.",
					"04.076 - O selo de identificação da conformidade, bem como o número do registro devem ser impressos no mostrador dos indicadores de pressão certificados nos extintores de incêndio, conforme item 1, do Anexo II, da Portaria INMETRO nº 109/2022.",
					"04.077 - O Selo de Identificação da Conformidade a ser impresso no mostrador é o modelo compacto, constante do item 2, do Anexo II, da Portaria INMETRO nº 109/2022.",
					"04.078 - A capacidade extintora mínima para extintores portáteis com carga de pó para as classes de fogo A, B e C é de 2-A, 20-B e C, respectivamente, de acordo com a alínea “e” do item 5.5.1.1 da ABNT NBR 12.693/2021. (Art. 6º, do Dec. 23.154/2002)",
					"04.078 - O selo de identificação da conformidade a ser impresso no mostrador dos indicadores de pressão dos extintores de incêndio é o modelo compacto nível 4, definido na Portaria INMETRO nº 179.",
					"04.079 - A capacidade extintora mínima para extintores sobre rodas com carga de pó para as classes de fogo A, B e C é de 6-A, 80-B e C, respectivamente, de acordo com a alínea “e” do item 5.5.1.4 da ABNT NBR 12.693/2021. (Art. 6º, do Dec. 23.154/2002)",
					"04.080 - Os abrigos para extintores não podem estar fechados a chave e devem ter uma superfície transparente que possibilite a visualização do extintor em seu interior, de acordo com o item 5.3.3 da ABNT NBR 12.693/2021. (Art. 6º, do Dec. 23.154/2002)",
					"04.081 - Quando instalados em locais sujeitos ao vandalismo, os abrigos podem estar fechados a chave, desde que existam meios que permitam o rápido acesso ao equipamento em situação de emergência, de acordo com o item 5.3.3 da ABNT NBR 12.693/2021. (Art. 6º, do Dec. 23.154/2002)",
					"04.082 - Em estádios, hospitais psiquiátricos, reformatórios e locais onde a liberdade das pessoas sofre restrições, os extintores devem ser instalados em locais com acesso privativo, de acordo com o item 5.3.13 da ABNT NBR 12.693/2021. (Art. 6º, do Dec. 23.154/2002)",
				],
				'005': [
					"05.001 - Adequar para a edificação as saídas de emergência necessárias para garantir o abandono seguro de toda a população em conformidade com a NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.002 - Adequar para a edificação as saídas de emergência necessárias para garantir o abandono seguro de toda a população, em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.003 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de Responsabilidade Técnica - ART/RRT/TRT) de execução ou manutenção do sistema de saídas de emergência instalado, emitido por responsável técnico e visado no seu respectivo órgão de classe, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.004 - As portas que abrem para dentro de rotas de saída, em ângulo de 180º, em seu movimento de abrir, no sentido do trânsito de saída, não podem diminuir a largura efetiva destas em valor menor que a metade, sempre mantendo uma largura mínima livre de 1,20 m para as ocupações em geral e de 1,65 m para os grupos de concentração de público de acordo com a NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.005 - A largura mínima das saídas de emergência deve ser de 2,20 m, para permitir a passagem de macas, camas e outros, no grupo 30 de ocupação hospitalar, de acordo com a alínea b do item 4.1.3.1.3 da NT 10/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.006 - Em estabelecimento de atenção primária a saúde (Grupo 32), a largura mínima das saídas de emergência deverá ser de 1,20m, de acordo com o item 21.10.1 da IN 01/2021 - DESEG/CBMDF.",
					"05.007 - Em estabelecimento de atenção secundária a saúde (Grupos 31 e 30), a largura mínima das saídas de emergências deverá ser de 1,65m, de acordo com o item 21.10.1 da IN 01/2021 - DESEG/CBMDF.",
					"05.008 - Adequar para a edificação a largura das saídas de emergência, atendendo a Tabela 05 da NT 10/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.009 - Adequar para edificação a largura das saídas de emergência, em conformidade com o Projeto de Incêndio aprovado no CBMDF, conforme o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.010 - Adequar para a edificação o número de escadas de emergência, atendendo ao distanciamento máximo a percorrer e as Tabelas 10 e 11 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.011 - Adequar para edificação o número de escadas de emergência, em conformidade com o projeto aprovado no CBMDF, conforme Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.012 - Adequar para a edificação as distâncias máximas a percorrer para as edificações com chuveiros automáticos e sistema de detecção automática, de acordo com tabela 6 da Decisão Técnica 04/2021CSESCIP/CBMDF.",
					"05.013 - Adequar para a edificação o número de saídas de emergência, atendendo ao distanciamento máximo a percorrer e as Tabelas 10 e 11 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.014 - Adequar para a edificação o número de saídas de emergência, em conformidade com o Projeto de Incêndio aprovado no CBMDF, conforme o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.015 - Os acessos devem ter pé-direito mínimo de 2,50 m, com exceção de obstáculos representados por vigas, vergas de portas, e outros, cuja altura mínima livre deve ser de 2 m, de acordo com a alínea d do item 4.2.1.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.016 - Os acessos devem permanecer livres de quaisquer obstáculos, tais como móveis, divisórias móveis, locais para exposição de mercadorias, e outros, de forma permanente, mesmo quando o prédio esteja supostamente fora de uso, de acordo com o item 4.2.1.2 da NT 10/2015-CBMDF.  (Arts. 3º, III, a, e 6º, do Dec. 23.154/2002)",
					"05.017 - Adequar na edificação as portas do sistema de saídas de emergência, em conformidade com o projeto aprovado no CBMDF, conforme Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.018 - As portas das rotas de saída e aquelas das salas com capacidade acima de 50 pessoas e em comunicação com os acessos e descargas devem abrir no sentido do trânsito de saída, de acordo com o item 4.2.2.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.019 - As portas que conduzem às escadas ou rampas devem ser dispostas de modo a não diminuírem a largura efetiva de circulação destas, de acordo com o item 4.2.2.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.020 - As portas devem ter as dimensões mínimas de luz, de acordo com o item 4.2.2.3 da NT 10/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.021 - A colocação de fechaduras nas portas de acesso e descargas é permitida desde que seja possível a abertura pelo lado interno, sem necessidade de chave, admitindo-se que a abertura pelo lado externo seja feita apenas por meio de chave, dispensando-se maçanetas, neste caso o acesso à chave deve ser facilitado aos bombeiros, de acordo com o item 4.2.2.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.022 - As portas das rotas de saída que possuem sistemas de abertura automáticos devem possuir sistema antipânico, que em caso de falta de energia, pane ou defeito de seu sistema, mantenham as portas abertas, de acordo com o item 4.2.2.8.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.023 - As portas corta-fogo e as portas dimensionadas exclusivamente para saídas de emergência devem possuir a cor vermelha e serem sinalizadas conforme Norma Técnica específica, de acordo com o item 4.2.2.9.3 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.024 - As portas corta-fogo e as portas dimensionadas exclusivamente para saídas de emergência devem ser providas de dispositivos mecânicos e automáticos, de modo a permanecerem fechadas, mas destrancadas, no sentido do fluxo de saída, sendo admissível que se mantenham abertas, desde que disponham de dispositivo de fechamento, quando necessário, de acordo com o item 4.2.2.9.4 da NT 10/2015-CBMDF. (Arts. 3º, III, c, e 6º, do Decreto nº 23.154/2002)",
					"05.025 - As portas corta-fogo devem ser instaladas de forma a atender às premissas básicas de projeto, previstas em relação às frestas. As portas corta-fogo utilizadas em espaço pressurizado devem ter dispositivos de fechamento capazes de mantê-las fechadas, mesmo sob a ação do sistema de pressurização, de acordo com o item 4.2.2.9.5 da NT 10/2015-CBMDF.  (Arts. 3º, III, c, e 6º, do Decreto 23.154)",
					"05.026 - Em salas com capacidade acima de 200 pessoas e nas rotas de saída dos locais de reunião com capacidade acima de 200 pessoas, as portas de comunicação com os acessos, escadas e descarga devem ser dotadas de barras antipânico, de acordo com o item 4.2.2.10.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.027 - Quando utilizada, a barra antipânico deve ser o único meio existente na porta, para abri-la no sentido de fuga, de acordo com o item 4.2.2.10.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.028 - É vedada, no lado contrário ao sentido de fuga, a utilização de qualquer dispositivo ou mecanismo de travamento ou trancamento da porta que interfira no funcionamento normal da barra antipânico, de acordo com o item 4.2.2.10.3 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.029 - Adequar na edificação, a(s) escada(s), em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.030 - As escadas devem ter os pisos com condições antiderrapantes, e que permaneçam antiderrapantes com o uso, de acordo com a alínea g do item 4.3.1.1.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.031 - Os degraus devem ter espelhos, altura h, compreendidos entre 16 cm e 18 cm, de acordo com a alínea a do item 4.3.1.1.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.032 - Os degraus devem ter pisos, largura b, compreendidos entre 28 cm e 32 cm, de acordo com a alínea b do item 4.3.1.1.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.033 - Nos degraus as dimensões dos pisos devem ser constantes em toda a escada, de acordo com a alínea c do item 4.3.1.1.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.034 - As paredes das caixas de escadas, das guardas, dos acessos e das descargas devem ter acabamento liso, de acordo com a alínea a do item 4.3.1.1.10 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.035 - As caixas de escadas não podem ser utilizadas como depósitos, mesmo por curto espaço de tempo, nem para a localização de quaisquer móveis ou equipamentos, de acordo com a alínea b do item 4.3.1.1.10 da NT 10/2015-CBMDF. (Arts. 5º, b, e 6º, do Dec. 23.154/2002)",
					"05.036 - Nas caixas de escadas, não podem existir aberturas para tubulações de lixo, para passagem para rede elétrica, centros de distribuição elétrica, armários para medidores de gás e assemelhados, excetuadas as escadas não enclausuradas, de acordo com a alínea c do item 4.3.1.1.10 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.037 - A edificação deve possuir escada(s) enclausurada(s) protegida(s), de acordo com as Tabelas 10 e 11 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.038 - Adequar na edificação, a(s) escada(s) enclausurada(s) protegida(s), em conformidade com o projeto aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.039 - A(s) escada(s) enclausurada(s) protegida(s) devem ter portas corta-fogo P-60 no acesso à caixa de escada, e preferencialmente, dotadas de vidros aramados transparentes com 0,50 m² de área, no máximo, de acordo com a alínea b do item 4.3.1.6.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.040 - A(s) escada(s) enclausurada(s) protegida(s) deve(m) ser dotada(s) de janela ou alçapão de alivio de fumaça que permita a ventilação permanente em seu término superior, com área de abertura efetiva mínima de 1,00 m², podendo estar localizado na parede no teto ou no máximo a 15 cm deste, do término da escada, de acordo com a letra d do item 4.3.1.6.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.041 - A(s) escada(s) enclausurada(s) protegida(s) deve(m) possuir ventilação permanente inferior, com área de 1,20 m² no mínimo, no solo, podendo esta ventilação ser por veneziana na própria porta de saída do térreo ou em local conveniente da caixa da escada ou corredor da descarga, que permita a entrada de ar puro, em condições análogas à tomada de ar dos dutos de ventilação, de acordo com o item 4.3.1.8.4 da NT 10/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.042 - As janelas das escadas protegidas devem ter área de ventilação efetiva mínima de 0,80 m², em cada pavimento e caixilhos fixados na posição aberta quando do tipo basculante, sendo vedados os tipos de abrir com o eixo vertical e maxim ar, de acordo com as alíneas b e e do item 4.3.1.6.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.043 - A edificação deve possuir escadas(s) enclausurada(s) a prova de fumaça, de acordo com as Tabelas 10 e 11 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.044 - Adequar na edificação, a(s) escada(s) à prova de fumaça, em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.045 - A(s) escada(s) enclausurada(s) à prova de fumaça devem ter portas corta-fogo PF-60 no acesso à caixa de escada, de acordo com a letra b, do item 4.3.1.8.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.046 - O(s) acesso(s) à(s) antecâmara(s) da(s) escada(s) enclausurada(s) à prova de fumaça devem ter portas corta-fogo P-60, de acordo com a letra c, do item 4.3.1.8.3 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.047 - A edificação deve possuir escada(s) enclausurada(s) a prova de fumaça pressurizada, de acordo com as Tabelas 10 e 11 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.048 - Adequar na edificação, a(s) escada(s) à prova de fumaça pressurizada, em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.049 - A(s) escada(s) enclausurada(s) à prova de fumaça pressurizada quando dimensionada com antecâmara, devem ter portas corta-fogo PF-60 em seu acesso, e na comunicação com a caixa da escada portas corta-fogo P - 60, de acordo com a alínea a do item 4.3.1.10.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.050 - A(s) escada(s) enclausurada(s) à prova de fumaça pressurizada quando dispensada a antecâmara, devem ter portas corta-fogo PF-60 em seu acesso a caixa de escada, de acordo com a alínea b do item 4.3.1.10.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.051 - O conjunto moto-ventilador, para pressurização da escada, deve ser alojado em compartimento de uso exclusivo com caixa enclausurada por paredes resistentes ao fogo, com TRRF mínimo de 02 h, de acordo com a Norma Técnica específica, além de possuir em seu acesso porta corta-fogo PF-90, de acordo com a alínea “a” do item 4.3.1.10.3 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.052 - O conjunto moto - ventilador, para pressurização da escada, deve possuir antecâmara de segurança quando o compartimento estiver localizado no subsolo ou outro pavimento sob risco de captar a fumaça de um incêndio, sendo que a antecâmara deve ser dotada de porta corta-fogo P-90 na entrada e entre esta e o compartimento de porta corta-fogo PF-30, de acordo com a alínea b do item 4.3.1.10.3 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.053 - Os dutos de alvenaria podem ser utilizados, desde que somente para a distribuição do ar de pressurização e que sua superfície interna seja rebocada ou revestida com chapas metálicas, ou outro material incombustível, de modo a se obter uma superfície lisa e estanque a vazamentos, de acordo com a alínea i do item 4.3.1.10.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.054 - Considerando as diferentes condições a que é submetido o sistema de pressurização, deve ser previsto um dispositivo (damper de alívio mecânico ou eletrônico) que impeça que a pressão no interior da escada de segurança se eleve acima de 60 Pa, de acordo com a NBR 14880 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"05.055 - O sistema de pressurização deve ser acionado através de um sistema automatizado de detecção de fumaça e acionadores manuais de alarme em situação de emergência, de acordo com a alínea e do item 4.3.1.10.5 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.056 - Nos edifícios em que os detectores de fumaça forem instalados apenas para acionar o estado de emergência do sistema de pressurização, esses detectores devem ser posicionados nos halls de acesso à escada de segurança, de acordo com a alínea a do item 4.3.1.10.5 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.057 - A instalação dos detectores de fumaça dentro do espaço pressurizado (caixa de escada) não é aceitável, de acordo com a alínea b do item 4.3.1.10.5 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.058 - Um acionador manual do tipo “liga” deve ser sempre instalado na sala de controle central de serviços do edifício, no compartimento do ventilador de pressurização e na portaria ou guarita de entrada do edifício, de acordo com a alínea f do item 4.3.1.10.5 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.059 - A parada do sistema de pressurização, em situação de emergência, somente poderá ser realizada de modo manual no painel de controle dos ventiladores, de acordo com a alínea g do item 4.3.1.10.5 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.060 - Quando utilizado destravadores eletromagnéticos para portas corta-fogo, o seu circuito deve estar interligado, para ser acionado através da central de comando de detecção de incêndio e alarme. A porta deve ser destravada automaticamente no caso de alarme de incêndio ou falta de energia elétrica, de acordo com a alínea h do item 4.3.1.10.5 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.061 - Adequar na edificação a(s) rampa(s), em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.062 - Apresentar rampa na descarga e acesso dos elevadores de emergência, de acordo com a alínea a do item 4.3.2.1.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.063 - Apresentar rampa quando a altura a vencer for inferior a 0,48 m, já que são vedados lanços de escadas com menos de três degraus, de acordo com a alínea b do item 4.3.2.1.1 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.064 - Apresentar rampa quando a altura a ser vencida não permitir o dimensionamento equilibrado dos degraus de uma escada, de acordo com a alínea c do item 4.3.2.1.1 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.065 - Apresentar rampa para unir o nível externo ao nível do saguão térreo na edificação, de acordo com a alínea d do item 4.3.2.1.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.066 - As rampas não devem terminar em degraus ou soleiras, devendo ser precedidas e sucedidas sempre por patamares planos, de acordo com o item 4.3.2.1.3 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.067 - Não é permitida a colocação de portas em rampas, estas devem estar situadas sempre em patamares planos, com largura não inferior à da folha da porta de cada lado do vão, de acordo com o item 4.3.2.1.7 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.068 - As rampas devem ter os pisos com condições antiderrapantes, e que permaneçam antiderrapantes com o uso, de acordo com o item 4.3.2.1.10 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.069 - A edificação deve possuir elevador de emergência, de acordo com a Tabela 09 da NT 10/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.070 - Adequar na edificação, o(s) elevador(es) de emergência, em conformidade com o Projeto de Incêndio aprovado junto ao CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.071 - Os elevadores de emergência devem ter circuito de alimentação de energia elétrica com chave própria independente da chave geral do edifício, possuindo este circuito chave reversível no piso da descarga, que possibilite que ele seja ligado a um gerador externo na falta de energia elétrica na rede pública, de acordo com a alínea d do item 4.3.3.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.072 - A casa de máquinas deve ter porta corta-fogo PF - 90 em seu acesso, de acordo com a alínea f do item 4.3.3.2 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.073 - O painel de comando deve estar localizado no pavimento da descarga, de acordo com a alínea a do item 4.3.3.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.074 - O painel de comando deve possuir chave de comando de reversão para permitir a volta do elevador a este piso, em caso de emergência, de acordo com a alínea b do item 4.3.3.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.075 - O painel de comando deve possuir dispositivo de retorno e bloqueio dos carros no pavimento da descarga, anulando as chamas existentes, de modo que as respectivas portas permaneçam abertas, sem prejuízo do fechamento do vão do poço nos demais pavimentos, de acordo com a alínea c do item 4.3.3.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.076 - O painel de comando deve possuir duplo comando automático e manual reversível, mediante chamada apropriada, de acordo com a alínea d do item 4.3.3.6 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.077 - Adequar na edificação a(s) descarga(s), em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.078 - A edificação deve possuir área(s) de refúgio, de acordo com a Tabela 09 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.079 - Adequar na edificação a(s) área(s) de refúgio, em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.080 - Em escadas PFP, a área de refúgio deve ter portas corta-fogo PF-60 em seu acesso, e portas corta-fogo P-60 na comunicação com a caixa da escada quando posicionada em antecâmaras. Quando não posicionada em antecâmaras, ou seja, ligadas diretamente a caixa de escada, ter porta corta-fogo PF-60, de acordo com a alínea b do item 4.5.2 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.081 - Em escadas PF, a área de refúgio deve ter portas corta-fogo P-60 em seu acesso, e portas corta-fogo PF-60 na comunicação com a caixa da escada quando posicionada em antecâmaras. Quando não posicionada em antecâmaras, ou seja, ligadas diretamente a caixa de escada, ter porta corta-fogo PF-60, de acordo com a alínea c do item 4.5.2 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.082 - A área de refúgio deve ser delimitada por faixa amarela de 10 cm de largura, de acordo com a Norma Técnica específica de Sinalização de Segurança Contra Incêndio, de acordo com a alínea j do item 4.5.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.083 - A área de refúgio deve possuir equipamento de comunicação interno (tipo interfone), situado à no máximo 1,20 m de altura, ligado a central de alarme e/ou portaria da edificação, de acordo com a alínea k do item 4.5.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.084 - Instalar corrimão na(s) escada(s), de acordo com a alínea d do item 4.3.1.1.1 da NT 10/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.085 - Instalar corrimão na(s) rampa(s), de acordo com o item 4.3.2.1.8 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.086 - O(s) corrimão(s) deve(m) ser instalado(s) em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"05.087 - Para degraus isolados e escadas, a altura dos corrimãos deve ser de 0,80 cm a 0,92 cm do piso, medidos de sua geratriz superior, de acordo com o item 4.6.1.1 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.088 - Para rampas e opcionalmente para escadas, os corrimãos laterais devem ser instalados a duas alturas: 0,92 m e 0,70 m do piso, medidos da geratriz superior, de acordo com o item 4.6.1.2 da NT 10/2015CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.089 - Uma escada pode ter corrimãos em diversas alturas, além do corrimão principal na altura normal exigida; em escolas, jardins de infância e assemelhados, se for o caso, deve haver corrimãos nas alturas indicadas para os respectivos usuários, além do corrimão principal, de acordo com o item 4.6.1.3 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.090 - Os corrimãos devem ser projetados de forma a poderem ser agarrados fácil e confortavelmente, permitindo um contínuo deslocamento da mão ao longo de toda a sua extensão, sem encontrar quaisquer obstruções, arestas ou soluções de continuidade. Devem ter largura entre 38 mm e 45 mm, sendo preferencialmente de seção circular, de acordo com o item 4.6.1.4 da NT 10/2015-CBMDF. (Arts. 3º, III, h, e 6º, do Dec. 23.154/2002)",
					"05.091 - Os corrimãos devem estar afastados 4,0 cm da parede quando embutidos na parede, devem estar afastados 15,0 cm da face superior da reentrância, de acordo com o item 4.6.1.5 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.092 - Não são aceitáveis, em saídas de emergência, corrimãos constituídos por elementos com arestas vivas, tábuas largas, e outros, de acordo com o item 4.6.1.6 da NT 10/2015-CBMDF.  (Art. 3º, III, h, e 6º, do Dec. 23.154/2002)",
					"05.093 - Os corrimãos devem ser instalados em ambos os lados de degraus isolados, de escadas e de rampas, de acordo com o item 4.6.1.7 da NT 10/2015-CBMDF. Exceto quando em degraus isolados, escadas ou rampas com largura inferior a 1,00 m os corrimãos podem ser instalados em apenas um lado, de acordo com o item 4.6.1.8 da NT 10/2015 - CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.094 - Os corrimãos laterais devem ser contínuos, sem interrupção nos patamares das escadas ou rampas, de acordo com o item 4.6.1.9 da NT 10/2015-CBMDF.  (Arts. 3º, III, h, e 6º, do Dec. 23.154/2002)",
					"05.095 - As extremidades dos corrimãos devem ter acabamento recurvado, ser fixadas ou justapostas à parede ou piso, ou ainda ter desenho contínuo, sem protuberâncias, de acordo com o item 4.6.1.12 da NT 10/2015CBMDF. (Arts. 3º, III, h, e 6º, do Dec. 23.154/2002)",
					"05.096 - Escadas com mais de 2,40 m de largura devem ter corrimão intermediário, no máximo, a cada 1,80 m, de acordo com o item 4.6.1.13 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.097 - Os corrimãos intermediários, somente devem ser interrompidos quando o comprimento do patamar for superior a 1,40 m, garantindo o espaçamento mínimo de 0,80 m entre o término de um segmento e o início do seguinte, de acordo com o item 4.6.1.13 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.098 - As extremidades dos corrimãos intermediários devem ser dotadas de balaústres ou outros dispositivos para evitar acidentes, de acordo com o item 4.6.1.14 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.099 - Os materiais e exigências estruturais dos corrimãos, detalhes construtivos, instalação, entre outros itens, devem atender aos requisitos normativos previstos na NBR 9077 da ABNT, de acordo com o item 4.6.1.16 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.100 - Instalar guarda-corpo na(s) escada(s), de acordo com a alínea e do item 4.3.1.1.1 da NT 10/2015CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.101 - Instalar guarda-corpo na(s) rampa(s), de acordo com o item 4.3.2.1.8 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.102 - Os guarda-corpos devem ser instalados em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000.  (Art. 6º, do Dec. 23.154/2002)",
					"05.103 - Toda saída de emergência deve ser protegida de ambos os lados por paredes ou guardas (guarda-corpos) contínuas, sempre que houver qualquer desnível maior de 19 cm, para evitar quedas, de acordo com o item 4.6.2.1 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.104 - As escadas e rampas que não forem isoladas das áreas adjacentes por paredes devem dispor de guarda-corpo associado ao corrimão, de acordo com o item 4.6.2.2 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.105 - A altura mínima do guarda-corpo, considerada entre o piso acabado e a parte superior do peitoril, incluindo eventuais muretas deve ser de 1,05 m, de acordo com o item 4.6.2.3 da NT 10/2015-CBMDF.  (Art. 6º, do Dec. 23.154/2002)",
					"05.106 - A altura das guardas em escadas externas, de seus patamares, de balcões e assemelhados, quando a mais de 12,00 m acima do solo adjacente, deve ser de, no mínimo, 1,30 m, de acordo com o item 4.6.2.5 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.107 - As guardas constituídas por balaustradas, grades, telas e assemelhados, isto é, as guardas vazadas, devem ter balaústres verticais, grades, telas, vidros de segurança laminados ou aramados, de modo que uma esfera de 11 cm de diâmetro não possa passar por nenhuma abertura, de acordo com a alínea a do item 4.6.2.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.108 - Os guarda-corpos constituídos por perfis (do tipo gradil), a distância entre perfis (vão luz) não deve ser superior a 11 cm, de acordo com a alínea b do item 4.6.2.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.109 - Os guarda-corpos devem ser isentos de aberturas, saliências, reentrâncias ou quaisquer elementos que possam enganchar em roupas, de acordo com a alínea c do item 4.6.2.6 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.110 - É vedada a utilização, de componentes que facilitem a escalada por crianças (ornamentos e travessas que possam ser utilizados como degraus), de acordo com o item 4.6.2.7 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.111 - Os materiais e exigências estruturais dos guarda-corpos, detalhes construtivos, instalação, entre outros itens, devem atender aos requisitos normativos previstos na NBR 14718 da ABNT, de acordo com o item 4.6.2.8 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.112 - Os vidros utilizados como guarda-corpo devem ser de segurança, não estilhaçável, do tipo laminado ou aramado, de acordo com o item 4.6.3.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.113 - Deve ser instalada sinalização complementar nos vidros, e em qualquer elemento translúcido ou transparente, utilizados em esquadrias destinadas ao fechamento de vãos que fazem parte da rota de saída, de acordo com a Norma Técnica específica de sinalização de segurança contra incêndio, de acordo com o item 4.6.3.1 da NT 10/2015-CBMDF. (Arts. 3º, III,b, e 6º, do Dec. 23.154/2002)",
					"05.114 - As construções subterrâneas (ou subsolos) e as edificações sem janela, conforme conceito dado pela NBR 9077 da ABNT, devem atender o dimensionamento das saídas e escadas verificados na Tabela 11 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.115 - Instalar placa com a indicação da capacidade de público para local ou pavimento, de acordo com o projeto aprovado. A placa deverá ser fixada em local visível ao público e de tamanho compatível ao local, conforme Decisão Técnica 05/2021-CSESCIP/CBMDF - Fixação da população para fins de adequações das saídas de emergência das edificações existentes.",
					"05.116 - Instalar placa com a indicação da capacidade de público para a população exclusivamente para área de quadras poliesportivas sem arquibancadas, localizadas dentro das edificações com destinações escolares, única e exclusivamente para fins da prática esportiva, sendo proibida a ocupação/uso para fins ou atividade de concentração de público, de acordo com o projeto aprovado. A placa deverá ser fixada em local visível ao público e de tamanho compatível ao local, conforme Decisão Técnica 10/2021-CSESCIP/CBMDF - Cálculo da população exclusivamente para área de quadras poliesportivas.",
					"05.117 - Em qualquer edificação, os pavimentos sem saída em nível para o espaço livre exterior devem ser dotados de escadas, enclausuradas ou não, as quais devem atender a todos os pavimentos, acima e abaixo da descarga, mas terminando obrigatoriamente no piso desta, não podendo ter comunicação direta com outro lanço na mesma prumada, devendo ter compartimentação com resistência de 02 h ao fogo, na divisão entre os lanços ascendente e descendente em relação ao piso de descarga, exceto para escadas não enclausuradas, onde a interrupção deve ser apresentada por meio de sinalização de segurança contra incêndio e iluminação de emergência, de acordo com a alínea f do item 4.3.1.1.1 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.118 - A lógica do funcionamento do sistema de detecção de fumaça deve assegurar que todos os detectores instalados na edificação ativem o sistema de pressurização na presença de fumaça, exceto os posicionados no interior do compartimento dos ventiladores, que deve ter ação inversa, desligando ou mantendo inativo o sistema, de modo a não transferir a fumaça para o interior da escada. O comando destas operações deve partir da central de detecção e alarme, que deve monitorar todos os detectores instalados, de acordo com o item 6.7.11 da NBR 14.880/2014. (Art. 6º, do Dec. 23.154/2002)",
					"05.119 - As portas devem ter condições de serem abertas com um único movimento e suas maçanetas devem ser do tipo alavanca, instaladas a uma altura entre 0,90 m e 1,10 m, de acordo com o item 4.2.2.11.2 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"05.120 - Quando as portas forem providas de dispositivos de acionamento pelo usuário, estes devem estar instalados à altura entre 0,90 m e 1,10 m do piso acabado. Quando instalados no sentido de varredura da porta, os dispositivos devem distar entre 0,80 m e 1,00 m da área de abertura, de acordo com o item 4.2.2.11.4 da NT 10/2015-CBMDF. (Art. 6º, do Dec. 23.154/2002)",				
				],
				'006': [
					"06.001 - O sistema de hidrantes de parede deve ser instalado em conformidade com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.002 - O sistema de proteção por hidrantes de parede deve ser instalado em conformidade com o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"06.003 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de Responsabilidade Técnica - ART/RRT/TRT) de execução ou manutenção do sistema de hidrante de parede instalado, emitido por responsável técnico e visado no seu respectivo órgão de classe, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"06.004 - Os hidrantes de parede devem ser instalados de forma que a distância entre eles não seja maior que 30 m, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.005 - A altura de instalação do hidrante de parede deve estar entre 1,30 a 1,50 m medida da face superior do piso acabado ao eixo horizontal do registro de hidrante, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.006 - Os hidrantes de parede devem ser instalados de forma que haja, no mínimo, um hidrante por pavimento, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.007 - Os hidrantes de parede devem ser instalados de modo que qualquer ponto seja alcançado simultaneamente por duas linhas de mangueira de hidrantes distintos, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.008 - Os hidrantes de parede devem ser instalados em locais estratégicos de modo a evitar que em caso de incêndio fiquem bloqueados pelo fogo, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.009 - Os hidrantes de parede instalados em garagens, não podem estar localizados de forma que seu acesso fique dificultado por veículo estacionado, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.010 - Os abrigos dos hidrantes devem dispor no mínimo de mangueira de incêndio e um esguicho, de acordo com o a NT 04/2000-CBMDF. (Arts. 4º, d, e 6º, do Dec. 23.154/2002)",
					"06.011 - As mangueiras de incêndio devem estar acondicionadas de maneira que facilite o seu manuseio, de acordo com a NT 04/2000-CBMDF. (Arts. 3º, II, c, e 6º, do Dec. 23.154/2002)",
					"06.012 - O comprimento das linhas de mangueira deve ser de no máximo 30 m, dividido em duas mangueiras de 15m, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.013 - O diâmetro das mangueiras deve ser de no mínimo 38 mm, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.014 - Substituir ou manutenir as mangueiras de incêndio que se encontram danificadas, de acordo com a NBR 12779/04 da ABNT. (Arts. 3º, II, d, e 6º, do Dec. 23.154/2002)",
					"06.015 - A RTI - Reserva Técnica de Incêndio deve possuir capacidade, em litros de água, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.016 - O reservatório de água destinada à RTI - Reserva Técnica de Incêndio, deve ser resistente a 04 horas de fogo e superior, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.017 - O reservatório quando externo metálico ou de polietileno deve ter distanciamento mínimo de 03 m da edificação, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.018 - Apresentar reservatório superior ou apresentar dados que justifiquem a utilização de reservatório inferior, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.019 - A saída de consumo do reservatório superior deve sair lateralmente a esta, de forma a manter a RTI - Reserva Técnica de Incêndio, pela diferença do nível da canalização da saída e o fundo da caixa d’água, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.020 - A canalização do dreno de limpeza da caixa d'água deve ser metálica no mínimo até o registro.",
					"06.021 - A altura do reservatório elevado ou a capacidade das bombas deverá suprir a vazão e pressão mínima exigida, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.022 - Deve ser instalado no mínimo 02 bombas de incêndio, sendo uma principal e outra reserva ambas com as mesmas especificações, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.023 - Instalar válvula de retenção e derivação “by pass” na rede hidráulica de incêndio a fim de garantir o funcionamento do sistema por gravidade, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.024 - O conjunto de bombas de incêndio deve entrar em funcionamento automaticamente quando da utilização do sistema de hidrante de parede, de acordo com a NBR 13714/00 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.025 - As bombas de incêndio devem possuir instalação independente da rede elétrica geral, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.026 - Deve ser instalado dreno para teste de funcionamento das bombas de incêndio, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.027 - Instalar registro antes e depois das bombas e válvulas de retenção na saída das bombas para evitar refluxo de água no sistema, de acordo com a NBR 13714/00 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.028 - Instalar dois sistemas de alimentação podendo ser elétrico ou a explosão, sendo o último com combustível suficiente para funcionamento durante 02 horas, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.029 - As bombas de incêndio devem ser locadas em abrigo com dimensões mínimas de 1,50 x 1,50 x 1,50 m, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.030 - Os abrigos dos hidrantes não podem ser utilizados como depósitos de materiais estranhos ao sistema mesmo por curto espaço de tempo, de acordo com a NT 04/2000-CBMDF. (Arts. 5º, c, e 6º, do Dec. 23.154/2002)",
					"06.031 - O acesso ao abrigo deve possuir dimensões mínimas de 1,40 x 0,50 m, no caso de acesso por alçapão, este deve possuir dimensões mínimas de 0,70 x 0,70m, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.032 - Identificar o barramento de energia do conjunto de bombas de incêndio, de acordo com a NT 04/2000CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.033 - O quadro de comando das bombas deve ser instalado de maneira a não possuir ponto neutro, conforme a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.034 - O quadro de comando das bombas deve ser instalado na casa de bombas, conforme Anexo B da NBR 13714/2000 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.035 - O conjunto de bombas deve ser instalado de forma que na falha da bomba principal, a bomba reserva entre em funcionamento automaticamente, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.036 - As bombas de incêndio devem possuir dispositivos que possibilitem o acionamento manual, de acordo a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.037 - As bombas de incêndio devem funcionar manualmente, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.038 - As bombas de incêndio que não estiverem situadas abaixo do nível de tomada d'água (afogadas) devem ter um dispositivo de escorva automática, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.039 - O material utilizado nas canalizações, conexões e registros utilizados no sistema de hidrante devem ser de ferro fundido, galvanizado, aço galvanizado e cobre resistentes às pressões internas e esforços mecânicos, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.040 - Alterar o diâmetro da canalização (50 mm para A e B-1 e 63 mm para demais riscos), de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.041 - A canalização do barrilete deve ser um diâmetro nominal acima do diâmetro da canalização utilizada no sistema, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.042 - A canalização de incêndio aparente deve ser pintada na cor vermelha, de acordo com a NT 04/2000CBMDF. (Arts. 3º, II, g, e 6º, do Dec. 23.154/2002)",
					"06.043 - Quando da utilização de canalizações externa a edificação do tipo termoplástica estas devem ser enterradas a no mínimo 50 cm e resistentes às pressões internas e esforços mecânicos necessários ao funcionamento do sistema, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.044 - Instalar sinalização de piso dos hidrantes de parede locados em garagens, indústrias ou depósitos (quadrado vermelho 70 x 70 cm com moldura amarela de 15 cm), de acordo com a alínea I do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.045 - Os abrigos dos hidrantes devem ser pintados na cor vermelha, com dimensões suficientes para acomodar o registro, o esguicho e a mangueira, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.046 - Instalar hidrante de recalque, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.047 - Instalar adaptador e tampão de 2 e 1/2 pol., de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.048 - Locar o hidrante de recalque entre 01 e 10 m do meio-fio da via de acesso, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.049 - A caixa do hidrante de recalque deve ter as dimensões de 0,50 x 0,50 x 0,50 m, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.050 - O hidrante de recalque deve possuir válvula de retenção que possibilite o fluxo de água somente para o interior da edificação, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.051 - A tampa da caixa do hidrante de recalque deve ser de ferro com a inscrição INCÊNDIO e pintada na cor vermelha, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.052 - O registro do hidrante de recalque deve ficar no máximo a 15 cm de profundidade e ângulo de 45° de forma que facilite o engate da mangueira da viatura do CBMDF, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.053 - O hidrante de recalque localizado na fachada da edificação deve possuir fácil acesso e sinalização de modo a facilitar sua visualização, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.054 - Manutenir o hidrante de recalque que se encontra danificado de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.055 - A pressão na saída do requinte nos hidrantes deve ser entre 10 e 40 mca, de acordo com a NT 04/2000CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.056 - A vazão mínima no requinte deve estar de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.057 - O jato d’água deve atingir a uma distância mínima de 10 m, com o esguicho na posição horizontal a 01 m de altura, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.058 - Os abrigos dos hidrantes não podem ser fechados por chaves ou cadeados, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.059 - Os esguichos dos hidrantes de parede devem ser do tipo reguláveis de acordo com o a NT 04/2000CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.060 - Os registros dos hidrantes devem ser do tipo globo com adaptador para junta storz de 38 ou 63 mm, onde serão estabelecidas as linhas de mangueiras, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.061 - Manutenir os abrigos dos hidrantes de parede que se encontram danificados, de acordo com a NT 04/2000-CBMDF. (Arts. 3º, II, b, e 6º, do Dec. 23.154/2002)",
					"06.062 - Substituir ou manutenir esguichos, adaptadores ou engates, que se encontram danificados, de acordo com a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.063 - Apresentar memoriais descritivos e de cálculos do sistema de hidrantes de parede, de acordo com a IN 001/2021 - DESEG/CBMDF.",
					"06.064 - Instalar puxadores nas portas dos abrigos dos hidrantes de parede, de acordo com a NT 04/2000CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.065 - Retirar vazamentos do sistema de hidrantes de parede, conforme a NT 04/2000-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"06.066 - As mangueiras de incêndio devem ser do tipo compatível à destinação da edificação em conformidade ao item 4.1 da NBR 11861/98 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.067 - A mangueira deve ser identificada com o nome e/ou marca do fabricante, número da NBR 11861/98 da ABNT, tipo de mangueira, mês e ano de fabricação. Esta marcação deve ser indelével, em caracteres de 25 mm de altura mínima, iniciando à distância de 0,5 m a 1,4 m de cada extremidade da mangueira, em conformidade ao item 4.3 da NBR 11861/98 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.068 - Toda mangueira deve receber uma identificação individual, por meio de uma abraçadeira plástica numerada (tipo lacre) presa no corpo da mangueira, próximo à união, realizada por empresa capacitada, a partir de sua primeira inspeção, conforme item 4 da NBR 12779/09 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.069 - Deverá ser apresentado o último relatório válido de inspeção e de manutenção como documento comprobatório de aprovação da mangueira para uso em combate a incêndio, conforme item 4.9 da NBR 12779/09 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.070 - O certificado de inspeção e de manutenção deve ter como informações mínimas: identificação individual, fabricante, marca do duto flexível e uniões, diâmetro, comprimento, tipo, inspeção ou manutenção, data de execução, data da próxima inspeção e/ou manutenção, nome e assinatura do responsável pela inspeção e/ou manutenção, conforme item 4.7 da NBR 12779/09 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.071 - Deverá ser apresentado o certificado de inspeção da mangueira de incêndio, com validade máxima de seis meses, conforme item 4.1 da NBR 12779/09 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.072 - Deverá ser apresentado o certificado de manutenção da mangueira de incêndio, com validade máxima de doze meses, conforme item 4.1 da NBR 12779/09 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.073 - Os abrigos dos hidrantes não podem ser fechados por chaves ou cadeados, de acordo com a NT 04/2000-CBMDF, exceto quando empregados em locais sujeitos a vandalismo, eles podem ser fechados a chave, desde que existam meios que permitam o rápido acesso aos equipamentos no interior do abrigo em situação de emergência, conforme item 4.2.6 da NBR 16870/20 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.074 - As bombas de incêndio devem ser protegidas contra danos mecânicos, intempéries, agentes químicos, fogo ou umidade, de acordo com o anexo B, item 1.4 da ABNT NBR 13.714/2000 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"06.075 - As chaves elétricas de alimentação das bombas de incêndio devem ser sinalizadas com a inscrição “ALIMENTAÇÃO DA BOMBA DE INCÊNDIO - NÃO DESLIGUE”, de acordo com o item B.2.2 da ABNT NBR 13.714/2000. (Art. 6º, do Dec. 23.154/2002)",
				],
				'007': [
					"07.001 - O Sistema de Proteção contra Descargas Atmosféricas (SPDA) deve ser instalado em conformidade com a NBR 5419-3:2015 da ABNT. (Arts. 3º, II, h, e 6º, do Dec. 23.154/2002)",
					"07.002 - O sistema de proteção contra descargas atmosféricas (SPDA) deve ser instalado em conformidade o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"07.003 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de Responsabilidade Técnica - ART/RRT/TRT) de execução do sistema de Proteção contra Descargas Atmosféricas instalado, emitido por responsável técnico e visado no seu respectivo órgão de classe, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"07.004 - Apresentar o laudo de continuidade e aterramento elétrico do Sistema de Proteção contra Descargas Atmosféricas (SPDA) da edificação (estruturas contendo munição ou explosivos, ou em locais expostos à corrosão atmosféricas severa ou ainda estruturas pertencentes a fornecedores de serviços considerados essenciais (energia, água, sinais, etc), com validade máxima de 01 ano e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.005 - Apresentar o laudo de continuidade e aterramento elétrico do Sistema de Proteção contra Descargas Atmosféricas (SPDA) da edificação, com validade máxima de 03 anos e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.006 - Aterrar todas as massas metálicas da cobertura ao SPDA, conforme a NBR 5419:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.007 - O dimensionamento do módulo da malha de captação deve estar de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.008 - Para coberturas de sapé ou palha onde não sejam utilizadas barras de aço para sustentação do material, a distância entre os condutores do subsistema de captação e o material deve ser maior que 0,15 m. Para outros materiais combustíveis, 0,10 m, conforme NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.009 - A cobertura metálica de chumbo deve ter espessura mínima de 2,0 mm, de acordo com a NBR 5419- 3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.010 - A cobertura metálica de aço (inoxidável, galvanizado a quente) deve ter espessura mínima de 0,5 mm, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.011 - A cobertura metálica de titânio deve ter espessura mínima de 0,5 mm, de acordo com a NBR 5419- 3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.012 - A cobertura metálica de cobre deve ter espessura mínima de 0,5 mm, de acordo com a NBR 5419- 3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.013 - A cobertura metálica de alumínio deve ter espessura mínima de 0,65 mm, de acordo com a NBR 5419- 3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.014 - A cobertura metálica de zinco deve ter espessura mínima de 0,7 mm, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.015 - Dividir o sistema de captação da edificação, classificada no nível de proteção I, em módulos de malha de 05 x 05 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.016 - Dividir o sistema de captação da edificação, classificada nos níveis de proteção II, em módulos de malha de 10 x 10 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.017 - Dividir o sistema de captação da edificação, classificada nos níveis de proteção III, em módulos de malha de 15 x 15 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.018 - Dividir o sistema de captação da edificação, classificada no nível de proteção IV, em módulos de malha de 20 x 20 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.019 - Para SPDA não isolado, o número de condutores de descida não pode ser inferior a dois, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.020 - O espaçamento máximo entre os condutores de descidas da edificação, classificada nos níveis de proteção I e II, deve ser de 12 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.021 - O espaçamento máximo entre os condutores de descidas da edificação, classificada no nível de proteção III, deve ser de 18 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.022 - O espaçamento máximo entre os condutores de descidas da edificação, classificada no nível de proteção III, deve ser de 20 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.023 - O espaçamento máximo entre os condutores de descidas da edificação, classificada no nível de proteção IV, deve ser de 24 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.024 - O espaçamento máximo entre os anéis condutores horizontais da edificação, classificada nos níveis de proteção I e II, deve ser de 10 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.025 - O espaçamento máximo entre os anéis condutores horizontais da edificação, classificada no nível de proteção III, deve ser de 15 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.026 - O espaçamento máximo entre os anéis condutores horizontais da edificação, classificada no nível de proteção IV, deve ser de 20 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.027 - Manter os condutores de descida a uma distância mínima de 10 cm de paredes formadas por material combustível, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.028 - Uma conexão de ensaio deve ser fixada em cada condutor de descida, exceto no caso de condutores de descidas naturais combinados com os eletrodos de aterramento natural (pela fundação), de acordo com a NBR 5419-3:2015. (Art. 6º, do Dec. 23.154/2002)",
					"07.029 - Os eletrodos de aterramento em anel devem ser instalados a uma profundidade mínima de 0,50 m, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.030 - Os eletrodos de aterramento devem ser instalados externamente ao volume a proteger a uma distância mínima de 1,0 m das paredes externas, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.031 - Não pode ser utilizado como eletrodos de aterramento materiais em alumínio, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.032 - Fixar os condutores flexíveis (cabos e cordoalhas) do SPDA a uma distância máxima de 1,0 m, de acordo com a NBR 5419-3:2015. (Art. 6º, do Dec. 23.154/2002)",
					"07.033 - Fixar os condutores rígidos (fitas e barras) do SPDA a uma distância máxima de 1,5 m, de acordo com a NBR 5419-3:2015. (Art. 6º, do Dec. 23.154/2002)",
					"07.034 - Não são permitidas emendas em cabos de descida, exceto o conector para ensaios, o qual é obrigatório, a ser instalado próximo do solo (a altura sugerida é 1,5 m a partir do piso) de modo a proporcionar fácil acesso para realização de ensaios.",
					"07.035 - A secção mínima dos materiais de cobre destinados à captação e condutores de descida deve ser de 35 mm², de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.036 - A secção mínima dos materiais de alumínio destinados à captação e condutores de descida deve ser de 70 mm², de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.037 - A secção mínima dos materiais de aço cobreado IACS 30% destinados à captação e condutores de descida deve ser de 50 mm², de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.038 - A secção mínima dos materiais de alumínio cobreado IACS 64% destinados à captação e condutores de descida deve ser de 50 mm², de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.039 - A secção mínima dos materiais de aço galvanizado a quente destinados à captação e condutores de descida deve ser de 50 mm², de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.040 - A secção mínima dos materiais de aço inoxidável destinados à captação e condutores de descida deve ser de 50 mm², de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.041 - A secção mínima dos eletrodos de aterramento de cobre deve ser de 50 mm² para eletrodos não cravados e de 15mm para eletrodos cravados, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.042 - A secção mínima dos eletrodos de aterramento de aço galvanizado à quente deve ser de 70 mm² para eletrodos não cravados e de 16mm para eletrodos cravados, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.043 - A secção mínima dos eletrodos de aterramento de aço cobreado deve ser de 70 mm² para eletrodos não cravados e de 12,7mm para eletrodos cravados, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.044 - A secção mínima dos eletrodos de aterramento de aço inoxidável deve ser de 100 mm² para eletrodos não cravados e de 15mm para eletrodos cravados, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.045 - A área de seção reta mínima dos condutores que interligam diferentes barramentos de equipotencialização (BEP ou BEL) ou que ligam essas barras ao sistema de aterramento deve ser de 16 mm² para cobre não enterrado e de 50mm² para cobre enterrado, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.046 - A área de seção reta mínima dos condutores que interligam diferentes barramentos de equipotencialização (BEP ou BEL) ou que ligam essas barras ao sistema de aterramento deve ser de 25 mm² para alumínio não enterrado, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.047 - A área de seção reta mínima dos condutores que interligam diferentes barramentos de equipotencialização (BEP ou BEL) ou que ligam essas barras ao sistema de aterramento deve ser de 50 mm² para aço galvanizado a fogo não enterrado e de 80mm² para aço galvanizado a fogo enterrado, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.048 - Dimensionar a distância mínima entre os condutores descida e quaisquer portas e janelas, conforme a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.049 - A(s) caixa(s) de inspeção do SPDA - Sistema de Proteção contra Descargas Atmosféricas deve ser instalada em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"07.050 - A(s) caixa(s) de inspeção do SPDA - Sistema de Proteção contra Descargas Atmosféricas devem ser instaladas conforme a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.051 - A secção mínima dos materiais deve estar de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.052 - Deve ser garantida a continuidade elétrica entre as diversas partes que compõem as estruturas, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.053 - As conexões devem ser feitas de forma segura e por meio de solda elétrica ou exotérmica e conexões mecânicas de pressão (se embutidas, em caixa de inspeção) ou compressão, de acordo com a NBR 5419-3:2015 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"07.054 - Remover o captor radioativo do Sistema de Proteção Contra Descargas Atmosféricas, conforme a Resolução nº 04, de 19 de abril de 1989 da Comissão Nacional de Energia Nuclear (CNEN). (Para obter informações sobre os procedimentos para retirada e destinação adequada a serem dados ao captor entrar em contato com CNEN - 3433-6300)"
				],
				'008': [
					"08.001 - A central de GLP da edificação/estabelecimento deve ser instalada em conformidade com a NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.002 - A central de GLP da edificação/estabelecimento deve ser instalada em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o item 5.2.4 da NT 05/2021-PARTE I-CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"08.003 - Apresentar ao Agente Fiscalizador o laudo do teste de estanqueidade do sistema de alimentação, distribuição e armazenamento de Gás Liquefeito de Petróleo (GLP) da edificação/estabelecimento, juntamente com documento de responsabilidade técnica de sua realização, visado no seu respectivo órgão de classe, de acordo com a NT 05/2021-PARTE I-CBMDF. O referido laudo poderá possuir validade máxima de 05 anos, podendo variar para menos em função de riscos decorrentes das situações construtivas, das condições ambientais e de uso. No caso de troca da empresa fornecedora de gás, troca de componentes, alteração da rede de alimentação ou constatação de desgastes críticos deve ser realizado teste de estanqueidade pneumático com 0,7 MPa mínimo, de acordo com os itens 5.23.1 e 5.23.2 da NBR 13523/2019 da ABNT e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.004 - Apresentar documento de responsabilidade técnica de execução da Central de GLP instalada, emitido por profissional e visada no seu respectivo órgão de classe, de acordo com o item 5.1.5 da NT 05/2021-PARTE ICBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.005 - Em estabelecimentos comerciais que determinem uma única área destinada exclusivamente para centrais GLP para atendimento de vários clientes, o projeto deve sempre estar atualizado e contemplar todas as centrais e os recipientes instalados em área exclusiva. A atualização da ART/RRT deve ser emitida a cada nova central adicionada, considerando todas as centrais e recipientes existentes, conforme item 5.3.16 da NBR 13523/19 da ABNT e itens 1.1, 2.3, 5.1.3, 5.2.4 e 5.2.6 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.006 - As centrais para transferência de GLP para recipientes transportáveis montados em empilhadeiras ou equipamentos industriais movidos a motores de combustão interna devem ser instalados em conformidade com projeto de incêndio aprovado no CBMDF, conforme item 5.20 da NBR 13523/19 da ABNT e itens 1.1, 2.3, 5.1.3 e 5.2.4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.007 - Construir o abrigo dos recipientes da central de GLP em material não inflamável e que ofereça proteção física aos recipientes e seus complementos, de acordo com o item 4.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.008 - Prover a central de GLP de abertura para ventilação natural nas paredes laterais, tanto na parte superior quanto inferior, com área mínima de 10% de sua planta baixa, ou 0,32 m² para as aberturas inferiores e 0,32 m² para as superiores (adotar o que for maior), de acordo com o item 6.3.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.009 - O piso da central de GLP deve ser de material incombustível devendo ficar em nível igual ou superior ao do piso circundante com declividade que garanta escoamento para fora da projeção, não sendo permitida a instalação em rebaixos e recessos, de acordo com o item 6.3.7 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.010 - Os recipientes da central de GLP não podem ser instalados uns sobre os outros, e devem obedecer aos distanciamentos definidos em tabela, de acordo com o item 6.3.16 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.011 - A central de GLP com recipientes estacionários de superfície ou o local de instalação dos vaporizadores, sempre que tiver possibilidade de acesso de público ao local, deve ser protegida por meio de cerca de tela de arame ou outro material incombustível, com no mínimo 1,8 m de altura, que não interfira na ventilação, contendo portão de no mínimo 1 m de largura abrindo para fora. Adicionalmente, quando a distância a ser percorrida até atingir a saída for maior que 25 m deve-se ter portões adicionais em lados diagonais opostos ou locados nas extremidades do lado de maior de comprimento, com a cerca de proteção obedecendo os afastamentos mínimos indicados na tabela 1, de acordo com os itens 6.3.4 e 6.3.5 da NT 05/2021-PARTE ICBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.012 - O perímetro do local onde recipientes enterrados e aterrados estiverem instalados deve estar cercado por estacas e correntes para posicionamento e identificação. A área delimitada não pode ser utilizada para outros fins nem recoberta por qualquer tipo de material combustível, de acordo com o item 6.3.6 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.013 - Instalar a cerca de proteção da central de GLP de recipientes estacionários com capacidade individual do recipiente de até 10 m³ com afastamento mínimo de 1,0 m, medido da superfície do recipiente à cerca, de acordo com a tabela 1 e itens 6.3.4 e 6.3.5 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.014 - Instalar a cerca de proteção da central de GLP de recipientes estacionários com capacidade individual do recipiente acima de 10 m³ até 20 m³ com afastamento mínimo de 1,5 m, medidos da superfície do recipiente à cerca, de acordo com a tabela 1 e itens 6.3.4 e 6.3.5 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.015 - Instalar a cerca de proteção da central de GLP de recipientes estacionários com capacidade individual do recipiente acima de 20 m³ até 120 m³ com afastamento mínimo de 3,0 m, medidos da superfície do recipiente à cerca, de acordo com a tabela 1 e itens 6.3.4 e 6.3.5 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.016 - Instalar a cerca de proteção da central de GLP de recipientes estacionários com capacidade individual do recipiente acima de 120 m³ com afastamento mínimo de 7,5 m, medidos da superfície do recipiente à cerca, de acordo com a tabela 1 e itens 6.3.4 e 6.3.5 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.017 - No sistema de central de GLP deve ser instalado registro de corte na rede de alimentação, registro de corte no início da tubulação de distribuição em cada prumada e registro de corte para o ponto de consumo, de acordo com o item 5.1.4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.018 - Proteger fisicamente os recipientes, os vaporizadores e tubulações aparentes, com muretas, pilares ou outra barreira de proteção mecânica com altura mínima de 0,6 m e distância não inferior 1m, nos locais onde estão sujeitos a danos originados por circulação de veículos ou outros, de acordo com o item 6.3.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.019 - Em edificações que possuem uma área destinada exclusivamente para várias centrais de GLP, instalar os recipientes em abrigo resistente ao fogo TRRF 2h, dispostos lado a lado e com afastamento mínimo, considerando a capacidade total da somatória de todos recipientes conforme respectiva tabela, até o máximo de 10 m³, de acordo com o item 5.2.6 e item 6.3.8 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.020 - Não é permitido o armazenamento de quaisquer objetos não pertencentes à central de GLP em seu interior ou em sua área delimitada, em especial vegetação seca ou material combustível, de acordo com o item 6.3.13 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.021 - Os recipientes transportáveis da central predial de GLP não podem ser fixados, de forma que impossibilite a sua remoção em situação de emergência, através do fechamento da válvula de serviço e desconexão ao coletor, de acordo com o item 6.3.14 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.022 - A parede resistente ao fogo deve possuir resistência mecânica e ao fogo por 02 h, sem aberturas, de altura igual à dos recipientes não podendo ser inferior a 1,8 metros, devendo ficar posicionada entre 1 e 3 metros do ponto mais próximo dos recipientes, de acordo com o item 6.7.1 e 6.7.2 e figura 07 da NT 05/2021- PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.023 - Não é requerido o aterramento elétrico dos recipientes transportáveis e tubulação da central. Para os recipientes estacionários, o aterramento deve estar de acordo com as ABNT NBR 5410 e ABNT NBR 5419 partes 1 a 3, conforme item 5.11.1 da NBR 15523/19 da ABNT e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.024 - O ponto de utilização (ponto de consumo) deve conter válvula de bloqueio manual e ser identificado com a palavra 'GÁS'. A identificação deve ser realizada de forma permanente conforme item 7.9 da NBR 15526/12 da ABNT e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.025 - A central predial de GLP deve ser prevista e executada com emprego de material não inflamável, com paredes e teto com tempo de resistência ao fogo de no mínimo 2h, e estar situada no exterior das edificações, em locais com ventilação natural, ao nível do logradouro público, obedecendo aos afastamentos mínimos definidos nas tabelas 3 e 4, de acordo com o item 5.2.5 e item 6.3.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.026 - Na impossibilidade técnica de se respeitar os afastamentos normativos para instalação da central de GLP fora da projeção vertical da edificação, instalar a central em nicho, de acordo com o item 6.3.10 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.027 - A central em nicho deve ser instalada na fachada da edificação voltada para a via pública ou corredor lateral com largura mínima de 1 metro e ventilação natural permanente, ter área mínima adequada para comportar até no máximo dois recipientes P-190 ou quatro recipientes P-45, porém nunca inferior a 1 m², ter paredes e teto construídos em material resistente ao fogo TRRF 2 h e que isolem o ambiente interior da edificação, possuir porta metálica que evite o contato com os recipientes e permita a ventilação mínima necessária, e possuir ventilação permanente para a área externa, com áreas mínimas de 0,32 m² na parte inferior e 0,32 m² na parte superior, de acordo com o item 6.3.11 e 6.3.12 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.028 - Instalar a central de GLP para recipientes estacionários de superfície de 0,5 m³ a 02 m³ com afastamento de 1,50 m da projeção horizontal da edificação ou divisa de propriedades, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.029 - Instalar a central de GLP para recipientes estacionários de superfície de 2 m³ a 5,50 m³ com afastamento de 03 m da projeção horizontal da edificação ou divisa de propriedades, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.030 - Instalar a central de GLP para recipientes estacionários de superfície de mais de 5,5 m³ a 08 m³ com afastamento de 7,50 m da projeção horizontal da edificação ou divisa de propriedades, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.031 - Instalar a central de GLP para recipientes estacionários de superfície de 8 m³ a 120 m³ com afastamento de 15 m da projeção horizontal da edificação ou divisa de propriedades, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.032 - Instalar a central de GLP para recipientes estacionários de superfície de mais de 120 m³ com afastamento de 22,5 m da projeção horizontal da edificação ou divisa de propriedades, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.033 - Instalar a central de GLP para recipientes estacionários enterrados ou aterrados de até 8 m³ com afastamento de 3 m da projeção horizontal da edificação ou divisa de propriedades, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.034 - Instalar a central de GLP para recipientes estacionários enterrados ou aterrados de mais de 8 m³ com afastamento de 15 m da projeção horizontal da edificação ou divisa de propriedades, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.035 - Instalar a central de GLP para recipientes estacionários de até 5,5 m³ com afastamento de 3 m de passeio público, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.036 - Instalar a central de GLP para recipientes estacionários de mais de 5,5 m³ até 8 m³ com afastamento de 7,5 m de passeio público, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.037 - Instalar a central de GLP para recipientes estacionários de mais de 8 m³ até 120 m³ com afastamento de 15 m de passeio público, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.038 - Instalar a central de GLP para recipientes estacionários de mais de 120 m³ com afastamento de 22,5 m de passeio público, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.039 - Instalar, na central de GLP para recipientes estacionários, de mais de 2 m³ até 8 m³, os cilindros com afastamento mínimo de 1 m entre eles, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.040 - Instalar, na central de GLP para recipientes estacionários, com mais de 8 m³ até 120 m³, os cilindros com afastamento mínimo de 1,5 m entre eles, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.041 - Instalar os cilindros, na central de GLP para recipientes estacionários de mais de 120 m³, com afastamento mínimo entre eles de ¼ da soma dos diâmetros adjacentes, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.042 - Instalar a central de GLP para recipientes transportáveis agrupados maiores de 2 m³ a 3,5 m³ com afastamento de 1,50 m da divisa de propriedades ou edificações, de acordo com a tabela 4 da NT 05/2021- PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.043 - Instalar a central de GLP para recipientes transportáveis agrupados maiores de 3,5 m³ a 5,5 m³ com afastamento de 3,0 m da divisa de propriedades ou edificações, de acordo com a tabela 4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.044 - Instalar a central de GLP para recipientes transportáveis agrupados maiores de 5,5 m³ a 8,0 m³ com afastamento de 7,5 m da divisa de propriedades ou edificações, de acordo com a tabela 4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.045 - Instalar a central de GLP para recipientes transportáveis agrupados maiores de 8 m³ a 10 m³ com afastamento de 15 m da divisa de propriedades ou edificações, de acordo com a tabela 4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.046 - Instalar a central de GLP para recipientes transportáveis agrupados de até 8 m³ com afastamento de 3 m de passeio público, de acordo com a tabela 4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.047 - Instalar a central de GLP para recipientes transportáveis agrupados de 8 m³ a 10 m³ com afastamento de 15 m de passeio público, de acordo com a tabela 4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.048 - A central de GLP de recipiente estacionário abastecido no local ou trocável de até 0,5 m³ deve obedecer ao afastamento mínimo de 1,0 m de aberturas em nível inferior, abaixo da válvula de segurança, de acordo com a tabela 03 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.049 - A central de GLP de recipiente estacionário abastecido no local maior que 0,5 m³ deve obedecer ao afastamento mínimo de 1,5 m de aberturas em nível inferior, abaixo da válvula de segurança, de acordo com a tabela 03 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.050 - A central de GLP deve obedecer ao afastamento mínimo de 1,8 m da projeção no plano horizontal da rede elétrica de menos de 0,6 kV de acordo com a tabela 5 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.051 - A central de GLP deve obedecer ao afastamento mínimo de 3,0 m da projeção no plano horizontal da rede elétrica de 0,6 kV até 23 kV, de acordo com a tabela 5 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.052 - A central de GLP deve obedecer ao afastamento mínimo de 7,5 m da projeção no plano horizontal da rede elétrica de mais de 23 kV, de acordo com a tabela 5 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.053 - A central de GLP com recipientes trocáveis de até 0,5 m³ deve obedecer ao afastamento de 1,5 m de fontes de ignição (inclusive veículos e cerca elétrica) e de rampas de acesso ao subsolo, outras aberturas (portas e janelas) e materiais combustíveis, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.054 - A central de GLP com recipientes abastecidos no local deve obedecer ao afastamento de 3,0 m de fontes de ignição (inclusive veículos e cerca elétrica) e de rampas de acesso ao subsolo, outras aberturas (portas e janelas) e materiais combustíveis, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.055 - A central de GLP deve obedecer ao afastamento mínimo de 6,0 m de produtos tóxicos, perigosos, inflamáveis, chama aberta e ponto de captação de ar forçado, de acordo com a tabela 3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.056 - Utilizar tubos e conexões para execução da rede de distribuição em conformidade com os itens 5.3.2 e 5.3.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.057 - A tubulação para a rede de distribuição interna deve ser identificada através de pintura na cor amarela, contudo, nas fachadas dos edifícios, as tubulações podem ser pintadas na cor da fachada, porém na tubulação deverá conter a cada 5 m lineares a palavra 'GÁS' aposta de forma indelével e legível a pelo menos 3 metros de distância, e nas garagens e áreas comuns dos prédios, a tubulação deve ser pintada na cor amarela e ser identificada, quando aparente, com a palavra 'GÁS' aposta de forma indelével e legível a pelo menos 3 metros de distância, de acordo com o item 6.5.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.058 - A tubulação para a rede de alimentação deve ser identificada através de pintura na cor laranja para recipientes transportáveis, e laranja, ou branca com conexões em laranja, para recipientes estacionários, de acordo com o item 6.4.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.059 - A rede de distribuição não poderá passar em locais sem ventilação, tais como forros falsos, pisos falsos ou outros locais que possam favorecer o acúmulo do GLP em caso de vazamento, acarretando dessa forma em risco de explosão, de acordo com o item 6.5.2 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.060 - A rede de distribuição não poderá ser instalada em poço de elevador, depósito de combustível inflamável, compartimento de equipamento ou dispositivo elétrico (painés elétricos, subestação, etc), cisterna e reservatório de água, duto em atividade (ventilação de ar condicionado, exaustão, chaminés, etc.), de acordo com o item 6.5.6 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.061 - A canalização aparente deverá ter afastamento mínimo de 30 mm de condutores de eletricidade de baixa tensão protegidos por eletrodutos não metálicos paralelos e 10 mm de condutores perpendiculares (nesses caso com material isolante aplicado na tubulação de gás), 50 mm de condutores de eletricidade de baixa tensão sem eletrodutos ou protegidos por eletrodutos metálicos paralelos ou perpendiculares (nesse caso a instalação elétrica deve ser protegida por eletroduto numa distância de 50mm para cada lado e atender à recomendação para sistemas elétricos de potência em eletrodutos em cruzamentos), conforme a tabela 2 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.062 - A canalização não deve possuir dobras quando em tubos rígidos conforme item 7.2.1 da NBR 15526/12 da ABNT e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.063 - Envelopar com camada de concreto (argamassa de cimento e areia), de no mínimo 3,0 cm de espessura, a canalização que estiver embutida em paredes de alvenaria ou qualquer outro local que não possua plena estanqueidade, de acordo com o item 6.5.4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.064 - No caso em que seja imprescindível que a rede de distribuição interna passe por espaços fechados, as tubulações devem ser conduzidas pelo interior de dutos ventilados (tubo luva), com as seguintes características: possuir no mínimo duas aberturas para a atmosfera, localizadas fora da edificação, em local seguro e protegido contra a entrada de água, animais e outros objetos estranhos; ter resistência mecânica adequada à sua utilização; ser estanques em toda a sua extensão, exceto nos pontos de ventilação; e ser protegidos contra corrosão, de acordo com o item 6.5.9 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.065 - Quando a tubulação da rede de distribuição embutida atravessar elementos estruturais (lajes, vigas etc.), seja transversal ou longitudinal, deverá ser garantido que não haja contato entre a tubulação embutida e esses elementos estruturais, de forma a evitar tensões inerentes à estrutura da edificação sobre a tubulação de acordo com o item 6.5.5 e figura 04 (tubo-luva) da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.066 - A tubulação da rede de distribuição de GLP não pode estar fixada, amarrada, apoiada a outras tubulações existentes, de condução de água, vapor ou outros e nem a instalações elétricas, de acordo com o item 6.5.7 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.067 - Instalar registro de corte no ponto de consumo, conforme item 5.1.4 da NT 05/2021-PARTE ICBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.068 - As tubulações para condução do GLP em fase líquida não podem passar no interior das edificações, exceto nos abrigos para os recipientes e outros equipamentos pertencentes à central predial de GLP, com exceção permitida aos processos industriais específicos que utilizem o GLP na fase líquida, de acordo com o item 6.4.2 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.069 - Os medidores de consumo devem respeitar as condições de ventilação e abrigo de forma a evitar o acúmulo de gás eventualmente vazado e protegido contra choque mecânico, corrosão e intempéries, de acordo com o item 6.6 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.070 - Retirar os medidores individuais de consumo da central de GLP instalados em escadas e seus patamares conforme o item 6.6.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.071 - Os medidores de consumo de um pavimento devem estar adequadamente agrupados. A localização de um grupo de medidores deve ser semelhante para todos os pavimentos, devendo os grupos homólogos serem alimentados por uma única prumada, de acordo com o item 6.6.2 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.072 - Os medidores de consumo da central de GLP devem estar instalados entre 0,30 m a 1,50 m do piso acabado, de acordo com o item 6.6.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.073 - As cabines dos medidores de consumo e caixa de proteção, quando instaladas em ambientes ventilados, deverão ser providas de aberturas de ventilação, na parte inferior, para permitirem o escoamento do gás proveniente de eventuais vazamentos, com área de abertura mínima equivalente a 1/10 da área da planta baixa do compartimento, de acordo com o item 6.6.4 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.074 - As cabines localizadas nos pavimentos, em local sem possibilidade de ventilação permanente, devem possuir porta que evite o vazamento para o local ambiente da instalação, e devem ser ventiladas através de aberturas na parte superior e inferior no interior da cabine, comunicando diretamente com o exterior da edificação, ou conectadas a um duto vertical de ventilação adjacente comunicando as extremidades diretamente com o exterior da edificação, estes com a menor dimensão igual ou superior a 7 cm, de acordo com o item 6.6.5 e figura 6 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.075 - Instalar 01 aparelho extintor portátil com capacidade 20B na central de até 270 kg de GLP, de acordo com a tabela 04 da NT 03/2015 e NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.076 - Instalar 02 aparelhos extintores portáteis com capacidade 20B cada na central de mais de 271 kg de GLP, de acordo com a tabela 04 da NT 03/2015 e NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.077 - Instalar proteção por sistema de hidrantes na central de GLP com recipiente de superfície com capacidade individual igual ou superior a 10m³, e menor ou igual a 60 m³, de acordo com o item 6.9.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.078 - Instalar proteção por sistema de chuveiros automáticos na central de GLP com recipiente de superfície com capacidade individual superior a 60 m³, de acordo com o item 6.9.2 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.079 - Os sistemas de proteção por hidrantes e por chuveiros automáticos da central de GLP devem ter vazão e pressão dimensionadas de acordo com o item 6.9.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.080 - A sinalização da central de GLP deve estar visível de qualquer direção: PERIGO, INFLAMÁVEL, PROIBIDO FUMAR, de acordo com o item 6.2 da NT 22/2020-CBMDF e item 6.3.15 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.081 - Instalar na central de GLP sinalização alertando que somente pessoas autorizadas devem ter acesso a mesma, de forma a possibilitar sua visualização em qualquer direção de acesso à mesma, de acordo com o item 6.10.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.082 - Instalar na central de GLP placa de sinalização indicando a quantidade total de tanques fixos, bem como a capacidade máxima individual dos tanques em litros ou metros cúbicos e em quilogramas, ou ainda, a quantidade total de recipientes transportáveis, bem como a capacidade máxima individual de cada tipo, em quilogramas, de acordo com o item 6.2 da NT 22/2020-CBMDF e item 6.3.15 da NT 05/2021-PARTE ICBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.083 - Identificar a central de GLP, nas edificações em que houver mais de uma central predial de GLP, pelo nome fantasia do estabelecimento que serve, exposto em placa com dimensão mínima de 25 cm x 50 cm, de acordo com o item 6.3.9 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.084 - O ponto de utilização (ponto de consumo) deve ser identificado com a palavra 'GÁS'. A identificação deve ser realizada de forma permanente conforme item 7.9 da NBR 15526/12 da ABNT e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.085 - É proibida a instalação de recipientes de GLP em locais confinados, como porão, garagem subterrânea, forro, etc, conforme item 5.3.1 da NBR 13523/2019 e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.086 - Instalar central de GLP nas edificações/estabelecimentos de destinação comercial, uma vez que não é permitida a utilização de recipientes P-13 para fornecimento de GLP para fins comerciais, de acordo com o item 6.2, 6.2.1 e 6.2.2 da NT 05/2021-PARTE I-CBMDF. Na impossibilidade técnica de instalação da central de GLP, apresentar recurso ao Diretor de Vistorias solicitando a isenção da instalação, anexando laudo técnico elaborado por profissional habilitado comprovando a impossibilidade. (Art. 6º, do Dec. 23.154/2002)",
					"08.087 - Em estabelecimentos que fazem uso de GLP para fins comerciais, no impedimento técnico para instalação de central de GLP, instalar no máximo 03 recipientes de GLP do tipo P-13, não interligados, dotados de válvula redutora de pressão, mangueiras revestidas por malha de aço, sistema de detecção para vazamento de GLP e situados em área com boa ventilação natural que impossibilite o acúmulo de gás em caso de vazamento, acordo com o item 6.2.2 e 6.2.3 da NT 05/2021-PARTE I-CBMDF. Não é permitido o acúmulo ou armazenamento de recipientes cheios, parcialmente cheios ou vazios na edificação/estabelecimento. (Art. 6º, do Dec. 23.154/2002)",
					"08.088 - Nas situações em que a edificação seja enquadrada por norma específica quanto à obrigatoriedade do uso de instalação predial para consumo de GLP que, entretanto, venha a utilizar o referido gás para abastecimento de ponto isolado, como copas, cozinhas particulares não industriais, utilizar uma carga máxima de 13 kg (treze quilogramas) de GLP, limitada a um ponto de consumo em toda a edificação com altura máxima de 12 m (doze metros). Nestes casos o recipiente com GLP deve estar situado, em áreas com ventilação natural e que não possibilitem o acúmulo do gás em caso de vazamento, de acordo com o item 6.1 da NT 05/2021- PARTE I-CBMDF. Não é permitido o acúmulo ou armazenamento de recipientes cheios, parcialmente cheios ou vazios na edificação/estabelecimento. (Art. 6º, do Dec. 23.154/2002)",
					"08.089 - Retirar da edificação/estabelecimento os recipientes de GLP que estão sendo utilizados, uma vez que a mesma possui central de GLP. Todos os pontos de consumo de edificações dotadas de instalação predial para consumo de GLP deverão ser abastecidos por esta, independentemente de quaisquer outras características construtivas ou destinação, de acordo com o item 5.3.1 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"08.090 - Retirar da edificação/estabelecimento os recipientes de GLP que estão sendo utilizados, uma vez que a mesma não foi projetada para o uso de GLP, de acordo com o item 5.1.6 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
				],
				'009': [
					"09.001 - O sistema de detecção automática e alarme manual de incêndio deve ser instalado em conformidade com a NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.002 - O sistema de detecção automática e alarme manual de incêndio deve ser instalado em conformidade com o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"09.003 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de Responsabilidade Técnica - ART/RRT/TRT) de execução ou manutenção do sistema de detecção automática e alarme manual de incêndio instalado, emitido por profissional e visado no seu respectivo órgão de classe, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Art. 16, § 5º, doDecreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"09.004 - O sistema de alarme manual de incêndio deve ser instalado em conformidade com a NT 23/2022CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.005 - O sistema de alarme manual de incêndio deve ser instalado em conformidade com o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"09.006 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de Responsabilidade Técnica - ART/RRT/TRT) de execução ou manutenção do sistema de alarme manual de incêndio instalado, emitido por profissional e visado no seu respectivo órgão de classe, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"09.007 - A manutenção e conservação dos sistemas de detecção e alarme de incêndio serão de responsabilidade do proprietário e/ou do usuário, devendo ser contratados profissionais ou empresas, com responsabilidade técnica emitida por órgão competente, para execução desse serviço, de acordo com o item 5.6.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.008 - Os equipamentos a serem empregados no sistema devem possuir documentação técnica aprovada por autoridade certificadora, conforme item 5.3.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.009 - Quando for dimensionado o sistema de detecção e alarme de incêndio com emprego de componentes conectados por radiofrequência RF, além da certificação de conformidade com norma específica, o fabricante deverá informar os limites de utilização e limites funcionais do sistema, tais como configuração, número de componentes capazes de se conectarem com uma estação base e outros, de acordo com o item 5.3.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.010 - A central deve ser localizada em áreas de fácil acesso e supervisionadas, tais como: salas de controle, salas de segurança, portaria principal ou entrada de edifícios, de acordo com o item 5.4.1 da NT 23/2022CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.011 - Na ausência de vigilância permanente da Central após o período de ocupação da edificação, torna-se necessário que a central tenha monitoramento local ou remoto, de acordo com o item 5.4.1 da NT 23/2022CBMDF.",
					"09.012 - No caso de equipamentos com baterias externas, as mesmas devem ser instaladas junto à central, em área abrigada e ventilada, para evitar acúmulo de gases tóxicos e corrosivos, de acordo com o item 5.4.2 da NT 23/2022-CBMDF.",
					"09.013 - Para as edificações onde não exista obrigatoriedade do dimensionamento do sistema de detecção e alarme de incêndio ou quando este for apresentado ou proposto como solução técnica alternativa, pode ser utilizada a instalação em ambientes específicos, atendendo-se às demais exigências de dimensionamento previstas nas normas aplicáveis, de acordo com o item 5.4.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.014 - Os acionadores manuais devem ser dimensionados de forma que a distância máxima a ser percorrida por uma pessoa, em qualquer ponto da área protegida até o acionador manual mais próximo, não seja superior a 30 metros, considerando que haja necessariamente um acionador manual distante no máximo 05 metros das saídas de emergência (portas, escadas) dos pavimentos e/ou da edificação, de acordo com o item 5.5.1.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.015 - Os acionadores manuais devem ser instalados a uma altura de 0,90m a 1,35m do piso acabado até a base inferior do respectivo componente, podendo ser embutido ou sobreposto à parede, de acordo como o item 5.5.1.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.016 - Nas edificações com mais de um pavimento, deve ser previsto pelo menos um acionador manual em cada pavimento. Os mezaninos estarão dispensados desta exigência, quando o acionador manual do pavimento em que os mesmos estejam localizados, promover atendimento para a área do mezanino, de acordo com o item 5.5.1.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.017 - Os avisadores sonoros e/ou visuais devem ser instalados em quantidade e posição que permitam sua visualização e/ou audição, permitindo em qualquer ponto do ambiente no qual estão instalados, nas condições normais de trabalho deste ambiente, a comunicação verbal próxima do local de instalação, de acordo com o item 5.5.2.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.018 - Os avisadores sonoros instalados nos estabelecimentos assistenciais de saúde, devem ter o alcance do alarme sonoro restrito ao setor de acionamento, limitado por uma área compartimentada ou corredor ou nível de assistência pelo período compreendido entre 1 e 2 minutos, durante o sinal de primeiro alarme. Após esse tempo os demais avisadores serão automaticamente acionados ou inibidos por controle na central do sistema, no estágio de primeiro alarme, de acordo com o item 5.5.2.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.019 - Os avisadores devem ser instalados a uma altura do piso acabado de 2,2 m a 3,5 m, de forma embutida ou sobreposta, preferencialmente na parede, de acordo com o item 5.5.2.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.020 - Nos locais de reunião de público, tais como: casas de show, de apresentações musicais, de espetáculos diversos, boates, danceterias, salões de festas, similares e em ambientes onde o nível sonoro ultrapasse 105dB, será obrigatória também a instalação de avisadores visuais, quando houver a exigência do sistema de detecção ou de alarme, de acordo com o item 5.5.2.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.021 - O dimensionamento dos detectores pontuais de fumaça instalados no teto em uma altura máxima de 8 metros (pé direito) em relação ao piso do ambiente deverá seguir o estabelecido no item 5.5.3, de acordo com o item 5.5.3.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.022 - A área de cobertura estabelecida para detectores pontuais de fumaça instalados nos tetos dos ambientes em função de eventual desnível apresentado em vigas abaixo da laje, deve seguir a indicação da Tabela 01 - Área máxima de cobertura detector de fumaça, de acordo com o item 5.5.3.2 da NT 23/2022CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.023 - O afastamento máximo permitido entre detectores pontuais de fumaça em função da largura de suas áreas de cobertura deve seguir a indicação da Tabela 02 - Distância máxima entre detector de fumaça pela largura a proteger, de acordo com o item 5.5.3.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.024 - Os detectores pontuais de fumaça, quando localizados no teto, devem estar distantes no mínimo 0,15 m da parede lateral ou vigas. Em casos justificados, os detectores podem ser instalados na parede lateral, a uma distância entre 0,15 m e 0,30 m do teto, desde que garantido o tempo de resposta do sistema, de acordo com o item 5.5.3.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.025 - Para a distribuição de detectores pontuais de fumaça em tetos inclinados, com ventilação na cumeeira, deve-se locar uma fileira de detectores, no máximo a 0,9 m da cumeeira, acrescentando-se a seguir a quantidade de detectores necessária, baseando as medidas na projeção horizontal do teto, de acordo com o item 5.5.3.5 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.026 - Em entrepisos e entreforros deve-se evitar a instalação de detectores pontuais de fumaça em pontos onde a velocidade do ar seja superior à citada na especificação documentada pelo fabricante dos detectores, de acordo com o item 5.5.3.6 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.027 - O dimensionamento dos detectores pontuais de temperatura instalados no teto em uma altura máxima de 5 metros (pé direito) em relação ao piso do ambiente deverá seguir o estabelecido no item 5.5.4, de acordo com o item 5.5.4.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.028 - Os detectores pontuais de temperatura devem ser empregados em ambientes com presença de materiais, cuja característica no início da combustão é gerar muito calor e pouca fumaça, devendo-se considerar a temperatura do teto do ambiente para a seleção da temperatura nominal do detector, de acordo com o item 5.5.4.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.029 - A área de cobertura estabelecida para detectores pontuais de temperatura instalados nos tetos dos ambientes em função de eventual desnível apresentado em vigas abaixo da laje, deve seguir a indicação da Tabela 03 - Área máxima de cobertura detector de temperatura, de acordo com o item 5.5.4.3 da NT 23/2022CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.030 - O afastamento máximo permitido entre detectores pontuais de temperatura em função da largura de suas áreas de cobertura, deve seguir a indicação da Tabela 04 - Distância máxima entre detector de temperatura pela largura a proteger, de acordo com o item 5.5.4.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.031 - Os detectores pontuais de temperatura quando localizados no teto, devem estar distantes no mínimo 0,15 m da parede lateral ou vigas. Em casos justificados, os detectores podem ser instalados na parede lateral, a uma distância entre 0,15 m e 0,30 m do teto, desde que garantido o tempo de resposta do sistema, de acordo com o item 5.5.4.5 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.032 - Os detectores de chama são autorizados em ambientes nos quais não haja pontos encobertos onde uma possível chama possa ser gerada na área protegida, de acordo com o item 5.5.5.1 da NT 23-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.033 - O máximo alcance do detector de chama se encontra no eixo de um cone imaginário. Para demais áreas protegidas no cone, até um limite de 45° do eixo, deve ser prevista uma redução da distância de cobertura ou acrescentados mais detectores de chama, conforme especificação do detector. Esta redução de sensibilidade nos extremos do campo de visão (45°) do detector de chama deve ser de 50 % do valor no eixo do cone, quando não definido na especificação do detector, conforme indicação da Figura 01 - Alcance dos detectores de chama, de acordo com o item 5.5.5.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.034 - Os detectores lineares de fumaça devem ser posicionados preferencialmente com seus feixes de luz projetados em direção paralela e longitudinal ao teto, e próximo das saídas de ar do ambiente, de acordo com o item 5.5.6.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.035 - A distância entre o detector linear de fumaça e o plano do teto deve atender às especificações documentadas pelo fabricante e, caso não definida, deve-se adotar entre 0,3m e 1,0m, levando em consideração as características do teto, estratificação e ventilação, de acordo com o item 5.5.6.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.036 - A distância entre o emissor e o receptor/refletor não pode exceder a máxima distância citada nas especificações documentadas pelo fabricante, porém nunca ultrapassar 100 m, de acordo com o item 5.5.6.3 da NT 23/2022-CBMDF.",
					"09.037 - A distância entre os feixes de luz de dois detectores lineares de fumaça adjacentes não pode exceder a máxima distância citada nas especificações documentadas do fabricante dos detectores e não pode ultrapassar 15 m, de acordo com o item 5.5.6.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.038 - Os detectores lineares de fumaça próximos às paredes devem ser instalados a uma distância de até a metade da máxima distância definida no item 5.5.6.4 e não pode ultrapassar 7,5m de acordo com o item 5.5.6.5 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.039 - Normalmente o emissor é instalado em uma parede e o receptor/refletor na parede oposta. Entretanto, em ambientes com até oito trocas de ar por hora, é permitida instalá-los em um ponto rígido, a uma distância da parede de até 1/4 da máxima distância definida no item 5.4.4.6, e eles não podem ultrapassar 3,75 m, de acordo com o item 5.5.6.6 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.040 - Os tubos e as conexões da tubulação da detecção de fumaça por amostragem de ar devem ser instalados de forma fixa, de modo a garantir que o ar amostrado entre somente pelos orifícios projetados para proteção do ambiente (pontos de amostragem), de acordo com o item 5.5.7.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.041 - A tubulação de amostragem da detecção de fumaça por amostragem de ar deve ser claramente identificada a cada 3 m, com o texto “Detecção de incêndio - Tubo de amostragem”, de acordo com o item 5.5.7.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.042 - Os tubos de amostragem da detecção de fumaça por amostragem de ar devem ser rígidos, podendo ser de cobre, latão, PVC, CPVC ou outro material permitido pelas especificações documentadas e cálculos do fabricante do detector por amostragem de ar, de acordo com o item 5.5.7.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.043 - Os tubos de amostragem da detecção de fumaça por amostragem de ar devem ser unidos por conexões do mesmo material dos tubos, de forma estanque e sem deformação na temperatura máxima do local de instalação, de acordo com o item 5.5.7.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.044 - Os tubos de amostragem da detecção de fumaça por amostragem de ar quando fabricados em PVC ou CPVC, devem ser instalados suportes rígidos no máximo a cada 1,50 m para evitar a deformação, de acordo com o item 5.5.7.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.045 - Todo sistema de detecção e alarme de incêndio deve ter duas fontes de alimentação. A principal deve ser a rede do sistema elétrico que alimenta a edificação, e a auxiliar (reserva) é constituída por baterias, nobreak ou gerador, de acordo com o item 5.7.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.046 - A comutação da fonte de alimentação deve ser automática entre a fonte de energia principal e a reserva, no caso de falha da fonte de alimentação em uso, de acordo com o item 5.7.2 da NT 23/2022. (Art. 6º, do Dec. 23.154/2002)",
					"09.047 - Quando a fonte de alimentação reserva for constituída por bateria de acumuladores ou nobreak, esta deve ter autonomia mínima de 24 horas em regime de supervisão, sendo que no regime de alarme deve ser de, no mínimo, 15 minutos para suprimento das indicações sonoras e/ou visuais ou o tempo necessário para o abandono da edificação, de acordo com o item 5.7.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.048 - Quando a alimentação auxiliar for por gerador, também deve ter os mesmos parâmetros de autonomia mínima, 24 horas em regime de supervisão e 15 minutos para suprimento das indicações sonoras e/ou visuais ou o tempo necessário para o abandono da edificação, de acordo com o item 5.7.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.049 - O dimensionamento do sistema com emprego de componentes comunicados por RF seguirá os mesmos parâmetros estabelecidos nos itens 5.5 e 6, quando aplicáveis, a menos que expressamente estabelecido em certificado de conformidade reconhecido correspondente, de acordo com o item 5.8 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.050 - Nos ambientes com desnível superior a 8 m entre o teto e o piso, os detectores pontuais de fumaça devem ser instalados em níveis intermediários de no máximo 8 m entre eles. Recomenda-se a instalação de coletores de fumaça com área mínima de 900 cm², em todos os detectores pontuais de fumaça localizados nos níveis intermediários, de acordo com o item 6.1.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.051 - Cada ambiente deve ser protegido em toda a sua área pelo mesmo tipo de detector. Não é permitido atender ao dimensionamento previsto para proteger parte de um ambiente com detectores de fumaça e a parte restante com detectores térmicos ou outros tipos, de acordo com o item 6.1.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.052 - Em locais de armazenamento com prateleiras com altura superior a 8 m recomenda-se a distribuição de detectores pontuais de fumaça nas prateleiras em níveis variados, acima e abaixo do nível médio em relação à altura de instalação dos detectores no teto, de acordo com o item 6.1.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.053 - Em ambientes dotados de sistemas de ar-condicionado ou ventilação forçada, a instalação dos detectores pontuais de fumaça deve respeitar um afastamento mínimo de 1,50 m, a partir da borda dos pontos de insuflamento ou entrada de ar no ambiente, de acordo com o item 6.1.4 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.054 - Em locais com teto plano de altura superior a 5 m, o espaçamento entre detectores pontuais de temperatura deve ser reduzido seguindo a indicação da tabela 05 - Relação entre altura de instalação e distância entre detectores, sendo permitidas interpolações para alturas intermediárias, de acordo com o item 6.2.1.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.055 - O detector linear de fumaça a ser instalado em locais cujo comprimento do ambiente a ser protegido seja maior que a máxima distância entre emissor e receptor/refletor definida no item 5.5.6.3, devem ser instalados dois ou mais detectores lineares de fumaça alinhados e complementares, de forma a proteger integralmente o ambiente. Nesse caso a distância entre as extremidades dos feixes de luz de dois detectores complementares deve ser inferior a 1/4 da máxima distância entre feixes de luz definida em 5.5.6.6 e não pode exceder 3,75 m, de acordo com o item 6.3.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.056 - Nos locais cuja área a ser protegida for maior que 50 % da área coberta por um único detector linear de fumaça, devem ser instalados no mínimo dois detectores lineares de fumaça, de acordo com o item 6.3.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.057 - Nas centrais supervisoras de detecção e alarme é obrigatório conter um painel/esquema ilustrativo indicando a localização com identificação dos acionadores manuais e/ou detectores dispostos na área da edificação, respeitadas as características técnicas da central. Esse painel pode ser substituído por um display da central que indique a localização do acionamento, de acordo com o item 6.4.1 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.058 - Quando houver edificações ou áreas protegidas por subcentral, esta deverá estar interligada à central supervisora, emitindo sinal simultâneo de alarme, podendo o alarme geral ser soado somente na edificação ou área protegida pela subcentral, mas emitindo sinal de pré-alarme para a central. O alarme geral para toda a edificação será soado caso, em 2 minutos, não sejam tomadas medidas de ação junto à central supervisora, de acordo com o item 6.4.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.059 - Para os meios de transmissão por rádio frequência, deve-se ter imunidade à atenuação do local (degradação do sinal de rádio frequência), ou seja, o fabricante deve fornecer meios, seja no componente em si ou por meio de configuração do sistema, para garantir que uma atenuação local, que possa ser causada por influências de diversas razões, não afete adversamente o meio de transmissão por rádio frequência de forma que a comunicação entre os componentes não seja possível, de acordo com o item 6.5.1 da NT 23/2022CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.060 - A perda da capacidade do sistema de transmitir uma mensagem de qualquer componente com um meio de transmissão por rádio frequência para o Equipamento de Controle e Indicação dentro de períodos especificados na NBR ISO 7240-2 deve ser reconhecida em menos de 300 s e deve ser indicada em menos de 100s, de acordo com o item 6.5.2 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.061 - Qualquer componente com comunicação por rádio frequência deve ser concebido de tal forma que a remoção da sua base e/ou de seu ponto de instalação seja detectado e indicado como uma falha, de acordo com o item 6.5.3 da NT 23/2022-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.062 - Em locais com elevada concentração de pessoas, o alarme geral pode ser substituído por um sinal sonoro (pré-alarme) apenas na sala de segurança, junto à central, para evitar o pânico, para um acionamento prévio da brigada de incêndio na verificação do sinal de pré-alarme, de acordo com o item 6.6 da NT 23/2022CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.063 - Em locais com elevada concentração de pessoas, a central deve possuir um temporizador para o acionamento posterior do alarme geral, com tempo de retardo de, no máximo 2 minutos, caso não sejam tomadas as ações necessárias para verificar o pré-alarme da central, de acordo com o item 6.6.1 da NT 23/2022CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"09.064 - Quando a edificação de ocupação e uso garagens (Grupos 26) possuir subsolos, a partir do 3º pavimento subsolo será obrigatório os sistemas de detecção de incêndio e chuveiros automáticos, de acordo com a Decisão Técnica 12/2021-CSESCIP/DESEG/CBMDF.",
					"09.065 - Instalar alarme de incêndio para edificação de ocupação e uso escolares (Grupos: 13, 14, 16 e 17) quando a altura da edificação for superior a 9 m ou área superior a 750 m², de acordo com a Decisão Técnica 14/2021-CSESCIP/DESEG/CBMDF.",
					"09.066 - Toda a rede de eletrodutos aparentes do sistema de detecção automática e alarme manual de incêndio deve ser identificada com anéis de 02 cm de largura mínima, na cor vermelha, a cada 03 m no máximo, e cada eletroduto deve possuir no mínimo uma identificação, de acordo com o item 6.7.10 da NBR 17240/10 da ABNT. (Art. 6º, do Dec. 23.154/2002)",
					"09.067 - Os detectores pontuais de fumaça devem estar localizados no teto, distantes no mínimo 0,15m da parede lateral ou vigas. Em casos justificados, os detectores podem ser instalados na parede lateral, a uma distância entre 0,15m à 0,30m do teto, desde que garantido o tempo de resposta do sistema, de acordo com o item 5.4.1.2 da NBR 17.240/2010. (Art. 6º, do Dec. 23.154/2002)",
					"09.068 - Os detectores pontuais de temperatura devem estar localizados no teto, distantes no mínimo 0,15m da parede lateral ou vigas. Em casos justificados, os detectores podem ser instalados na parede lateral, a uma distância entre 0,15m à 0,30m do teto, desde que garantido o tempo de resposta do sistema, de acordo com o item 5.4.2.2 da NBR 17.240/2010. (Art. 6º, do Dec. 23.154/2002)", 
				],
				'010': [
					"10.001 - O sistema de chuveiros automaticos deve ser instalado em conformidade com a NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.002 - O sistema de chuveiros automáticos deve ser instalado em conformidade com o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"10.003 - Apresentar documento de responsabilidade técnica (Anotação, Registro ou Termo de Responsabilidade Técnica - ART/RRT/TRT) de execução ou manutenção do sistema de chuveiros automáticos instalado, emitido por profissional e visado no seu respectivo órgão de classe, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"10.004 - A manutenção e conservação dos sistemas de proteção contra incêndio por chuveiros automáticos são de responsabilidade do proprietário ou do usuário, devendo ser contratados profissionais ou empresas credenciadas pelo CBMDF, com responsabilidade técnica emitida por órgão competente, para execução desse serviço, de acordo com o item 5.18 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.005 - A mínima pressão operacional em qualquer chuveiro automático deve ser de 48 kPa, de acordo com o item 5.4 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.006 - Nas edificações onde houver exigência da instalação do sistema de chuveiros automáticos, o dimensionamento deve ser aplicado a todas as áreas da edificação, observadas as exceções dos itens 5.9.1, 5.10, 5.11 e 5.11.1 da NT 13/2021-CBMDF, de acordo com o item 5.9 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.007 - As subestações de energia elétrica, instaladas no interior de edificações, abrigadas em ambiente compartimentado, com estrutura resistente a 4 horas de fogo e acesso por portas corta fogo resistente a 120 minutos, poderão ter neste ambiente, o sistema de chuveiros automáticos substituído pelo sistema de detecção automática, de acordo com o item 5.9.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.008 - A instalação de chuveiros automáticos em edificações onde não exista obrigatoriedade do dimensionamento do sistema ou quando este for apresentado ou proposto como solução técnica alternativa, deverá atender às demais exigências de dimensionamento previstas nas normas aplicáveis, de acordo com o item 5.10 da NT/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.009 - É obrigatório a instalação de chuveiros automáticos em casa de máquinas, casa de bombas de incêndio, sala de gerador e similares, onde haja exclusivamente equipamentos elétricos energizados, ou substituíção por outros sistemas automáticos de combate a incêndio, de acordo com o item 5.11 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.010 - As áreas destinadas a equipamentos de tecnologia da informação localizadas no interior das edificações e superiores a 40 m2 deverão ser protegidas por chuveiros automáticos. Quando limitada a 40 m2, com compartimentação entre essas áreas e os ambientes adjacentes, o sistema pode ser substituído pela instalação de outros sistemas automáticos de combate a incêndio, de acordo com o item 5.11.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.011 - Para o correto funcionamento o sistema deve conter no mínimo os seguintes componentes: reservatório d'água, conjunto de bombas, linha com dispositivos de automatização, válvula de governo e alarme, conexão de teste de alarme, tomada de recalque, tubulações e chuveiros automáticos, de acordo com o item 5.12 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.012 - A área máxima de proteção da coluna principal por pavimento, para o Risco Leve, deve ser de 4.800 m² para pavimento projetado hidraulicamente ou por tabela, de acordo com a tabela 2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.013 - A área máxima de proteção da coluna principal por pavimento, para os Riscos Ordinário I e II, deve ser de 4.800 m² para pavimento projetado hidraulicamente ou por tabela, de acordo com a tabela 2 da NT 13/2021- CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.014 - A área máxima de proteção da coluna principal por pavimento, para os Riscos Extraordinários I e II será de 3.700 m² para pavimento projetado hidraulicamente e 2.300 m² se projetado por tabela, de acordo com a tabela 2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.015 - Para as edificações de múltiplos pavimentos, a tubulação geral deve dispor de conexão setorial para dreno, ensaio e alarme em cada pavimento, de acordo com o item 5.15 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.016 - Nas edificações com apenas um pavimento, a conexão de teste de alarme deve ser instalada nas tubulações gerais, de acordo com o item 5.15.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.017 - Deve ser considerado os limites de temperatura ambiente esperados na altura de instalação do chuveiro automático no teto para ocupação, relacionando-os com as temperaturas nominais de operação dos chuveiros automáticos de acordo com os limites de temperatura e cor do líquido do bulbo de vidro previsto na tabela 3, de acordo com o item 5.16 da NT 13/2021 - CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.018 - A distância máxima permitida entre os chuveiros automáticos tipo spray de cobertura padrão deve estar de acordo com o valor indicado na Tabela 4, considerando o risco e demais características, de acordo com o item 6.1.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.019 - A distância máxima permitida entre os chuveiros automáticos tipo spray de cobertura estendida, deve estar de acordo com o valor indicado na Tabela 5, considerando o risco e demais características, de acordo com o item 6.1.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.020 - A distância máxima permitida entre os chuveiros automáticos de desempenho específico, deve estar de acordo com o valor indicado na tabela 6, considerando o risco e demais características, de acordo com o item 6.1.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.021 - A distância dos chuveiros automáticos em relação às paredes adjacentes não deve ser superior à metade da distância permitida entre os chuveiros automáticos conforme indicado nas tabelas 4, 5 e 6, de acordo com o item 6.1.2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.022 - A distância mínima entre chuveiros automáticos tipo spray não deve ser inferior a 1,8 m, ampliando-se este afastamento à 2,4 m quando se tratar de chuveiros de desempenho específico, de acordo com o item 6.1.3 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.023 - Quando não for possível preservar o afastamento mínimo, deve ser prevista a utilização de barreiras incombustíveis na metade da distância dos chuveiros automáticos, capazes de proteger os elementos termossensíveis durante a operação dos chuveiros, de acordo com o item 6.1.4 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.024 - O desnível entre os defletores dos chuveiros automáticos e o teto, forro, laje, telhado ou cobertura acima, deve ser observado visando as melhores condições de acionamento do chuveiro automático, de acordo com as distâncias constantes na tabela 7 - Distância dos chuveiros automáticos tipo spray à cobertura (Up Right ou Pendente), conforme item 6.1.5 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.025 - Para alcançar os melhores resultados de acionamento, os chuveiros do tipo CCAE (Chuveiro de Controle para Aplicação Especifica), devem ser posicionados abaixo da cobertura de acordo com os dados da tabela 8 - Distância dos chuveiros automáticos tipo CCAE à cobertura, de acordo com o item 6.1.6 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.026 - A capacidade de vazão do chuveiro automático, fundamental para a determinação do desnível destes dispositivos em relação à cobertura acima deles, definida pelo fator K de cada chuveiro do tipo ESFR (chuveiro de resposta e supressão rápidas), deve ser observada conforme os índices da Tabela 9 - Distância dos chuveiros automáticos tipo ESFR à cobertura, de acordo com o item 6.1.7 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.027 - Os chuveiros automáticos laterais, tipo spray, face às condições de descarga e demandas de ativação, devem observar afastamentos em relação à cobertura acima e à parede na qual estão montados, obedecendo aos valores da tabela 10 - Distância dos chuveiros automáticos tipo spray Side Wall (Lateral), exemplificado por meio da figura 3, de acordo com o item 6.1.8 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.028 - O desnível do defletor acima do obstáculo deve respeitar os afastamentos da tabela 11 - Distância vertical dos chuveiros automáticos a objetos situados abaixo, para minimizar a ocorrência de obstruções à descarga dos chuveiros automáticos, causadas por objetos ou elementos, de acordo com o item 6.1.9 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.029 - O desnível do defletor acima do obstáculo deve respeitar os afastamentos da Tabela 12 - Posição do chuveiro spray em relação a uma obstrução sobre o piso (H), para minimizar a ocorrência de obstruções à descarga dos chuveiros automáticos, causadas por objetos ou elementos, de acordo com o item 6.1.9 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.030 - O desnível do defletor quando o obstáculo estiver noteto, com sua face inferior abaixo do defletor do chuveiro automático, deve ser observado o afastamento previsto na tabela 13, de acordo com o item 6.1.10 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.031 - A área máxima de cobertura permitida para um chuveiro automático deve respeitar os valores estabelecidos em norma para cada tipo de chuveiro automático, sendo obtido conforme ilustrado na Figura 4, de acordo com o item 6.1.11 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.032 - A construção do ambiente (envoltório) ou reservatório que abrigue o volume da reserva técnica de incêndio deve ser em concreto armado, alvenaria ou metálico. Poderão ser utilizados outros materiais na construção, desde que se garanta as resistências ao fogo, mecânicas e a intempéries, de acordo com o item 6.2.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.033 - A resistência ao fogo do ambiente ou reservatório do sistema deve ser no mínimo de 4 horas, de acordo com o item 6.2.1.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.034 - O acesso ao interior do ambiente do reservatório deve ser limitado por porta corta fogo com resistência de 2 horas, de acordo com o item 6.2.1.2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.035 - O sistema de proteção por chuveiros automáticos deve possuir volume de água exclusivo em reservatório de operação automática, podendo ser proporcionado por meio de reservatório elevado, com fundo elevado ou com fundo ao nível do solo, de acordo com o item 6.2.2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.036 - O sistema de chuveiros automáticos composto por reservas técnicas de incêndio em reservatórios independentes, deverão ser interligados por barrilete com a saída ligada ao conjunto de bombas de incêndio, de acordo com o item 6.2.3 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.037 - A canalização de consumo deverá ser instalada na lateral da caixa d’água, a níveis mais elevados, de forma a garantir a capacidade efetiva para a RTI mínima definida para o sistema, quando o reservatório para o sistema de chuveiros automáticos for destinado também o para consumo predial, de acordo com o item 6.2.4, da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.038 - A reserva técnica de incêndio (RTI) dos reservatórios deve ser mantida automática e permanentemente, de acordo com o item 6.2.5 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.039 - A RTI deve ser localizada e assistida de maneira a fornecer as vazões e pressões mínimas requeridas nas válvulas de governo e alarme, bem como nos chuveiros automáticos de maior demanda, de acordo com o item 6.2.5 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.040 - O dimensionamento do volume da reserva técnica de incêndio deve ser calculado em função da demanda hidráulica e do tempo de funcionamento para o risco identificados na área de projeto, de acordo com o item 6.2.6 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.041 - O tempo mínimo de funcionamento dos chuveiros automáticos, em função do risco, deve estar de acordo com a tabela 14, de acordo com o item 6.2.6.1 da NT 13/2021-CBMDF.",
					"10.042 - O tempo mínimo de funcionamento dos chuveiros automáticos, em função do risco Leve, será de 30 minutos, de acordo com a Tabela 14 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.043 - O tempo mínimo de funcionamento dos chuveiros automáticos, em função dos riscos Ordinários I e II, será de 60 minutos, de acordo com os itens 6.2.6.1.1, 6.2.6.1.2 e Tabela 14 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.044 - O tempo mínimo de funcionamento dos chuveiros automáticos, em função dos riscos Extraordinários I e II, será de 90 minutos, de acordo com os itens 6.2.6.1.1, 6.2.6.1.2 e Tabela 14 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.045 - Adicionar 30 minutos ao tempo de funcionamento do sistema de chuveiros automáticos, em função dos riscos Ordinários e Extraordinários, se não houver emprego de sistema de detecção automática de incêndio para supervisionar o sistema de chuveiros automáticos junto à conexão de teste de alarme, de acordo com o item 6.2.6.1.2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.046 - A quantidade de água da RTI em caso de sua não definição por cálculo (chuveiros automáticos tipo spray), para as edificações classificadas como Risco Leve, deverão ter o volume de 25.000 litros, de acordo com a Tabela 15 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.047 - A quantidade de água da RTI em caso de sua não definição por cálculo (chuveiros automáticos tipo spray), para as edificações classificadas como Risco Ordinário I, deverá ter o volume de 91.000 litros, de acordo com a Tabela 15 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.048 - A quantidade de água da RTI em caso de sua não definição por cálculo (chuveiros automáticos tipo spray), para as edificações classificadas como Risco Ordinário II, deverá ter o volume de 136.500 litros, de acordo com a Tabela 15 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.049 - A quantidade de água da RTI em caso de sua não definição por cálculo (chuveiros automáticos tipo spray), para as edificações classificadas como Risco Extraordinário I, deverá ter o volume de 341.000 litros, de acordo com a Tabela 15 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.050 - A quantidade de água da RTI em caso de sua não definição por cálculo (chuveiros automáticos tipo spray), para as edificações classificadas como Risco Extraordinário II, deverá ter o volume de 515.000 litros, de acordo com a Tabela 15 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.051 - O sistema de proteção por chuveiros automáticos deve ser dotado de bombas de incêndio para suprir a demanda hidráulica na área de projeto por meio de suas especificações relativas à altura manométrica, potência e vazão, de acordo com o item 6.3.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.052 - O sistema de proteção por chuveiros automáticos deve ser dotado de bomba de pressurização (jóquei) para manter a pressão hidráulica de supervisão em uma faixa preestabelecida, compensando pequenos e eventuais vazamentos na canalização, evitando desta forma o acionamento indevido da bomba de incêndio, de acordo com o item 6.3.2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.053 - As bombas devem dispor de dispositivo manual que possibilite dar partida no motor, reproduzindo a queda da pressão hidráulica na rede do sistema de proteção por chuveiros automáticos, de acordo com o item 6.3.3 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.054 - A automatização das bombas de incêndio deve ser executada de maneira que após a partida do motor, o desligamento será realizado somente no painel de comando de maneira manual, de acordo com o item 6.3.4 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.055 - O conjunto de bombas, inclusive a de pressurização (jóquei), devem possuir dispositivo, de automatização individuais para acionamento automático por meio de queda de pressão hidráulica na rede de chuveiros automáticos, de acordo com o item 6.3.5 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.056 - As bombas elétricas do sistema de proteção por chuveiros automáticos devem ser alimentadas por energia gerada através de duas fontes distintas e independentes, visando manter a alimentação elétrica considerando possíveis falhas em uma das fontes, de acordo com o item 6.3.6 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.057 - O sistema de proteção por chuveiros automáticos deve possuir no painel de comando com sinalização acústica e visual junto a chave seletora que possibilite identificar o acionamento automático ou manual, de acordo com o item 6.3.7 da NT 13/2021-CBMDF. (Não pode haver ponto neutro) (Art. 6º, do Dec. 23.154/2002)",
					"10.058 - O escapamento do motor a diesel, empregado no sistema de proteção por chuveiros automáticos, deve dispor de mecanismo silencioso, devendo ser isolado convenientemente e instalado com sua saída voltada para o ambiente exterior, de acordo com o item 6.3.8 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.059 - O tanque de combustível do motor deve ser dimensionado acima da bomba injetora e com autonomia mínima de oito horas de operação a plena carga e deve dispor de mecanismo indicador de nível de combustível, de acordo com o item 6.3.9 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.060 - O motor à combustão deve dispor de uma reserva com o mesmo volume de combustível do existente no tanque do motor, de acordo com o item 6.3.10 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.061 - A casa de bombas, quando não for considerada como risco isolado, deverá ser construída de maneira a apresentar resistência ao fogo mínima de 2 horas, de acordo com o item 6.3.11 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.062 - A casa de bombas onde sejam instaladas bombas acionadas por motores a diesel deve ser protegida por chuveiros automáticos, de acordo com o item 6.3.12 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.063 - As bombas devem ser instaladas sob condição positiva (afogadas), ou seja, a linha de centro do eixo da bomba situa-se abaixo do nível 'X' da água (figura 05 - exemplo 01). Admite-se ainda que a linha de centro do eixo da bomba situe-se até 2,00 metros acima do nível 'X' da água, desde que esta distância não represente mais de 1/3 da capacidade efetiva do reservatório. Nesta situação é obrigatório a instalação de válvula de pé no extremo do tubo de sucção (figura 06 - exemplo 02), de acordo com o item 6.3.12 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.064 - A tomada de recalque para uso pelo CBMDF deve ser locada a uma distância entre 01 metro e 10 metros da via de acesso de viaturas do CBMDF, de acordo com o item 6.4.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.065 - A tomada de recalque para uso pelo CBMDF deve conter duas entradas de água de diâmetro nominal de 63 mm podendo estar localizada na fachada principal do edifício, em coluna ou enterrado em caixa de alvenaria, de acordo com o item 6.4.1 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.066 - A tomada de recalque instalada na fachada principal ou em coluna deve apresentar altura de 0,60 a 01 m do piso acabado, de acordo com a Figura 7 e 8 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.067 - A tomada de recalque em caixa de alvenaria deve apresentar dimensões mínimas de 60 cm x 60 cm e profundidade de 50 cm, de acordo com o item 6.4.2 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.068 - A tomada de recalque deverá dispor de adaptador storz com tampão, de acordo com as figuras 7, 8 e 9 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.069 - O adaptador storz com tampão ficará a, no máximo, 15 cm de profundidade e instalado numa curva de 45°, numa posição que facilite o engate do mangote da viatura do CBMDF, de acordo com o item 6.4.3 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.070 - A tampa da caixa de alvenaria da tomada de recalque deve ser de ferro com a inscrição 'INCÊNDIO', pintada na cor vermelha e identificada como parte do sistema de chuveiros automáticos, de acordo com o item 6.4.4 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.071 - A tomada de recalque localizada na fachada principal ou em coluna, deve apresentar sinalização de modo a facilitar a sua visualização, de acordo com o item 6.4.4 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.072 - A tomada de recalque deve dispor de válvula de retenção, devendo ser instalada de forma a permitir o fluxo de água no sentido de fora para dentro da edificação ou área de risco, de acordo com o item 6.4.5 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.073 - Deverá ser afixada junto à tomada de recalque uma placa indicando de forma legível e indelével a pressão exigida nas entradas para atender a maior demanda do sistema, de acordo com o item 6.4.6 da NT 13/2021-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"10.074 - Quando a edificação de ocupação e uso garagens (Grupos 26) possuir subsolos, a partir do 3º pavimento subsolo serão obrigatórios os sistemas de detecção e chuveiros automáticos, de acordo com a Decisão Técnica 12/2021-CSESCIP/DESEG/CBMDF",
				],
				'011': [
					"11.001 - A instalação elétrica de baixa tensão deve atender às prescrições da norma NBR 5410 e aos regulamentos das autoridades e das distribuidoras de energia elétrica, de acordo com o item 2.2 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.002 - As instalações elétricas prediais de baixa tensão devem estar de acordo com a NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.003 - Apresentar Anotação de Responsabilidade Técnica (ART), Registro de Responsabilidade Técnica (RRT) ou Termo de Responsabilidade Técnica (TRT), da instalação elétrica predial, emitida por profissional e visada no seu respectivo órgão de classe, de acordo com a NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.004 - Nas linhas elétricas em que os cabos forem fixados diretamente em paredes ou tetos, só devem ser usados cabos unipolares ou multipolares, de acordo com o item 5.1.1 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.005 - Os cabos condutores isolados devem ser instalados em condutos fechados, ou em perfilados, conforme norma NBR 5410, de acordo com o item 5.1.1 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.006 - Nos locais com concentração de pessoas e afluência de público, onde as linhas elétricas são aparentes ou contidas em espaços de construção, os cabos elétricos e/ou os condutos elétricos devem ser não propagantes de chama, livres de halogênio e com baixa emissão de fumaça e gases tóxicos, conforme norma NBR 5410, de acordo com o item 5.1.1 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.007 - Nas instalações elétricas de baixa tensão, todos os circuitos devem dispor de dispositivos de proteção contra sobrecorrentes (sobrecarga e curto-circuito), de acordo com o item 5.1.2 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.008 - As partes vivas acessíveis a pessoas que não sejam advertidas (BA4 - pessoal de manutenção e/ou operação) ou qualificadas (BA5 - engenheiros, arquitetos e técnicos) devem estar isoladas e/ou protegidas por barreiras ou invólucros, de acordo com o item 5.1.3 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.009 - Todo circuito deve dispor de condutor de proteção “fio terra” em toda sua extensão. Um condutor de proteção pode ser comum a mais de um circuito. E todas as massas da instalação devem estar ligadas a condutores de proteção, de acordo com o item 5.1.4 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.010 - Não devem ser ligadas a condutores de proteção as massas de equipamentos alimentados por transformador de separação elétrica, ou de equipamentos alimentados por sistema de extrabaixa tensão, que é eletricamente separado da terra, ou de equipamentos classe II (isolação dupla), de acordo com o item 5.1.4.1 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.011 - Todas as tomadas de corrente, fixas, das instalações, devem ser do tipo com polo de aterramento (2 polos + terra, ou 3 polos + terra), de acordo com o item 5.1.5 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.012 - Deve existir um ou mais dispositivo(s) diferencial(ais) residual(ais) (DR) que deve(m) seccionar automaticamente a alimentação do(s) circuito(s) ou equipamento(s) por ele(s) protegido(s) sempre que ocorrer uma falta entre parte viva e massa ou entre parte viva e condutor de proteção, no circuito ou equipamento, de acordo com o item 5.1.6 da NT 41/2024-CBMDF. Admite-se, opcionalmente, o uso de dispositivo(s) de proteção a sobrecorrente para o seccionamento automático no caso das faltas mencionadas, somente se for comprovado o atendimento às prescrições da norma NBR 5410 relativas ao uso de tais dispositivos. Por exemplo, mediante a apresentação do valor máximo da impedância do percurso da corrente de falta (Zs) para o qual foi dimensionado o dispositivo de proteção a sobrecorrente, de acordo com o item 5.1.6.1 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.013 - O uso do dispositivo DR não é admitido nem recomendável, nos seguintes casos: em esquemas de aterramento IT (Isolado-Terra), salas cirúrgicas, UTI, motores de sistemas de combate a incêndio, circuitos que não devem ter a sua alimentação interrompida por razões de segurança ou operacionais, entre outras, de acordo com o item 5.1.6.2 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.014 - Os componentes fixos, cujas superfícies externas possam atingir temperaturas suscetíveis de provocar incêndio nos materiais adjacentes, devem ser montados sobre (ou envolvidos por) materiais que suportem tais temperaturas e sejam de baixa condutividade térmica, de acordo com o item 5.1.7 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.015 - Os componentes fixos, cujas superfícies externas possam atingir temperaturas suscetíveis de provocar incêndio nos materiais adjacentes, devem ser separados dos elementos construtivos da edificação por materiais que suportem tais temperaturas e sejam de baixa condutividade térmica, de acordo com o item 5.1.7 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.016 - Os componentes fixos, cujas superfícies externas possam atingir temperaturas suscetíveis de provocar incêndio nos materiais adjacentes, devem ser montados de modo a guardar afastamento suficiente de qualquer material cuja integridade possa ser prejudicada por tais temperaturas e garantir uma segura dissipação de calor, aliado à utilização de materiais de baixa condutividade térmica, de acordo com o item 5.1.7 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.017 - Os quadros de distribuição devem ser instalados em locais de fácil acesso e serem providos de identificação do lado externo, legível e não facilmente removível, de acordo com o item 5.1.8 da NT 41/2024CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.018 - Deve ser afixada sinalização de alerta, no lado externo dos quadros de distribuição elétricos, conforme requisito da NT 22 – Sinalização de segurança, de acordo com o item 5.1.8 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.019 - Todos os componentes dos quadros de distribuição devem ser identificados de tal forma que a correspondência entre os componentes e os respectivos circuitos possa ser prontamente reconhecida. Essa identificação deve ser legível, indelével, posicionada de forma a evitar risco de confusão e corresponder à notação adotada no projeto, de acordo com o item 5.1.8 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.020 - Os equipamentos destinados a operar em situações de incêndio, de acordo com o prescrito no Regulamento de segurança contra incêndio das edificações e áreas de risco e respectivas Normas Técnicas, devem ter seu funcionamento e desempenho elétrico assegurados pelo tempo necessário para a saída das pessoas, de acordo com a alínea “a” do item 6.1.1 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.021 - Os equipamentos destinados a operar em situações de incêndio, de acordo com o prescrito no Regulamento de segurança contra incêndio das edificações e áreas de risco e respectivas Normas Técnicas, devem ter seu funcionamento e desempenho elétrico assegurados pelo tempo necessário para execução das operações de combate ao fogo e salvamento, de acordo com a alínea “b” do item 6.1.1 da da NT 41/2024CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.022 - Os equipamentos destinados a operar em situações de incêndio, de acordo com o prescrito no Regulamento de segurança contra incêndio das edificações e áreas de risco e respectivas Normas Técnicas, devem ter seu funcionamento e desempenho elétrico assegurados pelo tempo necessário para a proteção do meio ambiente e do patrimônio, de acordo com a alínea “c” do item 6.1.1 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.023 - Os circuitos dos serviços de segurança devem ser independentes de outros circuitos. Isso significa que nenhuma falta, intervenção ou modificação em circuito não pertencente aos serviços de segurança deve afetar o funcionamento do(s) circuito(s) dos serviços de segurança, de acordo com o item 6.1.2 da NT 41/2024CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.024 - Os circuitos dos serviços de segurança responsáveis pela alimentação e comando dos equipamentos de segurança contra incêndio que usam motores (por exemplo: ventiladores, exaustores, bombas de incêndio, motogeradores, elevadores, registros corta-fogo e similares) e dos dispositivos de disparo usados em equipamentos de supressão e combate a incêndio (válvulas solenoides e similares), quando atravessarem áreas com carga combustível (carga de incêndio), incluindo espaços de construção sem resistência contra o fogo, devem ser devidamente protegidos por materiais resistentes ao fogo, de acordo com o item 6.1.3 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.025 - Para se proteger um circuito de segurança contra a ação do fogo deve-se garantir o atendimento das premissas dos itens 6.1.1 e 6.1.2 da NT 41, tendo como opção o uso de materiais resistentes ao fogo, devidamente normatizados, de acordo com a alínea “a” do item 6.1.4 da NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"11.026 - Para se proteger um circuito de segurança contra a ação do fogo deve-se garantir o atendimento das premissas dos itens 6.1.1 e 6.1.2 da NT 41, tendo como opção encapsular os circuitos dentro de elementos de construção resistentes ao fogo (lajes, paredes, piso) ou enterrá-los. Nos casos em que os circuitos dos serviços de segurança estiverem enclausurados em ambientes resistentes ao fogo (por exemplo: instalados em condutos embutidos em alvenarias, pisos ou lajes com resistência ao fogo ou enterrados), garantindo assim a operação do sistema durante o sinistro, não será necessária a proteção com material resistente ao fogo, de acordo com a alínea “b” do item 6.1.4 e item 6.1.4.1 da NT 41/2024-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.027 - Para se proteger um circuito de segurança contra a ação do fogo deve-se garantir o atendimento das premissas dos itens 6.1.1 e 6.1.2 da NT 41, tendo como opção os requisitos das alíneas “a” e “b” do item 6.1.4 da NT 41/2024. Outras soluções técnicas devem ser devidamente comprovadas perante o CBMDF (por exemplo: cabos especiais, normatizados, resistentes ao fogo), de acordo com a alínea “c” do item 6.1.4 da NT 41/2024-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.028 - Os dispositivos de proteção contra sobrecargas dos circuitos dos motores utilizados nos serviços de segurança devem ser omitidos, mantendo-se a proteção contra curto-circuito, de acordo com o item 6.1.5 da NT 41/2024-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.029 - No caso de equipamentos de segurança alimentados por motogeradores, o acionamento do motogerador deve ser automático, quando da interrupção no fornecimento de energia normal, de acordo com a alínea “a” do item 6.1.6.1 da NT 41/2024-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.030 - No caso de equipamentos de segurança alimentados por motogeradores, o motogerador deve possuir autonomia de funcionamento, conforme normas e regulamentos específicos para suprir todos os equipamentos dos sistemas de segurança por eles atendidos, de acordo com a alínea “b” do item 6.1.6.1 da NT 41/2024-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.031 - No caso de equipamentos de segurança alimentados por motogeradores, em caso de incêndio, o motogerador deve alimentar exclusivamente os quadros e circuitos dos sistemas de segurança, sendo que os quadros e circuitos comuns, por ele atendidos, não devem ser alimentados nessa situação, de acordo com a alínea “c” do item 6.1.6.1 da NT 41/2024-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.032 - No caso de equipamentos de segurança alimentados por motogeradores, deve haver desligamento automático por dispositivos de proteção na ocorrência de curto-circuitos nos circuitos dos serviços de segurança ou nos circuitos comuns, sendo que estas faltas não podem impedir o funcionamento do motogerador, que deve continuar alimentando os circuitos dos serviços de segurança não submetidos às condições de falta, de acordo com a alínea “d” do item 6.1.6.1 da NT 41/2024-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.033 - No caso de equipamentos de segurança alimentados por motogeradores, a sala do gerador deve ser protegida contra fogo, mediante compartimentação com paredes e portas corta fogo. A entrada e a saída de ar do motor não devem comprometer essa compartimentação, de acordo com a alínea “e” do item do item 6.1.6.1 da NT 41/2024-CBMDF (não se aplicam a geradores instalados em edificações existentes antigas, anteriores a vigência da norma, item 6.1.6.2 da NT 41/2024-CBMDF). (Art. 6º, do Decreto 23.154/2002)",
					"11.034 - Todos os quadros dos equipamentos de segurança contra incêndio (tais como: bombas de incêndio; central de iluminação de emergência; central de alarme e detecção; motogeradores; ventiladores; exaustores; elevadores etc.) devem ser providos de identificação do lado externo, legível e não facilmente removível e devem possuir (na edificação) os esquemas unifilares respectivos existentes, de acordo com o item 6.1.7 da NT 41/2024-CBMDF). (Art. 6º, do Decreto 23.154/2002)",
					"11.035 - Não se admite o uso de dispositivo DR para proteção contrachoques elétricos nos circuitos dos serviços de segurança, de acordo com o item 6.1.8 da NT 41/2024-CBMDF). (Art. 6º, do Decreto 23.154/2002)",
					"11.036 - Um mesmo conduto não deve possuir circuitos de corrente alternada juntamente com circuitos de corrente contínua. Admite-se tal condição no caso de utilizar condutores que possuam blindagem, podendo a blindagem ser somente nos circuitos de corrente alternada, somente nos circuitos de corrente contínua ou em todos, de acordo com o item 6.1.9 NT 41/2024-CBMDF). (Art. 6º, do Decreto 23.154/2002)",
					"11.037 - Os locais de posicionamento do grupo gerador de energia e seus respectivos tanques deverão estar protegidos com barreiras que impeçam o acesso de pessoas não autorizadas, de acordo com o item 6.2.4.3 da NT 09/2022-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
					"11.038 - As fiações elétricas devem estar isoladas das estruturas, protegidas por meio de calhas, canaletas, eletrodutos ou em cabo duplamente protegido, conforme nível de isolamento previsto por meio da ABNT NBR 5410, de acordo com a letra “C” do item 6.1.8.1 da NT 09/2022-CBMDF. (Art. 6º, do Decreto 23.154/2002)",
				],
				'012': [
					"12.001 - Toda a edificação ou complexo de edificações que tenha obrigatoriedade de instalar brigada de incêndio deverá possuir Plano de Prevenção Contra Incêndio e Pânico(PPCI) atualizado e aprovado no CBMDF, conforme o modelo de PPCI do anexo H e previsto no item 4.8.2.1 da NT 07 / 2011 - CBMDF. (Arts. 3º, § 2º, e 6º, do Dec. 23.154 / 2002)",
					"12.002 - O PPCI deve estar sempre disponível para eventuais consultas e / ou ações inopinadas do CBMDF, com a equipe de Brigadistas Particulares e / ou Brigadistas Voluntários que estiverem se serviço, de acordo com o item 4.8.3.1 da NT 07 / 2011 - CBMDF. (Arts. 3º, § 2º, e 6º, do Dec. 23.154 / 2002)",
					"12.003 - O PPCI deve ser apresentado em material impresso e de acordo com NBR 14.100 / 1998 – Proteção Contra Incêndio – símbolos gráficos para projeto, de acordo com o item 4.8.5 da NT 07 / 2011 - CBMDF. (Arts. 3º, § 2º, e 6º, do Dec. 23.154 / 2002)",
					"12.004 - Apresentar no PPCI plantas e croquis indicando as fontes de risco com círculos vermelhos e as rotas de fuga com setas verdes em cada pavimento, de acordo com o item 4.8.6.8 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"12.005 - Localizar a sala da brigada e os principais sistemas de proteção(extintores, hidrantes, registro de recalque, RTI, central de alarme, acionadores manuais, VGA dos chuveiros automáticos, Central de GLP etc), conforme item 4.8.6.8 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"12.006 - Apresentar planta de situação contendo a edificação, o Quartel de Corpo de Bombeiros mais próximo e indicando as vias de acesso e os hidrantes urbanos mais próximos, de acordo com o item 4.8.6.8 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"12.007 - Os exercícios simulados devem ser realizados no mínimo anualmente, na edificação com a participação de toda a população, conforme o item 4.7 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"12.008 - O Ponto de Encontro e Triagem - PET, ser indicado no PPCI e estar localizado em local seguro e propício para a execução das atividades, de acordo com a NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"12.009 - O Supervisor da Brigada de Incêndio após submeter o PPCI a avaliação do Departamento de Segurança Contra Incêndio deve encaminhar cópia deste ao quartel do Corpo de Bombeiros da área para conhecimento e atuação conjunta em simulados, de acordo com o item 4.8.2.2 NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
				],
				'013': [
					"13.001 - A Brigada de Incêndio da edificação deve ser dimensionada conforme o previsto no Anexo A da NT 07 / 2011 - CBMDF, levando - se em conta a população fixa e o risco de incêndio, de acordo com o item 4.3.1 da NT 07 / 2011 - CBMDF. (Arts. 6º, e 10, b, do Dec. 23.154 / 2002)",
					"13.002 - Fora do horário de funcionamento das atividades desenvolvidas na edificação é permitida a permanência mínima de 02(dois) Brigadistas Particulares no local, de acordo com o item 4.6.3.1 da NT 07 / 2011 - CBMDF. (Arts. 6º, e 10, b, do Dec. 23.154 / 2002)",
					"13.003 - A edificação deverá dispor de brigada de incêndio própria ou contratar prestadora de serviço de brigada de incêndio, conforme item 4.1 e anexo A da NT 07 / 2011 - CBMDF. (Arts. 6º, e 10, b, do Dec. 23.154 / 2002)",
					"13.004 - Apresentar a relação nominal dos brigadistas e seus certificados de formação e credenciamento no CBMDF, no caso de Brigada de Incêndio própria, de acordo com o item 7.2.1 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.005 - O Certificado do brigadista particular deve constar os seguintes dados: a) Nome completo do concludente com Nº da carteira de identidade - RG; b) Carga horária com o nome do instrutor; c) Período de treinamento; d) Responsável legal da escola: Nome, habilitação RG e Nº da Carteira de Identidade profissional; e) Citar que o certificado está de acordo com a Norma Técnica vigente; f) Campo para homologação do CBMDF e para capacitação continuada no próprio Certificado; tudo conforme o item 8.1, da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.006 - Apresentar o CRD da prestadora de serviços em caso de Brigada de Incêndio contratada, de acordo com o item 7.2.2 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.007 - A capacitação continuada do Chefe de Brigada e Brigadista Particular deve ser realizada a cada 24(vinte e quatro) meses, de acordo com o item 9.1 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.008 - Os brigadistas particulares devem executar exclusivamente as atribuições da brigada de incêndio previsto nesta norma e no PPCI, conforme o item 4.6.3 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.009 - Todos os dados solicitados pelos agentes fiscalizadores devem estar atualizados e disponíveis as brigadas contra incêndio nos locais de prestação de serviço de Brigada de incêndio, de acordo com o item 7.6 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.010 - A Brigada de Incêndio deve elaborar relatório das atividades executadas, disponibilizando - o em seus locais de a13uação, para fiscalização do CBMDF, de acordo com o item 4.9.1 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.011 - O relatório das atividades prestadas mensalmente por Brigadas de Incêndio em edificações deve conter: os sistemas de proteção contra incêndio e pânico inspecionados, as irregularidades encontradas e as manutenções requeridas e realizadas nos sistemas, os riscos identificados, as emergências atendidas, os exercícios simulados, os treinamentos, as palestras e outras atividades que julgar pertinentes, conforme modelo do Anexo K, de acordo com o item 4.9.3 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.012 - Os exercícios simulados devem ser realizados no mínimo anualmente, na edificação com a participação de toda a população(item 4.7.1); (...) devendo ser elaborado relatório, pelo supervisor da Brigada de Incêndio, de acordo com o item 4.7.3 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.013 - Os Chefes de Brigada e os Brigadistas deverão estar fisicamente aptos ao desempenho das atribuições da Brigada de Incêndio, descritas no item 4.6, de acordo com o item 4.4.6 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.014 - A Brigada de Incêndio deve dispor de sala em local de fácil acesso, junto a central de detecção e alarme de incêndio, dispondo de rota de fuga, com distância máxima a percorrer de 25m de área segura, conforme projeto aprovado junto a DIEAP / CBMDF, de acordo com o item 4.5.2 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.015 - Deve ser informado, por meio de placas nos acessos, corredores e locais de circulação das edificações, sobre a existência da Brigada de Incêndio, a forma de contato e a localização da sala da Brigada de Incêndio, na forma da NT 22 / 2020 - CBMDF – Tabela F, item 32(4.5.3 da NT 07 / 2011 - CBMDF). (Art. 6º, do Dec. 23.154 / 2002)",
					"13.016 - O uniforme do Brigadista Particular deverá conter somente: a) Razão social ou nome de fantasia da empresa; b) O logotipo da prestadora de serviço, se for o caso; c) Plaqueta de identificação(crachá) do Brigadista Particular, autenticada pela empresa, com validade de 06(seis) meses, constando o nome e fotografia colorida em tamanho 3x4; d) Descrição 'Brigadista' na parte posterior do uniforme; e) Identificação do local onde presta serviço a fim de facilitar a ação do agente fiscalizador do Corpo de Bombeiros, bem como evitar qualquer equivoco por parte da sociedade e autoridades do DF, por possível semelhança com os uniformes do Corpo de Bombeiros Militar, de acordo com o item 4.10.6 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.017 - São equipamentos necessários ao funcionamento da Brigada de Incêndio: luvas, capacetes, lanternas, aparelhos de comunicação via rádio e ou telefone móvel, conjunto de primeiros socorros(Anexo H) e outros EPIs, considerando os riscos específicos das edificações e eventos, especificados pelo CBMDF ou pelo Supervisor da Brigada de Incêndio(Todos os materiais disponibilizados para a brigada devem corresponder aos listados no PPCI), de acordo com o item 4.5.1.1 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.018 - Os uniformes dos brigadistas particulares utilizados nas brigadas de incêndio próprio ou pelas prestadoras de serviço de brigada de incêndio devem ser distintos entre si, conforme o item 4.10.5 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.019 - Não será permitida a fixação de quaisquer brevês, insígnias, medalhas ou congêneres no uniforme do brigadista particular, conforme o item 4.10.7 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"13.020 - O uniforme do Brigadista Particular deve ser aprovado e registrado na Seção de Credenciamento da Diretoria de Vistorias(SECRE / DIVIS) antes de sua utilização, de acordo com o item 4.10.8 da NT 07 / 2011 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
				],
				'014': [
					"14.001 - Adequar o acesso às vias internas e locais para estabelecimento de viaturas de emergência do CBMDF em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361 / 2000.(Art. 6º, do Dec. 23.154 / 2002)",
					"14.002 - Adequar o acesso às vias internas e locais para estabelecimento de viaturas de emergência do CBMDF, em logradouros e áreas de risco que em função de sua classificação e edificações demandem a disponibilização de área exclusiva para viaturas de socorro, conforme requisitos técnicos previstos, de acordo com o item 1.1 e 2.1 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.003 - As vias internas para acesso às edificações e áreas de risco devem possuir largura mínima igual à largura da faixa de rolamento da via do sistema viário urbano que se comunica com a entrada do logradouro, não podendo ser inferior a 3 m, de acordo com o item 5.1.1 e 5.1.1.1 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.004 - Para vias internas onde seja permitido o estacionamento de veículos ao longo destas, a sua largura mínima deverá ser de 5, 8 m, de acordo com o item 5.1.1.2 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.005 - As vias internas devem suportar o tráfego de viaturas com massa de até 50 mil kg, devendo permanecer desobstruídas e com altura livre de 4, 5 m em toda sua extensão, de acordo com o item 5.1.2 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.006 - Para logradouros com edificações de altura limitada a 12 m, as vias internas devem suportar o tráfego de viaturas com massa mínima de 17 mil kg, de acordo com o item 5.1.2.1 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.007 - As vias internas e as áreas exclusivas para uso das viaturas de emergência do CBMDF devem ser pavimentadas, de acordo com o item 5.1.3 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.008 - Instalar, nas vias internas, sistema de sinalização informando a capacidade de carga máxima ao longo de sua extensão, com placas distanciadas entre si em no máximo 100 m, sendo a primeira instalada até 25 m após o portão de acesso, de acordo com o item 5.1.5 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.009 - Quando o acesso for permitido por passagem através de portão, pórtico, cancela, ou qualquer outra barreira física, estes deverão ter largura mínima de 4 m e altura mínima de 4, 5 m, conforme figura 1 e item 5.2.1 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.010 - Quando o acesso for por passagem através de portão, pórtico, cancela, ou qualquer outra barreira física de funcionamento energizado, estes deverão possuir mecanismo de abertura manual e serem constantemente monitorados, conforme item 5.2.2 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.011 - Quando o acesso for por passagem através de portão, pórtico, cancela, ou qualquer outra barreira física de funcionamento energizado, estes deverão possuir mecanismo de abertura manual e serem constantemente monitorados, conforme item 5.2.2 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.012 - Nos logradouros e áreas de risco que possuam edificações com altura igual ou superior a 12 m, dispor área mínima de 8, 0 m x 15, 0 m exclusiva para viaturas de socorro do CBMDF paralela a uma das fachadas de acesso operacional, com resistência para suportar 50 mil kg distribuídos em 04 pontos de contato de 1 m² cada.Estão isentas desta obrigatoriedade aqueles logradouros que possuam edificações que apresentarem uma única fachada de acesso operacional estando esta, uma distância horizontal da via pública entre 7 e 13 metros, livres de cabos aéreos de transmissão de energia ou de prestadores de serviços dispostos entre a área exclusiva para as viaturas de socorro e a fachada de acesso operacional, conforme item 5.3.1, 5.3.2 e 5.3.4 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.013 - Nos logradouros e áreas de risco que possuam edificações com altura inferior a 12 m, dispor área mínima de 3, 0 m x 10, 0 m exclusiva para viaturas de socorro do CBMDF paralela a uma das fachadas de acesso operacional, com resistência para suportar 17 mil kg distribuídos em 04 pontos de contato de 1 m² cada, conforme item 5.3.3 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.014 - As áreas exclusivas para viaturas de socorro do CBMDF devem estar livres em toda sua extensão de elementos que possam impedir ou dificultar as manobras e / ou operação de emergência, conforme item 5.3.5 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.015 - Retirar cabos aéreos de transmissão de energia ou de prestadores de serviços dispostos na área exclusiva para viaturas de socorro e a fachada de acesso operacional, conforme item 5.3.6 da NT 11 / 2021 - CBMDF.",
					"14.016 - Demarcar as áreas exclusivas para viaturas de socorro do CBMDF por faixa amarela com largura de 11 cm em todo seu perímetro e instalar sinalização vertical de estacionamento regulamentado e sinalização de emergência com os seguintes dizeres: 'RESERVADO PARA VIATURAS DO CORPO DE BOMBEIROS MILITAR', conforme item 5.3.8 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.017 - A inclinação máxima do terreno onde estiver locada a área exclusiva para uso das viaturas de socorro do CBMDF não poderá ultrapassar o valor de 5 %, tanto longitudinalmente quanto transversalmente, conforme item 5.3.9 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.018 - A distância horizontal da área exclusiva para uso do CBMDF até a fachada de acesso operacional deverá estar compreendida entre 7 e 13 metros, conforme figura 2 e item 5.3.10 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.019 - A via interna não poderá ser obstruída pela definição da distância para locação da área exclusiva para uso de viatura de socorro do CBMDF, conforme item 5.3.11 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.020 - As lajes, pontes, túneis e viadutos localizados em vias internas para acesso às áreas exclusivas para viaturas de socorro do CBMDF deverão atender aos requisitos técnicos da NT 11 / 2021 - CBMDF, conforme item 6.1.1 e 6.2.1 da referida norma. (Art. 6º, do Dec. 23.154 / 2002)",
					"14.021 - Havendo a necessidade de mudança de direção(curva) no percurso das vias internas, aquela deverá ser dimensionada calculando - se sua largura e o raio da curva com base numa viatura com 3 metros de largura, distância entre eixos de 8 metros e 15 metros de comprimento, conforme item 6.3.1 da NT 11 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
				],
				'015': [
					"15.001 - Os estabelecimentos que comercializam combustíveis e inflamáveis devem apresentar o Projeto de Incêndio, que conste os sistemas de proteção contra incêndio e pânico e os distanciamentos previstos, devidamente aprovado no CBMDF, de acordo com o Decreto nº 21.361 / 2000.(Art. 6º, do Dec. 23.154 / 2002)",
					"15.002 - O Sistema de Proteção contra Descargas Atmosféricas em Postos de Combustíves(SPDA), deve ser instalado em conformidade com a NBR 5419 / 2015 da ABNT. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.003 - Apresentar Laudo do Teste de Aterramento do SPDA - Sistema de Proteção contra Descargas Atmosféricas, com especificação do equipamento utilizado, método, resistência encontrada e assinado por responsável técnico, emitido por firma credenciada ou visado no CREA, conforme NBR 5419 / 2015 da ABNT. (Arts. 3º, II, m, e 6º do Dec. 23.154 / 2002)",
					"15.004 - Apresentar ART ou RRT(Anotação ou Registro de Responsabilidade Técnica) de execução ou manutenção das medidas de segurança contra incêndio e pânico instaladas, visadas no respectivo órgão da classe, de acordo com o Decreto 21.361 / 2000.(Art. 6º, do Dec. 23.154 / 2002)",
					"15.005 - Instalar pontos de aterramento para caminhões, em conformidade com a NBR 5410.(Art. 6º, do Dec. 23.154 / 2002)",
					"15.006 - Sinalizar todas as faces dos pilares, onde estão instalados os extintores de incêndio, conforme alínea j do item 6.1.4, da NT 22 / 2020 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.007 - Sinalizar o piso dos extintores sobre rodas com um quadrado pintado em vermelho de 0, 70 x 0, 70m, e borda de 15 cm, pintada em amarelo, conforme a NT 22 / 2020 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.008 - Deverão ser destinados 02 extintores portáteis com capacidade extintora de 20 B, para a proteção dos tanques aéreos fechados de armazenamento de líquidos inflamáveis e combustíveis, com capacidade do tanque de até 5.000 l, de acordo com a Tabela 6 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.009 - Os tanques de armazenamento de líquidos inflamáveis e combustíveis enterrados serão atendidos por um extintor portátil de pó com capacidade extintora de 20B, próximo ao local de enchimento e / ou saída(bomba) de cada tanque, independente da sua capacidade de armazenamento, de acordo com o item 4.1.1.10 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.010 - Para a proteção de tanques de armazenamento de líquidos inflamáveis e combustíveis em recipientes abertos deve ser considerada a proporção da capacidade extintora de 20B, para cada metro quadrado de superfície de líquido, de acordo com o item 4.1.1.11 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.011 - Para a proteção de tanques aéreos fechados e dos tanques enterrados de armazenamento de líquidos inflamáveis e combustíveis com capacidade acima de 5.000 litros até 20.000 l, deverá ser destinado 01 extintor sobre rodas com capacidade extintora de 80 B, de acordo com a Tabela 11 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.012 - Para a proteção de tanques aéreos fechados e dos tanques enterrados de armazenamento de líquidos inflamáveis e combustíveis com capacidade acima de 20.000 l, deverão ser destinados 02 extintores sobre rodas com capacidade extintora de 80 B, de acordo com a Tabela 11 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.013 - Os extintores sobre rodas devem ser instalados de forma que não se percorra, dos extintores até a bomba de combustível mais afastada, uma distância superior a 15 m, para extintores com capacidade extintora de 80 B, conforme a NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.014 - Os extintores sobre rodas não podem ser instalados em locais com desnível, conforme a NT 03 / 2015 - CBMDF. (Arts. 3º, I, a, e 6º, do Dec. 23.154 / 2002)",
					"15.015 - Instalar iluminação de emergência na loja de conveniência, conforme a NT 21 / 2020 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.016 - Instalar sinalização de segurança(abandono) na loja de conveniência, conforme a NT 21 / 2020 - CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154 / 2002)",
					"15.017 - Sinalizar o vidro de acesso à loja de conveniência, com uma tarja colorida, de acordo com a alínea g do item 6.1.5 da NT 22 / 2020 - CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154 / 2002)",
					"15.018 - Os tanques de armazenamento de líquidos estáveis de classe I, classe II, classe III devem ter um espaçamento de acordo com a tabela A - 10, conforme NBR 17505 /07 da ABNT. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.019 - A distância entre um tanque que armazene líquido instável e outros tanques que armazenem líquido instável ou líquidos classe I, II ou III não deve ser inferior à metade da soma de seus diâmetros, conforme NBR 17505 /07 da ABNT. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.020 - A distância mínima entre um vaso ou recipiente de GLP e um tanque de armazenamento de líquidos de classe I, classe II ou classe IIIA deve ser de 6 m.Devem ser previstos diques, canais de drenagem para a bacia de contenção à distância e desníveis, de modo a não ser possível o acúmulo de líquidos de classe I, classe II ou classe IIIA sob o vaso contendo GLP, adjacente à tancagem, conforme NBR 17505 /07 da ABNT. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.021 - É proibida a utilização de todo e qualquer tipo de material que emana chama ou incandescência nas proximidades das bombas de combustível bem como do depósito de revenda de GLP, tais como churrasqueiras, lamparinas, tochas e similiares.",
					"15.022 - Todos os extintores portáteis deverão possuir capacidade extintora mínima de 40B, conforme a NBR 12693 / 2021 da ABNT e NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"15.023 - Nas coberturas das bombas de postos de combustíveis o distanciamento mínimo entre projeções das edificações será considerado a partir da bomba mais próxima da edificação, conforme Decisão Técnica 08 / 2021 - CSESCIP / DESEG / CBMDF.",
				],
				'016': [
					"16.001 - Os sistemas de segurança contra incêndio e pânico, na área de armazenamento e / ou comercialização de GLP, devem ser instalados em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361 / 2000.(Art. 6º, do Dec. 23.154 / 2002)",
					"16.002 - As medidas de proteção contra incêndio e pânico na área de armazenamento e / ou comercialização de GLP, devem ser instalados em conformidade com a NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.003 - A área de armazenamento de GLP de Classe I poderá ter no máximo 520 Kg ou 40 botijões de 13 Kg, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.004 - A área de armazenamento de GLP de Classe II poderá ter no máximo 1.560 Kg ou 120 botijões de 13 Kg, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.005 - A área de armazenamento de GLP de Classe III poderá ter no máximo 6.240 Kg ou 480 botijões de 13 Kg, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.006 - A área de armazenamento de GLP de Classe IV poderá ter no máximo 12.480 Kg ou 960 botijões de 13 Kg, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.007 - A área de armazenamento de GLP de Classe V poderá ter no máximo 24.960 Kg ou 1920 botijões de 13 Kg, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.008 - A área de armazenamento de GLP de Classe VI poderá ter no máximo 49.920 Kg ou 3840 botijões de 13 Kg, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.009 - A área de armazenamento de GLP de Classe VII poderá ter no máximo 99.840 Kg ou 7680 botijões de 13 Kg, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.010 - A área de armazenamento de GLP com mais de 99.840 Kg ou 7.680 botijões de 13 Kg será considerada Classe Especial, conforme item 5.1 e tabela 01 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.011 - O somatório da capacidade de armazenamento de todas as áreas de armazenamento de GLP não pode ser superior à capacidade da classe imediatamente acima da maior existente no imóvel, conforme item 6.24 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.012 - A área de armazenamento de apoio de GLP não poderá ultrapassar o limite de quantidade de armazenamento de Classe I e seus recipientes deverão ser somados à capacidade de armazenamento do imóvel, conforme item 6.26 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.013 - As áreas de armazenamento e / ou comercialização dos recipientes transportáveis de GLP não podem estar localizadas em ambientes fechados sem ventilação natural, conforme item 5.3 da NT 05 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.014 - Manter os recipientes de GLP dentro da área de armazenamento, separando - se em lotes, os recipientes cheios dos parcialmente utilizados e / ou vazios, conforme item 5.8 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.015 - Os locais destinados ao armazenamento de recipientes transportáveis de GLP devem possuir piso pavimentado, plano e nivelado, com superfície que suporte carga e descarga, conforme item 6.1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.016 - Os recipientes transportáveis de GLP podem ser armazenados em plataformas elevadas e estas devem ser construídas com materiais resistentes ao fogo, possuir boa ventilação natural, podendo ser coberta ou não, conforme item 6.2 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.017 - A cobertura da área de armazenamento de GLP deverá ter, no mínimo, 2, 60 m de pé - direito e possuir espaço livre de, no mínimo, 1, 20 m entre o topo da pilha de botijões cheios e a cobertura.A estrutura da cobertura deve ser construída com produto resistente ao fogo e os componentes que a suportam devem possuir maior resistência mecânica, conforme item 6.3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.018 - Retirar da área de armazenamento de GLP, materiais que não fazem parte da atividade.Na área de armazenamento dos recipientes de GLP não é permitido o depósito de outros materiais, com exceção daqueles necessários ao desenvolvimento da atividade, tais como: balança, equipamento para teste de vazamento, extintores e placas de sinalização, de acordo com o item 6.4 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.019 - Delimitar a área de armazenamento de GLP por meio de pintura no piso, cerca de tela metálica, gradil metálico ou elemento vazado de concreto, cerâmico ou outro material resistente ao fogo, assegurando ampla ventilação.Adicionalmente, nas áreas destinadas ao armazenamento superiores a classe III, deve - se demarcar com pintura toda a área de piso destinada aos lotes dos recipientes conforme item 6.5 da NT 05 / 2021 - PARTE IICBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.020 - As áreas de armazenamento de GLP classe I, II ou III, quando delimitadas por tela metálica, gradil metálico, elemento vazado de concreto, cerâmico ou outro material resistente ao fogo devem possuir uma ou mais aberturas de, no mínimo, 1, 20 m de largura e 2, 10 m de altura, que abra de dentro para fora, conforme item 6.7 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.021 - As áreas de armazenamento de GLP classe IV ou superior, quando delimitadas por tela metálica, gradil metálico, elemento vazado de concreto, cerâmico ou outro material resistente ao fogo devem possuir duas ou mais aberturas de, no mínimo, 1, 20 m de largura e 2, 10 m de altura, que abram de dentro para fora, devendo ficar nas extremidades de um mesmo lado, em lados adjacentes ou opostos, conforme item 6.8 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.022 - As áreas de armazenamento de qualquer classe, quando não delimitadas por cerca de tela metálica, gradil metálico, elemento vazado de concreto, cerâmico ou outro material resistente ao fogo, devem estar situadas em imóveis cercados por muros ou qualquer outro tipo de cercamento.O imóvel deve possuir no mínimo uma abertura, com dimensões mínimas de 1, 20 m de largura por 2, 10 m de altura, abrindo de dentro para fora.Adicionalmente, esse imóvel pode possuir outros acessos com dimensões quaisquer e com outros tipos de aberturas, com passagens totalmente desobstruídas, conforme itens 6.9 e 6.10 d a NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.023 - A distância máxima a ser percorrida do ponto mais distante da área de armazenamento até a abertura do portão de saída não pode ser superior a 25 m, conforme item 6.11 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.024 - Separar em lotes os recipientes de GLP, dentro da área de armazenamento, com até 480 botijões de 13 Kg cheios em pilhas de até 04 unidades, e até 600 botijões vazios ou parcialmente utilizados em pilhas de até 05 unidades, conforme item 6.14 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.025 - Entre os lotes de recipientes e entre os lotes e os limites da área de armazenamento deve haver corredores de circulação com no mínimo 1, 0 m de largura.Somente as áreas de armazenamento classes I e II não necessitam de corredores de circulação, conforme item 6.15 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.026 - O imóvel destinado ao armazenamento de GLP deve possuir equipamento e / ou material necessário para realizar testes de vazamento de GLP dos recipientes, conforme item 6.20 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.027 - Os centros de destroca, oficinas de requalificação e / ou manutenção e de inutilização de recipientes de GLP não podem armazenar recipientes cheios, conforme item 6.34 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.028 - As paredes resistentes ao fogo da área de armazenamento de GLP deverão ser totalmente fechadas, sem aberturas, construídas em alvenaria, concretos ou material similar, com tempo de resistência ao fogo mínimo de 02 horas e com altura mínima de 2, 60 m, conforme item 6.27 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.029 - As paredes resistentes ao fogo da área de armazenamento de GLP devem ser construídas e posicionadas de maneira que se interponham entre os recipientes de GLP e o ponto considerado, isolando o risco entre estes.A distância mínima entre as paredes resistentes ao fogo e o limite do lote de recipientes deverá ser de 1, 0 m, conforme item 6.28 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.030 - As paredes resistentes ao fogo da área de armazenamento de GLP não podem ser construídas entre os lotes de recipientes, conforme item 6.29 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.031 - As paredes resistentes ao fogo da área de armazenamento de GLP não poderão ser adjacentes entre si e o comprimento total não poderá ultrapassar 60 % do perímetro da área de armazenamento, conforme item 6.30 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.032 - O comprimento da parede resistente ao fogo da área de armazenamento de GLP deverá ser igual ao comprimento do lado paralelo da área, acrescido de, no mínimo, 1, 0 m e no máximo, 3, 0 m, em cada extremidade, conforme item 6.31 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.033 - O comprimento da parede resistente ao fogo entre áreas de armazenamento de classes distintas localizadas no mesmo imóvel deve obedecer ao tamanho referente à maior classe existente, conforme item 6.32 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.034 - Os muros de delimitação da propriedade, construídos conforme as especificações de paredes resistentes ao fogo, podem ser considerados como tal, quando atenderem a todos os requisitos definidos nesta norma para este elemento, conforme item 6.33 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.035 - Manter uma única área de armazenamento classe I ou II instalada em postos revendedores de combustíveis líquidos, conforme item 5.7 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.036 - As instalações elétricas das áreas de armazenamento de recipientes transportáveis de GLP e seu entorno até uma distância de 3, 0 m, medidos a partir dos limites dos lotes de recipientes e do topo das pilhas de armazenamento, devem ser projetadas e executadas de acordo com as ABNT NBR 5410 e ABNT NBR IEC 60079 - 14, conforme item 6.39 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.037 - Instalar, na entrada do imóvel, placa que indique a classe de armazenamento e a capacidade de armazenamento de GLP, em Kg, conforme item 6.19 da NT 05 / 2021 - PARTE II - CBMDF e item 6.2 da NT 22 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.038 - A área de armazenamento de GLP deverá possuir placa, em local visível no acesso principal da área de risco, a uma altura de 1, 80 m, medida do solo até a base da placa, com os dizeres PERIGO - INFLAMÁVEL e PROIBIDO O USO DE FOGO E DE QUALQUER INSTRUMENTO QUE PRODUZA FAÍSCA, conforme item 6.2 da NT 22 / 2020 - CBMDF e item 5.5 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.039 - As formas geométricas, dimensões das placas, altura mínima das letras em função da distância de leitura, cores, contraste e símbolos para elaboração e execução dos projetos do sistema de sinalização de segurança contra incêndio e pânico devem obedecer ao previsto na NT 22 / 2020 - CBMDF e item 5.6 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.040 - A área de armazenamento de GLP de Classe I ou II deve possuir 02 aparelhos extintores portáteis com capacidade extintora 20B cada, conforme item 5.4 da NT 5 / 2021 - CBMDF e tabela 05 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.041 - A área de armazenamento de GLP de Classe III ou IV deve possuir 03 aparelhos extintores portáteis com capacidade extintora 20B cada, conforme item 5.4 da NT 06 / 2021 - CBMDF e tabela 05 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.042 - A área de armazenamento de GLP de Classe V deve possuir 04 aparelhos extintores portáteis com capacidade extintora 20B cada, conforme item 5.4 da NT 05 / 2021 - PARTE II - CBMDF e tabela 05 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.043 - A área de armazenamento de GLP de Classe VI ou VII deve possuir 06 aparelhos extintores portáteis com capacidade extintora 20B cada, conforme item 5.4 da NT 05 / 2021 - PARTE II - CBMDF e tabela 05 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.044 - A área de armazenamento de GLP de Classe Especial deve possuir 08 aparelhos extintores portáteis com capacidade extintora 20B cada, conforme item 5.4 da NT 05 / 2021 - PARTE II - CBMDF e tabela 05 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.045 - A área de armazenamento de GLP de Classe IV deve possuir 01 aparelho extintor sobre rodas com capacidade extintora 80B, conforme item 5.4 da NT 5 / 2021 - CBMDF e tabela 10 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.046 - A área de armazenamento de GLP de Classe V ou VI deve possuir 02 aparelhos extintores sobre rodas com capacidade extintora 80B cada, conforme item 5.4 da NT 05 / 2021 - PARTE II - CBMDF e tabela 10 da NT 3 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.047 - A área de armazenamento de GLP de Classe VII ou Especial deve possuir 03 aparelhos extintores sobre rodas com capacidade extintora 80B cada, conforme item 5.4 da NT 05 / 2021 - PARTE II - CBMDF e tabela 10 da NT 03 / 2015 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.048 - Instalar sistema de resfriamento para as áreas de armazenamento classe V a Especial conforme preceitos da NT 04 / 2000 - CBMDF, de acordo com o item 7 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.049 - Instalar sistema de proteção por hidrantes de parede nas áreas de armazenamento classe V e VI, com esguicho regulável e RTI dimensionada para autonomia mínima de 30 min, conforme item 7.2 e item 7.6 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.050 - Instalar sistema de proteção por hidrante de parede e canhões monitores, com esguichos reguláveis, com funcionamento simultâneo, nas áreas de armazenamento de recipientes transportáveis da classe VII, com autonomia mínima de 45 minutos para a reserva técnica de incêndio, considerando, no mínimo duas linhas de mangueiras e um canhão monitor em funcionamento simultâneo, conforme item 7.2 e item 7.7 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.051 - Instalar sistema de proteção por hidrante de parede e canhões monitores, com esguichos reguláveis, com funcionamento simultâneo, nas áreas de armazenamento de recipientes transportáveis da Classe Especial, com autonomia mínima de 60 minutos para a reserva técnica de incêndio, considerando, no mínimo duas linhas de mangueiras e um canhão monitor em funcionamento simultâneo, conforme item 7.2 e item 7.8 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.052 - Instalar duas bombas de incêndio(principal e reserva) com mesmas características de pressão e vazão, atendendo os parâmetros da NT 04 / 2000 - CBMDF, conforme item 7.9.1 e item 7.9.2 da NT 05 / 2021 - PARTE IICBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.053 - Instalar reserva de água específica para combate a incêndio(Reserva Técnica de Incêndio - RTI), podendo ser própria ou compartilhada, desde que a reserva mínima seja igual ao somatório das necessidades individuais.A capacidade volumétrica da RTI deve ser dimensionada de forma a garantir vazão e pressão, observando autonomia mínima dos sistemas de resfriamento, conforme itens 7.10.1 e 7.10.2 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.054 - Proteger toda a superfície exposta dos recipientes transportáveis, quando da utilização de sistema de resfriamento nas áreas de armazenamento de GLP, conforme item 7.3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.055 - Pintar de cor vermelha todos os componentes da rede de incêndio aparentes, excluindo equipamentos como válvulas angulares dos hidrantes e outros equipamentos cuja pintura prejudique sua operação, conforme item 7.5 da NT 05 / 2021 - PARTE II - CBMDF. (Arts. 3º, II, g, e 6º, do Dec. 23.154 / 2002)",
					"16.056 - Os hidrantes devem ser dispostos na rede, de forma que cada ponto da área seja protegido por no mínimo duas linhas de hidrante, situado a uma distância máxima de 30 metros, com vazão mínima de 800 L / min, conforme item 7.11.1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.057 - Os hidrantes devem ser distribuídos e instalados em locais de fácil acesso e devem permanecer desobstruídos.Os afastamentos mínimos dos hidrantes com relação aos recipientes devem ser no mínimo os afastamentos previstos para limites do imóvel, conforme item 7.11.2 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.058 - Os hidrantes devem possuir duas saídas com diâmetro nominal de 65 mm, dotadas de válvulas e conexões tipo 'storz'. A altura destas válvulas deve estar compreendida entre 1 e 1, 5 m.É admitida uma única saída(hidrante simples) para as áreas de armazenamento da classe V, conforme item 7.11.3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.059 - Instalar, a uma distância máxima de 1, 5 m de cada hidrante, um abrigo contendo quatro mangueiras de incêndio, com 15 m de comprimento cada, e demais acessórios hidráulicos, conforme item 7.11.4 da NT 05 / 2021 - PARTE II - CBMDF. (Arts. 4º, d, e 6º, do Dec. 23.154 / 2002)",
					"16.060 - A área de armazenamento de recipientes transportáveis deve possuir, no mínimo, um hidrante de recalque no sistema de resfriamento, em local de fácil acesso a uma distância de 1 até 10 metros das vias públicas, conforme item 7.11.5 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.061 - O número mínimo de canhões monitores, que podem ser fixos ou portáteis, quando exigido para área de armazenamento deve atender a proporção mínima de 1 canhão monitor para proteção de 49.920 kg de GLP dispostos em lotes, conforme item 7.12.1 e item 7.12.2 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.062 - Os canhões monitores devem ser especificados para permitir uma vazão de no mínimo 800 L / min e pressão de 549, 25 KPa(56 mca), um giro horizontal de 360° e um curso vertical de 80° para cima e 15° para baixo da horizontal.Deve ser considerado o alcance máximo, na horizontal, de 45 m, quando em jato, conforme item 7.12.3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.063 - Manter distância mínima de 1, 5 m entre a área de armazenamento de GLP e aberturas para captação de águas pluviais, canaletas, ralos, rebaixos ou similares, conforme item 6.17 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.064 - Para que mais de uma área de armazenamento localizadas num mesmo imóvel sejam consideradas separadas, estas deverão manter entre si distância não inferior à soma das distâncias mínimas previstas na tabela do Anexo 01 da NT 05 / 2021 - PARTE II - CBMDF, para o limite do imóvel, com ou sem muros, conforme itens 6.16 e 6.23 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.065 - Quando veículos transportadores de recipientes necessitarem permanecer estacionados no interior do imóvel, deverá existir área delimitada por pintura de piso destinada a esta finalidade a uma distância mínima de 3, 0 m, contada a partir do bocal de descarga do motor aos limites das áreas de armazenamento, conforme 6.25 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.066 - A área de armazenamento de GLP de Classe I deverá manter distância mínima de 1, 0 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de no mínimo 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.067 - A área de armazenamento de GLP de Classe II deverá manter distância mínima de 2, 0 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de no mínimo 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.068 - A área de armazenamento de GLP de Classe III deverá manter distância mínima de 3, 0 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de no mínimo 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.069 - A área de armazenamento de GLP de Classe IV deverá manter distância mínima de 3, 50 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de no mínimo 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.070 - A área de armazenamento de GLP de Classe V deverá manter distância mínima de 4, 0 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de no mínimo 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.071 - A área de armazenamento de GLP de Classe VI deverá manter distância mínima de 5, 0 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de, no mínimo, 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.072 - A área de armazenamento de GLP de Classe VII deverá manter distância mínima de 7, 0 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de, no mínimo, 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.073 - A área de armazenamento de GLP de Classe Especial deverá manter distância mínima de 10, 0 m até o limite do imóvel, inclusive com passeio público, quando delimitada por muro de, no mínimo, 1, 8 m de altura, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.074 - A área de armazenamento de GLP de Classe I deverá manter distância mínima de 1, 5 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 8 m de altura, quando não houver passeio público e 1, 3 m, quando houver passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.075 - A área de armazenamento de GLP de Classe II deverá manter distância mínima de 3, 0 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 8 m de altura, quando não houver passeio público e 2, 5 m, quando houver passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.076 - A área de armazenamento de GLP de Classe III deverá manter distância mínima de 4, 5 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 8 m de altura, quando não houver passeio público e 3, 5 m, quando houver passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.077 - A área de armazenamento de GLP de Classe IV deverá manter distância mínima de 5, 0 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 8 m de altura, quando não houver passeio público e 4, 0 m, quando houver passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.078 - A área de armazenamento de GLP de Classe V deverá manter distância mínima de 6, 0 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 8 m de altura, quando não houver passeio público e 5, 0 m, quando houver passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.079 - A área de armazenamento de GLP de Classe VI deverá manter distância mínima de 7, 5 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 8 m de altura, quando não houver passeio público e 6, 0 m, quando houver passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.080 - A área de armazenamento de GLP de Classe VII deverá manter distância mínima de 10, 0 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 8 m de altura, quando não houver passeio público e 8, 0 m, quando houver passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.081 - A área de armazenamento de GLP de Classe Especial deverá manter distância mínima de 15, 0 m até o limite do imóvel, quando não delimitada por muro de, no mínimo, 1, 80 m de altura, com ou sem passeio público, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.082 - A área de armazenamento de GLP de Classe I deverá manter distância mínima de 5, 0 m de equipamentos e máquinas que produzam calor, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.083 - A área de armazenamento de GLP de Classe II deverá manter distância mínima de 7, 5 m de equipamentos e máquinas que produzam calor, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.084 - A área de armazenamento de GLP de Classe III, IV, V, VI e VII deverão manter distância mínima de 14, 0 m de equipamentos e máquinas que produzam calor, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.085 - A área de armazenamento de GLP de Classe Especial deverá manter distância mínima de 15, 0 m de equipamentos e máquinas que produzam calor, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.086 - A área de armazenamento de GLP de Classe I deverá manter distância mínima de 1, 5 m de bombas de combustíveis, descargas de motores à explosão não instalados em veículos e outras fontes de ignição, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.087 - A área de armazenamento de GLP de Classe II, III, IV, V, VI, VII e Especial deverão manter distância mínima de 3, 0 m de bombas de combustíveis, descargas de motores à explosão não instalados em veículos e outras fontes de ignição, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.088 - A área de armazenamento de GLP de Classe I deverá manter distância mínima de 10, 0 m de locais de reunião de público, com capacidade superior a 200 pessoas, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.089 - A área de armazenamento de GLP de Classe II deverá manter distância mínima de 15, 0 m de locais de reunião de público, com capacidade superior a 200 pessoas, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.090 - A área de armazenamento de GLP de Classe III deverá manter distância mínima de 40, 0 m de locais de reunião de público, com capacidade superior a 200 pessoas, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.091 - A área de armazenamento de GLP de Classe IV deverá manter distância mínima de 45, 0 m de locais de reunião de público, com capacidade superior a 200 pessoas, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.092 - A área de armazenamento de GLP de Classe V deverá manter distância mínima de 50, 0 m de locais de reunião de público, com capacidade superior a 200 pessoas, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.093 - A área de armazenamento de GLP de Classe VI deverá manter distância mínima de 75, 0 m de locais de reunião de público, com capacidade superior a 200 pessoas, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.094 - A área de armazenamento de GLP de Classe VII e Especial deverá manter distância mínima de 90, 0 m de locais de reunião de público, com capacidade superior a 200 pessoas, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.095 - A área de armazenamento de GLP de Classe I deverá manter distância mínima de 1, 0 m de edificações, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.096 - A área de armazenamento de GLP de Classe II deverá manter distância mínima de 2, 0 m de edificações, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.097 - A área de armazenamento de GLP de Classe III, IV, V, VI, VII e Especial deverão manter distância mínima de 03 m de edificações, podendo ser reduzida pela metade com a construção de parede resistente ao fogo, conforme itens 6.16 e 6.28 e tabela do anexo 1 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.098 - É permitida a instalação de área de armazenamento de recipientes transportáveis de GLP em imóvel utilizado como residência, porém é necessária a separação física por meio de muros de alvenaria ou material semelhante com acessos independentes e rotas de fugas distintas, conforme item 6.22 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.099 - O empilhamento de cilindros de GLP só é permitido para botijões de, no máximo, 13 Kg, devendo obedecer aos limites previstos na tabela 02, conforme item 6.12 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.100 - Armazenar obrigatoriamente na posição vertical, sem empilhamentos, os recipientes de massa líquida superior a 13 kg, conforme item 6.13 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.101 - Os recipientes transportáveis de GLP, cheios, parcialmente utilizados ou vazios não podem ser depositados fora da área de armazenamento, com exceção dos que estiverem sobre veículo de transporte ou área de apoio, conforme item 6.18 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.102 - O empilhamento de recipiente inferior a 05 kg, na área de armazenamento de GLP deverá ser de, no máximo, 1, 5 m de altura, para cilindros cheios ou vazios, conforme tabela 2 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.103 - O empilhamento de recipiente de 05 Kg até inferior a 13 Kg, na área de armazenamento de GLP, deverá ser de, no máximo, 05 cilindros cheios ou vazios, conforme tabela 2 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.104 - O empilhamento de recipiente de 13 Kg, na área de armazenamento de GLP, deverá ser de, no máximo, 04 cilindros cheios ou 05 vazios, conforme tabela 2 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.105 - O número máximo de paletes empilhados para armazenamento de recipientes de GLP deverá ser de 02 paletes para cilindros de 05 Kg, 20 Kg ou 45 Kg, conforme item 6.38 e tabela 3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.106 - O número máximo de paletes empilhados para armazenamento de recipientes de GLP deverá ser de 06 paletes para cilindros de 13 Kg, conforme item 6.38 e tabela 3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.107 - O número máximo de recipientes de GLP em palete deverá ser de 240 para cilindros de 05 Kg, conforme item 6.38 e tabela 3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.108 - O número máximo de recipientes de GLP em palete deverá ser de 35 para cilindros de 13 Kg, conforme item 6.38 e tabela 3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.109 - O número máximo de recipientes de GLP em palete deverá ser de 42 para cilindros de 20 Kg, conforme item 6.38 e tabela 3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"16.110 - O número máximo de recipientes de GLP em palete deverá ser de 29 para cilindros de 45 Kg, conforme item 6.38 e tabela 3 da NT 05 / 2021 - PARTE II - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
				],
				'017': [
					"17.001 - Instalar no food truck Dispositivo Residual Diferencial(DR) de alta sensibilidade(30 mA), conforme item 5.1.3 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.002 - Isolar e proteger fiação elétrica das estruturas do food truck, por meio de calhas, canaletas, eletrodutos ou cabo duplamente protegido, de acordo com a NBR 5410 /04 da ABNT e conforme item 5.1.4 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.003 - Instalar as tomadas do food truck com características técnicas e padronização de acordo com a NBR 14136 da ABNT, em conformidade com o item 5.1.5 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.004 - O uso de gerador de energia deve manter afastamento mínimo de 3, 0 m dos recipientes de GLP, de acordo com a alínea a do item 5.1.6 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.005 - O gerador de energia deve ser isolado e afastado do público de forma a evitar manuseios indevidos, de acordo com a alínea b do item 5.1.6 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.006 - O gerador de energia deve possuir os cabos de distribuição elétrica nosolo possuindo isolamento adicional para proteção contra choques mecânicos e contra contato com líquidos, podendo estar dentro de calhas, caneletas ou eletrodutos, conforme a NBR 5410 da ABNT, de acordo com a alínea c do item 5.1.6 da NT 39 / 2021 - CBMDF.",
					"17.007 - Retirar do food truck outros tipos de fonte de energia para cocção de alimentos diferentes de carvão ou lenha, eletricidade ou botijões P13 de GLP, de acordo com o item 5.2.1 da NT 39 / 2021 - CBMDF.",
					"17.008 - Instalar no food truck no máximo 02 botijões do tipo P13 de GLP em área com ventilação natural que impossibilite o acúmulo em caso de vazamento, protegidos do acesso de terceiros, não interligados, dotados de válvula redutora de pressão e mangueiras revestidas por malha de aço de no máximo 1, 25 m, com sistema de detecção para vazamentos de GLP, de acordo com o item 5.2.2 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.009 - Na necessidade de instalações de mangueiras de GLP maiores que 1, 25 m, instalar tubos multicamadas, conforme legislação específica, de acordo com o item 5.2.2.1 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.010 - Instalar registro de corte para cada ponto de consumo e no recipiente P - 13 utilizado, de acordo com o item 5.2.3 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.011 - Fixar os recipientes de GLP P13 por meio de correias, estruturas removíveis, entre outras, de forma a prevenir vibrações, impactos e deslocamentos indevidos, de acordo com o item 5.2.4 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.012 - Manter os recipientes de GLP desconectados dos equipamentos de consumo, durante o deslocamento em trânsito do food truck, de acordo com o item 5.2.5 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.013 - Instalar sinalização indicando a localização dos recipientes de GLP quando a instalação for no interior de compartimento do food truck de forma a facilitar ações em caso de emergência, de acordo com o item 5.2.6 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.014 - Instalar um aparelho extintor para a proteção das classes de fogo 'A, B e C', com capacidade 3A: 20B: C, no mínimo, de acordo com o item 5.3.1 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.015 - Deve permanecer instalado o aparelho extintor no veículo, durante o estabelecimento, funcionamento do food truck e comercialização de alimentos, de acordo com a alínea a do item 5.3.2 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.016 - Deve estar sinalizado e desobstruído o aparelho extintor, durante o estabelecimento, funcionamento do food truck e comercialização de alimentos, obedecendo aos critérios estabelecidos por meio da NT 3 / 2015 - CBMDF; podendo ficar no interior do veículo quando o food truck não estiver em funcionamento, de acordo com as alíneas b e c do item 5.3.2 e item 5.3.3 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.017 - Retirar do food truck recipientes com reserva de líquidos inflamáveis, de acordo com o item 6.1 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.018 - Devem ser limpos os componentes do sistema de ventilação da cozinha, inclusive dutos, por ocasião das atividades de manutenção programada, devendo ser comprovada por meio de laudos técnicos, obedecendo à periodicidade prevista na ABNT NBR 14518: 2020, de acordo com o item 6.2 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.019 - Instalar sinalização nos estais e suportes de fixação de tendas utilizados pelo food truck, de acordo com o item 6.3 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
					"17.020 - Os recipientes de GLP, no interior do food truck, quando em funcionamento ou não, devem estar em compartimento com ventilação inferior, interligando o piso ao ambiente externo.A ventilação deve possuir abertura efetiva mínima de 100 cm², podendo apresentar quaisquer desenhos ou formatos e ainda permanecer sempre desobstruída, de acordo com os itens 6.6 e 6.7 da NT 39 / 2021 - CBMDF. (Art. 6º, do Dec. 23.154 / 2002)",
				],
				'018': [
					"18.001 - Os estabelecimentos que comercializam fogos de artifício devem instalar os sistemas de segurança contra incêndio e pânico em conformidade com o Projeto de Incêndio aprovado no CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)",
					"18.002 - Os locais de comércio de fogos de artifício deverão ter a condição de risco isolado de qualquer outra edificação, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.003 - Não é permitido o uso ou manejo de materiais ou produtos que provoquem chama ou faíscas no interior dos locais de comércio de fogos de artifício, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.004 - Não é permitido o comércio de produtos separados das respectivas unidades (caixas) de fogos de artifícios (venda a granel), conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.005 - As placas de sinalização de emergência nos locais de comércio de fogos de artifício devem vir acompanhadas de placas de proibição com os seguintes dizeres: PROIBIDO FUMAR, PRODUZIR CHAMAS OU FAÍSCAS – RISCO DE INCÊNDIO E EXPLOSÃO – OS FOGOS CLASSES C e D NÃO PODEM SER VENDIDOS A MENORES DE 18 ANOS – nas dimensões, cores, formas e materiais estabelecidas conforme norma específica, instalados próximo ao(s) mostruário(s), conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.006 - Os locais de comércio de fogos de artifício devem possuir área de armazenamento exclusivo para fogos, segregada das demais dependências do estabelecimento, caso comercializem fogos classes C e D (bombas até três polegadas), conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.007 - O local de armazenamento de fogos de artifício deve ser identificado com placa de sinalização com os seguintes dizeres: ÁREA DE ARMAZENAMENTO, ACESSO RESTRITO nas portas de acesso à altura de 1,80 m do piso acabado à base da placa, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.008 - O local de armazenamento de fogos de artifício deve ser construído com material incombustível (alvenaria, concreto ou divisória metálica), conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.009 - O local de armazenamento de fogos de artifício deve possuir abertura para o espaço livre exterior com ventilação natural distando de 20 cm a 30 cm abaixo do teto, com abertura mínima de 20 cm a 40 cm de largura e altura máxima de 20 cm a 40 cm para cada 20 m² de área, protegida com tela com trama de aço, inclusive na parede oposta, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.010 - O material armazenado em locais de comércio ou armazenamento de fogos de artifício deverá distar de no mínimo 20 cm abaixo da projeção horizontal da base da abertura de ventilação, conforme NT 08/2008CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.011 - O local de armazenamento de fogos de artifício deve possuir iluminação com lâmpada fria no seu interior e interruptores externos ao local de armazenamento, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.012 - O piso do local de armazenamento de fogos de artifício deve ser construído com material incombustível, e que não permita acúmulo de água, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.013 - Instalar prateleiras para área de armazenamento de fogos de artifício, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.014 - A quantidade máxima de massa explosiva permitida para armazenamento em um posto de comercialização é de 864 g de massa explosiva por metro cúbico do local de armazenamento para fogos de artifício de classes A, B, C e D em estado acabado e bombas até 03 polegadas, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.015 - Nos locais de comércio de fogos de artifício é permitida à exposição de fogos de artifícios (mostruário) de classe A e B com carga explosiva e bombas para as classes C e D desde que sem a carga explosiva, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.016 - A quantidade máxima de massa explosiva total no mostruário do local de comércio de fogos de artifício deve ser de 1 Kg, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
					"18.017 - Os foguetes, rojões e similares, classe C e D podem ser expostos para venda nos locais de comércio de fogos de artifício, desde que contidos em suas embalagens originais, em prateleiras abertas, na quantidade máxima de 1 Kg de massa explosiva total, somada com as classes A e B, conforme NT 08/2008-CBMDF. (Art. 6º, do Dec. 23.154/2002)",
				]
			}
		};

		let camposDeExigenciasAtivos = {}; // Para controlar quais categorias já estão ativas e suas exigências

		document.addEventListener('DOMContentLoaded', () => {
			preencherSelectCategorias();
			// Masking inputs
            $('#cpf').mask('000.000.000-00', { reverse: false });
            $('#cnpj').mask('00.000.000/0000-00', { reverse: true });
            $('#areaConstruida').mask('000.000.000.000.000,00', { reverse: true });

			// CNPJ Lookup Functionality
			const cnpjInput = document.getElementById('cnpj');
			const enderecoInput = document.getElementById('endereco');
			const instituicaoInput = document.getElementById('instituicao'); 
			const localizacaoInput = document.getElementById('localizacao');

			cnpjInput.addEventListener('blur', function () {
			let cnpj = cnpjInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

			if (cnpj.length === 14) { // Verifica se o CNPJ tem 14 dígitos
				Utils.showToast("Buscando dados do CNPJ...", "info");
				// Usando BrasilAPI (resolvendo o problema de CORS)
				fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
					.then(response => {
						if (!response.ok) {
							return response.json().then(err => { throw new Error(err.message || 'Erro ao buscar CNPJ.'); });
						}
						return response.json();
					})
					.then(data => {
						if (data.type === 'invalid_parameter' || data.type === 'service_error') {
							throw new Error(data.message || 'CNPJ não encontrado ou inválido pela API.');
						}

						const enderecoCompleto = `${data.logradouro}, ${data.numero || 'S/N'}, ${data.bairro}, ${data.municipio} - ${data.uf}`;
						enderecoInput.value = enderecoCompleto.toUpperCase();
						instituicaoInput.value = data.razao_social.toUpperCase(); 

						enderecoInput.classList.remove('is-invalid');
						instituicaoInput.classList.remove('is-invalid');
						Utils.showToast("Dados do CNPJ preenchidos!", "success");

						// -------- NOVA LÓGICA PARA BUSCAR COORDENADAS --------
						const enderecoParaGeocodificar = encodeURIComponent(enderecoCompleto + ', Brasil'); // Adicione 'Brasil' para melhor precisão
						Utils.showToast("Buscando coordenadas geográficas...", "info");
						fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${enderecoParaGeocodificar}&limit=1`)
							.then(geoResponse => {
								if (!geoResponse.ok) {
									throw new Error('Erro ao buscar coordenadas. Status: ' + geoResponse.status);
								}
								return geoResponse.json();
							})
							.then(geoData => {
								if (geoData.length > 0) {
									const lat = parseFloat(geoData[0].lat).toFixed(6); // Formata para 6 casas decimais
									const lon = parseFloat(geoData[0].lon).toFixed(6); // Formata para 6 casas decimais
									localizacaoInput.value = `${lat}, ${lon}`;
									localizacaoInput.classList.remove('is-invalid');
									Utils.showToast("Coordenadas geográficas preenchidas!", "success");
								} else {
									localizacaoInput.value = '';
									localizacaoInput.classList.add('is-invalid');
									Utils.showToast("Coordenadas não encontradas para o endereço.", "warning");
								}
							})
							.catch(geoError => {
								console.error('Erro na requisição da API de Geocodificação:', geoError);
								localizacaoInput.value = '';
								localizacaoInput.classList.add('is-invalid');
								Utils.showToast('Erro ao buscar coordenadas. Tente novamente mais tarde.', "danger");
							});
						// ---------------- FIM DA NOVA LÓGICA ----------------

					})
					.catch(error => {
						console.error('Erro na requisição da API de CNPJ:', error);
						enderecoInput.value = '';
						instituicaoInput.value = '';
						localizacaoInput.value = ''; // Limpa também a localização em caso de erro no CNPJ
						enderecoInput.classList.add('is-invalid');
						instituicaoInput.classList.add('is-invalid');
						localizacaoInput.classList.add('is-invalid');
						Utils.showToast(`Ocorreu um erro ao buscar os dados: ${error.message || 'Verifique o CNPJ ou sua conexão.'}`, "danger");
					});
			} else {
				enderecoInput.value = '';
				instituicaoInput.value = '';
				localizacaoInput.value = ''; // Limpa se o CNPJ não tiver 14 dígitos
			}
		});

			// Preenche o formulário automaticamente ao acessar com ?processo=...
			const params = new URLSearchParams(window.location.search);
			const processoParam = params.get("processo");
			if (processoParam) {
				const processoInput = document.getElementById("processoBusca");
				if (processoInput) {
					processoInput.value = processoParam;
					document.getElementById("buscarProcesso").click();
				}
			}

			// Apply initial status color on load
			aplicarCorDoStatus(document.getElementById("status").value || "Sem Status");
		});

		function preencherSelectCategorias() {
			const select = document.getElementById('selectCategoriaExigencia');
			for (const chave in DADOS_SISTEMA.categorias) {
				const option = document.createElement('option');
				option.value = chave;
				option.textContent = DADOS_SISTEMA.categorias[chave];
				select.appendChild(option);
			}
		}

		document.getElementById('selectCategoriaExigencia').addEventListener('change', function () {
			const categoria = this.value;
			if (categoria && !camposDeExigenciasAtivos[categoria]) {
				adicionarCategoria(categoria);
				this.value = ""; // Reseta o select
			}
		});

		function adicionarCategoria(categoria) {
			if (camposDeExigenciasAtivos[categoria]) return;

			// ... dentro da função adicionarCategoria(categoria)
			const container = document.getElementById('exigenciasContainer');
			const spinnerElement = document.getElementById('algumIdDoSpinner'); // Obtenha o elemento do spinner

			// Remove a classe loading-spinner do container, que o tornava invisível
			container.classList.remove('loading-spinner');
			// Torna o container visível (caso não estivesse, pode ser redundante se a classe já faz isso)
			container.style.display = 'block';

			// Oculta o elemento do spinner
			if (spinnerElement) {
				spinnerElement.style.display = 'none'; // Ou adicione uma classe CSS que o oculte (ex: d-none do Bootstrap)
			}

			const divCategoria = document.createElement('div');
			divCategoria.id = `exigencias-categoria-${categoria}`;
			divCategoria.classList.add('card', 'mb-3', 'p-3');

			divCategoria.innerHTML = `
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h5 class="mb-0">${DADOS_SISTEMA.categorias[categoria]}</h5>
					<button type="button" class="btn-close-custom" aria-label="Remover Categoria" onclick="removerCategoria('${categoria}')">[X]</button>
				</div>
				<div class="mb-3">
					<div class="autocomplete-container">
						<input type="text" class="form-control exigencia-autocomplete" placeholder="Adicionar exigência de ${DADOS_SISTEMA.categorias[categoria]}" data-categoria="${categoria}">
						<div class="autocomplete-list"></div>
					</div>
				</div>
				<div id="exigencias-inputs-${categoria}" class="d-flex flex-wrap"></div>
			`;
			container.appendChild(divCategoria);

			// Marca categoria como ativa, mesmo sem exigência
			camposDeExigenciasAtivos[categoria] = [];

			// Mostra como tag também
			adicionarBadgeCategoria(categoria);

			const autocompleteInput = divCategoria.querySelector('.exigencia-autocomplete');
			setupAutocomplete(autocompleteInput, categoria);
		}

		function adicionarBadgeCategoria(categoria) {
			const wrapper = document.getElementById("badgesCategorias");

			// Impede duplicação visual
			if (document.getElementById(`badge-categoria-${categoria}`)) return;

			const span = document.createElement("span");
			span.className = "tag status-sem-status"; // Using a neutral tag style, adjust as needed
			span.id = `badge-categoria-${categoria}`;
			span.innerHTML = `
				${DADOS_SISTEMA.categorias[categoria]}
				<button type="button" class="btn-close-custom" onclick="removerCategoria('${categoria}')">[X]</button>
			`;

			wrapper.appendChild(span);
		}

		function removerCategoria(categoria) {
			document.getElementById(`exigencias-categoria-${categoria}`)?.remove();
			document.getElementById(`badge-categoria-${categoria}`)?.remove();
			delete camposDeExigenciasAtivos[categoria];
		}

		function adicionarExigencia(categoria, exigencia) {
			if (!camposDeExigenciasAtivos[categoria]) {
				adicionarCategoria(categoria);
			}
			if (!camposDeExigenciasAtivos[categoria].includes(exigencia)) {
				camposDeExigenciasAtivos[categoria].push(exigencia);

				const badgesContainer = document.getElementById(`exigencias-inputs-${categoria}`);
				// Encode exigency string for use in ID to prevent issues with special characters
				const encodedExigency = btoa(exigencia).replace(/=/g, ''); // Remove padding for cleaner ID

				// Cria o elemento <span> para a tag visível
				const tagSpan = document.createElement('span');
				tagSpan.className = "tag";
				tagSpan.id = `tag-${categoria}-${encodedExigency}`;
				tagSpan.innerHTML = `
                    ${exigencia}
                    <button type="button" class="btn-close-custom" onclick="removerExigencia('${categoria}', '${encodedExigency}', '${exigencia}')" aria-label="Remover">[X]</button>
                `;

				// Cria o elemento <input type="hidden"> para coletar o dado
				const hiddenInput = document.createElement('input');
				hiddenInput.type = 'hidden';
				hiddenInput.name = 'exigencias[]'; // Importante para coletar com querySelectorAll
				hiddenInput.value = exigencia;

				badgesContainer.appendChild(tagSpan);
				badgesContainer.appendChild(hiddenInput); // Adiciona o input oculto

				// Re-setup do autocomplete para atualizar a lista (adicionar a exigência de volta)
				const autocompleteInput = document.querySelector(`#exigencias-categoria-${categoria} .exigencia-autocomplete`);
				if (autocompleteInput) {
					const event = new Event('input', { bubbles: true, cancelable: true });
					autocompleteInput.dispatchEvent(event);
				}
			}
		}

		function removerExigencia(categoria, encodedExigenciaId, exigenciaValue) {
			if (camposDeExigenciasAtivos[categoria]) {
				const index = camposDeExigenciasAtivos[categoria].indexOf(exigenciaValue);
				if (index > -1) {
					camposDeExigenciasAtivos[categoria].splice(index, 1);
					// Remove the tag element by its ID
					document.getElementById(`tag-${categoria}-${encodedExigenciaId}`)?.remove();

					// Remove all hidden inputs with this specific exigency value
					document.querySelectorAll(`input[name="exigencias[]"][value="${exigenciaValue}"]`).forEach(input => input.remove());

					// Re-setup do autocomplete para atualizar a lista (adicionar a exigência de volta)
					const autocompleteInput = document.querySelector(`#exigencias-categoria-${categoria} .exigencia-autocomplete`);
					if (autocompleteInput) {
						const event = new Event('input', { bubbles: true, cancelable: true });
						autocompleteInput.dispatchEvent(event);
					}
				}
			}
		}

		function setupAutocomplete(inputElement, categoria) {
			const autocompleteList = inputElement.nextElementSibling; // O div.autocomplete-list logo após o input

			inputElement.addEventListener('input', function () {
				const searchTerm = this.value.toLowerCase();
				autocompleteList.innerHTML = ''; // Limpa a lista anterior

				if (searchTerm.length === 0) {
					autocompleteList.style.display = 'none';
					return;
				}

				const sugestoes = DADOS_SISTEMA.exigencias[categoria] || [];
				// Filtra as sugestões, removendo as que já estão ativas para esta categoria
				const filteredSugestoes = sugestoes.filter(sugestao =>
					sugestao.toLowerCase().includes(searchTerm) &&
					!camposDeExigenciasAtivos[categoria].includes(sugestao)
				);

				if (filteredSugestoes.length > 0) {
					filteredSugestoes.forEach(sugestao => {
						const item = document.createElement('div');
						item.classList.add('autocomplete-item');
						item.textContent = sugestao;
						item.addEventListener('click', () => {
							adicionarExigencia(categoria, sugestao);
							inputElement.value = ''; // Limpa o input após adicionar
							autocompleteList.innerHTML = '';
							autocompleteList.style.display = 'none';
						});
						autocompleteList.appendChild(item);
					});
					autocompleteList.style.display = 'block';
				} else {
					autocompleteList.style.display = 'none';
				}
			});

			// Oculta a lista de autocomplete quando o input perde o foco
			inputElement.addEventListener('blur', () => {
				setTimeout(() => {
					autocompleteList.style.display = 'none';
				}, 100); // Pequeno atraso para permitir o clique no item
			});
		}


		// Máscara do processo
		const processoInput = document.getElementById('processoBusca');
		if (processoInput) { // Ensure element exists before adding listener
			processoInput.addEventListener('input', () => {
				let value = processoInput.value.replace(/\D/g, "");
				let formattedValue = "";

				if (value.length > 0)
					formattedValue += value.substring(0, 5);
				if (value.length > 5)
					formattedValue += "-" + value.substring(5, 13);
				if (value.length > 13)
					formattedValue += "/" + value.substring(13, 17);
				if (value.length > 17)
					formattedValue += "-" + value.substring(17, 19);

				processoInput.value = formattedValue;
			});
		}


		// Máscara do CNPJ //00.000.000/0000-00
		const cnpjInput = document.getElementById('cnpj');
		cnpjInput.addEventListener('input', () => {
			let value = cnpjInput.value.replace(/\D/g, "");
			value = value.replace(/^(\d{2})(\d)/, "$1.$2");
			value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
			value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
			value = value.replace(/(\d{4})(\d)/, "$1-$2");
			cnpjInput.value = value.slice(0, 18);
		});

		// Validação e máscara CPF
		const cpfInput = document.getElementById('cpf');

		// Validação do CPF ao sair do campo
		cpfInput.addEventListener('blur', () => {
			const isValid = Utils.validarCPF(cpfInput.value);
			if (!isValid && cpfInput.value !== '') {
				cpfInput.classList.add('is-invalid');
			} else {
				cpfInput.classList.remove('is-invalid');
			}
		});

		// Lógica para a máscara de Localização
		const localizacaoInput = document.getElementById('localizacao');
		localizacaoInput.addEventListener('input', () => {
			let value = localizacaoInput.value.replace(/\D/g, ""); // Remove tudo que não é dígito

			// Aplica o primeiro hífen (da latitude)
			// Ex: "123" -> "-123"
			if (value.length > 0) {
				value = "-" + value;
			}

			// Aplica o ponto decimal da latitude
			// Ex: "-123456" -> "-12.3456"
			if (value.length > 3) { // Considerando o hífen e 2 dígitos (-XX)
				value = value.replace(/^(-?\d{2})(\d)/, "$1.$2");
			}

			// Aplica a vírgula e o espaço após a latitude completa
			// Ex: "-12.345678" -> "-12.34567, 8"
			if (value.length > 10) { // Considerando: -XX.YYYYY (10 caracteres no total)
				value = value.replace(/^(-?\d{2}\.\d{6})(\d)/, "$1, $2");
			}

			// Aplica o segundo hífen (da longitude)
			// Ex: "-12.34567, 890" -> "-12.34567, -890"
			if (value.length > 16) { // Considerando: -XX.YYYYY,  (14 caracteres)
				value = value.replace(/^(-?\d{2}\.\d{6}, )(\d{1,2})/, "$1-$2");
			}

			// Aplica o ponto decimal da longitude
			// Ex: "-12.34567, -89012" -> "-12.34567, -89.012"
			if (value.length > 18) { // Considerando: -XX.YYYYY, -XX (17 caracteres)
				value = value.replace(/^(-?\d{2}\.\d{6}, -\d{2})(\d)/, "$1.$2");
			}

			// Limita o tamanho final ao da máscara completa (1 hífen + 2 d.int + 1 ponto + 5 d.dec + 1 vírgula + 1 espaço + 1 hífen + 2 d.int + 1 ponto + 5 d.dec = 20 caracteres)
			localizacaoInput.value = value.slice(0, 22);
		});
		// Busca a localização atual
		document.getElementById('buscarLocalizacao').addEventListener('click', () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const latitude = position.coords.latitude.toFixed(6);
						const longitude = position.coords.longitude.toFixed(6);
						document.getElementById('localizacao').value = `${latitude}, ${longitude}`;
						salvarAutomaticamente();
						Utils.showToast("Localização obtida com sucesso!", "success");
					},
					(error) => {
						let errorMessage = "Erro desconhecido ao buscar localização.";
						switch (error.code) {
							case error.PERMISSION_DENIED:
								errorMessage = "Permissão negada para acessar a localização.";
								break;
							case error.POSITION_UNAVAILABLE:
								errorMessage = "Informação de localização indisponível.";
								break;
							case error.TIMEOUT:
								errorMessage = "Tempo de resposta excedido ao tentar obter localização.";
								break;
						}
						Utils.showToast(errorMessage, "danger");
					},
					{ timeout: CONFIG.GEOLOCATION_TIMEOUT }
				);
			} else {
				Utils.showToast("Seu navegador não suporta geolocalização.", "danger");
			}
		});

		// Apply status color to title
		function aplicarCorDoStatus(status) {
			const titulo = document.getElementById("tituloLaudo");
			// Remove existing status classes (e.g., status-pendente, status-aprovado)
			titulo.classList.remove(...Array.from(titulo.classList).filter(c => c.startsWith('status-')));

			const classe = Utils.formatarClasseStatus(status);
			if (status) {
				titulo.classList.add('text-light', classe);
			} else {
				titulo.classList.add('text-dark', 'status-sem-status'); // Default for no status
			}
		}

		document.getElementById("status").addEventListener("change", function () {
			aplicarCorDoStatus(this.value);
		});


		// Salvar Automaticamente e Carregar
		function salvarAutomaticamente() {
			const processoInput = document.getElementById("processoBusca");
			if (!processoInput) {
				console.error("Element with ID 'processoBusca' not found when attempting to auto-save.");
				return; // Exit if the element doesn't exist
			}
			const processo = processoInput.value;

			if (!processo || processo.length !== 22) { // Ensure a full process number is entered
				Utils.showToast("Informe o número do processo completo para salvar.", "warning");
				return;
			}
			const dados = coletarDadosDoFormulario();
			localStorage.setItem(`processo-${processo}`, JSON.stringify(dados));
			// Utils.showToast("Dados salvos automaticamente!", "success");
			console.log("Auto-salvo:", processo);
		}

		document.querySelectorAll("input, select, textarea").forEach(el => {
			// Exclude process search input from immediate auto-save, as it triggers a load
			if (el.id !== "processoBusca") {
				el.addEventListener("change", Utils.debounce(salvarAutomaticamente, CONFIG.AUTO_SAVE_DELAY));
				el.addEventListener("input", Utils.debounce(salvarAutomaticamente, CONFIG.AUTO_SAVE_DELAY));
			}
		});

		const processoBuscaElement = document.getElementById("processoBusca");
		if (processoBuscaElement) {
			processoBuscaElement.addEventListener("blur", () => {
				// Only auto-save if a full process number is entered (25 chars for mask)
				if (processoBuscaElement.value.length === 25) {
					salvarAutomaticamente();
				}
			});
		}


		// Botão BUSCAR
		document.getElementById("buscarProcesso").addEventListener("click", function () {
			const processoInput = document.getElementById("processoBusca");
			if (!processoInput) {
				console.error("Element with ID 'processoBusca' not found when attempting to search.");
				Utils.showToast("Erro interno: campo de processo não encontrado.", "danger");
				return;
			}
			const processoBuscaValue = processoInput.value; // Store the exact value from the input

			if (!processoBuscaValue || processoBuscaValue.length !== 22) {
				Utils.showToast("Informe o número do processo completo para buscar.", "warning");
				return;
			}

			const dados = localStorage.getItem(`processo-${processoBuscaValue}`);
			if (!dados) {
				Utils.showToast("Processo não encontrado.", "danger");
				// Clear the form if not found
				document.querySelector('form').reset();
				document.getElementById('tituloLaudo').className = 'display-6'; // Reset title style
				document.getElementById('exigenciasContainer').innerHTML = '';
				document.getElementById('badgesCategorias').innerHTML = '';
				camposDeExigenciasAtivos = {};
				document.getElementById("retornoNao").checked = true; // Set default radio
				return;
			}

			const parsedData = JSON.parse(dados);
			// ADICIONE ESTA LINHA: Garante que o campo de processo seja preenchido com o valor que foi buscado
			parsedData.processoBusca = processoBuscaValue;

			preencherFormulario(parsedData);
			Utils.showToast("Processo carregado com sucesso!", "success");
		});

		// Botão SALVAR MANUALMENTE
		document.getElementById("btnSalvar").addEventListener("click", () => {
			const form = document.querySelector('.needs-validation');
			if (!form.checkValidity()) {
				form.classList.add('was-validated');
				Utils.showToast("Por favor, preencha todos os campos obrigatórios.", "danger");
				return;
			}
			salvarAutomaticamente(); // This will save the current form state
			Utils.showToast("Dados salvos com sucesso!", "success");
		});


		function coletarDadosDoFormulario() {
			const exigencias = [];
			document.querySelectorAll('input[name="exigencias[]"]').forEach(input => {
				exigencias.push(input.value);
			});

			const categoriasSelecionadas = Object.keys(camposDeExigenciasAtivos);

			return {
				processoBusca: document.getElementById("processoBusca")?.value || "",
				cnpj: document.getElementById("cnpj")?.value || "",
				instituicao: document.getElementById("instituicao")?.value || "",
				endereco: document.getElementById("endereco")?.value || "",
				localizacao: document.getElementById("localizacao")?.value || "",
				ocupacao: document.getElementById("ocupacao")?.value || "",
				//grupo: document.getElementById("grupo")?.value || "",
				area: document.getElementById("area")?.value || "",
				altura: document.getElementById("altura")?.value || "",
				pavimentos: document.getElementById("pavimentos")?.value || "",
				responsavel: document.getElementById("responsavel")?.value || "",
				tipo: document.getElementById("tipo")?.value || "",
				inicio: document.getElementById("inicio")?.value || "",
				fim: document.getElementById("fim")?.value || "",
				retorno: document.getElementById("retornoSim")?.checked || false,
				acompanhante: document.getElementById("acompanhante")?.value || "",
				cpf: document.getElementById("cpf")?.value || "",
				funcao: document.getElementById("funcao")?.value || "",
				status: document.getElementById("status")?.value || "",
				observacao: document.getElementById("observacao")?.value || "",
				categoriasSelecionadas: categoriasSelecionadas,
				exigencias: exigencias,
				checkConcluido: document.getElementById('checkConcluido').checked,
			};
		}

		function preencherFormulario(data) {
			// Use optional chaining (?.) for robustness when assigning values
			document.getElementById("processoBusca").value = data.processoBusca || "";
			document.getElementById("cnpj").value = data.cnpj || "";
			document.getElementById("instituicao").value = data.instituicao || "";
			document.getElementById("endereco").value = data.endereco || "";
			document.getElementById("localizacao").value = data.localizacao || "";
			document.getElementById("ocupacao").value = data.ocupacao || "";
			//document.getElementById("grupo").value = data.grupo || "";
			document.getElementById("area").value = data.area || "";
			document.getElementById("altura").value = data.altura || "";
			document.getElementById("pavimentos").value = data.pavimentos || "";
			document.getElementById("responsavel").value = data.responsavel || "";
			document.getElementById("tipo").value = data.tipo || "";
			document.getElementById("inicio").value = data.inicio || "";
			document.getElementById("fim").value = data.fim || "";
			if (data.retorno) {
				document.getElementById("retornoSim").checked = true;
			} else {
				document.getElementById("retornoNao").checked = true;
			}
			document.getElementById("acompanhante").value = data.acompanhante || "";
			document.getElementById("cpf").value = data.cpf || "";
			document.getElementById("funcao").value = data.funcao || "";
			document.getElementById("status").value = data.status || "";
			document.getElementById("observacao").value = data.observacao || "";
			document.getElementById('checkConcluido').checked = data.checkConcluido || false;
			aplicarCorDoStatus(data.status || "Sem Status");
			aplicarCorDoStatus(data.geolocation || "Sem Status");

			// Clear existing exigencies and categories before re-filling
			document.getElementById('exigenciasContainer').innerHTML = '';
			document.getElementById('badgesCategorias').innerHTML = '';
			camposDeExigenciasAtivos = {}; // Reset the control of active categories

			if (data.exigencias && Array.isArray(data.exigencias)) {
				data.exigencias.forEach(exigencia => {
					for (const categoriaKey in DADOS_SISTEMA.exigencias) {
						if (DADOS_SISTEMA.exigencias[categoriaKey].includes(exigencia)) {
							adicionarExigencia(categoriaKey, exigencia);
							break;
						}
					}
				});
			}

			// --- Nova lógica para os links de Mapa (Google Maps e Waze) ---

			// Obtenha as referências para os elementos HTML
			const googleMapsContainer = document.getElementById('googleMapsContainer'); // A div do container do Google Maps
			const googleMapsLink = document.getElementById('googleMapsLink');     // O link <a> para Google Maps
			// const locationGpsIcon = document.getElementById('locationGpsIcon'); // O <i>, se ainda for usado separadamente

			const wazeContainer = document.getElementById('wazeContainer');       // A div do container do Waze
			const wazeLink = document.getElementById('wazeLink');                 // O link <a> para Waze

			// A variável 'data' deve ser o objeto que contém a localização, como 'data.localizacao'
			const coordenadas = data.localizacao; // Pega a localização dos dados passados para a função (ex: "latitude,longitude")

			// Verifica se há coordenadas válidas para mostrar os links
			if (coordenadas) {
				// Formata as coordenadas (remove espaços em branco)
				const coordsFormatted = coordenadas.replace(/\s/g, '');

				// --- Lógica para o Google Maps ---
				// Usando o formato de URL exato que você forneceu: http://maps.google.com/maps?q=${coordenadas}
				const googleMapsUrl = `http://maps.google.com/maps?q=${coordsFormatted}`;
				googleMapsLink.href = googleMapsUrl;
				googleMapsLink.title = `Abrir no Google Maps: ${coordsFormatted}`; // Atualiza o título (tooltip)
				googleMapsLink.style.cursor = 'pointer'; // Torna o cursor indicativo de clicável

				// Exibe o container do Google Maps
				googleMapsContainer.classList.add('d-flex');
				googleMapsContainer.style.display = 'flex'; // Garante que esteja visível

				// --- Lógica para o Waze ---
				// O formato do link Waze é https://waze.com/ul?ll=[latitude],[longitude]&navigate=yes
				const wazeUrl = `https://waze.com/ul?ll=${coordsFormatted}&navigate=yes`;
				wazeLink.href = wazeUrl;
				wazeLink.title = `Abrir no Waze: ${coordsFormatted}`; // Atualiza o título (tooltip)
				wazeLink.style.cursor = 'pointer'; // Torna o cursor indicativo de clicável

				// Exibe o container do Waze
				wazeContainer.classList.add('d-flex');
				wazeContainer.style.display = 'flex'; // Garante que esteja visível

				console.log("com localizacao");
				console.log(coordsFormatted);

			} else {
				// Se não houver coordenadas, esconde ambos os containers
				googleMapsContainer.classList.remove('d-flex');
				googleMapsContainer.style.display = 'none'; // Esconde completamente
				wazeContainer.classList.remove('d-flex');
				wazeContainer.style.display = 'none'; // Esconde completamente

				// Certifique-se de que os links também resetam seus hrefs para evitar cliques indesejados
				googleMapsLink.href = '#';
				wazeLink.href = '#';

				console.log("SEM localizacao");
			}

			// O restante do seu código JavaScript, como a lógica para categorias selecionadas, deve vir aqui
			// Also re-add any categories that were selected but had no exigencies
			if (data.categoriasSelecionadas && Array.isArray(data.categoriasSelecionadas)) {
				data.categoriasSelecionadas.forEach(cat => {
					if (!camposDeExigenciasAtivos[cat] && DADOS_SISTEMA.categorias[cat]) { // Only add if not already added by an exigency and category exists
						adicionarCategoria(cat);
					}
				});
			}


			// Also re-add any categories that were selected but had no exigencies
			if (data.categoriasSelecionadas && Array.isArray(data.categoriasSelecionadas)) {
				data.categoriasSelecionadas.forEach(cat => {
					if (!camposDeExigenciasAtivos[cat] && DADOS_SISTEMA.categorias[cat]) { // Only add if not already added by an exigency and category exists
						adicionarCategoria(cat);
					}
				});
			}
		}

		// Botão EXCLUIR
		document.getElementById("btnExcluir").addEventListener("click", () => {
			const processoInput = document.getElementById("processoBusca");
			if (!processoInput) {
				Utils.showToast("Nenhum processo carregado para excluir (campo de processo não encontrado).", "warning");
				return;
			}
			const processo = processoInput.value;

			if (!processo || processo.length !== 22) {
				Utils.showToast("Nenhum processo completo carregado para excluir.", "warning");
				return;
			}

			if (confirm(`Deseja realmente excluir o processo ${processo}?`)) {
				localStorage.removeItem(`processo-${processo}`);
				Utils.showToast("Processo excluído!", "success");
				// Clear the form after deletion
				document.querySelector('form').reset();
				document.getElementById('tituloLaudo').className = 'display-6'; // Reset title style
				document.getElementById('exigenciasContainer').innerHTML = '';
				document.getElementById('badgesCategorias').innerHTML = '';
				camposDeExigenciasAtivos = {};
				document.getElementById("retornoNao").checked = true; // Set default radio
				window.location.href = "index.html";
			}
		});

		// "Gerar Relatório" button
		document.getElementById("btnGerar").addEventListener("click", () => {
			const dadosDoFormulario = coletarDadosDoFormulario();

			// Salva os dados do formulário no localStorage
			// 'dadosRelatorio' é a chave que usaremos no relatorio.html para recuperar os dados
			localStorage.setItem('dadosRelatorio', JSON.stringify(dadosDoFormulario));

			// Redireciona para a página do relatório
			window.location.href = 'relatorio.html';

			// Os consoles e toasts de "dados enviados para o console" não são mais necessários aqui
			console.log("Dados coletados para o relatório:", dadosDoFormulario);
			Utils.showToast("Dados do formulário enviados para o console (F12 > Console).", "info");
		});
