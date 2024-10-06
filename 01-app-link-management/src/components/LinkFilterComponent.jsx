import { useImmer } from "use-immer";
import { LINK_TYPE } from "../containers/LinkManagementContainer";
import { useEffect } from "react";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25, 50, 100];
const DEFAULT_ROWS_PER_PAGE = 100;

const LinkFilterComponent = ({ onFilterChanged, ...props }) => {
  const LINK_TYPE_OPTIONS = Object.values(LINK_TYPE);
  const [query, setQuery] = useImmer({
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    searchText: "",
    type: "",
  });
  const onChangeQueryField = (e) => {
    setQuery((q) => {
      q[e.target.name] = e.target.value;
    });
  };

  useEffect(() => {
    onFilterChanged(query);
  }, [query]);

  return (
    <>
      <div className="mt-4 d-flex justify-content-between">
        <select
          className="form-select"
          aria-label="Select rows per page"
          name="rowsPerPage"
          style={{
            width: "120px",
          }}
          onChange={onChangeQueryField}
        >
          {ROWS_PER_PAGE_OPTIONS.map((v, idx) => (
            <option
              selected={v === query.rowsPerPage}
              value={v}
              key={idx}
            >{`${v} rows`}</option>
          ))}
        </select>
        <div className="d-flex justify-content-end">
          <select
            className="form-select"
            aria-label="Select rows per page"
            style={{
              width: "120px",
            }}
            name="type"
            onChange={onChangeQueryField}
          >
            <option value={""}>Type</option>
            {LINK_TYPE_OPTIONS.map((v, idx) => (
              <option value={v} key={idx}>{`${v}`}</option>
            ))}
          </select>
          <input
            type="text"
            name="searchText"
            className="form-control ms-2"
            placeholder="Search"
            onChange={onChangeQueryField}
          ></input>
        </div>
      </div>
    </>
  );
};

export default LinkFilterComponent;
