Cypress.config('defaultCommandTimeout', 5000);

describe('sendComment', () => {

  //? Test avec un formulaire complété correctement
  it('success', () => {
    cy.visit('http://localhost:3000/blog/article/1');
    cy.get('#authorName').type('Maxime Authié');
    cy.get('#authorEmail').type('authie.maxime@orange.fr');
    cy.get('#content').type('Contenu du commentaire de test généré par test E2E Cypress')
    cy.get('.button').click();
    cy.get('h6').should('contain', 'Votre commentaire à bien été pris en compte. ');
  })

  //? Test avec aucun input complété
  it('all-inputs-empty', () => {
    cy.visit('http://localhost:3000/blog/article/1');
    cy.get('.button').click();
    cy.get('#error_msg_authorName').should('contain', 'Veuillez saisir votre prénom et votre nom');
    cy.get('#error_msg_empty_authorEmail').should('contain', 'Veuillez saisir votre adresse email');
    cy.get('#error_msg_content').should('contain', 'Veuillez saisir un commentaire');
  })

  //? Test avec tous les inputs complétés sauf #authorName
  it('firstName-input-empty', () => {
    cy.visit('http://localhost:3000/blog/article/1')
    cy.get('#authorEmail').type('authie.maxime@orange.fr');
    cy.get('#content').type('Contenu du commentaire de test généré par test E2E Cypress');
    cy.get('.button').click();
    cy.get('#error_msg_authorName').should('contain', 'Veuillez saisir votre prénom et votre nom');
    cy.get('#error_msg_empty_authorEmail').should('not.exist');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés sauf #email
  it('email-input-empty', () => {
    cy.visit('http://localhost:3000/blog/article/1')
    cy.get('#authorName').type('Maxime Authié');
    cy.get('#content').type('Contenu du commentaire de test généré par test E2E Cypress');
    cy.get('.button').click();
    cy.get('#error_msg_authorName').should('not.exist');
    cy.get('#error_msg_empty_authorEmail').should('contain', 'Veuillez saisir votre adresse email');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés sauf #content
  it('content-input-empty', () => {
    cy.visit('http://localhost:3000/blog/article/1')
    cy.get('#authorName').type('Maxime Authié');
    cy.get('#authorEmail').type('authie.maxime@orange.fr');
    cy.get('.button').click();
    cy.get('#error_msg_authorName').should('not.exist');
    cy.get('#error_msg_empty_authorEmail').should('not.exist');
    cy.get('#error_msg_content').should('contain', 'Veuillez saisir un commentaire');
  })

  //? Test avec tous les inputs complétés et une adresse mail sans @
  it('wrong-email-format-@', () => {
    cy.visit('http://localhost:3000/blog/article/1')
    cy.get('#authorName').type('Maxime Authié');
    cy.get('#authorEmail').type('authie.maximeorange.fr');
    cy.get('#content').type('Contenu du commentaire de test généré par test E2E Cypress');
    cy.get('.button').click();
    cy.get('#error_msg_authorName').should('not.exist');
    cy.get('#error_msg_empty_authorEmail').should('not.exist');
    cy.get('#error_msg_format_authorEmail').should('contain', 'Format de l\'adresse mail incorrect');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés et une adresse mail sans .fr
  it('wrong-email-format-@', () => {
    cy.visit('http://localhost:3000/blog/article/1')
    cy.get('#authorName').type('Maxime Authié');
    cy.get('#authorEmail').type('authie.maxime@orange');
    cy.get('#content').type('Contenu du commentaire de test généré par test E2E Cypress');
    cy.get('.button').click();
    cy.get('#error_msg_authorName').should('not.exist');
    cy.get('#error_msg_empty_authorEmail').should('not.exist');
    cy.get('#error_msg_format_authorEmail').should('contain', 'Format de l\'adresse mail incorrect');
    cy.get('#error_msg_content').should('not.exist');
  })
})