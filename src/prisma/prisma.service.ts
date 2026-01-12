import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '../generated/client';
import { PrismaPg } from '@prisma/adapter-pg'; // Import your adapter

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg(connectionString); // Create adapter instance


@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private client: any;

  constructor() {
    // Get the Prisma Client class and instantiate it
    const PC = PrismaClient as any;
    this.client = new PC({ adapter });
  }

  async onModuleInit() {
    try {
      await this.client.$connect();
      this.logger.log('Database connection established');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    this.logger.log('Database connection closed');
  }

  // Proxy database operations
  get user() {
    return this.client.user;
  }

  get project() {
    return this.client.project;
  }

  get projectMember() {
    return this.client.projectMember;
  }

  get task() {
    return this.client.task;
  }

  get tag() {
    return this.client.tag;
  }

  get taskTag() {
    return this.client.taskTag;
  }

  get comment() {
    return this.client.comment;
  }

  get notification() {
    return this.client.notification;
  }

  get activity() {
    return this.client.activity;
  }
}
