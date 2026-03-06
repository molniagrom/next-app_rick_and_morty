import s from "./Pagination.module.scss";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onSetPage: (page: number) => void;
    disablePrevious?: boolean;
    disableNext?: boolean;
    scrollToTopOnChange?: boolean;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onSetPage,
    disablePrevious,
    disableNext,
    scrollToTopOnChange = true,
}: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const isPreviousDisabled = disablePrevious ?? currentPage <= 1;
    const isNextDisabled = disableNext ?? currentPage >= totalPages;

    const changePage = (nextPage: number, trigger?: HTMLButtonElement) => {
        trigger?.blur();
        onSetPage(nextPage);

        if (scrollToTopOnChange && typeof window !== "undefined") {
            requestAnimationFrame(() => {
                window.scrollTo({top: 0, behavior: "smooth"});
            });
        }
    };

    return (
        <div className={s.pagination}>
            <button
                type="button"
                className={s.pageButton}
                onClick={(event) => changePage(currentPage - 1, event.currentTarget)}
                disabled={isPreviousDisabled}
            >
                Previous
            </button>
            <span className={s.pageInfo}>Page {currentPage} of {totalPages}</span>
            <button
                type="button"
                className={s.pageButton}
                onClick={(event) => changePage(currentPage + 1, event.currentTarget)}
                disabled={isNextDisabled}
            >
                Next
            </button>
        </div>
    );
};
