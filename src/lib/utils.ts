import { Report } from "@/services/reportsService";
import { clsx, type ClassValue } from "clsx"
import { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ReducedReport {
  dateRange: string | Date | Timestamp;
  numberOfReports: number;
}


export const getMonthlyReportCounts = (reportsParam: Report[], year?: number): ReducedReport[] => {
  const counts = new Map<string, number>();

  for (const r of reportsParam) {
    const createdAt: Timestamp = (r as Report).createdAt;
    let ts = 0;

    ts = createdAt.toMillis();
    const d = new Date(ts);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    counts.set(monthKey, (counts.get(monthKey) ?? 0) + 1);
  }



  const result: ReducedReport[] = Array.from(counts.entries())
    .map(([dateRange, numberOfReports]) => ({ dateRange, numberOfReports }))
    .sort((a, b) => String(a.dateRange).localeCompare(String(b.dateRange)));

  if (year) {
    return result.filter(r => String(r.dateRange).startsWith(`${year}-`));
  }
  return result;
};