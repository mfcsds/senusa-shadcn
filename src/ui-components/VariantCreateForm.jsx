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
import { createVariant } from "../graphql/mutations";
const client = generateClient();
export default function VariantCreateForm(props) {
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
    chrom: "",
    pos: "",
    ref: "",
    alt: "",
    qual: "",
    filter: "",
    info: "",
    hgvs: "",
    id_var: "",
    id_patient: "",
    id_vcf: "",
  };
  const [chrom, setChrom] = React.useState(initialValues.chrom);
  const [pos, setPos] = React.useState(initialValues.pos);
  const [ref, setRef] = React.useState(initialValues.ref);
  const [alt, setAlt] = React.useState(initialValues.alt);
  const [qual, setQual] = React.useState(initialValues.qual);
  const [filter, setFilter] = React.useState(initialValues.filter);
  const [info, setInfo] = React.useState(initialValues.info);
  const [hgvs, setHgvs] = React.useState(initialValues.hgvs);
  const [id_var, setId_var] = React.useState(initialValues.id_var);
  const [id_patient, setId_patient] = React.useState(initialValues.id_patient);
  const [id_vcf, setId_vcf] = React.useState(initialValues.id_vcf);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setChrom(initialValues.chrom);
    setPos(initialValues.pos);
    setRef(initialValues.ref);
    setAlt(initialValues.alt);
    setQual(initialValues.qual);
    setFilter(initialValues.filter);
    setInfo(initialValues.info);
    setHgvs(initialValues.hgvs);
    setId_var(initialValues.id_var);
    setId_patient(initialValues.id_patient);
    setId_vcf(initialValues.id_vcf);
    setErrors({});
  };
  const validations = {
    chrom: [],
    pos: [],
    ref: [],
    alt: [],
    qual: [],
    filter: [],
    info: [],
    hgvs: [],
    id_var: [],
    id_patient: [],
    id_vcf: [],
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
          chrom,
          pos,
          ref,
          alt,
          qual,
          filter,
          info,
          hgvs,
          id_var,
          id_patient,
          id_vcf,
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
            query: createVariant.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "VariantCreateForm")}
      {...rest}
    >
      <TextField
        label="Chrom"
        isRequired={false}
        isReadOnly={false}
        value={chrom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom: value,
              pos,
              ref,
              alt,
              qual,
              filter,
              info,
              hgvs,
              id_var,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.chrom ?? value;
          }
          if (errors.chrom?.hasError) {
            runValidationTasks("chrom", value);
          }
          setChrom(value);
        }}
        onBlur={() => runValidationTasks("chrom", chrom)}
        errorMessage={errors.chrom?.errorMessage}
        hasError={errors.chrom?.hasError}
        {...getOverrideProps(overrides, "chrom")}
      ></TextField>
      <TextField
        label="Pos"
        isRequired={false}
        isReadOnly={false}
        value={pos}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos: value,
              ref,
              alt,
              qual,
              filter,
              info,
              hgvs,
              id_var,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.pos ?? value;
          }
          if (errors.pos?.hasError) {
            runValidationTasks("pos", value);
          }
          setPos(value);
        }}
        onBlur={() => runValidationTasks("pos", pos)}
        errorMessage={errors.pos?.errorMessage}
        hasError={errors.pos?.hasError}
        {...getOverrideProps(overrides, "pos")}
      ></TextField>
      <TextField
        label="Ref"
        isRequired={false}
        isReadOnly={false}
        value={ref}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref: value,
              alt,
              qual,
              filter,
              info,
              hgvs,
              id_var,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.ref ?? value;
          }
          if (errors.ref?.hasError) {
            runValidationTasks("ref", value);
          }
          setRef(value);
        }}
        onBlur={() => runValidationTasks("ref", ref)}
        errorMessage={errors.ref?.errorMessage}
        hasError={errors.ref?.hasError}
        {...getOverrideProps(overrides, "ref")}
      ></TextField>
      <TextField
        label="Alt"
        isRequired={false}
        isReadOnly={false}
        value={alt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref,
              alt: value,
              qual,
              filter,
              info,
              hgvs,
              id_var,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.alt ?? value;
          }
          if (errors.alt?.hasError) {
            runValidationTasks("alt", value);
          }
          setAlt(value);
        }}
        onBlur={() => runValidationTasks("alt", alt)}
        errorMessage={errors.alt?.errorMessage}
        hasError={errors.alt?.hasError}
        {...getOverrideProps(overrides, "alt")}
      ></TextField>
      <TextField
        label="Qual"
        isRequired={false}
        isReadOnly={false}
        value={qual}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref,
              alt,
              qual: value,
              filter,
              info,
              hgvs,
              id_var,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.qual ?? value;
          }
          if (errors.qual?.hasError) {
            runValidationTasks("qual", value);
          }
          setQual(value);
        }}
        onBlur={() => runValidationTasks("qual", qual)}
        errorMessage={errors.qual?.errorMessage}
        hasError={errors.qual?.hasError}
        {...getOverrideProps(overrides, "qual")}
      ></TextField>
      <TextField
        label="Filter"
        isRequired={false}
        isReadOnly={false}
        value={filter}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref,
              alt,
              qual,
              filter: value,
              info,
              hgvs,
              id_var,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.filter ?? value;
          }
          if (errors.filter?.hasError) {
            runValidationTasks("filter", value);
          }
          setFilter(value);
        }}
        onBlur={() => runValidationTasks("filter", filter)}
        errorMessage={errors.filter?.errorMessage}
        hasError={errors.filter?.hasError}
        {...getOverrideProps(overrides, "filter")}
      ></TextField>
      <TextField
        label="Info"
        isRequired={false}
        isReadOnly={false}
        value={info}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref,
              alt,
              qual,
              filter,
              info: value,
              hgvs,
              id_var,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.info ?? value;
          }
          if (errors.info?.hasError) {
            runValidationTasks("info", value);
          }
          setInfo(value);
        }}
        onBlur={() => runValidationTasks("info", info)}
        errorMessage={errors.info?.errorMessage}
        hasError={errors.info?.hasError}
        {...getOverrideProps(overrides, "info")}
      ></TextField>
      <TextField
        label="Hgvs"
        isRequired={false}
        isReadOnly={false}
        value={hgvs}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref,
              alt,
              qual,
              filter,
              info,
              hgvs: value,
              id_var,
              id_patient,
              id_vcf,
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
        label="Id var"
        isRequired={false}
        isReadOnly={false}
        value={id_var}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref,
              alt,
              qual,
              filter,
              info,
              hgvs,
              id_var: value,
              id_patient,
              id_vcf,
            };
            const result = onChange(modelFields);
            value = result?.id_var ?? value;
          }
          if (errors.id_var?.hasError) {
            runValidationTasks("id_var", value);
          }
          setId_var(value);
        }}
        onBlur={() => runValidationTasks("id_var", id_var)}
        errorMessage={errors.id_var?.errorMessage}
        hasError={errors.id_var?.hasError}
        {...getOverrideProps(overrides, "id_var")}
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
              chrom,
              pos,
              ref,
              alt,
              qual,
              filter,
              info,
              hgvs,
              id_var,
              id_patient: value,
              id_vcf,
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
        label="Id vcf"
        isRequired={false}
        isReadOnly={false}
        value={id_vcf}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              chrom,
              pos,
              ref,
              alt,
              qual,
              filter,
              info,
              hgvs,
              id_var,
              id_patient,
              id_vcf: value,
            };
            const result = onChange(modelFields);
            value = result?.id_vcf ?? value;
          }
          if (errors.id_vcf?.hasError) {
            runValidationTasks("id_vcf", value);
          }
          setId_vcf(value);
        }}
        onBlur={() => runValidationTasks("id_vcf", id_vcf)}
        errorMessage={errors.id_vcf?.errorMessage}
        hasError={errors.id_vcf?.hasError}
        {...getOverrideProps(overrides, "id_vcf")}
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
