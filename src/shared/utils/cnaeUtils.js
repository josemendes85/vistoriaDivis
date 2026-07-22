export function extrairCodigoCnae(cnaeStr) {
  if (!cnaeStr) return "";
  const match = cnaeStr.match(/^(\d{4}-?\d\/?\d{2})/);
  if (match) {
    let raw = match[1].replace(/\D/g, "");
    if (raw.length === 7) {
      return `${raw.substring(0, 4)}-${raw.substring(4, 5)}/${raw.substring(5, 7)}`;
    }
  }
  const digits = cnaeStr.replace(/\D/g, "");
  if (digits.length >= 7) {
    const raw = digits.substring(0, 7);
    return `${raw.substring(0, 4)}-${raw.substring(4, 5)}/${raw.substring(5, 7)}`;
  }
  return "";
}
