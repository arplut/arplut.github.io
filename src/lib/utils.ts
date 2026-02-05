import { Report, ReportStatus } from "@/services/reportsService";
import { clsx, type ClassValue } from "clsx"
import { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ReportStatusWithoutArchived = Exclude<ReportStatus, "archived">

export interface ReducedReport {
  dateRange: string | Date | Timestamp;
  numberOfReports: Record<ReportStatusWithoutArchived, number>;
}

type DateInput = string | Date | Timestamp;

export const getDateFromTimeStamp = (createdAt: Timestamp): Date => {
  const ts = createdAt.toMillis();
  const d = new Date(ts);
  return d;
}

export const isDateInRange = (date: Date | Timestamp, startDate: DateInput, endDate: DateInput): boolean => {

  const dateMs = toMillis(date);
  const startMs = toMillis(startDate);
  const endMs = toMillis(endDate);

  return dateMs >= startMs && dateMs <= endMs;
};

export const getReportsListFromChartDate = (dateRange: string, reports: Report[]): Report[] => {
  const [year, month] = dateRange.split('-').map(Number);
  const filteredReports = [];
  for (const r of reports) {
    const d = getDateFromTimeStamp((r as Report).createdAt);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      filteredReports.push(r);
    }
  }
  return filteredReports;
}

export const getChartDataFromReports = (reports: Report[]): ReducedReport[] => {
  // TODO: refactor this to use simple array instead of map
  const chartKeys = new Map<string, Record<ReportStatusWithoutArchived, number>>();
  for (const r of reports) {
    if (r.status === "archived") {
      // Skip archived reports for chart data
      continue;
    }

    const d = getDateFromTimeStamp((r as Report).createdAt);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

    if (chartKeys.get(monthKey) === undefined) {
      chartKeys.set(monthKey, {
        pending: 0,
        verified: 0,
        resolved: 0,
      });
      chartKeys.get(monthKey)[r.status] = 1;
      continue;
    }

    chartKeys.get(monthKey)[r.status] += 1;
  }

  // If no reports, return empty array
  if (chartKeys.size === 0) {
    return [];
  }

  const result: ReducedReport[] = Array.from(chartKeys.entries())
    .map(([dateRange, numberOfReports]) => ({ dateRange, numberOfReports }))
    .sort((a, b) => String(a.dateRange).localeCompare(String(b.dateRange)));
  return result;
}

// TODO: extract filtering logic and chart data generation logic to seperate functions
export const getMonthlyReportCounts = (reportsParam: Report[], startDate?: DateInput, endDate?: DateInput): Report[] => {
  // const eachMonth = new Map<string, Record<ReportStatus, number>>();
  const filteredReports = [];
  for (const r of reportsParam) {
    const d = getDateFromTimeStamp((r as Report).createdAt);

    // Filter by date range if provided
    if (startDate && endDate && !isDateInRange(d, startDate, endDate)) {
      continue;
    }
    filteredReports.push(r);
  }
  return filteredReports;
};


export const getReportsByYear = (reportsParam: Report[], year: number): Report[] => {
  if (year === null) {
    // 'all' option selected so return all reports
    return reportsParam;
  }
  const filteredReports = [];
  for (const r of reportsParam) {
    const d = getDateFromTimeStamp((r as Report).createdAt);


    if (d.getFullYear() === year) {
      filteredReports.push(r);
    }
  }
  return filteredReports;
}


export const toMillis = (d: DateInput): number => {
  if (d instanceof Date) {
    return d.getTime();
  } else if (typeof d === 'string') {
    return new Date(d).getTime();
  } else {
    return (d as Timestamp).toMillis();
  }
};
