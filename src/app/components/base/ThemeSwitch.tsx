import { IoSunnyOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleTheme } from "@/app/store/theme";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Theme } from "@/app/store/theme";
import { IoMoonOutline } from "react-icons/io5";
import { loadTheme } from "@/app/store/theme";

const ThemeSwitch = ({
  switchTheme,
}: {
  switchTheme: (theme: Theme) => void;
}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    dispatch(loadTheme());
    switchTheme(theme as Theme);
  }, [theme]);

  return (
    <div className="transition-all duration-300">
      {theme === "light" ? (
        <IoMoonOutline
          size={20}
          onClick={() => dispatch(toggleTheme("dark"))}
          className="cursor-pointer dark:text-white transition-transform duration-500 transform hover:rotate-180"
        />
      ) : (
        <IoSunnyOutline
          size={20}
          onClick={() => dispatch(toggleTheme("light"))}
          className="cursor-pointer dark:text-white transition-transform duration-500 transform hover:rotate-180"
        />
      )}
    </div>
  );
};

export default ThemeSwitch;
