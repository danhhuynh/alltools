# AllTools Frontend

A React application that provides a user interface for various utility tools including ID generation and character counting.

## Features

### ID Generator

The ID Generator allows you to:

- Generate standard unique IDs (timestamp + random characters)
- Generate shorter unique IDs (timestamp in base36 + random characters)
- Generate UUID v4 identifiers
- Add optional prefixes to your IDs
- Copy generated IDs to clipboard

### Character Counter

The Character Counter allows you to:

- Analyze text and get detailed character statistics
- See total character count, count without spaces, and more
- Count alphabetic, numeric, and special characters
- Count uppercase and lowercase letters
- Handle both short and long text inputs

### Expandable Architecture

The application is designed with a scrollable interface that allows for easy addition of new features in the future. The current implementation includes:

- A sticky navigation bar for quick access to different sections
- Placeholder sections for future features
- Smooth scrolling between sections

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (v6 or later)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## API Integration

The frontend integrates with the following API endpoints:

### ID Generator API

- `/api/id-generator/unique` - Generates a standard unique ID
- `/api/id-generator/short` - Generates a shorter unique ID
- `/api/id-generator/uuid` - Generates a UUID v4

### Character Counter API

- `/api/character-counter/count` (GET) - Counts characters in a string provided as a query parameter
- `/api/character-counter/count` (POST) - Counts characters in a string provided in the request body (for longer texts)

## Adding New Features

To add a new feature:

1. Create a new component in the `src/components` directory
2. Add the component to the appropriate section in `App.js`
3. Add a new navigation link in the `NavigationBar` component

Example:

```jsx
// 1. Create your component
// src/components/NewFeature.js
import React from 'react';

function NewFeature() {
  return (
    <div>
      <h2>New Feature</h2>
      {/* Your feature implementation */}
    </div>
  );
}

export default NewFeature;

// 2. Add to App.js
// In the NavList component:
<NavItem>
  <NavLink href="#new-feature" onClick={(e) => { e.preventDefault(); scrollToSection('new-feature'); }}>
    New Feature
  </NavLink>
</NavItem>

// In the MainContent component:
<Section id="new-feature">
  <SectionTitle>New Feature</SectionTitle>
  <NewFeature />
</Section>
```

## Technologies Used

- React
- Styled Components
- Axios for API requests
- CSS animations for smooth transitions
