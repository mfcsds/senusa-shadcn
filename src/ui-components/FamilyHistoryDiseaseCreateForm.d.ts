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
export declare type FamilyHistoryDiseaseCreateFormInputValues = {
    id_patient?: string;
    hpo_code?: string;
    hpo_desc?: string;
};
export declare type FamilyHistoryDiseaseCreateFormValidationValues = {
    id_patient?: ValidationFunction<string>;
    hpo_code?: ValidationFunction<string>;
    hpo_desc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FamilyHistoryDiseaseCreateFormOverridesProps = {
    FamilyHistoryDiseaseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_code?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_desc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FamilyHistoryDiseaseCreateFormProps = React.PropsWithChildren<{
    overrides?: FamilyHistoryDiseaseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FamilyHistoryDiseaseCreateFormInputValues) => FamilyHistoryDiseaseCreateFormInputValues;
    onSuccess?: (fields: FamilyHistoryDiseaseCreateFormInputValues) => void;
    onError?: (fields: FamilyHistoryDiseaseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FamilyHistoryDiseaseCreateFormInputValues) => FamilyHistoryDiseaseCreateFormInputValues;
    onValidate?: FamilyHistoryDiseaseCreateFormValidationValues;
} & React.CSSProperties>;
export default function FamilyHistoryDiseaseCreateForm(props: FamilyHistoryDiseaseCreateFormProps): React.ReactElement;
