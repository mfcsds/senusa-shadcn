/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getVariantReport } from "../graphql/queries";
import { updateVariantReport } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function VariantReportUpdateForm(props) {
  const {
    id: idProp,
    variantReport: variantReportModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    status: "",
    isApproved: false,
    medical_history: "",
    current_diagnosis: "",
    institutionID: "",
    createAt: "",
    phenotype: [],
    sample_collection: "",
    idPatient: "",
  };
  const [status, setStatus] = React.useState(initialValues.status);
  const [isApproved, setIsApproved] = React.useState(initialValues.isApproved);
  const [medical_history, setMedical_history] = React.useState(
    initialValues.medical_history
  );
  const [current_diagnosis, setCurrent_diagnosis] = React.useState(
    initialValues.current_diagnosis
  );
  const [institutionID, setInstitutionID] = React.useState(
    initialValues.institutionID
  );
  const [createAt, setCreateAt] = React.useState(initialValues.createAt);
  const [phenotype, setPhenotype] = React.useState(initialValues.phenotype);
  const [sample_collection, setSample_collection] = React.useState(
    initialValues.sample_collection
  );
  const [idPatient, setIdPatient] = React.useState(initialValues.idPatient);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = variantReportRecord
      ? { ...initialValues, ...variantReportRecord }
      : initialValues;
    setStatus(cleanValues.status);
    setIsApproved(cleanValues.isApproved);
    setMedical_history(cleanValues.medical_history);
    setCurrent_diagnosis(cleanValues.current_diagnosis);
    setInstitutionID(cleanValues.institutionID);
    setCreateAt(cleanValues.createAt);
    setPhenotype(cleanValues.phenotype ?? []);
    setCurrentPhenotypeValue("");
    setSample_collection(cleanValues.sample_collection);
    setIdPatient(cleanValues.idPatient);
    setErrors({});
  };
  const [variantReportRecord, setVariantReportRecord] = React.useState(
    variantReportModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getVariantReport.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getVariantReport
        : variantReportModelProp;
      setVariantReportRecord(record);
    };
    queryData();
  }, [idProp, variantReportModelProp]);
  React.useEffect(resetStateValues, [variantReportRecord]);
  const [currentPhenotypeValue, setCurrentPhenotypeValue] = React.useState("");
  const phenotypeRef = React.createRef();
  const validations = {
    status: [],
    isApproved: [],
    medical_history: [],
    current_diagnosis: [],
    institutionID: [],
    createAt: [],
    phenotype: [],
    sample_collection: [],
    idPatient: [],
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
          status: status ?? null,
          isApproved: isApproved ?? null,
          medical_history: medical_history ?? null,
          current_diagnosis: current_diagnosis ?? null,
          institutionID: institutionID ?? null,
          createAt: createAt ?? null,
          phenotype: phenotype ?? null,
          sample_collection: sample_collection ?? null,
          idPatient: idPatient ?? null,
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
            query: updateVariantReport.replaceAll("__typename", ""),
            variables: {
              input: {
                id: variantReportRecord.id,
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
      {...getOverrideProps(overrides, "VariantReportUpdateForm")}
      {...rest}
    >
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={status}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              status: value,
              isApproved,
              medical_history,
              current_diagnosis,
              institutionID,
              createAt,
              phenotype,
              sample_collection,
              idPatient,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <SwitchField
        label="Is approved"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isApproved}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              status,
              isApproved: value,
              medical_history,
              current_diagnosis,
              institutionID,
              createAt,
              phenotype,
              sample_collection,
              idPatient,
            };
            const result = onChange(modelFields);
            value = result?.isApproved ?? value;
          }
          if (errors.isApproved?.hasError) {
            runValidationTasks("isApproved", value);
          }
          setIsApproved(value);
        }}
        onBlur={() => runValidationTasks("isApproved", isApproved)}
        errorMessage={errors.isApproved?.errorMessage}
        hasError={errors.isApproved?.hasError}
        {...getOverrideProps(overrides, "isApproved")}
      ></SwitchField>
      <TextField
        label="Medical history"
        isRequired={false}
        isReadOnly={false}
        value={medical_history}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              isApproved,
              medical_history: value,
              current_diagnosis,
              institutionID,
              createAt,
              phenotype,
              sample_collection,
              idPatient,
            };
            const result = onChange(modelFields);
            value = result?.medical_history ?? value;
          }
          if (errors.medical_history?.hasError) {
            runValidationTasks("medical_history", value);
          }
          setMedical_history(value);
        }}
        onBlur={() => runValidationTasks("medical_history", medical_history)}
        errorMessage={errors.medical_history?.errorMessage}
        hasError={errors.medical_history?.hasError}
        {...getOverrideProps(overrides, "medical_history")}
      ></TextField>
      <TextField
        label="Current diagnosis"
        isRequired={false}
        isReadOnly={false}
        value={current_diagnosis}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              isApproved,
              medical_history,
              current_diagnosis: value,
              institutionID,
              createAt,
              phenotype,
              sample_collection,
              idPatient,
            };
            const result = onChange(modelFields);
            value = result?.current_diagnosis ?? value;
          }
          if (errors.current_diagnosis?.hasError) {
            runValidationTasks("current_diagnosis", value);
          }
          setCurrent_diagnosis(value);
        }}
        onBlur={() =>
          runValidationTasks("current_diagnosis", current_diagnosis)
        }
        errorMessage={errors.current_diagnosis?.errorMessage}
        hasError={errors.current_diagnosis?.hasError}
        {...getOverrideProps(overrides, "current_diagnosis")}
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
              status,
              isApproved,
              medical_history,
              current_diagnosis,
              institutionID: value,
              createAt,
              phenotype,
              sample_collection,
              idPatient,
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
        label="Create at"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={createAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              isApproved,
              medical_history,
              current_diagnosis,
              institutionID,
              createAt: value,
              phenotype,
              sample_collection,
              idPatient,
            };
            const result = onChange(modelFields);
            value = result?.createAt ?? value;
          }
          if (errors.createAt?.hasError) {
            runValidationTasks("createAt", value);
          }
          setCreateAt(value);
        }}
        onBlur={() => runValidationTasks("createAt", createAt)}
        errorMessage={errors.createAt?.errorMessage}
        hasError={errors.createAt?.hasError}
        {...getOverrideProps(overrides, "createAt")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              status,
              isApproved,
              medical_history,
              current_diagnosis,
              institutionID,
              createAt,
              phenotype: values,
              sample_collection,
              idPatient,
            };
            const result = onChange(modelFields);
            values = result?.phenotype ?? values;
          }
          setPhenotype(values);
          setCurrentPhenotypeValue("");
        }}
        currentFieldValue={currentPhenotypeValue}
        label={"Phenotype"}
        items={phenotype}
        hasError={errors?.phenotype?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("phenotype", currentPhenotypeValue)
        }
        errorMessage={errors?.phenotype?.errorMessage}
        setFieldValue={setCurrentPhenotypeValue}
        inputFieldRef={phenotypeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Phenotype"
          isRequired={false}
          isReadOnly={false}
          value={currentPhenotypeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.phenotype?.hasError) {
              runValidationTasks("phenotype", value);
            }
            setCurrentPhenotypeValue(value);
          }}
          onBlur={() => runValidationTasks("phenotype", currentPhenotypeValue)}
          errorMessage={errors.phenotype?.errorMessage}
          hasError={errors.phenotype?.hasError}
          ref={phenotypeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "phenotype")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Sample collection"
        isRequired={false}
        isReadOnly={false}
        value={sample_collection}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              isApproved,
              medical_history,
              current_diagnosis,
              institutionID,
              createAt,
              phenotype,
              sample_collection: value,
              idPatient,
            };
            const result = onChange(modelFields);
            value = result?.sample_collection ?? value;
          }
          if (errors.sample_collection?.hasError) {
            runValidationTasks("sample_collection", value);
          }
          setSample_collection(value);
        }}
        onBlur={() =>
          runValidationTasks("sample_collection", sample_collection)
        }
        errorMessage={errors.sample_collection?.errorMessage}
        hasError={errors.sample_collection?.hasError}
        {...getOverrideProps(overrides, "sample_collection")}
      ></TextField>
      <TextField
        label="Id patient"
        isRequired={false}
        isReadOnly={false}
        value={idPatient}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              status,
              isApproved,
              medical_history,
              current_diagnosis,
              institutionID,
              createAt,
              phenotype,
              sample_collection,
              idPatient: value,
            };
            const result = onChange(modelFields);
            value = result?.idPatient ?? value;
          }
          if (errors.idPatient?.hasError) {
            runValidationTasks("idPatient", value);
          }
          setIdPatient(value);
        }}
        onBlur={() => runValidationTasks("idPatient", idPatient)}
        errorMessage={errors.idPatient?.errorMessage}
        hasError={errors.idPatient?.hasError}
        {...getOverrideProps(overrides, "idPatient")}
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
          isDisabled={!(idProp || variantReportModelProp)}
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
              !(idProp || variantReportModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
