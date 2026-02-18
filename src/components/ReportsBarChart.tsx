import React from 'react';
import { ReducedReport } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarRectangleItem } from 'recharts';
import { useNavigate } from 'react-router-dom';

interface ReportsBarChartProps {
    chartData: ReducedReport[];
}

const ReportsBarChart: React.FC<ReportsBarChartProps> = ({
    chartData
}) => {

    const navigate = useNavigate();

    function barClickHandler(bri: BarRectangleItem) {
        // navigate to reports list in map page and use the below date range to filter reports
        navigate('/map', { state: { dateRangeSelected: bri["dateRange"] } });
    }

    return (
        <div className={`reports-bar-chart `}>
            <BarChart
                key={'bar-chart-1'}
                width={"90%"}
                height={300}
                data={chartData}
                responsive
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateRange" />
                <YAxis label={{ position: 'insideTopLeft', value: 'Number of reports', angle: -90, dy: 200 }} />
                <Tooltip />
                <Legend />
                {/* TODO: IMPROVISE: remove bar duplicates and map with array of objects */}
                <Bar style={{ cursor: "pointer" }} onClick={(bri: BarRectangleItem) => {
                    barClickHandler(bri)
                }} name="Resolved" dataKey="numberOfReports.resolved" stackId="a" maxBarSize={40} fill="#82ca1f" />
                <Bar style={{ cursor: "pointer" }} onClick={(bri: BarRectangleItem) => {
                    barClickHandler(bri)
                }} name="Pending" dataKey="numberOfReports.pending" stackId="a" maxBarSize={40} fill="#82caef" />
                <Bar style={{ cursor: "pointer" }} onClick={(bri: BarRectangleItem) => {
                    barClickHandler(bri)
                }} name="Verified" dataKey="numberOfReports.verified" stackId="a" maxBarSize={40} fill="#845a9d" />

            </BarChart>
        </div>
    );
};

export default ReportsBarChart;