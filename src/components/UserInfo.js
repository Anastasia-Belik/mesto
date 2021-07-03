export default class UserInfo {
  constructor({userNameSelector, userJobSelector, userAvatarSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo(){
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }

  setUserInfo(data){
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
