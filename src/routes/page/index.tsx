import React from "react";
import BookBox from "@/components/BookBox";
import styles from "./page.module.css";
import SideBar from "@/components/SideBar";
import LoadingButton from "@/components/Loading/LoadingButton";

const Page: React.FC = () => {
  return (
    <>
      <main className={styles.library}>
        <aside className={styles.sidebar} aria-label="Sidebar">
          <SideBar />
        </aside>
        <section className={styles.bookBox} aria-label="Book List">
          <BookBox />
          <LoadingButton />
        </section>
      </main>
    </>
  );
};

export default Page;
