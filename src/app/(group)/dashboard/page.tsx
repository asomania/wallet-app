"use client";
import React from "react";
import Budget from "@/app/components/Budget";
import Table from "@/app/components/base/Table";
import BudgetStatus from "@/app/components/BudgetStatus";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { loadTransactions } from "@/app/store/data";
import { useEffect, useState } from "react";
import Notifications from "@/app/components/Notifications";

const Dashboard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Gider");
  useEffect(() => {
    dispatch(loadTransactions());
  }, []);
  return (
    <div className="dark:bg-black relative bg-white w-full min-h-screen">
      <Budget
        activeTab={activeTab}
        isOpen={isBudgetOpen}
        setIsOpen={setIsBudgetOpen}
        transactions={transactions}
      />
      <div className="grid xl:grid-cols-12 gap-4 p-4">
        <div className="bg-white lg:h-[30vh] md:h-auto  xl:col-span-7 lg:col-span-12 md:col-span-12 flex justify-evenly items-center flex-wrap dark:bg-gray-800 rounded-lg shadow-lg p-4 ">
          <BudgetStatus />
        </div>
        <div className=" md:col-span-12 lg:col-span-12 xl:col-span-5 lg:h-[30vh] h-[40vh] ">
          <div className="bg-white dark:bg-gray-800  rounded-lg shadow-lg w-full h-full flex flex-col gap-4 p-4 ">
            <Notifications />
          </div>
        </div>
      </div>
      <div className="px-4 py-16 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3 justify-end">
          <button
            onClick={() => {
              setIsBudgetOpen(true);
              setActiveTab("Gider");
            }}
            className=" text-black  rounded-full px-5 py-3 flex items-center gap-2 shadow-md  transition-transform transform hover:scale-105 dark:bg-gray-800 dark:border dark:text-white dark:border-white "
          >
            <span>Gider Ekle</span>
          </button>
          <button
            onClick={() => {
              setIsBudgetOpen(true);
              setActiveTab("Gelir");
            }}
            className=" text-black rounded-full px-5 py-3 flex items-center gap-2 shadow-md transition-transform  transform hover:scale-105 dark:bg-white dark:border dark:border-white dark:hover:bg-black-700 "
          >
            <span>Gelir Ekle</span>
          </button>
        </div>
        <Table
          bodyStyle={{ maxHeight: "40vh", overflowY: "auto" }}
          headers={[
            { label: "Açıklama", key: "description" },
            { label: "Miktar", key: "amount" },
            { label: "Tarih", key: "date" },
            { label: "Kategori", key: "category" },
            { label: "Tür", key: "type" },
          ]}
          data={transactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
