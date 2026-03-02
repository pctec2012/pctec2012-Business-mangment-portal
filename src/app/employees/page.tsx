'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { 
  IconPlus, 
  IconSearch, 
  IconFilter, 
  IconDownload,
  IconEdit,
  IconTrash,
  IconMail,
  IconPhone,
  IconCalendar
} from '@/components/Icons';
import { employees, departments, roles } from '@/lib/data';

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !departmentFilter || emp.department === departmentFilter;
    const matchesStatus = !statusFilter || emp.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Active</span>;
      case 'inactive':
        return <span className="badge badge-danger">Inactive</span>;
      case 'on-leave':
        return <span className="badge badge-warning">On Leave</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <>
      <Header title="Employees" breadcrumbs={['Dashboard', 'Employees']} />
      
      <div className="page-content">
        {/* Actions Bar */}
        <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search employees..."
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
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select 
                className="select" 
                style={{ width: '140px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-ghost">
                <IconDownload style={{ width: '18px', height: '18px' }} />
                Export
              </button>
              <button className="btn btn-primary">
                <IconPlus style={{ width: '18px', height: '18px' }} />
                Add Employee
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Total Employees</div>
              <div className="stat-value">{employees.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Active</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-primary)' }}>
                {employees.filter(e => e.status === 'active').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">On Leave</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-warning)' }}>
                {employees.filter(e => e.status === 'on-leave').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Departments</div>
              <div className="stat-value">{departments.length}</div>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="avatar" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                          {employee.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{employee.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{employee.department}</span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{employee.role}</span>
                    </td>
                    <td>{getStatusBadge(employee.status)}</td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        {new Date(employee.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-ghost btn-sm" title="Edit">
                          <IconEdit style={{ width: '16px', height: '16px' }} />
                        </button>
                        <button className="btn btn-ghost btn-sm" title="Delete" style={{ color: 'var(--color-accent-danger)' }}>
                          <IconTrash style={{ width: '16px', height: '16px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
