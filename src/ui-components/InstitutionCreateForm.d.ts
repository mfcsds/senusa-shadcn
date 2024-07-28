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
export declare type InstitutionCreateFormInputValues = {
    name?: string;
    contact?: string;
    address?: string;
    subscription_type?: string;
    email?: string;
};
export declare type InstitutionCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    contact?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    subscription_type?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InstitutionCreateFormOverridesProps = {
    InstitutionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    contact?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    subscription_type?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InstitutionCreateFormProps = React.PropsWithChildren<{
    overrides?: InstitutionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InstitutionCreateFormInputValues) => InstitutionCreateFormInputValues;
    onSuccess?: (fields: InstitutionCreateFormInputValues) => void;
    onError?: (fields: InstitutionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InstitutionCreateFormInputValues) => InstitutionCreateFormInputValues;
    onValidate?: InstitutionCreateFormValidationValues;
} & React.CSSProperties>;
export default function InstitutionCreateForm(props: InstitutionCreateFormProps): React.ReactElement;
