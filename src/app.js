function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input-name");
  search(cityInputElement.value);
}

function showTemperature(response) {
  let cityNameElement = document.querySelector("#city-name");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#current-date");
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  cityNameElement.innerHTML = response.data.name;
  cityElement.innerHTML = response.data.name;
  currentTemperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function currentLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "0d800c588dc0c17f7124ec074768af05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function search(city) {
  let apiKey = "0d800c588dc0c17f7124ec074768af05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let geolocationButton = document.querySelector("#current");
geolocationButton.addEventListener("click", displayCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("Ambanitsena");
