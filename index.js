const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uugevwk.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const appointmentOptionCollection = client
      .db("doctorsPortal")
      .collection("appointmentOptions");

    const bookingsCollection = client
    .db("doctorsPortal")
    .collection("bookings");

    /**
     * API Naming Convention
     * app.get('bookings')
     * app.get('bookings/:id')
     * app.post('bookings')
     * app.patch('bookings/:id')
     * app.delete('bookings/:id')
     * */

    app.post('/bookings', async(req, res)=>{
      const booking = req.body;
      console.log(booking)
      const result = await bookingsCollection.insertOne(booking)
      res.send(result)
    })

    app.get("/appointmentOptions", async (req, res) => {
      const query = {};
      const options = await appointmentOptionCollection.find(query).toArray();
      res.send(options);
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("doctors portal server is running");
});

app.listen(port, () => console.log(`doctors portal is running on ${port}`));
