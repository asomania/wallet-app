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
}

const Budget: React.FC<BudgetProps> = ({ activeTab, isOpen, setIsOpen }) => {
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
  const [date, setDate] = useState("");
  const [valueLimit, setValueLimit] = useState<number | null>(null);
  const [limitError, setLimitError] = useState(false);

  // Load limits on component mount
  useEffect(() => {
    dispatch(loadLimits());
  }, [dispatch]);

  // Set initial category and valueLimit when categories change
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

  const handleAddTransaction = () => {
    if (amount <= 0) {
      setLimitError(true);
      dispatch(
        addNotification({
          id: Date.now().toString(),
          message: "Miktar sıfırdan büyük olmalıdır.",
        })
      );
      return;
    }

    if (valueLimit !== null && activeTab === "Gider" && amount > valueLimit) {
      setLimitError(true);
      dispatch(
        addNotification({
          id: Date.now().toString(),
          message: `${category?.value || ""} kategorisi için bütçe aşıldı.`,
        })
      );
      return;
    }

    setLimitError(false);

    // Add limit if necessary
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

    // Add transaction
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

    // Reset form
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
        </div>
        {limitError && (
          <p className="text-red-500 text-sm">Hata: Limit aşıldı.</p>
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
