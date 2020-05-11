export class DateFormat {
  constructor() {
    this.days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    this.months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    this.d = new Date();
    this.getTrDate = this.d.getDate();
  }
  getTrDay() {
    return this.days[this.d.getDay()];
  }
  getTrMonth() {
    return this.months[this.d.getMonth()];
  }
}
