import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Input } from "@/components/ui/input"
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.header}>
        <h1>Readable</h1>
      </Link>
      
      <div className={styles.links}>
        <Input type="input" placeholder="Search" className={styles.searchBar} style={{ backgroundColor: 'var(--light-font-color-trans)'}}/>
        
        <NavbarLink to="/">HOME</NavbarLink>
        <NavbarLink to="/new">LIBRARY</NavbarLink>
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
