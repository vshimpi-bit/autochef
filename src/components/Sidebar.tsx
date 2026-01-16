"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import {
    LayoutDashboard,
    Bot,
    CalendarDays,
    Box,
    ShoppingCart,
    Users,
    MessageSquare,
    BarChart3,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/' },
        { name: 'AI Agents', icon: Bot, path: '/ai-agents' },
        { name: 'Reservations', icon: CalendarDays, path: '/reservations' },
        { name: 'Inventory', icon: Box, path: '/inventory' },
        { name: 'Orders', icon: ShoppingCart, path: '/orders' },
        { name: 'Staff', icon: Users, path: '/staff' },
        { name: 'Feedback', icon: MessageSquare, path: '/feedback' },
        { name: 'Analytics', icon: BarChart3, path: '/analytics' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}>A</div>
                <div className={styles.logoText}>
                    <span className={styles.brandName}>AUTO-CHEF</span>
                    <span className={styles.brandSub}>AUTONOMOUS AI</span>
                </div>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            className={`${styles.navItem} ${isActive(item.path) ? styles.navItemActive : ''}`}
                        >
                            <item.icon size={20} className={styles.icon} />
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
