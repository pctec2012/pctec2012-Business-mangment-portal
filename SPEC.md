# Business Management Portal - Specification

## 1. Project Overview

**Project Name:** BizHub - Business Management Portal  
**Project Type:** Web Application (Next.js 16)  
**Core Functionality:** A comprehensive business management system that consolidates employee, project, task, client, and financial management into a unified dashboard with intuitive navigation and real-time analytics.  
**Target Users:** Small to medium business owners, project managers, team leads, and administrative staff

---

## 2. UI/UX Specification

### Layout Structure

**Overall Layout:**
- Collapsible sidebar navigation (280px expanded, 72px collapsed)
- Top header bar with search, notifications, and user profile (64px height)
- Main content area with breadcrumbs and page content
- Responsive: sidebar becomes bottom nav on mobile (<768px)

**Page Sections:**
- **Sidebar:** Logo, navigation menu, user quick actions, collapse toggle
- **Header:** Global search, notification bell, user avatar dropdown
- **Content Area:** Page title, action bar, main content, optional side panel

**Responsive Breakpoints:**
- Mobile: < 768px (bottom navigation, stacked layouts)
- Tablet: 768px - 1024px (collapsed sidebar by default)
- Desktop: > 1024px (full sidebar, multi-column layouts)

### Visual Design

**Color Palette:**
```css
--color-bg-primary: #0F1419;
--color-bg-secondary: #1A1F26;
--color-bg-tertiary: #242B33;
--color-bg-elevated: #2D343F;

--color-text-primary: #F4F4F5;
--color-text-secondary: #A1A1AA;
--color-text-muted: #71717A;

--color-accent-primary: #10B981;      /* Emerald green - success, primary actions */
--color-accent-secondary: #3B82F6;   /* Blue - information, links */
--color-accent-warning: #F59E0B;      /* Amber - warnings, pending */
--color-accent-danger: #EF4444;       /* Red - errors, delete actions */
--color-accent-purple: #8B5CF6;       /* Purple - special highlights */

--color-border: #2D343F;
--color-border-hover: #3D4752;
```

**Typography:**
- Primary Font: `"DM Sans", system-ui, sans-serif`
- Monospace: `"JetBrains Mono", monospace` (for numbers, codes)
- Headings: DM Sans Bold
  - H1: 32px / 40px line-height
  - H2: 24px / 32px line-height
  - H3: 20px / 28px line-height
  - H4: 16px / 24px line-height
- Body: DM Sans Regular, 14px / 22px line-height
- Small: 12px / 18px line-height

**Spacing System:**
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- Card padding: 24px
- Section gaps: 24px
- Component gaps: 16px

**Visual Effects:**
- Card shadows: `0 4px 24px rgba(0, 0, 0, 0.25)`
- Elevated shadows: `0 8px 32px rgba(0, 0, 0, 0.35)`
- Border radius: 8px (small), 12px (medium), 16px (large)
- Glassmorphism on modals: `backdrop-filter: blur(12px)`
- Subtle gradients on accent elements
- Smooth transitions: 200ms ease-out

### Components

**Navigation Items:**
- Icon + Label layout
- Active state: emerald accent bar on left, bg highlight
- Hover: subtle background shift
- Nested items with indentation

**Cards:**
- Stat cards with icon, value, label, trend indicator
- List cards with avatar/icon, title, subtitle, actions
- Detail cards with header, content, footer

**Tables:**
- Sticky header
- Row hover highlight
- Sortable columns with indicators
- Pagination controls
- Bulk action toolbar

**Forms:**
- Floating labels
- Input focus: emerald border glow
- Validation states with icons
- Select dropdowns with search
- Date pickers

**Buttons:**
- Primary: Emerald gradient, white text
- Secondary: Transparent, emerald border
- Danger: Red background
- Ghost: No background, subtle hover
- Sizes: sm (32px), md (40px), lg (48px)

**Status Badges:**
- Active/Complete: Emerald
- In Progress: Blue
- Pending/Warning: Amber
- Cancelled/Error: Red
- Draft: Gray

**Modals:**
- Centered with backdrop blur
- Slide-up animation on mobile
- Close button top-right
- Action buttons in footer

---

## 3. Functionality Specification

### Dashboard (Home)

**Key Metrics Cards (4 columns):**
1. Total Employees - count with trend
2. Active Projects - count with status breakdown
3. Tasks Due Today - count with priority breakdown
4. Monthly Revenue - amount with percentage change

**Recent Activity Feed:**
- Timeline of recent actions across all modules
- Filterable by type (employee, project, task, client, finance)
- Infinite scroll with load more

**Quick Actions Panel:**
- Add Employee
- Create Project
- New Task
- Add Client
- Record Transaction

**Charts:**
- Revenue trend (line chart - last 6 months)
- Project status distribution (donut chart)
- Task completion by department (horizontal bar)

### Employee Management

**Employee List:**
- Searchable, filterable table
- Columns: Avatar, Name, Email, Department, Role, Status, Join Date, Actions
- Filters: Department, Role, Status
- Bulk actions: Export, Change Status

**Employee Profile View:**
- Header: Avatar, name, role, department, contact info
- Tabs: Overview, Projects, Tasks, Performance
- Overview: Bio, skills, emergency contact, documents

**Add/Edit Employee Form:**
- Personal: Name, email, phone, address, DOB, photo
- Employment: Department, role, manager, start date, employment type
- Access: Username, password (for new), permissions

### Project Management

**Project List:**
- Card grid and table view toggle
- Columns: Name, Client, Team, Status, Progress, Deadline, Budget, Actions
- Filters: Status, Client, Team Lead, Date Range
- Quick status update

**Project Detail View:**
- Header: Name, client, dates, budget, status badge
- Tabs: Overview, Tasks, Team, Timeline, Files, Settings
- Overview: Description, objectives, milestones progress

**Add/Edit Project Form:**
- Basic: Name, description, client, dates, status
- Team: Team lead, members (multi-select)
- Settings: Budget, hourly rate, notifications

### Task Management

**Task Board (Kanban):**
- Columns: To Do, In Progress, Review, Done
- Drag-and-drop between columns
- Task cards: Title, assignee avatar, due date, priority, project tag
- Quick add task to column

**Task List View:**
- Table with filters
- Columns: Task, Project, Assignee, Due Date, Priority, Status, Actions
- Group by: Status, Project, Assignee, Due Date

**Task Detail:**
- Title, description (rich text)
- Properties: Project, Assignee, Due date, Priority, Status
- Subtasks checklist
- Comments thread
- Activity log

**Add/Edit Task Form:**
- Title, description
- Project (dropdown)
- Assignee (dropdown with search)
- Due date, priority, status
- Subtasks

### Client Management

**Client List:**
- Table view with search
- Columns: Company, Contact Person, Email, Phone, Projects, Revenue, Status
- Filters: Industry, Status, Has Active Projects

**Client Detail:**
- Header: Logo, company name, industry, status
- Tabs: Overview, Contacts, Projects, Invoices, Notes
- Overview: Address, website, social links, tags

**Add/Edit Client Form:**
- Company: Name, logo, industry, website
- Primary Contact: Name, email, phone, role
- Details: Address, notes, tags

### Financial Tracking

**Overview Dashboard:**
- Total Revenue (MTD, YTD)
- Total Expenses (MTD, YTD)
- Net Profit/Loss
- Outstanding Invoices

**Transactions List:**
- Table with columns: Date, Description, Type, Amount, Category, Project, Actions
- Filters: Type, Category, Date Range, Project
- Quick add transaction

**Add Transaction Form:**
- Date, description, type (income/expense)
- Amount, category, project (optional)
- Notes, attachment

**Categories:**
- Income: Project Payment, Retainer, Consulting, Other
- Expense: Salaries, Software, Office, Travel, Marketing, Other

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme applied consistently across all pages
- [ ] Emerald accent color used for primary actions and active states
- [ ] Sidebar collapses/expands smoothly with icon-only mode
- [ ] All cards have consistent border radius and shadows
- [ ] Typography hierarchy is clear and readable
- [ ] Responsive layout works at all breakpoints
- [ ] Animations are smooth (60fps)
- [ ] Status badges use correct colors per status

### Functional Checkpoints
- [ ] Navigation between all modules works
- [ ] Dashboard displays all metric cards with sample data
- [ ] Employee list displays with search and filters
- [ ] Project board allows viewing tasks in kanban columns
- [ ] Client list shows company information
- [ ] Financial overview shows revenue and expenses
- [ ] All forms have proper validation styling
- [ ] Tables support sorting (visual indication)
- [ ] Modals open/close with animation

### Performance Checkpoints
- [ ] Initial page load under 3 seconds
- [ ] No layout shift during navigation
- [ ] Smooth scrolling on long lists
- [ ] No console errors on any page

---

## 5. Sample Data

### Employees (8)
- Alice Johnson - CEO
- Bob Smith - CTO
- Carol Davis - Project Manager
- David Wilson - Senior Developer
- Emma Brown - Designer
- Frank Miller - Developer
- Grace Lee - Marketing Lead
- Henry Taylor - Sales Representative

### Departments
- Executive, Engineering, Design, Marketing, Sales, HR

### Projects (5)
- Website Redesign - Active, 75% complete
- Mobile App Launch - Active, 40% complete
- Marketing Campaign - Planning phase
- CRM Integration - In Progress
- Brand Refresh - Completed

### Tasks (12+)
Distributed across To Do, In Progress, Review, Done

### Clients (5)
- TechCorp Inc - $50,000 revenue
- StartupXYZ - $25,000 revenue  
- GlobalRetail - $75,000 revenue
- InnovateTech - $30,000 revenue
- DataDriven Co - $45,000 revenue

### Financial Data
- Monthly revenue: $45,000 - $85,000 range
- Monthly expenses: $25,000 - $40,000 range
