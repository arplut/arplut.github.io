

export const LOW_VALUE = "low_value";
export const HIGH_VALUE = "high_value";
export const BIO_DEGRADABLE = "bio_degradable";

export const COLORS = ["#82ca1f", "#82caef", "#bf97d7", '#82ca1f', '#FFBB28', '#f0aa87', '#e18282', '#82caef', '#FFA07A', '#98D8C8', '#F7DC6F'];


export const trashValueChartMetaDetails = {
    low_value: {
        display_name: "Low value",
        description: "Items that have limited or no market demand, making them less valuable for recycling or resale. These items may require more effort to process and may not generate significant revenue when sold.",
        fill_color: "#FF6B6B"
    },
    high_value: {
        display_name: "High value",
        description: "Items that have a strong market demand and can be easily recycled or resold. These items are typically in good condition and can generate significant revenue when sold.",
        fill_color: "#82caef"
    },
    bio_degradable: {
        display_name: "Bio-degradable",
        description: "Items that can decompose naturally through the action of microorganisms, such as bacteria and fungi. These items break down into simpler organic materials over time, returning nutrients to the soil and reducing environmental impact.",
        fill_color: "#82ca1f"
    }
}

enum PrimaryCategory {
    WET_WASTE = "wet_waste",
    DRY_WASTE = "dry_waste",
    HAZARDOUS = "hazardous",
    E_WASTE = "e_waste",
    CONSTRUCTION_WASTE = "construction_waste",
    SANITARY = "sanitary",
    UNKNOWN_CATEGORY = "unknown_category"
}


export const primaryWasteDisplayName = {
    [PrimaryCategory.WET_WASTE]: "Wet Waste",
    [PrimaryCategory.DRY_WASTE]: "Dry Waste",
    [PrimaryCategory.HAZARDOUS]: "Hazardous",
    [PrimaryCategory.E_WASTE]: "E-Waste",
    [PrimaryCategory.CONSTRUCTION_WASTE]: "Construction Waste",
    [PrimaryCategory.SANITARY]: "Sanitary",
    [PrimaryCategory.UNKNOWN_CATEGORY]: "Unknown Category"
};

enum SecondaryCategory {
    KITCHEN_WASTE = "kitchen_waste",
    HORTICULTURAL = "horticultural",
    SOILED_PAPER = "soiled_paper",
    PLASTICS = "plastics",
    PAPER_CARDBOARD = "paper_cardboard",
    METALS = "metals",
    GLASS = "glass",
    TEXTILES_NATURAL = "textiles_natural",
    TEXTILES_SYNTHETIC = "textiles_synthetic",
    FOOTWEAR_AND_LEATHER = "footwear_and_leather",
    FURNISHINGS = "furnishings",
    CHEMICAL = "chemical",
    PERSONAL_CARE = "personal_care",
    IT_TELECOM = "it_telecom",
    CONSUMER_ELECTRONICS = "consumer_electronics",
    BATTERIES = "batteries",
    STRUCTURAL = "structural",
    FINISHING = "finishing",
    ABSORBENTS = "absorbents",
    UNKNOWN_CATEGORY = "unknown_category"
}

export const secondaryWasteMapping = {
    kitchen_waste: PrimaryCategory.WET_WASTE,
    horticultural: PrimaryCategory.WET_WASTE,
    soiled_paper: PrimaryCategory.WET_WASTE,
    plastics: PrimaryCategory.DRY_WASTE,
    paper_cardboard: PrimaryCategory.DRY_WASTE,
    metals: PrimaryCategory.DRY_WASTE,
    glass: PrimaryCategory.DRY_WASTE,
    textiles_natural: PrimaryCategory.DRY_WASTE,
    textiles_synthetic: PrimaryCategory.DRY_WASTE,
    footwear_and_leather: PrimaryCategory.DRY_WASTE,
    furnishings: PrimaryCategory.DRY_WASTE,
    chemical: PrimaryCategory.HAZARDOUS,
    personal_care: PrimaryCategory.HAZARDOUS,
    it_telecom: PrimaryCategory.E_WASTE,
    consumer_electronics: PrimaryCategory.E_WASTE,
    batteries: PrimaryCategory.E_WASTE,
    structural: PrimaryCategory.CONSTRUCTION_WASTE,
    finishing: PrimaryCategory.CONSTRUCTION_WASTE,
    absorbents: PrimaryCategory.SANITARY,
    unknown_category: PrimaryCategory.UNKNOWN_CATEGORY
};


export const primaryToSecondaryMapping = {
    wet_waste: ["kitchen_waste", "horticultural", "soiled_paper"],
    dry_waste: [
        "plastics",
        "paper_cardboard",
        "metals",
        "glass",
        "textiles_natural",
        "textiles_synthetic",
        "footwear_leather",
        "furnishings"
    ],
    hazardous: ["chemical", "personal_care"],
    e_waste: ["it_telecom", "consumer_electronics", "batteries"],
    construction_waste: ["structural", "finishing"],
    sanitary: ["absorbents"]
};


export type TrashValueType = typeof LOW_VALUE | typeof HIGH_VALUE | typeof BIO_DEGRADABLE;
export type PrimaryWasteType = keyof typeof primaryToSecondaryMapping;
export type SecondaryWasteTType = keyof typeof secondaryWasteMapping;

export const secondaryWasteDisplayName = {
    kitchen_waste: "Kitchen Waste",
    horticultural: "Horticultural",
    soiled_paper: "Soiled Paper",
    plastics: "Plastics",
    paper_cardboard: "Paper and Cardboard",
    metals: "Metals",
    glass: "Glass",
    textiles_natural: "Textiles Natural",
    textiles_synthetic: "Textiles Synthetic",
    footwear_and_leather: "Footwear And Leather",
    furnishings: "Furnishings",
    chemical: "Chemical Waste",
    personal_care: "Personal Care",
    it_telecom: "IT Telecom",
    consumer_electronics: "Consumer Electronics",
    batteries: "Batteries",
    structural: "Construction Waste - Structural",
    finishing: "Construction Waste - Finishing",
    absorbents: "Absorbents",
    unknown_category: "Unknown Category"
};


export const trashData = {
    [`${SecondaryCategory.KITCHEN_WASTE}.${LOW_VALUE}`]: [],
    [`${SecondaryCategory.KITCHEN_WASTE}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.KITCHEN_WASTE}.${BIO_DEGRADABLE}`]: ["food scraps", "peels", "meat/dairy", "milk products", "leftovers", "cooked food waste", "eggshells", "coffee grounds", "tea leaves", "seafood shells", "bones", "fruit scraps", "vegetable scraps", "bread", "pasta", "rice", "cereal", "sauces", "dairy products", "meat scraps", "fish scraps"],
    [`${SecondaryCategory.HORTICULTURAL}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.HORTICULTURAL}.${LOW_VALUE}`]: [],
    [`${SecondaryCategory.HORTICULTURAL}.${BIO_DEGRADABLE}`]: ["leaves", "grass", "coconut husks", "wood chips", "saw dust", "plant trimmings", "flowers", "plant debris"],
    [`${SecondaryCategory.SOILED_PAPER}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.SOILED_PAPER}.${LOW_VALUE}`]: [],
    [`${SecondaryCategory.SOILED_PAPER}.${BIO_DEGRADABLE}`]: ["pizza boxes", "tea bags", "napkins", "tissues", "paper towels", "cardboard with food stains", "paper plates with food residue"],
    [`${SecondaryCategory.PLASTICS}.${HIGH_VALUE}`]: ["pet (water bottles, milk pouches, shampoo bottles)", "hard plastics: buckets, toys, crates", "bottles", "water bottles", "plastic containers", "food containers"],
    [`${SecondaryCategory.PLASTICS}.${LOW_VALUE}`]: ["hdpe low-value/mlp: multi-layered plastics (chips packets, biscuit wrappers)", "plastic bags", "plastic packaging", "food wrappers", "plastic wrappers"],
    [`${SecondaryCategory.PLASTICS}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.PAPER_CARDBOARD}.${HIGH_VALUE}`]: ["paper", "office paper", "newsprint", "boxes", "magazines", "books", "envelopes", "paper bags", "cardboard tubes"],
    [`${SecondaryCategory.PAPER_CARDBOARD}.${LOW_VALUE}`]: ["paper cups (without plastic lining)", "paper plates", "paper packaging (without plastic lining)"],
    [`${SecondaryCategory.PAPER_CARDBOARD}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.METALS}.${HIGH_VALUE}`]: ["iron", "aluminum foil", "copper wires", "steel cans", "aluminum cans", "metal scraps", "metal lids", "steel utensils", "copper pipes", "iron nails", "steel beams", "copper cookware"],
    [`${SecondaryCategory.METALS}.${LOW_VALUE}`]: ["aerosol cans", "aluminum foil trays", "aluminum foil sheets"],
    [`${SecondaryCategory.METALS}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.GLASS}.${HIGH_VALUE}`]: ["clear bottles", "colored bottles"],
    [`${SecondaryCategory.GLASS}.${LOW_VALUE}`]: ["mirrors"],
    [`${SecondaryCategory.GLASS}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.TEXTILES_NATURAL}.${HIGH_VALUE}`]: ["silk"],
    [`${SecondaryCategory.TEXTILES_NATURAL}.${LOW_VALUE}`]: ["cotton clothes", "woolens", "jute bags"],
    [`${SecondaryCategory.TEXTILES_NATURAL}.${BIO_DEGRADABLE}`]: ["cotton clothes", "woolens", "jute bags", "silk"],
    [`${SecondaryCategory.TEXTILES_SYNTHETIC}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.TEXTILES_SYNTHETIC}.${LOW_VALUE}`]: ["polyester", "nylon", "acrylic", "spandex"],
    [`${SecondaryCategory.TEXTILES_SYNTHETIC}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.FOOTWEAR_AND_LEATHER}.${HIGH_VALUE}`]: ["leather bags", "leather jackets"],
    [`${SecondaryCategory.FOOTWEAR_AND_LEATHER}.${LOW_VALUE}`]: ["old shoes", "belts", "leather scraps", "footwear", "leather accessories", "chappals", "sandals", "boots", "sneakers", "flipflops"],
    [`${SecondaryCategory.FOOTWEAR_AND_LEATHER}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.FURNISHINGS}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.FURNISHINGS}.${LOW_VALUE}`]: ["old curtains", "bedsheets", "carpets"],
    [`${SecondaryCategory.FURNISHINGS}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.CHEMICAL}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.CHEMICAL}.${LOW_VALUE}`]: ["cleaning agents", "motor oil", "paint"],
    [`${SecondaryCategory.CHEMICAL}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.PERSONAL_CARE}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.PERSONAL_CARE}.${LOW_VALUE}`]: ["razors", "blades", "thermometers"],
    [`${SecondaryCategory.PERSONAL_CARE}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.IT_TELECOM}.${HIGH_VALUE}`]: ["laptops", "phones", "motherboards", "monitors", "televisions", "hard drives", "tablets", "gaming consoles"],
    [`${SecondaryCategory.IT_TELECOM}.${LOW_VALUE}`]: ["wires", "chargers", "keyboards", "mice", "printers", "routers", "modems", "cables", "smartwatches", "audio equipment"],
    [`${SecondaryCategory.IT_TELECOM}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.CONSUMER_ELECTRONICS}.${HIGH_VALUE}`]: ["fridges", "acs", "microwaves"],
    [`${SecondaryCategory.CONSUMER_ELECTRONICS}.${LOW_VALUE}`]: [],
    [`${SecondaryCategory.CONSUMER_ELECTRONICS}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.BATTERIES}.${HIGH_VALUE}`]: ["lead-acid", "lithium-ion", "car batteries", "laptop batteries", "phone batteries"],
    [`${SecondaryCategory.BATTERIES}.${LOW_VALUE}`]: ["nickel-cadmium", "alkaline", "button cells", "rechargeable batteries", "AA/AAA batteries", "batteries", "battery"],
    [`${SecondaryCategory.BATTERIES}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.STRUCTURAL}.${HIGH_VALUE}`]: ["rebars", "rebar scraps"],
    [`${SecondaryCategory.STRUCTURAL}.${LOW_VALUE}`]: ["concrete", "construction debris", "bricks", "tiles", "stones", "cement", "asphalt", "masonry debris", "concrete blocks", "brick fragments", "tile pieces", "stone rubble", "cement bags"],
    [`${SecondaryCategory.STRUCTURAL}.${BIO_DEGRADABLE}`]: [],
    [`${SecondaryCategory.FINISHING}.${HIGH_VALUE}`]: ["marble", "granite"],
    [`${SecondaryCategory.FINISHING}.${LOW_VALUE}`]: ["pvc pipes", "wood", "ceramic sinks", "rocks", "flooring materials", "roofing materials", "drywall", "plaster", "insulation materials"],
    [`${SecondaryCategory.FINISHING}.${BIO_DEGRADABLE}`]: ["wood"],
    [`${SecondaryCategory.ABSORBENTS}.${HIGH_VALUE}`]: [],
    [`${SecondaryCategory.ABSORBENTS}.${LOW_VALUE}`]: ["diapers", "pads", "bandages", "tampoons", "sanitary napkins", "absorbent materials", "sanitary products"],
    [`${SecondaryCategory.ABSORBENTS}.${BIO_DEGRADABLE}`]: ["organic absorbents", "cotton-based absorbents", "biodegradable diapers", "biodegradable sanitary products", "coconut sponges", "peat moss", "wood-based absorbents"]
};
