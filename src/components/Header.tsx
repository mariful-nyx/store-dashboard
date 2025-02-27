import React, { useContext, useEffect, useState } from "react";
import ThemeToggle from "./Theme";

import { CiBellOn, CiMail, CiMenuFries, CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Search from "./Search";

function Header() {
  const { openHeaderSidebar, toggleHeaderSidebar } = useContext(GlobalContext);
  const {pathname} = useLocation();
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 860) {
      toggleHeaderSidebar();
    }
  }, [pathname]);
  return (
    <div
      className={`sticky dark:bg-gray-800 bg-white top-0 right-0 border-b border-slate-200 dark:border-slate-600 ${
        openHeaderSidebar && " blur-md mh:blur-none"
      }`}
    >
      <div className="flex items-center gap-4 sm:gap-8 pr-10">
        <div
          className="flex mh:hidden flex-col gap-[6px] pl-6"
          role="button"
          onClick={toggleHeaderSidebar}
        >
          <CiMenuFries className=" rotate-180" />
        </div>
        <div className="flex gap-4 mh:gap-8 items-center w-full justify-end py-2 pr-4 pl-2 mh:pl-10">
          <button
            className="flex gap-2 items-center text-slate-500 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 p-1 rounded-full"
            onClick={() => setIsOpenSearch(true)}
          >
            <CiSearch className="w-4 h-4" />{" "}
            <div className="w-0 overflow-hidden sm:w-fit duration-200 text-sm">search...</div>
          </button>
          {isOpenSearch && (
            <Search
              isOpen={isOpenSearch}
              onClose={() => setIsOpenSearch(!isOpenSearch)}
            />
          )}
        </div>

        <button>
          <div className=" relative cursor-pointer p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-700 duration-200">
            <CiMail className="h-4 w-4 " />

            <div className="bg-blue-500 text-white rounded-full w-[14px] h-[14px] absolute -top-0 -right-0 text-[8px] flex justify-center items-center">
              33
            </div>
          </div>
        </button>

        <button>
          <div className=" relative cursor-pointer p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-700 duration-200">
            <CiBellOn className="h-4 w-4 " />
            <div className="bg-blue-500 text-white rounded-full w-[14px] h-[14px] absolute -top-0 -right-0 text-[8px] flex justify-center items-center">
              33
            </div>
          </div>
        </button>

        <ThemeToggle />

        <div className="flex items-center">
          <div className="flex gap-2 items-center">
            <div className="bg-slate-400 rounded-full max-w-8 min-w-8 h-8 "></div>
            <div className=" font-bold text-nowrap hidden sm:block">
              Md Mariful Islam
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
