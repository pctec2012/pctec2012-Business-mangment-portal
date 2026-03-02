'use client';

import Header from '@/components/Header';
import { 
  IconUsers, 
  IconFolder, 
  IconCheckSquare, 
  IconDollarSign,
  IconTrendingUp,
  IconTrendingDown,
  IconPlus,
  IconActivity
} from '@/components/Icons';
import { 
  employees, 
  projects, 
  tasks, 
  revenueByMonth,
  projectStatusData,
  recentActivities,
  getMonthlyRevenue,
  getMonthlyExpenses
} from '@/lib/data';

export default function Dashboard() {
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const tasksDueToday = tasks.filter(t => {
    const today = new Date().toISOString().slice(0, 10);
    return t.dueDate === today;
  }).length;
  
  const monthlyRevenue = getMonthlyRevenue();
  const monthlyExpenses = getMonthlyExpenses();
  const netProfit = monthlyRevenue - monthlyExpenses;

  const maxRevenue = Math.max(...revenueByMonth.map(r => r.revenue));

  return (
    <>
      <Header title="Dashboard" />
      
      <div className="page-content">
        {/* Quick Actions */}
        <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm">
              <IconPlus style={{ width: '16px', height: '16px' }} />
              Add Employee
            </button>
            <button className="btn btn-secondary btn-sm">
              <IconPlus style={{ width: '16px', height: '16px' }} />
              Create Project
            </button>
            <button className="btn btn-secondary btn-sm">
              <IconPlus style={{ width: '16px', height: '16px' }} />
              New Task
            </button>
            <button className="btn btn-secondary btn-sm">
              <IconPlus style={{ width: '16px', height: '16px' }} />
              Add Client
            </button>
            <button className="btn btn-secondary btn-sm">
              <IconPlus style={{ width: '16px', height: '16px' }} />
              Record Transaction
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          {/* Employees */}
          <div className="stat-card animate-fade-in stagger-1">
            <div className="stat-icon emerald">
              <IconUsers style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total Employees</div>
              <div className="stat-value">{employees.length}</div>
              <div className="stat-trend positive">
                <IconTrendingUp style={{ width: '14px', height: '14px' }} />
                <span>+2 this month</span>
              </div>
            </div>
          </div>

          {/* Active Projects */}
          <div className="stat-card animate-fade-in stagger-2">
            <div className="stat-icon blue">
              <IconFolder style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Active Projects</div>
              <div className="stat-value">{activeProjects}</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <span className="badge badge-success">{projects.filter(p => p.status === 'completed').length} completed</span>
                <span className="badge badge-info">{projects.filter(p => p.status === 'planning').length} planning</span>
              </div>
            </div>
          </div>

          {/* Tasks Due Today */}
          <div className="stat-card animate-fade-in stagger-3">
            <div className="stat-icon amber">
              <IconCheckSquare style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Tasks Due Today</div>
              <div className="stat-value">{tasksDueToday}</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <span className="badge badge-danger">{tasks.filter(t => t.priority === 'urgent').length} urgent</span>
                <span className="badge badge-warning">{tasks.filter(t => t.priority === 'high').length} high</span>
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="stat-card animate-fade-in stagger-4">
            <div className="stat-icon purple">
              <IconDollarSign style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Monthly Revenue</div>
              <div className="stat-value">${monthlyRevenue.toLocaleString()}</div>
              <div className="stat-trend positive">
                <IconTrendingUp style={{ width: '14px', height: '14px' }} />
                <span>+12.5% from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Activity */}
        <div className="grid-2" style={{ marginBottom: '24px' }}>
          {/* Revenue Chart */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Revenue Trend</h3>
              <span className="badge badge-success">Last 6 months</span>
            </div>
            
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '0 8px' }}>
              {revenueByMonth.map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${(item.revenue / maxRevenue) * 160}px`,
                      background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                      borderRadius: '4px 4px 0 0',
                      minHeight: '20px',
                      transition: 'height 0.3s ease'
                    }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Status */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Project Status</h3>
              <span className="badge badge-info">{projects.length} total</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projectStatusData.map((item, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: item.color 
                      }} />
                      {item.status}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {item.count}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(item.count / projects.length) * 100}%`,
                        background: item.color
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Summary & Activity */}
        <div className="grid-2">
          {/* Financial Summary */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Financial Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--color-bg-tertiary)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Monthly Income</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-accent-primary)' }}>
                    ${monthlyRevenue.toLocaleString()}
                  </div>
                </div>
                <IconTrendingUp style={{ width: '24px', height: '24px', color: 'var(--color-accent-primary)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--color-bg-tertiary)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Monthly Expenses</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-accent-danger)' }}>
                    ${monthlyExpenses.toLocaleString()}
                  </div>
                </div>
                <IconTrendingDown style={{ width: '24px', height: '24px', color: 'var(--color-accent-danger)' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: netProfit >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: `1px solid ${netProfit >= 0 ? 'var(--color-accent-primary)' : 'var(--color-accent-danger)'}` }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Net Profit</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: netProfit >= 0 ? 'var(--color-accent-primary)' : 'var(--color-accent-danger)' }}>
                    ${netProfit.toLocaleString()}
                  </div>
                </div>
                {netProfit >= 0 ? (
                  <IconTrendingUp style={{ width: '24px', height: '24px', color: 'var(--color-accent-primary)' }} />
                ) : (
                  <IconTrendingDown style={{ width: '24px', height: '24px', color: 'var(--color-accent-danger)' }} />
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Activity</h3>
              <button className="btn btn-ghost btn-sm">View All</button>
            </div>
            
            <div className="activity-feed">
              {recentActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div 
                    className="activity-avatar"
                    style={{ 
                      background: activity.type === 'finance' ? 'var(--color-accent-purple)' :
                                 activity.type === 'project' ? 'var(--color-accent-secondary)' :
                                 activity.type === 'task' ? 'var(--color-accent-primary)' :
                                 'var(--color-accent-warning)'
                    }}
                  >
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">
                      <strong>{activity.user}</strong> {activity.action} <strong>{activity.target}</strong>
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
