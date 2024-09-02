export function getDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDateNextMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are 0-based, so adding 1
  const nextMonthDate = new Date(year, month, today.getDate());

  const nextYear = nextMonthDate.getFullYear();
  const nextMonth = String(nextMonthDate.getMonth() + 1).padStart(2, "0");
  const day = String(nextMonthDate.getDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${day}`;
}
