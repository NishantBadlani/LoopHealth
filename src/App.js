import React, { useState } from "react";
import Weather from "./Weather";
import { Box, TextField, Button, makeStyles } from "@material-ui/core";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch"
    }
  },
  cityInput: {
    width: "100%"
  },
  btn: {
    marginLeft: "20px"
  }
}));

export default function App() {
  const classes = useStyles();
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");

  const handleClick = (event) => {
    setCityInput(event.target.value);
  };

  const handleSubmit = () => {
    setCity(cityInput);
    setCityInput("");
  };

  const handleClear = () => {
    setCity("");
  };

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Box display="flex" alignItems="center">
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            className={classes.cityInput}
            onChange={(event) => handleClick(event)}
            value={cityInput}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={handleSubmit}
            disabled={!cityInput.length}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={handleClear}
          >
            Clear
          </Button>
        </Box>
      </form>

      {city.length ? <Weather city={city} /> : null}
    </>
  );
}
