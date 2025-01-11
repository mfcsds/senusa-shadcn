import { generateClient } from "aws-amplify/api";
import { listPatients } from "@/src/graphql/queries";
import { createPatient, deletePatient } from "@/src/graphql/mutations";
import graphqlOperation, { Amplify } from "aws-amplify";

import config from "@/src/amplifyconfiguration.json";


Amplify.configure(config);


export interface PatientData {
  id: string;
  name?: string;
  sex?: string;
  phone_number?: string;
  dob?: string;

}

const client = generateClient();

export const fetchPatients = async (): Promise<PatientData[]> => {
  try {
    const result = await client.graphql({ query: listPatients });
    return result.data.listPatients.items as PatientData[];
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

export const removePatient = async (patientId: string): Promise<void> => {
  try {
    await client.graphql({
      query: deletePatient,
      variables: { input: { id: patientId } },
    });
  } catch (error) {
    console.error("Error deleting patient:", error);
  }
};

export const addPatient = async (patientData: any): Promise<void> => {
  try {
    await client.graphql({
      query: createPatient,
      variables: { input: patientData },
    });
  } catch (error) {
    console.error("Error adding patient:", error);
  }
};
