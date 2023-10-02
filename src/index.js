import "./style.css";
import Parser from "./parser";
import { currentCard, forecastCard, hourlyCard } from "./cards";

const urlBuilder = (baseURI, params) => {
  /*
  builds url for fetch call using parameters from api documentation
  input: params (object)
  output: builtUrl (string)
  */
  const myKey = "65d254019f124a5c8ef43320232809";
  let builtUrl = `${baseURI}?key=${myKey}`;
  Object.entries(params).forEach((entry) => {
    const [key, value] = [...entry];
    builtUrl += `&${key}=${value}`;
  });
  return builtUrl;
};

const callForecastAPI = async (location) => {
  /* 
  Calls WeatherAPI (documentation: https://www.weatherapi.com/docs/) 
  and returns current and forecast data based on the ff parameters:
    q = location (city, US/UK/CA zipcode, ip address)
    days = 3 to accomodate API restrictions for free user
    aqi = air quality index
    alert = alerts available on weather api
  input: location
  output: json if request is accepted or error
  */
  let data;
  const baseURI = "http://api.weatherapi.com/v1/forecast.json";
  const params = {
    q: location,
    days: 3,
  };
  try {
    const url = urlBuilder(baseURI, params);
    const request = await fetch(url);
    if (request.status === 200) {
      data = await request.json();
    } else throw Error(request.status);
  } catch (e) {
    data = e;
  }
  return data;
};

const callSearchAPI = async (search) => {
  /*
  Calls weather API search/autcomplete endpoint based on search string
  input: search (of location)
  output: json if request is accepted or error
  */
  let data;
  const baseURI = "http://api.weatherapi.com/v1/forecast.json";
  try {
    const url = urlBuilder(baseURI, { q: search });
    const request = await fetch(url);
    if (request.status === 200) {
      data = await request.json();
    } else throw Error(request.status);
  } catch (e) {
    data = e;
  }
  return data;
};

const updateLocation = async (position) => {
  /*
  Success callback for getCurrentPosition
  input: position emitted by getCurrentPosition
  output: none 
  */
  let location;
  if (position instanceof GeolocationPosition) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    location = `${lat},${long}`;
  } else location = `${position.lat},${position.lon}`;

  const data = await callForecastAPI(location);
  if (!(data instanceof Error)) {
    const parser = Parser(data);
    currentCard(parser.parseCurrent());
    forecastCard(parser.parseSummary());
    hourlyCard(parser.parseHourly("2023-10-02"));
  } else {
    // render error card
  }
};

const processForm = async (e) => {
  let location;
  e.preventDefault();
  const searchBar = e.target[0];
  if (searchBar.validity.valid) {
    location = await callSearchAPI(searchBar.value);
  }
  if (!(location instanceof Error)) {
    updateLocation(location.location);
  }
};

(async () => {
  // default behavior is to use a specified location
  // const data = await callForecastAPI("Tokyo");
  // if (!(data instanceof Error)) {
  //   const parser = Parser(data);
  //   const parsedCurrentData = parser.parseCurrent();
  //   console.log(parsedCurrentData);
  //   const forecastData = parser.parseSummary();
  //   console.log(forecastData);
  //   const hourlyData = parser.parseHourly("2023-09-29");
  //   console.log(hourlyData);
  // }

  document.querySelector("form").addEventListener("submit", processForm);
  document.querySelector("#locate").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation);
    }
  });

  const test = {
    datetime: "2023-09-29 16:00",
    english: { temp: 82.4, wind: 8.1, precipitation: 0, feels: 86.3 },
    humidity: 58,
    icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
    is_day: 1,
    metric: { temp: 28, wind: 13, precipitation: 0, feels: 30.2 },
    text: "Partly cloudy",
    uv: 7,
  };
  // currentCard(test);
})();
