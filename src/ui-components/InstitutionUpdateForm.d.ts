/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Institution } from "../API.ts";
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
export declare type InstitutionUpdateFormInputValues = {
    name?: string;
    contact?: string;
    address?: string;
    subscription_type?: string;
    email?: string;
};
export declare type InstitutionUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    contact?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    subscription_type?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InstitutionUpdateFormOverridesProps = {
    InstitutionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    contact?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    subscription_type?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InstitutionUpdateFormProps = React.PropsWithChildren<{
    overrides?: InstitutionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    institution?: Institution;
    onSubmit?: (fields: InstitutionUpdateFormInputValues) => InstitutionUpdateFormInputValues;
    onSuccess?: (fields: InstitutionUpdateFormInputValues) => void;
    onError?: (fields: InstitutionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InstitutionUpdateFormInputValues) => InstitutionUpdateFormInputValues;
    onValidate?: InstitutionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InstitutionUpdateForm(props: InstitutionUpdateFormProps): React.ReactElement;
