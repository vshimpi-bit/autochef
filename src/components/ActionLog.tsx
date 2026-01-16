"use client";
import React, { useEffect, useState } from 'react';
import styles from './ActionLog.module.css';
import { Zap, Clock } from 'lucide-react';
import { getAiActionLogs } from '@/app/actions/inventory';
import { AiActionLog } from '@/types/inventory';

const ActionLog = () => {
    const [logs, setLogs] = useState<AiActionLog[]>([]);

    useEffect(() => {
        getAiActionLogs().then(data => setLogs(data));
    }, []);

    const getType = (severity: string) => {
        switch (severity) {
            case 'Info': return 'success';
            case 'Warning': return 'warning';
            case 'Critical': return 'danger';
            default: return 'success';
        }
    };

    return (
        <aside className={styles.actionLog}>
            <div className={styles.titleContainer}>
                <Zap size={16} />
                <span>AI Action Log</span>
            </div>
            <div className={styles.logList}>
                {logs.map((log) => (
                    <div key={log.id} className={styles.logItem}>
                        <div className={`${styles.indicator} ${styles[getType(log.severity)]}`} />
                        <div className={styles.logContent}>
                            <div className={styles.logText}>{log.description}</div>
                            <div className={styles.logTime}>
                                <Clock size={12} />
                                Just now
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default ActionLog;
