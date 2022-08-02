import styles from "./Darkmode.module.scss";
import { ChangeEventHandler } from "react";

const Darkmode = () => {
  const setTheme = (theme: "dark" | "light") => {
    localStorage.setItem("theme", `${theme}`);
    document.documentElement.setAttribute("data-theme", `${theme}`);
  };

  const storedTheme = localStorage.getItem("theme");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

  if (defaultDark) {
    setTheme("dark");
  }

  const toggleThemeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={styles.toggleThemeWrapper}>
      <p>Dark mode</p>
      <label className={styles.toggleTheme} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleThemeHandler}
          defaultChecked={defaultDark}
        />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
    </div>
  );
};

export default Darkmode;
