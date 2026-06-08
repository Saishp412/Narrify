<div align="center">

# Narrify: AI-Powered PDF to Audiobook Transformer

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs_AI-Voice-blue?style=for-the-badge)](https://elevenlabs.io/)

*Turn any document into an immersive, studio-quality listening experience in seconds.*

[Live Demo](https://narrify-6qygnzrut-saishpatil41204-9011s-projects.vercel.app/) • [Report Bug](#) • [Request Feature](#)

</div>

---

## Overview

**Narrify** is an advanced, full-stack AI SaaS application that bridges the gap between written content and auditory consumption. By leveraging cutting-edge text-to-speech AI (ElevenLabs), Narrify allows users to upload raw PDF documents and instantly convert them into lifelike, high-fidelity audiobooks. 

### The Problem
In today's fast-paced world, professionals, students, and avid learners struggle to find the time to sit down and read lengthy documents, research papers, or books. Traditional screen-reading causes eye strain and limits multitasking.

### The Solution (Business Value)
Narrify transforms static text into dynamic audio, unlocking passive learning. Users can consume critical information while commuting, exercising, or working. By providing a beautiful, accessible, and highly efficient platform, Narrify boosts user productivity and information retention.

---

## Application Screenshots

| Feature | Screenshot |
|---------|------------|
| **Landing Page** | ![Landing Page](screenshots/placeholder.png) |
| **User Dashboard** | ![Dashboard Overview](screenshots/placeholder.png) |
| **PDF Upload Flow** | ![Upload Process](screenshots/placeholder.png) |
| **Audiobook Player** | ![Player UI](screenshots/placeholder.png) |
| **Bookmarks & Analytics**| ![Bookmarks](screenshots/placeholder.png) |

---

## Technical Architecture

Narrify employs a decoupled client-server architecture. The frontend is a highly interactive Next.js application, while the backend is an asynchronous Node.js/Express server designed to handle long-running heavy AI generation tasks without hitting serverless timeouts.

```text
+-------------------+       REST API        +-------------------+
|                   |  (JSON / Multipart)   |                   |
|   Next.js Client  | <===================> |  Node.js Backend  |
|    (Vercel)       |                       |     (Render)      |
|                   |                       |                   |
+--------+----------+                       +--------+----------+
         |                                           |
         |                                           |
         v                                           v
+-------------------+                       +-------------------+
|                   |                       | 1. ElevenLabs API |
|   Tailwind CSS    |                       | 2. Cloudinary     |
|   Framer Motion   |                       | 3. MongoDB Atlas  |
|                   |                       | 4. PDF-Parse      |
+-------------------+                       +-------------------+
```

### Core System Workflow:
1. **Document Ingestion:** User uploads a PDF via the Next.js client.
2. **Data Extraction:** The Express server processes the PDF buffer and extracts clean text using `pdf-parse`.
3. **AI Voice Synthesis:** The text is chunked and streamed to the **ElevenLabs API** for hyper-realistic voice generation.
4. **Cloud Storage Integration:** The resulting audio buffers are stitched together and uploaded to **Cloudinary** for scalable, CDN-backed global delivery.
5. **Database Sync:** The generated media URLs, alongside user metadata and bookmarks, are stored securely in **MongoDB**.

---

## Key Features & Implementation Details

* **Intelligent Document Parsing**: Extracts structural text from dense PDFs, handling varying encodings and formatting constraints seamlessly.
* **Studio-Quality AI Voices**: Integrates ElevenLabs to offer a selection of human-like voices with dynamic intonation and pacing.
* **Resilient Audio Processing**: The backend is hosted on a dedicated Render instance to bypass the strict 10-50 second execution limits inherent to Vercel Serverless Functions, ensuring reliable processing for books of any length.
* **Interactive Dashboard & Player**: A sleek, dark-themed UI featuring custom playback controls, progress tracking, and a comprehensive user history.
* **Bookmark Management**: Users can bookmark specific timestamps within generated audiobooks or discoverable public books, fully synchronized with the database.
* **Analytics Engine**: Tracks user consumption metrics, generated audio duration, and engagement.

---

## Installation & Local Development

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas account (or local instance)
* ElevenLabs API Key
* Cloudinary Account

### 1. Clone the repository
```bash
git clone https://github.com/Saishp412/Narrify.git
cd Narrify
```

### 2. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
ELEVEN_LABS_API_KEY=your_elevenlabs_api_key
ELEVEN_DEFAULT_VOICE=your_preferred_voice_id
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
Run the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
Run the frontend:
```bash
npm run dev
```

### 4. Open Application
Navigate to `http://localhost:3000` in your browser.

---

## Scalability & Performance Impact

* **Microservices approach**: By separating the frontend (Vercel) from the heavy-lifting backend (Render), the application ensures rapid UI response times (Time-to-Interactive < 1.5s) while gracefully handling asynchronous audio rendering.
* **CDN Edge Delivery**: All generated audio files are served via Cloudinary's global CDN, drastically reducing bandwidth load on the origin server and eliminating buffering for end-users.
* **Optimized State Management**: The React frontend utilizes optimized state lifting and React hooks to prevent unnecessary re-renders during active audio playback and complex dashboard navigation.


