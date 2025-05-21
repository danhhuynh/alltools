# AllTools Project

A monorepo containing a React frontend and NestJS backend.

## Project Structure

- `frontend/`: React application
- `backend/`: NestJS application
- Root level: Configuration and scripts to manage both applications

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

Install all dependencies for both frontend and backend:

```bash
npm run install:all
```

### Development

Start both frontend and backend in development mode:

```bash
npm start
```

Or start them separately:

```bash
# Start frontend only
npm run start:frontend

# Start backend only
npm run start:backend
```

### Building for Production

Build both applications:

```bash
npm run build
```

Or build them separately:

```bash
# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend
```

## Frontend (React)

The frontend is a React application created with standard React configurations.

- Port: 3000 (default for React)
- Main file: `frontend/src/index.js`
- Entry component: `frontend/src/App.js`

### Features

The frontend includes:

1. **ID Generator Interface**: A user-friendly interface for generating unique IDs using the backend API
   - Generate standard, short, and UUID v4 identifiers
   - Add optional prefixes to IDs
   - Copy generated IDs to clipboard

2. **Expandable Architecture**: A scrollable interface with:
   - Sticky navigation bar for quick access to different sections
   - Placeholder sections for future features
   - Smooth scrolling between sections

For detailed documentation, see `frontend/README.md`.

## Backend (NestJS)

The backend is a NestJS application with a basic API setup.

- Port: 3000 (configured in `backend/src/main.ts`)
- Main file: `backend/src/main.ts`
- API endpoints:
  - `GET /`: Returns a hello message
  - `GET /api/status`: Returns the API status
  - `GET /api/id-generator/unique`: Generates a standard unique ID
  - `GET /api/id-generator/short`: Generates a shorter unique ID
  - `GET /api/id-generator/uuid`: Generates a UUID v4
  - `GET /api/character-counter/count`: Counts characters in a string
  - `POST /api/character-counter/count`: Counts characters in a string (for longer texts)

### ID Generator API

The backend includes an ID Generator API that provides three different methods for generating unique identifiers:

1. **Standard Unique ID**: Combines timestamp and random characters for high collision resistance
2. **Short Unique ID**: Creates shorter IDs using base36 encoding
3. **UUID v4**: Generates standard UUID v4 identifiers

All endpoints accept an optional `prefix` query parameter to add a prefix to the generated ID.

For detailed documentation, see `backend/src/id-generator/README.md`.

### Character Counter API

The backend includes a Character Counter API that analyzes text and provides detailed character statistics:

1. **Total Count**: The total number of characters in the string
2. **Without Spaces**: Number of characters excluding spaces
3. **Alphabetic**: Number of alphabetic characters (a-z, A-Z)
4. **Numeric**: Number of numeric characters (0-9)
5. **Special**: Number of special characters (non-alphanumeric)
6. **Uppercase**: Number of uppercase letters (A-Z)
7. **Lowercase**: Number of lowercase letters (a-z)

The API provides both GET and POST endpoints to accommodate different text lengths and use cases.

For detailed documentation, see `backend/src/character-counter/README.md`.

## License

ISC
