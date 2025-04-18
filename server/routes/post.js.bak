import express from "express";

import db from "../db/connection.js";

import { ObjectId } from "mongodb";


const router = express.Router();


router.get("/", async (req, res) => {
    let collection = await db.collection("posts");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("posts");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    try {
        let newPost = {
            name: req.body.name,
            desc: req.body.desc,
            image: req.body.image
        };
        let collection = await db.collection("posts");
        let result = await collection.insertOne(newPost);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                desc: req.body.desc,
                image: req.body.image
            },
        };

        let collection = await db.createCollection("posts");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating post");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
    
        const collection = db.collection("posts");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating post");
    }
});

export default router;