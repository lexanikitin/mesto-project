export default class UserInfo {
  constructor({data}) {
    this._nameSelector = data.name;
    this._aboutSelector = data.about;
    this._avatarSelector = data.avatar;
    this._getUserInfoHandler = data.getUserInfoHandler;
    this._setUserInfoHandler = data.setUserInfoHandler;
  }

  getUserInfo() {
    this._getUserInfoHandler(this._nameSelector, this._aboutSelector, this._avatarSelector);
  }

  setUserInfo(name, about) {
    this._setUserInfoHandler(event, name, about, this._nameSelector, this._aboutSelector);
  }
}
