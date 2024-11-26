"use client";
import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ThemeSwitch from "../components/base/ThemeSwitch";
import { Theme } from "../store/theme";
import { useState } from "react";
//inter font
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const switchTheme = (theme: Theme) => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <html>
      <body className={`${montserrat.className} dark:bg-black`}>
        <Provider store={store}>
          <div className="flex min-h-screen">
            <div
              className={`fixed top-5 left-5 z-50 lg:hidden ${
                isSidebarOpen ? "hidden" : "block"
              }`}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Image src="/logo.png" alt="logo" height={30} width={25} />
                <span className="text-sm">Menü</span>
              </button>
            </div>

            <div
              className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 px-5 py-8 overflow-y-auto transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0`}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <Image src="/logo.png" alt="logo" height={40} width={30} />
                  <p className="text-black dark:text-white text-xl">Bütçe'm</p>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden text-gray-800 dark:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                Kendi bütçeni yönet.
              </p>

              <div className="mt-5">
                <ThemeSwitch switchTheme={switchTheme} />
              </div>

              <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">
                  <div className="space-y-3">
                    <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                      Analiz
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
                        Grafikler
                      </span>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>

            <div className="flex-1 lg:ml-64 dark:bg-black">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
