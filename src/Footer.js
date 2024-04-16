import React from 'react'

const Footer = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

     <span className="page"> Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  )
}

export default Footer