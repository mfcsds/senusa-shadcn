/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUserNotifications = /* GraphQL */ `mutation CreateUserNotifications(
  $input: CreateUserNotificationsInput!
  $condition: ModelUserNotificationsConditionInput
) {
  createUserNotifications(input: $input, condition: $condition) {
    id
    user_id
    institutionID
    message
    id_fromuser
    id_report
    markasread
    id_patient
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserNotificationsMutationVariables,
  APITypes.CreateUserNotificationsMutation
>;
export const updateUserNotifications = /* GraphQL */ `mutation UpdateUserNotifications(
  $input: UpdateUserNotificationsInput!
  $condition: ModelUserNotificationsConditionInput
) {
  updateUserNotifications(input: $input, condition: $condition) {
    id
    user_id
    institutionID
    message
    id_fromuser
    id_report
    markasread
    id_patient
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserNotificationsMutationVariables,
  APITypes.UpdateUserNotificationsMutation
>;
export const deleteUserNotifications = /* GraphQL */ `mutation DeleteUserNotifications(
  $input: DeleteUserNotificationsInput!
  $condition: ModelUserNotificationsConditionInput
) {
  deleteUserNotifications(input: $input, condition: $condition) {
    id
    user_id
    institutionID
    message
    id_fromuser
    id_report
    markasread
    id_patient
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserNotificationsMutationVariables,
  APITypes.DeleteUserNotificationsMutation
>;
export const createPatientHistoryDisease = /* GraphQL */ `mutation CreatePatientHistoryDisease(
  $input: CreatePatientHistoryDiseaseInput!
  $condition: ModelPatientHistoryDiseaseConditionInput
) {
  createPatientHistoryDisease(input: $input, condition: $condition) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePatientHistoryDiseaseMutationVariables,
  APITypes.CreatePatientHistoryDiseaseMutation
>;
export const updatePatientHistoryDisease = /* GraphQL */ `mutation UpdatePatientHistoryDisease(
  $input: UpdatePatientHistoryDiseaseInput!
  $condition: ModelPatientHistoryDiseaseConditionInput
) {
  updatePatientHistoryDisease(input: $input, condition: $condition) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePatientHistoryDiseaseMutationVariables,
  APITypes.UpdatePatientHistoryDiseaseMutation
>;
export const deletePatientHistoryDisease = /* GraphQL */ `mutation DeletePatientHistoryDisease(
  $input: DeletePatientHistoryDiseaseInput!
  $condition: ModelPatientHistoryDiseaseConditionInput
) {
  deletePatientHistoryDisease(input: $input, condition: $condition) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePatientHistoryDiseaseMutationVariables,
  APITypes.DeletePatientHistoryDiseaseMutation
>;
export const createAcmgAnnotation = /* GraphQL */ `mutation CreateAcmgAnnotation(
  $input: CreateAcmgAnnotationInput!
  $condition: ModelAcmgAnnotationConditionInput
) {
  createAcmgAnnotation(input: $input, condition: $condition) {
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
    acmg_class
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAcmgAnnotationMutationVariables,
  APITypes.CreateAcmgAnnotationMutation
>;
export const updateAcmgAnnotation = /* GraphQL */ `mutation UpdateAcmgAnnotation(
  $input: UpdateAcmgAnnotationInput!
  $condition: ModelAcmgAnnotationConditionInput
) {
  updateAcmgAnnotation(input: $input, condition: $condition) {
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
    acmg_class
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAcmgAnnotationMutationVariables,
  APITypes.UpdateAcmgAnnotationMutation
>;
export const deleteAcmgAnnotation = /* GraphQL */ `mutation DeleteAcmgAnnotation(
  $input: DeleteAcmgAnnotationInput!
  $condition: ModelAcmgAnnotationConditionInput
) {
  deleteAcmgAnnotation(input: $input, condition: $condition) {
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
    acmg_class
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAcmgAnnotationMutationVariables,
  APITypes.DeleteAcmgAnnotationMutation
>;
export const createFamilyHistoryDisease = /* GraphQL */ `mutation CreateFamilyHistoryDisease(
  $input: CreateFamilyHistoryDiseaseInput!
  $condition: ModelFamilyHistoryDiseaseConditionInput
) {
  createFamilyHistoryDisease(input: $input, condition: $condition) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFamilyHistoryDiseaseMutationVariables,
  APITypes.CreateFamilyHistoryDiseaseMutation
>;
export const updateFamilyHistoryDisease = /* GraphQL */ `mutation UpdateFamilyHistoryDisease(
  $input: UpdateFamilyHistoryDiseaseInput!
  $condition: ModelFamilyHistoryDiseaseConditionInput
) {
  updateFamilyHistoryDisease(input: $input, condition: $condition) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFamilyHistoryDiseaseMutationVariables,
  APITypes.UpdateFamilyHistoryDiseaseMutation
>;
export const deleteFamilyHistoryDisease = /* GraphQL */ `mutation DeleteFamilyHistoryDisease(
  $input: DeleteFamilyHistoryDiseaseInput!
  $condition: ModelFamilyHistoryDiseaseConditionInput
) {
  deleteFamilyHistoryDisease(input: $input, condition: $condition) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFamilyHistoryDiseaseMutationVariables,
  APITypes.DeleteFamilyHistoryDiseaseMutation
>;
export const createVariantInterpretation = /* GraphQL */ `mutation CreateVariantInterpretation(
  $input: CreateVariantInterpretationInput!
  $condition: ModelVariantInterpretationConditionInput
) {
  createVariantInterpretation(input: $input, condition: $condition) {
    id
    hgvs
    text
    id_patient
    id_report
    id_varsample
    alldesc
    gene_symbol
    gene_id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateVariantInterpretationMutationVariables,
  APITypes.CreateVariantInterpretationMutation
>;
export const updateVariantInterpretation = /* GraphQL */ `mutation UpdateVariantInterpretation(
  $input: UpdateVariantInterpretationInput!
  $condition: ModelVariantInterpretationConditionInput
) {
  updateVariantInterpretation(input: $input, condition: $condition) {
    id
    hgvs
    text
    id_patient
    id_report
    id_varsample
    alldesc
    gene_symbol
    gene_id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateVariantInterpretationMutationVariables,
  APITypes.UpdateVariantInterpretationMutation
>;
export const deleteVariantInterpretation = /* GraphQL */ `mutation DeleteVariantInterpretation(
  $input: DeleteVariantInterpretationInput!
  $condition: ModelVariantInterpretationConditionInput
) {
  deleteVariantInterpretation(input: $input, condition: $condition) {
    id
    hgvs
    text
    id_patient
    id_report
    id_varsample
    alldesc
    gene_symbol
    gene_id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteVariantInterpretationMutationVariables,
  APITypes.DeleteVariantInterpretationMutation
>;
export const createSelectedVariant = /* GraphQL */ `mutation CreateSelectedVariant(
  $input: CreateSelectedVariantInput!
  $condition: ModelSelectedVariantConditionInput
) {
  createSelectedVariant(input: $input, condition: $condition) {
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
    ac
    af
    an
    dp
    fs
    mq
    mqranksum
    qd
    readposrank
    sor
    fraction
    zygosity
    text_interpretation
    id_variant
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSelectedVariantMutationVariables,
  APITypes.CreateSelectedVariantMutation
>;
export const updateSelectedVariant = /* GraphQL */ `mutation UpdateSelectedVariant(
  $input: UpdateSelectedVariantInput!
  $condition: ModelSelectedVariantConditionInput
) {
  updateSelectedVariant(input: $input, condition: $condition) {
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
    ac
    af
    an
    dp
    fs
    mq
    mqranksum
    qd
    readposrank
    sor
    fraction
    zygosity
    text_interpretation
    id_variant
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSelectedVariantMutationVariables,
  APITypes.UpdateSelectedVariantMutation
>;
export const deleteSelectedVariant = /* GraphQL */ `mutation DeleteSelectedVariant(
  $input: DeleteSelectedVariantInput!
  $condition: ModelSelectedVariantConditionInput
) {
  deleteSelectedVariant(input: $input, condition: $condition) {
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
    ac
    af
    an
    dp
    fs
    mq
    mqranksum
    qd
    readposrank
    sor
    fraction
    zygosity
    text_interpretation
    id_variant
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSelectedVariantMutationVariables,
  APITypes.DeleteSelectedVariantMutation
>;
export const createVcfdata = /* GraphQL */ `mutation CreateVcfdata(
  $input: CreateVcfdataInput!
  $condition: ModelVcfdataConditionInput
) {
  createVcfdata(input: $input, condition: $condition) {
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
    pathfile
    genome_reference
    number_variant
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
    pathfile
    genome_reference
    number_variant
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
    acmg
    ac
    af
    an
    dp
    fs
    mq
    mqranksum
    qd
    readposrank
    sor
    fraction
    zygosity
    gene_id
    gene_symbol
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
    acmg
    ac
    af
    an
    dp
    fs
    mq
    mqranksum
    qd
    readposrank
    sor
    fraction
    zygosity
    gene_id
    gene_symbol
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
    acmg
    ac
    af
    an
    dp
    fs
    mq
    mqranksum
    qd
    readposrank
    sor
    fraction
    zygosity
    gene_id
    gene_symbol
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
    id_patient
    id_report
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
    id_patient
    id_report
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
    id_patient
    id_report
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
    id_patient
    id_report
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
    id_patient
    id_report
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
    id_patient
    id_report
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
    testing_description
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
    testing_description
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
    testing_description
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
    pathfile
    doctype
    id_patient
    id_report
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
    pathfile
    doctype
    id_patient
    id_report
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
    pathfile
    doctype
    id_patient
    id_report
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
    id_reference
    id_institution
    health_desc
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
    id_reference
    id_institution
    health_desc
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
    id_reference
    id_institution
    health_desc
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
