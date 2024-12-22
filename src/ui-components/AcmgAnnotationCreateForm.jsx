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
import { createAcmgAnnotation } from "../graphql/mutations";
const client = generateClient();
export default function AcmgAnnotationCreateForm(props) {
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
    id_variant: "",
    PVS1: false,
    PS1: false,
    PS2: false,
    PS3: false,
    PS4: false,
    PP1_Strong: false,
    PM1: false,
    PM2: false,
    PM3: false,
    PM4: false,
    PM5: false,
    PM6: false,
    PP1_Moderate: false,
    PP1_Cosegregation: false,
    PP2: false,
    PP3: false,
    PP4: false,
    PP5: false,
    BP1: false,
    BP2: false,
    BP3: false,
    BP4: false,
    BP5: false,
    BP6: false,
    BP7: false,
    BS1: false,
    BS2: false,
    BS3: false,
    BS4: false,
    BA1: false,
    acmg_class: "",
  };
  const [id_variant, setId_variant] = React.useState(initialValues.id_variant);
  const [PVS1, setPVS1] = React.useState(initialValues.PVS1);
  const [PS1, setPS1] = React.useState(initialValues.PS1);
  const [PS2, setPS2] = React.useState(initialValues.PS2);
  const [PS3, setPS3] = React.useState(initialValues.PS3);
  const [PS4, setPS4] = React.useState(initialValues.PS4);
  const [PP1_Strong, setPP1_Strong] = React.useState(initialValues.PP1_Strong);
  const [PM1, setPM1] = React.useState(initialValues.PM1);
  const [PM2, setPM2] = React.useState(initialValues.PM2);
  const [PM3, setPM3] = React.useState(initialValues.PM3);
  const [PM4, setPM4] = React.useState(initialValues.PM4);
  const [PM5, setPM5] = React.useState(initialValues.PM5);
  const [PM6, setPM6] = React.useState(initialValues.PM6);
  const [PP1_Moderate, setPP1_Moderate] = React.useState(
    initialValues.PP1_Moderate
  );
  const [PP1_Cosegregation, setPP1_Cosegregation] = React.useState(
    initialValues.PP1_Cosegregation
  );
  const [PP2, setPP2] = React.useState(initialValues.PP2);
  const [PP3, setPP3] = React.useState(initialValues.PP3);
  const [PP4, setPP4] = React.useState(initialValues.PP4);
  const [PP5, setPP5] = React.useState(initialValues.PP5);
  const [BP1, setBP1] = React.useState(initialValues.BP1);
  const [BP2, setBP2] = React.useState(initialValues.BP2);
  const [BP3, setBP3] = React.useState(initialValues.BP3);
  const [BP4, setBP4] = React.useState(initialValues.BP4);
  const [BP5, setBP5] = React.useState(initialValues.BP5);
  const [BP6, setBP6] = React.useState(initialValues.BP6);
  const [BP7, setBP7] = React.useState(initialValues.BP7);
  const [BS1, setBS1] = React.useState(initialValues.BS1);
  const [BS2, setBS2] = React.useState(initialValues.BS2);
  const [BS3, setBS3] = React.useState(initialValues.BS3);
  const [BS4, setBS4] = React.useState(initialValues.BS4);
  const [BA1, setBA1] = React.useState(initialValues.BA1);
  const [acmg_class, setAcmg_class] = React.useState(initialValues.acmg_class);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setId_variant(initialValues.id_variant);
    setPVS1(initialValues.PVS1);
    setPS1(initialValues.PS1);
    setPS2(initialValues.PS2);
    setPS3(initialValues.PS3);
    setPS4(initialValues.PS4);
    setPP1_Strong(initialValues.PP1_Strong);
    setPM1(initialValues.PM1);
    setPM2(initialValues.PM2);
    setPM3(initialValues.PM3);
    setPM4(initialValues.PM4);
    setPM5(initialValues.PM5);
    setPM6(initialValues.PM6);
    setPP1_Moderate(initialValues.PP1_Moderate);
    setPP1_Cosegregation(initialValues.PP1_Cosegregation);
    setPP2(initialValues.PP2);
    setPP3(initialValues.PP3);
    setPP4(initialValues.PP4);
    setPP5(initialValues.PP5);
    setBP1(initialValues.BP1);
    setBP2(initialValues.BP2);
    setBP3(initialValues.BP3);
    setBP4(initialValues.BP4);
    setBP5(initialValues.BP5);
    setBP6(initialValues.BP6);
    setBP7(initialValues.BP7);
    setBS1(initialValues.BS1);
    setBS2(initialValues.BS2);
    setBS3(initialValues.BS3);
    setBS4(initialValues.BS4);
    setBA1(initialValues.BA1);
    setAcmg_class(initialValues.acmg_class);
    setErrors({});
  };
  const validations = {
    id_variant: [],
    PVS1: [],
    PS1: [],
    PS2: [],
    PS3: [],
    PS4: [],
    PP1_Strong: [],
    PM1: [],
    PM2: [],
    PM3: [],
    PM4: [],
    PM5: [],
    PM6: [],
    PP1_Moderate: [],
    PP1_Cosegregation: [],
    PP2: [],
    PP3: [],
    PP4: [],
    PP5: [],
    BP1: [],
    BP2: [],
    BP3: [],
    BP4: [],
    BP5: [],
    BP6: [],
    BP7: [],
    BS1: [],
    BS2: [],
    BS3: [],
    BS4: [],
    BA1: [],
    acmg_class: [],
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
          id_variant,
          PVS1,
          PS1,
          PS2,
          PS3,
          PS4,
          PP1_Strong,
          PM1,
          PM2,
          PM3,
          PM4,
          PM5,
          PM6,
          PP1_Moderate,
          PP1_Cosegregation,
          PP2,
          PP3,
          PP4,
          PP5,
          BP1,
          BP2,
          BP3,
          BP4,
          BP5,
          BP6,
          BP7,
          BS1,
          BS2,
          BS3,
          BS4,
          BA1,
          acmg_class,
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
            query: createAcmgAnnotation.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "AcmgAnnotationCreateForm")}
      {...rest}
    >
      <TextField
        label="Id variant"
        isRequired={false}
        isReadOnly={false}
        value={id_variant}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_variant: value,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.id_variant ?? value;
          }
          if (errors.id_variant?.hasError) {
            runValidationTasks("id_variant", value);
          }
          setId_variant(value);
        }}
        onBlur={() => runValidationTasks("id_variant", id_variant)}
        errorMessage={errors.id_variant?.errorMessage}
        hasError={errors.id_variant?.hasError}
        {...getOverrideProps(overrides, "id_variant")}
      ></TextField>
      <SwitchField
        label="Pvs1"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PVS1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1: value,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PVS1 ?? value;
          }
          if (errors.PVS1?.hasError) {
            runValidationTasks("PVS1", value);
          }
          setPVS1(value);
        }}
        onBlur={() => runValidationTasks("PVS1", PVS1)}
        errorMessage={errors.PVS1?.errorMessage}
        hasError={errors.PVS1?.hasError}
        {...getOverrideProps(overrides, "PVS1")}
      ></SwitchField>
      <SwitchField
        label="Ps1"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PS1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1: value,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PS1 ?? value;
          }
          if (errors.PS1?.hasError) {
            runValidationTasks("PS1", value);
          }
          setPS1(value);
        }}
        onBlur={() => runValidationTasks("PS1", PS1)}
        errorMessage={errors.PS1?.errorMessage}
        hasError={errors.PS1?.hasError}
        {...getOverrideProps(overrides, "PS1")}
      ></SwitchField>
      <SwitchField
        label="Ps2"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PS2}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2: value,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PS2 ?? value;
          }
          if (errors.PS2?.hasError) {
            runValidationTasks("PS2", value);
          }
          setPS2(value);
        }}
        onBlur={() => runValidationTasks("PS2", PS2)}
        errorMessage={errors.PS2?.errorMessage}
        hasError={errors.PS2?.hasError}
        {...getOverrideProps(overrides, "PS2")}
      ></SwitchField>
      <SwitchField
        label="Ps3"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PS3}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3: value,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PS3 ?? value;
          }
          if (errors.PS3?.hasError) {
            runValidationTasks("PS3", value);
          }
          setPS3(value);
        }}
        onBlur={() => runValidationTasks("PS3", PS3)}
        errorMessage={errors.PS3?.errorMessage}
        hasError={errors.PS3?.hasError}
        {...getOverrideProps(overrides, "PS3")}
      ></SwitchField>
      <SwitchField
        label="Ps4"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PS4}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4: value,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PS4 ?? value;
          }
          if (errors.PS4?.hasError) {
            runValidationTasks("PS4", value);
          }
          setPS4(value);
        }}
        onBlur={() => runValidationTasks("PS4", PS4)}
        errorMessage={errors.PS4?.errorMessage}
        hasError={errors.PS4?.hasError}
        {...getOverrideProps(overrides, "PS4")}
      ></SwitchField>
      <SwitchField
        label="Pp1 strong"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PP1_Strong}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong: value,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PP1_Strong ?? value;
          }
          if (errors.PP1_Strong?.hasError) {
            runValidationTasks("PP1_Strong", value);
          }
          setPP1_Strong(value);
        }}
        onBlur={() => runValidationTasks("PP1_Strong", PP1_Strong)}
        errorMessage={errors.PP1_Strong?.errorMessage}
        hasError={errors.PP1_Strong?.hasError}
        {...getOverrideProps(overrides, "PP1_Strong")}
      ></SwitchField>
      <SwitchField
        label="Pm1"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PM1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1: value,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PM1 ?? value;
          }
          if (errors.PM1?.hasError) {
            runValidationTasks("PM1", value);
          }
          setPM1(value);
        }}
        onBlur={() => runValidationTasks("PM1", PM1)}
        errorMessage={errors.PM1?.errorMessage}
        hasError={errors.PM1?.hasError}
        {...getOverrideProps(overrides, "PM1")}
      ></SwitchField>
      <SwitchField
        label="Pm2"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PM2}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2: value,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PM2 ?? value;
          }
          if (errors.PM2?.hasError) {
            runValidationTasks("PM2", value);
          }
          setPM2(value);
        }}
        onBlur={() => runValidationTasks("PM2", PM2)}
        errorMessage={errors.PM2?.errorMessage}
        hasError={errors.PM2?.hasError}
        {...getOverrideProps(overrides, "PM2")}
      ></SwitchField>
      <SwitchField
        label="Pm3"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PM3}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3: value,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PM3 ?? value;
          }
          if (errors.PM3?.hasError) {
            runValidationTasks("PM3", value);
          }
          setPM3(value);
        }}
        onBlur={() => runValidationTasks("PM3", PM3)}
        errorMessage={errors.PM3?.errorMessage}
        hasError={errors.PM3?.hasError}
        {...getOverrideProps(overrides, "PM3")}
      ></SwitchField>
      <SwitchField
        label="Pm4"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PM4}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4: value,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PM4 ?? value;
          }
          if (errors.PM4?.hasError) {
            runValidationTasks("PM4", value);
          }
          setPM4(value);
        }}
        onBlur={() => runValidationTasks("PM4", PM4)}
        errorMessage={errors.PM4?.errorMessage}
        hasError={errors.PM4?.hasError}
        {...getOverrideProps(overrides, "PM4")}
      ></SwitchField>
      <SwitchField
        label="Pm5"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PM5}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5: value,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PM5 ?? value;
          }
          if (errors.PM5?.hasError) {
            runValidationTasks("PM5", value);
          }
          setPM5(value);
        }}
        onBlur={() => runValidationTasks("PM5", PM5)}
        errorMessage={errors.PM5?.errorMessage}
        hasError={errors.PM5?.hasError}
        {...getOverrideProps(overrides, "PM5")}
      ></SwitchField>
      <SwitchField
        label="Pm6"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PM6}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6: value,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PM6 ?? value;
          }
          if (errors.PM6?.hasError) {
            runValidationTasks("PM6", value);
          }
          setPM6(value);
        }}
        onBlur={() => runValidationTasks("PM6", PM6)}
        errorMessage={errors.PM6?.errorMessage}
        hasError={errors.PM6?.hasError}
        {...getOverrideProps(overrides, "PM6")}
      ></SwitchField>
      <SwitchField
        label="Pp1 moderate"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PP1_Moderate}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate: value,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PP1_Moderate ?? value;
          }
          if (errors.PP1_Moderate?.hasError) {
            runValidationTasks("PP1_Moderate", value);
          }
          setPP1_Moderate(value);
        }}
        onBlur={() => runValidationTasks("PP1_Moderate", PP1_Moderate)}
        errorMessage={errors.PP1_Moderate?.errorMessage}
        hasError={errors.PP1_Moderate?.hasError}
        {...getOverrideProps(overrides, "PP1_Moderate")}
      ></SwitchField>
      <SwitchField
        label="Pp1 cosegregation"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PP1_Cosegregation}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation: value,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PP1_Cosegregation ?? value;
          }
          if (errors.PP1_Cosegregation?.hasError) {
            runValidationTasks("PP1_Cosegregation", value);
          }
          setPP1_Cosegregation(value);
        }}
        onBlur={() =>
          runValidationTasks("PP1_Cosegregation", PP1_Cosegregation)
        }
        errorMessage={errors.PP1_Cosegregation?.errorMessage}
        hasError={errors.PP1_Cosegregation?.hasError}
        {...getOverrideProps(overrides, "PP1_Cosegregation")}
      ></SwitchField>
      <SwitchField
        label="Pp2"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PP2}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2: value,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PP2 ?? value;
          }
          if (errors.PP2?.hasError) {
            runValidationTasks("PP2", value);
          }
          setPP2(value);
        }}
        onBlur={() => runValidationTasks("PP2", PP2)}
        errorMessage={errors.PP2?.errorMessage}
        hasError={errors.PP2?.hasError}
        {...getOverrideProps(overrides, "PP2")}
      ></SwitchField>
      <SwitchField
        label="Pp3"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PP3}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3: value,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PP3 ?? value;
          }
          if (errors.PP3?.hasError) {
            runValidationTasks("PP3", value);
          }
          setPP3(value);
        }}
        onBlur={() => runValidationTasks("PP3", PP3)}
        errorMessage={errors.PP3?.errorMessage}
        hasError={errors.PP3?.hasError}
        {...getOverrideProps(overrides, "PP3")}
      ></SwitchField>
      <SwitchField
        label="Pp4"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PP4}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4: value,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PP4 ?? value;
          }
          if (errors.PP4?.hasError) {
            runValidationTasks("PP4", value);
          }
          setPP4(value);
        }}
        onBlur={() => runValidationTasks("PP4", PP4)}
        errorMessage={errors.PP4?.errorMessage}
        hasError={errors.PP4?.hasError}
        {...getOverrideProps(overrides, "PP4")}
      ></SwitchField>
      <SwitchField
        label="Pp5"
        defaultChecked={false}
        isDisabled={false}
        isChecked={PP5}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5: value,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.PP5 ?? value;
          }
          if (errors.PP5?.hasError) {
            runValidationTasks("PP5", value);
          }
          setPP5(value);
        }}
        onBlur={() => runValidationTasks("PP5", PP5)}
        errorMessage={errors.PP5?.errorMessage}
        hasError={errors.PP5?.hasError}
        {...getOverrideProps(overrides, "PP5")}
      ></SwitchField>
      <SwitchField
        label="Bp1"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BP1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1: value,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BP1 ?? value;
          }
          if (errors.BP1?.hasError) {
            runValidationTasks("BP1", value);
          }
          setBP1(value);
        }}
        onBlur={() => runValidationTasks("BP1", BP1)}
        errorMessage={errors.BP1?.errorMessage}
        hasError={errors.BP1?.hasError}
        {...getOverrideProps(overrides, "BP1")}
      ></SwitchField>
      <SwitchField
        label="Bp2"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BP2}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2: value,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BP2 ?? value;
          }
          if (errors.BP2?.hasError) {
            runValidationTasks("BP2", value);
          }
          setBP2(value);
        }}
        onBlur={() => runValidationTasks("BP2", BP2)}
        errorMessage={errors.BP2?.errorMessage}
        hasError={errors.BP2?.hasError}
        {...getOverrideProps(overrides, "BP2")}
      ></SwitchField>
      <SwitchField
        label="Bp3"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BP3}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3: value,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BP3 ?? value;
          }
          if (errors.BP3?.hasError) {
            runValidationTasks("BP3", value);
          }
          setBP3(value);
        }}
        onBlur={() => runValidationTasks("BP3", BP3)}
        errorMessage={errors.BP3?.errorMessage}
        hasError={errors.BP3?.hasError}
        {...getOverrideProps(overrides, "BP3")}
      ></SwitchField>
      <SwitchField
        label="Bp4"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BP4}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4: value,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BP4 ?? value;
          }
          if (errors.BP4?.hasError) {
            runValidationTasks("BP4", value);
          }
          setBP4(value);
        }}
        onBlur={() => runValidationTasks("BP4", BP4)}
        errorMessage={errors.BP4?.errorMessage}
        hasError={errors.BP4?.hasError}
        {...getOverrideProps(overrides, "BP4")}
      ></SwitchField>
      <SwitchField
        label="Bp5"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BP5}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5: value,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BP5 ?? value;
          }
          if (errors.BP5?.hasError) {
            runValidationTasks("BP5", value);
          }
          setBP5(value);
        }}
        onBlur={() => runValidationTasks("BP5", BP5)}
        errorMessage={errors.BP5?.errorMessage}
        hasError={errors.BP5?.hasError}
        {...getOverrideProps(overrides, "BP5")}
      ></SwitchField>
      <SwitchField
        label="Bp6"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BP6}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6: value,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BP6 ?? value;
          }
          if (errors.BP6?.hasError) {
            runValidationTasks("BP6", value);
          }
          setBP6(value);
        }}
        onBlur={() => runValidationTasks("BP6", BP6)}
        errorMessage={errors.BP6?.errorMessage}
        hasError={errors.BP6?.hasError}
        {...getOverrideProps(overrides, "BP6")}
      ></SwitchField>
      <SwitchField
        label="Bp7"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BP7}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7: value,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BP7 ?? value;
          }
          if (errors.BP7?.hasError) {
            runValidationTasks("BP7", value);
          }
          setBP7(value);
        }}
        onBlur={() => runValidationTasks("BP7", BP7)}
        errorMessage={errors.BP7?.errorMessage}
        hasError={errors.BP7?.hasError}
        {...getOverrideProps(overrides, "BP7")}
      ></SwitchField>
      <SwitchField
        label="Bs1"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BS1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1: value,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BS1 ?? value;
          }
          if (errors.BS1?.hasError) {
            runValidationTasks("BS1", value);
          }
          setBS1(value);
        }}
        onBlur={() => runValidationTasks("BS1", BS1)}
        errorMessage={errors.BS1?.errorMessage}
        hasError={errors.BS1?.hasError}
        {...getOverrideProps(overrides, "BS1")}
      ></SwitchField>
      <SwitchField
        label="Bs2"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BS2}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2: value,
              BS3,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BS2 ?? value;
          }
          if (errors.BS2?.hasError) {
            runValidationTasks("BS2", value);
          }
          setBS2(value);
        }}
        onBlur={() => runValidationTasks("BS2", BS2)}
        errorMessage={errors.BS2?.errorMessage}
        hasError={errors.BS2?.hasError}
        {...getOverrideProps(overrides, "BS2")}
      ></SwitchField>
      <SwitchField
        label="Bs3"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BS3}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3: value,
              BS4,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BS3 ?? value;
          }
          if (errors.BS3?.hasError) {
            runValidationTasks("BS3", value);
          }
          setBS3(value);
        }}
        onBlur={() => runValidationTasks("BS3", BS3)}
        errorMessage={errors.BS3?.errorMessage}
        hasError={errors.BS3?.hasError}
        {...getOverrideProps(overrides, "BS3")}
      ></SwitchField>
      <SwitchField
        label="Bs4"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BS4}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4: value,
              BA1,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BS4 ?? value;
          }
          if (errors.BS4?.hasError) {
            runValidationTasks("BS4", value);
          }
          setBS4(value);
        }}
        onBlur={() => runValidationTasks("BS4", BS4)}
        errorMessage={errors.BS4?.errorMessage}
        hasError={errors.BS4?.hasError}
        {...getOverrideProps(overrides, "BS4")}
      ></SwitchField>
      <SwitchField
        label="Ba1"
        defaultChecked={false}
        isDisabled={false}
        isChecked={BA1}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1: value,
              acmg_class,
            };
            const result = onChange(modelFields);
            value = result?.BA1 ?? value;
          }
          if (errors.BA1?.hasError) {
            runValidationTasks("BA1", value);
          }
          setBA1(value);
        }}
        onBlur={() => runValidationTasks("BA1", BA1)}
        errorMessage={errors.BA1?.errorMessage}
        hasError={errors.BA1?.hasError}
        {...getOverrideProps(overrides, "BA1")}
      ></SwitchField>
      <TextField
        label="Acmg class"
        isRequired={false}
        isReadOnly={false}
        value={acmg_class}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id_variant,
              PVS1,
              PS1,
              PS2,
              PS3,
              PS4,
              PP1_Strong,
              PM1,
              PM2,
              PM3,
              PM4,
              PM5,
              PM6,
              PP1_Moderate,
              PP1_Cosegregation,
              PP2,
              PP3,
              PP4,
              PP5,
              BP1,
              BP2,
              BP3,
              BP4,
              BP5,
              BP6,
              BP7,
              BS1,
              BS2,
              BS3,
              BS4,
              BA1,
              acmg_class: value,
            };
            const result = onChange(modelFields);
            value = result?.acmg_class ?? value;
          }
          if (errors.acmg_class?.hasError) {
            runValidationTasks("acmg_class", value);
          }
          setAcmg_class(value);
        }}
        onBlur={() => runValidationTasks("acmg_class", acmg_class)}
        errorMessage={errors.acmg_class?.errorMessage}
        hasError={errors.acmg_class?.hasError}
        {...getOverrideProps(overrides, "acmg_class")}
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
