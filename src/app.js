import "./modules/libs";

import Request from "./modules/request";
import UI from "./modules/ui";

const request = new Request();
const ui = new UI();

eventListener();

function eventListener() {
  document.addEventListener("DOMContentLoaded", getData);
}

function getData() {
  request.getAllData().then(data => {
    const { realTime, hourly, daily } = data;
    console.log("getdata data", data);
    ui.addWeatherInfos(realTime);
    // ui.addWeatherInfos(realTime[0]);
    ui.addDaily(daily);
    ui.addHourly(hourly);
  });
}
