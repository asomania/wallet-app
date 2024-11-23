import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Transaction = {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
};

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
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
  },
});

export const { addTransaction, loadTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
