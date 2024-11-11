import styles from "./Footer.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";

//people dont get our styling with the heart
//remove it, such that it looks like the load more button is centered
//needs clean up before final delivery

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.love}>
        {/* <FontAwesomeIcon icon={faHeart} /> */}
      </div>
    </footer>
  );
};

export default Footer;
