/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUser } from "../graphql/mutations";
const client = generateClient();
export default function UserCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    category: "",
    specialty: "",
    institutionID: "",
    level: "",
    status: "",
    phone_number: "",
  };
  const [first_name, setFirst_name] = React.useState(initialValues.first_name);
  const [last_name, setLast_name] = React.useState(initialValues.last_name);
  const [role, setRole] = React.useState(initialValues.role);
  const [email, setEmail] = React.useState(initialValues.email);
  const [category, setCategory] = React.useState(initialValues.category);
  const [specialty, setSpecialty] = React.useState(initialValues.specialty);
  const [institutionID, setInstitutionID] = React.useState(
    initialValues.institutionID
  );
  const [level, setLevel] = React.useState(initialValues.level);
  const [status, setStatus] = React.useState(initialValues.status);
  const [phone_number, setPhone_number] = React.useState(
    initialValues.phone_number
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirst_name(initialValues.first_name);
    setLast_name(initialValues.last_name);
    setRole(initialValues.role);
    setEmail(initialValues.email);
    setCategory(initialValues.category);
    setSpecialty(initialValues.specialty);
    setInstitutionID(initialValues.institutionID);
    setLevel(initialValues.level);
    setStatus(initialValues.status);
    setPhone_number(initialValues.phone_number);
    setErrors({});
  };
  const validations = {
    first_name: [],
    last_name: [],
    role: [],
    email: [],
    category: [],
    specialty: [],
    institutionID: [{ type: "Required" }],
    level: [],
    status: [],
    phone_number: [],
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
          first_name,
          last_name,
          role,
          email,
          category,
          specialty,
          institutionID,
          level,
          status,
          phone_number,
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
            query: createUser.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={first_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name: value,
              last_name,
              role,
              email,
              category,
              specialty,
              institutionID,
              level,
              status,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.first_name ?? value;
          }
          if (errors.first_name?.hasError) {
            runValidationTasks("first_name", value);
          }
          setFirst_name(value);
        }}
        onBlur={() => runValidationTasks("first_name", first_name)}
        errorMessage={errors.first_name?.errorMessage}
        hasError={errors.first_name?.hasError}
        {...getOverrideProps(overrides, "first_name")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={last_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name: value,
              role,
              email,
              category,
              specialty,
              institutionID,
              level,
              status,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.last_name ?? value;
          }
          if (errors.last_name?.hasError) {
            runValidationTasks("last_name", value);
          }
          setLast_name(value);
        }}
        onBlur={() => runValidationTasks("last_name", last_name)}
        errorMessage={errors.last_name?.errorMessage}
        hasError={errors.last_name?.hasError}
        {...getOverrideProps(overrides, "last_name")}
      ></TextField>
      <TextField
        label="Role"
        isRequired={false}
        isReadOnly={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              role: value,
              email,
              category,
              specialty,
              institutionID,
              level,
              status,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
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
              first_name,
              last_name,
              role,
              email: value,
              category,
              specialty,
              institutionID,
              level,
              status,
              phone_number,
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
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              role,
              email,
              category: value,
              specialty,
              institutionID,
              level,
              status,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <TextField
        label="Specialty"
        isRequired={false}
        isReadOnly={false}
        value={specialty}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              role,
              email,
              category,
              specialty: value,
              institutionID,
              level,
              status,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.specialty ?? value;
          }
          if (errors.specialty?.hasError) {
            runValidationTasks("specialty", value);
          }
          setSpecialty(value);
        }}
        onBlur={() => runValidationTasks("specialty", specialty)}
        errorMessage={errors.specialty?.errorMessage}
        hasError={errors.specialty?.hasError}
        {...getOverrideProps(overrides, "specialty")}
      ></TextField>
      <TextField
        label="Institution id"
        isRequired={true}
        isReadOnly={false}
        value={institutionID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              role,
              email,
              category,
              specialty,
              institutionID: value,
              level,
              status,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.institutionID ?? value;
          }
          if (errors.institutionID?.hasError) {
            runValidationTasks("institutionID", value);
          }
          setInstitutionID(value);
        }}
        onBlur={() => runValidationTasks("institutionID", institutionID)}
        errorMessage={errors.institutionID?.errorMessage}
        hasError={errors.institutionID?.hasError}
        {...getOverrideProps(overrides, "institutionID")}
      ></TextField>
      <TextField
        label="Level"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={level}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              role,
              email,
              category,
              specialty,
              institutionID,
              level: value,
              status,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.level ?? value;
          }
          if (errors.level?.hasError) {
            runValidationTasks("level", value);
          }
          setLevel(value);
        }}
        onBlur={() => runValidationTasks("level", level)}
        errorMessage={errors.level?.errorMessage}
        hasError={errors.level?.hasError}
        {...getOverrideProps(overrides, "level")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={status}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              role,
              email,
              category,
              specialty,
              institutionID,
              level,
              status: value,
              phone_number,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={false}
        isReadOnly={false}
        value={phone_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first_name,
              last_name,
              role,
              email,
              category,
              specialty,
              institutionID,
              level,
              status,
              phone_number: value,
            };
            const result = onChange(modelFields);
            value = result?.phone_number ?? value;
          }
          if (errors.phone_number?.hasError) {
            runValidationTasks("phone_number", value);
          }
          setPhone_number(value);
        }}
        onBlur={() => runValidationTasks("phone_number", phone_number)}
        errorMessage={errors.phone_number?.errorMessage}
        hasError={errors.phone_number?.hasError}
        {...getOverrideProps(overrides, "phone_number")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
