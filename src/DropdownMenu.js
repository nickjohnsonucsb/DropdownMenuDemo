import React, { useState, useEffect } from "react";

function MenuItemCheckbox({ id, value, isSelected, onClick }) {
  return (
    <li
      className={
        "py-1.5 px-4 h-[54px] justify-start flex items-center hover:cursor-pointer gap-3 " +
        (isSelected
          ? "bg-[#1976d21f] hover:bg-[#005ab31f]"
          : "text-gray-900 hover:bg-[#0000000a]")
      }
      key={id}
      role="option"
      onClick={onClick}
    >
      <span className="text-indigo-600 flex items-center">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          {isSelected && (
            <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
          )}
        </svg>
      </span>
      <div className="pr-4">
        <span className="ml-3 truncate">{value}</span>
      </div>
    </li>
  );
}

function MultiSelectButtons({ id, options, inputValues, setInputValues }) {
  return (
    <React.Fragment>
      <button
        className={
          "bg-transparent text-blue-700 py-2 px-4 border border-blue-500 rounded disabled:text-blue-400 disabled:border-blue-200" +
          (options.length !== inputValues.size
            ? " hover:border-transparent hover:bg-blue-500 hover:text-white"
            : "")
        }
        disabled={options.length === inputValues.size}
        onClick={() => {
          const newInputVals = new Map();
          options.forEach((name, index) => {
            const itemId = (id ?? "dropdownMenu") + "-item-" + index;
            newInputVals.set(itemId, name);
          });
          setInputValues(newInputVals);
        }}
      >
        Select All
      </button>
      {inputValues.size > 0 && (
        <button
          className={
            "bg-transparent text-red-700 py-2 px-4 border border-red-500 rounded hover:border-transparent hover:bg-red-500 hover:text-white"
          }
          onClick={() => {
            const newInputVals = new Map();
            setInputValues(newInputVals);
          }}
        >
          Deselect All
        </button>
      )}
    </React.Fragment>
  );
}

export default function DropdownMenu({
  id,
  options,
  settings,
  label,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValues, setInputValues] = useState(new Map());

  useEffect(() => {
    if (onChange) onChange(inputValues.values());
  }, [inputValues]);

  function toggleSelectedRows(itemId, itemValue, wasSelected) {
    let newInputVals;
    if (settings?.isMultiSelect) {
      newInputVals = new Map(inputValues);
      if (wasSelected) {
        newInputVals.delete(itemId);
      } else {
        newInputVals.set(itemId, itemValue);
      }
    } else {
      newInputVals = new Map();
      newInputVals.set(itemId, itemValue);
    }
    setInputValues(newInputVals);
  }

  return (
    <div className="w-full">
      {label && (
        <label
          id={id ?? "dropdown" + "-label"}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}

      <div className="flex flex-row items-center gap-2">
        <div
          className="relative mt-2"
          style={{ width: settings?.width ?? "200px" }}
        >
          <button
            type="button"
            className={
              "w-full h-[56px] rounded-md bg-white py-1.5 px-3 text-gray-900 ring-inset" +
              (isOpen
                ? "outline-none ring-2 ring-indigo-500"
                : "border-[#0000003b] border-[1px] hover:border-indigo-200")
            }
            onClick={() => setIsOpen((wasOpen) => !wasOpen)}
          >
            <span className="ml-3 block truncate pr-2 text-left">
              {Array.from(inputValues.values()).join(", ")}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
              </svg>
            </span>
          </button>

          {isOpen && (
            <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 min-w-fit">
              {options.map((value, index) => {
                const itemId = (id ?? "dropdownMenu") + "-item-" + index;
                const isSelected = inputValues.has(itemId);
                return (
                  <MenuItemCheckbox
                    value={value}
                    key={itemId}
                    isSelected={isSelected}
                    onClick={() =>
                      toggleSelectedRows(itemId, value, isSelected)
                    }
                  />
                );
              })}
            </ul>
          )}
        </div>
        {settings?.isMultiSelect && (
          <MultiSelectButtons
            id={id}
            options={options}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        )}
      </div>
    </div>
  );
}
