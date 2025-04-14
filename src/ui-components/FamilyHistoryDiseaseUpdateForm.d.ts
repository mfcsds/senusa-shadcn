/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { FamilyHistoryDisease } from "../API.ts";
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
export declare type FamilyHistoryDiseaseUpdateFormInputValues = {
    id_patient?: string;
    hpo_code?: string;
    hpo_desc?: string;
    family_relation?: string;
};
export declare type FamilyHistoryDiseaseUpdateFormValidationValues = {
    id_patient?: ValidationFunction<string>;
    hpo_code?: ValidationFunction<string>;
    hpo_desc?: ValidationFunction<string>;
    family_relation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FamilyHistoryDiseaseUpdateFormOverridesProps = {
    FamilyHistoryDiseaseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_patient?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_code?: PrimitiveOverrideProps<TextFieldProps>;
    hpo_desc?: PrimitiveOverrideProps<TextFieldProps>;
    family_relation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type FamilyHistoryDiseaseUpdateFormProps = React.PropsWithChildren<{
    overrides?: FamilyHistoryDiseaseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    familyHistoryDisease?: FamilyHistoryDisease;
    onSubmit?: (fields: FamilyHistoryDiseaseUpdateFormInputValues) => FamilyHistoryDiseaseUpdateFormInputValues;
    onSuccess?: (fields: FamilyHistoryDiseaseUpdateFormInputValues) => void;
    onError?: (fields: FamilyHistoryDiseaseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FamilyHistoryDiseaseUpdateFormInputValues) => FamilyHistoryDiseaseUpdateFormInputValues;
    onValidate?: FamilyHistoryDiseaseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FamilyHistoryDiseaseUpdateForm(props: FamilyHistoryDiseaseUpdateFormProps): React.ReactElement;
