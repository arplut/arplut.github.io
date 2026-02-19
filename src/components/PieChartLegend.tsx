import { secondaryWasteDisplayName } from '@/data/wasteCategories';
import React from 'react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
const getColor = (i) => COLORS[i % COLORS.length]

const PieChartLegend = (props: { secondaryCategories: string[] }) => {


    return (
        <ul style={{ padding: 0, margin: 0, textAlign: 'center' }}>
            {props.secondaryCategories.map((item, index) => (
                <li key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                    <div
                        aria-label={`${item}`}
                        style={{ width: 14, height: 14, display: 'inline-block', verticalAlign: 'middle', marginRight: '4px', backgroundColor: getColor(index) }}
                    >
                        {/* TODO: remove these inline styles and move it to seperate css file */}
                    </div>
                    <span style={{ color: getColor(index) }}>
                        {secondaryWasteDisplayName[item]}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default PieChartLegend;