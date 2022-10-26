import FailureView from ".";
import cypress from "cypress";

const obj1 = {
  myRetry() {},
};

describe("<FailureView>", () => {
  it("mounts", () => {
    cy.spy(obj1, "myRetry").as("ret1");

    cy.mount(<FailureView retryMethod={obj1.myRetry} />);

    cy.get(".retry-btn").click();

    cy.get("@ret1").should("have.been.called");
    obj1.myRetry();

    expect(obj1.myRetry).to.be.called;
  });
});
