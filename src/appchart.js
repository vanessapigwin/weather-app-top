import Chart from "chart.js/auto";
import { UnitMap } from "./utils";

const getOptions = (title) => {
  const defOptions = {
    plugins: {
      title: {
        display: true,
        text: title,
        color: "white",
        font: {
          size: "16px",
        },
      },
      legend: {
        labels: {
          color: "white",
          font: {
            size: "16px",
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "white" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "white" },
      },
    },
  };
  return defOptions;
};

const tempChart = new Chart(document.querySelector("#temp-chart"), {
  type: "line",
  options: getOptions("Temperature"),
});

const rainChart = new Chart(document.querySelector("#precip-chart"), {
  type: "bar",
  options: getOptions("Precipitation"),
});

const removeData = (chart) => {
  while (chart.data.labels.length > 0) chart.data.labels.pop();
  while (chart.data.datasets.length > 0) chart.data.datasets.pop();
  chart.update();
};

const addChartData = (chart, labels, datasets) => {
  labels.forEach((label) => chart.data.labels.push(label));
  datasets.forEach((dataset) => chart.data.datasets.push(dataset));
  chart.update();
};

const precipChartUpdate = (hours, amtPrecipitation, rainChance) => {
  const units = document.querySelector("#units").dataset.unit;
  const labels = hours;
  const datasets = [
    {
      label: UnitMap[units].Precipitation,
      data: amtPrecipitation,
      hoverOffset: 3,
    },
  ];
  removeData(rainChart);
  addChartData(rainChart, labels, datasets);
  // to do rain chance
  console.log(rainChance);
};

const tempChartUpdate = (hours, temp, units) => {
  const label = hours;
  const datasets = [
    {
      label: UnitMap[units].Temp,
      data: temp,
      backgroundColor: "transparent",
      borderColor: "#c62e65",
      borderCapStyle: "round",
      fill: false,
    },
  ];
  removeData(tempChart);
  addChartData(tempChart, label, datasets);
};

const hourlyCard = (data) => {
  const units = document.querySelector("#units").dataset.unit;
  const hours = data.map((d) => d.time.split(" ")[1]);
  const rainChance = data.map((d) => d.rain_chance);
  const amtPrecipitation = data.map((d) => d[units].precipitation);
  const temp = data.map((d) => d[units].temp);
  precipChartUpdate(hours, amtPrecipitation, rainChance, units);
  tempChartUpdate(hours, temp, units);
};

export default hourlyCard;
