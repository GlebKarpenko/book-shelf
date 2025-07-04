import { MongoClient } from "mongodb";
import { TextLoader } from "@book-shelf/gckit";

// For some reason reading from .env fails, so try replacing directly with string.
const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = "books";

/**
 * Creates weighted text indexes on which MongoDB can make queried search.
 */
async function createIndex() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const collection = db.collection("books");

        await collection.createIndex(
            {
                "meta.isbn": "text",
                "title": "text",
                "author": "text",
                "subject": "text",
            },
            { name: "text_index" }
        );

        const indexes = await collection.indexes();

        console.log("Index created successfully!");
        console.log("Indexes: ", indexes);
    } catch (error) {
        console.error("Error creating index:", error);
    } finally {
        await client.close();
    }
}

async function main() {
    const dynamicLoader = new TextLoader("Indexing database");
    dynamicLoader.start();
    await createIndex();
    dynamicLoader.stop();
    console.log("Indexing completed successfully.");
    process.exit(0);
}

main();
