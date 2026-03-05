import { secondaryWasteDisplayName } from '@/data/wasteCategories';
import React from 'react';
import { LegendPayload } from 'recharts';

const PieChartLegend = (props: { legendItems: readonly LegendPayload[] }) => {
    console.log("Rendering PieChartLegend with items:", props.legendItems);
    return (
        <ul style={{ padding: 0, margin: 0, textAlign: 'center' }}>
            {props.legendItems.map((item, index) => (
                <li key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                    <div
                        aria-label={`${item.value}`}
                        style={{ width: 14, height: 14, display: 'inline-block', verticalAlign: 'initial',  marginRight: '4px', backgroundColor: item.color }}
                    >
                    </div>
                    <span style={{ color: item.color }}>
                        {item.value}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default PieChartLegend;