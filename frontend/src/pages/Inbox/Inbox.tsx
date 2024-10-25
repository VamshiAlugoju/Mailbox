import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import NavigationBar from "../../componets/NavigationBar";
import { Loader, Trash2 } from "lucide-react";
import {
  addToBookmarks,
  getMyBookmarks,
  getMyInbox,
  removeFromBookmarks,
} from "../../utils/handlers";
import { Mail } from "../../utils/types/types";
import { useNavigate } from "react-router-dom";
import "./inbox.css";
import { getTextFromHtml } from "../../utils/utilFunctions";
import { useContext } from "react";
import { MailContext } from "../../context/MailProvider";

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
  const MailCtx = useContext(MailContext);

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
          <div className="bg-white w-full max-w-7xl mx-auto flex ">
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
                  unreadcount={
                    item.name == "Inbox" ? MailCtx.unreadCount : undefined
                  }
                />
              );
            })}
          </div>

          <div
            className="border w-full h-full max-w-7xl mx-auto rounded-b-lg"
            style={{ maxHeight: "80vh" }}
          >
            {tabs[activeTabIdx].name == "Inbox" && (
              <>
                {inboxData.length === 0 ? (
                  <div className="w-full max-w-7xl h-full  pt-10 mx-auto flex justify-center bg-white rounded-b-lg">
                    <p className="font-bold">Inbox is empty</p>
                  </div>
                ) : (
                  <>
                    {MailCtx.inbox.map((item, index) => {
                      return (
                        <MessageListItem
                          key={item._id}
                          message={getTextFromHtml(item.body)}
                          reciver={item.to.name}
                          senderName={item.from.name}
                          senderId={item.from._id}
                          read={item.read}
                          subject={item.subject}
                          mailId={item._id}
                          currentPage="Inbox"
                          showBookMark={true}
                          lastIndex={index === inboxData.length - 1}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
            {tabs[activeTabIdx].name === "Bookmarks" && (
              <>
                {bookmarks.length == 0 ? (
                  <div className="w-full max-w-7xl h-full  pt-10 mx-auto flex justify-center bg-white rounded-b-lg">
                    <p>No bookmarks found</p>
                  </div>
                ) : (
                  <>
                    {bookmarks.map((item, index) => (
                      <MessageListItem
                        key={item._id}
                        message={getTextFromHtml(item.body)}
                        reciver={item.to.name}
                        senderName={item.from.name}
                        senderId={item._id}
                        read={item.read}
                        subject={item.subject}
                        mailId={item._id}
                        currentPage="Inbox"
                        showBookMark={true}
                        lastIndex={index === bookmarks.length - 1}
                      />
                    ))}
                  </>
                )}
              </>
            )}
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
  unreadcount?: number;
}
export function MessageTabs({
  name,
  active,
  idx,
  unreadcount,
  onClickHandler,
}: IMessageTabs) {
  return (
    <button
      className={`w-fit border-b-2 flex items-center justify-between ${
        active ? "border-b-blue-600" : "border-b-white"
      }  `}
      onClick={() => onClickHandler(idx)}
    >
      <p className="font-medium p-5 px-7"> {name} </p>
      {unreadcount && <p className="text-blue-500 font-bold">{unreadcount}</p>}
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
  lastIndex?: boolean;
};
export const MessageListItem = ({
  senderName,
  message,
  read,

  subject,
  mailId,
  currentPage,
  lastIndex,
  showBookMark,
}: IMessageItem) => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const [isStarred, setIsStarred] = useState(
    user.bookmarks.find((item: string) => item == mailId)
  );
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const navigate = useNavigate();
  const MailCtx = useContext(MailContext);
  function handleHover() {
    setShowMessageOptions((prev) => !prev);
  }

  return (
    <button
      onClick={async () => {
        if (currentPage == "Inbox" && !read) {
          MailCtx.readMail(mailId);
        }
        navigate(`/mail/${mailId}`, { state: { prevPage: currentPage } });
      }}
      className={` w-full max-w-7xl mx-auto block ${
        !read ? "bg-white" : "bg-gray-100"
      } ${lastIndex && "rounded-b-lg"} mailboxitem`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
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
        {currentPage == "Inbox" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              MailCtx.deleteMail(mailId);
            }}
            className={`${
              showMessageOptions ? "flex" : "hidden"
            } hover:bg-gray-300 hover:rounded-2xl hover:bg-gray-300`}
          >
            <Trash2 color="red" />
          </button>
        )}
      </div>
    </button>
  );
};
