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
          <Route path="inbox" element={<Inbox />} />
          <Route path="compose" element={<ComposeMail />} />
          <Route path="outbox" element={<ComposeMail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

function FirstPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(authContext);
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

  if (!authContext.isLoggedIn) {
    navigate("login");
    return <></>;
  }
  return <> {children} </>;
}
