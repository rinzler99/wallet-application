const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const methodOverride = require('method-override');
const swaggerUi = require("swagger-ui-express");
const bodyParser = require('body-parser');
const yaml = require("yamljs");
const cors = require('cors');

require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    methodOverride(function(req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
app.use(cors({origin: '*'}));
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
