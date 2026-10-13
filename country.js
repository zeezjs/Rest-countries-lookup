// // Fetching all countries
// const getCountries = async () => {
//    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3');
//         if(response.status !== 200){
//             throw new Error('Problem fetching data');
//         }
//    const data = await response.json();
//    const allCountries = data;
//    return allCountries;
// }
// //Fetching country by code
// const getCountryByCode = async (code) => {
//     const base = `https://restcountries.com/v3.1/alpha/${code}`;
//     const response = await fetch(base);
//         if(response.status !== 200){
//             throw new Error('Problem fetching data');
//         }
//     const data = await response.json();
//     const countryByCodeData = data[0];
//     return countryByCodeData;
// }
// // Fetching country by name
// const getCountryByName = async (country) => {
//     const base = `https://restcountries.com/v3.1/name/`;
//     const query = `${country}`;
//     const response = await fetch(`${base}${query}`);
//         if(response.status !== 200){
//             throw new Error('Problem fetching data');
//         }
//     const data = await response.json();
//     const countryNameData = data[0];
//     return countryNameData;
// }
// // Fetching countries by region
// const getCountriesByRegion = async (region) => {
//     const base = `https://restcountries.com/v3.1/region/`;
//     const query = `${region}`;
//     const response = await fetch(`${base}${query}`);
//         if(response.status !== 200){
//             throw new Error('Problem fetching data');
//         }
//     const data = await response.json();
//     const countriesByRegionData = data;
//     return countriesByRegionData;
// }
// // Fetching countries by codes (for borders)
// const getCountriesByCodes = async (codes) => {
//     const base = `https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}`;
//     const response = await fetch(base);
//         if(response.status !== 200){
//             throw new Error('Problem fetching data');
//         }
//     const data = await response.json();
//     const countriesByCodesData = data;
//     return countriesByCodesData;
// }

// Load data.json once and reuse it
let countriesCache = null;

const loadData = async () => {
    if (countriesCache) return countriesCache;

    const response = await fetch('./data.json');
    if (!response.ok) {
        throw new Error('Problem fetching data');
    }
    countriesCache = await response.json();
    return countriesCache;
};

// Fetching all countries
const getCountries = async () => {
    return await loadData();
};

// Fetching country by code (alpha3, e.g. "AFG")
const getCountryByCode = async (code) => {
    const data = await loadData();
    const country = data.find(
        (c) => c.alpha3Code.toLowerCase() === code.toLowerCase()
    );
    if (!country) throw new Error('Problem fetching data');
    return country;
};

// Fetching country by name
const getCountryByName = async (name) => {
    const data = await loadData();
    const query = name.toLowerCase();

    // Exact match first, then partial (like the API did)
    const match =
        data.find((c) => c.name.toLowerCase() === query) ||
        data.find((c) => c.name.toLowerCase().includes(query));

    if (!match) throw new Error('Problem fetching data');
    return match;
};

// Fetching countries by region
const getCountriesByRegion = async (region) => {
    const data = await loadData();
    return data.filter((c) => c.region.toLowerCase() === region.toLowerCase());
};

// Fetching countries by codes (for borders)
const getCountriesByCodes = async (codes) => {
    const data = await loadData();
    const wanted = codes.map((c) => c.toLowerCase());
    return data.filter((c) => wanted.includes(c.alpha3Code.toLowerCase()));
};