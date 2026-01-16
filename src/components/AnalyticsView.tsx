"use client";
import React from 'react';
import styles from './AnalyticsView.module.css';
import { TrendingUp, Users } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';

const data = [
    { name: 'Mon', revenue: 2500 },
    { name: 'Tue', revenue: 1500 },
    { name: 'Wed', revenue: 9500 },
    { name: 'Thu', revenue: 4000 },
    { name: 'Fri', revenue: 4500 },
    { name: 'Sat', revenue: 3800 },
    { name: 'Sun', revenue: 4200 },
];

const AnalyticsView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Analytics Suite</h1>
                <p>Predictive revenue and operational data modeling.</p>
            </div>

            <div className={styles.analyticsGrid}>
                <div className={styles.chartCard}>
                    <div className={styles.chartTitle}>Weekly Revenue Forecast</div>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="var(--text-muted)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="var(--text-muted)"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="var(--primary)"
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                    strokeWidth={2}
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>
                        <TrendingUp size={24} />
                    </div>
                    <div className={styles.metricValue}>$24.5k</div>
                    <div className={styles.metricLabel}>MTD Revenue Projection</div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>
                        <Users size={24} />
                    </div>
                    <div className={styles.metricValue}>1.2k</div>
                    <div className={styles.metricLabel}>Unique Monthly Guests</div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
