import { format } from "date-fns";
import { UnitMap, customElement, Status } from "./utils";
import hourlyCard from "./appchart";

const detailsCurrentCard = (title, qty, unitSys) => {
  const div = customElement("div", { class: "current-detail" });
  const units = UnitMap[unitSys][title];
  const titleDiv = customElement("div", { class: "title" }, title);
  const valueDiv = customElement("div", { class: "value" }, `${qty} ${units}`);
  div.appendChild(titleDiv);
  div.appendChild(valueDiv);
  return div;
};

const oddsContent = (oddsPrecip, oddsSnow) => {
  const div = customElement("div", { class: "odds-content" });
  const children = [
    customElement("img", {
      src: new URL("./images/rain.png", import.meta.url),
    }),
    customElement("div", undefined, `${oddsPrecip} %`),
    customElement("img", {
      src: new URL("./images/snow.png", import.meta.url),
    }),
    customElement("div", undefined, `${oddsSnow} %`),
  ];
  children.forEach((e) => div.appendChild(e));
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
  const dateHolder = customElement(
    "div",
    { class: "current-date" },
    format(new Date(data.datetime.split(" ")[0]), "d MMMM R")
  );
  const locHolder = customElement(
    "div",
    { class: "current-loc" },
    data.location.toUpperCase()
  );
  detailsCard.appendChild(dateHolder);
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
  const units = document.querySelector("#units").dataset.unit;
  const forecast = document.querySelector(".forecast");

  clearCardArea(forecast);

  data.forEach((d) => {
    const div = customElement("div", { class: "card" });
    const img = customElement("img", { src: d.icon });
    const detailDiv = customElement("div");
    const divChildren = [
      customElement(
        "div",
        { class: "title" },
        format(new Date(d.date), "d MMMM, EEE")
      ),
      customElement(
        "div",
        undefined,
        `${d[units].min_temp} / ${d[units].max_temp} ${UnitMap[units].max_temp}`
      ),
      oddsContent(d.rain_chance, d.snow_chance),
    ];
    divChildren.forEach((e) => detailDiv.appendChild(e));

    div.appendChild(img);
    div.appendChild(detailDiv);
    div.dataset.date = d.date;
    div.addEventListener("click", () => {
      Status.selected_day = d.date;
      hourlyCard(Status.parser.parseHourly(Status.selected_day));
    });
    forecast.appendChild(div);
  });
};

export { currentCard, forecastCard };
