import express, { Request, Response } from "express";
import cors from "cors";

import { veriifyUser } from "./middlewares/authMiddleware";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(reqlogger);

import userRoutes from "./routes/userRoutes";
import mailRoutes from "./routes/mailRoutes";
import bookmarkRoutes from "./routes/bookmarkRoutes";


app.use("/user", userRoutes);
app.use("/mail", veriifyUser, mailRoutes)
app.use("/bookmark", veriifyUser, bookmarkRoutes)

export default app;

function reqlogger(req: Request, res: Response, next: Function) {
    console.log(`${req.method} ${req.url}`);
    next();
}
