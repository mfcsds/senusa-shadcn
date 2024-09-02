export function generatePatientID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let patientID = "P-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    patientID += characters[randomIndex];
  }

  return patientID;
}
export function generateReportID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let reportID = "R-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reportID += characters[randomIndex];
  }
  return reportID;
}

export function generateUserID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let reportID = "U-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    reportID += characters[randomIndex];
  }
  return reportID;
}

export function generateInstutionID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let institutionID = "U-";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    institutionID += characters[randomIndex];
  }
  return institutionID;
}
