"use client";
import React from 'react';
import styles from './Header.module.css';
import { MapPin, Bell, Moon } from 'lucide-react';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <div className={styles.systemInfo}>
                    <div className={styles.systemIcon}>N</div>
                    <div className={styles.systemText}>
                        <span className={styles.systemName}>NEXUS</span>
                        <span className={styles.systemSub}>RESTAURANT OS</span>
                    </div>
                </div>

                <div className={styles.locationBadge}>
                    <MapPin size={16} />
                    <span>Downtown Bistro, NYC</span>
                </div>

                <div className={styles.statusBadge}>
                    <div className={styles.statusDot} />
                    <span>AI ACTIVE</span>
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.weatherWidget}>
                    <span>🌤️ 72°F Partly Cloudy</span>
                    <span className={styles.weatherAlert}>• High Demand Predicted</span>
                </div>

                <button className={styles.iconButton}>
                    <Bell size={20} />
                </button>

                <div className={styles.userAvatar}>
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="User"
                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
