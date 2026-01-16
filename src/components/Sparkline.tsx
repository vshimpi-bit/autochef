"use client";
import React, { useEffect, useState } from 'react';

interface SparklineProps {
    data: number[];
    color?: string;
    height?: number;
    width?: number; // Optional, defaults to 100% via CSS
}

const Sparkline: React.FC<SparklineProps> = ({
    data,
    color = "#10b981",
    height = 40,
    width = 200
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        requestAnimationFrame(() => setIsMounted(true));
    }, []);

    // 1. Normalize data
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const padding = 2; // px

    // 2. Generate Points
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const normalizedY = (val - min) / range;
        // Invert Y because SVG y=0 is top
        const y = height - (normalizedY * (height - padding * 2)) - padding;
        return { x, y };
    });

    // 3. Generate Smooth Path (Catmull-Rom-like via cubic bezier)
    // Simplified smoothing strategy: control point is roughly halfway between points
    // Or standard approach: 
    const generateSmoothPath = (points: { x: number, y: number }[]) => {
        if (points.length === 0) return "";

        // Start
        let d = `M ${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];

            // Simple smoothing: use midpoints X for control points
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            const cp1y = p0.y;
            const cp2x = p0.x + (p1.x - p0.x) / 2;
            const cp2y = p1.y;

            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
        }
        return d;
    };

    const pathD = generateSmoothPath(points);
    const fillD = `${pathD} L ${width},${height} L 0,${height} Z`;

    return (
        <div style={{ width: '100%', height: height, overflow: 'hidden' }}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0.0" />
                    </linearGradient>
                </defs>

                {/* Fill Area with Animation for Opacity */}
                <path
                    d={fillD}
                    fill={`url(#gradient-${color})`}
                    style={{
                        opacity: isMounted ? 1 : 0,
                        transition: 'opacity 1s ease-out 0.5s'
                    }}
                />

                {/* Stroke Line with Animation */}
                <path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={1000} // Arbitrary large number provided standard width
                    strokeDashoffset={isMounted ? 0 : 1000}
                    style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                />
            </svg>
        </div>
    );
};

export default Sparkline;
