import express from 'express';
import multer from 'multer';
import PDFParser from 'pdf2json';
import mammoth from 'mammoth';
import cors from 'cors';
import fs from 'fs';
import { itSkills } from './utils/it-skills.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));

  // Catch-all route to serve index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}


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

    const normalizedJd = jobDescription.toLowerCase();
    const normalizedResume = resumeText.toLowerCase();

    // Helper function to escape special regex characters
    const escapeRegex = (string) => {
      return string.replace(/[.*+?^${}()|[\\]/g, '\\$&');
    };

    const extractSkills = (text, skills) => {
      const foundSkills = new Set();
      skills.forEach(skill => {
        const pattern = new RegExp(`\\b${escapeRegex(skill.toLowerCase())}\\b`, 'i');
        if (pattern.test(text)) {
          foundSkills.add(skill);
        }
      });
      return Array.from(foundSkills);
    };

    const jdSkills = extractSkills(normalizedJd, itSkills);
    const resumeSkills = extractSkills(normalizedResume, itSkills);

    const matchedSkills = jdSkills.filter(skill => resumeSkills.includes(skill));
    const missingSkills = jdSkills.filter(skill => !resumeSkills.includes(skill));

    const score = jdSkills.length === 0 ? 100 : Math.round((matchedSkills.length / jdSkills.length) * 100);

    res.json({
      score,
      matchedSkills,
      missingSkills,
      parsedResumeText: resumeText
    });

  } catch (err) {
    console.error('Error in /api/score:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
