# AI-Powered Smart Interview Platform (PrepPulse AI)

Full-stack interview preparation platform built with **React (Vite)**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

## Key Features
- **Multi-Track Interview Setup:** Practice across *HTML, CSS & JS*, *Frontend (React)*, *MERN Stack*, *Backend & APIs*, and *HR & Behavioral* with difficulty and format filters.
- **50+ Curated Questions:** Covers conceptual theory, live code debugging challenges, and scenario-based MCQs.
- **Live Interview Studio:** Countdown timer per question, smart hints, voice-to-text answer input (`Speak Answer`), keyword match badges, and ideal model answers.
- **Session Persistence & Reports:** Evaluates answers via Express API and stores completed interview sessions in MongoDB Atlas with detailed report cards and history tracking.

## Tech Stack
- **Frontend:** React, Vite, CSS3, Web Speech API
- **Backend:** Node.js, Express.js, Mongoose, dotenv, CORS
- **Database:** MongoDB Atlas

## Run Locally
1. **Backend:**
   ```bash
   cd server
   npm install
   # Add PORT and MONGO_URI in server/.env
   npm run dev
