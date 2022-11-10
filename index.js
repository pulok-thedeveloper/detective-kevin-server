const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tftz42f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('detectiveKevin').collection('services');

        const closedCaseCollection = client.db('detectiveKevin').collection('closedCase');

        const reviewCollection = client.db('detectiveKevin').collection('reviews');

        //All Services
        app.get('/services', async(req,res)=>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // Individual Service
        app.get('/services/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        // Post Service
        app.post('/services', async(req, res)=>{
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        });

        // All Closed Cases
        app.get('/closedcases', async(req,res)=>{
            const query = {}
            const cursor = closedCaseCollection.find(query);
            const closedcases = await cursor.toArray();
            res.send(closedcases);
        });

        //All reviews
        app.get('/reviews', async(req,res)=>{
            let query ={};
            if(req.query.email){
                query={
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        // Reviews based on services
        app.get('/reviews/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {serviceId: id};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });


        // Post Reviews
        app.post('/reviews', async(req, res)=>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        app.put('/reviews/:id', async(req,res) =>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const review =req.body;
            const option = {upsert: true};
            const updatedReview = {
                $set: {
                    review: review
                }
            }
            const result = await reviewCollection.updateOne(filter, updatedReview, option);
            res.send(result);
        })

        // Post Delete
        app.delete('/reviews/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally{

    }
}

run().catch(err => console.error(err));


app.get('/', (req,res) =>{
    res.send('DETECTIVE KEVIN server is running')
})

app.listen(port, ()=>{
    console.log(`Detective Kevin server running on ${port}`);
})