"use client";
import React from 'react';
import styles from './StaffView.module.css';

const staffMembers = [
    { name: 'Sarah Jenkins', role: 'Server + Patio', efficiency: '98%', status: 'ON-SHIFT' },
    { name: 'Marcus Chen', role: 'Chef + Kitchen', efficiency: '94%', status: 'ON-SHIFT' },
    { name: 'Elena Rodriguez', role: 'Server + Dining Room', efficiency: '96%', status: 'BREAK' },
];

const StaffView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1>Staff Management</h1>
                    <p>AI-optimized scheduling and performance tracking.</p>
                </div>
                <button className={styles.optimizeBtn}>Optimize Schedule</button>
            </div>

            <div className={styles.staffGrid}>
                {staffMembers.map((staff, i) => (
                    <div key={i} className={styles.staffCard}>
                        <div className={styles.staffHeader}>
                            <div className={styles.avatar}>{staff.name[0]}</div>
                            <div>
                                <div className={styles.staffName}>{staff.name}</div>
                                <div className={styles.staffRole}>{staff.role}</div>
                            </div>
                        </div>

                        <div className={styles.metrics}>
                            <span className={styles.metricLabel}>Efficiency</span>
                            <span className={styles.metricValue}>{staff.efficiency}</span>
                        </div>

                        <div className={styles.statusSection}>
                            <div className={`${styles.statusBadge} ${styles['status' + staff.status]}`}>
                                {staff.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffView;
