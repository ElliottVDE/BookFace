import express from "express";
// import groupStore from "../db/groupStore.js";
import db from "../db/connection.js";

import { v4 as uuidv4 } from 'uuid';
// import {v4} from "uuid";
// const express = require('express');
const router = express.Router();
// const groupsStore  = require('../db/groupStore');


//Get Groups
router.get("/", async (req, res) => {
  try {
      let collection = await db.collection("groups");
      let results = await collection.find({}).toArray();
      res.status(200).send(results);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching groups");
  }
});

//Get Group (ID)
router.get("/:id", async (req, res) => {
  try {
      let collection = await db.collection("groups");
      let query = { _id: new ObjectId(req.params.id) };
      let result = await collection.findOne(query);

      if (!result) res.status(404).send("Not Found");
      else res.status(200).send(result);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching the group");
  }
});


router.post("/", async (req, res) => {
  try {
      let newGroup = {
          name: req.body.name,
          desc: req.body.desc,
          members: req.body.user,
          image: req.body.image,
          posts: null,
          timestamp: Date.now()
      };

      let collection = await db.collection("groups");
      let result = await collection.insertOne(newGroup);
      res.status(201).send(result);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error adding group");
  }
});

router.patch("/:id", async (req, res) => {
  try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
          $set: {
             name: req.body.name,
             desc: req.body.desc,
             members: req.body.users,
             image: req.body.image,
             posts: req.body.posts
          }
      };

      let collection = await db.createCollection("groups");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error updating group");
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const collection = db.collection("groups");
        const result = await collection.deleteOne(query);

        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting group");
    }
});

export default router;