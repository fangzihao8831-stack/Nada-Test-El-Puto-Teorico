// Spanish NIF/NIE validation with checksum letter verification

const NIF_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

export function validateNIF(value: string): boolean {
  const cleaned = value.toUpperCase().trim();

  // NIF: 8 digits + 1 letter (e.g., 12345678Z)
  const nifMatch = cleaned.match(/^(\d{8})([A-Z])$/);
  if (nifMatch) {
    const number = parseInt(nifMatch[1], 10);
    const letter = nifMatch[2];
    return NIF_LETTERS[number % 23] === letter;
  }

  // NIE: X/Y/Z + 7 digits + 1 letter (e.g., X1234567L)
  const nieMatch = cleaned.match(/^([XYZ])(\d{7})([A-Z])$/);
  if (nieMatch) {
    const prefix = { X: "0", Y: "1", Z: "2" }[nieMatch[1]]!;
    const number = parseInt(prefix + nieMatch[2], 10);
    const letter = nieMatch[3];
    return NIF_LETTERS[number % 23] === letter;
  }

  return false;
}

export function formatNIF(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 9);
}
