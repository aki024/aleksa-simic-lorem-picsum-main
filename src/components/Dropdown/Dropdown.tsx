import styles from "./Dropdown.module.scss";
import swal from "sweetalert";
import { BsThreeDots, BsShare } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { FiDownload } from "react-icons/fi";
import LikeImage from "../LikeImage/LikeImage";
import { Picture } from "../../models/Picture.model";

interface Props {
  author: string;
  id: number;
  fullscreenUrl: string;
  isFullscreen?: boolean;
  setIsFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownActive: boolean;
  setDropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomize: React.Dispatch<React.SetStateAction<boolean>>;
  customize: boolean;
  pictureArray: Picture[];
  blur?: number;
  grayscale?: number;
  width?: number;
  height?: number;
}

const Dropdown = ({
  author,
  fullscreenUrl,
  id,
  isFullscreen,
  dropdownActive,
  setDropdownActive,
  setCustomize,
  setIsFullscreen,
  customize,
  pictureArray,
  blur = 0,
  grayscale,
  width = 0,
  height = 0,
}: Props) => {
  const downloadHandler = (customized: boolean = false) => {
    let img = document.getElementById("image") as HTMLCanvasElement;

    if (customized) {
      if (img) {
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.filter = `blur(${blur * 0.5 * 10}px) grayscale(${grayscale}%)`;
          ctx.drawImage(img, 0, 0, width, height);
          let jpegFile = canvas.toDataURL("image/jpeg");

          const link = document.createElement("a");
          link.href = jpegFile;
          link.download = `Customized ${author} ${id}.jpg`;
          link.click();
          setDropdownActive(false);
        }
      }
    } else {
      fetch(fullscreenUrl, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.arrayBuffer().then((buffer) => {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.download = `${author} ${id}.jpg`;
            link.click();
            setDropdownActive(false);
          });
        })
        .catch(() => {
          swal(
            "Uh oh something went wrong with the connection",
            "Check your internet and try to download again later",
            "error"
          );
        });
    }
  };

  const shareImageHandler = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        swal("Link copied to clipboard", {
          className: "swal",
          timer: 1500,
          buttons: {
            visible: false,
          },
        });
        setDropdownActive(false);
      })
      .catch(() => {
        swal(
          "Uh oh something went wrong with copying the link",
          "Please try again",
          "error"
        );
      });
  };

  const customizePictureHandler = () => {
    setCustomize((prevState) => !prevState);
    setDropdownActive(false);
    if (setIsFullscreen !== undefined) {
      setIsFullscreen(true);
    }
  };

  return (
    <>
      <LikeImage id={id} pictureArray={pictureArray} />
      <BsThreeDots
        className={styles.icon}
        onClick={() => setDropdownActive((prevState) => !prevState)}
      />
      {dropdownActive && (
        <ul
          className={
            isFullscreen
              ? `${styles.dropdown} ${styles.fullscreen}`
              : styles.dropdown
          }>
          <li className={styles.dropdownIcon} onClick={() => downloadHandler()}>
            <FiDownload />
            <p>Save</p>
          </li>
          <li
            className={styles.dropdownIcon}
            onClick={() => shareImageHandler(fullscreenUrl)}>
            <BsShare />
            <p>Share</p>
          </li>

          <li
            className={styles.dropdownIcon}
            onClick={() => customizePictureHandler()}>
            <BiCog />
            <p>{customize ? "Close Customize Mode" : "Customize"} </p>
          </li>
          {customize && (
            <li
              className={styles.dropdownIcon}
              onClick={() => downloadHandler(true)}>
              <FiDownload />
              <p>Save Customized Image</p>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Dropdown;
