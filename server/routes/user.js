import express from "express";
import db from "../db/connection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// router.get("/:id", async (req, res) => {
//     let collection = await db.collection("users");
//     let query = { _id: new ObjectId(req.params.id) };
//     let result = await collection.findOne(query);

//     if (!result) res.send("Not Found").status(404);
//     else res.send(result).status(200);
// });

router.get("/:username", async (req, res) => {
    let collection = await db.collection("users");
    let query = { username: req.params.username };
    let result = await collection.findOne(query);

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password;
        let newUser = {
            username: username,
            password: hashedPassword,
            email: email
        };
        let collection = await db.collection("users");
        let result = await collection.insertOne(newUser);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding user");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        let collection = await db.collection("users");
        let user = await collection.findOne({ username: username });
        
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({message: "Invalid username or password"});
        }

        // Create a JWT token (Optional: use your secret key in place of 'your_jwt_secret')
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token: token, // Send JWT token
            user: { username: user.username, email: user.email }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error processing the login request"});
    }
});

// router.patch("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };
//         const updates = {
//             $set: {
//                 title: req.body.title,
//                 desc: req.body.desc,
//                 completion: req.body.completion,
//                 startDate: req.body.startDate,
//                 deadline: req.body.deadline,
//             },
//         };

//         let collection = await db.createCollection("records");
//         let result = await collection.updateOne(query, updates);
//         res.send(result).status(200);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error updating record");
//     }
// });

// router.delete("/:id", async (req, res) => {
//     try {
//         const query = { _id: new ObjectId(req.params.id) };
    
//         const collection = db.collection("records");
//         let result = await collection.deleteOne(query);

//         res.send(result).status(200);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error updating record");
//     }
// });

export default router;