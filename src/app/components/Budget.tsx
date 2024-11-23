"use client";
import React, { useState } from "react";
import Dropdown from "./base/Dropdown";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/data";
const Budget = ({ activeTab }: { activeTab: string }) => {
  const categories = ["Kategori 1", "Kategori 2", "Kategori 3"];
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const handleAddTransaction = () => {
    dispatch(
      addTransaction({
        id: Date.now().toString(),
        type: activeTab === "gelir" ? "income" : "expense",
        description: description,
        amount: amount,
        date: date,
        category: category,
      })
    );
  };

  return (
    <div className="bg-white  relative dark:bg-gray-800 rounded-lg shadow-lg p-5 m-4 flex">
      <div className="absolute top-[95px] left-[-8px] w-4 h-4 bg-white transform rotate-45"></div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{activeTab} Ekle</h2>
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
            <input
              type="number"
              id="amount"
              className="border-2 h-10 border-gray-300 rounded-md p-2"
              placeholder="Miktar"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              id="date"
              placeholder="Tarih"
              className="border-2 h-10 w-full border-gray-300 rounded-md p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Dropdown
              options={categories}
              value={category}
              onChange={(value) => setCategory(value)}
              placeholder="Kategori"
            />
          </div>
        </div>
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
