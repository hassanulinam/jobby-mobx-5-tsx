import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as stores from "./stores";
import { Provider } from "mobx-react";
import { I18nextProvider } from "react-i18next";
import i18n from "./common/i18n";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading...">
      <BrowserRouter>
        <Provider {...stores}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
