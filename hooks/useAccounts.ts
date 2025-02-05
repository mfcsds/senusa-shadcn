import { generateClient } from "aws-amplify/api";
import { listInstitutions, listUsers} from "@/src/graphql/queries";
import { createInstitution, deleteInstitution, createUser, deleteUser  } from "@/src/graphql/mutations";
import { CreateInstitutionInput, CreateUserInput } from "@/src/API";
import { Institution, DataUser } from "@/utils/object";
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

  export const fetchUser = async (): Promise<DataUser[]> => {
    try {
      const result = await client.graphql({ query: listUsers });
      return result.data.listUsers.items as DataUser[];
    } catch (error) {
      console.error("Error fetching user:", error);
      return [];
    }
  };
  
  export const fetchUserByInstitutionId = async (InstitutionID: string): Promise<DataUser[]> => {
    try {
      const result = await client.graphql({
        query: listUsers,
        variables: { filter: { institutionID: { eq: InstitutionID } } },
      });
      return result.data.listUsers.items as DataUser[];
    } catch (error) {
      console.error("Error fetching VCF data:", error);
      return [];
    }
  };

  export const addNewUser = async (
    UserData: CreateUserInput
  ): Promise<void> => {
    try {
      await client.graphql({
        query: createUser,
        variables: { input: UserData },
      });
      console.log("User successfully created");
    } catch (error) {
      console.error("Error creating User:", error);
    }
  };

  export const removeUserByInstitutionId = async (userId: string): Promise<void> => {
    try {
      await client.graphql({
        query: deleteUser,
        variables: { input: { id: userId } },
      });
      console.log("User successfully deleted");
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };