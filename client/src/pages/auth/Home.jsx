
import { useNavigate } from "react-router-dom";
import "./home.css";

import logo from "../../assets/logo.png";
import schoolBuilding from "../../assets/school-building.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="home-brand">
          <img src={logo} alt="ACES Logo" />
          <h2>ALS Career Evaluator System</h2>
        </div>

        <button
          className="student-access-button"
          onClick={() => navigate("/login")}
        >
          STUDENT ACCESS
        </button>
      </header>

      <section className="home-content">
        <div className="home-left-column">
          <div className="home-intro-card">
            <span className="home-eyebrow">A PLACE TO BEGIN</span>

            <h1>
              Your Career.
              <br />
              Our guidance.
            </h1>

            <p className="home-description">
              An assessment that can help us lead you
              <br className="desktop-break" />
              to a career that is fit for you.
            </p>

            <div className="home-divider"></div>

            <h3>Start your evaluation now!</h3>

            <button
              className="home-signin-button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>

          <div className="home-school-card">
            <span>NEED AN ACCOUNT?</span>
            <h2>Start with your school.</h2>
            <p>
              Ask your school administrator to register your student
              record or help with sign-in.
            </p>
          </div>
        </div>

        <div className="home-image-container">
          <img
            src={schoolBuilding}
            alt="School building"
            className="home-school-image"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
