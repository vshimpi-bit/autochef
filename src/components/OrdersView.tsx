"use client";
import React from 'react';
import styles from './OrdersView.module.css';
import { ShoppingCart } from 'lucide-react';

const orders = [
    { id: 'ORD-921', table: 'Table T2', items: 'Truffle Pasta, Red Wine', time: '5M AGO', status: 'PREPARING' },
    { id: 'ORD-920', table: 'Table T5', items: 'Margherita Pizza, Coke', time: '12M AGO', status: 'READY' },
    { id: 'ORD-919', table: 'Table T1', items: 'Bruschetta', time: '25M AGO', status: 'DELIVERED' },
];

const OrdersView = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Active Orders</h1>
                <p>Autonomous kitchen coordination and order tracking.</p>
            </div>

            <div className={styles.orderList}>
                {orders.map((order) => (
                    <div key={order.id} className={styles.orderItem}>
                        <div className={styles.orderLeft}>
                            <div className={styles.iconBox}>
                                <ShoppingCart size={20} />
                            </div>
                            <div className={styles.orderInfo}>
                                <h3>{order.id} — {order.table}</h3>
                                <p>{order.items}</p>
                            </div>
                        </div>
                        <div className={styles.orderRight}>
                            <span className={styles.time}>{order.time}</span>
                            <div className={`${styles.statusBadge} ${styles['status' + order.status]}`}>
                                {order.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersView;
