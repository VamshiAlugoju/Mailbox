import { createContext, useEffect, useState } from "react";
import { Mail } from "../utils/types/types";
import { delteMailbyId, getMyInbox } from "../utils/handlers";
import { readMailById } from "../utils/handlers";
import { useContext } from "react";
import AuthContext from "./AuthContext";

type IMailContext = {
  inbox: Mail[];
  outbox: Mail[];
  unreadCount: number;
  readMail: (mailId: string) => void;
  deleteMail: (mailId: string) => void;
};
export const MailContext = createContext<IMailContext>({
  inbox: [],
  outbox: [],
  unreadCount: 0,
  readMail: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteMail: (_mailId: string) => {},
});
export function MailProvider({ children }: { children: React.ReactNode }) {
  const [inbox, setInbox] = useState<Mail[]>([]);
  const [outbox] = useState<Mail[]>([]);
  const [unreadCount, setUnreadcount] = useState(0);
  const AuthCtx = useContext(AuthContext);

  function readMail(mailId: string) {
    const mailidx = inbox.findIndex((item) => item._id === mailId);
    if (mailidx >= 0) {
      let mail = inbox[mailidx];
      mail = { ...mail, read: true };
      const updatedMail = [...inbox];
      updatedMail[mailidx] = mail;
      setInbox(updatedMail);
      readMailById(mailId);
    }
  }
  async function deleteMail(mailId: string) {
    const updatedMail = inbox.filter((item) => item._id !== mailId);
    setInbox(updatedMail);
    await delteMailbyId(mailId);
  }
  async function handleInbox() {
    // call the api and get the data
    // get inbox and calculate read count
    // set the data;
    const data: Mail[] = await getMyInbox();
    if (JSON.stringify(data) !== JSON.stringify(inbox)) {
      setInbox(data);
      const count = data.reduce((acc, item) => acc + (item.read ? 0 : 1), 0);
      setUnreadcount(count);
    }
  }
  useEffect(() => {
    let id: NodeJS.Timeout;
    async function iffe() {
      await handleInbox();
      id = setInterval(async () => {
        await handleInbox();
      }, 2000);
    }
    iffe();
    return () => {
      if (id) clearInterval(id);
    };
  }, [AuthCtx.isLoggedIn]);
  const value: IMailContext = {
    inbox,
    outbox,
    unreadCount,
    readMail,
    deleteMail,
  };
  return (
    <MailContext.Provider value={value}> {children} </MailContext.Provider>
  );
}
