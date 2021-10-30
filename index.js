const express = require('express')
const app = express()
const port =process.env.PORT || 4000;
const { MongoClient } = require('mongodb');
const cors=require('cors')
require('dotenv').config()
// password \  assignment
// YCbvwOMwF71TNfKU
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufugb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
  
      await client.connect();
  
      const database = client.db("insertDB");
      const UserInformation = database.collection("Information");
      // create a document to insert
     app.get('/tour', async(req,res)=>{
        const query={}
        const cursor = UserInformation.find(query);
        const result= await cursor.toArray();
        console.log('I have got this ')
        res.json(result)
     })
      
  
  
  
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