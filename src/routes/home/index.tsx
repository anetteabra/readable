import styles from "./Home.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main className={styles.Home}>
        <header className={styles.controls}>
          <h1 className={styles.header}>
            {" "}
            Explore new worlds, one book at a time
          </h1>
          <p className={styles.paragraph}>Join the online bookclub</p>
        </header>
        <Link to="/library">
          <Button className={styles.button}>Go to your library</Button>
        </Link>
      </main>
    </>
  );
};

export default Home;
