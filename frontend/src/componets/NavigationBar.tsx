import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import {} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);

  // const selectedRoute =
  const menuItems = [
    { label: "Inbox", href: "/inbox" },
    { label: "Compose ", href: "/compose" },
    { label: "Outbox", href: "/outbox" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => {
                navigate("/home");
              }}
              className="text-xl font-semibold"
            >
              MailBox
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              return (
                <NavLink
                  className={`${
                    location.pathname.includes(item.href) && "bg-blue-50"
                  } p-1 px-2 rounded-md`}
                  key={item.label}
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              );
            })}

            <button
              onClick={() => {
                Auth.logout();
              }}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col space-y-2 px-3 py-2">
              <button className="text-gray-600 hover:text-gray-900 py-2 text-base font-medium text-left">
                LOG IN
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-700">
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
