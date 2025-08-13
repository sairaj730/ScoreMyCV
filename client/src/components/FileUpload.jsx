import React, { useState } from "react";
import "./FileUpload.css";

const FileUpload = ({ jdText, onResult, setError }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("resume", file);
      form.append("jobDescription", jdText);

      const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/score`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Server error");
      onResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <label htmlFor="file-upload" className="file-input-label">
        Choose Your Resume
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".txt,.pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Scoring..." : "Score My Resume"}
      </button>
      {file && <span className="file-name">Selected file: {file.name}</span>}
    </div>
  );
};

export default FileUpload;