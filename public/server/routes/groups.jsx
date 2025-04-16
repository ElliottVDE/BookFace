// import express from "express";
// import groupStore from "../db/groupStore.js";
// import {v4} from "uuid";
const express = require('express');
const router = express.Router();
const groupsStore  = require('');
const {v4: uuidv4} = require('uuid');

//Create Group

router.post('/', (req,res) => {
    const {name, description, userId} = req.body;
    if(!name || !userId) {
        return res.status(400).json({message: 'Name and userId are required'});
    }
    const id = uuidv4();
    const group = groupStore.createGroup(id, name, description, userId);
    res.json(group);

});

router.post('/:groupId/join', (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });
    const group = groupsStore.joinGroup(groupId, userId);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  });

  router.post('/:groupId/leave', (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId required" });
    const group = groupsStore.leaveGroup(groupId, userId);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  });

  router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const userGroups = groupsStore.getUserGroups(userId);
    res.json(userGroups);
  });

  router.get('/:groupId/posts', (req, res) => {
    const { groupId } = req.params;
    const group = groupsStore.getGroup(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group.posts);
  });

  // module.exports = router;
export default router;