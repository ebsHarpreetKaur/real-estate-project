const users = [
    {
        "id": "1",
        "fullname": "Ritik Pandey",
        "image": "https://media.istockphoto.com/id/921036010/photo/real-estate-agent-in-global-corporation-is-negotiating-the-deal.jpg?s=612x612&w=0&k=20&c=sSuzMmiwPO2DE4C4m5xItSX3TJOuKCKuMsRTYx5D-Zo=",
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
        "user_city": "Chandigarh",
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
        "fullname": "Vishesh",
        "image": "https://media.istockphoto.com/id/524259493/photo/indian-male-student.jpg?s=612x612&w=0&k=20&c=CKcc7wHKkzYfp4UTjNYXzXszW9R3pd4GP3-34q4gqM4=",
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
        "fullname": "D Rajender Reddy",
        "image": "https://media.istockphoto.com/id/1295213888/photo/senior-man-sitting-at-park-bench.jpg?s=612x612&w=0&k=20&c=WjnoY8IJLsDr7YJNHq28WfkWZ-j2UfQWfPCU58GyEfo=",
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
        "user_city": "Panchkula",
        "rera_number": "5466666",
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
        "fullname": "Kottalam R Nadar",
        "image": "https://media.istockphoto.com/id/1333001232/photo/portrait-of-indian-man-face-outdoors-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Ne-OChwAEFF5U7yxOwUUqA8ELrJ1WCYho4RkW9v360I=",
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
        "fullname": "Chhabra Real Estate",
        "image": "https://media.istockphoto.com/id/1395717976/photo/successful-business-indian-man-and-woman-in-discussion-about-real-estate.jpg?s=612x612&w=0&k=20&c=vkbijVA2FhxBnzBYFDnDiB7DHwGqvZJqytBqHCwobG4=",
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
        "user_city": "Panchkula",
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
        "fullname": "Avadesh Sharma",
        "image": "https://media.istockphoto.com/id/1383918872/photo/old-man-using-mobile-phone-at-park.jpg?s=612x612&w=0&k=20&c=PUVYQ6QbsJZYX2Dw46wsYXungCZaMpenYKlLZOVdFvA=",
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
        "id": "8",
        "fullname": "Gaurav Sood",
        "image": "https://media.istockphoto.com/id/1281563726/photo/real-estate-agent-with-client-at-village-stock-photo.jpg?s=612x612&w=0&k=20&c=RNAg7vyuW1IKF9kvrhuov4KtPsMg36nXzcjPa-PqKyk=",
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
        "user_city": "Panchkula",
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
        "fullname": "Mohd. Asif",
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
        "user_city": "Mohali",
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
        "fullname": "Anil Kumar Subhashchand Dubey",
        "image": "https://media.istockphoto.com/id/1368412189/photo/cab-driver-receiving-check-from-banker-in-front-of-car-concept-of-car-loan-financial-support.jpg?s=612x612&w=0&k=20&c=BClTNfBsz0mClL-trQuL7foBXLf370sIJZ2rfEXHFkM=",
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