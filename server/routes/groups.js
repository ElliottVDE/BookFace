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


//Create Group
// router.post('/', (req,res) => {
//   const {name, description, userId} = req.body;
//   if(!name || !userId) {
//       return res.status(400).json({message: 'Name and userId are required'});
//   }
//   const id = uuidv4();
//   const group = groupStore.createGroup(id, name, description, userId);
//   res.json(group);

// });

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
      // if (req.body.groupId) {
      //     const group = groupsStore.getGroup(req.body.groupId);
      //     if (!group) {
      //         return res.status(400).json({ error: "Invalid group" });
      //     }
      //     groupsStore.addPostToGroup(req.body.groupId, newPost);
      // }

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
  
      const collection = db.collection("groups");
      let result = await collection.deleteOne(query);

      res.send(result).status(200);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error updating group");
  }
});

// router.post('/:groupId/join', (req, res) => {
//     const { groupId } = req.params;
//     const { userId } = req.body;
//     if (!userId) return res.status(400).json({ error: "userId required" });
//     const group = groupsStore.joinGroup(groupId, userId);
//     if (!group) return res.status(404).json({ error: "Group not found" });
//     res.json(group);
//   });

//   router.post('/:groupId/leave', (req, res) => {
//     const { groupId } = req.params;
//     const { userId } = req.body;
//     if (!userId) return res.status(400).json({ error: "userId required" });
//     const group = groupsStore.leaveGroup(groupId, userId);
//     if (!group) return res.status(404).json({ error: "Group not found" });
//     res.json(group);
//   });

//   router.get('/user/:userId', (req, res) => {
//     const { userId } = req.params;
//     const userGroups = groupsStore.getUserGroups(userId);
//     res.json(userGroups);
//   });

//   router.get('/:groupId/posts', (req, res) => {
//     const { groupId } = req.params;
//     const group = groupsStore.getGroup(groupId);
//     if (!group) return res.status(404).json({ error: "Group not found" });
//     res.json(group.posts);
//   });

// module.exports = router;
export default router;