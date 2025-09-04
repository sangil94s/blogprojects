describe('Not Found page test', () => {
  it('없는 경로 접속 시 404와 h1 렌더 확인', () => {
    cy.request({ url: '/daeqw', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(404);
    });

    cy.visit('/daeqw', { failOnStatusCode: false });

    cy.get('section h1')
      .should('exist')
      .and('be.visible')
      .and('have.text', 'Error');

    cy.get('section h1').invoke('text').then((text) => {
      expect(text).to.eq('Error');
      expect(text).to.not.include('<');
      expect(text).to.not.include('>');
    });
  });
});


