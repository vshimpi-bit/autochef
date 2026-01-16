"use client";
import React from 'react';
import styles from './ReservationsView.module.css';
import { Clock, Info, Zap } from 'lucide-react';

const tables = [
    { id: 'T1', cap: 2, time: '18:30 - 20:00', risk: 'Low' },
    { id: 'T2', cap: 4, time: '19:00 - 21:00', risk: 'Medium' },
    { id: 'T3', cap: 2, time: null, risk: null },
    { id: 'T4', cap: 6, time: '19:30 - 21:30', risk: 'High' },
    { id: 'T5', cap: 4, time: '18:00 - 19:30', risk: 'Low' },
    { id: 'T6', cap: 2, time: null, risk: null },
];

const ReservationsView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1>Reservation Engine</h1>
                    <p>Autonomous flow optimization and no-show prediction.</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnTimeline}>Timeline View</button>
                    <button className={styles.btnBooking}>New Booking</button>
                </div>
            </div>

            <div className={styles.mainLayout}>
                <div className={styles.tableMapSection}>
                    <div className={styles.sectionTitle}>Live Table Map</div>
                    <div className={styles.tableGrid}>
                        {tables.map((t) => (
                            <div key={t.id} className={styles.tableCard}>
                                <div className={styles.tableHeader}>
                                    <span className={styles.tableName}>{t.id}</span>
                                    <span className={styles.capacity}>CAP: {t.cap}</span>
                                </div>
                                {t.time ? (
                                    <div className={styles.bookingInfo}>
                                        <div className={styles.timeInfo}>
                                            <Clock size={12} />
                                            <span>{t.time}</span>
                                        </div>
                                        <div className={`${styles.riskInfo} ${styles['risk' + t.risk]}`}>
                                            <Info size={12} />
                                            <span>No-show Risk: {t.risk}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.emptyTable}>
                                        <span>-</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sidebarArea}>
                    <div className={styles.insightsCard}>
                        <div className={styles.insightHeader}>
                            <Zap size={18} />
                            <span>Flow Insights</span>
                        </div>
                        <p className={styles.insightText}>
                            "Move Walk-in to Table 6 for better flow. This frees up Table 4 for the upcoming Party of 6 with 92% arrival probability."
                        </p>
                        <button className={styles.btnReassign}>Auto-Reassign</button>

                        <div style={{ marginTop: '12px' }}>
                            <div className={styles.sectionTitle} style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '12px' }}>
                                EFFICIENCY METRICS
                            </div>
                            <div className={styles.metricsList}>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Turnover Rate</span>
                                    <span className={styles.metricVal}>+14%</span>
                                </div>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Wait Time Est.</span>
                                    <span className={styles.metricVal}>8 mins</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationsView;
