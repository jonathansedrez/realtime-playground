import { Client, type ClientConfig } from "pg";

const config: ClientConfig = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "syncpoc",
};

const pgClient = new Client(config);

const connect = async (): Promise<void> => {
  await pgClient.connect();
  console.log("Postgres connected");
};

connect();
