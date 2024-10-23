import React from "react";
import { ArrowLeft, Star, Trash2, Mail, MoreVertical } from "lucide-react";
import NavigationBar from "../../componets/NavigationBar";

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
  return (
    <div className="w-full">
      <NavigationBar />
      <div className="max-w-4xl mx-auto p-4 bg-white">
        {/* Email Header with Actions */}
        <div className="flex items-center gap-4 mb-6 px-2">
          <IconButton>
            <ArrowLeft className="h-5 w-5" />
          </IconButton>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              {emailData.labels.map((label) => (
                <span
                  key={label}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <IconButton>
              <Trash2 className="h-5 w-5" />
            </IconButton>
            <IconButton>
              <Mail className="h-5 w-5" />
            </IconButton>
            <IconButton>
              <Star className="h-5 w-5" />
            </IconButton>
            <IconButton>
              <MoreVertical className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        {/* Main Email Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Subject */}
            <h1 className="text-2xl font-semibold mb-6">{emailData.subject}</h1>

            {/* Sender Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {emailData.sender.name.charAt(0)}
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-semibold">
                      {emailData.sender.name}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">{`<${emailData.sender.email}>`}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {emailData.sender.timestamp}
                  </span>
                </div>
                <div className="text-sm text-gray-500">to me</div>
              </div>
            </div>

            {/* Email Body */}
            <div className="prose max-w-none text-gray-800">
              <p className="mb-4">{emailData.content.greeting}</p>
              {emailData.content.body.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
              <p className="mb-4">{emailData.content.cta}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mailpage;
