// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Institution } = initSchema(schema);

export {
  User,
  Institution
};