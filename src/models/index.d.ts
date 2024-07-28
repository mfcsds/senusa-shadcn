import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly institutionID: string;
  readonly role_type?: number | null;
  readonly email?: string | null;
  readonly Category?: string | null;
  readonly Specialty?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly institutionID: string;
  readonly role_type?: number | null;
  readonly email?: string | null;
  readonly Category?: string | null;
  readonly Specialty?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerInstitution = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Institution, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly contact?: string | null;
  readonly address?: string | null;
  readonly subscription_type?: string | null;
  readonly email?: string | null;
  readonly Users?: (User | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInstitution = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Institution, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly contact?: string | null;
  readonly address?: string | null;
  readonly subscription_type?: string | null;
  readonly email?: string | null;
  readonly Users: AsyncCollection<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Institution = LazyLoading extends LazyLoadingDisabled ? EagerInstitution : LazyInstitution

export declare const Institution: (new (init: ModelInit<Institution>) => Institution) & {
  copyOf(source: Institution, mutator: (draft: MutableModel<Institution>) => MutableModel<Institution> | void): Institution;
}