import { observer } from "mobx-react";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useStores } from "../../hooks/useStores";
import { getAccessToken } from "../../utils/accessToken";
import "./index.css";

const Login = (props: any) => {
  const { t } = useTranslation();
  const ns = "login";
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [referrerLocation] = useState<any>(props.location?.state?.referrer);

  const { authStore } = useStores();
  const history = useHistory();

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };
  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    authStore.onLogin({ username, password }, () => {
      history.replace(referrerLocation);
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
        {t("username", { ns })}
      </label>
      <input
        id="usernameInput"
        value={username}
        className="input-field"
        placeholder="Username"
        onChange={onChangeName}
      />
      <label htmlFor="passwordInput" className="login-form-label">
        {t("password", { ns })}
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
        {t("login", { ns })}
      </button>
      <p className="error-message">{authStore.loginErr}</p>
    </form>
  );

  const accessToken = getAccessToken();
  if (accessToken !== undefined) return <Redirect to={referrerLocation} />;
  return <div className="login-route-container">{renderForm()}</div>;
};

export default observer(Login);
