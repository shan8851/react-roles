import React from 'react';
import { DOTS, usePagination } from '~/hooks/usePagination';
import uuid from 'react-uuid';

interface PaginationProps {
  onPageChange: (pageNumber: number) => void;
  currentPage: number
  numberOfPages: number
  siblingCount?: number
}
const Pagination = ({
  onPageChange,
  siblingCount = 1,
  numberOfPages,
  currentPage,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    numberOfPages,
  });

  if (paginationRange && (currentPage === 0 || paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  console.log('hello', currentPage, lastPage)

  return (
    <div className="flex gap-3 justify-center">
      <button
        disabled={currentPage === 1}
        onClick={currentPage !== 1 ? onPrevious : undefined}
        className="btn"
      >
        👈 Previous
      </button>
      {paginationRange && paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <button className="btn" key={uuid()}>...</button>;
        }

        return (
          <button
            key={uuid()}
            className={`btn ${pageNumber === currentPage ? 'btn-primary' : 'btn'}`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        disabled={currentPage === lastPage}
        onClick={currentPage !== lastPage ? onNext : undefined}
        className={`btn ${currentPage === lastPage ? 'btn-disabled' : 'btn'}`}
      >
        Next 👉
      </button>
    </div>
  );
};

export default Pagination;
