import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import * as stores from "../../stores";
import Header from "../Header";
import i18n from "../../common/i18n";
import { I18nextProvider } from "react-i18next";
import { Suspense } from "react";

describe("tests Header component", () => {
  afterEach(cleanup);
  const mockedOnLogout = jest.fn(() => {
    console.log("signing out..");
  });

  beforeEach(() => {
    render(
      <Suspense fallback="loading...">
        <BrowserRouter>
          <Provider {...stores}>
            <I18nextProvider i18n={i18n}>
              <Header onLogout={mockedOnLogout} />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      </Suspense>
    );
  });

  it("should trigger onLogout method", async () => {
    const logoutBtn = await screen.findByText("logout");
    userEvent.click(logoutBtn);
    expect(mockedOnLogout).toHaveBeenCalled();
  });

  it("should have three link elements", () => {
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);

    expect(links[1]).toHaveTextContent(/home/i);
    expect(links[2]).toHaveTextContent(/jobs/i);
    const websiteLogo = within(links[0]).getByAltText("website logo");
    expect(websiteLogo).toHaveStyle({ height: 36 });
    expect(mockedOnLogout).not.toHaveBeenCalled();
  });
});
