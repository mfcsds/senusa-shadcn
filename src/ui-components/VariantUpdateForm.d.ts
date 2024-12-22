/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Variant } from "../API.ts";
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
export declare type VariantUpdateFormInputValues = {
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
    acmg?: string;
    ac?: number;
    af?: number;
    an?: number;
    dp?: number;
    fs?: number;
    mq?: number;
    mqranksum?: number;
    qd?: number;
    readposrank?: number;
    sor?: number;
    fraction?: number;
    zygosity?: string;
};
export declare type VariantUpdateFormValidationValues = {
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
    acmg?: ValidationFunction<string>;
    ac?: ValidationFunction<number>;
    af?: ValidationFunction<number>;
    an?: ValidationFunction<number>;
    dp?: ValidationFunction<number>;
    fs?: ValidationFunction<number>;
    mq?: ValidationFunction<number>;
    mqranksum?: ValidationFunction<number>;
    qd?: ValidationFunction<number>;
    readposrank?: ValidationFunction<number>;
    sor?: ValidationFunction<number>;
    fraction?: ValidationFunction<number>;
    zygosity?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VariantUpdateFormOverridesProps = {
    VariantUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
    acmg?: PrimitiveOverrideProps<TextFieldProps>;
    ac?: PrimitiveOverrideProps<TextFieldProps>;
    af?: PrimitiveOverrideProps<TextFieldProps>;
    an?: PrimitiveOverrideProps<TextFieldProps>;
    dp?: PrimitiveOverrideProps<TextFieldProps>;
    fs?: PrimitiveOverrideProps<TextFieldProps>;
    mq?: PrimitiveOverrideProps<TextFieldProps>;
    mqranksum?: PrimitiveOverrideProps<TextFieldProps>;
    qd?: PrimitiveOverrideProps<TextFieldProps>;
    readposrank?: PrimitiveOverrideProps<TextFieldProps>;
    sor?: PrimitiveOverrideProps<TextFieldProps>;
    fraction?: PrimitiveOverrideProps<TextFieldProps>;
    zygosity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VariantUpdateFormProps = React.PropsWithChildren<{
    overrides?: VariantUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    variant?: Variant;
    onSubmit?: (fields: VariantUpdateFormInputValues) => VariantUpdateFormInputValues;
    onSuccess?: (fields: VariantUpdateFormInputValues) => void;
    onError?: (fields: VariantUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VariantUpdateFormInputValues) => VariantUpdateFormInputValues;
    onValidate?: VariantUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VariantUpdateForm(props: VariantUpdateFormProps): React.ReactElement;
