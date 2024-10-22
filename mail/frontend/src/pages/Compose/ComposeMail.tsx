import React, { useState } from "react";
import NavigationBar from "../../componets/NavigationBar";
// import { EditorState, Editor } from "draft-js";
import Tiptap from "../../componets/Tiptap";

const ComposeMail = () => {
  const [fontSize, setFontSize] = useState("normal");
  const [fontFamily, setFontFamily] = useState("Sans Serif");
  //   const [mailBody, setMailBody] = useState(EditorState.createEmpty());
  //   const handleChange = (editorState: EditorState) => {
  //     console.log(editorState);
  //   };
  return (
    <div>
      <NavigationBar />

      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg border-blue-100 ">
        {/* Header */}
        <div className="bg-blue-50 p-2 px-4 border-t-2 ">
          <p>New Message</p>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Recipient"
                className="w-full px-2 py-1 border-b border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-2 py-1 border-b border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email Body */}
          <div className="mt-4 h-40 bg-red-50">
            <Tiptap />
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-center mt-4 space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Send Mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMail;
