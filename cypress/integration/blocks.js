context('Blocks Acceptance Tests', () => {
  describe('Text Block Tests', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-page',
        contentTitle: 'My Page',
      });
      cy.visit('/my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page');
      cy.navigate('/my-page/edit');
      cy.get(`.block.title [data-contents]`);
    });

    it('As editor I can add a Teaser Grid', function () {
      // Adding Document for Teaser Grid reference
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-page',
        contentTitle: 'My Page',
      });
      // Adding Image for Teaser Grid Image
      cy.createContent({
        contentType: 'Image',
        contentId: 'my-image',
        contentTitle: 'My Image',
      });
      // creating Teaser Grid block in edit mode
      cy.visit('/document/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.teaserGrid').click();
      cy.findByText('2 columns').click();
      cy.get(
        '.teaserGrid.two [data-rbd-draggable-context-id]:first-child',
      ).click();
      cy.get(
        '#sidebar-properties .inline.field.text:first-of-type() .objectbrowser-field:first-of-type() .ui.button.action svg',
      ).click();
      cy.findByText('My Page', { selector: 'span' }).click();
      // This is because the objectbrowser doesn't shows the content
      cy.wait(500);
      cy.get(
        '#sidebar-properties .inline.field.text:nth-of-type(4) .objectbrowser-field:first-of-type() .ui.button.action svg',
      ).click();
      cy.findByText('My Image', { selector: 'span' }).click();
      cy.get(
        '.teaserGrid.two [data-rbd-draggable-context-id]:nth-child(2)',
      ).click();
      cy.get(
        '#sidebar-properties .inline.field.text:first-of-type() .objectbrowser-field:first-of-type() .ui.button.action svg',
      ).click();
      cy.findByText('My Page', { selector: 'span' }).click();
      // This is because the objectbrowser doesn't shows the content
      cy.wait(500);
      cy.get(
        '#sidebar-properties .inline.field.text:nth-of-type(4) .objectbrowser-field:first-of-type() .ui.button.action svg',
      ).click();
      cy.findByText('My Image', { selector: 'span' }).click();
      cy.get('#toolbar-save').click();

      //then we are able to get the My Page in view Mode.
      cy.findAllByText('My Page').should('exist');
    });

    it('As editor I can add an Image Grid', function () {
      // Adding Image
      cy.createContent({
        contentType: 'Image',
        contentId: 'my-image',
        contentTitle: 'My Image',
        path: '/de',
      });
      // creating Image Grid in edit mode
      cy.visit('/document/edit');
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .mostUsed .button.imagesGrid').click();
      cy.findByText('2 Bilder').click();
      cy.get('.field-url-0-action-button').click();
      cy.findByText('My Image').click();
      cy.get('.clearSVG').click();
      cy.findByText('Grid Bild 2').click();
      cy.get('.field-url-1-action-button').click();
      cy.findByText('My Image').click();
      cy.get('.clearSVG').click();

      cy.get('#toolbar-save').click();

      //then we should have AltText My Image present in view mode
      cy.findAllByAltText('My Image').should('exist');
    });

    // Basic, Volto ones
    it('As editor I can add a text block', () => {
      // when I add a text block
      cy.get('.block.inner.text .public-DraftEditor-content')
        .click()
        .type('My text')
        .get('span[data-text]')
        .contains('My text');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + 'my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page');

      // then the page view should contain the text block
      cy.get('#page-document p').contains('My text');
    });

    it('As editor I can add a link to a text block', function () {
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block');

      // when I create a link
      cy.get('.block.inner.text .public-DraftEditor-content')
        .type('Colorless green ideas sleep furiously.')
        .setSelection('furiously');
      cy.get(
        '#page-edit .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3)',
      ).click();
      cy.get('.link-form-container input').type('https://google.com{enter}');
      cy.get('#toolbar-save').click();
      cy.url().should('eq', Cypress.config().baseUrl + 'my-page');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page');

      // then the page view should contain a link
      cy.get('.ui.container p').contains(
        'Colorless green ideas sleep furiously.',
      );
      cy.get('.ui.container p a')
        .should('have.attr', 'href')
        .and('include', 'https://google.com');
    });
  });
});
