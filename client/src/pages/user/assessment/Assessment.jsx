
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "../../../styles/user/assessment/assessment.css";

const answerOptions = [
  "Strongly agree",
  "Agree",
  "Disagree",
  "Strongly disagree",
];

const questions = [
  {
    category: "INTERESTS & READINESS",
    question:
      "I enjoy working with technology and solving practical problems.",
  },
  {
    category: "CAREER EXPLORATION",
    question:
      "I am interested in learning about different careers and the opportunities they offer.",
  },
  {
    category: "CAREER CLARITY",
    question:
      "I have an idea of the kind of career that I would like to pursue.",
  },
  {
    category: "CAREER INITIATIVE",
    question:
      "I am willing to take steps to develop the skills needed for my future career.",
  },
];

function Assessment() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [pageView, setPageView] = useState("questions");
  const [editedQuestion, setEditedQuestion] = useState(0);

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

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
    } else {
      setPageView("review");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const handleReview = () => {
    setEditedQuestion(currentQuestion);
    setPageView("review");
  };

  const handleEditAnswer = (index) => {
    setCurrentQuestion(index);
    setPageView("questions");
  };

  const handleSubmit = () => {
    setPageView("submitted");
  };

  return (
    <main className="assessment-page">
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

      {pageView === "questions" && (
        <>
          <section className="assessment-progress-card">
            <div className="progress-heading">
              <div>
                <span className="assessment-eyebrow">
                  YOUR CAREER ASSESSMENT
                </span>
                <h2>
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
              </div>

              <p>Your answers stay here as you go.</p>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-valuenow={currentQuestion + 1}
              aria-valuemin={1}
              aria-valuemax={questions.length}
              aria-label="Assessment progress"
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          <section className="assessment-content">
            <article className="assessment-question-card">
              <span className="assessment-eyebrow">
                {question.category}
              </span>

              <h2 className="assessment-question">
                {question.question}
              </h2>

              <p className="assessment-instruction">
                Choose the response that best describes you.
              </p>

              <div className="assessment-options">
                {answerOptions.map((option) => (
                  <label
                    key={option}
                    className={`assessment-option ${
                      selectedAnswer === option ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswer(option)}
                    />

                    <span className="custom-radio" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

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
                  disabled={!selectedAnswer}
                >
                  {currentQuestion === questions.length - 1
                    ? "Review responses"
                    : "Next question"}
                </button>
              </div>
            </article>

            <aside className="assessment-side-column">
              <section className="assessment-reflection-card">
                <span className="reflection-eyebrow">
                  A LITTLE REFLECTION.
                </span>

                <h2>A clearer direction.</h2>

                <p>
                  There are no right or wrong answers. Your interests and
                  readiness help shape the guidance you receive.
                </p>

                <div className="reflection-divider" />

                <small>
                  {answeredCount > 0
                    ? `You've answered ${answeredCount} of ${questions.length} questions. You can review your responses before submitting.`
                    : "Take your time. Answer each question based on your own interests and experiences."}
                </small>
              </section>

              <section className="assessment-submit-card">
                <span>BEFORE YOU FINISH</span>
                <h2>Make every answer count.</h2>
                <p>
                  Check your responses before submitting your assessment.
                </p>

                <button
                  type="button"
                  onClick={handleReview}
                  disabled={answeredCount !== questions.length}
                >
                  Review &amp; submit
                </button>
              </section>
            </aside>
          </section>
        </>
      )}

      {pageView === "review" && (
        <section className="assessment-review-card">
          <span className="assessment-eyebrow">
            YOUR CAREER ASSESSMENT
          </span>

          <h2>Review your responses.</h2>

          <p className="review-description">
            Take a moment to check your answers. You can still make changes
            before submitting.
          </p>

          <div className="review-list">
            {questions.map((item, index) => (
              <article className="review-item" key={index}>
                <div>
                  <span className="assessment-eyebrow">
                    QUESTION {index + 1} · {item.category}
                  </span>
                  <h3>{item.question}</h3>
                  <p>{answers[index]}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleEditAnswer(index)}
                >
                  Edit answer
                </button>
              </article>
            ))}
          </div>

          <div className="review-actions">
            <button
              type="button"
              className="previous-question-button"
              onClick={() => {
                setCurrentQuestion(editedQuestion);
                setPageView("questions");
              }}
            >
              Back to assessment
            </button>

            <button
              type="button"
              className="next-question-button"
              onClick={handleSubmit}
            >
              Submit assessment
            </button>
          </div>
        </section>
      )}

      {pageView === "submitted" && (
        <section className="assessment-success-card">
          <div className="success-check">✓</div>
          <span className="assessment-eyebrow">
            ASSESSMENT COMPLETED
          </span>
          <h2>Thank you for completing your assessment!</h2>
          <p>
            Your responses have been reviewed in this demonstration.
            Career recommendations and actual submission will be added
            when the backend is integrated.
          </p>

          <button
            type="button"
            className="next-question-button"
            onClick={() => navigate("/")}
          >
            Return to home
          </button>
        </section>
      )}

      <footer className="assessment-footer">
        <strong>ALS CAREER SYSTEM EVALUATOR</strong>
        <span>Private responses. Personalized guidance.</span>
      </footer>
    </main>
  );
}

export default Assessment;