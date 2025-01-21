import { generateClient } from "aws-amplify/api";
import { listPatients } from "@/src/graphql/queries";
import { createPatient, deletePatient, updatePatient } from "@/src/graphql/mutations";
import graphqlOperation, { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { DataPatients } from "@/utils/object";

Amplify.configure(config);


const client = generateClient();

export const fetchPatients = async (): Promise<DataPatients[]> => {
  try {
    const result = await client.graphql({ query: listPatients });
    return result.data.listPatients.items as DataPatients[];
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

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


export const addNewPatient = async (DataPatients: any): Promise<void> => {
  try {
    await client.graphql({
      query: createPatient,
      variables: { input: DataPatients },
    });
  } catch (error) {
    console.error("Error adding patient:", error);
  }
};

export const updateDataPatient = async (idPatient: string, patientStatusDesc: string): Promise<void> => {
  try {
    await client.graphql({
      query: updatePatient,
      variables: {
        input: {
          id: idPatient,
          health_desc: patientStatusDesc ?? "",
        },
      },
    });
  } catch (error) {
    console.error("Error adding patient:", error);
  }
};
