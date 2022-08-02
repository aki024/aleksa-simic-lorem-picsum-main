import styles from "./LoadingSpinner.module.scss";

interface Props {
  loading?: boolean;
}

export const LoadingSpinner = ({ loading }: Props) => {
  return (
    <div
      className={styles.spinnerContainer}
      style={{ position: loading ? "relative" : "absolute" }}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};
