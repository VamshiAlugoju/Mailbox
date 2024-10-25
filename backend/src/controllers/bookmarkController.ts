import userModel from "../models/userModel";
import { sendError } from "../middlewares/errorHanlder";
import MailModel from "../models/mailModel";
import { Request, Response } from "express";


export async function addBookmark(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = await userModel.findOne({ _id: req.user._id })
        const mail = await MailModel.findById(id)
        if (!mail) {
            sendError(res, { error: "mail not found" })
            return
        }
        user?.bookmarks.push(mail?._id || id)
        await user?.save();
        res.status(200).json(user)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}


export async function removeBookmark(req: Request, res: Response) {
    try {
        const { id } = req.params
        const user = await userModel.findOne({ _id: req.user._id })
        const mail = await MailModel.findById(id)
        if (!mail) {
            sendError(res, { error: "mail not found" })
            return
        }
        await userModel.findByIdAndUpdate(user?._id, { $pull: { bookmarks: mail?._id || id } }, { new: true })
        res.status(200).json(user)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}

// get my bookmarks

export async function getMyBookmarks(req: Request, res: Response) {
    try {
        const user = await userModel.findOne({ _id: req.user._id })
        if (!user) {
            sendError(res, { error: "user not found" })
            return
        }
        const mails = await MailModel.find({ _id: { $in: user?.bookmarks } }).populate("from").populate("to")
        res.status(200).json(mails)
        return;
    } catch (err) {
        res.status(500).json(JSON.stringify(err))
    }
}   