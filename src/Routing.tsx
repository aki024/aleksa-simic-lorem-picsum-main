import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import All from "./pages/All/All";
import Favorite from "./pages/Favorite/Favorite";
import Random from "./pages/Random/Random";
import styles from "./styles/Routing.module.scss";

const Routing = () => {
  return (
    <main className={styles.mainContainer}>
      <Routes>
        <Route path="/" element={<Navigate to="/all?page=1" />} />
        <Route
          path="/aleksa-simic-lorem-picsum-main"
          element={<Navigate to="/all?page=1" />}
        />
        <Route path="/all" element={<All />} />
        <Route path="/random" element={<Random />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Routing;
