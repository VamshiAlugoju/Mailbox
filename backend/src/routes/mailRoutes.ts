import { Router } from "express";
import { sendMail, deleteMail, getMail, getMyInbox, getMySent, readMail, unreadMail } from "../controllers/mailController";
const routes = Router();


routes.post("/send", sendMail);
routes.delete("/delete/:id", deleteMail);
routes.get("/get/:id", getMail);
routes.get("/inbox", getMyInbox);
routes.get("/sent", getMySent);
routes.put("/read/:id", readMail);
routes.put("/unread/:id", unreadMail);

export default routes;