"use client";
import React from 'react';
import styles from './OverviewView.module.css';
import { TrendingUp, Users, Utensils, Clock, CalendarCheck, ShieldCheck, BadgePercent, LucideIcon } from 'lucide-react';

import Sparkline from '@/components/Sparkline';

interface MetricItem {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
    footer: string;
    bars: number[];
    icon?: LucideIcon;
}

const OverviewView = () => {
    const metrics: MetricItem[] = [
        {
            label: "Today's Revenue",
            value: "$4,289",
            change: "+12.5%",
            isPositive: true,
            footer: "AI predicts +12% dinner rush based on weather.",
            bars: [30, 45, 35, 60, 50, 70, 80, 65, 90, 100]
        },
        {
            label: "Table Occupancy",
            value: "82%",
            change: "+5.2%",
            isPositive: true,
            footer: "Optimum flow. 3 tables turning over in 10 mins.",
            bars: [40, 50, 45, 60, 75, 80, 82, 80, 78, 82]
        },
        {
            label: "Food Waste Saved",
            value: "14.2 kg",
            change: "-2.1kg",
            isPositive: true, // Good that it's down (saved)
            footer: "Reduced prep of pasta dishes saved 2.5kg.",
            bars: [80, 70, 65, 50, 45, 30, 25, 20, 15, 10]
        },
        {
            label: "Labor Cost",
            value: "22%",
            change: "-1.5%",
            isPositive: true,
            footer: "Staff schedule optimized for 7-10 PM rush.",
            bars: [25, 24, 23, 23, 22, 22, 21, 22, 22, 22]
        }
    ];

    const agents = [
        {
            name: "Booking Agent",
            icon: CalendarCheck,
            desc: "Handling 3 simultaneous booking requests via WhatsApp and Web.",
            conf: "98%"
        },
        {
            name: "No-Show Prevention",
            icon: ShieldCheck,
            desc: "Flagged 2 high-risk reservations for deposit requirement.",
            conf: "85%"
        },
        {
            name: "Retention Agent",
            icon: BadgePercent,
            desc: "Sent targeted offers to 15 lapse-risk customers.",
            conf: "94%"
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>System Overview</h1>
                <p>Autonomous monitoring of all restaurant subsystems.</p>
            </div>

            <div>
                <div className={styles.sectionTitle}>Real-time Performance</div>
                <div className={styles.metricsGrid}>
                    {metrics.map((m, i) => (
                        <div key={i} className={styles.metricCard}>
                            <div>
                                <div className={styles.metricHeader}>
                                    <span className={styles.metricTitle}>{m.label}</span>
                                    <span className={`${styles.metricChange} ${m.isPositive ? styles.positive : ''}`}>
                                        {m.change}
                                    </span>
                                </div>
                                <div className={styles.metricValue}>{m.value}</div>
                                <div className={styles.metricChart}>
                                    <Sparkline
                                        data={m.bars}
                                        color={m.isPositive ? "#10b981" : "#ef4444"}
                                        height={50}
                                    />
                                </div>
                            </div>
                            <div className={styles.metricFooter}>
                                {m.icon && <m.icon size={12} style={{ marginRight: 4 }} />}
                                {m.footer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className={styles.sectionTitle}>Active Agents</div>
                <div className={styles.agentsGrid}>
                    {agents.map((agent, i) => (
                        <div key={i} className={styles.agentCardSmall}>
                            <div className={styles.agentHeaderSmall}>
                                <div className={styles.agentInfo}>
                                    <div className={styles.agentIconBox}>
                                        <agent.icon size={20} />
                                    </div>
                                    <span className={styles.agentNameSmall}>{agent.name}</span>
                                </div>
                                <div className={styles.toggle}>
                                    <div className={styles.toggleDot} />
                                </div>
                            </div>

                            <p className={styles.agentDescSmall}>
                                • {agent.desc}
                            </p>

                            <div className={styles.confidenceBar}>
                                <span>CONFIDENCE</span>
                                <span className={styles.confidenceValue}>{agent.conf}</span>
                            </div>
                            <div className={styles.loadingLine}>
                                <div className={styles.loadingDash} style={{ width: agent.conf }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default OverviewView;
