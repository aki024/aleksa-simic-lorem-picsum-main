import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DIRECTION_CLICK,
  DIRECTION_NEXT,
  DIRECTION_PREVIOUS,
} from "../../util/constants";
import { getWindowSize } from "../../util/getWindowSize";
import styles from "./Pagination.module.scss";

interface Props {
  currentPage: number;
}

const pageNumbers: Number[] = [];
for (let i = 1; i <= Math.ceil(900 / 12); i++) {
  pageNumbers.push(i);
}

const Pagination = ({ currentPage }: Props) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [nextPaginateSlice, setNextPaginateSlice] = useState<number>(2);
  const [previousPaginateSlice, setPreviousPaginateSlice] = useState<number>(1);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const navigate = useNavigate();

  const changePageHandler = (direction?: string, pageNumber?: number) => {
    if (direction === DIRECTION_NEXT) {
      navigate({
        pathname: "",
        search: `?page=${currentPage + 1}`,
      });
    }
    if (direction === DIRECTION_PREVIOUS) {
      navigate({
        pathname: "",
        search: `?page=${currentPage - 1}`,
      });
    }
    if (direction === DIRECTION_CLICK) {
      navigate({
        pathname: "",
        search: `?page=${pageNumber}`,
      });
    }
  };

  useEffect(() => {
    if (windowSize.innerWidth > 540) {
      if (currentPage > 71) {
        setPreviousPaginateSlice(currentPage - 75 + 9);
        setNextPaginateSlice(4);
      } else if (currentPage < 5) {
        setPreviousPaginateSlice(currentPage);
        setNextPaginateSlice(currentPage + 9 - 2 * currentPage);
      } else {
        setNextPaginateSlice(4);
        setPreviousPaginateSlice(5);
      }
    } else {
      if (currentPage === 1) {
        setPreviousPaginateSlice(1);
        setNextPaginateSlice(2);
      } else if (currentPage === 75) {
        setPreviousPaginateSlice(3);
        setNextPaginateSlice(1);
      } else {
        setPreviousPaginateSlice(2);
        setNextPaginateSlice(1);
      }
    }
  }, [currentPage, windowSize.innerWidth]);

  return (
    <>
      <ul className={styles.pagination}>
        <li>
          <button
            className={styles.pageNumber}
            disabled={currentPage === 1}
            onClick={() => changePageHandler(DIRECTION_PREVIOUS)}>
            &laquo;
          </button>
        </li>
        {pageNumbers
          ?.slice(
            currentPage - previousPaginateSlice,
            currentPage + nextPaginateSlice
          )
          .map((pageNumber) => {
            return (
              <li key={+pageNumber}>
                <button
                  className={
                    currentPage === pageNumber
                      ? styles.active
                      : styles.pageNumber
                  }
                  onClick={() =>
                    changePageHandler(DIRECTION_CLICK, +pageNumber)
                  }>
                  {+pageNumber}
                </button>
              </li>
            );
          })}
        <li>
          <button
            className={styles.pageNumber}
            disabled={currentPage === 75}
            onClick={() => changePageHandler(DIRECTION_NEXT)}>
            &raquo;
          </button>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
