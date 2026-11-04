let covidDatabase = {};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./covid-19.json");
    covidDatabase = await response.json();
    console.log(
      "Successfully loaded COVID-19 dataset in browser:",
      covidDatabase,
    );

    const countrySelect = document.getElementById("countrySelect");
    countrySelect.addEventListener("change", (e) => {
      const selectedCountry = e.target.value;
      const data = getCountryData(selectedCountry);
      console.log(`Selected Country Data (${selectedCountry}):`, data);
    });
  } catch (error) {
    console.error("Failed to load JSON dataset:", error);
  }
});

function getCountryData(countryName) {
  if (!covidDatabase.countries) return [];
  const found = covidDatabase.countries.find((c) => c.country === countryName);
  return found ? found.data : [];
}
