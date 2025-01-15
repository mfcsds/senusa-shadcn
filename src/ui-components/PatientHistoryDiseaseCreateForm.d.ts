/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PatientHistoryDiseaseCreateFormInputValues = {
    id_patient?: string;
    hpo_code?: string;
    hpo_desc?: string;
};
export declare type PatientHistoryDiseaseCreateFormValidationValues = {
    id_patient?: ValidationFunction<string>;
    hpo_code?: ValidationFunction<string>;
    hpo_desc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientHistoryDiseaseCreateFormOverridesProps = {
    PatientHistoryDiseaseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_code?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_desc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientHistoryDiseaseCreateFormProps = React.PropsWithChildren<{
    overrides?: PatientHistoryDiseaseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PatientHistoryDiseaseCreateFormInputValues) => PatientHistoryDiseaseCreateFormInputValues;
    onSuccess?: (fields: PatientHistoryDiseaseCreateFormInputValues) => void;
    onError?: (fields: PatientHistoryDiseaseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientHistoryDiseaseCreateFormInputValues) => PatientHistoryDiseaseCreateFormInputValues;
    onValidate?: PatientHistoryDiseaseCreateFormValidationValues;
} & React.CSSProperties>;
export default function PatientHistoryDiseaseCreateForm(props: PatientHistoryDiseaseCreateFormProps): React.ReactElement;
