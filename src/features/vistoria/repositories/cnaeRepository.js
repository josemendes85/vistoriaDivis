import { CNAES } from '../data/cnaes/cnaes.js';

export const cnaeRepository = {
  obterTodos() {
    return CNAES;
  },
  buscarPorCodigo(codigo) {
    return CNAES.find(c => c.code === codigo);
  },
  filtrarPorTermo(termo) {
    if (!termo) return CNAES;
    const clean = termo.toLowerCase();
    return CNAES.filter(c => c.code.toLowerCase().includes(clean) || c.description.toLowerCase().includes(clean));
  }
};
