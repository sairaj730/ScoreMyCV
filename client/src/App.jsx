import React, { useState } from "react";
import JobDescription from "./components/JobDescription";
import FileUpload from "./components/FileUpload";
import ScoreDisplay from "./components/ScoreDisplay";

function App() {
  const [step, setStep] = useState("jd"); // "jd" -> "upload" -> "result"
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <h1>ScoreMyCV — ATS Demo</h1>

      {step === "jd" && (
        <JobDescription
          value={jdText}
          onChange={setJdText}
          onNext={() => setStep("upload")}
        />
      )}

      {step === "upload" && (
        <>
          <FileUpload jdText={jdText} onResult={(r) => { setResult(r); setStep("result"); }} setError={setError} />
          {error && <p style={{color:'red'}}>{error}</p>}
        </>
      )}

      {step === "result" && (
        <>
          <ScoreDisplay result={result} />
          <div className="start-over-button-container">
            <button
              className="start-over-button"
              onClick={() => { setResult(null); setError(null); setStep("jd"); setJdText(""); }}
            >
              Start Over
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;