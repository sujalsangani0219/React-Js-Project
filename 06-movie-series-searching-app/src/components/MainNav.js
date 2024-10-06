import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TvIcon from "@material-ui/icons/Tv";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (value === 0) history.push("/");
    if (value === 1) history.push("/movies");
    if (value === 2) history.push("/series");
    if (value === 3) history.push("/search");
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Treding"
        style={{ color: "white" }}
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        label="Movies"
        style={{ color: "white" }}
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        label="Tv Series"
        style={{ color: "white" }}
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        label="Search"
        style={{ color: "white" }}
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
