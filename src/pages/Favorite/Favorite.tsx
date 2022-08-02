import { useContext } from "react";
import styles from "./Favorite.module.scss";
import Card from "../../components/Card/Card";
import { LikedPhotosContext } from "../../context/likedPhotoContext";
import { BASE_URL } from "../../util/constants";

const Favorite = () => {
  const { likedPhotos } = useContext(LikedPhotosContext);

  if (likedPhotos.length === 0) {
    return (
      <h2 className={styles.text}>
        Looks like you have no photos , like some to display them on this page
      </h2>
    );
  }

  return (
    <div className={styles.cardContainer}>
      {likedPhotos &&
        likedPhotos.map((picture) => {
          return (
            <Card
              author={picture.author}
              url={`${BASE_URL}id/${picture.id}/300/200/`}
              width={picture.width}
              height={picture.height}
              key={picture.id}
              fullscreenUrl={picture.download_url}
              id={picture.id}
              pictureArray={likedPhotos}
            />
          );
        })}
    </div>
  );
};

export default Favorite;
