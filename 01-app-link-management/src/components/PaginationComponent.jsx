const PaginationComponent = ({
  numberOfPages,
  currentPage,
  onChangeCurrentPage,
  ...props
}) => {
  const spaces = 5; // 5 page links
  const isDisabledPrevious = currentPage === 1;
  const isDisabledNext = currentPage === numberOfPages;
  const pages = [];
  let start = currentPage < spaces ? 1 : currentPage - Math.floor(spaces / 2);
  let end = start + spaces - 1;
  if (end > numberOfPages) {
    end = numberOfPages;
    start = Math.max(1, numberOfPages - spaces + 1);
  }
  for (let index = start; index <= end; index++) {
    pages.push(index);
  }

  return (
    <>
      {pages.length > 1 && (
        <nav>
          <ul className="pagination">
            <li
              className={
                isDisabledPrevious ? "page-item disabled" : "page-item"
              }
            >
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(1)}
              >
                First
              </a>
            </li>
            <li
              className={
                isDisabledPrevious ? "page-item disabled" : "page-item"
              }
            >
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            {pages.map((p) => (
              <li key={p}>
                <a
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => onChangeCurrentPage(p)}
                  className={
                    p === currentPage ? "page-link active" : "page-link"
                  }
                >
                  {p}
                </a>
              </li>
            ))}
            <li className={isDisabledNext ? "page-item disabled" : "page-item"}>
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(currentPage + 1)}
              >
                Next
              </a>
            </li>
            <li className={isDisabledNext ? "page-item disabled" : "page-item"}>
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(numberOfPages)}
              >
                Last
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

PaginationComponent.displayName = "PaginationComponent";

export default PaginationComponent;
