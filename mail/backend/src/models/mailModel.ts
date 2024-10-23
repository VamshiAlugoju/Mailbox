import mongoose from "mongoose"

interface IMail {
    from: mongoose.Schema.Types.ObjectId
    to: mongoose.Schema.Types.ObjectId
    subject: string
    body: string
    read: boolean
    showSender: boolean
    showReceiver: boolean
    createdAt: Date
    updatedAt: Date
}

const mailSchema = new mongoose.Schema<IMail>({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    read: { type: Boolean, default: false },
    showSender: { type: Boolean, default: true },
    showReceiver: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const MailModel = mongoose.model<IMail>("mail", mailSchema)
export default MailModel