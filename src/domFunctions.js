
const container = document.getElementById('container')
const icon = document.getElementById("icon");
const description = document.getElementById("description");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const hourly = document.querySelector(".forecastHourContainer");
const daily = document.querySelector(".forecastDailyContainer");



//Captalise first letter of a string

function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function currentWeather(data) {
  hourly.innerHTML = "";
  daily.innerHTML =''

  const urlIcon = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
  const forecastHourly = data.hourly;
  const forecastDaily = data.daily;

  icon.src = urlIcon;
  description.textContent = capitalizeWords(
    `${data.current.weather[0].description}`
  );
  cityName.textContent = `${data.name}`;
  temperature.innerHTML = `<i class="bi bi-thermometer-half"></i> ${data.current.temp.toFixed(
    0
  )} ºC `;
  humidity.innerHTML = `<img src='./assets/img/humidity.png'> <span> ${data.current.humidity}</span> %`;

  let count = 0
  //Forecast by Hour
   for (let i = 0; i < forecastHourly.length; i++) {
    if(count === 13) 
    break
    const weather = forecastHourly[i];
    const time = new Date(weather.dt * 1000).toString().slice(16, 21);
    const temp = weather.temp.toFixed(0);
    const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const feelsLikeHour = weather.feels_like.toFixed(0);
    const descriptionHour = weather.weather[0].description;
    const windSpeedHour = weather.wind_speed;

    const div = document.createElement("div");
    div.classList.add("hourForecastItem");
    div.innerHTML = `   <p class='hourlyTime'>${time}</p>
                        <p class='hourlyTemp'>${temp}°C</p>
                        <img src=${icon} class='hourlyIcon'>
                        <div class='hourlyDescription'> <p class='hourlyDescriptionValue' >${capitalizeWords(
                            descriptionHour
                          )}</p></div>
                        
                        <div class='feelsLike'> <p class='labelFeelsLike'> Feels Like </p>
                        <p class='hourlyFeelsLike'>${feelsLikeHour}ºC </p>
                        </div>
                        <div class='windSpeed'> 
                        <p class ='labelWindSpeed'> Wind Speed <p class='hourlyWindSpeed'>${windSpeedHour} km/h </p></div>
                        
                        `;
    hourly.appendChild(div);
    count ++
    
  } 

  //Forecast By Day
  for (let i = 0; i < forecastDaily.length; i++) {
    const weather = forecastDaily[i];
    const day = new Date(weather.dt * 1000).getDate();
    const weekday = new Date(weather.dt * 1000).getDay();
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekdayName = weekdays[weekday];
    const max = weather.temp.max.toFixed(0);
    const min = weather.temp.min.toFixed(0);
    const description = weather.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    const div = document.createElement("div");
    div.classList.add("forecastDailyItem");
    div.innerHTML = ` 
                     <p class='numberDay'>${day}</p>
                     <p class='dailyWeekday'>${weekdayName}</p>
                     <img src=${icon} class='icon'>
                     <p class='dailyDescription'>${capitalizeWords(description)}</p>
                     <p class='dailyMax'><span style="color: red;">${max}</span>°C</p>
                     <p class='dailyMax'><span style="color: blue;">${min}</span>°C</p>
                     
                     `;

    daily.appendChild(div);
  }

  document.getElementById("container").style.display = "block";
  
}



export { currentWeather };
