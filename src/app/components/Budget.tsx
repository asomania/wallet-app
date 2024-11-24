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

  const [category, setCategory] = useState({
    key: categories[0].categoryKey,
    value: categories[0].category,
  });
  const [description, setDescription] = useState("");
  const [valueLimit, setValueLimit] = useState<number | null>(
    categories.find((limit) => limit.categoryKey === category.key)?.amount || 0
  );
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const [limitError, setLimitError] = useState(false);
  useEffect(() => {
    dispatch(loadLimits());
    setLimitError(false);
    setDescription("");
    setAmount(0);
    setDate("");
  }, []);

  useEffect(() => {
    setCounter(counter + 1);
    console.log(counter, category);
    setValueLimit(
      categories.find((limit) => limit.categoryKey === category.key)?.amount ||
        0
    );
    console.log("deneme", valueLimit);
  }, [categories]);

  const handleAddTransaction = () => {
    console.log("amount", amount);
    if (
      (valueLimit === 0 || valueLimit) &&
      activeTab === "Gider" &&
      amount > valueLimit
    ) {
      setLimitError(true);
      console.log("limit aşıldı");
      dispatch(
        addNotification({
          id: Date.now().toString(),
          message: `${category.value} kategorisi için bütçe aşıldı.`,
        })
      );
    } else {
      setLimitError(false);
      console.log("eklendi");
      dispatch(
        addLimit({
          id: Date.now().toString(),
          categoryKey: category ? category.key : categories[0].categoryKey,
          category: category ? category.value : categories[0].category,
          amount: valueLimit || 0,
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
          category: category ? category.value : categories[0].category,
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
                    value={amount !== 0 ? amount : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setAmount(0);
                      } else {
                        setAmount(Number(value));
                      }
                    }}
                  />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="category">Kategori</label>
                  <Dropdown
                    options={categories.map((category) => ({
                      key: category.categoryKey,
                      value: category.category,
                    }))}
                    value={category.key || categories[0].categoryKey}
                    onChange={(value) => {
                      console.log(value);
                      setCategory({
                        key: value,
                        value:
                          categories.find((cat) => cat.categoryKey === value)
                            ?.category || "",
                      });
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
                  placeholder="Limit belirleyin"
                  className="border-2 h-10 w-full border-gray-300 rounded-md p-2"
                  value={valueLimit !== null ? valueLimit : ""}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value === "") {
                      setValueLimit(null);
                    } else {
                      setValueLimit(Number(e.target.value));
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {limitError && (
              <p className="text-red-500">Limit aşıldı. Eklenemiyor.</p>
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
