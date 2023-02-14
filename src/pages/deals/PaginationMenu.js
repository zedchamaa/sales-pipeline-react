// libraries
import ReactPaginate from 'react-paginate';

// styles
import styles from './PaginationMenu.module.css';

export default function PaginationMenu({ pageCount, changePage }) {
  return (
    <div className={styles.container}>
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        containerClassName={styles.paginationButtons}
        previousLinkClassName={styles.previousButton}
        nextLinkClassName={styles.nextButton}
        disabledClassName={styles.paginationDisabled}
        activeClassName={styles.paginationActive}
        pageClassName={styles.pageElement}
      />
    </div>
  );
}
