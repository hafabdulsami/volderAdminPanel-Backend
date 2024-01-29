const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(cors());

// Increase payload size limit for JSON and URL-encoded data
app.use(bodyParser.json({ limit: '35mb' }));
// Import Routes
const CategoryRoutes = require('./routes/CategoryRoute');

app.use('/api', CategoryRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
