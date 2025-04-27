const express = require('express');
const db = require('./config/db.js');
const cors = require('cors');
const app = express();
const postsRouter = require('./routes/posts.js');
const port = 4000;

app.use(cors());
app.use(express.json());
app.use('/api', postsRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});