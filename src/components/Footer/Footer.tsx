import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p> &#169; {new Date().getFullYear()} Aleksa Simic </p>
    </footer>
  );
};

export default Footer;
