import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TbPhotoSearch } from "react-icons/tb";

import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return toast.success("Please enter what you want to find");
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <>
      <header className={css.header}>
        <Toaster position="top-center" reverseOrder={false} />
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
          <button className={css.btn} type="submit">
            <TbPhotoSearch className={css.icon} />
          </button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
