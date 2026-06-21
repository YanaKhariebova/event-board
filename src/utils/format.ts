// Wandelt "2026-06-24" in "24.06.2026" um
export function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}
