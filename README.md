# Mapsy App

## Objective
Build a React Native application that allows users to:
- Search for a start and end location
- Fetch the driving route using a routing API
- Display route options
- Visualize the selected route on a map with a clearly drawn path

---

## Features & Screens

### 1. Route Input Screen
- Two input fields: **Start Point** and **End Point**
- Tapping either field navigates to the Location Search Screen

### 2. Location Search Screen
- User types a location (live search feature)
- Uses the following API for search results:  
  `https://www.onemap.gov.sg/api/common/elastic/search?searchVal={query}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
- Displays a list of matching places based on input
- User selects a location, which navigates back to the Route Input Screen with the selected value

### 3. Route Confirmation & Options
- Once both Start and End points are filled, user can confirm
- On confirmation, fetch route using:  
  `http://router.project-osrm.org/route/v1/driving/{startLng},{startLat};{endLng},{endLat}?overview=full&geometries=geojson`
- Display a list of route options from the API response

### 4. Route Map Screen
- Opens a map view
- Draws the route line (path) between Start and End points using GeoJSON data
- Centers and zooms the map to fit the route

---

## Evaluation Metrics

- **App Functionality:**  
  - Correctly detects and responds to changes in app permissions
- **Stability:**  
  - No crashes or unhandled errors when toggling permissions or switching screens

---

## Evaluation Criteria

- **Technical Skills:**  
  - Proper use of hooks, navigation, and state management (e.g., Redux or Context API)
- **Code Quality:**  
  - Clean, modular, and reusable components
- **API Usage and Integration:**  
  - Well-handled API calls with proper error handling and loading states
  - Offline/online support if applicable

---

## APIs Used

- **Location Search:**  
  `https://www.onemap.gov.sg/api/common/elastic/search`
- **Route Calculation:**  
  `http://router.project-osrm.org/route/v1/driving`

---

## Notes

- Ensure all components are modular and reusable
- Handle all API errors gracefully
- Focus on user experience and app stability