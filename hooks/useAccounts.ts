import { generateClient } from "aws-amplify/api";
import { listInstitutions } from "@/src/graphql/queries";
import { createInstitution, deleteInstitution  } from "@/src/graphql/mutations";
import { CreateInstitutionInput } from "@/src/API";
import { Institution } from "@/utils/object";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

Amplify.configure(config);

const client = generateClient();

export const fetchInstitutions = async (): Promise<Institution[]> => {
  try {
    const result = await client.graphql({ query: listInstitutions });
    return result.data.listInstitutions.items as Institution[];
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return [];
  }
};

export const fetchDetailInstitution = async (InstitutionID: string): Promise<Institution[]> => {
  try {
    const result = await client.graphql({
      query: listInstitutions,
      variables: { filter: { id: { eq: InstitutionID } } },
    });
    return result.data.listInstitutions.items as Institution[];
  } catch (error) {
    console.error("Error fetching VCF data:", error);
    return [];
  }
};

export const addNewInstitution = async (
  institutionData: CreateInstitutionInput
): Promise<void> => {
  try {
    await client.graphql({
      query: createInstitution,
      variables: { input: institutionData },
    });
    console.log("Institution successfully created");
  } catch (error) {
    console.error("Error creating institution:", error);
  }
};

export const removeInstitution = async (institutionId: string): Promise<void> => {
    try {
      await client.graphql({
        query: deleteInstitution,
        variables: { input: { id: institutionId } },
      });
      console.log("Institution successfully deleted");
    } catch (error) {
      console.error("Error deleting institution:", error);
    }
  };