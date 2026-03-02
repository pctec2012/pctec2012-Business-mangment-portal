import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Companies table - supports multi-company architecture
export const companies = sqliteTable('companies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  logo: text('logo'),
  website: text('website'),
  phone: text('phone'),
  email: text('email'),
  address: text('address'),
  timezone: text('timezone').notNull().default('UTC'),
  currency: text('currency').notNull().default('USD'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Users table for authentication
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').notNull().references(() => companies.id),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  role: text('role').notNull().default('user'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Employees table
export const employees = sqliteTable('employees', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').notNull().references(() => companies.id),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  department: text('department').notNull(),
  role: text('role').notNull(),
  status: text('status').notNull().default('active'),
  joinDate: integer('join_date', { mode: 'timestamp' }).notNull(),
  avatar: text('avatar'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Projects table
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').notNull().references(() => companies.id),
  name: text('name').notNull(),
  client: text('client').notNull(),
  description: text('description'),
  status: text('status').notNull().default('planning'),
  progress: integer('progress').notNull().default(0),
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  deadline: integer('deadline', { mode: 'timestamp' }).notNull(),
  budget: integer('budget').notNull().default(0),
  color: text('color').notNull().default('#10B981'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Tasks table
export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').notNull().references(() => companies.id),
  title: text('title').notNull(),
  description: text('description'),
  projectId: integer('project_id').references(() => projects.id),
  assigneeId: integer('assignee_id').references(() => employees.id),
  dueDate: integer('due_date', { mode: 'timestamp' }).notNull(),
  priority: text('priority').notNull().default('medium'),
  status: text('status').notNull().default('todo'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Clients table
export const clients = sqliteTable('clients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').notNull().references(() => companies.id),
  company: text('company').notNull(),
  contactPerson: text('contact_person').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  industry: text('industry'),
  website: text('website'),
  address: text('address'),
  status: text('status').notNull().default('active'),
  revenue: integer('revenue').notNull().default(0),
  tags: text('tags'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Transactions table
export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').notNull().references(() => companies.id),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  amount: integer('amount').notNull(),
  category: text('category').notNull(),
  projectId: integer('project_id').references(() => projects.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Project team members junction table
export const projectTeamMembers = sqliteTable('project_team_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: integer('project_id').notNull().references(() => projects.id),
  employeeId: integer('employee_id').notNull().references(() => employees.id),
});

// Type exports
export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
