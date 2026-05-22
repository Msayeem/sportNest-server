# 🏟️ Sport-Nest — Backend API

The REST API server powering [Sport-Nest](https://github.com/Msayeem/Sport-Nest), a sports facility booking platform. Built with Node.js, Express.js, and MongoDB.

🔗 **Live API:** [https://sport-nest-server-wine.vercel.app](https://sport-nest-server-wine.vercel.app)

---

## 🛠️ Tech Stack

| | Technology |
|---|---|
| **Runtime** | [Node.js](https://nodejs.org/) |
| **Framework** | [Express.js](https://expressjs.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) with Mongoose |
| **Authentication** | [BetterAuth](https://www.better-auth.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
server/
├── models/          # Mongoose schemas (Facility, Booking, User)
├── routes/          # Express route definitions
├── controllers/     # Route handler logic
├── middleware/      # Auth guards and other middleware
├── lib/             # BetterAuth and DB config
├── index.js         # App entry point
└── vercel.json      # Vercel deployment config
```

---

## 🔌 API Endpoints

### Facilities

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/facilities` | ❌ | Get all facilities |
| `GET` | `/api/facilities/:id` | ❌ | Get a single facility |
| `POST` | `/api/facilities` | ✅ | Add a new facility |
| `PUT` | `/api/facilities/:id` | ✅ | Update a facility |
| `DELETE` | `/api/facilities/:id` | ✅ | Delete a facility |

### Bookings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/bookings` | ✅ | Get logged-in user's bookings |
| `POST` | `/api/bookings` | ✅ | Book a facility |
| `DELETE` | `/api/bookings/:id` | ✅ | Cancel a booking |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/sign-up` | Register a new user |
| `POST` | `/api/auth/sign-in` | Login |
| `POST` | `/api/auth/sign-out` | Logout |

> ✅ = Requires authentication. Update endpoint paths to match your actual route definitions.

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repo
git clone <your-server-repo-url>
cd server

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the server:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_betterauth_secret
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

### Run the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:5000`.

---

## 🌐 Deployment

This server is deployed on **Vercel**. Make sure your `vercel.json` is configured to route all requests through your Express app:

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

Set the same environment variables from your `.env` in your Vercel project settings under **Settings → Environment Variables**.

---

## 🔗 Related

- **Frontend Repo:** [Sport-Nest Client](https://github.com/Msayeem/Sport-Nest)
- **Live App:** [https://sport-nest-blue.vercel.app](https://sport-nest-blue.vercel.app)
- **Live API:** [https://sport-nest-server-wine.vercel.app](https://sport-nest-server-wine.vercel.app)

---


