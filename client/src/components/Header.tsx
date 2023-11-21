import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const Header: React.FC = () => {
  const { data } = useAppSelector((state) => state.user);

  return (
    <div>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
          <h1 className="font-bold text-sm:text-xl flex flex-wrap">
            <Link to={"/main"}>
              <span className="text-slate-500">Rialtor</span>
              <span className="text-slate-700">Apartment</span>
            </Link>
          </h1>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search ...."
              className="bg-transparent focus:outline-none w-36 sm:w-72 "
            />
            <FaSearch className="text-slate-600" />
          </form>
          <ul className="flex gap-4">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              <Link to={"/about"}>About</Link>
            </li>
            {data ? (
              <li className=" text-slate-700 hover:underline">
                <Link to={"/profile"}>
                  <img
                    className=" rounded-full h-7 w-7 object-cover"
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                    }
                    alt="Profile"
                  />
                </Link>
              </li>
            ) : (
              <li className=" text-slate-700 hover:underline">
                <Link to={"/login"}>Log In</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
