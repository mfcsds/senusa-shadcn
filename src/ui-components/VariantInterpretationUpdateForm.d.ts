/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { VariantInterpretation } from "../API.ts";
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
export declare type VariantInterpretationUpdateFormInputValues = {
    hgvs?: string;
    text?: string;
    id_patient?: string;
    id_report?: string;
    id_varsample?: string;
    gene?: string;
};
export declare type VariantInterpretationUpdateFormValidationValues = {
    hgvs?: ValidationFunction<string>;
    text?: ValidationFunction<string>;
    id_patient?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
    id_varsample?: ValidationFunction<string>;
    gene?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VariantInterpretationUpdateFormOverridesProps = {
    VariantInterpretationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    hgvs?: PrimitiveOverrideProps<TextFieldProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
    id_varsample?: PrimitiveOverrideProps<TextFieldProps>;
    gene?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VariantInterpretationUpdateFormProps = React.PropsWithChildren<{
    overrides?: VariantInterpretationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    variantInterpretation?: VariantInterpretation;
    onSubmit?: (fields: VariantInterpretationUpdateFormInputValues) => VariantInterpretationUpdateFormInputValues;
    onSuccess?: (fields: VariantInterpretationUpdateFormInputValues) => void;
    onError?: (fields: VariantInterpretationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VariantInterpretationUpdateFormInputValues) => VariantInterpretationUpdateFormInputValues;
    onValidate?: VariantInterpretationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VariantInterpretationUpdateForm(props: VariantInterpretationUpdateFormProps): React.ReactElement;
