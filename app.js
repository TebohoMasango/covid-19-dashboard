let covidData = [];
let chartInstance = null;

async function loadCovidData() {
  try {
    const response = await fetch("./covid-19.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    covidData = data.countries;

    console.log("COVID-19 Dataset Loaded Successfully:", covidData);

    populateCountryDropdown(covidData);
    updateMetricsAndChart("All");

    document.getElementById("countrySelect").addEventListener("change", (e) => {
      updateMetricsAndChart(e.target.value);
    });
  } catch (error) {
    console.error("Error loading dataset:", error);
  }
}

function populateCountryDropdown(countries) {
  const select = document.getElementById("countrySelect");
  // Clear any existing extra options except "All"
  select.innerHTML = '<option value="All">All Countries</option>';

  countries.forEach((c) => {
    const option = document.createElement("option");
    option.value = c.country;
    option.textContent = c.country;
    select.appendChild(option);
  });
}

function updateMetricsAndChart(selectedCountry) {
  let filteredCountries = covidData;
  if (selectedCountry !== "All") {
    filteredCountries = covidData.filter((c) => c.country === selectedCountry);
  }

  let totalConfirmed = 0;
  let totalRecovered = 0;
  let totalDeaths = 0;

  filteredCountries.forEach((country) => {
    const latest = country.data[country.data.length - 1];
    totalConfirmed += latest.confirmed;
    totalRecovered += latest.recovered;
    totalDeaths += latest.deaths;
  });

  document.getElementById("totalConfirmed").textContent =
    totalConfirmed.toLocaleString();
  document.getElementById("totalRecovered").textContent =
    totalRecovered.toLocaleString();
  document.getElementById("totalDeaths").textContent =
    totalDeaths.toLocaleString();

  renderLineChart(filteredCountries);
}

function renderLineChart(countries) {
  const ctx = document.getElementById("casesChart").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = covidData[0].data.map((entry) => entry.date);
  const colorMap = {
    China: "#3B82F6",
    Italy: "#EF4444",
    "South Korea": "#10B981",
    US: "#F59E0B",
    "South Africa": "#8B5CF6",
  };

  const datasets = countries.map((country) => {
    return {
      label: country.country,
      data: country.data.map((entry) => entry.confirmed),
      borderColor: colorMap[country.country] || "#6B7280",
      backgroundColor: colorMap[country.country] || "#6B7280",
      borderWidth: 2,
      tension: 0.2,
      fill: false,
    };
  });

  chartInstance = new Chart(ctx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        x: { title: { display: true, text: "Date" } },
        y: {
          title: { display: true, text: "Confirmed Cases" },
          beginAtZero: true,
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", loadCovidData);
