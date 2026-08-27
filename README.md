# SevaGuide

> **Don't just check your status. Understand it.**

SevaGuide is a citizen-focused prototype for making government-service application statuses easier to understand. Instead of showing only a technical status label, it presents the application's current stage as a clear journey and helps the citizen understand what is happening, what comes next, and whether action is required.

## 🚀 Live Demo

**https://seva-guide-eight.vercel.app/**

The current deployment is a prototype using representative application data and simulated status progression. It is **not connected to the live MeeSeva backend**.

## 🎯 Problem

Government application portals can tell citizens that an application is "under verification" or "documents verified", but a status alone does not always answer the questions citizens actually have:

- What does this status mean?
- What happens next?
- Do I need to do anything?
- Has my application moved forward or is it waiting?

SevaGuide focuses on turning status information into an understandable application journey.

## 💡 Solution

SevaGuide lets a citizen enter an application number and view:

- The service/application type
- Current application status
- A step-by-step application journey
- Completed, current, and upcoming stages
- Whether citizen action is required
- The latest update time

The interface is designed around **understanding the application**, not simply displaying a status code.

## ✨ Key Features

### 1. Application lookup
Enter an application number to open its status page.

### 2. Visual application journey
The application is represented as a sequence of stages such as:

`Application submitted → Documents received → Documents verified → Department verification → Officer review → Certificate issued`

### 3. Clear status communication
Different application states are demonstrated with different user-facing outcomes:

- **Verification in progress** — the application is currently being processed.
- **Action required** — the citizen needs to take the next step.
- **Certificate issued** — processing is complete.

### 4. Citizen-first information
The UI emphasizes what is happening and what the citizen should expect next instead of exposing internal system terminology.

### 5. Invalid application handling
Unknown application numbers are handled with a clear validation/error state instead of showing a broken page.

## 🧪 Demo Applications

| Application ID | Service | Demonstrated state |
|---|---|---|
| `MSV-DEMO-1024` | Income Certificate | Verification in progress |
| `MSV-DEMO-2048` | Caste Certificate | Action required |
| `MSV-DEMO-3072` | Residence Certificate | Certificate issued |

These are **demo records**, not real citizen applications.

## 🏗️ Architecture

```text
                    Citizen
                       │
                       ▼
              ┌─────────────────┐
              │    SevaGuide    │
              │    Next.js UI   │
              └────────┬────────┘
                       │
                 Application ID
                       │
                       ▼
              ┌─────────────────┐
              │ Application Data│
              │  + Status Logic │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Journey Renderer│
              └────────┬────────┘
                       │
                       ▼
             Status + Next Step
             + Citizen Action
```

### Current prototype architecture

- **Frontend:** Next.js + React
- **Language:** TypeScript
- **Styling:** CSS
- **Deployment:** Vercel
- **Data:** Representative/demo application data
- **Backend integration:** Not implemented in this prototype

## 🛠️ Tech Stack

- Next.js 15
- React 19
- TypeScript 5
- ESLint
- Vercel

## 📁 Project Structure

```text
SevaGuide/
├── app/
│   ├── application/
│   │   └── [id]/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── next.config.ts
├── package.json
└── tsconfig.json
```

## ▶️ Running Locally

### Prerequisites

- Node.js 20.9+
- npm

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
```

## 🔐 Prototype Disclaimer

SevaGuide is currently a hackathon/prototype experience. It uses representative application records and simulated status progression. It does not access, modify, or expose real citizen application data and is not connected to the MeeSeva backend.

A production version would require an authorized government API/backend integration, authentication, secure handling of citizen data, audit logging, and appropriate privacy/security controls.

## 🔮 Future Scope

- Integration with an authorized government application-status API
- Real-time status updates
- Multilingual support for citizens
- SMS/WhatsApp/email notifications
- Personalized explanations based on application state
- Clear action instructions and document requirements
- Accessibility improvements for users with different needs
- Secure citizen authentication and privacy-preserving data handling
- Analytics to identify common points where applications get delayed

## 📌 Why SevaGuide?

A status such as **"Under Verification"** tells a citizen *where* an application is. SevaGuide aims to explain **what that means, what comes next, and whether the citizen needs to act**.

That shift—from **status checking** to **status understanding**—is the core idea behind SevaGuide.
