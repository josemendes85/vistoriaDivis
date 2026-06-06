Uppdate do formulário Eventual

1. Na função enviarParaGoogleForms() acrescente esses campos(acrescentar somente os que não existem)

> esses são os parêmetros capturados no formResponse do form "Vistoria Eventual" > os que já existem na função devem ser mantidos e concatenados, os que não existem devem ser adicionados.

1. "entry.1714192818": v("divis.fisc24@gmail.com")
2. "entry.952823450": v("nomePrimeorVistoriador+-+Matrc+1234567"), // nomePrimeorVistoriador + matriz
3. "entry.2094975252": v("nomeSegundoVistoriador+-+Matrc+7654321"), // nomeSegundoVistoriador + matriz
4. "entry.1503326683": v("ABC+123"), // Viatura
5. "entry.1594942841": v("GSV"; "Plantão 24h"; "ALA A (SEG, QUA, SEX)"; "ALA B (TER, QUI, SEX)"; "Expediente";), // campo select
6. "entry.191765537": v("12345-12345678/2024-01"), // processo
7. "entry.1200371070": v("Nome+do+Evento"), // nome do evento
8. "entry.2101176802": v("RA+2+-+Gama"), //região administrtivo, campo já existe
9. "entry.278707089": v("Enedereço+do+evento"),
10. "entry.1788638115": v("2026-06-05"),
11. "entry.635703155": v("2026-06-05"),
12. "entry.209142364": v("Testesdasdfasdf+asdfgasdgf+as"),
13. "entry.2103689319": v("100"),
14. "entry.129765383": v("100"),
15. "entry.647891186": v("-15.1234,+-47.1234"),
16. "entry.1749955179": v("Responsável+não+cadastrado"),
17. "entry.536781947": v("Sim"),
18. "entry.1275216650": v("Sim"),
19. "entry.1144946037": v("nome+completo+do+responsável"),
20. "entry.403351946": v("123.456.789-00"),
21. "entry.1653755878": v("61+0000-0000"),
22. "entry.281654281": v("1"),
23. "entry.506772746": v("2"),
24. "entry.1153969985": v("3"),
25. "entry.992128061": v("4"),
26. "entry.1850464249": v("5"),
27. "entry.2145745699": v("6"),
28. "entry.101557401": v("7"),
29. "entry.1810871816": v("Sim"),
30. "entry.2041242057": v("Não+se+aplica"),
31. "entry.1938619790": v("Sim"),
32. "entry.1289290526": v("23"),
33. "entry.1403662037": v("Não+se+aplica"),
34. "entry.1769025717": v("65456"),
35. "entry.1569675871": v("Não+se+aplica"),
36. "entry.1663636913": v("Não+se+aplica"),
37. "entry.1068839709": v("Sim"),
38. "entry.1292591391": v("Não+se+aplica"),
39. "entry.709435141": v("Sim"),
40. "entry.230273607": v("1"),
41. "entry.697486886": v("Sim"),
42. "entry.269907922": v("EMPRESA+BRIGARDISTA+-+EMP-B/123-45"),
43. "entry.854155456": v("Sim"),
44. "entry.407142634": v("Sim"),
45. "entry.452062403": v("Sim"),
46. "entry.875704157": v("Sim"),
47. "entry.1005818584": v("1"),
48. "entry.1355347284": v("Não"),
49. "entry.1013043090": v("2"),
50. "entry.959214189": v("Não+se+aplica"),
51. "entry.1999225105": v("Não+se+aplica"),
52. "entry.299718848": v("1"),
53. "entry.15816431": v("Não+se+aplica"),
54. "entry.698760525": v("Não+se+aplica"),
55. "entry.1171952603": v("Não+se+aplica"),
56. "entry.2125304373": v("Sim"),
57. "entry.2002719496": v("Não+se+aplica"),
58. "entry.928440077": v("Não+se+aplica"),
59. "entry.2038015743": v("Reprovado"),
60. "entry.527724047": v("CONDICIONANTE+APROVADO"),
61. "entry.817281579": v("RESTRIÇÕES"),
62. "entry.1325156845": v("VISTORIA+CONCLUÍDA"),

63. "entry.1721739093": v(
    "Apresentar+requerimento+original+de+solicitação+de+Licença+de+Funcionamento+Eventual.",
    "Apresentar+formulário+de+apoio+para+licença+de+funcionamento+eventual.",
    "Apresentar+Memorial+descritivo+-+evento+acima+de+1.000+pessoas.",
    "Apresentar+o+Termo+de+declaração+e+de+responsabilidade+-+evento+acima+de+1.000+pessoas.",
    "Apresentar+o+Comprovante+de+disponibilidade+de+grupo+gerador+-+evento+acima+de+1.000+pessoas.",
    "Apresentar+o+croqui+do+evento.",
    "Apresentar+Projeto+de+Incêndio+da+Central+de+GLP."),

64. "entry.1147682255": v(
    "Apresentar+contrato+da+brigada.",
    "Apresentar+o+certificado+de+credenciamento+da+empresa+de+brigada.",
    "Apresentar+os+certificados+dos+brigadistas.",
    "Quantidade+de+brigadista+compatível+com+o+tamanho+do+evento."),

65. "entry.1994180731": v(
    "Apresentar+o+PBET+aprovado+-+evento+acima+de+1.000+pessoas.",
    "Aprovar+o+PBET+para+eventos+em+edificações+permanentes+-+Quando+SCIP+insuficiente+ou+público+superior+ao+projetado+para+a+edificação.",
    "Protocolar+o+PBET+para+análise+com+30+dias+antes+do+evento.",
    "Retornar+o+PBET,+com+exigências,+para+reanálise+com+10+dias+antes+do+evento."),

66. "entry.809039382": v(
    "Apresentar+ART/RRT/TRT+dos+sistemas+de+SCIP+e+estruturas+do+evento+-+evento+acima+de+1.000+pessoas.",
    "O+responsável+técnico+pelo+evento+deve+acompanhar+a+vistoria,+quando+solicitado.",
    "O+responsável+técnico+pelo+parque+de+diversões+deve+atender+a+NBR+15926+e+apresentar+documentos+técnicos.",
    "Apresentar+ART/RRT/TRT/Laudo+de+aterrameto+elétrico+de+todas+as+massas+metálicas+das+estruturas.",
    "Apresentar+ART/RRT/TRT+de+instalação+elétrica+provisória+do+evento.",
    "Apresentar+ART/RRT/TRT+de+aterramento+elétrico+do+Gerador.",
    "Apresentar+ART/RRT/TRT+e+laudo+de+flamabilidade,+registrados+em+livro+de+ordem,+dos+materiais+de+acabamento+usados+no+evento.",
    "Apresentar+ART+de+execução+do+Laudo+de+Estanqueidade+da+Central+de+GLP.",
    "Apresentar+ART+de+instalação+da+Central+de+GLP.",
    "O+responsável+técnico+deverá+acompanhar+a+montagem+das+estruturas+do+evento,+emitir+relatório+e+ART/RRT/TRT+e+fazer+o+registro+no+livro+de+ordem."),

67. "entry.2006769390": v(
    "Apresentar+o+Parecer+Técnico+Específico+Aprovado+para+eventos+em+edificações+permanentes.",
    "Apresentar+ART/RRT/TRT+das+adaptações+no+interior+das+edificações."),

68. "entry.980011299": v(
    "Instalar+sistema+de+sinalização+de+segurança+nas+Saídas+de+Emergência.",
    "Instalar+sistema+de+sinalização+de+segurança+na+Rota+de+Fuga.",
    "Instalar+sistema+de+sinalização+de+segurança+na+Central+de+GLP.",
    "Instalar+sistema+de+sinalização+de+segurança+no+Gerador+de+Energia+e+Equipamentos+Energizados.",
    "Instalar+sistema+de+sinalização+de+segurança+nos+Extintores.",
    "Instalar+as+placas+de+sinalização+em+altura+que+garantam+a+sua+vizualização."),

69. "entry.891456062": v(
    "A+indicação+de+capacidade+máxima+de+público+aprovada+deve+estar+visivel+nas+entradas+e+setores.",
    "Iluminar+as+placas+de+sinalização+em+eventos+noturnos+ao+ar+livre.",
    "Apresentar+o+recurso+audiovisual+com+informações+sobre+segurança+contra+incêndio+e+pânico+-+evento+com+fechamento+e+público+acima+de+1.000+pessoas."),

70. "entry.647578535": v(
    "O+evento+deve+estar+montado+24h+antes.",
    "A+aprovação+da+vistoria+deve+ocorrer+até+3+horas+antes+do+evento+ou+acesso+do+público."),

71. "entry.2094522025": v(
    "Os+sistemas+de+SCIP+devem+atender,+além+da+edificação,+as+estruturas+temporárias+e+os+acréscimos+de+instalações.",
    "As+estruturas+devem+apresentar+estabilidade+estrutural+e+segurança.",
    "Os+suportes+das+tendas+e+coberturas+devem+ter+resistência+ao+fogo.",
    "As+estruturas+provisórias+com+piso+em+madeira+devem+ter+resistência+mecânica+compatível,+fixação+e+superfície+plana,+sem+ressaltos+ou+aberturas.",
    "Os+elementos+fixadores,+tensionadores+e+estabilizadores+devem+ter+resistência+mecânica+compatível,+proteção+mecânica+e+sinalização.",
    "Os+espaços+vazios,+abaixo+das+estruturas+provisórias+destinadas+ao+público,+devem+isolados+(acesso+restrito)+sem+materiais,+pessoas+ou+qualquer+atividade."),

72. "entry.1255121135": v(
    "O+piso+das+arquibancadas+deve+estar+preso+à+estrutura+de+sustentação.",
    "Nas+arquibancadas,+os+assentos+de+cada+fileira+devem+estar+presos+uns+aos+outros+ou+ao+piso.",
    "O+comprimento+máximo+da+fileira+de+assentos+nas+arquibancadas+temporárias+é+de+14+m,+se+tiver+acesso+nas+duas+extremidades.",
    "O+comprimento+máximo+da+fileira+de+assentos+nas+arquibancadas+temporárias+é+de+7+m,+se+tiver+apenas+um+corredor+de+acesso.",
    "Os+patamares+(degraus)+das+arquibancadas+temporárias+devem+possuir+Largura+mínima+de+0,60+m+e+Altura+máxima+de+0,55+m.",
    "Os+degraus+dos+acessos+radiais+nas+arquibancadas+devem+possuir+Altura+máxima+de+espelho+de+0,19+m+e+Largura+mínima+da+base+de+0,25+m.",
    "Os+vãos+(espelhos),+entre+os+assentos+das+arquibancadas,+com+alturas+superiores+a+0,15+m+devem+ser+fechados+para+impedir+a+passagem+de+pessoas.+(vão+máx+11+cm+NT+10).",
    "O+uso+dos+patamares+da+arquibancada+como+degraus+devem+ter+espelho+com+altura+máxima+de+0,19+m+e+fechados+para+impedir+a+passagem+de+pessoas,+e+base+com+largura+mínima+de+0,25+m.",
    "Nas+arquibancadas+com+cadeiras+individuais,+o+espaçamento+mínimo+é+de+0,30+m+para+circulação+nas+filas,+entre+as+cadeiras.",
    "Nas+arquibancadas+com+cadeira+individuais,+à+frente+das+primeiras+fileiras,+a+distância+mínima+é+de+0,45+m+para+circulação.",
    "A+altura+mínima+do+guarda-corpo+frontal+da+arquibancada+é+de+1,10+m.",
    "Se+o+desnível+entre+a+primeira+fileira+da+arquibancada+e+o+piso+à+frente+for+superior+a+0,55+m,+exigi-se+guarda-corpo.",
    "As+arquibancadas+devem+ter+fechamento+lateral+e+dos+encostos+do+último+nível+superior+de+assentos+(guarda-costas),+de+forma+idêntica+aos+guarda-corpos.",
    "Guarda-corpo+deve+ter+altura+mínima+de+1,80+m,+quando+a+última+fileira+da+arquibancada+tiver+a+altura+superior+a+2,10+m+do+nível+do+terreno.",
    "Nos+acessos+radiais+das+arquibancadas,+com+assentos+em+ambos+os+lados,+os+corrimãos+podem+ser+laterais+ou+centrais,+com+altura+entre+0,80m+e+0,92m.",
    "Os+corrimãos+centrais+devem+ter+continuidade+com+intervalos+no+mínimo+a+cada+2+fileiras+e+no+máximo+a+cada+4+fileiras+de+assentos,+para+permitir+a+passagem+de+um+lado+para+o+outro.+Estes+intervalos+devem+possuir+a+largura+livre+correspondente+à+largura+do+patamar"),

73. "entry.47633865": v(
    "As+tendas+devem+ser+instaladas+sob+supervisão+de+profissional+habilitado,+possuir+estabilidade+estrutural+e+característica+retardante+à+propagação+de+chamas.",
    "É+vedada+a+utilização+e+armazenamento+de+produtos+inflamáveis+e+fogos+de+artifício+no+interior+de+tendas+para+acomodação+do+público.",
    "Portas+das+tendas+abrindo+no+sentido+de+fluxo+de+saída+e+sempre+destrancadas+e+desobstruídas.",
    "Tenda+fechada+nas+laterais+e+sem+portas,+deve+ter+demarcações+de+fácil+identificação+visual+das+aberturas+na+própria+tenda."),

74. "entry.1919379337": v(
    "O+picadeiro+em+tendas+de+circos+deve+estar+separado+da+área+com+os+assentos+por+uma+barreira+sólida+com+no+mínimo+0,40+m+de+altura.",
    "As+barreiras+ou+alambrados+que+separam+a+arena+de+outros+locais+acessíveis+ao+público+deverão+possuir+passagens+que+permitam+aos+espectadores+sua+utilização+em+caso+de+emergência,+mediante+sistema+de+abertura."),

75. "entry.1229226787": v(
    "O+palco+deve+ter+extintores+de+incêndio.",
    "O+palco+com+saída+de+emergência+compatível+com+o+público."),

76. "entry.1426151753": v(
    "Os+eventos+em+área+extena+das+edificações+devem+possuir+acesso+independente.",
    "Nos+eventos+no+interior+de+edificações,+as+saídas+devem+comportar+o+público+da+edificação+e+do+evento."),

77. "entry.723661602": v(
    "Os+acessos+com+catracas/barreiras+não+são+consideradas+saídas+de+emergência.",
    "Instalar+no+mínimo+02+saídas+de+emegência+para+o+evento.",
    "As+saídas+devem+estar+em+lados+distintos,+formando+ângulo+mínimo+de+45º+entre+elas+e+o+ponto+mais+distante.",
    "As+saídas+de+emergência+devem+ser+dimensionadas+em+função+do+público+máximo+e+do+tempo+de+evacuação+(máx.+6+min.)+-+podendo+ser+adotado+aumento+do+número+e/ou+largura+das+saídas.",
    "As+saídas+de+emergência+deverão+conduzir+a+população+a+local+aberto+e+seguro.",
    "O+espaço+destinado+ao+trânsito+de+veículos+deve+ser+distinto+daquele+delimitado+para+pedestres."),

78. "entry.2071207835": v(
    "A+definição+do+púbico+máximo+do+evento+será+dado+em+função+da+largura+das+saídas,+densidade+de+2+pessoas/m2+e+do+tempo+de+evacuação+(máx.+6+min.).",
    "A+definição+do+público+de+apoio+em+áreas+de+apoio+de+edificações+será+dada+pela+densidade+de+1+pessoas/7m2.",
    "Público+acima+de+10.000+pessoas+-+deverá+ter+sistema+de+contagem+e+controle+de+público."),

79. "entry.193152464": v(
    "A+\"distância+máxima+a+ser+percorrida\"+em+arquibancadas+até+local+seguro+será+de+60m.",
    "A+\"distância+máxima+a+ser+percorrida\"+em+um+setor+de+arquibancadas+até+o+acesso+radial+será+de+7m.",
    "Os+acessos+radiais+e+laterais+devem+conduzir+o+público+para+fora+da+projeção+da+arquibancada."),

80. "entry.2120416290": v(
    "As+saídas+de+emergência+deverão+abrir+no+sentido+da+fuga+ou+permanecerem+abertas+durante+o+evento.",
    "As+portas+ou+portões+abertos+não+podem+obstruir+ou+diminuir+as+rotas+de+fuga.",
    "As+portas/portões+das+saídas+de+emergência+devem+ficar+afastadas+no+minimo+5m+de+locais+de+aglomeração+de+pessoas."),

81. "entry.222003179": v(
    "As+rampas+devem+possuir+inclinação+máxima+de+10%,+com+patamar+horizontal+a+cada+15,0+m+lineares.",
    "As+escadas+e+rampas,+exceto+das+áreas+de+apoio,+devem+possuir+largura+mínima+de+1,20+m.",
    "As+escadas+e+rampas+com+largura+igual+ou+superior+a+2,40+m,+exceto+aquelas+com+acesso+restrito+à+organização+do+evento+e+ao+palco,+devem+possuir+corrimãos+intermediários+no+máximo+a+cada+1,80+m+e+no+mínimo+a+cada+1,20+m.",
    "Rampas+nas+saídas+dos+setores+com+acomodação+de+pessoas+portadoras+de+necessidades+especiais."),

82. "entry.1463757062": v(
    "Eventos+descobertos+com+delimitação+por+barreiras,+a+distância+máxima+a+ser+percorrida+para+saída+de+emergêcia+é+120+m.",
    "Em+construções+provisórias,+quando+fechadas+lateralmente,+a+distância+máxima+a+ser+percorrida+para+saída+de+emergência+é+35+m.",
    "Evento+em+edificações+permanentes,+a+distância+máxima+a+percorrer+será+conforme+projeto+aprovado+para+a+edificação."),

83. "entry.687433793": v(
    "Em+eventos+acima+de+10.000+pessoas,+instalar,+próximo+ao+palco,+barreiras+antiesmagamento+e+corredor+de+segurança+com+largura+mínima+de+2,50+m.",
    "As+barreiras+antiesmagamento+devem+ter+altura+entre+1,05+m+e+1,22+m.",
    "As+barreiras+antiesmagamento+não+devem+possuir+pontas+ou+bordas+agudas.",
    "As+barreiras+antiesmagamento+devem+possuir+plataforma+de+apoio+mais+alta+que+o+piso."),

84. "entry.568079951": v(
    "Os+eventos+com+público+superior+a+40+mil+pessoas+e+com+fechamento+devem+ter+corredores+de+segurança+e+setorização+de+público+com+no+máximo+10+mil+pessoas+por+setor.",
    "Instalar+barreiras+antiesmagamento+para+setorização+do+públcio+com+corredores+de+no+mínimo+2,5m.",
    "As+fileiras+deverão+ter+no+máximo+60+assentos+quando+houver+corredor+somente+em+dois+lados.",
    "As+fileiras+deverão+ter+no+máximo+30+assentos+quando+houver+corredor+somente+em+um+lado.",
    "A+setorização+de+público+sentado+deverá+ter+no+máximo+50+fileiras+por+setor+e+3+mil+pessoas.",
    "Os+corredores+de+segurança+de+público+sentado+deverão+ter+largura+mínima+de+1,20m.",
    "Os+agrupamentos+de+mesas+com+corredores+em+três+ou+mais+lados+deverão+ter+no+maximo+48+pessoas.",
    "Os+agrupamentos+de+mesas+com+corredores+em+um+ou+dois+lados+deverão+ter+no+maximo+24+pessoas.",
    "A+distância+entre+as+mesas+nos+agrupamentos+será+de+no+mínimo+0,60m.",
    "Os+corredores+entre+os+agrupamentos+de+mesas+devem+ter+largura+mínima+de+1,20m."),

85. "entry.1007099289": v(
    "Instalar+sistema+de+iluminação+de+emergência+nas+rotas+de+fuga+em+recinto+fechado/coberto+e+no+interior+de+edificações.",
    "Instalar+sistema+de+iluminação+de+emergência+nas+saídas+de+emergência+em+recinto+fechado/coberto+e+no+interior+de+edificações.",
    "Correto+distanciamento+entre+os+pontos+de+luz+(distância+de+4+vezes+a+altura)."),

86. "entry.1762476025": v(
    "Instalar+sistema+de+iluminação+de+emergência+nas+rotas+de+fuga+nos+eventos+realizados+em+local+aberto,+no+período+noturno+ou+parcialmente+noturno.",
    "Instalar+sistema+de+iluminação+de+emergência+nas+saidas+de+emergência+nos+eventos+realizados+em+local+aberto,+no+período+noturno+ou+parcialmente+noturno."),

87. "entry.1870505228": v(
    "Instalar+os+extintores+em+bateria+a+no+máximo+50m+do+risco+e+isolado+do+público."),

88. "entry.2072061556": v(
    "Instalar+extintores+nas+estruturas+com+cocção+de+alimentos.",
    "Instalar+extintores+nas+estruturas+com+equipamentos+energizados+(ex.:+Gerador).",
    "Instalar+extintores+nas+estruturas+com+material+combustível+(ex.:+Central+de+GLP).",
    "Instalar+extintores+nas+estruturas+temporárias+confeccionadas+em+material+combustível,+a++no+máximo+5,0+m+do+risco+a+proteger."),

89. "entry.991345744": v(
    "Extintores+devidamente+fixados+(nas+paredes+ou+em+suportes+fixados+no+piso)",
    "Extintores+dentro+do+prazo+de+Validade",
    "Extintores+corretos+de+acordo+com+a+classe+de+proteção+(A+B+C)."),

90. "entry.245960816": v(
    "Instalar+gerador+nos+eventos+de+público+superior+a+10+mil+pessoas.",
    "Instalar+gerador+como+fonte+alternativa+para+brinquedos+mecânicos.",
    "Isolar+o+gerador+e+tanques+com+barreira+física.",
    "Não+instalar+o+gerador+em+ambiente+confinado.",
    "Não+operar+o+gerador+em+lugares+molhados.",
    "Instalar+aterramento+elétrico+no+gerador.",
    "Direcionar+a+exaustão+do+gerador+para+fora+do+público."),

91. "entry.1015126727": v(
    "O+quadro+de+disjuntores+deve+estar+isolado+em+local+seguro+fisicamente+e+eletricamente.",
    "Instalar+tomadas+padrão+de+3+pinos.",
    "Isolar+fiação+elétrica+das+estruturas.",
    "Proteger+fiação+estendida+no+solo+em+local+de+acesso+ao+público.",
    "Instalar+dispositivo+de+proteção+DR+contra+fuga+de+corrente."),

92. "entry.1387309357": v(
    "Instalar+aterramento+elétrico+em+todas+as+estruturas+metálicas."),

93. "entry.231274032": v(
    "O+SPDA+deve+atender+os+requisitos+da+NBR+5419."),

94. "entry.1615254798": v(
    "Abertura+de+ventilação+adequada.",
    "Instalar+registro+de+corte+para+cada+ponto+de+consumo+de+GLP.",
    "Piso+elevado.",
    "Apresentar+afastamentos+mínimos+(fonte+de+ignição,+fonte+de+eletricidade,+estacionamentos,+vãos+e+aberturas...)."),

95. "entry.1434165906": v(
    "É+Proibido+o+uso+de+GLP+nas+bilheterias.",
    "É+Proibido+o+uso+de+GLP+em+estruturas,+áreas+de+acomodação+e+circulação+de+público.",
    "Instalar+um+P13+por+ponto+de+consumo,+com+mangueira+de+malha+de+aço,+registro,+em+local+protegido+e+ventilado.",
    "Substituir+mangueira+de+GLP+maior+que+1,25m+por+tubo+multicamada.",
    "Instalar+registro+de+corte+para+cada+ponto+de+consumo+ou+recipiente+P-13."),

96. "entry.1426316217": v(
    "OBSERVAÇÕES"),

//este é um campo que vem no início do forms, ele deverá estar sempre marcado, é do tipo radio, mas coloque o campo do tipo test para o usuário digitar o email dele e aparecer lá no forms 97. entry.1714192818,[""],0]],null,"-6870466656342453507",null,null,null,"divis.fisc24@gmail.com",0

link da planilha do forms:
https://docs.google.com/spreadsheets/d/11dgCOPqUSF_WL3SMdiMHkwsHzMpcxU_xl2vZaHytFz4/edit?resourcekey#gid=1848336164

LINK GERADO:
https://docs.google.com/forms/d/e/1FAIpQLScFdrzloQDqpN1nwU6M4K8n9UYbf4UhyAAVXo7IWYUdfRNa1g/viewform?usp=pp_url&entry.952823450=__other_option__&entry.952823450.other_option_response=VISTORIADOR01+-+Matr.+1920530&entry.2094975252=__other_option__&entry.2094975252.other_option_response=VISTORIADOR02&entry.1503326683=__other_option__&entry.1503326683.other_option_response=AAA+000&entry.1594942841=__other_option__&entry.1594942841.other_option_response=GSV;+Plant%C3%A3o+24h;+ALA+A+(SEG,+QUA,+SEX);+ALA+B+(TER,+QUI,+SEX);+Expediente&entry.191765537=XXXXX-XXXXXXXX/XXXX-XX&entry.1200371070=NOME+DO+EVENTO&entry.2101176802=RA+1+-+Plano+Piloto&entry.278707089=ENDERE%C3%87O+DO+EVENTO&entry.1788638115=2026-06-05&entry.635703155=2026-06-26&entry.209142364=Observa%C3%A7%C3%B5es+quanto+ao+per%C3%ADodo&entry.2103689319=1&entry.129765383=2&entry.647891186=-XX.XXXX,+-XX.XXXX&entry.1749955179=Respons%C3%A1vel+n%C3%A3o+cadastrado&entry.536781947=Sim&entry.1275216650=Sim&entry.1144946037=Nome+completo+RESPONSS%C3%81VEL&entry.403351946=000.000.000-00&entry.1653755878=00+0000-0000&entry.281654281=3&entry.506772746=4&entry.1153969985=5&entry.992128061=6&entry.1850464249=7&entry.2145745699=8&entry.101557401=9&entry.1810871816=Sim&entry.2041242057=N%C3%A3o+se+aplica&entry.1938619790=Sim&entry.1289290526=10&entry.1403662037=N%C3%A3o+se+aplica&entry.1769025717=11&entry.1569675871=N%C3%A3o+se+aplica&entry.1663636913=N%C3%A3o+se+aplica&entry.1068839709=Sim&entry.1292591391=N%C3%A3o+se+aplica&entry.709435141=Sim&entry.230273607=12&entry.697486886=Sim&entry.269907922=__other_option__&entry.269907922.other_option_response=EMPRESA+DE+BRIGADA+-+EMP-B/000-00&entry.854155456=N%C3%A3o&entry.407142634=N%C3%A3o&entry.452062403=N%C3%A3o&entry.875704157=N%C3%A3o&entry.1005818584=13&entry.1355347284=N%C3%A3o+se+aplica&entry.1013043090=14&entry.959214189=N%C3%A3o+se+aplica&entry.1999225105=N%C3%A3o+se+aplica&entry.299718848=15&entry.15816431=N%C3%A3o+se+aplica&entry.698760525=N%C3%A3o+se+aplica&entry.1171952603=N%C3%A3o+se+aplica&entry.2125304373=N%C3%A3o&entry.2002719496=N%C3%A3o+se+aplica&entry.928440077=N%C3%A3o+se+aplica&entry.2038015743=Aprovado&entry.1775663669=__other_option__&entry.1775663669.other_option_response=Evento+Cancelado;+Nenhum+respons%C3%A1vel+no+local;+Estrutura+n%C3%A3o+est%C3%A1+pronta;+A+pedido+do+organizador&entry.527724047=condicionantes&entry.817281579=restri%C3%A7%C3%B5es&entry.1325156845=DOCUMENTA%C3%87%C3%83O&entry.368978940=INICIAL&entry.1721739093=Apresentar+requerimento+original+de+solicita%C3%A7%C3%A3o+de+Licen%C3%A7a+de+Funcionamento+Eventual.&entry.1721739093=Apresentar+formul%C3%A1rio+de+apoio+para+licen%C3%A7a+de+funcionamento+eventual.&entry.1721739093=Apresentar+Memorial+descritivo+-+evento+acima+de+1.000+pessoas.&entry.1721739093=Apresentar+o+Termo+de+declara%C3%A7%C3%A3o+e+de+responsabilidade+-+evento+acima+de+1.000+pessoas.&entry.1721739093=Apresentar+o+Comprovante+de+disponibilidade+de+grupo+gerador+-+evento+acima+de+1.000+pessoas.&entry.1721739093=Apresentar+o+croqui+do+evento.&entry.1721739093=Apresentar+Projeto+de+Inc%C3%AAndio+da+Central+de+GLP.&entry.1147682255=Apresentar+contrato+da+brigada.&entry.1147682255=Apresentar+o+certificado+de+credenciamento+da+empresa+de+brigada.&entry.1147682255=Apresentar+os+certificados+dos+brigadistas.&entry.1147682255=Quantidade+de+brigadista+compat%C3%ADvel+com+o+tamanho+do+evento.&entry.1994180731=Apresentar+o+PBET+aprovado+-+evento+acima+de+1.000+pessoas.&entry.1994180731=Aprovar+o+PBET+para+eventos+em+edifica%C3%A7%C3%B5es+permanentes+-+Quando+SCIP+insuficiente+ou+p%C3%BAblico+superior+ao+projetado+para+a+edifica%C3%A7%C3%A3o.&entry.1994180731=Protocolar+o+PBET+para+an%C3%A1lise+com+30+dias+antes+do+evento.&entry.1994180731=Retornar+o+PBET,+com+exig%C3%AAncias,+para+rean%C3%A1lise+com+10+dias+antes+do+evento.&entry.809039382=Apresentar+ART/RRT/TRT+dos+sistemas+de+SCIP+e+estruturas+do+evento+-+evento+acima+de+1.000+pessoas.&entry.809039382=O+respons%C3%A1vel+t%C3%A9cnico+pelo+evento+deve+acompanhar+a+vistoria,+quando+solicitado.&entry.809039382=O+respons%C3%A1vel+t%C3%A9cnico+pelo+parque+de+divers%C3%B5es+deve+atender+a+NBR+15926+e+apresentar+documentos+t%C3%A9cnicos.&entry.809039382=Apresentar+ART/RRT/TRT/Laudo+de+aterrameto+el%C3%A9trico+de+todas+as+massas+met%C3%A1licas+das+estruturas.&entry.809039382=Apresentar+ART/RRT/TRT+de+instala%C3%A7%C3%A3o+el%C3%A9trica+provis%C3%B3ria+do+evento.&entry.809039382=Apresentar+ART/RRT/TRT+de+aterramento+el%C3%A9trico+do+Gerador.&entry.809039382=Apresentar+ART/RRT/TRT+e+laudo+de+flamabilidade,+registrados+em+livro+de+ordem,+dos+materiais+de+acabamento+usados+no+evento.&entry.809039382=Apresentar+ART+de+execu%C3%A7%C3%A3o+do+Laudo+de+Estanqueidade+da+Central+de+GLP.&entry.809039382=Apresentar+ART+de+instala%C3%A7%C3%A3o+da+Central+de+GLP.&entry.809039382=O+respons%C3%A1vel+t%C3%A9cnico+dever%C3%A1+acompanhar+a+montagem+das+estruturas+do+evento,+emitir+relat%C3%B3rio+e+ART/RRT/TRT+e+fazer+o+registro+no+livro+de+ordem.&entry.2006769390=Apresentar+o+Parecer+T%C3%A9cnico+Espec%C3%ADfico+Aprovado+para+eventos+em+edifica%C3%A7%C3%B5es+permanentes.&entry.2006769390=Apresentar+ART/RRT/TRT+das+adapta%C3%A7%C3%B5es+no+interior+das+edifica%C3%A7%C3%B5es.&entry.705320518=B%C3%81SICO&entry.980011299=Instalar+sistema+de+sinaliza%C3%A7%C3%A3o+de+seguran%C3%A7a+nas+Sa%C3%ADdas+de+Emerg%C3%AAncia.&entry.980011299=Instalar+sistema+de+sinaliza%C3%A7%C3%A3o+de+seguran%C3%A7a+na+Rota+de+Fuga.&entry.980011299=Instalar+sistema+de+sinaliza%C3%A7%C3%A3o+de+seguran%C3%A7a+na+Central+de+GLP.&entry.980011299=Instalar+sistema+de+sinaliza%C3%A7%C3%A3o+de+seguran%C3%A7a+no+Gerador+de+Energia+e+Equipamentos+Energizados.&entry.980011299=Instalar+sistema+de+sinaliza%C3%A7%C3%A3o+de+seguran%C3%A7a+nos+Extintores.&entry.980011299=Instalar+as+placas+de+sinaliza%C3%A7%C3%A3o+em+altura+que+garantam+a+sua+vizualiza%C3%A7%C3%A3o.&entry.891456062=A+indica%C3%A7%C3%A3o+de+capacidade+m%C3%A1xima+de+p%C3%BAblico+aprovada+deve+estar+visivel+nas+entradas+e+setores.&entry.891456062=Iluminar+as+placas+de+sinaliza%C3%A7%C3%A3o+em+eventos+noturnos+ao+ar+livre.&entry.891456062=Apresentar+o+recurso+audiovisual+com+informa%C3%A7%C3%B5es+sobre+seguran%C3%A7a+contra+inc%C3%AAndio+e+p%C3%A2nico+-+evento+com+fechamento+e+p%C3%BAblico+acima+de+1.000+pessoas.&entry.867189588=HOR%C3%81RIO+LIMITE+PARA+MONTAGEM+E+APROVA%C3%87%C3%83O&entry.647578535=O+evento+deve+estar+montado+24h+antes.&entry.647578535=A+aprova%C3%A7%C3%A3o+da+vistoria+deve+ocorrer+at%C3%A9+3+horas+antes+do+evento+ou+acesso+do+p%C3%BAblico.&entry.2094522025=Os+sistemas+de+SCIP+devem+atender,+al%C3%A9m+da+edifica%C3%A7%C3%A3o,+as+estruturas+tempor%C3%A1rias+e+os+acr%C3%A9scimos+de+instala%C3%A7%C3%B5es.&entry.2094522025=As+estruturas+devem+apresentar+estabilidade+estrutural+e+seguran%C3%A7a.&entry.2094522025=Os+suportes+das+tendas+e+coberturas+devem+ter+resist%C3%AAncia+ao+fogo.&entry.2094522025=As+estruturas+provis%C3%B3rias+com+piso+em+madeira+devem+ter+resist%C3%AAncia+mec%C3%A2nica+compat%C3%ADvel,+fixa%C3%A7%C3%A3o+e+superf%C3%ADcie+plana,+sem+ressaltos+ou+aberturas.&entry.2094522025=Os+elementos+fixadores,+tensionadores+e+estabilizadores+devem+ter+resist%C3%AAncia+mec%C3%A2nica+compat%C3%ADvel,+prote%C3%A7%C3%A3o+mec%C3%A2nica+e+sinaliza%C3%A7%C3%A3o.&entry.2094522025=Os+espa%C3%A7os+vazios,+abaixo+das+estruturas+provis%C3%B3rias+destinadas+ao+p%C3%BAblico,+devem+isolados+(acesso+restrito)+sem+materiais,+pessoas+ou+qualquer+atividade.&entry.1255121135=O+piso+das+arquibancadas+deve+estar+preso+%C3%A0+estrutura+de+sustenta%C3%A7%C3%A3o.&entry.1255121135=Nas+arquibancadas,+os+assentos+de+cada+fileira+devem+estar+presos+uns+aos+outros+ou+ao+piso.&entry.1255121135=O+comprimento+m%C3%A1ximo+da+fileira+de+assentos+nas+arquibancadas+tempor%C3%A1rias+%C3%A9+de+14+m,+se+tiver+acesso+nas+duas+extremidades.&entry.1255121135=O+comprimento+m%C3%A1ximo+da+fileira+de+assentos+nas+arquibancadas+tempor%C3%A1rias+%C3%A9+de+7+m,+se+tiver+apenas+um+corredor+de+acesso.&entry.1255121135=Os+patamares+(degraus)+das+arquibancadas+tempor%C3%A1rias+devem+possuir+Largura+m%C3%ADnima+de+0,60+m+e+Altura+m%C3%A1xima+de+0,55+m.&entry.1255121135=Os+degraus+dos+acessos+radiais+nas+arquibancadas+devem+possuir+Altura+m%C3%A1xima+de+espelho+de+0,19+m+e+Largura+m%C3%ADnima+da+base+de+0,25+m.&entry.1255121135=Os+v%C3%A3os+(espelhos),+entre+os+assentos+das+arquibancadas,+com+alturas+superiores+a+0,15+m+devem+ser+fechados+para+impedir+a+passagem+de+pessoas.+(v%C3%A3o+m%C3%A1x+11+cm+NT+10).&entry.1255121135=O+uso+dos+patamares+da+arquibancada+como+degraus+devem+ter+espelho+com+altura+m%C3%A1xima+de+0,19+m+e+fechados+para+impedir+a+passagem+de+pessoas,+e+base+com+largura+m%C3%ADnima+de+0,25+m.&entry.1255121135=Nas+arquibancadas+com+cadeiras+individuais,+o+espa%C3%A7amento+m%C3%ADnimo+%C3%A9+de+0,30+m+para+circula%C3%A7%C3%A3o+nas+filas,+entre+as+cadeiras.&entry.1255121135=Nas+arquibancadas+com+cadeira+individuais,+%C3%A0+frente+das+primeiras+fileiras,+a+dist%C3%A2ncia+m%C3%ADnima+%C3%A9+de+0,45+m+para+circula%C3%A7%C3%A3o.&entry.1255121135=A+altura+m%C3%ADnima+do+guarda-corpo+frontal+da+arquibancada+%C3%A9+de+1,10+m.&entry.1255121135=Se+o+desn%C3%ADvel+entre+a+primeira+fileira+da+arquibancada+e+o+piso+%C3%A0+frente+for+superior+a+0,55+m,+exigi-se+guarda-corpo.&entry.1255121135=As+arquibancadas+devem+ter+fechamento+lateral+e+dos+encostos+do+%C3%BAltimo+n%C3%ADvel+superior+de+assentos+(guarda-costas),+de+forma+id%C3%AAntica+aos+guarda-corpos.&entry.1255121135=Guarda-corpo+deve+ter+altura+m%C3%ADnima+de+1,80+m,+quando+a+%C3%BAltima+fileira+da+arquibancada+tiver+a+altura+superior+a+2,10+m+do+n%C3%ADvel+do+terreno.&entry.1255121135=Nos+acessos+radiais+das+arquibancadas,+com+assentos+em+ambos+os+lados,+os+corrim%C3%A3os+podem+ser+laterais+ou+centrais,+com+altura+entre+0,80m+e+0,92m.&entry.1255121135=Os+corrim%C3%A3os+centrais+devem+ter+continuidade+com+intervalos+no+m%C3%ADnimo+a+cada+2+fileiras+e+no+m%C3%A1ximo+a+cada+4+fileiras+de+assentos,+para+permitir+a+passagem+de+um+lado+para+o+outro.+Estes+intervalos+devem+possuir+a+largura+livre+correspondente+%C3%A0+largura+do+patamar&entry.47633865=As+tendas+devem+ser+instaladas+sob+supervis%C3%A3o+de+profissional+habilitado,+possuir+estabilidade+estrutural+e+caracter%C3%ADstica+retardante+%C3%A0+propaga%C3%A7%C3%A3o+de+chamas.&entry.47633865=%C3%89+vedada+a+utiliza%C3%A7%C3%A3o+e+armazenamento+de+produtos+inflam%C3%A1veis+e+fogos+de+artif%C3%ADcio+no+interior+de+tendas+para+acomoda%C3%A7%C3%A3o+do+p%C3%BAblico.&entry.47633865=Portas+das+tendas+abrindo+no+sentido+de+fluxo+de+sa%C3%ADda+e+sempre+destrancadas+e+desobstru%C3%ADdas.&entry.47633865=Tenda+fechada+nas+laterais+e+sem+portas,+deve+ter+demarca%C3%A7%C3%B5es+de+f%C3%A1cil+identifica%C3%A7%C3%A3o+visual+das+aberturas+na+pr%C3%B3pria+tenda.&entry.1919379337=O+picadeiro+em+tendas+de+circos+deve+estar+separado+da+%C3%A1rea+com+os+assentos+por+uma+barreira+s%C3%B3lida+com+no+m%C3%ADnimo+0,40+m+de+altura.&entry.1919379337=As+barreiras+ou+alambrados+que+separam+a+arena+de+outros+locais+acess%C3%ADveis+ao+p%C3%BAblico+dever%C3%A3o+possuir+passagens+que+permitam+aos+espectadores+sua+utiliza%C3%A7%C3%A3o+em+caso+de+emerg%C3%AAncia,+mediante+sistema+de+abertura.&entry.1229226787=O+palco+deve+ter+extintores+de+inc%C3%AAndio.&entry.1229226787=O+palco+com+sa%C3%ADda+de+emerg%C3%AAncia+compat%C3%ADvel+com+o+p%C3%BAblico.&entry.2055270145=SUPERVISOR+DE+BRIGADA&entry.1353641729=A+brigada+deve+ter+Respons%C3%A1vel+T%C3%A9cnico+e+Supervisor+e/ou+Chefe.&entry.428633777=Apresentar+rela%C3%A7%C3%A3o+atualizada+dos+brigadistas,+com+os+certificados.&entry.1664483803=EDIFICA%C3%87%C3%95ES+PERMANENTES&entry.1426151753=Os+eventos+em+%C3%A1rea+extena+das+edifica%C3%A7%C3%B5es+devem+possuir+acesso+independente.&entry.1426151753=Nos+eventos+no+interior+de+edifica%C3%A7%C3%B5es,+as+sa%C3%ADdas+devem+comportar+o+p%C3%BAblico+da+edifica%C3%A7%C3%A3o+e+do+evento.&entry.723661602=Os+acessos+com+catracas/barreiras+n%C3%A3o+s%C3%A3o+consideradas+sa%C3%ADdas+de+emerg%C3%AAncia.&entry.723661602=Instalar+no+m%C3%ADnimo+02+sa%C3%ADdas+de+emeg%C3%AAncia+para+o+evento.&entry.723661602=As+sa%C3%ADdas+devem+estar+em+lados+distintos,+formando+%C3%A2ngulo+m%C3%ADnimo+de+45%C2%BA+entre+elas+e+o+ponto+mais+distante.&entry.723661602=As+sa%C3%ADdas+de+emerg%C3%AAncia+devem+ser+dimensionadas+em+fun%C3%A7%C3%A3o+do+p%C3%BAblico+m%C3%A1ximo+e+do+tempo+de+evacua%C3%A7%C3%A3o+(m%C3%A1x.+6+min.)+-+podendo+ser+adotado+aumento+do+n%C3%BAmero+e/ou+largura+das+sa%C3%ADdas.&entry.723661602=As+sa%C3%ADdas+de+emerg%C3%AAncia+dever%C3%A3o+conduzir+a+popula%C3%A7%C3%A3o+a+local+aberto+e+seguro.&entry.723661602=O+espa%C3%A7o+destinado+ao+tr%C3%A2nsito+de+ve%C3%ADculos+deve+ser+distinto+daquele+delimitado+para+pedestres.&entry.2071207835=A+defini%C3%A7%C3%A3o+do+p%C3%BAbico+m%C3%A1ximo+do+evento+ser%C3%A1+dado+em+fun%C3%A7%C3%A3o+da+largura+das+sa%C3%ADdas,+densidade+de+2+pessoas/m2+e+do+tempo+de+evacua%C3%A7%C3%A3o+(m%C3%A1x.+6+min.).&entry.2071207835=A+defini%C3%A7%C3%A3o+do+p%C3%BAblico+de+apoio+em+%C3%A1reas+de+apoio+de+edifica%C3%A7%C3%B5es+ser%C3%A1+dada+pela+densidade+de+1+pessoas/7m2.&entry.2071207835=P%C3%BAblico+acima+de+10.000+pessoas+-+dever%C3%A1+ter+sistema+de+contagem+e+controle+de+p%C3%BAblico.&entry.193152464=A+%22dist%C3%A2ncia+m%C3%A1xima+a+ser+percorrida%22+em+arquibancadas+at%C3%A9+local+seguro+ser%C3%A1+de+60m.&entry.193152464=A+%22dist%C3%A2ncia+m%C3%A1xima+a+ser+percorrida%22+em+um+setor+de+arquibancadas+at%C3%A9+o+acesso+radial+ser%C3%A1+de+7m.&entry.193152464=Os+acessos+radiais+e+laterais+devem+conduzir+o+p%C3%BAblico+para+fora+da+proje%C3%A7%C3%A3o+da+arquibancada.&entry.2120416290=As+sa%C3%ADdas+de+emerg%C3%AAncia+dever%C3%A3o+abrir+no+sentido+da+fuga+ou+permanecerem+abertas+durante+o+evento.&entry.2120416290=As+portas+ou+port%C3%B5es+abertos+n%C3%A3o+podem+obstruir+ou+diminuir+as+rotas+de+fuga.&entry.2120416290=As+portas/port%C3%B5es+das+sa%C3%ADdas+de+emerg%C3%AAncia+devem+ficar+afastadas+no+minimo+5m+de+locais+de+aglomera%C3%A7%C3%A3o+de+pessoas.&entry.222003179=As+rampas+devem+possuir+inclina%C3%A7%C3%A3o+m%C3%A1xima+de+10%25,+com+patamar+horizontal+a+cada+15,0+m+lineares.&entry.222003179=As+escadas+e+rampas,+exceto+das+%C3%A1reas+de+apoio,+devem+possuir+largura+m%C3%ADnima+de+1,20+m.&entry.222003179=As+escadas+e+rampas+com+largura+igual+ou+superior+a+2,40+m,+exceto+aquelas+com+acesso+restrito+%C3%A0+organiza%C3%A7%C3%A3o+do+evento+e+ao+palco,+devem+possuir+corrim%C3%A3os+intermedi%C3%A1rios+no+m%C3%A1ximo+a+cada+1,80+m+e+no+m%C3%ADnimo+a+cada+1,20+m.&entry.222003179=Rampas+nas+sa%C3%ADdas+dos+setores+com+acomoda%C3%A7%C3%A3o+de+pessoas+portadoras+de+necessidades+especiais.&entry.1463757062=Eventos+descobertos+com+delimita%C3%A7%C3%A3o+por+barreiras,+a+dist%C3%A2ncia+m%C3%A1xima+a+ser+percorrida+para+sa%C3%ADda+de+emerg%C3%AAcia+%C3%A9+120+m.&entry.1463757062=Em+constru%C3%A7%C3%B5es+provis%C3%B3rias,+quando+fechadas+lateralmente,+a+dist%C3%A2ncia+m%C3%A1xima+a+ser+percorrida+para+sa%C3%ADda+de+emerg%C3%AAncia+%C3%A9+35+m.&entry.1463757062=Evento+em+edifica%C3%A7%C3%B5es+permanentes,+a+dist%C3%A2ncia+m%C3%A1xima+a+percorrer+ser%C3%A1+conforme+projeto+aprovado+para+a+edifica%C3%A7%C3%A3o.&entry.687433793=Em+eventos+acima+de+10.000+pessoas,+instalar,+pr%C3%B3ximo+ao+palco,+barreiras+antiesmagamento+e+corredor+de+seguran%C3%A7a+com+largura+m%C3%ADnima+de+2,50+m.&entry.687433793=As+barreiras+antiesmagamento+devem+ter+altura+entre+1,05+m+e+1,22+m.&entry.687433793=As+barreiras+antiesmagamento+n%C3%A3o+devem+possuir+pontas+ou+bordas+agudas.&entry.687433793=As+barreiras+antiesmagamento+devem+possuir+plataforma+de+apoio+mais+alta+que+o+piso.&entry.568079951=Os+eventos+com+p%C3%BAblico+superior+a+40+mil+pessoas+e+com+fechamento+devem+ter+corredores+de+seguran%C3%A7a+e+setoriza%C3%A7%C3%A3o+de+p%C3%BAblico+com+no+m%C3%A1ximo+10+mil+pessoas+por+setor.&entry.568079951=Instalar+barreiras+antiesmagamento+para+setoriza%C3%A7%C3%A3o+do+p%C3%BAblcio+com+corredores+de+no+m%C3%ADnimo+2,5m.&entry.568079951=As+fileiras+dever%C3%A3o+ter+no+m%C3%A1ximo+60+assentos+quando+houver+corredor+somente+em+dois+lados.&entry.568079951=As+fileiras+dever%C3%A3o+ter+no+m%C3%A1ximo+30+assentos+quando+houver+corredor+somente+em+um+lado.&entry.568079951=A+setoriza%C3%A7%C3%A3o+de+p%C3%BAblico+sentado+dever%C3%A1+ter+no+m%C3%A1ximo+50+fileiras+por+setor+e+3+mil+pessoas.&entry.568079951=Os+corredores+de+seguran%C3%A7a+de+p%C3%BAblico+sentado+dever%C3%A3o+ter+largura+m%C3%ADnima+de+1,20m.&entry.568079951=Os+agrupamentos+de+mesas+com+corredores+em+tr%C3%AAs+ou+mais+lados+dever%C3%A3o+ter+no+maximo+48+pessoas.&entry.568079951=Os+agrupamentos+de+mesas+com+corredores+em+um+ou+dois+lados+dever%C3%A3o+ter+no+maximo+24+pessoas.&entry.568079951=A+dist%C3%A2ncia+entre+as+mesas+nos+agrupamentos+ser%C3%A1+de+no+m%C3%ADnimo+0,60m.&entry.568079951=Os+corredores+entre+os+agrupamentos+de+mesas+devem+ter+largura+m%C3%ADnima+de+1,20m.&entry.1510541898=LOCAIS+FECHADOS&entry.1007099289=Instalar+sistema+de+ilumina%C3%A7%C3%A3o+de+emerg%C3%AAncia+nas+rotas+de+fuga+em+recinto+fechado/coberto+e+no+interior+de+edifica%C3%A7%C3%B5es.&entry.1007099289=Instalar+sistema+de+ilumina%C3%A7%C3%A3o+de+emerg%C3%AAncia+nas+sa%C3%ADdas+de+emerg%C3%AAncia+em+recinto+fechado/coberto+e+no+interior+de+edifica%C3%A7%C3%B5es.&entry.1007099289=Correto+distanciamento+entre+os+pontos+de+luz+(dist%C3%A2ncia+de+4+vezes+a+altura).&entry.1762476025=Instalar+sistema+de+ilumina%C3%A7%C3%A3o+de+emerg%C3%AAncia+nas+rotas+de+fuga+nos+eventos+realizados+em+local+aberto,+no+per%C3%ADodo+noturno+ou+parcialmente+noturno.&entry.1762476025=Instalar+sistema+de+ilumina%C3%A7%C3%A3o+de+emerg%C3%AAncia+nas+saidas+de+emerg%C3%AAncia+nos+eventos+realizados+em+local+aberto,+no+per%C3%ADodo+noturno+ou+parcialmente+noturno.&entry.338075300=BATERIA+DE+EXTINTORES&entry.1870505228=Instalar+os+extintores+em+bateria+a+no+m%C3%A1ximo+50m+do+risco+e+isolado+do+p%C3%BAblico.&entry.2072061556=Instalar+extintores+nas+estruturas+com+coc%C3%A7%C3%A3o+de+alimentos.&entry.2072061556=Instalar+extintores+nas+estruturas+com+equipamentos+energizados+(ex.:+Gerador).&entry.2072061556=Instalar+extintores+nas+estruturas+com+material+combust%C3%ADvel+(ex.:+Central+de+GLP).&entry.2072061556=Instalar+extintores+nas+estruturas+tempor%C3%A1rias+confeccionadas+em+material+combust%C3%ADvel,+a++no+m%C3%A1ximo+5,0+m+do+risco+a+proteger.&entry.991345744=Extintores+devidamente+fixados+(nas+paredes+ou+em+suportes+fixados+no+piso)&entry.991345744=Extintores+dentro+do+prazo+de+Validade&entry.991345744=Extintores+corretos+de+acordo+com+a+classe+de+prote%C3%A7%C3%A3o+(A+B+C).&entry.456407203=GERADOR&entry.245960816=Instalar+gerador+nos+eventos+de+p%C3%BAblico+superior+a+10+mil+pessoas.&entry.245960816=Instalar+gerador+como+fonte+alternativa+para+brinquedos+mec%C3%A2nicos.&entry.245960816=Isolar+o+gerador+e+tanques+com+barreira+f%C3%ADsica.&entry.245960816=N%C3%A3o+instalar+o+gerador+em+ambiente+confinado.&entry.245960816=N%C3%A3o+operar+o+gerador+em+lugares+molhados.&entry.245960816=Instalar+aterramento+el%C3%A9trico+no+gerador.&entry.245960816=Direcionar+a+exaust%C3%A3o+do+gerador+para+fora+do+p%C3%BAblico.&entry.1015126727=O+quadro+de+disjuntores+deve+estar+isolado+em+local+seguro+fisicamente+e+eletricamente.&entry.1015126727=Instalar+tomadas+padr%C3%A3o+de+3+pinos.&entry.1015126727=Isolar+fia%C3%A7%C3%A3o+el%C3%A9trica+das+estruturas.&entry.1015126727=Proteger+fia%C3%A7%C3%A3o+estendida+no+solo+em+local+de+acesso+ao+p%C3%BAblico.&entry.1015126727=Instalar+dispositivo+de+prote%C3%A7%C3%A3o+DR+contra+fuga+de+corrente.&entry.1387309357=Instalar+aterramento+el%C3%A9trico+em+todas+as+estruturas+met%C3%A1licas.&entry.231274032=O+SPDA+deve+atender+os+requisitos+da+NBR+5419.&entry.1276852293=CENTRAL&entry.1615254798=Abertura+de+ventila%C3%A7%C3%A3o+adequada.&entry.1615254798=Instalar+registro+de+corte+para+cada+ponto+de+consumo+de+GLP.&entry.1615254798=Piso+elevado.&entry.1615254798=Apresentar+afastamentos+m%C3%ADnimos+(fonte+de+igni%C3%A7%C3%A3o,+fonte+de+eletricidade,+estacionamentos,+v%C3%A3os+e+aberturas...).&entry.1434165906=%C3%89+Proibido+o+uso+de+GLP+nas+bilheterias.&entry.1434165906=%C3%89+Proibido+o+uso+de+GLP+em+estruturas,+%C3%A1reas+de+acomoda%C3%A7%C3%A3o+e+circula%C3%A7%C3%A3o+de+p%C3%BAblico.&entry.1434165906=Instalar+um+P13+por+ponto+de+consumo,+com+mangueira+de+malha+de+a%C3%A7o,+registro,+em+local+protegido+e+ventilado.&entry.1434165906=Substituir+mangueira+de+GLP+maior+que+1,25m+por+tubo+multicamada.&entry.1434165906=Instalar+registro+de+corte+para+cada+ponto+de+consumo+ou+recipiente+P-13.&entry.1426316217=OBSERVA%C3%87%C3%95ES&entry.1693692350=Legenda+Foto+01&entry.1275966206=Legenda+Foto+02&entry.902635949=Legenda+Foto+03&entry.2073563943=Legenda+Foto+04&entry.2114160885=Legenda+Foto+05&entry.1714192818=Legenda+Foto+06
