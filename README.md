# 📄 ScoreMyCV – ATS Resume Checker

**ScoreMyCV** is a web application that analyzes resumes against job descriptions to calculate their **ATS (Applicant Tracking System) score**.  
It helps job seekers understand **how well their resume matches a specific job role**, highlighting missing keywords and providing tips to improve their chances of passing ATS filters.

---

## 📌 Table of Contents
- [🎯 Purpose](#-purpose)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
<!-- - [⚙️ Installation & Setup](#️-installation--setup)
- [▶️ Running the App Locally](#️-running-the-app-locally)
- [🌍 Deployment](#-deployment)
- [🔍 How It Works](#-how-it-works)
- [📸 Screenshots](#-screenshots)
- [💡 Future Improvements](#-future-improvements)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license) -->

---

## 🎯 Purpose
Most companies today use **Applicant Tracking Systems (ATS)** to filter resumes before they even reach human recruiters.  
This project helps **job seekers** by:
- Scanning their resume.
- Comparing it with a given **job description**.
- Calculating a **match score**.
- Suggesting **missing keywords** to improve their chances.

---

## 🚀 Features

### 📂 Resume Upload
- Supports `.pdf`, `.docx`, and `.txt` formats.
- Uses:
  - **pdf-parse** → Extracts text from PDF resumes.
  - **mammoth** → Extracts clean text from DOCX resumes.
  - Native buffer reading → For TXT files.

### 📊 ATS Score Calculation
- Compares the **resume content** to the **job description**.
- Counts keyword matches and calculates a **percentage score**.

### 🔍 Keyword Analysis
- Identifies **missing important keywords** from your resume.
- Highlights keywords **present in both documents**.

### 💻 Responsive UI
- Built with **React** for a smooth, interactive user experience.
- Supports desktop, tablet, and mobile screens.

### 🌐 Full Stack Integration
- **Backend** (Node.js + Express) handles:
  - File parsing
  - Score calculation
  - API responses
- **Frontend** (React + Axios) handles:
  - File upload
  - Job description input
  - Displaying results

---

## 🛠️ Tech Stack

| Layer         | Technology Used |
|---------------|-----------------|
| **Frontend**  | React (Vite), Axios |
| **Backend**   | Node.js, Express |
| **Parsing**   | `pdf-parse`, `mammoth` |
| **Styling**   | CSS / Tailwind CSS |
| **Hosting**   | Render |
| **Version Control** | Git, GitHub |

---

## 📂 Project Structure
```bash
ScoreMyCV/
├── client/                 # Frontend React app
│   ├── src/                # Components & logic
│   ├── public/             # Static files
│   └── package.json
│
├── server/                 # Backend API
│   ├── utils/              # Parsing functions
│   │   └── parseResume.js  # PDF/DOCX/TXT parser
│   ├── index.js            # Main server entry
│   └── package.json
│
└── README.md
