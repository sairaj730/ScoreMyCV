import React from "react";
import "./ScoreDisplay.css";

const ScoreDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <div className="score-display">
      <div className="score-display-columns">
        <div className="left-column">
          <div className="score-card">
            <h2>Your Score</h2>
            <div className="circular-progress-container">
              <div
                className="circular-progress-bar"
                style={{ '--score': result.score }}
              >
                <div className="score-text">{result.score}</div>
              </div>
            </div>
            <p className="score-description">
              This score represents the percentage of keywords from the job
              description that were found in your resume.
            </p>
          </div>

          <div className="suggestions-card">
            <h3>🎯 Actionable Steps to Boost Your Score</h3>
            <p>
              To significantly improve your resume's alignment with this job description, focus on strategically incorporating the following <strong>Missing Keywords</strong>. Only add skills you genuinely possess and can demonstrate.
            </p>
            <p className="suggestion-tip">
              💡 <strong>Tip:</strong> Consider weaving these terms into your:
              <ul>
                <li><strong>Skills Section:</strong> For direct listing.</li>
                <li><strong>Experience Descriptions:</strong> Describe how you used these skills in past roles.</li>
                <li><strong>Project Details:</strong> Highlight projects where you applied these technologies.</li>
              </ul>
            </p>
            <h4>Missing Keywords to Consider:</h4>
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
            <p className="suggestion-conclusion">
              By adding relevant missing keywords, you can significantly increase your resume's visibility to Applicant Tracking Systems (ATS) and recruiters.
            </p>
          </div>
        </div>

        <div className="right-column">
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
      </div>
    </div>
  );
};

export default ScoreDisplay;