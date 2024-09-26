import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.love}>
        <FontAwesomeIcon icon={faHeart} />
        <p>Powered by</p>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer">
          <img
            src=""
            alt=""
            className={styles.logo}
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
