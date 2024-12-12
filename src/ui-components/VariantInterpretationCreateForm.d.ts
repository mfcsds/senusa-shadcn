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
export declare type VariantInterpretationCreateFormInputValues = {
    hgvs?: string;
    text?: string;
    id_patient?: string;
    id_report?: string;
    id_varsample?: string;
    alldesc?: string;
    gene_symbol?: string;
    gene_id?: string;
};
export declare type VariantInterpretationCreateFormValidationValues = {
    hgvs?: ValidationFunction<string>;
    text?: ValidationFunction<string>;
    id_patient?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
    id_varsample?: ValidationFunction<string>;
    alldesc?: ValidationFunction<string>;
    gene_symbol?: ValidationFunction<string>;
    gene_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VariantInterpretationCreateFormOverridesProps = {
    VariantInterpretationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    hgvs?: PrimitiveOverrideProps<TextFieldProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
    id_varsample?: PrimitiveOverrideProps<TextFieldProps>;
    alldesc?: PrimitiveOverrideProps<TextFieldProps>;
    gene_symbol?: PrimitiveOverrideProps<TextFieldProps>;
    gene_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VariantInterpretationCreateFormProps = React.PropsWithChildren<{
    overrides?: VariantInterpretationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VariantInterpretationCreateFormInputValues) => VariantInterpretationCreateFormInputValues;
    onSuccess?: (fields: VariantInterpretationCreateFormInputValues) => void;
    onError?: (fields: VariantInterpretationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VariantInterpretationCreateFormInputValues) => VariantInterpretationCreateFormInputValues;
    onValidate?: VariantInterpretationCreateFormValidationValues;
} & React.CSSProperties>;
export default function VariantInterpretationCreateForm(props: VariantInterpretationCreateFormProps): React.ReactElement;
