/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateGeneticsConselor = /* GraphQL */ `subscription OnCreateGeneticsConselor(
  $filter: ModelSubscriptionGeneticsConselorFilterInput
) {
  onCreateGeneticsConselor(filter: $filter) {
    id
    text
    variantreportID
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
    variantreportID
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
    variantreportID
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
    variantreportID
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
    variantreportID
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
    variantreportID
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
    VariantReports {
      nextToken
      __typename
    }
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
    VariantReports {
      nextToken
      __typename
    }
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
    VariantReports {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteInstitutionSubscriptionVariables,
  APITypes.OnDeleteInstitutionSubscription
>;
