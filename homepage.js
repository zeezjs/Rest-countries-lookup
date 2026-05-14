// Homepage-specific logic
const cardContainer = document.querySelector('.row');
const searchInput = document.getElementById('search-input');
const regionOption = document.getElementById('regionOption');

// Load and render all countries to home page function
const loadHomepage = async () => {
  try {
    const countries = await getCountries();
    
    // Convert each country into card HTML
    const cardsHTML = countries.map(country => `
      <div class="col-md-4 mb-4">
        <a class="link-offset-2 link-underline link-underline-opacity-0" href="details.html?code=${country.cca3}">
          <div class="card h-100">
            <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common} flag">
            <div class="card-body">
              <h5 class="card-title">${country.name.common}</h5>
              <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p class="card-text"><strong>Region:</strong> ${country.region}</p>
              <p class="card-text"><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
            </div>
          </div>
        </a>
      </div>
    `).join('');
    
    // Put all the cards into the page
    cardContainer.innerHTML = cardsHTML;
    
  } catch (error) {
    console.log('Error loading countries:', error.message);
  }
};

// search function
const searchFunction = async (query) => {
    if (query) {
        try {
            const countryData = await getCountryByName(query);
            // Clear previous results
            cardContainer.innerHTML = '';
            // Create a card for the searched country
            const cardHTML = `
                <div class="col-md-4 mb-4">
                    <a class="link-offset-2 link-underline link-underline-opacity-0" href="details.html?code=${countryData.cca3}">
                        <div class="card h-100">
                            <img src="${countryData.flags.svg}" class="card-img-top" alt="${countryData.name.common} flag">
                            <div class="card-body">
                                <h5 class="card-title">${countryData.name.common}</h5>
                                <p class="card-text"><strong>Population:</strong> ${countryData.population.toLocaleString()}</p>
                                <p class="card-text"><strong>Region:</strong> ${countryData.region}</p>
                                <p class="card-text"><strong>Capital:</strong> ${countryData.capital?.[0] || 'N/A'}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            cardContainer.innerHTML = cardHTML;
        } catch (error) {
            console.log('Error searching for country:', error.message);
        }
    } else {
        loadHomepage();
    }
};

// region filter function
const filterByRegion = async (selectedRegion) => {
    if (selectedRegion === 'All countries') {
        loadHomepage();
    } else {
        try {
            const countries = await getCountriesByRegion(selectedRegion);
            // Clear previous results
            cardContainer.innerHTML = '';
            // Convert each country into card HTML
            const cardsHTML = countries.map(country => `
                <div class="col-md-4 mb-4">
                    <a class="link-offset-2 link-underline link-underline-opacity-0" href="details.html?code=${country.cca3}">
                        <div class="card h-100">
                            <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common} flag">
                            <div class="card-body">
                                <h5 class="card-title">${country.name.common}</h5>
                                <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                                <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                                <p class="card-text"><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `).join('');
            // Put all the cards into the page
            cardContainer.innerHTML = cardsHTML;
        } catch (error) {
            console.log('Error filtering countries by region:', error.message);
        }
    }
}

// Load homepage on page load
loadHomepage();

// Events
//search event
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  await searchFunction(query);    
});

//region filter event
regionOption.addEventListener('change', async (e) => {
    const selectedRegion = e.target.value;
    await filterByRegion(selectedRegion);
    
});