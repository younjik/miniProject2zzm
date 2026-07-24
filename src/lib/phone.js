// 안심번호(050 등)는 자릿수가 12자리라 0000-0000-0000 형태로 묶어야 함
export function formatPhone(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  }
  return phone;
}
