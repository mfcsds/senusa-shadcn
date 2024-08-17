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
import { getPhenotype } from "../graphql/queries";
import { updatePhenotype } from "../graphql/mutations";
const client = generateClient();
export default function PhenotypeUpdateForm(props) {
  const {
    id: idProp,
    phenotype: phenotypeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    PhenotypeCode: "",
    Description: "",
  };
  const [PhenotypeCode, setPhenotypeCode] = React.useState(
    initialValues.PhenotypeCode
  );
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = phenotypeRecord
      ? { ...initialValues, ...phenotypeRecord }
      : initialValues;
    setPhenotypeCode(cleanValues.PhenotypeCode);
    setDescription(cleanValues.Description);
    setErrors({});
  };
  const [phenotypeRecord, setPhenotypeRecord] =
    React.useState(phenotypeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPhenotype.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPhenotype
        : phenotypeModelProp;
      setPhenotypeRecord(record);
    };
    queryData();
  }, [idProp, phenotypeModelProp]);
  React.useEffect(resetStateValues, [phenotypeRecord]);
  const validations = {
    PhenotypeCode: [],
    Description: [],
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
          PhenotypeCode: PhenotypeCode ?? null,
          Description: Description ?? null,
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
            query: updatePhenotype.replaceAll("__typename", ""),
            variables: {
              input: {
                id: phenotypeRecord.id,
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
      {...getOverrideProps(overrides, "PhenotypeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Phenotype code"
        isRequired={false}
        isReadOnly={false}
        value={PhenotypeCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PhenotypeCode: value,
              Description,
            };
            const result = onChange(modelFields);
            value = result?.PhenotypeCode ?? value;
          }
          if (errors.PhenotypeCode?.hasError) {
            runValidationTasks("PhenotypeCode", value);
          }
          setPhenotypeCode(value);
        }}
        onBlur={() => runValidationTasks("PhenotypeCode", PhenotypeCode)}
        errorMessage={errors.PhenotypeCode?.errorMessage}
        hasError={errors.PhenotypeCode?.hasError}
        {...getOverrideProps(overrides, "PhenotypeCode")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              PhenotypeCode,
              Description: value,
            };
            const result = onChange(modelFields);
            value = result?.Description ?? value;
          }
          if (errors.Description?.hasError) {
            runValidationTasks("Description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("Description", Description)}
        errorMessage={errors.Description?.errorMessage}
        hasError={errors.Description?.hasError}
        {...getOverrideProps(overrides, "Description")}
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
          isDisabled={!(idProp || phenotypeModelProp)}
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
              !(idProp || phenotypeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
