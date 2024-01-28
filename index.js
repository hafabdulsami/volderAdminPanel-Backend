const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());

// Import Routes
const CategoryRoutes = require('./routes/CategoryRoute');

app.use('/api', CategoryRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
