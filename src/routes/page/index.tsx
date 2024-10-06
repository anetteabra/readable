
import BookBox from '@/components/BookBox';
import styles from './page.module.css';
import LoadingButton from '@/components/Loading/LoadingButton';


const Page: React.FC = () => {

  
  return (
    <><><div className={styles.root}>
    </div><BookBox></BookBox></>
    <LoadingButton></LoadingButton></>
  );
};

export default Page;
