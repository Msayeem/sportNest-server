const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');



dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: process.env.SITE_URL, // your frontend vercel URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());




const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.SITE_URL}/api/auth/jwks`)
);

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;

  if(authHeader==process.env.API_SECRET){
      next()
      
  }

else{
  return res.status(401).json({ message: "Unauthorized" });
}

  // if (!authHeader) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // const token = authHeader.split(" ")[1];

  // if (!token) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // try {
  //   const { payload } = await jwtVerify(token, JWKS);
  //   console.log(payload)
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ message: "Invalid or expired token" });
  // }
};


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

        const db = client.db("sportnest");
            const facilityCollection = db.collection("facilities");
            const bookingCollection = db.collection("bookings");

            app.get('/facilities', async(req, res)=>{
const { search, sport } = req.query;

  const query = {};

  if (search) {
    query.facilityName = { $regex: search, $options: 'i' };
  }

  if (sport) {
    query.sport = { $in: [sport] };
  }

                const result=await facilityCollection.find(query).toArray();
                res.json(result);
            });

               app.get('/facilities/:id',verifyToken, async (req, res) => {
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

    app.get('/bookings',verifyToken, async(req, res)=>{
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










    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Server is working!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
