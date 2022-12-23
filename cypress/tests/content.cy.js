context('Content Acceptance Tests', () => {
  beforeEach(() => {
    cy.autologin();
  });

  it('As a site administrator I can add a page', function () {
    // given
    cy.visit('/');

    // when
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('This is a page')
      .get('.documentFirstHeading span[data-text]')
      .contains('This is a page');
    cy.get('#toolbar-save').click();

    // then
    cy.contains('This is a page');
    cy.url().should('include', '/this-is-a-page');
  });

  it('As a site administrator I can add a page with text', function () {
    // given
    cy.visit('/');

    // when
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .type('This is a page')
      .get('.documentFirstHeading span[data-text]')
      .contains('This is a page');
    cy.get('.block.inner.text .public-DraftEditor-content')
      .type('This is the text.')
      .get('span[data-text]')
      .contains('This is the text');
    cy.get('#toolbar-save').click();

    // then
    cy.contains('This is a page');
    cy.url().should('include', '/this-is-a-page');
  });
});
