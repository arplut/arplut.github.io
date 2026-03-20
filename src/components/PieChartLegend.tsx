import React from 'react';
import { LegendPayload } from 'recharts';


interface PieChartLegendProps {
    legendItems: readonly LegendPayload[];
    onLegendClick?: (secondaryCategory: string) => void;
}

const PieChartLegend: React.FC<PieChartLegendProps> = (props: PieChartLegendProps) => {
    return (
        <ul>
            {props.legendItems.map((item, index) => {
                return (
                    <li onClick={() => {
                        if (props.onLegendClick) {
                            // TODO: address this error with proper type check
                            props.onLegendClick(item.payload?.name)
                        }
                    }} className={`${props.onLegendClick ? 'legend-items' : ''}`} key={index} style={{ display: 'inline-block', marginRight: '10px', textDecorationColor: `${props.onLegendClick ? item.color : ''}` }}>
                        <div
                            aria-label={`${item.value}`}
                            className='legend-marker'
                            style={{ display: 'inline-block', verticalAlign: 'initial', marginRight: '4px', backgroundColor: item.color }}
                        >
                        </div>
                        <span style={{ color: item.color }}>
                            {item.value}
                        </span>
                    </li>
                )
            })}
        </ul>
    );
};

export default PieChartLegend;