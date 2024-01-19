import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import styles from "./Random.module.scss";
import ImageDetail from "../../components/ImageDetail/ImageDetail";
import { Picture } from "../../models/Picture.model";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

const Random = () => {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [customize, setCustomize] = useState<boolean>(false);
  const [randomPicture, setRandomPicture] = useState<Picture>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    const getRandomPictureHandler = () => {
      setLoading(true);
      axios
        .get("/1", {
          signal: controller.signal,
        })
        .then((response) => {
          const id = response.headers["picsum-id"];
          getPictureInfo(id);
        })
        .catch((error) => {
          if (error.code === "ERR_CANCELED") {
          } else {
            swal(
              "Uh oh something went wrong with the connection",
              "Click ok to dismiss",
              "error"
            );
          }
          setLoading(false);
        });
    };

    const getPictureInfo = (id: string) => {
      axios
        .get(`/id/${id}/info`, {
          signal: controller.signal,
        })
        .then((response) => {
          setRandomPicture(response.data);
          setLoading(false);
        })
        .catch(() => {
          swal(
            "Uh oh something went wrong with the connection",
            "Click ok to dismiss",
            "error"
          );
          setLoading(false);
        });
    };

    getRandomPictureHandler();
    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    const nextPictureHandler = (event: { keyCode: number }) => {
      if (event.keyCode === 39 && !customize) {
        setPage((prevState) => prevState + 1);
      }
    };

    document.addEventListener("keydown", nextPictureHandler);

    return () => {
      document.removeEventListener("keydown", nextPictureHandler);
    };
  }, [customize]);

  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      {!customize && (
        <button
          className={styles.random}
          onClick={() => setPage((prevState) => prevState + 1)}>
          &raquo;
        </button>
      )}
      {randomPicture && (
        <ImageDetail
          fullscreenUrl={randomPicture.download_url}
          id={randomPicture.id}
          width={randomPicture.width}
          height={randomPicture.height}
          author={randomPicture.author}
          dropdownActive={dropdownActive}
          setDropdownActive={setDropdownActive}
          customize={customize}
          setCustomize={setCustomize}
          pictureArray={[randomPicture]}
        />
      )}
    </>
  );
};

export default Random;
