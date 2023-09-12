describe('template spec', () => {
  
  //? Test avec un utilisateur valide et un jwt valide
  it('passes', () => {
    cy.visit('https://www.maximeauthie.fr/api/user/logIn/' + Cypress.env('valid_user') + '/' + Cypress.env('valid_token'));
    cy.get('.admin_content_filters_message_success').should('contain', 'Connexion réussie.');
  })

  //? Test avec un utilisateur valide et un jwt invalide
  it('valid-user-invalid-token', () => {
    cy.visit('https://www.maximeauthie.fr/api/user/logIn/' + Cypress.env('valid_user') + '/' + Cypress.env('invalid_token'));
    cy.get('.admin_content_filters_message_error').should('contain', 'Une erreur est survenue. Merci de vous reconnecter si vous souhaitez accéder à nouveau à l\'espace d\'administration.');
  })

  //? Test avec un utilisateur valide et un jwt valide mais expiré
  it('valid-user-expired-token', () => {
    cy.visit('https://www.maximeauthie.fr/api/user/logIn/' + Cypress.env('valid_user') + '/' + Cypress.env('expired_token'));
    cy.get('.admin_content_filters_message_error').should('contain', 'Le token a expiré. Merci de renouveller votre demande de connexion');
  })

  //? Test avec un utilisateur invalide et un jwt valide
  it('invalid-user-valid-token', () => {
    cy.visit('https://www.maximeauthie.fr/api/user/logIn/' + Cypress.env('invalid_user') + '/' + Cypress.env('valid_token'));
    cy.get('.admin_content_filters_message_error').should('contain', 'Une erreur est survenue. Merci de vous reconnecter si vous souhaitez accéder à nouveau à l\'espace d\'administration.');
  })

  //? Test avec un utilisateur invalide et un jwt invalide
  it('invalid-user-invalid-token', () => {
    cy.visit('https://www.maximeauthie.fr/api/user/logIn/' + Cypress.env('invalid_user') + '/' + Cypress.env('invalid_token'));
    cy.get('.admin_content_filters_message_error').should('contain', 'Une erreur est survenue. Merci de vous reconnecter si vous souhaitez accéder à nouveau à l\'espace d\'administration.');
  })

  //? Test avec un utilisateur invalide et un jwt valide mais expiré
  it('invalid-user-expired-token', () => {
    cy.visit('https://www.maximeauthie.fr/api/user/logIn/' + Cypress.env('invalid_user') + '/' + Cypress.env('expired_token'));
    cy.get('.admin_content_filters_message_error').should('contain', 'Une erreur est survenue. Merci de vous reconnecter si vous souhaitez accéder à nouveau à l\'espace d\'administration.');
  })
})