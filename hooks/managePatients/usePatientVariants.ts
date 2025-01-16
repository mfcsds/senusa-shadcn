import { generateClient } from "aws-amplify/api";
import { listVcfdata, listPatients,  } from "@/src/graphql/queries";
import { deleteVcfdata } from "@/src/graphql/mutations";
import graphqlOperation, { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { VcfData, VariantRawData } from "@/utils/object";
import { remove } from "aws-amplify/storage";
import { DataPatients } from "@/utils/object";
import { listVariants } from "@/src/graphql/queries";
import {
  createAcmgAnnotation,
  createVariant,
  createVcfdata,
} from "@/src/graphql/mutations";

Amplify.configure(config);

const client = generateClient();

export const fetchDetailPatient = async (patientId: string): Promise<DataPatients[]> => {
  try {
    const result = await client.graphql({
      query: listPatients,
      variables: { filter: { id: { eq: patientId } } },
    });
    return result.data.listPatients.items as DataPatients[];
  } catch (error) {
    console.error("Error fetching VCF data:", error);
    return [];
  }
};

export const fetchVCFData = async (patientId: string): Promise<VcfData[]> => {
  try {
    const result = await client.graphql({
      query: listVcfdata,
      variables: { filter: { id_patient: { eq: patientId } } },
    });
    return result.data.listVcfdata.items as VcfData[];
  } catch (error) {
    console.error("Error fetching VCF data:", error);
    return [];
  }
};

export const fetchDetailVCF = async (id_vcf: string): Promise<VariantRawData[]> => {
  try {
    const result = await client.graphql({
      query: listVariants,
      variables: { filter: { id_vcf: { eq: id_vcf } }, limit: 500 },
    });
    return result.data.listVariants.items as VariantRawData[];
  } catch (error) {
    console.error("Error fetching VCF data:", error);
    return [];
  }
};

export const removeVCFData = async (
  vcfDataId: string,
  filePath: string
): Promise<void> => {
  try {
    await remove({ path: filePath });
    console.log("File deleted successfully.");
    await client.graphql({
      query: deleteVcfdata,
      variables: { input: { id: vcfDataId } },
    });
  } catch (error) {
    console.error("Error deleting VCF data:", error);
  }
};


export const addVCFData = async (DataVCF: any): Promise<void> => {
  try {
    await client.graphql({
      query: createVcfdata,
      variables: { input: DataVCF },
    });
  } catch (error) {
    console.error("Error adding VCF:", error);
  }
};

export const addVariant = async (DataVariant: any): Promise<void> => {
  try {
    await client.graphql({
      query: createVariant,
      variables: { input: DataVariant },
    });
  } catch (error) {
    console.error("Error adding Variant:", error);
  }
};

