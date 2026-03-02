'use client';

import { useState } from 'react';
import { IconSearch, IconBell, IconPlus } from './Icons';

interface HeaderProps {
  title: string;
  breadcrumbs?: string[];
}

export default function Header({ title, breadcrumbs = [] }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="header">
      <div className="header-left">
        {breadcrumbs.length > 0 && (
          <div className="breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                <span className={index === breadcrumbs.length - 1 ? 'breadcrumb-item active' : 'breadcrumb-item'}>
                  {crumb}
                </span>
                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator"> / </span>
                )}
              </span>
            ))}
          </div>
        )}
        {breadcrumbs.length === 0 && (
          <h1 className="page-title" style={{ margin: 0, fontSize: '20px' }}>{title}</h1>
        )}
      </div>

      <div className="header-right">
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '240px', 
              paddingLeft: '40px',
              background: 'var(--color-bg-tertiary)'
            }}
          />
          <IconSearch 
            className="" 
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

        <button className="header-btn" style={{ position: 'relative' }}>
          <IconBell style={{ width: '20px', height: '20px' }} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            background: 'var(--color-accent-danger)',
            borderRadius: '50%'
          }} />
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          padding: '6px 12px',
          background: 'var(--color-bg-tertiary)',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          <div className="avatar avatar-sm" style={{ background: 'var(--color-accent-primary)' }}>AJ</div>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Alice</span>
        </div>
      </div>
    </header>
  );
}
