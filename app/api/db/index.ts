import { Collection, Db, MongoClient, MongoServerError } from "mongodb";
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

declare global {
  var mongoClient: MongoClient;
}
const isConnected = async (db: Db) => {
  let res;
  if (!db) return false;
  try {
    res = await db.admin().ping();
  } catch (err) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(res, "ok") && res.ok === 1;
};

(async () => {
  const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;
  const hasClientObj = Boolean(global.mongoClient);
  const hasStableConnection = hasClientObj
    ? await isConnected(global.mongoClient.db(DB_NAME))
    : false;

  if (!(hasClientObj && hasStableConnection)) {
    global.mongoClient = new MongoClient(url);
    await global.mongoClient.connect();
    console.log("Connected successfully to server");
    console.log(JSON.stringify(global.mongoClient.options, null, 2));
  }
})();

export const usersCollection = (): Collection<Document> => {
  const db = mongoClient.db(DB_NAME);
  return db.collection("users");
};
export const departmentsCollection = (): Collection<Document> => {
  const db = mongoClient.db(DB_NAME);
  return db.collection("departments");
};
export const employeesCollection = (): Collection<Document> => {
  const db = mongoClient.db(DB_NAME);
  return db.collection("employees");
};

process.on("exit", async (code) => {
  await global.mongoClient.close();
});
process.on("disconnect", async () => {
  await global.mongoClient.close();
});
