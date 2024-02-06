const express = require("express");
const userModel = require("./models/userModels");
const bodyParser = require("body-parser");
const connnectDb = require("./config/db");
const mainRoutes =require("./routes")
const app = express();
var cors = require('cors')
const os =require("os")
require("dotenv").config();

let port = process.env.PORT || 5001;

connnectDb()
app.use(cors())   
app.use(bodyParser.json());
app.use("/",mainRoutes)

app.get("/", (req, res) => {
  res.send("Hello");
});


app.get('/system-info', (req, res) => {
  const systemInfo = {
    platform: os.platform(),
    type: os.type(),
    architecture: os.arch(),
    cpus: os.cpus(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
  };

  res.send(systemInfo)
})

app.get('/example-generic', (req, res) => {
  const product = '<h1>Example Product</h1>';
  res.status(200).send(product);
});




app.listen(port, () => {
  console.log(`Your app is running at port ${port}`);
});
