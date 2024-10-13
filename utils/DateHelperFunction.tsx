import exp from "constants";

export function getDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function userStatus(counter: number) {
  if (counter == 1) {
    return "In verification";
  } else if (counter == 2) {
    return "Active";
  } else if (counter == 3) {
    return "Deactivated";
  }
}
export function ReportStatus(counter: number) {
  if (counter == 1) {
    return "Draft";
  } else if (counter == 2) {
    return "process";
  } else if (counter == 3) {
    return "Waiting for Approval";
  } else if (counter == 4) {
    return "Completed";
  }
}
export function ReportStatusStringToNumber(NewStatus: string) {
  if (NewStatus === "Draft") {
    return 1;
  } else if (NewStatus === "process") {
    return 2;
  } else if (NewStatus === "wait") {
    return 3;
  } else if (NewStatus === "complete") {
    return 4;
  }
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

export function getDateNext(counter: number) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + counter; // Months are 0-based, so adding 1
  const nextMonthDate = new Date(year, month, today.getDate());

  const nextYear = nextMonthDate.getFullYear();
  const nextMonth = String(nextMonthDate.getMonth() + 1).padStart(2, "0");
  const day = String(nextMonthDate.getDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${day}`;
}
