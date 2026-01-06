# Project Management App - Implementation Roadmap

## Overview
Full-stack project management application with React/TypeScript frontend and NestJS backend, organized into 4 milestone releases.

**Tech Stack:**
- Frontend: React 18 + TypeScript + Vite + Shadcn/ui + Tailwind CSS
- Backend: NestJS + TypeScript + Prisma ORM
- Database: PostgreSQL 14+
- State: React Query + Context API
- Real-time: Socket.io (Milestone 3+)

---

## Milestone 1: MVP - Authentication, Projects & Tasks

### Goal
Establish core functionality: user authentication, project management, and basic task operations.

### Database Schema (Prisma)

**Core Models:**
- `User` - Authentication and profile (id, email, password, firstName, lastName, avatar)
- `Project` - Project entity (id, name, description, color, icon, ownerId)
- `ProjectMember` - Project membership with roles (id, projectId, userId, role)
- `Task` - Task entity (id, title, description, status, priority, projectId, assigneeId, creatorId, dueDate, position)
- `Tag` - Task tags (id, name, color)
- `TaskTag` - Many-to-many relation

**Enums:**
- `ProjectRole`: OWNER, ADMIN, MEMBER, VIEWER
- `TaskStatus`: TODO, IN_PROGRESS, IN_REVIEW, DONE
- `TaskPriority`: LOW, MEDIUM, HIGH, URGENT

### Backend Tasks

**Setup & Configuration:**
- [x] Initialize NestJS project (`nest new pm-tool-backend`)
- [x] Install dependencies: `@prisma/client`, `prisma`, `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`, `class-validator`, `class-transformer`
- [x] Configure Prisma with PostgreSQL connection
- [x] Create `.env` file with DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN
- [x] Create initial Prisma schema with User, Project, ProjectMember, Task models
- [x] Run `npx prisma migrate dev --name init`
- [ ] Configure CORS for frontend origin
- [ ] Set up Swagger documentation

**Auth Module (`src/auth/`):**
- [ ] Create auth module: `nest g module auth`
- [ ] Create auth service: `nest g service auth`
- [ ] Create auth controller: `nest g controller auth`
- [ ] Implement JWT strategy (`strategies/jwt.strategy.ts`)
- [ ] Implement local strategy (`strategies/local.strategy.ts`)
- [ ] Create guards: `jwt-auth.guard.ts`, `local-auth.guard.ts`
- [ ] Create DTOs: `login.dto.ts`, `register.dto.ts`, `auth-response.dto.ts`
- [ ] Implement password hashing with bcrypt
- [ ] Implement endpoints: POST /auth/register, POST /auth/login, GET /auth/me, POST /auth/refresh

**Users Module (`src/users/`):**
- [ ] Generate users module, service, controller
- [ ] Create DTOs: `create-user.dto.ts`, `update-user.dto.ts`, `user-response.dto.ts`
- [ ] Implement endpoints: GET /users, GET /users/:id, PATCH /users/:id, DELETE /users/:id, GET /users/search

**Projects Module (`src/projects/`):**
- [ ] Generate projects module, service, controller
- [ ] Create DTOs: `create-project.dto.ts`, `update-project.dto.ts`, `add-member.dto.ts`
- [ ] Implement project CRUD endpoints
- [ ] Implement member management: POST /projects/:id/members, DELETE /projects/:id/members/:userId, PATCH /projects/:id/members/:userId
- [ ] Add role-based authorization guards
- [ ] Implement project ownership and permissions logic

**Tasks Module (`src/tasks/`):**
- [ ] Generate tasks module, service, controller
- [ ] Create DTOs: `create-task.dto.ts`, `update-task.dto.ts`, `task-query.dto.ts`
- [ ] Implement endpoints: GET /projects/:projectId/tasks, POST /projects/:projectId/tasks, GET /tasks/:id, PATCH /tasks/:id, DELETE /tasks/:id
- [ ] Add filtering by status, priority, assignee
- [ ] Implement task assignment logic
- [ ] Add task positioning/ordering

**Common:**
- [ ] Create global exception filter
- [ ] Add validation pipe globally
- [ ] Set up logging with Winston or Pino
- [ ] Add rate limiting middleware

### Frontend Tasks

**See [frontend/TODO.md](frontend/TODO.md) for all frontend tasks organized by milestone.**

---

## Milestone 2: Core PM Features - Advanced Task Management

### Goal
Enhance task management with filtering, search, multiple views, tags, and drag-and-drop.

### Backend Tasks

**Tags Module (`src/tags/`):**
- [ ] Generate tags module, service, controller
- [ ] Create DTOs: `create-tag.dto.ts`, `update-tag.dto.ts`
- [ ] Implement endpoints: GET /tags, POST /tags, PATCH /tags/:id, DELETE /tags/:id
- [ ] Add task-tag association endpoints: POST /tasks/:id/tags, DELETE /tasks/:id/tags/:tagId

**Enhanced Tasks Module:**
- [ ] Create `advanced-task-query.dto.ts` with search, tags, date range, sorting
- [ ] Implement full-text search on title/description
- [ ] Add bulk update endpoint: POST /tasks/bulk-update
- [ ] Create GET /tasks/my-tasks endpoint
- [ ] Create GET /tasks/overdue endpoint
- [ ] Add sorting options (dueDate, priority, createdAt, updatedAt)
- [ ] Optimize queries with database indexes

**Database:**
- [ ] Add indexes: `@@index([projectId, status])`, `@@index([assigneeId])`, `@@index([dueDate])`

### Frontend Tasks

**See [frontend/TODO.md](frontend/TODO.md) for all frontend tasks organized by milestone.**

---

## Milestone 3: Team Collaboration - Comments, Notifications, Activity

### Goal
Enable team collaboration with comments, real-time notifications, activity feeds, and WebSocket updates.

### Backend Tasks

**Comments Module (`src/comments/`):**
- [ ] Generate comments module, service, controller
- [ ] Create DTOs: `create-comment.dto.ts`, `update-comment.dto.ts`
- [ ] Implement endpoints: GET /tasks/:taskId/comments, POST /tasks/:taskId/comments, PATCH /comments/:id, DELETE /comments/:id
- [ ] Add mention parsing (@username)
- [ ] Create CommentMention model and associations

**Notifications Module (`src/notifications/`):**
- [ ] Generate notifications module, service, controller
- [ ] Create notification types enum (TASK_ASSIGNED, TASK_MENTIONED, COMMENT_MENTIONED, TASK_DUE_SOON, etc.)
- [ ] Implement endpoints: GET /notifications, PATCH /notifications/:id/read, PATCH /notifications/read-all, DELETE /notifications/:id
- [ ] Create notification creation logic for various events
- [ ] Add notification preferences

**Activity Module (`src/activities/`):**
- [ ] Generate activities module, service, controller
- [ ] Create ActivityType enum (PROJECT_CREATED, TASK_CREATED, TASK_UPDATED, etc.)
- [ ] Implement endpoints: GET /projects/:id/activities, GET /tasks/:id/activities, GET /activities/my-feed
- [ ] Create activity logging interceptor
- [ ] Implement activity creation on key events

**WebSocket Module (`src/websocket/`):**
- [ ] Install Socket.io: `npm install @nestjs/websockets @nestjs/platform-socket.io`
- [ ] Create WebSocket gateway
- [ ] Implement NotificationsGateway for real-time notifications
- [ ] Implement TasksGateway for real-time task updates
- [ ] Add room-based subscriptions (join-project, leave-project)
- [ ] Create events: task:created, task:updated, task:deleted, comment:created, notification:new
- [ ] Add JWT authentication for WebSocket connections

**Database:**
- [ ] Add Activity model with metadata JSON field
- [ ] Add Notification model
- [ ] Add CommentMention model
- [ ] Run migration

### Frontend Tasks

**See [frontend/TODO.md](frontend/TODO.md) for all frontend tasks organized by milestone.**

---

## Milestone 4: Analytics & Polish

### Goal
Add analytics dashboard, reports, performance optimizations, and final polish.

### Backend Tasks

**Analytics Module (`src/analytics/`):**
- [ ] Generate analytics module, service, controller
- [ ] Create DTOs: `analytics-query.dto.ts`, `analytics-response.dto.ts`
- [ ] Implement GET /analytics/project/:id/overview (total tasks, completion rate, task breakdowns)
- [ ] Implement GET /analytics/project/:id/tasks (completion trends over time)
- [ ] Implement GET /analytics/project/:id/members (member productivity)
- [ ] Implement GET /analytics/project/:id/velocity (team velocity)
- [ ] Implement GET /analytics/user/performance (user metrics)
- [ ] Implement GET /analytics/dashboard (summary stats)

**Reports Module (`src/reports/`):**
- [ ] Generate reports module, service, controller
- [ ] Create report generation logic
- [ ] Implement POST /reports/generate
- [ ] Implement GET /reports/templates
- [ ] Add export functionality (CSV/PDF)
- [ ] Install PDF library: `npm install pdfkit` or `@pdfme/generator`

**Performance Optimizations:**
- [ ] Install Redis: `npm install @nestjs/cache-manager cache-manager`
- [ ] Configure Redis caching
- [ ] Add caching to frequently accessed endpoints (projects, tasks)
- [ ] Optimize database queries with proper includes/selects
- [ ] Add pagination helper utility
- [ ] Implement query result caching
- [ ] Add compression middleware
- [ ] Configure rate limiting per user/IP

**Database:**
- [ ] Review and optimize all indexes
- [ ] Add composite indexes for common query patterns

### Frontend Tasks

**See [frontend/TODO.md](frontend/TODO.md) for all frontend tasks organized by milestone.**

---

## Critical Files Reference

### Milestone 1 - Core Files to Create:

**Backend:**
- `prisma/schema.prisma` - Database schema
- `src/auth/auth.service.ts` - Authentication logic
- `src/auth/strategies/jwt.strategy.ts` - JWT validation
- `src/projects/projects.service.ts` - Project business logic
- `src/tasks/tasks.service.ts` - Task business logic

**Frontend:**
See [frontend/TODO.md](frontend/TODO.md) for frontend-specific files and implementation details.

---

## Development Workflow Notes

Per CLAUDE.md instructions:
- **Always work on feature branches** - never commit directly to `main`
- Branch naming: `feature/`, `fix/`, `docs/`, `refactor/`, `test/`, `chore/`
- Commit messages: Clear, descriptive, explain what and why
- Test locally before pushing: `npm run dev`, `npm run build`

**Recommended Development Order:**
1. Set up backend (NestJS + Prisma + PostgreSQL)
2. Implement authentication (backend + frontend)
3. Build projects feature (backend + frontend)
4. Build tasks feature (backend + frontend)
5. Test Milestone 1 thoroughly before moving to Milestone 2
6. Continue iteratively through each milestone

---

## Success Criteria

**Milestone 1:** Users can register, login, create projects, invite members, and manage tasks with basic CRUD operations.

**Milestone 2:** Users can filter/search tasks, use multiple views (Kanban, list, calendar), manage tags, and drag-and-drop tasks.

**Milestone 3:** Users can comment on tasks with mentions, receive real-time notifications, see activity feeds, and collaborate in real-time.

**Milestone 4:** Users can view analytics dashboards, generate reports, and experience polished UI with excellent performance.
