'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { 
  IconPlus, 
  IconSearch, 
  IconGrid,
  IconList,
  IconEdit,
  IconTrash,
  IconCalendar,
  IconDollarSign,
  IconUsers
} from '@/components/Icons';
import { projects, getEmployeeById } from '@/lib/data';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="badge badge-success">Completed</span>;
      case 'in-progress':
        return <span className="badge badge-info">In Progress</span>;
      case 'planning':
        return <span className="badge badge-purple">Planning</span>;
      case 'on-hold':
        return <span className="badge badge-warning">On Hold</span>;
      case 'review':
        return <span className="badge badge-info">In Review</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <>
      <Header title="Projects" breadcrumbs={['Dashboard', 'Projects']} />
      
      <div className="page-content">
        {/* Actions Bar */}
        <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
                <IconSearch 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: 'var(--color-text-muted)'
                  }} 
                />
              </div>

              <select 
                className="select" 
                style={{ width: '160px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: 'var(--color-bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
                <button
                  className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('grid')}
                  style={{ padding: '6px 12px' }}
                >
                  <IconGrid style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('list')}
                  style={{ padding: '6px 12px' }}
                >
                  <IconList style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
              <button className="btn btn-primary">
                <IconPlus style={{ width: '18px', height: '18px' }} />
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Total Projects</div>
              <div className="stat-value">{projects.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">In Progress</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-secondary)' }}>
                {projects.filter(p => p.status === 'in-progress').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Completed</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-primary)' }}>
                {projects.filter(p => p.status === 'completed').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Total Budget</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>
                ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid-3">
            {filteredProjects.map((project) => (
              <div key={project.id} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div 
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px',
                      background: `${project.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: project.color }} />
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{project.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>{project.client}</p>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Progress</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill emerald"
                      style={{ width: `${project.progress}%`, background: project.color }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconCalendar style={{ width: '14px', height: '14px' }} />
                    {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconDollarSign style={{ width: '14px', height: '14px' }} />
                    ${project.budget.toLocaleString()}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconUsers style={{ width: '14px', height: '14px' }} />
                    {project.team.length}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                  <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
                    <IconEdit style={{ width: '14px', height: '14px' }} />
                    Edit
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-accent-danger)' }}>
                    <IconTrash style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Deadline</th>
                    <th>Budget</th>
                    <th>Team</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{ 
                              width: '36px', 
                              height: '36px', 
                              borderRadius: '8px',
                              background: `${project.color}20`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: project.color }} />
                          </div>
                          <span style={{ fontWeight: 600 }}>{project.name}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{project.client}</span>
                      </td>
                      <td>{getStatusBadge(project.status)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
                          <div className="progress-bar" style={{ flex: 1 }}>
                            <div 
                              className="progress-fill emerald"
                              style={{ width: `${project.progress}%`, background: project.color }}
                            />
                          </div>
                          <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>{project.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                          {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)' }}>${project.budget.toLocaleString()}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex' }}>
                          {project.team.slice(0, 3).map((memberId, i) => {
                            const member = getEmployeeById(memberId);
                            return member ? (
                              <div 
                                key={member.id} 
                                className="avatar avatar-sm" 
                                style={{ 
                                  marginLeft: i > 0 ? '-8px' : 0, 
                                  border: '2px solid var(--color-bg-secondary)',
                                  background: 'linear-gradient(135deg, #10B981, #059669)'
                                }}
                                title={member.name}
                              >
                                {member.avatar}
                              </div>
                            ) : null;
                          })}
                          {project.team.length > 3 && (
                            <div 
                              className="avatar avatar-sm" 
                              style={{ 
                                marginLeft: '-8px', 
                                border: '2px solid var(--color-bg-secondary)',
                                background: 'var(--color-bg-elevated)',
                                fontSize: '10px'
                              }}
                            >
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-ghost btn-sm">
                            <IconEdit style={{ width: '14px', height: '14px' }} />
                          </button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-accent-danger)' }}>
                            <IconTrash style={{ width: '14px', height: '14px' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
