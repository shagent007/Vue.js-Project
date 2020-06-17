export default class AllDate {
  //месяцы в отсортерованом состоянии
  static months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Майя",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
  ];

  //получить название месяца по его номеру (1..12)
  static getMonthNumber(numberMonth) {
    return this.months[numberMonth - 1];
  }
  //получить номер месяца по его названию
  static getNumberMonth(monthName) {
    const callBack = elem => {
      return elem.toLowerCase() === monthName.toLowerCase();
    };
    return this.months.findIndex(callBack);
  }
  //получение возраста (1..12)
  static getAge(date) {
    const nowDate = new Date();
    const difference =
      nowDate.getMonth() - (date.month - 1) > 0 ||
      (nowDate.getMonth() - date.month === 0 &&
        nowDate.getDay() - date.day >= 0)
        ? 0
        : -1;
    return nowDate.getFullYear() - date.year + difference;
  }
}
