import styles from './Home.module.css';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <>
      <div className={styles.controls}>
        <h1 className={styles.header}> Explore new worlds, one book at a time</h1>
        <p className={styles.paragraph}>Join the online bookclub</p>
        
        <Link to="/new">
          <Button className={styles.button}>Go to your library</Button>
        </Link>
      
      </div>
    </>
  );
};

export default Home;
