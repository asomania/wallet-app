import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadTransactions } from "@/app/store/data";

const useLoadTransactions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);
};

export default useLoadTransactions;
