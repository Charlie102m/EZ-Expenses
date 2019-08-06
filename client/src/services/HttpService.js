import axios from 'axios'

export const apiClient = axios.create({
  baseURL: `http://localhost:3000`
})

export const HttpService = {
  getDirections(waypoints) {
    return apiClient.post('/api/directions', waypoints)
  },
  getTrips() {
    return apiClient.get('/trips')
  },
  getTripsByStatus(status) {
    return apiClient.get('/trips/status/' + status)
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
  getExpensesByStatus(status) {
    return apiClient.get('/expenses/status/' + status)
  },
  addExpense(expense) {
    return apiClient.post('/expenses', expense)
  },
  deleteExpense(expense) {
    return apiClient.delete('/expenses/' + expense.id)
  },
  getClaims() {
    return apiClient.get('/claims')
  },
  addClaim(payload) {
    return apiClient.post('/claims', payload)
  },
  viewClaim(claim) {
    return apiClient.get(`/claims/${claim.type}/${claim.id}`)
  },
  getUserProfile() {
    return apiClient.get('/profile')
  }
}