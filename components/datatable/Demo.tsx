import { SelectedVariant } from "@/utils/object";
import React from "react";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "@/src/amplifyconfiguration.json";
import { listVcfdata } from "@/src/graphql/queries";

Amplify.configure(config);

// async function

// async function getData(): Promise<SelectedVariant[]> {
//   try {
//     const client = generateClient();
//     const result = await client.graphql({ query: listVcfdata });
//     result.data.listVcfdata.items;
//   } catch (error) {
//     console.log(error);
//   }
//   return result;
// }

const DemoTableVariant = () => {
  return (
    <div>
      <div>Hallo</div>
    </div>
  );
};

export default DemoTableVariant;
