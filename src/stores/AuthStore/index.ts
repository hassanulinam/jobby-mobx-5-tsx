import { action, observable } from "mobx";
import ApiConstType from "../../constants/apiConst";
import { deleteAccessToken, setAccessToken } from "../../utils/accessToken";
import makeAsyncCall from "../../utils/makeAsyncCall";
import { requestObj, responseData } from "./types";

class AuthStore {
  @observable loginErr = "";
  @observable apiStatus = ApiConstType.initial;

  // ====================================================
  @action
  setApiStatus(status: ApiConstType) {
    this.apiStatus = status;
  }

  @action
  onLoginApiSuccess = (onSuccess: () => void) => (data: responseData) => {
    if (data.jwt_token) {
      this.saveToken(data.jwt_token);
      this.setApiStatus(ApiConstType.success);
      onSuccess();
    } else this.loginErr = `*${data.error_msg}`;
  };

  @action
  onLoginApiFailure(response: responseData) {
    const data = response;
    this.loginErr = `*${data.error_msg}`;
    this.setApiStatus(ApiConstType.failure);
  }

  @action.bound
  async onLogin({ username, password }: requestObj, onSuccess: () => void) {
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

  @action.bound
  onLogout() {
    deleteAccessToken();
    this.resetStore();
  }

  @action
  saveToken(token: string) {
    setAccessToken(token);
  }

  @action.bound
  resetStore() {
    this.loginErr = "";
    this.apiStatus = ApiConstType.initial;
  }
}

export default AuthStore;
