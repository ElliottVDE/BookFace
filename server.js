import express from"express";
import cors from "cors";
import posts from './server/routes/post.js';
import users from './server/routes/user.js';
import groups from './server/routes/groups.js';
import path from 'path';
import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/post", posts);
app.use("/user", users);
app.use("/groups", groups);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
// Start the express server
app.listen(PORT, () => {
    console.log(`Server listening on http://:${PORT}`);
});
