const express = require('express')
const app = express()
const port =process.env.PORT || 4000;
const { MongoClient } = require('mongodb');
const cors=require('cors');
const ObjectId=require('mongodb').ObjectId;
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
      const UserInformationstored = database.collection("storage");
      
      // create a document to insert
     app.get('/tour', async(req,res)=>{
        const query={}
        const cursor = UserInformation.find(query);
        const result= await cursor.toArray();
        console.log('I have got this ')
        res.json(result)
     })
    //  taking information for my orders 

     app.get('/tourinfo/:userEmail', async(req,res)=>{
       const userEmail=req.params.userEmail;
        const query= { email: {userEmail} };
        const cursor = UserInformationstored.find(query);
        const result= await cursor.toArray();
        console.log('I have got this ', userEmail)
        res.json(result);
     })
    //  new response for orderdetails here 
    app.get('/tour/:tourId',async(req,res)=>{
      const userOrder=req.params.tourId;
      const query={_id:ObjectId(userOrder)};
      const result=await UserInformation.findOne(query);
      // console.log(userOrder,result);
      res.json(result)
    })
    // taking tour packages informatation from the user here 

    app.post('/tourinfo',async(req,res)=>{
      const userInfo=req.body;
      const result=await UserInformationstored.insertOne(userInfo);
      console.log(userInfo)
      res.send(result)
      
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