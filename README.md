![Untitled (6)-1](https://github.com/THEALIFHAKER1/NEXT-AUTH/assets/56091627/04aebd9f-1464-4fe1-a233-e99d3240546d)

# NEXT AUTH

A simple authentication system using Next.js, AuthJS, React, Tailwind CSS, and shadcn/ui

## Usage

1. Setup a project using the template

```bash
pnpm create next-app -e https://github.com/THEALIFHAKER1/NEXT-AUTH
```

```bash
npx create-next-app -e https://github.com/THEALIFHAKER1/NEXT-AUTH
```

```bash
yarn create next-app -e https://github.com/THEALIFHAKER1/NEXT-AUTH
```

```bash
bunx create-next-app -e https://github.com/THEALIFHAKER1/NEXT-AUTH
```

2. Copy `.env.example` to `.env.local`

```bash
cp .env.example .env
```

## Features

Key Features: -  Next-auth v5 (Auth.js)
-  Next.js 14 with server actions
-  Credentials Provider
-  OAuth Provider (Social login with Google & GitHub)
-  Forgot password functionality
-  Email verification
-  Two factor verification
-  User roles (Admin & User)
-  Login component (Opens in redirect or modal)
-  Register component
-  Forgot password component
-  Verification component
-  Error component
-  Login button
-  Logout button
-  Role Gate
-  Exploring next.js middleware
-  Extending & Exploring next-auth session
-  Exploring next-auth callbacks
-  useCurrentUser hook
-  useRole hook
-  currentUser utility
-  currentRole utility
-  Example with server component
-  Example with client component
-  Render content for admins using RoleGate component
-  Protect API Routes for admins only
-  Protect Server Actions for admins only
-  Change email with new verification in Settings page
-  Change password with old password confirmation in Settings page
-  Enable/disable two-factor auth in Settings page
-  Change user role in Settings page (for development purposes only)

## Scripts

If you are using a different package manager, be sure to update the package.json format scripts.

1. Check project formatting

```bash
yarn format:check
```

2. Format the project

```bash
yarn format
```
