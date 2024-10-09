import React from 'react';
import BookBox from '@/components/BookBox';
import styles from './page.module.css';
import SideBar from '@/components/SideBar';
import LoadingButton from '@/components/Loading/LoadingButton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';


const Page: React.FC = () => {

  
  return (
    <><><div className={styles.root}>
    </div><BookBox></BookBox></>
        <SideBar />
        <Link to="/details">
          <Button >Go to details page</Button>
        </Link>
    <LoadingButton></LoadingButton></>
  );
};

export default Page;
