const UnitMap = {
  english: {
    Temp: "F",
    Feels: "F",
    Precipitation: "in",
    Humidity: "%",
    "UV Index": "",
    "Wind Speed": "mph",
  },
  metric: {
    Temp: "C",
    Feels: "C",
    Precipitation: "mm",
    Humidity: "%",
    "UV Index": "",
    "Wind Speed": "kph",
  },
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

const detailsCurrentCard = (title, qty, unitSys) => {
  const div = customElement("div", { class: "current-detail" });
  const units = UnitMap[unitSys][title];
  const titleDiv = customElement("div", { class: "title" }, title);
  const valueDiv = customElement("div", { class: "value" }, `${qty} ${units}`);
  div.appendChild(titleDiv);
  div.appendChild(valueDiv);
  return div;
};

const clearCardArea = (container) => {
  while (container.hasChildNodes()) container.removeChild(container.lastChild);
};

const currentCard = (data) => {
  const current = document.querySelector("#current");
  clearCardArea(current);

  if (data.is_day !== 1) {
    document.querySelector(".app").classList.toggle("night");
    document.querySelector(".footer").classList.toggle("night");
  }

  // large details
  const mainCard = customElement("div", { class: "current-hero" });
  const imgURL = data.icon.split("64x64/")[1];
  const img = customElement("img", { src: `./icons/${imgURL}` });
  const detailsCard = customElement("div");
  const descHolder = customElement("div", { class: "current-desc" }, data.text);
  const locHolder = customElement(
    "div",
    { class: "current-loc" },
    data.location.toUpperCase()
  );
  detailsCard.appendChild(locHolder);
  detailsCard.appendChild(descHolder);

  mainCard.appendChild(img);
  mainCard.appendChild(detailsCard);
  current.appendChild(mainCard);

  // temp, feels, precip, wind, humidity, uv
  const units = document.querySelector("#units").dataset.unit;
  const detailsContainer = customElement("div", { class: "details-card" });
  const detailsChildren = [
    detailsCurrentCard("Temp", data[units].temp, units),
    detailsCurrentCard("Feels", data[units].feels, units),
    detailsCurrentCard("Precipitation", data[units].precipitation, units),
    detailsCurrentCard("Humidity", data.humidity, units),
    detailsCurrentCard("UV Index", data.uv, units),
    detailsCurrentCard("Wind Speed", data[units].wind, units),
  ];
  detailsChildren.forEach((child) => detailsContainer.appendChild(child));
  current.appendChild(detailsContainer);
};

const forecastCard = (data) => {
  console.log(data);
};

const hourlyCard = (data) => {
  console.log(data);
};

export { currentCard, forecastCard, hourlyCard };
