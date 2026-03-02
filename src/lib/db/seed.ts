import { db } from './index';
import { users, employees, projects, tasks, clients, transactions, projectTeamMembers } from './schema';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding database...');

  // Clear existing data
  await db.delete(projectTeamMembers);
  await db.delete(transactions);
  await db.delete(tasks);
  await db.delete(projects);
  await db.delete(clients);
  await db.delete(employees);
  await db.delete(users);

  console.log('Cleared existing data');

  // Create demo user
  const [demoUser] = await db.insert(users).values({
    email: 'demo@bizhub.com',
    password: 'Demo123!',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'admin',
  }).returning();

  console.log('Created demo user:', demoUser.email);

  // Create employees
  const employeeData = [
    { name: 'Alice Johnson', email: 'alice@bizhub.com', phone: '+1 (555) 123-4567', department: 'Executive', role: 'CEO', status: 'active', joinDate: new Date('2020-01-15'), avatar: 'AJ', userId: demoUser.id },
    { name: 'Bob Smith', email: 'bob@bizhub.com', phone: '+1 (555) 234-5678', department: 'Engineering', role: 'CTO', status: 'active', joinDate: new Date('2020-02-01'), avatar: 'BS' },
    { name: 'Carol Davis', email: 'carol@bizhub.com', phone: '+1 (555) 345-6789', department: 'Operations', role: 'Project Manager', status: 'active', joinDate: new Date('2020-03-10'), avatar: 'CD' },
    { name: 'David Wilson', email: 'david@bizhub.com', phone: '+1 (555) 456-7890', department: 'Engineering', role: 'Senior Developer', status: 'active', joinDate: new Date('2020-04-05'), avatar: 'DW' },
    { name: 'Emma Brown', email: 'emma@bizhub.com', phone: '+1 (555) 567-8901', department: 'Design', role: 'Designer', status: 'active', joinDate: new Date('2020-05-20'), avatar: 'EB' },
    { name: 'Frank Miller', email: 'frank@bizhub.com', phone: '+1 (555) 678-9012', department: 'Engineering', role: 'Developer', status: 'active', joinDate: new Date('2021-01-10'), avatar: 'FM' },
    { name: 'Grace Lee', email: 'grace@bizhub.com', phone: '+1 (555) 789-0123', department: 'Marketing', role: 'Marketing Lead', status: 'active', joinDate: new Date('2021-03-15'), avatar: 'GL' },
    { name: 'Henry Taylor', email: 'henry@bizhub.com', phone: '+1 (555) 890-1234', department: 'Sales', role: 'Sales Representative', status: 'active', joinDate: new Date('2021-06-01'), avatar: 'HT' },
  ];

  const createdEmployees = await db.insert(employees).values(employeeData).returning();
  console.log('Created', createdEmployees.length, 'employees');

  // Create projects
  const projectData = [
    { name: 'Website Redesign', client: 'TechCorp Inc', description: 'Complete redesign of corporate website with modern UX', status: 'in-progress', progress: 75, startDate: new Date('2025-10-01'), deadline: new Date('2026-03-15'), budget: 45000, color: '#10B981' },
    { name: 'Mobile App Launch', client: 'StartupXYZ', description: 'iOS and Android app development for new product launch', status: 'in-progress', progress: 40, startDate: new Date('2025-11-15'), deadline: new Date('2026-05-30'), budget: 85000, color: '#3B82F6' },
    { name: 'Marketing Campaign', client: 'GlobalRetail', description: 'Q1 2026 multi-channel marketing campaign', status: 'planning', progress: 15, startDate: new Date('2026-01-20'), deadline: new Date('2026-04-30'), budget: 35000, color: '#8B5CF6' },
    { name: 'CRM Integration', client: 'InnovateTech', description: 'Custom CRM integration with existing systems', status: 'in-progress', progress: 60, startDate: new Date('2025-12-01'), deadline: new Date('2026-02-28'), budget: 28000, color: '#F59E0B' },
    { name: 'Brand Refresh', client: 'DataDriven Co', description: 'Complete brand identity overhaul', status: 'completed', progress: 100, startDate: new Date('2025-08-01'), deadline: new Date('2025-12-15'), budget: 22000, color: '#EF4444' },
  ];

  const createdProjects = await db.insert(projects).values(projectData).returning();
  console.log('Created', createdProjects.length, 'projects');

  // Create project team members
  const teamData = [
    { projectId: createdProjects[0].id, employeeId: createdEmployees[0].id },
    { projectId: createdProjects[0].id, employeeId: createdEmployees[1].id },
    { projectId: createdProjects[0].id, employeeId: createdEmployees[2].id },
    { projectId: createdProjects[0].id, employeeId: createdEmployees[3].id },
    { projectId: createdProjects[0].id, employeeId: createdEmployees[4].id },
    { projectId: createdProjects[1].id, employeeId: createdEmployees[1].id },
    { projectId: createdProjects[1].id, employeeId: createdEmployees[3].id },
    { projectId: createdProjects[1].id, employeeId: createdEmployees[5].id },
    { projectId: createdProjects[2].id, employeeId: createdEmployees[6].id },
    { projectId: createdProjects[3].id, employeeId: createdEmployees[2].id },
    { projectId: createdProjects[3].id, employeeId: createdEmployees[3].id },
    { projectId: createdProjects[4].id, employeeId: createdEmployees[2].id },
    { projectId: createdProjects[4].id, employeeId: createdEmployees[4].id },
  ];

  await db.insert(projectTeamMembers).values(teamData);
  console.log('Created project team members');

  // Create tasks
  const taskData = [
    { title: 'Design homepage mockups', description: 'Create initial homepage design concepts for client review', projectId: createdProjects[0].id, assigneeId: createdEmployees[4].id, dueDate: new Date('2026-03-05'), priority: 'high', status: 'review' },
    { title: 'Implement user authentication', description: 'Set up secure login and registration system', projectId: createdProjects[1].id, assigneeId: createdEmployees[3].id, dueDate: new Date('2026-03-10'), priority: 'high', status: 'in-progress' },
    { title: 'Write API documentation', description: 'Document all API endpoints and integration guides', projectId: createdProjects[1].id, assigneeId: createdEmployees[5].id, dueDate: new Date('2026-03-08'), priority: 'medium', status: 'todo' },
    { title: 'Setup CI/CD pipeline', description: 'Configure automated testing and deployment workflow', projectId: createdProjects[1].id, assigneeId: createdEmployees[3].id, dueDate: new Date('2026-03-12'), priority: 'medium', status: 'todo' },
    { title: 'Create brand guidelines', description: 'Develop comprehensive brand style guide', projectId: createdProjects[4].id, assigneeId: createdEmployees[4].id, dueDate: new Date('2025-12-01'), priority: 'high', status: 'done' },
    { title: 'Client presentation', description: 'Prepare and deliver Q1 campaign strategy presentation', projectId: createdProjects[2].id, assigneeId: createdEmployees[6].id, dueDate: new Date('2026-03-03'), priority: 'urgent', status: 'in-progress' },
    { title: 'Database optimization', description: 'Improve query performance and add caching layer', projectId: createdProjects[3].id, assigneeId: createdEmployees[3].id, dueDate: new Date('2026-02-25'), priority: 'high', status: 'done' },
    { title: 'Mobile responsive testing', description: 'Test all pages across different device sizes', projectId: createdProjects[0].id, assigneeId: createdEmployees[4].id, dueDate: new Date('2026-03-07'), priority: 'medium', status: 'in-progress' },
    { title: 'Content migration', description: 'Migrate old website content to new CMS', projectId: createdProjects[0].id, assigneeId: createdEmployees[2].id, dueDate: new Date('2026-03-14'), priority: 'low', status: 'todo' },
    { title: 'Security audit', description: 'Complete security review and penetration testing', projectId: createdProjects[1].id, assigneeId: createdEmployees[1].id, dueDate: new Date('2026-03-20'), priority: 'urgent', status: 'todo' },
    { title: 'Email template design', description: 'Design transactional email templates', projectId: createdProjects[2].id, assigneeId: createdEmployees[4].id, dueDate: new Date('2026-03-04'), priority: 'medium', status: 'review' },
    { title: 'Analytics setup', description: 'Configure tracking and analytics dashboards', projectId: createdProjects[3].id, assigneeId: createdEmployees[5].id, dueDate: new Date('2026-02-27'), priority: 'medium', status: 'done' },
  ];

  const createdTasks = await db.insert(tasks).values(taskData).returning();
  console.log('Created', createdTasks.length, 'tasks');

  // Create clients
  const clientData = [
    { company: 'TechCorp Inc', contactPerson: 'John Smith', email: 'john@techcorp.com', phone: '+1 (555) 111-2222', industry: 'Technology', website: 'https://techcorp.com', address: '100 Tech Street, San Francisco, CA', status: 'active', revenue: 50000, tags: 'enterprise,priority' },
    { company: 'StartupXYZ', contactPerson: 'Sarah Connor', email: 'sarah@startupxyz.com', phone: '+1 (555) 222-3333', industry: 'Software', website: 'https://startupxyz.io', address: '50 Innovation Way, Austin, TX', status: 'active', revenue: 25000, tags: 'startup,growth' },
    { company: 'GlobalRetail', contactPerson: 'Michael Brown', email: 'michael@globalretail.com', phone: '+1 (555) 333-4444', industry: 'Retail', website: 'https://globalretail.com', address: '200 Commerce Blvd, New York, NY', status: 'active', revenue: 75000, tags: 'enterprise,retail' },
    { company: 'InnovateTech', contactPerson: 'Lisa Wang', email: 'lisa@innovatetech.com', phone: '+1 (555) 444-5555', industry: 'Technology', website: 'https://innovatetech.com', address: '75 Future Drive, Seattle, WA', status: 'active', revenue: 30000, tags: 'tech,mid-market' },
    { company: 'DataDriven Co', contactPerson: 'Tom Anderson', email: 'tom@datadriven.co', phone: '+1 (555) 555-6666', industry: 'Analytics', website: 'https://datadriven.co', address: '30 Data Lane, Boston, MA', status: 'active', revenue: 45000, tags: 'analytics,priority' },
  ];

  const createdClients = await db.insert(clients).values(clientData).returning();
  console.log('Created', createdClients.length, 'clients');

  // Create transactions
  const transactionData = [
    { date: new Date('2026-03-01'), description: 'Website Redesign - Phase 1', type: 'income', amount: 15000, category: 'Project Payment', projectId: createdProjects[0].id },
    { date: new Date('2026-02-28'), description: 'Monthly Salary - February', type: 'expense', amount: 18500, category: 'Salaries' },
    { date: new Date('2026-02-25'), description: 'Software Subscriptions', type: 'expense', amount: 2500, category: 'Software' },
    { date: new Date('2026-02-20'), description: 'Mobile App - Milestone 1', type: 'income', amount: 20000, category: 'Project Payment', projectId: createdProjects[1].id },
    { date: new Date('2026-02-15'), description: 'Office Rent - March', type: 'expense', amount: 4500, category: 'Office' },
    { date: new Date('2026-02-10'), description: 'CRM Integration Setup', type: 'income', amount: 10000, category: 'Project Payment', projectId: createdProjects[3].id },
    { date: new Date('2026-02-05'), description: 'Marketing Campaign Setup', type: 'expense', amount: 3500, category: 'Marketing' },
    { date: new Date('2026-01-30'), description: 'Consulting Retainer', type: 'income', amount: 5000, category: 'Retainer' },
    { date: new Date('2026-01-28'), description: 'Travel Expenses - Client Visit', type: 'expense', amount: 1200, category: 'Travel' },
    { date: new Date('2026-01-25'), description: 'Brand Refresh - Final', type: 'income', amount: 12000, category: 'Project Payment', projectId: createdProjects[4].id },
    { date: new Date('2026-01-20'), description: 'Equipment Purchase', type: 'expense', amount: 3500, category: 'Office' },
    { date: new Date('2026-01-15'), description: 'Q4 Consulting', type: 'income', amount: 8000, category: 'Consulting' },
    { date: new Date('2026-01-10'), description: 'Internet & Utilities', type: 'expense', amount: 650, category: 'Office' },
    { date: new Date('2026-01-05'), description: 'Website Maintenance', type: 'income', amount: 2500, category: 'Other', projectId: createdProjects[0].id },
    { date: new Date('2025-12-28'), description: 'Year-end Bonus', type: 'expense', amount: 8000, category: 'Salaries' },
    { date: new Date('2025-12-20'), description: 'Holiday Campaign', type: 'expense', amount: 4200, category: 'Marketing' },
    { date: new Date('2025-12-15'), description: 'Mobile App - Initial', type: 'income', amount: 25000, category: 'Project Payment', projectId: createdProjects[1].id },
    { date: new Date('2025-12-10'), description: 'Office Supplies', type: 'expense', amount: 380, category: 'Office' },
    { date: new Date('2025-12-05'), description: 'Technical Training', type: 'expense', amount: 1500, category: 'Other' },
    { date: new Date('2025-11-30'), description: 'Website Redesign - Deposit', type: 'income', amount: 10000, category: 'Project Payment', projectId: createdProjects[0].id },
  ];

  await db.insert(transactions).values(transactionData);
  console.log('Created', transactionData.length, 'transactions');

  console.log('Database seeded successfully!');
}

seed().catch(console.error);
