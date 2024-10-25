import { Request, Response } from "express";
import MailModel from "../models/mailModel";
import { isExportDeclaration } from "typescript";
import { sendError } from "../middlewares/errorHanlder";
import userModel from "../models/userModel";



export async function sendMail(req: Request, res: Response) {
    try {
        const { from, to, subject, body } = req.body

        const sender = await userModel.findOne({ _id: from })
        const recipent = await userModel.findOne({ email: to })
        if (!sender || !recipent) {
            sendError(res, { error: "user not found" })
            return
        }
        const objCreate = {
            from: from,
            to: recipent.id,
            subject: subject,
            body: body
        }
        const mail = await MailModel.create(objCreate)
        res.status(200).json(mail)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}

//delete

export async function deleteMail(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = userModel.findOne({ _id: req.user._id });
        const mail = await MailModel.findById(id)
        if (!mail) {
            sendError(res, { error: "mail not found" })
            return
        }
        if (mail.from.toString() == req.user._id.toString()) {
            mail.showSender = false;
        } else if (mail.to.toString() == req.user._id.toString()) {
            mail.showReceiver = false;
        }
        await mail.save();
        res.status(200).json(mail)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}

export async function getMail(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = userModel.findOne({ _id: req.user._id });
        const mail = await MailModel.findById(id).populate("from").populate("to")
        if (!mail) {
            sendError(res, { error: "mail not found" })
            return
        }
        res.status(200).json(mail)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}


export async function getMyInbox(req: Request, res: Response) {
    try {
        const user = await userModel.findOne({ _id: req.user._id })
        if (!user) {
            sendError(res, { error: "user not found" })
            return
        }
        const mails = await MailModel.find({ to: user._id, showReceiver: true }).populate("from").populate("to").sort({ createdAt: -1 })
        res.status(200).json(mails)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}

export async function getMySent(req: Request, res: Response) {
    try {
        const user = await userModel.findOne({ _id: req.user._id })
        if (!user) {
            sendError(res, { error: "user not found" })
            return
        }
        const mails = await MailModel.find({ from: user._id, showSender: true }).populate("from").populate("to").sort({ createdAt: -1 })
        res.status(200).json(mails)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}
export async function readMail(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = userModel.findOne({ _id: req.user._id });
        const mail = await MailModel.findById(id)
        if (!mail) {
            sendError(res, { error: "mail not found" })
            return
        }
        mail.read = true
        await mail.save();
        res.status(200).json(mail)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}

export async function unreadMail(req: Request, res: Response) {
    try {
        const { id } = req.params
        const mail = await MailModel.findById(id)
        if (!mail) {
            sendError(res, { error: "mail not found" })
            return
        }
        mail.read = false
        await mail.save();
        res.status(200).json(mail)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}