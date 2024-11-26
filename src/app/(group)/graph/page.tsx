"use client";
import React, { useEffect, useState } from "react";
import DoughnutChart from "@/app/components/DoughnutChart";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { loadTransactions } from "@/app/store/data";
import { useDispatch } from "react-redux";
import { loadLimits } from "@/app/store/data";
import { Transaction, Limit } from "@/app/store/data";
import LineChart from "@/app/components/LineChart";

const Page = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.transactions.limits
  );
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [categoryKeys, setCategoryKeys] = useState<Limit[]>([]);
  const [profit, setProfit] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    dispatch(loadTransactions());
    dispatch(loadLimits());
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(6); // Ekran genişliği 1280px ve üstü ise 6 grafik göster
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(3); // Ekran genişliği 768px ve üstü ise 3 grafik göster
      } else {
        setItemsPerPage(1); // Küçük ekranlarda yalnızca 1 grafik göster
      }
    };

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde sayfa başına grafik sayısını güncelle
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);
  useEffect(() => {
    setCategoryKeys(categories);
    setTransactionData(transactions);
    if (transactions.length > 0) {
      const profitInMonth: number[] = [];
      for (let i = 1; i < 13; i++) {
        const incomeTotal = transactions
          .filter(
            (transaction) =>
              transaction.type.key === "income" &&
              new Date(transaction.date).getMonth() === i
          )
          .reduce((acc, transaction) => acc + transaction.amount, 0);
        const expenseTotal = transactions
          .filter(
            (transaction) =>
              transaction.type.key === "expense" &&
              new Date(transaction.date).getMonth() === i
          )
          .reduce((acc, transaction) => acc + transaction.amount, 0);
        profitInMonth.push(incomeTotal - expenseTotal);
      }
      setProfit(profitInMonth);
    }
  }, [categories, transactions]);

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < categoryKeys.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedCategories = categoryKeys.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col p-4 w-full dark:bg-black ">
      <div className="flex xl:h-[30vh] h-auto p-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg gap-10">
        <button
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          {"<"}
        </button>
        <div className="flex justify-between gap-4 w-full dark:text-white">
          {transactionData.length > 0 &&
            displayedCategories.map((category) => {
              if (transactionData.length > 0) {
                const data = {
                  totalBudget: category.amount,
                  spent: transactionData
                    .filter(
                      (transaction) =>
                        transaction.category === category.category &&
                        transaction.type.key === "expense"
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0),
                };

                return (
                  <div
                    key={category.categoryKey}
                    className="flex flex-col gap-4"
                  >
                    <h2 className="text-center">{category.category} bütçesi</h2>
                    <div className="w-full flex justify-center">
                      <DoughnutChart data={data} />
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>

        <button
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={nextPage}
          disabled={(currentPage + 1) * itemsPerPage >= categoryKeys.length}
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-12 mt-10 ">
        <div className="xl:col-span-6 lg:col-span-12 md:col-span-12 col-span-12 dark:bg-gray-800 p-10 w-full rounded-lg shadow-lg ">
          <h2 className="text-center text-2xl font-bold dark:text-white">
            Gelir-Gider Grafiği
          </h2>
          <LineChart
            label={[
              "Ocak",
              "Şubat",
              "Mart",
              "Nisan",
              "Mayıs",
              "Haziran",
              "Temmuz",
              "Ağustos",
              "Eylül",
              "Ekim",
              "Kasım",
              "Aralık",
            ]}
            data={profit}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
