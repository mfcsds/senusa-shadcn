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
export declare type SampleTableCreateFormInputValues = {
    text?: string;
};
export declare type SampleTableCreateFormValidationValues = {
    text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SampleTableCreateFormOverridesProps = {
    SampleTableCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SampleTableCreateFormProps = React.PropsWithChildren<{
    overrides?: SampleTableCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SampleTableCreateFormInputValues) => SampleTableCreateFormInputValues;
    onSuccess?: (fields: SampleTableCreateFormInputValues) => void;
    onError?: (fields: SampleTableCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SampleTableCreateFormInputValues) => SampleTableCreateFormInputValues;
    onValidate?: SampleTableCreateFormValidationValues;
} & React.CSSProperties>;
export default function SampleTableCreateForm(props: SampleTableCreateFormProps): React.ReactElement;
