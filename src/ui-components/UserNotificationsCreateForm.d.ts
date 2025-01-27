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
export declare type UserNotificationsCreateFormInputValues = {
    user_id?: string;
    institutionID?: string;
    message?: string;
    id_fromuser?: string;
    id_report?: string;
};
export declare type UserNotificationsCreateFormValidationValues = {
    user_id?: ValidationFunction<string>;
    institutionID?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    id_fromuser?: ValidationFunction<string>;
    id_report?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserNotificationsCreateFormOverridesProps = {
    UserNotificationsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    institutionID?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    id_fromuser?: PrimitiveOverrideProps<TextFieldProps>;
    id_report?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserNotificationsCreateFormProps = React.PropsWithChildren<{
    overrides?: UserNotificationsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserNotificationsCreateFormInputValues) => UserNotificationsCreateFormInputValues;
    onSuccess?: (fields: UserNotificationsCreateFormInputValues) => void;
    onError?: (fields: UserNotificationsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserNotificationsCreateFormInputValues) => UserNotificationsCreateFormInputValues;
    onValidate?: UserNotificationsCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserNotificationsCreateForm(props: UserNotificationsCreateFormProps): React.ReactElement;
