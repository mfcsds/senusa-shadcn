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
import { createPatientDocuments } from "../graphql/mutations";
const client = generateClient();
export default function PatientDocumentsCreateForm(props) {
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
    name: "",
    pathfile: "",
    doctype: "",
    id_patient: "",
    id_report: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [pathfile, setPathfile] = React.useState(initialValues.pathfile);
  const [doctype, setDoctype] = React.useState(initialValues.doctype);
  const [id_patient, setId_patient] = React.useState(initialValues.id_patient);
  const [id_report, setId_report] = React.useState(initialValues.id_report);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setPathfile(initialValues.pathfile);
    setDoctype(initialValues.doctype);
    setId_patient(initialValues.id_patient);
    setId_report(initialValues.id_report);
    setErrors({});
  };
  const validations = {
    name: [],
    pathfile: [],
    doctype: [],
    id_patient: [],
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
          name,
          pathfile,
          doctype,
          id_patient,
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
            query: createPatientDocuments.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "PatientDocumentsCreateForm")}
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
              pathfile,
              doctype,
              id_patient,
              id_report,
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
        label="Pathfile"
        isRequired={false}
        isReadOnly={false}
        value={pathfile}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              pathfile: value,
              doctype,
              id_patient,
              id_report,
            };
            const result = onChange(modelFields);
            value = result?.pathfile ?? value;
          }
          if (errors.pathfile?.hasError) {
            runValidationTasks("pathfile", value);
          }
          setPathfile(value);
        }}
        onBlur={() => runValidationTasks("pathfile", pathfile)}
        errorMessage={errors.pathfile?.errorMessage}
        hasError={errors.pathfile?.hasError}
        {...getOverrideProps(overrides, "pathfile")}
      ></TextField>
      <TextField
        label="Doctype"
        isRequired={false}
        isReadOnly={false}
        value={doctype}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              pathfile,
              doctype: value,
              id_patient,
              id_report,
            };
            const result = onChange(modelFields);
            value = result?.doctype ?? value;
          }
          if (errors.doctype?.hasError) {
            runValidationTasks("doctype", value);
          }
          setDoctype(value);
        }}
        onBlur={() => runValidationTasks("doctype", doctype)}
        errorMessage={errors.doctype?.errorMessage}
        hasError={errors.doctype?.hasError}
        {...getOverrideProps(overrides, "doctype")}
      ></TextField>
      <TextField
        label="Id patient"
        isRequired={false}
        isReadOnly={false}
        value={id_patient}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              pathfile,
              doctype,
              id_patient: value,
              id_report,
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
      <TextField
        label="Id report"
        isRequired={false}
        isReadOnly={false}
        value={id_report}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              pathfile,
              doctype,
              id_patient,
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
