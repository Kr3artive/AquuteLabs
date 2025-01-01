const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();;
const server = express();
server.use(cors());
server.use(express.json());


const PORT = process.env.PORT;
const mongodb = process.env.MongoUrl;

const Auth = require('./src/routes/Auth');

mongoose
  .connect(mongodb, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((error) => console.log("CONNECTION ERROR", error));

server.use("/auth", Auth)
// app.use("/post", postRoutes)
// app.use("/comments", commentsRoutes)

server.listen(PORT, () => {
  console.log("SERVER IS ACTIVE AT http://localhost:4000");
});
