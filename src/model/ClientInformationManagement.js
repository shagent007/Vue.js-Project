/**
 * класс для сохранения и удаления данных с аккаунта
 */
export default class ClientInformationManagement {
  static KEYS = {
    USER_INFORMATION: "userInformation", //данные пользователя
    EMAIL: "email" //данные почты
  };

  /**
   * Сохранение данных пользователя
   *
   * @param obj
   */
  static saveUserInformation(obj) {
    let str = JSON.stringify(obj);
    localStorage.setItem(this.KEYS.USER_INFORMATION, str);
  }

  /**
   * Получение данных пользователей
   *
   * @return {any}
   */
  static getUserInformation() {
    const str = localStorage.getItem(this.KEYS.USER_INFORMATION);
    if (str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        localStorage.removeItem(this.KEYS.USER_INFORMATION);
        return false;
      }
    }
  }

  /**
   * Удаление данныч пользователя
   */
  static deleteUserInformation() {
    localStorage.removeItem(this.KEYS.USER_INFORMATION);
  }

  /**
   * Сохранение почты
   *
   * @param email
   */
  static saveEmail(email) {
    localStorage.setItem(this.KEYS.EMAIL, email);
  }

  /**
   * Получение почты
   *
   * @return {string}
   */
  static getEmail() {
    return localStorage.getItem(this.KEYS.EMAIL);
  }

  /**
   * Удаление почты
   */
  static deleteEmail() {
    localStorage.removeItem(this.KEYS.EMAIL);
  }
}
