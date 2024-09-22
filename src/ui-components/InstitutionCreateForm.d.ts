/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
    contactname?: string;
    address?: string;
    subscription_type?: string;
    email?: string;
    userQuotas?: number;
    currentUserQuota?: number;
    storageQuota?: number;
    registrationDate?: string;
    accountStatus?: boolean;
    contactphone?: string;
    dueDate?: string;
    currentStorageQuota?: number;
};
export declare type InstitutionCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    contactname?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    subscription_type?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    userQuotas?: ValidationFunction<number>;
    currentUserQuota?: ValidationFunction<number>;
    storageQuota?: ValidationFunction<number>;
    registrationDate?: ValidationFunction<string>;
    accountStatus?: ValidationFunction<boolean>;
    contactphone?: ValidationFunction<string>;
    dueDate?: ValidationFunction<string>;
    currentStorageQuota?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InstitutionCreateFormOverridesProps = {
    InstitutionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    contactname?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    subscription_type?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    userQuotas?: PrimitiveOverrideProps<TextFieldProps>;
    currentUserQuota?: PrimitiveOverrideProps<TextFieldProps>;
    storageQuota?: PrimitiveOverrideProps<TextFieldProps>;
    registrationDate?: PrimitiveOverrideProps<TextFieldProps>;
    accountStatus?: PrimitiveOverrideProps<SwitchFieldProps>;
    contactphone?: PrimitiveOverrideProps<TextFieldProps>;
    dueDate?: PrimitiveOverrideProps<TextFieldProps>;
    currentStorageQuota?: PrimitiveOverrideProps<TextFieldProps>;
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
