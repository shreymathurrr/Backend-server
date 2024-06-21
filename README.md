# Express TypeScript Backend

This is a simple Express server built with TypeScript that handles form submissions and retrieves them.

## Endpoints

- **GET /ping**: Check if the server is running.
- **POST /submit**: Submit a new form entry.
  - Body parameters: `name`, `email`, `phone`, `github_link`, `stopwatch_time`
- **GET /read**: Retrieve a form entry by index.
  - Query parameter: `index` (0-based index)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
