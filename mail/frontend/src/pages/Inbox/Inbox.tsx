import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import NavigationBar from "../../componets/NavigationBar";
import { inbox } from "../../data";
import { tab } from "@material-tailwind/react";
import { Loader } from "lucide-react";
import {
  addToBookmarks,
  getMyBookmarks,
  getMyInbox,
  removeFromBookmarks,
} from "../../utils/handlers";
import { Mail } from "../../utils/types/types";
import { useNavigate } from "react-router-dom";
import "./inbox.css";

function Inbox() {
  const tabs = [
    {
      name: "Inbox",
    },
    {
      name: "Bookmarks",
    },
  ];
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [inboxData, setInboxData] = useState<Mail[]>([]);
  const [bookmarks, setBookMarks] = useState<Mail[]>([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (activeTabIdx == 0) {
        const data = await getMyInbox();

        setInboxData(data);
      } else if (activeTabIdx == 1) {
        const data = await getMyBookmarks();
        console.log(data);
        setBookMarks(data);
      }
      setIsLoading(false);
    })();
  }, [activeTabIdx]);

  return (
    <div>
      <NavigationBar />
      {!isLoading ? (
        <div className="bg-blue-50 h-screen  border-yellow-700">
          <div className="bg-white w-full max-w-7xl mx-auto">
            {tabs.map((item, index) => {
              return (
                <MessageTabs
                  key={item.name}
                  name={item.name}
                  active={index == activeTabIdx}
                  onClickHandler={(id) => {
                    setActiveTabIdx(id);
                  }}
                  idx={index}
                />
              );
            })}
          </div>
          <div className="">
            {tabs[activeTabIdx].name == "Inbox" &&
              inboxData.map((item) => {
                return (
                  <MessageListItem
                    key={item._id}
                    message={item.body}
                    reciver={item.to.name}
                    senderName={item.from.name}
                    senderId={item.from._id}
                    read={item.read}
                    subject={item.subject}
                    mailId={item._id}
                    currentPage="Inbox"
                    showBookMark={true}
                  />
                );
              })}
            {tabs[activeTabIdx].name == "Bookmarks" &&
              bookmarks.map((item) => {
                return (
                  <MessageListItem
                    key={item._id}
                    message={item.body}
                    reciver={item.to.name}
                    senderName={item.from.name}
                    senderId={item.from._id}
                    read={item.read}
                    subject={item.subject}
                    mailId={item._id}
                    currentPage="Inbox"
                    showBookMark={true}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <div className="bg-blue-50  h-screen pt-10 justify-center flex border-yellow-700">
          <Loader />
        </div>
      )}
    </div>
  );
}
export default Inbox;

interface IMessageTabs {
  name: string;
  active: boolean;
  idx: number;
  onClickHandler: (id: number) => void;
}
export function MessageTabs({
  name,
  active,
  idx,
  onClickHandler,
}: IMessageTabs) {
  return (
    <button
      className={`w-fit border-b-2 ${
        active ? "border-b-blue-600" : "border-b-white"
      }`}
      onClick={() => onClickHandler(idx)}
    >
      <p className="font-medium p-5 px-7"> {name} </p>
    </button>
  );
}

type IMessageItem = {
  senderId: string;
  senderName: string;
  message: string;
  read: boolean;
  reciver: string;
  subject: string;
  mailId: string;
  currentPage: string;
  showBookMark?: boolean;
};
export const MessageListItem = ({
  senderId,
  senderName,
  message,
  read,
  reciver,
  subject,
  mailId,
  currentPage,
  showBookMark,
}: IMessageItem) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const [isStarred, setIsStarred] = useState(
    user.bookmarks.find((item: string) => item == mailId)
  );
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const navigate = useNavigate();
  function handleHover() {
    setShowMessageOptions((prev) => !prev);
  }

  return (
    <button
      onClick={() => {
        navigate(`/mail/${mailId}`, { state: { prevPage: currentPage } });
      }}
      className={` w-full max-w-7xl mx-auto block ${
        !read ? "bg-white" : "bg-blue-50"
      }  mailboxitem`}
      // onMouseEnter={handleHover}
      // onMouseLeave={handleHover}
    >
      <div className="flex items-center gap-4 p-2     ">
        {/* Star button */}
        {showBookMark && (
          <button
            onClick={async (e) => {
              e.stopPropagation();
              if (isStarred) {
                setIsStarred((prev: boolean) => !prev);
                await removeFromBookmarks(mailId);
              } else {
                setIsStarred((prev: boolean) => !prev);
                await addToBookmarks(mailId);
              }
            }}
            className="flex-shrink-0 hover:bg-gray-200 p-1"
          >
            <Star
              className={`h-5 w-5 ${
                isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
            />
          </button>
        )}
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <p className="font-medium text-gray-900 truncate w-40">
                {senderName}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 truncate">{subject}</p>
                <p className="text-sm text-gray-600 truncate">
                  {message.slice(0, 100)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${showMessageOptions ? "flex" : "hidden"}`}>
          <p>delete</p>
        </div>
      </div>
    </button>
  );
};
