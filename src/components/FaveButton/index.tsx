import styles from "./FaveButton.module.css";
import { Button } from "@/components/ui/button";
import useLibraryStore from "@/store/libraryStore";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCallback } from "react";

const FaveButton = ({
  bookId,
  isFavorited,
}: {
  bookId: string;
  isFavorited: boolean;
}) => {
  const toggleFavorite = useLibraryStore((state) => state.toggleFavorite);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      toggleFavorite(bookId);
    },
    [toggleFavorite, bookId],
  );

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
