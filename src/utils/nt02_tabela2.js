// Tabela 2 — Classificação do Risco de Incêndio de Acordo com as Ocupações e Usos
// Norma Técnica nº 02/2016-CBMDF — Risco de Incêndio e Carga de Incêndio
// Gerado dinamicamente varrendo e mapeando todos os 1332 CNAEs para cada ocupação

export const NT02_TABELA2 = [
  {
    "grupo": "Residenciais",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo",
        "exemplos": [
          {
            "termo": "Casas térreas e assobradadas, isoladas ou não",
            "ocupacao": "01",
            "cnaes": [
              "8111-7/00",
              "8112-5/00",
              "8711-5/05"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Condomínios horizontais de residências unifamiliares",
            "ocupacao": "01",
            "cnaes": [
              "8111-7/00",
              "8112-5/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Condomínios verticais de apartamentos",
            "ocupacao": "02",
            "cnaes": [
              "8111-7/00",
              "8112-5/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Transitórias",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo",
        "exemplos": [
          {
            "termo": "Conventos",
            "ocupacao": "03",
            "cnaes": [
              "9491-0/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Mosteiros",
            "ocupacao": "03",
            "cnaes": [
              "9491-0/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Albergues",
            "ocupacao": "03",
            "cnaes": [
              "5590-6/01",
              "8730-1/02"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Alojamentos",
            "ocupacao": "03",
            "cnaes": [
              "5590-6/03",
              "5590-6/99",
              "8800-6/00",
              "9609-2/07"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Casa de cômodos",
            "ocupacao": "03",
            "cnaes": [
              "5590-6/03",
              "5590-6/99",
              "8800-6/00",
              "9609-2/07"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hotéis",
            "ocupacao": "04",
            "cnaes": [
              "5510-8/01",
              "5510-8/02"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Internatos",
            "ocupacao": "03",
            "cnaes": [
              "5590-6/03",
              "5590-6/99",
              "8800-6/00",
              "9609-2/07"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Motéis",
            "ocupacao": "04",
            "cnaes": [
              "5510-8/03"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Pensionatos",
            "ocupacao": "03",
            "cnaes": [
              "5590-6/03",
              "5590-6/99",
              "8800-6/00",
              "9609-2/07"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Pousadas",
            "ocupacao": "04",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Apart-hotéis",
            "ocupacao": "05",
            "cnaes": [
              "5510-8/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Flats",
            "ocupacao": "05",
            "cnaes": [
              "5510-8/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hotéis e assemelhados com cozinha própria",
            "ocupacao": "04",
            "cnaes": [
              "5510-8/01",
              "5510-8/02"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hotéis residenciais",
            "ocupacao": "05",
            "cnaes": [
              "5510-8/01",
              "5510-8/02"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Comerciais",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo (Área até 750 m²)",
        "exemplos": [
          {
            "termo": "Armarinhos",
            "ocupacao": "06",
            "cnaes": [
              "4641-9/03",
              "4755-5/02"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Butiques",
            "ocupacao": "06",
            "cnaes": [
              "1340-5/01",
              "1340-5/02",
              "1340-5/99",
              "1412-6/01",
              "1412-6/02",
              "1412-6/03",
              "1414-2/00",
              "1422-3/00",
              "1531-9/01",
              "1531-9/02",
              "1533-5/00",
              "1539-4/00",
              "1540-8/00",
              "2864-0/00",
              "3314-7/20",
              "4616-8/00",
              "4642-7/01",
              "4643-5/01",
              "4781-4/00",
              "4782-2/01",
              "7723-3/00",
              "9529-1/01"
            ],
            "obs": "Encontrado(s) 22 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Drogarias",
            "ocupacao": "06",
            "cnaes": [
              "4771-7/01",
              "4771-7/02",
              "4771-7/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Mercearias",
            "ocupacao": "06",
            "cnaes": [
              "4712-1/00",
              "5211-7/01",
              "5211-7/99"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Frutarias",
            "ocupacao": "06",
            "cnaes": [
              "4724-5/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Sacolões",
            "ocupacao": "06",
            "cnaes": [
              "4724-5/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Açougues",
            "ocupacao": "06",
            "cnaes": [
              "4634-6/01",
              "4634-6/99",
              "4722-9/01"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Tabacarias",
            "ocupacao": "06",
            "cnaes": [
              "4729-6/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Restaurantes e bares sem concentração de público",
            "ocupacao": "25",
            "cnaes": [
              "5611-2/01",
              "5611-2/04",
              "5611-2/05"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio (Área entre 750 m² e 1000 m²)",
        "exemplos": [
          {
            "termo": "Edifícios de lojas",
            "ocupacao": "07",
            "cnaes": [
              "6810-2/01",
              "6810-2/02",
              "6810-2/03",
              "6821-8/02"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Galerias comerciais",
            "ocupacao": "07",
            "cnaes": [
              "6810-2/01",
              "6810-2/02",
              "6810-2/03",
              "6821-8/02"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Lojas de departamento",
            "ocupacao": "07",
            "cnaes": [
              "4713-0/02",
              "4713-0/04"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Magazines",
            "ocupacao": "07",
            "cnaes": [
              "4713-0/02",
              "4713-0/04"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Mercados e supermercados",
            "ocupacao": "07",
            "cnaes": [
              "4711-3/02",
              "4712-1/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Padarias",
            "ocupacao": "07",
            "cnaes": [
              "1091-1/01",
              "1091-1/02",
              "4721-1/02"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio (Área superior a 1000 m²)",
        "exemplos": [
          {
            "termo": "Centros comerciais",
            "ocupacao": "08",
            "cnaes": [
              "6810-2/01",
              "6810-2/02",
              "6810-2/03",
              "6821-8/02"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Feiras permanentes",
            "ocupacao": "08",
            "cnaes": [
              "7319-0/01",
              "8230-0/01"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hipermercados",
            "ocupacao": "08",
            "cnaes": [
              "4711-3/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Loja de armas e munições",
            "ocupacao": "41",
            "cnaes": [
              "4789-0/09"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Loja de colchões",
            "ocupacao": "08",
            "cnaes": [
              "3104-7/00",
              "4649-4/04",
              "4754-7/02"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Marcenarias",
            "ocupacao": "08",
            "cnaes": [
              "1610-2/03",
              "1610-2/04"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Madeireiras",
            "ocupacao": "08",
            "cnaes": [
              "0210-1/05",
              "0210-1/07",
              "0220-9/01",
              "1610-2/03",
              "1610-2/04",
              "1610-2/05",
              "1621-8/00",
              "1622-6/01",
              "1622-6/02",
              "1623-4/00",
              "1629-3/01",
              "3101-2/00",
              "3103-9/00",
              "4613-3/00",
              "4671-1/00",
              "4744-0/02"
            ],
            "obs": "Encontrado(s) 16 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Shopping centers",
            "ocupacao": "08",
            "cnaes": [
              "6810-2/01",
              "6810-2/02",
              "6810-2/03",
              "6821-8/02"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Serviços Profissionais",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo",
        "exemplos": [
          {
            "termo": "Agências bancárias",
            "ocupacao": "10",
            "cnaes": [
              "2949-2/01",
              "6421-2/00",
              "6422-1/00",
              "6424-7/01",
              "6431-0/00",
              "6432-8/00",
              "6433-6/00",
              "6438-7/01",
              "6619-3/03",
              "8640-2/14"
            ],
            "obs": "Encontrado(s) 10 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Agências de correios",
            "ocupacao": "09",
            "cnaes": [
              "5310-5/01",
              "5310-5/02",
              "5320-2/01"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Barbearias",
            "ocupacao": "12",
            "cnaes": [
              "9602-5/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Cabeleireiros",
            "ocupacao": "12",
            "cnaes": [
              "9602-5/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Cartórios",
            "ocupacao": "09",
            "cnaes": [
              "2813-5/00",
              "6912-5/00",
              "8640-2/08"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Centros profissionais",
            "ocupacao": "09",
            "cnaes": [
              "6810-2/01",
              "6810-2/02",
              "6810-2/03",
              "6821-8/02"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Chaveiros",
            "ocupacao": "12",
            "cnaes": [
              "9529-1/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Escritórios administrativos e técnicos",
            "ocupacao": "09",
            "cnaes": [
              "1741-9/02",
              "2829-1/01",
              "3299-0/02",
              "3314-7/09",
              "4647-8/01",
              "4789-0/07",
              "7733-1/00",
              "8211-3/00",
              "8219-9/99"
            ],
            "obs": "Encontrado(s) 9 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Laboratório de análises clínicas",
            "ocupacao": "11",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Instituições financeiras",
            "ocupacao": "09",
            "cnaes": [
              "6435-2/01",
              "6436-1/00",
              "6437-9/00",
              "6461-1/00",
              "6462-0/00",
              "6499-9/04",
              "6612-6/05",
              "6619-3/02"
            ],
            "obs": "Encontrado(s) 8 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Postos policiais",
            "ocupacao": "09",
            "cnaes": [
              "8424-8/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Quartéis",
            "ocupacao": "09",
            "cnaes": [
              "2550-1/01",
              "3050-4/00",
              "8422-1/00",
              "8425-6/00",
              "9430-8/00"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Repartições públicas",
            "ocupacao": "09",
            "cnaes": [
              "8411-6/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Assistência técnica, reparação e manutenção de aparelhos eletrodomésticos",
            "ocupacao": "12",
            "cnaes": [
              "0161-0/03",
              "1013-9/02",
              "1051-1/00",
              "1311-1/00",
              "1312-0/00",
              "2330-3/05",
              "2759-7/99",
              "3311-2/00",
              "3312-1/02",
              "3312-1/03",
              "3312-1/04",
              "3313-9/01",
              "3313-9/02",
              "3313-9/99",
              "3314-7/01",
              "3314-7/02",
              "3314-7/03",
              "3314-7/04",
              "3314-7/05",
              "3314-7/06",
              "3314-7/07",
              "3314-7/08",
              "3314-7/09",
              "3314-7/10",
              "3314-7/11",
              "3314-7/12",
              "3314-7/13",
              "3314-7/14",
              "3314-7/15",
              "3314-7/16",
              "3314-7/17",
              "3314-7/18",
              "3314-7/19",
              "3314-7/20",
              "3314-7/21",
              "3314-7/22",
              "3314-7/99",
              "3315-5/00",
              "3316-3/01",
              "3316-3/02",
              "3317-1/01",
              "3317-1/02",
              "3319-8/00",
              "4221-9/03",
              "4221-9/05",
              "4311-8/02",
              "4319-3/00",
              "4321-5/00",
              "4322-3/02",
              "4329-1/03",
              "4520-0/01",
              "4520-0/03",
              "4520-0/07",
              "4543-9/00",
              "4615-0/00",
              "4753-9/00",
              "6209-1/00",
              "8219-9/99",
              "9511-8/00",
              "9512-6/00",
              "9521-5/00",
              "9529-1/01",
              "9529-1/03",
              "9529-1/04",
              "9529-1/05",
              "9529-1/06",
              "9529-1/99",
              "9603-3/01"
            ],
            "obs": "Encontrado(s) 68 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Centro de processamento de dados",
            "ocupacao": "11",
            "cnaes": [
              "6190-6/01",
              "6190-6/02",
              "6311-9/00",
              "6319-4/00"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estúdios de rádio",
            "ocupacao": "11",
            "cnaes": [
              "0725-1/00",
              "6010-1/00",
              "8640-2/11"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Gravação de áudio",
            "ocupacao": "11",
            "cnaes": [
              "3220-5/00",
              "4756-3/00",
              "5920-1/00",
              "7729-2/02",
              "8592-9/03",
              "9001-9/02"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Laboratórios técnico-científicos",
            "ocupacao": "11",
            "cnaes": [
              "6201-5/01",
              "6202-3/00",
              "6203-1/00",
              "6433-6/00",
              "7210-0/00",
              "7220-7/00",
              "7320-3/00",
              "8599-6/04"
            ],
            "obs": "Encontrado(s) 8 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Pintura de letreiros",
            "ocupacao": "12",
            "cnaes": [
              "3299-0/03",
              "3299-0/04",
              "8299-7/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Almoxarifados",
            "ocupacao": "37",
            "cnaes": [
              "5211-7/01",
              "5211-7/99"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Centrais de polícia",
            "ocupacao": "09",
            "cnaes": [
              "8424-8/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Clínicas radiológicas",
            "ocupacao": "32",
            "cnaes": [
              "2660-4/00",
              "3312-1/03",
              "8640-2/05",
              "8640-2/07"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Clínicas de radioterapia",
            "ocupacao": "32",
            "cnaes": [
              "8640-2/05",
              "8640-2/07",
              "8640-2/11"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Delegacias",
            "ocupacao": "09",
            "cnaes": [
              "8424-8/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estúdios de gravação de imagem",
            "ocupacao": "11",
            "cnaes": [
              "1830-0/02",
              "2099-1/01",
              "2640-0/00",
              "2670-1/02",
              "4649-4/07",
              "4753-9/00",
              "5911-1/01",
              "5911-1/02",
              "5911-1/99",
              "5912-0/99",
              "5913-8/00",
              "5914-6/00",
              "7722-5/00"
            ],
            "obs": "Encontrado(s) 13 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estofamento de móveis",
            "ocupacao": "12",
            "cnaes": [
              "3104-7/00",
              "3250-7/02",
              "4110-7/00",
              "6435-2/01",
              "6470-1/01",
              "6470-1/03",
              "6612-6/01",
              "6612-6/02",
              "7490-1/04",
              "9529-1/05"
            ],
            "obs": "Encontrado(s) 10 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estúdios de cinema e televisão",
            "ocupacao": "11",
            "cnaes": [
              "2670-1/02",
              "5911-1/01",
              "5911-1/99",
              "5912-0/99",
              "5913-8/00",
              "5914-6/00",
              "6021-7/00",
              "6022-5/02",
              "6141-8/00",
              "6142-6/00",
              "6143-4/00"
            ],
            "obs": "Encontrado(s) 11 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Laboratórios de análises radiológicas",
            "ocupacao": "32",
            "cnaes": [
              "8640-2/05",
              "8640-2/07"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Lavanderias a seco",
            "ocupacao": "12",
            "cnaes": [
              "9601-7/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "C-1",
        "descricao": "Risco Alto",
        "exemplos": [
          {
            "termo": "Aplicação de líquidos inflamáveis",
            "ocupacao": "33",
            "cnaes": [
              "2539-0/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Limpeza com solventes",
            "ocupacao": "33",
            "cnaes": [
              "2539-0/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Pintura e envernizamento por imersão",
            "ocupacao": "33",
            "cnaes": [
              "2539-0/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Pintura por fluorcoating",
            "ocupacao": "33",
            "cnaes": [
              "2539-0/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Escolares",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo (Área até 200 m²)",
        "exemplos": [
          {
            "termo": "Academias de ginástica, musculação, esportes e artes marciais",
            "ocupacao": "15",
            "cnaes": [
              "8591-1/00",
              "9311-5/00",
              "9313-1/00"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio (Área superior a 200 m²)",
        "exemplos": [
          {
            "termo": "Creches",
            "ocupacao": "16",
            "cnaes": [
              "8511-2/00",
              "8512-1/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Escolas maternais e de educação infantil",
            "ocupacao": "16",
            "cnaes": [
              "8511-2/00",
              "8512-1/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Escolas profissionais",
            "ocupacao": "13",
            "cnaes": [
              "2092-4/02",
              "4789-0/06",
              "6209-1/00",
              "7119-7/03",
              "8541-4/00",
              "8542-2/00"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Escolas para idosos",
            "ocupacao": "13",
            "cnaes": [
              "7830-2/00",
              "8599-6/02",
              "8599-6/05",
              "8599-6/99",
              "8630-5/01",
              "8630-5/02"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Saunas",
            "ocupacao": "12",
            "cnaes": [
              "9609-2/05"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Escolas para portadores de necessidades especiais",
            "ocupacao": "17",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Concentração de Público",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo",
        "exemplos": [
          {
            "termo": "Bares",
            "ocupacao": "25",
            "cnaes": [
              "1111-9/02",
              "1122-4/04",
              "1122-4/99",
              "2862-3/00",
              "3314-7/19",
              "4617-6/00",
              "4635-4/03",
              "4635-4/99",
              "4723-7/00",
              "5611-2/04",
              "5611-2/05"
            ],
            "obs": "Encontrado(s) 11 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estação rodoviária",
            "ocupacao": "21",
            "cnaes": [
              "4211-1/02",
              "5222-2/00",
              "5231-1/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Igrejas",
            "ocupacao": "19",
            "cnaes": [
              "9491-0/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Mesquitas",
            "ocupacao": "19",
            "cnaes": [
              "9491-0/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Sala de reuniões",
            "ocupacao": "22",
            "cnaes": [
              "7319-0/01",
              "8230-0/01"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Sinagogas",
            "ocupacao": "19",
            "cnaes": [
              "9491-0/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Restaurantes",
            "ocupacao": "25",
            "cnaes": [
              "3299-0/01",
              "4637-1/04",
              "4679-6/01",
              "4950-7/00",
              "5611-2/01",
              "5611-2/03",
              "7490-1/01",
              "7722-5/00",
              "8299-7/02",
              "8720-4/99",
              "9001-9/04",
              "9001-9/05",
              "9102-3/01",
              "9312-3/00",
              "9329-8/01",
              "9329-8/03"
            ],
            "obs": "Encontrado(s) 16 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Templos",
            "ocupacao": "19",
            "cnaes": [
              "9491-0/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Auditórios",
            "ocupacao": "22",
            "cnaes": [
              "7319-0/01",
              "8230-0/01"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Bares e restaurantes dançantes",
            "ocupacao": "23",
            "cnaes": [
              "1111-9/02",
              "1122-4/04",
              "1122-4/99",
              "2862-3/00",
              "3314-7/19",
              "4617-6/00",
              "4635-4/03",
              "4635-4/99",
              "4723-7/00",
              "5611-2/04",
              "5611-2/05"
            ],
            "obs": "Encontrado(s) 11 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Bibliotecas e assemelhados",
            "ocupacao": "18",
            "cnaes": [
              "9101-5/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Boates",
            "ocupacao": "23",
            "cnaes": [
              "4930-2/01",
              "4930-2/02",
              "4930-2/04",
              "8592-9/01",
              "8592-9/02",
              "9001-9/03",
              "9329-8/01"
            ],
            "obs": "Encontrado(s) 7 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Cinemas",
            "ocupacao": "22",
            "cnaes": [
              "2670-1/02",
              "5911-1/01",
              "5911-1/99",
              "5912-0/99",
              "5913-8/00",
              "5914-6/00"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Danceterias",
            "ocupacao": "23",
            "cnaes": [
              "4930-2/01",
              "4930-2/02",
              "4930-2/04",
              "8592-9/01",
              "8592-9/02",
              "9001-9/03",
              "9329-8/01"
            ],
            "obs": "Encontrado(s) 7 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estação metroviária",
            "ocupacao": "21",
            "cnaes": [
              "4912-4/03",
              "5229-0/99"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estação ferroviária",
            "ocupacao": "21",
            "cnaes": [
              "5222-2/00",
              "5231-1/03"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estádios",
            "ocupacao": "20",
            "cnaes": [
              "4299-5/01",
              "8591-1/00",
              "9311-5/00"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Galerias de arte",
            "ocupacao": "18",
            "cnaes": [
              "1340-5/01",
              "1340-5/02",
              "1340-5/99",
              "1351-1/00",
              "1352-9/00",
              "1353-7/00",
              "1354-5/00",
              "1529-7/00",
              "1540-8/00",
              "1623-4/00",
              "1629-3/01",
              "1629-3/02",
              "2219-6/00",
              "2229-3/01",
              "2229-3/02",
              "2229-3/03",
              "2229-3/99",
              "2330-3/02",
              "2330-3/03",
              "2330-3/99",
              "2342-7/02",
              "2532-2/01",
              "2865-8/00",
              "3211-6/02",
              "3212-4/00",
              "3230-2/00",
              "3314-7/21",
              "4212-0/00",
              "4661-3/00",
              "4662-1/00",
              "4663-0/00",
              "4664-8/00",
              "4665-6/00",
              "4669-9/01",
              "4669-9/99",
              "4744-0/02",
              "4789-0/01",
              "4789-0/03",
              "6422-1/00",
              "6431-0/00",
              "8592-9/02",
              "8592-9/99",
              "9001-9/99",
              "9002-7/02",
              "9003-5/00",
              "9102-3/01",
              "9493-6/00"
            ],
            "obs": "Encontrado(s) 47 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Ginásios",
            "ocupacao": "20",
            "cnaes": [
              "4299-5/01",
              "8591-1/00",
              "9311-5/00"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Locais de exposições permanentes",
            "ocupacao": "22",
            "cnaes": [
              "7319-0/01",
              "8230-0/01"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Museus",
            "ocupacao": "18",
            "cnaes": [
              "9102-3/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Teatros",
            "ocupacao": "22",
            "cnaes": [
              "9001-9/03",
              "9001-9/04",
              "9001-9/05",
              "9001-9/99",
              "9003-5/00"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Salões diversos",
            "ocupacao": "23",
            "cnaes": [
              "5620-1/02",
              "7420-0/04",
              "8230-0/01",
              "8230-0/02",
              "9319-1/01"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Aeroporto",
            "ocupacao": "21",
            "cnaes": [
              "4211-1/02",
              "4329-1/04",
              "4713-0/05",
              "5240-1/01",
              "5240-1/99"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Autódromo",
            "ocupacao": "20",
            "cnaes": [
              "4299-5/01",
              "8591-1/00",
              "9311-5/00"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Kartódromo",
            "ocupacao": "20",
            "cnaes": [
              "4299-5/01",
              "8591-1/00",
              "9311-5/00"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Casa de jogos",
            "ocupacao": "23",
            "cnaes": [
              "3240-0/02",
              "3240-0/03",
              "9200-3/02",
              "9200-3/99",
              "9329-8/03"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Clubes noturnos em geral",
            "ocupacao": "23",
            "cnaes": [
              "9329-8/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Feiras de exposições itinerantes",
            "ocupacao": "22",
            "cnaes": [
              "7319-0/01",
              "8230-0/01"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Salão de clubes sociais",
            "ocupacao": "23",
            "cnaes": [
              "9312-3/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Salão de festas ou bailes",
            "ocupacao": "23",
            "cnaes": [
              "5620-1/02",
              "7420-0/04",
              "8230-0/01",
              "8230-0/02",
              "9319-1/01"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "C-1",
        "descricao": "Risco Alto",
        "exemplos": [
          {
            "termo": "Circos e assemelhados",
            "ocupacao": "46",
            "cnaes": [
              "9001-9/03",
              "9001-9/04",
              "9001-9/05",
              "9001-9/99",
              "9003-5/00"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estruturas provisórias (arquibancadas, palanques, palcos e tendas)",
            "ocupacao": "24",
            "cnaes": [
              "7739-0/03"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Parque de diversões",
            "ocupacao": "46",
            "cnaes": [
              "9321-2/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Qualquer atividade ou evento com espetáculo pirotécnico em ambiente aberto",
            "ocupacao": "23",
            "cnaes": [
              "5620-1/02",
              "7420-0/04",
              "8230-0/02",
              "9319-1/01",
              "9329-8/99"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "C-2",
        "descricao": "Risco Alto",
        "exemplos": [
          {
            "termo": "Qualquer edificação com espetáculo pirotécnico em ambiente fechado (indoor)",
            "ocupacao": "23",
            "cnaes": [
              "5620-1/02",
              "7420-0/04",
              "8230-0/02",
              "9319-1/01",
              "9329-8/99"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Garagens",
    "niveis": [
      {
        "risco": "B-1",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Embarcadouro",
            "ocupacao": "21",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Oficina e garagens de veículos de carga e descarga",
            "ocupacao": "27",
            "cnaes": [
              "2920-4/01",
              "2920-4/02",
              "2930-1/01",
              "2930-1/03",
              "3315-5/00",
              "3600-6/02",
              "4511-1/04"
            ],
            "obs": "Encontrado(s) 7 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Edifícios garagem",
            "ocupacao": "26",
            "cnaes": [
              "5223-1/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estacionamento de veículos",
            "ocupacao": "26",
            "cnaes": [
              "5223-1/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Garagens automotivas",
            "ocupacao": "26",
            "cnaes": [
              "5223-1/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Showrooms automotivos",
            "ocupacao": "06",
            "cnaes": [
              "2910-7/01",
              "2910-7/02",
              "2910-7/03",
              "4511-1/01",
              "4511-1/02",
              "4511-1/03",
              "5221-4/00"
            ],
            "obs": "Encontrado(s) 7 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Agências de compra e venda de veículos",
            "ocupacao": "06",
            "cnaes": [
              "4511-1/01",
              "4511-1/02"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Oficina de conserto de veículos (exceto de carga e coletivo)",
            "ocupacao": "27",
            "cnaes": [
              "3315-5/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Borracharia (sem recauchutagem)",
            "ocupacao": "27",
            "cnaes": [
              "4520-0/06"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Posto de lavagem",
            "ocupacao": "27",
            "cnaes": [
              "2062-2/00",
              "4520-0/05"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Local com serviço de troca de óleo",
            "ocupacao": "27",
            "cnaes": [
              "4520-0/05"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hangares",
            "ocupacao": "28",
            "cnaes": [
              "3041-5/00",
              "3042-3/00",
              "3316-3/01",
              "3316-3/02",
              "4614-1/00",
              "5112-9/01",
              "5240-1/99",
              "7719-5/02"
            ],
            "obs": "Encontrado(s) 8 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Garagens de máquinas agrícolas e rodoviárias",
            "ocupacao": "27",
            "cnaes": [
              "0810-0/99",
              "1622-6/99",
              "2223-4/00",
              "2229-3/03",
              "2330-3/02",
              "2330-3/03",
              "2330-3/05",
              "2342-7/02",
              "2391-5/02",
              "2599-3/01",
              "2854-2/00",
              "3011-3/01",
              "3011-3/02",
              "3012-1/00",
              "3314-7/17",
              "4120-4/00",
              "4211-1/01",
              "4212-0/00",
              "4221-9/01",
              "4221-9/02",
              "4221-9/04",
              "4222-7/01",
              "4223-5/00",
              "4299-5/01",
              "4313-4/00",
              "4330-4/99",
              "4399-1/05",
              "4399-1/99",
              "4613-3/00",
              "4662-1/00",
              "4679-6/04",
              "4679-6/99",
              "4685-1/00",
              "4744-0/05",
              "4744-0/99",
              "7732-2/01"
            ],
            "obs": "Encontrado(s) 36 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Oficina retificadora de motores",
            "ocupacao": "27",
            "cnaes": [
              "2722-8/02",
              "2950-6/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Píer",
            "ocupacao": "21",
            "cnaes": [
              "9609-2/06"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Hospitalares",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo",
        "exemplos": [
          {
            "termo": "Clínicas sem internação",
            "ocupacao": "32",
            "cnaes": [
              "8630-5/01",
              "8630-5/02",
              "8630-5/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Consultórios",
            "ocupacao": "32",
            "cnaes": [
              "8630-5/01",
              "8630-5/02",
              "8630-5/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hospitais veterinários",
            "ocupacao": "29",
            "cnaes": [
              "7500-1/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Clínicas radiológicas e de radioterapia",
            "ocupacao": "32",
            "cnaes": [
              "8640-2/05",
              "8640-2/07",
              "8640-2/11"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Ambulatórios",
            "ocupacao": "32",
            "cnaes": [
              "8630-5/01",
              "8630-5/02",
              "8630-5/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Postos de atendimento de saúde",
            "ocupacao": "32",
            "cnaes": [
              "8630-5/99"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Centros de saúde",
            "ocupacao": "32",
            "cnaes": [
              "8630-5/01",
              "8630-5/02",
              "8630-5/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Prontos-socorros sem internação",
            "ocupacao": "32",
            "cnaes": [
              "8610-1/01",
              "8610-1/02",
              "8621-6/02",
              "8622-4/00"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Asilos",
            "ocupacao": "31",
            "cnaes": [
              "8711-5/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Abrigos geriátricos",
            "ocupacao": "31",
            "cnaes": [
              "8711-5/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hospitais com internação",
            "ocupacao": "30",
            "cnaes": [
              "8610-1/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Casa de saúde",
            "ocupacao": "30",
            "cnaes": [
              "8610-1/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Instituição de reabilitação de deficientes físicos e mentais",
            "ocupacao": "31",
            "cnaes": [
              "8711-5/03"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Clínicas com internação",
            "ocupacao": "30",
            "cnaes": [
              "8610-1/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Prontos-socorros de urgência com internação",
            "ocupacao": "30",
            "cnaes": [
              "8610-1/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Industriais",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo",
        "exemplos": [
          {
            "termo": "Materiais de construção incombustíveis (cimento, areia, brita, tijolo, pedra, ferragem e outros materiais incombustíveis)",
            "ocupacao": "33",
            "cnaes": [
              "0810-0/05",
              "0810-0/10",
              "0899-1/03",
              "2330-3/01",
              "2330-3/02",
              "2330-3/04",
              "2330-3/05",
              "2330-3/99",
              "2392-3/00",
              "4330-4/03"
            ],
            "obs": "Encontrado(s) 10 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Avicultura",
            "ocupacao": "33",
            "cnaes": [
              "0155-5/04",
              "1012-1/01",
              "3041-5/00",
              "3042-3/00",
              "3316-3/01",
              "3316-3/02",
              "4614-1/00",
              "4633-8/02",
              "4634-6/02",
              "5021-1/01",
              "5021-1/02",
              "5022-0/01",
              "5022-0/02",
              "5091-2/01",
              "5091-2/02",
              "5112-9/01",
              "7719-5/02"
            ],
            "obs": "Encontrado(s) 17 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Beneficiamento de cereais e grãos",
            "ocupacao": "33",
            "cnaes": [
              "0111-3/99",
              "1061-9/01",
              "1062-7/00",
              "1069-4/00",
              "1072-4/02",
              "1081-3/02",
              "4632-0/01",
              "4632-0/03"
            ],
            "obs": "Encontrado(s) 8 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Bebidas gaseificadas",
            "ocupacao": "37",
            "cnaes": [
              "1122-4/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Eletrônicos",
            "ocupacao": "33",
            "cnaes": [
              "2610-8/00",
              "2622-1/00",
              "2829-1/01",
              "3240-0/01",
              "3250-7/01",
              "3314-7/09",
              "4649-4/02",
              "4652-4/00",
              "4757-1/00",
              "6619-3/04",
              "7729-2/01",
              "9329-8/04",
              "9511-8/00",
              "9521-5/00"
            ],
            "obs": "Encontrado(s) 14 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Hidroelétricas",
            "ocupacao": "33",
            "cnaes": [
              "3511-5/01",
              "4221-9/01"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Produtos lácteos",
            "ocupacao": "33",
            "cnaes": [
              "1052-0/00",
              "4631-1/00",
              "4721-1/03"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Curtumes, peles e couros",
            "ocupacao": "33",
            "cnaes": [
              "1510-6/00",
              "1529-7/00",
              "1531-9/01",
              "1531-9/02",
              "2864-0/00",
              "3314-7/20",
              "4623-1/02"
            ],
            "obs": "Encontrado(s) 7 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Destilarias e bebidas alcoólicas",
            "ocupacao": "33",
            "cnaes": [
              "1111-9/01",
              "1111-9/02"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estações e subestações transformadoras",
            "ocupacao": "33",
            "cnaes": [
              "3511-5/02",
              "3512-3/00",
              "3514-0/00",
              "4221-9/02",
              "4221-9/03"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Gorduras, sebo, graxas e ceras",
            "ocupacao": "33",
            "cnaes": [
              "1041-4/00",
              "1042-2/00",
              "1043-1/00",
              "4637-1/03"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Látex e cola",
            "ocupacao": "33",
            "cnaes": [
              "2091-6/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Máquinas e equipamentos mecânicos e eletromecânicos",
            "ocupacao": "37",
            "cnaes": [
              "2825-9/00",
              "2829-1/99",
              "2833-0/00",
              "2851-8/00",
              "2852-6/00",
              "2854-2/00",
              "2862-3/00",
              "2863-1/00",
              "2864-0/00",
              "2865-8/00",
              "2866-6/00",
              "2869-1/00",
              "3314-7/10",
              "3314-7/11",
              "3314-7/14",
              "3314-7/15",
              "3314-7/17",
              "3314-7/19",
              "3314-7/20",
              "3314-7/99",
              "3321-0/00",
              "4663-0/00",
              "4665-6/00",
              "4669-9/99",
              "7731-4/00",
              "7732-2/01",
              "7733-1/00",
              "7739-0/01",
              "7739-0/99"
            ],
            "obs": "Encontrado(s) 29 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Plásticos e papel",
            "ocupacao": "33",
            "cnaes": [
              "1731-1/00",
              "1733-8/00",
              "2222-6/00"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Ração animal",
            "ocupacao": "33",
            "cnaes": [
              "0161-0/03",
              "0210-1/07",
              "0220-9/01",
              "0500-3/01",
              "0600-0/01",
              "0600-0/02",
              "0600-0/03",
              "0710-3/01",
              "0721-9/01",
              "0722-7/01",
              "0723-5/01",
              "0724-3/01",
              "0725-1/00",
              "0729-4/01",
              "0729-4/02",
              "0729-4/03",
              "0729-4/04",
              "0810-0/01",
              "0810-0/02",
              "0810-0/03",
              "0810-0/04",
              "0810-0/05",
              "0810-0/06",
              "0810-0/07",
              "0810-0/08",
              "0810-0/09",
              "0810-0/10",
              "0810-0/99",
              "0891-6/00",
              "0892-4/01",
              "0892-4/02",
              "0893-2/00",
              "0899-1/01",
              "0899-1/02",
              "0899-1/03",
              "0899-1/99",
              "0910-6/00",
              "0990-4/01",
              "0990-4/02",
              "0990-4/03",
              "1013-9/02",
              "1051-1/00",
              "1066-0/00",
              "1311-1/00",
              "1312-0/00",
              "2019-3/01",
              "2330-3/05",
              "2391-5/01",
              "2391-5/02",
              "2399-1/01",
              "2823-2/00",
              "2851-8/00",
              "2852-6/00",
              "2950-6/00",
              "3311-2/00",
              "3312-1/02",
              "3312-1/03",
              "3312-1/04",
              "3313-9/01",
              "3313-9/02",
              "3313-9/99",
              "3314-7/01",
              "3314-7/02",
              "3314-7/03",
              "3314-7/04",
              "3314-7/05",
              "3314-7/06",
              "3314-7/07",
              "3314-7/08",
              "3314-7/09",
              "3314-7/10",
              "3314-7/11",
              "3314-7/12",
              "3314-7/13",
              "3314-7/14",
              "3314-7/15",
              "3314-7/16",
              "3314-7/17",
              "3314-7/18",
              "3314-7/19",
              "3314-7/20",
              "3314-7/21",
              "3314-7/22",
              "3314-7/99",
              "3315-5/00",
              "3316-3/01",
              "3317-1/01",
              "3317-1/02",
              "3319-8/00",
              "3511-5/01",
              "3511-5/02",
              "3831-9/01",
              "3831-9/99",
              "3832-7/00",
              "3839-4/99",
              "4110-7/00",
              "4221-9/01",
              "4311-8/02",
              "4319-3/00",
              "4322-3/02",
              "4329-1/03",
              "4329-1/05",
              "4399-1/01",
              "4399-1/04",
              "4399-1/05",
              "4520-0/01",
              "4520-0/03",
              "4520-0/07",
              "4543-9/00",
              "4623-1/09",
              "4662-1/00",
              "4689-3/01",
              "4789-0/04",
              "5231-1/01",
              "5240-1/01",
              "5240-1/99",
              "6493-0/00",
              "6611-8/04",
              "6613-4/00",
              "6630-4/00",
              "6822-6/00",
              "7739-0/01",
              "8219-9/99",
              "8411-6/00",
              "8550-3/01",
              "9002-7/02",
              "9102-3/01",
              "9102-3/02",
              "9200-3/02",
              "9200-3/99",
              "9329-8/02",
              "9329-8/03",
              "9329-8/04",
              "9511-8/00",
              "9512-6/00",
              "9521-5/00",
              "9529-1/01",
              "9529-1/03",
              "9529-1/04",
              "9529-1/05",
              "9529-1/06",
              "9529-1/99",
              "9609-2/04"
            ],
            "obs": "Encontrado(s) 143 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Usinagem e metalúrgica",
            "ocupacao": "33",
            "cnaes": [
              "2539-0/01",
              "2861-5/00",
              "3314-7/18"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Gráficas",
            "ocupacao": "33",
            "cnaes": [
              "1811-3/01",
              "1811-3/02",
              "1812-1/00",
              "1813-0/01",
              "1813-0/99",
              "1821-1/00",
              "2072-0/00",
              "5821-2/00",
              "5822-1/01",
              "5822-1/02",
              "5823-9/00",
              "5829-8/00"
            ],
            "obs": "Encontrado(s) 12 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Bebidas e sucos",
            "ocupacao": "33",
            "cnaes": [
              "1033-3/01",
              "1033-3/02",
              "1111-9/02",
              "1122-4/04",
              "1122-4/99",
              "2862-3/00",
              "3314-7/19",
              "4617-6/00",
              "4635-4/03",
              "4635-4/99",
              "4723-7/00",
              "5611-2/03",
              "5611-2/04",
              "5611-2/05"
            ],
            "obs": "Encontrado(s) 14 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Vidro e seus produtos",
            "ocupacao": "33",
            "cnaes": [
              "2311-7/00",
              "2312-5/00",
              "2319-2/00",
              "2399-1/01",
              "4679-6/03",
              "4743-1/00"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Alcatrão",
            "ocupacao": "34",
            "cnaes": [
              "1910-1/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Asfalto, ceras, breu e piche",
            "ocupacao": "34",
            "cnaes": [
              "1922-5/02",
              "4681-8/01",
              "4681-8/05",
              "4732-6/00"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Beneficiamento de algodão",
            "ocupacao": "34",
            "cnaes": [
              "0112-1/01",
              "0163-6/00",
              "1311-1/00",
              "1312-0/00",
              "1321-9/00",
              "1322-7/00",
              "4623-1/03"
            ],
            "obs": "Encontrado(s) 7 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Borracha e pneus",
            "ocupacao": "34",
            "cnaes": [
              "2211-1/00",
              "2212-9/00",
              "2219-6/00",
              "2812-7/00",
              "3314-7/02",
              "4520-0/06",
              "4530-7/02",
              "4530-7/05"
            ],
            "obs": "Encontrado(s) 8 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Carvão",
            "ocupacao": "39",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Colchões",
            "ocupacao": "34",
            "cnaes": [
              "3104-7/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Estofamento de móveis",
            "ocupacao": "12",
            "cnaes": [
              "3104-7/00",
              "3250-7/02",
              "4110-7/00",
              "6435-2/01",
              "6470-1/01",
              "6470-1/03",
              "6612-6/01",
              "6612-6/02",
              "7490-1/04",
              "9529-1/05"
            ],
            "obs": "Encontrado(s) 10 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Extrusão de metals",
            "ocupacao": "34",
            "cnaes": [
              "0724-3/01",
              "0724-3/02",
              "2442-3/00",
              "2449-1/99",
              "2452-1/00",
              "2531-4/02",
              "2539-0/02",
              "2599-3/02"
            ],
            "obs": "Encontrado(s) 8 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Fundições",
            "ocupacao": "34",
            "cnaes": [
              "2451-2/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Madeira e cortiça",
            "ocupacao": "34",
            "cnaes": [
              "1610-2/03",
              "1610-2/04"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Produtos químicos",
            "ocupacao": "42",
            "cnaes": [
              "0891-6/00",
              "2019-3/99",
              "2029-1/00",
              "2099-1/01",
              "2099-1/99",
              "4684-2/99"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Serrarias",
            "ocupacao": "34",
            "cnaes": [
              "1610-2/03",
              "1610-2/04"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Termoelétrica",
            "ocupacao": "34",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Têxtil, calçados e decoração",
            "ocupacao": "34",
            "cnaes": [
              "1321-9/00",
              "1322-7/00",
              "1323-5/00",
              "1531-9/01",
              "1531-9/02",
              "1533-5/00",
              "1539-4/00",
              "1540-8/00",
              "2864-0/00",
              "3314-7/20",
              "4616-8/00",
              "4643-5/01",
              "4782-2/01",
              "9529-1/01"
            ],
            "obs": "Encontrado(s) 14 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Depósitos / Armazenamento e Instalações de Alto Risco",
    "niveis": [
      {
        "risco": "A",
        "descricao": "Risco Baixo",
        "exemplos": [
          {
            "termo": "Materiais de construção incombustíveis (cimento, areia, brita, tijolos, ferragens, lajes de concreto e similares)",
            "ocupacao": "36",
            "cnaes": [
              "4679-6/04",
              "4679-6/99",
              "4744-0/05",
              "4744-0/99"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-1",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Bebidas gaseificadas",
            "ocupacao": "37",
            "cnaes": [
              "1122-4/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Discos de vinil",
            "ocupacao": "37",
            "cnaes": [
              "4649-4/07",
              "4762-8/00",
              "7722-5/00"
            ],
            "obs": "Encontrado(s) 3 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Doces",
            "ocupacao": "37",
            "cnaes": [
              "1093-7/01",
              "1093-7/02",
              "4637-1/07",
              "4721-1/04"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Máquinas e equipamentos mecânicos e eletromecânicos",
            "ocupacao": "37",
            "cnaes": [
              "2825-9/00",
              "2829-1/99",
              "2833-0/00",
              "2851-8/00",
              "2852-6/00",
              "2854-2/00",
              "2862-3/00",
              "2863-1/00",
              "2864-0/00",
              "2865-8/00",
              "2866-6/00",
              "2869-1/00",
              "3314-7/10",
              "3314-7/11",
              "3314-7/14",
              "3314-7/15",
              "3314-7/17",
              "3314-7/19",
              "3314-7/20",
              "3314-7/99",
              "3321-0/00",
              "4663-0/00",
              "4665-6/00",
              "4669-9/99",
              "7731-4/00",
              "7732-2/01",
              "7733-1/00",
              "7739-0/01",
              "7739-0/99"
            ],
            "obs": "Encontrado(s) 29 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Comércio de fogos de artifício (classes A, B e C) com massa explosiva até 864 g/m³",
            "ocupacao": "41",
            "cnaes": [
              "4789-0/06"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "B-2",
        "descricao": "Risco Médio",
        "exemplos": [
          {
            "termo": "Arquivos públicos e privados",
            "ocupacao": "38",
            "cnaes": [
              "9101-5/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Alcatrão",
            "ocupacao": "34",
            "cnaes": [
              "1910-1/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Asfalto, breu e piche",
            "ocupacao": "38",
            "cnaes": [
              "0891-6/00",
              "2019-3/99",
              "2029-1/00",
              "2099-1/01",
              "2099-1/99",
              "4684-2/99"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Bebidas alcoólicas",
            "ocupacao": "38",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Centro de distribuição",
            "ocupacao": "38",
            "cnaes": [
              "5211-7/01",
              "5211-7/99"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Cereais e grãos",
            "ocupacao": "38",
            "cnaes": [
              "0111-3/99",
              "1072-4/02",
              "4632-0/01",
              "4632-0/03"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Colchões, tecidos",
            "ocupacao": "38",
            "cnaes": [
              "1330-8/00",
              "1340-5/01",
              "1340-5/02",
              "1340-5/99",
              "1354-5/00",
              "4641-9/01",
              "4649-4/04",
              "4754-7/02",
              "4755-5/01",
              "8640-2/14"
            ],
            "obs": "Encontrado(s) 10 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Couro e pele",
            "ocupacao": "38",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Gorduras e sebos",
            "ocupacao": "38",
            "cnaes": [
              "1041-4/00",
              "1042-2/00",
              "1043-1/00",
              "1064-3/00",
              "1922-5/02",
              "4637-1/03"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Látex, cola e borracha",
            "ocupacao": "38",
            "cnaes": [
              "0161-0/01",
              "2051-7/00",
              "2073-8/00",
              "2831-3/00",
              "2853-4/00",
              "3314-7/12",
              "3314-7/16",
              "4611-7/00",
              "4623-1/08",
              "4623-1/99",
              "4683-4/00",
              "4684-2/02",
              "7490-1/03",
              "7731-4/00"
            ],
            "obs": "Encontrado(s) 14 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Madeira, cortiça",
            "ocupacao": "38",
            "cnaes": [
              "0210-1/07",
              "0220-9/01",
              "1610-2/03",
              "1610-2/04",
              "1610-2/05",
              "1621-8/00",
              "1622-6/01",
              "1622-6/02",
              "1623-4/00",
              "1629-3/01",
              "3101-2/00",
              "3103-9/00",
              "4613-3/00",
              "4671-1/00",
              "4744-0/02"
            ],
            "obs": "Encontrado(s) 15 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Papel",
            "ocupacao": "38",
            "cnaes": [
              "2865-8/00",
              "3314-7/21",
              "4686-9/01",
              "4687-7/01",
              "4687-7/02"
            ],
            "obs": "Encontrado(s) 5 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Comércio de fogos de artifício (classes A, B e C) com massa explosiva acima de 864 g/m³",
            "ocupacao": "41",
            "cnaes": [
              "4789-0/06"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "C-1",
        "descricao": "Risco Alto",
        "exemplos": [
          {
            "termo": "Algodão",
            "ocupacao": "39",
            "cnaes": [
              "0112-1/01",
              "1311-1/00",
              "1312-0/00",
              "1321-9/00",
              "1322-7/00",
              "4623-1/03"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Carvão",
            "ocupacao": "39",
            "cnaes": null,
            "obs": "Encontrado(s) 0 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Graxas e ceras",
            "ocupacao": "39",
            "cnaes": [
              "0891-6/00",
              "1922-5/02",
              "2019-3/99",
              "2029-1/00",
              "2099-1/01",
              "2099-1/99",
              "4681-8/01",
              "4681-8/05",
              "4684-2/99",
              "4732-6/00"
            ],
            "obs": "Encontrado(s) 10 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Madeira",
            "ocupacao": "39",
            "cnaes": [
              "0210-1/07",
              "0220-9/01",
              "1610-2/03",
              "1610-2/04",
              "1610-2/05",
              "1621-8/00",
              "1622-6/01",
              "1622-6/02",
              "1623-4/00",
              "1629-3/01",
              "3101-2/00",
              "3103-9/00",
              "4613-3/00",
              "4671-1/00",
              "4744-0/02"
            ],
            "obs": "Encontrado(s) 15 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Comércio de fogos de artifício (classes A, B, C e D) com massa explosiva acima de 864 g/m³",
            "ocupacao": "41",
            "cnaes": [
              "4789-0/06"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Comércio de inflamáveis e combustíveis",
            "ocupacao": "40",
            "cnaes": [
              "0600-0/01",
              "0910-6/00",
              "1921-7/00",
              "1922-5/01",
              "1922-5/99",
              "1932-2/00",
              "2019-3/01",
              "2851-8/00",
              "2852-6/00",
              "3314-7/14",
              "3314-7/15",
              "3520-4/02",
              "4612-5/00",
              "4681-8/01",
              "4681-8/02",
              "4681-8/03",
              "4681-8/04",
              "4682-6/00",
              "4689-3/01",
              "4731-8/00",
              "4784-9/00",
              "7739-0/01"
            ],
            "obs": "Encontrado(s) 22 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Posto de combustíveis",
            "ocupacao": "40",
            "cnaes": [
              "4731-8/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Posto de lubrificantes",
            "ocupacao": "40",
            "cnaes": [
              "1922-5/02",
              "4681-8/01",
              "4681-8/05",
              "4732-6/00"
            ],
            "obs": "Encontrado(s) 4 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Posto de revenda de GLP",
            "ocupacao": "40",
            "cnaes": [
              "4682-6/00",
              "4784-9/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          }
        ]
      },
      {
        "risco": "C-2",
        "descricao": "Risco Alto",
        "exemplos": [
          {
            "termo": "Armas e munições",
            "ocupacao": "41",
            "cnaes": [
              "4789-0/09"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Destilarias",
            "ocupacao": "40",
            "cnaes": [
              "1111-9/02"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Depósitos de fogos de artifício",
            "ocupacao": "41",
            "cnaes": [
              "2092-4/02",
              "4789-0/06"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Materiais explosivos",
            "ocupacao": "41",
            "cnaes": [
              "2092-4/01"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Produtos combustíveis",
            "ocupacao": "40",
            "cnaes": [
              "0600-0/01",
              "0910-6/00",
              "1921-7/00",
              "1922-5/01",
              "1922-5/99",
              "1932-2/00",
              "2019-3/01",
              "2851-8/00",
              "2852-6/00",
              "3314-7/14",
              "3314-7/15",
              "3520-4/02",
              "4612-5/00",
              "4681-8/01",
              "4681-8/02",
              "4681-8/03",
              "4681-8/04",
              "4682-6/00",
              "4689-3/01",
              "4731-8/00",
              "4784-9/00",
              "7739-0/01"
            ],
            "obs": "Encontrado(s) 22 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Produtos corrosivos",
            "ocupacao": "42",
            "cnaes": [
              "0891-6/00",
              "2019-3/99",
              "2029-1/00",
              "2099-1/01",
              "2099-1/99",
              "4684-2/99"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Produtos inflamáveis",
            "ocupacao": "40",
            "cnaes": [
              "0600-0/01",
              "0910-6/00",
              "1921-7/00",
              "1922-5/01",
              "1922-5/99",
              "1932-2/00",
              "2019-3/01",
              "2851-8/00",
              "2852-6/00",
              "3314-7/14",
              "3314-7/15",
              "3520-4/02",
              "4612-5/00",
              "4681-8/01",
              "4681-8/02",
              "4681-8/03",
              "4681-8/04",
              "4682-6/00",
              "4689-3/01",
              "4731-8/00",
              "4784-9/00",
              "7739-0/01"
            ],
            "obs": "Encontrado(s) 22 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Produtos perigosos",
            "ocupacao": "42",
            "cnaes": [
              "0891-6/00",
              "2019-3/99",
              "2029-1/00",
              "2099-1/01",
              "2099-1/99",
              "4684-2/99"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Produtos químicos",
            "ocupacao": "42",
            "cnaes": [
              "0891-6/00",
              "2019-3/99",
              "2029-1/00",
              "2099-1/01",
              "2099-1/99",
              "4684-2/99"
            ],
            "obs": "Encontrado(s) 6 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Refinarias",
            "ocupacao": "40",
            "cnaes": [
              "1921-7/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  },
  {
    "grupo": "Especiais",
    "niveis": [
      {
        "risco": "C-1",
        "descricao": "Risco Alto",
        "exemplos": [
          {
            "termo": "Cadeias",
            "ocupacao": "50",
            "cnaes": [
              "8424-8/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Casa de detenção",
            "ocupacao": "50",
            "cnaes": [
              "8424-8/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Centros de reabilitação de menores",
            "ocupacao": "50",
            "cnaes": [
              "8730-1/99"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Quartéis com cadeia",
            "ocupacao": "50",
            "cnaes": [
              "2550-1/01",
              "3050-4/00"
            ],
            "obs": "Encontrado(s) 2 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Presídios",
            "ocupacao": "50",
            "cnaes": [
              "8424-8/00"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          },
          {
            "termo": "Reformatórios",
            "ocupacao": "50",
            "cnaes": [
              "8730-1/99"
            ],
            "obs": "Encontrado(s) 1 CNAE(s) correspondente(s)."
          }
        ]
      }
    ]
  }
];

export const DOUBTS = [
  {
    "id": 1,
    "title": "Ausência de CNPJ/CNAE em Residências Unifamiliares",
    "description": "Casas e residências unifamiliares (Risco Baixo A) raramente possuem CNPJ ou código CNAE. Como o sistema lidará com o fluxo de vistoria quando não houver CNPJ associado para consulta automática?"
  },
  {
    "id": 2,
    "title": "Classificação por Área e Volume Físico no Código CNAE",
    "description": "Algumas ocupações (como 'Comércio', 'Escolas') alteram seu nível de risco (A, B-1, B-2) estritamente pela área física útil construída (ex: limites de 200m², 750m² ou 1000m²). Como o CNAE isolado não carrega metadados de tamanho, o sistema deve cruzar dinamicamente a área informada no formulário ('form.area') para ajustar a classificação de risco sugerida."
  },
  {
    "id": 3,
    "title": "Hotéis, Pensões e Hospedagem com Cozinha Própria",
    "description": "Hotéis estão listados no Risco Médio (B-1), mas se tiverem 'cozinha própria', sobem para Risco Médio (B-2). A CNAE de hotel (5510-8/01) serve para ambos. Como o sistema fará essa distinção de forma automatizada? Será necessário um checkbox específico no formulário sobre a presença de instalações de cozinha central?"
  },
  {
    "id": 4,
    "title": "Comércio de Fogos de Artifício e Densidade de Massa Explosiva",
    "description": "O comércio de fogos de artifício muda de Risco Médio B-1 para Risco Médio B-2 (or mesmo Alto C-1/C-2) com base na massa explosiva total por metro cúbico (ex: limiar de 864 g/m³). Como a CNAE varejista de fogos (4789-0/06) é idêntica para ambos, precisaremos de campos de controle adicionais ou vistorias de campo para aferição presencial."
  },
  {
    "id": 5,
    "title": "Órgãos Públicos, Segurança e Forças Armadas",
    "description": "Quartéis, postos policiais, delegacias e repartições públicas usam CNAEs de administração pública ou defesa (ex: 8411-6/00, 8424-8/00). Contudo, instalações específicas como 'Centrais de polícia' ou 'Delegacias' sobem para B-2, e quartéis com carceragem sobem para Risco Alto C-1. É pragmático sugerir classificação padrão Baixo A e permitir ajuste manual do vistoriador?"
  },
  {
    "id": 6,
    "title": "Eventos e Pirotecnia Indoor vs. Outdoor",
    "description": "O uso de pirotecnia eleva qualquer show ou evento para Risco Alto C-1 (outdoor) ou Risco Alto C-2 (indoor). O CNAE de produção de eventos (ex: 9001-9/99) não explicita a presença de fogos. Será exigido um questionamento declaratório sobre espetáculo pirotécnico durante o cadastro do processo eventual?"
  }
];
