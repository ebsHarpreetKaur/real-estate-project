const users = [
    {
        "id": "1",
        "fullname": "John Doe",
        "image": "https://media.istockphoto.com/id/825082848/photo/smiling-businessman-at-office.jpg?s=612x612&w=0&k=20&c=wJcvBKllY-GIpCi-gCtAB0lHp56dyqK57zaBW0OhGcw=",
        "user_location": [
            {
                "coords": {
                    "speed": -1,
                    "longitude": 76.69112317715411,
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
        "image": "https://media.istockphoto.com/id/1244900905/photo/happy-real-estate-agent-giving-to-a-couple-keys-of-their-new-home.jpg?s=612x612&w=0&k=20&c=HqjdOZzRvLWfjvSYyO_t5fkFnjmiUEQTV10iHk_pUbA=",
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
        "image": "https://media.istockphoto.com/id/1345853667/photo/agent-businessman-with-keys-to-a-new-home-smiling-on-the-background-of-a-new-apartment-house.jpg?s=612x612&w=0&k=20&c=Qly7WGPElJGHxNpl8ENylCwoUweveXMNC0leTdKvrp4=",
        "user_location": [
            {
                "coords": {
                    "speed": -1,
                    "longitude": 76.69112317715411,
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
        "image": "https://media.istockphoto.com/id/1134350144/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=qQkZqY0uI1o7Ih9ZKFsXw5EGX4o-bT0tb0ggJljmp50=",
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
        "image": "https://media.istockphoto.com/id/1388642146/photo/call-center-workers.jpg?s=612x612&w=0&k=20&c=OQ-BhHBcXxYxK2zz4JUQXR6SJ1NucnaVjHWu8ylksNI=",
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
        "image": "https://media.istockphoto.com/id/1362265242/photo/portrait-of-a-smiling-young-businesswoman.jpg?s=612x612&w=0&k=20&c=AvNqcwVLavdf9we0V6UNoFzfm7IPpmB5qCBvT6g6kJg=",
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
        "image": "https://media.istockphoto.com/id/1389993878/photo/happy-real-estate-agent-showing-a-property.jpg?s=612x612&w=0&k=20&c=1td_y6UAaLdj7UB_cYyMmC93x2CHTvMU9ZDqHjxZdy8=",
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
        "image": "https://media.istockphoto.com/id/909675728/photo/businessman.jpg?s=612x612&w=0&k=20&c=AFoV-1P3FanXt4YKc37WsgPIiZvifm90_zDB1ZLVT4c=",
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
        "image": "https://media.istockphoto.com/id/1364269973/photo/call-center-agent-with-headset-working-on-support-hotline-in-modern-office.jpg?s=612x612&w=0&k=20&c=iCblISdZ3DGN1EAo_EUy8bSXuQT9bAJfHAN1H1NsmYQ=",
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
        "image": "https://media.istockphoto.com/id/1056257342/photo/portrait-of-joyful-professional.jpg?s=612x612&w=0&k=20&c=D9H23OM1-heW-xjvmQftBp_YMbZh-n9KFnCb2hE3SHo=",
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