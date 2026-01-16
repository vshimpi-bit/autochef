"use client";
import React from 'react';
import styles from './FeedbackView.module.css';
import { Star, MessageSquare, Gift, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const sentimentData = [
    { name: 'Positive', value: 65, color: 'var(--primary)' },
    { name: 'Neutral', value: 25, color: 'var(--secondary)' },
    { name: 'Negative', value: 10, color: 'var(--danger)' },
];

const feedbacks = [
    {
        id: 1,
        user: 'Alex M.',
        rating: 5,
        comment: '"The AI recommendation for the pasta was spot on. Amazing service!"',
        sentiment: 'POSITIVE'
    },
    {
        id: 2,
        user: 'Sarah L.',
        rating: 2,
        comment: '"Wait time was longer than expected for a \'smart\' restaurant."',
        sentiment: 'NEGATIVE'
    },
    {
        id: 3,
        user: 'John D.',
        rating: 4,
        comment: '"Really cool tech atmosphere. Food was great."',
        sentiment: 'POSITIVE'
    }
];

const FeedbackView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1>Guest Sentiment</h1>
                    <p>Autonomous feedback resolution and reputation management.</p>
                </div>
                <div className={styles.overallRating}>
                    <Star size={16} fill="currentColor" />
                    <span>4.8 Overall Rating</span>
                </div>
            </div>

            <div className={styles.feedbackGrid}>
                <div className={styles.sentimentCard}>
                    <div className={styles.cardTitle}>Sentiment Distribution</div>
                    <div className={styles.donutContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={styles.legend}>
                        {sentimentData.map((item) => (
                            <div key={item.name} className={styles.legendItem}>
                                <div className={styles.legendDot} style={{ backgroundColor: item.color }} />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.recentFeedback}>
                    <div className={styles.cardTitle}>
                        <MessageSquare size={18} style={{ marginRight: 8, display: 'inline' }} />
                        Recent Feedback
                    </div>
                    {feedbacks.map((f) => (
                        <div key={f.id} className={styles.feedbackItem}>
                            <div className={styles.feedbackHeader}>
                                <div className={styles.userInfo}>
                                    <div className={styles.avatar}>{f.user[0]}</div>
                                    <div>
                                        <div className={styles.userName}>{f.user}</div>
                                        <div className={styles.stars}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    fill={i < f.rating ? "currentColor" : "none"}
                                                    stroke="currentColor"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.sentimentTag} ${f.sentiment === 'POSITIVE' ? styles.tagPositive : styles.tagNegative}`}>
                                    {f.sentiment}
                                </div>
                            </div>
                            <div className={styles.comment}>{f.comment}</div>
                            <div className={styles.actions}>
                                <div className={styles.leftActions}>
                                    <button className={styles.actionBtn}>
                                        <MessageSquare size={14} />
                                        Auto-Reply
                                    </button>
                                    <button className={styles.actionBtn}>
                                        <Gift size={14} />
                                        Offer Coupon
                                    </button>
                                </div>
                                <div className={styles.rightActions}>
                                    <button className={styles.actionBtn}>
                                        <AlertTriangle size={14} />
                                        Escalate
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedbackView;
