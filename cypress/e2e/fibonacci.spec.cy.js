import { CY_CIRCLE, CY_INPUT, CY_SHORT_DELAY, CY_SUBMIT_BTN, DEFAULT_COLOR, FIBBONACHI_NUMBERS } from "../constants";

describe("корректная работа кнопки на странице /recursion", () => {
  const testValue = 10;
  beforeEach(() => {
    cy.visit(`/fibonacci`);
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
  const testValue = 6; // от 0 до 10
  before(() => {
    cy.visit(`/fibonacci`);
  });

  it("визуализация добавление чисел", () => {
    cy.clock();
    cy.get(CY_INPUT).type(testValue);
    cy.get(CY_SUBMIT_BTN).click();
    for (let i = 0; i <= testValue; i++) {
      cy.tick(CY_SHORT_DELAY);
      for (let j = 0; j <= i; j++) {
        cy.get(CY_CIRCLE).eq(j).should("have.css", "border", DEFAULT_COLOR).contains(FIBBONACHI_NUMBERS[j]);
      }
    }
  });
});
