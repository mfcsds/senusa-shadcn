/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { SelectedVariant } from "../API.ts";
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
export declare type SelectedVariantUpdateFormInputValues = {
    id_patient?: string;
    id_vcf?: string;
    id_report?: string;
    gene_id?: string;
    gene_symbol?: string;
    chrom?: string;
    pos?: string;
    id_var?: string;
    ref?: string;
    alt?: string;
    qual?: string;
    global_allele?: number;
    functional_impact?: string;
    acmg?: string;
    reviewer_class?: string;
    clinical_sign?: string;
    hgvs?: string;
    severe_consequence?: string;
    sift_score?: number;
    sift_prediction?: string;
    phenotypes?: string;
    rsID?: string;
    gnomade?: number;
    gnomadg?: number;
    alldesc?: string;
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
    text_interpretation?: string;
};
export declare type SelectedVariantUpdateFormValidationValues = {
    id_patient?: ValidationFunction<string>;
    id_vcf?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
    gene_id?: ValidationFunction<string>;
    gene_symbol?: ValidationFunction<string>;
    chrom?: ValidationFunction<string>;
    pos?: ValidationFunction<string>;
    id_var?: ValidationFunction<string>;
    ref?: ValidationFunction<string>;
    alt?: ValidationFunction<string>;
    qual?: ValidationFunction<string>;
    global_allele?: ValidationFunction<number>;
    functional_impact?: ValidationFunction<string>;
    acmg?: ValidationFunction<string>;
    reviewer_class?: ValidationFunction<string>;
    clinical_sign?: ValidationFunction<string>;
    hgvs?: ValidationFunction<string>;
    severe_consequence?: ValidationFunction<string>;
    sift_score?: ValidationFunction<number>;
    sift_prediction?: ValidationFunction<string>;
    phenotypes?: ValidationFunction<string>;
    rsID?: ValidationFunction<string>;
    gnomade?: ValidationFunction<number>;
    gnomadg?: ValidationFunction<number>;
    alldesc?: ValidationFunction<string>;
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
    text_interpretation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SelectedVariantUpdateFormOverridesProps = {
    SelectedVariantUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_vcf?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
    gene_id?: PrimitiveOverrideProps<TextFieldProps>;
    gene_symbol?: PrimitiveOverrideProps<TextFieldProps>;
    chrom?: PrimitiveOverrideProps<TextFieldProps>;
    pos?: PrimitiveOverrideProps<TextFieldProps>;
    id_var?: PrimitiveOverrideProps<TextFieldProps>;
    ref?: PrimitiveOverrideProps<TextFieldProps>;
    alt?: PrimitiveOverrideProps<TextFieldProps>;
    qual?: PrimitiveOverrideProps<TextFieldProps>;
    global_allele?: PrimitiveOverrideProps<TextFieldProps>;
    functional_impact?: PrimitiveOverrideProps<TextFieldProps>;
    acmg?: PrimitiveOverrideProps<TextFieldProps>;
    reviewer_class?: PrimitiveOverrideProps<TextFieldProps>;
    clinical_sign?: PrimitiveOverrideProps<TextFieldProps>;
    hgvs?: PrimitiveOverrideProps<TextFieldProps>;
    severe_consequence?: PrimitiveOverrideProps<TextFieldProps>;
    sift_score?: PrimitiveOverrideProps<TextFieldProps>;
    sift_prediction?: PrimitiveOverrideProps<TextFieldProps>;
    phenotypes?: PrimitiveOverrideProps<TextFieldProps>;
    rsID?: PrimitiveOverrideProps<TextFieldProps>;
    gnomade?: PrimitiveOverrideProps<TextFieldProps>;
    gnomadg?: PrimitiveOverrideProps<TextFieldProps>;
    alldesc?: PrimitiveOverrideProps<TextFieldProps>;
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
    text_interpretation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SelectedVariantUpdateFormProps = React.PropsWithChildren<{
    overrides?: SelectedVariantUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    selectedVariant?: SelectedVariant;
    onSubmit?: (fields: SelectedVariantUpdateFormInputValues) => SelectedVariantUpdateFormInputValues;
    onSuccess?: (fields: SelectedVariantUpdateFormInputValues) => void;
    onError?: (fields: SelectedVariantUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SelectedVariantUpdateFormInputValues) => SelectedVariantUpdateFormInputValues;
    onValidate?: SelectedVariantUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SelectedVariantUpdateForm(props: SelectedVariantUpdateFormProps): React.ReactElement;
