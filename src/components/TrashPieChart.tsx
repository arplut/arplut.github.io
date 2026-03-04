import React, { useCallback, useEffect, useState } from 'react';
import { Report } from "@/services/reportsService";
import { mapTrash, getPieChartData, filterPrimaryCategory, getSecondaryChartData } from '@/lib/wasteCategorizationUtils';

import { Legend, Pie, PieChart, PieSectorShapeProps, Sector, Tooltip } from 'recharts';
import PieChartLegend from './PieChartLegend';
import { primaryWasteDisplayName, secondaryWasteDisplayName, trashValueChartMetaDetails } from '@/data/wasteCategories';
import "@/styles/trashpiechart.css";

interface TrashPieChartProps {
    reports: Report[];
}


// TODO: fill color must match the piechartlegend colors
const MyCustomPie = (props: PieSectorShapeProps, nameKey: string, fill: string) => {
    return <Sector name={nameKey} {...props} fill={fill} />;
};


const TrashPieChart: React.FC<TrashPieChartProps> = ({ reports }) => {

    const [primaryChart, setPrimaryChart] = useState([]);
    const [clubbedData, setClubbedData] = useState({});
    const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState<string>(null);
    const [secondaryChartData, setSeconadaryChartData] = useState([]);
    const [selectedSecondaryCategory, setSelectedSecondaryCategory] = useState<string>(null);
    const [trashValueChartData, setTrashValueChartData] = useState([]);

    function onSecondaryPieSectionClick(secondaryCategory: string) {
        setSelectedSecondaryCategory(secondaryCategory)
    }

    const resetTrashChart = useCallback(() => {
        setSelectedSecondaryCategory(null)
        setTrashValueChartData([])
    }, [])

    const resetEverything = useCallback(() => {
        setSeconadaryChartData([])
        resetTrashChart()
    }, [resetTrashChart])

    const trashValuePieChart = useCallback(() => {
        const chartData = []
        Object.entries(clubbedData[selectedSecondaryCategory]).forEach((item) => {
            chartData.push({ name: item[0], value: item[1], display_name: trashValueChartMetaDetails[item[0]]?.display_name, fill: trashValueChartMetaDetails[item[0]]?.fill_color })
        })
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
            resetTrashChart()
        } else {
            resetEverything()
        }

    }, [selectedPrimaryCategory, clubbedData, resetEverything, resetTrashChart])

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
        <div className="trash-pie-chart">
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
                            <h1 className="text-xl font-bold py-4">{primaryWasteDisplayName[selectedPrimaryCategory]}</h1>
                            <PieChart
                                width={"90%"}
                                height={300}
                                responsive
                            >
                                <Pie
                                    onClick={(e) => {
                                        onSecondaryPieSectionClick(e.payload.name)
                                    }}
                                    data={secondaryChartData}
                                    dataKey="value"
                                    nameKey="display_name"
                                    fill="fill"
                                    label
                                    isAnimationActive={true}
                                    shape={(props) => {
                                        return MyCustomPie(props, props.payload.name, props.payload.fill)
                                    }}
                                />
                                <Legend itemSorter="dataKey" content={(props) => { return <PieChartLegend legendItems={props.payload} /> }} />
                                <Tooltip />
                            </PieChart>

                        </div>
                        <div>
                            {
                                trashValueChartData.length > 0 && selectedSecondaryCategory ?
                                    <div>
                                        <h1 className="text-xl font-bold py-4">{secondaryWasteDisplayName[selectedSecondaryCategory]}</h1>
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
                                                shape={(props) =>
                                                    MyCustomPie(props, props.payload.name, props.payload.fill)
                                                }
                                            />
                                            <Legend itemSorter="dataKey" content={(props) =>
                                                <PieChartLegend legendItems={props.payload} />
                                            } />

                                            <Tooltip />
                                        </PieChart></div> : null
                            }

                        </div>
                    </div>
            }
        </div >
    );
};

export default TrashPieChart;
