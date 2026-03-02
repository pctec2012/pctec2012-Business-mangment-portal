'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { 
  IconPlus, 
  IconSearch, 
  IconTrendingUp,
  IconTrendingDown,
  IconDownload,
  IconFilter,
  IconEdit,
  IconTrash,
  IconDollarSign
} from '@/components/Icons';
import { transactions, projects, getProjectById, getMonthlyRevenue, getMonthlyExpenses } from '@/lib/data';

const categories = {
  income: ['Project Payment', 'Retainer', 'Consulting', 'Other'],
  expense: ['Salaries', 'Software', 'Office', 'Travel', 'Marketing', 'Other']
};

export default function FinancesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const monthlyRevenue = getMonthlyRevenue();
  const monthlyExpenses = getMonthlyExpenses();
  const netProfit = monthlyRevenue - monthlyExpenses;
  const totalRevenue = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || tx.type === typeFilter;
    const matchesCategory = !categoryFilter || tx.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <>
      <Header title="Finances" breadcrumbs={['Dashboard', 'Finances']} />
      
      <div className="page-content">
        {/* Actions Bar */}
        <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Search transactions..."
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
                style={{ width: '140px' }}
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCategoryFilter('');
                }}
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <select 
                className="select" 
                style={{ width: '160px' }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {(typeFilter ? categories[typeFilter as keyof typeof categories] : [...categories.income, ...categories.expense]).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-ghost">
                <IconDownload style={{ width: '18px', height: '18px' }} />
                Export
              </button>
              <button className="btn btn-primary">
                <IconPlus style={{ width: '18px', height: '18px' }} />
                Add Transaction
              </button>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid-4" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-icon emerald" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
              <IconTrendingUp style={{ width: '24px', height: '24px', color: 'var(--color-accent-primary)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Monthly Income</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-primary)' }}>
                ${monthlyRevenue.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
              <IconTrendingDown style={{ width: '24px', height: '24px', color: 'var(--color-accent-danger)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Monthly Expenses</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-danger)' }}>
                ${monthlyExpenses.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: netProfit >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' }}>
              <IconDollarSign style={{ width: '24px', height: '24px', color: netProfit >= 0 ? 'var(--color-accent-primary)' : 'var(--color-accent-danger)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Net Profit</div>
              <div className="stat-value" style={{ color: netProfit >= 0 ? 'var(--color-accent-primary)' : 'var(--color-accent-danger)' }}>
                ${netProfit.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
              <IconDollarSign style={{ width: '24px', height: '24px', color: 'var(--color-accent-secondary)' }} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Outstanding</div>
              <div className="stat-value" style={{ color: 'var(--color-accent-secondary)' }}>
                $12,500
              </div>
            </div>
          </div>
        </div>

        {/* Year to Date Summary */}
        <div className="grid-2" style={{ marginBottom: '24px' }}>
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Year to Date</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--color-bg-tertiary)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Total Income</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-accent-primary)' }}>
                    ${totalRevenue.toLocaleString()}
                  </div>
                </div>
                <IconTrendingUp style={{ width: '32px', height: '32px', color: 'var(--color-accent-primary)', opacity: 0.5 }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--color-bg-tertiary)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Total Expenses</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-accent-danger)' }}>
                    ${totalExpenses.toLocaleString()}
                  </div>
                </div>
                <IconTrendingDown style={{ width: '32px', height: '32px', color: 'var(--color-accent-danger)', opacity: 0.5 }} />
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '16px', 
                background: (totalRevenue - totalExpenses) >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                border: `1px solid ${(totalRevenue - totalExpenses) >= 0 ? 'var(--color-accent-primary)' : 'var(--color-accent-danger)'}`
              }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Net Profit</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: (totalRevenue - totalExpenses) >= 0 ? 'var(--color-accent-primary)' : 'var(--color-accent-danger)' }}>
                    ${(totalRevenue - totalExpenses).toLocaleString()}
                  </div>
                </div>
                {(totalRevenue - totalExpenses) >= 0 ? (
                  <IconTrendingUp style={{ width: '32px', height: '32px', color: 'var(--color-accent-primary)' }} />
                ) : (
                  <IconTrendingDown style={{ width: '32px', height: '32px', color: 'var(--color-accent-danger)' }} />
                )}
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="card">
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Expense Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { category: 'Salaries', amount: 26500, color: '#10B981' },
                { category: 'Software', amount: 2500, color: '#3B82F6' },
                { category: 'Office', amount: 8380, color: '#8B5CF6' },
                { category: 'Marketing', amount: 7700, color: '#F59E0B' },
                { category: 'Travel', amount: 1200, color: '#EF4444' }
              ].map((item, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
                      {item.category}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      style={{ 
                        width: `${(item.amount / totalExpenses) * 100}%`,
                        background: item.color,
                        height: '100%',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Transactions</h3>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{filteredTransactions.length} transactions</span>
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Project</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => {
                  const project = tx.project ? getProjectById(tx.project) : null;
                  return (
                    <tr key={tx.id}>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                          {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 500 }}>{tx.description}</span>
                      </td>
                      <td>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{tx.category}</span>
                      </td>
                      <td>
                        {project ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.color }} />
                            {project.name}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${tx.type === 'income' ? 'badge-success' : 'badge-danger'}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td>
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontWeight: 600,
                            color: tx.type === 'income' ? 'var(--color-accent-primary)' : 'var(--color-accent-danger)'
                          }}
                        >
                          {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
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
      </div>
    </>
  );
}
