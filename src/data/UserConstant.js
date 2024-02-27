const users = [
    {
        "id": "1",
        "fullname": "John Doe",
        "image": "https://npex.in/wp-content/uploads/2020/03/profile-avatar-270x340.png",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Subs Norway City A",
        "rera_number": "RERA-98765-PQR",
        "properties": [
            {
                "property_id": "101",
                "property_name": "Luxury Apartment in Downtown",
                "price": "$1,000,000",
                "location": "Downtown, City A",
                "bedrooms": 3,
                "bathrooms": 2,
                "area_sqft": 2000
            },
            {
                "property_id": "102",
                "property_name": "Cozy Family Home",
                "price": "$500,000",
                "location": "Suburb, City A",
                "bedrooms": 4,
                "bathrooms": 3,
                "area_sqft": 2500
            },
        ]
    },
    {
        "id": "2",
        "fullname": "Jane Smith",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTrIEDWeTOAUOABMuPxLDnlTXqq7de299oAB7nlltGthAW7ve0XgXCPj6fUWzu427Cbdk&usqp=CAU",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Suburb, City C",
        "rera_number": "RERA-98765-PQR",
        "properties": [
            {
                "property_id": "201",
                "property_name": "Modern Condo with Ocean View",
                "price": "$750,000",
                "location": "Beachfront, City B",
                "bedrooms": 2,
                "bathrooms": 2,
                "area_sqft": 1500
            },
            {
                "property_id": "202",
                "property_name": "Charming Cottage",
                "price": "$300,000",
                "location": "Countryside, City B",
                "bedrooms": 3,
                "bathrooms": 1,
                "area_sqft": 1200
            },

        ]
    },
    {
        "id": "3",
        "fullname": "Michael Johnson",
        "image": "https://npex.in/wp-content/uploads/2020/03/profile-avatar-270x340.png",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Mohali",
        "rera_number": "RERA-98765-PQR",
        "properties": [
            {
                "property_id": "301",
                "property_name": "Spacious Villa with Garden",
                "price": "$1,200,000",
                "bedrooms": 5,
                "bathrooms": 4,
                "area_sqft": 3500
            },
            {
                "property_id": "302",
                "property_name": "Downtown Loft",
                "price": "$800,000",
                "bedrooms": 2,
                "bathrooms": 2,
                "area_sqft": 1800
            }
        ]
    },
    {
        "id": "4",
        "fullname": "Emily Johnson",
        "image": "https://cdn-icons-png.freepik.com/512/5540/5540337.png",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Mohali",
        "rera_number": "RERA-12345-ABC",
        "properties": [
            {
                "property_id": "401",
                "property_name": "Modern Loft with City View",
                "price": "$900,000",
                "bedrooms": 2,
                "bathrooms": 2,
                "area_sqft": 1600
            },
            {
                "property_id": "402",
                "property_name": "Family-Friendly Townhouse",
                "price": "$600,000",
                "bedrooms": 3,
                "bathrooms": 2,
                "area_sqft": 2000
            }
        ]
    },
    {
        "id": "5",
        "fullname": "William Brown",
        "image": "https://img.freepik.com/premium-vector/businesswoman-avatar-face-portrait-modern-young-business-woman-head-circle-ceo-office-worker-jacket-profile-advisor-expert-girl-flat-vector-illustration-isolated-white-background_633472-1094.jpg?w=360",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Beachfront, City B",
        "rera_number": "RERA-54321-XYZ",
        "properties": [
            {
                "property_id": "501",
                "property_name": "Beach House with Private Pool",
                "price": "$1,500,000",
                "bedrooms": 4,
                "bathrooms": 3,
                "area_sqft": 3000
            },
            {
                "property_id": "502",
                "property_name": "Cosy Beachfront Condo",
                "price": "$700,000",
                "bedrooms": 2,
                "bathrooms": 2,
                "area_sqft": 1200
            }
        ]
    },
    {
        "id": "6",
        "fullname": "Olivia Martinez",
        "image": "https://example.com/olivia-martinez.jpg",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "City Center, City C",
        "rera_number": "RERA-67890-PQR",
        "properties": [
            {
                "property_id": "601",
                "property_name": "Luxury Penthouse with Skyline View",
                "price": "$2,000,000",
                "bedrooms": 3,
                "bathrooms": 4,
                "area_sqft": 2500
            },
            {
                "property_id": "602",
                "property_name": "Modern City Apartment",
                "price": "$900,000",
                "bedrooms": 2,
                "bathrooms": 2,
                "area_sqft": 1800
            }
        ]
    },
    {
        "id": "7",
        "fullname": "Sophia Taylor",
        "image": "https://example.com/sophia-taylor.jpg",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Suburb, City D",
        "rera_number": "RERA-13579-XYZ",
        "properties": [
            {
                "property_id": "701",
                "property_name": "Family-Friendly Home with Garden",
                "price": "$800,000",
                "bedrooms": 4,
                "bathrooms": 3,
                "area_sqft": 2200
            },
            {
                "property_id": "702",
                "property_name": "Charming Cottage in the Woods",
                "price": "$400,000",
                "bedrooms": 3,
                "bathrooms": 2,
                "area_sqft": 1500
            }
        ]
    },
    {
        "id": "8",
        "fullname": "Liam Johnson",
        "image": "https://example.com/liam-johnson.jpg",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Riverside, City E",
        "rera_number": "RERA-24680-ABC",
        "properties": [
            {
                "property_id": "801",
                "property_name": "Riverside Villa with Pool",
                "price": "$1,200,000",
                "bedrooms": 5,
                "bathrooms": 4,
                "area_sqft": 3500
            },
            {
                "property_id": "802",
                "property_name": "Cozy Riverside Cabin",
                "price": "$500,000",
                "bedrooms": 2,
                "bathrooms": 1,
                "area_sqft": 1000
            }
        ]
    },
    {
        "id": "9",
        "fullname": "Emma Wilson",
        "image": "https://example.com/emma-wilson.jpg",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Mountain View, City F",
        "rera_number": "RERA-11223-XYZ",
        "properties": [
            {
                "property_id": "901",
                "property_name": "Mountain Retreat with Stunning Views",
                "price": "$1,800,000",
                "bedrooms": 6,
                "bathrooms": 5,
                "area_sqft": 4000
            },
            {
                "property_id": "902",
                "property_name": "Cozy Mountain Cabin",
                "price": "$600,000",
                "bedrooms": 3,
                "bathrooms": 2,
                "area_sqft": 1800
            }
        ]
    },
    {
        "id": "10",
        "fullname": "James Anderson",
        "image": "https://example.com/james-anderson.jpg",
        "user_location": [
            {
                "coords": {
                    "speed": -1, "longitude": 76.69112317715411,
                    "latitude": 30.71134927265382,
                    "accuracy": 16.965582688710988,
                    "heading": -1,
                    "altitude": 318.2151985168457,
                    "altitudeAccuracy": 7.0764055252075195
                },
                "timestamp": 1709037095653.2131
            }
        ],
        "user_city": "Hillside, City G",
        "rera_number": "RERA-98765-XYZ",
        "properties": [
            {
                "property_id": "1001",
                "property_name": "Hillside Mansion with Panoramic Views",
                "price": "$3,500,000",
                "bedrooms": 7,
                "bathrooms": 6,
                "area_sqft": 6000
            },
            {
                "property_id": "1002",
                "property_name": "Charming Hillside Cottage",
                "price": "$750,000",
                "bedrooms": 2,
                "bathrooms": 1,
                "area_sqft": 1200
            }
        ]
    }

]

export default users;