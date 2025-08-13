import React from "react";
import "./ScoreDisplay.css";

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function numberToColorHsl(i, min, max) {
    // Normalize i to a 0-1 ratio based on min and max
    var ratio = (i - min) / (max - min);

    // Clamp ratio to be within 0 and 1
    if (ratio < 0) {
        ratio = 0;
    } else if (ratio > 1) {
        ratio = 1;
    }

    // As the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value.
    // ratio * 1.2 / 3.60 is equivalent to ratio / 3, which maps the 0-1 ratio
    // to a 0-120 degree hue range (red to green).
    var hue = ratio * 1.2 / 3.60;

    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = hslToRgb(hue, 1, .5);
    // we format to css value and return
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

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
                style={{
                  '--score': result.score,
                  background: `conic-gradient(
                    ${numberToColorHsl(result.score, 0, 100)} 0% calc(var(--score) * 1%),
                    white calc(var(--score) * 1%) 100%
                  )`
                }}
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
            {result.missingSkills && result.missingSkills.length > 0 && (
              <p>
                You can add up to <strong>{result.missingSkills.length}</strong> more keywords to your resume.
              </p>
            )}
            {/* <p>
              To significantly improve your resume's alignment with this job description, focus on strategically incorporating the following <strong>Missing Keywords</strong>. Only add skills you genuinely possess and can demonstrate.
            </p> */}
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
            <textarea
              className="resume-preview-textarea"
              rows="25" // Adjust rows as needed
              readOnly
              value={result.parsedResumeText}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;