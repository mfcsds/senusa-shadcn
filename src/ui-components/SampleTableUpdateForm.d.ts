/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { SampleTable } from "../API.ts";
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
export declare type SampleTableUpdateFormInputValues = {
    text?: string;
};
export declare type SampleTableUpdateFormValidationValues = {
    text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SampleTableUpdateFormOverridesProps = {
    SampleTableUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SampleTableUpdateFormProps = React.PropsWithChildren<{
    overrides?: SampleTableUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sampleTable?: SampleTable;
    onSubmit?: (fields: SampleTableUpdateFormInputValues) => SampleTableUpdateFormInputValues;
    onSuccess?: (fields: SampleTableUpdateFormInputValues) => void;
    onError?: (fields: SampleTableUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SampleTableUpdateFormInputValues) => SampleTableUpdateFormInputValues;
    onValidate?: SampleTableUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SampleTableUpdateForm(props: SampleTableUpdateFormProps): React.ReactElement;
