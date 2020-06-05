import logo from "./../assets/svg/wind.svg";
import icon from "./weatherPics";
import { weatherInfoConvert } from "./weatherInfoConvert";
import { DateFormat } from "./date";
import Chartist from "chartist";
import "chartist-plugin-pointlabels";

export default class UI {
  constructor() {
    this.logoContainer = document.getElementById("logo");
    this.temp = document.querySelector(".temp");
    this.dateContainer = document.querySelector(".date");
    this.weatherImage = document.querySelector(".weatherImage img");
    this.weatherStatus = document.querySelector(".weatherStatus");
    this.maxTemp = document.querySelector(".maxTemp");
    this.minTemp = document.querySelector(".minTemp");
    this.weekView = document.querySelector(".weekView .row");

    this.date = new DateFormat();
    this.addLogo();
    this.addDate();
  }

  addActiveToDayView() {
    const dayView = document.querySelector(".dayView");
    dayView.classList.add("active");
  }

  addLogo() {
    this.logoContainer.src = logo;
  }

  addDate() {
    this.dateContainer.innerHTML = `${
      this.date.getTrDate
    } ${this.date.getTrMonth()} , ${this.date.getTrDay()}`;
  }

  addWeatherInfos(realTime) {
    let weatherValue = realTime.weather_code.value;
    const hour = this.date.d.getHours();
    if (
      weatherValue == "partly_cloudy" ||
      weatherValue == "mostly_clear" ||
      weatherValue == "clear"
    ) {
      (hour >= 21 || hour <= 6) && (weatherValue += "_night");
    }
    this.weatherImage.src = icon[weatherValue];
    this.weatherStatus.textContent = weatherInfoConvert(
      realTime.weather_code.value
    );
    this.temp.innerHTML = `${realTime.temp.value}<span class="degreeCelsius">&deg;C</span>`;
  }

  async addDaily(daily) {
    this.maxTemp.innerHTML = `${Math.round(
      daily[0].temp[1].max.value
    )}<span class="degreeCelsius">&deg;</span>`;
    this.minTemp.innerHTML = `${Math.round(
      daily[0].temp[0].min.value
    )}<span class="degreeCelsius">&deg;</span>`;
    await daily.map((info, i) => {
      if (i < 5) {
        i == 1 && this.addActiveToDayView();
        this.fillDayView(info, i);
      }
    });
  }

  fillDayView(info, i) {
    const dayViewContent = `
    <div class="col px-0">
        <div class="dayView" id=${i}>
            <span class="day">${this.shortDays()[i].short}</span>
            <span class="rain">% ${info.precipitation_probability.value}</span>
            <img class="weatherIcon" src="${
              icon[info.weather_code.value]
            }"></img>
            <span class="wind">${Math.round(
              info.wind_speed[1].max.value * 3.6
            )} km</span>
            <ul class="list-unstyled min-max">
                <li class="maxTemp">${Math.round(info.temp[1].max.value)}</li>
                <li class="minTemp">${Math.round(info.temp[0].min.value)}</li>
            </ul>
        </div>
    </div>
  `;

    this.weekView.insertAdjacentHTML("beforeend", dayViewContent);
  }

  shortDays() {
    const days = [
      { long: "Pazartesi", short: "Pzt" },
      { long: "Salı", short: "Sal" },
      { long: "Çarşamba", short: "Çar" },
      { long: "Perşembe", short: "Per" },
      { long: "Cuma", short: "Cum" },
      { long: "Cumartesi", short: "Cmt" },
      { long: "Pazar", short: "Paz" },
    ];
    const today = this.date.getTrDay();
    const todayIndex = days.map(day => day.long).indexOf(today);
    const daysAfterToday = days.slice(todayIndex);
    const daysBeforeToday = days.slice(0, todayIndex);
    const daysNew = [...daysAfterToday, ...daysBeforeToday];
    return daysNew;
  }

  addHourly(hourly) {
    console.log("hourly: ", hourly);

    const hoursWeatherData = hourly
      .map(weather => Math.round(weather.temp.value))
      .slice(0, 9);
    console.log("hoursWeatherData: ", hoursWeatherData);
    const chart = new Chartist.Line(
      ".ct-chart",
      {
        labels: this.hoursSort(),

        series: [hoursWeatherData],
      },
      {
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 2,
        }),
        fullWidth: true,
        chartPadding: {
          right: 10,
          left: 10,
        },
        low: 0,
        high: 45,
        onlyInteger: true,
        axisX: {
          offset: 30,
          position: "end",
          labelOffset: {
            x: 0,
            y: 0,
          },
          showLabel: true,
          showGrid: true,
        },
        axisY: {
          offset: 0,
          position: "end",
          labelOffset: {
            x: 0,
            y: 0,
          },
          showLabel: false,
          showGrid: false,
        },
        showArea: true,
        plugins: [
          Chartist.plugins.ctPointLabels({
            textAnchor: "middle",
          }),
        ],
      }
    );
    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 2000 * data.index,
            dur: 2000,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      }
    });
  }

  hoursSort() {
    const hours = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
    ];
    const currentTime = this.date.d.getHours();
    const currentTimeIndex = hours.indexOf(currentTime);
    const hoursAfterCurrentTime = hours.slice(currentTimeIndex);
    const hoursBeforeCurrentTime = hours.slice(0, currentTimeIndex);
    const hoursNew = [
      ...hoursAfterCurrentTime,
      ...hoursBeforeCurrentTime,
    ].slice(0, 9);
    return hoursNew;
  }
}
