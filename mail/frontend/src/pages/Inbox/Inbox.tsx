import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import NavigationBar from "../../componets/NavigationBar";
import { inbox } from "../../data";
import { tab } from "@material-tailwind/react";
import { Loader } from "lucide-react";
import { getMyInbox } from "../../utils/handlers";
import { Mail } from "../../utils/types/types";
import { useNavigate } from "react-router-dom";

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
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await getMyInbox();

      setInboxData(data);
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
            {inboxData.map((item) => {
              return (
                <MessageListItem
                  key={item._id}
                  message={item.body}
                  reciver={item.to.name}
                  senderName={item.from.name}
                  senderId={item.from._id}
                  read={item.read}
                  subject={item.subject}
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
};
export const MessageListItem = ({
  senderId,
  senderName,
  message,
  read,
  reciver,
  subject,
}: IMessageItem) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const navigate = useNavigate();
  function handleHover() {
    setShowMessageOptions((prev) => !prev);
  }

  return (
    <button
      onClick={() => {
        navigate("/mail");
      }}
      className={`w-full max-w-7xl mx-auto block ${
        !read ? "bg-white" : "bg-blue-50"
      } hover:cursor-pointer hover:border-b-2 hover:bg-none hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="flex items-center gap-4 p-2 hover:bg-gray-50 border-b border-gray-200 ">
        {/* Star button */}
        <button
          onClick={() => setIsStarred(!isStarred)}
          className="flex-shrink-0"
        >
          <Star
            className={`h-5 w-5 ${
              isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
            }`}
          />
        </button>
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <p className="font-medium text-gray-900 truncate w-40">
                {senderName}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 truncate">{subject}</p>
                <p className="text-sm text-gray-600 truncate"> {message} </p>
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
