import express from"express";
import cors from "cors";
import mongoose from "mongoose";
import posts from "./server/routes/post.js";
import users from "./server/routes/user.js";

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/post", posts);
app.use("/user", users);


// media routes
// app.get("/", (req, res) => {
//     const body = req.body;
//     try {
//         Post.find({}).then(data => {
//             res.json(data)
//         }).catch(error => {
//             res.status(408).json({ error })
//         })
//     } catch (error) {

//     } {
//         res.status(409).json({ msg: error.message })
//     }
// })
// app.post("/uploads", async (req, res) => {
//     const body = req.body;
//     try {
//         const newImage = await Post.create(body);
//         newImage.save();
//         res.status(201).json({ msg: "New Image uploaded..."})
//     } catch (error) {
//         res.status(409).json({ msg: error.message })
//     }
// })

// Start the express server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});