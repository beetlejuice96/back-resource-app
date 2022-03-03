import express, { Express } from "express";
import GroupController from "../controllers/group";
const GroupApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/group", router);
  router.post("/", GroupController.create);
  router.get("/find", GroupController.findById);
  router.get("/", GroupController.getAll);
};
export default GroupApi;
