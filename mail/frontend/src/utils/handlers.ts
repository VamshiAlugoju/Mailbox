import * as Api from "./Api"

export async function getMyInbox() {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: token
        }
        const response = await Api.get("/mail/inbox", { headers })
        return response.data
    } catch (err) {

    }
}
export async function getMyOutbox() {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: token
        }
        const response = await Api.get("/mail/sent", { headers })
        return response.data
    } catch (err) {

    }
}


export async function sendMail({ from, to, body, subject }: { from: string, to: string, subject: string, body: string }) {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: token
        }
        const data = {
            "from": from,
            "to": "6718ce3d1adc4cd003fc3c87",
            "subject": subject,
            "body": body
        }
        const response = await Api.post("/mail/send", data, { headers })

    } catch (err) {

    }
}


export async function getCurrentUser(token: string) {
    try {
        const response = await Api.get("/user/currentuser", { headers: { Authorization: token } })
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
}