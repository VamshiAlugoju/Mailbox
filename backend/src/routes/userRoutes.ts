import { Router } from "express";
import {
  getCurrentUser,
  getUsers,
  login,

  signUp,
  updateUser,

} from "../controllers/userControllers";
import { veriifyUser } from "../middlewares/authMiddleware";

const routes = Router();
import multer = require("multer");

const upload = multer();

routes.post("/signup", signUp);
routes.post("/login", login);
routes.get("/match", veriifyUser, getUsers)
routes.get("/currentuser", veriifyUser, getCurrentUser)

// routes.put(
//   "/update",
//   veriifyUser,


//   updateUser
// );


export default routes;
