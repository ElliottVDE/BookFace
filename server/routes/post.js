import express from "express";
// import groupStore from "../db/groupStore.js";
import db from "../db/connection.js";

import { ObjectId } from "mongodb";

// const express = require('express');
// const { v4: uuidv4 } = require('uuid');
// const groupsStore = require('../db/groupsStore');

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        let collection = await db.collection("posts");
        let results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching posts");
    }
});

router.get("/:id", async (req, res) => {
    try {
        let collection = await db.collection("posts");
        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) res.status(404).send("Not Found");
        else res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching the post");
    }
});

router.post("/", async (req, res) => {
    try {
        let newPost = {
            name: req.body.name,
            desc: req.body.desc,
            image: req.body.image,
            groupID: req.body.groupID,
            timestamp: Date.now(),
        };
        // if (req.body.groupId) {
        //     const group = groupStore.getGroup(req.body.groupId);
        //     if (!group) {
        //         return res.status(400).json({ error: "Invalid group" });
        //     }
        //     groupStore.addPostToGroup(req.body.groupId, newPost);
        // }

        let collection = await db.collection("posts");
        let result = await collection.insertOne(newPost);
        res.status(201).send(result);
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
        const result = await collection.deleteOne(query);

        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting post");
    }
});



export default router;