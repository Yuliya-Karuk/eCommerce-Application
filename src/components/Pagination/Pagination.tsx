import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

const maxShownPages = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (data: number) => void;
  setShouldFetchProducts: (data: boolean) => void;
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage, setShouldFetchProducts }: PaginationProps) => {
  const getPaginationRange = () => {
    const rangeSize = 5;
    const start = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const end = Math.min(start + rangeSize - 1, totalPages);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const [paginationRange, setPaginationRange] = useState(getPaginationRange);

  useEffect(() => {
    const newPaginationRange = getPaginationRange();
    setPaginationRange(newPaginationRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPages]);

  useEffect(() => {
    setShouldFetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <nav aria-label="Page navigation">
      <ul className={styles.pagination}>
        <li>
          <button
            type="button"
            className={classnames(styles.pgnButton, { [styles.first]: true })}
            onClick={() => setCurrentPage(1)}
            aria-label="First"
            disabled={currentPage === 1}
          >
            <span aria-hidden="true" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className={classnames(styles.pgnButton, { [styles.previous]: true })}
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            <span aria-hidden="true" />
          </button>
        </li>
        {
          // Array.from({ length: totalPages }, (_, i) => i + 1)
          //   .slice(0, 5)
          paginationRange.map(el => (
            <li key={el}>
              <button
                type="button"
                className={classnames(styles.pgnButton, { [styles.active]: el === currentPage })}
                onClick={() => setCurrentPage(el)}
              >
                {el}
              </button>
            </li>
          ))
        }
        {totalPages > maxShownPages && (
          <li>
            <button type="button" className={classnames(styles.pgnButton, { [styles.empty]: true })} disabled>
              ...
            </button>
          </li>
        )}
        <li>
          <button
            type="button"
            className={classnames(styles.pgnButton, { [styles.next]: true })}
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label="Next"
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className={classnames(styles.pgnButton, { [styles.last]: true })}
            onClick={() => setCurrentPage(totalPages)}
            aria-label="Last"
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
