import { useContext } from "react";
import swal from "sweetalert";
import styles from "./LikeImage.module.scss";
import { LikedPhotosContext } from "../../context/likedPhotoContext";
import { Picture } from "../../models/Picture.model";
import { AiFillHeart } from "react-icons/ai";

interface Props {
  id: number;
  pictureArray: Picture[];
}

const LikeImage = ({ id, pictureArray }: Props) => {
  const { likedPhotos, setLikedPhotos } = useContext(LikedPhotosContext);

  const likePictureHandler = (pictureId: number, array: Picture[]) => {
    if (likedPhotos.some((item) => item.id === pictureId)) {
      setLikedPhotos(() => {
        const filteredState = likedPhotos.filter((item) => {
          return item.id !== pictureId;
        });

        localStorage.setItem("likedPhotos", JSON.stringify(filteredState));

        return [...filteredState];
      });
    } else if (likedPhotos.length < 5) {
      setLikedPhotos((prevState) => {
        const [{ width, author, height, download_url }]: Picture[] = array;
        const likedPhotosState = [
          ...prevState,
          {
            id: pictureId,
            author,
            width,
            height,
            download_url,
          },
        ];

        localStorage.setItem("likedPhotos", JSON.stringify(likedPhotosState));

        return [...likedPhotosState];
      });
    } else {
      swal(
        "Maximum amount of photos you can like is 5!",
        "Please unlike a photo",
        "error"
      );
    }
  };

  let photoClass = likedPhotos.some((item) => item.id === id)
    ? styles.likedPhoto
    : styles.likeIcon;

  return (
    <AiFillHeart
      className={photoClass}
      onClick={() => likePictureHandler(id, pictureArray)}
    />
  );
};

export default LikeImage;
