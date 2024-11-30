/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AcmgAnnotationCreateFormInputValues = {
    id_variant?: string;
    PVS1?: boolean;
    PS1?: boolean;
    PS2?: boolean;
    PS3?: boolean;
    PS4?: boolean;
    PP1_Strong?: boolean;
    PM1?: boolean;
    PM2?: boolean;
    PM3?: boolean;
    PM4?: boolean;
    PM5?: boolean;
    PM6?: boolean;
    PP1_Moderate?: boolean;
    PP1_Cosegregation?: boolean;
    PP2?: boolean;
    PP3?: boolean;
    PP4?: boolean;
    PP5?: boolean;
    BP1?: boolean;
    BP2?: boolean;
    BP3?: boolean;
    BP4?: boolean;
    BP5?: boolean;
    BP6?: boolean;
    BP7?: boolean;
    BS1?: boolean;
    BS2?: boolean;
    BS3?: boolean;
    BS4?: boolean;
    BA1?: boolean;
};
export declare type AcmgAnnotationCreateFormValidationValues = {
    id_variant?: ValidationFunction<string>;
    PVS1?: ValidationFunction<boolean>;
    PS1?: ValidationFunction<boolean>;
    PS2?: ValidationFunction<boolean>;
    PS3?: ValidationFunction<boolean>;
    PS4?: ValidationFunction<boolean>;
    PP1_Strong?: ValidationFunction<boolean>;
    PM1?: ValidationFunction<boolean>;
    PM2?: ValidationFunction<boolean>;
    PM3?: ValidationFunction<boolean>;
    PM4?: ValidationFunction<boolean>;
    PM5?: ValidationFunction<boolean>;
    PM6?: ValidationFunction<boolean>;
    PP1_Moderate?: ValidationFunction<boolean>;
    PP1_Cosegregation?: ValidationFunction<boolean>;
    PP2?: ValidationFunction<boolean>;
    PP3?: ValidationFunction<boolean>;
    PP4?: ValidationFunction<boolean>;
    PP5?: ValidationFunction<boolean>;
    BP1?: ValidationFunction<boolean>;
    BP2?: ValidationFunction<boolean>;
    BP3?: ValidationFunction<boolean>;
    BP4?: ValidationFunction<boolean>;
    BP5?: ValidationFunction<boolean>;
    BP6?: ValidationFunction<boolean>;
    BP7?: ValidationFunction<boolean>;
    BS1?: ValidationFunction<boolean>;
    BS2?: ValidationFunction<boolean>;
    BS3?: ValidationFunction<boolean>;
    BS4?: ValidationFunction<boolean>;
    BA1?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AcmgAnnotationCreateFormOverridesProps = {
    AcmgAnnotationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id_variant?: PrimitiveOverrideProps<TextFieldProps>;
    PVS1?: PrimitiveOverrideProps<SwitchFieldProps>;
    PS1?: PrimitiveOverrideProps<SwitchFieldProps>;
    PS2?: PrimitiveOverrideProps<SwitchFieldProps>;
    PS3?: PrimitiveOverrideProps<SwitchFieldProps>;
    PS4?: PrimitiveOverrideProps<SwitchFieldProps>;
    PP1_Strong?: PrimitiveOverrideProps<SwitchFieldProps>;
    PM1?: PrimitiveOverrideProps<SwitchFieldProps>;
    PM2?: PrimitiveOverrideProps<SwitchFieldProps>;
    PM3?: PrimitiveOverrideProps<SwitchFieldProps>;
    PM4?: PrimitiveOverrideProps<SwitchFieldProps>;
    PM5?: PrimitiveOverrideProps<SwitchFieldProps>;
    PM6?: PrimitiveOverrideProps<SwitchFieldProps>;
    PP1_Moderate?: PrimitiveOverrideProps<SwitchFieldProps>;
    PP1_Cosegregation?: PrimitiveOverrideProps<SwitchFieldProps>;
    PP2?: PrimitiveOverrideProps<SwitchFieldProps>;
    PP3?: PrimitiveOverrideProps<SwitchFieldProps>;
    PP4?: PrimitiveOverrideProps<SwitchFieldProps>;
    PP5?: PrimitiveOverrideProps<SwitchFieldProps>;
    BP1?: PrimitiveOverrideProps<SwitchFieldProps>;
    BP2?: PrimitiveOverrideProps<SwitchFieldProps>;
    BP3?: PrimitiveOverrideProps<SwitchFieldProps>;
    BP4?: PrimitiveOverrideProps<SwitchFieldProps>;
    BP5?: PrimitiveOverrideProps<SwitchFieldProps>;
    BP6?: PrimitiveOverrideProps<SwitchFieldProps>;
    BP7?: PrimitiveOverrideProps<SwitchFieldProps>;
    BS1?: PrimitiveOverrideProps<SwitchFieldProps>;
    BS2?: PrimitiveOverrideProps<SwitchFieldProps>;
    BS3?: PrimitiveOverrideProps<SwitchFieldProps>;
    BS4?: PrimitiveOverrideProps<SwitchFieldProps>;
    BA1?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AcmgAnnotationCreateFormProps = React.PropsWithChildren<{
    overrides?: AcmgAnnotationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AcmgAnnotationCreateFormInputValues) => AcmgAnnotationCreateFormInputValues;
    onSuccess?: (fields: AcmgAnnotationCreateFormInputValues) => void;
    onError?: (fields: AcmgAnnotationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AcmgAnnotationCreateFormInputValues) => AcmgAnnotationCreateFormInputValues;
    onValidate?: AcmgAnnotationCreateFormValidationValues;
} & React.CSSProperties>;
export default function AcmgAnnotationCreateForm(props: AcmgAnnotationCreateFormProps): React.ReactElement;
