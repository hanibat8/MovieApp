
describe('unfavorite movie',()=>{
    it('delete movie from favorite',async()=>{
        //login
        //check profile page
        cy.visit('/profile').wait(5000);
        //cy.findByRole('link', {  name: /profile/i}).click();
        //cy.findByRole('link', {  name: /login/i}).click()
        //cy.findByRole('textbox', {  name: /email address/i}).type('batoolsajid@gmail.com');
        //cy.findByLabelText(/password/i).type('batoolsajid');
        //cy.findByRole('button', {  name: /submit/i}).click();
        //unfavorite movie
        cy.findByRole('button', {  name: /cross414906/i}).should('not.exist');
       // cy.get('[data-testId=414906]').should('not.exist');
    })
})