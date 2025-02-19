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
import { getUserNotifications } from "../graphql/queries";
import { updateUserNotifications } from "../graphql/mutations";
const client = generateClient();
export default function UserNotificationsUpdateForm(props) {
  const {
    id: idProp,
    userNotifications: userNotificationsModelProp,
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
    markasread: false,
    id_patient: "",
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
  const [markasread, setMarkasread] = React.useState(initialValues.markasread);
  const [id_patient, setId_patient] = React.useState(initialValues.id_patient);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userNotificationsRecord
      ? { ...initialValues, ...userNotificationsRecord }
      : initialValues;
    setUser_id(cleanValues.user_id);
    setInstitutionID(cleanValues.institutionID);
    setMessage(cleanValues.message);
    setId_fromuser(cleanValues.id_fromuser);
    setId_report(cleanValues.id_report);
    setMarkasread(cleanValues.markasread);
    setId_patient(cleanValues.id_patient);
    setErrors({});
  };
  const [userNotificationsRecord, setUserNotificationsRecord] = React.useState(
    userNotificationsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUserNotifications.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUserNotifications
        : userNotificationsModelProp;
      setUserNotificationsRecord(record);
    };
    queryData();
  }, [idProp, userNotificationsModelProp]);
  React.useEffect(resetStateValues, [userNotificationsRecord]);
  const validations = {
    user_id: [],
    institutionID: [],
    message: [],
    id_fromuser: [],
    id_report: [],
    markasread: [],
    id_patient: [],
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
          user_id: user_id ?? null,
          institutionID: institutionID ?? null,
          message: message ?? null,
          id_fromuser: id_fromuser ?? null,
          id_report: id_report ?? null,
          markasread: markasread ?? null,
          id_patient: id_patient ?? null,
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
            query: updateUserNotifications.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userNotificationsRecord.id,
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
      {...getOverrideProps(overrides, "UserNotificationsUpdateForm")}
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
              markasread,
              id_patient,
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
              markasread,
              id_patient,
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
              markasread,
              id_patient,
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
              markasread,
              id_patient,
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
              markasread,
              id_patient,
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
      <SwitchField
        label="Markasread"
        defaultChecked={false}
        isDisabled={false}
        isChecked={markasread}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              user_id,
              institutionID,
              message,
              id_fromuser,
              id_report,
              markasread: value,
              id_patient,
            };
            const result = onChange(modelFields);
            value = result?.markasread ?? value;
          }
          if (errors.markasread?.hasError) {
            runValidationTasks("markasread", value);
          }
          setMarkasread(value);
        }}
        onBlur={() => runValidationTasks("markasread", markasread)}
        errorMessage={errors.markasread?.errorMessage}
        hasError={errors.markasread?.hasError}
        {...getOverrideProps(overrides, "markasread")}
      ></SwitchField>
      <TextField
        label="Id patient"
        isRequired={false}
        isReadOnly={false}
        value={id_patient}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_id,
              institutionID,
              message,
              id_fromuser,
              id_report,
              markasread,
              id_patient: value,
            };
            const result = onChange(modelFields);
            value = result?.id_patient ?? value;
          }
          if (errors.id_patient?.hasError) {
            runValidationTasks("id_patient", value);
          }
          setId_patient(value);
        }}
        onBlur={() => runValidationTasks("id_patient", id_patient)}
        errorMessage={errors.id_patient?.errorMessage}
        hasError={errors.id_patient?.hasError}
        {...getOverrideProps(overrides, "id_patient")}
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
          isDisabled={!(idProp || userNotificationsModelProp)}
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
              !(idProp || userNotificationsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
