# JarveX AI — Full-Stack Generative AI SaaS Platform

<div align="center">

<p align="center">
  <img src="./client/src/assets/banner.jpg" alt="JarveX AI Banner" width="100%"/>
</p>

[![Live Demo](https://img.shields.io/badge/Live_Demo-jarvex--ai.vercel.app-gold?style=for-the-badge&logo=vercel)](https://jarvex-ai.vercel.app/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](./LICENSE)

**JarveX AI** is an production-ready, generative AI SaaS platform architected using the MERN stack. It delivers an integrated workspace for advanced natural language intelligence, programmatic text-to-image synthesis, a collaborative asset showcase, and a metered credit economy powered by secure Stripe infrastructure.

[Explore Live Platform](https://jarvex-ai.vercel.app/)

</div>

---

## 🌟 Key Features

* **AI-Powered Conversations:** Dynamically switch between AI text generation and image generation within a unified chat interface.
* **Powered by Google Gemini:** Integrates Gemini models via OpenAI compatibility endpoints for high-speed, intelligent responses.
* **AI Image Generation & CDN Storage:** Text-to-image pipeline converting prompts into downloadable high-res media with persistent CDN storage.
* **Public Community Showcase:** Option to publish generated images directly to a global feed accessible by other platform users.
* **Credit-Based Usage System:** Pre-configured credit tiers (Basic, Pro, Premium) consuming credits on generation (Text = 1 credit, Image = 2 credits).
* **Stripe Checkout & Webhooks:** End-to-end automated billing pipeline utilizing Stripe Checkout and raw-body webhooks for real-time credit updates.
* **Premium Dark & Light UI:** Bespoke dark and light UI built with Tailwind CSS v4, syntax highlighting via PrismJS, and Markdown rendering.
* **JWT Authentication:** Protected user sessions, encrypted password storage with BcryptJS, and scoped API middleware.

---

## 🏗️ Architecture & Tech Stack


```

jarvex-ai/
├── client/                           # Frontend application (React 19 + Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── assets/                   # Static assets, icons, and Prism.js styling definitions
│   │   ├── components/               # Modular UI building blocks
│   │   │   ├── ChatBox.jsx           # Main conversation thread view & prompt input box
│   │   │   ├── Message.jsx           # Message item renderer with Markdown & syntax highlighting
│   │   │   └── Sidebar.jsx           # Collapsible drawer navigation, history list & settings
│   │   ├── context/
│   │   │   └── AppContext.jsx        # Global state provider (Auth, active chats, credit balance, theme)
│   │   ├── pages/                    # Primary application views
│   │   │   ├── Community.jsx         # Public gallery of user-generated image assets
│   │   │   ├── Credits.jsx           # Subscription plans & Stripe payment portal triggers
│   │   │   ├── Loading.jsx           # Payment callback redirection & loader screen
│   │   │   └── Login.jsx             # User authentication interface (Sign in / Registration)
│   │   ├── App.jsx                   # Primary route definition & navigation wrapper
│   │   ├── index.css                 # Global Tailwind CSS imports and theme design tokens
│   │   └── main.jsx                  # React DOM root entry point
│   ├── .env                          # Frontend environment variables (Backend API base URL)
│   ├── .gitignore                    # Local build & dependency exclusions
│   ├── eslint.config.js              # ESLint linting configuration rules
│   ├── index.html                    # Main HTML single-page template
│   ├── package.json                  # Client dependencies & scripts
│   ├── vercel.json                   # SPA routing rewrite rules for Vercel deployment
│   └── vite.config.js                # Vite build & Tailwind CSS plugin configuration
│
└── server/                           # Backend API server (Node.js + Express 5)
    ├── configs/                      # Database and third-party service configurations
    │   ├── database.js               # MongoDB connection pool setup via Mongoose
    │   ├── imageKit.js               # ImageKit SDK configuration for media pipeline & CDN
    │   └── openai.js                 # OpenAI SDK client configured with Google Gemini endpoints
    ├── controllers/                  # Core application business logic handlers
    │   ├── chatController.js         # Chat session instantiation, retrieval, and deletion
    │   ├── creditController.js       # Credit tiers & Stripe checkout session generator
    │   ├── messageController.js      # AI text and image generation workflows
    │   ├── userController.js         # Auth workflows, profile stats, and public feed data
    │   └── webhooks.js               # Stripe raw-body webhook listener for credit fulfillment
    ├── middlewares/
    │   └── auth.js                   # JWT token authentication & request context protection
    ├── models/                       # Mongoose database schemas
    │   ├── Chat.js                   # Conversation schema with nested message entries
    │   ├── Transaction.js            # Stripe billing transaction audit logs
    │   └── User.js                   # User account schema with Bcrypt password hashing & credits
    ├── routes/                       # Express REST API route definitions
    │   ├── chatRoutes.js             # Endpoints for chat management (/api/chat)
    │   ├── creditRoutes.js           # Endpoints for subscription tiers & checkout (/api/credit)
    │   ├── messageRoutes.js          # Endpoints for LLM & Image generation (/api/message)
    │   └── userRoutes.js             # Endpoints for auth and profile actions (/api/user)
    ├── .env                          # Server secrets (Database URI, API keys, Stripe webhook secrets)
    ├── .gitignore                    # Node modules and environment exclusions
    ├── package.json                  # Server dependencies & scripts
    ├── server.js                     # Express app initialization, middleware pipeline & listeners
    └── vercel.json                   # Serverless Node.js deployment configuration for Vercel

```

### Stack Breakdown

* **Frontend:** React 19, Vite, Tailwind CSS v4, React Router 7, Axios, React Markdown, PrismJS, React Hot Toast.
* **Backend:** Node.js, Express.js 5, Mongoose 9, JWT, BcryptJS.
* **Integrations:** Google Gemini API, ImageKit SDK, Stripe SDK.
* **Hosting:** Vercel (Frontend & Serverless Backend).

---

## 🚀 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v22+ recommended)
* [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection URI
* [Google AI Studio](https://aistudio.google.com/) API key
* [ImageKit](https://imagekit.io/) account & credentials
* [Stripe](https://stripe.com/) Developer account

---

### 2. Clone the Repository
```bash
git clone https://github.com/Sharaf-Ahmed-Dev/jarvex-ai.git
cd jarvex-ai

```

---

### 3. Server Configuration & Setup

1. Open the server folder:
```bash
cd server
npm install

```


2. Create a `.env` file in `./server`:
```env
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key

# ImageKit Credentials
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

```


3. Start the backend:
```bash
npm run server

```



---

### 4. Client Configuration & Setup

1. Open a new terminal and navigate to `./client`:
```bash
cd ../client
npm install

```


2. Create a `.env` file in `./client`:
```env
VITE_SERVER_URL=http://localhost:3000

```


3. Start Vite dev server:
```bash
npm run dev

```



---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/user/register` | Register new account (20 free credits) | No |
| `POST` | `/api/user/login` | Authenticate user & return JWT | No |
| `GET` | `/api/user/data` | Fetch current authenticated user info | Yes |
| `GET` | `/api/user/published-images` | Fetch images shared to community feed | No |
| `GET` | `/api/chat/create` | Instantiate a new chat session | Yes |
| `GET` | `/api/chat/get` | Get all chat histories for active user | Yes |
| `POST` | `/api/chat/delete` | Remove a conversation session | Yes |
| `POST` | `/api/message/text` | Generate AI text (Cost: 1 Credit) | Yes |
| `POST` | `/api/message/image` | Generate AI image (Cost: 2 Credits) | Yes |
| `GET` | `/api/credit/plan` | List available subscription tiers | No |
| `POST` | `/api/credit/purchase` | Generate Stripe Checkout session URL | Yes |
| `POST` | `/api/stripe` | Webhook listener for payment confirmations | Stripe Sig |

---

## 📦 Deployment (Vercel)

Both `client/` and `server/` contain pre-configured `vercel.json` configurations.

1. **Deploy Backend:** Import `./server` to Vercel, set your environment variables in the project settings, and deploy.
2. **Deploy Frontend:** Import `./client` to Vercel, set `VITE_SERVER_URL` to your production backend URL, and deploy.
3. **Configure Stripe Webhooks:** Point your Stripe webhook endpoint to `https://<your-backend-domain>/api/stripe` listening for `payment_intent.succeeded`.

---

## 🛡️ License

This project is licensed under the ISC License.
