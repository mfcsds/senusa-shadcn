/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSelectedVariantInput = {
  id?: string | null,
  id_patient?: string | null,
  id_vcf?: string | null,
  id_report?: string | null,
  gene_id?: string | null,
  gene_symbol?: string | null,
  chrom?: string | null,
  pos?: string | null,
  id_var?: string | null,
  ref?: string | null,
  alt?: string | null,
  qual?: string | null,
  zigosity?: string | null,
  global_allele?: number | null,
  functional_impact?: string | null,
  acmg?: string | null,
  reviewer_class?: string | null,
  clinical_sign?: string | null,
  hgvs?: string | null,
  severe_consequence?: string | null,
  sift_score?: number | null,
  sift_prediction?: string | null,
  phenotypes?: string | null,
  rsID?: string | null,
};

export type ModelSelectedVariantConditionInput = {
  id_patient?: ModelStringInput | null,
  id_vcf?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
  gene_id?: ModelStringInput | null,
  gene_symbol?: ModelStringInput | null,
  chrom?: ModelStringInput | null,
  pos?: ModelStringInput | null,
  id_var?: ModelStringInput | null,
  ref?: ModelStringInput | null,
  alt?: ModelStringInput | null,
  qual?: ModelStringInput | null,
  zigosity?: ModelStringInput | null,
  global_allele?: ModelFloatInput | null,
  functional_impact?: ModelStringInput | null,
  acmg?: ModelStringInput | null,
  reviewer_class?: ModelStringInput | null,
  clinical_sign?: ModelStringInput | null,
  hgvs?: ModelStringInput | null,
  severe_consequence?: ModelStringInput | null,
  sift_score?: ModelFloatInput | null,
  sift_prediction?: ModelStringInput | null,
  phenotypes?: ModelStringInput | null,
  rsID?: ModelStringInput | null,
  and?: Array< ModelSelectedVariantConditionInput | null > | null,
  or?: Array< ModelSelectedVariantConditionInput | null > | null,
  not?: ModelSelectedVariantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type SelectedVariant = {
  __typename: "SelectedVariant",
  id: string,
  id_patient?: string | null,
  id_vcf?: string | null,
  id_report?: string | null,
  gene_id?: string | null,
  gene_symbol?: string | null,
  chrom?: string | null,
  pos?: string | null,
  id_var?: string | null,
  ref?: string | null,
  alt?: string | null,
  qual?: string | null,
  zigosity?: string | null,
  global_allele?: number | null,
  functional_impact?: string | null,
  acmg?: string | null,
  reviewer_class?: string | null,
  clinical_sign?: string | null,
  hgvs?: string | null,
  severe_consequence?: string | null,
  sift_score?: number | null,
  sift_prediction?: string | null,
  phenotypes?: string | null,
  rsID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSelectedVariantInput = {
  id: string,
  id_patient?: string | null,
  id_vcf?: string | null,
  id_report?: string | null,
  gene_id?: string | null,
  gene_symbol?: string | null,
  chrom?: string | null,
  pos?: string | null,
  id_var?: string | null,
  ref?: string | null,
  alt?: string | null,
  qual?: string | null,
  zigosity?: string | null,
  global_allele?: number | null,
  functional_impact?: string | null,
  acmg?: string | null,
  reviewer_class?: string | null,
  clinical_sign?: string | null,
  hgvs?: string | null,
  severe_consequence?: string | null,
  sift_score?: number | null,
  sift_prediction?: string | null,
  phenotypes?: string | null,
  rsID?: string | null,
};

export type DeleteSelectedVariantInput = {
  id: string,
};

export type CreateVcfdataInput = {
  id?: string | null,
  id_patient?: string | null,
  sample_date?: string | null,
  uploadAt?: string | null,
  pathfile?: string | null,
  genome_reference?: string | null,
};

export type ModelVcfdataConditionInput = {
  id_patient?: ModelStringInput | null,
  sample_date?: ModelStringInput | null,
  uploadAt?: ModelStringInput | null,
  pathfile?: ModelStringInput | null,
  genome_reference?: ModelStringInput | null,
  and?: Array< ModelVcfdataConditionInput | null > | null,
  or?: Array< ModelVcfdataConditionInput | null > | null,
  not?: ModelVcfdataConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Vcfdata = {
  __typename: "Vcfdata",
  id: string,
  id_patient?: string | null,
  sample_date?: string | null,
  uploadAt?: string | null,
  pathfile?: string | null,
  genome_reference?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateVcfdataInput = {
  id: string,
  id_patient?: string | null,
  sample_date?: string | null,
  uploadAt?: string | null,
  pathfile?: string | null,
  genome_reference?: string | null,
};

export type DeleteVcfdataInput = {
  id: string,
};

export type CreateVariantInput = {
  id?: string | null,
  chrom?: string | null,
  pos?: string | null,
  ref?: string | null,
  alt?: string | null,
  qual?: string | null,
  filter?: string | null,
  info?: string | null,
  hgvs?: string | null,
  id_var?: string | null,
  id_patient?: string | null,
  id_vcf?: string | null,
};

export type ModelVariantConditionInput = {
  chrom?: ModelStringInput | null,
  pos?: ModelStringInput | null,
  ref?: ModelStringInput | null,
  alt?: ModelStringInput | null,
  qual?: ModelStringInput | null,
  filter?: ModelStringInput | null,
  info?: ModelStringInput | null,
  hgvs?: ModelStringInput | null,
  id_var?: ModelStringInput | null,
  id_patient?: ModelStringInput | null,
  id_vcf?: ModelStringInput | null,
  and?: Array< ModelVariantConditionInput | null > | null,
  or?: Array< ModelVariantConditionInput | null > | null,
  not?: ModelVariantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Variant = {
  __typename: "Variant",
  id: string,
  chrom?: string | null,
  pos?: string | null,
  ref?: string | null,
  alt?: string | null,
  qual?: string | null,
  filter?: string | null,
  info?: string | null,
  hgvs?: string | null,
  id_var?: string | null,
  id_patient?: string | null,
  id_vcf?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateVariantInput = {
  id: string,
  chrom?: string | null,
  pos?: string | null,
  ref?: string | null,
  alt?: string | null,
  qual?: string | null,
  filter?: string | null,
  info?: string | null,
  hgvs?: string | null,
  id_var?: string | null,
  id_patient?: string | null,
  id_vcf?: string | null,
};

export type DeleteVariantInput = {
  id: string,
};

export type CreateGeneticsConselorInput = {
  id?: string | null,
  text?: string | null,
};

export type ModelGeneticsConselorConditionInput = {
  text?: ModelStringInput | null,
  and?: Array< ModelGeneticsConselorConditionInput | null > | null,
  or?: Array< ModelGeneticsConselorConditionInput | null > | null,
  not?: ModelGeneticsConselorConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type GeneticsConselor = {
  __typename: "GeneticsConselor",
  id: string,
  text?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateGeneticsConselorInput = {
  id: string,
  text?: string | null,
};

export type DeleteGeneticsConselorInput = {
  id: string,
};

export type CreatePhenotypeInput = {
  id?: string | null,
  PhenotypeCode?: string | null,
  Description?: string | null,
};

export type ModelPhenotypeConditionInput = {
  PhenotypeCode?: ModelStringInput | null,
  Description?: ModelStringInput | null,
  and?: Array< ModelPhenotypeConditionInput | null > | null,
  or?: Array< ModelPhenotypeConditionInput | null > | null,
  not?: ModelPhenotypeConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Phenotype = {
  __typename: "Phenotype",
  id: string,
  PhenotypeCode?: string | null,
  Description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePhenotypeInput = {
  id: string,
  PhenotypeCode?: string | null,
  Description?: string | null,
};

export type DeletePhenotypeInput = {
  id: string,
};

export type CreateConclusionInput = {
  id?: string | null,
  text?: string | null,
};

export type ModelConclusionConditionInput = {
  text?: ModelStringInput | null,
  and?: Array< ModelConclusionConditionInput | null > | null,
  or?: Array< ModelConclusionConditionInput | null > | null,
  not?: ModelConclusionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Conclusion = {
  __typename: "Conclusion",
  id: string,
  text?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateConclusionInput = {
  id: string,
  text?: string | null,
};

export type DeleteConclusionInput = {
  id: string,
};

export type CreateRecommendationInput = {
  id?: string | null,
  text?: string | null,
  variantreportID: string,
};

export type ModelRecommendationConditionInput = {
  text?: ModelStringInput | null,
  variantreportID?: ModelIDInput | null,
  and?: Array< ModelRecommendationConditionInput | null > | null,
  or?: Array< ModelRecommendationConditionInput | null > | null,
  not?: ModelRecommendationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Recommendation = {
  __typename: "Recommendation",
  id: string,
  text?: string | null,
  variantreportID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRecommendationInput = {
  id: string,
  text?: string | null,
  variantreportID?: string | null,
};

export type DeleteRecommendationInput = {
  id: string,
};

export type CreateVariantReportInput = {
  id?: string | null,
  status?: number | null,
  isApproved?: boolean | null,
  medical_history?: string | null,
  current_diagnosis?: string | null,
  institutionID?: string | null,
  createAt?: string | null,
  phenotype?: Array< string | null > | null,
  sample_collection?: string | null,
  idPatient?: string | null,
};

export type ModelVariantReportConditionInput = {
  status?: ModelIntInput | null,
  isApproved?: ModelBooleanInput | null,
  medical_history?: ModelStringInput | null,
  current_diagnosis?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  createAt?: ModelStringInput | null,
  phenotype?: ModelStringInput | null,
  sample_collection?: ModelStringInput | null,
  idPatient?: ModelStringInput | null,
  and?: Array< ModelVariantReportConditionInput | null > | null,
  or?: Array< ModelVariantReportConditionInput | null > | null,
  not?: ModelVariantReportConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type VariantReport = {
  __typename: "VariantReport",
  id: string,
  status?: number | null,
  isApproved?: boolean | null,
  medical_history?: string | null,
  current_diagnosis?: string | null,
  institutionID?: string | null,
  createAt?: string | null,
  phenotype?: Array< string | null > | null,
  sample_collection?: string | null,
  idPatient?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateVariantReportInput = {
  id: string,
  status?: number | null,
  isApproved?: boolean | null,
  medical_history?: string | null,
  current_diagnosis?: string | null,
  institutionID?: string | null,
  createAt?: string | null,
  phenotype?: Array< string | null > | null,
  sample_collection?: string | null,
  idPatient?: string | null,
};

export type DeleteVariantReportInput = {
  id: string,
};

export type CreatePatientDocumentsInput = {
  id?: string | null,
  name?: string | null,
  patientID: string,
  size?: number | null,
  link?: string | null,
};

export type ModelPatientDocumentsConditionInput = {
  name?: ModelStringInput | null,
  patientID?: ModelIDInput | null,
  size?: ModelIntInput | null,
  link?: ModelStringInput | null,
  and?: Array< ModelPatientDocumentsConditionInput | null > | null,
  or?: Array< ModelPatientDocumentsConditionInput | null > | null,
  not?: ModelPatientDocumentsConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type PatientDocuments = {
  __typename: "PatientDocuments",
  id: string,
  name?: string | null,
  patientID: string,
  size?: number | null,
  link?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePatientDocumentsInput = {
  id: string,
  name?: string | null,
  patientID?: string | null,
  size?: number | null,
  link?: string | null,
};

export type DeletePatientDocumentsInput = {
  id: string,
};

export type CreatePatientInput = {
  id?: string | null,
  name?: string | null,
  sex?: string | null,
  phone_number?: string | null,
  dob?: string | null,
  institutionID: string,
};

export type ModelPatientConditionInput = {
  name?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  and?: Array< ModelPatientConditionInput | null > | null,
  or?: Array< ModelPatientConditionInput | null > | null,
  not?: ModelPatientConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Patient = {
  __typename: "Patient",
  id: string,
  name?: string | null,
  sex?: string | null,
  phone_number?: string | null,
  dob?: string | null,
  institutionID: string,
  PatientDokuments?: ModelPatientDocumentsConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPatientDocumentsConnection = {
  __typename: "ModelPatientDocumentsConnection",
  items:  Array<PatientDocuments | null >,
  nextToken?: string | null,
};

export type UpdatePatientInput = {
  id: string,
  name?: string | null,
  sex?: string | null,
  phone_number?: string | null,
  dob?: string | null,
  institutionID?: string | null,
};

export type DeletePatientInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  role?: string | null,
  email?: string | null,
  category?: string | null,
  specialty?: string | null,
  institutionID: string,
  level?: number | null,
  status?: number | null,
  phone_number?: string | null,
};

export type ModelUserConditionInput = {
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  role?: ModelStringInput | null,
  email?: ModelStringInput | null,
  category?: ModelStringInput | null,
  specialty?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  level?: ModelIntInput | null,
  status?: ModelIntInput | null,
  phone_number?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  first_name?: string | null,
  last_name?: string | null,
  role?: string | null,
  email?: string | null,
  category?: string | null,
  specialty?: string | null,
  institutionID: string,
  level?: number | null,
  status?: number | null,
  phone_number?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  first_name?: string | null,
  last_name?: string | null,
  role?: string | null,
  email?: string | null,
  category?: string | null,
  specialty?: string | null,
  institutionID?: string | null,
  level?: number | null,
  status?: number | null,
  phone_number?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateInstitutionInput = {
  id?: string | null,
  name?: string | null,
  contactname?: string | null,
  address?: string | null,
  subscription_type?: string | null,
  email?: string | null,
  userQuotas?: number | null,
  currentUserQuota?: number | null,
  storageQuota?: number | null,
  registrationDate?: string | null,
  accountStatus?: boolean | null,
  contactphone?: string | null,
  dueDate?: string | null,
  currentStorageQuota?: number | null,
};

export type ModelInstitutionConditionInput = {
  name?: ModelStringInput | null,
  contactname?: ModelStringInput | null,
  address?: ModelStringInput | null,
  subscription_type?: ModelStringInput | null,
  email?: ModelStringInput | null,
  userQuotas?: ModelIntInput | null,
  currentUserQuota?: ModelIntInput | null,
  storageQuota?: ModelFloatInput | null,
  registrationDate?: ModelStringInput | null,
  accountStatus?: ModelBooleanInput | null,
  contactphone?: ModelStringInput | null,
  dueDate?: ModelStringInput | null,
  currentStorageQuota?: ModelFloatInput | null,
  and?: Array< ModelInstitutionConditionInput | null > | null,
  or?: Array< ModelInstitutionConditionInput | null > | null,
  not?: ModelInstitutionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type Institution = {
  __typename: "Institution",
  id: string,
  name?: string | null,
  contactname?: string | null,
  address?: string | null,
  subscription_type?: string | null,
  email?: string | null,
  Users?: ModelPatientConnection | null,
  Patients?: ModelPatientConnection | null,
  userQuotas?: number | null,
  currentUserQuota?: number | null,
  storageQuota?: number | null,
  registrationDate?: string | null,
  accountStatus?: boolean | null,
  VariantReports?: ModelPatientConnection | null,
  contactphone?: string | null,
  dueDate?: string | null,
  currentStorageQuota?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPatientConnection = {
  __typename: "ModelPatientConnection",
  items:  Array<Patient | null >,
  nextToken?: string | null,
};

export type UpdateInstitutionInput = {
  id: string,
  name?: string | null,
  contactname?: string | null,
  address?: string | null,
  subscription_type?: string | null,
  email?: string | null,
  userQuotas?: number | null,
  currentUserQuota?: number | null,
  storageQuota?: number | null,
  registrationDate?: string | null,
  accountStatus?: boolean | null,
  contactphone?: string | null,
  dueDate?: string | null,
  currentStorageQuota?: number | null,
};

export type DeleteInstitutionInput = {
  id: string,
};

export type ModelSelectedVariantFilterInput = {
  id?: ModelIDInput | null,
  id_patient?: ModelStringInput | null,
  id_vcf?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
  gene_id?: ModelStringInput | null,
  gene_symbol?: ModelStringInput | null,
  chrom?: ModelStringInput | null,
  pos?: ModelStringInput | null,
  id_var?: ModelStringInput | null,
  ref?: ModelStringInput | null,
  alt?: ModelStringInput | null,
  qual?: ModelStringInput | null,
  zigosity?: ModelStringInput | null,
  global_allele?: ModelFloatInput | null,
  functional_impact?: ModelStringInput | null,
  acmg?: ModelStringInput | null,
  reviewer_class?: ModelStringInput | null,
  clinical_sign?: ModelStringInput | null,
  hgvs?: ModelStringInput | null,
  severe_consequence?: ModelStringInput | null,
  sift_score?: ModelFloatInput | null,
  sift_prediction?: ModelStringInput | null,
  phenotypes?: ModelStringInput | null,
  rsID?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSelectedVariantFilterInput | null > | null,
  or?: Array< ModelSelectedVariantFilterInput | null > | null,
  not?: ModelSelectedVariantFilterInput | null,
};

export type ModelSelectedVariantConnection = {
  __typename: "ModelSelectedVariantConnection",
  items:  Array<SelectedVariant | null >,
  nextToken?: string | null,
};

export type ModelVcfdataFilterInput = {
  id?: ModelIDInput | null,
  id_patient?: ModelStringInput | null,
  sample_date?: ModelStringInput | null,
  uploadAt?: ModelStringInput | null,
  pathfile?: ModelStringInput | null,
  genome_reference?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVcfdataFilterInput | null > | null,
  or?: Array< ModelVcfdataFilterInput | null > | null,
  not?: ModelVcfdataFilterInput | null,
};

export type ModelVcfdataConnection = {
  __typename: "ModelVcfdataConnection",
  items:  Array<Vcfdata | null >,
  nextToken?: string | null,
};

export type ModelVariantFilterInput = {
  id?: ModelIDInput | null,
  chrom?: ModelStringInput | null,
  pos?: ModelStringInput | null,
  ref?: ModelStringInput | null,
  alt?: ModelStringInput | null,
  qual?: ModelStringInput | null,
  filter?: ModelStringInput | null,
  info?: ModelStringInput | null,
  hgvs?: ModelStringInput | null,
  id_var?: ModelStringInput | null,
  id_patient?: ModelStringInput | null,
  id_vcf?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVariantFilterInput | null > | null,
  or?: Array< ModelVariantFilterInput | null > | null,
  not?: ModelVariantFilterInput | null,
};

export type ModelVariantConnection = {
  __typename: "ModelVariantConnection",
  items:  Array<Variant | null >,
  nextToken?: string | null,
};

export type ModelGeneticsConselorFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGeneticsConselorFilterInput | null > | null,
  or?: Array< ModelGeneticsConselorFilterInput | null > | null,
  not?: ModelGeneticsConselorFilterInput | null,
};

export type ModelGeneticsConselorConnection = {
  __typename: "ModelGeneticsConselorConnection",
  items:  Array<GeneticsConselor | null >,
  nextToken?: string | null,
};

export type ModelPhenotypeFilterInput = {
  id?: ModelIDInput | null,
  PhenotypeCode?: ModelStringInput | null,
  Description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPhenotypeFilterInput | null > | null,
  or?: Array< ModelPhenotypeFilterInput | null > | null,
  not?: ModelPhenotypeFilterInput | null,
};

export type ModelPhenotypeConnection = {
  __typename: "ModelPhenotypeConnection",
  items:  Array<Phenotype | null >,
  nextToken?: string | null,
};

export type ModelConclusionFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelConclusionFilterInput | null > | null,
  or?: Array< ModelConclusionFilterInput | null > | null,
  not?: ModelConclusionFilterInput | null,
};

export type ModelConclusionConnection = {
  __typename: "ModelConclusionConnection",
  items:  Array<Conclusion | null >,
  nextToken?: string | null,
};

export type ModelRecommendationFilterInput = {
  id?: ModelIDInput | null,
  text?: ModelStringInput | null,
  variantreportID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRecommendationFilterInput | null > | null,
  or?: Array< ModelRecommendationFilterInput | null > | null,
  not?: ModelRecommendationFilterInput | null,
};

export type ModelRecommendationConnection = {
  __typename: "ModelRecommendationConnection",
  items:  Array<Recommendation | null >,
  nextToken?: string | null,
};

export type ModelVariantReportFilterInput = {
  id?: ModelIDInput | null,
  status?: ModelIntInput | null,
  isApproved?: ModelBooleanInput | null,
  medical_history?: ModelStringInput | null,
  current_diagnosis?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  createAt?: ModelStringInput | null,
  phenotype?: ModelStringInput | null,
  sample_collection?: ModelStringInput | null,
  idPatient?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVariantReportFilterInput | null > | null,
  or?: Array< ModelVariantReportFilterInput | null > | null,
  not?: ModelVariantReportFilterInput | null,
};

export type ModelVariantReportConnection = {
  __typename: "ModelVariantReportConnection",
  items:  Array<VariantReport | null >,
  nextToken?: string | null,
};

export type ModelPatientDocumentsFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  patientID?: ModelIDInput | null,
  size?: ModelIntInput | null,
  link?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPatientDocumentsFilterInput | null > | null,
  or?: Array< ModelPatientDocumentsFilterInput | null > | null,
  not?: ModelPatientDocumentsFilterInput | null,
};

export type ModelPatientFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPatientFilterInput | null > | null,
  or?: Array< ModelPatientFilterInput | null > | null,
  not?: ModelPatientFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  role?: ModelStringInput | null,
  email?: ModelStringInput | null,
  category?: ModelStringInput | null,
  specialty?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  level?: ModelIntInput | null,
  status?: ModelIntInput | null,
  phone_number?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelInstitutionFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  contactname?: ModelStringInput | null,
  address?: ModelStringInput | null,
  subscription_type?: ModelStringInput | null,
  email?: ModelStringInput | null,
  userQuotas?: ModelIntInput | null,
  currentUserQuota?: ModelIntInput | null,
  storageQuota?: ModelFloatInput | null,
  registrationDate?: ModelStringInput | null,
  accountStatus?: ModelBooleanInput | null,
  contactphone?: ModelStringInput | null,
  dueDate?: ModelStringInput | null,
  currentStorageQuota?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelInstitutionFilterInput | null > | null,
  or?: Array< ModelInstitutionFilterInput | null > | null,
  not?: ModelInstitutionFilterInput | null,
};

export type ModelInstitutionConnection = {
  __typename: "ModelInstitutionConnection",
  items:  Array<Institution | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionSelectedVariantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  id_vcf?: ModelSubscriptionStringInput | null,
  id_report?: ModelSubscriptionStringInput | null,
  gene_id?: ModelSubscriptionStringInput | null,
  gene_symbol?: ModelSubscriptionStringInput | null,
  chrom?: ModelSubscriptionStringInput | null,
  pos?: ModelSubscriptionStringInput | null,
  id_var?: ModelSubscriptionStringInput | null,
  ref?: ModelSubscriptionStringInput | null,
  alt?: ModelSubscriptionStringInput | null,
  qual?: ModelSubscriptionStringInput | null,
  zigosity?: ModelSubscriptionStringInput | null,
  global_allele?: ModelSubscriptionFloatInput | null,
  functional_impact?: ModelSubscriptionStringInput | null,
  acmg?: ModelSubscriptionStringInput | null,
  reviewer_class?: ModelSubscriptionStringInput | null,
  clinical_sign?: ModelSubscriptionStringInput | null,
  hgvs?: ModelSubscriptionStringInput | null,
  severe_consequence?: ModelSubscriptionStringInput | null,
  sift_score?: ModelSubscriptionFloatInput | null,
  sift_prediction?: ModelSubscriptionStringInput | null,
  phenotypes?: ModelSubscriptionStringInput | null,
  rsID?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSelectedVariantFilterInput | null > | null,
  or?: Array< ModelSubscriptionSelectedVariantFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionVcfdataFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  sample_date?: ModelSubscriptionStringInput | null,
  uploadAt?: ModelSubscriptionStringInput | null,
  pathfile?: ModelSubscriptionStringInput | null,
  genome_reference?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVcfdataFilterInput | null > | null,
  or?: Array< ModelSubscriptionVcfdataFilterInput | null > | null,
};

export type ModelSubscriptionVariantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  chrom?: ModelSubscriptionStringInput | null,
  pos?: ModelSubscriptionStringInput | null,
  ref?: ModelSubscriptionStringInput | null,
  alt?: ModelSubscriptionStringInput | null,
  qual?: ModelSubscriptionStringInput | null,
  filter?: ModelSubscriptionStringInput | null,
  info?: ModelSubscriptionStringInput | null,
  hgvs?: ModelSubscriptionStringInput | null,
  id_var?: ModelSubscriptionStringInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  id_vcf?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVariantFilterInput | null > | null,
  or?: Array< ModelSubscriptionVariantFilterInput | null > | null,
};

export type ModelSubscriptionGeneticsConselorFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  text?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGeneticsConselorFilterInput | null > | null,
  or?: Array< ModelSubscriptionGeneticsConselorFilterInput | null > | null,
};

export type ModelSubscriptionPhenotypeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  PhenotypeCode?: ModelSubscriptionStringInput | null,
  Description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPhenotypeFilterInput | null > | null,
  or?: Array< ModelSubscriptionPhenotypeFilterInput | null > | null,
};

export type ModelSubscriptionConclusionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  text?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConclusionFilterInput | null > | null,
  or?: Array< ModelSubscriptionConclusionFilterInput | null > | null,
};

export type ModelSubscriptionRecommendationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  text?: ModelSubscriptionStringInput | null,
  variantreportID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRecommendationFilterInput | null > | null,
  or?: Array< ModelSubscriptionRecommendationFilterInput | null > | null,
};

export type ModelSubscriptionVariantReportFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionIntInput | null,
  isApproved?: ModelSubscriptionBooleanInput | null,
  medical_history?: ModelSubscriptionStringInput | null,
  current_diagnosis?: ModelSubscriptionStringInput | null,
  institutionID?: ModelSubscriptionIDInput | null,
  createAt?: ModelSubscriptionStringInput | null,
  phenotype?: ModelSubscriptionStringInput | null,
  sample_collection?: ModelSubscriptionStringInput | null,
  idPatient?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVariantReportFilterInput | null > | null,
  or?: Array< ModelSubscriptionVariantReportFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionPatientDocumentsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  patientID?: ModelSubscriptionIDInput | null,
  size?: ModelSubscriptionIntInput | null,
  link?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPatientDocumentsFilterInput | null > | null,
  or?: Array< ModelSubscriptionPatientDocumentsFilterInput | null > | null,
};

export type ModelSubscriptionPatientFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  sex?: ModelSubscriptionStringInput | null,
  phone_number?: ModelSubscriptionStringInput | null,
  dob?: ModelSubscriptionStringInput | null,
  institutionID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPatientFilterInput | null > | null,
  or?: Array< ModelSubscriptionPatientFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  first_name?: ModelSubscriptionStringInput | null,
  last_name?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  specialty?: ModelSubscriptionStringInput | null,
  institutionID?: ModelSubscriptionIDInput | null,
  level?: ModelSubscriptionIntInput | null,
  status?: ModelSubscriptionIntInput | null,
  phone_number?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionInstitutionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  contactname?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  subscription_type?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  userQuotas?: ModelSubscriptionIntInput | null,
  currentUserQuota?: ModelSubscriptionIntInput | null,
  storageQuota?: ModelSubscriptionFloatInput | null,
  registrationDate?: ModelSubscriptionStringInput | null,
  accountStatus?: ModelSubscriptionBooleanInput | null,
  contactphone?: ModelSubscriptionStringInput | null,
  dueDate?: ModelSubscriptionStringInput | null,
  currentStorageQuota?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInstitutionFilterInput | null > | null,
  or?: Array< ModelSubscriptionInstitutionFilterInput | null > | null,
};

export type CreateSelectedVariantMutationVariables = {
  input: CreateSelectedVariantInput,
  condition?: ModelSelectedVariantConditionInput | null,
};

export type CreateSelectedVariantMutation = {
  createSelectedVariant?:  {
    __typename: "SelectedVariant",
    id: string,
    id_patient?: string | null,
    id_vcf?: string | null,
    id_report?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
    chrom?: string | null,
    pos?: string | null,
    id_var?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    zigosity?: string | null,
    global_allele?: number | null,
    functional_impact?: string | null,
    acmg?: string | null,
    reviewer_class?: string | null,
    clinical_sign?: string | null,
    hgvs?: string | null,
    severe_consequence?: string | null,
    sift_score?: number | null,
    sift_prediction?: string | null,
    phenotypes?: string | null,
    rsID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSelectedVariantMutationVariables = {
  input: UpdateSelectedVariantInput,
  condition?: ModelSelectedVariantConditionInput | null,
};

export type UpdateSelectedVariantMutation = {
  updateSelectedVariant?:  {
    __typename: "SelectedVariant",
    id: string,
    id_patient?: string | null,
    id_vcf?: string | null,
    id_report?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
    chrom?: string | null,
    pos?: string | null,
    id_var?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    zigosity?: string | null,
    global_allele?: number | null,
    functional_impact?: string | null,
    acmg?: string | null,
    reviewer_class?: string | null,
    clinical_sign?: string | null,
    hgvs?: string | null,
    severe_consequence?: string | null,
    sift_score?: number | null,
    sift_prediction?: string | null,
    phenotypes?: string | null,
    rsID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSelectedVariantMutationVariables = {
  input: DeleteSelectedVariantInput,
  condition?: ModelSelectedVariantConditionInput | null,
};

export type DeleteSelectedVariantMutation = {
  deleteSelectedVariant?:  {
    __typename: "SelectedVariant",
    id: string,
    id_patient?: string | null,
    id_vcf?: string | null,
    id_report?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
    chrom?: string | null,
    pos?: string | null,
    id_var?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    zigosity?: string | null,
    global_allele?: number | null,
    functional_impact?: string | null,
    acmg?: string | null,
    reviewer_class?: string | null,
    clinical_sign?: string | null,
    hgvs?: string | null,
    severe_consequence?: string | null,
    sift_score?: number | null,
    sift_prediction?: string | null,
    phenotypes?: string | null,
    rsID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVcfdataMutationVariables = {
  input: CreateVcfdataInput,
  condition?: ModelVcfdataConditionInput | null,
};

export type CreateVcfdataMutation = {
  createVcfdata?:  {
    __typename: "Vcfdata",
    id: string,
    id_patient?: string | null,
    sample_date?: string | null,
    uploadAt?: string | null,
    pathfile?: string | null,
    genome_reference?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVcfdataMutationVariables = {
  input: UpdateVcfdataInput,
  condition?: ModelVcfdataConditionInput | null,
};

export type UpdateVcfdataMutation = {
  updateVcfdata?:  {
    __typename: "Vcfdata",
    id: string,
    id_patient?: string | null,
    sample_date?: string | null,
    uploadAt?: string | null,
    pathfile?: string | null,
    genome_reference?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVcfdataMutationVariables = {
  input: DeleteVcfdataInput,
  condition?: ModelVcfdataConditionInput | null,
};

export type DeleteVcfdataMutation = {
  deleteVcfdata?:  {
    __typename: "Vcfdata",
    id: string,
    id_patient?: string | null,
    sample_date?: string | null,
    uploadAt?: string | null,
    pathfile?: string | null,
    genome_reference?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVariantMutationVariables = {
  input: CreateVariantInput,
  condition?: ModelVariantConditionInput | null,
};

export type CreateVariantMutation = {
  createVariant?:  {
    __typename: "Variant",
    id: string,
    chrom?: string | null,
    pos?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    filter?: string | null,
    info?: string | null,
    hgvs?: string | null,
    id_var?: string | null,
    id_patient?: string | null,
    id_vcf?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVariantMutationVariables = {
  input: UpdateVariantInput,
  condition?: ModelVariantConditionInput | null,
};

export type UpdateVariantMutation = {
  updateVariant?:  {
    __typename: "Variant",
    id: string,
    chrom?: string | null,
    pos?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    filter?: string | null,
    info?: string | null,
    hgvs?: string | null,
    id_var?: string | null,
    id_patient?: string | null,
    id_vcf?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVariantMutationVariables = {
  input: DeleteVariantInput,
  condition?: ModelVariantConditionInput | null,
};

export type DeleteVariantMutation = {
  deleteVariant?:  {
    __typename: "Variant",
    id: string,
    chrom?: string | null,
    pos?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    filter?: string | null,
    info?: string | null,
    hgvs?: string | null,
    id_var?: string | null,
    id_patient?: string | null,
    id_vcf?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGeneticsConselorMutationVariables = {
  input: CreateGeneticsConselorInput,
  condition?: ModelGeneticsConselorConditionInput | null,
};

export type CreateGeneticsConselorMutation = {
  createGeneticsConselor?:  {
    __typename: "GeneticsConselor",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGeneticsConselorMutationVariables = {
  input: UpdateGeneticsConselorInput,
  condition?: ModelGeneticsConselorConditionInput | null,
};

export type UpdateGeneticsConselorMutation = {
  updateGeneticsConselor?:  {
    __typename: "GeneticsConselor",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGeneticsConselorMutationVariables = {
  input: DeleteGeneticsConselorInput,
  condition?: ModelGeneticsConselorConditionInput | null,
};

export type DeleteGeneticsConselorMutation = {
  deleteGeneticsConselor?:  {
    __typename: "GeneticsConselor",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePhenotypeMutationVariables = {
  input: CreatePhenotypeInput,
  condition?: ModelPhenotypeConditionInput | null,
};

export type CreatePhenotypeMutation = {
  createPhenotype?:  {
    __typename: "Phenotype",
    id: string,
    PhenotypeCode?: string | null,
    Description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePhenotypeMutationVariables = {
  input: UpdatePhenotypeInput,
  condition?: ModelPhenotypeConditionInput | null,
};

export type UpdatePhenotypeMutation = {
  updatePhenotype?:  {
    __typename: "Phenotype",
    id: string,
    PhenotypeCode?: string | null,
    Description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePhenotypeMutationVariables = {
  input: DeletePhenotypeInput,
  condition?: ModelPhenotypeConditionInput | null,
};

export type DeletePhenotypeMutation = {
  deletePhenotype?:  {
    __typename: "Phenotype",
    id: string,
    PhenotypeCode?: string | null,
    Description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConclusionMutationVariables = {
  input: CreateConclusionInput,
  condition?: ModelConclusionConditionInput | null,
};

export type CreateConclusionMutation = {
  createConclusion?:  {
    __typename: "Conclusion",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateConclusionMutationVariables = {
  input: UpdateConclusionInput,
  condition?: ModelConclusionConditionInput | null,
};

export type UpdateConclusionMutation = {
  updateConclusion?:  {
    __typename: "Conclusion",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteConclusionMutationVariables = {
  input: DeleteConclusionInput,
  condition?: ModelConclusionConditionInput | null,
};

export type DeleteConclusionMutation = {
  deleteConclusion?:  {
    __typename: "Conclusion",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRecommendationMutationVariables = {
  input: CreateRecommendationInput,
  condition?: ModelRecommendationConditionInput | null,
};

export type CreateRecommendationMutation = {
  createRecommendation?:  {
    __typename: "Recommendation",
    id: string,
    text?: string | null,
    variantreportID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRecommendationMutationVariables = {
  input: UpdateRecommendationInput,
  condition?: ModelRecommendationConditionInput | null,
};

export type UpdateRecommendationMutation = {
  updateRecommendation?:  {
    __typename: "Recommendation",
    id: string,
    text?: string | null,
    variantreportID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRecommendationMutationVariables = {
  input: DeleteRecommendationInput,
  condition?: ModelRecommendationConditionInput | null,
};

export type DeleteRecommendationMutation = {
  deleteRecommendation?:  {
    __typename: "Recommendation",
    id: string,
    text?: string | null,
    variantreportID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVariantReportMutationVariables = {
  input: CreateVariantReportInput,
  condition?: ModelVariantReportConditionInput | null,
};

export type CreateVariantReportMutation = {
  createVariantReport?:  {
    __typename: "VariantReport",
    id: string,
    status?: number | null,
    isApproved?: boolean | null,
    medical_history?: string | null,
    current_diagnosis?: string | null,
    institutionID?: string | null,
    createAt?: string | null,
    phenotype?: Array< string | null > | null,
    sample_collection?: string | null,
    idPatient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVariantReportMutationVariables = {
  input: UpdateVariantReportInput,
  condition?: ModelVariantReportConditionInput | null,
};

export type UpdateVariantReportMutation = {
  updateVariantReport?:  {
    __typename: "VariantReport",
    id: string,
    status?: number | null,
    isApproved?: boolean | null,
    medical_history?: string | null,
    current_diagnosis?: string | null,
    institutionID?: string | null,
    createAt?: string | null,
    phenotype?: Array< string | null > | null,
    sample_collection?: string | null,
    idPatient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVariantReportMutationVariables = {
  input: DeleteVariantReportInput,
  condition?: ModelVariantReportConditionInput | null,
};

export type DeleteVariantReportMutation = {
  deleteVariantReport?:  {
    __typename: "VariantReport",
    id: string,
    status?: number | null,
    isApproved?: boolean | null,
    medical_history?: string | null,
    current_diagnosis?: string | null,
    institutionID?: string | null,
    createAt?: string | null,
    phenotype?: Array< string | null > | null,
    sample_collection?: string | null,
    idPatient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePatientDocumentsMutationVariables = {
  input: CreatePatientDocumentsInput,
  condition?: ModelPatientDocumentsConditionInput | null,
};

export type CreatePatientDocumentsMutation = {
  createPatientDocuments?:  {
    __typename: "PatientDocuments",
    id: string,
    name?: string | null,
    patientID: string,
    size?: number | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePatientDocumentsMutationVariables = {
  input: UpdatePatientDocumentsInput,
  condition?: ModelPatientDocumentsConditionInput | null,
};

export type UpdatePatientDocumentsMutation = {
  updatePatientDocuments?:  {
    __typename: "PatientDocuments",
    id: string,
    name?: string | null,
    patientID: string,
    size?: number | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePatientDocumentsMutationVariables = {
  input: DeletePatientDocumentsInput,
  condition?: ModelPatientDocumentsConditionInput | null,
};

export type DeletePatientDocumentsMutation = {
  deletePatientDocuments?:  {
    __typename: "PatientDocuments",
    id: string,
    name?: string | null,
    patientID: string,
    size?: number | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePatientMutationVariables = {
  input: CreatePatientInput,
  condition?: ModelPatientConditionInput | null,
};

export type CreatePatientMutation = {
  createPatient?:  {
    __typename: "Patient",
    id: string,
    name?: string | null,
    sex?: string | null,
    phone_number?: string | null,
    dob?: string | null,
    institutionID: string,
    PatientDokuments?:  {
      __typename: "ModelPatientDocumentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePatientMutationVariables = {
  input: UpdatePatientInput,
  condition?: ModelPatientConditionInput | null,
};

export type UpdatePatientMutation = {
  updatePatient?:  {
    __typename: "Patient",
    id: string,
    name?: string | null,
    sex?: string | null,
    phone_number?: string | null,
    dob?: string | null,
    institutionID: string,
    PatientDokuments?:  {
      __typename: "ModelPatientDocumentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePatientMutationVariables = {
  input: DeletePatientInput,
  condition?: ModelPatientConditionInput | null,
};

export type DeletePatientMutation = {
  deletePatient?:  {
    __typename: "Patient",
    id: string,
    name?: string | null,
    sex?: string | null,
    phone_number?: string | null,
    dob?: string | null,
    institutionID: string,
    PatientDokuments?:  {
      __typename: "ModelPatientDocumentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    first_name?: string | null,
    last_name?: string | null,
    role?: string | null,
    email?: string | null,
    category?: string | null,
    specialty?: string | null,
    institutionID: string,
    level?: number | null,
    status?: number | null,
    phone_number?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    first_name?: string | null,
    last_name?: string | null,
    role?: string | null,
    email?: string | null,
    category?: string | null,
    specialty?: string | null,
    institutionID: string,
    level?: number | null,
    status?: number | null,
    phone_number?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    first_name?: string | null,
    last_name?: string | null,
    role?: string | null,
    email?: string | null,
    category?: string | null,
    specialty?: string | null,
    institutionID: string,
    level?: number | null,
    status?: number | null,
    phone_number?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateInstitutionMutationVariables = {
  input: CreateInstitutionInput,
  condition?: ModelInstitutionConditionInput | null,
};

export type CreateInstitutionMutation = {
  createInstitution?:  {
    __typename: "Institution",
    id: string,
    name?: string | null,
    contactname?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: number | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    VariantReports?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    contactphone?: string | null,
    dueDate?: string | null,
    currentStorageQuota?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateInstitutionMutationVariables = {
  input: UpdateInstitutionInput,
  condition?: ModelInstitutionConditionInput | null,
};

export type UpdateInstitutionMutation = {
  updateInstitution?:  {
    __typename: "Institution",
    id: string,
    name?: string | null,
    contactname?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: number | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    VariantReports?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    contactphone?: string | null,
    dueDate?: string | null,
    currentStorageQuota?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteInstitutionMutationVariables = {
  input: DeleteInstitutionInput,
  condition?: ModelInstitutionConditionInput | null,
};

export type DeleteInstitutionMutation = {
  deleteInstitution?:  {
    __typename: "Institution",
    id: string,
    name?: string | null,
    contactname?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: number | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    VariantReports?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    contactphone?: string | null,
    dueDate?: string | null,
    currentStorageQuota?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetSelectedVariantQueryVariables = {
  id: string,
};

export type GetSelectedVariantQuery = {
  getSelectedVariant?:  {
    __typename: "SelectedVariant",
    id: string,
    id_patient?: string | null,
    id_vcf?: string | null,
    id_report?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
    chrom?: string | null,
    pos?: string | null,
    id_var?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    zigosity?: string | null,
    global_allele?: number | null,
    functional_impact?: string | null,
    acmg?: string | null,
    reviewer_class?: string | null,
    clinical_sign?: string | null,
    hgvs?: string | null,
    severe_consequence?: string | null,
    sift_score?: number | null,
    sift_prediction?: string | null,
    phenotypes?: string | null,
    rsID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSelectedVariantsQueryVariables = {
  filter?: ModelSelectedVariantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSelectedVariantsQuery = {
  listSelectedVariants?:  {
    __typename: "ModelSelectedVariantConnection",
    items:  Array< {
      __typename: "SelectedVariant",
      id: string,
      id_patient?: string | null,
      id_vcf?: string | null,
      id_report?: string | null,
      gene_id?: string | null,
      gene_symbol?: string | null,
      chrom?: string | null,
      pos?: string | null,
      id_var?: string | null,
      ref?: string | null,
      alt?: string | null,
      qual?: string | null,
      zigosity?: string | null,
      global_allele?: number | null,
      functional_impact?: string | null,
      acmg?: string | null,
      reviewer_class?: string | null,
      clinical_sign?: string | null,
      hgvs?: string | null,
      severe_consequence?: string | null,
      sift_score?: number | null,
      sift_prediction?: string | null,
      phenotypes?: string | null,
      rsID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVcfdataQueryVariables = {
  id: string,
};

export type GetVcfdataQuery = {
  getVcfdata?:  {
    __typename: "Vcfdata",
    id: string,
    id_patient?: string | null,
    sample_date?: string | null,
    uploadAt?: string | null,
    pathfile?: string | null,
    genome_reference?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVcfdataQueryVariables = {
  filter?: ModelVcfdataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVcfdataQuery = {
  listVcfdata?:  {
    __typename: "ModelVcfdataConnection",
    items:  Array< {
      __typename: "Vcfdata",
      id: string,
      id_patient?: string | null,
      sample_date?: string | null,
      uploadAt?: string | null,
      pathfile?: string | null,
      genome_reference?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVariantQueryVariables = {
  id: string,
};

export type GetVariantQuery = {
  getVariant?:  {
    __typename: "Variant",
    id: string,
    chrom?: string | null,
    pos?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    filter?: string | null,
    info?: string | null,
    hgvs?: string | null,
    id_var?: string | null,
    id_patient?: string | null,
    id_vcf?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVariantsQueryVariables = {
  filter?: ModelVariantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVariantsQuery = {
  listVariants?:  {
    __typename: "ModelVariantConnection",
    items:  Array< {
      __typename: "Variant",
      id: string,
      chrom?: string | null,
      pos?: string | null,
      ref?: string | null,
      alt?: string | null,
      qual?: string | null,
      filter?: string | null,
      info?: string | null,
      hgvs?: string | null,
      id_var?: string | null,
      id_patient?: string | null,
      id_vcf?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGeneticsConselorQueryVariables = {
  id: string,
};

export type GetGeneticsConselorQuery = {
  getGeneticsConselor?:  {
    __typename: "GeneticsConselor",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGeneticsConselorsQueryVariables = {
  filter?: ModelGeneticsConselorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGeneticsConselorsQuery = {
  listGeneticsConselors?:  {
    __typename: "ModelGeneticsConselorConnection",
    items:  Array< {
      __typename: "GeneticsConselor",
      id: string,
      text?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPhenotypeQueryVariables = {
  id: string,
};

export type GetPhenotypeQuery = {
  getPhenotype?:  {
    __typename: "Phenotype",
    id: string,
    PhenotypeCode?: string | null,
    Description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPhenotypesQueryVariables = {
  filter?: ModelPhenotypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhenotypesQuery = {
  listPhenotypes?:  {
    __typename: "ModelPhenotypeConnection",
    items:  Array< {
      __typename: "Phenotype",
      id: string,
      PhenotypeCode?: string | null,
      Description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetConclusionQueryVariables = {
  id: string,
};

export type GetConclusionQuery = {
  getConclusion?:  {
    __typename: "Conclusion",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListConclusionsQueryVariables = {
  filter?: ModelConclusionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConclusionsQuery = {
  listConclusions?:  {
    __typename: "ModelConclusionConnection",
    items:  Array< {
      __typename: "Conclusion",
      id: string,
      text?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRecommendationQueryVariables = {
  id: string,
};

export type GetRecommendationQuery = {
  getRecommendation?:  {
    __typename: "Recommendation",
    id: string,
    text?: string | null,
    variantreportID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRecommendationsQueryVariables = {
  filter?: ModelRecommendationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecommendationsQuery = {
  listRecommendations?:  {
    __typename: "ModelRecommendationConnection",
    items:  Array< {
      __typename: "Recommendation",
      id: string,
      text?: string | null,
      variantreportID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVariantReportQueryVariables = {
  id: string,
};

export type GetVariantReportQuery = {
  getVariantReport?:  {
    __typename: "VariantReport",
    id: string,
    status?: number | null,
    isApproved?: boolean | null,
    medical_history?: string | null,
    current_diagnosis?: string | null,
    institutionID?: string | null,
    createAt?: string | null,
    phenotype?: Array< string | null > | null,
    sample_collection?: string | null,
    idPatient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVariantReportsQueryVariables = {
  filter?: ModelVariantReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVariantReportsQuery = {
  listVariantReports?:  {
    __typename: "ModelVariantReportConnection",
    items:  Array< {
      __typename: "VariantReport",
      id: string,
      status?: number | null,
      isApproved?: boolean | null,
      medical_history?: string | null,
      current_diagnosis?: string | null,
      institutionID?: string | null,
      createAt?: string | null,
      phenotype?: Array< string | null > | null,
      sample_collection?: string | null,
      idPatient?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPatientDocumentsQueryVariables = {
  id: string,
};

export type GetPatientDocumentsQuery = {
  getPatientDocuments?:  {
    __typename: "PatientDocuments",
    id: string,
    name?: string | null,
    patientID: string,
    size?: number | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPatientDocumentsQueryVariables = {
  filter?: ModelPatientDocumentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPatientDocumentsQuery = {
  listPatientDocuments?:  {
    __typename: "ModelPatientDocumentsConnection",
    items:  Array< {
      __typename: "PatientDocuments",
      id: string,
      name?: string | null,
      patientID: string,
      size?: number | null,
      link?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPatientQueryVariables = {
  id: string,
};

export type GetPatientQuery = {
  getPatient?:  {
    __typename: "Patient",
    id: string,
    name?: string | null,
    sex?: string | null,
    phone_number?: string | null,
    dob?: string | null,
    institutionID: string,
    PatientDokuments?:  {
      __typename: "ModelPatientDocumentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPatientsQueryVariables = {
  filter?: ModelPatientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPatientsQuery = {
  listPatients?:  {
    __typename: "ModelPatientConnection",
    items:  Array< {
      __typename: "Patient",
      id: string,
      name?: string | null,
      sex?: string | null,
      phone_number?: string | null,
      dob?: string | null,
      institutionID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    first_name?: string | null,
    last_name?: string | null,
    role?: string | null,
    email?: string | null,
    category?: string | null,
    specialty?: string | null,
    institutionID: string,
    level?: number | null,
    status?: number | null,
    phone_number?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      first_name?: string | null,
      last_name?: string | null,
      role?: string | null,
      email?: string | null,
      category?: string | null,
      specialty?: string | null,
      institutionID: string,
      level?: number | null,
      status?: number | null,
      phone_number?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetInstitutionQueryVariables = {
  id: string,
};

export type GetInstitutionQuery = {
  getInstitution?:  {
    __typename: "Institution",
    id: string,
    name?: string | null,
    contactname?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: number | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    VariantReports?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    contactphone?: string | null,
    dueDate?: string | null,
    currentStorageQuota?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListInstitutionsQueryVariables = {
  filter?: ModelInstitutionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInstitutionsQuery = {
  listInstitutions?:  {
    __typename: "ModelInstitutionConnection",
    items:  Array< {
      __typename: "Institution",
      id: string,
      name?: string | null,
      contactname?: string | null,
      address?: string | null,
      subscription_type?: string | null,
      email?: string | null,
      userQuotas?: number | null,
      currentUserQuota?: number | null,
      storageQuota?: number | null,
      registrationDate?: string | null,
      accountStatus?: boolean | null,
      contactphone?: string | null,
      dueDate?: string | null,
      currentStorageQuota?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSelectedVariantSubscriptionVariables = {
  filter?: ModelSubscriptionSelectedVariantFilterInput | null,
};

export type OnCreateSelectedVariantSubscription = {
  onCreateSelectedVariant?:  {
    __typename: "SelectedVariant",
    id: string,
    id_patient?: string | null,
    id_vcf?: string | null,
    id_report?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
    chrom?: string | null,
    pos?: string | null,
    id_var?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    zigosity?: string | null,
    global_allele?: number | null,
    functional_impact?: string | null,
    acmg?: string | null,
    reviewer_class?: string | null,
    clinical_sign?: string | null,
    hgvs?: string | null,
    severe_consequence?: string | null,
    sift_score?: number | null,
    sift_prediction?: string | null,
    phenotypes?: string | null,
    rsID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSelectedVariantSubscriptionVariables = {
  filter?: ModelSubscriptionSelectedVariantFilterInput | null,
};

export type OnUpdateSelectedVariantSubscription = {
  onUpdateSelectedVariant?:  {
    __typename: "SelectedVariant",
    id: string,
    id_patient?: string | null,
    id_vcf?: string | null,
    id_report?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
    chrom?: string | null,
    pos?: string | null,
    id_var?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    zigosity?: string | null,
    global_allele?: number | null,
    functional_impact?: string | null,
    acmg?: string | null,
    reviewer_class?: string | null,
    clinical_sign?: string | null,
    hgvs?: string | null,
    severe_consequence?: string | null,
    sift_score?: number | null,
    sift_prediction?: string | null,
    phenotypes?: string | null,
    rsID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSelectedVariantSubscriptionVariables = {
  filter?: ModelSubscriptionSelectedVariantFilterInput | null,
};

export type OnDeleteSelectedVariantSubscription = {
  onDeleteSelectedVariant?:  {
    __typename: "SelectedVariant",
    id: string,
    id_patient?: string | null,
    id_vcf?: string | null,
    id_report?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
    chrom?: string | null,
    pos?: string | null,
    id_var?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    zigosity?: string | null,
    global_allele?: number | null,
    functional_impact?: string | null,
    acmg?: string | null,
    reviewer_class?: string | null,
    clinical_sign?: string | null,
    hgvs?: string | null,
    severe_consequence?: string | null,
    sift_score?: number | null,
    sift_prediction?: string | null,
    phenotypes?: string | null,
    rsID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVcfdataSubscriptionVariables = {
  filter?: ModelSubscriptionVcfdataFilterInput | null,
};

export type OnCreateVcfdataSubscription = {
  onCreateVcfdata?:  {
    __typename: "Vcfdata",
    id: string,
    id_patient?: string | null,
    sample_date?: string | null,
    uploadAt?: string | null,
    pathfile?: string | null,
    genome_reference?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVcfdataSubscriptionVariables = {
  filter?: ModelSubscriptionVcfdataFilterInput | null,
};

export type OnUpdateVcfdataSubscription = {
  onUpdateVcfdata?:  {
    __typename: "Vcfdata",
    id: string,
    id_patient?: string | null,
    sample_date?: string | null,
    uploadAt?: string | null,
    pathfile?: string | null,
    genome_reference?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVcfdataSubscriptionVariables = {
  filter?: ModelSubscriptionVcfdataFilterInput | null,
};

export type OnDeleteVcfdataSubscription = {
  onDeleteVcfdata?:  {
    __typename: "Vcfdata",
    id: string,
    id_patient?: string | null,
    sample_date?: string | null,
    uploadAt?: string | null,
    pathfile?: string | null,
    genome_reference?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVariantSubscriptionVariables = {
  filter?: ModelSubscriptionVariantFilterInput | null,
};

export type OnCreateVariantSubscription = {
  onCreateVariant?:  {
    __typename: "Variant",
    id: string,
    chrom?: string | null,
    pos?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    filter?: string | null,
    info?: string | null,
    hgvs?: string | null,
    id_var?: string | null,
    id_patient?: string | null,
    id_vcf?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVariantSubscriptionVariables = {
  filter?: ModelSubscriptionVariantFilterInput | null,
};

export type OnUpdateVariantSubscription = {
  onUpdateVariant?:  {
    __typename: "Variant",
    id: string,
    chrom?: string | null,
    pos?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    filter?: string | null,
    info?: string | null,
    hgvs?: string | null,
    id_var?: string | null,
    id_patient?: string | null,
    id_vcf?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVariantSubscriptionVariables = {
  filter?: ModelSubscriptionVariantFilterInput | null,
};

export type OnDeleteVariantSubscription = {
  onDeleteVariant?:  {
    __typename: "Variant",
    id: string,
    chrom?: string | null,
    pos?: string | null,
    ref?: string | null,
    alt?: string | null,
    qual?: string | null,
    filter?: string | null,
    info?: string | null,
    hgvs?: string | null,
    id_var?: string | null,
    id_patient?: string | null,
    id_vcf?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGeneticsConselorSubscriptionVariables = {
  filter?: ModelSubscriptionGeneticsConselorFilterInput | null,
};

export type OnCreateGeneticsConselorSubscription = {
  onCreateGeneticsConselor?:  {
    __typename: "GeneticsConselor",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGeneticsConselorSubscriptionVariables = {
  filter?: ModelSubscriptionGeneticsConselorFilterInput | null,
};

export type OnUpdateGeneticsConselorSubscription = {
  onUpdateGeneticsConselor?:  {
    __typename: "GeneticsConselor",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGeneticsConselorSubscriptionVariables = {
  filter?: ModelSubscriptionGeneticsConselorFilterInput | null,
};

export type OnDeleteGeneticsConselorSubscription = {
  onDeleteGeneticsConselor?:  {
    __typename: "GeneticsConselor",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePhenotypeSubscriptionVariables = {
  filter?: ModelSubscriptionPhenotypeFilterInput | null,
};

export type OnCreatePhenotypeSubscription = {
  onCreatePhenotype?:  {
    __typename: "Phenotype",
    id: string,
    PhenotypeCode?: string | null,
    Description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePhenotypeSubscriptionVariables = {
  filter?: ModelSubscriptionPhenotypeFilterInput | null,
};

export type OnUpdatePhenotypeSubscription = {
  onUpdatePhenotype?:  {
    __typename: "Phenotype",
    id: string,
    PhenotypeCode?: string | null,
    Description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePhenotypeSubscriptionVariables = {
  filter?: ModelSubscriptionPhenotypeFilterInput | null,
};

export type OnDeletePhenotypeSubscription = {
  onDeletePhenotype?:  {
    __typename: "Phenotype",
    id: string,
    PhenotypeCode?: string | null,
    Description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateConclusionSubscriptionVariables = {
  filter?: ModelSubscriptionConclusionFilterInput | null,
};

export type OnCreateConclusionSubscription = {
  onCreateConclusion?:  {
    __typename: "Conclusion",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateConclusionSubscriptionVariables = {
  filter?: ModelSubscriptionConclusionFilterInput | null,
};

export type OnUpdateConclusionSubscription = {
  onUpdateConclusion?:  {
    __typename: "Conclusion",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteConclusionSubscriptionVariables = {
  filter?: ModelSubscriptionConclusionFilterInput | null,
};

export type OnDeleteConclusionSubscription = {
  onDeleteConclusion?:  {
    __typename: "Conclusion",
    id: string,
    text?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRecommendationSubscriptionVariables = {
  filter?: ModelSubscriptionRecommendationFilterInput | null,
};

export type OnCreateRecommendationSubscription = {
  onCreateRecommendation?:  {
    __typename: "Recommendation",
    id: string,
    text?: string | null,
    variantreportID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRecommendationSubscriptionVariables = {
  filter?: ModelSubscriptionRecommendationFilterInput | null,
};

export type OnUpdateRecommendationSubscription = {
  onUpdateRecommendation?:  {
    __typename: "Recommendation",
    id: string,
    text?: string | null,
    variantreportID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRecommendationSubscriptionVariables = {
  filter?: ModelSubscriptionRecommendationFilterInput | null,
};

export type OnDeleteRecommendationSubscription = {
  onDeleteRecommendation?:  {
    __typename: "Recommendation",
    id: string,
    text?: string | null,
    variantreportID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVariantReportSubscriptionVariables = {
  filter?: ModelSubscriptionVariantReportFilterInput | null,
};

export type OnCreateVariantReportSubscription = {
  onCreateVariantReport?:  {
    __typename: "VariantReport",
    id: string,
    status?: number | null,
    isApproved?: boolean | null,
    medical_history?: string | null,
    current_diagnosis?: string | null,
    institutionID?: string | null,
    createAt?: string | null,
    phenotype?: Array< string | null > | null,
    sample_collection?: string | null,
    idPatient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVariantReportSubscriptionVariables = {
  filter?: ModelSubscriptionVariantReportFilterInput | null,
};

export type OnUpdateVariantReportSubscription = {
  onUpdateVariantReport?:  {
    __typename: "VariantReport",
    id: string,
    status?: number | null,
    isApproved?: boolean | null,
    medical_history?: string | null,
    current_diagnosis?: string | null,
    institutionID?: string | null,
    createAt?: string | null,
    phenotype?: Array< string | null > | null,
    sample_collection?: string | null,
    idPatient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVariantReportSubscriptionVariables = {
  filter?: ModelSubscriptionVariantReportFilterInput | null,
};

export type OnDeleteVariantReportSubscription = {
  onDeleteVariantReport?:  {
    __typename: "VariantReport",
    id: string,
    status?: number | null,
    isApproved?: boolean | null,
    medical_history?: string | null,
    current_diagnosis?: string | null,
    institutionID?: string | null,
    createAt?: string | null,
    phenotype?: Array< string | null > | null,
    sample_collection?: string | null,
    idPatient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePatientDocumentsSubscriptionVariables = {
  filter?: ModelSubscriptionPatientDocumentsFilterInput | null,
};

export type OnCreatePatientDocumentsSubscription = {
  onCreatePatientDocuments?:  {
    __typename: "PatientDocuments",
    id: string,
    name?: string | null,
    patientID: string,
    size?: number | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePatientDocumentsSubscriptionVariables = {
  filter?: ModelSubscriptionPatientDocumentsFilterInput | null,
};

export type OnUpdatePatientDocumentsSubscription = {
  onUpdatePatientDocuments?:  {
    __typename: "PatientDocuments",
    id: string,
    name?: string | null,
    patientID: string,
    size?: number | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePatientDocumentsSubscriptionVariables = {
  filter?: ModelSubscriptionPatientDocumentsFilterInput | null,
};

export type OnDeletePatientDocumentsSubscription = {
  onDeletePatientDocuments?:  {
    __typename: "PatientDocuments",
    id: string,
    name?: string | null,
    patientID: string,
    size?: number | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePatientSubscriptionVariables = {
  filter?: ModelSubscriptionPatientFilterInput | null,
};

export type OnCreatePatientSubscription = {
  onCreatePatient?:  {
    __typename: "Patient",
    id: string,
    name?: string | null,
    sex?: string | null,
    phone_number?: string | null,
    dob?: string | null,
    institutionID: string,
    PatientDokuments?:  {
      __typename: "ModelPatientDocumentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePatientSubscriptionVariables = {
  filter?: ModelSubscriptionPatientFilterInput | null,
};

export type OnUpdatePatientSubscription = {
  onUpdatePatient?:  {
    __typename: "Patient",
    id: string,
    name?: string | null,
    sex?: string | null,
    phone_number?: string | null,
    dob?: string | null,
    institutionID: string,
    PatientDokuments?:  {
      __typename: "ModelPatientDocumentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePatientSubscriptionVariables = {
  filter?: ModelSubscriptionPatientFilterInput | null,
};

export type OnDeletePatientSubscription = {
  onDeletePatient?:  {
    __typename: "Patient",
    id: string,
    name?: string | null,
    sex?: string | null,
    phone_number?: string | null,
    dob?: string | null,
    institutionID: string,
    PatientDokuments?:  {
      __typename: "ModelPatientDocumentsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    first_name?: string | null,
    last_name?: string | null,
    role?: string | null,
    email?: string | null,
    category?: string | null,
    specialty?: string | null,
    institutionID: string,
    level?: number | null,
    status?: number | null,
    phone_number?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    first_name?: string | null,
    last_name?: string | null,
    role?: string | null,
    email?: string | null,
    category?: string | null,
    specialty?: string | null,
    institutionID: string,
    level?: number | null,
    status?: number | null,
    phone_number?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    first_name?: string | null,
    last_name?: string | null,
    role?: string | null,
    email?: string | null,
    category?: string | null,
    specialty?: string | null,
    institutionID: string,
    level?: number | null,
    status?: number | null,
    phone_number?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateInstitutionSubscriptionVariables = {
  filter?: ModelSubscriptionInstitutionFilterInput | null,
};

export type OnCreateInstitutionSubscription = {
  onCreateInstitution?:  {
    __typename: "Institution",
    id: string,
    name?: string | null,
    contactname?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: number | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    VariantReports?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    contactphone?: string | null,
    dueDate?: string | null,
    currentStorageQuota?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInstitutionSubscriptionVariables = {
  filter?: ModelSubscriptionInstitutionFilterInput | null,
};

export type OnUpdateInstitutionSubscription = {
  onUpdateInstitution?:  {
    __typename: "Institution",
    id: string,
    name?: string | null,
    contactname?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: number | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    VariantReports?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    contactphone?: string | null,
    dueDate?: string | null,
    currentStorageQuota?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInstitutionSubscriptionVariables = {
  filter?: ModelSubscriptionInstitutionFilterInput | null,
};

export type OnDeleteInstitutionSubscription = {
  onDeleteInstitution?:  {
    __typename: "Institution",
    id: string,
    name?: string | null,
    contactname?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: number | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    VariantReports?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    contactphone?: string | null,
    dueDate?: string | null,
    currentStorageQuota?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
