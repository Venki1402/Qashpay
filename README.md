# Qashpay

A payment wallet application where you can transfer money from your bank into your wallet and make seamless P2P transactions with users.

# Demo
https://github.com/user-attachments/assets/d2efbc6f-03dd-4c22-b5ae-66f5b9a62e84

## Features

- User wallet with balance management
- On-ramp (add money from bank)
- Peer-to-peer (P2P) money transfers between users
- Bank integration simulation (Axis, HDFC)
- Transaction history and status tracking
- Authentication (NextAuth.js)
- Modern UI with React, Next.js, and Tailwind CSS
- Monorepo structure with Turborepo

## Monorepo Structure

```
Qashpay/
  apps/
    bank/                  # Simulated bank web pages and API
    bank-webhook-handler/  # Handles bank webhook callbacks
    merchant-app/          # Merchant-facing app (demo)
    user-app/              # Main user wallet app
  packages/
    db/                    # Prisma schema, migrations, and DB client
    store/                 # Shared state management (Recoil)
    ui/                    # Shared UI components
    typescript-config/     # Shared TS configs
    eslint-config/         # Shared ESLint configs
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (for development database)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd Qashpay
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**
   - Configure your PostgreSQL connection in `packages/db/prisma/schema.prisma` and/or via environment variables.
   - Run migrations:

     ```bash
     cd packages/db
     npx prisma migrate dev --name init
     npx prisma db seed
     ```

4. **Start the development servers:**
   - In separate terminals, run:

     ```bash
     # User app
     cd apps/user-app
     npm run dev
     # Bank app
     cd apps/bank
     npm run dev
     # Bank webhook handler
     cd apps/bank-webhook-handler
     npm run dev
     # (Optional) Merchant app
     cd apps/merchant-app
     npm run dev
     ```

## Usage

- Access the user wallet app at [http://localhost:3001](http://localhost:3001)
- Simulated bank pages run on [http://localhost:3005](http://localhost:3005)
- Webhook handler runs on [http://localhost:3003](http://localhost:3003)
- (Optional) Merchant app runs on [http://localhost:3002](http://localhost:3002)

## Development

- All apps and packages use TypeScript
- Shared UI and state live in `packages/ui` and `packages/store`
- Linting: `npm run lint` in any app or package
- Tailwind CSS for styling

## Contributing

1. Fork the repo and create your branch from `main`.
2. Make your changes and add tests if applicable.
3. Run lint and tests.
4. Submit a pull request.
