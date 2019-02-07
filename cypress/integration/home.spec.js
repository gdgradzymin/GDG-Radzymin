/// <reference types="cypress" />

describe('Home screen tests', ()=>{
    beforeEach(()=> {
        cy.visit('http://localhost:4200');
    })

    it('should have title', ()=>{
        cy.title().should('include', 'GDG Radzymin')
    });

    it('should have meetup btn', ()=>{
        cy.get('.meetup-link').should('be.visible');
        cy.get('.meetup-link').should('have.attr', 'href', 'https://www.meetup.com/GDG-Radzymin/');
        cy.get('.meetup-link').should('have.attr', 'target', '_blank');
    });

    it('should have nav', ()=>{
        cy.get('nav').should('be.visible');
    });

    it('should have tab home', ()=>{
        cy.get('#tab-link-0').should('be.visible');
        cy.get('#tab-link-0').should('have.attr','href','/home');
        cy.get('#tab-link-0').should('have.attr','aria-current','true');
        cy.get('#tab-link-0').should('have.class','mat-tab-label-active');
    });

    it('should have tab events', ()=>{
        cy.get('#tab-link-1').should('be.visible');
        cy.get('#tab-link-1').should('have.attr','href','/events');
        cy.get('#tab-link-1').should('have.attr','aria-current','false');
        cy.get('#tab-link-1').should('not.have.class','mat-tab-label-active');
    });

    it('should have tab team', ()=>{
        cy.get('#tab-link-2').should('be.visible');
        cy.get('#tab-link-2').should('have.attr','href','/team');
        cy.get('#tab-link-2').should('have.attr','aria-current','false');
        cy.get('#tab-link-2').should('not.have.class','mat-tab-label-active');
    });

    it('should have tab blog', ()=>{
        cy.get('#tab-link-3').should('be.visible');
        cy.get('#tab-link-3').should('have.attr','href','/blog');
        cy.get('#tab-link-3').should('have.attr','aria-current','false');
        cy.get('#tab-link-3').should('not.have.class','mat-tab-label-active');
    });

    it('should have tab devfest', ()=>{
        cy.get('#tab-link-4').should('be.visible');
        cy.get('#tab-link-4').should('have.attr','href','/devfest');
        cy.get('#tab-link-4').should('have.attr','aria-current','false');
        cy.get('#tab-link-4').should('not.have.class','mat-tab-label-active');
    });

    it('should have lang dropdown', ()=>{
        cy.get('.lang').should('be.visible');
        cy.get('#lang-select').should('be.visible');


    });
});