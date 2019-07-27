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
  getTrip(tripId) {
    return apiClient.get('/trips/' + tripId)
  },
  updateTrip(trip) {
    return apiClient.put('/trips/' + trip.id, trip)
  },
  deleteTrip(trip) {
    return apiClient.delete('/trips/' + trip.id)
  },
  loadDashboard() {
    return apiClient.get('/')
  },
  register(credentials) {
    return apiClient.post('/register', credentials)
  },
  login(credentials) {
    return apiClient.post('/login', credentials)
  },
  getExpenses() {
    return apiClient.get('/expenses')
  },
  addExpense(expense) {
    return apiClient.post('/expenses', expense)
  },
  deleteExpense(expense) {
    return apiClient.delete('/expenses/' + expense.id)
  },
}