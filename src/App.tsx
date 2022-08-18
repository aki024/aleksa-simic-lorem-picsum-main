import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LikedPhotosContext } from "./context/likedPhotoContext";
import { CurrentPageContext } from "./context/currentPageContext";
import { Picture } from "./models/Picture.model";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routing from "./Routing";
import "./styles/App.scss";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [searchParams] = useSearchParams();
  let thisPage = searchParams.get("page");

  const [likedPhotos, setLikedPhotos] = useState<Picture[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const likedPhotoStorage = JSON.parse(
      localStorage.getItem("likedPhotos") || "[]"
    );
    setLikedPhotos(likedPhotoStorage);
  }, []);

  return (
    <>
      <Header />
      <LikedPhotosContext.Provider value={{ likedPhotos, setLikedPhotos }}>
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
          <Routing />
          <div>
            {thisPage ? +thisPage > 0 && +thisPage < 76 && <Pagination /> : ""}
            <Footer />
          </div>
        </CurrentPageContext.Provider>
      </LikedPhotosContext.Provider>
    </>
  );
}

export default App;
