/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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
  name?: string | null,
  institutionID: string,
  role_type?: number | null,
  email?: string | null,
  Category?: string | null,
  Specialty?: string | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  role_type?: ModelIntInput | null,
  email?: ModelStringInput | null,
  Category?: ModelStringInput | null,
  Specialty?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  institutionID: string,
  role_type?: number | null,
  email?: string | null,
  Category?: string | null,
  Specialty?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  institutionID?: string | null,
  role_type?: number | null,
  email?: string | null,
  Category?: string | null,
  Specialty?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateInstitutionInput = {
  id?: string | null,
  name?: string | null,
  contact?: string | null,
  address?: string | null,
  subscription_type?: string | null,
  email?: string | null,
  userQuotas?: number | null,
  currentUserQuota?: number | null,
  storageQuota?: string | null,
  registrationDate?: string | null,
  accountStatus?: boolean | null,
};

export type ModelInstitutionConditionInput = {
  name?: ModelStringInput | null,
  contact?: ModelStringInput | null,
  address?: ModelStringInput | null,
  subscription_type?: ModelStringInput | null,
  email?: ModelStringInput | null,
  userQuotas?: ModelIntInput | null,
  currentUserQuota?: ModelIntInput | null,
  storageQuota?: ModelStringInput | null,
  registrationDate?: ModelStringInput | null,
  accountStatus?: ModelBooleanInput | null,
  and?: Array< ModelInstitutionConditionInput | null > | null,
  or?: Array< ModelInstitutionConditionInput | null > | null,
  not?: ModelInstitutionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Institution = {
  __typename: "Institution",
  id: string,
  name?: string | null,
  contact?: string | null,
  address?: string | null,
  subscription_type?: string | null,
  email?: string | null,
  Users?: ModelUserConnection | null,
  Patients?: ModelPatientConnection | null,
  userQuotas?: number | null,
  currentUserQuota?: number | null,
  storageQuota?: string | null,
  registrationDate?: string | null,
  accountStatus?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPatientConnection = {
  __typename: "ModelPatientConnection",
  items:  Array<Patient | null >,
  nextToken?: string | null,
};

export type UpdateInstitutionInput = {
  id: string,
  name?: string | null,
  contact?: string | null,
  address?: string | null,
  subscription_type?: string | null,
  email?: string | null,
  userQuotas?: number | null,
  currentUserQuota?: number | null,
  storageQuota?: string | null,
  registrationDate?: string | null,
  accountStatus?: boolean | null,
};

export type DeleteInstitutionInput = {
  id: string,
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


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
  name?: ModelStringInput | null,
  institutionID?: ModelIDInput | null,
  role_type?: ModelIntInput | null,
  email?: ModelStringInput | null,
  Category?: ModelStringInput | null,
  Specialty?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelInstitutionFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  contact?: ModelStringInput | null,
  address?: ModelStringInput | null,
  subscription_type?: ModelStringInput | null,
  email?: ModelStringInput | null,
  userQuotas?: ModelIntInput | null,
  currentUserQuota?: ModelIntInput | null,
  storageQuota?: ModelStringInput | null,
  registrationDate?: ModelStringInput | null,
  accountStatus?: ModelBooleanInput | null,
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
  name?: ModelSubscriptionStringInput | null,
  institutionID?: ModelSubscriptionIDInput | null,
  role_type?: ModelSubscriptionIntInput | null,
  email?: ModelSubscriptionStringInput | null,
  Category?: ModelSubscriptionStringInput | null,
  Specialty?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionInstitutionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  contact?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  subscription_type?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  userQuotas?: ModelSubscriptionIntInput | null,
  currentUserQuota?: ModelSubscriptionIntInput | null,
  storageQuota?: ModelSubscriptionStringInput | null,
  registrationDate?: ModelSubscriptionStringInput | null,
  accountStatus?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInstitutionFilterInput | null > | null,
  or?: Array< ModelSubscriptionInstitutionFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
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
    name?: string | null,
    institutionID: string,
    role_type?: number | null,
    email?: string | null,
    Category?: string | null,
    Specialty?: string | null,
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
    name?: string | null,
    institutionID: string,
    role_type?: number | null,
    email?: string | null,
    Category?: string | null,
    Specialty?: string | null,
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
    name?: string | null,
    institutionID: string,
    role_type?: number | null,
    email?: string | null,
    Category?: string | null,
    Specialty?: string | null,
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
    contact?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: string | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
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
    contact?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: string | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
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
    contact?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: string | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    createdAt: string,
    updatedAt: string,
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

export type PatientDocumentsByPatientIDQueryVariables = {
  patientID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPatientDocumentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PatientDocumentsByPatientIDQuery = {
  patientDocumentsByPatientID?:  {
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

export type PatientsByInstitutionIDQueryVariables = {
  institutionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPatientFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PatientsByInstitutionIDQuery = {
  patientsByInstitutionID?:  {
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
    name?: string | null,
    institutionID: string,
    role_type?: number | null,
    email?: string | null,
    Category?: string | null,
    Specialty?: string | null,
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
      name?: string | null,
      institutionID: string,
      role_type?: number | null,
      email?: string | null,
      Category?: string | null,
      Specialty?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UsersByInstitutionIDQueryVariables = {
  institutionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByInstitutionIDQuery = {
  usersByInstitutionID?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      institutionID: string,
      role_type?: number | null,
      email?: string | null,
      Category?: string | null,
      Specialty?: string | null,
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
    contact?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: string | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
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
      contact?: string | null,
      address?: string | null,
      subscription_type?: string | null,
      email?: string | null,
      userQuotas?: number | null,
      currentUserQuota?: number | null,
      storageQuota?: string | null,
      registrationDate?: string | null,
      accountStatus?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
    name?: string | null,
    institutionID: string,
    role_type?: number | null,
    email?: string | null,
    Category?: string | null,
    Specialty?: string | null,
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
    name?: string | null,
    institutionID: string,
    role_type?: number | null,
    email?: string | null,
    Category?: string | null,
    Specialty?: string | null,
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
    name?: string | null,
    institutionID: string,
    role_type?: number | null,
    email?: string | null,
    Category?: string | null,
    Specialty?: string | null,
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
    contact?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: string | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
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
    contact?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: string | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
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
    contact?: string | null,
    address?: string | null,
    subscription_type?: string | null,
    email?: string | null,
    Users?:  {
      __typename: "ModelUserConnection",
      nextToken?: string | null,
    } | null,
    Patients?:  {
      __typename: "ModelPatientConnection",
      nextToken?: string | null,
    } | null,
    userQuotas?: number | null,
    currentUserQuota?: number | null,
    storageQuota?: string | null,
    registrationDate?: string | null,
    accountStatus?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
