export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return true; // empty is allowed — required-ness is checked separately
  return /^09\d{9}$/.test(phone.trim());
}

export const PHONE_FORMAT_HINT = "Phone number must be 11 digits starting with 09 (e.g. 09171234567)";