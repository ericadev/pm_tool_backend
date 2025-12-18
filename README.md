# PM Tool - Backend API

NestJS-based REST API for the Project Management Tool. Provides authentication, project management, task tracking, and team collaboration features.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: NestJS 10+
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io (planned for Milestone 3+)

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x
- PostgreSQL 14+ (local installation)

## Project Structure

```
src/
├── auth/              # Authentication module (JWT, login, register)
├── users/             # User management module
├── projects/          # Project module with role-based access
├── tasks/             # Task management module
├── tags/              # Tags and filtering module
├── common/            # Shared utilities, guards, decorators
├── database/          # Database configuration and migrations
└── main.ts            # Application entry point
```

## Setup Instructions

> **Note**: This is a basic structure. Follow these steps to initialize:

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Install NestJS CLI (Optional but Recommended)

```bash
npm install -g @nestjs/cli
# or use via npx: npx nest
```

### 3. Environment Configuration

Create a `.env` file in the backend root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/pm_tool_dev
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=pm_tool_dev

# JWT
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=7d

# Server
PORT=3000
NODE_ENV=development
```

### 4. Database Setup

Create PostgreSQL database:

```bash
createdb pm_tool_dev
```

### 5. Prisma Setup

Initialize Prisma (if not already done):

```bash
npx prisma init
```

Generate Prisma client:

```bash
npx prisma generate
```

### 6. Run Migrations

After defining schema in `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name init
```

### 7. Start Development Server

```bash
# Development with hot reload
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Development Workflow

This project follows the feature branch workflow. See [CLAUDE.md](./CLAUDE.md) for detailed git guidelines.

**Key Rules:**
- Never commit directly to `main`
- Use feature branches: `git checkout -b feature/your-feature`
- Write descriptive commit messages
- Keep branches focused and short-lived

## API Documentation

Full API specification and endpoints are documented in [../../TODO.md](../../TODO.md) under the Milestone 1 section.

### Key Endpoints (Planned)

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /users/:id` - Get user profile
- `POST /projects` - Create project
- `GET /projects` - List user projects
- `GET /projects/:id/tasks` - List project tasks
- `POST /tasks` - Create task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

See TODO.md for complete endpoint specifications.

## Database Schema

The database schema is defined using Prisma ORM in `prisma/schema.prisma`.

### Core Models

- **User** - System users with email, password, profile
- **Project** - Projects owned by users with role-based members
- **ProjectMember** - User's role within a project (OWNER, ADMIN, MEMBER)
- **Task** - Tasks within projects with status tracking
- **Tag** - Tags for categorizing and filtering tasks
- **TaskTag** - Many-to-many relationship between tasks and tags

See `prisma/schema.prisma` for full schema definition.

## Scripts

```bash
# Development
npm run start:dev        # Start with hot reload
npm run build            # Build for production
npm run start:prod       # Start production build

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database (if available)
npm run db:reset         # Reset database (dev only)

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run test             # Run Jest tests
npm run test:cov         # Run tests with coverage

# Prisma
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:gen       # Generate Prisma client
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:cov
```

## Deployment

Deployment instructions and environment configuration will be available in the documentation once the project reaches the appropriate milestone.

## Contributing

See [CLAUDE.md](./CLAUDE.md) for the complete development workflow and branch strategy.

## Project Roadmap

See [../../TODO.md](../../TODO.md) for the complete 4-milestone roadmap with detailed task breakdown.

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
psql --version

# Test connection
psql -U postgres -h localhost
```

### Prisma Issues

```bash
# Reset Prisma cache
rm -rf node_modules/.prisma

# Regenerate client
npx prisma generate

# View database state
npx prisma studio
```

## Questions?

- Check the development workflow in [CLAUDE.md](./CLAUDE.md)
- Review the project roadmap in [../../TODO.md](../../TODO.md)
- See recent commits for implementation patterns: `git log --oneline`
