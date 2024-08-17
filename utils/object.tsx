export interface VariantReportData {
  id: string;
  institutionID: string;
  userID: string;
  status: string;
  samplecollection: string;
  medical_diagnosis: string;
  phenotype: string;
  patient: Patient;
}

export interface Patient {
  id: string;
  sex: string;
  phone_number?: string;
  dob: string;
  institutionID?: string;
}

export interface DataUser {
  id: string;
  first_name: string;
  last_name: string;
  initial?: string;
  level: string;
  role: string;
  specialty: string;
  status: string;
  email?: string;
  phone_number?: string;
  password?: string;
}
