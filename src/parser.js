const Parser = (rawData) => {
  const currentDay = rawData.current;
  const daySeriesData = rawData.forecast.forecastday;
  const parseCurrent = () => {
    const parsed = {
      location: rawData.location.name,
      region: rawData.location.region,
      datetime: currentDay.last_updated,
      is_day: currentDay.is_day,
      icon: currentDay.condition.icon,
      text: currentDay.condition.text,
      humidity: currentDay.humidity,
      uv: currentDay.uv,
      metric: {
        temp: currentDay.temp_c,
        wind: currentDay.wind_kph,
        precipitation: currentDay.precip_mm,
        feels: currentDay.feelslike_c,
      },
      english: {
        temp: currentDay.temp_f,
        wind: currentDay.wind_mph,
        precipitation: currentDay.precip_in,
        feels: currentDay.feelslike_f,
      },
    };
    return parsed;
  };

  const parseSummary = () =>
    daySeriesData.map((dayData) => {
      const data = {
        date: dayData.date,
        rain_chance: dayData.day.daily_chance_of_rain,
        snow_chance: dayData.day.daily_chance_of_snow,
        icon: dayData.day.condition.icon,
        text: dayData.day.condition.text,
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

  const parseHourly = (date) => {
    const dateData = daySeriesData.filter((day) => day.date === date);
    return dateData[0].hour.map((hour) => {
      const data = {
        time: hour.time,
        rain_chance: hour.chance_of_rain,
        snow_chance: hour.chance_of_snow,
        metric: {
          temp_c: hour.temp_c,
          precipitation: hour.precip_mm,
        },
        english: {
          temp_f: hour.temp_f,
          precipitation: hour.precip_in,
        },
      };
      return data;
    });
  };
  return { parseCurrent, parseSummary, parseHourly };
};

export default Parser;
