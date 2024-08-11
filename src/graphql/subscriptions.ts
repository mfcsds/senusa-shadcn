/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePatientDocuments = /* GraphQL */ `subscription OnCreatePatientDocuments(
  $filter: ModelSubscriptionPatientDocumentsFilterInput
) {
  onCreatePatientDocuments(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePatientDocumentsSubscriptionVariables,
  APITypes.OnCreatePatientDocumentsSubscription
>;
export const onUpdatePatientDocuments = /* GraphQL */ `subscription OnUpdatePatientDocuments(
  $filter: ModelSubscriptionPatientDocumentsFilterInput
) {
  onUpdatePatientDocuments(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePatientDocumentsSubscriptionVariables,
  APITypes.OnUpdatePatientDocumentsSubscription
>;
export const onDeletePatientDocuments = /* GraphQL */ `subscription OnDeletePatientDocuments(
  $filter: ModelSubscriptionPatientDocumentsFilterInput
) {
  onDeletePatientDocuments(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePatientDocumentsSubscriptionVariables,
  APITypes.OnDeletePatientDocumentsSubscription
>;
export const onCreatePatient = /* GraphQL */ `subscription OnCreatePatient($filter: ModelSubscriptionPatientFilterInput) {
  onCreatePatient(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePatientSubscriptionVariables,
  APITypes.OnCreatePatientSubscription
>;
export const onUpdatePatient = /* GraphQL */ `subscription OnUpdatePatient($filter: ModelSubscriptionPatientFilterInput) {
  onUpdatePatient(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePatientSubscriptionVariables,
  APITypes.OnUpdatePatientSubscription
>;
export const onDeletePatient = /* GraphQL */ `subscription OnDeletePatient($filter: ModelSubscriptionPatientFilterInput) {
  onDeletePatient(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePatientSubscriptionVariables,
  APITypes.OnDeletePatientSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateInstitution = /* GraphQL */ `subscription OnCreateInstitution(
  $filter: ModelSubscriptionInstitutionFilterInput
) {
  onCreateInstitution(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInstitutionSubscriptionVariables,
  APITypes.OnCreateInstitutionSubscription
>;
export const onUpdateInstitution = /* GraphQL */ `subscription OnUpdateInstitution(
  $filter: ModelSubscriptionInstitutionFilterInput
) {
  onUpdateInstitution(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInstitutionSubscriptionVariables,
  APITypes.OnUpdateInstitutionSubscription
>;
export const onDeleteInstitution = /* GraphQL */ `subscription OnDeleteInstitution(
  $filter: ModelSubscriptionInstitutionFilterInput
) {
  onDeleteInstitution(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInstitutionSubscriptionVariables,
  APITypes.OnDeleteInstitutionSubscription
>;
