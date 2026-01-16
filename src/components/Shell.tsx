"use client";
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

import ActionLog from '@/components/ActionLog';

export default function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    <div className="page-content">
                        {children}
                    </div>
                    <ActionLog />
                </div>
            </div>
        </div>
    );
}
