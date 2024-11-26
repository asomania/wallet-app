"use client";
import React, { useState, useEffect } from "react";
import Dropdown from "./base/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loadLimits, addLimit, addTransaction } from "../store/data";
import { addNotification } from "../store/notifications";
import { IoCalendar, IoClose } from "react-icons/io5";
import { Transaction } from "../store/data";

interface BudgetProps {
  activeTab: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  transactions: Transaction[];
}

const Budget: React.FC<BudgetProps> = ({
  activeTab,
  isOpen,
  setIsOpen,
  transactions,
}) => {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: RootState) => state.transactions.limits
  );

  const [category, setCategory] = useState<{
    key: string;
    value: string;
  } | null>(null);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [valueLimit, setValueLimit] = useState<number | null>(null);
  const [amountError, setAmountError] = useState(false);
  const [limitError, setLimitError] = useState(false);

  useEffect(() => {
    dispatch(loadLimits());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const initialCategory = categories[0];
      setCategory({
        key: initialCategory.categoryKey,
        value: initialCategory.category,
      });
      setValueLimit(initialCategory.amount || 0);
    }
  }, [categories]);

  const totalLimitCheck = (categoryKey: string | undefined) => {
    const totalLimit = transactions.reduce(
      (acc: number, transaction: Transaction) =>
        acc + (transaction.category === categoryKey ? transaction.amount : 0),
      0
    );
    return totalLimit;
  };

  const handleAddTransaction = () => {
    if (amount <= 0) {
      setAmountError(true);
      return;
    }
    const totalLimit = totalLimitCheck(category?.value) + amount;
    if (
      valueLimit !== null &&
      activeTab === "Gider" &&
      totalLimit > valueLimit
    ) {
      setLimitError(true);
      dispatch(
        addNotification({
          id: Date.now().toString(),
          message: `${category?.value || ""} kategorisi için bütçe aşıldı.`,
          createdAt: new Date(),
        })
      );
      return;
    }
    setLimitError(false);
    if (valueLimit !== null) {
      dispatch(
        addLimit({
          id: Date.now().toString(),
          categoryKey: category?.key || "",
          category: category?.value || "",
          amount: valueLimit,
        })
      );
    }

    if (
      valueLimit !== null &&
      totalLimit > valueLimit * 0.8 &&
      activeTab === "Gider"
    ) {
      dispatch(
        addNotification({
          id: Date.now().toString(),
          message: `${
            category?.value || ""
          } kategorisi için bütçe %80'i aşıldı.`,
          createdAt: new Date(),
        })
      );
    }
    dispatch(
      addTransaction({
        id: Date.now().toString(),
        type: {
          key: activeTab === "Gelir" ? "income" : "expense",
          label: activeTab,
        },
        description,
        amount,
        date,
        category: category?.value || "",
      })
    );

    setDescription("");
    setAmount(0);
    setDate("");
  };

  const handleCategoryChange = (value: string) => {
    const selectedCategory = categories.find(
      (cat) => cat.categoryKey === value
    );
    if (selectedCategory) {
      setCategory({
        key: selectedCategory.categoryKey,
        value: selectedCategory.category,
      });
      setValueLimit(selectedCategory.amount || 0);
    }
  };

  return (
    <div
      className={`absolute h-full w-full flex justify-center items-center ${
        isOpen ? "visible" : "hidden"
      } z-50 bg-black/60`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 m-4 flex flex-col gap-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {activeTab} Ekle
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={20} className="text-gray-500 dark:text-gray-300" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="description" className="dark:text-white">
              Açıklama:
            </label>
            <textarea
              id="description"
              className="border-2 border-gray-300 rounded-md p-3 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Açıklama giriniz"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="amount" className="dark:text-white">
              Miktar:
            </label>
            <input
              type="number"
              id="amount"
              className="border-2 h-12 border-gray-300 rounded-md p-3 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Miktar giriniz"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
            {amountError && (
              <p className="text-red-500 text-sm">
                Miktar sıfırdan büyük olmalıdır.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="category" className="dark:text-white">
              Kategori:
            </label>
            <Dropdown
              options={categories.map((cat) => ({
                key: cat.categoryKey,
                value: cat.category,
              }))}
              value={category?.key || ""}
              onChange={handleCategoryChange}
              placeholder="Kategori seçiniz"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="date" className="dark:text-white">
              Tarih:
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                className="border-2 h-12 w-full border-gray-300 rounded-md p-3 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <IoCalendar
                size={20}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {activeTab === "Gider" && (
          <div className="flex flex-col gap-4">
            <label htmlFor="limit" className="dark:text-white">
              Limit:
            </label>
            <input
              type="number"
              id="limit"
              className="border-2 h-12 border-gray-300 rounded-md p-3 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Limit belirleyiniz"
              value={valueLimit !== null ? valueLimit : ""}
              onChange={(e) => setValueLimit(Number(e.target.value) || null)}
            />
            {limitError && (
              <p className="text-red-500 text-sm">Limit aşıldı.</p>
            )}
          </div>
        )}

        <button
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleAddTransaction}
        >
          {activeTab} Ekle
        </button>
      </div>
    </div>
  );
};

export default Budget;
