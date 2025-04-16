import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI || 'mongodb+srv://admin:DBDStart456@blog.fdvc4.mongodb.net/?retryWrites=true&w=majority&appName=blog';
const client = new MongoClient(uri, {
    serverAPI: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try{
    // connect the client to the server
    await client.connect();
    // send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
    );
} catch(err) {
    console.error(err);
}

let db = client.db("blog");

export default db;