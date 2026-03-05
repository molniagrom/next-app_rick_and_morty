import s from "../page.module.scss";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onSetPage: (page: number) => void;
}

export const Pagination = ({currentPage, totalPages, onSetPage}: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={s.pagination}>
            <button
                type="button"
                className={s.pageButton}
                onClick={() => onSetPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className={s.pageInfo}>Page {currentPage} of {totalPages}</span>
            <button
                type="button"
                className={s.pageButton}
                onClick={() => onSetPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};
