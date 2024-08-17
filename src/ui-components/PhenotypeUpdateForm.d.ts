/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Phenotype } from "../API.ts";
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
export declare type PhenotypeUpdateFormInputValues = {
    PhenotypeCode?: string;
    Description?: string;
};
export declare type PhenotypeUpdateFormValidationValues = {
    PhenotypeCode?: ValidationFunction<string>;
    Description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PhenotypeUpdateFormOverridesProps = {
    PhenotypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    PhenotypeCode?: PrimitiveOverrideProps<TextFieldProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PhenotypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: PhenotypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    phenotype?: Phenotype;
    onSubmit?: (fields: PhenotypeUpdateFormInputValues) => PhenotypeUpdateFormInputValues;
    onSuccess?: (fields: PhenotypeUpdateFormInputValues) => void;
    onError?: (fields: PhenotypeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PhenotypeUpdateFormInputValues) => PhenotypeUpdateFormInputValues;
    onValidate?: PhenotypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PhenotypeUpdateForm(props: PhenotypeUpdateFormProps): React.ReactElement;
