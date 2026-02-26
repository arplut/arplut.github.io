import { Report } from '@/services/reportsService';
import { primaryToSecondaryMapping, PrimaryWasteType, secondaryWasteDisplayName, secondaryWasteMapping, SecondaryWasteTType, TrashValueType, wasteCategorization } from '../data/wasteCategories';
import { trashData } from '@/data/wasteLHBValueType';

const UNKNOWN_CATEGORY = "unknown_category";
type PrimaryCategory = PrimaryWasteType | typeof UNKNOWN_CATEGORY
type SecondaryCategory = SecondaryWasteTType | typeof UNKNOWN_CATEGORY
type ValueType = TrashValueType | null

interface MappedTrash {
    name: string;
    primaryCategory: PrimaryCategory;
    secondaryCategory: SecondaryCategory;
    valueType?: ValueType;
}

function matchTrashItemToSecondaryCategory(trashItem: string, values: string[]): boolean {
    let isMatched = false;
    for (const item of values) {
        if (trashItem.toLowerCase().includes(item.toLowerCase())) {
            isMatched = true
            break;
        }
    }
    return isMatched;
}


export function categorizeTrashItem(trashItem: string): SecondaryCategory {
    let matchedCategory: SecondaryCategory = UNKNOWN_CATEGORY;
    for (const [secondaryCategoryKey, secondaryTrashValues] of Object.entries(trashData)) {
        if(secondaryTrashValues.length === 0) continue; // skip if there are no values to match for the category

        const isMatched = matchTrashItemToSecondaryCategory(trashItem, secondaryTrashValues);
        if (isMatched) {
            matchedCategory = secondaryCategoryKey as SecondaryCategory;
            break;
        }
    }
    return matchedCategory;
}


export function getPrimaryCategory(secondaryItem: string): PrimaryCategory {
    return secondaryWasteMapping[secondaryItem] || UNKNOWN_CATEGORY;
}


const extractDetectedItemsFromReports = (reports: Report[]) => {
    if (reports.length === 0) {
        console.warn("No reports available to extract AI classifications.");
        return [];
    }

    const detectedItems = [];
    reports.map((item: Report) => {
        if (item["aiInsights"] && item["aiInsights"].original && item["aiInsights"].original.itemsDetected) {
            detectedItems.push(...item["aiInsights"].original.itemsDetected);
        }
    })
    return detectedItems;
}

export function printItemsDetectedArray(reports: Report[]) {
    const items = extractDetectedItemsFromReports(reports);
    return items;
}

export function mapTrash(reports: Report[]): MappedTrash[] {
    const detectedItems = extractDetectedItemsFromReports(reports);

    const categorizedItems = detectedItems.map(item => {
        const secCategoryKey= categorizeTrashItem(item);
        const splitKeys = secCategoryKey.split(".")
        const secondaryCategory =splitKeys[0] as SecondaryCategory; // Extract the primary category from the secondary category key
        const trashType = splitKeys[1] as TrashValueType; // Extract the trash type from the secondary category key
        const primaryCategory = getPrimaryCategory(secondaryCategory);
        return {
            name: item,
            secondaryCategory,
            primaryCategory,
            valueType: trashType
        }
    });

    return categorizedItems;
}

export function filterMatchedPrimaryCategory(primaryCategory: PrimaryCategory, mappedTrash:MappedTrash[]) {
    return mappedTrash.filter(item => item.primaryCategory === primaryCategory)
}

export interface PieChartData {
    primaryChart: Record<string, number>
    clubbedData: Record<string, Record<string, number>>
}

export type PieChart = {
    [key in PrimaryCategory]: Record<SecondaryCategory, number>;
};

export function getPieChartData(mappedTrash: MappedTrash[]): PieChartData {
    const primaryChart = {}

    const clubbedData = {      
    }

    mappedTrash.forEach(item => {
        if(item.primaryCategory === UNKNOWN_CATEGORY || item.secondaryCategory === UNKNOWN_CATEGORY) {
            return; // skip uncategorized items
        }
        clubbedData[item.secondaryCategory] = clubbedData[item.secondaryCategory] || {};
        if (clubbedData[item.secondaryCategory][item.valueType]) {
            clubbedData[item.secondaryCategory][item.valueType] += 1;
        } else {
            clubbedData[item.secondaryCategory][item.valueType] = 1;
        }

        if (primaryChart[item.primaryCategory]) {
            primaryChart[item.primaryCategory] += 1;
        } else {
            primaryChart[item.primaryCategory] = 1;
        }

    })

    return { primaryChart, clubbedData };
}


export function filterPrimaryCategory(primaryCategory: string, clubbedData: Record<string, Record<string, number>>) {
    const secondaryCategoriesArray = primaryToSecondaryMapping[primaryCategory];
    const secondaryChartData = {};


    secondaryCategoriesArray.forEach(secondaryCategory => {
        if (clubbedData[secondaryCategory])
            secondaryChartData[secondaryCategory] = clubbedData[secondaryCategory];
    });

    return secondaryChartData;
}


export function getSecondaryChartData(selectedSecondaryData: Record<string, Record<string, number>>) {
    const secondaryChartData = [];
    Object.entries(selectedSecondaryData).forEach((item) => {
        const key = item[0];
        const totalValue = Object.values(item[1]).reduce((acc, curr) => acc + curr, 0);
        secondaryChartData.push({ name:key, display_name: secondaryWasteDisplayName[key], value: totalValue });
    })
    
    return secondaryChartData;
}