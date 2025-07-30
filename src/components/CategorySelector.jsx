import React from "react"; // optional, or use App.css directly

const CategorySelector = ({ selected, setCategory }) => {
  return (
    <div className="dropdown-container">
      <label>     Category: </label>
      <select value={selected} onChange={(e) => setCategory(e.target.value)}>
        <option value="top">Top</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="world">World</option>
        <option value="science">Science</option>
        <option value="entertainment">Entertainment</option>
        <option value="environment">Environment</option>
        <option value="food">Food</option>
        <option value="politics">Politics</option>
      </select>
    </div>
  );
};

export default CategorySelector;
