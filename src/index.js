import * as weatherApi from "./weatherApi";
import * as domFunc from './domFunctions'
import { initial } from "lodash";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

async function getWeatherData(initialLoad = false) {
  //Default weather data
  try {
    let cityName;
    if(initialLoad) {
      cityName =  await weatherApi.getCityNameByIp()
    }else {
      cityName = weatherApi.getDataFromForm();
    }
    
    if (!cityName) return;

    const requestCoordUrl = weatherApi.buildRequestCoodUrl(cityName);
    const coord = await weatherApi.getCoord(requestCoordUrl);
    const requestDataForecastUrl = weatherApi.buildRequestForecastUrl(coord);
    const weatherData = await weatherApi.getForecast(requestDataForecastUrl);

    weatherData.name = coord.name;
    weatherData.country = coord.country;

    domFunc.currentWeather(weatherData)

  } catch (err) {
    console.log(err);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchButton.addEventListener("click", async () => {
  getWeatherData();
});

getWeatherData(true)



