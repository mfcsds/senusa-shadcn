/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getGeneticsConselor = /* GraphQL */ `query GetGeneticsConselor($id: ID!) {
  getGeneticsConselor(id: $id) {
    id
    text
    variantreportID
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
      variantreportID
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
export const geneticsConselorsByVariantreportID = /* GraphQL */ `query GeneticsConselorsByVariantreportID(
  $variantreportID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelGeneticsConselorFilterInput
  $limit: Int
  $nextToken: String
) {
  geneticsConselorsByVariantreportID(
    variantreportID: $variantreportID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      text
      variantreportID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GeneticsConselorsByVariantreportIDQueryVariables,
  APITypes.GeneticsConselorsByVariantreportIDQuery
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
    variantreportID
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
      variantreportID
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
export const recommendationsByVariantreportID = /* GraphQL */ `query RecommendationsByVariantreportID(
  $variantreportID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRecommendationFilterInput
  $limit: Int
  $nextToken: String
) {
  recommendationsByVariantreportID(
    variantreportID: $variantreportID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      text
      variantreportID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RecommendationsByVariantreportIDQueryVariables,
  APITypes.RecommendationsByVariantreportIDQuery
>;
export const getVariantReport = /* GraphQL */ `query GetVariantReport($id: ID!) {
  getVariantReport(id: $id) {
    id
    status
    create_at
    isApproved
    medical_history
    current_diagnosis
    userID
    download_link_report
    institutionID
    Recommendations {
      nextToken
      __typename
    }
    GeneticsConselors {
      nextToken
      __typename
    }
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
      create_at
      isApproved
      medical_history
      current_diagnosis
      userID
      download_link_report
      institutionID
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
export const variantReportsByUserID = /* GraphQL */ `query VariantReportsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelVariantReportFilterInput
  $limit: Int
  $nextToken: String
) {
  variantReportsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      create_at
      isApproved
      medical_history
      current_diagnosis
      userID
      download_link_report
      institutionID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VariantReportsByUserIDQueryVariables,
  APITypes.VariantReportsByUserIDQuery
>;
export const variantReportsByInstitutionID = /* GraphQL */ `query VariantReportsByInstitutionID(
  $institutionID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelVariantReportFilterInput
  $limit: Int
  $nextToken: String
) {
  variantReportsByInstitutionID(
    institutionID: $institutionID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      create_at
      isApproved
      medical_history
      current_diagnosis
      userID
      download_link_report
      institutionID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.VariantReportsByInstitutionIDQueryVariables,
  APITypes.VariantReportsByInstitutionIDQuery
>;
export const getPatientDocuments = /* GraphQL */ `query GetPatientDocuments($id: ID!) {
  getPatientDocuments(id: $id) {
    id
    name
    patientID
    size
    link
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
      patientID
      size
      link
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
export const patientDocumentsByPatientID = /* GraphQL */ `query PatientDocumentsByPatientID(
  $patientID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPatientDocumentsFilterInput
  $limit: Int
  $nextToken: String
) {
  patientDocumentsByPatientID(
    patientID: $patientID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      patientID
      size
      link
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PatientDocumentsByPatientIDQueryVariables,
  APITypes.PatientDocumentsByPatientIDQuery
>;
export const getPatient = /* GraphQL */ `query GetPatient($id: ID!) {
  getPatient(id: $id) {
    id
    name
    sex
    phone_number
    dob
    institutionID
    PatientDokuments {
      nextToken
      __typename
    }
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
      institutionID
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
export const patientsByInstitutionID = /* GraphQL */ `query PatientsByInstitutionID(
  $institutionID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
) {
  patientsByInstitutionID(
    institutionID: $institutionID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      sex
      phone_number
      dob
      institutionID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PatientsByInstitutionIDQueryVariables,
  APITypes.PatientsByInstitutionIDQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    institutionID
    role_type
    email
    category
    specialty
    VariantReports {
      nextToken
      __typename
    }
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
      name
      institutionID
      role_type
      email
      category
      specialty
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const usersByInstitutionID = /* GraphQL */ `query UsersByInstitutionID(
  $institutionID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByInstitutionID(
    institutionID: $institutionID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      institutionID
      role_type
      email
      category
      specialty
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByInstitutionIDQueryVariables,
  APITypes.UsersByInstitutionIDQuery
>;
export const getInstitution = /* GraphQL */ `query GetInstitution($id: ID!) {
  getInstitution(id: $id) {
    id
    name
    contact
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
      contact
      address
      subscription_type
      email
      userQuotas
      currentUserQuota
      storageQuota
      registrationDate
      accountStatus
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
