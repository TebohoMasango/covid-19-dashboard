# COVID-19 Early Outbreak Dashboard (Feb - Mar 2020)

A responsive, single-page web dashboard built to analyze and visualize the early outbreak phase of COVID-19 (February to March 2020) using historical data from Johns Hopkins University.

---

## Features & Core Deliverables

1. **Dynamic Country Selector:** Switch instantly between China, Italy, South Korea, United States, and South Africa, or view all countries aggregated.
2. **Key Metric Summary Cards:** Real-time KPI summaries for Total Confirmed, Total Recovered, and Total Deaths.
3. **Interactive Line Chart:** Built with Chart.js, rendering cumulative trends over time for confirmed cases, recoveries, and deaths.
4. **Responsive Layout:** Designed with Tailwind CSS for seamless viewing across desktop and mobile screens.

---

## Project Tech Stack

- **Frontend Structure:** HTML5
- **Styling:** Tailwind CSS via CDN
- **Charting Engine:** Chart.js via CDN
- **Data Processing & Logic:** Vanilla JavaScript using ES6+ async/await
- **Dataset:** covid-19.json as a Johns Hopkins University time-series extract

---

## Setup & Running Instructions

1. Open the project folder inside Visual Studio Code.
2. Right-click index.html and select Open with Live Server.
3. Open your browser's Developer Tools (F12 or Inspect, then click the Console tab) to verify successful asynchronous data loading (COVID-19 Dataset Loaded Successfully).
