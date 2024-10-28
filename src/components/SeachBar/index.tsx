import styles from "./SeachBar.module.css";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import useLibraryStore from "../../store/libraryStore";
import { useState } from "react";

const SearchBar: React.FC = () => {
  const setInputValue = useLibraryStore((state) => state.setInputValue);
  const setGenreFilter = useLibraryStore((state) => state.setGenreFilter);
  const navigate = useNavigate();

  const [tempInputValue, setTempInputValue] = useState("");
  
  const handleEnter = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      setGenreFilter(null)
      setInputValue(tempInputValue);
      setTempInputValue("");
      navigate('/library');
    }
  };

  return (
    <Input
      type="input"
      placeholder="Search"
      className={styles.searchBar}
      aria-label="Search"
      value={tempInputValue}
      onChange={(e) => setTempInputValue(e.target.value)}
      onKeyDown={handleEnter}
    />
  );
};

export default SearchBar;
