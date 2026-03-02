'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { 
  IconPlus, 
  IconSearch, 
  IconEdit,
  IconTrash,
  IconCalendar,
  IconUsers
} from '@/components/Icons';
import { tasks, projects, getEmployeeById, Task } from '@/lib/data';

const columns = [
  { id: 'todo', title: 'To Do', color: '#71717A' },
  { id: 'in-progress', title: 'In Progress', color: '#3B82F6' },
  { id: 'review', title: 'Review', color: '#F59E0B' },
  { id: 'done', title: 'Done', color: '#10B981' },
];

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [projectFilter, setProjectFilter] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = !projectFilter || task.project === projectFilter;
    return matchesSearch && matchesProject;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <span className="badge badge-danger">Urgent</span>;
      case 'high':
        return <span className="badge badge-warning">High</span>;
      case 'medium':
        return <span className="badge badge-info">Medium</span>;
      case 'low':
        return <span className="badge badge-neutral">Low</span>;
      default:
        return <span className="badge badge-neutral">{priority}</span>;
    }
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown';
  };

  return (
    <>
      <Header title="Tasks" breadcrumbs={['Dashboard', 'Tasks']} />
      
      <div className="page-content">
        {/* Actions Bar */}
        <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search tasks..."
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
                style={{ width: '200px' }}
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              >
                <option value="">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: 'var(--color-bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
                <button
                  className={`btn btn-sm ${viewMode === 'kanban' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('kanban')}
                  style={{ padding: '6px 12px' }}
                >
                  Board
                </button>
                <button
                  className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('list')}
                  style={{ padding: '6px 12px' }}
                >
                  List
                </button>
              </div>
              <button className="btn btn-primary">
                <IconPlus style={{ width: '18px', height: '18px' }} />
                New Task
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Total Tasks</div>
              <div className="stat-value">{tasks.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">In Progress</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-secondary)' }}>
                {tasks.filter(t => t.status === 'in-progress').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">In Review</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-warning)' }}>
                {tasks.filter(t => t.status === 'review').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Completed</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-primary)' }}>
                {tasks.filter(t => t.status === 'done').length}
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        {viewMode === 'kanban' && (
          <div className="kanban-board">
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.id);
              return (
                <div key={column.id} className="kanban-column">
                  <div className="kanban-header">
                    <div className="kanban-title">
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: column.color }} />
                      {column.title}
                    </div>
                    <span className="kanban-count">{columnTasks.length}</span>
                  </div>
                  
                  <div className="kanban-content">
                    {columnTasks.map((task) => {
                      const assignee = getEmployeeById(task.assignee);
                      const project = projects.find(p => p.id === task.project);
                      return (
                        <div key={task.id} className="kanban-card">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            {getPriorityBadge(task.priority)}
                          </div>
                          
                          <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.4 }}>
                            {task.title}
                          </h4>
                          
                          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
                            {task.description.slice(0, 60)}...
                          </p>
                          
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {project && (
                                <span 
                                  style={{ 
                                    fontSize: '11px', 
                                    padding: '2px 8px', 
                                    borderRadius: '4px',
                                    background: `${project.color}20`,
                                    color: project.color
                                  }}
                                >
                                  {project.name.slice(0, 12)}
                                </span>
                              )}
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {assignee && (
                                <div 
                                  className="avatar avatar-sm" 
                                  style={{ 
                                    width: '24px', 
                                    height: '24px', 
                                    fontSize: '10px',
                                    background: 'linear-gradient(135deg, #10B981, #059669)'
                                  }}
                                  title={assignee.name}
                                >
                                  {assignee.avatar}
                                </div>
                              )}
                              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <IconCalendar style={{ width: '12px', height: '12px' }} />
                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    <button 
                      className="btn btn-ghost" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: '8px', border: '2px dashed var(--color-border)', background: 'transparent' }}
                    >
                      <IconPlus style={{ width: '16px', height: '16px' }} />
                      Add Task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Project</th>
                    <th>Assignee</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => {
                    const assignee = getEmployeeById(task.assignee);
                    const project = projects.find(p => p.id === task.project);
                    return (
                      <tr key={task.id}>
                        <td>
                          <div>
                            <div style={{ fontWeight: 600 }}>{task.title}</div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                              {task.description.slice(0, 50)}...
                            </div>
                          </div>
                        </td>
                        <td>
                          {project && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.color }} />
                              {project.name}
                            </span>
                          )}
                        </td>
                        <td>
                          {assignee && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div 
                                className="avatar avatar-sm"
                                style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                              >
                                {assignee.avatar}
                              </div>
                              {assignee.name}
                            </div>
                          )}
                        </td>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </td>
                        <td>{getPriorityBadge(task.priority)}</td>
                        <td>
                          <span className={`badge ${
                            task.status === 'done' ? 'badge-success' : 
                            task.status === 'in-progress' ? 'badge-info' :
                            task.status === 'review' ? 'badge-warning' :
                            'badge-neutral'
                          }`}>
                            {task.status.replace('-', ' ')}
                          </span>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
