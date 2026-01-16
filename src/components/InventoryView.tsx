"use client";
import React, { useEffect, useState } from 'react';
import styles from './InventoryView.module.css';
import { AlertTriangle, ArrowDown, ArrowUp, RefreshCcw, Zap } from 'lucide-react';
import { getInventoryItems, getInventoryStats, toggleAutoOrder } from '@/app/actions/inventory';
import { InventoryItem } from '@/types/inventory';

const InventoryView = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [stats, setStats] = useState({
        totalValue: 0,
        lowStockCount: 0,
        autoOrdersCount: 0,
        wasteReduction: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsData, statsData] = await Promise.all([
                    getInventoryItems(),
                    getInventoryStats()
                ]);
                setItems(itemsData);
                setStats(statsData);
            } catch (error) {
                console.error("Failed to fetch inventory data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggleAuto = async (id: string, currentStatus: boolean) => {
        // Optimistic update
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, ai_auto_order: !currentStatus } : item
        ));

        const result = await toggleAutoOrder(id);
        if (!result.success) {
            // Revert on failure
            setItems(prev => prev.map(item =>
                item.id === id ? { ...item, ai_auto_order: currentStatus } : item
            ));
        }
    };

    if (loading) {
        return <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Inventory...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1>Inventory Management</h1>
                    <p>AI-driven stock tracking and automated supply chain logistics.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className={styles.actionBtn} style={{ background: 'var(--surface)' }}>Manual Override</button>
                    <button className={styles.actionBtn} style={{ background: 'var(--primary)', color: 'var(--background)', border: 'none', fontWeight: 700 }}>Export Report</button>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Total Inventory Value</span>
                    <div className={styles.statValue}>${stats.totalValue.toLocaleString()}</div>
                    <div className={`${styles.statTrend} ${styles.trendDown}`}>
                        <ArrowDown size={14} style={{ marginRight: 4 }} />
                        2.4% vs last month
                    </div>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Low Stock Alerts</span>
                    <div className={styles.statValue}>{stats.lowStockCount} Items</div>
                    <div className={`${styles.statTrend} ${stats.lowStockCount > 0 ? styles.trendDown : styles.trendUp}`} style={{ color: stats.lowStockCount > 0 ? 'var(--warning)' : 'var(--primary)' }}>
                        <AlertTriangle size={14} style={{ marginRight: 4 }} />
                        {stats.lowStockCount > 0 ? 'Needs attention' : 'Optimal levels'}
                    </div>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Auto-Orders Placed</span>
                    <div className={styles.statValue}>{stats.autoOrdersCount} Active</div>
                    <div className={`${styles.statTrend} ${styles.trendUp}`}>
                        <ArrowUp size={14} style={{ marginRight: 4 }} />
                        Fully autonomous
                    </div>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Food Waste Reduction</span>
                    <div className={styles.statValue}>{stats.wasteReduction}%</div>
                    <div className={`${styles.statTrend} ${styles.trendUp}`}>
                        <ArrowUp size={14} style={{ marginRight: 4 }} />
                        Optimized prep
                    </div>
                </div>
            </div>

            <div className={styles.inventorySection}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionTitle}>Stock Levels & Logistics</div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input className={styles.searchBar} placeholder="Search inventory..." />
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Stock Level</th>
                                <th>Status</th>
                                <th>AI Auto-Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className={styles.itemName}>{item.item_name}</td>
                                    <td><span className={styles.category}>{item.category_name || 'N/A'}</span></td>
                                    <td>{item.stock_quantity} {item.unit}</td>
                                    <td>
                                        <div className={styles.statusIndicator}>
                                            <div className={`${styles.dot} ${styles['dot' + (item.status === 'Out of Stock' ? 'Out' : item.status)]}`} />
                                            <span style={{
                                                color: item.status === 'Healthy' ? 'var(--primary)' :
                                                    item.status === 'Low' ? 'var(--warning)' :
                                                        'var(--danger)'
                                            }}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={styles.autoOrder}
                                            onClick={() => handleToggleAuto(item.id, item.ai_auto_order)}
                                            style={{ cursor: 'pointer', opacity: item.ai_auto_order ? 1 : 0.6 }}
                                        >
                                            <Zap size={14} fill={item.ai_auto_order ? "currentColor" : "none"} />
                                            {item.ai_auto_order ? 'ENABLED' : 'DISABLED'}
                                        </div>
                                    </td>
                                    <td>
                                        <button className={styles.actionBtn}>
                                            <RefreshCcw size={12} style={{ marginRight: 6 }} />
                                            Restock
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryView;
