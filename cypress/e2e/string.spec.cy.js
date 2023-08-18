import {
  CHANGING_COLOR,
  CY_CIRCLE,
  CY_DELAY,
  CY_INPUT,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../constants";

describe("корректная работа кнопки на странице /recursion", () => {
  const testValue = "test";
  beforeEach(() => {
    cy.visit(`/recursion`);
  });

  it("должна начинаться с заблокированной кнопки", () => {
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });

  it("должна становиться активной при вводе данных", () => {
    cy.get(CY_INPUT).type(testValue);
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
  });

  it("должна становиться снова заблокированной при удалении данных", () => {
    cy.get(CY_INPUT).type(testValue);
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
    cy.get(CY_INPUT).clear();
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });
});

describe("визуализация алгоритма", () => {
  const testValue = "qwer";
  beforeEach(() => {
    cy.visit(`/recursion`);
  });

  it("визуализация разворота строки", () => {
    cy.clock();
    cy.get(CY_INPUT).type(testValue);
    cy.get(CY_SUBMIT_BTN).click();
    cy.get(CY_CIRCLE).eq(0).as("0");
    cy.get(CY_CIRCLE).eq(1).as("1");
    cy.get(CY_CIRCLE).eq(2).as("2");
    cy.get(CY_CIRCLE).eq(3).as("3");
    cy.get("@0").should("have.css", "border", CHANGING_COLOR).contains("q");
    cy.get("@1").should("have.css", "border", DEFAULT_COLOR).contains("w");
    cy.get("@2").should("have.css", "border", DEFAULT_COLOR).contains("e");
    cy.get("@3").should("have.css", "border", CHANGING_COLOR).contains("r");
    cy.tick(CY_DELAY);
    cy.get("@0").should("have.css", "border", MODIFIED_COLOR).contains("r");
    cy.get("@1").should("have.css", "border", CHANGING_COLOR).contains("w");
    cy.get("@2").should("have.css", "border", CHANGING_COLOR).contains("e");
    cy.get("@3").should("have.css", "border", MODIFIED_COLOR).contains("q");
    cy.tick(CY_DELAY);
    cy.get("@0").should("have.css", "border", MODIFIED_COLOR).contains("r");
    cy.get("@1").should("have.css", "border", MODIFIED_COLOR).contains("e");
    cy.get("@2").should("have.css", "border", MODIFIED_COLOR).contains("w");
    cy.get("@3").should("have.css", "border", MODIFIED_COLOR).contains("q");
  });
});
