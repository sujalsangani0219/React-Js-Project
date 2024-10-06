import { useState } from "react";
import { useImmer } from "use-immer";

const Lession003 = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useImmer([]);

  return (
    <>
      <h2>State Array</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Item name
        </label>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name"
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          setItems((items) => {
            items.push(input);
          });
        }}
      >
        Add new item
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Lession003;
