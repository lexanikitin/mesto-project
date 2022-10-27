export default class UserInfo {
  constructor({data}) {
    this._nameSelector = data.name;
    this._aboutSelector = data.about;
    this._avatarSelector = data.avatar;
    this._getterUserInfo = data.getterUserInfo;
    this._setterUserInfo = data.setterUserInfo;
  }

  getUserInfo() {
    this._getterUserInfo()
      .then((res) => {
        document.querySelector(this._nameSelector).textContent = res.name;
        document.querySelector(this._aboutSelector).textContent = res.about;
        document.querySelector(this._avatarSelector).src = res.avatar;
        localStorage.setItem('userId', res._id);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке данных с сервера.', err);
      });
  }

  setUserInfo(name, about) {
    this._setterUserInfo(name, about)
      .then((res) => {
        document.querySelector(this._nameSelector).textContent = res.name;
        document.querySelector(this._aboutSelector).textContent = res.about;
      })
      .catch((err) => {
        console.error('Ошибка при сохранении профиля.', err);
      })
      .finally(() => {
      });
  }
}
