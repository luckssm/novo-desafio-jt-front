/// <reference types="cypress" />

let baseTestAPIUrl = Cypress.env("baseTestAPIUrl");

describe("main-tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept(baseTestAPIUrl).as("baseApiCall");
  });

  it('checks the "Saiba mais" button leads to the correct ticket details page', () => {
    let homeTicketName;

    cy.get('[data-test="ticket-name"]')
      .first()
      .then(($value) => {
        homeTicketName = $value.text();
      });

    cy.contains("Saber mais").first().click();

    cy.get('[data-test="ticket-name-details"]').should(($value) => {
      const detailsPageTicketName = $value.text();
      expect(homeTicketName).equal(detailsPageTicketName);
    });
  });

  it("Add items to cart, remove one and proceed to checkout", () => {
    // Gets ticket details
    cy.contains("Saber mais").first().click();

    // Adds tickets to cart
    cy.contains("Comprar Ingresso").click();
    cy.contains("Comprar Ingresso").click();

    // Open the cart popover
    cy.get('[data-test="cart-button"]').click();

    // Removes item from cart
    cy.get('[data-test="remove-item"]').first().click();

    // Closes cart
    cy.contains("Ir para o check out").click();

    cy.get('[data-test="cart-counter"]').then(($value) => {
      const cartCounter = $value.text();
      expect(cartCounter).equal("0");
    });
  });
});
