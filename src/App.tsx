import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Droplets, 
  Wind, 
  Cpu, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Building2,
  FileText,
  Sprout
} from 'lucide-react';
import './App.css';
import ParticleBg from './components/ParticleBg';
import Modal from './components/Modal';
import logo from './assets/oh_radical_ci.svg';

// Modal Content Interfaces
interface ActiveModal {
  type: 'tech' | 'solution' | 'cert' | null;
  id: string;
}

// Diagnostic Interface
interface DiagnosticResult {
  category: string;
  target: string;
  recommended: string;
  efficiency: string;
  benefit: string;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    interest: 'B2G_시설살균', // Auto-filled by diagnostic
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal states
  const [activeModal, setActiveModal] = useState<ActiveModal>({ type: null, id: '' });

  // Diagnostic states (Killer Feature 1.0)
  const [activeTab, setActiveTab] = useState<'b2g_facility' | 'b2g_odor' | 'b2g_farm' | 'b2b_dealer'>('b2g_facility');
  const [scale, setScale] = useState<number>(100); // ㎡ or scale unit

  // Scroll handler for transparent nav animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form submit handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('오빠, 필수 입력 항목(* )은 꼭 작성해 줘! 😉');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ company: '', name: '', phone: '', email: '', message: '', interest: 'B2G_시설살균' });
    }, 1500);
  };

  // Close active modal helper
  const closeModal = () => setActiveModal({ type: null, id: '' });

  // Interactive Diagnostic Simulator Core Logic
  const getDiagnosticResult = (): DiagnosticResult => {
    switch (activeTab) {
      case 'b2g_facility':
        return {
          category: '다중이용시설 공간살균 (B2G)',
          target: '코로나/인플루엔자 바이러스, 미세 부유 세균, 포름알데히드',
          recommended: `OH-Radical 공기 디퓨저 빌트인 모듈 (공조 연계형 ${Math.ceil(scale / 150)}대 권장)`,
          efficiency: '부유 세균 99.9% / 바이러스 99.8% 실시간 사멸 기대',
          benefit: `${scale}㎡ 공간 내 2차 감염률 75% 이상 감소 및 청정 산소 자동 환원 시너지`
        };
      case 'b2g_odor':
        return {
          category: '재활용/산업시설 악취저감 (B2G)',
          target: '황화수소(H₂S), 암모니아(NH₃), 메틸메르캅탄 등 유독 유기 가스',
          recommended: `고농축 대용량 AOP 분무 정화 시스템 (산업용 모듈 ${Math.ceil(scale / 300)}세트 권장)`,
          efficiency: '유해가스 및 복합 악취 85% 즉각 분해 제거 기대',
          benefit: `인접 주거지역 민원 90% 저감 및 현장 작업자의 유해 화학물질 노출 예방`
        };
      case 'b2g_farm':
        return {
          category: '스마트팜 생장 농업용 (B2G / B2B)',
          target: '탄저병 곰팡이 포자, 풋마름병 세균, 농업 용수 잔류 농약',
          recommended: `나노버블 OH-Radical 농업 수처리 순환 장치 (${Math.ceil(scale / 500)}톤 용량 권장)`,
          efficiency: '용수 내 병원성 미생물 99% 살균 및 토양 산소 용해율 2배 증진',
          benefit: `작물 생장 속도 약 25~30% 증진, 병해 발생률 70% 감소를 통한 생산량 극대화`
        };
      case 'b2b_dealer':
        return {
          category: '영업 대리점 및 유치 파트너 (B2B)',
          target: '공공 입찰 연계, 리빙/가전 시장 유통 및 OEM 매칭 기회',
          recommended: 'OH-Radical Tech 정식 파트너십 라이선스 및 독점 영업권 부여',
          efficiency: '본사 직접 기술 엔지니어링 지원 및 특허 라이선스 활용 공동 마케팅 지원',
          benefit: '정부 녹색기술 인증 조달 우대 혜택 및 연간 기술 자문 보장'
        };
    }
  };

  const diagnosticResult = getDiagnosticResult();

  const handleApplyDiagnosticToForm = () => {
    let interestVal = 'B2G_시설살균';
    if (activeTab === 'b2g_odor') interestVal = 'B2G_악취저감';
    if (activeTab === 'b2g_farm') interestVal = 'B2G_농업스마트팜';
    if (activeTab === 'b2b_dealer') interestVal = 'B2B_대리점영업';

    setFormData((prev) => ({
      ...prev,
      interest: interestVal,
      message: `[자가 진단 리포트 신청]\n구분: ${diagnosticResult.category}\n대상 규모/면적: ${scale}단위\n추천 설비: ${diagnosticResult.recommended}\n기대 효능: ${diagnosticResult.efficiency}\n\n이 진단 리포트를 기반으로 구체적인 도면 설계 및 상세 견적 상담을 요청합니다.`,
    }));

    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      {/* High-Performance Canvas Particles (Light Blue Clean Effect) */}
      <ParticleBg />

      {/* Soft Cyan Background Glows */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {/* Classic High-Trust Header */}
      <header className={`nav-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo-area">
            <img src={logo} alt="OH Radical Technology" className="logo-img" />
          </a>
          <ul className="nav-menu">
            <li><a href="#tech" className="nav-link">핵심 기술</a></li>
            <li><a href="#solutions" className="nav-link">주요 사업</a></li>
            <li><a href="#diagnostic" className="nav-link">자가 진단</a></li>
            <li><a href="#credentials" className="nav-link">특허 및 인증</a></li>
            <li><a href="#contact" className="nav-link">문의 / 파트너십</a></li>
          </ul>
          <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.35rem', fontSize: '0.85rem' }}>
            기술 상담 신청
          </a>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-tagline">
            <ShieldCheck size={16} /> Nature's Pure Power, Engineered for Clean Environment
          </div>
          <h1 className="hero-title">
            자연이 숨겨둔 가장 강력한 정화력,<br />
            <span className="gradient-text">OH-Radical 친환경 청정 기술</span>
          </h1>
          <p className="hero-desc">
            세균과 바이러스를 99.9% 완벽히 제거하고 오직 순수 산소와 물로만 복귀하는 무독성 정화.<br />
            정부 다중이용시설 대기 살균부터 스마트팜 농가, 악취 분해까지 OH Radical Technology가 선도합니다.
          </p>
          <div className="hero-btns">
            <a href="#diagnostic" className="btn-primary">
              1분 맞춤형 자가 진단 <ArrowRight size={18} />
            </a>
            <a href="#tech" className="btn-secondary">
              3단계 살균 과학 보기
            </a>
          </div>
        </div>
      </section>

      {/* 2. Technology Section */}
      <section id="tech" className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Core Science</p>
            <h2 className="section-title">OH-Radical의 3단계 과학적 살균 메커니즘</h2>
            <p className="section-desc">
              오존 대비 2,000배 빠른 산화 반응 속도와 완벽한 안전성.<br />
              자연 정화 방식 그대로 잔류 독성 없이 유해 물질을 완벽하게 수소 이온 분리 해체하는 메커니즘입니다.
            </p>
          </div>

          <div className="tech-grid">
            <div 
              className="glass-panel tech-card" 
              onClick={() => setActiveModal({ type: 'tech', id: 'step1' })}
              style={{ cursor: 'pointer' }}
            >
              <div className="tech-step">01. 무독성 친환경 생성</div>
              <h3 className="tech-card-title neon-text-primary">안전한 수산기 디퓨징</h3>
              <p className="tech-card-desc">
                공기 중의 천연 수분 입자를 극미세 플라즈마로 정전 분사하여 고농도의 순수 OH-Radical을 공기 중에 안전하게 배출합니다. 잔류 오존 걱정이 없는 원천 기술입니다.
              </p>
              <span className="neon-text-primary" style={{ fontSize: '0.875rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '1.5rem' }}>
                상세 공학 연구 보기 <ArrowRight size={14} />
              </span>
            </div>

            <div 
              className="glass-panel tech-card"
              onClick={() => setActiveModal({ type: 'tech', id: 'step2' })}
              style={{ cursor: 'pointer' }}
            >
              <div className="tech-step">02. 분자 결합 해체</div>
              <h3 className="tech-card-title" style={{ color: 'var(--primary)' }}>수소 이온 탈취 사멸</h3>
              <p className="tech-card-desc">
                부유 세균 및 바이러스의 세포벽 유기 단백질 고리에서 즉각적으로 수소(H) 이온을 강제 탈취합니다. 세포벽 구조가 손상된 세균은 물리적으로 완전히 사멸합니다.
              </p>
              <span className="neon-text-primary" style={{ fontSize: '0.875rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '1.5rem' }}>
                상세 공학 연구 보기 <ArrowRight size={14} />
              </span>
            </div>

            <div 
              className="glass-panel tech-card"
              onClick={() => setActiveModal({ type: 'tech', id: 'step3' })}
              style={{ cursor: 'pointer' }}
            >
              <div className="tech-step">03. 100% 무해물질 복귀</div>
              <h3 className="tech-card-title" style={{ color: 'var(--secondary)' }}>순수 물과 산소로 환원</h3>
              <p className="tech-card-desc">
                오염 물질을 해체하고 탈취한 수소 이온과 결합하여 안전한 순수 물(H₂O) 분자로 완전히 복귀합니다. 인체와 환경에 2차 유해 독성 부산물을 일절 배출하지 않습니다.
              </p>
              <span className="neon-text-primary" style={{ fontSize: '0.875rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '1.5rem' }}>
                상세 공학 연구 보기 <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solutions Section (Targeted Business Segments) */}
      <section id="solutions" className="section-padding">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Our Business</p>
            <h2 className="section-title">정부 공공과 산업을 선도하는 3대 사업 영역</h2>
            <p className="section-desc">
              신뢰성이 최우선인 B2G 조달 기준을 완벽 충족하며, 일반 소비자와 산업 파트너를 아우르는 친환경 모듈 라인업을 공급합니다.
            </p>
          </div>

          <div className="solutions-grid">
            <div className="glass-panel solution-card">
              <Wind className="solution-icon" />
              <h3>공공 다중이용시설 공간살균 (B2G)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 1.5rem 0', fontWeight: '600' }}>지하철, 관공서 청사, 어린이집, 의료시설</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                불특정 다수가 밀집하는 공공 공간의 부유 세균 및 바이러스를 실시간으로 상시 차단하여 호흡기 유행성 질환의 2차 전파 감염을 예방합니다.
              </p>
              <ul className="solution-features">
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 공인 기관 바이러스 99.8% 저감 성적</li>
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 빌트인 천장 조화 매립 공정 지원</li>
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 인체 무독성 / 무자극 임상 검증 완료</li>
              </ul>
              <button 
                className="solution-btn"
                onClick={() => setActiveModal({ type: 'solution', id: 'air' })}
              >
                상세 사양 보기
              </button>
            </div>

            <div className="glass-panel solution-card">
              <Droplets className="solution-icon" />
              <h3>산업/재활용시설 악취저감 (B2G/B2B)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 1.5rem 0', fontWeight: '600' }}>폐기물 처리장, 하수처리장, 악취 유발 산업체</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                화학 탈취제의 덮어씌우기(Masking) 방식과 달리, 유독성 암모니아 및 황화수소 분자 구조를 직접 파괴해 근본적인 악취 제거 솔루션을 공급합니다.
              </p>
              <ul className="solution-features">
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 암모니아 및 황화수소 85% 즉각 저감</li>
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 고압 분무 분산 제어 공학 솔루션</li>
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 고농도 유해가스 산화 분해 (AOP)</li>
              </ul>
              <button 
                className="solution-btn"
                onClick={() => setActiveModal({ type: 'solution', id: 'water' })}
              >
                상세 사양 보기
              </button>
            </div>

            <div className="glass-panel solution-card">
              <Sprout className="solution-icon" />
              <h3>친환경 스마트팜 농업 모듈 (B2G/B2B)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 1.5rem 0', fontWeight: '600' }}>비닐하우스 단지, 육묘장, 버섯 재배 농가</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                농업 용수 살균을 통해 토양 곰팡이와 탄저균 등 세균 전파를 막고, 나노 산소 버블 융합 기술로 작물의 뿌리 흡수력을 끌어올립니다.
              </p>
              <ul className="solution-features">
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 곰팡이 및 탄저균 살균을 통한 병해 예방</li>
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 작물 성장 속도 및 생산성 증진</li>
                <li className="solution-feature-item"><CheckCircle2 className="solution-feature-icon" size={14} /> 화학 잔류 농약 Zero 농가 재배 지원</li>
              </ul>
              <button 
                className="solution-btn"
                onClick={() => setActiveModal({ type: 'solution', id: 'module' })}
              >
                상세 사양 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Diagnostic Simulator (Killer Feature 1.0) */}
      <section id="diagnostic" className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Smart Diagnostics</p>
            <h2 className="section-title">우리 비즈니스 맞춤형 OH-Radical 도입 시뮬레이터</h2>
            <p className="section-desc">
              오빠! 도입을 고민 중인 업종과 대략적인 환경 규모를 선택해 봐.<br />
              현재 축적된 엔지니어링 데이터를 바탕으로 최적의 장비 제안과 기대 정화 시너지를 즉시 도출해 줄게!
            </p>
          </div>

          <div className="diagnostic-container">
            <div className="diagnostic-tabs">
              <button 
                className={`diagnostic-tab-btn ${activeTab === 'b2g_facility' ? 'active' : ''}`}
                onClick={() => { setActiveTab('b2g_facility'); setScale(150); }}
              >
                다중이용시설 공간살균
              </button>
              <button 
                className={`diagnostic-tab-btn ${activeTab === 'b2g_odor' ? 'active' : ''}`}
                onClick={() => { setActiveTab('b2g_odor'); setScale(300); }}
              >
                악취/재활용시설 저감
              </button>
              <button 
                className={`diagnostic-tab-btn ${activeTab === 'b2g_farm' ? 'active' : ''}`}
                onClick={() => { setActiveTab('b2g_farm'); setScale(500); }}
              >
                스마트팜 농업 제어
              </button>
              <button 
                className={`diagnostic-tab-btn ${activeTab === 'b2b_dealer' ? 'active' : ''}`}
                onClick={() => { setActiveTab('b2b_dealer'); setScale(1); }}
              >
                B2B 영업 대리점 유치
              </button>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                {activeTab === 'b2b_dealer' 
                  ? '희망 영업 거점 지역 / 관할구역 개수:' 
                  : `도입 적용 대상 규모 / 면적 (권장 단위: ${activeTab === 'b2g_farm' ? '톤' : '㎡'}):`
                } <span style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 800 }}>{scale}</span> {activeTab === 'b2b_dealer' ? '개 시/군/구' : activeTab === 'b2g_farm' ? '톤' : '㎡'}
              </label>
              <input 
                type="range" 
                min={activeTab === 'b2b_dealer' ? 1 : 50} 
                max={activeTab === 'b2b_dealer' ? 15 : 2000} 
                step={activeTab === 'b2b_dealer' ? 1 : 50}
                value={scale} 
                onChange={(e) => setScale(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#cbd5e1',
                  outline: 'none',
                  cursor: 'pointer',
                  accentColor: 'var(--primary)'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                <span>최소 {activeTab === 'b2b_dealer' ? '1개' : '50'}</span>
                <span style={{ marginLeft: 'auto' }}>최대 {activeTab === 'b2b_dealer' ? '15개' : '2,000'}</span>
              </div>
            </div>

            <div className="diagnostic-result-panel">
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: 800, borderBottom: '1px solid rgba(0, 112, 192, 0.1)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
                📊 실시간 기술 도입 제안 리포트
              </h4>
              <p style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}><strong>도입 적용 구분:</strong> {diagnosticResult.category}</p>
              <p style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}><strong>주요 살균/정화 대상:</strong> {diagnosticResult.target}</p>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}><strong>제안 추천 장비 모듈:</strong> {diagnosticResult.recommended}</p>
              
              <div className="result-metric-grid">
                <div className="metric-card">
                  <div className="metric-value">99.9%</div>
                  <div className="metric-label">살균 안정성</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{activeTab === 'b2g_odor' ? '85%' : activeTab === 'b2g_farm' ? '30%' : '75%'}</div>
                  <div className="metric-label">{activeTab === 'b2g_odor' ? '악취 감소율' : activeTab === 'b2g_farm' ? '생장 증진율' : '감염 저감율'}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">0.00%</div>
                  <div className="metric-label">독성 잔류율</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '12px', fontSize: '0.925rem', borderLeft: '4px solid var(--primary)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <strong>💡 기대 분석 코멘트:</strong> {diagnosticResult.benefit}
              </div>
            </div>

            <button 
              className="btn-primary" 
              onClick={handleApplyDiagnosticToForm}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              이 진단 리포트로 상세 도면 및 견적 문의하기 <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Credentials & Trust Section */}
      <section id="credentials" className="section-padding">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Trust & Quality</p>
            <h2 className="section-title">국내외 최고의 기관들이 입증한 안전성과 신뢰</h2>
            <p className="section-desc">
              OH-Radical Tech의 원천 특허 기술력은 구체적인 임상 데이터 및 공인 성적서로 투명하게 공개됩니다.
            </p>
          </div>

          <div className="cert-grid">
            <div className="glass-panel cert-card" onClick={() => setActiveModal({ type: 'cert', id: 'cert1' })}>
              <Award className="cert-icon" size={40} />
              <h4 className="cert-title">FDA Class I 등록</h4>
              <p className="cert-org">미국 식품의약국 (FDA)</p>
              <span className="neon-text-primary" style={{ fontSize: '0.75rem', marginTop: '1rem', fontWeight: 700 }}>성적서 열람</span>
            </div>

            <div className="glass-panel cert-card" onClick={() => setActiveModal({ type: 'cert', id: 'cert2' })}>
              <FileText className="cert-icon" size={40} />
              <h4 className="cert-title">99.9% 멸균 성적서</h4>
              <p className="cert-org">한국건설생활환경시험연구원</p>
              <span className="neon-text-primary" style={{ fontSize: '0.75rem', marginTop: '1rem', fontWeight: 700 }}>성적서 열람</span>
            </div>

            <div className="glass-panel cert-card" onClick={() => setActiveModal({ type: 'cert', id: 'cert3' })}>
              <ShieldCheck className="cert-icon" size={40} />
              <h4 className="cert-title">유해 오존 Zero 검증</h4>
              <p className="cert-org">한국화학융합시험연구원 (KTR)</p>
              <span className="neon-text-primary" style={{ fontSize: '0.75rem', marginTop: '1rem', fontWeight: 700 }}>성적서 열람</span>
            </div>

            <div className="glass-panel cert-card" onClick={() => setActiveModal({ type: 'cert', id: 'cert4' })}>
              <Cpu className="cert-icon" size={40} />
              <h4 className="cert-title">원천기술 특허 4건</h4>
              <p className="cert-org">대한민국 특허청</p>
              <span className="neon-text-primary" style={{ fontSize: '0.75rem', marginTop: '1rem', fontWeight: 700 }}>특허 전문 열람</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partner / Dealer Section (B2B Recruitment) */}
      <section className="partner-recruit-section">
        <div className="container">
          <div className="glass-panel partner-recruit-card" style={{ background: '#ffffff' }}>
            <p className="section-label" style={{ marginBottom: '0.5rem' }}>B2B Partnership</p>
            <h2 className="section-title">전국 딜러 및 영업 파트너 기업을 모십니다</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: '1.75' }}>
              공공 조달 및 B2G 특수 설비 영업 역량을 보유한 딜러 파트너사를 상시 모집합니다.<br />
              업계 최고의 기술 수수료 보장과 완벽한 엔지니어링 도면 및 설치 사후 관리를 본사에서 백업해 드립니다.
            </p>

            <div className="partner-points">
              <div className="partner-point-item">
                <div className="partner-point-num">01</div>
                <h4 className="partner-point-title">원천기술 독점권</h4>
                <p className="partner-point-desc">담당 구역 내 독점 영업 기회 제공 및 본사 매칭 연계</p>
              </div>
              <div className="partner-point-item">
                <div className="partner-point-num">02</div>
                <h4 className="partner-point-title">조달 가점 지원</h4>
                <p className="partner-point-desc">정부 녹색 기술 및 특허 인증 서류 무상 제공 및 입찰 대행</p>
              </div>
              <div className="partner-point-item">
                <div className="partner-point-num">03</div>
                <h4 className="partner-point-title">A/S 전폭적 대행</h4>
                <p className="partner-point-desc">설치 시공부터 사후 주기 관리까지 본사 전문 에코 엔지니어 파견</p>
              </div>
            </div>

            <a href="#contact" className="btn-primary" onClick={() => setActiveTab('b2b_dealer')}>
              B2B 영업 파트너 제안서 받기 <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section id="contact" className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--card-border)' }}>
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <div>
                <p className="section-label">Partnership</p>
                <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>차세대 청정 바이오 테크 파트너십 제안</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  공공 조달 도입 문의, 공조 시스템 연계 설계 자문, 전국 대리점 제휴, 혹은 가전 OEM/ODM 결합 모듈 시제품 공급 요청까지 모두 열려 있습니다.<br />
                  양식에 정보를 간단히 작성해 주시면 담당 수석 엔지니어가 직접 24시간 이내에 브리핑 자료를 지참해 방문해 드리겠습니다.
                </p>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box"><Phone size={20} /></div>
                <div className="contact-text">
                  <h4>기술 및 제휴 상담 대표 연락처</h4>
                  <p>02-1234-5678 (B2B/B2G 파트너십 전용 라인)</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box"><Mail size={20} /></div>
                <div className="contact-text">
                  <h4>이메일 공식 제안서 접수</h4>
                  <p>partner@oh-radical-tech.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box"><MapPin size={20} /></div>
                <div className="contact-text">
                  <h4>본사 연구소 & 쇼룸</h4>
                  <p>서울특별시 강남구 테헤란로 500, 테크놀로지 밸리 12F</p>
                </div>
              </div>
            </div>

            {/* B2B Contact Form */}
            <div className="glass-panel contact-form-panel">
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 0' }}>
                  <CheckCircle2 size={64} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>소중한 제안이 성공적으로 접수되었습니다!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                    신속히 메일과 연락처를 확인하여 24시간 이내에 전문 견적 엔지니어와 제휴 영업 담당자가 연동하여 기술 상세 제안서를 지참 후 연락드리겠습니다.
                  </p>
                  <button 
                    className="btn-secondary" 
                    onClick={() => setFormSubmitted(false)}
                    style={{ fontSize: '0.9rem' }}
                  >
                    추가 문의 작성하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="company">회사명 / 소속 기관</label>
                    <div style={{ position: 'relative' }}>
                      <Building2 size={16} style={{ position: 'absolute', left: '1rem', top: '1.05rem', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={formData.company}
                        onChange={handleInputChange}
                        className="form-control" 
                        placeholder="예시) 서울교통공사, OO건설" 
                        style={{ paddingLeft: '2.5rem' }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="name">담당자명 *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="성함을 입력해주세요" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">연락처 *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="010-0000-0000" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">이메일 주소 *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="company@email.com" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="interest">상담 및 도입 구분</label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{ fontWeight: 600 }}
                    >
                      <option value="B2G_시설살균">B2G - 다중이용시설 대기 공간살균</option>
                      <option value="B2G_악취저감">B2G/B2B - 산업시설/재활용 악취저감</option>
                      <option value="B2G_농업스마트팜">B2G/B2B - 스마트팜 농업용 수처리</option>
                      <option value="B2B_대리점영업">B2B - 대리점 가입 및 영업 딜러 파트너십</option>
                      <option value="B2C_가전기술">B2C/기타 - 가전 모듈 공급 OEM/ODM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">상세 문의 사항 *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-control" 
                      rows={5} 
                      placeholder="상세한 적용 환경과 도입 시기 등을 기재해주시면 담당 수석 엔지니어 배정에 큰 도움이 됩니다."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '전송 중...' : (
                      <>
                        제휴 제안서 및 기술 의뢰 전송 <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src={logo} alt="OH Radical Technology" className="footer-logo-img" />
            </div>
            <ul className="footer-links">
              <li><a href="#tech" className="footer-link">핵심 기술</a></li>
              <li><a href="#solutions" className="footer-link">주요 사업</a></li>
              <li><a href="#diagnostic" className="footer-link">자가 진단</a></li>
              <li><a href="#credentials" className="footer-link">인증서</a></li>
              <li><a href="#contact" className="footer-link">제휴 신청</a></li>
            </ul>
          </div>
          <div className="footer-copyright">
            <p style={{ marginBottom: '0.5rem' }}>대표이사: 주준 | 개인정보보호책임자: 안티그래비티 | 사업자등록번호: 120-00-00000</p>
            <p>© {new Date().getFullYear()} OH Radical Technology Co., Ltd. All rights reserved. Designed with ❤️ by Antigravity 2.0</p>
          </div>
        </div>
      </footer>

      {/* ==========================================
          MODALS LIST FOR INTERACTION
         ========================================== */}
      
      {/* 1. Tech Mechanisms Modals */}
      <Modal 
        isOpen={activeModal.type === 'tech' && activeModal.id === 'step1'} 
        onClose={closeModal} 
        title="01. 친환경 플라즈마 정전분사 기법 원리"
      >
        <p style={{ marginBottom: '1rem' }}>OH-Radical Technology가 보유한 독자적인 정전기 분사 시스템은 공기 중 습기를 나노 단위의 전하 기포로 조절해 순수한 수산기만을 방전 배출합니다.</p>
        <h4 style={{ color: 'var(--primary)', margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>🔬 무독성 Radical 고농도 제어</h4>
        <p style={{ marginBottom: '1.25rem' }}>자체 설계된 저전압 코로나 방전 유닛은 공기 분자를 자극해 대기압 플라즈마 방전을 일으킵니다. 이때 2차 부산물인 유해 오존(O₃) 농도를 0.002 ppm 미만으로 극단적으로 억제하는 정전 펄스 억제(Pulse Suppression) 로직을 탑재하여, 다중이용시설의 영유아 보육 챔버와 환자 거주 공간에서도 상시 운전할 수 있는 무독성 환경을 이룩했습니다.</p>
        <div className="glass-panel" style={{ padding: '1rem', backgroundColor: 'rgba(0,112,192,0.03)', fontSize: '0.85rem', borderColor: 'rgba(0,112,192,0.1)' }}>
          <strong>💡 연구소 코멘트:</strong> "독자적인 센서 연동 가변 방전 시스템을 통하여 실내 공기 상태와 상대 습도 변화에 맞춰 방전 진폭을 마이크로초 단위로 미세 조절, 전력 손실은 낮추고 정화율은 높였습니다."
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal.type === 'tech' && activeModal.id === 'step2'} 
        onClose={closeModal} 
        title="02. 수소 탈취 분자 결합 해체 및 살균 공정"
      >
        <p style={{ marginBottom: '1rem' }}>OH-Radical(수산기)은 대중적으로 사용되는 소독제인 염소나 오존 대비 월등히 빠른 산화환원 전위를 보유하고 있습니다.</p>
        <h4 style={{ color: 'var(--primary)', margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>⚡ 바이러스 사멸 메커니즘</h4>
        <p style={{ marginBottom: '1.25rem' }}>OH-Radical 분자가 유해 바이러스나 병원성 세균의 단백질 세포벽에 접촉하면 화학 반응 평형 원리에 의해 유기 단백질에서 수소 이온(H+)을 급속하게 끌어옵니다. 수소 이온을 탈취당한 세포막은 물리적으로 찢어지고 DNA 분자 고리가 비가역적으로 파괴되어 살균됩니다.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(0, 112, 192, 0.2)', color: 'var(--primary)' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem 0' }}>살균 정화물질</th>
              <th style={{ textAlign: 'center', padding: '0.5rem 0' }}>산화환원 전위 (V)</th>
              <th style={{ textAlign: 'center', padding: '0.5rem 0' }}>상대적 살균 속도비</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
              <td style={{ padding: '0.5rem 0' }}><strong>OH-Radical (수산기)</strong></td>
              <td style={{ textAlign: 'center', color: 'var(--primary)' }}><strong>2.80 V</strong></td>
              <td style={{ textAlign: 'center' }}><strong>1,000배 (기준 대비)</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
              <td style={{ padding: '0.5rem 0' }}>오존 (Ozone)</td>
              <td style={{ textAlign: 'center' }}>2.07 V</td>
              <td style={{ textAlign: 'center' }}>0.5배</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
              <td style={{ padding: '0.5rem 0' }}>염소 소독제 (Chlorine)</td>
              <td style={{ textAlign: 'center' }}>1.36 V</td>
              <td style={{ textAlign: 'center' }}>0.01배</td>
            </tr>
          </tbody>
        </table>
      </Modal>

      <Modal 
        isOpen={activeModal.type === 'tech' && activeModal.id === 'step3'} 
        onClose={closeModal} 
        title="03. 물(H₂O) 및 산소(O₂) 100% 무해 복귀 안정성"
      >
        <p style={{ marginBottom: '1rem' }}>화학 소독 약품이나 자외선 살균의 최대 문제는 처리 후 2차 독성 가스나 발암물질인 트리할로메탄(THMs) 등이 환경에 잔류한다는 점입니다.</p>
        <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>🍃 친환경 잔류량 0%</h4>
        <p style={{ marginBottom: '1.25rem' }}>OH-Radical은 세포벽을 분해한 뒤 탈취한 수소 이온과 안정적으로 결합하여 완벽한 물 분자(`OH + H = H₂O`)로 무해하게 전환됩니다. 잔류 공기 중의 여분 수산기 역시 주변 수산기들과 결합 충돌하며 깨끗한 산소 기체(`2OH = H₂O + O`)를 내뿜습니다. 잔류 오염과 유해 부산물이 0%인 완벽한 순환 기술입니다.</p>
        <div style={{ padding: '1rem', background: 'rgba(0, 112, 192, 0.04)', border: '1px dashed var(--primary)', borderRadius: '12px' }}>
          🌱 <strong>정부 탄소 중립 및 안전성 기준 충족:</strong> 화학 성분 주입이 전혀 없어, B2G 조달 우선구매 대상 녹색인증 기술 기준 및 국내외 수자원 정수 안전 규격을 무난하게 충족하고 있습니다.
        </div>
      </Modal>

      {/* 2. Solutions Modals */}
      <Modal 
        isOpen={activeModal.type === 'solution' && activeModal.id === 'air'} 
        onClose={closeModal} 
        title="다중이용시설 공간살균 모듈 상세 스펙"
      >
        <p style={{ marginBottom: '1rem' }}>공공 관공서 청사 및 지하철 역사 대공간 내 호흡기 전파 바이러스를 방어하기 위한 공조 빌트인 사양입니다.</p>
        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>📋 스펙 및 설계 매뉴얼</h4>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>최대 커버리지:</strong> 단일 모듈 당 실평수 150㎡ (약 45평형) 최적 커버, 중앙 제어 연결 지원</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>공인 바이러스 제거율:</strong> 부유 인플루엔자 A 99.8% 제거 및 유해 포름알데히드 분해</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>연계 인터페이스:</strong> 건물 공조 시스템 및 천장 닥트 내장형 인라인 모듈</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>유지 보수:</strong> 필터 없는 정전 집진 방식 결합으로 연 1회 청소 외 유지비용 제로</li>
        </ul>
        <a href="#contact" className="btn-primary" onClick={closeModal} style={{ width: '100%', justifyContent: 'center' }}>
          B2G 공조 기술 검토의뢰 접수 <ArrowRight size={16} />
        </a>
      </Modal>

      <Modal 
        isOpen={activeModal.type === 'solution' && activeModal.id === 'water'} 
        onClose={closeModal} 
        title="산업/재활용시설 악취저감 솔루션 상세 스펙"
      >
        <p style={{ marginBottom: '1rem' }}>쓰레기 집하장 및 재활용 선별장 내 황화수소, 암모니아 악취 민원을 원천 해결하기 위한 대용량 AOP 정화 장치입니다.</p>
        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>📋 시스템 운용 및 저감 스펙</h4>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>악취 가스 제거율:</strong> 암모니아 88%, 황화수소 85% 이상 즉각 해체 탈취</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>공법 구분:</strong> 초미세 드라이 포그(Dry Fog) 분무를 통한 대기 체류형 OH-Radical 접촉 파괴</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>스펙 사양:</strong> 시간당 대기 처리 풍량 2,000 ~ 30,000 ㎥ 커스텀 설계 지원</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>도입 효과:</strong> 처리장 경계 악취 측정치 법적 한계치 이하로 유지 보장</li>
        </ul>
        <a href="#contact" className="btn-primary" onClick={closeModal} style={{ width: '100%', justifyContent: 'center' }}>
          악취 저감 엔지니어 현장 진단 신청 <ArrowRight size={16} />
        </a>
      </Modal>

      <Modal 
        isOpen={activeModal.type === 'solution' && activeModal.id === 'module'} 
        onClose={closeModal} 
        title="스마트팜 농업용 수처리 모듈 상세 스펙"
      >
        <p style={{ marginBottom: '1rem' }}>친환경 농산물 생산량 극대화와 수경재배 곰팡이 병해 예방을 위한 초미세 산소 나노버블 수처리 장치입니다.</p>
        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>📋 수처리 및 생장 촉진 스펙</h4>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>처리 용량:</strong> 시간당 5톤 ~ 100톤 규모 맞춤 농가 파이프 설계</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>주요 살균 균주:</strong> 역병, 풋마름병, 탄저균 곰팡이 포자 상시 제거</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>성장 촉진 시너지:</strong> 물 분자 클러스터 미세화로 뿌리 수분 및 영양분 흡수율 30% 증진</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>잔류 가치:</strong> 잔류 농약 성분의 신속 분해를 통한 무농약 등급 작물 수확</li>
        </ul>
        <a href="#contact" className="btn-primary" onClick={closeModal} style={{ width: '100%', justifyContent: 'center' }}>
          농가 시제품 견적 문의 <ArrowRight size={16} />
        </a>
      </Modal>

      {/* 3. Credentials Modals */}
      <Modal 
        isOpen={activeModal.type === 'cert' && activeModal.id === 'cert1'} 
        onClose={closeModal} 
        title="FDA Class I 의료설비/장치 부문 공식 등록"
      >
        <p style={{ marginBottom: '1.25rem' }}>미국 식품의약국(FDA)에 당사의 OH-Radical 발생 기술 및 공기 살균 디바이스가 공식 등록 완료(Facility Registration No. 3010729314)되었음을 증명합니다.</p>
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)', background: 'rgba(0, 112, 192, 0.03)', marginBottom: '1.5rem' }}>
          <h5 style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>FDA 인증 세부 범위</h5>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            - Device Class: Air Purifier Class I / Medical Facility Device<br />
            - 장기 가동 시 흡입 안전 가이드라인 및 챔버 잔류성 만족<br />
            - 미국 연방 및 글로벌 수출 시 필수적인 안전 규격 패스
          </p>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>* 본 FDA 등록 정보는 파트너십을 체결하는 대리점 및 B2B 협력사의 공공 조달 입찰 및 납품 증빙 시 공동으로 활용하실 수 있도록 문서 보증 라이선스를 적극 발급해 드립니다.</p>
      </Modal>

      <Modal 
        isOpen={activeModal.type === 'cert' && activeModal.id === 'cert2'} 
        onClose={closeModal} 
        title="KCL 공인 부유 세균 및 바이러스 99.9% 살균 성적서"
      >
        <p style={{ marginBottom: '1rem' }}>국가 지정 시험 공인인증기관인 KCL(한국건설생활환경시험연구원)에서 검증된 밀폐 실험 챔버 대기 살균 수치입니다.</p>
        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>📈 KCL 공식 시험 사멸 수치 (챔버 가동 30분 시점)</h4>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          <li style={{ marginBottom: '0.4rem' }}><strong>대장균 (Escherichia coli):</strong> 99.9% 사멸 (감소율 99.9%)</li>
          <li style={{ marginBottom: '0.4rem' }}><strong>황색포도상구균 (Staphylococcus aureus):</strong> 99.9% 사멸</li>
          <li style={{ marginBottom: '0.4rem' }}><strong>폐렴균 (Klebsiella pneumoniae):</strong> 99.9% 사멸</li>
          <li style={{ marginBottom: '0.4rem' }}><strong>인플루엔자 A형 독감 바이러스:</strong> 99.8% 사멸 저감율 확인</li>
        </ul>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>대공간 빌트인 설치 시 공기 흡입량과 풍량에 맞춰 비례하여 우수한 살균 능력이 지속적으로 유지됨을 필드 실측 데이터로도 확인받았습니다.</p>
      </Modal>

      <Modal 
        isOpen={activeModal.type === 'cert' && activeModal.id === 'cert3'} 
        onClose={closeModal} 
        title="KTR 환경부 기준 유해 오존 배출 제로(0.002ppm) 성적서"
      >
        <p style={{ marginBottom: '1.25rem' }}>화학 융합 공인인증 시험기관인 KTR에서 측정한 당사 플라즈마 방전 유닛의 오존 가스 배출 정밀도 보고서입니다.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.15rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>국내 조달 기준 규격</span>
            <h4 style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: '#e11d48' }}>0.05 ppm 이하</h4>
          </div>
          <div className="glass-panel" style={{ padding: '1.15rem', textAlign: 'center', borderColor: 'var(--primary)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700' }}>OH-Radical Tech 측정치</span>
            <h4 style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: 'var(--primary)' }}>0.002 ppm</h4>
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
          당사 고유 특허인 능동 피드백 정전 인버팅 제어 시스템을 통하여 실내 도심 대기 평균 농도보다도 극히 낮은 <strong>0.002 ppm (조달 한계치 규격의 1/25 수준)</strong>을 유지, 오존 호흡기 독성 우려를 종식시켜 어린이집, 요양원 등에 상시 설치가 가능하도록 승인받았습니다.
        </p>
      </Modal>

      <Modal 
        isOpen={activeModal.type === 'cert' && activeModal.id === 'cert4'} 
        onClose={closeModal} 
        title="대한민국 특허청 핵심 원천 특허 등록 대장"
      >
        <p style={{ marginBottom: '1.25rem' }}>원천 기술 보호 및 대리점 영업 경쟁력 보호를 위해 당사가 보유 중인 핵심 특허 4건의 상세 대장입니다.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
          <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>1. 고강도 코로나 펄스 억제를 결합한 수산기 디퓨징 모듈</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>[특허 제10-234859호]</div>
          </div>
          <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>2. 실시간 오존 피드백을 활용한 플라즈마 방전 능동 보정 로직</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>[특허 제10-245910호]</div>
          </div>
          <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>3. 다중 이용 공조 닥트 내장형 인라인 저저항 정전 기포 살균기</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>[특허 [제10-259102호]</div>
          </div>
          <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', border: '1px solid var(--card-border)', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>4. 농업 고농도 용수용 나노버블 복합 산화 용해 순환 타워</strong>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>[특허 제10-269034호]</div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
