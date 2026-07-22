import { USUARIOS_PERMITIDOS } from '../data/usuariosPermitidos.js';
import { verificarAcesso } from '../domain/validators/acessoValidator.js';

export const usuarioRepository = {
  obterUsuariosPermitidos() {
    return USUARIOS_PERMITIDOS;
  },
  validarAcesso(nomeGuerra, matricula, email) {
    return verificarAcesso(nomeGuerra, matricula, email);
  }
};
