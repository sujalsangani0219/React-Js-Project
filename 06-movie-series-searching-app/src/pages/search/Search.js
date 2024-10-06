import React, { useState, useEffect } from "react";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import SingleContent from "../../components/singleContent/SingleContent";
import CustomPagination from "../../components/pagination/CustomPagination";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TextField from "@material-ui/core/TextField";
import axios from "axios";

function Search() {
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    console.log(content);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    //eslint-disable-next-line
  }, [page, type]);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <form
          noValidate
          autoComplete="off"
          style={{ display: "flex", margin: "15px 0" }}
        >
          <TextField
            style={{ flex: 1 }}
            id="outlined-basic"
            className="searchBox"
            label="search"
            variant="outlined"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: "1rem" }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </form>
        <Tabs
          value={type}
          onChange={(e, value) => {
            setType(value);
            setPage(1);
          }}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Search Movie" />
          <Tab label="Search TV Series" />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
            // console.log(c)
          ))}
        {searchText &&
          !content &&
          (type ? <h1>No movies found</h1> : <h1>No Series found</h1>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination numOfPages={numOfPages} setPage={setPage} />
      )}
    </div>
  );
}

export default Search;
