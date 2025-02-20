
import React, { useContext, useState } from "react";
import useMenuItems from "./menuItems";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

import { IoSettingsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

function Sidebar() {
  const menuItems = useMenuItems();
  const {pathname} = useLocation();

  const { openHeaderSidebar, toggleHeaderSidebar } = useContext(GlobalContext);


  return (
    <div className=" fixed z-50 h-screen">
      <div
        className={`p-2 border-r border-slate-200 dark:border-slate-600 absolute  h-screen shadow-md mh:shadow-none  ${
          openHeaderSidebar
            ? "w-[250px] bg-white dark:bg-gray-800 "
            : "w-0 overflow-hidden opacity-0 mh:opacity-100 mh:overflow-visible mh:w-[55px] bg-white dark:bg-gray-800 z-50"
        } duration-200`}
      >
        {openHeaderSidebar ? (
          <GoSidebarExpand
            className=" duration-200 w-5 h-5 absolute -right-8 top-3 cursor-pointer hover:text-blue-500"
            onClick={toggleHeaderSidebar}
          />
        ) : (
          <GoSidebarCollapse
            className=" duration-200 w-5 h-5 absolute -right-8 top-3 cursor-pointer hover:text-blue-500"
            onClick={toggleHeaderSidebar}
          />
        )}
        <div>
          <h1>S</h1>
        </div>
        <div className="mt-4">
          <nav className="">
            <ul className="list-none flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <li key={index} className=" relative">
                  <Link
                    to={item.url || ""}
                    className={`flex items-center gap-2 ${
                      openHeaderSidebar ? "px-4" : " justify-center px-1"
                    } ${
                      pathname === item.url ? "text-blue-500" : ""
                    } p-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-blue-500 hover:text-blue-500 rounded-md font-bold duration-200`}
                  >
                    {item.icon} {openHeaderSidebar && <>{item.name}</>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className={`absolute bottom-2 p-2 mh:p-0 m-0 mh:m-2 overflow-hidden ${openHeaderSidebar
            ? "w-[233px] bg-white dark:bg-gray-800 "
            : "w-0 overflow-hidden opacity-0 mh:opacity-100 mh:overflow-visible mh:w-[40px] bg-white dark:bg-gray-800 z-50"}`}>
        <Link
          to={`/store-settings`}
          className={`flex items-center gap-2 ${
            openHeaderSidebar ? "px-4" : " justify-center px-1"
          } ${
            pathname === "/store-settings" ? "text-blue-500" : ""
          } py-2 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-blue-500 hover:text-blue-500 rounded-md font-bold duration-200`}
        >
          <IoSettingsOutline className="w-6 h-6" /> {openHeaderSidebar && <>Settings</>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
