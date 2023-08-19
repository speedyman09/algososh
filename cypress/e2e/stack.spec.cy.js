import {
  CHANGING_COLOR,
  CY_CIRCLE,
  CY_DELAY,
  CY_INPUT,
  CY_REMOVE_BTN,
  CY_RESET_BTN,
  CY_SHORT_DELAY,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
} from "../constants";

describe("корректная работа кнопки на странице /stack", () => {
  const testValue = "test";
  beforeEach(() => {
    cy.visit(`/stack`);
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
  const testArr = ["FE", "DM", "PT"];
  beforeEach(() => {
    cy.visit(`/stack`);
  });

  it("правильность добавления и удаления элементов в стеке", () => {
    cy.clock();
    // ДОБАВЛЕНИЕ
    for (let i = 0; i < testArr.length; i++) {
      cy.get("input").type(testArr[i]);
      cy.get(CY_SUBMIT_BTN).click();
      for (let j = 0; j <= i; j++) {
        cy.get(CY_CIRCLE)
          .eq(j)
          .should("have.css", "border", j === i ? CHANGING_COLOR : DEFAULT_COLOR)
          .contains(testArr[j]);
      }
      cy.tick(CY_SHORT_DELAY);
      for (let j = 0; j <= i; j++) {
        cy.get(CY_CIRCLE).eq(j).should("have.css", "border", DEFAULT_COLOR).contains(testArr[j]);
      }
    }
    cy.get(CY_CIRCLE).should("have.length", 3);
    cy.tick(CY_DELAY);
    // УДАЛЕНИЕ
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE).eq(0).should("have.css", "border", DEFAULT_COLOR).contains(testArr[0]);
    cy.get(CY_CIRCLE).eq(1).should("have.css", "border", DEFAULT_COLOR).contains(testArr[1]);
    cy.get(CY_CIRCLE).eq(2).should("have.css", "border", CHANGING_COLOR).contains(testArr[2]);
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE).eq(0).should("have.css", "border", DEFAULT_COLOR).contains(testArr[0]);
    cy.get(CY_CIRCLE).eq(1).should("have.css", "border", CHANGING_COLOR).contains(testArr[1]);
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE).eq(0).should("have.css", "border", CHANGING_COLOR).contains(testArr[0]);
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE).should("have.length", 0).should("not.exist");
  });

  it("поведение кнопки «Очистить»", () => {
    cy.clock();
    cy.get(CY_RESET_BTN).should("be.disabled");
    for (let k = 0; k < testArr.length; k++) {
      cy.get(CY_INPUT).type(testArr[k]);
      cy.get(CY_SUBMIT_BTN).click();
      cy.tick(CY_SHORT_DELAY);
    }
    cy.get(CY_RESET_BTN).should("not.be.disabled").click();
    cy.get(CY_CIRCLE).should("not.exist");
  });
});
