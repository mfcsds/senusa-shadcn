/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserNotificationsInput = {
  id?: string | null,
  user_id?: string | null,
  institutionID?: string | null,
  message?: string | null,
  id_fromuser?: string | null,
  id_report?: string | null,
  markasread?: boolean | null,
  id_patient?: string | null,
};

export type ModelUserNotificationsConditionInput = {
  user_id?: ModelStringInput | null,
  institutionID?: ModelStringInput | null,
  message?: ModelStringInput | null,
  id_fromuser?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
  markasread?: ModelBooleanInput | null,
  id_patient?: ModelStringInput | null,
  and?: Array< ModelUserNotificationsConditionInput | null > | null,
  or?: Array< ModelUserNotificationsConditionInput | null > | null,
  not?: ModelUserNotificationsConditionInput | null,
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

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UserNotifications = {
  __typename: "UserNotifications",
  id: string,
  user_id?: string | null,
  institutionID?: string | null,
  message?: string | null,
  id_fromuser?: string | null,
  id_report?: string | null,
  markasread?: boolean | null,
  id_patient?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserNotificationsInput = {
  id: string,
  user_id?: string | null,
  institutionID?: string | null,
  message?: string | null,
  id_fromuser?: string | null,
  id_report?: string | null,
  markasread?: boolean | null,
  id_patient?: string | null,
};

export type DeleteUserNotificationsInput = {
  id: string,
};

export type CreatePatientHistoryDiseaseInput = {
  id?: string | null,
  id_patient?: string | null,
  hpo_code?: string | null,
  hpo_desc?: string | null,
};

export type ModelPatientHistoryDiseaseConditionInput = {
  id_patient?: ModelStringInput | null,
  hpo_code?: ModelStringInput | null,
  hpo_desc?: ModelStringInput | null,
  and?: Array< ModelPatientHistoryDiseaseConditionInput | null > | null,
  or?: Array< ModelPatientHistoryDiseaseConditionInput | null > | null,
  not?: ModelPatientHistoryDiseaseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type PatientHistoryDisease = {
  __typename: "PatientHistoryDisease",
  id: string,
  id_patient?: string | null,
  hpo_code?: string | null,
  hpo_desc?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePatientHistoryDiseaseInput = {
  id: string,
  id_patient?: string | null,
  hpo_code?: string | null,
  hpo_desc?: string | null,
};

export type DeletePatientHistoryDiseaseInput = {
  id: string,
};

export type CreateAcmgAnnotationInput = {
  id?: string | null,
  id_variant?: string | null,
  PVS1?: boolean | null,
  PS1?: boolean | null,
  PS2?: boolean | null,
  PS3?: boolean | null,
  PS4?: boolean | null,
  PP1_Strong?: boolean | null,
  PM1?: boolean | null,
  PM2?: boolean | null,
  PM3?: boolean | null,
  PM4?: boolean | null,
  PM5?: boolean | null,
  PM6?: boolean | null,
  PP1_Moderate?: boolean | null,
  PP1_Cosegregation?: boolean | null,
  PP2?: boolean | null,
  PP3?: boolean | null,
  PP4?: boolean | null,
  PP5?: boolean | null,
  BP1?: boolean | null,
  BP2?: boolean | null,
  BP3?: boolean | null,
  BP4?: boolean | null,
  BP5?: boolean | null,
  BP6?: boolean | null,
  BP7?: boolean | null,
  BS1?: boolean | null,
  BS2?: boolean | null,
  BS3?: boolean | null,
  BS4?: boolean | null,
  BA1?: boolean | null,
  acmg_class?: string | null,
};

export type ModelAcmgAnnotationConditionInput = {
  id_variant?: ModelStringInput | null,
  PVS1?: ModelBooleanInput | null,
  PS1?: ModelBooleanInput | null,
  PS2?: ModelBooleanInput | null,
  PS3?: ModelBooleanInput | null,
  PS4?: ModelBooleanInput | null,
  PP1_Strong?: ModelBooleanInput | null,
  PM1?: ModelBooleanInput | null,
  PM2?: ModelBooleanInput | null,
  PM3?: ModelBooleanInput | null,
  PM4?: ModelBooleanInput | null,
  PM5?: ModelBooleanInput | null,
  PM6?: ModelBooleanInput | null,
  PP1_Moderate?: ModelBooleanInput | null,
  PP1_Cosegregation?: ModelBooleanInput | null,
  PP2?: ModelBooleanInput | null,
  PP3?: ModelBooleanInput | null,
  PP4?: ModelBooleanInput | null,
  PP5?: ModelBooleanInput | null,
  BP1?: ModelBooleanInput | null,
  BP2?: ModelBooleanInput | null,
  BP3?: ModelBooleanInput | null,
  BP4?: ModelBooleanInput | null,
  BP5?: ModelBooleanInput | null,
  BP6?: ModelBooleanInput | null,
  BP7?: ModelBooleanInput | null,
  BS1?: ModelBooleanInput | null,
  BS2?: ModelBooleanInput | null,
  BS3?: ModelBooleanInput | null,
  BS4?: ModelBooleanInput | null,
  BA1?: ModelBooleanInput | null,
  acmg_class?: ModelStringInput | null,
  and?: Array< ModelAcmgAnnotationConditionInput | null > | null,
  or?: Array< ModelAcmgAnnotationConditionInput | null > | null,
  not?: ModelAcmgAnnotationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type AcmgAnnotation = {
  __typename: "AcmgAnnotation",
  id: string,
  id_variant?: string | null,
  PVS1?: boolean | null,
  PS1?: boolean | null,
  PS2?: boolean | null,
  PS3?: boolean | null,
  PS4?: boolean | null,
  PP1_Strong?: boolean | null,
  PM1?: boolean | null,
  PM2?: boolean | null,
  PM3?: boolean | null,
  PM4?: boolean | null,
  PM5?: boolean | null,
  PM6?: boolean | null,
  PP1_Moderate?: boolean | null,
  PP1_Cosegregation?: boolean | null,
  PP2?: boolean | null,
  PP3?: boolean | null,
  PP4?: boolean | null,
  PP5?: boolean | null,
  BP1?: boolean | null,
  BP2?: boolean | null,
  BP3?: boolean | null,
  BP4?: boolean | null,
  BP5?: boolean | null,
  BP6?: boolean | null,
  BP7?: boolean | null,
  BS1?: boolean | null,
  BS2?: boolean | null,
  BS3?: boolean | null,
  BS4?: boolean | null,
  BA1?: boolean | null,
  acmg_class?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAcmgAnnotationInput = {
  id: string,
  id_variant?: string | null,
  PVS1?: boolean | null,
  PS1?: boolean | null,
  PS2?: boolean | null,
  PS3?: boolean | null,
  PS4?: boolean | null,
  PP1_Strong?: boolean | null,
  PM1?: boolean | null,
  PM2?: boolean | null,
  PM3?: boolean | null,
  PM4?: boolean | null,
  PM5?: boolean | null,
  PM6?: boolean | null,
  PP1_Moderate?: boolean | null,
  PP1_Cosegregation?: boolean | null,
  PP2?: boolean | null,
  PP3?: boolean | null,
  PP4?: boolean | null,
  PP5?: boolean | null,
  BP1?: boolean | null,
  BP2?: boolean | null,
  BP3?: boolean | null,
  BP4?: boolean | null,
  BP5?: boolean | null,
  BP6?: boolean | null,
  BP7?: boolean | null,
  BS1?: boolean | null,
  BS2?: boolean | null,
  BS3?: boolean | null,
  BS4?: boolean | null,
  BA1?: boolean | null,
  acmg_class?: string | null,
};

export type DeleteAcmgAnnotationInput = {
  id: string,
};

export type CreateFamilyHistoryDiseaseInput = {
  id?: string | null,
  id_patient?: string | null,
  hpo_code?: string | null,
  hpo_desc?: string | null,
};

export type ModelFamilyHistoryDiseaseConditionInput = {
  id_patient?: ModelStringInput | null,
  hpo_code?: ModelStringInput | null,
  hpo_desc?: ModelStringInput | null,
  and?: Array< ModelFamilyHistoryDiseaseConditionInput | null > | null,
  or?: Array< ModelFamilyHistoryDiseaseConditionInput | null > | null,
  not?: ModelFamilyHistoryDiseaseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type FamilyHistoryDisease = {
  __typename: "FamilyHistoryDisease",
  id: string,
  id_patient?: string | null,
  hpo_code?: string | null,
  hpo_desc?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFamilyHistoryDiseaseInput = {
  id: string,
  id_patient?: string | null,
  hpo_code?: string | null,
  hpo_desc?: string | null,
};

export type DeleteFamilyHistoryDiseaseInput = {
  id: string,
};

export type CreateVariantInterpretationInput = {
  id?: string | null,
  hgvs?: string | null,
  text?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
  id_varsample?: string | null,
  alldesc?: string | null,
  gene_symbol?: string | null,
  gene_id?: string | null,
};

export type ModelVariantInterpretationConditionInput = {
  hgvs?: ModelStringInput | null,
  text?: ModelStringInput | null,
  id_patient?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
  id_varsample?: ModelStringInput | null,
  alldesc?: ModelStringInput | null,
  gene_symbol?: ModelStringInput | null,
  gene_id?: ModelStringInput | null,
  and?: Array< ModelVariantInterpretationConditionInput | null > | null,
  or?: Array< ModelVariantInterpretationConditionInput | null > | null,
  not?: ModelVariantInterpretationConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type VariantInterpretation = {
  __typename: "VariantInterpretation",
  id: string,
  hgvs?: string | null,
  text?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
  id_varsample?: string | null,
  alldesc?: string | null,
  gene_symbol?: string | null,
  gene_id?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateVariantInterpretationInput = {
  id: string,
  hgvs?: string | null,
  text?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
  id_varsample?: string | null,
  alldesc?: string | null,
  gene_symbol?: string | null,
  gene_id?: string | null,
};

export type DeleteVariantInterpretationInput = {
  id: string,
};

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
  gnomade?: number | null,
  gnomadg?: number | null,
  alldesc?: string | null,
  ac?: number | null,
  af?: number | null,
  an?: number | null,
  dp?: number | null,
  fs?: number | null,
  mq?: number | null,
  mqranksum?: number | null,
  qd?: number | null,
  readposrank?: number | null,
  sor?: number | null,
  fraction?: number | null,
  zygosity?: string | null,
  text_interpretation?: string | null,
  id_variant?: string | null,
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
  gnomade?: ModelFloatInput | null,
  gnomadg?: ModelFloatInput | null,
  alldesc?: ModelStringInput | null,
  ac?: ModelFloatInput | null,
  af?: ModelFloatInput | null,
  an?: ModelFloatInput | null,
  dp?: ModelFloatInput | null,
  fs?: ModelFloatInput | null,
  mq?: ModelFloatInput | null,
  mqranksum?: ModelFloatInput | null,
  qd?: ModelFloatInput | null,
  readposrank?: ModelFloatInput | null,
  sor?: ModelFloatInput | null,
  fraction?: ModelFloatInput | null,
  zygosity?: ModelStringInput | null,
  text_interpretation?: ModelStringInput | null,
  id_variant?: ModelStringInput | null,
  and?: Array< ModelSelectedVariantConditionInput | null > | null,
  or?: Array< ModelSelectedVariantConditionInput | null > | null,
  not?: ModelSelectedVariantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
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
  gnomade?: number | null,
  gnomadg?: number | null,
  alldesc?: string | null,
  ac?: number | null,
  af?: number | null,
  an?: number | null,
  dp?: number | null,
  fs?: number | null,
  mq?: number | null,
  mqranksum?: number | null,
  qd?: number | null,
  readposrank?: number | null,
  sor?: number | null,
  fraction?: number | null,
  zygosity?: string | null,
  text_interpretation?: string | null,
  id_variant?: string | null,
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
  gnomade?: number | null,
  gnomadg?: number | null,
  alldesc?: string | null,
  ac?: number | null,
  af?: number | null,
  an?: number | null,
  dp?: number | null,
  fs?: number | null,
  mq?: number | null,
  mqranksum?: number | null,
  qd?: number | null,
  readposrank?: number | null,
  sor?: number | null,
  fraction?: number | null,
  zygosity?: string | null,
  text_interpretation?: string | null,
  id_variant?: string | null,
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
  number_variant?: number | null,
};

export type ModelVcfdataConditionInput = {
  id_patient?: ModelStringInput | null,
  sample_date?: ModelStringInput | null,
  uploadAt?: ModelStringInput | null,
  pathfile?: ModelStringInput | null,
  genome_reference?: ModelStringInput | null,
  number_variant?: ModelIntInput | null,
  and?: Array< ModelVcfdataConditionInput | null > | null,
  or?: Array< ModelVcfdataConditionInput | null > | null,
  not?: ModelVcfdataConditionInput | null,
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

export type Vcfdata = {
  __typename: "Vcfdata",
  id: string,
  id_patient?: string | null,
  sample_date?: string | null,
  uploadAt?: string | null,
  pathfile?: string | null,
  genome_reference?: string | null,
  number_variant?: number | null,
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
  number_variant?: number | null,
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
  acmg?: string | null,
  ac?: number | null,
  af?: number | null,
  an?: number | null,
  dp?: number | null,
  fs?: number | null,
  mq?: number | null,
  mqranksum?: number | null,
  qd?: number | null,
  readposrank?: number | null,
  sor?: number | null,
  fraction?: number | null,
  zygosity?: string | null,
  gene_id?: string | null,
  gene_symbol?: string | null,
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
  acmg?: ModelStringInput | null,
  ac?: ModelFloatInput | null,
  af?: ModelFloatInput | null,
  an?: ModelFloatInput | null,
  dp?: ModelFloatInput | null,
  fs?: ModelFloatInput | null,
  mq?: ModelFloatInput | null,
  mqranksum?: ModelFloatInput | null,
  qd?: ModelFloatInput | null,
  readposrank?: ModelFloatInput | null,
  sor?: ModelFloatInput | null,
  fraction?: ModelFloatInput | null,
  zygosity?: ModelStringInput | null,
  gene_id?: ModelStringInput | null,
  gene_symbol?: ModelStringInput | null,
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
  acmg?: string | null,
  ac?: number | null,
  af?: number | null,
  an?: number | null,
  dp?: number | null,
  fs?: number | null,
  mq?: number | null,
  mqranksum?: number | null,
  qd?: number | null,
  readposrank?: number | null,
  sor?: number | null,
  fraction?: number | null,
  zygosity?: string | null,
  gene_id?: string | null,
  gene_symbol?: string | null,
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
  acmg?: string | null,
  ac?: number | null,
  af?: number | null,
  an?: number | null,
  dp?: number | null,
  fs?: number | null,
  mq?: number | null,
  mqranksum?: number | null,
  qd?: number | null,
  readposrank?: number | null,
  sor?: number | null,
  fraction?: number | null,
  zygosity?: string | null,
  gene_id?: string | null,
  gene_symbol?: string | null,
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
  id_patient?: string | null,
  id_report?: string | null,
};

export type ModelConclusionConditionInput = {
  text?: ModelStringInput | null,
  id_patient?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
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
  id_patient?: string | null,
  id_report?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateConclusionInput = {
  id: string,
  text?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
};

export type DeleteConclusionInput = {
  id: string,
};

export type CreateRecommendationInput = {
  id?: string | null,
  text?: string | null,
  id_patient: string,
  id_report?: string | null,
};

export type ModelRecommendationConditionInput = {
  text?: ModelStringInput | null,
  id_patient?: ModelIDInput | null,
  id_report?: ModelStringInput | null,
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
  id_patient: string,
  id_report?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRecommendationInput = {
  id: string,
  text?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
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
  testing_description?: string | null,
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
  testing_description?: ModelStringInput | null,
  and?: Array< ModelVariantReportConditionInput | null > | null,
  or?: Array< ModelVariantReportConditionInput | null > | null,
  not?: ModelVariantReportConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
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
  testing_description?: string | null,
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
  testing_description?: string | null,
};

export type DeleteVariantReportInput = {
  id: string,
};

export type CreatePatientDocumentsInput = {
  id?: string | null,
  name?: string | null,
  pathfile?: string | null,
  doctype?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
};

export type ModelPatientDocumentsConditionInput = {
  name?: ModelStringInput | null,
  pathfile?: ModelStringInput | null,
  doctype?: ModelStringInput | null,
  id_patient?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
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
  pathfile?: string | null,
  doctype?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePatientDocumentsInput = {
  id: string,
  name?: string | null,
  pathfile?: string | null,
  doctype?: string | null,
  id_patient?: string | null,
  id_report?: string | null,
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
  id_reference?: string | null,
  id_institution?: string | null,
  health_desc?: string | null,
};

export type ModelPatientConditionInput = {
  name?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  id_reference?: ModelStringInput | null,
  id_institution?: ModelStringInput | null,
  health_desc?: ModelStringInput | null,
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
  id_reference?: string | null,
  id_institution?: string | null,
  health_desc?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePatientInput = {
  id: string,
  name?: string | null,
  sex?: string | null,
  phone_number?: string | null,
  dob?: string | null,
  id_reference?: string | null,
  id_institution?: string | null,
  health_desc?: string | null,
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

export type ModelUserNotificationsFilterInput = {
  id?: ModelIDInput | null,
  user_id?: ModelStringInput | null,
  institutionID?: ModelStringInput | null,
  message?: ModelStringInput | null,
  id_fromuser?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
  markasread?: ModelBooleanInput | null,
  id_patient?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserNotificationsFilterInput | null > | null,
  or?: Array< ModelUserNotificationsFilterInput | null > | null,
  not?: ModelUserNotificationsFilterInput | null,
};

export type ModelUserNotificationsConnection = {
  __typename: "ModelUserNotificationsConnection",
  items:  Array<UserNotifications | null >,
  nextToken?: string | null,
};

export type ModelPatientHistoryDiseaseFilterInput = {
  id?: ModelIDInput | null,
  id_patient?: ModelStringInput | null,
  hpo_code?: ModelStringInput | null,
  hpo_desc?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPatientHistoryDiseaseFilterInput | null > | null,
  or?: Array< ModelPatientHistoryDiseaseFilterInput | null > | null,
  not?: ModelPatientHistoryDiseaseFilterInput | null,
};

export type ModelPatientHistoryDiseaseConnection = {
  __typename: "ModelPatientHistoryDiseaseConnection",
  items:  Array<PatientHistoryDisease | null >,
  nextToken?: string | null,
};

export type ModelAcmgAnnotationFilterInput = {
  id?: ModelIDInput | null,
  id_variant?: ModelStringInput | null,
  PVS1?: ModelBooleanInput | null,
  PS1?: ModelBooleanInput | null,
  PS2?: ModelBooleanInput | null,
  PS3?: ModelBooleanInput | null,
  PS4?: ModelBooleanInput | null,
  PP1_Strong?: ModelBooleanInput | null,
  PM1?: ModelBooleanInput | null,
  PM2?: ModelBooleanInput | null,
  PM3?: ModelBooleanInput | null,
  PM4?: ModelBooleanInput | null,
  PM5?: ModelBooleanInput | null,
  PM6?: ModelBooleanInput | null,
  PP1_Moderate?: ModelBooleanInput | null,
  PP1_Cosegregation?: ModelBooleanInput | null,
  PP2?: ModelBooleanInput | null,
  PP3?: ModelBooleanInput | null,
  PP4?: ModelBooleanInput | null,
  PP5?: ModelBooleanInput | null,
  BP1?: ModelBooleanInput | null,
  BP2?: ModelBooleanInput | null,
  BP3?: ModelBooleanInput | null,
  BP4?: ModelBooleanInput | null,
  BP5?: ModelBooleanInput | null,
  BP6?: ModelBooleanInput | null,
  BP7?: ModelBooleanInput | null,
  BS1?: ModelBooleanInput | null,
  BS2?: ModelBooleanInput | null,
  BS3?: ModelBooleanInput | null,
  BS4?: ModelBooleanInput | null,
  BA1?: ModelBooleanInput | null,
  acmg_class?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAcmgAnnotationFilterInput | null > | null,
  or?: Array< ModelAcmgAnnotationFilterInput | null > | null,
  not?: ModelAcmgAnnotationFilterInput | null,
};

export type ModelAcmgAnnotationConnection = {
  __typename: "ModelAcmgAnnotationConnection",
  items:  Array<AcmgAnnotation | null >,
  nextToken?: string | null,
};

export type ModelFamilyHistoryDiseaseFilterInput = {
  id?: ModelIDInput | null,
  id_patient?: ModelStringInput | null,
  hpo_code?: ModelStringInput | null,
  hpo_desc?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelFamilyHistoryDiseaseFilterInput | null > | null,
  or?: Array< ModelFamilyHistoryDiseaseFilterInput | null > | null,
  not?: ModelFamilyHistoryDiseaseFilterInput | null,
};

export type ModelFamilyHistoryDiseaseConnection = {
  __typename: "ModelFamilyHistoryDiseaseConnection",
  items:  Array<FamilyHistoryDisease | null >,
  nextToken?: string | null,
};

export type ModelVariantInterpretationFilterInput = {
  id?: ModelIDInput | null,
  hgvs?: ModelStringInput | null,
  text?: ModelStringInput | null,
  id_patient?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
  id_varsample?: ModelStringInput | null,
  alldesc?: ModelStringInput | null,
  gene_symbol?: ModelStringInput | null,
  gene_id?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVariantInterpretationFilterInput | null > | null,
  or?: Array< ModelVariantInterpretationFilterInput | null > | null,
  not?: ModelVariantInterpretationFilterInput | null,
};

export type ModelVariantInterpretationConnection = {
  __typename: "ModelVariantInterpretationConnection",
  items:  Array<VariantInterpretation | null >,
  nextToken?: string | null,
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
  gnomade?: ModelFloatInput | null,
  gnomadg?: ModelFloatInput | null,
  alldesc?: ModelStringInput | null,
  ac?: ModelFloatInput | null,
  af?: ModelFloatInput | null,
  an?: ModelFloatInput | null,
  dp?: ModelFloatInput | null,
  fs?: ModelFloatInput | null,
  mq?: ModelFloatInput | null,
  mqranksum?: ModelFloatInput | null,
  qd?: ModelFloatInput | null,
  readposrank?: ModelFloatInput | null,
  sor?: ModelFloatInput | null,
  fraction?: ModelFloatInput | null,
  zygosity?: ModelStringInput | null,
  text_interpretation?: ModelStringInput | null,
  id_variant?: ModelStringInput | null,
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
  number_variant?: ModelIntInput | null,
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
  acmg?: ModelStringInput | null,
  ac?: ModelFloatInput | null,
  af?: ModelFloatInput | null,
  an?: ModelFloatInput | null,
  dp?: ModelFloatInput | null,
  fs?: ModelFloatInput | null,
  mq?: ModelFloatInput | null,
  mqranksum?: ModelFloatInput | null,
  qd?: ModelFloatInput | null,
  readposrank?: ModelFloatInput | null,
  sor?: ModelFloatInput | null,
  fraction?: ModelFloatInput | null,
  zygosity?: ModelStringInput | null,
  gene_id?: ModelStringInput | null,
  gene_symbol?: ModelStringInput | null,
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
  id_patient?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
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
  id_patient?: ModelIDInput | null,
  id_report?: ModelStringInput | null,
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
  testing_description?: ModelStringInput | null,
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
  pathfile?: ModelStringInput | null,
  doctype?: ModelStringInput | null,
  id_patient?: ModelStringInput | null,
  id_report?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPatientDocumentsFilterInput | null > | null,
  or?: Array< ModelPatientDocumentsFilterInput | null > | null,
  not?: ModelPatientDocumentsFilterInput | null,
};

export type ModelPatientDocumentsConnection = {
  __typename: "ModelPatientDocumentsConnection",
  items:  Array<PatientDocuments | null >,
  nextToken?: string | null,
};

export type ModelPatientFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  sex?: ModelStringInput | null,
  phone_number?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  id_reference?: ModelStringInput | null,
  id_institution?: ModelStringInput | null,
  health_desc?: ModelStringInput | null,
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

export type ModelSubscriptionUserNotificationsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  user_id?: ModelSubscriptionStringInput | null,
  institutionID?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  id_fromuser?: ModelSubscriptionStringInput | null,
  id_report?: ModelSubscriptionStringInput | null,
  markasread?: ModelSubscriptionBooleanInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserNotificationsFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserNotificationsFilterInput | null > | null,
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

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionPatientHistoryDiseaseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  hpo_code?: ModelSubscriptionStringInput | null,
  hpo_desc?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPatientHistoryDiseaseFilterInput | null > | null,
  or?: Array< ModelSubscriptionPatientHistoryDiseaseFilterInput | null > | null,
};

export type ModelSubscriptionAcmgAnnotationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  id_variant?: ModelSubscriptionStringInput | null,
  PVS1?: ModelSubscriptionBooleanInput | null,
  PS1?: ModelSubscriptionBooleanInput | null,
  PS2?: ModelSubscriptionBooleanInput | null,
  PS3?: ModelSubscriptionBooleanInput | null,
  PS4?: ModelSubscriptionBooleanInput | null,
  PP1_Strong?: ModelSubscriptionBooleanInput | null,
  PM1?: ModelSubscriptionBooleanInput | null,
  PM2?: ModelSubscriptionBooleanInput | null,
  PM3?: ModelSubscriptionBooleanInput | null,
  PM4?: ModelSubscriptionBooleanInput | null,
  PM5?: ModelSubscriptionBooleanInput | null,
  PM6?: ModelSubscriptionBooleanInput | null,
  PP1_Moderate?: ModelSubscriptionBooleanInput | null,
  PP1_Cosegregation?: ModelSubscriptionBooleanInput | null,
  PP2?: ModelSubscriptionBooleanInput | null,
  PP3?: ModelSubscriptionBooleanInput | null,
  PP4?: ModelSubscriptionBooleanInput | null,
  PP5?: ModelSubscriptionBooleanInput | null,
  BP1?: ModelSubscriptionBooleanInput | null,
  BP2?: ModelSubscriptionBooleanInput | null,
  BP3?: ModelSubscriptionBooleanInput | null,
  BP4?: ModelSubscriptionBooleanInput | null,
  BP5?: ModelSubscriptionBooleanInput | null,
  BP6?: ModelSubscriptionBooleanInput | null,
  BP7?: ModelSubscriptionBooleanInput | null,
  BS1?: ModelSubscriptionBooleanInput | null,
  BS2?: ModelSubscriptionBooleanInput | null,
  BS3?: ModelSubscriptionBooleanInput | null,
  BS4?: ModelSubscriptionBooleanInput | null,
  BA1?: ModelSubscriptionBooleanInput | null,
  acmg_class?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAcmgAnnotationFilterInput | null > | null,
  or?: Array< ModelSubscriptionAcmgAnnotationFilterInput | null > | null,
};

export type ModelSubscriptionFamilyHistoryDiseaseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  hpo_code?: ModelSubscriptionStringInput | null,
  hpo_desc?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFamilyHistoryDiseaseFilterInput | null > | null,
  or?: Array< ModelSubscriptionFamilyHistoryDiseaseFilterInput | null > | null,
};

export type ModelSubscriptionVariantInterpretationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  hgvs?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  id_report?: ModelSubscriptionStringInput | null,
  id_varsample?: ModelSubscriptionStringInput | null,
  alldesc?: ModelSubscriptionStringInput | null,
  gene_symbol?: ModelSubscriptionStringInput | null,
  gene_id?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVariantInterpretationFilterInput | null > | null,
  or?: Array< ModelSubscriptionVariantInterpretationFilterInput | null > | null,
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
  gnomade?: ModelSubscriptionFloatInput | null,
  gnomadg?: ModelSubscriptionFloatInput | null,
  alldesc?: ModelSubscriptionStringInput | null,
  ac?: ModelSubscriptionFloatInput | null,
  af?: ModelSubscriptionFloatInput | null,
  an?: ModelSubscriptionFloatInput | null,
  dp?: ModelSubscriptionFloatInput | null,
  fs?: ModelSubscriptionFloatInput | null,
  mq?: ModelSubscriptionFloatInput | null,
  mqranksum?: ModelSubscriptionFloatInput | null,
  qd?: ModelSubscriptionFloatInput | null,
  readposrank?: ModelSubscriptionFloatInput | null,
  sor?: ModelSubscriptionFloatInput | null,
  fraction?: ModelSubscriptionFloatInput | null,
  zygosity?: ModelSubscriptionStringInput | null,
  text_interpretation?: ModelSubscriptionStringInput | null,
  id_variant?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSelectedVariantFilterInput | null > | null,
  or?: Array< ModelSubscriptionSelectedVariantFilterInput | null > | null,
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
  number_variant?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVcfdataFilterInput | null > | null,
  or?: Array< ModelSubscriptionVcfdataFilterInput | null > | null,
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
  acmg?: ModelSubscriptionStringInput | null,
  ac?: ModelSubscriptionFloatInput | null,
  af?: ModelSubscriptionFloatInput | null,
  an?: ModelSubscriptionFloatInput | null,
  dp?: ModelSubscriptionFloatInput | null,
  fs?: ModelSubscriptionFloatInput | null,
  mq?: ModelSubscriptionFloatInput | null,
  mqranksum?: ModelSubscriptionFloatInput | null,
  qd?: ModelSubscriptionFloatInput | null,
  readposrank?: ModelSubscriptionFloatInput | null,
  sor?: ModelSubscriptionFloatInput | null,
  fraction?: ModelSubscriptionFloatInput | null,
  zygosity?: ModelSubscriptionStringInput | null,
  gene_id?: ModelSubscriptionStringInput | null,
  gene_symbol?: ModelSubscriptionStringInput | null,
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
  id_patient?: ModelSubscriptionStringInput | null,
  id_report?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConclusionFilterInput | null > | null,
  or?: Array< ModelSubscriptionConclusionFilterInput | null > | null,
};

export type ModelSubscriptionRecommendationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  text?: ModelSubscriptionStringInput | null,
  id_patient?: ModelSubscriptionIDInput | null,
  id_report?: ModelSubscriptionStringInput | null,
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
  testing_description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVariantReportFilterInput | null > | null,
  or?: Array< ModelSubscriptionVariantReportFilterInput | null > | null,
};

export type ModelSubscriptionPatientDocumentsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  pathfile?: ModelSubscriptionStringInput | null,
  doctype?: ModelSubscriptionStringInput | null,
  id_patient?: ModelSubscriptionStringInput | null,
  id_report?: ModelSubscriptionStringInput | null,
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
  id_reference?: ModelSubscriptionStringInput | null,
  id_institution?: ModelSubscriptionStringInput | null,
  health_desc?: ModelSubscriptionStringInput | null,
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

export type CreateUserNotificationsMutationVariables = {
  input: CreateUserNotificationsInput,
  condition?: ModelUserNotificationsConditionInput | null,
};

export type CreateUserNotificationsMutation = {
  createUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    user_id?: string | null,
    institutionID?: string | null,
    message?: string | null,
    id_fromuser?: string | null,
    id_report?: string | null,
    markasread?: boolean | null,
    id_patient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserNotificationsMutationVariables = {
  input: UpdateUserNotificationsInput,
  condition?: ModelUserNotificationsConditionInput | null,
};

export type UpdateUserNotificationsMutation = {
  updateUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    user_id?: string | null,
    institutionID?: string | null,
    message?: string | null,
    id_fromuser?: string | null,
    id_report?: string | null,
    markasread?: boolean | null,
    id_patient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserNotificationsMutationVariables = {
  input: DeleteUserNotificationsInput,
  condition?: ModelUserNotificationsConditionInput | null,
};

export type DeleteUserNotificationsMutation = {
  deleteUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    user_id?: string | null,
    institutionID?: string | null,
    message?: string | null,
    id_fromuser?: string | null,
    id_report?: string | null,
    markasread?: boolean | null,
    id_patient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePatientHistoryDiseaseMutationVariables = {
  input: CreatePatientHistoryDiseaseInput,
  condition?: ModelPatientHistoryDiseaseConditionInput | null,
};

export type CreatePatientHistoryDiseaseMutation = {
  createPatientHistoryDisease?:  {
    __typename: "PatientHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePatientHistoryDiseaseMutationVariables = {
  input: UpdatePatientHistoryDiseaseInput,
  condition?: ModelPatientHistoryDiseaseConditionInput | null,
};

export type UpdatePatientHistoryDiseaseMutation = {
  updatePatientHistoryDisease?:  {
    __typename: "PatientHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePatientHistoryDiseaseMutationVariables = {
  input: DeletePatientHistoryDiseaseInput,
  condition?: ModelPatientHistoryDiseaseConditionInput | null,
};

export type DeletePatientHistoryDiseaseMutation = {
  deletePatientHistoryDisease?:  {
    __typename: "PatientHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAcmgAnnotationMutationVariables = {
  input: CreateAcmgAnnotationInput,
  condition?: ModelAcmgAnnotationConditionInput | null,
};

export type CreateAcmgAnnotationMutation = {
  createAcmgAnnotation?:  {
    __typename: "AcmgAnnotation",
    id: string,
    id_variant?: string | null,
    PVS1?: boolean | null,
    PS1?: boolean | null,
    PS2?: boolean | null,
    PS3?: boolean | null,
    PS4?: boolean | null,
    PP1_Strong?: boolean | null,
    PM1?: boolean | null,
    PM2?: boolean | null,
    PM3?: boolean | null,
    PM4?: boolean | null,
    PM5?: boolean | null,
    PM6?: boolean | null,
    PP1_Moderate?: boolean | null,
    PP1_Cosegregation?: boolean | null,
    PP2?: boolean | null,
    PP3?: boolean | null,
    PP4?: boolean | null,
    PP5?: boolean | null,
    BP1?: boolean | null,
    BP2?: boolean | null,
    BP3?: boolean | null,
    BP4?: boolean | null,
    BP5?: boolean | null,
    BP6?: boolean | null,
    BP7?: boolean | null,
    BS1?: boolean | null,
    BS2?: boolean | null,
    BS3?: boolean | null,
    BS4?: boolean | null,
    BA1?: boolean | null,
    acmg_class?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAcmgAnnotationMutationVariables = {
  input: UpdateAcmgAnnotationInput,
  condition?: ModelAcmgAnnotationConditionInput | null,
};

export type UpdateAcmgAnnotationMutation = {
  updateAcmgAnnotation?:  {
    __typename: "AcmgAnnotation",
    id: string,
    id_variant?: string | null,
    PVS1?: boolean | null,
    PS1?: boolean | null,
    PS2?: boolean | null,
    PS3?: boolean | null,
    PS4?: boolean | null,
    PP1_Strong?: boolean | null,
    PM1?: boolean | null,
    PM2?: boolean | null,
    PM3?: boolean | null,
    PM4?: boolean | null,
    PM5?: boolean | null,
    PM6?: boolean | null,
    PP1_Moderate?: boolean | null,
    PP1_Cosegregation?: boolean | null,
    PP2?: boolean | null,
    PP3?: boolean | null,
    PP4?: boolean | null,
    PP5?: boolean | null,
    BP1?: boolean | null,
    BP2?: boolean | null,
    BP3?: boolean | null,
    BP4?: boolean | null,
    BP5?: boolean | null,
    BP6?: boolean | null,
    BP7?: boolean | null,
    BS1?: boolean | null,
    BS2?: boolean | null,
    BS3?: boolean | null,
    BS4?: boolean | null,
    BA1?: boolean | null,
    acmg_class?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAcmgAnnotationMutationVariables = {
  input: DeleteAcmgAnnotationInput,
  condition?: ModelAcmgAnnotationConditionInput | null,
};

export type DeleteAcmgAnnotationMutation = {
  deleteAcmgAnnotation?:  {
    __typename: "AcmgAnnotation",
    id: string,
    id_variant?: string | null,
    PVS1?: boolean | null,
    PS1?: boolean | null,
    PS2?: boolean | null,
    PS3?: boolean | null,
    PS4?: boolean | null,
    PP1_Strong?: boolean | null,
    PM1?: boolean | null,
    PM2?: boolean | null,
    PM3?: boolean | null,
    PM4?: boolean | null,
    PM5?: boolean | null,
    PM6?: boolean | null,
    PP1_Moderate?: boolean | null,
    PP1_Cosegregation?: boolean | null,
    PP2?: boolean | null,
    PP3?: boolean | null,
    PP4?: boolean | null,
    PP5?: boolean | null,
    BP1?: boolean | null,
    BP2?: boolean | null,
    BP3?: boolean | null,
    BP4?: boolean | null,
    BP5?: boolean | null,
    BP6?: boolean | null,
    BP7?: boolean | null,
    BS1?: boolean | null,
    BS2?: boolean | null,
    BS3?: boolean | null,
    BS4?: boolean | null,
    BA1?: boolean | null,
    acmg_class?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFamilyHistoryDiseaseMutationVariables = {
  input: CreateFamilyHistoryDiseaseInput,
  condition?: ModelFamilyHistoryDiseaseConditionInput | null,
};

export type CreateFamilyHistoryDiseaseMutation = {
  createFamilyHistoryDisease?:  {
    __typename: "FamilyHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFamilyHistoryDiseaseMutationVariables = {
  input: UpdateFamilyHistoryDiseaseInput,
  condition?: ModelFamilyHistoryDiseaseConditionInput | null,
};

export type UpdateFamilyHistoryDiseaseMutation = {
  updateFamilyHistoryDisease?:  {
    __typename: "FamilyHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFamilyHistoryDiseaseMutationVariables = {
  input: DeleteFamilyHistoryDiseaseInput,
  condition?: ModelFamilyHistoryDiseaseConditionInput | null,
};

export type DeleteFamilyHistoryDiseaseMutation = {
  deleteFamilyHistoryDisease?:  {
    __typename: "FamilyHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVariantInterpretationMutationVariables = {
  input: CreateVariantInterpretationInput,
  condition?: ModelVariantInterpretationConditionInput | null,
};

export type CreateVariantInterpretationMutation = {
  createVariantInterpretation?:  {
    __typename: "VariantInterpretation",
    id: string,
    hgvs?: string | null,
    text?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
    id_varsample?: string | null,
    alldesc?: string | null,
    gene_symbol?: string | null,
    gene_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVariantInterpretationMutationVariables = {
  input: UpdateVariantInterpretationInput,
  condition?: ModelVariantInterpretationConditionInput | null,
};

export type UpdateVariantInterpretationMutation = {
  updateVariantInterpretation?:  {
    __typename: "VariantInterpretation",
    id: string,
    hgvs?: string | null,
    text?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
    id_varsample?: string | null,
    alldesc?: string | null,
    gene_symbol?: string | null,
    gene_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVariantInterpretationMutationVariables = {
  input: DeleteVariantInterpretationInput,
  condition?: ModelVariantInterpretationConditionInput | null,
};

export type DeleteVariantInterpretationMutation = {
  deleteVariantInterpretation?:  {
    __typename: "VariantInterpretation",
    id: string,
    hgvs?: string | null,
    text?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
    id_varsample?: string | null,
    alldesc?: string | null,
    gene_symbol?: string | null,
    gene_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
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
    gnomade?: number | null,
    gnomadg?: number | null,
    alldesc?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    text_interpretation?: string | null,
    id_variant?: string | null,
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
    gnomade?: number | null,
    gnomadg?: number | null,
    alldesc?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    text_interpretation?: string | null,
    id_variant?: string | null,
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
    gnomade?: number | null,
    gnomadg?: number | null,
    alldesc?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    text_interpretation?: string | null,
    id_variant?: string | null,
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
    number_variant?: number | null,
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
    number_variant?: number | null,
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
    number_variant?: number | null,
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
    acmg?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
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
    acmg?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
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
    acmg?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
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
    id_patient?: string | null,
    id_report?: string | null,
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
    id_patient?: string | null,
    id_report?: string | null,
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
    id_patient?: string | null,
    id_report?: string | null,
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
    id_patient: string,
    id_report?: string | null,
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
    id_patient: string,
    id_report?: string | null,
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
    id_patient: string,
    id_report?: string | null,
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
    testing_description?: string | null,
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
    testing_description?: string | null,
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
    testing_description?: string | null,
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
    pathfile?: string | null,
    doctype?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
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
    pathfile?: string | null,
    doctype?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
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
    pathfile?: string | null,
    doctype?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
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
    id_reference?: string | null,
    id_institution?: string | null,
    health_desc?: string | null,
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
    id_reference?: string | null,
    id_institution?: string | null,
    health_desc?: string | null,
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
    id_reference?: string | null,
    id_institution?: string | null,
    health_desc?: string | null,
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

export type GetUserNotificationsQueryVariables = {
  id: string,
};

export type GetUserNotificationsQuery = {
  getUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    user_id?: string | null,
    institutionID?: string | null,
    message?: string | null,
    id_fromuser?: string | null,
    id_report?: string | null,
    markasread?: boolean | null,
    id_patient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserNotificationsQueryVariables = {
  filter?: ModelUserNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserNotificationsQuery = {
  listUserNotifications?:  {
    __typename: "ModelUserNotificationsConnection",
    items:  Array< {
      __typename: "UserNotifications",
      id: string,
      user_id?: string | null,
      institutionID?: string | null,
      message?: string | null,
      id_fromuser?: string | null,
      id_report?: string | null,
      markasread?: boolean | null,
      id_patient?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPatientHistoryDiseaseQueryVariables = {
  id: string,
};

export type GetPatientHistoryDiseaseQuery = {
  getPatientHistoryDisease?:  {
    __typename: "PatientHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPatientHistoryDiseasesQueryVariables = {
  filter?: ModelPatientHistoryDiseaseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPatientHistoryDiseasesQuery = {
  listPatientHistoryDiseases?:  {
    __typename: "ModelPatientHistoryDiseaseConnection",
    items:  Array< {
      __typename: "PatientHistoryDisease",
      id: string,
      id_patient?: string | null,
      hpo_code?: string | null,
      hpo_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAcmgAnnotationQueryVariables = {
  id: string,
};

export type GetAcmgAnnotationQuery = {
  getAcmgAnnotation?:  {
    __typename: "AcmgAnnotation",
    id: string,
    id_variant?: string | null,
    PVS1?: boolean | null,
    PS1?: boolean | null,
    PS2?: boolean | null,
    PS3?: boolean | null,
    PS4?: boolean | null,
    PP1_Strong?: boolean | null,
    PM1?: boolean | null,
    PM2?: boolean | null,
    PM3?: boolean | null,
    PM4?: boolean | null,
    PM5?: boolean | null,
    PM6?: boolean | null,
    PP1_Moderate?: boolean | null,
    PP1_Cosegregation?: boolean | null,
    PP2?: boolean | null,
    PP3?: boolean | null,
    PP4?: boolean | null,
    PP5?: boolean | null,
    BP1?: boolean | null,
    BP2?: boolean | null,
    BP3?: boolean | null,
    BP4?: boolean | null,
    BP5?: boolean | null,
    BP6?: boolean | null,
    BP7?: boolean | null,
    BS1?: boolean | null,
    BS2?: boolean | null,
    BS3?: boolean | null,
    BS4?: boolean | null,
    BA1?: boolean | null,
    acmg_class?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAcmgAnnotationsQueryVariables = {
  filter?: ModelAcmgAnnotationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAcmgAnnotationsQuery = {
  listAcmgAnnotations?:  {
    __typename: "ModelAcmgAnnotationConnection",
    items:  Array< {
      __typename: "AcmgAnnotation",
      id: string,
      id_variant?: string | null,
      PVS1?: boolean | null,
      PS1?: boolean | null,
      PS2?: boolean | null,
      PS3?: boolean | null,
      PS4?: boolean | null,
      PP1_Strong?: boolean | null,
      PM1?: boolean | null,
      PM2?: boolean | null,
      PM3?: boolean | null,
      PM4?: boolean | null,
      PM5?: boolean | null,
      PM6?: boolean | null,
      PP1_Moderate?: boolean | null,
      PP1_Cosegregation?: boolean | null,
      PP2?: boolean | null,
      PP3?: boolean | null,
      PP4?: boolean | null,
      PP5?: boolean | null,
      BP1?: boolean | null,
      BP2?: boolean | null,
      BP3?: boolean | null,
      BP4?: boolean | null,
      BP5?: boolean | null,
      BP6?: boolean | null,
      BP7?: boolean | null,
      BS1?: boolean | null,
      BS2?: boolean | null,
      BS3?: boolean | null,
      BS4?: boolean | null,
      BA1?: boolean | null,
      acmg_class?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFamilyHistoryDiseaseQueryVariables = {
  id: string,
};

export type GetFamilyHistoryDiseaseQuery = {
  getFamilyHistoryDisease?:  {
    __typename: "FamilyHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFamilyHistoryDiseasesQueryVariables = {
  filter?: ModelFamilyHistoryDiseaseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFamilyHistoryDiseasesQuery = {
  listFamilyHistoryDiseases?:  {
    __typename: "ModelFamilyHistoryDiseaseConnection",
    items:  Array< {
      __typename: "FamilyHistoryDisease",
      id: string,
      id_patient?: string | null,
      hpo_code?: string | null,
      hpo_desc?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVariantInterpretationQueryVariables = {
  id: string,
};

export type GetVariantInterpretationQuery = {
  getVariantInterpretation?:  {
    __typename: "VariantInterpretation",
    id: string,
    hgvs?: string | null,
    text?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
    id_varsample?: string | null,
    alldesc?: string | null,
    gene_symbol?: string | null,
    gene_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVariantInterpretationsQueryVariables = {
  filter?: ModelVariantInterpretationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVariantInterpretationsQuery = {
  listVariantInterpretations?:  {
    __typename: "ModelVariantInterpretationConnection",
    items:  Array< {
      __typename: "VariantInterpretation",
      id: string,
      hgvs?: string | null,
      text?: string | null,
      id_patient?: string | null,
      id_report?: string | null,
      id_varsample?: string | null,
      alldesc?: string | null,
      gene_symbol?: string | null,
      gene_id?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
    gnomade?: number | null,
    gnomadg?: number | null,
    alldesc?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    text_interpretation?: string | null,
    id_variant?: string | null,
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
      gnomade?: number | null,
      gnomadg?: number | null,
      alldesc?: string | null,
      ac?: number | null,
      af?: number | null,
      an?: number | null,
      dp?: number | null,
      fs?: number | null,
      mq?: number | null,
      mqranksum?: number | null,
      qd?: number | null,
      readposrank?: number | null,
      sor?: number | null,
      fraction?: number | null,
      zygosity?: string | null,
      text_interpretation?: string | null,
      id_variant?: string | null,
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
    number_variant?: number | null,
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
      number_variant?: number | null,
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
    acmg?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
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
      acmg?: string | null,
      ac?: number | null,
      af?: number | null,
      an?: number | null,
      dp?: number | null,
      fs?: number | null,
      mq?: number | null,
      mqranksum?: number | null,
      qd?: number | null,
      readposrank?: number | null,
      sor?: number | null,
      fraction?: number | null,
      zygosity?: string | null,
      gene_id?: string | null,
      gene_symbol?: string | null,
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
    id_patient?: string | null,
    id_report?: string | null,
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
      id_patient?: string | null,
      id_report?: string | null,
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
    id_patient: string,
    id_report?: string | null,
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
      id_patient: string,
      id_report?: string | null,
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
    testing_description?: string | null,
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
      testing_description?: string | null,
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
    pathfile?: string | null,
    doctype?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
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
      pathfile?: string | null,
      doctype?: string | null,
      id_patient?: string | null,
      id_report?: string | null,
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
    id_reference?: string | null,
    id_institution?: string | null,
    health_desc?: string | null,
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
      id_reference?: string | null,
      id_institution?: string | null,
      health_desc?: string | null,
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

export type OnCreateUserNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionUserNotificationsFilterInput | null,
};

export type OnCreateUserNotificationsSubscription = {
  onCreateUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    user_id?: string | null,
    institutionID?: string | null,
    message?: string | null,
    id_fromuser?: string | null,
    id_report?: string | null,
    markasread?: boolean | null,
    id_patient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionUserNotificationsFilterInput | null,
};

export type OnUpdateUserNotificationsSubscription = {
  onUpdateUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    user_id?: string | null,
    institutionID?: string | null,
    message?: string | null,
    id_fromuser?: string | null,
    id_report?: string | null,
    markasread?: boolean | null,
    id_patient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionUserNotificationsFilterInput | null,
};

export type OnDeleteUserNotificationsSubscription = {
  onDeleteUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    user_id?: string | null,
    institutionID?: string | null,
    message?: string | null,
    id_fromuser?: string | null,
    id_report?: string | null,
    markasread?: boolean | null,
    id_patient?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePatientHistoryDiseaseSubscriptionVariables = {
  filter?: ModelSubscriptionPatientHistoryDiseaseFilterInput | null,
};

export type OnCreatePatientHistoryDiseaseSubscription = {
  onCreatePatientHistoryDisease?:  {
    __typename: "PatientHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePatientHistoryDiseaseSubscriptionVariables = {
  filter?: ModelSubscriptionPatientHistoryDiseaseFilterInput | null,
};

export type OnUpdatePatientHistoryDiseaseSubscription = {
  onUpdatePatientHistoryDisease?:  {
    __typename: "PatientHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePatientHistoryDiseaseSubscriptionVariables = {
  filter?: ModelSubscriptionPatientHistoryDiseaseFilterInput | null,
};

export type OnDeletePatientHistoryDiseaseSubscription = {
  onDeletePatientHistoryDisease?:  {
    __typename: "PatientHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAcmgAnnotationSubscriptionVariables = {
  filter?: ModelSubscriptionAcmgAnnotationFilterInput | null,
};

export type OnCreateAcmgAnnotationSubscription = {
  onCreateAcmgAnnotation?:  {
    __typename: "AcmgAnnotation",
    id: string,
    id_variant?: string | null,
    PVS1?: boolean | null,
    PS1?: boolean | null,
    PS2?: boolean | null,
    PS3?: boolean | null,
    PS4?: boolean | null,
    PP1_Strong?: boolean | null,
    PM1?: boolean | null,
    PM2?: boolean | null,
    PM3?: boolean | null,
    PM4?: boolean | null,
    PM5?: boolean | null,
    PM6?: boolean | null,
    PP1_Moderate?: boolean | null,
    PP1_Cosegregation?: boolean | null,
    PP2?: boolean | null,
    PP3?: boolean | null,
    PP4?: boolean | null,
    PP5?: boolean | null,
    BP1?: boolean | null,
    BP2?: boolean | null,
    BP3?: boolean | null,
    BP4?: boolean | null,
    BP5?: boolean | null,
    BP6?: boolean | null,
    BP7?: boolean | null,
    BS1?: boolean | null,
    BS2?: boolean | null,
    BS3?: boolean | null,
    BS4?: boolean | null,
    BA1?: boolean | null,
    acmg_class?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAcmgAnnotationSubscriptionVariables = {
  filter?: ModelSubscriptionAcmgAnnotationFilterInput | null,
};

export type OnUpdateAcmgAnnotationSubscription = {
  onUpdateAcmgAnnotation?:  {
    __typename: "AcmgAnnotation",
    id: string,
    id_variant?: string | null,
    PVS1?: boolean | null,
    PS1?: boolean | null,
    PS2?: boolean | null,
    PS3?: boolean | null,
    PS4?: boolean | null,
    PP1_Strong?: boolean | null,
    PM1?: boolean | null,
    PM2?: boolean | null,
    PM3?: boolean | null,
    PM4?: boolean | null,
    PM5?: boolean | null,
    PM6?: boolean | null,
    PP1_Moderate?: boolean | null,
    PP1_Cosegregation?: boolean | null,
    PP2?: boolean | null,
    PP3?: boolean | null,
    PP4?: boolean | null,
    PP5?: boolean | null,
    BP1?: boolean | null,
    BP2?: boolean | null,
    BP3?: boolean | null,
    BP4?: boolean | null,
    BP5?: boolean | null,
    BP6?: boolean | null,
    BP7?: boolean | null,
    BS1?: boolean | null,
    BS2?: boolean | null,
    BS3?: boolean | null,
    BS4?: boolean | null,
    BA1?: boolean | null,
    acmg_class?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAcmgAnnotationSubscriptionVariables = {
  filter?: ModelSubscriptionAcmgAnnotationFilterInput | null,
};

export type OnDeleteAcmgAnnotationSubscription = {
  onDeleteAcmgAnnotation?:  {
    __typename: "AcmgAnnotation",
    id: string,
    id_variant?: string | null,
    PVS1?: boolean | null,
    PS1?: boolean | null,
    PS2?: boolean | null,
    PS3?: boolean | null,
    PS4?: boolean | null,
    PP1_Strong?: boolean | null,
    PM1?: boolean | null,
    PM2?: boolean | null,
    PM3?: boolean | null,
    PM4?: boolean | null,
    PM5?: boolean | null,
    PM6?: boolean | null,
    PP1_Moderate?: boolean | null,
    PP1_Cosegregation?: boolean | null,
    PP2?: boolean | null,
    PP3?: boolean | null,
    PP4?: boolean | null,
    PP5?: boolean | null,
    BP1?: boolean | null,
    BP2?: boolean | null,
    BP3?: boolean | null,
    BP4?: boolean | null,
    BP5?: boolean | null,
    BP6?: boolean | null,
    BP7?: boolean | null,
    BS1?: boolean | null,
    BS2?: boolean | null,
    BS3?: boolean | null,
    BS4?: boolean | null,
    BA1?: boolean | null,
    acmg_class?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFamilyHistoryDiseaseSubscriptionVariables = {
  filter?: ModelSubscriptionFamilyHistoryDiseaseFilterInput | null,
};

export type OnCreateFamilyHistoryDiseaseSubscription = {
  onCreateFamilyHistoryDisease?:  {
    __typename: "FamilyHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFamilyHistoryDiseaseSubscriptionVariables = {
  filter?: ModelSubscriptionFamilyHistoryDiseaseFilterInput | null,
};

export type OnUpdateFamilyHistoryDiseaseSubscription = {
  onUpdateFamilyHistoryDisease?:  {
    __typename: "FamilyHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFamilyHistoryDiseaseSubscriptionVariables = {
  filter?: ModelSubscriptionFamilyHistoryDiseaseFilterInput | null,
};

export type OnDeleteFamilyHistoryDiseaseSubscription = {
  onDeleteFamilyHistoryDisease?:  {
    __typename: "FamilyHistoryDisease",
    id: string,
    id_patient?: string | null,
    hpo_code?: string | null,
    hpo_desc?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateVariantInterpretationSubscriptionVariables = {
  filter?: ModelSubscriptionVariantInterpretationFilterInput | null,
};

export type OnCreateVariantInterpretationSubscription = {
  onCreateVariantInterpretation?:  {
    __typename: "VariantInterpretation",
    id: string,
    hgvs?: string | null,
    text?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
    id_varsample?: string | null,
    alldesc?: string | null,
    gene_symbol?: string | null,
    gene_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVariantInterpretationSubscriptionVariables = {
  filter?: ModelSubscriptionVariantInterpretationFilterInput | null,
};

export type OnUpdateVariantInterpretationSubscription = {
  onUpdateVariantInterpretation?:  {
    __typename: "VariantInterpretation",
    id: string,
    hgvs?: string | null,
    text?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
    id_varsample?: string | null,
    alldesc?: string | null,
    gene_symbol?: string | null,
    gene_id?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVariantInterpretationSubscriptionVariables = {
  filter?: ModelSubscriptionVariantInterpretationFilterInput | null,
};

export type OnDeleteVariantInterpretationSubscription = {
  onDeleteVariantInterpretation?:  {
    __typename: "VariantInterpretation",
    id: string,
    hgvs?: string | null,
    text?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
    id_varsample?: string | null,
    alldesc?: string | null,
    gene_symbol?: string | null,
    gene_id?: string | null,
    createdAt: string,
    updatedAt: string,
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
    gnomade?: number | null,
    gnomadg?: number | null,
    alldesc?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    text_interpretation?: string | null,
    id_variant?: string | null,
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
    gnomade?: number | null,
    gnomadg?: number | null,
    alldesc?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    text_interpretation?: string | null,
    id_variant?: string | null,
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
    gnomade?: number | null,
    gnomadg?: number | null,
    alldesc?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    text_interpretation?: string | null,
    id_variant?: string | null,
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
    number_variant?: number | null,
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
    number_variant?: number | null,
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
    number_variant?: number | null,
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
    acmg?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
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
    acmg?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
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
    acmg?: string | null,
    ac?: number | null,
    af?: number | null,
    an?: number | null,
    dp?: number | null,
    fs?: number | null,
    mq?: number | null,
    mqranksum?: number | null,
    qd?: number | null,
    readposrank?: number | null,
    sor?: number | null,
    fraction?: number | null,
    zygosity?: string | null,
    gene_id?: string | null,
    gene_symbol?: string | null,
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
    id_patient?: string | null,
    id_report?: string | null,
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
    id_patient?: string | null,
    id_report?: string | null,
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
    id_patient?: string | null,
    id_report?: string | null,
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
    id_patient: string,
    id_report?: string | null,
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
    id_patient: string,
    id_report?: string | null,
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
    id_patient: string,
    id_report?: string | null,
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
    testing_description?: string | null,
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
    testing_description?: string | null,
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
    testing_description?: string | null,
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
    pathfile?: string | null,
    doctype?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
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
    pathfile?: string | null,
    doctype?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
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
    pathfile?: string | null,
    doctype?: string | null,
    id_patient?: string | null,
    id_report?: string | null,
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
    id_reference?: string | null,
    id_institution?: string | null,
    health_desc?: string | null,
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
    id_reference?: string | null,
    id_institution?: string | null,
    health_desc?: string | null,
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
    id_reference?: string | null,
    id_institution?: string | null,
    health_desc?: string | null,
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
