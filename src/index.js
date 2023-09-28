import "./style.css";

const urlBuilder = (params) => {
  /*
  builds url for fetch call using parameters from api documentation
  input: params (object)
  output: builtUrl (string)
  */
  const baseURI = "http://api.weatherapi.com/v1/forecast.json";
  const myKey = "65d254019f124a5c8ef43320232809";
  let builtUrl = `${baseURI}?key=${myKey}`;
  Object.entries(params).forEach((entry) => {
    const [key, value] = [...entry];
    builtUrl += `&${key}=${value}`;
  });
  return builtUrl;
};

const callAPI = async (location) => {
  /* 
  calls WeatherAPI (documentation: https://www.weatherapi.com/docs/) 
  and returns current and forecast data based on the ff parameters
  q = location (city, US/UK/CA zipcode, ip address)
  days = 3 to accomodate API restrictions for free user
  aqi = air quality index
  alert = alerts available on weather api
  input: location
  output: json or error data
  */
  let data;
  const params = {
    q: location,
    days: 3,
  };
  try {
    const url = urlBuilder(params);
    const request = await fetch(url);
    if (request.status === 200) {
      data = await request.json();
    }
  } catch (e) {
    data = e;
  }
  return data;
};

const updateLocation = (position) => {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const location = `${lat},${long}`;
  console.log(location);
  console.log("call api");
  console.log("update page");
};

const Parser = (rawData) => {
  const parseCurrent = () => {
    const data = rawData.current;
    const parsed = {
      datetime: data.last_updated,
      is_day: data.is_day,
      icon: data.condition.icon,
      text: data.condition.text,
      humidity: data.humidity,
      uv: data.uv,
      metric: {
        temp: data.temp_c,
        wind: data.wind_kph,
        precipitation: data.precip_mm,
        feels: data.feelslike_c,
      },
      english: {
        temp: data.temp_f,
        wind: data.wind_mph,
        precipitation: data.precip_in,
        feels: data.feelslike_f,
      },
    };
    return parsed;
  };

  const parseSummary = () => {
    const daySeriesData = rawData.forecast.forecastday;
    return daySeriesData.map((dayData) => {
      const data = {
        date: dayData.date,
        rain_chance: dayData.day.daily_chance_of_rain,
        snow_chance: dayData.day.daily_chance_of_snow,
        icon: dayData.day.condition.icon,
        text: dayData.day.condition.text,
        humidity: dayData.day.humidity,
        uv: dayData.day.uv,
        metric: {
          max_temp: dayData.day.maxtemp_c,
          min_temp: dayData.day.mintemp_c,
          precipitation: dayData.day.totalprecip_mm,
        },
        english: {
          max_temp: dayData.day.maxtemp_f,
          min_temp: dayData.day.mintemp_f,
          precipitation: dayData.day.totalprecip_in,
        },
      };
      return data;
    });
  };

  return { parseCurrent, parseSummary };
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(updateLocation);
}

// use default location on init
const data = await callAPI("Tokyo");
const parser = Parser(data);
const parsedCurrentData = parser.parseCurrent();
console.log(parsedCurrentData);
const forecastData = parser.parseSummary();
console.log(forecastData);
