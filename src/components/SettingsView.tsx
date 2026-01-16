"use client";
import React, { useState } from 'react';
import styles from './SettingsView.module.css';
import { Bot, Bell, MapPin, Moon } from 'lucide-react';

const SettingsView = () => {
    const [toggles, setToggles] = useState({
        bookingAuto: true,
        riskMitigation: true,
        laborAuto: false,
        darkTheme: true,
        notifications: true,
        sound: true
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const Toggle = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
        <div
            className={`${styles.toggle} ${active ? styles.toggleActive : ''}`}
            onClick={onToggle}
        >
            <div className={styles.toggleDot} />
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>System Settings</h1>
                <p>Configure your restaurant's AI parameters and preferences.</p>
            </div>

            <div className={styles.settingsGrid}>
                {/* Section: Profile */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <MapPin size={20} />
                        <h2>Restaurant Profile</h2>
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>Restaurant Name</span>
                            <span className={styles.settingDesc}>Public name shown on your digital channels.</span>
                        </div>
                        <input className={styles.inputField} defaultValue="Downtown Bistro, NYC" />
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>Capacity Limit</span>
                            <span className={styles.settingDesc}>Maximum simultaneous guests allowed.</span>
                        </div>
                        <input className={styles.inputField} type="number" defaultValue="42" />
                    </div>
                </div>

                {/* Section: AI Configuration */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Bot size={20} />
                        <h2>AI Intelligence</h2>
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>Autonomous Booking</span>
                            <span className={styles.settingDesc}>Allow AI to confirm standard reservations.</span>
                        </div>
                        <Toggle
                            active={toggles.bookingAuto}
                            onToggle={() => handleToggle('bookingAuto')}
                        />
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>Risk Mitigation</span>
                            <span className={styles.settingDesc}>Identify high-risk bookings for deposit.</span>
                        </div>
                        <Toggle
                            active={toggles.riskMitigation}
                            onToggle={() => handleToggle('riskMitigation')}
                        />
                    </div>
                </div>

                {/* Section: App Preferences */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Moon size={20} />
                        <h2>Appearance & Themes</h2>
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>Dark Mode</span>
                            <span className={styles.settingDesc}>Use the dark slate theme across the dashboard.</span>
                        </div>
                        <Toggle
                            active={toggles.darkTheme}
                            onToggle={() => handleToggle('darkTheme')}
                        />
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>Glassmorphism Effects</span>
                            <span className={styles.settingDesc}>Enable blur and transparency on panels.</span>
                        </div>
                        <Toggle active={true} onToggle={() => { }} />
                    </div>
                </div>

                {/* Section: Notifications */}
                <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Bell size={20} />
                        <h2>Alerts & Notifications</h2>
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>Desktop Notifications</span>
                            <span className={styles.settingDesc}>Alerts for critical stock or staffing issues.</span>
                        </div>
                        <Toggle
                            active={toggles.notifications}
                            onToggle={() => handleToggle('notifications')}
                        />
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingLabel}>
                            <span className={styles.settingTitle}>System Sounds</span>
                            <span className={styles.settingDesc}>Audio cues for new orders and completions.</span>
                        </div>
                        <Toggle
                            active={toggles.sound}
                            onToggle={() => handleToggle('sound')}
                        />
                    </div>
                </div>
            </div>

            <button className={styles.saveBtn}>Save All Changes</button>
        </div>
    );
};

export default SettingsView;
