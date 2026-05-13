// Fetching all countries
const getCountries = async () => {
   const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3');
        if(response.status !== 200){
            throw new Error('Problem fetching data');
        }
   const data = await response.json();
   const allCountries = data;
   return allCountries;
}
//Fetching country by code
const getCountryByCode = async (code) => {
    const base = `https://restcountries.com/v3.1/alpha/${code}`;
    const response = await fetch(base);
        if(response.status !== 200){
            throw new Error('Problem fetching data');
        }
    const data = await response.json();
    const countryByCodeData = data[0];
    return countryByCodeData;
}
// Fetching country by name
const getCountryByName = async (country) => {
    const base = `https://restcountries.com/v3.1/name/`;
    const query = `${country}`;
    const response = await fetch(`${base}${query}`);
        if(response.status !== 200){
            throw new Error('Problem fetching data');
        }
    const data = await response.json();
    const countryNameData = data[0];
    return countryNameData;
}
// Fetching countries by region
const getCountriesByRegion = async (region) => {
    const base = `https://restcountries.com/v3.1/region/`;
    const query = `${region}`;
    const response = await fetch(`${base}${query}`);
        if(response.status !== 200){
            throw new Error('Problem fetching data');
        }
    const data = await response.json();
    const countriesByRegionData = data;
    return countriesByRegionData;
}