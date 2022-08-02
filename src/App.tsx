import { useState, useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { LikedPhotosContext } from "./context/likedPhotoContext";
import { Picture } from "./models/Picture.model";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Routing from "./Routing";
import "./styles/App.scss";

function App() {
  const [likedPhotos, setLikedPhotos] = useState<Picture[]>([]);

  useEffect(() => {
    const likedPhotoStorage = JSON.parse(
      localStorage.getItem("likedPhotos") || "[]"
    );
    setLikedPhotos(likedPhotoStorage);
  }, []);

  return (
    <HashRouter>
      <Header />
      <LikedPhotosContext.Provider value={{ likedPhotos, setLikedPhotos }}>
        <Routing />
      </LikedPhotosContext.Provider>
      <Footer />
    </HashRouter>
  );
}

export default App;
