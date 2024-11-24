"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addLimit } from "../store/data";
import { loadLimits } from "../store/data";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import Dropdown from "./base/Dropdown";
const Limit = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [limit, setLimit] = useState(0);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const limits = useSelector((state: RootState) => state.transactions.limits);
  useEffect(() => {
    dispatch(loadLimits());
  }, []);

  const handleSetLimit = () => {
    dispatch(
      addLimit({
        id: Date.now().toString(),
        categoryKey: category,
        category: category,
        amount: limit,
      })
    );
    setIsOpen(false);
  };

  const limitAmount = limits.find(
    (limit) => limit.categoryKey === category
  )?.amount;

  return (
    <div
      className={`absolute z-20 h-full w-full flex justify-center items-center ${
        isOpen ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 m-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Limit Ayarla</h2>
            <button onClick={() => setIsOpen(false)}>x</button>
          </div>
          <div className="flex flex-col gap-4 px-10">
            <h3 className="text-lg font-semibold">Kategori</h3>
            <Dropdown
              options={limits.map((limit) => ({
                key: limit.categoryKey,
                value: limit.category,
              }))}
              value={category}
              onChange={(value) => {
                setCategory(value);
              }}
              placeholder="Kategori"
            />
            <h3 className="text-lg font-semibold">Limit Miktarı</h3>
            <input
              type="number"
              className="border-2 border-gray-300 rounded-md p-2"
              placeholder="Limit Miktarı"
              value={limitAmount ? limitAmount : limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            />
            <button
              onClick={handleSetLimit}
              className="bg-blue-500 text-white rounded-md p-2"
            >
              Limit Ayarla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limit;
