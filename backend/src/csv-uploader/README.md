# CSV Uploader Module

This module provides functionality for uploading and processing CSV files.

## Features

- Upload CSV files via REST API
- Validate file type and size
- Process CSV files and extract basic information
- Return preview of CSV data

## API Endpoints

### Upload CSV File

```
POST /csv-uploader/upload
```

**Request:**
- Content-Type: multipart/form-data
- Body: file (CSV file)

**Response:**
```json
{
  "success": true,
  "filename": "example.csv",
  "size": "1.23 KB",
  "rowCount": 100,
  "columnCount": 5,
  "preview": [
    {
      "column1": "value1",
      "column2": "value2"
    },
    {
      "column1": "value3",
      "column2": "value4"
    }
  ],
  "message": "Successfully processed CSV file with 100 rows and 5 columns."
}
```

## Validation

- File must be a CSV file (extension .csv or MIME type text/csv)
- Maximum file size: 5MB

## Implementation Details

The module consists of:

1. **Controller**: Handles HTTP requests, validates input, and returns responses
2. **Service**: Processes CSV files and extracts information
3. **Module**: Configures the module for NestJS

Files are temporarily stored in the `uploads` directory and processed using the csv-parser library.
