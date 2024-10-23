import "./App.css";
import Login from "./componets/Login";
import {
  createBrowserRouter,
  Route,
  BrowserRouter,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Signup from "./componets/Signup";
import AuthProvider from "./context/AuthProvider";
import { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import ComposeMail from "./pages/Compose/ComposeMail";
import Inbox from "./pages/Inbox/Inbox";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Outbox from "./pages/Outbox/Outbox";
import Mailpage from "./pages/Mailpage/Mailpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: (
      <AuthGate>
        <Home />
      </AuthGate>
    ),
  },
  {
    path: "/inbox",
    element: (
      <AuthGate>
        <Inbox />
      </AuthGate>
    ),
  },
  {
    path: "/compose",
    element: (
      <AuthGate>
        <ComposeMail />
      </AuthGate>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />

          <Route
            path="/home"
            element={
              <AuthGate>
                <Home />
              </AuthGate>
            }
          ></Route>
          <Route
            path="/inbox"
            element={
              <AuthGate>
                <Inbox />
              </AuthGate>
            }
          />
          <Route
            path="/compose"
            element={
              <AuthGate>
                <ComposeMail />
              </AuthGate>
            }
          />
          <Route
            path="/outbox"
            element={
              <AuthGate>
                <Outbox />
              </AuthGate>
            }
          />
          <Route
            path="/mail"
            element={
              <AuthGate>
                <Mailpage />
              </AuthGate>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </AuthProvider>
  );
}

export default App;

function FirstPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [authContext.isLoggedIn]);

  return <></>;
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(authContext.isLoggedIn);
  useEffect(() => {
    if (!authContext.isLoggedIn) {
      navigate("/login");
    }
  });

  if (!authContext.isLoggedIn) {
    return <></>;
  }
  return <> {children} </>;
}
