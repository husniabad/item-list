# How to Run Locally

## Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory.
   - Add this line to it:
     ```env
     MONGO_URI=<your_mongodb_connection_string>
     ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run at:
```
http://localhost:5000
```

---

## Frontend

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
     NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
     ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run at:
```
http://localhost:3000
```

