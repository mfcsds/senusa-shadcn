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
import { getVariantInterpretation } from "../graphql/queries";
import { updateVariantInterpretation } from "../graphql/mutations";
const client = generateClient();
export default function VariantInterpretationUpdateForm(props) {
  const {
    id: idProp,
    variantInterpretation: variantInterpretationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    hgvs: "",
    text: "",
    id_patient: "",
    id_report: "",
    id_varsample: "",
    gene: "",
    alldesc: "",
  };
  const [hgvs, setHgvs] = React.useState(initialValues.hgvs);
  const [text, setText] = React.useState(initialValues.text);
  const [id_patient, setId_patient] = React.useState(initialValues.id_patient);
  const [id_report, setId_report] = React.useState(initialValues.id_report);
  const [id_varsample, setId_varsample] = React.useState(
    initialValues.id_varsample
  );
  const [gene, setGene] = React.useState(initialValues.gene);
  const [alldesc, setAlldesc] = React.useState(initialValues.alldesc);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = variantInterpretationRecord
      ? { ...initialValues, ...variantInterpretationRecord }
      : initialValues;
    setHgvs(cleanValues.hgvs);
    setText(cleanValues.text);
    setId_patient(cleanValues.id_patient);
    setId_report(cleanValues.id_report);
    setId_varsample(cleanValues.id_varsample);
    setGene(cleanValues.gene);
    setAlldesc(cleanValues.alldesc);
    setErrors({});
  };
  const [variantInterpretationRecord, setVariantInterpretationRecord] =
    React.useState(variantInterpretationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getVariantInterpretation.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getVariantInterpretation
        : variantInterpretationModelProp;
      setVariantInterpretationRecord(record);
    };
    queryData();
  }, [idProp, variantInterpretationModelProp]);
  React.useEffect(resetStateValues, [variantInterpretationRecord]);
  const validations = {
    hgvs: [],
    text: [],
    id_patient: [],
    id_report: [],
    id_varsample: [],
    gene: [],
    alldesc: [],
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
          hgvs: hgvs ?? null,
          text: text ?? null,
          id_patient: id_patient ?? null,
          id_report: id_report ?? null,
          id_varsample: id_varsample ?? null,
          gene: gene ?? null,
          alldesc: alldesc ?? null,
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
            query: updateVariantInterpretation.replaceAll("__typename", ""),
            variables: {
              input: {
                id: variantInterpretationRecord.id,
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
      {...getOverrideProps(overrides, "VariantInterpretationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Hgvs"
        isRequired={false}
        isReadOnly={false}
        value={hgvs}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hgvs: value,
              text,
              id_patient,
              id_report,
              id_varsample,
              gene,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.hgvs ?? value;
          }
          if (errors.hgvs?.hasError) {
            runValidationTasks("hgvs", value);
          }
          setHgvs(value);
        }}
        onBlur={() => runValidationTasks("hgvs", hgvs)}
        errorMessage={errors.hgvs?.errorMessage}
        hasError={errors.hgvs?.hasError}
        {...getOverrideProps(overrides, "hgvs")}
      ></TextField>
      <TextField
        label="Text"
        isRequired={false}
        isReadOnly={false}
        value={text}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hgvs,
              text: value,
              id_patient,
              id_report,
              id_varsample,
              gene,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.text ?? value;
          }
          if (errors.text?.hasError) {
            runValidationTasks("text", value);
          }
          setText(value);
        }}
        onBlur={() => runValidationTasks("text", text)}
        errorMessage={errors.text?.errorMessage}
        hasError={errors.text?.hasError}
        {...getOverrideProps(overrides, "text")}
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
              hgvs,
              text,
              id_patient: value,
              id_report,
              id_varsample,
              gene,
              alldesc,
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
              hgvs,
              text,
              id_patient,
              id_report: value,
              id_varsample,
              gene,
              alldesc,
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
      <TextField
        label="Id varsample"
        isRequired={false}
        isReadOnly={false}
        value={id_varsample}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hgvs,
              text,
              id_patient,
              id_report,
              id_varsample: value,
              gene,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.id_varsample ?? value;
          }
          if (errors.id_varsample?.hasError) {
            runValidationTasks("id_varsample", value);
          }
          setId_varsample(value);
        }}
        onBlur={() => runValidationTasks("id_varsample", id_varsample)}
        errorMessage={errors.id_varsample?.errorMessage}
        hasError={errors.id_varsample?.hasError}
        {...getOverrideProps(overrides, "id_varsample")}
      ></TextField>
      <TextField
        label="Gene"
        isRequired={false}
        isReadOnly={false}
        value={gene}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hgvs,
              text,
              id_patient,
              id_report,
              id_varsample,
              gene: value,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.gene ?? value;
          }
          if (errors.gene?.hasError) {
            runValidationTasks("gene", value);
          }
          setGene(value);
        }}
        onBlur={() => runValidationTasks("gene", gene)}
        errorMessage={errors.gene?.errorMessage}
        hasError={errors.gene?.hasError}
        {...getOverrideProps(overrides, "gene")}
      ></TextField>
      <TextField
        label="Alldesc"
        isRequired={false}
        isReadOnly={false}
        value={alldesc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hgvs,
              text,
              id_patient,
              id_report,
              id_varsample,
              gene,
              alldesc: value,
            };
            const result = onChange(modelFields);
            value = result?.alldesc ?? value;
          }
          if (errors.alldesc?.hasError) {
            runValidationTasks("alldesc", value);
          }
          setAlldesc(value);
        }}
        onBlur={() => runValidationTasks("alldesc", alldesc)}
        errorMessage={errors.alldesc?.errorMessage}
        hasError={errors.alldesc?.hasError}
        {...getOverrideProps(overrides, "alldesc")}
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
          isDisabled={!(idProp || variantInterpretationModelProp)}
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
              !(idProp || variantInterpretationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
