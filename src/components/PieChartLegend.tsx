import { secondaryWasteDisplayName } from '@/data/wasteCategories';
import React from 'react';
import { LegendPayload } from 'recharts';

const PieChartLegend = (props: { legendItems: readonly LegendPayload[] }) => {
    console.log("legend items", props.legendItems)

    return (
        <ul style={{ padding: 0, margin: 0, textAlign: 'center' }}>
            {props.legendItems.map((item, index) => (
                <li key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                    <div
                        aria-label={`${item.value}`}
                        style={{ width: 14, height: 14, display: 'inline-block', verticalAlign: 'middle', marginRight: '4px', backgroundColor:  item.color}}
                    >
                        {/* TODO: remove these inline styles and move it to seperate css file */}
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