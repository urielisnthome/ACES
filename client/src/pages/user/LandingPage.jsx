
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/user/landing-page.css";

import logo from "../../assets/logo.png";

const evaluationAreas = [
  "RIASEC Vocational Interest",
  "Skills & Competencies",
  "Academic Background",
  "Personal Circumstances",
  "Career Values",
  "Career Decision Readiness",
];

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const studentName =
    user?.name ||
    user?.full_name ||
    user?.student_name ||
    user?.first_name ||
    "Student";

  const studentLrn =
    user?.lrn ||
    user?.LRN ||
    user?.learner_reference_number ||
    "LRN not available";

  const assessmentStatus =
    user?.assessment_status || "Not Started";

  return (
    <main className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">
          <img src={logo} alt="ACES Logo" />
          <h2>ALS Career Evaluator System</h2>
        </div>

        <button
          className="landing-header-button"
          onClick={() => navigate("/login")}
        >
          STUDENT ACCESS
        </button>
      </header>

      <div className="landing-container">
        <section className="landing-main-grid">
          <div className="landing-welcome-card">
            <div className="landing-welcome-heading">
              <div className="landing-eyebrow-group">
                <span className="landing-eyebrow">
                  ALS CAREER EVALUATOR SYSTEM
                </span>
                <span className="landing-guidance">
                  • DepEd Guidance
                </span>
              </div>

              <h1>Welcome!</h1>
            </div>

            <div className="landing-student-details">
              <div className="landing-detail-item">
                <span>STUDENT NAME</span>
                <strong>{studentName}</strong>
              </div>

              <div className="landing-detail-item">
                <span>LRN NUMBER</span>
                <strong>{studentLrn}</strong>
              </div>

              <div className="landing-detail-item">
                <span>STATUS</span>
                <strong className="landing-status">
                  <span className="landing-status-icon">✓</span>
                  {assessmentStatus}
                </strong>
              </div>
            </div>

            <p className="landing-welcome-description">
              You are about to begin your 6-part career evaluation. Take your
              time—there are no wrong answers, and your responses save
              automatically as you move through each section.
            </p>

            <div className="landing-welcome-bottom">
              <button
                className="landing-primary-button"
                onClick={() => navigate("/assessment")}
              >
                Start Assessment
              </button>

              <span>Begins at section 1 RIASEC</span>
            </div>
          </div>

          <aside className="landing-evaluation-panel">
            <div className="landing-panel-heading">
              <span className="landing-panel-eyebrow">
                6 EVALUATION AREAS
              </span>

              <h2>What the assessment covers</h2>

              <p>
                There are no right or wrong answers. Simply choose what feels
                true to you.
              </p>
            </div>

            <div className="landing-evaluation-list">
              {evaluationAreas.map((area, index) => (
                <div className="landing-evaluation-item" key={area}>
                  <span className="landing-area-number">
                    {index + 1}
                  </span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="landing-benefits">
          <article className="landing-benefit-card">
            <div className="landing-benefit-icon">▤</div>

            <div>
              <h3>No Wrong Answers</h3>
              <p>
                Respond honestly based on what interests you and what feels
                realistic for your situation.
              </p>
            </div>
          </article>

          <article className="landing-benefit-card">
            <div className="landing-benefit-icon">▣</div>

            <div>
              <h3>Auto-Saved Progress</h3>
              <p>
                Every choice you select is saved automatically so you can
                continue smoothly between sections.
              </p>
            </div>
          </article>

          <article className="landing-benefit-card">
            <div className="landing-benefit-icon landing-benefit-icon-dark">
              ↝
            </div>

            <div>
              <h3>Results & Roadmap</h3>
              <p>
                Once all 6 sections are complete, you will receive your career
                match and visual roadmap.
              </p>
            </div>
          </article>
        </section>
      </div>

      <footer className="landing-footer">
        <span>ACES Portal</span>
      </footer>
    </main>
  );
}

export default LandingPage;