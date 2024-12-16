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
import { createFamilyHistoryDisease } from "../graphql/mutations";
const client = generateClient();
export default function FamilyHistoryDiseaseCreateForm(props) {
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
    id_patient: "",
    hpo_code: "",
    hpo_desc: "",
  };
  const [id_patient, setId_patient] = React.useState(initialValues.id_patient);
  const [hpo_code, setHpo_code] = React.useState(initialValues.hpo_code);
  const [hpo_desc, setHpo_desc] = React.useState(initialValues.hpo_desc);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setId_patient(initialValues.id_patient);
    setHpo_code(initialValues.hpo_code);
    setHpo_desc(initialValues.hpo_desc);
    setErrors({});
  };
  const validations = {
    id_patient: [],
    hpo_code: [],
    hpo_desc: [],
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
          id_patient,
          hpo_code,
          hpo_desc,
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
            query: createFamilyHistoryDisease.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "FamilyHistoryDiseaseCreateForm")}
      {...rest}
    >
      <TextField
        label="Id patient"
        isRequired={false}
        isReadOnly={false}
        value={id_patient}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient: value,
              hpo_code,
              hpo_desc,
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
        label="Hpo code"
        isRequired={false}
        isReadOnly={false}
        value={hpo_code}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              hpo_code: value,
              hpo_desc,
            };
            const result = onChange(modelFields);
            value = result?.hpo_code ?? value;
          }
          if (errors.hpo_code?.hasError) {
            runValidationTasks("hpo_code", value);
          }
          setHpo_code(value);
        }}
        onBlur={() => runValidationTasks("hpo_code", hpo_code)}
        errorMessage={errors.hpo_code?.errorMessage}
        hasError={errors.hpo_code?.hasError}
        {...getOverrideProps(overrides, "hpo_code")}
      ></TextField>
      <TextField
        label="Hpo desc"
        isRequired={false}
        isReadOnly={false}
        value={hpo_desc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              hpo_code,
              hpo_desc: value,
            };
            const result = onChange(modelFields);
            value = result?.hpo_desc ?? value;
          }
          if (errors.hpo_desc?.hasError) {
            runValidationTasks("hpo_desc", value);
          }
          setHpo_desc(value);
        }}
        onBlur={() => runValidationTasks("hpo_desc", hpo_desc)}
        errorMessage={errors.hpo_desc?.errorMessage}
        hasError={errors.hpo_desc?.hasError}
        {...getOverrideProps(overrides, "hpo_desc")}
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
