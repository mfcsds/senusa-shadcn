/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Vcfdata } from "../API.ts";
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
export declare type VcfdataUpdateFormInputValues = {
    id_patient?: string;
    sample_date?: string;
    uploadAt?: string;
    pathfile?: string;
    genome_reference?: string;
};
export declare type VcfdataUpdateFormValidationValues = {
    id_patient?: ValidationFunction<string>;
    sample_date?: ValidationFunction<string>;
    uploadAt?: ValidationFunction<string>;
    pathfile?: ValidationFunction<string>;
    genome_reference?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VcfdataUpdateFormOverridesProps = {
    VcfdataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    sample_date?: PrimitiveOverrideProps<TextFieldProps>;
    uploadAt?: PrimitiveOverrideProps<TextFieldProps>;
    pathfile?: PrimitiveOverrideProps<TextFieldProps>;
    genome_reference?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VcfdataUpdateFormProps = React.PropsWithChildren<{
    overrides?: VcfdataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    vcfdata?: Vcfdata;
    onSubmit?: (fields: VcfdataUpdateFormInputValues) => VcfdataUpdateFormInputValues;
    onSuccess?: (fields: VcfdataUpdateFormInputValues) => void;
    onError?: (fields: VcfdataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VcfdataUpdateFormInputValues) => VcfdataUpdateFormInputValues;
    onValidate?: VcfdataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VcfdataUpdateForm(props: VcfdataUpdateFormProps): React.ReactElement;
