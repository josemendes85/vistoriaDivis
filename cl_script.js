// Dados extraídos do seu arquivo checklist.txt.
// Usei a estrutura { id: "00.000", title: "TÍTULO", text: "TEXTO DO ITEM" }
const checklistData = [
    { id: "01.001", title: "DOCUMENTAÇÃO", text: "Apresentar o Projeto de Segurança Contra Incêndio e Pânico (Projeto de Incêndio original) impresso, devidamente aprovado pelo Corpo de Bombeiros Militar do Distrito Federal (CBMDF), de acordo com o Decreto nº 21.361/2000. (Arts. 3º, § 1º e 6º, do Dec. 23.154/2002)" },
    { id: "01.002", title: "DOCUMENTAÇÃO", text: "Apresentar o Projeto de Segurança Contra Incêndio e Pânico de Modificação (Projeto de Incêndio de Alteração), devidamente aprovado pelo CBMDF, com o redimensionamento das medidas de segurança contra incêndio e pânico, em função da ampliação de área, aumento da altura, mudança de ocupação ou layout, aumento da população ou do risco da edificação, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.003", title: "DOCUMENTAÇÃO", text: "Apresentar a Anotação de Responsabilidade Técnica (ART), Registro de Responsabilidade Técnica (RRT) ou Termo de Responsabilidade Técnica (TRT), de execução ou manutenção das medidas de segurança contra incêndio e pânico instaladas, emitida por responsável técnico e visada junto ao respectivo órgão de classe do Distrito Federal, de acordo com o Item 15.2.8 da IN 01/2021 - DESEG/CBMDF e Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.004", title: "DOCUMENTAÇÃO", text: "Apresentar o laudo do teste de estanqueidade do sistema de alimentação, distribuição e armazenamento de Gás Liquefeito de Petróleo (GLP) da edificação/estabelecimento, juntamente com documento de responsabilidade técnica de sua realização, visado no seu respectivo órgão de classe, de acordo com a NT 05/2021-PARTE I-CBMDF. O referido laudo poderá possuir validade máxima de 05 anos, podendo variar para menos em função de riscos decorrentes das situações construtivas, das condições ambientais e de uso. No caso de troca da empresa fornecedora de gás, troca de componentes, alteração da rede de alimentação ou constatação de desgastes críticos deve ser realizado teste de estanqueidade, de acordo com os itens 5.23.1 e 5.23.2 da NBR 13523/2019 da ABNT e itens 1.1, 2.3 e 5.1.3 da NT 05/2021-PARTE I-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.005", title: "DOCUMENTAÇÃO", text: "Apresentar o laudo de continuidade e aterramento elétrico do Sistema de Proteção contra Descargas Atmosféricas (SPDA) da edificação (estruturas contendo munição ou explosivos, ou em locais expostos à corrosão atmosféricas severa ou ainda estruturas pertencentes a fornecedores de serviços considerados essenciais (energia, água, sinais, etc.), com validade máxima de 01 ano e documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe NBR 5419-3:2015 da ABNT. (Arts. 3º, II, m, e 6º, do Dec. 23.154/2002)" },
    { id: "01.006", title: "DOCUMENTAÇÃO", text: "Apresentar o laudo de continuidade e aterramento elétrico do Sistema de Proteção contra Descargas Atmosféricas (SPDA) da edificação, com validade máxima de 03 anos e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe NBR 5419-3:2015 da ABNT. (Arts. 3º, II, m, e 6º, do Dec. 23.154/2002)" },
    { id: "01.007", title: "DOCUMENTAÇÃO", text: "Apresentar o documento de responsabilidade técnica que ateste o emprego de materiais para acabamento e de revestimento para obtenção da classificação de reação ao fogo, de acordo com o Item 5.4.2 da NT 17/2023-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.008", title: "DOCUMENTAÇÃO", text: "Apresentar o laudo de aplicação superficial de produtos retardantes de chama ou inibidores de fumaça para obtenção da classificação de reação ao fogo requerida pela norma, com tempo de validade dos benefícios obtidos pela sua aplicação declarado pelo fornecedor ou fabricante destes produtos, considerando o material que está sendo protegido e o tipo de aplicação utilizada e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe, de acordo como o Item 5.4.3 da NT 17/2023-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.009", title: "DOCUMENTAÇÃO", text: "Apresentar a ART - Anotação de Responsabilidade Técnica de execução (instalação) do grupo motogerador, quando exigido em Projeto de Incêndio, visada no respectivo órgão de classe, conforme NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.010", title: "DOCUMENTAÇÃO", text: "Apresentar Anotação de Responsabilidade Técnica (ART), Registro de Responsabilidade Técnica (RRT) ou Termo de Responsabilidade Técnica (TRT), da instalação elétrica predial, emitida por profissional e visada no seu respectivo órgão de classe, de acordo com a NT 41/2024-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.011", title: "DOCUMENTAÇÃO", text: "Apresentar Atestado de Conformidade das Instalações Elétricas e o documento de responsabilidade técnica de sua execução, visado no respectivo órgão de classe, conforme item 6.3.3 da NT 41-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.012", title: "DOCUMENTAÇÃO", text: "Apresentar ART – Anotação de Responsabilidade Técnica, RRT - Registro de Responsabilidade Técnica, ou TRT – Termo de Responsabilidade Técnica – visados junto ao seu respectivo órgão de classe, acompanhados com Termo ou Declaração de que os materiais de acabamento e/ou de cenário/tendas, possuem baixa velocidade de propagação de chama, de acordo com a NT 9/9022-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "01.013", title: "DOCUMENTAÇÃO", text: "O documento de requerimento de solicitação de Licença de Funcionamento/Vistoria a Pedido deve estar disponível, especificando o endereço completo, CNPJ atualizado, razão social, nome fantasia, contato telefônico do proprietário e atividade pretendida." },
    { id: "01.014", title: "DOCUMENTAÇÃO", text: "Apresentar Alvará de Construção, Atestado de Habilitação de Regularização ou documento similar de regularização fundiária emitido por órgão competente." },
    { id: "01.015", title: "DOCUMENTAÇÃO", text: "Apresentar Parecer de Aprovação do Projeto de Segurança Contra Incêndio e Pânico emitido pelo Corpo de Bombeiros Militar do Distrito Federal." },
    { id: "01.016", title: "DOCUMENTAÇÃO", text: "Apresentar Parecer de Aprovação do Projeto de Segurança Contra Incêndio e Alvará de Construção (ou documento similar) com áreas equivalentes." },
    { id: "01.017", title: "DOCUMENTAÇÃO", text: "Para acompanhamento da vistoria, deverá estar presente o interessado ou representante por ele indicado, portando o(s) Projeto(s) de Incêndio aprovado(s) e impresso(s) para a conferência dos sistemas de segurança contra incêndio e pânico, bem como as chaves para acesso a todas as dependências da edificação, incluindo as áreas técnicas, áreas de risco e assemelhados." },

    { id: "02.001", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de segurança contra incêndio e pânico deve ser instalada em conformidade com a NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.002", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "O sistema de sinalização de segurança contra incêndio e pânico deve ser instalado em conformidade com o Projeto de Incêndio aprovado pelo CBMDF, de acordo com o Decreto nº 21.361/2000. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.003", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Apresentar documento de responsabilidade técnica de execução ou manutenção do sistema de sinalização de segurança contra incêndio e pânico instalado, emitido por profissional responsável de acordo com o conselho de classe a que pertence, de acordo com o item 5.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.004", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Realizar inspeção periódica e manutenção, desde a simples limpeza até a substituição por outra nova, da sinalização de emergência, quando suas propriedades físicas e químicas deixarem de produzir o efeito visual para as quais foram confeccionadas, de acordo com o item 5.7.9 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.005", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de segurança contra incêndio e pânico deve destacar-se em relação à comunicação visual adotada para outras finalidades, de acordo com a alínea a do item 5.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.006", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de segurança contra incêndio e pânico não pode ser neutralizada pelas cores de paredes e acabamentos, dificultando a sua visualização, de acordo com a alínea b do item 5.5 da NT 22/2020 CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.007", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de segurança contra incêndio e pânico deve ser instalada nos corredores de circulação de pessoas e veículos, escadas e rampas, assegurando as plenas condições de visualização, de acordo com a alínea c do item 5.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.008", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de proibição deve ser instalada de acordo com a NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.009", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de proibição deve ser instalada em local visível próximo ao risco isolado, a uma altura de 1,8 m medida do piso acabado à base da placa, ou distribuída ao longo da área de risco generalizado, distanciadas entre si em no máximo 15 m, de acordo com o item 6.1.1 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.010", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de proibição deve possuir forma circular, cor de contraste branca, barra diametral e faixa circular (cor de segurança) vermelha, cor do símbolo preta, margem (opcional) branca e proporcionalidade paramétricas, de acordo com a Tabela 1.1 do Anexo 1 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.011", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de proibição deve ser instalada próximo aos acionadores dos elevadores, indicando a proibição de sua utilização em caso de incêndio: “Em caso de incêndio não use o elevador”, de acordo com o Anexo 2 código 4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.012", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de alerta deve ser instalada de acordo com a NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.013", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de alerta deve ser instalada em local visível próximo ao risco isolado, a uma altura de 1,8 m medida do piso acabado à base da placa, ou distribuída ao longo da área de risco generalizado, distanciadas entre si em, no máximo, 15 m, de acordo com o item 6.1.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.014", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de alerta deve possuir forma triangular, cor do fundo (cor de contraste) amarela, moldura preta, cor do símbolo (cor de segurança) preta, margem (opcional) amarela e proporcionalidade paramétricas, de acordo com a Tabela 1.1 do Anexo 1 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.015", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de orientação e salvamento deve ser instalada de acordo com a NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.016", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação do sentido de saída sobre uma porta que está na rota de saída horizontal, mas não é a saída definitiva do pavimento ou da edificação, código 14 da tabela “c” do anexo 2, deve ser localizada imediatamente acima das mesmas, no máximo a 10 cm da verga, ou na impossibilidade, diretamente na folha da porta, centralizada a uma altura de 1,8 m medida do piso acabado a base da placa de sinalização, conforme alínea b do item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.017", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação de saída definitiva do pavimento ou da edificação deve ser localizada imediatamente acima das mesmas, no máximo a 10 cm da verga, ou na impossibilidade, diretamente na folha da porta centralizada a uma altura de 1,8 m medida do piso acabado a base da placa de sinalização, conforme a alínea e do item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.018", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A mensagem “SAÍDA” deve estar sempre grafada no idioma português. Caso exista a necessidade de utilização de outras línguas estrangeiras, devem ser aplicados como textos adicionais, conforme alínea e do item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.019", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da direção e do sentido da saída em rampa, código 15 da tabela “c” do anexo 2, deve ser instalada nas paredes e elementos de fixação de rampas e patamares, a uma altura de 1,8 m medida do piso acabado à base da placa de sinalização, conforme alínea c do item 6.1.3 da NT 22/2020 CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.020", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Por alterar ou modificar o Sistema de Sinalização de Emergência sem submeter previamente o projeto de incêndio à análise, apresentar para análise e aprovação junto ao CBMDF, o respectivo projeto de alteração. (Art. 6 letra c do Decreto 23.154/2002) (AIA10)" },
    { id: "02.021", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da direção e do sentido da saída em escada, código 16 da tabela “c” do anexo 2, deve ser instalada nas paredes e elementos de fixação dos lanços e patamares, a uma altura de 1,8 m medida do piso acabado à base da placa de sinalização, conforme alínea d do item 6.1.3 da NT 22/2020 CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.022", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Instalar a sinalização de indicação do sentido de saída das rotas horizontais, códigos 12 e 13 da tabela “c” do anexo 2, de modo que a distância de percurso de qualquer ponto da rota de saída até a sinalização seja de no máximo 7,5 m. Adicionalmente, esta sinalização também deve ser instalada, de forma que no sentido de saída de qualquer ponto seja possível visualizar o ponto seguinte distanciadas entre si em no máximo 15,0 m, de acordo com a alínea a do item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.023", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Em ambientes destinados à concentração de público, a sinalização de orientação e salvamento deverá ser instalada em altura superior a 1,8 m, caso não seja possível sua visualização no plano horizontal. As dimensões das placas de sinalização deverão estar de acordo com o previsto na tabela 1.1 do anexo 1, de acordo com a alínea h do item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.024", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de orientação e salvamento deve possuir forma quadrada ou retangular, cor do fundo (cor de segurança) verde, cor do símbolo (cor de contraste) branca ou amarela fotoluminescente, margem (opcional) fotoluminescente e proporcionalidades paramétricas, de acordo com a Tabela 1.1, do Anexo 1, da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.025", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de orientação e salvamento deve apresentar efeito fotoluminescente, de acordo com a alínea a do item 5.7.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.026", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação numérica (cardinal ou ordinal) e alfabética do pavimento no interior das escadas e antecâmaras deve estar a uma altura de 1,8 m medido do piso acabado à base da placa de sinalização, instalada junto à parede, sobre o patamar de acesso de cada pavimento, de tal forma a ser visualizada em ambos os sentidos da escada, tanto subida quanto descida e na parede da antecâmara ao lado da porta de acesso à caixa de escada, de acordo com a alínea f do item 6.1.3 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.027", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de identificação de pavimento deve ser instalada em local sempre visível, de tal forma a ser visualizada em ambos os sentidos da escada, tanto subida quanto descida, conforme alínea f do item 6.1.3 NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.028", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de orientação e salvamento deve assinalar todas as mudanças de direção ou sentido, saídas, escadas, indicando a rota de fuga, de acordo com o item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.029", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Em escadas contínuas, além da identificação do pavimento de descarga no interior da caixa de escada de emergência, deve-se incluir uma sinalização de porta de saída, de forma a evidenciar o piso de descarga, conforme código 17 da tabela \"c\", do anexo 2 e alínea g do item 6.1.3 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.030", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de equipamentos de combate a incêndio deve ser instalada de acordo com a NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.031", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Na edificação que estiver isenta do projeto de incêndio, nos termos da IN 02/2020-DIVIS/CBMDF, deve ser instalada sinalização de segurança contra incêndio e pânico, conforme as NBRs 13434-1/04, 13434-2/04 e 13434-3/2005 da ABNT." },
    { id: "02.032", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização do avisador sonoro, ou do avisador visual ou do avisador sonoro - visual do sistema de detecção e alarme de incêndio, código 20 da tabela 'd\" do anexo 2, deve ser instalada a uma altura entre 2,20 m e 3,50 m, medida do piso acabado à base da placa de sinalização, imediatamente ao lado do avisador sinalizado, de acordo com a alínea a do item 6.1.4 da NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.033", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização do acionador manual do sistema de detecção e alarme de incêndio, código 21 da tabela \"d\" do anexo 2, deve ser instalada a uma altura entre 0,90 m e 1,35 m, medida do piso acabado à base da placa de sinalização, imediatamente ao lado do acionador manual sinalizado, de acordo com a alínea b do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.034", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização do telefone ou do interfone de emergência, código 22 da tabela \"d\" do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, imediatamente acima do telefone ou do interfone sinalizado, de acordo com a alínea c do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.035", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização do extintor de incêndio portátil ou sobre rodas, código 23 da tabela \"d\" do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, imediatamente acima do extintor sinalizado, de acordo com a alínea d do item 6.1.4 da NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.036", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização do abrigo do hidrante de incêndio, com ou sem o hidrante em seu interior, código 24A da tabela \"d\", do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, imediatamente acima do abrigo do hidrante sinalizado, de acordo com a alínea e do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.037", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização do hidrante de incêndio, instalado fora do abrigo, código 25 da tabela \"d\" do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, imediatamente acima do hidrante sinalizado, de acordo com a alínea f do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.038", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização do mangotinho de incêndio, código 24B da tabela \"d\" x 2, deve ser instalada a uma altura de 1,80 m medida do piso acabado à base da placa de sinalização, imediatamente acima do mangotinho sinalizado, de acordo com a alínea g do item 6.1.4 da NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.039", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de indicação da localização da válvula de governo e alarme ou da conexão de teste de alarme do sistema de proteção por chuveiros automáticos, código 26 da tabela \"d\" do anexo 2, deve ser instalada a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, na parede do abrigo da válvula de governo e alarme e da conexão de teste de alarme sinalizado, de acordo com a alínea h do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.040", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de equipamento de combate a incêndio deve possuir forma quadrada ou retangular, cor do fundo (cor de segurança) vermelha, cor do símbolo (cor de contraste) branca ou amarela fotoluminescente, margem (opcional) fotoluminescente e proporcionalidades paramétricas, de acordo com a Tabela 1.1 do Anexo 1 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.041", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de equipamentos de combate a incêndio deve apresentar efeito fotoluminescente, de acordo com a alínea b do item 5.7.3 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.042", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Quando os equipamentos de proteção contra incêndio forem instalados em pilares, devem ser sinalizadas todas as faces de pilar/coluna, preferencialmente à 1,80m de altura, conforme código 28 da tabela \"d\" do anexo 2, que estiverem voltadas para os corredores de circulação de pessoas ou veículos, de acordo com a alínea j do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.043", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de piso para indicar a localização e para evitar a obstrução por materiais dos extintores de incêndio, dos hidrantes de incêndio, dos mangotinhos e dos acionadores manuais, nas indústrias, depósitos e garagens, código 27 da tabela \"d\" do anexo 2 (quadrado 1m x 1m, fundo vermelho 0,7m x 0,7m, borda amarela de largura 0,15m), deve ser pintada nopiso onde deve estar localizado os referidos equipamentos, de acordo com a alínea i do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.044", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Quando houver obstáculos que dificultem ou impeçam a visualização direta da sinalização dos equipamentos de proteção contra incêndio no plano vertical, a mesma deve ser repetida a uma altura suficiente para proporcionar a respectiva visualização, de acordo com a alínea k do item 6.1.4 da NT 22/2020 CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.045", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Quando a visualização direta do equipamento ou sua sinalização não for possível no plano horizontal a sua localização deve ser indicada a partir do ponto de boa visibilidade mais próxima. A sinalização deve incluir o símbolo do equipamento em questão e uma seta indicativa, sendo que o conjunto não deve distar mais que 7,5 m do equipamento, de acordo com a alínea l do item 6.1.4 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.046", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de equipamento de combate a incêndio, quando existirem situações onde a visualização não seja possível apenas com a instalação da placa acima do equipamento, deve-se adotar placa adicional em dupla face perpendicularmente à superfície da placa instalada na parede ou pilar do tipo placa angular, de acordo com o item 5.7.8 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.047", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização complementar deve ser instalada de acordo com a NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.048", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização complementar deve ser instalada para a indicação continuada de rotas de saída, obstáculos e/ou riscos das rotas de saída, como pilares, arestas de paredes, vigas, desnível de piso, rebaixo de teto, saliências resultantes de elementos construtivos ou equipamentos que reduzem a largura das rotas e etc, de acordo com o item 6.1.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.049", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Para indicar desnível de piso, rebaixo de teto, deve ser instalada a sinalização complementar, código 34 da tabela \"g\" do anexo 2, por toda a extensão do obstáculo, e verticalmente para saliências resultantes de elementos construtivos ou equipamentos que reduzem a largura das rotas ou impeçam seu uso, a uma altura de 0,50 m do piso acabado, com comprimento mínimo de 1,0 m. Deve ser instalada em todas as faces expostas, com largura mínima de 0,10 m em cada face, de acordo com a alínea f do item 6.1.5 da NT 22/2020 CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.050", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Para indicação continuada das rotas de fuga horizontais e verticais, código 29 da tabela e, do anexo 2, devem ser instaladas placas na parede a uma altura constante entre 0,25 m e 0,5 m do piso acabado à base da placa de sinalização com espaçamentos entre cada uma delas de no máximo 3 m na linha horizontal, medida a partir das suas extremidades, podendo ser aplicada alternadamente à parede direita e esquerda da rota de saída, de acordo com alínea a do item 6.1.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.051", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Quando for instalada sobre o piso, a sinalização complementar deve estar centralizada em relação à largura da rota de saída, de acordo com alínea a do item 6.1.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b e 6º, do Dec. 23.154/2002)" },
    { id: "02.052", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização complementar deve ser usada a cada mudança de direção e sentido, dando o sentido de fluxo, de acordo com alínea a do item 6.1.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.053", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização complementar é obrigatória em ambientes fechados destinados à concentração de público, de acordo com a alínea a do item 6.1.5 da NT 22/2020-CBMDF. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.054", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Para indicar forma de acionamento da barra antipânico de acionamento radial e da barra de acionamento horizontal sob pressão, instalada sobre a porta corta-fogo, código 30 da tabela \"f\", do anexo 2, deve ser instalada placa na porta corta-fogo a uma altura entre 1,20 m e 1,80 m, medida do piso acabado à base da placa de sinalização, de acordo com a alínea b do item 6.1.5 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.055", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Para indicar permanência da porta corta-fogo constantemente fechada, instalada sobre a mesma, código 31 da tabela \"e\" do anexo 2, deve ser instalada placa na porta corta-fogo a uma altura entre 1,20 m e 1,80 m, medida do piso acabado à base da placa de sinalização, de acordo com a alínea c do item 6.1.5 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.056", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Para indicar telefone de contato da brigada de incêndio da edificação e do telefone de emergência do Corpo de Bombeiros em caso de emergência, código 32 da tabela \"e\" do anexo 2, deve ser instalada placa nos acessos da edificação ou área de risco, nos pavimentos e na sala da brigada a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, de acordo com a alínea d do item 6.1.5 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.057", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Para indicar lotação máxima de público sentado e em pé e telefone de emergência do Corpo de Bombeiros, código 33 da tabela \"e\" do anexo 2, deve ser instalada placa nos acessos das edificações ou áreas de risco das ocupações provisórias e permanentes de concentração de público, a uma altura de 1,80 m, medida do piso acabado à base da placa de sinalização, de acordo com a alínea e do item 6.1.5 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.058", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Exclusivamente para boates e danceterias, concentração de público - código 23 da NT 01/2016 CBMDF, a sinalização de lotação máxima de público prevista na alínea e do item 6.1.5 da NT 22/2020 CBMDF, deve ser instalada de forma obrigatória nos acessos destas áreas, a uma altura de 1,80m, medida do piso acabado à base da placa de sinalização, de acordo com a Decisão Técnica 011/2021-CSESCIP/CBMDF." },
    { id: "02.059", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Instalar sinalização complementar do tipo \"Plano de Fuga\", que visem facilitar a identificação de todas as saídas de emergências nas edificações do tipo escolar, hospitalar, transitórias e concentração de público, conforme item 5.6.5 da NBR 16820/2022 da ABNT. (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)" },
    { id: "02.060", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Instalar sinalização complementar em elementos translúcidos ou transparentes, utilizados em esquadrias destinadas a fechamentos de vãos (portas e painéis divisórias) que fazem parte da rota de saída, devendo possuir tarja em cor contrastante com o ambiente, com largura mínima de 50 mm, aplicada horizontalmente em toda sua extensão, na altura constante compreendida entre 1,00 e 1,40 m do piso acabado, de acordo com a alínea g do item 6.1.5 da NT 22/2020-CBMDF. (Art. 3º, III, b, do Dec. 23.154/2002)" },
    { id: "02.061", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Os produtos líquidos combustíveis armazenados devem conter mensagem por meio de placas instaladas no acesso principal da área de risco, indicando a quantidade total de recipientes transportáveis ou tanques, bem como a capacidade máxima individual de cada tipo, em litros ou metros cúbicos, aprovado em projeto, de acordo com a alínea a do item 6.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.062", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Os gases combustíveis armazenados em tanques fixos devem conter mensagem por meio de placas instaladas no acesso principal da área de risco, indicando a quantidade total de tanques, bem como a capacidade máxima individual dos tanques em litros ou metros cúbicos e em quilogramas aprovado em projeto, de acordo com a alínea b do item 6.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.063", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Os gases combustíveis armazenados em recipientes transportáveis devem conter mensagem por meio de placas instaladas no acesso principal da área de risco, indicando a quantidade total de recipientes de acordo com a capacidade máxima individual de cada tipo, em quilogramas, aprovado em projeto, de acordo com a alínea c do item 6.2 da NT 22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)" },
    { id: "02.064", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "As classes e capacidade de armazenamento de recipientes transportáveis de Gás Liquefeito de  Petróleo - GLP, em quilogramas para cada uma dessas, por meio de placas instaladas no acesso principal da  área de risco, de acordo com a alínea d do item 6.2 da NT22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.065", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Produtos perigosos armazenados devem conter mensagem por meio de placas instaladas no acesso  principal da área de risco indicando o tipo, a quantidade e os perigos que oferecem as pessoas e meio ambiente,  e próximo aos produtos armazenados, separados por categoria, indicando o nome comercial e científico, de  acordo com a alínea e do inciso I do item 6.2 da NT22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.066", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A abertura das portas em escadas não deve obstruir a visualização de qualquer sinalização, de acordo  com a alínea j do item 6.1.3 da NT22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)"},
    { id: "02.067", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Na sinalização de segurança, as expressões escritas utilizadas devem seguir as regras, termos e  vocábulos da língua portuguesa, podendo, complementarmente, e nunca exclusivamente, ser adotada outra  língua estrangeira, de acordo com a alínea d do item 5.5 da NT22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.068", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Os equipamentos de origem estrangeira, instalados na edificação, utilizados na segurança contra  incêndio e pânico, devem possuir as orientações necessárias à sua operação na língua portuguesa, de acordo  com a alínea e do item 5.5 da NT22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.069", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "As dimensões básicas das letras e das placas de sinalização de segurança devem obedecer à relação  apresentada no anexo 1 da NT22/2020-CBMDF.  (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.070", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de segurança deve possuir os símbolos gráficos, conforme os apresentados no anexo 2  da NT22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.071", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Em ambientes destinados a concentração de público sem aclaramento natural ou artificial suficiente  para permitir acúmulo de energia no elemento fotoluminescente das sinalizações de rota de saída, devem  possuir sinalização constantemente iluminada, sem prejuízo ao sistema de iluminação de emergência de  aclaramento de ambiente. Neste caso, todas as placas que compõem a rota de saída deverão estar iluminadas,  de acordo com a alínea i do item 6.1.3 da NT22/2020-CBMDF.  (Arts. 3º, III, b, e 6º, do Dec. 23.154/2002)"},
    { id: "02.072", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Se existirem rotas de saída específicas para uso de portadores de necessidades especiais, estas devem  ser sinalizadas para tal finalidade, conforme a alínea k do item 6.1.3 da NT22/2020-CBMDF.  (Arts. 3º, III, b, e  6º, do Dec. 23.154/2002)"},
    { id: "02.073", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "As tubulações dos sistemas hidráulicos fixos de combate a incêndio aparentes, não embutidas na  alvenaria, parede e piso, devem ter pintura na cor vermelha, de acordo com o inciso I do item 6.3, da NT  22/2020-CBMDF. (Arts. 3º, II, g, e 6º, do Dec. 23.154/2002)"},
    { id: "02.074", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "As portas dos abrigos dos hidrantes, mesmo quando metálicas, podem ser pintadas com cor  combinando com a arquitetura e decoração do ambiente, contudo, devem ser identificadas com o dístico  'incêndio' - fundo vermelho com a inscrição na cor branca ou amarela, ou possuir abertura no centro com área  mínima de 0,04m², fechada em material transparente (vidro, acrílico etc.), identificado com o dístico  'incêndio' - fundo vermelho com inscrição na cor branca ou amarela, de acordo com as alíneas a e b do inciso  II do item 6.3 da NT22/2020-CBMDF. (Arts. 3º, II, b, e 6º, do Dec. 23.154/2002)"},
    { id: "02.075", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Os acessórios hidráulicos (válvulas de retenção, registros de paragem, válvulas de governo e alarme)  devem receber pintura na cor amarela, de acordo com o inciso III do item 6.3 da NT22/2020-CBMDF. (Art. 6º,  do Dec. 23.154/2002)"},
    { id: "02.076", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A tampa de abrigo do registro de recalque deve ser pintada na cor vermelha, de acordo com o inciso  IV do item 6.3 da NT22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.077", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Quando houver dois ou mais registros de recalque na edificação, tratando-se de sistemas distintos de  proteção contra incêndio, sistema de hidrantes e sistema de chuveiros automáticos, deve haver indicação  específica na tampa dos respectivos abrigos: inscrição 'H' para hidrantes e 'CA' ou 'SPK' para chuveiros  automáticos, de acordo com o inciso V do item 6.3 da NT22/2020-CBMDF. (Art. 6º, do Dec. 23.154/2002)"},
    { id: "02.078", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "Nas instalações do gerador deve ser adotada sinalização adequada de segurança, destinada à  advertência e à identificação de riscos de choque elétrico, de acordo com a NR - 26 do Ministério do Trabalho."},
    { id: "02.079", title: "SINALIZAÇÃO DE SEGURANÇA CONTRA INCÊNDIO E PÂNICO", text: "A sinalização de orientação e salvamento para Elevador de Emergência deve ser instalada de acordo  com a figura S-23 da NBR 16.820/2022. (Art. 6º, do Dec. 23.154/2002)"},

    
];

// 1. Função para extrair os títulos únicos e popular o filtro
function populateFilter() {
    const filterSelect = document.getElementById('filter-select');
    // Mapeia, remove duplicatas e adiciona 'MOSTRAR TODOS'
    const uniqueTitles = ['MOSTRAR TODOS', ...new Set(checklistData.map(item => item.title))];

    filterSelect.innerHTML = ''; // Limpa opções antigas
    uniqueTitles.forEach(title => {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        filterSelect.appendChild(option);
    });
}


// ******************************************************
// FUNÇÕES DE UTILIDADE E BUSCA (AGORA COM SUPORTE A HTML)
// ******************************************************

// Fallback (Método antigo, apenas texto simples)
function fallbackCopy(text, successMessage) {
    navigator.clipboard.writeText(text).then(() => {
        const messageElement = document.getElementById('copy-message');
        messageElement.textContent = successMessage;
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar (Fallback): ', err);
        alert('Erro ao copiar o texto. Por favor, verifique as permissões do navegador.');
    });
}

// Função utilitária para copiar texto e mostrar feedback (NOVA VERSÃO - Múltiplos formatos)
function copyToClipboard(plainText, htmlText, successMessage) {
    
    // 1. Tenta usar a API ClipboardItem (suporta vários formatos)
    if (typeof ClipboardItem !== 'undefined') {
        const blobPlain = new Blob([plainText], { type: 'text/plain' });
        const blobHtml = new Blob([htmlText], { type: 'text/html' });

        const item = new ClipboardItem({
            'text/plain': blobPlain,
            'text/html': blobHtml
        });
        
        navigator.clipboard.write([item]).then(() => {
            const messageElement = document.getElementById('copy-message');
            messageElement.textContent = successMessage;
            messageElement.classList.add('show');
            
            setTimeout(() => {
                messageElement.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar (ClipboardItem): ', err);
            // Fallback para o método antigo se a nova API falhar
            fallbackCopy(plainText, successMessage);
        });
    
    // 2. Fallback para navegadores que não suportam ClipboardItem
    } else {
        fallbackCopy(plainText, successMessage);
    }
}


// 1. Função para atualizar o contador de itens selecionados
function updateSelectionCount() {
    const count = document.querySelectorAll('.checklist-item.selected').length;
    const button = document.getElementById('copy-selected-btn');
    button.textContent = `Copiar Itens Selecionados (${count})`;
}

// 2. Função para alternar a seleção de um item (chamada no clique)
function toggleSelection(element) {
    element.classList.toggle('selected');
    updateSelectionCount(); // Atualiza o contador após a seleção/desseleção
}

// 3. NOVA FUNÇÃO: Copiar todos os itens selecionados
function copySelectedItems() {
    const selectedItems = document.querySelectorAll('.checklist-item.selected');
    
    if (selectedItems.length === 0) {
        alert('Selecione pelo menos um item para copiar!');
        return;
    }

    const selectedTexts = Array.from(selectedItems)
        .map(item => item.getAttribute('data-full-text'));

    // 1. TEXTO SIMPLES: Usa uma única quebra de linha
    const plainTextToCopy = selectedTexts.join('\r\n');
    
    // 2. TEXTO HTML: Inclui a formatação de parágrafo completa
    // ESTILO DESEJADO: font-size:12pt;font-family:Calibri;text-indent:25mm;text-align:justify;word-wrap:normal;margin:6pt;
    // const paragraphStyle = 'font-size:12pt;font-family:Calibri;text-indent:25mm;text-align:justify;word-wrap:normal;margin:6pt;';
    
    const htmlToCopy = selectedTexts
        // Envolve cada linha em uma tag <p> com o estilo definido
        .map(text => `<p class="I01_Justificado_Recuo_Primeira_Linha">${text}</p>`)
        .join(''); // Junta sem separador extra, pois as tags <p> criam os parágrafos

    const successMessage = `✅ ${selectedItems.length} item(ns) copiado(s) para a área de transferência!`;
    
    // Chama a função de cópia que lida com texto e HTML
    copyToClipboard(plainTextToCopy, htmlToCopy, successMessage);
}


// Funções de Filtro e Busca (MANTIDAS)
function populateFilter() {
    // ... (Mantida igual)
    const filterSelect = document.getElementById('filter-select');
    const uniqueTitles = ['MOSTRAR TODOS', ...new Set(checklistData.map(item => item.title))];

    filterSelect.innerHTML = ''; 
    uniqueTitles.forEach(title => {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        filterSelect.appendChild(option);
    });
}

function searchChecklist(searchTerm) {
    // ... (Mantida igual, mas garante que a seleção seja limpa ao buscar)
    document.querySelectorAll('.checklist-item.selected').forEach(item => item.classList.remove('selected'));
    updateSelectionCount();

    const filterSelect = document.getElementById('filter-select');
    filterSelect.value = 'MOSTRAR TODOS';
    filterSelect.disabled = searchTerm.trim().length > 0;
    
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    
    if (lowerCaseSearchTerm === '') {
        renderChecklist(checklistData);
        return;
    }

    const searchedData = checklistData.filter(item => {
        const fullText = `${item.id} ${item.text} ${item.title}`.toLowerCase();
        return fullText.includes(lowerCaseSearchTerm);
    });

    renderChecklist(searchedData);
}

function filterChecklist(selectedTitle) {
    // ... (Mantida igual, mas garante que a seleção seja limpa ao filtrar)
    document.querySelectorAll('.checklist-item.selected').forEach(item => item.classList.remove('selected'));
    updateSelectionCount();
    
    document.getElementById('search-input').value = '';
    
    let filteredData;

    if (selectedTitle === 'MOSTRAR TODOS') {
        filteredData = checklistData;
    } else {
        filteredData = checklistData.filter(item => item.title === selectedTitle);
    }

    renderChecklist(filteredData);
}


// 4. Função de renderização (MODIFICADA para chamar toggleSelection)
function renderChecklist(dataToRender = checklistData) {
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';
    
    if (dataToRender.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #555;">Nenhum item encontrado com o termo de busca.</p>`;
        return;
    }
    
    const groupedData = dataToRender.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});

    // Renderiza os grupos e itens
    for (const title in groupedData) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('item-group');

        const titleH2 = document.createElement('h2');
        titleH2.classList.add('group-title');
        titleH2.textContent = title;
        groupDiv.appendChild(titleH2);

        groupedData[title].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('checklist-item');
            
            // Define o texto completo para cópia (será lido pela função copySelectedItems)
            const fullText = `${item.id} - ${item.text}`;
            itemDiv.setAttribute('data-full-text', fullText);
            
            // **MUDANÇA AQUI**: Clique agora alterna a seleção
            itemDiv.onclick = () => toggleSelection(itemDiv);

            // Conteúdo visível do item
            itemDiv.innerHTML = `<span class="item-id">${item.id}</span> ${item.text}`;
            
            groupDiv.appendChild(itemDiv);
        });

        container.appendChild(groupDiv);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    populateFilter();
    renderChecklist(checklistData); 
    updateSelectionCount(); // Inicia o contador em zero
});