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
import { createUserNotifications } from "../graphql/mutations";
const client = generateClient();
export default function UserNotificationsCreateForm(props) {
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
    user_id: "",
    institutionID: "",
    message: "",
    id_fromuser: "",
    id_report: "",
  };
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [institutionID, setInstitutionID] = React.useState(
    initialValues.institutionID
  );
  const [message, setMessage] = React.useState(initialValues.message);
  const [id_fromuser, setId_fromuser] = React.useState(
    initialValues.id_fromuser
  );
  const [id_report, setId_report] = React.useState(initialValues.id_report);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUser_id(initialValues.user_id);
    setInstitutionID(initialValues.institutionID);
    setMessage(initialValues.message);
    setId_fromuser(initialValues.id_fromuser);
    setId_report(initialValues.id_report);
    setErrors({});
  };
  const validations = {
    user_id: [],
    institutionID: [],
    message: [],
    id_fromuser: [],
    id_report: [],
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
          user_id,
          institutionID,
          message,
          id_fromuser,
          id_report,
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
            query: createUserNotifications.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "UserNotificationsCreateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={user_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_id: value,
              institutionID,
              message,
              id_fromuser,
              id_report,
            };
            const result = onChange(modelFields);
            value = result?.user_id ?? value;
          }
          if (errors.user_id?.hasError) {
            runValidationTasks("user_id", value);
          }
          setUser_id(value);
        }}
        onBlur={() => runValidationTasks("user_id", user_id)}
        errorMessage={errors.user_id?.errorMessage}
        hasError={errors.user_id?.hasError}
        {...getOverrideProps(overrides, "user_id")}
      ></TextField>
      <TextField
        label="Institution id"
        isRequired={false}
        isReadOnly={false}
        value={institutionID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_id,
              institutionID: value,
              message,
              id_fromuser,
              id_report,
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
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_id,
              institutionID,
              message: value,
              id_fromuser,
              id_report,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Id fromuser"
        isRequired={false}
        isReadOnly={false}
        value={id_fromuser}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_id,
              institutionID,
              message,
              id_fromuser: value,
              id_report,
            };
            const result = onChange(modelFields);
            value = result?.id_fromuser ?? value;
          }
          if (errors.id_fromuser?.hasError) {
            runValidationTasks("id_fromuser", value);
          }
          setId_fromuser(value);
        }}
        onBlur={() => runValidationTasks("id_fromuser", id_fromuser)}
        errorMessage={errors.id_fromuser?.errorMessage}
        hasError={errors.id_fromuser?.hasError}
        {...getOverrideProps(overrides, "id_fromuser")}
      ></TextField>
      <TextField
        label="Id report"
        isRequired={false}
        isReadOnly={false}
        value={id_report}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_id,
              institutionID,
              message,
              id_fromuser,
              id_report: value,
            };
            const result = onChange(modelFields);
            value = result?.id_report ?? value;
          }
          if (errors.id_report?.hasError) {
            runValidationTasks("id_report", value);
          }
          setId_report(value);
        }}
        onBlur={() => runValidationTasks("id_report", id_report)}
        errorMessage={errors.id_report?.errorMessage}
        hasError={errors.id_report?.hasError}
        {...getOverrideProps(overrides, "id_report")}
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
