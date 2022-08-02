import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <div className={styles.notFound}>
      <h1>Ooops no such page</h1>
      <button onClick={() => goBackHandler()}>Go back</button>
    </div>
  );
};

export default NotFound;
