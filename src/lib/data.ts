// Sample data for BizHub Business Management Portal

export const departments = [
  'Executive',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations'
];

export const roles = [
  'CEO',
  'CTO',
  'Project Manager',
  'Senior Developer',
  'Developer',
  'Designer',
  'Marketing Lead',
  'Sales Representative',
  'HR Manager',
  'Finance Analyst'
];

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  avatar: string;
  projects: string[];
}

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@bizhub.com',
    phone: '+1 (555) 123-4567',
    department: 'Executive',
    role: 'CEO',
    status: 'active',
    joinDate: '2020-01-15',
    avatar: 'AJ',
    projects: ['1', '2']
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@bizhub.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    role: 'CTO',
    status: 'active',
    joinDate: '2020-02-01',
    avatar: 'BS',
    projects: ['1', '2', '3']
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@bizhub.com',
    phone: '+1 (555) 345-6789',
    department: 'Operations',
    role: 'Project Manager',
    status: 'active',
    joinDate: '2020-03-10',
    avatar: 'CD',
    projects: ['1', '4', '5']
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@bizhub.com',
    phone: '+1 (555) 456-7890',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'active',
    joinDate: '2020-04-05',
    avatar: 'DW',
    projects: ['1', '2']
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma@bizhub.com',
    phone: '+1 (555) 567-8901',
    department: 'Design',
    role: 'Designer',
    status: 'active',
    joinDate: '2020-05-20',
    avatar: 'EB',
    projects: ['1', '5']
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@bizhub.com',
    phone: '+1 (555) 678-9012',
    department: 'Engineering',
    role: 'Developer',
    status: 'active',
    joinDate: '2021-01-10',
    avatar: 'FM',
    projects: ['2', '3']
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace@bizhub.com',
    phone: '+1 (555) 789-0123',
    department: 'Marketing',
    role: 'Marketing Lead',
    status: 'active',
    joinDate: '2021-03-15',
    avatar: 'GL',
    projects: ['4']
  },
  {
    id: '8',
    name: 'Henry Taylor',
    email: 'henry@bizhub.com',
    phone: '+1 (555) 890-1234',
    department: 'Sales',
    role: 'Sales Representative',
    status: 'active',
    joinDate: '2021-06-01',
    avatar: 'HT',
    projects: []
  }
];

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  deadline: string;
  budget: number;
  team: string[];
  color: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    client: 'TechCorp Inc',
    description: 'Complete redesign of corporate website with modern UX',
    status: 'in-progress',
    progress: 75,
    startDate: '2025-10-01',
    deadline: '2026-03-15',
    budget: 45000,
    team: ['1', '2', '3', '4', '5'],
    color: '#10B981'
  },
  {
    id: '2',
    name: 'Mobile App Launch',
    client: 'StartupXYZ',
    description: 'iOS and Android app development for new product launch',
    status: 'in-progress',
    progress: 40,
    startDate: '2025-11-15',
    deadline: '2026-05-30',
    budget: 85000,
    team: ['2', '4', '6'],
    color: '#3B82F6'
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    client: 'GlobalRetail',
    description: 'Q1 2026 multi-channel marketing campaign',
    status: 'planning',
    progress: 15,
    startDate: '2026-01-20',
    deadline: '2026-04-30',
    budget: 35000,
    team: ['7'],
    color: '#8B5CF6'
  },
  {
    id: '4',
    name: 'CRM Integration',
    client: 'InnovateTech',
    description: 'Custom CRM integration with existing systems',
    status: 'in-progress',
    progress: 60,
    startDate: '2025-12-01',
    deadline: '2026-02-28',
    budget: 28000,
    team: ['3', '4'],
    color: '#F59E0B'
  },
  {
    id: '5',
    name: 'Brand Refresh',
    client: 'DataDriven Co',
    description: 'Complete brand identity overhaul',
    status: 'completed',
    progress: 100,
    startDate: '2025-08-01',
    deadline: '2025-12-15',
    budget: 22000,
    team: ['3', '5'],
    color: '#EF4444'
  }
];

export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design homepage mockups',
    description: 'Create initial homepage design concepts for client review',
    project: '1',
    assignee: '5',
    dueDate: '2026-03-05',
    priority: 'high',
    status: 'review'
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up secure login and registration system',
    project: '2',
    assignee: '4',
    dueDate: '2026-03-10',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints and integration guides',
    project: '2',
    assignee: '6',
    dueDate: '2026-03-08',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: '4',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment workflow',
    project: '2',
    assignee: '4',
    dueDate: '2026-03-12',
    priority: 'medium',
    status: 'todo'
  },
  {
    id: '5',
    title: 'Create brand guidelines',
    description: 'Develop comprehensive brand style guide',
    project: '5',
    assignee: '5',
    dueDate: '2025-12-01',
    priority: 'high',
    status: 'done'
  },
  {
    id: '6',
    title: 'Client presentation',
    description: 'Prepare and deliver Q1 campaign strategy presentation',
    project: '3',
    assignee: '7',
    dueDate: '2026-03-03',
    priority: 'urgent',
    status: 'in-progress'
  },
  {
    id: '7',
    title: 'Database optimization',
    description: 'Improve query performance and add caching layer',
    project: '4',
    assignee: '4',
    dueDate: '2026-02-25',
    priority: 'high',
    status: 'done'
  },
  {
    id: '8',
    title: 'Mobile responsive testing',
    description: 'Test all pages across different device sizes',
    project: '1',
    assignee: '5',
    dueDate: '2026-03-07',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: '9',
    title: 'Content migration',
    description: 'Migrate old website content to new CMS',
    project: '1',
    assignee: '3',
    dueDate: '2026-03-14',
    priority: 'low',
    status: 'todo'
  },
  {
    id: '10',
    title: 'Security audit',
    description: 'Complete security review and penetration testing',
    project: '2',
    assignee: '2',
    dueDate: '2026-03-20',
    priority: 'urgent',
    status: 'todo'
  },
  {
    id: '11',
    title: 'Email template design',
    description: 'Design transactional email templates',
    project: '3',
    assignee: '5',
    dueDate: '2026-03-04',
    priority: 'medium',
    status: 'review'
  },
  {
    id: '12',
    title: 'Analytics setup',
    description: 'Configure tracking and analytics dashboards',
    project: '4',
    assignee: '6',
    dueDate: '2026-02-27',
    priority: 'medium',
    status: 'done'
  }
];

export interface Client {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  address: string;
  status: 'active' | 'inactive';
  projects: number;
  revenue: number;
  tags: string[];
}

export const clients: Client[] = [
  {
    id: '1',
    company: 'TechCorp Inc',
    contactPerson: 'John Smith',
    email: 'john@techcorp.com',
    phone: '+1 (555) 111-2222',
    industry: 'Technology',
    website: 'https://techcorp.com',
    address: '100 Tech Street, San Francisco, CA',
    status: 'active',
    projects: 2,
    revenue: 50000,
    tags: ['enterprise', 'priority']
  },
  {
    id: '2',
    company: 'StartupXYZ',
    contactPerson: 'Sarah Connor',
    email: 'sarah@startupxyz.com',
    phone: '+1 (555) 222-3333',
    industry: 'Software',
    website: 'https://startupxyz.io',
    address: '50 Innovation Way, Austin, TX',
    status: 'active',
    projects: 1,
    revenue: 25000,
    tags: ['startup', 'growth']
  },
  {
    id: '3',
    company: 'GlobalRetail',
    contactPerson: 'Michael Brown',
    email: 'michael@globalretail.com',
    phone: '+1 (555) 333-4444',
    industry: 'Retail',
    website: 'https://globalretail.com',
    address: '200 Commerce Blvd, New York, NY',
    status: 'active',
    projects: 1,
    revenue: 75000,
    tags: ['enterprise', 'retail']
  },
  {
    id: '4',
    company: 'InnovateTech',
    contactPerson: 'Lisa Wang',
    email: 'lisa@innovatetech.com',
    phone: '+1 (555) 444-5555',
    industry: 'Technology',
    website: 'https://innovatetech.com',
    address: '75 Future Drive, Seattle, WA',
    status: 'active',
    projects: 1,
    revenue: 30000,
    tags: ['tech', 'mid-market']
  },
  {
    id: '5',
    company: 'DataDriven Co',
    contactPerson: 'Tom Anderson',
    email: 'tom@datadriven.co',
    phone: '+1 (555) 555-6666',
    industry: 'Analytics',
    website: 'https://datadriven.co',
    address: '30 Data Lane, Boston, MA',
    status: 'active',
    projects: 1,
    revenue: 45000,
    tags: ['analytics', 'priority']
  }
];

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  project?: string;
}

export const transactions: Transaction[] = [
  { id: '1', date: '2026-03-01', description: 'Website Redesign - Phase 1', type: 'income', amount: 15000, category: 'Project Payment', project: '1' },
  { id: '2', date: '2026-02-28', description: 'Monthly Salary - February', type: 'expense', amount: 18500, category: 'Salaries' },
  { id: '3', date: '2026-02-25', description: 'Software Subscriptions', type: 'expense', amount: 2500, category: 'Software' },
  { id: '4', date: '2026-02-20', description: 'Mobile App - Milestone 1', type: 'income', amount: 20000, category: 'Project Payment', project: '2' },
  { id: '5', date: '2026-02-15', description: 'Office Rent - March', type: 'expense', amount: 4500, category: 'Office' },
  { id: '6', date: '2026-02-10', description: 'CRM Integration Setup', type: 'income', amount: 10000, category: 'Project Payment', project: '4' },
  { id: '7', date: '2026-02-05', description: 'Marketing Campaign Setup', type: 'expense', amount: 3500, category: 'Marketing' },
  { id: '8', date: '2026-01-30', description: 'Consulting Retainer', type: 'income', amount: 5000, category: 'Retainer' },
  { id: '9', date: '2026-01-28', description: 'Travel Expenses - Client Visit', type: 'expense', amount: 1200, category: 'Travel' },
  { id: '10', date: '2026-01-25', description: 'Brand Refresh - Final', type: 'income', amount: 12000, category: 'Project Payment', project: '5' },
  { id: '11', date: '2026-01-20', description: 'Equipment Purchase', type: 'expense', amount: 3500, category: 'Office' },
  { id: '12', date: '2026-01-15', description: 'Q4 Consulting', type: 'income', amount: 8000, category: 'Consulting' },
  { id: '13', date: '2026-01-10', description: 'Internet & Utilities', type: 'expense', amount: 650, category: 'Office' },
  { id: '14', date: '2026-01-05', description: 'Website Maintenance', type: 'income', amount: 2500, category: 'Other', project: '1' },
  { id: '15', date: '2025-12-28', description: 'Year-end Bonus', type: 'expense', amount: 8000, category: 'Salaries' },
  { id: '16', date: '2025-12-20', description: 'Holiday Campaign', type: 'expense', amount: 4200, category: 'Marketing' },
  { id: '17', date: '2025-12-15', description: 'Mobile App - Initial', type: 'income', amount: 25000, category: 'Project Payment', project: '2' },
  { id: '18', date: '2025-12-10', description: 'Office Supplies', type: 'expense', amount: 380, category: 'Office' },
  { id: '19', date: '2025-12-05', description: 'Technical Training', type: 'expense', amount: 1500, category: 'Other' },
  { id: '20', date: '2025-11-30', description: 'Website Redesign - Deposit', type: 'income', amount: 10000, category: 'Project Payment', project: '1' }
];

export const revenueByMonth = [
  { month: 'Oct', revenue: 45000 },
  { month: 'Nov', revenue: 52000 },
  { month: 'Dec', revenue: 68000 },
  { month: 'Jan', revenue: 48500 },
  { month: 'Feb', revenue: 58500 },
  { month: 'Mar', revenue: 35000 }
];

export const projectStatusData = [
  { status: 'Completed', count: 1, color: '#10B981' },
  { status: 'In Progress', count: 3, color: '#3B82F6' },
  { status: 'Planning', count: 1, color: '#8B5CF6' },
  { status: 'On Hold', count: 0, color: '#F59E0B' }
];

export const recentActivities = [
  { id: '1', user: 'Alice Johnson', action: 'approved', target: 'Q4 financial report', time: '2 hours ago', type: 'finance' },
  { id: '2', user: 'Bob Smith', action: 'completed', target: 'security audit setup', time: '4 hours ago', type: 'project' },
  { id: '3', user: 'Carol Davis', action: 'updated', target: 'Website Redesign progress', time: '5 hours ago', type: 'project' },
  { id: '4', user: 'Emma Brown', action: 'submitted', target: 'homepage mockups for review', time: '6 hours ago', type: 'task' },
  { id: '5', user: 'David Wilson', action: 'fixed', target: 'login bug in mobile app', time: '8 hours ago', type: 'task' },
  { id: '6', user: 'Grace Lee', action: 'launched', target: 'email campaign', time: '1 day ago', type: 'project' },
  { id: '7', user: 'Henry Taylor', action: 'won', target: 'new client: DataDriven Co', time: '2 days ago', type: 'client' },
  { id: '8', user: 'Frank Miller', action: 'completed', target: 'analytics dashboard', time: '2 days ago', type: 'task' }
];

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find(e => e.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getClientById(id: string): Client | undefined {
  return clients.find(c => c.id === id);
}

export function getTasksByProject(projectId: string): Task[] {
  return tasks.filter(t => t.project === projectId);
}

export function getTasksByStatus(status: Task['status']): Task[] {
  return tasks.filter(t => t.status === status);
}

export function getTotalRevenue(): number {
  return transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(): number {
  return transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
}

export function getMonthlyRevenue(): number {
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  return transactions
    .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getMonthlyExpenses(): number {
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  return transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);
}
