import styles from "./FaveButton.module.css";
import { Button } from "@/components/ui/button";
import useLibraryStore from "@/store/libraryStore";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";


const FaveButton = ({ bookId, isFavorited }: { bookId: string; isFavorited: boolean; }) => {
  const { toggleFavorite } = useLibraryStore((state) => ({
    toggleFavorite: state.toggleFavorite,
  }));

  // Debounce the toggleFavorite function to prevent rapid toggling
  // Use useMemo to create the debounced function only once
  const debouncedToggleFavorite = useCallback(
    debounce(async (bookId: string) => {
      await toggleFavorite(bookId);
    }, 300), // 300ms debounce delay
    []
  );

  const handleClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    debouncedToggleFavorite(bookId); 
  };

  // Cancel the debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedToggleFavorite.cancel();
    };
  }, [debouncedToggleFavorite]);
  

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className={styles.favebutton}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <FontAwesomeIcon
        icon={faHeart}
        className={`${styles.heartIcon} ${isFavorited ? styles.favorited : styles.notFavorited}`}
      />
    </Button>
  );
};

export default FaveButton;
