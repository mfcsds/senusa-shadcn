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
export declare type ConclusionCreateFormInputValues = {
    text?: string;
    id_patient?: string;
    id_report?: string;
};
export declare type ConclusionCreateFormValidationValues = {
    text?: ValidationFunction<string>;
    id_patient?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConclusionCreateFormOverridesProps = {
    ConclusionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ConclusionCreateFormProps = React.PropsWithChildren<{
    overrides?: ConclusionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ConclusionCreateFormInputValues) => ConclusionCreateFormInputValues;
    onSuccess?: (fields: ConclusionCreateFormInputValues) => void;
    onError?: (fields: ConclusionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ConclusionCreateFormInputValues) => ConclusionCreateFormInputValues;
    onValidate?: ConclusionCreateFormValidationValues;
} & React.CSSProperties>;
export default function ConclusionCreateForm(props: ConclusionCreateFormProps): React.ReactElement;
