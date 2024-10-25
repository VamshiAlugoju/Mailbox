import { useContext, useEffect, useState } from "react";
import NavigationBar from "../../componets/NavigationBar";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./composeMail.css";
import { getUsersByRegex, sendMail } from "../../utils/handlers";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useDebounce } from "../../hooks/useDebounce";
import { User } from "../../utils/types/types";

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
  const [userList, setUserList] = useState<User[]>([]);
  const [showBar, setShowBar] = useState(false);
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState("");
  const Auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [recipent, setrecipent] = useState("");
  const [selectedUser, setSelectedUser] = useState<User>();
  const recipentValue = useDebounce<string>(recipent, 300);
  useEffect(() => {
    async function iffe() {
      if (recipentValue) {
        const data = await getUsersByRegex(recipentValue);
        setUserList(data);
      }
    }
    iffe();
  }, [recipentValue]);
  async function handleSubmit() {
    try {
      setLoading(true);
      if (subject == "") {
        toast.info("Subject is empty.");
      }
      if (value == "") {
        toast.info("Body is empty.");
      }
      if (recipent == "") {
        toast.info("Recipent is empty.");
      }
      if (subject != "" && value != "" && selectedUser) {
        const payload = {
          from: Auth.userId,
          to: selectedUser?.email,
          body: value,
          subject,
        };
        await sendMail(payload);
        toast.success("Mail sent successfully.");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function handleSelectUser(email: string) {
    const user = userList.find((user) => user.email == email);
    if (user) {
      setSelectedUser(user);
      setShowBar(false);
      setrecipent(user.email);
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
                onChange={(e) => {
                  setrecipent(e.target.value);
                }}
                type="text"
                value={recipent}
                placeholder="Recipient"
                className="w-full  px-2 py-1 border-b border-gray-200 focus:outline-none "
              />
              {showBar && (
                <div
                  onClick={() => {
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
                            <UserProfileAvatar
                              name={item.name}
                              email={item.email}
                              key={item._id}
                              handleClick={handleSelectUser}
                            />
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-28 flex items-center justify-center"
              style={{ zIndex: 3 }}
            >
              {!loading ? (
                "Send Mail"
              ) : (
                <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMail;

const UserProfileAvatar = ({
  name = "",
  email = "",
  handleClick,
}: {
  name: string;
  email: string;
  handleClick: (email: string) => Promise<void>;
}) => {
  // Function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <button
      className="flex items-center gap-3 hover:bg-gray-100 rounded-md"
      onClick={() => {
        handleClick(email);
      }}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full  text-white font-medium text-sm "
        style={{ backgroundColor: getRandColor(name) }}
      >
        {getInitials(name)}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-gray-900">
          {name || "Unknown User"}
        </span>
        <span className="text-sm text-gray-500">
          {email || "No email provided"}
        </span>
      </div>
    </button>
  );
};

const colors: { [key: string]: string } = {
  a: "#FF69B4", // Pink
  b: "#34A85A", // Green
  c: "#FFC107", // Amber
  d: "#8E24AA", // Purple
  e: "#4CAF50", // Green
  f: "#03A9F4", // Blue
  g: "#FF9800", // Orange
  h: "#9C27B0", // Deep Purple
  i: "#2196F3", // Blue
  j: "#4DB6AC", // Teal
  k: "#FF1744", // Red
  l: "#1A237E", // Indigo
  m: "#F44336", // Red
  n: "#3F51B5", // Indigo
  o: "#9E9E9E", // Grey
  p: "#795548", // Brown
  q: "#B71C1C", // Red
  r: "#F57C00", // Orange
  s: "#64B5F6", // Blue
  t: "#8BC34A", // Light Green
  u: "#9F9F9F", // Grey
  v: "#3E2723", // Brown
  w: "#2196F3", // Blue
  x: "#F48FB1", // Pink
  y: "#FFA07A", // Orange
  z: "#4CAF50", // Green
};
function getRandColor(name: string) {
  const letter = name[0].toLocaleLowerCase();
  if (letter == null || letter == undefined) {
    return colors.a;
  }
  return colors[letter];
}
