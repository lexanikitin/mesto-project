export default class UserInfo {
  constructor({data}) {
    this.nameSelector = data.name;
    this.aboutSelector = data.about;
    this.avatarSelector = data.avatar;
    this._getUserInfoHandler = data.getUserInfoHandler;
    this._setUserInfoHandler = data.setUserInfoHandler;
  }

  getUserInfo() {
    return this._getUserInfoHandler();
  }

  setUserInfo(name, about) {
    this._setUserInfoHandler(event, name, about, this.nameSelector, this.aboutSelector);
  }

  setNewUserAvatar(link){
    document.querySelector(this.avatarSelector).src = link;
  }
}
