export default class UserInfo {
  constructor({userNameSelector, userJobSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo(){
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }

  setUserInfo(data){
    this._userName.textContent = data.username;
    this._userJob.textContent = data.userjob;
  }
}
