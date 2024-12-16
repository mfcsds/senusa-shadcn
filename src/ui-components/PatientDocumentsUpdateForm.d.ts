/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { PatientDocuments } from "../API.ts";
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
export declare type PatientDocumentsUpdateFormInputValues = {
    name?: string;
    pathfile?: string;
    doctype?: string;
    id_patient?: string;
    id_report?: string;
};
export declare type PatientDocumentsUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    pathfile?: ValidationFunction<string>;
    doctype?: ValidationFunction<string>;
    id_patient?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PatientDocumentsUpdateFormOverridesProps = {
    PatientDocumentsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    pathfile?: PrimitiveOverrideProps<TextFieldProps>;
    doctype?: PrimitiveOverrideProps<TextFieldProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PatientDocumentsUpdateFormProps = React.PropsWithChildren<{
    overrides?: PatientDocumentsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    patientDocuments?: PatientDocuments;
    onSubmit?: (fields: PatientDocumentsUpdateFormInputValues) => PatientDocumentsUpdateFormInputValues;
    onSuccess?: (fields: PatientDocumentsUpdateFormInputValues) => void;
    onError?: (fields: PatientDocumentsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PatientDocumentsUpdateFormInputValues) => PatientDocumentsUpdateFormInputValues;
    onValidate?: PatientDocumentsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PatientDocumentsUpdateForm(props: PatientDocumentsUpdateFormProps): React.ReactElement;
