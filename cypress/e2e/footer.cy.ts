describe('Footer component test', () => {
  it('H1태그가 렌더링 되는지 확인 목적 입니다.', () => {
    cy.visit('/');

    cy.get('footer h1')
      .should('exist') // 있는지 확인 파트
      .and('be.visible') // 렌더링 되는지 확인 파트
      .and('have.text', '본 프로젝트는 학습 목적입니다.'); // 이 텍스트인지 확인 파트

    cy.get('footer h1')
      .invoke('text')
      .then(text => {
        expect(text).to.eq('본 프로젝트는 학습 목적입니다.'); // 이거만 렌더링되는지 목적
        expect(text).to.not.include('<'); // 이런 기타 문구가 없는지 확인 목적
        expect(text).to.not.include('>'); // 이런 기타 문구가 없는지 확인 목적
      });
  });
});
