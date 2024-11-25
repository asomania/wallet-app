"use client";
import React, { useState, useEffect } from "react";
import Dropdown from "./base/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loadLimits, addLimit, addTransaction } from "../store/data";
import { addNotification } from "../store/notifications";

interface BudgetProps {
  activeTab: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  transactions: Transaction[];
}

export type Transaction = {
  id: string;
  type: {
    key: "income" | "expense";
    label: string;
  };
  description: string;
  amount: number;
  date: string;
  category: string;
};

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
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 m-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{activeTab} Ekle</h2>
          <button onClick={() => setIsOpen(false)}>x</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <textarea
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="Açıklama"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="amount">Miktar:</label>
              <input
                type="number"
                id="amount"
                className="border-2 h-10 border-gray-300 rounded-md p-2"
                placeholder="Miktar"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Kategori:</label>
              <Dropdown
                options={categories.map((cat) => ({
                  key: cat.categoryKey,
                  value: cat.category,
                }))}
                value={category?.key || ""}
                onChange={handleCategoryChange}
                placeholder="Kategori"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="date">Tarih:</label>
            <input
              type="date"
              id="date"
              className="border-2 h-10 w-full border-gray-300 rounded-md p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {activeTab === "Gider" && (
            <div className="flex items-center gap-2">
              <label htmlFor="limit">Limit:</label>
              <input
                type="number"
                id="limit"
                className="border-2 h-10 w-full border-gray-300 rounded-md p-2"
                placeholder="Limit belirleyin"
                value={valueLimit !== null ? valueLimit : ""}
                onChange={(e) => setValueLimit(Number(e.target.value) || null)}
              />
            </div>
          )}
        </div>
        {limitError && (
          <p className="text-red-500 text-sm">Hata: Limit aşıldı.</p>
        )}
        {amountError && (
          <p className="text-red-500 text-sm">
            Hata: Miktar sıfırdan büyük olmalıdır.
          </p>
        )}
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleAddTransaction}
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default Budget;
