const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://sportNest:3QZuhobvxcAve6FE@cluster0.zltkvxu.mongodb.net/?appName=Cluster0";

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

        const db = client.db("sportnest");
            const facilityCollection = db.collection("facilities");
            const bookingCollection = db.collection("bookings");

            app.get('/facilities', async(req, res)=>{
                const result=await facilityCollection.find().toArray();
                res.json(result);
            });

               app.get('/facilities/:id', async (req, res) => {
      const { id } = req.params;
      const result = await facilityCollection.findOne({ _id: new ObjectId(id) });
      res.json(result);
    });

    app.post('/facilities', async(req, res)=>{
      const facility=req.body;
      const result=await facilityCollection.insertOne(facility);
      res.json(result)
    });

    app.post('/bookings', async(req, res)=>{
      const bookingData=req.body;
      const result=await bookingCollection.insertOne(bookingData);
      res.json(result);
    });

    app.get('/bookings', async(req, res)=>{
      const result=await bookingCollection.find().toArray();
      res.json(result);
    });

   app.delete('/bookings/:id', async(req, res)=>{
const {id}=req.params;
const result =await bookingCollection.deleteOne({_id: new ObjectId(id)});
res.json(result);
    });

        app.patch('/facilities/:id', async (req, res) => {
      const { id } = req.params;
      const updateData = req.body;
      const result = await facilityCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.json(result);
    });

    app.delete('/facilities/:id', async(req, res)=>{
const {id}=req.params;
const result =await facilityCollection.deleteOne({_id: new ObjectId(id)});
res.json(result);
    });

    app.get('/facilities', async (req, res) => {
  const { search, sport } = req.query;

  const query = {};

  if (search) {
    query.facilityName = { $regex: search, $options: 'i' };
  }


  if (sport) {
    query.sport = { $in: [sport] };
  }

  const result = await facilityCollection.find(query).toArray();
  res.json(result);
});








    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
