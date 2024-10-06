/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Conclusion } from "../API.ts";
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
export declare type ConclusionUpdateFormInputValues = {
    text?: string;
    id_patient?: string;
    id_report?: string;
};
export declare type ConclusionUpdateFormValidationValues = {
    text?: ValidationFunction<string>;
    id_patient?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConclusionUpdateFormOverridesProps = {
    ConclusionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ConclusionUpdateFormProps = React.PropsWithChildren<{
    overrides?: ConclusionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    conclusion?: Conclusion;
    onSubmit?: (fields: ConclusionUpdateFormInputValues) => ConclusionUpdateFormInputValues;
    onSuccess?: (fields: ConclusionUpdateFormInputValues) => void;
    onError?: (fields: ConclusionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ConclusionUpdateFormInputValues) => ConclusionUpdateFormInputValues;
    onValidate?: ConclusionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ConclusionUpdateForm(props: ConclusionUpdateFormProps): React.ReactElement;
