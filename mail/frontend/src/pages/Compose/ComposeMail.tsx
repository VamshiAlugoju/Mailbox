import { useContext, useState } from "react";
import NavigationBar from "../../componets/NavigationBar";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./composeMail.css";
import { sendMail } from "../../utils/handlers";
import AuthContext from "../../context/AuthContext";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

const ComposeMail = () => {
  const [userList, setUserList] = useState(["abc", "def", "lmk"]);
  const [showBar, setShowBar] = useState(false);
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState("");
  const Auth = useContext(AuthContext);
  async function handleSubmit() {
    try {
      const payload = {
        from: Auth.userId,
        to: "",
        body: value,
        subject,
      };
      await sendMail(payload);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="h-screen bg-slate-50 ">
      <NavigationBar />

      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg border-blue-100 h-5/6 flex flex-col">
        {/* Header */}
        <div className="bg-blue-50 p-2 px-4 border-t-2 flex-grow-0 flex-shrink">
          <p>New Message</p>
        </div>
        <div className="p-4 flex-grow  flex flex-col ">
          <div className="flex-grow-0">
            <div className="mb-3 bg-blue-500 relative">
              <input
                onClick={() => {
                  setShowBar((prev) => !prev);
                }}
                type="text"
                placeholder="Recipient"
                className="w-full  px-2 py-1 border-b border-gray-200 focus:outline-none "
              />
              {showBar && (
                <div
                  onClick={() => {
                    console.log("clicked");
                    setShowBar(false);
                  }}
                  className="absolute w-full left-0 z-10 ml-3 "
                  style={{ height: "80vh" }}
                >
                  <div className=" h-fit z-10 absolute bg-white shadow-xl outline-1 rounded-b-md border-black  w-1/2 mx-auto p-2">
                    {userList.length > 0 ? (
                      <div className="flex flex-col">
                        {userList.map((item) => {
                          return (
                            <button
                              className="border py-2 rounded-sm hover:bg-slate-100"
                              key={item}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("clicked");
                              }}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="">
                        <p>No users found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                type="text"
                placeholder="Subject"
                className="w-full px-2 py-1 border-b border-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email Body */}
          <div className=" flex-grow mb-10 ">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={{ toolbar: toolbarOptions }}
              className="editorcontent"
            />
          </div>

          {/* Bottom Toolbar */}
          <div className="flex   items-center space-x-2 flex-grow-0 py-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              style={{ zIndex: 3 }}
            >
              Send Mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMail;
