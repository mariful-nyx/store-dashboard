import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function Paginator({ data }: { data: any }) {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (page: number) => {

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('page', page.toString() )
      return newParams
    })

  };

  const totalPageList:number[] = []

  for (let i = 1; i < data?.total_pages+1; i++) {
    totalPageList.push(i)
  }


  return (
    <div>
      <div className="flex items-center justify-between dark:text-white ">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            disabled={data?.prev_page_link ? false : true}
            onClick={() => onPageChange(data?.prev_page_number || 1)}
            className="relative inline-flex items-center rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            disabled={data?.next_page_url ? false : true}
            onClick={() => onPageChange(data?.next_page_number || 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

          <div>
            <nav
              aria-label="Pagination"
              className="isolate flex flex-wrap -space-x-px rounded-md"
            >
              <button
                disabled={data?.prev_page_link ? false : true}
                onClick={() => onPageChange(data?.prev_page_number || 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 dark:ring-gray-500 hover:bg-slate-200 dark:hover:bg-slate-600 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <GoChevronLeft aria-hidden="true" className="size-5" />
              </button>

              {totalPageList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onPageChange(item)}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center ${
                    item === data?.current_page
                      ? "bg-blue-500 text-white"
                      : "text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-200 dark:ring-gray-500 hover:bg-slate-200 dark:hover:bg-slate-600 duration-200"
                  } px-4 py-2 text-sm font-semibold `}
                >
                  {item}
                </button>
              ))}

              <button
                disabled={data?.next_page_url ? false : true}
                onClick={() => onPageChange(data?.next_page_number || 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 dark:ring-gray-500 hover:bg-slate-200 dark:hover:bg-slate-600 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <GoChevronRight aria-hidden="true" className="size-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
