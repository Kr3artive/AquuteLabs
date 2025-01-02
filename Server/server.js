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

const authRoutes = require('./src/routes/Auth');
const equipmentRoutes = require('./src/routes/Equipment');

mongoose
  .connect(mongodb, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((error) => console.log("CONNECTION ERROR", error));

server.use("/auth", authRoutes);
server.use("/equipment", equipmentRoutes);

server.listen(PORT, () => {
  console.log("SERVER IS ACTIVE AT http://localhost:4000");
});
