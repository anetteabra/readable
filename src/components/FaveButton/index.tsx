import styles from "./FaveButton.module.css";
import { Button } from "@/components/ui/button";
import useLibraryStore from "@/store/libraryStore";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FaveButton = ({ bookId }: { bookId: string }) => {
  const favorites = useLibraryStore((state) => state.favorites);
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);

  const isFavorited = favorites.includes(bookId);

  return (
    <Button
      onClick={() => toggleFavorite(bookId)}
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
