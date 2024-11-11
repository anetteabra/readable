import React from "react";
import BookBox from "@/components/BookBox";
import styles from "./page.module.css";
import SideBar from "@/components/SideBar";
import useLibraryStore from "@/store/libraryStore";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "@/queries";
//import LoadingButton from "@/components/Loading/LoadingButton";



const Page: React.FC = () => {
 
  // const userId = useLibraryStore((state) => state.userId);
  // Initialize the addUser mutation
  // const [addUserMutation] = useMutation(ADD_USER);

  // useEffect(() => {
  //     const addUserOnLoad = async () => {
  //       if (!userId) return; // Ensure userId is defined
        
  //         try {
  //             const response = await addUserMutation({
  //                 variables: {
  //                     id: userId,
  //                 },
  //             });
  //             console.log("User added successfully on page load:", response.data);
  //         } catch (err) {
  //             console.error("Error adding user on page load:", err);
  //         }
  //     };

  //     // Run the mutation when the component loads
  //     addUserOnLoad();
  // }, [addUserMutation, userId]);

  return (
    <>
      <main className={styles.library}>
        <aside className={styles.sidebar} aria-label="Sidebar">
          <SideBar />
        </aside>
        <section className={styles.bookBox} aria-label="Book List">
          <BookBox />
          {/* <LoadingButton /> */}
        </section>
        
      </main>
    </>
  );
};

export default Page;
