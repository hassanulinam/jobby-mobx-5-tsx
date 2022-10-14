import {
  cleanup,
  findByText,
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../routes/LoginPage";
import { Provider } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
import Home from "../../routes/HomePage";
import { BrowserRouter } from "react-router-dom";

function fetchGreeting() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("resolving after 1000ms"), 10000);
  });
}
afterEach(cleanup);
/*
jest.mock("../../stores/AuthStore");

describe("testing method triggers in AuthStore", () => {

  test("check whether onLogin() method is triggered", async () => {
    const authStore = new AuthStore();

    authStore.onLogin = jest.fn().mockImplementation(() => {
      console.log("mocking AuthStore.onLogin()");
    });

    render(
      <Provider authStore={authStore}>
        <LoginPage />
      </Provider>
    );

    // act
    userEvent.click(screen.getByText("Login"));
    await screen.findByTestId("login-err");

    //assert
    expect(authStore.onLogin).toHaveBeenCalled();
  });
});
*/

// it("test error msg with wrong username and password", async () => {
//   const authStore = new AuthStore();
//   render(
//     <Provider authStore={authStore}>
//       <LoginPage />
//     </Provider>
//   );

//   // act
//   userEvent.type(screen.getByLabelText(/username/i), "hassanwqer");
//   // userEvent.type(screen.getByLabelText(/password/i), "dflkgj eiur");
//   fireEvent.change(screen.getByLabelText(/password/i), {
//     target: { value: "23489wueejk" },
//   });
//   userEvent.click(screen.getByText("Login"));

//   //assert
//   await waitFor(() => {
//     expect(screen.getByTestId("login-err")).toHaveTextContent(
//       "*invalid username"
//     );
//   });

//   // same assertion
//   const loginErr = await screen.findByText("*invalid username");
//   expect(loginErr).toBeInTheDocument();
// });

// it("should select H1 from Home Component", async () => {
//   const authStore = new AuthStore();
//   render(
//     <BrowserRouter>
//       <Provider authStore={authStore}>
//         <Home />
//       </Provider>
//     </BrowserRouter>
//   );
//   const homeContainer = screen.getByTestId("home-container");
//   const headingEl = within(homeContainer).getByRole("heading");

//   //assert
//   expect(headingEl).toHaveTextContent(/job/i);
// });

test("should use fakeTimers", async () => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
  fetchGreeting();

  expect(setTimeout).toHaveBeenCalled();
});
