Cypress.config('defaultCommandTimeout', 5000);

describe('sendContactMail', () => {

  //? Test avec un formulaire complété correctement
  it('success', () => {
    cy.visit('http://localhost:3000/contact')
    cy.wait(2000);
    cy.get('#firstName').type('Maxime')
    cy.get('#lastName').type('Authié')
    cy.get('#email').type('authie.maxime@orange.fr')
    cy.get('#subject').type('Message de test généré par test E2E Cypress')
    cy.get('#content').type('Contenu du message de test généré par test E2E Cypress')
    cy.get('form > .button').click();
    cy.get('h4').should('contain', 'Votre message à bien été envoyé.');
  })

  //? Test avec aucun input complété
  it('all-inputs-empty', () => {
    cy.visit('http://localhost:3000/contact')
    cy.wait(2000);
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('contain', 'Veuillez saisir votre prénom');
    cy.get('#error_msg_lastName').should('contain', 'Veuillez saisir votre nom');
    cy.get('#error_msg_empty_email').should('contain', 'Veuillez saisir votre adresse mail');
    cy.get('#error_msg_subject').should('contain', 'Veuillez saisir un sujet pour votre message');
    cy.get('#error_msg_content').should('contain', 'Veuillez saisir un message');
  })

  //? Test avec tous les inputs complétés sauf #firstName
  it('firstName-input-empty', () => {
    cy.visit('http://localhost:3000/contact')
    cy.wait(2000);
    cy.get('#lastName').type('Authié');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#subject').type('Message de test généré par test E2E Cypress');
    cy.get('#content').type('Contenu du message de test généré par test E2E Cypress');
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('contain', 'Veuillez saisir votre prénom');
    cy.get('#error_msg_lastName').should('not.exist');
    cy.get('#error_msg_empty_email').should('not.exist');
    cy.get('#error_msg_subject').should('not.exist');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés sauf #lastName
  it('lastName-input-empty', () => {
    cy.visit('http://localhost:3000/contact');
    cy.wait(2000);
    cy.get('#firstName').type('Maxime');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#subject').type('Message de test généré par test E2E Cypress');
    cy.get('#content').type('Contenu du message de test généré par test E2E Cypress');
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('not.exist');
    cy.get('#error_msg_lastName').should('contain', 'Veuillez saisir votre nom');
    cy.get('#error_msg_empty_email').should('not.exist');
    cy.get('#error_msg_subject').should('not.exist');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés sauf #email
  it('email-input-empty', () => {
    cy.visit('http://localhost:3000/contact');
    cy.wait(2000);
    cy.get('#firstName').type('Maxime');
    cy.get('#lastName').type('Authié');
    cy.get('#subject').type('Message de test généré par test E2E Cypress');
    cy.get('#content').type('Contenu du message de test généré par test E2E Cypress');
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('not.exist');
    cy.get('#error_msg_lastName').should('not.exist');
    cy.get('#error_msg_empty_email').should('contain', 'Veuillez saisir votre adresse mail');
    cy.get('#error_msg_subject').should('not.exist');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés sauf #subject
  it('subject-input-empty', () => {
    cy.visit('http://localhost:3000/contact');
    cy.wait(2000);
    cy.get('#firstName').type('Maxime');
    cy.get('#lastName').type('Authié');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#content').type('Contenu du message de test généré par test E2E Cypress');
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('not.exist');
    cy.get('#error_msg_lastName').should('not.exist');
    cy.get('#error_msg_empty_email').should('not.exist');
    cy.get('#error_msg_subject').should('contain', 'Veuillez saisir un sujet pour votre message');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés sauf #content
  it('content-input-empty', () => {
    cy.visit('http://localhost:3000/contact');
    cy.wait(2000);
    cy.get('#firstName').type('Maxime');
    cy.get('#lastName').type('Authié');
    cy.get('#email').type('authie.maxime@orange.fr');
    cy.get('#subject').type('Message de test généré par test E2E Cypress');
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('not.exist');
    cy.get('#error_msg_lastName').should('not.exist');
    cy.get('#error_msg_empty_email').should('not.exist');
    cy.get('#error_msg_subject').should('not.exist');
    cy.get('#error_msg_content').should('contain', 'Veuillez saisir un message');
  })

  //? Test avec tous les inputs complétés et une adresse mail sans @
  it('wrong-email-format-@', () => {
    cy.visit('http://localhost:3000/contact');
    cy.wait(2000);
    cy.get('#firstName').type('Maxime');
    cy.get('#lastName').type('Authié');
    cy.get('#email').type('authie.maximeorange.fr');
    cy.get('#subject').type('Message de test généré par test E2E Cypress');
    cy.get('#content').type('Contenu du message de test généré par test E2E Cypress');
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('not.exist');
    cy.get('#error_msg_lastName').should('not.exist');
    cy.get('#error_msg_empty_email').should('not.exist');
    cy.get('#error_msg_format_email').should('contain', 'Format de l\'adresse mail incorrect');
    cy.get('#error_msg_subject').should('not.exist');
    cy.get('#error_msg_content').should('not.exist');
  })

  //? Test avec tous les inputs complétés et une adresse mail sans .fr
  it('wrong-email-format-fr', () => {
    cy.visit('http://localhost:3000/contact');
    cy.wait(2000);
    cy.get('#firstName').type('Maxime');
    cy.get('#lastName').type('Authié');
    cy.get('#email').type('authie.maxime@orange');
    cy.get('#subject').type('Message de test généré par test E2E Cypress');
    cy.get('#content').type('Contenu du message de test généré par test E2E Cypress');
    cy.get('form > .button').click();
    cy.get('#error_msg_firstName').should('not.exist');
    cy.get('#error_msg_lastName').should('not.exist');
    cy.get('#error_msg_empty_email').should('not.exist');
    cy.get('#error_msg_format_email').should('contain', 'Format de l\'adresse mail incorrect');
    cy.get('#error_msg_subject').should('not.exist');
    cy.get('#error_msg_content').should('not.exist');
  })
})