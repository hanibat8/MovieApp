describe('favorite movie',()=>{
    it('add movie to favorite',()=>{
        //login
        cy.visit('/');
        //cy.findByRole('link', {  name: /login/i}).click()
        //cy.findByRole('textbox', {  name: /email address/i}).type('batoolsajid@gmail.com');
        //cy.findByLabelText(/password/i).type('batoolsajid');
        //cy.findByRole('button', {  name: /submit/i}).click();
        //favorite movie
        cy.findAllByTestId('696806').first().click({force:true});
        cy.findByRole('button', {  name: /add to wishlist/i}).click({force:true});
        //check profile page
        cy.findByRole('link', {  name: /profile/i}).click();
        expect(cy.findByTestId('696806')).to.exist;
    })
})