import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import styles from "./All.module.scss";
import Card from "../../components/Card/Card";
import { Picture } from "../../models/Picture.model";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { BASE_URL } from "../../util/constants";
import { CurrentPageContext } from "../../context/currentPageContext";

const All = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrentPage } = useContext(CurrentPageContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    let thisPage = searchParams.get("page");

    if (!thisPage) {
      navigate({
        search: `?page=1`,
      });
    } else if (+thisPage > 0 && +thisPage < 76) {
      setCurrentPage(+thisPage);
      setLoading(true);

      axios
        .get(`v2/list?page=${thisPage}&limit=12`, {
          signal: controller.signal,
        })
        .then((response) => {
          setPictures(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          if (error.code === "ERR_CANCELED") {
          } else {
            swal(
              "Uh oh something went wrong with the connection",
              "Click ok to dismiss",
              "error"
            );
          }
        });
    } else {
      navigate("/notfound", { replace: true });
    }

    return () => controller.abort();
  }, [searchParams, navigate, setCurrentPage]);

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return (
    <>
      <div className={styles.cardContainer}>
        {pictures &&
          pictures.map((picture) => {
            return (
              <Card
                author={picture.author}
                url={`${BASE_URL}id/${picture.id}/300/200/`}
                key={picture.id}
                width={picture.width}
                height={picture.height}
                fullscreenUrl={picture.download_url}
                id={picture.id}
                pictureArray={[picture]}
              />
            );
          })}
      </div>
    </>
  );
};

export default All;
