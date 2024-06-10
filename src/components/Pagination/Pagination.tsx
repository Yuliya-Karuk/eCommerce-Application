import classnames from 'classnames';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (data: number) => void;
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(el => (
          <li key={el}>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.active]: el === currentPage })}
              onClick={() => setCurrentPage(el)}
            >
              {el}
            </button>
          </li>
        ))}
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
