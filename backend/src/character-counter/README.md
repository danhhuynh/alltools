# Character Counter API

This module provides an API for counting characters in a string with detailed analysis.

## API Endpoints

### 1. Count Characters (GET)

```
GET /api/character-counter/count?text=your_text_here
```

Counts the number of characters in a string provided as a query parameter.

**Query Parameters:**
- `text` (required): The string to analyze

**Response:**
```json
{
  "totalCount": 13,
  "withoutSpaces": 11,
  "alphabetic": 9,
  "numeric": 2,
  "special": 0,
  "uppercase": 1,
  "lowercase": 8
}
```

### 2. Count Characters (POST)

```
POST /api/character-counter/count
```

Counts the number of characters in a string provided in the request body. This is useful for longer strings that might not be suitable for query parameters.

**Request Body:**
```json
{
  "text": "Your text to analyze here"
}
```

**Response:**
```json
{
  "totalCount": 25,
  "withoutSpaces": 21,
  "alphabetic": 21,
  "numeric": 0,
  "special": 0,
  "uppercase": 1,
  "lowercase": 20
}
```

## Response Fields

The API returns an object with the following fields:

- `totalCount`: Total number of characters in the string
- `withoutSpaces`: Number of characters excluding spaces
- `alphabetic`: Number of alphabetic characters (a-z, A-Z)
- `numeric`: Number of numeric characters (0-9)
- `special`: Number of special characters (non-alphanumeric)
- `uppercase`: Number of uppercase letters (A-Z)
- `lowercase`: Number of lowercase letters (a-z)

## Usage Examples

### Using cURL

```bash
# Count characters using GET
curl "http://localhost:3000/api/character-counter/count?text=Hello%20World%2123"

# Count characters using POST
curl -X POST http://localhost:3000/api/character-counter/count \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World! This is a longer text with numbers 123."}'
```

### Using JavaScript Fetch

```javascript
// Count characters using GET
fetch('http://localhost:3000/api/character-counter/count?text=Hello%20World')
  .then(response => response.json())
  .then(data => console.log(data));

// Count characters using POST
fetch('http://localhost:3000/api/character-counter/count', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Hello World! This is a longer text with numbers 123.',
  }),
})
  .then(response => response.json())
  .then(data => console.log(data));
```