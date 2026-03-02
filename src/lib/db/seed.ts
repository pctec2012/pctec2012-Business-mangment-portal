import { db } from './index';
import { companies, users, employees, projects, tasks, clients, transactions, projectTeamMembers } from './schema';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding database...');

  // Clear existing data (in reverse order of dependencies)
  await db.delete(projectTeamMembers);
  await db.delete(transactions);
  await db.delete(tasks);
  await db.delete(projects);
  await db.delete(clients);
  await db.delete(employees);
  await db.delete(users);
  await db.delete(companies);

  console.log('Cleared existing data');

  // Create companies
  const createdCompanies = await db.insert(companies).values([
    {
      name: 'BizHub Solutions',
      slug: 'bizhub-solutions',
      description: 'Full-service digital agency specializing in web and mobile development',
      website: 'https://bizhubsolutions.com',
      email: 'info@bizhubsolutions.com',
      phone: '+1 (555) 100-2000',
      address: '100 Innovation Blvd, San Francisco, CA 94102',
      timezone: 'America/Los_Angeles',
      currency: 'USD',
    },
    {
      name: 'TechVentures Inc',
      slug: 'techventures-inc',
      description: 'Technology consulting and software development company',
      website: 'https://techventures.io',
      email: 'contact@techventures.io',
      phone: '+1 (555) 200-3000',
      address: '200 Tech Park, Austin, TX 78701',
      timezone: 'America/Chicago',
      currency: 'USD',
    },
    {
      name: 'Creative Studios',
      slug: 'creative-studios',
      description: 'Creative agency focused on branding and design',
      website: 'https://creativestudios.co',
      email: 'hello@creativestudios.co',
      phone: '+1 (555) 300-4000',
      address: '300 Design District, New York, NY 10001',
      timezone: 'America/New_York',
      currency: 'USD',
    },
  ]).returning();

  console.log('Created', createdCompanies.length, 'companies');

  // Create users for each company
  const createdUsers = await db.insert(users).values([
    {
      companyId: createdCompanies[0].id,
      email: 'alice@bizhub.com',
      password: 'Demo123!',
      firstName: 'Alice',
      lastName: 'Johnson',
      role: 'admin',
    },
    {
      companyId: createdCompanies[1].id,
      email: 'bob@techventures.com',
      password: 'Demo123!',
      firstName: 'Bob',
      lastName: 'Williams',
      role: 'admin',
    },
    {
      companyId: createdCompanies[2].id,
      email: 'carol@creativestudios.com',
      password: 'Demo123!',
      firstName: 'Carol',
      lastName: 'Davis',
      role: 'admin',
    },
  ]).returning();

  console.log('Created', createdUsers.length, 'users');

  // Create employees for each company
  const employeeData = [
    // Company 1 employees
    { companyId: createdCompanies[0].id, name: 'Alice Johnson', email: 'alice@bizhub.com', phone: '+1 (555) 123-4567', department: 'Executive', role: 'CEO', status: 'active', joinDate: new Date('2020-01-15'), avatar: 'AJ', userId: createdUsers[0].id },
    { companyId: createdCompanies[0].id, name: 'Bob Smith', email: 'bob@bizhub.com', phone: '+1 (555) 234-5678', department: 'Engineering', role: 'CTO', status: 'active', joinDate: new Date('2020-02-01'), avatar: 'BS' },
    { companyId: createdCompanies[0].id, name: 'Carol Davis', email: 'carol@bizhub.com', phone: '+1 (555) 345-6789', department: 'Operations', role: 'Project Manager', status: 'active', joinDate: new Date('2020-03-10'), avatar: 'CD' },
    { companyId: createdCompanies[0].id, name: 'David Wilson', email: 'david@bizhub.com', phone: '+1 (555) 456-7890', department: 'Engineering', role: 'Senior Developer', status: 'active', joinDate: new Date('2020-04-05'), avatar: 'DW' },
    { companyId: createdCompanies[0].id, name: 'Emma Brown', email: 'emma@bizhub.com', phone: '+1 (555) 567-8901', department: 'Design', role: 'Designer', status: 'active', joinDate: new Date('2020-05-20'), avatar: 'EB' },
    // Company 2 employees
    { companyId: createdCompanies[1].id, name: 'Frank Miller', email: 'frank@techventures.com', phone: '+1 (555) 678-9012', department: 'Engineering', role: 'Lead Developer', status: 'active', joinDate: new Date('2021-01-10'), avatar: 'FM' },
    { companyId: createdCompanies[1].id, name: 'Grace Lee', email: 'grace@techventures.com', phone: '+1 (555) 789-0123', department: 'Marketing', role: 'Marketing Lead', status: 'active', joinDate: new Date('2021-03-15'), avatar: 'GL' },
    { companyId: createdCompanies[1].id, name: 'Henry Taylor', email: 'henry@techventures.com', phone: '+1 (555) 890-1234', department: 'Sales', role: 'Sales Representative', status: 'active', joinDate: new Date('2021-06-01'), avatar: 'HT' },
    // Company 3 employees
    { companyId: createdCompanies[2].id, name: 'Ivy Chen', email: 'ivy@creativestudios.com', phone: '+1 (555) 901-2345', department: 'Design', role: 'Creative Director', status: 'active', joinDate: new Date('2019-08-01'), avatar: 'IC' },
    { companyId: createdCompanies[2].id, name: 'Jack White', email: 'jack@creativestudios.com', phone: '+1 (555) 012-3456', department: 'Design', role: 'Senior Designer', status: 'active', joinDate: new Date('2020-02-15'), avatar: 'JW' },
  ];

  const createdEmployees = await db.insert(employees).values(employeeData).returning();
  console.log('Created', createdEmployees.length, 'employees');

  // Create projects for each company
  const projectData = [
    // Company 1 projects
    { companyId: createdCompanies[0].id, name: 'Website Redesign', client: 'TechCorp Inc', description: 'Complete redesign of corporate website with modern UX', status: 'in-progress', progress: 75, startDate: new Date('2025-10-01'), deadline: new Date('2026-03-15'), budget: 45000, color: '#10B981' },
    { companyId: createdCompanies[0].id, name: 'Mobile App Launch', client: 'StartupXYZ', description: 'iOS and Android app development for new product launch', status: 'in-progress', progress: 40, startDate: new Date('2025-11-15'), deadline: new Date('2026-05-30'), budget: 85000, color: '#3B82F6' },
    { companyId: createdCompanies[0].id, name: 'Marketing Campaign', client: 'GlobalRetail', description: 'Q1 2026 multi-channel marketing campaign', status: 'planning', progress: 15, startDate: new Date('2026-01-20'), deadline: new Date('2026-04-30'), budget: 35000, color: '#8B5CF6' },
    // Company 2 projects
    { companyId: createdCompanies[1].id, name: 'CRM Integration', client: 'InnovateTech', description: 'Custom CRM integration with existing systems', status: 'in-progress', progress: 60, startDate: new Date('2025-12-01'), deadline: new Date('2026-02-28'), budget: 28000, color: '#F59E0B' },
    { companyId: createdCompanies[1].id, name: 'Cloud Migration', client: 'DataDriven Co', description: 'Migrate infrastructure to AWS cloud', status: 'planning', progress: 10, startDate: new Date('2026-02-01'), deadline: new Date('2026-06-30'), budget: 65000, color: '#06B6D4' },
    // Company 3 projects
    { companyId: createdCompanies[2].id, name: 'Brand Refresh', client: 'DataDriven Co', description: 'Complete brand identity overhaul', status: 'completed', progress: 100, startDate: new Date('2025-08-01'), deadline: new Date('2025-12-15'), budget: 22000, color: '#EF4444' },
    { companyId: createdCompanies[2].id, name: 'Logo Design', client: 'StartupXYZ', description: 'Create new logo and visual identity', status: 'in-progress', progress: 85, startDate: new Date('2025-12-01'), deadline: new Date('2026-01-31'), budget: 8000, color: '#EC4899' },
  ];

  const createdProjects = await db.insert(projects).values(projectData).returning();
  console.log('Created', createdProjects.length, 'projects');

  // Create tasks
  const taskData = [
    { companyId: createdCompanies[0].id, title: 'Design homepage mockups', description: 'Create initial homepage design concepts for client review', projectId: createdProjects[0].id, assigneeId: createdEmployees[4].id, dueDate: new Date('2026-03-05'), priority: 'high', status: 'review' },
    { companyId: createdCompanies[0].id, title: 'Implement user authentication', description: 'Set up secure login and registration system', projectId: createdProjects[1].id, assigneeId: createdEmployees[3].id, dueDate: new Date('2026-03-10'), priority: 'high', status: 'in-progress' },
    { companyId: createdCompanies[0].id, title: 'Write API documentation', description: 'Document all API endpoints and integration guides', projectId: createdProjects[1].id, assigneeId: createdEmployees[1].id, dueDate: new Date('2026-03-08'), priority: 'medium', status: 'todo' },
    { companyId: createdCompanies[0].id, title: 'Client presentation', description: 'Prepare and deliver Q1 campaign strategy presentation', projectId: createdProjects[2].id, assigneeId: createdEmployees[2].id, dueDate: new Date('2026-03-03'), priority: 'urgent', status: 'in-progress' },
    { companyId: createdCompanies[1].id, title: 'Database optimization', description: 'Improve query performance and add caching layer', projectId: createdProjects[3].id, assigneeId: createdEmployees[5].id, dueDate: new Date('2026-02-25'), priority: 'high', status: 'done' },
    { companyId: createdCompanies[1].id, title: 'Security audit', description: 'Complete security review and penetration testing', projectId: createdProjects[4].id, assigneeId: createdEmployees[5].id, dueDate: new Date('2026-03-20'), priority: 'urgent', status: 'todo' },
    { companyId: createdCompanies[2].id, title: 'Create brand guidelines', description: 'Develop comprehensive brand style guide', projectId: createdProjects[5].id, assigneeId: createdEmployees[8].id, dueDate: new Date('2025-12-01'), priority: 'high', status: 'done' },
    { companyId: createdCompanies[2].id, title: 'Final logo delivery', description: 'Deliver final logo files and brand assets', projectId: createdProjects[6].id, assigneeId: createdEmployees[9].id, dueDate: new Date('2026-01-31'), priority: 'high', status: 'review' },
  ];

  const createdTasks = await db.insert(tasks).values(taskData).returning();
  console.log('Created', createdTasks.length, 'tasks');

  // Create clients for each company
  const clientData = [
    // Company 1 clients
    { companyId: createdCompanies[0].id, company: 'TechCorp Inc', contactPerson: 'John Smith', email: 'john@techcorp.com', phone: '+1 (555) 111-2222', industry: 'Technology', website: 'https://techcorp.com', address: '100 Tech Street, San Francisco, CA', status: 'active', revenue: 50000, tags: 'enterprise,priority' },
    { companyId: createdCompanies[0].id, company: 'StartupXYZ', contactPerson: 'Sarah Connor', email: 'sarah@startupxyz.com', phone: '+1 (555) 222-3333', industry: 'Software', website: 'https://startupxyz.io', address: '50 Innovation Way, Austin, TX', status: 'active', revenue: 25000, tags: 'startup,growth' },
    { companyId: createdCompanies[0].id, company: 'GlobalRetail', contactPerson: 'Michael Brown', email: 'michael@globalretail.com', phone: '+1 (555) 333-4444', industry: 'Retail', website: 'https://globalretail.com', address: '200 Commerce Blvd, New York, NY', status: 'active', revenue: 75000, tags: 'enterprise,retail' },
    // Company 2 clients
    { companyId: createdCompanies[1].id, company: 'InnovateTech', contactPerson: 'Lisa Wang', email: 'lisa@innovatetech.com', phone: '+1 (555) 444-5555', industry: 'Technology', website: 'https://innovatetech.com', address: '75 Future Drive, Seattle, WA', status: 'active', revenue: 30000, tags: 'tech,mid-market' },
    { companyId: createdCompanies[1].id, company: 'DataDriven Co', contactPerson: 'Tom Anderson', email: 'tom@datadriven.co', phone: '+1 (555) 555-6666', industry: 'Analytics', website: 'https://datadriven.co', address: '30 Data Lane, Boston, MA', status: 'active', revenue: 45000, tags: 'analytics,priority' },
    // Company 3 clients
    { companyId: createdCompanies[2].id, company: 'Fresh Foods', contactPerson: 'Maria Garcia', email: 'maria@freshfoods.com', phone: '+1 (555) 666-7777', industry: 'Food & Beverage', website: 'https://freshfoods.com', address: '400 Culinary Ave, Miami, FL', status: 'active', revenue: 15000, tags: 'local,retail' },
  ];

  const createdClients = await db.insert(clients).values(clientData).returning();
  console.log('Created', createdClients.length, 'clients');

  // Create transactions for each company
  const transactionData = [
    // Company 1 transactions
    { companyId: createdCompanies[0].id, date: new Date('2026-03-01'), description: 'Website Redesign - Phase 1', type: 'income', amount: 15000, category: 'Project Payment', projectId: createdProjects[0].id },
    { companyId: createdCompanies[0].id, date: new Date('2026-02-28'), description: 'Monthly Salary - February', type: 'expense', amount: 18500, category: 'Salaries' },
    { companyId: createdCompanies[0].id, date: new Date('2026-02-25'), description: 'Software Subscriptions', type: 'expense', amount: 2500, category: 'Software' },
    { companyId: createdCompanies[0].id, date: new Date('2026-02-20'), description: 'Mobile App - Milestone 1', type: 'income', amount: 20000, category: 'Project Payment', projectId: createdProjects[1].id },
    { companyId: createdCompanies[0].id, date: new Date('2026-02-15'), description: 'Office Rent - March', type: 'expense', amount: 4500, category: 'Office' },
    // Company 2 transactions
    { companyId: createdCompanies[1].id, date: new Date('2026-02-28'), description: 'CRM Integration Setup', type: 'income', amount: 10000, category: 'Project Payment', projectId: createdProjects[3].id },
    { companyId: createdCompanies[1].id, date: new Date('2026-02-25'), description: 'Cloud Infrastructure Costs', type: 'expense', amount: 3200, category: 'Software' },
    { companyId: createdCompanies[1].id, date: new Date('2026-02-20'), description: 'Cloud Migration - Phase 1', type: 'income', amount: 15000, category: 'Project Payment', projectId: createdProjects[4].id },
    // Company 3 transactions
    { companyId: createdCompanies[2].id, date: new Date('2026-02-28'), description: 'Brand Refresh - Final', type: 'income', amount: 12000, category: 'Project Payment', projectId: createdProjects[5].id },
    { companyId: createdCompanies[2].id, date: new Date('2026-02-25'), description: 'Design Software License', type: 'expense', amount: 800, category: 'Software' },
    { companyId: createdCompanies[2].id, date: new Date('2026-02-20'), description: 'Logo Design - Deposit', type: 'income', amount: 4000, category: 'Project Payment', projectId: createdProjects[6].id },
  ];

  await db.insert(transactions).values(transactionData);
  console.log('Created', transactionData.length, 'transactions');

  console.log('Database seeded successfully!');
}

seed().catch(console.error);
