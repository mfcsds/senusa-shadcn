/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createVcfdata = /* GraphQL */ `mutation CreateVcfdata(
  $input: CreateVcfdataInput!
  $condition: ModelVcfdataConditionInput
) {
  createVcfdata(input: $input, condition: $condition) {
    id
    id_patient
    sample_date
    uploadAt
    public_link
    genome_reference
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateVcfdataMutationVariables,
  APITypes.CreateVcfdataMutation
>;
export const updateVcfdata = /* GraphQL */ `mutation UpdateVcfdata(
  $input: UpdateVcfdataInput!
  $condition: ModelVcfdataConditionInput
) {
  updateVcfdata(input: $input, condition: $condition) {
    id
    id_patient
    sample_date
    uploadAt
    public_link
    genome_reference
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateVcfdataMutationVariables,
  APITypes.UpdateVcfdataMutation
>;
export const deleteVcfdata = /* GraphQL */ `mutation DeleteVcfdata(
  $input: DeleteVcfdataInput!
  $condition: ModelVcfdataConditionInput
) {
  deleteVcfdata(input: $input, condition: $condition) {
    id
    id_patient
    sample_date
    uploadAt
    public_link
    genome_reference
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteVcfdataMutationVariables,
  APITypes.DeleteVcfdataMutation
>;
export const createVariant = /* GraphQL */ `mutation CreateVariant(
  $input: CreateVariantInput!
  $condition: ModelVariantConditionInput
) {
  createVariant(input: $input, condition: $condition) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateVariantMutationVariables,
  APITypes.CreateVariantMutation
>;
export const updateVariant = /* GraphQL */ `mutation UpdateVariant(
  $input: UpdateVariantInput!
  $condition: ModelVariantConditionInput
) {
  updateVariant(input: $input, condition: $condition) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateVariantMutationVariables,
  APITypes.UpdateVariantMutation
>;
export const deleteVariant = /* GraphQL */ `mutation DeleteVariant(
  $input: DeleteVariantInput!
  $condition: ModelVariantConditionInput
) {
  deleteVariant(input: $input, condition: $condition) {
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
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteVariantMutationVariables,
  APITypes.DeleteVariantMutation
>;
export const createGeneticsConselor = /* GraphQL */ `mutation CreateGeneticsConselor(
  $input: CreateGeneticsConselorInput!
  $condition: ModelGeneticsConselorConditionInput
) {
  createGeneticsConselor(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateGeneticsConselorMutationVariables,
  APITypes.CreateGeneticsConselorMutation
>;
export const updateGeneticsConselor = /* GraphQL */ `mutation UpdateGeneticsConselor(
  $input: UpdateGeneticsConselorInput!
  $condition: ModelGeneticsConselorConditionInput
) {
  updateGeneticsConselor(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateGeneticsConselorMutationVariables,
  APITypes.UpdateGeneticsConselorMutation
>;
export const deleteGeneticsConselor = /* GraphQL */ `mutation DeleteGeneticsConselor(
  $input: DeleteGeneticsConselorInput!
  $condition: ModelGeneticsConselorConditionInput
) {
  deleteGeneticsConselor(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteGeneticsConselorMutationVariables,
  APITypes.DeleteGeneticsConselorMutation
>;
export const createPhenotype = /* GraphQL */ `mutation CreatePhenotype(
  $input: CreatePhenotypeInput!
  $condition: ModelPhenotypeConditionInput
) {
  createPhenotype(input: $input, condition: $condition) {
    id
    PhenotypeCode
    Description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePhenotypeMutationVariables,
  APITypes.CreatePhenotypeMutation
>;
export const updatePhenotype = /* GraphQL */ `mutation UpdatePhenotype(
  $input: UpdatePhenotypeInput!
  $condition: ModelPhenotypeConditionInput
) {
  updatePhenotype(input: $input, condition: $condition) {
    id
    PhenotypeCode
    Description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePhenotypeMutationVariables,
  APITypes.UpdatePhenotypeMutation
>;
export const deletePhenotype = /* GraphQL */ `mutation DeletePhenotype(
  $input: DeletePhenotypeInput!
  $condition: ModelPhenotypeConditionInput
) {
  deletePhenotype(input: $input, condition: $condition) {
    id
    PhenotypeCode
    Description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePhenotypeMutationVariables,
  APITypes.DeletePhenotypeMutation
>;
export const createConclusion = /* GraphQL */ `mutation CreateConclusion(
  $input: CreateConclusionInput!
  $condition: ModelConclusionConditionInput
) {
  createConclusion(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateConclusionMutationVariables,
  APITypes.CreateConclusionMutation
>;
export const updateConclusion = /* GraphQL */ `mutation UpdateConclusion(
  $input: UpdateConclusionInput!
  $condition: ModelConclusionConditionInput
) {
  updateConclusion(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateConclusionMutationVariables,
  APITypes.UpdateConclusionMutation
>;
export const deleteConclusion = /* GraphQL */ `mutation DeleteConclusion(
  $input: DeleteConclusionInput!
  $condition: ModelConclusionConditionInput
) {
  deleteConclusion(input: $input, condition: $condition) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteConclusionMutationVariables,
  APITypes.DeleteConclusionMutation
>;
export const createRecommendation = /* GraphQL */ `mutation CreateRecommendation(
  $input: CreateRecommendationInput!
  $condition: ModelRecommendationConditionInput
) {
  createRecommendation(input: $input, condition: $condition) {
    id
    text
    variantreportID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRecommendationMutationVariables,
  APITypes.CreateRecommendationMutation
>;
export const updateRecommendation = /* GraphQL */ `mutation UpdateRecommendation(
  $input: UpdateRecommendationInput!
  $condition: ModelRecommendationConditionInput
) {
  updateRecommendation(input: $input, condition: $condition) {
    id
    text
    variantreportID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRecommendationMutationVariables,
  APITypes.UpdateRecommendationMutation
>;
export const deleteRecommendation = /* GraphQL */ `mutation DeleteRecommendation(
  $input: DeleteRecommendationInput!
  $condition: ModelRecommendationConditionInput
) {
  deleteRecommendation(input: $input, condition: $condition) {
    id
    text
    variantreportID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRecommendationMutationVariables,
  APITypes.DeleteRecommendationMutation
>;
export const createVariantReport = /* GraphQL */ `mutation CreateVariantReport(
  $input: CreateVariantReportInput!
  $condition: ModelVariantReportConditionInput
) {
  createVariantReport(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVariantReportMutationVariables,
  APITypes.CreateVariantReportMutation
>;
export const updateVariantReport = /* GraphQL */ `mutation UpdateVariantReport(
  $input: UpdateVariantReportInput!
  $condition: ModelVariantReportConditionInput
) {
  updateVariantReport(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVariantReportMutationVariables,
  APITypes.UpdateVariantReportMutation
>;
export const deleteVariantReport = /* GraphQL */ `mutation DeleteVariantReport(
  $input: DeleteVariantReportInput!
  $condition: ModelVariantReportConditionInput
) {
  deleteVariantReport(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVariantReportMutationVariables,
  APITypes.DeleteVariantReportMutation
>;
export const createPatientDocuments = /* GraphQL */ `mutation CreatePatientDocuments(
  $input: CreatePatientDocumentsInput!
  $condition: ModelPatientDocumentsConditionInput
) {
  createPatientDocuments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePatientDocumentsMutationVariables,
  APITypes.CreatePatientDocumentsMutation
>;
export const updatePatientDocuments = /* GraphQL */ `mutation UpdatePatientDocuments(
  $input: UpdatePatientDocumentsInput!
  $condition: ModelPatientDocumentsConditionInput
) {
  updatePatientDocuments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePatientDocumentsMutationVariables,
  APITypes.UpdatePatientDocumentsMutation
>;
export const deletePatientDocuments = /* GraphQL */ `mutation DeletePatientDocuments(
  $input: DeletePatientDocumentsInput!
  $condition: ModelPatientDocumentsConditionInput
) {
  deletePatientDocuments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePatientDocumentsMutationVariables,
  APITypes.DeletePatientDocumentsMutation
>;
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
    PatientDokuments {
      nextToken
      __typename
    }
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
    PatientDokuments {
      nextToken
      __typename
    }
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
    PatientDokuments {
      nextToken
      __typename
    }
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
` as GeneratedMutation<
  APITypes.DeleteInstitutionMutationVariables,
  APITypes.DeleteInstitutionMutation
>;
