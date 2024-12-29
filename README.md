## How to Run Locally

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the frontend directory.
   - Add this line to it:
     ```env
     NEXT_PUBLIC_API_BASE_URL=<your_backend_url>
     ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run at:
```
http://localhost:3000
```

