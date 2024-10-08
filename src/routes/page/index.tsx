import React from "react";
import BookBox from "@/components/BookBox";
import styles from "./page.module.css";
import SideBar from "@/components/SideBar";
import LoadingButton from "@/components/Loading/LoadingButton";

const Page: React.FC = () => {
  return (
    <>
      {/* <div className={styles.root}></div> */}
      <main className={styles.library}>
        <aside className={styles.sidebar}>
        <SideBar />
        </aside>
        <section className={styles.bookBox}>
        <BookBox />
        <LoadingButton />
        </section>
      </main>
    </>
  );
};

export default Page;
