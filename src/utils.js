const UnitMap = {
  english: {
    Temp: "ºF",
    max_temp: "ºF",
    min_temp: "ºF",
    Feels: "ºF",
    Precipitation: "in",
    Humidity: "%",
    "UV Index": "",
    "Wind Speed": "mph",
    rain_chance: "%",
    snow_chance: "%",
  },
  metric: {
    Temp: "ºC",
    Feels: "ºC",
    max_temp: "ºC",
    min_temp: "ºC",
    Precipitation: "mm",
    Humidity: "%",
    "UV Index": "",
    "Wind Speed": "kph",
    rain_chance: "%",
    snow_chance: "%",
  },
};

const Status = {
  location: "San Franciso",
  parser: undefined,
  selected_day: undefined,
  fetch_time: undefined,
};

const customElement = (tag, att = undefined, textContent = undefined) => {
  const element = document.createElement(tag);
  if (att !== undefined)
    Object.entries(att).forEach((item) => {
      const [key, value] = item;
      const attribute = document.createAttribute(key);
      attribute.value = value;
      element.setAttributeNode(attribute);
    });
  if (textContent !== undefined) element.textContent = textContent;
  return element;
};

export { UnitMap, customElement, Status };
