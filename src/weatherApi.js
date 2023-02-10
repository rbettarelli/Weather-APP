function getDataFromForm() {
  const formData = document.getElementById("searchInput");
  const cityName = formData.value;

  if (cityName) {
    return cityName
      .replace(/(\s+$|^\s+)/g, "") // remove whitespace from begining and end of string
      .replace(/(,\s+)/g, ",") // remove any white space that follows a comma
      .replace(/(\s+,)/g, ",") // remove any white space that preceeds a comma
      .replace(/\s+/g, "+"); // replace any remaining white space with +, so it works in api call
  }
  return "";
}

//build request to get coordinates
 function buildRequestCoodUrl(cityName) {
  
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=73a83a685ff64a364fe4b9970ddb9db6`;
}

// build to obtain weather forecast
 function buildRequestForecastUrl(coordinates) {
 
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=metric&appid=3069ae2718e40f8dc1998b7250e16f10`;
}


async function getCoord (url) {
  const response = await fetch(url)
  const weatherData = await response.json()
  const {coord} = weatherData

  coord.name = weatherData.name
  coord.country = weatherData.sys.country

  return coord

}

async function getForecast(url) {
  const response = await fetch(url)
  const forecastData = await response.json()

  return forecastData
}

async function getCityNameByIp() {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  const ipAddress = data.ip;

  const geoResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=c8863f6ee5c94a2b9296b72ca6c7b4e6&ip=${ipAddress}`);
  const geoData = await geoResponse.json();
  return geoData.city; 
}









export { getDataFromForm, buildRequestCoodUrl, buildRequestForecastUrl, getCoord, getForecast, getCityNameByIp };
