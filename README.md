# EZ Expenses

Milage and expenses tracking app for field based business users. Mobile first design, allowing quick and simple logging of business trips and purchases. Leverages Google API’s to search for destinations, calculate optimal route, distance and time.

I am happy to collaborate should a mobile developer wish to build a native front-end to this. Current front-end is built on vue.js for web.

Feel free to submit a pull request or use the API in your own projects.

Please note if this API is misused I shall remove it from public use.

## Indices

- [Auth](#auth)

  - [Register](#1-register)
  - [Login](#2-login)

- [Claims](#claims)

  - [Get All Claims](#1-get-all-claims)
  - [Delete Claim](#2-delete-claim)
  - [Create Expense Claim](#3-create-expense-claim)
  - [Create Trip Claim](#4-create-trip-claim)
  - [Get Single Claim](#5-get-single-claim)

- [Dashboard](#dashboard)

  - [Dashbaord](#1-dashbaord)

- [Expenses](#expenses)

  - [Create New Expense](#1-create-new-expense)
  - [Get All Expenses](#2-get-all-expenses)
  - [Get Single Expense](#3-get-single-expense)
  - [Delete Expense](#4-delete-expense)
  - [Update Expense](#5-update-expense)
  - [Get Expense By Status](#6-get-expense-by-status)

- [GoogleAPI](#googleapi)

  - [Get Directions](#1-get-directions)

- [Profile](#profile)

  - [Get User Profile](#1-get-user-profile)
  - [Get Milage Rate](#2-get-milage-rate)
  - [Update Address](#3-update-address)
  - [Update Defualt Milage Rate](#4-update-defualt-milage-rate)
  - [Update Profile Image](#5-update-profile-image)

- [Trips](#trips)

  - [Get All Trips](#1-get-all-trips)
  - [Get Trips By Status](#2-get-trips-by-status)
  - [Create New Trip](#3-create-new-trip)
  - [Update Trip](#4-update-trip)
  - [Delete Trip](#5-delete-trip)
  - [Get Single Trip](#6-get-single-trip)

---

## Auth

EZ Expenses makes use of JSON Web Tokens to handle authentication, providing flexibility for any additional front-end platforms.

### 1. Register

Register for a free EZ Expenses account.

Requires JSON object with firstName, lastName, email & password.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/register
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

**_Body:_**

```js
{
	"firstName": "EZ",
	"lastName": "Expenses",
	"email": "test@ezexpenses.co.uk",
	"password": "Password1"
}
```

### 2. Login

Login to EZ Expenses.

Returns authorization header with JWT Bearer.

This header needs to be included with any subsequent requests to secure routes.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/login
```

**_Headers:_**

| Key          | Value            | Description |
| ------------ | ---------------- | ----------- |
| Content-Type | application/json |             |

**_Body:_**

```js
{
	"email": "test@ezexpenses.co.uk",
	"password": "Password1"
}
```

## Claims

CRUD functionality for claims. Users can claim for trips or expenses, not both at the same time.

Once a claim is created, it can be downloaded to excel for submission (frond-end this functionality is not server-side).

### 1. Get All Claims

Returns both trip and expense claims.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/claims
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 2. Delete Claim

/claims/:claimType/:claimId

claimType options are 'Milage' or 'Expenses'

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/claims/Milage/23
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 3. Create Expense Claim

Expects two nested arrays, the first with the claim summary data and the second with the expenses included within the claim.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/claims
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
[
  {
    countExpenses: 2,
    netValue: 6,
    vatValue: 0.4,
    totalValue: 7.2,
    createdBy: 12
  },
  [
    {
      id: 18
    },
    {
      id: 19
    }
  ]
];
```

### 4. Create Trip Claim

Expects two nested arrays, the first with the claim summary data and the second with the trips included within the claim.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/claims
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
[
  { totalMiles: 2.6, countTrips: 2, totalValue: 1.07, createdBy: 12 },
  [
    {
      id: 152
    },
    {
      id: 154
    }
  ]
];
```

### 5. Get Single Claim

/claims/:claimType/:claimId

claimTypes available are 'Milage' and 'Expenses'

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/claims/Milage/24
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

## Dashboard

Combined query to return all data for a particular user to produce their dashboard in the UI.

### 1. Dashbaord

Returns summary of users trips, expenses, claims and the building blocks to the graph displayed on the dashboard.

**_Endpoint:_**

```bash
Method: GET
Type: RAW
URL: {{URL}}
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

## Expenses

CRUD functionality for expenses, allowing users to log business purchases for reimbursement.

### 1. Create New Expense

Post to create a new expense.

Requires expenseDate, expenseType, comment, net, vat, total, createdBy.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/expenses
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
{
        "expenseDate": "2020-01-08",
        "expenseType": "travel",
        "comment": "Dartford Tunnel",
        "status": "unclaimed",
        "net": 3,
        "vat": 0.2,
        "total": 3.6,
        "createdBy": 12
}
```

### 2. Get All Expenses

Returns all expenses as an array of objects.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/expenses
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 3. Get Single Expense

/expenses/:expenseId

Return an individual expense by its id.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/expenses/15
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 4. Delete Expense

/expenses/:expenseId

WARNING: do not attempt to delete an expense which has the status of claimed. You must delete the claim first for the status to update to unclaimed.

**_Endpoint:_**

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/expenses/15
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

### 5. Update Expense

/expenses/:expenseId

Update any or all elements of an expense. Only allowed for unclaimed expenses.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/expenses/15
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Authorization | {{TOKEN}}        |             |
| Content-Type  | application/json |             |

**_Body:_**

```js
{
    "expenseDate": "2020-01-08",
    "expenseType": "travel",
    "comment": "Dartford Tunnel!!!",
    "status": "unclaimed",
    "net": 5,
    "vat": 1.00,
    "total": 6.00
}
```

### 6. Get Expense By Status

/expenses/status/:status

Current status choices are 'unclaimed' or 'claimed'

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/expenses/status/unclaimed
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

## GoogleAPI

EZ Expenses makes use of the google directions API, returning the distance, duration and optimal driving route between two points.

### 1. Get Directions

Utilising the Google Directions API, submitting two addresses will return the optimal route by car.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/directions
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
{
    "origin": "10 Downing Street - 10 Downing St, Westminster, London SW1A 2AA, UK",
    "destination": "Westminster Abbey - Westminster Abbey, Westminster, London SW1P 3PA, UK"
}
```

## Profile

Functionality for editing user profile defualts.

### 1. Get User Profile

Returns user data for logged in user.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/profile
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 2. Get Milage Rate

Returns milage rate defualt for use in create new trip view.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/milageRate
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 3. Update Address

Update home/work address defualt in user profile. These defualts are utilised when creating new trips/expenses - allowing user to choose defualt addresses rather than searching when appropriate.

Address types accepted: 'home', 'work'

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/profile/update/address
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
{
  "type": "home",
  "name": "11 Downing Street",
  "address": "11 Downing St, Westminster, London SW1A 2AA, UK"
}
```

### 4. Update Defualt Milage Rate

Expects a decimal

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/profile/update/milageValueDefualt
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
    {
        "milageValueDefualt": 0.15
    }
```

### 5. Update Profile Image

Requires multipart/form-data header and file attached as part of FormData()

**_Endpoint:_**

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/profile/update/uploadImage
```

**_Headers:_**

| Key           | Value               | Description |
| ------------- | ------------------- | ----------- |
| Content-Type  | multipart/form-data |             |
| Authorization | {{TOKEN}}           |             |

**_Body:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| image |       |             |

## Trips

CRUD functionality for logging trips completed by business users.

### 1. Get All Trips

Returns all trips as an array of objects.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/trips
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 2. Get Trips By Status

/trips/status/:status

Current status choices are 'unclaimed' or 'claimed'

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/trips/status/unclaimed
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 3. Create New Trip

Post to create a new trip.

Requires tripDate, originName, originAddress, destinationName, destinationAddress, reason, distance, duration, milageRate, value, createdBy

Please note, most of the above fields relating to the trip are returned by the GoogleAPI. You are advised to utilise the Get Directions endpoint to help generate the payload for this request.

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: {{URL}}/trips
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
{
    "tripDate": "2020-01-08",
    "originName": "10 Downing Street",
    "originAddress": "10 Downing St, Westminster, London SW1A 2AB, UK",
    "destinationName": "Westminster Abbey",
    "destinationAddress": "20 Deans Yd, Westminster, London SW1P 3PA, UK",
    "reason": "Off to see the wizard, the wonderful wizard of oz!",
    "distance": 0.8562516311034337,
    "duration": "6",
    "milageRate": 0.45,
    "value": 0.38,
    "createdBy": 12
}
```

### 4. Update Trip

/trips/:tripId

Update any or all elements of a trip. Only allowed for unclaimed trips.

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: {{URL}}/trips/154
```

**_Headers:_**

| Key           | Value            | Description |
| ------------- | ---------------- | ----------- |
| Content-Type  | application/json |             |
| Authorization | {{TOKEN}}        |             |

**_Body:_**

```js
{
    "tripDate": "2020-01-08",
    "originName": "10 Downing Street",
    "originAddress": "10 Downing St, Westminster, London SW1A 2AB, UK",
    "destinationName": "Westminster Abbey",
    "destinationAddress": "20 Deans Yd, Westminster, London SW1P 3PA, UK",
    "reason": "Off to see the wizard, the wonderful wizard of oz! EDITED",
    "distance": 0.8562516311034337,
    "duration": "6",
    "milageRate": 0.45,
    "value": 0.38,
    "createdBy": 12
}
```

### 5. Delete Trip

/trips/:tripId

WARNING: do not attempt to delete a trip which has the status of claimed. You must delete the claim first for the status to update to unclaimed.

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: {{URL}}/trips/151
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

### 6. Get Single Trip

/trips/:tripId

Get a trip by id included as url param.

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{URL}}/trips/154
```

**_Headers:_**

| Key           | Value     | Description |
| ------------- | --------- | ----------- |
| Authorization | {{TOKEN}} |             |

---

[Back to top](#ez-expenses)

> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-01-08 15:00:34 by [docgen](https://github.com/thedevsaddam/docgen)
