# Health Tech Solutions - Task Management Dashboard (Frontend)

Welcome to the frontend submission for the Health Tech Solutions technical assignment. This project is a **modern, responsive React application**, serving as the user interface for the Task Management System. It allows medical and operational staff to track tasks efficiently.

> **Live Demo:** Access the online version here: [https://health-tech-frontend-production.up.railway.app/](https://health-tech-frontend-production.up.railway.app/)

## Overview

This dashboard allows users to manage operational tasks (e.g., patient intake, equipment sanitization) with a focus on usability and visual clarity. It connects to the **NestJS backend API** to perform real-time CRUD operations.

## Tech Stack

* **Framework:** React (v18+)
* **Build Tool:** Vite (For lightning-fast development and building)
* **Language:** TypeScript (For type safety and developer experience)
* **Styling:** Tailwind CSS (v4) (Utility-first, responsive design)
* **Icons:** Lucide React (Clean, consistent iconography)
* **State Management:** React Hooks (`useState`, `useEffect`)

---

## Installation & Setup

### 1. Prerequisites

Ensure you have the following installed on your machine:

* **Node.js** (v16 or higher)
* **npm** (Node Package Manager)

### 2. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/DerrickNgigi/health-tech-frontend
cd health-tech-frontend

# Install dependencies
npm install

```

### 3. Start the Application

Run the development server:

```bash
npm run dev

```

Navigate to the URL shown in the terminal (usually **http://localhost:5173**).

---

## API Configuration (.env)

You can switch between the **Production API** and your **Local Backend** using the `.env` file in the root directory.

1. Open `.env`.
2. Update `VITE_API_BASE_URL` based on your environment.

**To use Production (Default):**

```env
VITE_API_BASE_URL=https://health-tech-backend-production.up.railway.app/api/tasks

```

**To use Localhost:**
Comment out the production line and uncomment the local one:

```env
VITE_API_BASE_URL=http://localhost:3333/api/tasks

```

> **Note:** You must restart the server (`npm run dev`) after changing `.env` files for changes to take effect.

---

## Project Structure

The project follows a modular architecture to separate UI components from business logic and API services.

```text
src/
├── components/           # Reusable UI Elements ("Dumb" Components)
│   ├── StatusBadge.tsx   # Visual indicator for task status (Pending/In Progress/Completed)
│   ├── TaskCard.tsx      # Displays task details, due dates, and action buttons
│   └── TaskFormModal.tsx # Form for creating and editing tasks
│
├── pages/                # Main Views ("Smart" Components)
│   └── Dashboard.tsx     # Main controller: manages state, filtering, and data flow
│
├── services/             # API Layer
│   └── api.ts            # Centralized fetch calls (reads from .env)
│
├── types/                # TypeScript Definitions
│   └── task.ts           # Interfaces for Task data consistency
│
├── App.tsx               # Main entry component
├── main.tsx              # Mounts the React app
└── index.css             # Global styles & Tailwind imports

```

---

## Key Features

* **Visual Status Indicators:** Color-coded badges make it easy to see task progress at a glance.
* **Smart Due Dates:** The dashboard automatically highlights overdue tasks in red to draw attention to urgent items.
* **Filtering:** Users can filter tasks by status (Pending, In Progress, Completed) or view all at once.
* **Responsive Design:** Fully optimized for desktops, tablets, and mobile devices.
* **Optimistic UI:** The interface updates immediately on delete actions for a snappy user experience.

---

*Submitted for the Health Tech Solutions Practical Assignment.*

---