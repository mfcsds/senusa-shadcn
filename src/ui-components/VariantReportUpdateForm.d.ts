/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { VariantReport } from "../API.ts";
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
export declare type VariantReportUpdateFormInputValues = {
    status?: number;
    isApproved?: boolean;
    medical_history?: string;
    current_diagnosis?: string;
    institutionID?: string;
    createAt?: string;
    phenotype?: string[];
    sample_collection?: string;
    idPatient?: string;
};
export declare type VariantReportUpdateFormValidationValues = {
    status?: ValidationFunction<number>;
    isApproved?: ValidationFunction<boolean>;
    medical_history?: ValidationFunction<string>;
    current_diagnosis?: ValidationFunction<string>;
    institutionID?: ValidationFunction<string>;
    createAt?: ValidationFunction<string>;
    phenotype?: ValidationFunction<string>;
    sample_collection?: ValidationFunction<string>;
    idPatient?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VariantReportUpdateFormOverridesProps = {
    VariantReportUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    isApproved?: PrimitiveOverrideProps<SwitchFieldProps>;
    medical_history?: PrimitiveOverrideProps<TextFieldProps>;
    current_diagnosis?: PrimitiveOverrideProps<TextFieldProps>;
    institutionID?: PrimitiveOverrideProps<TextFieldProps>;
    createAt?: PrimitiveOverrideProps<TextFieldProps>;
    phenotype?: PrimitiveOverrideProps<TextFieldProps>;
    sample_collection?: PrimitiveOverrideProps<TextFieldProps>;
    idPatient?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VariantReportUpdateFormProps = React.PropsWithChildren<{
    overrides?: VariantReportUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    variantReport?: VariantReport;
    onSubmit?: (fields: VariantReportUpdateFormInputValues) => VariantReportUpdateFormInputValues;
    onSuccess?: (fields: VariantReportUpdateFormInputValues) => void;
    onError?: (fields: VariantReportUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VariantReportUpdateFormInputValues) => VariantReportUpdateFormInputValues;
    onValidate?: VariantReportUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VariantReportUpdateForm(props: VariantReportUpdateFormProps): React.ReactElement;
