# PM Tool - Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

NestJS-based REST API for the Project Management Tool. Provides authentication, project management, task tracking, and team collaboration features.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: NestJS 10+
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io (planned for Milestone 3+)
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

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
├── app.controller.ts  # Main app controller
├── app.module.ts      # Main app module
├── app.service.ts     # Main app service
└── main.ts            # Application entry point

prisma/
├── schema.prisma      # Database schema definition
└── migrations/        # Database migration files

test/
├── app.e2e-spec.ts    # End-to-end tests
└── jest-e2e.json      # Jest E2E config
```

## Installation & Setup

### 1. Install Dependencies

Dependencies have already been installed. To reinstall:

```bash
npm install
```

### 2. Environment Configuration

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

### 3. Database Setup

Create PostgreSQL database:

```bash
createdb pm_tool_dev
```

### 4. Prisma Configuration

Install Prisma dependencies:

```bash
npm install @prisma/client prisma
```

Initialize Prisma (if not already done):

```bash
npx prisma init
```

Generate Prisma client:

```bash
npx prisma generate
```

### 5. Run Migrations

After defining schema in `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name init
```

## Compile and Run the Project

```bash
# Development with hot reload
npm run start:dev

# Development
npm run start

# Production
npm run build
npm run start:prod
```

Application will run on `http://localhost:3000`

## Running Tests

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Development Scripts

```bash
# Development
npm run start:dev        # Start with hot reload
npm run start            # Start without hot reload
npm run build            # Build for production
npm run start:prod       # Start production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Testing
npm run test             # Run Jest unit tests
npm run test:watch       # Run tests in watch mode
npm run test:cov         # Generate coverage report
npm run test:e2e         # Run E2E tests

# Prisma
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:gen       # Generate Prisma client
```

## API Documentation

Full API specification and endpoints are documented in [../../TODO.md](../../TODO.md) under the Milestone 1 section.

### Key Endpoints (Planned)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile
- `POST /api/projects` - Create project
- `GET /api/projects` - List user projects
- `GET /api/projects/:id` - Get project details
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:id/tasks` - List project tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task details
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

See [../../TODO.md](../../TODO.md) for complete endpoint specifications.

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

## Development Workflow

This project follows the feature branch workflow. See [CLAUDE.md](./CLAUDE.md) for detailed git guidelines.

**Key Rules:**
- Never commit directly to `main`
- Use feature branches: `git checkout -b feature/your-feature`
- Write descriptive commit messages
- Keep branches focused and short-lived

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
psql --version

# Test connection
psql -U postgres -h localhost

# Check current DATABASE_URL
echo $DATABASE_URL
```

### Prisma Issues

```bash
# Reset Prisma cache
rm -rf node_modules/.prisma

# Regenerate client
npx prisma generate

# View database state
npx prisma studio

# View pending migrations
npx prisma migrate status
```

### Port Already in Use

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or configure different port in .env
PORT=3001
```

### NestJS Issues

```bash
# Clear NestJS cache
rm -rf dist/

# Rebuild
npm run build

# Check TypeScript errors
npm run build -- --watch
```

## Contributing

See [CLAUDE.md](./CLAUDE.md) for the complete development workflow and branch strategy.

## Project Roadmap

See [../../TODO.md](../../TODO.md) for the complete 4-milestone roadmap with detailed task breakdown.

## Resources

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy)
- Prisma Documentation: https://www.prisma.io/docs
- JWT Authentication: https://github.com/nestjs/jwt

## Support

Nest is a MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Questions?

- Check the development workflow in [CLAUDE.md](./CLAUDE.md)
- Review the project roadmap in [../../TODO.md](../../TODO.md)
- See recent commits for implementation patterns: `git log --oneline`
- Check [NestJS docs](https://docs.nestjs.com/) for framework-specific questions
