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
import { getVcfdata } from "../graphql/queries";
import { updateVcfdata } from "../graphql/mutations";
const client = generateClient();
export default function VcfdataUpdateForm(props) {
  const {
    id: idProp,
    vcfdata: vcfdataModelProp,
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
    sample_date: "",
    uploadAt: "",
    public_link: "",
    genome_reference: "",
  };
  const [id_patient, setId_patient] = React.useState(initialValues.id_patient);
  const [sample_date, setSample_date] = React.useState(
    initialValues.sample_date
  );
  const [uploadAt, setUploadAt] = React.useState(initialValues.uploadAt);
  const [public_link, setPublic_link] = React.useState(
    initialValues.public_link
  );
  const [genome_reference, setGenome_reference] = React.useState(
    initialValues.genome_reference
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = vcfdataRecord
      ? { ...initialValues, ...vcfdataRecord }
      : initialValues;
    setId_patient(cleanValues.id_patient);
    setSample_date(cleanValues.sample_date);
    setUploadAt(cleanValues.uploadAt);
    setPublic_link(cleanValues.public_link);
    setGenome_reference(cleanValues.genome_reference);
    setErrors({});
  };
  const [vcfdataRecord, setVcfdataRecord] = React.useState(vcfdataModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getVcfdata.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getVcfdata
        : vcfdataModelProp;
      setVcfdataRecord(record);
    };
    queryData();
  }, [idProp, vcfdataModelProp]);
  React.useEffect(resetStateValues, [vcfdataRecord]);
  const validations = {
    id_patient: [],
    sample_date: [],
    uploadAt: [],
    public_link: [],
    genome_reference: [],
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
          id_patient: id_patient ?? null,
          sample_date: sample_date ?? null,
          uploadAt: uploadAt ?? null,
          public_link: public_link ?? null,
          genome_reference: genome_reference ?? null,
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
            query: updateVcfdata.replaceAll("__typename", ""),
            variables: {
              input: {
                id: vcfdataRecord.id,
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
      {...getOverrideProps(overrides, "VcfdataUpdateForm")}
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
              sample_date,
              uploadAt,
              public_link,
              genome_reference,
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
        label="Sample date"
        isRequired={false}
        isReadOnly={false}
        value={sample_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              sample_date: value,
              uploadAt,
              public_link,
              genome_reference,
            };
            const result = onChange(modelFields);
            value = result?.sample_date ?? value;
          }
          if (errors.sample_date?.hasError) {
            runValidationTasks("sample_date", value);
          }
          setSample_date(value);
        }}
        onBlur={() => runValidationTasks("sample_date", sample_date)}
        errorMessage={errors.sample_date?.errorMessage}
        hasError={errors.sample_date?.hasError}
        {...getOverrideProps(overrides, "sample_date")}
      ></TextField>
      <TextField
        label="Upload at"
        isRequired={false}
        isReadOnly={false}
        value={uploadAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              sample_date,
              uploadAt: value,
              public_link,
              genome_reference,
            };
            const result = onChange(modelFields);
            value = result?.uploadAt ?? value;
          }
          if (errors.uploadAt?.hasError) {
            runValidationTasks("uploadAt", value);
          }
          setUploadAt(value);
        }}
        onBlur={() => runValidationTasks("uploadAt", uploadAt)}
        errorMessage={errors.uploadAt?.errorMessage}
        hasError={errors.uploadAt?.hasError}
        {...getOverrideProps(overrides, "uploadAt")}
      ></TextField>
      <TextField
        label="Public link"
        isRequired={false}
        isReadOnly={false}
        value={public_link}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              sample_date,
              uploadAt,
              public_link: value,
              genome_reference,
            };
            const result = onChange(modelFields);
            value = result?.public_link ?? value;
          }
          if (errors.public_link?.hasError) {
            runValidationTasks("public_link", value);
          }
          setPublic_link(value);
        }}
        onBlur={() => runValidationTasks("public_link", public_link)}
        errorMessage={errors.public_link?.errorMessage}
        hasError={errors.public_link?.hasError}
        {...getOverrideProps(overrides, "public_link")}
      ></TextField>
      <TextField
        label="Genome reference"
        isRequired={false}
        isReadOnly={false}
        value={genome_reference}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              sample_date,
              uploadAt,
              public_link,
              genome_reference: value,
            };
            const result = onChange(modelFields);
            value = result?.genome_reference ?? value;
          }
          if (errors.genome_reference?.hasError) {
            runValidationTasks("genome_reference", value);
          }
          setGenome_reference(value);
        }}
        onBlur={() => runValidationTasks("genome_reference", genome_reference)}
        errorMessage={errors.genome_reference?.errorMessage}
        hasError={errors.genome_reference?.hasError}
        {...getOverrideProps(overrides, "genome_reference")}
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
          isDisabled={!(idProp || vcfdataModelProp)}
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
              !(idProp || vcfdataModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
