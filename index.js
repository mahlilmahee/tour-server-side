const express = require('express')
const app = express()
const port = 4000;
const { MongoClient } = require('mongodb');

require('dotenv').config()
// password \  assignment
// YCbvwOMwF71TNfKU

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufugb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
  
      await client.connect();
  
      const database = client.db("insertDB");
  
      const UserInformation = database.collection("Information");
  
      // create a document to insert
  
      const doc = {

           title: "Record of a Shriveled Datum",
           content: "No bytes, no problem. Just insert a document, in MongoDB",

      }
  
      const result = await UserInformation.insertOne(doc);
  
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
  
    } finally {
  
    //   await client.close();
  
    }
  
  }
  
  run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })