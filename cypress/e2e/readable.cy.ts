/// <reference types="cypress" />

describe('E2E Tests for homepage and librarypage', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should visit the homepage', () => {
      // Already visited in beforeEach, no need to visit again.
    });
  
    it('should display the homepage title', () => {
      cy.contains('Explore new worlds, one book at a time').should('be.visible');
    });
  
    it('should navigate to the library page on button click', () => {
      cy.get('[data-cy="library-button"]').click();
      cy.url().should('include', '/library');
    });
  });