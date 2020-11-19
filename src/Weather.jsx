import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, makeStyles } from "@material-ui/core";
import axios from "axios";
import CONSTANTS from "./Constants";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  }
}));

export default function Weather({ city }) {
  const classes = useStyles();
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        `http://api.weatherstack.com/current?access_key=${CONSTANTS.KEY}&query=${city}`
      );

      setResponseData(data);
      console.log(data);
    }

    getData();
  }, [city]);

  if (
    Object.keys(responseData).length &&
    responseData.success !== undefined &&
    !responseData.success
  ) {
    return "Bad request, please check the details and try again";
  }

  return (
    <>
      {Object.keys(responseData).length ? (
        <Paper elevation={3}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box>
              <h3>{responseData.location.name}</h3>
              <h6>{responseData.location.localtime}</h6>
            </Box>
            <Box>
              <h3>{responseData.current.temperature} deg Celsius</h3>
              <h6>Wind Speed: {responseData.current.wind_speed} km/hr</h6>
              <h6>Wind Degree: {responseData.current.wind_degree} deg</h6>
            </Box>
            <Box>
              <div>
                <img
                  src={`${responseData.current.weather_icons[0]}`}
                  alt="Weather Icon"
                />
              </div>
              <h6>{responseData.current.weather_descriptions[0]}</h6>
            </Box>
          </Box>
        </Paper>
      ) : null}
    </>
  );
}
