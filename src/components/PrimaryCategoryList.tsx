import React from 'react';
import { IPrimaryWaste } from "@/lib/wasteCategorizationUtils"


interface PrimaryCategoryListProps {
    primaryWasteData: IPrimaryWaste[];
    onSelect: (category: string) => void;
    selectedPrimaryCategory: string
}

const PrimaryCategoryList: React.FC<PrimaryCategoryListProps> = ({ primaryWasteData, onSelect, selectedPrimaryCategory }) => {
    return (
        <>
            {primaryWasteData.length > 0 ?
                <>
                    <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-base text-yellow-700">
                            <span className="font-semibold">Info:</span> Click on below categories to view waste breakdown in pie chart.
                            Click on pie sections to view furthur breakdown.
                        </p>
                    </div>
                    <div className='primary-items-container'>
                        {primaryWasteData.map(category => (
                            <div key={category.name} className={`primary-item mb-2 p-3 ${selectedPrimaryCategory === category.name ? "bg-green-100 text-green-700" : "bg-white"}`}
                                onClick={() => onSelect(category.name)}>
                                {category.display_name} : {category.value} items
                            </div>
                        ))}
                    </div>
                </> : null}
        </>
    );
};

export default PrimaryCategoryList;