import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const PaginationComp = props => {
  const { pagesCount, currentPage, handlePageClick } = props;

  return (
    <Pagination clas aria-label="Page navigation">
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink onClick={e => handlePageClick(e, 1)} first href="#" />
      </PaginationItem>

      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink onClick={e => handlePageClick(e, currentPage - 1)} previous href="#" />
      </PaginationItem>

      {[...Array(pagesCount)].map((page, idx) => (
        <PaginationItem active={idx + 1 === currentPage} key={idx}>
          <PaginationLink onClick={e => handlePageClick(e, idx + 1)} href="#">
            {idx + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === pagesCount}>
        <PaginationLink onClick={e => handlePageClick(e, currentPage + 1)} next href="#" />
      </PaginationItem>

      <PaginationItem disabled={currentPage === pagesCount}>
        <PaginationLink onClick={e => handlePageClick(e, pagesCount)} last href="#" />
      </PaginationItem>
    </Pagination>
  );
};
