import express, { Request, Response } from "express";
import cors from "cors";

import { veriifyUser } from "./middlewares/authMiddleware";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

import userRoutes from "./routes/userRoutes";


app.use(reqlogger);
app.use("/user", userRoutes);

/*
 mail
 send mail
 delte mail
 get sent mails
 get my mails
 read mail
 make mail unread

 add to bookmarks
 remove from bookmarks

*/


export default app;

function reqlogger(req: Request, res: Response, next: Function) {
    console.log(`${req.method} ${req.url}`);
    next();
}
