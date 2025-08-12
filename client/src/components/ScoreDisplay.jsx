import React from "react";
import "./ScoreDisplay.css";

const ScoreDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <div className="score-display">
      <div className="score-card">
        <h2>Your Score</h2>
        <p className="score-value">{result.score} / 100</p>
        <p className="score-description">
          This score represents the percentage of keywords from the job
          description that were found in your resume.
        </p>
      </div>

      <div className="suggestions-card">
        <h3>How to Improve Your Score</h3>
        <p>
          Your resume is missing some important keywords from the job description.
          To better align with the role and increase your score, consider adding
          the following terms to your resume where relevant:
        </p>
        <div className="keywords-list missing">
          {result.missingSkills && result.missingSkills.length > 0 ? (
            result.missingSkills.map((s) => (
              <span key={s} className="keyword-badge">
                {s}
              </span>
            ))
          ) : (
            <p>No keywords missing. Great job!</p>
          )}
        </div>
      </div>

      <div className="keywords-card">
        <h4>Matched Keywords</h4>
        <div className="keywords-list matched">
          {result.matchedSkills && result.matchedSkills.length > 0 ? (
            result.matchedSkills.map((s) => (
              <span key={s} className="keyword-badge">
                {s}
              </span>
            ))
          ) : (
            <p>No keywords matched.</p>
          )}
        </div>
      </div>

      <div className="resume-preview-card">
        <h3>Parsed Resume Text</h3>
        <pre className="resume-preview">{result.parsedResumeText}</pre>
      </div>
    </div>
  );
};

export default ScoreDisplay;
