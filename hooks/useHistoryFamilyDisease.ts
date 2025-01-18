import { listFamilyHistoryDiseases } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import graphqlOperation, { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { FamilyDiseaseData } from "@/utils/object";
import {
    createFamilyHistoryDisease,
    deleteFamilyHistoryDisease,
  } from "@/src/graphql/mutations";

Amplify.configure(config);

const client = generateClient();

export const fetchFamilyDisease = async (patientId: string): Promise<FamilyDiseaseData[]> => {
  try {
    const result = await client.graphql({ 
        query: listFamilyHistoryDiseases,
        variables: {
            filter: {
              id_patient: { eq: patientId },
            },
          }, });
    return result.data.listFamilyHistoryDiseases.items as FamilyDiseaseData[];
  } catch (error) {
    console.error("Error fetching family disease:", error);
    return [];
  }
};

export const removeFamilyDisease = async (patientId: string): Promise<void> => {
    try {
      await client.graphql({
        query: deleteFamilyHistoryDisease,
        variables: { input: { id: patientId } },
      });
    } catch (error) {
      console.error("Error deleting family disease:", error);
    }
  };


  export const addNewFamilyDisease = async (FamilyData: any): Promise<void> => {
    try {
      await client.graphql({
        query: createFamilyHistoryDisease,
        variables: { input: FamilyData },
      });
    } catch (error) {
      console.error("Error adding family disease:", error);
    }
  };