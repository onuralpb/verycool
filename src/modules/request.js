import { loader } from "./loader";
import UI from "./ui";

const ui = new UI();
export default class Request {
  constructor() {
    // json url for Method 2
    // this.url = {
    //   anlik: "http://localhost:5555/anlik", //realtime
    //   saatlik: "http://localhost:5555/saatlik", //hourly
    //   gunluk: "http://localhost:5555/gunluk", //daily
    // };

    // json for json-server
    this.url = [
      "https://api.openweathermap.org/data/2.5/weather?lat=40.998800&lon=29.081584&appid=8ebdb5d6edca925cc6c1acb9b2993eea&units=metric&lang=tr", //realtime
      "http://localhost:5555/saatlik", //hourly
      "https://api.openweathermap.org/data/2.5/forecast?lat=40.998800&lon=29.081584&appid=8ebdb5d6edca925cc6c1acb9b2993eea&units=metric&lang=tr", //daily
    ];
    // this.url = [
    //   "https://api.climacell.co/v3/weather/realtime?lat=40.998800&lon=29.081584&unit_system=si&fields=temp%2Cwind_gust%2Cfeels_like%2Cdewpoint%2Chumidity%2Cwind_speed%2Croad_risk_score%2Csunrise%2Csunset%2Cweather_code&apikey=bQQaqHmphXXE0qAAz47HTvl5FCfNkd87", //realtime
    //   "https://api.climacell.co/v3/weather/forecast/hourly?lat=40.998800&lon=29.081584&unit_system=si&start_time=now&fields=temp&apikey=bQQaqHmphXXE0qAAz47HTvl5FCfNkd87", //hourly
    //   "https://api.climacell.co/v3/weather/forecast/daily?lat=40.998800&lon=29.081584&unit_system=si&start_time=now&fields=temp%2Cwind_speed%2Cprecipitation_probability%2Cweather_code&apikey=bQQaqHmphXXE0qAAz47HTvl5FCfNkd87", //daily
    // ];
  }

  async getAllData() {
    loader(true, ui.weekView);
    try {
      return await Promise.all(
        this.url.map(url => fetch(url).then(response => response.json()))
      ).then(data => {
        loader(false);
        return {
          realTime: data[0],
          hourly: data[1],
          daily: data[2],
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  ////////////
  // Method 2 for multiple fetch data with promise
  ////////////

  // async getAllData() {
  //   return Promise.all([
  //     this.getDataRealtime(),
  //     this.getDataHourly(),
  //     this.getDataDaily(),
  //   ]).then(data => {
  //     return {
  //       realTime: data[0],
  //       hourly: data[1],
  //       daily: data[2],
  //     };
  //   });
  // }

  // async getDataRealtime() {
  //   const response = await fetch(this.url.anlik);
  //   const responseData = await response.json();
  //   return responseData;
  // }

  // getDataHourly() {
  //   return new Promise((resolve, reject) => {
  //     fetch(this.url.saatlik)
  //       .then(response => response.json())
  //       .then(data => resolve(data))
  //       .catch(err => reject(err));
  //   });
  // }

  // getDataDaily() {
  //   return new Promise((resolve, reject) => {
  //     fetch(this.url.gunluk)
  //       .then(response => response.json())
  //       .then(data => resolve(data))
  //       .catch(err => reject(err));
  //   });
  // }
}
