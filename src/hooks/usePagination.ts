import { useMemo } from 'react';

export const DOTS = '...';

interface Props {
  currentPage: number
  numberOfPages: number
  siblingCount?: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  siblingCount = 1,
  currentPage,
  numberOfPages,
}: Props) => {
  const paginationRange = useMemo(() => {
    // Max amounts of elements for pagination for example [1,2,3,4,5]
    const totalPageNumbers = siblingCount + 5;
    // If we have less pages than we want to display from the beginning,
    // we return range from 1 to totalPageCount
    if (totalPageNumbers >= numberOfPages) {
      return range(1, numberOfPages);
    }

    // detect position of left sibling
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    // detect position of right sibling
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      numberOfPages,
    );

    /*
      To maintain the size of pagination component we only show dots
      when there is more than one position left between the prev/next buttons
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < numberOfPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = numberOfPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, numberOfPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        numberOfPages - rightItemCount + 1,
        numberOfPages,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const pageNumbers = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...pageNumbers, DOTS, lastPageIndex];
    }
    return range(1, numberOfPages);
  }, [siblingCount, currentPage, numberOfPages]);

  return paginationRange;
};
