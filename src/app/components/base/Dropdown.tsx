import React from "react";

type Option = {
  key: string;
  value: string;
};

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  return (
    <select
      className="border-2 h-10 w-full border-gray-300 rounded-md p-2 bg-white dark:bg-gray-800 dark:border-white dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.key}
          value={option.key}
          className="bg-white dark:bg-gray-800 dark:text-gray-300"
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
