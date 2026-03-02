'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  IconDashboard,
  IconUsers,
  IconFolder,
  IconCheckSquare,
  IconUserCheck,
  IconDollarSign,
  IconChevronLeft,
  IconChevronRight,
} from './Icons';

const navItems = [
  { href: '/', label: 'Dashboard', icon: IconDashboard },
  { href: '/employees', label: 'Employees', icon: IconUsers },
  { href: '/projects', label: 'Projects', icon: IconFolder },
  { href: '/tasks', label: 'Tasks', icon: IconCheckSquare },
  { href: '/clients', label: 'Clients', icon: IconUserCheck },
  { href: '/finances', label: 'Finances', icon: IconDollarSign },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">B</div>
          <span className="sidebar-title">BizHub</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '12px' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            {collapsed ? (
              <IconChevronRight className="nav-icon" />
            ) : (
              <>
                <IconChevronLeft className="nav-icon" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
