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
export declare type PatientDocumentsCreateFormInputValues = {
    name?: string;
    pathfile?: string;
    doctype?: string;
    id_patient?: string;
    id_report?: string;
};
export declare type PatientDocumentsCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    pathfile?: ValidationFunction<string>;
    doctype?: ValidationFunction<string>;
    id_patient?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientDocumentsCreateFormOverridesProps = {
    PatientDocumentsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    pathfile?: PrimitiveOverrideProps<TextFieldProps>;
    doctype?: PrimitiveOverrideProps<TextFieldProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientDocumentsCreateFormProps = React.PropsWithChildren<{
    overrides?: PatientDocumentsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PatientDocumentsCreateFormInputValues) => PatientDocumentsCreateFormInputValues;
    onSuccess?: (fields: PatientDocumentsCreateFormInputValues) => void;
    onError?: (fields: PatientDocumentsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientDocumentsCreateFormInputValues) => PatientDocumentsCreateFormInputValues;
    onValidate?: PatientDocumentsCreateFormValidationValues;
} & React.CSSProperties>;
export default function PatientDocumentsCreateForm(props: PatientDocumentsCreateFormProps): React.ReactElement;
