const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "35mb" }));
app.use(cors());
app.use(express.static("images"));
// Increase payload size limit for JSON and URL-encoded data
// Import Routes
const CategoryRoutes = require("./routes/CategoryRoute");
const UserRoutes = require("./routes/UserRoute");
const ProductRoutes = require("./routes/ProductRoute");
const QualityRoutes = require("./routes/QualityRoute");
const SocialMediaRoute = require("./routes/SocialMediaRoute");
const HeroSectionRoutes = require("./routes/HeroSectionRoutes");
const VolderRoutes = require("./routes/VolderRoute");
app.use("/api", CategoryRoutes);
app.use("/api", UserRoutes);
app.use("/api", VolderRoutes);
app.use("/api", ProductRoutes);
app.use("/api", QualityRoutes);
app.use("/api", SocialMediaRoute);
app.use("/api", HeroSectionRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
