import { generateClient } from "aws-amplify/api";
import { listPatients, listVariantReports } from "@/src/graphql/queries";
import { CreateVariantReportInput } from "@/src/API";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";

Amplify.configure(config);

const client = generateClient();

export const fetchVariantReport = async (): Promise<CreateVariantReportInput[]> => {
    try {
      const result = await client.graphql({
        query: listVariantReports,
      });
      return result.data.listVariantReports.items as CreateVariantReportInput[];
    } catch (error) {
      console.error("Error fetching variant data:", error);
      return [];
    }
  };

  export const fetchDetailVariantReport = async (variantId: string): Promise<CreateVariantReportInput[]> => {
    try {
      const result = await client.graphql({
        query: listVariantReports,
        variables: { filter: { id: { eq: variantId } } },
      });
      return result.data.listVariantReports.items as CreateVariantReportInput[];
    } catch (error) {
      console.error("Error fetching detail variant data:", error);
      return [];
    }
  };
  