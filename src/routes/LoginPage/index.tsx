import { observer } from "mobx-react";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useStores } from "../../hooks/useStores";
import { getAccessToken } from "../../utils/accessToken";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authStore } = useStores();
  const history = useHistory();

  const onChangeName = (e: any) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onLogin = (e: any) => {
    e.preventDefault();
    authStore.onLogin({ username, password }, () => {
      history.replace("/");
    });
  };

  const renderForm = () => (
    <form className="login-form-container" onSubmit={onLogin}>
      <img
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        className="login-website-logo"
      />
      <label htmlFor="usernameInput" className="login-form-label">
        USERNAME
      </label>
      <input
        id="usernameInput"
        value={username}
        className="input-field"
        placeholder="Username"
        onChange={onChangeName}
      />
      <label htmlFor="passwordInput" className="login-form-label">
        PASSWORD
      </label>
      <input
        id="passwordInput"
        type="password"
        value={password}
        className="input-field"
        placeholder="Password"
        onChange={onPasswordChange}
      />
      <button type="submit" className="login-btn">
        Login
      </button>
      <p className="error-message">{authStore.loginErr}</p>
    </form>
  );

  const accessToken = getAccessToken();
  if (accessToken !== undefined) return <Redirect to="/" />;
  return <div className="login-route-container">{renderForm()}</div>;
};

export default observer(Login);
