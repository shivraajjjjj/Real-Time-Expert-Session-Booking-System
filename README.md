# Real-Time Expert Session Booking System

A full-stack app for discovering experts, viewing available time slots, and booking sessions with real-time updates.

## Features

- Expert discovery with search, category filter, and sorting (newest, rating, experience)
- Expert detail view with live slot updates (Socket.IO)
- Booking form with validation (name, email, phone, date, time, notes)
- My Bookings lookup by email
- Professional, responsive UI styled with Tailwind CSS

## Project Structure

```
root/
  backend/
    config/
      db.js
    controllers/
      bookingController.js
      expertController.js
    middlewares/
        errorMiddleware.js
    models/
      booking.js
      expert.js
    routes/
      bookingRoutes.js
      expertRoutes.js
    utils/
      validate.js
    seed.js
    server.js
    package.json
  frontend/
    public/
    src/
      pages/
      services/
      App.jsx
      main.jsx
      index.css
    package.json
```

## API

Base URL: `http://localhost:<PORT>` (default `3000`)

### Experts

- `GET /experts`
  - Query params: `page`, `limit`, `category`, `sort`, `search`
  - `sort` supports `createdAt`, `rating`, `experience` (rating/experience are highest-first)

- `GET /experts/:id`
  - Returns a single expert with `availableSlots`

### Bookings

- `POST /bookings`
  - Body:
    ```json
    {
      "expert": "<expertId>",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9876543210",
      "date": "2026-02-22",
      "timeSlot": "10:00",
      "notes": "Optional notes"
    }
    ```

- `GET /bookings?email=<email>`
  - Returns bookings for the email, sorted by date and time

- `PATCH /bookings/:id/status`
  - Body:
    ```json
    { "status": "pending" }
    ```
  - Allowed: `pending`, `confirmed`, `completed`

### Socket Events

- Server emits `slotBooked` with `{ expertId, date, timeSlot }` to update UI in real time.

## Installation

### Prerequisites

- Node.js 18+ (recommended)
- MongoDB instance

### Backend

```
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
MONGO_URL=mongodb://localhost:27017/expertsystem
PORT=3000
```
Seed experts:

```
node seed.js
```

Start the server:

```
node server.js
```

### Frontend

```
cd frontend
npm install
npm run dev
```

The UI will be available at the Vite dev server URL (typically `http://localhost:5173`).

## Notes

- If port `3000` is in use, change `PORT` in `backend/.env`.
- Seeding clears existing experts before inserting sample data.
