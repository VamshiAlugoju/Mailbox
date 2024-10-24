import { createContext, useEffect, useMemo, useState } from "react";
import { Mail } from "../utils/types/types";
import { useEditor } from "@tiptap/react";
import { getMyInbox, getMyOutbox } from "../utils/handlers";
import { readMailById } from "../utils/handlers";

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
  deleteMail: (mailId: string) => {},
});

export function MailProvider({ children }: { children: React.ReactNode }) {
  const [inbox, setInbox] = useState<Mail[]>([]);
  const [outbox, setOutbox] = useState<Mail[]>([]);
  const [unreadCount, setUnreadcount] = useState(0);

  function readMail(mailId: string) {
    let mailidx = inbox.findIndex((item) => item._id === mailId);
    if (mailidx >= 0) {
      let mail = inbox[mailidx];
      mail = { ...mail, read: true };
      const updatedMail = [...inbox];
      updatedMail[mailidx] = mail;
      setInbox(updatedMail);
      readMailById(mailId);
    }
  }

  function deleteMail(mailId: string) {
    const updatedMail = inbox.filter((item) => item._id !== mailId);
    setInbox(updatedMail);
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
    let id: number;
    async function iffe() {
      await handleInbox();
      id = setInterval(async () => {
        await handleInbox();
      }, 5000);
    }
    iffe();
    return () => {
      if (id) clearInterval(id);
    };
  }, []);

  const value: IMailContext = {
    inbox,
    outbox,
    unreadCount,
    readMail,
    deleteMail,
  };
  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}
