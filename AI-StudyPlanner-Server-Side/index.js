const { MongoClient, ServerApiVersion } = require('mongodb');
const admin = require("firebase-admin");
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;
require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());

//firebase

const serviceAccount = require("./firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});





const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

const database = client.db('StudyPlan');
const usersCollection = database.collection('users');

//custom middlewares
const verifyFBToken = async(req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).send({message:'unauthorized Access'})
  }
  const token = authHeader.split(' ')[1];
  if(!token){
    return  res.status(401).send({message:'unauthorized Access'})
  }
  //verify the token
  try{
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
      next();
  }
catch (error){
  return res.status(403).send({message:'forbidden access'})
}

}




//users collection

app.post('/users', async (req, res) => {
  const user = req.body;

  const query = { email: user.email };
  const existingUser = await usersCollection.findOne(query);

  if (existingUser) {
    return res.send({ message: 'user already exists' });
  }

  const result = await usersCollection.insertOne(user);
  res.send(result);
});


app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  res.send(user);
});

app.get('/users',verifyFBToken , async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});
   



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);

















app.get('/', (req, res) => {
  res.send('study server is getting')
})

app.listen(port, () => {
  console.log(`study server is running ${port}`)
})
