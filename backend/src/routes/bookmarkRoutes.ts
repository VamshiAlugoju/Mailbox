import { Router } from "express"
import { addBookmark, getMyBookmarks, removeBookmark } from "../controllers/bookmarkController"

const routes = Router()


routes.post("/add/:id", addBookmark);
routes.get("/get", getMyBookmarks);
routes.post("/remove/:id", removeBookmark);

export default routes;