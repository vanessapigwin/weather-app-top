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

// todo add function to delete card contents

const currentCard = (data) => {
  console.log(data);
  const container = document.querySelector("#current");
  if (data.is_day !== 1) {
    document.querySelector(".content").classList.toggle("night");
    document.querySelector(".hourly-content").classList.toggle("night");
    document.querySelector(".footer").classList.toggle("night");
  }

  // large details
  const imgURL = data.icon.split("64x64/")[1];
  const mainCard = customElement("div", { class: "current-hero" });
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
  container.append(mainCard);

  // temp, feels, precip, wind, humidity, uv
};

const forecastCard = (data) => {
  console.log(data);
};

const hourlyCard = (data) => {
  console.log(data);
};

const toggleUnits = () => {
  console.log("toggle units");
};

export { currentCard, forecastCard, hourlyCard, toggleUnits };
