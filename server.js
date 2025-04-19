import express from"express";
import cors from "cors";
import posts from './server/routes/post.js';
import users from './server/routes/user.js';
import groups from './server/routes/groups.js';
const PORT = process.env.PORT;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/post", posts);
app.use("/user", users);
app.use("/groups", groups);


// Start the express server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});