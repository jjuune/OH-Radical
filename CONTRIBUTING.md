# 🤝 Contributing to OH-Radical Technology

저희 OH-Radical Technology의 프리미엄 웹 플랫폼에 참여해 주셔서 감사합니다! 본 문서는 협업 과정에서 일관된 코드 품질과 추적 가능한 버전 관리를 유지하기 위한 협업 가이드라인입니다.

---

## 🌿 1. 브랜치 명명 전략 (Branch Strategy)
개발 시 기능별로 브랜치를 분기하여 작업하는 것을 원칙으로 합니다.

- `main`: 실 배포용 상시 무결성 유지 브랜치
- `develop`: 개발 통합 및 QA 브랜치
- `feature/[기능명]`: 새로운 기능 추가 (예: `feature/dark-mode`, `feature/contact-api`)
- `bugfix/[이슈코드]`: 긴급 버그 수정

---

## 📝 2. 커밋 메시지 규칙 (Commit Convention)
메시지는 직관적으로 파악할 수 있도록 접두사를 활용해 작성합니다.

- `feat`: 새로운 기능 추가 (예: `feat: add smart diagnostic calculator`)
- `fix`: 버그 및 오류 수정
- `docs`: 문서 관련 변경 (`README.md` 등)
- `style`: 코드 스타일 수정 (포맷팅, 단순 CSS 정렬 등)
- `refactor`: 코드 리팩토링 (기능 변화 없음)

---

## 🔄 3. Pull Request (PR) 가이드
1. `feature/` 브랜치에서 단위 작업 및 `npm run build` 컴파일 확인.
2. `develop` 브랜치를 향해 PR 생성.
3. 빌드 테스트 자동 통과 및 코드 검수 후 최종 승인 머지.
