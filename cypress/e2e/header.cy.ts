describe('Header component test', () => {
  it('헤더 텍스트가 렌더링 되는지 확인', () => {
    cy.visit('/');

    cy.get('header a')
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Fronthan Blog');

    cy.get('header a').invoke('text').then((text) => {
      expect(text).to.eq('Fronthan Blog');
      expect(text).to.not.include('<');
      expect(text).to.not.include('>');
    });
  });
});


