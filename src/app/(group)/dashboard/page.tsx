"use client";
import React from "react";
import DoughnutChart from "@/app/components/DoughnutChart";
import { TbUserDollar } from "react-icons/tb";
import Budget from "@/app/components/Budget";
import Table from "@/app/components/base/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { loadTransactions } from "@/app/store/data";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  useEffect(() => {
    dispatch(loadTransactions());
  }, []);
  return (
    <div className="dark:bg-black bg-white w-full">
      <div className="flex">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 m-4 flex flex-row justify-center items-center gap-20">
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Bütçe Durumu
            </h2>
            <DoughnutChart data={{ totalBudget: 900, spent: 300 }} />
          </div>

          <div className="flex flex-row justify-center items-center gap-4 border-l-4 border-gray-200 pl-20">
            <div className="bg-green-200 w-20 h-20 rounded-full flex justify-center items-center">
              <TbUserDollar size={50} className="text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Gelir Durumu
              </h2>
              <p className="text-sm text-gray-500">
                Toplam Geliriniz: <span className="text-green-500">1000</span>
              </p>
            </div>
          </div>

          {/* gider para */}
          <div className="flex flex-row justify-center items-center gap-4 border-l-4 border-gray-200 pl-20">
            <div className="bg-red-200 w-20 h-20 rounded-full flex justify-center items-center">
              <TbUserDollar size={50} className="text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Gider Durumu
              </h2>
              <p className="text-sm text-gray-500">
                Toplam Gideriniz: <span className="text-red-500">1000</span>
              </p>
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col items-center gap-3 justify-center">
          <button className="bg-red-500 text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-md hover:bg-red-600 transition-transform transform hover:scale-105">
            <span>Gider ekle</span>
          </button>
          <button className="bg-green-500 text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
            <span>Gelir Ekle</span>
          </button>

          <button className="bg-gray-500 text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105">
            <span>Limit Ayarla</span>
          </button>
        </div>
        <Budget activeTab="Gider" />
      </div>
      <div className="px-96 py-10">
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
