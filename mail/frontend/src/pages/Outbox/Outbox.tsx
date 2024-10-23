import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import NavigationBar from "../../componets/NavigationBar";
import { inbox } from "../../data";
import { tab } from "@material-tailwind/react";
import { Loader } from "lucide-react";
import { getMyInbox, getMyOutbox } from "../../utils/handlers";
import { MessageListItem, MessageTabs } from "../Inbox/Inbox";
import { Mail } from "../../utils/types/types";

function Outbox() {
  const tabs = [
    {
      name: "Outbox",
    },
  ];
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [outboxData, setOutboxData] = useState<Mail[]>([]);
  console.log(outboxData);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getMyOutbox();
      setOutboxData(data);
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
            {outboxData.map((item) => {
              return (
                <MessageListItem
                  key={item._id}
                  message={item.body}
                  reciver={item.to.name}
                  senderName={item.from.name}
                  senderId={item.from._id}
                  read={false}
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

export default Outbox;
