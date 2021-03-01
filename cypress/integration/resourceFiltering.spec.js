/* eslint-disable no-undef */
/// <reference types="cypress" />
// @ts-check

describe("Pesource page", function () {
  beforeEach(() => {
    cy.server();
    cy.route("GET", "/v2/magazine/edition?page=1&limit=20", "fx:publications");
    cy.route(
      "GET",
      "/v2/magazine/edition?page=1&limit=20&filter*66679",
      "fx:publicationsPlayground"
    );
    cy.visit("/");
  });

  it("Checks Resource header", function () {
    cy.get("h1").should("contain.text", "Resources");
  });

  it("Checks Publications are loaded", function () {
    // Checking that by default first tab is selected
    cy.contains("li", "All Publications").should(
      "have.class",
      "tab-list-active"
    );
    cy.get(".CardsField").find(".ResourceCard").should("have.length", 2);
    cy.contains(".ResourceCard", "My first Publication").should("exist");
    cy.contains(
      ".ResourceCard",
      "White paper marketing eBook UK G (copy 1)"
    ).should("exist");
  });

  it("Checks Publications at Playground Tab", function () {
    cy.contains(".tab-list-item ", "Playground").click();
    cy.get(".CardsField").find(".ResourceCard").should("have.length", 1);
    cy.contains(".ResourceCard", "testing").should("exist");
  });

  it("Checks filtering Publications", function () {
    cy.get(".searchTerm").type("first");
    cy.get(".CardsField").find(".ResourceCard").should("have.length", 1);
    cy.contains(".ResourceCard", "My first Publication").should("exist");
    cy.contains(
      ".ResourceCard",
      "White paper marketing eBook UK G (copy 1)"
    ).should("not.exist");

    cy.get(".searchTerm").clear().type("White");
    cy.get(".CardsField").find(".ResourceCard").should("have.length", 1);
    cy.contains(".ResourceCard", "My first Publication").should("not.exist");
    cy.contains(
      ".ResourceCard",
      "White paper marketing eBook UK G (copy 1)"
    ).should("exist");
  });
});
