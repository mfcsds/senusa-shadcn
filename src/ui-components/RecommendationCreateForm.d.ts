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
export declare type RecommendationCreateFormInputValues = {
    text?: string;
    variantreportID?: string;
};
export declare type RecommendationCreateFormValidationValues = {
    text?: ValidationFunction<string>;
    variantreportID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecommendationCreateFormOverridesProps = {
    RecommendationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    variantreportID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RecommendationCreateFormProps = React.PropsWithChildren<{
    overrides?: RecommendationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RecommendationCreateFormInputValues) => RecommendationCreateFormInputValues;
    onSuccess?: (fields: RecommendationCreateFormInputValues) => void;
    onError?: (fields: RecommendationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecommendationCreateFormInputValues) => RecommendationCreateFormInputValues;
    onValidate?: RecommendationCreateFormValidationValues;
} & React.CSSProperties>;
export default function RecommendationCreateForm(props: RecommendationCreateFormProps): React.ReactElement;
