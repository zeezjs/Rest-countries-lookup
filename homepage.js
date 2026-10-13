// // Homepage-specific logic
// const cardContainer = document.querySelector('.country-list');
// const searchInput = document.getElementById('search-input');
// const regionOption = document.getElementById('regionOption');

// // Build card HTML for a list of countries and put it on the page
// const renderCards = (countries) => {
//   if (countries.length === 0) {
//     cardContainer.innerHTML = '<p class="text-center">No countries found.</p>';
//     return;
//   }

//   cardContainer.innerHTML = countries.map(country => `
//     <div class="col-md-4 mb-4">
//       <a class="link-offset-2 link-underline link-underline-opacity-0" href="details.html?code=${country.alpha3Code}">
//         <div class="card h-100">
//           <img src="${country.flags.svg}" class="card-img-top" alt="${country.name} flag">
//           <div class="card-body">
//             <h5 class="card-title">${country.name}</h5>
//             <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
//             <p class="card-text"><strong>Region:</strong> ${country.region}</p>
//             <p class="card-text"><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
//           </div>
//         </div>
//       </a>
//     </div>
//   `).join('');
// };

// // Load and render all countries to home page
// const loadHomepage = async () => {
//   try {
//     const countries = await getCountries();
//     renderCards(countries);
//   } catch (error) {
//     console.log('Error loading countries:', error.message);
//   }
// };

// // Search function (shows every country that matches)
// const searchFunction = async (query) => {
//   if (!query) {
//     loadHomepage();
//     return;
//   }

//   try {
//     const countries = await getCountries();
//     const matches = countries.filter(country =>
//       country.name.toLowerCase().includes(query.toLowerCase())
//     );
//     renderCards(matches);
//   } catch (error) {
//     console.log('Error searching for country:', error.message);
//   }
// };

// // Region filter function
// const filterByRegion = async (selectedRegion) => {
//   if (selectedRegion === 'All countries') {
//     loadHomepage();
//     return;
//   }

//   try {
//     const countries = await getCountriesByRegion(selectedRegion);
//     renderCards(countries);
//   } catch (error) {
//     console.log('Error filtering countries by region:', error.message);
//   }
// };

// // Load homepage on page load
// loadHomepage();

// // Events
// // search event
// searchInput.addEventListener('input', async (e) => {
//   const query = e.target.value.trim();
//   await searchFunction(query);
// });

// // region filter event
// regionOption.addEventListener('change', async (e) => {
//   const selectedRegion = e.target.value;
//   await filterByRegion(selectedRegion);
// });

// Homepage-specific logic
const cardContainer = document.querySelector('.country-list');
const searchInput = document.getElementById('search-input');
const regionOption = document.getElementById('regionOption');

// Lowercase and strip accents so "cote d'ivoire" finds "Côte d'Ivoire"
const normalize = (str = '') =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Wait until the user stops typing before running the search
const debounce = (fn, delay = 250) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Build card HTML for a list of countries and put it on the page
const renderCards = (countries) => {
  if (countries.length === 0) {
    cardContainer.innerHTML = '<p class="text-center">No countries found.</p>';
    return;
  }

  cardContainer.innerHTML = countries.map(country => `
    <div class="col-md-4 mb-4">
      <a class="link-offset-2 link-underline link-underline-opacity-0" href="details.html?code=${country.alpha3Code}">
        <div class="card h-100">
          <img src="${country.flags.svg}" class="card-img-top" alt="${country.name} flag">
          <div class="card-body">
            <h5 class="card-title">${country.name}</h5>
            <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p class="card-text"><strong>Region:</strong> ${country.region}</p>
            <p class="card-text"><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
          </div>
        </div>
      </a>
    </div>
  `).join('');
};

// Lower score = better match. null = no match.
const matchScore = (country, query) => {
  const name = normalize(country.name);
  if (name.startsWith(query)) return 0;
  if (name.includes(query)) return 1;
  if (normalize(country.capital).includes(query)) return 2;
  if (
    country.alpha2Code.toLowerCase() === query ||
    country.alpha3Code.toLowerCase() === query
  ) return 2;
  return null;
};

// One function that applies BOTH search and region together
const applyFilters = async () => {
  try {
    const countries = await getCountries();
    const query = normalize(searchInput.value.trim());
    const region = regionOption.value;

    // 1. Region filter
    let results = countries.filter(
      c => region === 'All countries' || c.region === region
    );

    // 2. Search filter + ranking
    if (query) {
      results = results
        .map(c => ({ country: c, score: matchScore(c, query) }))
        .filter(item => item.score !== null)
        .sort((a, b) => a.score - b.score)
        .map(item => item.country);
    }

    renderCards(results);
  } catch (error) {
    console.log('Error filtering countries:', error.message);
  }
};

// Load homepage on page load
applyFilters();

// Events
searchInput.addEventListener('input', debounce(applyFilters));
regionOption.addEventListener('change', applyFilters);