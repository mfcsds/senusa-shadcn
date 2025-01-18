/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { PatientHistoryDisease } from "../API.ts";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PatientHistoryDiseaseUpdateFormInputValues = {
    id_patient?: string;
    hpo_code?: string;
    hpo_desc?: string;
};
export declare type PatientHistoryDiseaseUpdateFormValidationValues = {
    id_patient?: ValidationFunction<string>;
    hpo_code?: ValidationFunction<string>;
    hpo_desc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientHistoryDiseaseUpdateFormOverridesProps = {
    PatientHistoryDiseaseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_code?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_desc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientHistoryDiseaseUpdateFormProps = React.PropsWithChildren<{
    overrides?: PatientHistoryDiseaseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    patientHistoryDisease?: PatientHistoryDisease;
    onSubmit?: (fields: PatientHistoryDiseaseUpdateFormInputValues) => PatientHistoryDiseaseUpdateFormInputValues;
    onSuccess?: (fields: PatientHistoryDiseaseUpdateFormInputValues) => void;
    onError?: (fields: PatientHistoryDiseaseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientHistoryDiseaseUpdateFormInputValues) => PatientHistoryDiseaseUpdateFormInputValues;
    onValidate?: PatientHistoryDiseaseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PatientHistoryDiseaseUpdateForm(props: PatientHistoryDiseaseUpdateFormProps): React.ReactElement;
