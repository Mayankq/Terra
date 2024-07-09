import random
import json

# Sample data for generation
cities_states = [
    {
        "city": "Mangaluru",
        "state": "Karnataka",
        "latitude": 12.9141,
        "longitude": 74.8560,
        "pincode": 575001,
        "locations": ["Kadri", "Lalbagh", "Balmatta"]
    },
    {
        "city": "Bengaluru",
        "state": "Karnataka",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "pincode": 560001,
        "locations": ["Koramangala", "Indiranagar", "Whitefield"]
    },
    {
        "city": "Mysuru",
        "state": "Karnataka",
        "latitude": 12.2958,
        "longitude": 76.6394,
        "pincode": 570001,
        "locations": ["Chamundi Hill", "Jayalakshmipuram", "Hebbal"]
    },
    {
        "city": "Hubballi",
        "state": "Karnataka",
        "latitude": 15.3647,
        "longitude": 75.1240,
        "pincode": 580001,
        "locations": ["Vidyanagar", "Gokul Road", "Unkal"]
    },
    {
        "city": "Belagavi",
        "state": "Karnataka",
        "latitude": 15.8497,
        "longitude": 74.4977,
        "pincode": 590001,
        "locations": ["Tilakwadi", "Shahapur", "Vadgaon"]
    },
    {
        "city": "Mumbai",
        "state": "Maharashtra",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "pincode": 400001,
        "locations": ["Andheri", "Bandra", "Juhu"]
    },
    {
        "city": "Pune",
        "state": "Maharashtra",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "pincode": 411001,
        "locations": ["Shivajinagar", "Kothrud", "Viman Nagar"]
    },
    {
        "city": "Nagpur",
        "state": "Maharashtra",
        "latitude": 21.1458,
        "longitude": 79.0882,
        "pincode": 440001,
        "locations": ["Dharampeth", "Sitabuldi", "Sadar"]
    },
    {
        "city": "Nashik",
        "state": "Maharashtra",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "pincode": 422001,
        "locations": ["Panchavati", "Deolali", "Nashik Road"]
    },
    {
        "city": "Aurangabad",
        "state": "Maharashtra",
        "latitude": 19.8762,
        "longitude": 75.3433,
        "pincode": 431001,
        "locations": ["Cidco", "Nirala Bazar", "Samarth Nagar"]
    },
    {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "latitude": 13.0827,
        "longitude": 80.2707,
        "pincode": 600001,
        "locations": ["T. Nagar", "Anna Nagar", "Mylapore"]
    },
    {
        "city": "Coimbatore",
        "state": "Tamil Nadu",
        "latitude": 11.0168,
        "longitude": 76.9558,
        "pincode": 641001,
        "locations": ["Gandhipuram", "RS Puram", "Saibaba Colony"]
    },
    {
        "city": "Madurai",
        "state": "Tamil Nadu",
        "latitude": 9.9252,
        "longitude": 78.1198,
        "pincode": 625001,
        "locations": ["Anna Nagar", "KK Nagar", "Simmakkal"]
    },
    {
        "city": "Salem",
        "state": "Tamil Nadu",
        "latitude": 11.6643,
        "longitude": 78.1460,
        "pincode": 636001,
        "locations": ["Fairlands", "Hasthampatti", "Gugai"]
    },
    {
        "city": "Tiruchirappalli",
        "state": "Tamil Nadu",
        "latitude": 10.7905,
        "longitude": 78.7047,
        "pincode": 620001,
        "locations": ["Srirangam", "Thillai Nagar", "K. K. Nagar"]
    },
    {
        "city": "Hyderabad",
        "state": "Telangana",
        "latitude": 17.3850,
        "longitude": 78.4867,
        "pincode": 500001,
        "locations": ["Banjara Hills", "Jubilee Hills", "Secunderabad"]
    },
    {
        "city": "Warangal",
        "state": "Telangana",
        "latitude": 17.9784,
        "longitude": 79.5941,
        "pincode": 506001,
        "locations": ["Hanamkonda", "Kazipet", "Subedari"]
    },
    {
        "city": "Nizamabad",
        "state": "Telangana",
        "latitude": 18.6725,
        "longitude": 78.0941,
        "pincode": 503001,
        "locations": ["Dichpally", "Armoor", "Kamareddy"]
    },
    {
        "city": "Khammam",
        "state": "Telangana",
        "latitude": 17.2473,
        "longitude": 80.1514,
        "pincode": 507001,
        "locations": ["Wyra", "Yellandu", "Palwancha"]
    },
    {
        "city": "Karimnagar",
        "state": "Telangana",
        "latitude": 18.4386,
        "longitude": 79.1288,
        "pincode": 505001,
        "locations": ["Mancherial", "Jagtial", "Peddapalli"]
    },
    {
        "city": "Kolkata",
        "state": "West Bengal",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "pincode": 700001,
        "locations": ["Salt Lake", "New Town", "Park Street"]
    },
    {
        "city": "Howrah",
        "state": "West Bengal",
        "latitude": 22.5958,
        "longitude": 88.2636,
        "pincode": 711101,
        "locations": ["Shibpur", "Domjur", "Bally"]
    },
    {
        "city": "Durgapur",
        "state": "West Bengal",
        "latitude": 23.5204,
        "longitude": 87.3119,
        "pincode": 713201,
        "locations": ["Bidhannagar", "City Center", "Benachity"]
    },
    {
        "city": "Asansol",
        "state": "West Bengal",
        "latitude": 23.6856,
        "longitude": 86.9535,
        "pincode": 713301,
        "locations": ["Burnpur", "Raniganj", "Kulti"]
    },
    {
        "city": "Siliguri",
        "state": "West Bengal",
        "latitude": 26.7271,
        "longitude": 88.3953,
        "pincode": 734001,
        "locations": ["Matigara", "Bagdogra", "Pradhan Nagar"]
    },
    {
        "city": "Bhubaneswar",
        "state": "Odisha",
        "latitude": 20.2961,
        "longitude": 85.8245,
        "pincode": 751001,
        "locations": ["Saheed Nagar", "Jaydev Vihar", "Kharvela Nagar"]
    },
    {
        "city": "Cuttack",
        "state": "Odisha",
        "latitude": 20.4625,
        "longitude": 85.8828,
        "pincode": 753001,
        "locations": ["Buxi Bazar", "Chauliaganj", "Badambadi"]
    },
    {
        "city": "Rourkela",
        "state": "Odisha",
        "latitude": 22.2604,
        "longitude": 84.8536,
        "pincode": 769001,
        "locations": ["Civil Township", "Sector 19", "Chhend"]
    },
    {
        "city": "Brahmapur",
        "state": "Odisha",
        "latitude": 19.3115,
        "longitude": 84.7914,
        "pincode": 760001,
        "locations": ["Gandhinagar", "Komapalli", "Hillpatna"]
    },
    {
        "city": "Sambalpur",
        "state": "Odisha",
        "latitude": 21.4669,
        "longitude": 83.9812,
        "pincode": 768001,
        "locations": ["Ainthapali", "Baraipali", "Dhanupali"]
    },
    {
        "city": "Patna",
        "state": "Bihar",
        "latitude": 25.5941,
        "longitude": 85.1376,
        "pincode": 800001,
        "locations": ["Boring Road", "Kankarbagh", "Rajendra Nagar"]
    },
    {
        "city": "Gaya",
        "state": "Bihar",
        "latitude": 24.7955,
        "longitude": 84.9994,
        "pincode": 823001,
        "locations": ["Magadh Colony", "Bodh Gaya", "Mithapur"]
    },
    {
        "city": "Bhagalpur",
        "state": "Bihar",
        "latitude": 25.2425,
        "longitude": 86.9842,
        "pincode": 812001,
        "locations": ["Tilkamanjhi", "Barari", "Sultanganj"]
    },
    {
        "city": "Muzaffarpur",
        "state": "Bihar",
        "latitude": 26.1209,
        "longitude": 85.3647,
        "pincode": 842001,
        "locations": ["Aghoria Bazar", "Kalyani", "Motijheel"]
    },
    {
        "city": "Purnia",
        "state": "Bihar",
        "latitude": 25.7771,
        "longitude": 87.4753,
        "pincode": 854301,
        "locations": ["Line Bazar", "Khazanchi Haat", "Bhatta Bazar"]
    },
    {
        "city": "Lucknow",
        "state": "Uttar Pradesh",
        "latitude": 26.8467,
        "longitude": 80.9462,
        "pincode": 226001,
        "locations": ["Hazratganj", "Gomti Nagar", "Aliganj"]
    },
    {
        "city": "Kanpur",
        "state": "Uttar Pradesh",
        "latitude": 26.4499,
        "longitude": 80.3319,
        "pincode": 208001,
        "locations": ["Swaroop Nagar", "Kakadeo", "Mall Road"]
    },
    {
        "city": "Ghaziabad",
        "state": "Uttar Pradesh",
        "latitude": 28.6692,
        "longitude": 77.4538,
        "pincode": 201001,
        "locations": ["Indirapuram", "Vasundhara", "Raj Nagar"]
    },
    {
        "city": "Agra",
        "state": "Uttar Pradesh",
        "latitude": 27.1767,
        "longitude": 78.0081,
        "pincode": 282001,
        "locations": ["Tajganj", "Dayalbagh", "Kamla Nagar"]
    },
    {
        "city": "Varanasi",
        "state": "Uttar Pradesh",
        "latitude": 25.3176,
        "longitude": 82.9739,
        "pincode": 221001,
        "locations": ["Lahurabir", "Sigra", "Mahmoorganj"]
    },
    {
        "city": "Jaipur",
        "state": "Rajasthan",
        "latitude": 26.9124,
        "longitude": 75.7873,
        "pincode": 302001,
        "locations": ["Malviya Nagar", "Vaishali Nagar", "Mansarovar"]
    },
    {
        "city": "Jodhpur",
        "state": "Rajasthan",
        "latitude": 26.2389,
        "longitude": 73.0243,
        "pincode": 342001,
        "locations": ["Paota", "Shastri Nagar", "Ratanada"]
    },
    {
        "city": "Udaipur",
        "state": "Rajasthan",
        "latitude": 24.5854,
        "longitude": 73.7125,
        "pincode": 313001,
        "locations": ["Hiran Magri", "Fatehpura", "Saheliyon Ki Bari"]
    },
    {
        "city": "Kota",
        "state": "Rajasthan",
        "latitude": 25.2138,
        "longitude": 75.8648,
        "pincode": 324001,
        "locations": ["Talwandi", "Dadhdevi", "Vigyan Nagar"]
    },
    {
        "city": "Ajmer",
        "state": "Rajasthan",
        "latitude": 26.4499,
        "longitude": 74.6399,
        "pincode": 305001,
        "locations": ["Civil Lines", "Vaishali Nagar", "Pushkar Road"]
    },
    {
        "city": "Bhopal",
        "state": "Madhya Pradesh",
        "latitude": 23.2599,
        "longitude": 77.4126,
        "pincode": 462001,
        "locations": ["Arera Colony", "TT Nagar", "Kolar Road"]
    },
    {
        "city": "Indore",
        "state": "Madhya Pradesh",
        "latitude": 22.7196,
        "longitude": 75.8577,
        "pincode": 452001,
        "locations": ["Vijay Nagar", "Palasia", "Rau"]
    },
    {
        "city": "Gwalior",
        "state": "Madhya Pradesh",
        "latitude": 26.2183,
        "longitude": 78.1828,
        "pincode": 474001,
        "locations": ["Lashkar", "Morar", "Thatipur"]
    },
    {
        "city": "Jabalpur",
        "state": "Madhya Pradesh",
        "latitude": 23.1815,
        "longitude": 79.9864,
        "pincode": 482001,
        "locations": ["Napier Town", "Wright Town", "Madan Mahal"]
    },
    {
        "city": "Ujjain",
        "state": "Madhya Pradesh",
        "latitude": 23.1793,
        "longitude": 75.7849,
        "pincode": 456001,
        "locations": ["Freeganj", "Nanakheda", "Dewas Road"]
    },
    {
        "city": "Chandigarh",
        "state": "Chandigarh",
        "latitude": 30.7333,
        "longitude": 76.7794,
        "pincode": 160001,
        "locations": ["Sector 17", "Sector 22", "Sector 35"]
    },
    {
        "city": "Raipur",
        "state": "Chhattisgarh",
        "latitude": 21.2514,
        "longitude": 81.6296,
        "pincode": 492001,
        "locations": ["Shankar Nagar", "Pandri", "Byron Bazar"]
    },
    {
        "city": "Bhilai",
        "state": "Chhattisgarh",
        "latitude": 21.1938,
        "longitude": 81.3509,
        "pincode": 490001,
        "locations": ["Nehru Nagar", "Smriti Nagar", "Supela"]
    },
    {
        "city": "Bilaspur",
        "state": "Chhattisgarh",
        "latitude": 22.0796,
        "longitude": 82.1391,
        "pincode": 495001,
        "locations": ["Tarbahar", "Rajendra Nagar", "Seepat"]
    },
    {
        "city": "Korba",
        "state": "Chhattisgarh",
        "latitude": 22.3595,
        "longitude": 82.7501,
        "pincode": 495677,
        "locations": ["Balco Nagar", "Rampur", "Pondi"]
    },
    {
        "city": "Durg",
        "state": "Chhattisgarh",
        "latitude": 21.1915,
        "longitude": 81.2781,
        "pincode": 491001,
        "locations": ["Anand Nagar", "Hudco", "Mohan Nagar"]
    },
    {
        "city": "Ranchi",
        "state": "Jharkhand",
        "latitude": 23.3441,
        "longitude": 85.3096,
        "pincode": 834001,
        "locations": ["Doranda", "Lalpur", "Harmu"]
    },
    {
        "city": "Dhanbad",
        "state": "Jharkhand",
        "latitude": 23.7957,
        "longitude": 86.4304,
        "pincode": 826001,
        "locations": ["Saraidhela", "Hirapur", "Bartand"]
    }
    # Add more cities and states here...
]

titles = [
    "Fertile Farmland in Rural Area",
    "Urban Land with Development Potential",
    "Serene Agricultural Property",
    "Prime Residential Plot",
    "Commercial Land in Business District"
]

descriptions = [
    "A vast area with fertile soil, perfect for agricultural activities. Located in a peaceful rural area.",
    "An urban plot with immense potential for commercial and residential development. Located in the heart of the city.",
    "A serene agricultural property with rich soil. Ideal for farming and close to essential amenities.",
    "A prime residential plot in a well-developed area. Perfect for building a dream home.",
    "Commercial land located in a bustling business district. Ideal for setting up shops or offices."
]

zoning_types = ["Industrial", "Residential", "Agricultural", "Commercial"]
utilities_options = [["Water"], ["Water", "Sewer"], ["Electricity"], ["Water", "Electricity"]]
images = [
    "https://images.pexels.com/photos/171328/pexels-photo-171328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/102728/pexels-photo-102728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/636342/pexels-photo-636342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
]
names = ["Anjali Sharma", "Rajesh Kumar", "Sunita Patel", "Arjun Mehta", "Priya Singh"]

# Helper functions
def generate_location(city_state):
    return random.choice(city_state["locations"])

def generate_contact():
    return f"{random.choice(['001', '(742)', '(789)'])}-{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"

def generate_email(name):
    providers = ["example.com", "example.net", "email.com"]
    return f"{name.split()[0].lower()}{random.randint(1, 99)}@{random.choice(providers)}"

def generate_aadhar():
    return "".join([str(random.randint(0, 9)) for _ in range(12)])

def generate_khata():
    return "".join([str(random.randint(0, 9)) for _ in range(10)])

def generate_mutation_numbers(count):
    return [random.randint(1000, 9999) for _ in range(count)]

def generate_land_area():
    cultivable = random.randint(1, 50)
    uncultivable = random.randint(1, 20)
    return cultivable, uncultivable

def calculate_guidance_value(city, cultivable, uncultivable):
    base_value = {"Mangaluru": 3000,
    "Bengaluru": 3200,
    "Mysuru": 3100,
    "Hubballi": 3000,
    "Belagavi": 2900,
    "Mumbai": 3500,
    "Pune": 3400,
    "Nagpur": 3300,
    "Nashik": 3200,
    "Aurangabad": 3100,
    "Chennai": 3300,
    "Coimbatore": 3200,
    "Madurai": 3100,
    "Salem": 3000,
    "Tiruchirappalli": 3100,
    "Hyderabad": 3400,
    "Warangal": 3200,
    "Nizamabad": 3100,
    "Khammam": 3000,
    "Karimnagar": 3100,
    "Kolkata": 3400,
    "Howrah": 3300,
    "Durgapur": 3200,
    "Asansol": 3100,
    "Siliguri": 3000,
    "Bhubaneswar": 3200,
    "Cuttack": 3100,
    "Rourkela": 3000,
    "Brahmapur": 3100,
    "Sambalpur": 3000,
    "Patna": 3300,
    "Gaya": 3200,
    "Bhagalpur": 3100,
    "Muzaffarpur": 3000,
    "Purnia": 3100,
    "Lucknow": 3400,
    "Kanpur": 3300,
    "Ghaziabad": 3200,
    "Agra": 3100,
    "Varanasi": 3000,
    "Jaipur": 3300,
    "Jodhpur": 3200,
    "Udaipur": 3100,
    "Kota": 3000,
    "Ajmer": 3100,
    "Bhopal": 3400,
    "Indore": 3300,
    "Gwalior": 3200,
    "Jabalpur": 3100,
    "Ujjain": 3000,
    "Chandigarh": 3200,
    "Raipur": 3100,
    "Bhilai": 3000,
    "Bilaspur": 3100,
    "Korba": 3000,
    "Durg": 3100,
    "Ranchi": 3000,
    "Dhanbad": 3100}  # Example base values
    total_area = cultivable + uncultivable
    return base_value[city] * total_area

def generate_latitude_longitude(city_state):
    lat_variation = random.uniform(-0.05, 0.05)
    lon_variation = random.uniform(-0.05, 0.05)
    return round(city_state["latitude"] + lat_variation, 6), round(city_state["longitude"] + lon_variation, 6)

# Generating dataset
dataset = []
for i in range(1, 201):
    city_state = random.choice(cities_states)
    cultivable, uncultivable = generate_land_area()
    guidance_value = calculate_guidance_value(city_state["city"], cultivable, uncultivable)
    latitude, longitude = generate_latitude_longitude(city_state)
    
    owner_name = random.choice(names)
    previous_occupants = random.sample(names, k=random.randint(4, 5))
    mutation_numbers = generate_mutation_numbers(len(previous_occupants) + 1)
    
    record = {
        "id": i,
        "details": {
            "title": random.choice(titles),
            "description": random.choice(descriptions),
            "location": generate_location(city_state),
            "zoningType": random.choice(zoning_types),
            "utilities": random.choice(utilities_options),
            "images": random.sample(images, k=3),
            "listed": random.choice([True, False]),
            "listableForFractionalOwnership": random.choice([True, False]),
            "numberOfFractions": random.randint(0, 100),
            "guidanceValue": guidance_value
        },
        "owner": {
            "name": owner_name,
            "contact": generate_contact(),
            "email": generate_email(owner_name),
            "aadharNumber": generate_aadhar()
        },
        "city": city_state["city"],
        "state": city_state["state"],
        "fractionOwners": [],
        "talkua": random.choice(["Talkua A", "Talkua B", "Talkua C", "Taluka D", "Taluka E", "Taluka F"]),
        "village": random.choice(["Village X", "Village Y", "Village Z", "Village A", "Village B", "Village C"]),
        "surveyNumber": random.randint(1000, 9999),
        "subDivisionNumber": random.randint(1, 10),
        "cultivableLandArea": cultivable,
        "uncultivableLandArea": uncultivable,
        "previousOccupants": previous_occupants,
        "currentOccupants": [owner_name],
        "khataNumber": generate_khata(),
        "mutationNumbers": mutation_numbers,
        "latitude": latitude,
        "longitude": longitude,
        "pincode": city_state["pincode"]
    }
    dataset.append(record)

# Save the dataset to a JSON file
with open('land_properties.json', 'w') as json_file:
    json.dump(dataset, json_file, indent=4)

print("Dataset saved to 'land_properties.json'")
