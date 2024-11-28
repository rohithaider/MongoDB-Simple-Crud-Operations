const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port  = process.env.PORT || 5001;
const app = express();
// rohithaider
// WkyGdwMdI1nbXhQs


const uri = "mongodb+srv://rohithaider:WkyGdwMdI1nbXhQs@cluster0.nihur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('usersDB');
    const usersCollection = database.collection('users');

    //!Create
    app.post('/users',async(req,res)=>{
      const user = req.body;
      console.log('new user',user);
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })
    //!Read
    app.get('/users',async(req,res)=>{
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    //!Delete
    app.delete('/users/:id',async(req,res)=>{
        const id = req.params.id;
        console.log(`Please deleted from ${id}`)
        const query = {_id:new ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Simple crud is running")
})

app.listen(port,()=>{
    console.log(`simple crud is running at port ${port}`)
})