/// <reference types="cypress" />

describe("Home screen tests", () => {
  before(() => {
    cy.visit("/");
  });
  beforeEach(() => {});

  it("should have title", () => {
    cy.title().should("include", "GDG Radzymin");
  });

  it("should have meetup btn", () => {
    cy.get(".meetup-link").should("be.visible");
    // cy.get(".meetup-link").should(
    //   "have.attr",
    //   "href",
    //   "https://www.meetup.com/GDG-Radzymin/"
    // );
    cy.get(".meetup-link").should("have.attr", "target", "_blank");
  });

  it("should have nav", () => {
    cy.get("nav").should("be.visible");
  });

  it("should have tab home", () => {
    cy.get("#tab-link-0").should("be.visible");
    cy.get("#tab-link-0").should("have.attr", "href", "/home");
    cy.get("#tab-link-0").should("have.attr", "aria-current", "true");
    cy.get("#tab-link-0").should("have.class", "mat-tab-label-active");
  });

  it("should have tab events", () => {
    cy.get("#tab-link-1").should("be.visible");
    cy.get("#tab-link-1").should("have.attr", "href", "/events");
    cy.get("#tab-link-1").should("have.attr", "aria-current", "false");
    cy.get("#tab-link-1").should("not.have.class", "mat-tab-label-active");
  });

  it("should have tab team", () => {
    cy.get("#tab-link-2").should("be.visible");
    cy.get("#tab-link-2").should("have.attr", "href", "/team");
    cy.get("#tab-link-2").should("have.attr", "aria-current", "false");
    cy.get("#tab-link-2").should("not.have.class", "mat-tab-label-active");
  });

  it("should have tab blog", () => {
    cy.get("#tab-link-3").should("be.visible");
    cy.get("#tab-link-3").should("have.attr", "href", "/blog");
    cy.get("#tab-link-3").should("have.attr", "aria-current", "false");
    cy.get("#tab-link-3").should("not.have.class", "mat-tab-label-active");
  });

  it("should have tab devfest", () => {
    cy.get("#tab-link-4").should("be.visible");
    cy.get("#tab-link-4").should("have.attr", "href", "/devfest");
    cy.get("#tab-link-4").should("have.attr", "aria-current", "false");
    cy.get("#tab-link-4").should("not.have.class", "mat-tab-label-active");
  });

  it("should have lang dropdown", () => {
    cy.get(".lang").should("be.visible");
    cy.get("#lang-select").should("be.visible");
  });

  it("should have logo redirecting to the main page", () => {
    cy.get("[data-cy=logo-home]").should("be.visible");
    cy.get("[data-cy=logo-home]").should("have.attr", "href", "/");
  });

  it("should have footer section", () => {
    cy.get("[data-cy=footer-section]").should("exist");
  });

  it("should have icons inside footer", () => {
    cy.get("[data-cy=footer-meetup-link]").should("exist");
    cy.get("[data-cy=footer-twitter-link]").should("exist");
    cy.get("[data-cy=footer-facebook-link]").should("exist");
    cy.get("[data-cy=footer-youtube-link]").should("exist");
    cy.get("[data-cy=footer-github-link]").should("exist");
    cy.get("[data-cy=footer-email-link]").should("exist");
  });
});

describe("Home screen test mobile", () => {
  before(() => {
    cy.viewport("iphone-5");
    cy.visit("/");
  });

  beforeEach(() => {
    cy.viewport("iphone-5");
  });

  it("should have hidden nav", () => {
    cy.get("nav").should("exist");
    cy.get("nav").should("not.be.visible");
  });

  it("should have toggle side menu btn", () => {
    cy.get("[data-cy=side-menu-btn]").should("be.visible");
  });

  it("should have side menu hidden", () => {
    cy.get("[data-cy=sidenav]").should("exist");
    cy.get("[data-cy=sidenav]").should("not.be.visible");
    cy.get("[data-cy=sidenav-list]").should("exist");
    cy.get("[data-cy=sidenav-list]").should("not.be.visible");
  });

  it("should have lang dropdown", () => {
    cy.get(".lang").should("be.visible");
    cy.get("#lang-select").should("be.visible");
  });

  it("should have logo redirecting to the main page", () => {
    cy.get("[data-cy=logo-home]").should("be.visible");
    cy.get("[data-cy=logo-home]").should("have.attr", "href", "/");
  });

  it("should have footer section", () => {
    cy.get("[data-cy=footer-section]").should("exist");
  });

  it("should have icons inside footer", () => {
    cy.get("[data-cy=footer-meetup-link]").should("exist");
    cy.get("[data-cy=footer-twitter-link]").should("exist");
    cy.get("[data-cy=footer-facebook-link]").should("exist");
    cy.get("[data-cy=footer-youtube-link]").should("exist");
    cy.get("[data-cy=footer-github-link]").should("exist");
    cy.get("[data-cy=footer-email-link]").should("exist");
  });
});

describe("Home scren mobile side menu toggle btn", () => {
  before(() => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.viewport("iphone-5");
  });

  it("should open side menu", () => {
    cy.get("[data-cy=side-menu-btn]").click();
    cy.get("[data-cy=sidenav]").should("exist");
    cy.get("[data-cy=sidenav]").should("be.visible");
    cy.get("[data-cy=sidenav-list]").should("exist");
    cy.get("[data-cy=sidenav-list]").should("be.visible");
    cy.get(".mat-drawer-backdrop").click("right");
  });

  it("should close side menu", () => {
    cy.get("[data-cy=side-menu-btn]").click();
    cy.get(".mat-drawer-backdrop").click("right");
    cy.get("[data-cy=sidenav]").should("exist");
    cy.get("[data-cy=sidenav]").should("not.be.visible");
    cy.get("[data-cy=sidenav-list]").should("exist");
    cy.get("[data-cy=sidenav-list]").should("not.be.visible");
  });
});

describe("Home screen mobile side menu test", () => {
  before(() => {
    cy.viewport("iphone-5");
    cy.visit("/");
  });

  beforeEach(() => {
    cy.viewport("iphone-5");
    cy.get("[data-cy=side-menu-btn]").click();
  });
  afterEach(() => {
    cy.get(".mat-drawer-backdrop").click("right");
  });

  it("should contain nav in side menu", () => {
    cy.get("#sideMenuLinkhome").should("be.visible");
    cy.get("#sideMenuLinkhome").should("have.attr", "href", "/home");

    cy.get("#sideMenuLinkevents").should("be.visible");
    cy.get("#sideMenuLinkevents").should("have.attr", "href", "/events");

    cy.get("#sideMenuLinkteam").should("be.visible");
    cy.get("#sideMenuLinkteam").should("have.attr", "href", "/team");

    cy.get("#sideMenuLinkblog").should("be.visible");
    cy.get("#sideMenuLinkblog").should("have.attr", "href", "/blog");

    cy.get("#sideMenuLinkdevfest").should("be.visible");
    cy.get("#sideMenuLinkdevfest").should("have.attr", "href", "/devfest");
  });

  it("should contain logo in side menu", () => {
    cy.get(".sidenav-header > img").should("be.visible");
  });
});

describe("Home screen navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to events", ()=>{
    cy.get("#tab-link-1").click().then(()=>{
        cy.url().should("include", "events");
    });
  });

  it("should navigate to team", ()=>{
    cy.get("#tab-link-2").click().then(()=>{
        cy.url().should("include", "team");
    });
  });

  it("should navigate to blog", ()=>{
    cy.get("#tab-link-3").click().then(()=>{
        cy.url().should("include", "blog");
    });
  });

  it("should navigate to devfest", ()=>{
    cy.get("#tab-link-4").click().then(()=>{
        cy.url().should("include", "devfest");
    });
  });
});
