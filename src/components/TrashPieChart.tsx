import React, { useCallback, useEffect, useState } from 'react';
import { Report } from "@/services/reportsService";
import { mapTrash, getChartData } from '@/lib/wasteCategorizationUtils';

import { Legend, Pie, PieChart, PieSectorShapeProps, Sector, Tooltip, TooltipIndex } from 'recharts';
import PieChartLegend from './PieChartLegend';



interface TrashPieChartProps {
    reports: Report[];
}

// TODO: repeated code in PieChartLegend, can be refactored to a shared utility
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

const MyCustomPie = (props: PieSectorShapeProps) => {
    return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};


const TrashPieChart: React.FC<TrashPieChartProps> = ({ reports }) => {

    const [primaryChart, setPrimaryChart] = useState([]);
    const [secondaryChart, setSecondaryChart] = useState([]);
    const [legendKeys, setLegendKeys] = useState([]); // TODO: IMPROVISE in remove the state and create a mapped object for colors for secondary categories

    const printTrash = useCallback((): string[] => {
        try {
            if (reports.length === 0) {
                console.warn("No reports available to print trash items.");
                return [];
            }
            const mappedTrash = mapTrash(reports)

            const { primaryChart, secondaryChart } = getChartData(mappedTrash);
            setLegendKeys(Object.keys(secondaryChart).sort());
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
            <div className="pie-charts-container">
                <div>
                    {/* <PieChart
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
                            shape={MyCustomPie}
                            // cx="50%"
                            // cy="50%"
                            // outerRadius="50%"
                        />
                        <Legend />
                        <Tooltip />

                    </PieChart> */}
                </div>
                <div>
                    <PieChart
                        width={"90%"}
                        height={500}
                        responsive
                    >
                        <Pie
                            data={secondaryChart}
                            dataKey="value"
                            // fill="#82ca9d"
                            label
                            isAnimationActive={true}
                            shape={MyCustomPie}
                        // cx="50%"
                        // cy="50%"
                        // innerRadius="60%"
                        // outerRadius="80%"
                        />
                        <Legend content={<PieChartLegend secondaryCategories={legendKeys} />} />
                        {/* <Legend payloadUniqBy={{dataKey: "name"}} /> */}
                        <Tooltip />
                    </PieChart>

                </div>
            </div>
        </div>
    );
};

export default TrashPieChart;
