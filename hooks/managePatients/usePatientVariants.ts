import { generateClient } from "aws-amplify/api";
import { listVcfdata } from "@/src/graphql/queries";
import { deleteVcfdata } from "@/src/graphql/mutations";
import graphqlOperation, { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { VcfData } from "@/utils/object";
import { remove } from "aws-amplify/storage";

Amplify.configure(config);

const client = generateClient();

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
