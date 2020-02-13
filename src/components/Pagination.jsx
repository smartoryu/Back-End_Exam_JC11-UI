import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const PaginationComp = props => {
  const { pagesCount, currentPage, handlePageClick, handlePreviousClick, handleNextClick } = props;

  return (
    <Pagination aria-label="Page navigation">
      {/* <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem> */}
      <PaginationItem disabled={currentPage < 0}>
        <PaginationLink onClick={handlePreviousClick} previous href="#" />
      </PaginationItem>

      {[...Array(pagesCount)].map((page, idx) => (
        <PaginationItem active={idx === currentPage} key={idx}>
          <PaginationLink onClick={e => handlePageClick(e, idx)} href="#">
            {idx + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === pagesCount}>
        <PaginationLink onClick={handleNextClick} next href="#" />
      </PaginationItem>
      {/* <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem> */}
    </Pagination>
  );
};
