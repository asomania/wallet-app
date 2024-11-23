"use client";
import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "../store/store";
export default function DasboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <div className="flex">
            <div className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
              <div className="flex gap-5 items-center">
                <Image src="/logo.png" alt="logo" height={40} width={30} />
                <p className="text-white text-xl">Wallet app</p>
              </div>
              <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6 ">
                  <div className="space-y-3 ">
                    <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                      analytics
                    </label>

                    <Link
                      className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                      href="/dashboard"
                    >
                      <span className="mx-2 text-sm font-medium">
                        Dashboard
                      </span>
                    </Link>

                    <Link
                      href="/graph"
                      className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    >
                      <span className="mx-2 text-sm font-medium">
                        Preformance
                      </span>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>

            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
