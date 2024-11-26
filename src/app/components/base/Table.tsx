import React from "react";
type Header = {
  label: string;
  key: string;
};
type TableData = Record<string, string | number | object>;

const downloadCSV = (headers: Header[], data: TableData[]) => {
  const headerRow = headers.map((header) => header.label).join(",");
  const dataRows = data
    .map((row) =>
      headers
        .map((header) => {
          const value = row[header.key];
          return typeof value === "object" && value !== null
            ? (value as { label: string }).label
            : value?.toString() || "";
        })
        .join(",")
    )
    .join("\n");

  const csvContent = `${headerRow}\n${dataRows}`;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "table_data.csv";
  link.click();
};

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
          {data.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300 p-4">
              Veri bulunamadı
            </div>
          ) : (
            data.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid`}
                style={{
                  gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
                }}
              >
                {headers.map((header, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="text-sm text-gray-900 dark:text-gray-300 px-6 py-4"
                  >
                    {typeof row[header.key] === "object" &&
                    row[header.key] !== null
                      ? (row[header.key] as { label: string }).label || "-"
                      : row[header.key]?.toString() || "-"}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => downloadCSV(headers, data)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Veriyi İndir
        </button>
      </div>
    </div>
  );
};

export default Table;
