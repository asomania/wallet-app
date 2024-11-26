import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLimits } from "@/app/store/data";

const useLoadLimits = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLimits());
  }, [dispatch]);
};

export default useLoadLimits;
