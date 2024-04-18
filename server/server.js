const express = require("express");
const collection = require("./mongo.js")
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


const http = require('http');

app.get("/api/arts", async(req, res) => {
    try {
        const data = await collection.find({});
        res.json(data);
    }catch(err) {
        throw new Error(err);
    }
});

app.get("/api/art/:id", async (req,res) => {
    try {
        const data = await collection.findById(req.params.id);
        res.json(data);
    }catch(err) {
        throw new Error(err);
    }
});
/**
 * artName: { type: String},
    serial: { type: Number},
    src: { type: String, required: true },
    alt: {type: String},
    bids: [{user: {type: String, required: true}, bid: {type: Number, required: true}}]
 */

app.post("/api/art", async (req, res) => {
    try{
        const data = {
            artName: req.body.artName,
            serial: req.body.serial,
            src: req.body.src,
            alt : req.body.alt,
            bids: req.body.bids
        }
        const result = await collection.create(data);
        res.json(result);
    }catch (err) {
        console.log(err);
        throw new Error(err);
    }
});

app.put("/api/art/:id", async(req,res) => {
    try {
        const data = await collection.findById(req.params.id);
        if(data != null) {
            // data.bids = req.body.bids;
            const lastOne = data.bids.at(-1);
            console.log(lastOne);
            if(Number(lastOne.bid ) < Number(req.body.bid)) {
                data.bids.push({user: req.body.user, bid: req.body.bid});
                const result = await collection.updateOne(data);
                res.json(result);
            } else {
                res.json(null)
            }


        } else {
            res.json(null);
        }
    }catch(err) {
        throw new Error(err);
    }
})




app.delete("/api/art/:id", async(req, res) => {
    try {
        const data = await collection.deleteOne({_id: req.params.id});
        res.json(data);
    }catch(err) {
        throw new Error(err);
    }
});




const server = http.createServer(app);
server.listen(5000, () => {
    console.log('port connected');
})

