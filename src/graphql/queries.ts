/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAcmgAnnotation = /* GraphQL */ `query GetAcmgAnnotation($id: ID!) {
  getAcmgAnnotation(id: $id) {
    id
    id_variant
    PVS1
    PS1
    PS2
    PS3
    PS4
    PP1_Strong
    PM1
    PM2
    PM3
    PM4
    PM5
    PM6
    PP1_Moderate
    PP1_Cosegregation
    PP2
    PP3
    PP4
    PP5
    BP1
    BP2
    BP3
    BP4
    BP5
    BP6
    BP7
    BS1
    BS2
    BS3
    BS4
    BA1
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAcmgAnnotationQueryVariables,
  APITypes.GetAcmgAnnotationQuery
>;
export const listAcmgAnnotations = /* GraphQL */ `query ListAcmgAnnotations(
  $filter: ModelAcmgAnnotationFilterInput
  $limit: Int
  $nextToken: String
) {
  listAcmgAnnotations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      id_variant
      PVS1
      PS1
      PS2
      PS3
      PS4
      PP1_Strong
      PM1
      PM2
      PM3
      PM4
      PM5
      PM6
      PP1_Moderate
      PP1_Cosegregation
      PP2
      PP3
      PP4
      PP5
      BP1
      BP2
      BP3
      BP4
      BP5
      BP6
      BP7
      BS1
      BS2
      BS3
      BS4
      BA1
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAcmgAnnotationsQueryVariables,
  APITypes.ListAcmgAnnotationsQuery
>;
export const getFamilyHistoryDisease = /* GraphQL */ `query GetFamilyHistoryDisease($id: ID!) {
  getFamilyHistoryDisease(id: $id) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFamilyHistoryDiseaseQueryVariables,
  APITypes.GetFamilyHistoryDiseaseQuery
>;
export const listFamilyHistoryDiseases = /* GraphQL */ `query ListFamilyHistoryDiseases(
  $filter: ModelFamilyHistoryDiseaseFilterInput
  $limit: Int
  $nextToken: String
) {
  listFamilyHistoryDiseases(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      id_patient
      hpo_code
      hpo_desc
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFamilyHistoryDiseasesQueryVariables,
  APITypes.ListFamilyHistoryDiseasesQuery
>;
export const getVariantInterpretation = /* GraphQL */ `query GetVariantInterpretation($id: ID!) {
  getVariantInterpretation(id: $id) {
    id
    hgvs
    text
    id_patient
    id_report
    id_varsample
    gene
    alldesc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVariantInterpretationQueryVariables,
  APITypes.GetVariantInterpretationQuery
>;
export const listVariantInterpretations = /* GraphQL */ `query ListVariantInterpretations(
  $filter: ModelVariantInterpretationFilterInput
  $limit: Int
  $nextToken: String
) {
  listVariantInterpretations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      hgvs
      text
      id_patient
      id_report
      id_varsample
      gene
      alldesc
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVariantInterpretationsQueryVariables,
  APITypes.ListVariantInterpretationsQuery
>;
export const getSelectedVariant = /* GraphQL */ `query GetSelectedVariant($id: ID!) {
  getSelectedVariant(id: $id) {
    id
    id_patient
    id_vcf
    id_report
    gene_id
    gene_symbol
    chrom
    pos
    id_var
    ref
    alt
    qual
    zigosity
    global_allele
    functional_impact
    acmg
    reviewer_class
    clinical_sign
    hgvs
    severe_consequence
    sift_score
    sift_prediction
    phenotypes
    rsID
    gnomade
    gnomadg
    alldesc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSelectedVariantQueryVariables,
  APITypes.GetSelectedVariantQuery
>;
export const listSelectedVariants = /* GraphQL */ `query ListSelectedVariants(
  $filter: ModelSelectedVariantFilterInput
  $limit: Int
  $nextToken: String
) {
  listSelectedVariants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      id_patient
      id_vcf
      id_report
      gene_id
      gene_symbol
      chrom
      pos
      id_var
      ref
      alt
      qual
      zigosity
      global_allele
      functional_impact
      acmg
      reviewer_class
      clinical_sign
      hgvs
      severe_consequence
      sift_score
      sift_prediction
      phenotypes
      rsID
      gnomade
      gnomadg
      alldesc
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSelectedVariantsQueryVariables,
  APITypes.ListSelectedVariantsQuery
>;
export const getVcfdata = /* GraphQL */ `query GetVcfdata($id: ID!) {
  getVcfdata(id: $id) {
    id
    id_patient
    sample_date
    uploadAt
    pathfile
    genome_reference
    number_variant
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVcfdataQueryVariables,
  APITypes.GetVcfdataQuery
>;
export const listVcfdata = /* GraphQL */ `query ListVcfdata(
  $filter: ModelVcfdataFilterInput
  $limit: Int
  $nextToken: String
) {
  listVcfdata(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      id_patient
      sample_date
      uploadAt
      pathfile
      genome_reference
      number_variant
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVcfdataQueryVariables,
  APITypes.ListVcfdataQuery
>;
export const getVariant = /* GraphQL */ `query GetVariant($id: ID!) {
  getVariant(id: $id) {
    id
    chrom
    pos
    ref
    alt
    qual
    filter
    info
    hgvs
    id_var
    id_patient
    id_vcf
    acmg
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVariantQueryVariables,
  APITypes.GetVariantQuery
>;
export const listVariants = /* GraphQL */ `query ListVariants(
  $filter: ModelVariantFilterInput
  $limit: Int
  $nextToken: String
) {
  listVariants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      chrom
      pos
      ref
      alt
      qual
      filter
      info
      hgvs
      id_var
      id_patient
      id_vcf
      acmg
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVariantsQueryVariables,
  APITypes.ListVariantsQuery
>;
export const getGeneticsConselor = /* GraphQL */ `query GetGeneticsConselor($id: ID!) {
  getGeneticsConselor(id: $id) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetGeneticsConselorQueryVariables,
  APITypes.GetGeneticsConselorQuery
>;
export const listGeneticsConselors = /* GraphQL */ `query ListGeneticsConselors(
  $filter: ModelGeneticsConselorFilterInput
  $limit: Int
  $nextToken: String
) {
  listGeneticsConselors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGeneticsConselorsQueryVariables,
  APITypes.ListGeneticsConselorsQuery
>;
export const getPhenotype = /* GraphQL */ `query GetPhenotype($id: ID!) {
  getPhenotype(id: $id) {
    id
    PhenotypeCode
    Description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPhenotypeQueryVariables,
  APITypes.GetPhenotypeQuery
>;
export const listPhenotypes = /* GraphQL */ `query ListPhenotypes(
  $filter: ModelPhenotypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listPhenotypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      PhenotypeCode
      Description
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPhenotypesQueryVariables,
  APITypes.ListPhenotypesQuery
>;
export const getConclusion = /* GraphQL */ `query GetConclusion($id: ID!) {
  getConclusion(id: $id) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetConclusionQueryVariables,
  APITypes.GetConclusionQuery
>;
export const listConclusions = /* GraphQL */ `query ListConclusions(
  $filter: ModelConclusionFilterInput
  $limit: Int
  $nextToken: String
) {
  listConclusions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      id_patient
      id_report
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConclusionsQueryVariables,
  APITypes.ListConclusionsQuery
>;
export const getRecommendation = /* GraphQL */ `query GetRecommendation($id: ID!) {
  getRecommendation(id: $id) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRecommendationQueryVariables,
  APITypes.GetRecommendationQuery
>;
export const listRecommendations = /* GraphQL */ `query ListRecommendations(
  $filter: ModelRecommendationFilterInput
  $limit: Int
  $nextToken: String
) {
  listRecommendations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      id_patient
      id_report
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRecommendationsQueryVariables,
  APITypes.ListRecommendationsQuery
>;
export const getVariantReport = /* GraphQL */ `query GetVariantReport($id: ID!) {
  getVariantReport(id: $id) {
    id
    status
    isApproved
    medical_history
    current_diagnosis
    institutionID
    createAt
    phenotype
    sample_collection
    idPatient
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVariantReportQueryVariables,
  APITypes.GetVariantReportQuery
>;
export const listVariantReports = /* GraphQL */ `query ListVariantReports(
  $filter: ModelVariantReportFilterInput
  $limit: Int
  $nextToken: String
) {
  listVariantReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      status
      isApproved
      medical_history
      current_diagnosis
      institutionID
      createAt
      phenotype
      sample_collection
      idPatient
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVariantReportsQueryVariables,
  APITypes.ListVariantReportsQuery
>;
export const getPatientDocuments = /* GraphQL */ `query GetPatientDocuments($id: ID!) {
  getPatientDocuments(id: $id) {
    id
    name
    pathfile
    doctype
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPatientDocumentsQueryVariables,
  APITypes.GetPatientDocumentsQuery
>;
export const listPatientDocuments = /* GraphQL */ `query ListPatientDocuments(
  $filter: ModelPatientDocumentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPatientDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      pathfile
      doctype
      id_patient
      id_report
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPatientDocumentsQueryVariables,
  APITypes.ListPatientDocumentsQuery
>;
export const getPatient = /* GraphQL */ `query GetPatient($id: ID!) {
  getPatient(id: $id) {
    id
    name
    sex
    phone_number
    dob
    id_reference
    id_institution
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPatientQueryVariables,
  APITypes.GetPatientQuery
>;
export const listPatients = /* GraphQL */ `query ListPatients(
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
) {
  listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      sex
      phone_number
      dob
      id_reference
      id_institution
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPatientsQueryVariables,
  APITypes.ListPatientsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    first_name
    last_name
    role
    email
    category
    specialty
    institutionID
    level
    status
    phone_number
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      first_name
      last_name
      role
      email
      category
      specialty
      institutionID
      level
      status
      phone_number
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getInstitution = /* GraphQL */ `query GetInstitution($id: ID!) {
  getInstitution(id: $id) {
    id
    name
    contactname
    address
    subscription_type
    email
    Users {
      nextToken
      __typename
    }
    Patients {
      nextToken
      __typename
    }
    userQuotas
    currentUserQuota
    storageQuota
    registrationDate
    accountStatus
    VariantReports {
      nextToken
      __typename
    }
    contactphone
    dueDate
    currentStorageQuota
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetInstitutionQueryVariables,
  APITypes.GetInstitutionQuery
>;
export const listInstitutions = /* GraphQL */ `query ListInstitutions(
  $filter: ModelInstitutionFilterInput
  $limit: Int
  $nextToken: String
) {
  listInstitutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      contactname
      address
      subscription_type
      email
      userQuotas
      currentUserQuota
      storageQuota
      registrationDate
      accountStatus
      contactphone
      dueDate
      currentStorageQuota
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInstitutionsQueryVariables,
  APITypes.ListInstitutionsQuery
>;
