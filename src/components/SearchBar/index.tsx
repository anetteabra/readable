import styles from "./SeachBar.module.css";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import useLibraryStore from "../../store/libraryStore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const SearchBar: React.FC = () => {
  const inputValue = useLibraryStore((state) => state.inputValue);
  const setInputValue = useLibraryStore((state) => state.setInputValue);
  const setGenreFilter = useLibraryStore((state) => state.setGenreFilter);
  const setFavoriteFilter = useLibraryStore((state) => state.setFavoriteFilter);
  const navigate = useNavigate();

  const [tempInputValue, setTempInputValue] = useState(inputValue);

  const handleEnter = (event: { key: string }) => {
    console.log("onKeyDown triggered with key:", event.key);
    if (event.key === "Enter") {
      setGenreFilter(null);
      setInputValue(tempInputValue);
      navigate("/library");
    }
  };

  return (
    // Wrapper to be able to place x button in the search bar
    <div className={styles.searchContainer}>
      <Input
        type="input"
        placeholder="Search book title or author"
        className={styles.searchBar}
        aria-label="Search"
        data-cy="search-input"
        value={tempInputValue}
        onChange={(e) => setTempInputValue(e.target.value)}
        onKeyDown={handleEnter}
      />
      <button
        className={styles.x}
        aria-label="Clear search"
        onClick={() => {
          setInputValue("");
          setTempInputValue("");
          setGenreFilter(null);
          setFavoriteFilter(false);
        }}
      >
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
};

export default SearchBar;
