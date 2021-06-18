// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'sample-user',
      username: 'sample-user',
      password: 'sample-password',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('sample-user');
      cy.get('#password').type('sample-password');
      cy.get('#login-button').click();

      cy.contains('sample-user logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'sample-user logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'sample-user', password: 'sample-password' });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('a test blog');
      cy.get('#author').type('a test author');
      cy.get('#url').type('http://test-url.com');
      cy.get('#create-blog-button').click();
      cy.contains('a test blog');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'first author',
          url: 'http://first-url.com',
        });
      });

      it('one of those can be liked', function () {
        cy.contains('view').click();
        cy.contains('likes 0').find('[data-cy="like-button"]').click();
        cy.contains('likes 1');
      });

      it('user who creates a blog can delete it', function () {
        cy.contains('view').click();
        cy.contains('first blog');

        cy.contains('remove').click();
        cy.contains('first blog').should('not.exist');
      });
    });

    describe('multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'first author',
          url: 'http://first-url.com',
          likes: 5,
        });

        cy.createBlog({
          title: 'second blog',
          author: 'second author',
          url: 'http://second-url.com',
          likes: 2,
        });

        cy.createBlog({
          title: 'third blog',
          author: 'third author',
          url: 'http://third-url.com',
          likes: 0,
        });
      });

      it('blogs are ordered according to likes', function () {
        cy.get('[data-cy="blog-container"]').then(($blogs) => {
          expect($blogs).to.have.length(3);

          for (let i = 0; i < $blogs.length; i++) {
            cy.get('[data-cy="details-button"]').eq(i).click();

            const currentNumberOfLikes = Number(
              $blogs.find('[data-cy="likes"]')[i].innerText
            );

            // Make next number of likes conditional to prevent loop from exceeding range
            const nextNumberOfLikes =
              Number($blogs.find('[data-cy="likes"]')[i + 1]?.innerText) || 0;

            if (currentNumberOfLikes !== nextNumberOfLikes) {
              expect(currentNumberOfLikes).to.be.gt(nextNumberOfLikes);
            }
          }
        });
      });
    });
  });
});
