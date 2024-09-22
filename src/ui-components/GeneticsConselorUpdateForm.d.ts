/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { GeneticsConselor } from "../API.ts";
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
export declare type GeneticsConselorUpdateFormInputValues = {
    text?: string;
};
export declare type GeneticsConselorUpdateFormValidationValues = {
    text?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GeneticsConselorUpdateFormOverridesProps = {
    GeneticsConselorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GeneticsConselorUpdateFormProps = React.PropsWithChildren<{
    overrides?: GeneticsConselorUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    geneticsConselor?: GeneticsConselor;
    onSubmit?: (fields: GeneticsConselorUpdateFormInputValues) => GeneticsConselorUpdateFormInputValues;
    onSuccess?: (fields: GeneticsConselorUpdateFormInputValues) => void;
    onError?: (fields: GeneticsConselorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GeneticsConselorUpdateFormInputValues) => GeneticsConselorUpdateFormInputValues;
    onValidate?: GeneticsConselorUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GeneticsConselorUpdateForm(props: GeneticsConselorUpdateFormProps): React.ReactElement;
