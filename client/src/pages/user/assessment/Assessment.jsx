import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "../../../styles/user/assessment/assessment.css";

const stages = [
  { title: "RIASEC", subtitle: "Vocational Interest" },
  { title: "Skills", subtitle: "Competencies" },
  { title: "Academic", subtitle: "Background" },
  { title: "Personal", subtitle: "Circumstances" },
  { title: "Career", subtitle: "Values" },
  { title: "Readiness", subtitle: "Decision Prep" },
];

const answerOptions = [
  {
    label: "Strongly Agree",
    symbol: "▲",
    description:
      "I actively seek hands-on digital tools, gadgets, or troubleshooting tasks.",
    style: "green",
  },
  {
    label: "Agree",
    symbol: "◆",
    description:
      "I am comfortable with technology and prefer direct application over theory.",
    style: "forest",
  },
  {
    label: "Disagree",
    symbol: "●",
    description:
      "I tend to prioritize creative expression, arts, or teamwork over hardware.",
    style: "yellow",
  },
  {
    label: "Strongly Disagree",
    symbol: "■",
    description:
      "I avoid troubleshooting technical issues and prefer purely relational or verbal work.",
    style: "charcoal",
  },
];

const questions = [
  {
    stage: 0,
    category: "RIASEC · VOCATIONAL INTEREST",
    question:
      "I enjoy working with technology and solving practical problems.",
  },
  {
    stage: 1,
    category: "SKILLS AND COMPETENCIES",
    question:
      "I enjoy working with technology and solving practical problems.",
  },
  {
    stage: 2,
    category: "ACADEMIC BACKGROUND",
    question:
      "The subjects I have studied connect with the work I may want to do.",
  },
  {
    stage: 3,
    category: "PERSONAL CIRCUMSTANCES",
    question:
      "I consider my personal situation when thinking about a future career.",
  },
  {
    stage: 4,
    category: "CAREER VALUES",
    question:
      "I value work that gives me opportunities to grow and contribute.",
  },
  {
    stage: 5,
    category: "CAREER DECISION READINESS",
    question:
      "I am ready to take a practical next step toward a career.",
  },
];

function Assessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [pageView, setPageView] = useState("questions");
  const [showFinishModal, setShowFinishModal] = useState(false);

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const activeStage = question.stage;

  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (pageView !== "processing") return;

    const timer = window.setTimeout(() => {
      setPageView("results");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [pageView]);

  const handleAnswer = (answer) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    } else if (answeredCount === questions.length) {
      setShowFinishModal(true);
    }
  };

  const handleReviewAndSubmit = () => {
    setShowFinishModal(false);
    setPageView("processing");
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  return (
    <main className="assessment-page">
      {/* HEADER */}
      <header className="assessment-header">
        <div className="assessment-brand">
          <img src={logo} alt="ACES Logo" />
          <h1>ALS Career System Evaluator</h1>
        </div>

        <button
          type="button"
          className="assessment-access-button"
          onClick={() => navigate("/login")}
        >
          STUDENT ACCESS
        </button>
      </header>

      {/* PAGE TITLE */}
      {pageView === "questions" && (
        <h1 className="assessment-page-title">
          STUDENT ASSESSMENT
        </h1>
      )}

      {/* QUESTION VIEW */}
      {pageView === "questions" && (
        <>
          {/* SIX-STAGE PROGRESS TRACKER */}
          <section className="stage-progress">
            <div className="stage-pills">
              {stages.map((stage, index) => {
                const isActive = index === activeStage;
                const isCompleted = Boolean(answers[index]);
                const status = isActive
                  ? "active"
                  : isCompleted
                  ? "completed"
                  : "upcoming";

                return (
                  <button
                    type="button"
                    key={stage.title}
                    className={`stage-pill ${status}`}
                    onClick={() => {
                      if (index !== currentQuestion) {
                        setCurrentQuestion(index);
                      }
                    }}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`Go to section ${index + 1}: ${stage.title}`}
                  >
                    <div className="stage-number">
                      {isCompleted ? "✓" : index + 1}
                    </div>

                    <div className="stage-copy">
                      <strong>
                        {index + 1}. {stage.title}
                      </strong>
                      <small>{stage.subtitle}</small>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* SEGMENTED PROGRESS BAR */}
            <div className="segmented-progress">
              {stages.map((stage, index) => (
                <span
                  key={stage.title}
                  className={
                    index === activeStage
                      ? "current"
                      : answers[index]
                      ? "done"
                      : ""
                  }
                />
              ))}
            </div>
          </section>

          {/* QUESTION CARD */}
          <section
            key={currentQuestion}
            className="assessment-question-card question-transition"
          >
            <span className="assessment-eyebrow">
              {question.category}
            </span>

            <h2 className="assessment-question">
              {currentQuestion + 1}. “{question.question}”
            </h2>

            <p className="assessment-instruction">
              Tap or press the option that best reflects how you
              naturally work, think, and choose in your daily
              activities.
            </p>

            {/* FOUR INTERACTIVE ANSWER TILES */}
            <div className="assessment-options">
              {answerOptions.map((option) => {
                const isSelected =
                  selectedAnswer === option.label;

                return (
                  <button
                    type="button"
                    key={option.label}
                    className={`answer-tile ${option.style} ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => handleAnswer(option.label)}
                    aria-pressed={isSelected}
                  >
                    <div className="answer-content">
                      <span className="answer-symbol">
                        {option.symbol}
                      </span>

                      <div className="answer-text">
                        <div className="answer-heading">
                          <strong>{option.label}</strong>

                          {isSelected && (
                            <span className="selected-badge">
                              Selected
                            </span>
                          )}
                        </div>

                        <p>{option.description}</p>
                      </div>
                    </div>

                    <span className="answer-indicator">
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* NAVIGATION */}
            <div className="assessment-navigation">
              <button
                type="button"
                className="previous-question-button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous question
              </button>

              <button
                type="button"
                className="next-question-button"
                onClick={handleNext}
                disabled={
                  !selectedAnswer ||
                  (currentQuestion === questions.length - 1 &&
                    answeredCount !== questions.length)
                }
              >
                {currentQuestion === questions.length - 1
                  ? "Finish"
                  : "Next question"}
              </button>
            </div>
          </section>
        </>
      )}

      {/* PROCESSING VIEW */}
      {pageView === "processing" && (
        <section className="assessment-processing-page">
          <div className="processing-heading">Processing..</div>

          <section className="processing-card" aria-live="polite">
            <div className="processing-card-header">
              <div>
                <h2>Almost ready.</h2>
                <p>
                  Organizing your assessment responses into your personalized career
                  pathway. This only takes a moment.
                </p>
              </div>
              <div className="processing-icon" aria-hidden="true">
                <span>↻</span>
              </div>
            </div>

            <div className="processing-card-body">
              <div className="processing-progress-heading">
                <strong>Processing your answers</strong>
                <span>85%</span>
              </div>

              <div
                className="processing-progress-track"
                role="progressbar"
                aria-label="Assessment processing progress"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="85"
              >
                <span className="processing-progress-fill" />
              </div>

              <div className="processing-status">
                <span className="processing-saved">
                  <span className="processing-status-check">✓</span>
                  Responses saved
                </span>
                <span className="processing-status-dot">•</span>
                <span>Matching career tracks</span>
              </div>

              <div className="processing-divider" />

              <div className="completed-sections-heading">
                <span>COMPLETED SECTIONS</span>
                <strong>{answeredCount} of {questions.length} Done</strong>
              </div>

              <div className="completed-sections-grid">
                {stages.map((stage, index) => {
                  const sectionNames = [
                    "RIASEC Vocational Interest",
                    "Skills & Competencies",
                    "Academic Background",
                    "Personal Circumstances",
                    "Career Values",
                    "Career Decision Readiness",
                  ];

                  return (
                    <div
                      className={`completed-section ${
                        answers[index] ? "is-complete" : "is-pending"
                      }`}
                      key={stage.title}
                    >
                      <span className="completed-section-check">
                        {answers[index] ? "✓" : index + 1}
                      </span>
                      <strong>
                        {index + 1}. {sectionNames[index]}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </section>
      )}

      {/* RESULTS VIEW */}
      {pageView === "results" && (
        <section className="assessment-results-page">
          <div className="results-intro">
            <span className="results-eyebrow">YOUR ASSESSMENT RESULTS</span>
            <h2>A path that builds on you.</h2>
            <p>
              Explore your recommended direction, then turn it into a practical next step.
            </p>
          </div>

          <div className="results-recommendations">
            <article className="primary-recommendation">
              <span>Primary Recommendation</span>
              <h3>Information &amp;<br /> communications technology</h3>
              <p>
                Build practical digital skills and explore entry-level technical
                support, computer servicing, or further ICT study.
              </p>
            </article>

            <div className="alternative-recommendations">
              <article className="alternative-pathway">
                <span>Alternative Pathway</span>
                <h3>Business &amp; Entrepreneurship</h3>
                <p>
                  Business entrepreneurship (or entrepreneur), which refers to
                  creating, launching, and running a new business while taking on
                  financial risk to make a profit or solve a problem.
                </p>
              </article>

              <article className="alternative-pathway">
                <span>Alternative Pathway</span>
                <h3>Healthcare Services</h3>
                <p>
                  Medical, therapeutic, and support services provided by licensed
                  professionals and health organizations to promote, maintain,
                  restore, or improve human health.
                </p>
              </article>
            </div>
          </div>

          <section className="generated-explanation">
            <h3>Generated Explanation</h3>
            <p>
              This sample profile combines interest in practical problem-solving
              with readiness to explore a pathway. ICT is an illustrative first
              direction; business remains an alternative to discuss with your
              guidance counselor.
            </p>
          </section>

          <div className="results-actions">
            <button
              type="button"
              className="next-question-button results-roadmap-button"
              onClick={() => setPageView("roadmap")}
            >
              View my roadmap
            </button>
          </div>
        </section>
      )}

      {/* PERSONALIZED ROADMAP VIEW */}
      {pageView === "roadmap" && (
        <section className="assessment-roadmap-page">
          <div className="roadmap-intro">
            <span>YOUR NEXT STEPS - Information Communications Technology</span>
            <h2>Personalized Roadmap</h2>
            <p>From where you are to what comes next — one achievable step at a time.</p>
          </div>

          <section className="roadmap-board" aria-label="Your four-step ICT roadmap">
            <svg
              className="roadmap-path"
              viewBox="0 0 1160 390"
              preserveAspectRatio="none"
              role="img"
              aria-label="A winding road connecting four career development steps"
            >
              <path
                className="roadmap-road"
                d="M 35 260 L 180 260 C 255 260 260 145 350 145 L 455 145 C 545 145 550 260 640 260 L 760 260 C 850 260 855 155 940 155 L 1085 155"
              />
              <path
                className="roadmap-road-center"
                d="M 35 260 L 180 260 C 255 260 260 145 350 145 L 455 145 C 545 145 550 260 640 260 L 760 260 C 850 260 855 155 940 155 L 1085 155"
              />
            </svg>

            <article className="roadmap-step roadmap-step-one">
              <div className="roadmap-step-copy">
                <span className="roadmap-step-kicker">01 • FOUNDATION</span>
                <h3>Core Digital Skills</h3>
                <p>Build familiarity with operating systems, setup, and basic troubleshooting.</p>
              </div>
              <div className="roadmap-node roadmap-node-green">
                <span aria-hidden="true">▱</span>
              </div>
              <span className="roadmap-node-stem" />
              <span className="roadmap-node-dot" />
            </article>

            <article className="roadmap-step roadmap-step-two">
              <div className="roadmap-node roadmap-node-yellow">
                <span aria-hidden="true">⚒</span>
              </div>
              <span className="roadmap-node-stem" />
              <span className="roadmap-node-dot" />
              <div className="roadmap-step-copy">
                <span className="roadmap-step-kicker">02 • PRACTICE</span>
                <h3>Practical ICT Training</h3>
                <p>Develop hands-on skills in hardware servicing, networking, and helpdesk support.</p>
              </div>
            </article>

            <article className="roadmap-step roadmap-step-three">
              <div className="roadmap-step-copy">
                <span className="roadmap-step-kicker">03 • CREDENTIAL</span>
                <h3>Earn Qualification</h3>
                <p>Complete your practical skills assessment (TESDA NC II).</p>
              </div>
              <div className="roadmap-node roadmap-node-green">
                <span aria-hidden="true">♙</span>
              </div>
              <span className="roadmap-node-stem" />
              <span className="roadmap-node-dot" />
            </article>

            <article className="roadmap-step roadmap-step-four">
              <div className="roadmap-node roadmap-node-dark">
                <span aria-hidden="true">⚑</span>
              </div>
              <span className="roadmap-node-stem" />
              <span className="roadmap-node-dot" />
              <div className="roadmap-step-copy">
                <span className="roadmap-step-kicker">04 • NEXT CHAPTER</span>
                <h3>Career Launch</h3>
                <p>Enter IT support roles or continue into formal ICT track education.</p>
              </div>
            </article>
          </section>
        </section>
      )}

      {/* FOOTER */}
      {/* FINISH CONFIRMATION MODAL */}
      {showFinishModal && (
        <div
          className="finish-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowFinishModal(false);
            }
          }}
        >
          <section
            className="finish-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="finish-modal-title"
            aria-describedby="finish-modal-description"
          >
            <span className="finish-modal-eyebrow">BEFORE YOU FINISH</span>
            <h2 id="finish-modal-title">Make every answer count.</h2>
            <p id="finish-modal-description">
              Check your responses before submitting your assessment.
            </p>
            <button
              type="button"
              className="finish-modal-submit"
              onClick={handleReviewAndSubmit}
            >
              Review &amp; submit
            </button>
          </section>
        </div>
      )}

      {pageView === "questions" && (
      <footer className="assessment-footer">
        <span>Private responses. Personalized guidance.</span>
      </footer>
      )}
    </main>
  );
}

export default Assessment;
