export const reports = [
    {
        "id": "aQKmtuJZpemUWYE68mX1",
        "endorsementCount": 0,
        "location": {
            "address": "1st Cross Road Bengaluru, Karnataka",
            "state": "Karnataka",
            "city": "Bengaluru",
            "coordinates": {
                "latitude": 12.9328316,
                "longitude": 77.6106869,
                "type": "firestore/geoPoint/1.0"
            }
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1769526354,
            "nanoseconds": 522000000
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FeMd4mc7G4zWX6MDL29cR06ptjVU2%2FaQKmtuJZpemUWYE68mX1%2FaQKmtuJZpemUWYE68mX1.jpg?alt=media&token=8fab10a9-4538-44fc-a198-0d320fd7517e"
        ],
        "category": "littering",
        "status": "pending",
        "aiInsights": {
            "confirmationStatus": "accepted",
            "original": {
                "summary": "There is a medium-sized mixed waste issue present.",
                "itemsDetected": [
                    "plastic bags",
                    "containers"
                ],
                "wasteType": "mixed",
                "additionalContext": "none",
                "approxSize": "medium",
                "actionSuggestion": "Schedule a waste collection service to clear the area.",
                "isGarbageIssue": true,
                "suggestedCategory": "littering"
            },
            "analysisSource": "openai-vision",
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1769526354,
                "nanoseconds": 522000000
            },
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1769526354,
                "nanoseconds": 522000000
            }
        },
        "authorName": "Anonymous",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1769526354,
                "nanoseconds": 522000000
            }
        },
        "description": "There is a medium-sized mixed waste issue present.",
        "endorsementsUp": [],
        "authorId": "eMd4mc7G4zWX6MDL29cR06ptjVU2",
        "isAnonymous": false,
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1769526354,
            "nanoseconds": 522000000
        },
        "issueSize": "medium",
        "title": "Litter",
        "endorsementsDown": []
    },
    {
        "id": "kFpZCsuOIwKnrn3zZrhC",
        "endorsementsUp": [],
        "aiInsights": {
            "original": {
                "approxSize": "large",
                "summary": "A large amount of mixed waste is present, with animals feeding in the area.",
                "wasteType": "mixed",
                "isGarbageIssue": true,
                "suggestedCategory": "littering",
                "actionSuggestion": "Authorities should arrange for immediate waste collection and implement measures to prevent animals from accessing the area.",
                "additionalContext": "animals feeding",
                "itemsDetected": [
                    "plastic bags",
                    "food waste",
                    "bottles"
                ]
            },
            "confirmationStatus": "user_edited",
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1768040976,
                "nanoseconds": 348000000
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1768040976,
                "nanoseconds": 348000000
            },
            "analysisSource": "openai-vision",
            "userEdited": {
                "summary": "Litter on metro line bay",
                "approxSize": "medium"
            }
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1768040976,
            "nanoseconds": 348000000
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2FkFpZCsuOIwKnrn3zZrhC%2FkFpZCsuOIwKnrn3zZrhC.jpg?alt=media&token=d5edfcc0-2d35-4150-aa18-f142e73b2384"
        ],
        "authorName": "arplut",
        "title": "Litter",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1768040976,
                "nanoseconds": 348000000
            }
        },
        "endorsementsDown": [],
        "location": {
            "city": "Bengaluru",
            "state": "Karnataka",
            "address": "Kanakapura Main Road Bengaluru, Karnataka",
            "coordinates": {
                "latitude": 12.9110896,
                "longitude": 77.5728531,
                "type": "firestore/geoPoint/1.0"
            }
        },
        "category": "littering",
        "endorsementCount": 0,
        "status": "pending",
        "description": "Litter on metro line bay",
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "isAnonymous": false,
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1768040976,
            "nanoseconds": 348000000
        },
        "issueSize": "medium"
    },
    {
        "id": "x3XysOg9sLhdA1biP4NU",
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "endorsementsDown": [],
        "aiInsights": {
            "confirmationStatus": "user_edited",
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1768040473,
                "nanoseconds": 275000000
            },
            "original": {
                "actionSuggestion": "Initiate cleanup and ensure proper waste disposal facilities are available.",
                "additionalContext": "animals feeding",
                "isGarbageIssue": true,
                "wasteType": "mixed",
                "summary": "A large pile of mixed waste with animals scavenging nearby.",
                "itemsDetected": [
                    "plastic bags",
                    "construction debris",
                    "plant debris"
                ],
                "approxSize": "large",
                "suggestedCategory": "littering"
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1768040473,
                "nanoseconds": 275000000
            },
            "userEdited": {
                "suggestedCategory": "open_dump"
            },
            "analysisSource": "openai-vision"
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1768040473,
            "nanoseconds": 275000000
        },
        "authorName": "arplut",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1768040473,
                "nanoseconds": 275000000
            }
        },
        "endorsementCount": 0,
        "status": "pending",
        "endorsementsUp": [],
        "isAnonymous": false,
        "description": "",
        "category": "open_dump",
        "location": {
            "address": "3rd Cross Bengaluru, Karnataka",
            "city": "Bengaluru",
            "coordinates": {
                "latitude": 12.9093108,
                "longitude": 77.5707757,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1768040473,
            "nanoseconds": 275000000
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2Fx3XysOg9sLhdA1biP4NU%2Fx3XysOg9sLhdA1biP4NU.jpg?alt=media&token=fcff5d50-6b59-455a-ad91-f10dcd93cab4"
        ],
        "title": "Open Dump",
        "issueSize": "large"
    },
    {
        "id": "s2fTDggixjBjRFzcH1Dr",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2Ff9MrlFVNO4WAdDcB1fs0FfQO4hq1%2Fs2fTDggixjBjRFzcH1Dr%2Fs2fTDggixjBjRFzcH1Dr.jpg?alt=media&token=25406e6c-cd21-4987-b448-f8f9d06dee6c"
        ],
        "title": "Open Dump",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1767945960,
            "nanoseconds": 731000000
        },
        "endorsementCount": 0,
        "issueSize": "small",
        "endorsementsDown": [],
        "description": "",
        "authorId": "f9MrlFVNO4WAdDcB1fs0FfQO4hq1",
        "category": "open_dump",
        "aiInsights": {
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1767945960,
                "nanoseconds": 731000000
            },
            "analysisSource": "openai-vision",
            "userEdited": {
                "approxSize": "small",
                "suggestedCategory": "open_dump"
            },
            "confirmationStatus": "user_edited",
            "original": {
                "actionSuggestion": "Authorities should arrange for immediate cleanup and implement regular waste management services.",
                "approxSize": "large",
                "isGarbageIssue": true,
                "additionalContext": "open dump",
                "itemsDetected": [
                    "bottles",
                    "plastic bags",
                    "food wrappers",
                    "plant debris",
                    "footwear"
                ],
                "suggestedCategory": "littering",
                "wasteType": "mixed",
                "summary": "The area is heavily littered with various types of waste."
            },
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1767945960,
                "nanoseconds": 731000000
            }
        },
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1767945960,
                "nanoseconds": 731000000
            }
        },
        "authorName": "Anonymous",
        "status": "pending",
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1767945960,
            "nanoseconds": 731000000
        },
        "isAnonymous": true,
        "endorsementsUp": [],
        "location": {
            "address": "10th Cross Road Bengaluru, Karnataka",
            "coordinates": {
                "latitude": 12.9976002,
                "longitude": 77.5447018,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka",
            "city": "Bengaluru"
        }
    },
    {
        "id": "NOsQqtDmgrhZ635BEZcS",
        "authorName": "Anonymous",
        "isAnonymous": false,
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765705848,
            "nanoseconds": 511000000
        },
        "endorsementCount": 0,
        "authorId": "WnSbMrKjhoRCMM6jkxw9XbO0KDE2",
        "endorsementsDown": [],
        "aiInsights": {
            "confirmationStatus": "accepted",
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765705848,
                "nanoseconds": 511000000
            },
            "original": {
                "isGarbageIssue": true,
                "summary": "A large amount of mixed waste is present, creating an open dump situation.",
                "itemsDetected": [
                    "plastic bags",
                    "food wrappers",
                    "paper debris"
                ],
                "wasteType": "mixed",
                "approxSize": "large",
                "actionSuggestion": "Authorities should arrange for immediate cleanup and regular waste collection.",
                "suggestedCategory": "littering",
                "additionalContext": "open dump"
            },
            "analysisSource": "openai-vision",
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765705848,
                "nanoseconds": 511000000
            }
        },
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765705848,
                "nanoseconds": 511000000
            }
        },
        "issueSize": "large",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FWnSbMrKjhoRCMM6jkxw9XbO0KDE2%2FNOsQqtDmgrhZ635BEZcS%2FNOsQqtDmgrhZ635BEZcS.jpg?alt=media&token=3f6addcc-8a68-4f9d-91f4-28fc7e605e04"
        ],
        "location": {
            "address": "Bengaluru, Karnataka",
            "city": "Bengaluru",
            "coordinates": {
                "latitude": 12.96602,
                "longitude": 77.6695983,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka"
        },
        "category": "littering",
        "endorsementsUp": [],
        "title": "Litter",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765705848,
            "nanoseconds": 511000000
        },
        "description": "A large amount of mixed waste is present, creating an open dump situation.",
        "status": "pending"
    },
    {
        "id": "kELSSsR6AjUosnydsbBS",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765113230,
                "nanoseconds": 110000000
            }
        },
        "authorName": "arplut",
        "description": "Open burning of uncollected garbage. Sunday evening. ",
        "title": "Open Burning",
        "issueSize": "medium",
        "status": "pending",
        "endorsementCount": 0,
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765113230,
            "nanoseconds": 110000000
        },
        "category": "open_burning",
        "endorsementsDown": [],
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "isAnonymous": false,
        "aiInsights": {
            "analysisSource": "openai-vision",
            "userEdited": {
                "suggestedCategory": "littering",
                "summary": "There is a medium-sized mixed waste issue with open burning occurring."
            },
            "confirmationStatus": "user_edited",
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765113230,
                "nanoseconds": 110000000
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765113230,
                "nanoseconds": 110000000
            },
            "original": {
                "itemsDetected": [
                    "plant debris",
                    "construction debris"
                ],
                "additionalContext": "open burning detected",
                "wasteType": "mixed",
                "suggestedCategory": "littering",
                "isGarbageIssue": true,
                "approxSize": "medium",
                "summary": "There is a medium-sized mixed waste issue with open burning occurring.",
                "actionSuggestion": "Authorities should address the open burning and clean up the waste."
            }
        },
        "endorsementsUp": [],
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2FkELSSsR6AjUosnydsbBS%2FkELSSsR6AjUosnydsbBS.jpg?alt=media&token=6fff3a97-dfe4-4d89-863c-3922b4d88e54"
        ],
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765113230,
            "nanoseconds": 110000000
        },
        "location": {
            "coordinates": {
                "latitude": 12.9836438,
                "longitude": 77.5459696,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka",
            "address": "Bengaluru, Karnataka",
            "city": "Bengaluru"
        }
    },
    {
        "id": "194RfeuphFwD7b5sM2wP",
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765025634,
            "nanoseconds": 282000000
        },
        "isAnonymous": false,
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.9064198,
                "longitude": 77.5882667,
                "type": "firestore/geoPoint/1.0"
            },
            "address": "Outer Ring Road Bengaluru, Karnataka",
            "state": "Karnataka",
            "city": "Bengaluru"
        },
        "endorsementsDown": [],
        "endorsementCount": 0,
        "aiInsights": {
            "userEdited": {
                "summary": "A medium-sized mixed waste dump is present on the roadside.",
                "approxSize": "medium"
            },
            "confirmationStatus": "user_edited",
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765025634,
                "nanoseconds": 282000000
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765025634,
                "nanoseconds": 282000000
            },
            "original": {
                "approxSize": "medium",
                "actionSuggestion": "Authorities should arrange for immediate cleanup and regular waste collection.",
                "summary": "A medium-sized mixed waste dump is present on the roadside.",
                "wasteType": "mixed",
                "itemsDetected": [
                    "plastic bags",
                    "bottles",
                    "plant debris",
                    "food wrappers"
                ],
                "isGarbageIssue": true,
                "suggestedCategory": "littering",
                "additionalContext": "open dump"
            },
            "analysisSource": "openai-vision"
        },
        "description": "",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765025634,
            "nanoseconds": 282000000
        },
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "authorName": "arplut",
        "endorsementsUp": [],
        "issueSize": "small",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2F194RfeuphFwD7b5sM2wP%2F194RfeuphFwD7b5sM2wP.jpg?alt=media&token=b3275d31-69c7-4c90-934c-08f29981c4a0"
        ],
        "title": "Litter",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1765025634,
                "nanoseconds": 282000000
            }
        },
        "category": "littering"
    },
    {
        "id": "AgRzKStIN7SKEWeF08g7",
        "status": "pending",
        "location": {
            "city": "Bengaluru",
            "coordinates": {
                "latitude": 12.9926429,
                "longitude": 77.5407539,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka",
            "address": "9th Main Road Bengaluru, Karnataka"
        },
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964714,
                "nanoseconds": 467000000
            }
        },
        "title": "Other",
        "endorsementsUp": [
            "Pubmopb051NjGMLcvUm251QC4ci2"
        ],
        "category": "other",
        "authorId": "f9MrlFVNO4WAdDcB1fs0FfQO4hq1",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763964714,
            "nanoseconds": 467000000
        },
        "aiInsights": {
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964714,
                "nanoseconds": 467000000
            },
            "analysisSource": "openai-vision",
            "original": {
                "wasteType": "mixed",
                "actionSuggestion": "Authorities should arrange for waste collection and cleanup.",
                "itemsDetected": [
                    "plastic bags",
                    "plant debris",
                    "paper"
                ],
                "suggestedCategory": "littering",
                "approxSize": "medium",
                "additionalContext": "open dump",
                "summary": "There is a medium-sized mixed waste issue behind a parked vehicle.",
                "isGarbageIssue": true
            },
            "confirmationStatus": "user_edited",
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964714,
                "nanoseconds": 467000000
            },
            "userEdited": {
                "suggestedCategory": "littering",
                "summary": "There is a medium-sized mixed waste issue behind a parked vehicle."
            }
        },
        "description": "Abandoned vehicle rusting away",
        "authorName": "Anonymous",
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765776074,
            "nanoseconds": 0
        },
        "isAnonymous": false,
        "endorsementCount": 1,
        "endorsementsDown": [],
        "issueSize": "medium",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2Ff9MrlFVNO4WAdDcB1fs0FfQO4hq1%2FAgRzKStIN7SKEWeF08g7%2FAgRzKStIN7SKEWeF08g7.jpg?alt=media&token=e3fea43f-66d9-44b3-bd9c-2a2e5964a83e"
        ]
    },
    {
        "id": "9wPOXXQZprfaz9cjgwuW",
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "location": {
            "city": "Bengaluru",
            "address": "9th Main Road Bengaluru, Karnataka",
            "state": "Karnataka",
            "coordinates": {
                "latitude": 12.9922632,
                "longitude": 77.5412887,
                "type": "firestore/geoPoint/1.0"
            }
        },
        "endorsementCount": 1,
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763964582,
            "nanoseconds": 409000000
        },
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964582,
                "nanoseconds": 409000000
            }
        },
        "category": "littering",
        "aiInsights": {
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964582,
                "nanoseconds": 409000000
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964582,
                "nanoseconds": 409000000
            },
            "original": {
                "actionSuggestion": "Authorities should organize a cleanup operation and implement regular waste management in the area.",
                "isGarbageIssue": true,
                "suggestedCategory": "littering",
                "approxSize": "large",
                "summary": "The area is heavily littered with mixed waste, including construction debris and plastic.",
                "itemsDetected": [
                    "plastic bags",
                    "construction debris",
                    "plant debris"
                ],
                "wasteType": "mixed",
                "additionalContext": "open dump"
            },
            "userEdited": {
                "summary": "The area is heavily littered with mixed waste, including construction debris and plastic."
            },
            "analysisSource": "openai-vision",
            "confirmationStatus": "user_edited"
        },
        "authorName": "arplut",
        "status": "pending",
        "endorsementsDown": [],
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763964767,
            "nanoseconds": 681000000
        },
        "description": "Empty plot, lot of mixed garbage, foul smell",
        "issueSize": "large",
        "isAnonymous": false,
        "endorsementsUp": [
            "f9MrlFVNO4WAdDcB1fs0FfQO4hq1"
        ],
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2F9wPOXXQZprfaz9cjgwuW%2F9wPOXXQZprfaz9cjgwuW.jpg?alt=media&token=de4d764f-d19c-4b1b-bfd0-233655b67611"
        ],
        "title": "Litter"
    },
    {
        "id": "Md2kVn0WmKEus3pMcg0y",
        "authorName": "arplut",
        "isAnonymous": false,
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763964774,
            "nanoseconds": 844000000
        },
        "endorsementCount": 1,
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "endorsementsDown": [],
        "aiInsights": {
            "confirmationStatus": "user_edited",
            "analysisSource": "openai-vision",
            "original": {
                "summary": "A large pile of construction debris and plastic waste has been dumped in the area.",
                "actionSuggestion": "Authorities should arrange for the cleanup and implement measures to prevent illegal dumping.",
                "additionalContext": "open dump",
                "suggestedCategory": "construction_debris",
                "wasteType": "construction",
                "approxSize": "large",
                "itemsDetected": [
                    "plastic bags",
                    "papers",
                    "construction debris"
                ],
                "isGarbageIssue": true
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964453,
                "nanoseconds": 912000000
            },
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964453,
                "nanoseconds": 912000000
            },
            "userEdited": {
                "approxSize": "large",
                "summary": "A large pile of construction debris and plastic waste has been dumped in the area."
            }
        },
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763964453,
                "nanoseconds": 912000000
            }
        },
        "issueSize": "medium",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2FMd2kVn0WmKEus3pMcg0y%2FMd2kVn0WmKEus3pMcg0y.jpg?alt=media&token=835e7cfc-4651-4733-9b48-91fb5b483add"
        ],
        "location": {
            "state": "Karnataka",
            "city": "Bengaluru",
            "coordinates": {
                "latitude": 12.992217,
                "longitude": 77.540803,
                "type": "firestore/geoPoint/1.0"
            },
            "address": "2nd D Cross Road Bengaluru, Karnataka"
        },
        "category": "construction_debris",
        "endorsementsUp": [
            "f9MrlFVNO4WAdDcB1fs0FfQO4hq1"
        ],
        "title": "Construction Debris",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763964453,
            "nanoseconds": 912000000
        },
        "description": "",
        "status": "pending"
    },
    {
        "id": "3EVD92VKvJ1Z8ocbNGxO",
        "location": {
            "city": "Bengaluru",
            "address": "Bengaluru, Karnataka",
            "coordinates": {
                "latitude": 12.99074,
                "longitude": 77.5395614,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka"
        },
        "status": "pending",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2F3EVD92VKvJ1Z8ocbNGxO%2F3EVD92VKvJ1Z8ocbNGxO.jpg?alt=media&token=102be665-6ccc-4f4a-9174-77f1a02606d1"
        ],
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "title": "Litter",
        "issueSize": "medium",
        "authorName": "arplut",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763963719,
                "nanoseconds": 919000000
            }
        },
        "endorsementsUp": [
            "pydfqUlTw6POAGo1fFazOV05LHo1",
            "khM2i4nKAbTqsbHO0U7A9icqmUo2"
        ],
        "endorsementCount": 2,
        "endorsementsDown": [],
        "aiInsights": {
            "confirmationStatus": "user_edited",
            "userEdited": {
                "summary": "The area is littered with mixed waste including paper and debris, with signs of open burning."
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763963719,
                "nanoseconds": 919000000
            },
            "analysisSource": "openai-vision",
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763963719,
                "nanoseconds": 919000000
            },
            "original": {
                "actionSuggestion": "Authorities should arrange for waste collection and address the open burning issue.",
                "summary": "The area is littered with mixed waste including paper and debris, with signs of open burning.",
                "suggestedCategory": "littering",
                "approxSize": "medium",
                "itemsDetected": [
                    "paper",
                    "rocks",
                    "plant debris"
                ],
                "additionalContext": "open burning detected",
                "wasteType": "mixed",
                "isGarbageIssue": true
            }
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1764326874,
            "nanoseconds": 477000000
        },
        "description": "",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763963719,
            "nanoseconds": 919000000
        },
        "isAnonymous": false,
        "category": "littering"
    },
    {
        "id": "kFCfmLPkpShnIfBmLnb0",
        "endorsementsUp": [
            "f9MrlFVNO4WAdDcB1fs0FfQO4hq1"
        ],
        "category": "littering",
        "endorsementsDown": [],
        "endorsementCount": 1,
        "title": "Litter",
        "isAnonymous": false,
        "issueSize": "small",
        "aiInsights": {
            "analysisSource": "openai-vision",
            "confirmationStatus": "user_edited",
            "original": {
                "summary": "A large amount of mixed waste is present in the area.",
                "itemsDetected": [
                    "plastic wrappers",
                    "paper",
                    "food containers"
                ],
                "wasteType": "mixed",
                "isGarbageIssue": true,
                "suggestedCategory": "littering",
                "approxSize": "large",
                "additionalContext": "open dump",
                "actionSuggestion": "Schedule a cleanup of the area to remove the waste."
            },
            "userEdited": {
                "approxSize": "large",
                "summary": "A large amount of mixed waste is present in the area."
            },
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763962682,
                "nanoseconds": 286000000
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763962682,
                "nanoseconds": 286000000
            }
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2FkFCfmLPkpShnIfBmLnb0%2FkFCfmLPkpShnIfBmLnb0.jpg?alt=media&token=a7defe4d-8469-4f32-855c-97ed513c772c"
        ],
        "location": {
            "city": "Bengaluru",
            "address": "2nd A Cross Road Bengaluru, Karnataka",
            "coordinates": {
                "latitude": 12.9902177,
                "longitude": 77.5392795,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka"
        },
        "authorName": "arplut",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763962682,
                "nanoseconds": 286000000
            }
        },
        "status": "pending",
        "description": "",
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763962836,
            "nanoseconds": 590000000
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763962682,
            "nanoseconds": 286000000
        },
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2"
    },
    {
        "id": "gMtys0rG10VlsYQddu38",
        "endorsementsUp": [
            "pydfqUlTw6POAGo1fFazOV05LHo1",
            "khM2i4nKAbTqsbHO0U7A9icqmUo2"
        ],
        "authorName": "Anonymous",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763962419,
            "nanoseconds": 306000000
        },
        "aiInsights": {
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763962419,
                "nanoseconds": 306000000
            },
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763962419,
                "nanoseconds": 306000000
            },
            "analysisSource": "openai-vision",
            "original": {
                "additionalContext": "open dump",
                "isGarbageIssue": true,
                "suggestedCategory": "littering",
                "wasteType": "mixed",
                "itemsDetected": [
                    "plastic wrappers",
                    "paper",
                    "small debris"
                ],
                "actionSuggestion": "Schedule a cleanup of the area to remove the accumulated waste.",
                "summary": "The area is littered with mixed waste, including plastic and paper debris.",
                "approxSize": "medium"
            },
            "userEdited": {
                "summary": "The area is littered with mixed waste, including plastic and paper debris."
            },
            "confirmationStatus": "user_edited"
        },
        "authorId": "f9MrlFVNO4WAdDcB1fs0FfQO4hq1",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763962419,
                "nanoseconds": 306000000
            }
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765776077,
            "nanoseconds": 993000000
        },
        "endorsementsDown": [],
        "isAnonymous": false,
        "location": {
            "address": "2nd B Cross Road Bengaluru, Karnataka",
            "coordinates": {
                "latitude": 12.9906374,
                "longitude": 77.5393561,
                "type": "firestore/geoPoint/1.0"
            },
            "city": "Bengaluru",
            "state": "Karnataka"
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2Ff9MrlFVNO4WAdDcB1fs0FfQO4hq1%2FgMtys0rG10VlsYQddu38%2FgMtys0rG10VlsYQddu38.jpg?alt=media&token=97cc98fa-d6a3-49f3-8329-ee0238983722"
        ],
        "status": "verified",
        "description": "",
        "endorsementCount": 2,
        "issueSize": "medium",
        "title": "Litter",
        "category": "littering"
    },
    {
        "id": "DSuqyqEy8EsarXV1QNhM",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763438394,
                "nanoseconds": 319000000
            }
        },
        "endorsementsUp": [],
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763438394,
            "nanoseconds": 319000000
        },
        "endorsementCount": 0,
        "location": {
            "coordinates": {
                "latitude": 12.9863152,
                "longitude": 77.5410486,
                "type": "firestore/geoPoint/1.0"
            },
            "city": "Bengaluru",
            "state": "Karnataka",
            "address": "Bengaluru, Karnataka"
        },
        "title": "Open Dump",
        "category": "open_dump",
        "status": "resolved",
        "aiInsights": {
            "final": {
                "wasteType": "mixed",
                "summary": "There is a large accumulation of mixed waste including plastic bags and bottles.",
                "suggestedCategory": "open_dump",
                "approxSize": "large",
                "actionSuggestion": "Schedule a waste collection and cleanup of the area.",
                "additionalContext": "open dump",
                "itemsDetected": [
                    "plastic bags",
                    "bottles",
                    "food wrappers"
                ],
                "isGarbageIssue": true
            },
            "updatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763438394,
                "nanoseconds": 319000000
            },
            "analysisSource": "openai-vision",
            "generatedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1763438394,
                "nanoseconds": 319000000
            },
            "confirmationStatus": "user_edited",
            "original": {
                "suggestedCategory": "littering",
                "itemsDetected": [
                    "plastic bags",
                    "bottles",
                    "food wrappers"
                ],
                "actionSuggestion": "Schedule a waste collection and cleanup of the area.",
                "summary": "There is a large accumulation of mixed waste including plastic bags and bottles.",
                "wasteType": "mixed",
                "additionalContext": "open dump",
                "approxSize": "large",
                "isGarbageIssue": true
            },
            "userEdited": {
                "suggestedCategory": "open_dump"
            }
        },
        "authorName": "Anonymous",
        "issueSize": "large",
        "isAnonymous": false,
        "authorId": "f9MrlFVNO4WAdDcB1fs0FfQO4hq1",
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1765361392,
            "nanoseconds": 944000000
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2Ff9MrlFVNO4WAdDcB1fs0FfQO4hq1%2FDSuqyqEy8EsarXV1QNhM%2FDSuqyqEy8EsarXV1QNhM.jpg?alt=media&token=4f746f51-aa35-4ef7-a7c1-7438a0d78816"
        ],
        "description": "",
        "endorsementsDown": []
    },
    {
        "id": "4Cz24BAKBw3Xay2MMm2U",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1761914660,
            "nanoseconds": 713000000
        },
        "title": "Construction Debris",
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1761309860,
                "nanoseconds": 564000000
            }
        },
        "isAnonymous": false,
        "endorsementsDown": [],
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1761309860,
            "nanoseconds": 564000000
        },
        "endorsementsUp": [],
        "authorName": "arplut",
        "category": "construction_debris",
        "endorsementCount": 0,
        "status": "pending",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2F4Cz24BAKBw3Xay2MMm2U%2F4Cz24BAKBw3Xay2MMm2U.jpg?alt=media&token=2da9986a-5849-48b1-9c63-b37aa29bc881"
        ],
        "description": "",
        "location": {
            "state": "Karnataka",
            "coordinates": {
                "latitude": 12.9849474,
                "longitude": 77.543615,
                "type": "firestore/geoPoint/1.0"
            },
            "address": "Thimmaiah Road Bengaluru, Karnataka",
            "city": "Bengaluru"
        }
    },
    {
        "id": "nnAA74Orikkva811hWhe",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2FnnAA74Orikkva811hWhe%2FnnAA74Orikkva811hWhe.jpg?alt=media&token=0d161cc7-e0df-4ef4-af13-b9f4b7c7eb23"
        ],
        "title": "Plant Waste",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1761911779,
            "nanoseconds": 788000000
        },
        "endorsementCount": 0,
        "endorsementsDown": [],
        "description": "Ambedkar Stadium, lot of litter and uncollected plant waste in back corner of the park",
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "category": "plant_waste",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1761306979,
                "nanoseconds": 721000000
            }
        },
        "authorName": "arplut",
        "status": "pending",
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1761306979,
            "nanoseconds": 721000000
        },
        "isAnonymous": false,
        "endorsementsUp": [],
        "location": {
            "coordinates": {
                "latitude": 12.9833235,
                "longitude": 77.5432205,
                "type": "firestore/geoPoint/1.0"
            },
            "state": "Karnataka",
            "address": "8th A Main Road Bengaluru, Karnataka",
            "city": "Bengaluru"
        }
    },
    {
        "id": "vWQTFzNxfQVAQr90ZavD",
        "endorsementCount": 0,
        "status": "pending",
        "location": {
            "city": "Bengaluru",
            "state": "Karnataka",
            "coordinates": {
                "latitude": 12.9830392,
                "longitude": 77.5439366,
                "type": "firestore/geoPoint/1.0"
            },
            "address": "Bengaluru, Karnataka"
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1761306847,
            "nanoseconds": 339000000
        },
        "endorsementsDown": [],
        "authorId": "Pubmopb051NjGMLcvUm251QC4ci2",
        "title": "Open Dump",
        "category": "open_dump",
        "authorName": "arplut",
        "endorsementsUp": [],
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1761306847,
                "nanoseconds": 339000000
            }
        },
        "description": "",
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1761911647,
            "nanoseconds": 875000000
        },
        "isAnonymous": false,
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FPubmopb051NjGMLcvUm251QC4ci2%2FvWQTFzNxfQVAQr90ZavD%2FvWQTFzNxfQVAQr90ZavD.jpg?alt=media&token=60e8b2f0-d51b-43cb-9643-ed8f89844051"
        ]
    },
    {
        "id": "tnLrEBtDLTSpyMr7ummJ",
        "endorsementsUp": [],
        "endorsementsDown": [],
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1759827508,
            "nanoseconds": 812000000
        },
        "location": {
            "city": "Bengaluru",
            "coordinates": {
                "latitude": 12.997343110155938,
                "longitude": 77.5410789437592,
                "type": "firestore/geoPoint/1.0"
            },
            "address": "",
            "state": "Karnataka"
        },
        "category": "littering",
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1759827032,
                "nanoseconds": 525000000
            }
        },
        "authorName": "arplut",
        "description": "Street corner, litter and garbage.",
        "authorId": "pSvdMPWh29cGxu3Mq1WCbVTMjh63",
        "status": "pending",
        "title": "Litter",
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/geodha-web.firebasestorage.app/o/reports%2FpSvdMPWh29cGxu3Mq1WCbVTMjh63%2FtnLrEBtDLTSpyMr7ummJ%2FtnLrEBtDLTSpyMr7ummJ.jpg?alt=media&token=f7b41591-3eba-4d29-a0cc-2959f55986c3"
        ],
        "isAnonymous": false,
        "endorsementCount": 0,
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1759827032,
            "nanoseconds": 525000000
        }
    },
    {
        "id": "4Q0QUygXtx17Xxeqb21D",
        "title": "Park; no dustbin visible",
        "description": "Park; no dustbin visible",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.990650875105773,
                "longitude": 77.53938680514693
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/4Q0QUygXtx17Xxeqb21D/lat 12.990650875105773 long 77.53938680514693 1756010119609.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1756010119,
                "nanoseconds": 609000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1756010119,
            "nanoseconds": 609000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1763962480,
            "nanoseconds": 553000000
        }
    },
    {
        "id": "pCQ0mBMuMF1LX45bvmpb",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.886018118918896,
                "longitude": 77.5562515296042
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/pCQ0mBMuMF1LX45bvmpb/lat 12.886018118918896 long 77.5562515296042 1749871409720.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1749871409,
                "nanoseconds": 720000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1749871409,
            "nanoseconds": 720000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 224000000
        }
    },
    {
        "id": "02U8ZD8AgY9GKQIPb5hn",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.88502846785623,
                "longitude": 77.55351735278964
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/02U8ZD8AgY9GKQIPb5hn/lat 12.88502846785623 long 77.55351735278964 1749870333106.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1749870333,
                "nanoseconds": 106000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1749870333,
            "nanoseconds": 106000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693163,
            "nanoseconds": 706000000
        }
    },
    {
        "id": "79oB43VDshuADbEvpQF4",
        "title": "Blackspot",
        "description": "Blackspot",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.984468091039652,
                "longitude": 77.55500698462129
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/79oB43VDshuADbEvpQF4/lat 12.984468091039652 long 77.55500698462129 1747472716116.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1747472716,
                "nanoseconds": 116000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1747472716,
            "nanoseconds": 116000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 277000000
        }
    },
    {
        "id": "gG9gtHYDRcnWLdKhoTU2",
        "title": "Blackspot",
        "description": "Blackspot",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.9725656730065,
                "longitude": 77.60798027738929
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/gG9gtHYDRcnWLdKhoTU2/lat 12.9725656730065 long 77.60798027738929 1747407897481.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1747407897,
                "nanoseconds": 481000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1747407897,
            "nanoseconds": 481000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 554000000
        }
    },
    {
        "id": "2iaoUwm7cDsBy6Z6OzW9",
        "title": "Many blackspots along this road.",
        "description": "Many blackspots along this road.",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.978049265869831,
                "longitude": 77.544981893152
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/2iaoUwm7cDsBy6Z6OzW9/lat 12.978049265869831 long 77.544981893152 1747401828952.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1747401828,
                "nanoseconds": 952000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1747401828,
            "nanoseconds": 952000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693163,
            "nanoseconds": 881000000
        }
    },
    {
        "id": "i07Vyg2oYZHajdh0VNZP",
        "title": "Garbage dump and burning",
        "description": "Garbage dump and burning",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.883697597098202,
                "longitude": 77.55426367744803
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/i07Vyg2oYZHajdh0VNZP/lat 12.883697597098202 long 77.55426367744803 1747326406101.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1747326406,
                "nanoseconds": 101000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1747326406,
            "nanoseconds": 101000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 648000000
        }
    },
    {
        "id": "5WW9sPmRrnkl7HaWnA2g",
        "title": "Small garbage dump",
        "description": "Small garbage dump",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.973756888615286,
                "longitude": 77.60446356609464
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/5WW9sPmRrnkl7HaWnA2g/lat 12.973756888615286 long 77.60446356609464 1746344686760.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1746344686,
                "nanoseconds": 760000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1746344686,
            "nanoseconds": 760000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 73000000
        }
    },
    {
        "id": "oPi8GIvM5zXioICF2Jup",
        "title": "Uncollected waste",
        "description": "Uncollected waste",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.973752640999056,
                "longitude": 77.60657144710422
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/oPi8GIvM5zXioICF2Jup/lat 12.973752640999056 long 77.60657144710422 1746344166387.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1746344166,
                "nanoseconds": 387000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1746344166,
            "nanoseconds": 387000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 122000000
        }
    },
    {
        "id": "7HJIvKidVAZAVXIE0OEx",
        "title": "Solid waste and littering",
        "description": "Solid waste and littering",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.960471525137638,
                "longitude": 77.53290893509984
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/7HJIvKidVAZAVXIE0OEx/lat 12.960471525137638 long 77.53290893509984 1745903117126.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745903117,
                "nanoseconds": 126000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745903117,
            "nanoseconds": 126000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 380000000
        }
    },
    {
        "id": "sSpPdLkjRofYLZfYuSxO",
        "title": "Household solid waste, tree branches",
        "description": "Household solid waste, tree branches",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.960002333420979,
                "longitude": 77.5324392132461
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/sSpPdLkjRofYLZfYuSxO/lat 12.960002333420979 long 77.5324392132461 1745903058716.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745903058,
                "nanoseconds": 716000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745903058,
            "nanoseconds": 716000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 532000000
        }
    },
    {
        "id": "Hj34TofTerjXwoqZ1xlD",
        "title": "\"A dumping spot in the neighborhood. It used to...",
        "description": "\"A dumping spot in the neighborhood. It used to be green but now has garbage, construction waste, and burnt trash.\n\nHave reported it on the BBMP app a few times — no action yet. Waste collection is irregular and some locals mention bribes. Would love to do a cleanup drive but unsure about disposal.\"",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 13.049125386297561,
                "longitude": 77.57391421124339
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/Hj34TofTerjXwoqZ1xlD/lat 13.049125386297561 long 77.57391421124339 1745254428354.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745254428,
                "nanoseconds": 354000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745254428,
            "nanoseconds": 354000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 793000000
        }
    },
    {
        "id": "ffPZ7lsaHIVZEQqA2giz",
        "title": "Major underdeveloped area with lot of garbage.",
        "description": "Major underdeveloped area with lot of garbage.",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.936770696489052,
                "longitude": 77.53387486562133
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/ffPZ7lsaHIVZEQqA2giz/lat 12.936770696489052 long 77.53387486562133 1745144400594.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745144400,
                "nanoseconds": 594000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745144400,
            "nanoseconds": 594000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 506000000
        }
    },
    {
        "id": "tzhDgCeUf4QZWtAq7TH1",
        "title": "Lot of garbage accumulated along this road stretch",
        "description": "Lot of garbage accumulated along this road stretch",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 13.007415988006965,
                "longitude": 77.52656349912286
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/tzhDgCeUf4QZWtAq7TH1/lat 13.007415988006965 long 77.52656349912286 1745081777381.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745081777,
                "nanoseconds": 381000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745081777,
            "nanoseconds": 381000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 632000000
        }
    },
    {
        "id": "Oluq7ExTTFPaT426zEQF",
        "title": "Street corner. Lot of waste accumulated near pu...",
        "description": "Street corner. Lot of waste accumulated near public toilet.",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 13.004698706391927,
                "longitude": 77.54102161154151
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/Oluq7ExTTFPaT426zEQF/lat 13.004698706391927 long 77.54102161154151 1745081668799.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745081668,
                "nanoseconds": 799000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745081668,
            "nanoseconds": 799000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 993000000
        }
    },
    {
        "id": "PbifoWyVpEGBfxRPulN8",
        "title": "Littered dumping ground. Near garbage trucks pa...",
        "description": "Littered dumping ground. Near garbage trucks parking area (roadside). Lot of litter along the park as well.",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.99948031538544,
                "longitude": 77.52955684438348
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/PbifoWyVpEGBfxRPulN8/lat 12.99948031538544 long 77.52955684438348 1745080151567.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745080151,
                "nanoseconds": 567000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745080151,
            "nanoseconds": 567000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 98000000
        }
    },
    {
        "id": "PkNDMarmgC3B5awIahZ8",
        "title": "Disposal of garbage by houses and apartments al...",
        "description": "Disposal of garbage by houses and apartments along Rajakaluve. \nThey have made this storm water drain a sewage line by letting their houses sewage water. \nThey throw all their garbage into the rajakaluve and this image only shows the garbage that crossed over and fell to the other side",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.880518776133592,
                "longitude": 77.56530733779073
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/PkNDMarmgC3B5awIahZ8/lat 12.880518776133592 long 77.56530733779073 1745068684676.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745068684,
                "nanoseconds": 676000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745068684,
            "nanoseconds": 676000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 199000000
        }
    },
    {
        "id": "5lI0uX5gMlTECB830PlH",
        "title": "Throwing garbage by apartments in 2nd A cross d...",
        "description": "Throwing garbage by apartments in 2nd A cross doctors colony. They continue to throw even after multiple BBMP complaints.\nThey burn the garbage once in a while | Apartment throws waste in empty plot. Occassionally lights the garbage on fire",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.880217429851406,
                "longitude": 77.56527112796903
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/5lI0uX5gMlTECB830PlH/lat 12.880217429851406 long 77.56527112796903 1745068367256.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745068367,
                "nanoseconds": 256000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745068367,
            "nanoseconds": 256000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 177000000
        }
    },
    {
        "id": "etku9pFZ2hUeEwCXRifc",
        "title": "Garbage dump and buring.\nThey burn huge amounts...",
        "description": "Garbage dump and buring.\nThey burn huge amounts of garbage here everyday making it difficult for all the houses in Konanakunte area. \nThis is opposite to Konanakunte lake",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.88026874277476,
                "longitude": 77.56099032238126
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/etku9pFZ2hUeEwCXRifc/lat 12.88026874277476 long 77.56099032238126 1745067708665.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1745067708,
                "nanoseconds": 665000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1745067708,
            "nanoseconds": 665000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 406000000
        }
    },
    {
        "id": "rvuHEs6ey5wsttczuiMq",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "pending",
        "location": {
            "coordinates": {
                "latitude": 12.990286602047753,
                "longitude": 77.5374093465507
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/rvuHEs6ey5wsttczuiMq/lat 12.990286602047753 long 77.5374093465507 1743684956936.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1743684956,
                "nanoseconds": 942000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1743684956,
            "nanoseconds": 942000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 430000000
        }
    },
    {
        "id": "jPD7F5FOZGKWQdQSsTwo",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.991095834280788,
                "longitude": 77.54155503585935
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/jPD7F5FOZGKWQdQSsTwo/lat 12.991095834280788 long 77.54155503585935 1729996359862.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1729996359,
                "nanoseconds": 866000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1729996359,
            "nanoseconds": 866000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 750000000
        }
    },
    {
        "id": "uGUEC3yhBt2pnRerWk2Y",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.986351527925004,
                "longitude": 77.54091432318091
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/uGUEC3yhBt2pnRerWk2Y/lat 12.986351527925004 long 77.54091432318091 1728106995860.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1728106848,
                "nanoseconds": 558000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1728106848,
            "nanoseconds": 558000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 738000000
        }
    },
    {
        "id": "zwSC4RKneFdlJUB7yC1u",
        "title": "Construction Debris",
        "description": "Construction Debris",
        "category": "other",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.991501590770183,
                "longitude": 77.53827335312963
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/zwSC4RKneFdlJUB7yC1u/lat 12.991501590770183 long 77.53827335312963 1728034705913.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1728034705,
                "nanoseconds": 917000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1728034705,
            "nanoseconds": 917000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693167,
            "nanoseconds": 44000000
        }
    },
    {
        "id": "7KUI5vTWJiIj4bcyIhHh",
        "title": "Report",
        "description": "No description provided",
        "category": "other",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.968516276298402,
                "longitude": 77.63633424416184
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/7KUI5vTWJiIj4bcyIhHh/lat 12.968516276298402 long 77.63633424416184 1727855004745.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1727855004,
                "nanoseconds": 751000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1727855004,
            "nanoseconds": 751000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 482000000
        }
    },
    {
        "id": "zi3jSakZtXHpp5JodioX",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.967020207408149,
                "longitude": 77.63688744977117
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/zi3jSakZtXHpp5JodioX/lat 12.967020207408149 long 77.63688744977117 1727851845351.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1727851845,
                "nanoseconds": 360000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1727851845,
            "nanoseconds": 360000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 941000000
        }
    },
    {
        "id": "KRfvBlV5NlP74GQEJ6ik",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.98975834362668,
                "longitude": 77.54071550443769
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/KRfvBlV5NlP74GQEJ6ik/lat 12.98975834362668 long 77.54071550443769 1727681166419.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1727681166,
                "nanoseconds": 425000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1727681166,
            "nanoseconds": 425000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 908000000
        }
    },
    {
        "id": "bZetNpzFHQ30VHEC3Wpm",
        "title": "General debris collection",
        "description": "General debris collection",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.980829214667367,
                "longitude": 77.6920242793858
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/bZetNpzFHQ30VHEC3Wpm/lat 12.980829214667367 long 77.6920242793858 1710900757061.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1710900757,
                "nanoseconds": 65000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1710900757,
            "nanoseconds": 65000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 303000000
        }
    },
    {
        "id": "jWl2RiXrGPZ65PQpbyO9",
        "title": "Someone dumped construction material",
        "description": "Someone dumped construction material",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.998339859958701,
                "longitude": 77.56663301959634
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/jWl2RiXrGPZ65PQpbyO9/lat 12.998339859958701 long 77.56663301959634 1710641382942.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1710641382,
                "nanoseconds": 944000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1710641382,
            "nanoseconds": 944000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693165,
            "nanoseconds": 857000000
        }
    },
    {
        "id": "B3VhwloAsVhBzxmKxvVP",
        "title": "Small litter",
        "description": "Small litter",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.998375140768786,
                "longitude": 77.56748294457793
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/B3VhwloAsVhBzxmKxvVP/lat 12.998375140768786 long 77.56748294457793 1710641265165.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1710641265,
                "nanoseconds": 171000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1710641265,
            "nanoseconds": 171000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 585000000
        }
    },
    {
        "id": "GpVjA8WoWvQGNAvZbehX",
        "title": "Report",
        "description": "No description provided",
        "category": "other",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 13.002285823935935,
                "longitude": 77.55687916651368
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/GpVjA8WoWvQGNAvZbehX/lat 13.002285823935935 long 77.55687916651368 1709972028311.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1709972028,
                "nanoseconds": 313000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1709972028,
            "nanoseconds": 313000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693164,
            "nanoseconds": 688000000
        }
    },
    {
        "id": "yZxVq8HNUAHIyIKy5mJy",
        "title": "Construction debris ",
        "description": "Construction debris ",
        "category": "other",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 13.00339261299074,
                "longitude": 77.55706893280149
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/yZxVq8HNUAHIyIKy5mJy/lat 13.00339261299074 long 77.55706893280149 1709971939767.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1709971939,
                "nanoseconds": 768000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1709971939,
            "nanoseconds": 768000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 838000000
        }
    },
    {
        "id": "nf5zWWSqBoFyayobH2ls",
        "title": "Report",
        "description": "No description provided",
        "category": "other",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 13.003526580441966,
                "longitude": 77.55673767998815
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/nf5zWWSqBoFyayobH2ls/lat 13.003526580441966 long 77.55673767998815 1709971815503.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1709971815,
                "nanoseconds": 517000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1709971815,
            "nanoseconds": 517000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 18000000
        }
    },
    {
        "id": "pU9KQxuvIsBTxn5x4rz5",
        "title": "Report",
        "description": "No description provided",
        "category": "garbage",
        "status": "archived",
        "location": {
            "coordinates": {
                "latitude": 12.97991966039662,
                "longitude": 77.55262987688184
            }
        },
        "photos": [
            "https://storage.googleapis.com/geodha-web.firebasestorage.app/reports/pU9KQxuvIsBTxn5x4rz5/lat 12.97991966039662 long 77.55262987688184 1709896378584.jpg"
        ],
        "authorId": "migrated-legacy-data",
        "authorName": "geodha-team",
        "isAnonymous": true,
        "endorsements": [],
        "endorsementCount": 0,
        "metadata": {
            "capturedAt": {
                "type": "firestore/timestamp/1.0",
                "seconds": 1709896378,
                "nanoseconds": 597000000
            },
            "deviceInfo": "Legacy Migration"
        },
        "createdAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1709896378,
            "nanoseconds": 597000000
        },
        "updatedAt": {
            "type": "firestore/timestamp/1.0",
            "seconds": 1757693166,
            "nanoseconds": 328000000
        }
    }
]