import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Report } from "@/services/reportsService";
import { getMonthlyReportCounts, ReducedReport } from '@/lib/utils';
import '@/styles/dashboard.css';


interface DashboardProps {
    reports: Report[];
}


const options = {
    all: null,
    pastYear: new Date().getFullYear() - 1,
    currentYear: new Date().getFullYear(),
}

const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
    const [chartData, setChartData] = React.useState<ReducedReport[]>([]);
    const [dateRange, setDateRange] = React.useState<string | null>(null);
    useEffect(() => {

        const monthlyCounts = getMonthlyReportCounts(reports, options[dateRange]);
        setChartData(monthlyCounts);
    }, [reports, dateRange])

    return (
        <div>
            <h1>Dashboard</h1>
            <select
                id="dashboard-range-select"
                className='dashboard-select'
                value={dateRange}
                onChange={(e) => {
                    const v = (e.target as HTMLSelectElement).value;
                    setDateRange(v === "all" ? null : v);
                }}
            >
                <option value={"all"}>All reports</option>
                <option value={"pastYear"}>Past year reports</option>
                <option value={"currentYear"}>Current year reports</option>
            </select>
            {/* Add your dashboard content here */}
            <BarChart
                key={'bar-chart-1'}
                width={700}
                height={300}
                data={chartData}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="dateRange" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="numberOfReports" maxBarSize={40} fill="#8884d8" radius={[10, 10, 0, 0]}  />

            </BarChart>
        </div>
    );
};


export default Dashboard;
