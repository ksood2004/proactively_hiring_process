 Proactively FormFlow in Firebase Studio

This is a NextJS starter in Firebase Studio, for an application named Proactively FormFlow.

 🧠 Proactively FormFlow
Proactively FormFlow is a modern, AI-integrated web application for creating, managing, and analyzing forms. It showcases a comprehensive example of a full-featured frontend project with mock authentication, real-time UI, and Genkit-powered AI insights.

🚀 Features Overview

- 🌐 Public-facing landing page
- 🔐 Mock authentication (signup/login/logout)
- 🧰 Drag-and-drop form builder
- 📩 Form filler and response submission
- 📊 View and manage form responses
- 🤖 AI insights using Genkit (summarization & inconsistency highlighting)
- 🎛️ Theme switching (Light/Dark/System)
- 🧑‍💼 Admin dashboard (mock)
- 🧪 Full mock data persistence (via `localStorage`)

 🧩 Technology Stack

| Category         | Tech Used                           |
|------------------|--------------------------------------|
| Frontend         | Next.js 15 (App Router)              |
| UI Framework     | React 18 + Tailwind CSS              |
| Component Library| ShadCN UI                            |
| State Mgmt       | React Context API + useState         |
| Forms            | react-hook-form + zod validation     |
| Icons            | lucide-react                         |
| AI Integration   | Genkit + Google AI                   |
| Mock Backend     | localStorage + in-memory stores      |
| Language         | TypeScript                           |

🧭 Application Flow

 1. 🧍 Unauthenticated User
- Routes:
  - `/`: Homepage (hero, features, guide, careers)
  - `/login`, `/signup`, `/contact`, `/privacy`, `/terms`
  - `/apply?jobTitle=...`: Apply form (mock submit)
    
 2. 🔐 Authentication Flow
- `/login`: Email/password → mock validation → redirect to `/dashboard`
- `/signup`: Email/password → mock creation → redirect to `/login`
  
 3. 🧑 Authenticated User (Sidebar Layout)
- `/dashboard`: View all forms, create/edit/fill/share/delete
- `/forms/create`: Use FormBuilder to create a form
- `/forms/my-forms`: Show forms created by logged-in user
- `/forms/[formId]/edit`: Edit existing form
- `/forms/[formId]/fill`: Fill and submit form (mock response)
- `/forms/[formId]/responses`: View responses + AI analysis
- `/settings`: Update display name, theme, reset password, logout
  
  4. 📄 Form Interaction Flow
- Build: Create/update forms with fields
- Fill: Fill forms and submit mock responses
- Analyze: Use Genkit to summarize or detect inconsistencies
  
  5. 🛠 Admin Flow (if `user.isAdmin`)
- `/admin/users`: View, invite, edit, delete mock users
- `/admin/settings`: Mock system settings (e.g., public signup toggle)
  
 🧠 AI-Powered Insights (via Genkit)
- `summarize-form-responses.ts`: LLM-based summarization
- `highlight-inconsistencies.ts`: Detect conflicting entries
- Configured via `src/ai/genkit.ts` with `@genkit-ai/googleai`
  
 🏗️ App Structure
src/
│
├── app/
│ ├── (auth)/ # login, signup
│ ├── (app)/ # dashboard, forms, settings, admin
│ ├── contact/, privacy/, etc.
│
├── components/
│ ├── auth/ # login/signup forms
│ ├── forms/ # builder, filler, insights, viewer
│ ├── layout/ # Navbar, Sidebar
│ ├── ui/ # ShadCN component wrappers
│
├── contexts/ # AuthContext, ThemeContext
├── hooks/ # Custom React hooks
├── lib/
│ ├── mockFormStore.ts # Mock form persistence
│ ├── utils.ts # Utility functions
│
├── ai/
│ ├── flows/ # Genkit flows
│ └── genkit.ts # Genkit setup
├── types/ # Global types


 💾 Data Persistence

| Type       | Storage Mechanism  |
|------------|--------------------|
| Auth       | `localStorage` via `AuthContext` |
| Forms      | `localStorage` via `mockFormStore` |
| Responses  | In-memory (mockResponsesStore)     |
| Theme      | `localStorage` via `ThemeContext`  |

📚 Key Components

| Component                | Purpose                                    |
|--------------------------|--------------------------------------------|
| `FormBuilder`            | Build and edit forms with custom fields    |
| `FormFiller`             | Render forms for user input                |
| `FormResponsesViewer`    | Table display of submitted responses       |
| `AIInsights`             | Trigger Genkit AI actions                  |
| `Sidebar` / `Header`     | App layout for authenticated users         |
| `AuthContext`, `ThemeContext` | Global auth & theme logic             |

🧰 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/proactively-formflow.git
cd proactively-formflow

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev

⚠️ Notes
This app does not use a real backend.
All user and form data are stored in localStorage.
AI insights are powered by Genkit flows with mock inputs.
Admin panel is included for demonstration purposes only.

