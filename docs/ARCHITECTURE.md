# 🛠️ Architecture & Performance Optimization

본 문서는 **OH-Radical Technology Premium Web Platform**의 프론트엔드 설계 원칙, 디렉터리 구성, 성능 최적화 기법 및 디자인 시스템 명세에 대해 기술합니다.

---

## 🎨 1. 디자인 시스템 토큰 (HSL Design Tokens)
본 프로젝트는 기존의 눈이 피로한 다크테마나 단조로운 평면 화이트 테마를 넘어, 신뢰감을 극대화한 **Classic Slate Light** 테마를 채택하고 있습니다.

* **Primary Color (주색)**: `hsl(204, 100%, 38%)` – Royal Deep Blue (#0070c0)
* **Secondary Color (보조색)**: `hsl(199, 89%, 48%)` – Bio Teal Cyan
* **Background Color (배경)**: `hsl(210, 40%, 98%)` – Slate Ice White (#f8fafc)
* **Card Border Color (테두리)**: `hsla(210, 40%, 80%, 0.25)`

---

## 🚀 2. 핵심 성능 최적화 (Canvas Rendering Optimization)
대기 중 수산기 살균 인터랙션을 연출하는 **`ParticleBg.tsx`** 컴포넌트는 고성능 HTML5 Canvas API를 사용해 CPU/GPU 자원을 극한으로 조절합니다.

- **RequestAnimationFrame**: 브라우저 주사율(60Hz/120Hz)에 가변적으로 연동하여 프레임 드랍 방지.
- **물리 충돌 최적화**: 입자(Radical)와 오염물질(Virus) 충돌 시 복잡한 삼각함수 연산을 생략하고 간단한 피타고라스 거리 비교법으로 충돌 연산 부하를 최소화.
- **모바일 드롭아웃**: 디바이스 가로폭이 768px 미만일 시 파티클 총개수를 자동으로 40%로 제한해 모바일 기기 배터리 및 정전 방전 최적화.

---

## 📐 3. 모듈 설계 규칙 (React Rules)
1. **단방향 데이터 흐름**: App.tsx가 모든 진단 및 폼 데이터를 총괄하며 하위 컴포넌트는 오직 Presentation에 집중.
2. **글라스모피즘 구현**: `backdrop-filter: blur(16px)`와 반투명 1px border 디자인을 사용하여 공기처럼 깨끗하고 투명한 친환경 이미지 전달.
