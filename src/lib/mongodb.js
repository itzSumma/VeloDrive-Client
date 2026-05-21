import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not configured.");
}

const globalForMongo = globalThis;

let clientPromise = globalForMongo.__veloDriveMongoClientPromise;

if (!clientPromise) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  clientPromise = client.connect();
  globalForMongo.__veloDriveMongoClientPromise = clientPromise;
}

export async function getDatabase() {
  const client = await clientPromise;
  return client.db("VeloDrive");
}

export async function getCollections() {
  const database = await getDatabase();

  return {
    usersCollection: database.collection("users"),
    carsCollection: database.collection("cars"),
    bookingsCollection: database.collection("bookings"),
  };
}
