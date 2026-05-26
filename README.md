# 🌿 OH-Radical Technology Premium Web Project

<div align="center">
  <img src="src/assets/oh_radical_ci.svg" alt="OH Radical Technology Logo" width="360" style="margin-bottom: 20px;"/>
  <p><strong>자연의 무독성 강력 정화력을 엔지니어링하다</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Vite-v8.0.13-646CFF?logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/React-v18-20232A?logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/TypeScript-v5-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Aesthetics-Premium-blueviolet" alt="Aesthetics"/>
  </p>
</div>

---

## 🌟 프로젝트 개요 (Overview)
본 프로젝트는 자연계 정화의 핵심인 **OH-Radical(수산기)** 기술을 다루는 글로벌 바이오테크 선도 기업 **OH Radical Technology**의 공식 프리미엄 웹 플랫폼입니다.  
공공기관 조달(B2G), 대리점 유치(B2B), 그리고 일반 사용자(B2C)를 아우르는 정갈하고 신뢰도 높은 **Classic Slate Light(White & Royal Blue) 테마**와 혁신적인 **1분 스마트 도입 시뮬레이터**가 내장되어 있습니다.

---

## 🧪 핵심 기술 메커니즘 (Core Science)
OH-Radical은 대중적인 소독제(오존, 염소) 대비 **최대 2,000배 빠른 산화 반응 속도**와 인체 무독성 안전성을 자랑합니다.

1. **안전한 수산기 디퓨징 (Plasma Defusing)**  
   공기 중 천연 수분을 마이크로초 단위 플라즈마로 정전 분사하여 고농축 OH-Radical 배출 (유해 오존 배출 KTR 0.002ppm 극소화).
2. **수소 이온 탈취 사멸 (H-Extraction Sanitization)**  
   유해 세균/바이러스 단백질 세포벽의 수소 이온(H+)을 강제 탈취해 세포 구조를 비가역적으로 사멸 및 파괴.
3. **100% 무해물질 환원 (Clean Pure Cycle)**  
   유기 결합 해체 후 잔류 독성 없이 순수한 물(H₂O)과 깨끗한 산소(O₂) 분자로 완전 복귀 순환.

---

## 💼 3대 비즈니스 도메인 (Business Target)

### 1. B2G: 다중이용시설 공간살균
- **대상**: 지하철 역사, 관공서 청사, 어린이집, 대형 의료시설
- **스펙**: 단일 공조 매립 디퓨징 모듈당 실평수 150㎡ 완벽 커버 및 부유 바이러스 99.8% 살균 검증

### 2. B2G/B2B: 산업 및 재활용시설 악취저감
- **대상**: 폐기물/하수 처리장, 악취 유발 산업 단지
- **스펙**: 초미세 드라이 포그(Dry Fog) AOP 공법 적용, 암모니아 및 황화수소 유독가스 85% 즉각 저감 분해

### 3. B2G/B2B: 친환경 스마트팜 농업 모듈
- **대상**: 대규모 버섯 재배 농가, 육묘장, 수경재배 비닐하우스 단지
- **스펙**: 나노 산소버블 융합 농업 수처리 장치, 탄저균/풋마름병 세균 99% 살균 및 농작물 생장속도 25~30% 증진

---

## 📊 킬러 피처: 스마트 도입 시뮬레이터 1.0 (Smart Diagnostics)
고객이 업종과 설치 면적/규모를 조절하면 현재 엔지니어링 데이터를 바탕으로 **권장 장비 수량**, **기대 정화 시너지 효과** 및 **잔류 독성율**을 실시간으로 연산하여 보여주는 고부가가치 인터랙티브 파츠가 탑재되어 있어, B2B/B2G 리드 제안서 인입 전환율을 극대화합니다.

---

## 🛠️ 개발 환경 실행 및 빌드 가이드 (Developer Guide)

### Prerequisites
- Node.js (v18.x 이상 권장)
- npm (v9.x 이상)

### Installation
```bash
# 의존성 패키지 설치
npm install
```

### Development Server
```bash
# 로컬 개발 서버 구동 (포트: http://localhost:5173)
npm run dev
```

### Production Build
```bash
# 프로덕션 빌드 번들 파일 생성 (TypeScript 타입 검증 포함)
npm run build
```

---

## 📂 디렉터리 구조 (Directory Structure)
```bash
OH-Radical/
├── public/               # 정적 파일 에셋 (로고, 성적서 이미지 등)
├── src/
│   ├── assets/           # 오리지널 로고 SVG 및 웹 자산
│   ├── components/
│   │   ├── ParticleBg.tsx # HTML5 Canvas 기반 인터랙티브 살균 정화 파티클 백그라운드
│   │   └── Modal.tsx      # 상세 공학 기술 및 시험 성적서 전용 글래스모피즘 모달
│   ├── App.tsx           # 메인 페이지 비즈니스 로직 및 자가진단 연산 엔진
│   ├── App.css           # Classic Slate Light 레이아웃 스타일 가이드
│   ├── index.css         # 전역 HSL 테마 토큰 및 마이크로 인터랙션 키프레임 애니메이션
│   └── main.tsx          # 애플리케이션 진입점
├── index.html            # SEO 메타 태그 최적화 완료 엔트리 HTML
├── package.json          # 의존성 라이브러리 및 스크립트 구성
└── tsconfig.json         # TypeScript 컴파일 세팅
```

---

## 🛡️ 기술적 신뢰 지표 및 인증 현황 (Credentials)
- **FDA Class I 공식 등록 완료** (Facility Registration No. 3010729314)
- **KCL 공인 부유 세균 및 바이러스 99.9% 살균** 성적서 보유
- **KTR 환경부 오존 기준치 대비 1/25 이하 (0.002ppm)** 초안전 환경 검증 완료
- **특허청 원천 핵심 특허 4건** 정식 등록 완료

---
<div align="center">
  <p>© 2026 OH Radical Technology Co., Ltd. All rights reserved.</p>
</div>
