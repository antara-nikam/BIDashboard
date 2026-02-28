# BI Dashboard - Business Intelligence Platform

A real-time Data Analytics & Business Intelligence Dashboard built with React.js, Node.js, and Chart.js.

![BI Dashboard](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Chart.js](https://img.shields.io/badge/Chart.js-4.4-yellow)

## Features

- **Custom Dashboards** - Build personalized dashboards with drag-and-drop widgets
- **KPI Monitoring** - Track key performance indicators with real-time updates
- **Data Import** - Import data from multiple external sources (JSON)
- **Export Reports** - Export data in JSON format
- **Authentication** - Secure login/signup with JWT tokens

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, JWT Authentication
- **Charts**: Chart.js with react-chartjs-2

## How to Upload to GitHub (Manual)

### Option 1: Using Git Commands

1. **Initialize Git** (if not already initialized):
```
bash
git init
```

2. **Add all files to staging**:
```
bash
git add .
```

3. **Create initial commit**:
```
bash
git commit -m "Initial commit: BI Dashboard with React and Node.js"
```

4. **Go to GitHub and create a new repository**:
   - Visit: https://github.com/new
   - Repository name: `BIDashboard-API`
   - Choose Public or Private
   - Click "Create repository"

5. **Push to GitHub**:
```
bash
git remote add origin https://github.com/YOUR_USERNAME/BIDashboard-API.git
git push -u origin master
```

### Option 2: Using GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. File → Add Local Repository
4. Select your project folder
5. Click "Publish repository"
6. Add repository name and description
7. Click "Publish"

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
bash
git clone <repository-url>
cd BIDashboard-API
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```
bash
cd client
npm install
```

### Running the Application

1. Start the backend server (Port 5000):
```
bash
npm start
```

2. In a new terminal, start the frontend (Port 3000):
```
bash
cd client
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Demo Credentials

- **Email**: admin@bidashboard.com
- **Password**: admin123

## Project Structure

```
BIDashboard-API/
├── index.js                 # Express server
├── package.json
├── data/
│   └── mockData.js         # Mock data for dashboard
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Auth context
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard` - Get all dashboard data
- `GET /api/kpis` - Get KPI data
- `POST /api/kpis` - Create new KPI
- `GET /api/products` - Get products
- `GET /api/transactions` - Get transactions

### Data Management
- `POST /api/import` - Import data from external source
- `GET /api/export` - Export data

## Screenshots

The dashboard includes:
- KPI cards with trend indicators
- Sales trend line charts
- Revenue distribution doughnut charts
- Category performance bar charts
- Products and transactions tables

## License

MIT License
