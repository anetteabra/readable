import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${styles.navbar} ${isHomePage ? styles.transparentNavbar : ""}`}
    >
      <Link to="/" className={styles.header}>
        <h1>Readable</h1>
      </Link>

      <nav className={styles.links} aria-label="Main Navigation">
        <div className={styles.linkButtons}>
          <NavbarLink to="/">HOME</NavbarLink>
          <NavbarLink to="/library">LIBRARY</NavbarLink>
        </div>
        <SearchBar></SearchBar>
      </nav>
    </header>
  );
};

const NavbarLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? styles.active : "")}
    >
      {children}
    </NavLink>
  );
};

export default Navbar;
