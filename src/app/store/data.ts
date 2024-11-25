import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export type Limit = {
  id: string;
  categoryKey: string;
  category: string;
  amount: number;
};

interface TransactionState {
  transactions: Transaction[];
  limits: Limit[];
}

const initialState: TransactionState = {
  transactions: [],
  limits: [
    {
      id: "1",
      categoryKey: "food",
      category: "Yemek",
      amount: 0,
    },
    {
      id: "2",
      categoryKey: "transport",
      category: "Taşımacılık",
      amount: 0,
    },
    {
      id: "3",
      categoryKey: "shopping",
      category: "Alışveriş",
      amount: 0,
    },
    {
      id: "4",
      categoryKey: "health",
      category: "Sağlık",
      amount: 0,
    },
    {
      id: "5",
      categoryKey: "education",
      category: "Eğitim",
      amount: 0,
    },
    {
      id: "6",
      categoryKey: "entertainment",
      category: "Eğlence",
      amount: 0,
    },
    {
      id: "7",
      categoryKey: "other",
      category: "Diğer",
      amount: 0,
    },
  ],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);

      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    loadTransactions: (state) => {
      const savedTransactions = localStorage.getItem("transactions");
      if (savedTransactions) {
        state.transactions = JSON.parse(savedTransactions);
      }
    },
    loadLimits: (state) => {
      const savedLimits = localStorage.getItem("limits");
      if (savedLimits) {
        state.limits = JSON.parse(savedLimits);
      }
    },
    addLimit: (state, action: PayloadAction<Limit>) => {
      const existingLimit = state.limits.find(
        (limit) => limit.categoryKey === action.payload.categoryKey
      );
      if (existingLimit) {
        existingLimit.amount = action.payload.amount;
      } else {
        state.limits.push(action.payload);
      }
      localStorage.setItem("limits", JSON.stringify(state.limits));
    },
  },
});

export const { addTransaction, loadTransactions, addLimit, loadLimits } =
  transactionSlice.actions;
export default transactionSlice.reducer;
