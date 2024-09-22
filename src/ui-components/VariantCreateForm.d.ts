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
export declare type VariantCreateFormInputValues = {
    chrom?: string;
    pos?: string;
    ref?: string;
    alt?: string;
    qual?: string;
    filter?: string;
    info?: string;
    hgvs?: string;
    id_var?: string;
    id_patient?: string;
    id_vcf?: string;
};
export declare type VariantCreateFormValidationValues = {
    chrom?: ValidationFunction<string>;
    pos?: ValidationFunction<string>;
    ref?: ValidationFunction<string>;
    alt?: ValidationFunction<string>;
    qual?: ValidationFunction<string>;
    filter?: ValidationFunction<string>;
    info?: ValidationFunction<string>;
    hgvs?: ValidationFunction<string>;
    id_var?: ValidationFunction<string>;
    id_patient?: ValidationFunction<string>;
    id_vcf?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VariantCreateFormOverridesProps = {
    VariantCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    chrom?: PrimitiveOverrideProps<TextFieldProps>;
    pos?: PrimitiveOverrideProps<TextFieldProps>;
    ref?: PrimitiveOverrideProps<TextFieldProps>;
    alt?: PrimitiveOverrideProps<TextFieldProps>;
    qual?: PrimitiveOverrideProps<TextFieldProps>;
    filter?: PrimitiveOverrideProps<TextFieldProps>;
    info?: PrimitiveOverrideProps<TextFieldProps>;
    hgvs?: PrimitiveOverrideProps<TextFieldProps>;
    id_var?: PrimitiveOverrideProps<TextFieldProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_vcf?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VariantCreateFormProps = React.PropsWithChildren<{
    overrides?: VariantCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VariantCreateFormInputValues) => VariantCreateFormInputValues;
    onSuccess?: (fields: VariantCreateFormInputValues) => void;
    onError?: (fields: VariantCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VariantCreateFormInputValues) => VariantCreateFormInputValues;
    onValidate?: VariantCreateFormValidationValues;
} & React.CSSProperties>;
export default function VariantCreateForm(props: VariantCreateFormProps): React.ReactElement;
