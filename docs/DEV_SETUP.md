# Dev Setup (Local)

## Requirements
- Node 20+
- pnpm 9+
- Docker

## Local Services (docker-compose)
- Postgres: 5432
- Redis: 6379

## Environment Variables
Create .env from .env.example in repo root and per-app where needed.

## Commands
- pnpm install
- pnpm dev  # turbo runs apps
- pnpm db:migrate
- pnpm db:seed
- pnpm lint
- pnpm test

## Prisma
- schema in apps/api/prisma/schema.prisma
- migrations run in API workspace
