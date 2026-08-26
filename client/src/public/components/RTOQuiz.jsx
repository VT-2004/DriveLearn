import { useState } from 'react';
import {
    Award, CheckCircle2, XCircle, RotateCcw,
    HelpCircle, ArrowRight, ShieldCheck, Sparkles, Bike
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './RTOQuiz.css';

const RTO_QUESTIONS = [
    {
        id: 1,
        question: 'What does a flashing yellow traffic light indicate at an intersection in India?',
        options: [
            'Stop completely and wait for green light',
            'Slow down and proceed with extreme caution',
            'Speed up to clear the intersection quickly',
            'Take a mandatory U-turn',
        ],
        correctAnswer: 1,
        explanation: 'A flashing yellow light warns drivers to slow down and cross with caution.',
    },
    {
        id: 2,
        question: 'What is the legal minimum age to apply for a 2-Wheeler (without gear) license in Maharashtra?',
        options: ['18 Years', '16 Years', '21 Years', '15 Years'],
        correctAnswer: 1,
        explanation: 'Under Section 4 of the Motor Vehicles Act, 16 years is the minimum age for 2-wheelers up to 50cc with parental consent.',
    },
    {
        id: 3,
        question: 'When approaching an unmanned railway level crossing, what must a driver do?',
        options: [
            'Honk loudly and drive through fast',
            'Stop the vehicle, look both sides, and ensure no train is approaching before crossing',
            'Follow the vehicle in front closely',
            'Wait for other vehicles to cross first',
        ],
        correctAnswer: 1,
        explanation: 'Drivers must stop and physically ensure no train is approaching before crossing.',
    },
    {
        id: 4,
        question: 'On a one-way road, which of the following actions is strictly prohibited?',
        options: [
            'Overtaking from the right side',
            'Parking on the designated curb',
            'Driving in reverse gear (unless unavoidable to turn into a bay)',
            'Using indicator lights',
        ],
        correctAnswer: 2,
        explanation: 'Reversing on a one-way road is hazardous and strictly prohibited by RTO rules.',
    },
    {
        id: 5,
        question: 'While riding a two-wheeler, who is legally required to wear a BIS-certified helmet?',
        options: [
            'Only the main rider',
            'Only if traveling on highways',
            'Both the rider and the pillion passenger',
            'Only male riders',
        ],
        correctAnswer: 2,
        explanation: 'Both the rider and pillion passenger must wear standard helmets as per the Motor Vehicles Act.',
    },
];

export default function RTOQuiz() {
    const [quizState, setQuizState] = useState('intro'); // 'intro' | 'quiz' | 'result'
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);

    const handleStartQuiz = () => {
        setQuizState('quiz');
        setCurrentQuestion(0);
        setSelectedOption(null);
        setUserAnswers([]);
        setScore(0);
    };

    const handleSelectOption = (index) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = () => {
        if (selectedOption === null) return;

        const isCorrect = selectedOption === RTO_QUESTIONS[currentQuestion].correctAnswer;
        const newScore = isCorrect ? score + 1 : score;
        setScore(newScore);

        setUserAnswers([
            ...userAnswers,
            {
                questionId: RTO_QUESTIONS[currentQuestion].id,
                selected: selectedOption,
                isCorrect,
            },
        ]);

        if (currentQuestion + 1 < RTO_QUESTIONS.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            setQuizState('result');
        }
    };

    const percentage = Math.round((score / RTO_QUESTIONS.length) * 100);
    const isPassed = percentage >= 60;

    return (
        <section className="quiz-section-container" id="rto-mock-quiz">
            <div className="container">
                <div className="rto-dual-grid">
                    {/* LEFT BOX: Interactive RTO Mock Quiz */}
                    <div className="quiz-wrapper-card">
                        {/* State 1: Intro Screen */}
                        {quizState === 'intro' && (
                            <div className="quiz-intro-box">
                                <div className="quiz-tag">
                                    <Sparkles size={16} />
                                    <span>Step 1: Free Practice Quiz</span>
                                </div>
                                <h2>Test Your RTO Knowledge First</h2>
                                <p>
                                    Take our <strong>2-minute practice mock test</strong> before booking your official slot. 5 quick traffic sign & road rule questions.
                                </p>
                                <div className="quiz-perks-row">
                                    <span>⏱️ 5 Questions</span>
                                    <span>•</span>
                                    <span>🎯 Instant Score</span>
                                    <span>•</span>
                                    <span>🎁 ₹15 Wallet Bonus</span>
                                </div>
                                <button onClick={handleStartQuiz} className="btn-start-quiz">
                                    <span>Start Free Mock Test</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        )}

                        {/* State 2: Active Question Screen */}
                        {quizState === 'quiz' && (
                            <div className="quiz-active-box">
                                <div className="quiz-progress-header">
                                    <span className="q-counter">
                                        Question <strong>{currentQuestion + 1}</strong> of {RTO_QUESTIONS.length}
                                    </span>
                                    <div className="progress-track">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${((currentQuestion + 1) / RTO_QUESTIONS.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <h3 className="quiz-question-title">
                                    {RTO_QUESTIONS[currentQuestion].question}
                                </h3>

                                <div className="quiz-options-list">
                                    {RTO_QUESTIONS[currentQuestion].options.map((option, index) => {
                                        const isSelected = selectedOption === index;
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleSelectOption(index)}
                                            >
                                                <span className="opt-letter">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                <span className="opt-text">{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="quiz-action-bar">
                                    <p className="quiz-hint">Select one option to continue</p>
                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={selectedOption === null}
                                        className="btn-next-q"
                                    >
                                        <span>{currentQuestion + 1 === RTO_QUESTIONS.length ? 'View Results' : 'Next'}</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* State 3: Results Screen */}
                        {quizState === 'result' && (
                            <div className="quiz-result-box">
                                <div className={`result-score-circle ${isPassed ? 'passed' : 'failed'}`}>
                                    <Award size={40} />
                                    <span className="score-val">{percentage}%</span>
                                </div>

                                {isPassed ? (
                                    <>
                                        <div className="pass-badge">
                                            <CheckCircle2 size={16} />
                                            <span>RTO TEST READY! 🎉</span>
                                        </div>
                                        <h3>Great Job! You Passed the Mock Test!</h3>
                                        <p className="result-msg">
                                            You scored <strong>{score}/{RTO_QUESTIONS.length}</strong>. You understand Maharashtra road rules!
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="fail-badge">
                                            <XCircle size={16} />
                                            <span>Needs Practice ({score}/{RTO_QUESTIONS.length})</span>
                                        </div>
                                        <h3>Don't Worry, Keep Practicing!</h3>
                                        <p className="result-msg">
                                            You needed 60% to pass. Join an RTO-approved school for practical track lessons.
                                        </p>
                                    </>
                                )}

                                <div className="result-cta-group">
                                    <button onClick={handleStartQuiz} className="btn-retake">
                                        <RotateCcw size={16} />
                                        <span>Retake</span>
                                    </button>

                                    <Link to="/find-school?course=2wheeler" className="btn-enroll-pass">
                                        <Bike size={16} />
                                        <span>Book School (₹999)</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT BOX: Official Govt Driving License Application Portal */}
                    <div className="govt-license-card">
                        <div className="govt-tag">
                            <ShieldCheck size={16} />
                            <span>Official Govt of India Portal</span>
                        </div>

                        <h2>Apply for Govt Driving License </h2>
                        <p className="govt-card-subtitle">
                            DriveLearn India is a certified training directory. Official Driving Licenses are issued directly by the <strong>Ministry of Road Transport & Highways (MoRTH)</strong> through Sarathi Parivahan.
                        </p>

                        {/* Step-by-step checklist */}
                        <div className="govt-steps-list">
                            <div className="govt-step-item">
                                <div className="step-num">1</div>
                                <div>
                                    <strong>Apply Online (Form 2)</strong>
                                    <span>Submit Aadhaar & basic details on Sarathi portal</span>
                                </div>
                            </div>
                            <div className="govt-step-item">
                                <div className="step-num">2</div>
                                <div>
                                    <strong>Upload Documents & Pay Fee</strong>
                                    <span>Age proof, address proof, & standard govt fee</span>
                                </div>
                            </div>
                            <div className="govt-step-item">
                                <div className="step-num">3</div>
                                <div>
                                    <strong>Book Slot at Maharashtra RTO</strong>
                                    <span>Pune (MH-12), Mumbai (MH-01/02), Nagpur (MH-31) etc.</span>
                                </div>
                            </div>
                        </div>

                        {/* Official External Link Button */}
                        <a
                            href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-govt-redirect"
                        >
                            <span>Go to Official Sarathi Parivahan Portal</span>
                            <ArrowRight size={18} />
                        </a>

                        <div className="govt-disclaimer-note">
                            <span>🔒 Direct redirect to <strong>sarathi.parivahan.gov.in</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
