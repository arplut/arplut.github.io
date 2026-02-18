const categorizedWasteData = {
    kitchen_waste: {
        high_value: [],
        low_value: [],
        biodegradable: ["food scraps", "peels", "meat/dairy"]
    },
    horticultural: {
        high_value: [],
        low_value: [],
        biodegradable: ["leaves", "grass", "coconut husks", "wood chips", "saw dust", "plant trimmings", "flowers", "plant debris"]
    },
    soiled_paper: {
        high_value: [],
        low_value: [],
        biodegradable: ["pizza boxes", "tea bags", "napkins", "tissues", "paper towels", "cardboard with food stains", "paper plates with food residue"]
    },
    plastics: {
        high_value: ["pet (water bottles, milk pouches, shampoo bottles)", "hard plastics: buckets, toys, crates", "bottles", "water bottles", "plastic containers", "food containers"],
        low_value: ["hdpe low-value/mlp: multi-layered plastics (chips packets, biscuit wrappers)", "plastic bags", "plastic packaging", "food wrappers", "plastic wrappers"],
        biodegradable: []
    },
    paper_cardboard: {
        high_value: ["paper", "office paper", "newsprint", "boxes", "magazines", "books", "envelopes", "paper bags", "cardboard tubes"],
        low_value: ["paper cups (without plastic lining)", "paper plates", "paper packaging (without plastic lining)"],
        biodegradable: []
    },
    metals: {
        high_value: ["iron", "aluminum foil", "copper wires", "steel cans", "aluminum cans", "metal scraps", "metal lids", "steel utensils", "copper pipes", "iron nails", "steel beams", "copper cookware"],
        low_value: ["aerosol cans", "aluminum foil trays", "aluminum foil sheets"],
        biodegradable: []
    },
    glass: {
        high_value: ["clear bottles", "colored bottles"],
        low_value: ["mirrors"],
        biodegradable: []
    },
    textiles_natural: {
        high_value: ["silk"],
        low_value: ["cotton clothes", "woolens", "jute bags"],
        biodegradable: ["cotton clothes", "woolens", "jute bags", "silk"] 
    },
    textiles_synthetic: {
        high_value: [],
        low_value: ["polyester", "nylon", "acrylic", "spandex"],
        biodegradable: []
    },
    footwear_leather: {
        high_value: ["leather bags", "leather jackets"],
        low_value: ["old shoes", "belts", "leather scraps", "footwear", "leather accessories", "chappals", "sandals", "boots", "sneakers", "flipflops"],
        biodegradable: []
    },
    furnishings: {
        high_value: [],
        low_value: ["old curtains", "bedsheets", "carpets"],
        biodegradable: []
    },
    chemical: {
        high_value: [],
        low_value: ["cleaning agents", "motor oil", "paint"],
        biodegradable: []
    },
    personal_care: {
        high_value: [],
        low_value: ["razors", "blades", "thermometers"],
        biodegradable: []
    },
    it_telecom: {
        high_value: ["laptops", "phones", "motherboards", "monitors", "televisions", "hard drives", "tablets", "gaming consoles"],
        low_value: ["wires", "chargers", "keyboards", "mice", "printers", "routers", "modems", "cables", "smartwatches", "audio equipment"],
        biodegradable: []
    },
    consumer_electronics: {
        high_value: ["fridges", "acs", "microwaves"],
        low_value: [],
        biodegradable: []
    },
    batteries: {
        high_value: ["lead-acid", "lithium-ion", "car batteries", "laptop batteries", "phone batteries"],
        low_value: ["nickel-cadmium", "alkaline", "button cells", "rechargeable batteries", "AA/AAA batteries", "batteries", "battery"],
        biodegradable: []
    },
    structural: {
        high_value: ["rebars", "rebar scraps"],
        low_value: ["concrete", "construction debris", "bricks", "tiles", "stones", "cement", "asphalt", "masonry debris", "concrete blocks", "brick fragments", "tile pieces", "stone rubble", "cement bags"],
        biodegradable: []
    },
    finishing: {
        high_value: ["marble", "granite"],
        low_value: ["pvc pipes", "wood", "ceramic sinks", "rocks", "flooring materials", "roofing materials", "drywall", "plaster", "insulation materials"],
        biodegradable: ["wood"]
    },
    absorbents: {
        high_value: [],
        low_value: ["diapers", "pads", "bandages", "tampoons", "sanitary napkins", "absorbent materials", "sanitary products"],
        biodegradable: []
    }
};