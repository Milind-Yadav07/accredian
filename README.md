# Accredian Enterprise - Full-Stack Platform

A high-performance, enterprise-grade web application built for **Accredian** using Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4, GSAP Animations, Mongoose, and MongoDB Atlas.

![Accredian Banner](public/enquire-banner.png)

---

## 📋 Table of Contents

- [⚙️ Setup Instructions](#-setup-instructions)
- [💡 Approach Taken](#-approach-taken)
- [🤖 AI Usage Explanation](#-ai-usage-explanation)
- [🔮 Improvements You Would Make with More Time](#-improvements-you-would-make-with-more-time)
- [🌟 Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📡 API Reference](#-api-reference)

---

## ⚙️ Setup Instructions

### 1. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` (v9+) or `yarn` or `pnpm`

### 2. Clone Repository

```bash
git clone https://github.com/Milind-Yadav07/accredian-assignment.git
cd accredian-assignment
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory (refer to `.env.example` for reference):

```env
MONGODB_URI=mongodb+srv://milindcs07_db_user:jhqd5Y0MMctTB3tZ@cluster0.bnctvtt.mongodb.net/accredian_enterprise?retryWrites=true&w=majority
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test the application live.

### 6. Production Build Verification

To compile and test the optimized production build:

```bash
npm run build
npm run start
```

---

## 💡 Approach Taken

### 1. Architectural & Technology Selection

- Built using **Next.js 16 App Router** with **React 19** and **TypeScript** for server-side performance, fast page loads, automatic route optimization, and end-to-end type safety.
- Utilized **TailwindCSS v4** for clean utility-first styling adhering to Accredian's corporate Deloitte Green (`#86BC25`) design language with sharp UI borders (`rounded-none`).

### 2. Interactive GSAP Animations

- Implemented an **interactive GSAP FAQ Accordion** featuring a 3-second auto-expansion loop that cycles through FAQ items.
- Configured spring physics (`back.out(1.7)`) for smooth expansion and highlight state active transitions.

### 3. Enterprise Form & FlagCDN Integration

- Engineered a 2-column **Enquire Modal** with full phone input support.
- Fetches real-time country phone codes from the **CountryStateCity API** and renders country flags via **FlagCDN** (`https://flagcdn.com/w20/{iso2}.png`), including search filtering and selected value state persistence.

### 4. Database & Connection Management

- Connected the form directly to **MongoDB Atlas** using **Mongoose**.
- Implemented a singleton Mongoose connection caching module ([src/lib/db.ts](file:///c:/Users/milin/OneDrive/Desktop/projects/accredian-assignment/src/lib/db.ts)) to prevent connection leaks during Next.js development hot-reloading.

---

## 🤖 AI Usage Explanation

During the development of this full-stack assignment, AI tools (Google DeepMind's Antigravity AI pair programming assistant) were utilized as an accelerator for the following tasks:

1. **Prototyping & Scaffolding**: Accelerated early boilerplate component setup, Tailwind utility structuring, and TypeScript interface definitions.
2. **GSAP Animation Tuning**: Assisted in refining GSAP timeline sequencing and spring easing formulas for smooth card transitions.
3. **Cross-Browser & Responsive Auditing**: Used for rapid inspection of responsive grid layouts across mobile (`320px`), tablet (`768px`), and desktop (`1024px+`) viewports.
4. **Human Guidance & Quality Control**: All core business logic, database schema design, design system choices (Deloitte Green palette), API integration logic, and final code reviews were authored, verified, and directed by the developer to guarantee production readiness.

---

## 🔮 Improvements You Would Make with More Time

Given additional time, the following features and enhancements would be added to scale the project further:

1. **🔒 Secure Lead Management Admin Dashboard**:
   - Build a protected `/admin/enquiries` portal with NextAuth.js / JWT authentication allowing enterprise sales teams to view, search, status-tag, and export enquiries to CSV/Excel.
2. **📧 Automated Email Notifications**:
   - Integrate **Resend** or **SendGrid** to trigger instant automated email alerts to `enterprise@accredian.com` whenever a new enquiry is submitted, along with a automated confirmation email to the applicant.
3. **🧪 End-to-End & Automated Testing**:
   - Write comprehensive E2E tests using **Playwright** or **Cypress** covering form validation, country dropdown filtering, modal submission, and API failure fallbacks.
4. **📊 Analytics & Conversion Funnel Tracking**:
   - Embed Google Analytics 4 (GA4) and Mixpanel tracking events on modal opens, form field interactions, and successful enquiry completions to measure drop-off rates.
5. **⚡ Serverless Rate Limiting**:
   - Add Redis-based rate limiting (via Upstash Rate Limit) to `/api/enquire` to prevent form spamming and DDoS attacks.

---

## 🌟 Key Features

### 🎨 Frontend & Design System

- **Corporate Branding**: Tailored Deloitte Green (`#86BC25`) brand palette with dark mode accents (`bg-slate-900`).
- **Interactive GSAP FAQ Accordion**: 3-second auto-expansion loop through all FAQ items with active Deloitte Green highlights.
- **Enquire Modal Popup**: 2-column modal layout with FlagCDN thumbnails and search filtering powered by the CountryStateCity API.
- **Infinite Logo Marquee**: Smooth infinite marquee showcasing top corporate partner logos (Google, Amazon, Coca-Cola, etc.).

### ⚡ Full-Stack Backend & Database

- **MongoDB Atlas Integration**: Persistent database connection using Mongoose ORM.
- **Connection Caching**: Singleton Mongoose connection handler preventing redundant database connections.
- **RESTful API Endpoint** (`POST /api/enquire`): Input validation, combined phone formatting, and structured JSON responses.

---

## 🛠️ Tech Stack

| Layer               | Technology                     |
| :------------------ | :----------------------------- |
| **Framework**       | Next.js 16 (App Router)        |
| **UI Library**      | React 19                       |
| **Language**        | TypeScript 5                   |
| **Styling**         | TailwindCSS v4                 |
| **Animations**      | GSAP (GreenSock)               |
| **Database**        | MongoDB Atlas                  |
| **ORM**             | Mongoose                       |
| **API Integration** | CountryStateCity API & FlagCDN |
| **Icons**           | Lucide React                   |

---

## 📡 API Reference

### `POST /api/enquire`

Submits an enterprise enquiry to the MongoDB database.

#### Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "countryCode": "+91",
  "phone": "9876543210",
  "company": "Acme Corp",
  "domain": "genai",
  "candidates": 25,
  "mode": "online",
  "location": "Gurugram, India"
}
```

#### Response (`201 Created`)

```json
{
  "success": true,
  "message": "Enquiry saved to MongoDB successfully!",
  "data": {
    "_id": "66b4bc...",
    "name": "Jane Doe",
    "email": "jane@company.com",
    "countryCode": "+91",
    "phone": "9876543210",
    "fullPhone": "+91 9876543210",
    "company": "Acme Corp",
    "domain": "genai",
    "candidates": 25,
    "mode": "online",
    "location": "Gurugram, India",
    "createdAt": "2026-08-08T10:11:03.594Z"
  }
}
```

---

## 📄 License

This project is created for the Full-Stack Developer Internship Assignment at **Accredian**.
