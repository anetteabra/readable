import styles from './Home.module.css';
import { Button } from "@/components/ui/button";

const Home = () => {

  return (
    <>
      <div className={styles.controls}>
       <Button>Click me</Button>
      </div>
    </>
  );
};

export default Home;
