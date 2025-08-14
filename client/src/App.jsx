import React, { useState, useEffect } from "react";
import JobDescription from "./components/JobDescription";
import FileUpload from "./components/FileUpload";
import ScoreDisplay from "./components/ScoreDisplay";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [step, setStep] = useState("jd"); // "jd" -> "upload" -> "result"
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false); // New state for animation

  // Effect to manage body overflow
  useEffect(() => {
    if (step === "upload") {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [step]);

  // Effect to load result from localStorage on initial mount
  useEffect(() => {
    try {
      const storedResult = localStorage.getItem('scoreMyCVResult');
      if (storedResult) {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
        setStep("result"); // Go directly to result if stored
      }
    } catch (e) {
      console.error("Failed to parse stored result from localStorage", e);
      localStorage.removeItem('scoreMyCVResult'); // Clear corrupted data
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleSetResult = (r) => {
    setIsAnimating(true); // Start fade-out animation
    setTimeout(() => {
      setResult(r);
      setStep("result");
      setIsAnimating(false); // End animation (ScoreDisplay will fade in)
      try {
        localStorage.setItem('scoreMyCVResult', JSON.stringify(r));
      } catch (e) {
        console.error("Failed to save result to localStorage", e);
      }
    }, 500); // Delay for fade-out animation duration
  };

  const handleStartOver = () => {
    setResult(null);
    setError(null);
    setStep("jd");
    setJdText("");
    try {
      localStorage.removeItem('scoreMyCVResult');
    } catch (e) {
      console.error("Failed to clear result from localStorage", e);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: '#2d2d30', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#ffffffff', textShadow: '0 0 10px rgba(214, 214, 214, 0.5)', marginBottom: '10px' }}>
        Score My Resume</h1>

      {step === "jd" && (
        <JobDescription
          value={jdText}
          onChange={setJdText}
          onNext={() => setStep("upload")}
        />
      )}

      {step === "upload" && (
        <div className={isAnimating ? 'fade-out' : 'fade-in'}> {/* Apply animation class */} 
          <FileUpload jdText={jdText} onResult={handleSetResult} setError={setError} />
          {error && <p style={{color:'red'}}>{error}</p>}
        </div>
      )}

      {step === "result" && (
        <div className={isAnimating ? 'fade-out' : 'fade-in'}> {/* Apply animation class */} 
          <ScoreDisplay result={result} />
          <div className="start-over-button-container" style={{ textAlign: 'center', marginTop: '20px', width: '100%' }}>
            <button
              className="start-over-button"
              onClick={handleStartOver}
              style={{ backgroundColor: '#4a90e2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Start Over
            </button>
          </div>
        </div>
      )}
      <footer style={{ 
        marginTop: '40px', 
        textAlign: 'center', 
        color: '#ccc', 
        fontSize: '14px'
      }}>
        <p style={{ marginBottom: '10px' }}>❤️ Built with love to power your job success, inspire confidence, and help you stand out in every application you send.</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {/* GitHub Icon */}
          <a 
            href="https://github.com/sairaj730/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#ccc',
              transition: 'transform 0.3s ease, color 0.3s ease'
            }}
            onMouseEnter={(e) => { e.target.style.color = '#4a90e2'; e.target.style.transform = 'scale(1.2)'; }}
            onMouseLeave={(e) => { e.target.style.color = '#ccc'; e.target.style.transform = 'scale(1)'; }}
          >
            <i className="fab fa-github" style={{ fontSize: '24px' }}></i>
          </a>

          {/* Mail Icon */}
          <a 
            href="mailto:vadasairaju123@gmail.com"
            style={{
              color: '#ccc',
              transition: 'transform 0.3s ease, color 0.3s ease'
            }}
            onMouseEnter={(e) => { e.target.style.color = '#4a90e2'; e.target.style.transform = 'scale(1.2)'; }}
            onMouseLeave={(e) => { e.target.style.color = '#ccc'; e.target.style.transform = 'scale(1)'; }}
          >
            <i className="fas fa-envelope" style={{ fontSize: '24px' }}></i>
          </a>
        </div>
      </footer>

    </div>
    
  );
}

export default App;