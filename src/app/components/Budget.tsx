"use client";
import React, { useState, useEffect } from "react";
import Dropdown from "./base/Dropdown";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { loadLimits } from "../store/data";
import { addNotification } from "../store/notifications";
import { addTransaction } from "../store/data";
import { addLimit } from "../store/data";

const Budget = ({
  activeTab,
  isOpen,
  setIsOpen,
}: {
  activeTab: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const categories = useSelector(
    (state: RootState) => state.transactions.limits
  );

  const limits = useSelector((state: RootState) => state.transactions.limits);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [valueLimit, setValueLimit] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const [limitError, setLimitError] = useState(false);
  useEffect(() => {
    dispatch(loadLimits());
    setLimitError(false);
    setCategory("");
    setDescription("");
    setAmount(0);
    setDate("");
  }, []);
  useEffect(() => {
    setValueLimit(
      limits.find((limit) => limit.categoryKey === category)?.amount ||
        categories[0].amount
    );
  }, [categories]);

  const handleAddTransaction = () => {
    const limit = limits.find((limit) => limit.categoryKey === category);
    setValueLimit(limit?.amount || 0);
    if (limit?.amount && amount > limit.amount) {
      setLimitError(true);
      dispatch(
        addNotification({
          id: Date.now().toString(),
          message: `${limit.category} kategorisi için bütçe aşıldı.`,
        })
      );
    } else {
      dispatch(
        addLimit({
          id: Date.now().toString(),
          categoryKey: category ? category : categories[0].categoryKey,
          category: category ? category : categories[0].category,
          amount: valueLimit,
        })
      );
      console.log("category", category);
      dispatch(
        addTransaction({
          id: Date.now().toString(),
          type: {
            key: activeTab === "Gelir" ? "income" : "expense",
            label: activeTab,
          },
          description: description,
          amount: amount,
          date: date,
          category: category ? category : categories[0].category,
        })
      );
    }
  };

  return (
    <div
      className={`absolute h-full w-full flex  justify-center items-center ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 m-4 flex justify-center items-center">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{activeTab} Ekle</h2>
            <button onClick={() => setIsOpen(false)}>x</button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <textarea
                className="border-2 border-gray-300 rounded-md p-2"
                id="description"
                name="description"
                placeholder="Açıklama"
                rows={3}
                cols={50}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="amount">Miktar : </label>
                  <input
                    type="number"
                    id="amount"
                    className="border-2 h-10 border-gray-300 rounded-md p-2"
                    placeholder="Miktar"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="category">Kategori</label>
                  <Dropdown
                    options={categories.map((category) => ({
                      key: category.categoryKey,
                      value: category.category,
                    }))}
                    value={category || categories[0].categoryKey}
                    onChange={(value) => {
                      console.log(value);
                      setCategory(value);
                      setValueLimit(
                        categories.find((cat) => cat.categoryKey === value)
                          ?.amount || 0
                      );
                    }}
                    placeholder="Kategori"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="date">Tarih</label>
                <input
                  type="date"
                  id="date"
                  placeholder="Tarih"
                  className="border-2 h-10 w-full border-gray-300 rounded-md p-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="limit">Limit</label>
                <input
                  type="number"
                  id="limit"
                  placeholder="Limit"
                  className="border-2 h-10 w-full border-gray-300 rounded-md p-2"
                  value={valueLimit}
                  onChange={(e) => setValueLimit(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {limitError && (
              <p className="text-red-500">Bütçe aşıldı. Eklenemiyor.</p>
            )}
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleAddTransaction}
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Budget;
