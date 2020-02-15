import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * eg. range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to) => {
  const range = [];

  while (from <= to) {
    range.push(from);
    from++;
  }
  return range;
};

export const PaginationComp = props => {
  /**
   * currentPage: current page selected
   * pageNeighbours: indicates the number of additional page numbers to show on each side of the current page.
   * handlePageClick: action when page clicked
   * totalPages: maximum number of pages OR -> Math.ceil(sumData / limit)
   */
  const { className, currentPage, pageNeighbours, handlePageClick, totalPages } = props;

  /**
   * Let's say totalPages = 10, pageNeighbours = 1, and currentPage = 6
   * The pagination control will look like this
   *
   * ( 1 )  <  { 5 } [ 6 ] { 7 }  >  ( 10 )
   *
   * ( _ ) => first and last pages (always visible)
   * [ _ ] => current page
   * { _ } => pageNeighbours
   *
   */
  const fetchPageNumbers = () => {
    /**
     * totalNumbers: total page numbers showing on the control
     * totalBlocks: totalNumbers + 2 to spare space for left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden startPage to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: ( 1 )  <  { 5 } [ 6 ] { 7 }  (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: ( 1 )  { 5 } [ 6 ] { 7 }  >  (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: ( 1 )  <  { 5 } [ 6 ] { 7 }  >  (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();

  return (
    <Pagination>
      {pages.map((page, index) => {
        //
        if (page === LEFT_PAGE)
          return (
            <PaginationItem style={{ width: 45 }} className={className} key={index}>
              <PaginationLink onClick={e => handlePageClick(e, currentPage - pageNeighbours * 2 - 1)} first href="#" />
            </PaginationItem>
          );

        if (page === RIGHT_PAGE)
          return (
            <PaginationItem style={{ width: 45 }} className={className} key={index}>
              <PaginationLink onClick={e => handlePageClick(e, currentPage + pageNeighbours * 2 + 1)} last href="#" />
            </PaginationItem>
          );

        return (
          <PaginationItem style={{ width: 45 }} className={className} active={currentPage === page} key={index}>
            <PaginationLink className="text-dark" onClick={e => handlePageClick(e, page)} href="#">
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      })}
    </Pagination>
  );
};
