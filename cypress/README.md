# Cypress 테스트 가이드

이 프로젝트는 Cypress를 사용하여 E2E 테스트를 수행합니다.

## 설치된 테스트

### Footer 컴포넌트 테스트
- `cypress/e2e/footer.cy.ts`: Footer 컴포넌트의 상세한 테스트
- `cypress/e2e/footer-simple.cy.ts`: Footer 컴포넌트의 기본 테스트

## 테스트 실행 방법

### 1. 개발 서버 시작
```bash
npm run dev
```

### 2. Cypress 테스트 실행

#### 모든 테스트 실행
```bash
npm run cypress:run
```

#### 특정 Footer 테스트만 실행
```bash
npm run test:e2e
```

#### Cypress UI 모드로 실행
```bash
npm run cypress:open
```

## 테스트 내용

### Footer 컴포넌트 테스트 (`footer.cy.ts`)
- Footer가 올바르게 렌더링되는지 확인
- Footer 텍스트가 "본 프로젝트는 학습 목적입니다."인지 확인
- CSS 클래스가 올바르게 적용되었는지 확인
- 다양한 뷰포트 크기에서 일관된 모습을 유지하는지 확인
- 다른 페이지 요소와 겹치지 않는지 확인

### 간단한 Footer 테스트 (`footer-simple.cy.ts`)
- Footer가 존재하는지 확인
- Footer 텍스트가 올바른지 확인

## 테스트 작성 가이드

새로운 컴포넌트 테스트를 작성할 때는 다음 패턴을 따르세요:

```typescript
describe('Component Name', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display component correctly', () => {
    cy.get('selector').should('exist')
    cy.get('selector').should('contain.text', 'expected text')
  })
})
```

## 주의사항

- 테스트 실행 전에 개발 서버가 실행 중인지 확인하세요
- `baseUrl`이 `http://localhost:3000`으로 설정되어 있습니다
- TypeScript 파일(`.ts`)로 테스트를 작성할 수 있습니다
