import DropdownMenu from "./DropdownMenu";
import {countries} from "./Countries";
import { useState } from "react";

const multiSelectSettings = {
  isMultiSelect: true,
  variant: 'long',
};

const singleSelectSettings = {
  isMultiSelect: false,
  variant: 'normal',
};

function App() {
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  return (
    <>
      <div className="w-screen">
        <div className="gap-5 h-fit border border-color-gray rounded my-10 mx-5 px-5 py-10">
          <div>{"Multi-Select Input: [" + input1.toString() + "]"}</div>
          <br />
          <div>{"Single-Select Input: [" + input2.toString() + "]"}</div>
          <br />
          <div className="flex flex-row">
            <div className="w-[600px]">
              <DropdownMenu
                id="multi-select-dropdown"
                options={countries}
                settings={multiSelectSettings}
                label={"Multi-Select:"}
                onChange={(inputValues) => {
                  setInput1([...inputValues]);
                }}
              />
            </div>
            <div className="w-[200px]">
              <DropdownMenu
                id="single-select-dropdown"
                options={countries}
                settings={singleSelectSettings}
                label={"Single-Select"}
                onChange={(inputValues) => setInput2([...inputValues])}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
