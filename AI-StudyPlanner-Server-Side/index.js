const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const planCollection = database.collection('plans');
const taskCollection = database.collection('tasks');



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
   

//my plan pg

// 📌 1. GET all plans (একজন user এর সব plans)
app.get('/api/plans', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query; // frontend থেকে email পাঠাবে
    const query = { userEmail: email };
    const plans = await planCollection.find(query).sort({ createdAt: -1 }).toArray();
    res.send(plans);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 📌 2. GET single plan (একটি specific plan)
app.get('/api/plans/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const plan = await planCollection.findOne(query);
    res.send(plan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 📌 3. POST new plan (নতুন plan তৈরি)
app.post('/api/plans', verifyFBToken, async (req, res) => {
  try {
    const planData = req.body;
    const result = await planCollection.insertOne({
      ...planData,
      createdAt: new Date()
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 📌 4. PUT update plan (plan এডিট)
app.put('/api/plans/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await planCollection.updateOne(query, { $set: updateData });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 📌 5. DELETE plan (plan ডিলিট)
app.delete('/api/plans/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await planCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//task pg


// 📌 1. GET tasks by planId (একটি plan এর সব tasks)
app.get('/api/tasks/:planId', verifyFBToken, async (req, res) => {
  try {
    const { planId } = req.params;
    const tasks = await taskCollection.find({ planId }).toArray();
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 📌 2. POST new task (নতুন task তৈরি)
app.post('/api/tasks', verifyFBToken, async (req, res) => {
  try {
    const taskData = req.body;
    const result = await taskCollection.insertOne({
      ...taskData,
      createdAt: new Date()
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 📌 3. PUT update task (status change / edit)
app.put('/api/tasks/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await taskCollection.updateOne(query, { $set: updateData });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// 📌 4. DELETE task
app.delete('/api/tasks/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await taskCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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
