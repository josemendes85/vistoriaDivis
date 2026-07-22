import { DADOS_SISTEMA_EVENTUAL, DADOS_SISTEMA_PERMANENTE, regrasInclusao } from '../data/dadosSistema/dadosSistema.js';

export const sistemaRepository = {
  obterDadosEventual() {
    return DADOS_SISTEMA_EVENTUAL;
  },
  obterDadosPermanente() {
    return DADOS_SISTEMA_PERMANENTE;
  },
  obterRegrasInclusao() {
    return regrasInclusao;
  }
};
