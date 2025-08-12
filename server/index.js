import express from 'express';
import multer from 'multer';
import PDFParser from 'pdf2json';
import mammoth from 'mammoth';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/score', upload.single('resume'), async (req, res) => {
  console.log('Received request to /api/score');
  try {
    const { jobDescription } = req.body;
    const file = req.file;

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let resumeText = '';
    if (file.mimetype === 'application/pdf') {
      resumeText = await new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(null, 1);
        pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", () => {
          resolve(pdfParser.getRawTextContent());
        });
        pdfParser.parseBuffer(fs.readFileSync(file.path));
      });
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const buffer = fs.readFileSync(file.path);
      resumeText = (await mammoth.extractRawText({ buffer })).value;
    } else {
      resumeText = fs.readFileSync(file.path, 'utf-8');
    }

    // Delete uploaded file after processing
    fs.unlink(file.path, (err) => {
      if (err) console.error('Failed to delete uploaded file:', err);
    });

    const jdWords = jobDescription.toLowerCase().split(/\W+/).filter(Boolean);
    const resumeWords = resumeText.toLowerCase().split(/\W+/).filter(Boolean);
    const matched = [...new Set(jdWords.filter(word => resumeWords.includes(word)))];
    const missing = [...new Set(jdWords.filter(word => !resumeWords.includes(word)))];
    const score = jdWords.length === 0 ? 0 : Math.round((matched.length / new Set(jdWords).size) * 100);

    res.json({ 
      score, 
      matchedSkills: matched, 
      missingSkills: missing, 
      parsedResumeText: resumeText 
    });
  } catch (err) {
    console.error('Error in /api/score:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
