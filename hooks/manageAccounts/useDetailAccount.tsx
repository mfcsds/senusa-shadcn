import { generateClient } from "aws-amplify/api";
import { listInstitutions } from "@/src/graphql/queries";
import { Institution } from "@/utils/object"                                                                                                                          ;
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

Amplify.configure(config);

const client = generateClient();

export const fetchDetailInstitution = async (institutionID: string): Promise<Institution[]> => {
  try {
    const result = await client.graphql({ query: listInstitutions, variables: { filter: { id: { eq: institutionID } } }, });
    return result.data.listInstitutions.items as Institution[];
  } catch (error) {
    console.error("Error fetching institutions:", error);
    return [];
  }
};

