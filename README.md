# Recovery Platform

A comprehensive recovery platform monorepo unifying trauma-informed case management, safety-sensitive workforce re-entry compliance, and second-chance trucking ownership pathways.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development services
docker-compose -f infra/docker/docker-compose.yml up -d

# Start all applications in development mode
pnpm dev
```

## Architecture

### Applications
- **web** - Public marketing website with intake forms
- **staff** - Staff operations console (case management, compliance, billing)
- **client** - Client portal (PWA, mobile-first)
- **partner** - Partner portal (referrals, attestations) - MVP scaffold
- **api** - NestJS API server

### Packages
- **ui** - Shared UI components (shadcn wrappers, theme)
- **config** - Shared eslint/tsconfig/tailwind configs
- **types** - Shared TypeScript types (DTOs, enums)
- **utils** - Shared utilities (date, validation)

## Development

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Configure environment variables for Clerk, Stripe, Twilio, etc.
3. Start PostgreSQL and Redis via Docker Compose

### Scripts
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Run ESLint across all packages
- `pnpm type-check` - Type check all TypeScript files
- `pnpm test` - Run tests across all packages
- `pnpm clean` - Clean build artifacts

## Documentation

See `docs/` directory for:
- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [Product Requirements](docs/PRD.md)

## License

Private - All rights reserved
