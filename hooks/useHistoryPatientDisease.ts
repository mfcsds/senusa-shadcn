import { listPatientHistoryDiseases } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import graphqlOperation, { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { PatientDiseaseData } from "@/utils/object";
import {
    createPatientHistoryDisease,
    deletePatientHistoryDisease,
  } from "@/src/graphql/mutations";

Amplify.configure(config);

const client = generateClient();

export const fetchPatientDisease = async (patientId: string): Promise<PatientDiseaseData[]> => {
  try {
    const result = await client.graphql({ 
        query: listPatientHistoryDiseases,
        variables: {
            filter: {
              id_patient: { eq: patientId },
            },
          }, });
    return result.data.listPatientHistoryDiseases.items as PatientDiseaseData[];
  } catch (error) {
    console.error("Error fetching patient disease:", error);
    return [];
  }
};

export const removePatientDisease = async (patientId: string): Promise<void> => {
    try {
      await client.graphql({
        query: deletePatientHistoryDisease,
        variables: { input: { id: patientId } },
      });
    } catch (error) {
      console.error("Error deleting patient disease:", error);
    }
  };


  export const addNewPatientDisease = async (HistoryPatientData: any): Promise<void> => {
    try {
      await client.graphql({
        query: createPatientHistoryDisease,
        variables: { input: HistoryPatientData },
      });
    } catch (error) {
      console.error("Error adding patient disease:", error);
    }
  };