# ID Generator API

This module provides APIs for generating unique identifiers using various algorithms.

## API Endpoints

### 1. Generate Standard Unique ID

```
GET /api/id-generator/unique
```

Generates a unique ID using a combination of timestamp and random characters.

**Query Parameters:**
- `prefix` (optional): A string prefix to add to the ID

**Response:**
```json
{
  "id": "1634567890123AbCdEfGhIjK"
}
```

### 2. Generate Short Unique ID

```
GET /api/id-generator/short
```

Generates a shorter unique ID with slightly higher collision probability.

**Query Parameters:**
- `prefix` (optional): A string prefix to add to the ID

**Response:**
```json
{
  "id": "kq9rh1a2b3c"
}
```

### 3. Generate UUID v4

```
GET /api/id-generator/uuid
```

Generates a standard UUID v4.

**Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000"
}
```

## Algorithm Details

### Standard Unique ID

The standard unique ID algorithm combines:
1. Current timestamp in milliseconds
2. Random bytes converted to a base64 string
3. Optional prefix for categorization

Benefits:
- Chronological ordering (useful for databases)
- High collision resistance due to the random component
- Compact representation through base64 encoding

### Short Unique ID

The short unique ID algorithm combines:
1. Current timestamp converted to base36
2. Random bytes converted to hexadecimal
3. Optional prefix for categorization

Benefits:
- Shorter length than standard unique ID
- Still maintains good uniqueness properties
- Human-readable characters

### UUID v4

Standard UUID v4 format using the Node.js crypto module.

Benefits:
- Widely recognized format
- Standardized implementation
- Very low collision probability

## Usage Examples

### Using cURL

```bash
# Generate a standard unique ID
curl http://localhost:3000/api/id-generator/unique

# Generate a standard unique ID with prefix
curl http://localhost:3000/api/id-generator/unique?prefix=user_

# Generate a short unique ID
curl http://localhost:3000/api/id-generator/short

# Generate a UUID v4
curl http://localhost:3000/api/id-generator/uuid
```

### Using JavaScript Fetch

```javascript
// Generate a standard unique ID
fetch('http://localhost:3000/api/id-generator/unique')
  .then(response => response.json())
  .then(data => console.log(data.id));

// Generate a standard unique ID with prefix
fetch('http://localhost:3000/api/id-generator/unique?prefix=user_')
  .then(response => response.json())
  .then(data => console.log(data.id));
```