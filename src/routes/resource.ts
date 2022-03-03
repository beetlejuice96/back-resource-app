import express, { Express } from "express";
import ResourceController from "../controllers/resource";

const ResourceApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/resource", router);

  router.post("/", ResourceController.create);
  router.get("/", ResourceController.findResourceById);
};
export default ResourceApi;
