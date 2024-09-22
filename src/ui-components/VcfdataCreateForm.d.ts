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
export declare type VcfdataCreateFormInputValues = {
    id_patient?: string;
    sample_date?: string;
    uploadAt?: string;
    public_link?: string;
    genome_reference?: string;
};
export declare type VcfdataCreateFormValidationValues = {
    id_patient?: ValidationFunction<string>;
    sample_date?: ValidationFunction<string>;
    uploadAt?: ValidationFunction<string>;
    public_link?: ValidationFunction<string>;
    genome_reference?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VcfdataCreateFormOverridesProps = {
    VcfdataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    sample_date?: PrimitiveOverrideProps<TextFieldProps>;
    uploadAt?: PrimitiveOverrideProps<TextFieldProps>;
    public_link?: PrimitiveOverrideProps<TextFieldProps>;
    genome_reference?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VcfdataCreateFormProps = React.PropsWithChildren<{
    overrides?: VcfdataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VcfdataCreateFormInputValues) => VcfdataCreateFormInputValues;
    onSuccess?: (fields: VcfdataCreateFormInputValues) => void;
    onError?: (fields: VcfdataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VcfdataCreateFormInputValues) => VcfdataCreateFormInputValues;
    onValidate?: VcfdataCreateFormValidationValues;
} & React.CSSProperties>;
export default function VcfdataCreateForm(props: VcfdataCreateFormProps): React.ReactElement;
