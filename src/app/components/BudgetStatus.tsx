import React from "react";
import DoughnutChart from "@/app/components/DoughnutChart";
import { TbUserDollar } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTransactions } from "@/app/store/data";
const BudgetStatus = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTransactions());
  }, []);
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const totalIncome = transactions.reduce((acc, transaction) => {
    if (transaction.type.key === "income") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);
  const totalExpense = transactions.reduce((acc, transaction) => {
    if (transaction.type.key === "expense") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold dark:text-white">Bütçe Durumu</h2>
        {transactions.length ? (
          <DoughnutChart
            data={{ totalBudget: totalIncome, spent: totalExpense }}
          />
        ) : (
          <p className="text-center text-gray-500">Henüz bütçe eklenmemiş.</p>
        )}
      </div>
      <div className="flex flex-row justify-center items-center gap-4 border-l-4 border-gray-200 pl-16">
        <div className="bg-green-200 w-20 h-20 rounded-full flex justify-center items-center">
          <TbUserDollar size={50} className="text-green-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Gelir Durumu
          </h2>
          <p className="text-sm text-gray-500">
            Toplam Geliriniz:{" "}
            <span className="text-green-500">{totalIncome}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-4 border-l-4 border-gray-200 pl-16">
        <div className="bg-red-200 w-20 h-20 rounded-full flex justify-center items-center">
          <TbUserDollar size={50} className="text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Gider Durumu
          </h2>
          <p className="text-sm text-gray-500">
            Toplam Gideriniz:{" "}
            <span className="text-red-500">{totalExpense}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default BudgetStatus;
