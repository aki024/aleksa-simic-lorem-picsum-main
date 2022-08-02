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
        <Route
          path="/aleksa-simic-lorem-picsum-main/"
          element={<Navigate to="/aleksa-simic-lorem-picsum-main/all?page=1" />}
        />

        <Route path="/aleksa-simic-lorem-picsum-main/all" element={<All />} />
        <Route
          path="/aleksa-simic-lorem-picsum-main/random"
          element={<Random />}
        />
        <Route
          path="/aleksa-simic-lorem-picsum-main/favorite"
          element={<Favorite />}
        />
        <Route
          path="/aleksa-simic-lorem-picsum-main/*"
          element={<NotFound />}
        />
      </Routes>
    </main>
  );
};

export default Routing;
