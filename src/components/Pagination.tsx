import React from "react";
import "../styles/Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onSelectPage: (numberPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onSelectPage,
}) => {
  let limitPage = 10;
  const pageButtons = [];
  let initPage = 1;

  if (currentPage > limitPage) {
    initPage = currentPage - limitPage + 1;
    limitPage = currentPage + 1;
  }
  if (currentPage === totalPage) {
    limitPage = totalPage;
  }

  for (let i = initPage; i <= limitPage; i++) {
    pageButtons.push(
      <button
        disabled={currentPage === i}
        key={i}
        onClick={() => onSelectPage(i)}
        className={`pagination-button pagination-button-number ${
          currentPage === i ? "pagination-active" : ""
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button pagination-button-string"
        onClick={() => onSelectPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageButtons}
      <button
        className="pagination-button pagination-button-string"
        onClick={() => onSelectPage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;