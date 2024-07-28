/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createPatient = /* GraphQL */ `mutation CreatePatient(
  $input: CreatePatientInput!
  $condition: ModelPatientConditionInput
) {
  createPatient(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.CreatePatientMutationVariables,
  APITypes.CreatePatientMutation
>;
export const updatePatient = /* GraphQL */ `mutation UpdatePatient(
  $input: UpdatePatientInput!
  $condition: ModelPatientConditionInput
) {
  updatePatient(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.UpdatePatientMutationVariables,
  APITypes.UpdatePatientMutation
>;
export const deletePatient = /* GraphQL */ `mutation DeletePatient(
  $input: DeletePatientInput!
  $condition: ModelPatientConditionInput
) {
  deletePatient(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.DeletePatientMutationVariables,
  APITypes.DeletePatientMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createInstitution = /* GraphQL */ `mutation CreateInstitution(
  $input: CreateInstitutionInput!
  $condition: ModelInstitutionConditionInput
) {
  createInstitution(input: $input, condition: $condition) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInstitutionMutationVariables,
  APITypes.CreateInstitutionMutation
>;
export const updateInstitution = /* GraphQL */ `mutation UpdateInstitution(
  $input: UpdateInstitutionInput!
  $condition: ModelInstitutionConditionInput
) {
  updateInstitution(input: $input, condition: $condition) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInstitutionMutationVariables,
  APITypes.UpdateInstitutionMutation
>;
export const deleteInstitution = /* GraphQL */ `mutation DeleteInstitution(
  $input: DeleteInstitutionInput!
  $condition: ModelInstitutionConditionInput
) {
  deleteInstitution(input: $input, condition: $condition) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInstitutionMutationVariables,
  APITypes.DeleteInstitutionMutation
>;
