import { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, XCircle, AlertCircle, 
  HelpCircle, RotateCcw, ArrowRight, ArrowLeft, Languages, ShieldCheck, 
  Calendar, Play, StopCircle, UserCheck, AlertTriangle, X, Check, FileText
} from 'lucide-react';
import { RTO_QUIZ_QUESTIONS, LEARNER_SARATHI_PROFILE } from '../data/rtoQuizData';
import './RtoMockTest.css';

export default function RtoMockTest() {
  const [lang, setLang] = useState('en'); // 'en' | 'mr'
  // Portal Lifecycle: 'LOBBY' | 'IN_PROGRESS' | 'COMPLETED'
  const [examState, setExamState] = useState('LOBBY');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60); // 15 mins
  const [confirmModal, setConfirmModal] = useState(null); // null | 'SUBMIT' | 'END_EARLY'
  const [examStartedAt, setExamStartedAt] = useState(null);
  const [examFinishedAt, setExamFinishedAt] = useState(null);

  // 15-Minute Countdown Timer
  useEffect(() => {
    if (examState !== 'IN_PROGRESS') return;

    if (timeLeftSeconds <= 0) {
      handleFinalizeExam();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftSeconds, examState]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartExam = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setTimeLeftSeconds(15 * 60);
    setExamStartedAt(new Date());
    setExamState('IN_PROGRESS');
  };

  const handleSelectOption = (optIdx) => {
    if (examState !== 'IN_PROGRESS') return;
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
  const isPassed = score >= 9; // Parivahan Sarathi pass threshold is 9/15
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleFinalizeExam = () => {
    setConfirmModal(null);
    setExamFinishedAt(new Date());
    setExamState('COMPLETED');
  };

  const handleReturnToLobby = () => {
    setExamState('LOBBY');
    setSelectedAnswers({});
    setCurrentIdx(0);
    setTimeLeftSeconds(15 * 60);
    setConfirmModal(null);
  };

  const currentQuestion = RTO_QUIZ_QUESTIONS[currentIdx];
  const qEn = currentQuestion?.questionEn;
  const qMr = currentQuestion?.questionMr;
  const opts = lang === 'mr' ? currentQuestion?.optionsMr : currentQuestion?.optionsEn;

  return (
    <div className="rto-mock-test-page">
      {/* 1. Page Header with Language Switcher */}
      <div className="admin-view-header">
        <div>
          <h1>Parivahan Sarathi RTO Examination Portal</h1>
          <p>
            Government of Maharashtra Computerized Driver Testing Simulator & CMVR 30-Day Mandatory Eligibility Tracker.
          </p>
        </div>

        {/* Language Selector */}
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

      {/* 2. Statutory CMVR 30-Day Mandatory Wait Tracker */}
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

      {/* 3. Portal Interface Shell */}
      <div className="quiz-simulator-shell">
        {/* =========================================================
            STATE 1: PRE-EXAM LOBBY & HALL TICKET VERIFICATION
           ========================================================= */}
        {examState === 'LOBBY' && (
          <div className="exam-lobby-container">
            {/* Candidate Hall Ticket */}
            <div className="hall-ticket-card">
              <div className="hall-ticket-header">
                <div className="hall-ticket-title">
                  <UserCheck size={18} color="var(--color-primary, #B91C1C)" />
                  <h3>Candidate Verification & Hall Ticket</h3>
                </div>
                <span className="portal-live-pill">PARIVAHAN SARATHI VERIFIED</span>
              </div>

              <div className="ticket-meta-grid">
                <div className="ticket-cell">
                  <span className="cell-lbl">Candidate Name</span>
                  <strong className="cell-val">{LEARNER_SARATHI_PROFILE.learnerName}</strong>
                </div>
                <div className="ticket-cell">
                  <span className="cell-lbl">Application / Roll No.</span>
                  <strong className="cell-val tabular-nums">{LEARNER_SARATHI_PROFILE.applicationNo}</strong>
                </div>
                <div className="ticket-cell">
                  <span className="cell-lbl">Learner License No.</span>
                  <strong className="cell-val tabular-nums">{LEARNER_SARATHI_PROFILE.llNumber}</strong>
                </div>
                <div className="ticket-cell">
                  <span className="cell-lbl">Authorized RTO Testing Center</span>
                  <strong className="cell-val">{LEARNER_SARATHI_PROFILE.rtoOffice}</strong>
                </div>
              </div>
            </div>

            {/* Examination Instructions */}
            <div className="exam-rules-card">
              <h4>
                <FileText size={16} color="#c2410c" />
                <span>{lang === 'mr' ? 'परीक्षा नियम आणि सूचना' : 'Official Examination Guidelines & Rules'}</span>
              </h4>

              <ul className="exam-instructions-list">
                <li>
                  <strong>15 Total Questions:</strong> Covers mandatory road signs, cautionary signals, and right-of-way rules under CMVR 1989.
                </li>
                <li>
                  <strong>Passing Criteria:</strong> You must score at least <strong>9 marks out of 15 (60%)</strong> to qualify for the Learner's License.
                </li>
                <li>
                  <strong>Time Limit:</strong> <strong>15 Minutes (15:00)</strong> countdown timer. The portal will automatically submit once time expires.
                </li>
                <li>
                  <strong>Negative Marking:</strong> There is <strong>no negative marking</strong> for incorrect answers.
                </li>
                <li>
                  <strong>Controls:</strong> Use the <strong>"End Exam"</strong> button to exit early or the <strong>"Submit Exam"</strong> button once all questions are attempted.
                </li>
              </ul>
            </div>

            {/* Big Start Examination Action Bar */}
            <div className="lobby-action-bar">
              <div className="lobby-alert-note">
                <AlertCircle size={15} color="#15803D" />
                <span>Once you click Start Examination, your 15-minute timer will immediately begin.</span>
              </div>

              <button
                type="button"
                className="btn-start-examination"
                onClick={handleStartExam}
              >
                <Play size={18} fill="#ffffff" />
                <span>{lang === 'mr' ? 'परीक्षा सुरू करा (Start Exam)' : 'Start Examination'}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            STATE 2: ACTIVE EXAMINATION IN PROGRESS
           ========================================================= */}
        {examState === 'IN_PROGRESS' && (
          <div className="active-exam-container">
            {/* Top Examination Control Toolbar */}
            <div className="active-exam-toolbar">
              <div className="toolbar-left-info">
                <span className="candidate-badge tabular-nums">Roll: {LEARNER_SARATHI_PROFILE.applicationNo}</span>
                <span className="question-count-badge tabular-nums">
                  {lang === 'mr' ? 'प्रश्न' : 'Question'} {currentIdx + 1} of {RTO_QUIZ_QUESTIONS.length}
                </span>
                <span className="answered-pill tabular-nums">
                  {answeredCount} / {RTO_QUIZ_QUESTIONS.length} {lang === 'mr' ? 'उत्तरे' : 'Attempted'}
                </span>
              </div>

              <div className="toolbar-right-actions">
                {/* Live Timer */}
                <div className="timer-badge tabular-nums">
                  <Clock size={16} color={timeLeftSeconds < 180 ? '#B91C1C' : '#334155'} />
                  <span className={timeLeftSeconds < 180 ? 'timer-urgent' : ''}>
                    {formatTimer(timeLeftSeconds)}
                  </span>
                </div>

                {/* End Exam Early Button */}
                <button
                  type="button"
                  className="btn-toolbar-end"
                  onClick={() => setConfirmModal('END_EARLY')}
                  title="End examination early"
                >
                  <StopCircle size={15} />
                  <span>{lang === 'mr' ? 'परीक्षा समाप्त करा' : 'End Exam'}</span>
                </button>

                {/* Submit Final Exam Button */}
                <button
                  type="button"
                  className="btn-toolbar-submit"
                  onClick={() => setConfirmModal('SUBMIT')}
                  title="Submit and finish exam"
                >
                  <CheckCircle2 size={15} />
                  <span>{lang === 'mr' ? 'पेपर सबमिट करा' : 'Submit Exam'}</span>
                </button>
              </div>
            </div>

            {/* Question Panel */}
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

              {/* Bottom Nav Controls */}
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
                      onClick={() => setConfirmModal('SUBMIT')}
                    >
                      <CheckCircle2 size={16} />
                      <span>{lang === 'mr' ? 'चाचणी पूर्ण करा' : 'Review & Submit Exam'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            STATE 3: POST-EXAM RESULTS & DETAILED REVIEW
           ========================================================= */}
        {examState === 'COMPLETED' && (
          <div className="quiz-results-container">
            <div className={`result-hero-banner ${isPassed ? 'passed' : 'failed'}`}>
              <div className="result-icon-bubble">
                {isPassed ? <Award size={36} color="#ffffff" /> : <AlertCircle size={36} color="#ffffff" />}
              </div>
              <div className="result-text-col">
                <span className="result-status-tag">
                  {isPassed ? 'OFFICIAL PARIVAHAN SARATHI PASS MARK' : 'MINIMUM 9 MARKS REQUIRED TO PASS'}
                </span>
                <h2>
                  {isPassed ? 'Congratulations! You Qualified the RTO Computer Exam' : 'Retest Recommended on Road Signs'}
                </h2>
                <p>
                  Candidate: <strong>{LEARNER_SARATHI_PROFILE.learnerName}</strong> • Scored <strong>{score} out of 15</strong> ({Math.round((score / 15) * 100)}%). 
                  {isPassed 
                    ? ' Your score meets the official passing threshold under the Motor Vehicles Act.'
                    : ' Please review the incorrect answers below and retake the simulator.'
                  }
                </p>
              </div>

              <div className="result-actions-stack">
                <button type="button" className="btn-retake-quiz" onClick={handleStartExam}>
                  <RotateCcw size={16} />
                  <span>{lang === 'mr' ? 'पुन्हा चाचणी द्या' : 'Retake Exam'}</span>
                </button>
                <button type="button" className="btn-exit-lobby" onClick={handleReturnToLobby}>
                  <ArrowLeft size={16} />
                  <span>Return to Portal Lobby</span>
                </button>
              </div>
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

      {/* =========================================================
          CONFIRMATION DIALOG MODAL (SUBMIT OR END EARLY)
         ========================================================= */}
      {confirmModal && (
        <div className="learner-modal-backdrop" onClick={() => setConfirmModal(null)}>
          <div className="exam-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrap">
              {confirmModal === 'SUBMIT' ? (
                <CheckCircle2 size={32} color="#15803D" />
              ) : (
                <AlertTriangle size={32} color="#b45309" />
              )}
            </div>

            <h3>
              {confirmModal === 'SUBMIT' 
                ? (lang === 'mr' ? 'तुम्ही परीक्षा सबमिट करू इच्छिता?' : 'Submit Examination Paper?') 
                : (lang === 'mr' ? 'तुम्ही परीक्षा लवकर समाप्त करू इच्छिता?' : 'End Examination Early?')
              }
            </h3>

            <p>
              {confirmModal === 'SUBMIT'
                ? `You have answered ${answeredCount} of 15 questions. Once submitted, your score will be computed immediately.`
                : `You still have ${formatTimer(timeLeftSeconds)} remaining and ${15 - answeredCount} unanswered questions. Unanswered questions will receive 0 marks.`
              }
            </p>

            <div className="confirm-dialog-actions">
              <button
                type="button"
                className="btn-cancel-modal"
                onClick={() => setConfirmModal(null)}
              >
                {lang === 'mr' ? 'परीक्षा सुरू ठेवा (Continue)' : 'Continue Exam'}
              </button>

              <button
                type="button"
                className={confirmModal === 'SUBMIT' ? 'btn-confirm-submit' : 'btn-confirm-end'}
                onClick={handleFinalizeExam}
              >
                {confirmModal === 'SUBMIT' 
                  ? (lang === 'mr' ? 'होय, सबमिट करा' : 'Yes, Submit Exam')
                  : (lang === 'mr' ? 'होय, समाप्त करा' : 'Yes, End Early')
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
