'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { 
  IconPlus, 
  IconSearch, 
  IconEdit,
  IconTrash,
  IconMail,
  IconPhone,
  IconGlobe,
  IconMapPin
} from '@/components/Icons';
import { clients } from '@/lib/data';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const industries = [...new Set(clients.map(c => c.industry))];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = !industryFilter || client.industry === industryFilter;
    const matchesStatus = !statusFilter || client.status === statusFilter;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  return (
    <>
      <Header title="Clients" breadcrumbs={['Dashboard', 'Clients']} />
      
      <div className="page-content">
        {/* Actions Bar */}
        <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search clients..."
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
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
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
              </select>
            </div>

            <button className="btn btn-primary">
              <IconPlus style={{ width: '18px', height: '18px' }} />
              Add Client
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Total Clients</div>
              <div className="stat-value">{clients.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Active Clients</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-primary)' }}>
                {clients.filter(c => c.status === 'active').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Total Revenue</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>
                ${clients.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-label">Active Projects</div>
              <div className="stat-value">
                {clients.reduce((sum, c) => sum + c.projects, 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid-3">
          {filteredClients.map((client) => (
            <div key={client.id} className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'white'
                    }}
                  >
                    {client.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{client.company}</h3>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{client.industry}</span>
                  </div>
                </div>
                <span className={`badge ${client.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                  {client.status}
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{client.contactPerson}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Primary Contact</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconMail style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)' }} />
                  {client.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconPhone style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)' }} />
                  {client.phone}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconGlobe style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)' }} />
                  {client.website}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-accent-primary)' }}>
                    {client.projects}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Projects</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', borderLeft: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-accent-secondary)' }}>
                    ${client.revenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Revenue</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
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
      </div>
    </>
  );
}
