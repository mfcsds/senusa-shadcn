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
export declare type SelectedVariantCreateFormInputValues = {
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
    zigosity?: string;
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
};
export declare type SelectedVariantCreateFormValidationValues = {
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
    zigosity?: ValidationFunction<string>;
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
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SelectedVariantCreateFormOverridesProps = {
    SelectedVariantCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
    zigosity?: PrimitiveOverrideProps<TextFieldProps>;
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
} & EscapeHatchProps;
export declare type SelectedVariantCreateFormProps = React.PropsWithChildren<{
    overrides?: SelectedVariantCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SelectedVariantCreateFormInputValues) => SelectedVariantCreateFormInputValues;
    onSuccess?: (fields: SelectedVariantCreateFormInputValues) => void;
    onError?: (fields: SelectedVariantCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SelectedVariantCreateFormInputValues) => SelectedVariantCreateFormInputValues;
    onValidate?: SelectedVariantCreateFormValidationValues;
} & React.CSSProperties>;
export default function SelectedVariantCreateForm(props: SelectedVariantCreateFormProps): React.ReactElement;