import requests 

# encript APIKEY with .ENV
API_KEY = 'AIzaSyAoeQoqAUQo3RVo6CfiXRSaZsM61vni8xE'
GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

def get_coordinates_from_address(address):
    params = {
        'address': address,
        'key': API_KEY
    }
    response = requests.get(GEOCODING_API_URL, params=params)
    data = response.json()

    if data['status'] == 'OK':
        location = data['results'][0]['geometry']['location']
        print("latitud: ",location['lat']," longitud: ", location['lng'])
        return location['lat'], location['lng']
    else:
        return None, None  