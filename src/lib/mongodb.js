// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://EJP-Assignment:h6wp2OwtRvp1y5jL@cluster0.eclygum.mongodb.net/EJP-Assignment?retryWrites=true&w=majority";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
