import express from"express";
import cors from "cors";
import posts from "./client/server/routes/post.js";
import users from "./client/server/routes/user.js";
import groups from "./client/server/routes/groups.js";
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