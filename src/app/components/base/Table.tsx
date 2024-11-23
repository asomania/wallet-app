import React from "react";

type TableData = Record<string, string | number>;
interface Header {
  label: string;
  key: string;
}
interface TableProps {
  headers: Header[];
  data: TableData[];
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  headerStyle,
  bodyStyle,
}) => {
  return (
    <div className="overflow-x-auto h-full shadow-md rounded-lg ">
      <div className="min-w-full">
        <div className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
              ...headerStyle,
            }}
          >
            {headers.map((header, index) => (
              <div
                key={index}
                className="text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider px-6 py-3"
              >
                {header.label}
              </div>
            ))}
          </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600"
          style={{ ...bodyStyle }}
        >
          {data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid`}
              style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
            >
              {headers.map((header, cellIndex) => (
                <div
                  key={cellIndex}
                  className="text-sm text-gray-900 dark:text-gray-300 px-6 py-4 "
                >
                  {row[header.key]?.toString() || "-"}{" "}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
