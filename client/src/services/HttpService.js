import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getDirections(waypoints) {
    return apiClient.post('/api/directions', waypoints)
  },
  getTrips() {
    return apiClient.get('/trips')
  },
  addTrip(trip) {
    return apiClient.post('/trips', trip)
  },
  loadDashboard() {
    return apiClient.get('/')
  }
}