"use client";
import React from 'react';
import styles from './AiAgentsView.module.css';
import { CalendarCheck, ShieldCheck, Clock, BadgePercent, Activity, Sparkles } from 'lucide-react';

const AiAgentsView = () => {
    const agents = [
        {
            id: 1,
            name: 'Booking Agent',
            role: 'Reservation Management',
            desc: 'Autonomous handling of inbound booking requests across all digital channels.',
            status: 'Active',
            load: 34,
            uptime: '14d 6h',
            icon: CalendarCheck,
            color: 'primary'
        },
        {
            id: 2,
            name: 'No-Show Prevention',
            role: 'Risk Mitigation',
            desc: 'Predictive confirmation messaging and deposit processing for high-risk bookings.',
            status: 'Active',
            load: 12,
            uptime: '4d 12h',
            icon: ShieldCheck,
            color: 'primary'
        },
        {
            id: 3,
            name: 'Table Release',
            role: 'Capacity Optimization',
            desc: 'Real-time monitoring of table turnover to instantly release inventory to waiting lists.',
            status: 'Active',
            load: 68,
            uptime: '8d 2h',
            icon: Clock,
            color: 'primary'
        },
        {
            id: 4,
            name: 'Retention / Commission',
            role: 'Profit Maximization',
            desc: 'Converting OTA guests to direct bookers and re-engaging past customers.',
            status: 'Active',
            load: 22,
            uptime: '12d 1h',
            icon: BadgePercent,
            color: 'primary'
        }
    ];

    const logs = [
        { text: 'Stock auto-ordered: Cheese (5kg)', time: '2 mins ago', type: 'success' },
        { text: 'Table reassigned: Party of 4', time: '8 mins ago', type: 'success' },
        { text: 'Complaint resolved in 32 seconds', time: '15 mins ago', type: 'success' },
        { text: 'Staff shift updated: Sarah added', time: '24 mins ago', type: 'success' },
        { text: 'Low stock alert: Red Wine', time: '45 mins ago', type: 'danger' },
    ];

    return (
        <div className={styles.container}>
            {/* Main Grid Area */}
            <div className={styles.mainArea}>
                <div className={styles.pageHeader}>
                    <div className={styles.title}>
                        <h1>AI Control Center</h1>
                        <p>Detailed health and performance metrics for all autonomous agents.</p>
                    </div>
                    <div className={styles.systemNominal}>
                        <Activity size={16} />
                        SYSTEM NOMINAL
                    </div>
                </div>

                <div className={styles.sectionTitle} style={{ marginBottom: '16px' }}>Table Management Agents</div>
                <div className={styles.grid} style={{ marginBottom: '40px' }}>
                    {agents.slice(0, 3).map((agent) => (
                        <div key={agent.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    <div className={styles.cardIcon}>
                                        <agent.icon size={24} />
                                    </div>
                                    <div className={styles.cardName}>
                                        <h3>{agent.name}</h3>
                                        <span>{agent.role}</span>
                                    </div>
                                </div>
                                <div className={styles.badge}>{agent.status}</div>
                            </div>

                            <div className={styles.description}>
                                {agent.desc}
                            </div>

                            <div className={styles.metrics}>
                                <div className={styles.metricLabels}>
                                    <span>Current Load</span>
                                    <span>Uptime {agent.uptime}</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${agent.load}%` }}
                                    />
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.btn}>Edit Logic</button>
                                <button className={styles.btn}>Reboot Agent</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.sectionTitle} style={{ marginBottom: '16px' }}>Profit Maximization Agent</div>
                <div className={styles.grid}>
                    {agents.slice(3).map((agent) => (
                        <div key={agent.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    <div className={styles.cardIcon}>
                                        <agent.icon size={24} />
                                    </div>
                                    <div className={styles.cardName}>
                                        <h3>{agent.name}</h3>
                                        <span>{agent.role}</span>
                                    </div>
                                </div>
                                <div className={styles.badge}>{agent.status}</div>
                            </div>

                            <div className={styles.description}>
                                {agent.desc}
                            </div>

                            <div className={styles.metrics}>
                                <div className={styles.metricLabels}>
                                    <span>Current Load</span>
                                    <span>Uptime {agent.uptime}</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${agent.load}%` }}
                                    />
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.btn}>Edit Logic</button>
                                <button className={styles.btn}>Reboot Agent</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AiAgentsView;
