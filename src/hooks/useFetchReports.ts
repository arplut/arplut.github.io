import { useState, useEffect } from 'react';
import { Report, reportsService } from '@/services/reportsService';
import { sampleReports } from '@/data/sampleReports';
import { useToast } from './use-toast';


interface UseFetchReportsReturn {
    reports: Report[];
    loading: boolean;
    error: string | null;
    reFetchReports: () => void;
}

export function getSampleReports(): Report[] {
    console.log('🔧 DEVELOPMENT MODE: Using sample data for heatmap testing');
    const transformedSampleReports = sampleReports.map(report => ({
        ...report,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt
    })) as Report[];
    return transformedSampleReports;
}

export const useFetchReports = (isTesting): UseFetchReportsReturn => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchReports = async () => {
        try {
            setLoading(true);

            if (isTesting) {
                // Using sample data for heatmap testing
                setReports(getSampleReports());
            } else {
                // Using live Firebase data
                console.log('🔥 PRODUCTION MODE: Using live Firebase data');
                try {
                    const fetchedReports = await reportsService.getReports();
                    console.log('📊 Total fetched reports:', fetchedReports.length);

                    // Log status distribution for debugging
                    const statusCounts = fetchedReports.reduce((acc, r) => {
                        acc[r.status] = (acc[r.status] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>);
                    console.log('📊 Status distribution:', statusCounts);
                    console.log('📊all reports : ', fetchedReports);

                    // Show all reports (including anonymous ones for legacy data)
                    setReports(fetchedReports);
                } catch (firebaseError) {
                    console.error('🔥 Firebase Error Details:', firebaseError);
                    console.log('🔧 Falling back to sample data due to Firebase connection issues');

                    // Fallback to sample data if Firebase fails
                    setReports(getSampleReports());
                    toast({
                        title: "Using Sample Data",
                        description: "Firebase connection failed. Showing sample data for demonstration.",
                        variant: "default",
                    });
                }
            }

            setError(null);
        } catch (err) {
            setError("Failed to load reports and map data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();

        return (() => {
            setLoading(false);
            setReports([]);
            setError(null);
        })
    }, []);


    return { reports, loading, error, reFetchReports: fetchReports };
};