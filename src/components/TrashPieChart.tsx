import React, { useCallback, useEffect, useState } from 'react';
import { Report } from "@/services/reportsService";
import { mapTrash, getPieChartData, filterPrimaryCategory, getSecondaryChartData } from '@/lib/wasteCategorizationUtils';

import { Legend, Pie, PieChart, PieSectorShapeProps, Sector, Tooltip } from 'recharts';
import PieChartLegend from './PieChartLegend';
import { primaryWasteDisplayName, secondaryWasteDisplayName, trashValueDisplayName } from '@/data/wasteCategories';


interface TrashPieChartProps {
    reports: Report[];
}

// TODO: can be moved to a shared utility
export const COLORS = ["#82ca1f", "#82caef","#845a9d", '#82ca1f', '#FFBB28', '#FF8042', '#FF6B6B', '#82caef', '#FFA07A', '#98D8C8', '#F7DC6F'];

// TODO: fill color must match the piechartlegend colors
const MyCustomPie = (props: PieSectorShapeProps, nameKey?: string) => {
    return <Sector name={nameKey} {...props} fill={COLORS[props.index % COLORS.length]} />;
};


const TrashPieChart: React.FC<TrashPieChartProps> = ({ reports }) => {

    const [primaryChart, setPrimaryChart] = useState([]);
    const [clubbedData, setClubbedData] = useState({});
    const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState<string>(null);
    const [secondaryChartData, setSeconadaryChartData] = useState([]);
    const [selectedSecondaryCategory, setSelectedSecondaryCategory] = useState<string>(null);
    const [trashValueChartData, setTrashValueChartData] = useState([]);
    const [legendKeys, setLegendKeys] = useState([]); // TODO: IMPROVISE in remove the state and create a mapped object for colors for secondary categories

    function onSecondaryPieSectionClick(secondaryCategory: string) {
        setSelectedSecondaryCategory(secondaryCategory)
    }

    function resetTrashChart() {
        setSelectedSecondaryCategory(null)
        setTrashValueChartData([])
    }

    function resetEverything() {
        setLegendKeys([]);
        setSeconadaryChartData([])
        resetTrashChart()
    }

    const trashValuePieChart = useCallback(() => {
        const chartData = []
        Object.entries(clubbedData[selectedSecondaryCategory]).forEach((item) => {
            console.log(trashValueDisplayName, item[0])
            chartData.push({ name: item[0], value: item[1], display_name: trashValueDisplayName[item[0]] })
        })
        console.log(chartData)
        return chartData
    }, [clubbedData, selectedSecondaryCategory])

    const categorizeTrash = useCallback((): string[] => {
        try {
            if (reports.length === 0) {
                console.warn("No reports available to print trash items.");
                return [];
            }
            const mappedTrash = mapTrash(reports);
            const { primaryChart, clubbedData } = getPieChartData(mappedTrash);
            setPrimaryChart(Object.entries(primaryChart).map(([key, value]) => ({ name: key, value, display_name: primaryWasteDisplayName[key] })));
            setClubbedData(clubbedData);
        } catch (error) {
            console.error("Error mapping trash items:", error);
        }
    }, [reports])

    useEffect(() => {
        if (selectedPrimaryCategory) {
            const secondaryData = filterPrimaryCategory(selectedPrimaryCategory, clubbedData);
            setSeconadaryChartData(getSecondaryChartData(secondaryData));
            setLegendKeys(Object.keys(secondaryData));
            resetTrashChart()
        } else {
            resetEverything()
        }

    }, [selectedPrimaryCategory, clubbedData])

    useEffect(() => {
        if (selectedSecondaryCategory) {
            setTrashValueChartData(trashValuePieChart())
        }
    }, [selectedSecondaryCategory, trashValuePieChart])

    useEffect(() => {
        if (reports.length > 0)
            categorizeTrash()
    }, [reports, categorizeTrash])

    return (
        <div className="trach-pie-chart">
            {
                primaryChart.length > 0 ?
                    <><div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">
                            <span className="font-semibold">Info:</span> Click on below categories to view waste breakdown
                        </p>
                    </div>
                        {primaryChart.map(category => (
                            <div key={category.name} className={`mb-2 p-3 border ${selectedPrimaryCategory === category.name ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} rounded-lg cursor-pointer`}
                                onClick={() => setSelectedPrimaryCategory(category.name)}>
                                {category.display_name} : {category.value} items
                            </div>
                        ))}
                    </> : null
            }
            {
                (((secondaryChartData).length === 0) && selectedPrimaryCategory) ?
                    <p className='text-center'>Trash details can be viewed once the trash is detected/categorized in the reports.</p> :

                    <div className="pie-charts-container">
                        <div>
                            <PieChart
                                width={"90%"}
                                height={300}
                                responsive
                            >
                                <Pie
                                    onClick={(e) => {
                                        console.log(e.payload.name)
                                        onSecondaryPieSectionClick(e.payload.name)
                                    }}
                                    data={secondaryChartData}
                                    dataKey="value"
                                    nameKey="display_name"
                                    // fill="#82ca9d"
                                    label
                                    isAnimationActive={true}
                                    shape={(props) => MyCustomPie(props, props.payload.nameKey)}
                                // cx="50%"
                                // cy="50%"
                                // innerRadius="60%"
                                // outerRadius="80%"
                                />
                                {/* TODO: fix legend to match the fill colors */}
                                <Legend itemSorter={"dataKey"} content={<PieChartLegend secondaryCategories={legendKeys} />} />
                                {/* <Legend payloadUniqBy={{dataKey: "name"}} /> */}
                                <Tooltip />
                            </PieChart>

                        </div>
                        <div>
                            {
                                trashValueChartData.length > 0 && selectedSecondaryCategory ?
                                    < PieChart
                                        width={"90%"}
                                        height={300}
                                        responsive
                                    >
                                        <Pie
                                            data={trashValueChartData}
                                            dataKey="value"
                                            nameKey="display_name"
                                            label
                                            isAnimationActive={true}
                                            shape={(props) => MyCustomPie(props, props.payload.nameKey)}
                                        />
                                        {/* TODO: fix legend to match the fill colors */}
                                        <Legend />
                                        <Tooltip />
                                    </PieChart> : null
                            }

                        </div>
                    </div>
            }
        </div >
    );
};

export default TrashPieChart;
