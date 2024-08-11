/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

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
    Category
    Specialty
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
      Category
      Specialty
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
      Category
      Specialty
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
