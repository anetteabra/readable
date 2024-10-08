import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.love}>
        <FontAwesomeIcon icon={faHeart} />
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
