import React from "react";
import "./JobDescription.css";

const JobDescription = ({ value, onChange, onNext }) => {
  return (
    <div className="job-description-container">
      <h2>Paste Job Description</h2>
      <textarea
        className="jd-textarea"
        rows="15"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the complete job description here..."
      />
      <button
        className="jd-next-button"
        onClick={onNext}
        disabled={!value.trim()}
      >
        Continue to Upload Resume
      </button>
    </div>
  );
};

export default JobDescription;