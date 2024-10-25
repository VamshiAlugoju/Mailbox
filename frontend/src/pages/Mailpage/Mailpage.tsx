import React, { useEffect, useState } from "react";
import { ArrowLeft, Star, Trash2, Loader2 } from "lucide-react";
import NavigationBar from "../../componets/NavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import { getMailDetails, removeFromBookmarks } from "../../utils/handlers";
import { Mail } from "../../utils/types/types";
import { useLocation } from "react-router-dom";
import { addToBookmarks } from "../../utils/handlers";

// Sample email data structure
const emailData = {
  subject: "forex strategy",
  sender: {
    name: "Rayner Teo",
    email: "rayner@tradingwithrayner.com",
    timestamp: "3:56 PM (3 hours ago)",
  },
  content: {
    greeting: "Hey hey, what's up my friend!",
    body: `Today, I'd like to teach you a forex trading strategy that Derek Dargo uses to profit consistently from the forex markets.

Here's his result...

[Chart Image would go here]

You might be wondering: "Who's Derek Dargo?"

Derek is a full-time trader who specializes in Forex trading for an income.

He's been profitable every single year for the last 7 years—with an average winning rate of 86%.

Clearly, he knows his stuff and that's why I got him to develop a forex trading course for traders who want to earn an income from forex trading.`,
    cta: "If you're interested, then click the link here.",
  },
  labels: ["Inbox"],
};

const IconButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
  >
    {children}
  </button>
);

const Mailpage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [mailDetails, setMailDetails] = useState<Mail | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!);
  const [isStarred, setIsStarred] = useState(
    user.bookmarks.find((item: string) => item == params.mailid)
  );
  async function handleBookmarkClick() {
    if (mailDetails) {
      if (isStarred) {
        setIsStarred((prev: boolean) => !prev);
        await removeFromBookmarks(mailDetails._id);
      } else {
        setIsStarred((prev: boolean) => !prev);
        await addToBookmarks(mailDetails._id);
      }
    }
  }
  useEffect(() => {
    async function iffe() {
      console.log("came here", params);
      setLoading(true);
      if (params.mailid) {
        const response = await getMailDetails(params.mailid);
        setMailDetails(response);
      }

      setLoading(false);
    }
    iffe();
  }, []);
  return (
    <div className="w-full">
      <NavigationBar />
      {loading ? (
        <div className="flex w-full h-full items-center justify-center mt-40">
          <Loader2 />
        </div>
      ) : (
        <>
          {mailDetails ? (
            <div className="max-w-4xl mx-auto p-4 bg-white">
              {/* Email Header with Actions */}
              <div className="flex items-center gap-4 mb-6 px-2">
                <IconButton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </IconButton>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {location.state.prevPage}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <IconButton
                    onClick={() => {
                      console.log("trash cliked");
                      navigate(-1);
                    }}
                  >
                    <Trash2 className="h-5 w-5" />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      handleBookmarkClick();
                    }}
                  >
                    <Star
                      color={`${isStarred ? "#facc15" : "black"}`}
                      className="h-5 w-5"
                    />
                  </IconButton>
                </div>
              </div>

              {/* Main Email Content */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-scroll">
                <div className="p-6">
                  {/* Subject */}
                  <h1 className="text-2xl font-semibold mb-6">
                    {mailDetails?.subject}
                  </h1>

                  {/* Sender Info */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {mailDetails.from.name.charAt(0)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="font-semibold">
                            {mailDetails.from.name}
                          </span>
                          <span className="text-gray-500 text-sm ml-2">{`<${mailDetails.from.email}>`}</span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {/* change */}
                          {emailData.sender.timestamp}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">to me</div>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div
                    className="prose max-w-none text-gray-800"
                    style={{ maxHeight: "50vh" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: mailDetails.body }}
                      style={{
                        maxHeight: "50vh",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center py-12">
              <p>Unable to get Mail Detals</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Mailpage;
