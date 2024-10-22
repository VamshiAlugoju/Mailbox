import { Router } from "express";
import {
  login,

  signUp,
  updateUser,

} from "../controllers/userControllers";

const routes = Router();
import multer = require("multer");
import { veriifyUser } from "../middlewares/authMiddleware";
const upload = multer();

routes.post("/signUp", signUp);
routes.post("/login", login);

routes.put(
  "/update",
  veriifyUser,


  updateUser
);


export default routes;
