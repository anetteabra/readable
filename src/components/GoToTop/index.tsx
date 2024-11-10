import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./GoToTop.module.css";

const GoToTopButton = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={goToTop} className={styles.scrollToTopButton}>
      <FontAwesomeIcon icon={faArrowUp} className={styles.arrowTop} />
    </button>
  );
};

export default GoToTopButton;
