const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Neighborhood = require("./models/Neighborhood");

dotenv.config();

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log(" MongoDB connected for seeding...");
    const data = JSON.parse(fs.readFileSync("./data/neighborhoods.json", "utf-8"));
    return Neighborhood.insertMany(data);
  })
  .then(() => {
    console.log(" Seeding complete!");
    process.exit();
  })
  .catch((err) => {
    console.error(" Error seeding data:", err);
    process.exit(1);
  });
