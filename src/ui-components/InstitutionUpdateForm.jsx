/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getInstitution } from "../graphql/queries";
import { updateInstitution } from "../graphql/mutations";
const client = generateClient();
export default function InstitutionUpdateForm(props) {
  const {
    id: idProp,
    institution: institutionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    contactname: "",
    address: "",
    subscription_type: "",
    email: "",
    userQuotas: "",
    currentUserQuota: "",
    storageQuota: "",
    registrationDate: "",
    accountStatus: false,
    contactphone: "",
    dueDate: "",
    currentStorageQuota: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [contactname, setContactname] = React.useState(
    initialValues.contactname
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [subscription_type, setSubscription_type] = React.useState(
    initialValues.subscription_type
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [userQuotas, setUserQuotas] = React.useState(initialValues.userQuotas);
  const [currentUserQuota, setCurrentUserQuota] = React.useState(
    initialValues.currentUserQuota
  );
  const [storageQuota, setStorageQuota] = React.useState(
    initialValues.storageQuota
  );
  const [registrationDate, setRegistrationDate] = React.useState(
    initialValues.registrationDate
  );
  const [accountStatus, setAccountStatus] = React.useState(
    initialValues.accountStatus
  );
  const [contactphone, setContactphone] = React.useState(
    initialValues.contactphone
  );
  const [dueDate, setDueDate] = React.useState(initialValues.dueDate);
  const [currentStorageQuota, setCurrentStorageQuota] = React.useState(
    initialValues.currentStorageQuota
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = institutionRecord
      ? { ...initialValues, ...institutionRecord }
      : initialValues;
    setName(cleanValues.name);
    setContactname(cleanValues.contactname);
    setAddress(cleanValues.address);
    setSubscription_type(cleanValues.subscription_type);
    setEmail(cleanValues.email);
    setUserQuotas(cleanValues.userQuotas);
    setCurrentUserQuota(cleanValues.currentUserQuota);
    setStorageQuota(cleanValues.storageQuota);
    setRegistrationDate(cleanValues.registrationDate);
    setAccountStatus(cleanValues.accountStatus);
    setContactphone(cleanValues.contactphone);
    setDueDate(cleanValues.dueDate);
    setCurrentStorageQuota(cleanValues.currentStorageQuota);
    setErrors({});
  };
  const [institutionRecord, setInstitutionRecord] =
    React.useState(institutionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getInstitution.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getInstitution
        : institutionModelProp;
      setInstitutionRecord(record);
    };
    queryData();
  }, [idProp, institutionModelProp]);
  React.useEffect(resetStateValues, [institutionRecord]);
  const validations = {
    name: [],
    contactname: [],
    address: [],
    subscription_type: [],
    email: [],
    userQuotas: [],
    currentUserQuota: [],
    storageQuota: [],
    registrationDate: [],
    accountStatus: [],
    contactphone: [],
    dueDate: [],
    currentStorageQuota: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name: name ?? null,
          contactname: contactname ?? null,
          address: address ?? null,
          subscription_type: subscription_type ?? null,
          email: email ?? null,
          userQuotas: userQuotas ?? null,
          currentUserQuota: currentUserQuota ?? null,
          storageQuota: storageQuota ?? null,
          registrationDate: registrationDate ?? null,
          accountStatus: accountStatus ?? null,
          contactphone: contactphone ?? null,
          dueDate: dueDate ?? null,
          currentStorageQuota: currentStorageQuota ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateInstitution.replaceAll("__typename", ""),
            variables: {
              input: {
                id: institutionRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "InstitutionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Contactname"
        isRequired={false}
        isReadOnly={false}
        value={contactname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              contactname: value,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.contactname ?? value;
          }
          if (errors.contactname?.hasError) {
            runValidationTasks("contactname", value);
          }
          setContactname(value);
        }}
        onBlur={() => runValidationTasks("contactname", contactname)}
        errorMessage={errors.contactname?.errorMessage}
        hasError={errors.contactname?.hasError}
        {...getOverrideProps(overrides, "contactname")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address: value,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="Subscription type"
        isRequired={false}
        isReadOnly={false}
        value={subscription_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type: value,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.subscription_type ?? value;
          }
          if (errors.subscription_type?.hasError) {
            runValidationTasks("subscription_type", value);
          }
          setSubscription_type(value);
        }}
        onBlur={() =>
          runValidationTasks("subscription_type", subscription_type)
        }
        errorMessage={errors.subscription_type?.errorMessage}
        hasError={errors.subscription_type?.hasError}
        {...getOverrideProps(overrides, "subscription_type")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email: value,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="User quotas"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={userQuotas}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas: value,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.userQuotas ?? value;
          }
          if (errors.userQuotas?.hasError) {
            runValidationTasks("userQuotas", value);
          }
          setUserQuotas(value);
        }}
        onBlur={() => runValidationTasks("userQuotas", userQuotas)}
        errorMessage={errors.userQuotas?.errorMessage}
        hasError={errors.userQuotas?.hasError}
        {...getOverrideProps(overrides, "userQuotas")}
      ></TextField>
      <TextField
        label="Current user quota"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={currentUserQuota}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota: value,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.currentUserQuota ?? value;
          }
          if (errors.currentUserQuota?.hasError) {
            runValidationTasks("currentUserQuota", value);
          }
          setCurrentUserQuota(value);
        }}
        onBlur={() => runValidationTasks("currentUserQuota", currentUserQuota)}
        errorMessage={errors.currentUserQuota?.errorMessage}
        hasError={errors.currentUserQuota?.hasError}
        {...getOverrideProps(overrides, "currentUserQuota")}
      ></TextField>
      <TextField
        label="Storage quota"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={storageQuota}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota: value,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.storageQuota ?? value;
          }
          if (errors.storageQuota?.hasError) {
            runValidationTasks("storageQuota", value);
          }
          setStorageQuota(value);
        }}
        onBlur={() => runValidationTasks("storageQuota", storageQuota)}
        errorMessage={errors.storageQuota?.errorMessage}
        hasError={errors.storageQuota?.hasError}
        {...getOverrideProps(overrides, "storageQuota")}
      ></TextField>
      <TextField
        label="Registration date"
        isRequired={false}
        isReadOnly={false}
        value={registrationDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate: value,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.registrationDate ?? value;
          }
          if (errors.registrationDate?.hasError) {
            runValidationTasks("registrationDate", value);
          }
          setRegistrationDate(value);
        }}
        onBlur={() => runValidationTasks("registrationDate", registrationDate)}
        errorMessage={errors.registrationDate?.errorMessage}
        hasError={errors.registrationDate?.hasError}
        {...getOverrideProps(overrides, "registrationDate")}
      ></TextField>
      <SwitchField
        label="Account status"
        defaultChecked={false}
        isDisabled={false}
        isChecked={accountStatus}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus: value,
              contactphone,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.accountStatus ?? value;
          }
          if (errors.accountStatus?.hasError) {
            runValidationTasks("accountStatus", value);
          }
          setAccountStatus(value);
        }}
        onBlur={() => runValidationTasks("accountStatus", accountStatus)}
        errorMessage={errors.accountStatus?.errorMessage}
        hasError={errors.accountStatus?.hasError}
        {...getOverrideProps(overrides, "accountStatus")}
      ></SwitchField>
      <TextField
        label="Contactphone"
        isRequired={false}
        isReadOnly={false}
        value={contactphone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone: value,
              dueDate,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.contactphone ?? value;
          }
          if (errors.contactphone?.hasError) {
            runValidationTasks("contactphone", value);
          }
          setContactphone(value);
        }}
        onBlur={() => runValidationTasks("contactphone", contactphone)}
        errorMessage={errors.contactphone?.errorMessage}
        hasError={errors.contactphone?.hasError}
        {...getOverrideProps(overrides, "contactphone")}
      ></TextField>
      <TextField
        label="Due date"
        isRequired={false}
        isReadOnly={false}
        value={dueDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate: value,
              currentStorageQuota,
            };
            const result = onChange(modelFields);
            value = result?.dueDate ?? value;
          }
          if (errors.dueDate?.hasError) {
            runValidationTasks("dueDate", value);
          }
          setDueDate(value);
        }}
        onBlur={() => runValidationTasks("dueDate", dueDate)}
        errorMessage={errors.dueDate?.errorMessage}
        hasError={errors.dueDate?.hasError}
        {...getOverrideProps(overrides, "dueDate")}
      ></TextField>
      <TextField
        label="Current storage quota"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={currentStorageQuota}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              contactname,
              address,
              subscription_type,
              email,
              userQuotas,
              currentUserQuota,
              storageQuota,
              registrationDate,
              accountStatus,
              contactphone,
              dueDate,
              currentStorageQuota: value,
            };
            const result = onChange(modelFields);
            value = result?.currentStorageQuota ?? value;
          }
          if (errors.currentStorageQuota?.hasError) {
            runValidationTasks("currentStorageQuota", value);
          }
          setCurrentStorageQuota(value);
        }}
        onBlur={() =>
          runValidationTasks("currentStorageQuota", currentStorageQuota)
        }
        errorMessage={errors.currentStorageQuota?.errorMessage}
        hasError={errors.currentStorageQuota?.hasError}
        {...getOverrideProps(overrides, "currentStorageQuota")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || institutionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || institutionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
