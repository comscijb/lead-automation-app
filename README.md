# Lead Scoring App

Full-stack application for capturing sales leads, scoring their priority, and tracking pipeline status. The project is built with a React/Vite client, Chakra UI, an Express API, Prisma, and PostgreSQL.

## Overview

This app helps a small sales or freelance pipeline prioritize incoming leads using a simple scoring model. Users can register lead details, choose the acquisition source, record site visits, mark direct visits, add notes, and update the lead status as the opportunity moves through the pipeline.

The interface is written in English and uses US-oriented formatting, including phone numbers in the `(555) 123-4567` format.

## Features

- Lead creation form with name, email, company, phone, source, visits, direct visit flag, and notes
- Automatic lead scoring based on source, company data, email type, visits, and direct access
- Pipeline table sorted by lead score
- Status management for new, qualified, contacted, won, and lost leads
- Summary metrics for total leads, high-priority leads, and average score
- Persistent PostgreSQL storage through Prisma
- REST API with validation and clear error responses
- Responsive React UI built with Chakra UI

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Chakra UI
- Vitest
- Testing Library

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- dotenv

## Project Structure

```text
.
|-- client/                 # React/Vite frontend
|   |-- src/
|   |   |-- components/     # UI components
|   |   |-- services/       # API client
|   |   |-- types/          # Lead types and labels
|   |   `-- utils/          # Client-side score labels
|   `-- package.json
|-- server/                 # Express/Prisma backend
|   |-- prisma/             # Prisma schema and migrations
|   |-- src/
|   |   |-- controllers/    # Route handlers
|   |   |-- database/       # Prisma connection
|   |   |-- routes/         # API routes
|   |   `-- services/       # Business logic and scoring
|   `-- package.json
|-- .env.example            # Root backend environment example
`-- LICENSE
```

## Scoring Rules

The backend calculates the score with the following rules:

| Rule | Points |
| --- | ---: |
| Lead has a company | +20 |
| Email is Gmail | +5 |
| Email is a business or non-Gmail address | +15 |
| Source is paid ads | +10 |
| Source is referral | +25 |
| More than one site visit | +30 |
| Lead visited directly or source is direct | +30 |

Score labels in the UI:

| Score | Label |
| ---: | --- |
| 80 or higher | High priority |
| 45 to 79 | Good opportunity |
| Below 45 | Nurture |

## Requirements

- Node.js
- npm
- PostgreSQL database

## Environment Variables

Create environment files from the examples before running the app.

### Server

Use either the root `.env` file or `server/.env`:

```env
PORT=3333
CLIENT_URL=http://localhost:5000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### Client

Create `client/.env`:

```env
PORT=5000
VITE_API_URL=http://localhost:3333
```

## Installation

Install dependencies for both apps:

```bash
cd server
npm install

cd ../client
npm install
```

## Database Setup

From the `server` directory, generate the Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

To inspect the database with Prisma Studio:

```bash
npm run prisma:studio
```

## Running Locally

Start the backend API:

```bash
cd server
npm run dev
```

The API runs on:

```text
http://localhost:3333
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

The web app runs on:

```text
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | API health check |
| `GET` | `/leads` | List leads ordered by score and creation date |
| `POST` | `/leads` | Create and score a lead |
| `PATCH` | `/leads/:id/status` | Update lead status |

## Validation

The API validates required fields and returns client-friendly errors for invalid payloads.

Required fields:

- `name`
- `email`
- `source`

Additional validation:

- `email` must be valid
- `siteVisits` must be a non-negative integer
- `status` must be one of `new`, `qualified`, `contacted`, `won`, or `lost`

## Testing and Build

Run frontend tests:

```bash
cd client
npm test
```

Build the frontend:

```bash
cd client
npm run build
```

Run backend type checking:

```bash
cd server
npm run typecheck
```

## Deployment Notes

- Configure `DATABASE_URL` in the backend environment.
- Configure `CLIENT_URL` with the deployed frontend URL to keep CORS restricted.
- Configure `VITE_API_URL` with the deployed backend URL before building the frontend.
- Run Prisma migrations during deployment or release setup.

## Portfolio Context

This project was designed as a practical portfolio app: small enough to understand quickly, but complete enough to demonstrate full-stack implementation, persistence, validation, typed React UI, API integration, and production-oriented environment configuration.

## License

This project is licensed under the GNU General Public License v3.0 or later. See [LICENSE](./LICENSE) for details.
