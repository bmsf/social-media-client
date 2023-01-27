const user_name = 'testuser123';
const user_email = 'testuser123@stud.noroff.no';
const user_pw = 'heihei123';

const wrong_name = 'wrong info';
const wrong_email = 'bad@email.com';
const wrong_pw = 'badpw';

describe('login & logout', () => {
	it('can login with the right credentials and logout', () => {
		cy.visit('https://bmsf.github.io/social-media-client/');
		cy.get('#registerModal button')
			.contains('Login')
			.wait(500)
			.click()
			.wait(500);
		cy.get(`input#loginEmail[name="email"]`).type(user_email);
		cy.get(`input#loginPassword[name="password"]`).type(user_pw);
		cy.get(`button[type="submit"]`).contains('Login').click();
		cy.wait(2000);
		cy.get(`button[type="button"][data-visible="loggedIn"]`)
			.contains('Logout')
			.click();
	});

	it('can not login with the wrong credentials', () => {
		cy.visit('https://bmsf.github.io/social-media-client/');
		cy.get('#registerModal button')
			.contains('Login')
			.wait(500)
			.click()
			.wait(500);
		cy.get(`input#loginEmail[name="email"]`).type(wrong_email);
		cy.get(`input#loginPassword[name="password"]`).type(wrong_pw);
		cy.get(`button[type="submit"]`).contains('Login').click();
		cy.wait(2000);
	});
});
