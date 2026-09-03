import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { UserContext } from "../../context/Context";

export default function Pagination({ limit = 10, total = 0 }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const { page, setPages } = useContext(UserContext);
  const currentPage = Math.min(Math.max(page || 1, 1), totalPages);

  useEffect(() => {
    if (page !== currentPage) {
      setPages(currentPage);
    }
  }, [currentPage, page, setPages]);

  const pageNav = (pageNumber) => {
    setPages(pageNumber);
  };

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const visiblePages = [1];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      visiblePages.push("start-ellipsis");
    }

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber += 1) {
      visiblePages.push(pageNumber);
    }

    if (endPage < totalPages - 1) {
      visiblePages.push("end-ellipsis");
    }

    visiblePages.push(totalPages);
    return visiblePages;
  };

  return (
    <div className="container-pagination">
      <div className="pagination-control">
        <button
          type="button"
          className="previous-btn btn-nav"
          aria-label="Página anterior"
          disabled={currentPage === 1}
          onClick={() => pageNav(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>

      <nav aria-label="Paginação">
        <ul className="list-pages">
          {getVisiblePages().map((pageNumber) =>
            typeof pageNumber === "string" ? (
              <li key={pageNumber} className="page-ellipsis" aria-hidden="true">
                ...
              </li>
            ) : (
              <li key={pageNumber}>
                <button
                  type="button"
                  className={`btn-pages ${currentPage === pageNumber ? "active" : ""}`}
                  aria-label={`Ir para a página ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                  onClick={() => pageNav(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="pagination-control">
        <button
          type="button"
          className="next-btn btn-nav"
          aria-label="Próxima página"
          disabled={currentPage === totalPages}
          onClick={() => pageNav(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
