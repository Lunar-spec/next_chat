# Real-Time Chat Application

This is a basic real-time chat application built with the following technologies:

- Frontend: Next.js
- Backend: Strapi
- Real-time Communication: Socket.io

## Features

- User registration and login
- Join the chat room
- Send and receive chat messages in real-time within the joined chat room
- See a list of currently active users in the chat room

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- Node.js (>=18.x.x)
- npm or yarn

### Backend (Strapi)

1. **Clone the repository**

   ```bash
   git clone https://github.com/Lunar-spec/next_chat
   cd next_chat
   ```

2. **Navigate to the `backend` directory and install dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Run Strapi**

   ```bash
   npm run develop
   ```

4. **Configure CORS**

   Ensure your Strapi backend allows requests from your frontend. Edit `config/middlewares.js`:

   ```javascript
   module.exports = [
     "strapi::errors",
     "strapi::security",
     "strapi::cors", // Enable cors middleware
     "strapi::poweredBy",
     "strapi::logger",
     "strapi::query",
     "strapi::body",
     "strapi::session",
     "strapi::favicon",
     "strapi::public",
   ];
   ```

5. **Create a Custom Controller (if needed)**

   ```javascript
   'use strict';

   const { parseMultipartData, sanitizeEntity } =
   ```
