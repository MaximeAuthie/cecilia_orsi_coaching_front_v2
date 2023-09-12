Cypress.config('defaultCommandTimeout', 5000);

describe('logIn', () => {

  //? Test avec un formulaire complété correctement
  it('success', () => {
    cy.visit('https://www.cecilia-orsi-coaching.com/managerApp/logIn');
    cy.wait(2000);
    cy.get('#email').type(Cypress.env('admin_email'));
    cy.get('#password').type(Cypress.env('admin_password'));
    cy.get('#log_in').click();
    cy.get('#email').should('have.class', 'admin_input_form');
    cy.get('#email_empty_msg').should('contain', '');
    cy.get('#password').should('have.class', 'admin_input_form');
    cy.get('#password_empty_msg').should('contain', '');
    cy.get('#success_message').should('contain', 'Un email de double indentification vient d\'être envoyé à');
    cy.get('#error_message').should('not.exist');
  })

  //? Test avec aucun input complété
  it('all-inputs-empty', () => {
    cy.visit('https://www.cecilia-orsi-coaching.com/managerApp/logIn');
    cy.wait(2000);
    cy.get('#log_in').click();
    cy.get('#email').should('have.class', 'bad_admin_input_form');
    cy.get('#email_empty_msg').should('contain', 'Veuillez saisir votre email de connexion');
    cy.get('#password').should('have.class', 'bad_admin_input_form');
    cy.get('#password_empty_msg').should('contain', 'Veuillez saisir votre mot de passe');
    cy.get('#success_message').should('not.exist');
    cy.get('#error_message').should('not.exist');
  })

  //? Test avec l'imput email vide
  it('email-inputs-empty', () => {
    cy.visit('https://www.cecilia-orsi-coaching.com/managerApp/logIn');
    cy.wait(2000);
    cy.get('#password').type(Cypress.env('admin_password'));
    cy.get('#log_in').click();
    cy.get('#email').should('have.class', 'bad_admin_input_form');
    cy.get('#email_empty_msg').should('contain', 'Veuillez saisir votre email de connexion');
    cy.get('#password').should('have.class', 'admin_input_form');
    cy.get('#password_empty_msg').should('contain', '');
    cy.get('#success_message').should('not.exist');
    cy.get('#error_message').should('not.exist');
  })

  //? Test avec l'imput password vide
  it('password-inputs-empty', () => {
    cy.visit('https://www.cecilia-orsi-coaching.com/managerApp/logIn');
    cy.wait(2000);
    cy.get('#email').type(Cypress.env('admin_email'));
    cy.get('#log_in').click();
    cy.get('#email').should('have.class', 'admin_input_form');
    cy.get('#email_empty_msg').should('contain', '');
    cy.get('#password').should('have.class', 'bad_admin_input_form');
    cy.get('#password_empty_msg').should('contain', 'Veuillez saisir votre mot de passe');
    cy.get('#success_message').should('not.exist');
    cy.get('#error_message').should('not.exist');
  })

  //? Test avec une adresse email erronée
  it('wrong-email', () => {
    cy.visit('https://www.cecilia-orsi-coaching.com/managerApp/logIn');
    cy.wait(2000);
    cy.get('#email').type('test.maxime@error.com');
    cy.get('#email').should('have.class', 'admin_input_form');
    cy.get('#email_empty_msg').should('contain', '');
    cy.get('#password').type(Cypress.env('admin_password'));
    cy.get('#password').should('have.class', 'admin_input_form');
    cy.get('#password_empty_msg').should('contain', '');
    cy.get('#log_in').click();
    cy.get('#success_message').should('not.exist');
    cy.get('#error_message').should('contain', 'Connexion refusée : l\'identifiant et/ou le mot de passe n\'est pas correct');
  })

  //? Test avec un mot de passe erronée
  it('wrong-password', () => {
    cy.visit('https://www.cecilia-orsi-coaching.com/managerApp/logIn');
    cy.wait(2000);
    cy.get('#email').type(Cypress.env('admin_email'));
    cy.get('#email').should('have.class', 'admin_input_form');
    cy.get('#email_empty_msg').should('contain', '');
    cy.get('#password').type('Azerty1');
    cy.get('#password').should('have.class', 'admin_input_form');
    cy.get('#password_empty_msg').should('contain', '');
    cy.get('#log_in').click();
    cy.get('#success_message').should('not.exist');
    cy.get('#error_message').should('contain', 'Connexion refusée : l\'identifiant et/ou le mot de passe n\'est pas correct');
  })

  //? Test avec des identifiants corrects mais sur un compte désactivé
  it('disable-account', () => {
    cy.visit('https://www.cecilia-orsi-coaching.com/managerApp/logIn');
    cy.wait(2000);
    cy.get('#email').type('test.test@test.com');
    cy.get('#password').type('ToulouseLotCantal09');
    cy.get('#log_in').click();
    cy.get('#email').should('have.class', 'admin_input_form');
    cy.get('#email_empty_msg').should('contain', '');
    cy.get('#password').should('have.class', 'admin_input_form');
    cy.get('#password_empty_msg').should('contain', '');
    cy.get('#success_message').should('not.exist');
    cy.get('#error_message').should('contain', 'L\'accès à votre compte a été suspendu par un administrateur.');
  })
})