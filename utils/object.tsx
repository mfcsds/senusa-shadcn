export interface VariantReportData {
  id: string;
  status?: number;
  isApproved?: boolean;
  medical_history?: string;
  current_diagnosis?: string;
  userID?: string;
  institutionID?: string;
  createAt?: string;
  phenotype?: string[];
  sample_collection?: string;
  createdAt?: string; // These fields appear in the query but were not in the original model
  updatedAt?: string;
  variantReportPatientId?: string;
  __typename?: string; // This is automati
}

export interface Variant {
  id: string;
  id_vcf: string;
  id_patient: string;
  chrom: string;
  pos: string;
  id_var: string;
  ref: string;
  alt: string;
  qual: string;
  filter: string;
  info: string;
  hgvs: string;
  variantReportID: string;
  zygosity: string;
  globalallele: number | null;
  functional_impact: string;
  acmg: string;
  clinicalSign: string | null;
  severeconsequence: string | null;
  sift_score: number | null;
  sift_prediction: string | null;
  gene_symbol: string | null;
  gene_id: string | null;
  phenotypes: string | null;
  rsID: string | null;
}

export interface Recommendation {
  id: string;
  text: string;
  variantReportID: string;
}

export interface GeneticsConselor {
  id: string;
  text: string;
  variantReportID: string;
}

export interface Patient {
  id: string;
  sex: string;
  name: string;
  phone_number?: string;
  dob: string;
  institutionID?: string;
}

export interface DataUser {
  institutionID?: string | null;
  id: string;
  first_name: string;
  last_name: string;
  level: number;
  role: string;
  specialty: string;
  status: number;
  email: string;
  phone_number?: string;
}

export interface Institution {
  id: string | null;
  name?: string | null;
  contactname?: string | null;
  address?: string | null;
  subscription_type?: string | null;
  currentUserQuota: number;
  email?: string | null;
  userQuotas?: number;
  storageQuota?: number;
  registrationDate: string;
  updatedAt: string;
  contactphone?: string | null;
  dueDate?: string;
  accountStatus: boolean;
  currentStorageQuota: number;
}

export interface VcfData {
  id: string | null;
  id_patient: string | null;
  sample_date: string | null;
  uploadAt: string | null;
  pathfile: string | null;
  genome_reference: string | null;
}

export interface VariantRawData {
  chrom: string | null;
  pos: string | null;
  id: string | null;
  ref: string | null;
  alt: string | null;
  qual: string | null;
  info: string | null;
  filter: string | null;
}

// TypeScript Interface for SelectedVariant
interface SelectedVariant {
  id: string; // ID type is represented as string in TypeScript
  id_patient: string | null; // Nullable String field
  id_vcf: string | null;
  id_report: string | null;
  gene_id: string | null;
  gene_symbol: string | null;
  chrom: string | null;
  pos: string | null;
  id_var: string | null;
  ref: string | null;
  alt: string | null;
  qual: string | null;
  zigosity: string | null;
  global_allele: number | null; // Float type in TypeScript is represented as number
  functional_impact: string | null;
  acmg: string | null;
  reviewer_class: string | null;
  clinical_sign: string | null;
  hgvs: string | null;
  severe_consequence: string | null;
  sift_score: string | null;
  sift_prediction: string | null;
  phenotypes: string | null;
  rsID: string | null;
}
