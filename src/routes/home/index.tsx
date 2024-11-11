import styles from "./Home.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useLibraryStore from "@/store/libraryStore";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "@/queries";

const Home = () => {
  const userId = useLibraryStore((state) => state.userId);

    // Initialize the addUser mutation
  const [addUserMutation] = useMutation(ADD_USER);

  useEffect(() => {
      const addUserOnLoad = async () => {
        if (!userId) return; // Ensure userId is defined
        
          try {
              const response = await addUserMutation({
                  variables: {
                    addUserId: userId,
                  },
              });
              console.log("User added successfully on page load:", response.data);
          } catch (err) {
              console.error("Error adding user on page load:", err);
          }
      };

      // Run the mutation when the component loads
      addUserOnLoad();
  }, [addUserMutation, userId]);

  return (
    <>
      <main className={styles.home}>
        <header className={styles.controls}>
          <h1 className={styles.header}>
            {" "}
            Explore new worlds, one book at a time
          </h1>
          <p className={styles.paragraph}>Join the online bookclub</p>
          <div> {userId} </div>
        </header>
        <Link to="/library">
          <Button className={styles.button}>Go to your library</Button>
        </Link>
      </main>
    </>
  );
};

export default Home;
