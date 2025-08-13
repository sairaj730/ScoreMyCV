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
        <h3 className="card-title">🎯 Actionable Steps to Boost Your Score</h3>
        
        <p className="card-description">
          To improve your resume’s match with this job, focus on incorporating the
          <strong> missing keywords </strong> below. Only add skills you genuinely possess.
        </p>

        <div className="suggestion-tip">
          💡 <strong>Tip:</strong> You can integrate these into:
          <ul>
            <li><strong>Skills Section:</strong> Direct listing of abilities.</li>
            <li><strong>Experience:</strong> Show how you’ve applied them.</li>
            <li><strong>Projects:</strong> Highlight relevant achievements.</li>
          </ul>
        </div>

        <h4 className="keywords-heading">🚀 Missing Keywords to Consider:</h4>

        <div className="keywords-list missing">
          {result.missingSkills && result.missingSkills.length > 0 ? (
            result.missingSkills.map((s) => (
              <span key={s} className="keyword-badge">
                {s}
              </span>
            ))
          ) : (
            <p className="no-missing">✅ No keywords missing. Great job!</p>
          )}
        </div>

        <p className="suggestion-conclusion">
          Adding relevant missing keywords can greatly boost your visibility in Applicant Tracking Systems and to recruiters.
        </p>
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
