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
import Limit from "@/app/components/Limit";

const Dashboard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isLimitOpen, setIsLimitOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Gider");
  useEffect(() => {
    dispatch(loadTransactions());
  }, []);
  return (
    <div className="dark:bg-black relative bg-white w-full ">
      <Budget
        activeTab={activeTab}
        isOpen={isBudgetOpen}
        setIsOpen={setIsBudgetOpen}
        transactions={transactions}
      />
      <Limit isOpen={isLimitOpen} setIsOpen={setIsLimitOpen} />
      <div className="grid grid-cols-12 gap-4 max-h-[30vh] p-4">
        <div className="bg-white col-span-7 dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-row justify-center items-center gap-32  ">
          <BudgetStatus />
        </div>
        <div className="col-span-5 h-[30vh]">
          <div className="bg-white dark:bg-gray-800  rounded-lg shadow-lg w-full h-full flex flex-col p-10 gap-4 ">
            <Notifications />
          </div>
        </div>
      </div>
      <div className="px-4 py-16 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3 justify-center">
          <button
            onClick={() => {
              setIsBudgetOpen(true);
              setActiveTab("Gider");
            }}
            className="bg-red-500 text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            <span>Gider ekle</span>
          </button>
          <button
            onClick={() => {
              setIsBudgetOpen(true);
              setActiveTab("Gelir");
            }}
            className="bg-green-500 text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            <span>Gelir Ekle</span>
          </button>

          <button
            onClick={() => {
              setIsLimitOpen(true);
              setActiveTab("Limit");
            }}
            className="bg-gray-500 text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            <span>Limit Ayarla</span>
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
