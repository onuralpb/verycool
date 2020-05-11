export const weatherInfoConvert = weather => {
  switch (weather) {
    case "rain_heavy":
      return "Yoğun yağmur";
    case "rain":
      return "Yağmurlu";
    case "rain_light":
      return "Hafif yağmurlu";
    case "freezing_rain_heavy":
      return "Şiddetli dondurucu yağmur";
    case "freezing_rain":
      return "Dondurucu yağmur";
    case "freezing_rain_light":
      return "Hafif dondurucu yağmur";
    case "freezing_drizzle":
      return "İnce ince hafif dondurucu yağmur";
    case "drizzle":
      return "Ahmak ıslatan";
    case "ice_pellets_heavy":
      return "Şiddetli dolu";
    case "ice_pellets":
      return "Dolu";
    case "ice_pellets_light":
      return "Hafif dolu";
    case "snow_heavy":
      return "Yoğun kar yağışı";
    case "snow":
      return "Karlı";
    case "snow_light":
      return "Hafif karlı";
    case "flurries":
      return "Sağanak";
    case "tstorm":
      return "Fırtına koşulları";
    case "fog_light":
      return "Hafif sisli";
    case "fog":
      return "Sisli";
    case "cloudy":
      return "Bulutlu";
    case "mostly_cloudy":
      return "Çoğunlukla bulutlu";
    case "partly_cloudy":
      return "Parçalı bulutlu";
    case "mostly_clear":
      return "Çoğunlukla açık";
    case "clear":
      return "Açık";
    default:
      return "Havanın ne bok olduğu belli değil";
  }
};
