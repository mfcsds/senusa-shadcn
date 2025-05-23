/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateRole = /* GraphQL */ `subscription OnCreateRole($filter: ModelSubscriptionRoleFilterInput) {
  onCreateRole(filter: $filter) {
    id
    name
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRoleSubscriptionVariables,
  APITypes.OnCreateRoleSubscription
>;
export const onUpdateRole = /* GraphQL */ `subscription OnUpdateRole($filter: ModelSubscriptionRoleFilterInput) {
  onUpdateRole(filter: $filter) {
    id
    name
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRoleSubscriptionVariables,
  APITypes.OnUpdateRoleSubscription
>;
export const onDeleteRole = /* GraphQL */ `subscription OnDeleteRole($filter: ModelSubscriptionRoleFilterInput) {
  onDeleteRole(filter: $filter) {
    id
    name
    userID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRoleSubscriptionVariables,
  APITypes.OnDeleteRoleSubscription
>;
export const onCreateUserNotifications = /* GraphQL */ `subscription OnCreateUserNotifications(
  $filter: ModelSubscriptionUserNotificationsFilterInput
) {
  onCreateUserNotifications(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserNotificationsSubscriptionVariables,
  APITypes.OnCreateUserNotificationsSubscription
>;
export const onUpdateUserNotifications = /* GraphQL */ `subscription OnUpdateUserNotifications(
  $filter: ModelSubscriptionUserNotificationsFilterInput
) {
  onUpdateUserNotifications(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserNotificationsSubscriptionVariables,
  APITypes.OnUpdateUserNotificationsSubscription
>;
export const onDeleteUserNotifications = /* GraphQL */ `subscription OnDeleteUserNotifications(
  $filter: ModelSubscriptionUserNotificationsFilterInput
) {
  onDeleteUserNotifications(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserNotificationsSubscriptionVariables,
  APITypes.OnDeleteUserNotificationsSubscription
>;
export const onCreatePatientHistoryDisease = /* GraphQL */ `subscription OnCreatePatientHistoryDisease(
  $filter: ModelSubscriptionPatientHistoryDiseaseFilterInput
) {
  onCreatePatientHistoryDisease(filter: $filter) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePatientHistoryDiseaseSubscriptionVariables,
  APITypes.OnCreatePatientHistoryDiseaseSubscription
>;
export const onUpdatePatientHistoryDisease = /* GraphQL */ `subscription OnUpdatePatientHistoryDisease(
  $filter: ModelSubscriptionPatientHistoryDiseaseFilterInput
) {
  onUpdatePatientHistoryDisease(filter: $filter) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePatientHistoryDiseaseSubscriptionVariables,
  APITypes.OnUpdatePatientHistoryDiseaseSubscription
>;
export const onDeletePatientHistoryDisease = /* GraphQL */ `subscription OnDeletePatientHistoryDisease(
  $filter: ModelSubscriptionPatientHistoryDiseaseFilterInput
) {
  onDeletePatientHistoryDisease(filter: $filter) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePatientHistoryDiseaseSubscriptionVariables,
  APITypes.OnDeletePatientHistoryDiseaseSubscription
>;
export const onCreateAcmgAnnotation = /* GraphQL */ `subscription OnCreateAcmgAnnotation(
  $filter: ModelSubscriptionAcmgAnnotationFilterInput
) {
  onCreateAcmgAnnotation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAcmgAnnotationSubscriptionVariables,
  APITypes.OnCreateAcmgAnnotationSubscription
>;
export const onUpdateAcmgAnnotation = /* GraphQL */ `subscription OnUpdateAcmgAnnotation(
  $filter: ModelSubscriptionAcmgAnnotationFilterInput
) {
  onUpdateAcmgAnnotation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAcmgAnnotationSubscriptionVariables,
  APITypes.OnUpdateAcmgAnnotationSubscription
>;
export const onDeleteAcmgAnnotation = /* GraphQL */ `subscription OnDeleteAcmgAnnotation(
  $filter: ModelSubscriptionAcmgAnnotationFilterInput
) {
  onDeleteAcmgAnnotation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAcmgAnnotationSubscriptionVariables,
  APITypes.OnDeleteAcmgAnnotationSubscription
>;
export const onCreateFamilyHistoryDisease = /* GraphQL */ `subscription OnCreateFamilyHistoryDisease(
  $filter: ModelSubscriptionFamilyHistoryDiseaseFilterInput
) {
  onCreateFamilyHistoryDisease(filter: $filter) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFamilyHistoryDiseaseSubscriptionVariables,
  APITypes.OnCreateFamilyHistoryDiseaseSubscription
>;
export const onUpdateFamilyHistoryDisease = /* GraphQL */ `subscription OnUpdateFamilyHistoryDisease(
  $filter: ModelSubscriptionFamilyHistoryDiseaseFilterInput
) {
  onUpdateFamilyHistoryDisease(filter: $filter) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFamilyHistoryDiseaseSubscriptionVariables,
  APITypes.OnUpdateFamilyHistoryDiseaseSubscription
>;
export const onDeleteFamilyHistoryDisease = /* GraphQL */ `subscription OnDeleteFamilyHistoryDisease(
  $filter: ModelSubscriptionFamilyHistoryDiseaseFilterInput
) {
  onDeleteFamilyHistoryDisease(filter: $filter) {
    id
    id_patient
    hpo_code
    hpo_desc
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFamilyHistoryDiseaseSubscriptionVariables,
  APITypes.OnDeleteFamilyHistoryDiseaseSubscription
>;
export const onCreateVariantInterpretation = /* GraphQL */ `subscription OnCreateVariantInterpretation(
  $filter: ModelSubscriptionVariantInterpretationFilterInput
) {
  onCreateVariantInterpretation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateVariantInterpretationSubscriptionVariables,
  APITypes.OnCreateVariantInterpretationSubscription
>;
export const onUpdateVariantInterpretation = /* GraphQL */ `subscription OnUpdateVariantInterpretation(
  $filter: ModelSubscriptionVariantInterpretationFilterInput
) {
  onUpdateVariantInterpretation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateVariantInterpretationSubscriptionVariables,
  APITypes.OnUpdateVariantInterpretationSubscription
>;
export const onDeleteVariantInterpretation = /* GraphQL */ `subscription OnDeleteVariantInterpretation(
  $filter: ModelSubscriptionVariantInterpretationFilterInput
) {
  onDeleteVariantInterpretation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteVariantInterpretationSubscriptionVariables,
  APITypes.OnDeleteVariantInterpretationSubscription
>;
export const onCreateSelectedVariant = /* GraphQL */ `subscription OnCreateSelectedVariant(
  $filter: ModelSubscriptionSelectedVariantFilterInput
) {
  onCreateSelectedVariant(filter: $filter) {
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
    inheritance
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSelectedVariantSubscriptionVariables,
  APITypes.OnCreateSelectedVariantSubscription
>;
export const onUpdateSelectedVariant = /* GraphQL */ `subscription OnUpdateSelectedVariant(
  $filter: ModelSubscriptionSelectedVariantFilterInput
) {
  onUpdateSelectedVariant(filter: $filter) {
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
    inheritance
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSelectedVariantSubscriptionVariables,
  APITypes.OnUpdateSelectedVariantSubscription
>;
export const onDeleteSelectedVariant = /* GraphQL */ `subscription OnDeleteSelectedVariant(
  $filter: ModelSubscriptionSelectedVariantFilterInput
) {
  onDeleteSelectedVariant(filter: $filter) {
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
    inheritance
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSelectedVariantSubscriptionVariables,
  APITypes.OnDeleteSelectedVariantSubscription
>;
export const onCreateVcfdata = /* GraphQL */ `subscription OnCreateVcfdata($filter: ModelSubscriptionVcfdataFilterInput) {
  onCreateVcfdata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateVcfdataSubscriptionVariables,
  APITypes.OnCreateVcfdataSubscription
>;
export const onUpdateVcfdata = /* GraphQL */ `subscription OnUpdateVcfdata($filter: ModelSubscriptionVcfdataFilterInput) {
  onUpdateVcfdata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateVcfdataSubscriptionVariables,
  APITypes.OnUpdateVcfdataSubscription
>;
export const onDeleteVcfdata = /* GraphQL */ `subscription OnDeleteVcfdata($filter: ModelSubscriptionVcfdataFilterInput) {
  onDeleteVcfdata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteVcfdataSubscriptionVariables,
  APITypes.OnDeleteVcfdataSubscription
>;
export const onCreateVariant = /* GraphQL */ `subscription OnCreateVariant($filter: ModelSubscriptionVariantFilterInput) {
  onCreateVariant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateVariantSubscriptionVariables,
  APITypes.OnCreateVariantSubscription
>;
export const onUpdateVariant = /* GraphQL */ `subscription OnUpdateVariant($filter: ModelSubscriptionVariantFilterInput) {
  onUpdateVariant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateVariantSubscriptionVariables,
  APITypes.OnUpdateVariantSubscription
>;
export const onDeleteVariant = /* GraphQL */ `subscription OnDeleteVariant($filter: ModelSubscriptionVariantFilterInput) {
  onDeleteVariant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteVariantSubscriptionVariables,
  APITypes.OnDeleteVariantSubscription
>;
export const onCreateGeneticsConselor = /* GraphQL */ `subscription OnCreateGeneticsConselor(
  $filter: ModelSubscriptionGeneticsConselorFilterInput
) {
  onCreateGeneticsConselor(filter: $filter) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGeneticsConselorSubscriptionVariables,
  APITypes.OnCreateGeneticsConselorSubscription
>;
export const onUpdateGeneticsConselor = /* GraphQL */ `subscription OnUpdateGeneticsConselor(
  $filter: ModelSubscriptionGeneticsConselorFilterInput
) {
  onUpdateGeneticsConselor(filter: $filter) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGeneticsConselorSubscriptionVariables,
  APITypes.OnUpdateGeneticsConselorSubscription
>;
export const onDeleteGeneticsConselor = /* GraphQL */ `subscription OnDeleteGeneticsConselor(
  $filter: ModelSubscriptionGeneticsConselorFilterInput
) {
  onDeleteGeneticsConselor(filter: $filter) {
    id
    text
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGeneticsConselorSubscriptionVariables,
  APITypes.OnDeleteGeneticsConselorSubscription
>;
export const onCreatePhenotype = /* GraphQL */ `subscription OnCreatePhenotype($filter: ModelSubscriptionPhenotypeFilterInput) {
  onCreatePhenotype(filter: $filter) {
    id
    PhenotypeCode
    Description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePhenotypeSubscriptionVariables,
  APITypes.OnCreatePhenotypeSubscription
>;
export const onUpdatePhenotype = /* GraphQL */ `subscription OnUpdatePhenotype($filter: ModelSubscriptionPhenotypeFilterInput) {
  onUpdatePhenotype(filter: $filter) {
    id
    PhenotypeCode
    Description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePhenotypeSubscriptionVariables,
  APITypes.OnUpdatePhenotypeSubscription
>;
export const onDeletePhenotype = /* GraphQL */ `subscription OnDeletePhenotype($filter: ModelSubscriptionPhenotypeFilterInput) {
  onDeletePhenotype(filter: $filter) {
    id
    PhenotypeCode
    Description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePhenotypeSubscriptionVariables,
  APITypes.OnDeletePhenotypeSubscription
>;
export const onCreateConclusion = /* GraphQL */ `subscription OnCreateConclusion(
  $filter: ModelSubscriptionConclusionFilterInput
) {
  onCreateConclusion(filter: $filter) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateConclusionSubscriptionVariables,
  APITypes.OnCreateConclusionSubscription
>;
export const onUpdateConclusion = /* GraphQL */ `subscription OnUpdateConclusion(
  $filter: ModelSubscriptionConclusionFilterInput
) {
  onUpdateConclusion(filter: $filter) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateConclusionSubscriptionVariables,
  APITypes.OnUpdateConclusionSubscription
>;
export const onDeleteConclusion = /* GraphQL */ `subscription OnDeleteConclusion(
  $filter: ModelSubscriptionConclusionFilterInput
) {
  onDeleteConclusion(filter: $filter) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteConclusionSubscriptionVariables,
  APITypes.OnDeleteConclusionSubscription
>;
export const onCreateRecommendation = /* GraphQL */ `subscription OnCreateRecommendation(
  $filter: ModelSubscriptionRecommendationFilterInput
) {
  onCreateRecommendation(filter: $filter) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRecommendationSubscriptionVariables,
  APITypes.OnCreateRecommendationSubscription
>;
export const onUpdateRecommendation = /* GraphQL */ `subscription OnUpdateRecommendation(
  $filter: ModelSubscriptionRecommendationFilterInput
) {
  onUpdateRecommendation(filter: $filter) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRecommendationSubscriptionVariables,
  APITypes.OnUpdateRecommendationSubscription
>;
export const onDeleteRecommendation = /* GraphQL */ `subscription OnDeleteRecommendation(
  $filter: ModelSubscriptionRecommendationFilterInput
) {
  onDeleteRecommendation(filter: $filter) {
    id
    text
    id_patient
    id_report
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRecommendationSubscriptionVariables,
  APITypes.OnDeleteRecommendationSubscription
>;
export const onCreateVariantReport = /* GraphQL */ `subscription OnCreateVariantReport(
  $filter: ModelSubscriptionVariantReportFilterInput
) {
  onCreateVariantReport(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateVariantReportSubscriptionVariables,
  APITypes.OnCreateVariantReportSubscription
>;
export const onUpdateVariantReport = /* GraphQL */ `subscription OnUpdateVariantReport(
  $filter: ModelSubscriptionVariantReportFilterInput
) {
  onUpdateVariantReport(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateVariantReportSubscriptionVariables,
  APITypes.OnUpdateVariantReportSubscription
>;
export const onDeleteVariantReport = /* GraphQL */ `subscription OnDeleteVariantReport(
  $filter: ModelSubscriptionVariantReportFilterInput
) {
  onDeleteVariantReport(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteVariantReportSubscriptionVariables,
  APITypes.OnDeleteVariantReportSubscription
>;
export const onCreatePatientDocuments = /* GraphQL */ `subscription OnCreatePatientDocuments(
  $filter: ModelSubscriptionPatientDocumentsFilterInput
) {
  onCreatePatientDocuments(filter: $filter) {
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
    pathfile
    doctype
    id_patient
    id_report
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
    pathfile
    doctype
    id_patient
    id_report
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
    id_institution
    health_desc
    id_reference
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
    id_institution
    health_desc
    id_reference
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
    id_institution
    health_desc
    id_reference
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
    Roles {
      nextToken
      __typename
    }
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
    Roles {
      nextToken
      __typename
    }
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
    Roles {
      nextToken
      __typename
    }
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
` as GeneratedSubscription<
  APITypes.OnDeleteInstitutionSubscriptionVariables,
  APITypes.OnDeleteInstitutionSubscription
>;
