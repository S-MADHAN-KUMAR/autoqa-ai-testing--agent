# AI Test Automation Agent

## Project Setup Instructions

This guide provides step-by-step instructions on how to set up the project locally and configure all necessary environment variables.

### 1. Clone the repository and install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Variables Configuration

Create a `.env` file in the root of your project. You can use `.env.example` as a template if available.

```env
# App Setup
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Neon Serverless Postgres Database (Drizzle ORM)
DATABASE_URL=

# Clerk Authentication (SaaS Hosted Auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=http://localhost:3000/api/github/callback

# Gemini API
GEMINI_API_KEY=

# Browserbase API
BROWSERBASE_PROJECT_ID=
BROWSERBASE_API_KEY=
```

### 3. Step-by-Step Guide to Generate API Keys

#### A. App Setup
Set `NEXT_PUBLIC_APP_URL` to your local development server URL.
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`

#### B. Neon Serverless Postgres (Database)
1. Go to [Neon.tech](https://neon.tech/) and create an account or log in.
2. Create a new project and select PostgreSQL as your database.
3. Once the database is provisioned, go to the **Dashboard** and copy the **Connection String** (make sure it includes the `password`).
4. Paste it as the `DATABASE_URL` in your `.env` file.

#### C. Clerk Authentication
1. Go to [Clerk.com](https://clerk.com/) and create an account.
2. Create a new application and select your preferred sign-in methods (e.g., Email, Google).
3. Navigate to the **API Keys** section in the left sidebar.
4. Copy the **Publishable Key** and **Secret Key**.
5. Paste them into `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` respectively.


#### E. GitHub OAuth
1. Log in to your GitHub account.
2. Go to **Settings -> Developer settings -> OAuth Apps**.
3. Click **New OAuth App**.
4. Fill in the application details:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/github/callback`
5. Click **Register application**.
6. Copy the **Client ID** into `GITHUB_CLIENT_ID`.
7. Click **Generate a new client secret** and copy it into `GITHUB_CLIENT_SECRET`
8. 

#### G. Browserbase API
1. Go to [Browserbase.com](https://www.browserbase.com/) and create an account.
2. Navigate to your project settings or API Keys section.
3. Copy the **Project ID** and **API Key**.
4. Paste them into `BROWSERBASE_PROJECT_ID` and `BROWSERBASE_API_KEY`.

### 4. Running the Application

Once all environment variables are configured:

1. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running!
