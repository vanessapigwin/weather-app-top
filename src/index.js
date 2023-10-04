import "./style.css";
import Parser from "./parser";
import { currentCard, forecastCard, hourlyCard } from "./cards";

const Status = {
  location: "Manila",
  parser: undefined,
};

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
  Success callback for getCurrentPosition, takes position from getcurrentposition
  or weatherapi search result and uses value to call the forecast api function
  input: position emitted by getCurrentPosition or location from weatherapi
  output: none 
  */
  let location;
  if (position instanceof GeolocationPosition) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    location = `${lat},${long}`;
  } else {
    location = position;
  }
  const data = await callForecastAPI(location);
  if (!(data instanceof Error)) {
    const parser = Parser(data);
    currentCard(parser.parseCurrent());
    forecastCard(parser.parseSummary());
    // hourlyCard(parser.parseHourly("2023-10-04"));

    // store previous data and location
    Status.location = location;
    Status.parser = parser;
  }
};

const processForm = async (e) => {
  /*
  onclick callback for search button. takes value from form and calls
  weatherapi search. if success, a location is found and update location 
  method is called
  */
  let location;
  e.preventDefault();
  const searchBar = e.target[0];
  if (searchBar.validity.valid) {
    location = await callSearchAPI(searchBar.value);
  }
  if (!(location instanceof Error)) {
    updateLocation(location.location.name);
  }
};

const toggleUnits = (e) => {
  e.target.dataset.unit =
    e.target.dataset.unit === "metric" ? "english" : "metric";
  currentCard(Status.parser.parseCurrent());
  forecastCard(Status.parser.parseSummary());
};

(async () => {
  document.querySelector("#units").addEventListener("click", toggleUnits);
  document.querySelector("form").addEventListener("submit", processForm);
  document.querySelector("#locate").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation);
    }
  });

  updateLocation(Status.location);
  const test = [
    {
      date: "2023-10-04",
      english: {
        max_temp: 95,
        min_temp: 66.7,
        precipitation: 0,
      },
      metric: {
        max_temp: 33.2,
        min_temp: 16.7,
        precipitation: 0,
      },
      humidity: 5,
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      rain_chance: 0,
      snow_chance: 0,
      text: "Sunny",
      uv: 6,
    },
    {
      date: "2023-10-04",
      english: {
        max_temp: 95,
        min_temp: 66.7,
        precipitation: 0,
      },
      metric: {
        max_temp: 33.2,
        min_temp: 16.7,
        precipitation: 0,
      },
      humidity: 5,
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      rain_chance: 0,
      snow_chance: 0,
      text: "Sunny",
      uv: 6,
    },
  ];
  forecastCard(test);
})();
