import { USUARIOS_PERMITIDOS } from '../../data/usuariosPermitidos.js';

/**
 * Validates if the given user credentials match any entry in the authorized list
 * @param {string} nomeGuerra 
 * @param {string} matricula 
 * @param {string} email 
 * @returns {boolean}
 */
export function verificarAcesso(nomeGuerra, matricula, email) {
  if (!nomeGuerra || !matricula || !email) return false;
  
  const cleanNome = nomeGuerra.trim().toUpperCase();
  const cleanMatricula = matricula.trim().replace(/\D/g, '');
  const cleanEmail = email.trim().toLowerCase();

  return USUARIOS_PERMITIDOS.some(user => {
    const userNome = user.nomeGuerra.trim().toUpperCase();
    const userMatricula = user.matricula.trim().replace(/\D/g, '');
    const userEmail = user.email.trim().toLowerCase();

    return userNome === cleanNome && userMatricula === cleanMatricula && userEmail === cleanEmail;
  });
}
