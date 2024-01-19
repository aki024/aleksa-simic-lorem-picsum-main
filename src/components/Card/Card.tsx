import { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import styles from "./Card.module.scss";
import ImageDetail from "../ImageDetail/ImageDetail";
import Dropdown from "../Dropdown/Dropdown";
import { LikedPhotosContext } from "../../context/likedPhotoContext";
import { Picture } from "../../models/Picture.model";

interface Props {
  author: string;
  url: string;
  id: number;
  width: number;
  height: number;
  fullscreenUrl: string;
  pictureArray: Picture[];
}

const Card = ({
  author,
  url,
  id,
  width,
  height,
  fullscreenUrl,
  pictureArray,
}: Props) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [customize, setCustomize] = useState<boolean>(false);

  const { likedPhotos } = useContext(LikedPhotosContext);

  useEffect(() => {
    const escButtonHandler = (event: { keyCode: number }) => {
      if (event.keyCode === 27) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", escButtonHandler);

    return () => {
      document.removeEventListener("keydown", escButtonHandler);
    };
  }, []);

  useEffect(() => {
    isFullscreen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isFullscreen]);

  const fullscreenHandler = () => {
    setIsFullscreen(true);
    setDropdownActive(false);
  };

  return (
    <>
      {isFullscreen &&
        createPortal(
          <ImageDetail
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            id={id}
            width={width}
            height={height}
            author={author}
            dropdownActive={dropdownActive}
            setDropdownActive={setDropdownActive}
            fullscreenUrl={fullscreenUrl}
            customize={customize}
            setCustomize={setCustomize}
            pictureArray={likedPhotos ? pictureArray : likedPhotos}
          />,
          document.getElementById("fullscreenImage")!
        )}
      <div className={styles.card}>
        <div className={styles.top}>
          <Dropdown
            fullscreenUrl={fullscreenUrl}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            author={author}
            dropdownActive={dropdownActive}
            setDropdownActive={setDropdownActive}
            id={id}
            setCustomize={setCustomize}
            customize={customize}
            pictureArray={likedPhotos ? pictureArray : likedPhotos}
          />
        </div>
        <div className={styles.image}>
          <img
            src={url}
            alt="Lorem Picsum"
            onClick={() => fullscreenHandler()}
          />
        </div>
        <div className={styles.authorName}>
          <p>{author}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
