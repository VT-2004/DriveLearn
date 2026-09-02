import { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, XCircle, AlertCircle, 
  HelpCircle, RotateCcw, ArrowRight, ArrowLeft, Languages, ShieldCheck, Calendar 
} from 'lucide-react';
import { RTO_QUIZ_QUESTIONS, LEARNER_SARATHI_PROFILE } from '../data/rtoQuizData';
import './RtoMockTest.css';

export default function RtoMockTest() {
  const [lang, setLang] = useState('en'); // 'en' | 'mr'
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60); // 15 mins
  const [timerActive, setTimerActive] = useState(true);

  // 15-Minute Countdown Timer
  useEffect(() => {
    if (!timerActive || isSubmitted) return;

    if (timeLeftSeconds <= 0) {
      setIsSubmitted(true);
      setTimerActive(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftSeconds, timerActive, isSubmitted]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (optIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    RTO_QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const isPassed = score >= 9; // Parivahan Sarathi pass mark is 9/15

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setTimeLeftSeconds(15 * 60);
    setTimerActive(true);
  };

  const currentQuestion = RTO_QUIZ_QUESTIONS[currentIdx];
  const qEn = currentQuestion.questionEn;
  const qMr = currentQuestion.questionMr;
  const opts = lang === 'mr' ? currentQuestion.optionsMr : currentQuestion.optionsEn;

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="rto-mock-test-page">
      {/* 1. Page Header */}
      <div className="admin-view-header">
        <div>
          <h1>Parivahan Sarathi RTO Theory Exam Prep & Tracker</h1>
          <p>
            Standardized 15-question simulator conforming to Maharashtra RTO computer exam rules. Minimum 9 marks required to qualify.
          </p>
        </div>

        {/* Language Switcher */}
        <div className="lang-switcher-bar">
          <Languages size={15} color="var(--admin-text-muted, #64748b)" />
          <button
            type="button"
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >
            English
          </button>
          <button
            type="button"
            className={`lang-btn ${lang === 'mr' ? 'active' : ''}`}
            onClick={() => setLang('mr')}
          >
            मराठी (Marathi)
          </button>
        </div>
      </div>

      {/* 2. Hero Widget: CMVR 30-Day Mandatory DL Countdown Clock */}
      <div className="cmvr-countdown-card">
        <div className="countdown-info-col">
          <div className="cmvr-badge-tag">
            <ShieldCheck size={13} color="#15803D" />
            <span>CMVR RULE 15 STATUTORY ELIGIBILITY CLOCK</span>
          </div>

          <div className="countdown-main-stats">
            <div className="countdown-days-bubble">
              <span className="count-num tabular-nums">{LEARNER_SARATHI_PROFILE.daysRemaining}</span>
              <span className="count-lbl">Days Remaining</span>
            </div>

            <div className="countdown-details">
              <h3>Permanent Driving License (DL) Test Eligibility</h3>
              <p>
                Under Section 14 Central Motor Vehicles Rules, learners must hold their Form 2 Learner License for at least <strong>30 calendar days</strong> before booking the final practical 8-track test at {LEARNER_SARATHI_PROFILE.rtoOffice}.
              </p>
              <div className="countdown-meta-row tabular-nums">
                <span>LL Issued: <strong>{LEARNER_SARATHI_PROFILE.llIssueDate}</strong></span>
                <span>•</span>
                <span>Training Elapsed: <strong>{LEARNER_SARATHI_PROFILE.daysCompleted} of 30 Days</strong></span>
                <span>•</span>
                <span className="eligible-date">Test Slot Opens: <strong>{LEARNER_SARATHI_PROFILE.permanentDlEligibilityDate}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="countdown-progress-col">
          <div className="prog-percent-top">
            <span>Mandatory Waiting Progress</span>
            <strong className="tabular-nums">56% Completed</strong>
          </div>
          <div className="prog-track-cmvr">
            <div className="prog-fill-cmvr" style={{ width: '56%' }}></div>
          </div>
          <span className="prog-sub-note">13 days of on-road training remaining with Sunita Deshmukh</span>
        </div>
      </div>

      {/* 3. Main Mock Quiz Simulator Shell */}
      <div className="quiz-simulator-shell">
        {/* Quiz Top Bar */}
        <div className="quiz-status-bar">
          <div className="quiz-progress-stat">
            <strong>
              {lang === 'mr' ? 'प्रश्न' : 'Question'} {currentIdx + 1} / {RTO_QUIZ_QUESTIONS.length}
            </strong>
            <span className="answered-pill tabular-nums">
              {answeredCount} / {RTO_QUIZ_QUESTIONS.length} {lang === 'mr' ? 'उत्तरे दिली' : 'Answered'}
            </span>
          </div>

          <div className="timer-badge tabular-nums">
            <Clock size={16} color={timeLeftSeconds < 180 ? '#B91C1C' : '#334155'} />
            <span className={timeLeftSeconds < 180 ? 'timer-urgent' : ''}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>
        </div>

        {!isSubmitted ? (
          /* Active Question View */
          <div className="active-question-card">
            <div className="question-header-row">
              <div className="sign-visual-box">
                <span className="sign-emoji">{currentQuestion.signSymbol}</span>
              </div>

              <div className="question-text-wrap">
                <span className="category-pill">{currentQuestion.signType.toUpperCase()}</span>
                <h2>{lang === 'mr' ? qMr : qEn}</h2>
              </div>
            </div>

            {/* 4 Radio Options */}
            <div className="options-stack">
              {opts.map((optText, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;

                return (
                  <div
                    key={optIdx}
                    className={`option-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <div className="radio-circle">
                      {isSelected && <div className="radio-dot"></div>}
                    </div>
                    <span className="opt-number-lbl">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    <span className="opt-text-val">{optText}</span>
                  </div>
                );
              })}
            </div>

            {/* Question Navigator Grid */}
            <div className="question-pills-bar">
              <span className="pills-lbl">Jump to Question:</span>
              <div className="pills-scroll-row">
                {RTO_QUIZ_QUESTIONS.map((_, pIdx) => {
                  const isCurrent = pIdx === currentIdx;
                  const isAnswered = selectedAnswers[pIdx] !== undefined;

                  return (
                    <button
                      key={pIdx}
                      type="button"
                      className={`pill-btn ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}
                      onClick={() => setCurrentIdx(pIdx)}
                    >
                      {pIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="quiz-controls-row">
              <button
                type="button"
                className="btn-quiz-nav"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => prev - 1)}
              >
                <ArrowLeft size={16} />
                <span>{lang === 'mr' ? 'मागील' : 'Previous'}</span>
              </button>

              <div className="quiz-controls-right">
                {currentIdx < RTO_QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    type="button"
                    className="btn-quiz-next"
                    onClick={() => setCurrentIdx((prev) => prev + 1)}
                  >
                    <span>{lang === 'mr' ? 'पुढील प्रश्न' : 'Next Question'}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-quiz-submit"
                    onClick={() => setIsSubmitted(true)}
                  >
                    <CheckCircle2 size={16} />
                    <span>{lang === 'mr' ? 'चाचणी पूर्ण करा' : 'Submit Exam'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Post-Test Result & Review Screen */
          <div className="quiz-results-container">
            <div className={`result-hero-banner ${isPassed ? 'passed' : 'failed'}`}>
              <div className="result-icon-bubble">
                {isPassed ? <Award size={36} color="#ffffff" /> : <AlertCircle size={36} color="#ffffff" />}
              </div>
              <div className="result-text-col">
                <span className="result-status-tag">
                  {isPassed ? 'QUALIFIED FOR PARIVAHAN SARATHI TEST' : 'MINIMUM 9 MARKS REQUIRED TO PASS'}
                </span>
                <h2>
                  {isPassed ? 'Congratulations! You Passed the Mock RTO Exam' : 'Need More Practice on Traffic Signs'}
                </h2>
                <p>
                  You scored <strong>{score} out of 15</strong> ({Math.round((score / 15) * 100)}%). 
                  {isPassed 
                    ? ' Your understanding of Maharashtra traffic regulations and road signs qualifies for the official computer test.'
                    : ' Review the statutory explanations below and retake the simulator until you consistently achieve 12+ marks.'
                  }
                </p>
              </div>

              <button type="button" className="btn-retake-quiz" onClick={handleRestart}>
                <RotateCcw size={16} />
                <span>{lang === 'mr' ? 'पुन्हा चाचणी द्या' : 'Retake Exam'}</span>
              </button>
            </div>

            {/* Answer Breakdown */}
            <div className="answers-review-section">
              <h3>Question-by-Question Review & Statutory Explanations</h3>
              <div className="answers-review-stack">
                {RTO_QUIZ_QUESTIONS.map((q, qIdx) => {
                  const userAns = selectedAnswers[qIdx];
                  const isCorrect = userAns === q.correctAnswer;
                  const optsReview = lang === 'mr' ? q.optionsMr : q.optionsEn;

                  return (
                    <div key={q.id} className={`review-question-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <div className="review-top-row">
                        <div className="review-q-title">
                          <span className="sign-sm">{q.signSymbol}</span>
                          <strong>Q{qIdx + 1}: {lang === 'mr' ? q.questionMr : q.questionEn}</strong>
                        </div>
                        <span className={`result-chip ${isCorrect ? 'correct' : 'incorrect'}`}>
                          {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                        </span>
                      </div>

                      <div className="review-options-list">
                        <div className="ans-comparison-row">
                          <span className="ans-lbl">Your Answer:</span>
                          <span className={`ans-val ${isCorrect ? 'text-green' : 'text-red'}`}>
                            {userAns !== undefined ? optsReview[userAns] : 'Not Answered'}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="ans-comparison-row">
                            <span className="ans-lbl">Correct Statutory Answer:</span>
                            <span className="ans-val text-green font-bold">
                              {optsReview[q.correctAnswer]}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="statutory-note-box">
                        <span className="note-title">CMVR Legal Rationale:</span>
                        <p>{lang === 'mr' ? q.explanationMr : q.explanationEn}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
