const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect()
        console.log("Conectado ao Banco Francês 👌")
    } catch (e) {
        console.log("Lucca Francês foi avistado tentando derrubar a base de dados");
        console.error(e)
    }
}

module.exports = {connectDB, client}
