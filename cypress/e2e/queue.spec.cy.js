import {
  CHANGING_COLOR,
  CY_CIRCLE,
  CY_CIRCLE_HEAD,
  CY_CIRCLE_TAIL,
  CY_DELAY,
  CY_INPUT,
  CY_REMOVE_BTN,
  CY_RESET_BTN,
  CY_SHORT_DELAY,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
} from "../constants";

describe("корректная работа кнопки на странице /queue", () => {
  const testValue = "test";
  beforeEach(() => {
    cy.visit(`/queue`);
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
  const testArr = ["test", "this", "queu"];
  beforeEach(() => {
    cy.visit(`/queue`);
  });

  it("правильность добавления и удаления элементов в очередь", () => {
    cy.clock();
    cy.get(CY_CIRCLE).eq(0).as("1");
    cy.get(CY_CIRCLE).eq(1).as("2");
    cy.get(CY_CIRCLE).eq(2).as("3");

    for (let i = 0; i < testArr.length; i++) {
      const text = testArr[i];
      const isFirstIteration = i === 0;

      cy.get(CY_INPUT).type(text);
      cy.get(CY_SUBMIT_BTN).click();

      if (isFirstIteration) {
        cy.get("@1").should("have.css", "border", CHANGING_COLOR).contains(text);
      } else {
        cy.get(`@${i}`).should("have.css", "border", DEFAULT_COLOR);
        cy.get(`@${i + 1}`)
          .should("have.css", "border", CHANGING_COLOR)
          .contains(text);
      }

      cy.get(CY_CIRCLE_HEAD).eq(0).contains("head");
      cy.get(CY_CIRCLE_TAIL).eq(i).contains("tail");
      cy.tick(CY_SHORT_DELAY);
    }
    cy.get("@3").should("have.css", "border", DEFAULT_COLOR);
    cy.tick(CY_DELAY);
    // УДАЛЕНИЕ
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE).eq(0).should("have.css", "border", CHANGING_COLOR).contains(testArr[0]);
    cy.get(CY_CIRCLE).eq(1).should("have.css", "border", DEFAULT_COLOR).contains(testArr[1]);
    cy.get(CY_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(testArr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(0).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE).eq(1).should("have.css", "border", DEFAULT_COLOR).contains(testArr[1]);
    cy.get(CY_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(testArr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(1).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE).eq(1).should("have.css", "border", CHANGING_COLOR).contains(testArr[1]);
    cy.get(CY_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(testArr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(1).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.tick(CY_SHORT_DELAY);
    cy.get(CY_CIRCLE).eq(2).should("have.css", "border", DEFAULT_COLOR).contains(testArr[2]);
    cy.get(CY_CIRCLE_HEAD).eq(2).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(2).contains("tail");
    cy.get(CY_REMOVE_BTN).click();
    cy.get(CY_CIRCLE)
      .should("have.length", 7)
      .each(($el) => {
        expect($el).contain("");
      });
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
    cy.get(CY_CIRCLE).each(($el) => {
      expect($el).contain("");
    });
  });
});
