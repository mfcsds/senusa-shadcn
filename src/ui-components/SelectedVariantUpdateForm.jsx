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
import { getSelectedVariant } from "../graphql/queries";
import { updateSelectedVariant } from "../graphql/mutations";
const client = generateClient();
export default function SelectedVariantUpdateForm(props) {
  const {
    id: idProp,
    selectedVariant: selectedVariantModelProp,
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
    id_vcf: "",
    id_report: "",
    gene_id: "",
    gene_symbol: "",
    chrom: "",
    pos: "",
    id_var: "",
    ref: "",
    alt: "",
    qual: "",
    zigosity: "",
    global_allele: "",
    functional_impact: "",
    acmg: "",
    reviewer_class: "",
    clinical_sign: "",
    hgvs: "",
    severe_consequence: "",
    sift_score: "",
    sift_prediction: "",
    phenotypes: "",
    rsID: "",
    gnomade: "",
    gnomadg: "",
    alldesc: "",
  };
  const [id_patient, setId_patient] = React.useState(initialValues.id_patient);
  const [id_vcf, setId_vcf] = React.useState(initialValues.id_vcf);
  const [id_report, setId_report] = React.useState(initialValues.id_report);
  const [gene_id, setGene_id] = React.useState(initialValues.gene_id);
  const [gene_symbol, setGene_symbol] = React.useState(
    initialValues.gene_symbol
  );
  const [chrom, setChrom] = React.useState(initialValues.chrom);
  const [pos, setPos] = React.useState(initialValues.pos);
  const [id_var, setId_var] = React.useState(initialValues.id_var);
  const [ref, setRef] = React.useState(initialValues.ref);
  const [alt, setAlt] = React.useState(initialValues.alt);
  const [qual, setQual] = React.useState(initialValues.qual);
  const [zigosity, setZigosity] = React.useState(initialValues.zigosity);
  const [global_allele, setGlobal_allele] = React.useState(
    initialValues.global_allele
  );
  const [functional_impact, setFunctional_impact] = React.useState(
    initialValues.functional_impact
  );
  const [acmg, setAcmg] = React.useState(initialValues.acmg);
  const [reviewer_class, setReviewer_class] = React.useState(
    initialValues.reviewer_class
  );
  const [clinical_sign, setClinical_sign] = React.useState(
    initialValues.clinical_sign
  );
  const [hgvs, setHgvs] = React.useState(initialValues.hgvs);
  const [severe_consequence, setSevere_consequence] = React.useState(
    initialValues.severe_consequence
  );
  const [sift_score, setSift_score] = React.useState(initialValues.sift_score);
  const [sift_prediction, setSift_prediction] = React.useState(
    initialValues.sift_prediction
  );
  const [phenotypes, setPhenotypes] = React.useState(initialValues.phenotypes);
  const [rsID, setRsID] = React.useState(initialValues.rsID);
  const [gnomade, setGnomade] = React.useState(initialValues.gnomade);
  const [gnomadg, setGnomadg] = React.useState(initialValues.gnomadg);
  const [alldesc, setAlldesc] = React.useState(initialValues.alldesc);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = selectedVariantRecord
      ? { ...initialValues, ...selectedVariantRecord }
      : initialValues;
    setId_patient(cleanValues.id_patient);
    setId_vcf(cleanValues.id_vcf);
    setId_report(cleanValues.id_report);
    setGene_id(cleanValues.gene_id);
    setGene_symbol(cleanValues.gene_symbol);
    setChrom(cleanValues.chrom);
    setPos(cleanValues.pos);
    setId_var(cleanValues.id_var);
    setRef(cleanValues.ref);
    setAlt(cleanValues.alt);
    setQual(cleanValues.qual);
    setZigosity(cleanValues.zigosity);
    setGlobal_allele(cleanValues.global_allele);
    setFunctional_impact(cleanValues.functional_impact);
    setAcmg(cleanValues.acmg);
    setReviewer_class(cleanValues.reviewer_class);
    setClinical_sign(cleanValues.clinical_sign);
    setHgvs(cleanValues.hgvs);
    setSevere_consequence(cleanValues.severe_consequence);
    setSift_score(cleanValues.sift_score);
    setSift_prediction(cleanValues.sift_prediction);
    setPhenotypes(cleanValues.phenotypes);
    setRsID(cleanValues.rsID);
    setGnomade(cleanValues.gnomade);
    setGnomadg(cleanValues.gnomadg);
    setAlldesc(cleanValues.alldesc);
    setErrors({});
  };
  const [selectedVariantRecord, setSelectedVariantRecord] = React.useState(
    selectedVariantModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSelectedVariant.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSelectedVariant
        : selectedVariantModelProp;
      setSelectedVariantRecord(record);
    };
    queryData();
  }, [idProp, selectedVariantModelProp]);
  React.useEffect(resetStateValues, [selectedVariantRecord]);
  const validations = {
    id_patient: [],
    id_vcf: [],
    id_report: [],
    gene_id: [],
    gene_symbol: [],
    chrom: [],
    pos: [],
    id_var: [],
    ref: [],
    alt: [],
    qual: [],
    zigosity: [],
    global_allele: [],
    functional_impact: [],
    acmg: [],
    reviewer_class: [],
    clinical_sign: [],
    hgvs: [],
    severe_consequence: [],
    sift_score: [],
    sift_prediction: [],
    phenotypes: [],
    rsID: [],
    gnomade: [],
    gnomadg: [],
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
          id_patient: id_patient ?? null,
          id_vcf: id_vcf ?? null,
          id_report: id_report ?? null,
          gene_id: gene_id ?? null,
          gene_symbol: gene_symbol ?? null,
          chrom: chrom ?? null,
          pos: pos ?? null,
          id_var: id_var ?? null,
          ref: ref ?? null,
          alt: alt ?? null,
          qual: qual ?? null,
          zigosity: zigosity ?? null,
          global_allele: global_allele ?? null,
          functional_impact: functional_impact ?? null,
          acmg: acmg ?? null,
          reviewer_class: reviewer_class ?? null,
          clinical_sign: clinical_sign ?? null,
          hgvs: hgvs ?? null,
          severe_consequence: severe_consequence ?? null,
          sift_score: sift_score ?? null,
          sift_prediction: sift_prediction ?? null,
          phenotypes: phenotypes ?? null,
          rsID: rsID ?? null,
          gnomade: gnomade ?? null,
          gnomadg: gnomadg ?? null,
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
            query: updateSelectedVariant.replaceAll("__typename", ""),
            variables: {
              input: {
                id: selectedVariantRecord.id,
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
      {...getOverrideProps(overrides, "SelectedVariantUpdateForm")}
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
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
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
        label="Id vcf"
        isRequired={false}
        isReadOnly={false}
        value={id_vcf}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf: value,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
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
      <TextField
        label="Id report"
        isRequired={false}
        isReadOnly={false}
        value={id_report}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report: value,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
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
        label="Gene id"
        isRequired={false}
        isReadOnly={false}
        value={gene_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id: value,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.gene_id ?? value;
          }
          if (errors.gene_id?.hasError) {
            runValidationTasks("gene_id", value);
          }
          setGene_id(value);
        }}
        onBlur={() => runValidationTasks("gene_id", gene_id)}
        errorMessage={errors.gene_id?.errorMessage}
        hasError={errors.gene_id?.hasError}
        {...getOverrideProps(overrides, "gene_id")}
      ></TextField>
      <TextField
        label="Gene symbol"
        isRequired={false}
        isReadOnly={false}
        value={gene_symbol}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol: value,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.gene_symbol ?? value;
          }
          if (errors.gene_symbol?.hasError) {
            runValidationTasks("gene_symbol", value);
          }
          setGene_symbol(value);
        }}
        onBlur={() => runValidationTasks("gene_symbol", gene_symbol)}
        errorMessage={errors.gene_symbol?.errorMessage}
        hasError={errors.gene_symbol?.hasError}
        {...getOverrideProps(overrides, "gene_symbol")}
      ></TextField>
      <TextField
        label="Chrom"
        isRequired={false}
        isReadOnly={false}
        value={chrom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom: value,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
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
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos: value,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
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
        label="Id var"
        isRequired={false}
        isReadOnly={false}
        value={id_var}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var: value,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
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
        label="Ref"
        isRequired={false}
        isReadOnly={false}
        value={ref}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref: value,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
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
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt: value,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
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
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual: value,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
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
        label="Zigosity"
        isRequired={false}
        isReadOnly={false}
        value={zigosity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity: value,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.zigosity ?? value;
          }
          if (errors.zigosity?.hasError) {
            runValidationTasks("zigosity", value);
          }
          setZigosity(value);
        }}
        onBlur={() => runValidationTasks("zigosity", zigosity)}
        errorMessage={errors.zigosity?.errorMessage}
        hasError={errors.zigosity?.hasError}
        {...getOverrideProps(overrides, "zigosity")}
      ></TextField>
      <TextField
        label="Global allele"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={global_allele}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele: value,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.global_allele ?? value;
          }
          if (errors.global_allele?.hasError) {
            runValidationTasks("global_allele", value);
          }
          setGlobal_allele(value);
        }}
        onBlur={() => runValidationTasks("global_allele", global_allele)}
        errorMessage={errors.global_allele?.errorMessage}
        hasError={errors.global_allele?.hasError}
        {...getOverrideProps(overrides, "global_allele")}
      ></TextField>
      <TextField
        label="Functional impact"
        isRequired={false}
        isReadOnly={false}
        value={functional_impact}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact: value,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.functional_impact ?? value;
          }
          if (errors.functional_impact?.hasError) {
            runValidationTasks("functional_impact", value);
          }
          setFunctional_impact(value);
        }}
        onBlur={() =>
          runValidationTasks("functional_impact", functional_impact)
        }
        errorMessage={errors.functional_impact?.errorMessage}
        hasError={errors.functional_impact?.hasError}
        {...getOverrideProps(overrides, "functional_impact")}
      ></TextField>
      <TextField
        label="Acmg"
        isRequired={false}
        isReadOnly={false}
        value={acmg}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg: value,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.acmg ?? value;
          }
          if (errors.acmg?.hasError) {
            runValidationTasks("acmg", value);
          }
          setAcmg(value);
        }}
        onBlur={() => runValidationTasks("acmg", acmg)}
        errorMessage={errors.acmg?.errorMessage}
        hasError={errors.acmg?.hasError}
        {...getOverrideProps(overrides, "acmg")}
      ></TextField>
      <TextField
        label="Reviewer class"
        isRequired={false}
        isReadOnly={false}
        value={reviewer_class}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class: value,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.reviewer_class ?? value;
          }
          if (errors.reviewer_class?.hasError) {
            runValidationTasks("reviewer_class", value);
          }
          setReviewer_class(value);
        }}
        onBlur={() => runValidationTasks("reviewer_class", reviewer_class)}
        errorMessage={errors.reviewer_class?.errorMessage}
        hasError={errors.reviewer_class?.hasError}
        {...getOverrideProps(overrides, "reviewer_class")}
      ></TextField>
      <TextField
        label="Clinical sign"
        isRequired={false}
        isReadOnly={false}
        value={clinical_sign}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign: value,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.clinical_sign ?? value;
          }
          if (errors.clinical_sign?.hasError) {
            runValidationTasks("clinical_sign", value);
          }
          setClinical_sign(value);
        }}
        onBlur={() => runValidationTasks("clinical_sign", clinical_sign)}
        errorMessage={errors.clinical_sign?.errorMessage}
        hasError={errors.clinical_sign?.hasError}
        {...getOverrideProps(overrides, "clinical_sign")}
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
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs: value,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
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
        label="Severe consequence"
        isRequired={false}
        isReadOnly={false}
        value={severe_consequence}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence: value,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.severe_consequence ?? value;
          }
          if (errors.severe_consequence?.hasError) {
            runValidationTasks("severe_consequence", value);
          }
          setSevere_consequence(value);
        }}
        onBlur={() =>
          runValidationTasks("severe_consequence", severe_consequence)
        }
        errorMessage={errors.severe_consequence?.errorMessage}
        hasError={errors.severe_consequence?.hasError}
        {...getOverrideProps(overrides, "severe_consequence")}
      ></TextField>
      <TextField
        label="Sift score"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={sift_score}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score: value,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.sift_score ?? value;
          }
          if (errors.sift_score?.hasError) {
            runValidationTasks("sift_score", value);
          }
          setSift_score(value);
        }}
        onBlur={() => runValidationTasks("sift_score", sift_score)}
        errorMessage={errors.sift_score?.errorMessage}
        hasError={errors.sift_score?.hasError}
        {...getOverrideProps(overrides, "sift_score")}
      ></TextField>
      <TextField
        label="Sift prediction"
        isRequired={false}
        isReadOnly={false}
        value={sift_prediction}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction: value,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.sift_prediction ?? value;
          }
          if (errors.sift_prediction?.hasError) {
            runValidationTasks("sift_prediction", value);
          }
          setSift_prediction(value);
        }}
        onBlur={() => runValidationTasks("sift_prediction", sift_prediction)}
        errorMessage={errors.sift_prediction?.errorMessage}
        hasError={errors.sift_prediction?.hasError}
        {...getOverrideProps(overrides, "sift_prediction")}
      ></TextField>
      <TextField
        label="Phenotypes"
        isRequired={false}
        isReadOnly={false}
        value={phenotypes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes: value,
              rsID,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.phenotypes ?? value;
          }
          if (errors.phenotypes?.hasError) {
            runValidationTasks("phenotypes", value);
          }
          setPhenotypes(value);
        }}
        onBlur={() => runValidationTasks("phenotypes", phenotypes)}
        errorMessage={errors.phenotypes?.errorMessage}
        hasError={errors.phenotypes?.hasError}
        {...getOverrideProps(overrides, "phenotypes")}
      ></TextField>
      <TextField
        label="Rs id"
        isRequired={false}
        isReadOnly={false}
        value={rsID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID: value,
              gnomade,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.rsID ?? value;
          }
          if (errors.rsID?.hasError) {
            runValidationTasks("rsID", value);
          }
          setRsID(value);
        }}
        onBlur={() => runValidationTasks("rsID", rsID)}
        errorMessage={errors.rsID?.errorMessage}
        hasError={errors.rsID?.hasError}
        {...getOverrideProps(overrides, "rsID")}
      ></TextField>
      <TextField
        label="Gnomade"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={gnomade}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade: value,
              gnomadg,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.gnomade ?? value;
          }
          if (errors.gnomade?.hasError) {
            runValidationTasks("gnomade", value);
          }
          setGnomade(value);
        }}
        onBlur={() => runValidationTasks("gnomade", gnomade)}
        errorMessage={errors.gnomade?.errorMessage}
        hasError={errors.gnomade?.hasError}
        {...getOverrideProps(overrides, "gnomade")}
      ></TextField>
      <TextField
        label="Gnomadg"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={gnomadg}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg: value,
              alldesc,
            };
            const result = onChange(modelFields);
            value = result?.gnomadg ?? value;
          }
          if (errors.gnomadg?.hasError) {
            runValidationTasks("gnomadg", value);
          }
          setGnomadg(value);
        }}
        onBlur={() => runValidationTasks("gnomadg", gnomadg)}
        errorMessage={errors.gnomadg?.errorMessage}
        hasError={errors.gnomadg?.hasError}
        {...getOverrideProps(overrides, "gnomadg")}
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
              id_patient,
              id_vcf,
              id_report,
              gene_id,
              gene_symbol,
              chrom,
              pos,
              id_var,
              ref,
              alt,
              qual,
              zigosity,
              global_allele,
              functional_impact,
              acmg,
              reviewer_class,
              clinical_sign,
              hgvs,
              severe_consequence,
              sift_score,
              sift_prediction,
              phenotypes,
              rsID,
              gnomade,
              gnomadg,
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
          isDisabled={!(idProp || selectedVariantModelProp)}
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
              !(idProp || selectedVariantModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
