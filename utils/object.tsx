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
  gnomadg: number | null;
  gnomade: number | null;
  alldesc: string | null;
}

export interface Recommendation {
  id: string;
  text: string;
  id_patient: string;
  id_report: string;
}

export interface Conclusion {
  id: string;
  text: string;
  id_patient: string;
  id_report: string;
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
export interface SelectedVariant {
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
  gnomade: number | null;
  gnomadg: number | null;
  alldesc: string | null;
}

export interface VariantInterpretation {
  id: string | null;
  hgvs: string | "No Data";
  text: string | "No Interpretation";
  id_patient: string | "";
  id_report: string | "";
  id_varsample: string | "";
  gene: string | "";
  alldesc: string | "";
}

// types.ts

export interface ColocatedVariant {
  id?: string;
  allele_string?: string;
  start?: number;
  end?: number;
  strand?: number;
  seq_region_name?: string;
  phenotype_or_disease?: number;
  somatic?: number;
  clin_sig?: string[];
  clin_sig_allele?: string;
  frequencies?: {
    [allele: string]: {
      [population: string]: number;
    };
  };
  pubmed?: number[];
  var_synonyms?: {
    [source: string]: string[];
  };
}

export interface TranscriptConsequence {
  transcript_id?: string;
  gene_symbol?: string;
  gene_id?: string;
  consequence_terms?: string[];
  biotype?: string;
  hgvsc?: string;
  hgvsp?: string;
  impact?: string;
  cadd_phred?: number;
  cadd_raw?: number;
  conservation?: number;
  aa?: string;
  appris?: string;
  canonical?: number;
  ccds?: string;
  cdna_start?: number;
  cdna_end?: number;
  distance?: number;
  exon?: string;
  strand?: number;
  protein_id?: string;
  gene_symbol_source?: string;
  hgnc_id?: string;
  location?: string;
  mane_select?: string;
  refseq_transcript_ids?: string[];
  swissprot?: string[];
  trembl?: string[];
  tsl?: number | string;
  uniparc?: string[];
  uniprot_isoform?: string[];
  variant_allele?: string;
  polyphen_prediction?: string;
  polyphen_score?: number;
  sift_prediction?: string;
  sift_score?: number;
  // Add more fields as needed
}

export interface VariantData {
  id?: string;
  input?: string;
  allele_string?: string;
  most_severe_consequence?: string;
  assembly_name?: string;
  seq_region_name?: string;
  start?: number;
  end?: number;
  strand?: number;
  variant_class?: string;
  colocated_variants?: ColocatedVariant[];
  transcript_consequences?: TranscriptConsequence[];

  // Add more fields as needed
  // Additional fields based on common Ensembl VEP response
  hgvsc?: string; // HGVS coding DNA reference
  hgvsp?: string; // HGVS protein reference
  consequence_terms?: string[]; // List of consequence terms
  gene_id?: string; // Stable Ensembl gene ID
  gene_symbol?: string; // Gene symbol
  canonical?: number; // Indicates if the transcript is canonical (0 or 1)
  impact?: string; // Impact of the variant (e.g., HIGH, MODERATE)
  cadd_phred?: number; // CADD phred score
  cadd_raw?: number; // CADD raw score
  polyphen_score?: number; // PolyPhen score
  polyphen_prediction?: string; // PolyPhen prediction (e.g., benign)
  sift_score?: number; // SIFT score
  sift_prediction?: string; // SIFT prediction (e.g., tolerated)
  appris?: string; // APPRIS annotation
  domains?: Domain[]; // Protein domains affected
  hgvs_offset?: number; // HGVS offset for the variant
  gene_phenotype?: string; // Information about gene phenotype
  pubmed?: number[]; // List of PubMed references
  variant_allele?: string; // Alternate allele of the variant
}

// Supporting interface for `domains`
export interface Domain {
  db?: string; // Database name, e.g., Pfam
  name?: string; // Domain name
  start?: number; // Start position of the domain
  end?: number; // End position of the domain
}
