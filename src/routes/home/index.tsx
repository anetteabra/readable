import styles from "./Home.module.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useLibraryStore from "@/store/libraryStore";
import { useEffect } from "react";
import { useMutation, useQuery} from "@apollo/client";
import { ADD_USER, CHECK_USER } from "@/queries";

const Home = () => {
  const userId = useLibraryStore((state) => state.userId);

  // Init addUser mutation
  const [addUserMutation] = useMutation(ADD_USER);

  const { data, loading, error } = useQuery(CHECK_USER, {
    variables: { userId },
    skip: !userId, // Skip the query if userId is undefined
  });

  useEffect(() => {
    // Wait until CHECK_USER query has finished loading
    if (loading || error || !userId) return;

    // Only proceed if there is no existing user and no error in the query
    const addUserIfNotExists = async () => {
      if (data?.user) {
        console.log("User already exists in the database:", data.user);
        return;
      }

      try {
        const response = await addUserMutation({
          variables: { addUserId: userId },
        });
        console.log("User added successfully on page load:", response.data);
      } catch (err) {
        console.error("Error adding user on page load:", err);
      }
    };

    // Run the mutation when the component loads and the check query is done
    addUserIfNotExists();
  }, [loading, error, data, userId, addUserMutation]);


  return (
    <>
      <main className={styles.home}>
        <header className={styles.controls}>
          <h1 className={styles.header}>
            {" "}
            Explore new worlds, one book at a time
          </h1>
          <p className={styles.paragraph}>Join the online bookclub</p>
        </header>
        <Link to="/library">
          <Button data-cy="library-button" className={styles.button}>Go to your library</Button>
        </Link>
      </main>
    </>
  );
};

export default Home;
