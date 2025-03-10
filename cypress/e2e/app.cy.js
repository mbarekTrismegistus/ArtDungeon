describe('login', () => {
  it('it should visit the home page and login', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(500)
    cy.get('a[href*="login"]').click()

    cy.get('input[name="username"]').type('hermes')
    cy.get('input[name="password"]').type('hermes')

    cy.get('button', { timeout: 0, force: true }).contains('Login').click()
    cy.contains('button', 'Logout').should('be.visible')

    cy.get('a[href*="/add"]').click()
    cy.get('input[name="title"]').type('test')
    cy.get('textarea[name="description"]').type('test description')
    // cy.get('input[new="newmedia"]').selectFile('cypress/fixtures/pierre.jpg', { force: true })
    cy.wait(2000)
    // cy.get('img[id="displayimage"]')
    cy.get('button[type="submit"]', { timeout: 0, force: true }).click()

  })
})



describe('like and comment', () => {
  it('it should visit a post, like and comment', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(500)
    cy.get('a[href*="login"]').click()

    cy.get('input[name="username"]').type('hermes')
    cy.get('input[name="password"]').type('hermes')

    cy.get('button', { timeout: 0, force: true }).contains('Login').click()
    cy.contains('button', 'Logout').should('be.visible')
    cy.visit('http://localhost:3000/arts/67')

    cy.wait(500)
    cy.get('button[name="like"]', { timeout: 0, force: true }).click()
    cy.get('textarea[name="content"]').type('test comment')
    cy.get('button[type="submit"]', { timeout: 0, force: true }).click()
    
  })
})

