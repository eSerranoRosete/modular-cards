// Generated by Xata Codegen 0.26.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "users",
    columns: [
      { name: "password", type: "string" },
      { name: "email", type: "email", unique: true },
    ],
    revLinks: [{ column: "user", table: "cards" }],
  },
  {
    name: "cards",
    columns: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "organization", type: "string" },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "avatar", type: "file" },
      { name: "cover", type: "file" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Cards = InferredTypes["cards"];
export type CardsRecord = Cards & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
  cards: CardsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://eSerranoRosete-s-workspace-uvo60q.us-east-1.xata.sh/db/xata-nextjs",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};