import { Report } from '@/services/reportsService';
import { PrimaryWasteType, secondaryWasteMapping, SecondaryWasteTType, TrashValueType, wasteCategorization } from '../data/wasteCategories';


type PrimaryCategory = PrimaryWasteType | "category_not_found"
type SecondaryCategory = SecondaryWasteTType | "category_not_found"
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
    let matchedCategory: SecondaryCategory = "category_not_found";
    for (const [secondaryCategoryKey, secondaryTrashValues] of Object.entries(wasteCategorization)) {

        const isMatched = matchTrashItemToSecondaryCategory(trashItem, secondaryTrashValues);
        if (isMatched) {
            matchedCategory = secondaryCategoryKey as SecondaryCategory;
            break;
        }
    }
    return matchedCategory;
}


export function getPrimaryCategory(secondaryItem: string): PrimaryCategory {
    return secondaryWasteMapping[secondaryItem] || "category_not_found";
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
    // console.log("Items detected in reports:", items);
    return items;
}

export function mapTrash(reports: Report[]): MappedTrash[] {
    const detectedItems = extractDetectedItemsFromReports(reports);
    const categorizedItems = detectedItems.map(item => {
        const secondaryCategory = categorizeTrashItem(item);
        const primaryCategory = getPrimaryCategory(secondaryCategory);
        return {
            name: item,
            secondaryCategory,
            primaryCategory
        }
    });
    console.log("Categorized items:", categorizedItems);
    return categorizedItems;
}

export interface PieChartData {
    primaryChart: Record<string, number>
    secondaryChart: Record<string, number>
}

export function getChartData(mappedTrash: MappedTrash[]): PieChartData {
    const primaryChart = {}
    const secondaryChart = {}

    mappedTrash.forEach(item => {
        if (primaryChart[item.primaryCategory]) {
            primaryChart[item.primaryCategory] += 1;
        } else {
            primaryChart[item.primaryCategory] = 1;
        }

        if (secondaryChart[item.secondaryCategory]) {
            secondaryChart[item.secondaryCategory] += 1;
        } else {
            secondaryChart[item.secondaryCategory] = 1;
        }
    })

    return { primaryChart, secondaryChart }
}
