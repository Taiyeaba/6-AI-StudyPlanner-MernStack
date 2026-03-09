const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;
require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());




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
