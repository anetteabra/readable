import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./GoToTop.module.css";

const GoToTopButton = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={goToTop} className={styles.scrollToTopButton} aria-label="To top of the page">
      <FontAwesomeIcon icon={faArrowUp} className={styles.arrowTop} aria-label="Arrow pointing upwards" />
    </button>
  );
};

export default GoToTopButton;
