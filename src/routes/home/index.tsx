import styles from './Home.module.css';

const Home = () => {

  return (
    <>
      <div className={styles.controls}>
        <h1 className={styles.header}> Explore new worlds, one book at a time</h1>
        <p className={styles.paragraph}>Join the online bookclub</p>
      </div>
    </>
  );
};

export default Home;
