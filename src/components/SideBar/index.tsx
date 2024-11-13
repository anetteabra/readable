import styles from "./SideBar.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useLibraryStore from "../../store/libraryStore"; //import zustand store
import { useState } from "react";

const SideBar = () => {
  const { sortBy, setSortBy, filterBy, toggleFilter, setGenreFilter, setFavoriteFilter} =
    useLibraryStore();
  const [isOpen, setIsOpen] = useState(false); // Local state for sidebar visibility

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    console.log("sidebar is now", !isOpen ? "open" : "closed");
  };

  // Array of genres
  const genres = [
    "Fiction",
    "Young Adult Fiction",
    "Biography & Autobiography",
    "Political Science",
    "History",
    "Business & Economics",
    "Cooking",
    "Science",
    "Self-Help",
  ];

  return (
    <>
      {/* Show the toggle button when the sidebar is closed */}
      {!isOpen && (
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label="Open Menu"
        >
          Open Menu
        </button>
      )}

      <Card className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <CardHeader>
          <CardTitle> Sort and filter your library </CardTitle>
          <CardDescription> Select your preferences below </CardDescription>
        </CardHeader>

        <CardContent className={styles.cardContent}>
          {/* Sorting Section */}
          <section className={styles.sortingSection}>
            <Label className={styles.sortingLabel} htmlFor="sort">
              {" "}
              Sort by:{" "}
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className={styles.trigger} id="sort">
                {" "}
                {sortBy}{" "}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Title a-z">Title a-z</SelectItem>
                <SelectItem value="Title z-a">Title z-a</SelectItem>
                <SelectItem value="Newest">Newest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </section>

          {/* Filtering Section */}
          <section className={styles.filteringSection}>
            <Label className={styles.filteringLabel}> Filter by: </Label>
            <div className={styles.filterOptions}>
              <div className={styles.filterItems}>
                
                <Checkbox
                  id="favorited"
                  checked={filterBy.favorited}
                  onCheckedChange= {() => setFavoriteFilter(!filterBy.favorited)}
                />
                <Label htmlFor="favorited"> Favorited </Label>
              </div>
              {/* Genre Selection */}
              <Label className={styles.filteringLabel}> Genres: </Label>
              {genres.map((genre) => (
                <div key={genre} className={styles.filterItems}>
                  <Checkbox
                    id={genre}
                    checked={filterBy.genre === genre}
                    onCheckedChange={() => {
                      setGenreFilter(filterBy.genre === genre ? null : genre);
                    }} // Only allow one genre to be selected
                  />
                  <Label htmlFor={genre}> {genre} </Label>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Show the toggle button when the sidebar is closed*/}
      {isOpen && (
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label="Close Menu"
        >
          Close Menu
        </button>
      )}
    </>
  );
};

export default SideBar;
