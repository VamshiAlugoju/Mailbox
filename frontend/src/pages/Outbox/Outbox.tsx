import { useEffect, useState } from "react";
import NavigationBar from "../../componets/NavigationBar";

import { Loader } from "lucide-react";
import { getMyOutbox } from "../../utils/handlers";
import { MessageListItem, MessageTabs } from "../Inbox/Inbox";
import { Mail } from "../../utils/types/types";
import { getTextFromHtml } from "../../utils/utilFunctions";

function Outbox() {
  const tabs = [
    {
      name: "Outbox",
    },
  ];
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [outboxData, setOutboxData] = useState<Mail[]>([]);

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
          {outboxData.length == 0 ? (
            <div className="h-full  w-full max-w-7xl mx-auto flex pt-10 justify-center bg-white border-t">
              <p className="font-bold">Out box is empty</p>
            </div>
          ) : (
            <div
              className=" border rounded-b-lg   overflow-scroll no-scrollbar w-full max-w-7xl mx-auto"
              style={{ maxHeight: "80vh" }}
            >
              {outboxData.map((item, index) => {
                return (
                  <MessageListItem
                    key={item._id}
                    message={getTextFromHtml(item.body)}
                    reciver={item.to.name}
                    senderName={item.from.name}
                    senderId={item.from._id}
                    read={false}
                    subject={item.subject}
                    currentPage="Outbox"
                    mailId={item._id}
                    lastIndex={index == outboxData.length - 1}
                  />
                );
              })}
            </div>
          )}
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
