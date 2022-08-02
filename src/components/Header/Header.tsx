import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/HTEC_Group_logo.png";
import Darkmode from "../Darkmode/Darkmode";
import styles from "../Header/Header.module.scss";

const Header = () => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a
            href="https://htecgroup.com/"
            target="_blank"
            rel="noopener noreferrer">
            <figure>
              <img src={logo} alt="Htec logo" />
            </figure>
          </a>
        </div>
        <div className={styles.toggleButton} onClick={() => setActive(!active)}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <div className={active ? styles.navLinksMobile : styles.navLinks}>
          <ul>
            <li>
              <NavLink
                to={"/all?page=1"}
                onClick={() => setActive(false)}
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }>
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/random"}
                onClick={() => setActive(false)}
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }>
                Random
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/favorite"}
                onClick={() => setActive(false)}
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }>
                Favorite
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.darkMode}>
          <Darkmode />
        </div>
      </nav>
    </header>
  );
};

export default Header;
