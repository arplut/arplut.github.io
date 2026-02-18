import React, { useCallback, useEffect, useState } from 'react';
import { Report } from "@/services/reportsService";
import { mapTrash, getChartData } from '@/lib/wasteCategorizationUtils';

import { Legend, Pie, PieChart, PieSectorShapeProps, Sector, Tooltip, TooltipIndex } from 'recharts';



interface TrashPieChartProps {
    reports: Report[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};


const TrashPieChart: React.FC<TrashPieChartProps> = ({ reports }) => {

    const [primaryChart, setPrimaryChart] = useState([]);
    const [secondaryChart, setSecondaryChart] = useState([]);

    const printTrash = useCallback((): string[] => {
        try {
            if (reports.length === 0) {
                console.warn("No reports available to print trash items.");
                return [];
            }
            const mappedTrash = mapTrash(reports)

            const { primaryChart, secondaryChart } = getChartData(mappedTrash);
            setPrimaryChart(Object.entries(primaryChart).map(([key, value]) => ({ name: key, value })));
            setSecondaryChart(Object.entries(secondaryChart).map(([key, value]) => ({ name: key, value })));
        } catch (error) {
            console.error("Error mapping trash items:", error);
        }
    }, [reports])

    useEffect(() => {
        if (reports.length > 0)
            printTrash()
    }, [reports, printTrash])

    return (
        <div className="trach-pie-chart">
            <h2>Trash details</h2>
            <div className="pie-charts-container">
                <div>
                    <PieChart
                        width={"90%"}
                        height={300}
                        responsive
                    >
                        <Pie
                            data={primaryChart}
                            dataKey="value"
                            fill="#8884d8"
                            label
                            isAnimationActive={true}
                            // shape={MyCustomPie}
                            // cx="50%"
                            // cy="50%"
                            // outerRadius="50%"
                        />
                        <Legend />
                        <Tooltip />

                    </PieChart>
                </div>
                <div>
                    <PieChart
                        width={"90%"}
                        height={300}
                        responsive
                    >
                        <Pie
                            data={secondaryChart}
                            dataKey="value"
                            fill="#82ca9d"
                            label
                            isAnimationActive={true}
                            // shape={MyCustomPie}
                            // cx="50%"
                            // cy="50%"
                            // innerRadius="60%"
                            // outerRadius="80%"
                        />
                        <Legend />
                        {/* <Legend payloadUniqBy={{dataKey: "name"}} /> */}
                        <Tooltip />
                    </PieChart>

                </div>
            </div>
        </div>
    );
};

export default TrashPieChart;
