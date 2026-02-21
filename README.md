# 🚛 FleetFlow – Modular Fleet & Logistics Management System

## 🏆 Hackathon Project Submission

FleetFlow is a centralized, rule-based digital fleet management system that replaces inefficient manual logbooks.
It enables organizations to manage vehicles, drivers, trips, fuel expenses, maintenance, and financial analytics — all in one place.

---

# 📌 Problem Statement

Manual fleet management leads to:

* ❌ Inaccurate fuel tracking
* ❌ Poor maintenance visibility
* ❌ Revenue leakage
* ❌ No real-time analytics
* ❌ Unsafe dispatching

FleetFlow solves this by providing:

* ✅ Centralized digital records
* ✅ Role-based access control
* ✅ Automated cost & profit tracking
* ✅ Lifecycle-based trip management
* ✅ Real-time financial analytics

---

# 🚀 Features

## 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access (Admin, Operator, Viewer)
* Persistent login using token restore
* Route protection middleware

---

## 🚘 Vehicle Management

* Add & manage fleet vehicles
* Track capacity & odometer
* Vehicle status auto-updates:

  * Available
  * On Trip
  * In Shop

---

## 👨‍✈️ Driver Management

* Driver registry
* License tracking
* Duty status updates
* Safety score tracking (UI-level demo)

---

## 📦 Trip Lifecycle Management

Each trip follows:

```
Draft → Dispatched → Completed → Cancelled
```

Rules:

* Cannot dispatch overloaded cargo
* Cannot add fuel after completion
* Fuel cost auto-attached to trip
* Profit auto-calculated on completion

---

## ⛽ Fuel Tracking

* Add fuel logs per trip
* Validations:

  * Cannot add to completed trip
  * No negative values
* Auto updates trip fuel cost
* Transaction-safe operations

---

## 🛠 Maintenance Logs

* Create service records
* Track maintenance cost
* Completed logs stored
* Vehicle status updates during maintenance

---

## 📊 Analytics Dashboard

Includes:

* Total Revenue
* Fuel Cost
* Maintenance Cost
* Net Profit
* ROI Calculation
* Fuel Efficiency Trend Chart
* Top Costliest Vehicles Chart
* Monthly Financial Summary Table

All analytics are dynamically computed from database.

---

# 🏗 Tech Stack

## Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL / PostgreSQL
* JWT
* bcrypt
* Role middleware
* Transaction handling

## Frontend

* TypeScript
* TailwindCSS
* React Router
* Axios
* Recharts (Analytics graphs)
* React Context API (Auth)

---

# 🧠 Architecture

```
Frontend (React)
        ↓
REST API (Express)
        ↓
Controllers
        ↓
Sequelize ORM
        ↓
Database
```

Security Layers:

* JWT Authentication
* Role Authorization Middleware
* Input Validations
* Transaction Control

---

# 🔄 Business Logic Highlights

✔ Cannot add fuel to completed trips
✔ Profit = Revenue - (Fuel + Maintenance)
✔ Fuel updates trip cost automatically
✔ Role-based API protection
✔ JWT restored on refresh
✔ Financial summary uses DB aggregation

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repo

```bash
git clone <repo-url>
cd FleetFlow
```

---

## 2️⃣ Backend Setup

```bash
cd fleetflow-backend
npm install
```

Create `.env`:

```
PORT=5000
JWT_SECRET=supersecret
```

Run:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```bash
cd fleetflow-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:8080
```

---

# 🧪 Testing Flow

1. Register Admin
2. Login
3. Add Vehicle
4. Add Driver
5. Create Trip
6. Add Fuel
7. Add Maintenance
8. Complete Trip
9. View Analytics

---

# 🔒 Role Access Matrix

| Feature     | Admin | Operator | Viewer |
| ----------- | ----- | -------- | ------ |
| Vehicles    | ✅     | ✅        | 👁     |
| Trips       | ✅     | ✅        | 👁     |
| Fuel        | ✅     | ✅        | ❌      |
| Maintenance | ✅     | ✅        | ❌      |
| Analytics   | ✅     | ❌        | ❌      |


---

# 👨‍💻 Team

BygBytes - Nitish C Sahu (Leader), Aditya K Rana, Manthan M Sali and Palash A Sahuji 