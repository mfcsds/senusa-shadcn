import { generateClient } from "aws-amplify/api";
import { listPatients, listVariantReports } from "@/src/graphql/queries";
import { CreateVariantReportInput } from "@/src/API";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import {
  createVariantReport,
  deleteVariantReport,
  updateVariantReport
} from "@/src/graphql/mutations";

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

  export const addVariantReport = async (dataVariant: any): Promise<void> => {
    try {
      await client.graphql({
        query: createVariantReport,
        variables: { input: dataVariant },
      });
    } catch (error) {
      console.error("Error adding variant report:", error);
    }
  };

  export const editVariantReport = async (idVariant: string, testingDescription: any): Promise<void> => {
    try {
      await client.graphql({
        query: updateVariantReport,
        variables: {
          input: {
            id: idVariant,
            testing_description: testingDescription ?? "",
          },
        },
      });
    } catch (error) {
      console.error("Error adding variant report:", error);
    }
  };
  
  export const removeVariantReport = async (reportID: string): Promise<void> => {
    try {
      await client.graphql({
        query: deleteVariantReport,
        variables: { input: { id: reportID } },
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
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
  