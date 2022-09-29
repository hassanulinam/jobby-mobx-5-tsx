import { action, observable } from "mobx";
import apiConst from "../../constants/apiConst";
import { deleteAccessToken, setAccessToken } from "../../utils/accessToken";
import makeAsyncCall from "../../utils/makeAsyncCall";

class AuthStore {
  @observable loginErr = "";
  @observable apiStatus = apiConst.initial;

  // ====================================================
  @action
  setApiStatus(status: string) {
    this.apiStatus = status;
  }

  @action
  onLoginApiSuccess = (onSuccess: () => void) => (data: any) => {
    if (data.jwt_token) {
      this.saveToken(data.jwt_token);
      this.setApiStatus(apiConst.success);
      onSuccess();
    } else this.loginErr = `*${data.error_msg}`;
  };

  @action
  onLoginApiFailure(response: any) {
    const data = response;
    this.loginErr = `*${data.error_msg}`;
    this.setApiStatus(apiConst.failure);
  }

  @action.bound
  async onLogin({ username, password }: any, onSuccess: any) {
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
    };

    await makeAsyncCall(
      { url, options },
      this.onLoginApiSuccess(onSuccess),
      this.onLoginApiFailure
    );
  }

  @action
  onLogout() {
    deleteAccessToken();
    this.resetStore();
  }

  @action
  saveToken(token: string) {
    setAccessToken(token);
  }

  @action
  resetStore() {
    this.loginErr = "";
    this.apiStatus = apiConst.initial;
  }
}

export default AuthStore;
