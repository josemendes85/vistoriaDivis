export function validarGrauRisco(risco) {
  const riscosValidos = ['A', 'B-1', 'B-2', 'C-1', 'C-2'];
  return riscosValidos.includes(risco);
}
