import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongo from "./models/db/moongose";
import CONFIG from "./config/config";
import ResourceApi from "./routes/resource";
import GroupApi from "./routes/group";
import cors from "cors";
const app = express();
mongo.connnect(
  CONFIG.DB.MONGO.URL,
  CONFIG.DB.MONGO.USER,
  CONFIG.DB.MONGO.PASSWORD
);
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
ResourceApi(app);
GroupApi(app);

app.use(function (req, res, next) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
