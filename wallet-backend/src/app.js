const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const swaggerDefinition = yaml.load("./src/swagger/swagger.yaml");

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

// Middleware
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
const walletRoutes = require("./routes/wallet");
app.use("/api/wallet", walletRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
