import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.header}>
        <h1>Readable</h1>
      </Link>
      <div className={styles.links}>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/new">Library</NavbarLink>
      </div>
    </div>
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
      className={({ isActive }) => (isActive ? styles.active : '')}>
      {children}
    </NavLink>
  );
};

export default Navbar;
