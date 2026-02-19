export const LOW_VALUE = "low_value";
export const HIGH_VALUE = "high_value";
export const BIO_DEGRADABLE = "bio_degradable";

export const wasteCategorization = {
    kitchen_waste: ["food scraps", "peels", "meat/dairy"],
    horticultural: ["leaves", "grass", "coconut husks", "wood chips", "saw dust", "plant trimmings", "flowers", "plant debris"],
    soiled_paper: ["pizza boxes", "tea bags", "napkins", "tissues", "paper towels", "cardboard with food stains", "paper plates with food residue"],
    plastics: [
        "pet (water bottles, milk pouches, shampoo bottles)",
        "hdpe low-value/mlp: multi-layered plastics (chips packets, biscuit wrappers)",
        "hard plastics: buckets, toys, crates",
        "plastic bags",
        "plastic packaging",
        "plastic containers",
        "food wrappers",
        "plastic wrappers",
        "food containers",
        "bottles",
        "water bottles"
    ],
    paper_cardboard: ["paper", "office paper", "newsprint", "boxes", "magazines", "books", "envelopes", "paper bags", "cardboard tubes", "paper cups (without plastic lining)", "paper plates", "paper packaging (without plastic lining)"],
    metals: ["iron", "aluminum foil", "copper wires", "steel cans", "aluminum cans", "metal scraps", "aerosol cans", "metal lids", "aluminum foil trays", "steel utensils", "copper pipes", "iron nails", "aluminum foil sheets", "steel beams", "copper cookware"],
    glass: ["clear bottles", "colored bottles", "mirrors"],
    textiles_natural: ["cotton clothes", "woolens", "jute bags", "silk"],
    textiles_synthetic: ["polyester", "nylon", "acrylic", "spandex"],
    footwear_and_leather: ["old shoes", "belts", "leather scraps", "footwear", "leather bags", "leather jackets", "leather accessories" , "chappals", "sandals", "boots", "sneakers", "flipflops"],
    furnishings: ["old curtains", "bedsheets", "carpets"],
    chemical: ["cleaning agents", "motor oil", "paint"],
    personal_care: ["razors", "blades", "thermometers"],
    it_telecom: ["laptops", "phones", "motherboards", "wires", "chargers", "keyboards", "mice", "printers", "monitors", "televisions", "routers", "modems", "hard drives", "batteries (if not classified under e_waste)", "cables", "smartwatches", "tablets", "gaming consoles", "audio equipment"],
    consumer_electronics: ["fridges", "acs", "microwaves"],
    batteries: ["lead-acid", "lithium-ion", "nickel-cadmium", "alkaline", "button cells", "rechargeable batteries", "car batteries", "laptop batteries", "phone batteries", "AA/AAA batteries", "batteries", "battery"],
    structural: ["concrete", "construction debris", "bricks", "tiles", "rebars" , "stones", "cement", "asphalt", "masonry debris", "concrete blocks", "brick fragments", "tile pieces", "rebar scraps", "stone rubble", "cement bags"],
    finishing: ["pvc pipes", "wood", "ceramic sinks", "rocks", "marble", "granite", "flooring materials", "roofing materials", "drywall", "plaster", "insulation materials"],
    absorbents: ["diapers", "pads", "bandages", "tampoons", "sanitary napkins", "absorbent materials", "sanitary products"]
};

export const secondaryWasteMapping = {
    kitchen_waste: "wet_waste",
    horticultural: "wet_waste",
    soiled_paper: "wet_waste",
    plastics: "dry_waste",
    paper_cardboard: "dry_waste",
    metals: "dry_waste",
    glass: "dry_waste",
    textiles_natural: "dry_waste",
    textiles_synthetic: "dry_waste",
    footwear_and_leather: "dry_waste",
    furnishings: "dry_waste",
    chemical: "hazardous",
    personal_care: "hazardous",
    it_telecom: "e_waste",
    consumer_electronics: "e_waste",
    batteries: "e_waste",
    structural: "construction_waste",
    finishing: "construction_waste",
    absorbents: "sanitary",
    unknown_category: "Unknown category"
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
    paper_cardboard: "Paper Cardboard",
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