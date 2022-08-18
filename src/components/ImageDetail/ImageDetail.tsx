import { useEffect, useRef, useState } from "react";
import styles from "./ImageDetail.module.scss";
import Dropdown from "../Dropdown/Dropdown";
import { AiOutlineClose } from "react-icons/ai";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { BASE_URL } from "../../util/constants";
import { useLocation } from "react-router-dom";
import { Picture } from "../../models/Picture.model";

interface Props {
  fullscreenUrl: string;
  setIsFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  isFullscreen?: boolean;
  author: string;
  id: number;
  width: number;
  height: number;
  dropdownActive: boolean;
  setDropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  customize: boolean;
  setCustomize: React.Dispatch<React.SetStateAction<boolean>>;
  pictureArray: Picture[];
}

const ImageDetail = ({
  fullscreenUrl,
  isFullscreen,
  setIsFullscreen,
  id,
  author,
  width,
  height,
  setDropdownActive,
  dropdownActive,
  customize,
  setCustomize,
  pictureArray,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);
  const [grayscale, setGrayscale] = useState<number>(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  let isRandomPage = pathname === "/random";

  useEffect(() => {
    if (cardRef.current) {
      setImageWidth(cardRef.current.offsetWidth);
    }
  }, [cardRef]);

  const closeFullscreenHandler = () => {
    if (setIsFullscreen) {
      setIsFullscreen(false);
    }
    setCustomize(false);
    setDropdownActive(false);
  };

  useEffect(() => {
    if (!customize) {
      setBlur(0);
      setGrayscale(0);
    }
  }, [customize]);

  const cardStyle = customize ? styles.customizeCard : styles.card;

  return (
    <div className={isRandomPage ? styles.random : styles.backDrop}>
      <div className={cardStyle}>
        <div className={styles.top}>
          <Dropdown
            fullscreenUrl={fullscreenUrl}
            author={author}
            id={id}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
            dropdownActive={dropdownActive}
            setDropdownActive={setDropdownActive}
            setCustomize={setCustomize}
            customize={customize}
            pictureArray={pictureArray}
            blur={blur}
            grayscale={grayscale}
            width={width}
            height={height}
          />

          {!isRandomPage && (
            <AiOutlineClose
              className={styles.closeIcon}
              onClick={() => closeFullscreenHandler()}
            />
          )}
        </div>
        <div className={styles.image} ref={cardRef}>
          {loading && <LoadingSpinner />}
          {imageWidth !== 0 && (
            <img
              id="image"
              style={{
                filter: `blur(${blur}px) grayscale(${grayscale}%)`,
              }}
              crossOrigin="anonymous"
              src={`${BASE_URL}id/${id}/${imageWidth}/${
                Math.ceil((imageWidth / (width / height) + 1) / 10) * 10
              }/`}
              alt="Lorem Picsum"
              onLoad={() => setLoading(false)}
            />
          )}
        </div>

        <div className={styles.authorName}>
          <p>{author}</p>
          {customize && (
            <div className={styles.customize}>
              <div className={styles.blur}>
                <p>Blur</p>
                <input
                  type="range"
                  value={blur}
                  min={0}
                  step={0.1}
                  max={10}
                  onChange={(e) => setBlur(+e.target.value)}
                />
              </div>
              <div className={styles.grayscale}>
                <p>Grayscale</p>
                <input
                  type="range"
                  value={grayscale}
                  min={0}
                  max={100}
                  onChange={(e) => setGrayscale(+e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
