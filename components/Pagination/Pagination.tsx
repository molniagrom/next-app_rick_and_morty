import s from "./Pagination.module.scss";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onSetPage: (page: number) => void;
    disablePrevious?: boolean;
    disableNext?: boolean;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onSetPage,
    disablePrevious,
    disableNext,
}: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const isPreviousDisabled = disablePrevious ?? currentPage <= 1;
    const isNextDisabled = disableNext ?? currentPage >= totalPages;

    return (
        <div className={s.pagination}>
            <button
                type="button"
                className={s.pageButton}
                onClick={() => onSetPage(currentPage - 1)}
                disabled={isPreviousDisabled}
            >
                Previous
            </button>
            <span className={s.pageInfo}>Page {currentPage} of {totalPages}</span>
            <button
                type="button"
                className={s.pageButton}
                onClick={() => onSetPage(currentPage + 1)}
                disabled={isNextDisabled}
            >
                Next
            </button>
        </div>
    );
};
