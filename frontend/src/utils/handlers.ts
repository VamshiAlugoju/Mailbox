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
            "to": to,
            "subject": subject,
            "body": body
        }
        const response = await Api.post("/mail/send", data, { headers })
        return response.data
    } catch (err) {
        throw err;
    }

}


export async function getCurrentUser(token: string) {
    try {
        const response = await Api.get("/user/currentuser", { headers: { Authorization: token } })

        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function getMailDetails(mailId: string) {
    try {
        const token = localStorage.getItem("token");
        const response = await Api.get(`/mail/get/${mailId}`, { headers: { Authorization: token } });
        return response.data
    } catch (err) {
        console.log(err)
    }

}

export async function getMyBookmarks() {
    try {
        const token = localStorage.getItem("token");
        const response = await Api.get(`bookmark/get`, { headers: { Authorization: token } });

        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function addToBookmarks(bookmarkId: string) {
    try {
        const token = localStorage.getItem("token");
        const response = await Api.post(`bookmark/add/${bookmarkId}`, {}, { headers: { Authorization: token } });
        console.log(response.data)
        const currentuser = JSON.parse(localStorage.getItem("user")!)
        currentuser.bookmarks.push(bookmarkId)
        localStorage.setItem("user", JSON.stringify(currentuser));
    } catch (err) {
        console.log(err)
    }
}

export async function removeFromBookmarks(bookmarkId: string) {
    try {
        const token = localStorage.getItem("token");
        const response = await Api.post(`bookmark/remove/${bookmarkId}`, {}, { headers: { Authorization: token } });
        console.log(response.data)
        const currentuser = JSON.parse(localStorage.getItem("user")!)
        currentuser.bookmarks = currentuser.bookmarks.filter((item: string) => {
            return item != bookmarkId;
        })
        localStorage.setItem("user", JSON.stringify(currentuser));

    } catch (err) {
        console.log(err)
    }

}

export async function readMailById(MailId: string) {
    try {
        const token = localStorage.getItem("token")
        const response = await Api.put(`/mail/read/${MailId}`, {}, { headers: { Authorization: token } });
        console.log(response.data)
    } catch (err) {
        console.log(err)
    }
}

export async function getUsersByRegex(pattern: string) {
    try {
        const token = localStorage.getItem("token")
        const response = await Api.get(`/user/match?pattern=${pattern}`, { headers: { Authorization: token } });
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function delteMailbyId(mailId: string) {
    try {
        const token = localStorage.getItem("token")
        const response = await Api.deleteRequest(`/mail/delete/${mailId}`, {}, { headers: { Authorization: token } });
        return response.data
    } catch (err) {
        console.log(err)
    }
}