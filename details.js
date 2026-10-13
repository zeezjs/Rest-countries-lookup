// Details page logic
const param = new URLSearchParams(window.location.search);
const code = param.get('code');
const detailsContainer = document.querySelector('.detail-container');

// Details Page logic
const detailFunction = async (code) => {
    try {
        const country = await getCountryByCode(code);

        // Fetch border countries if they exist
        let borderButtons = '';
        if (country.borders && country.borders.length > 0) {
            const borderCountries = await getCountriesByCodes(country.borders);
            borderButtons = borderCountries.map(borderCountry =>
                `<a href="details.html?code=${borderCountry.alpha3Code}" class="btn btn-sm bg-body-tertiary shadow-sm rounded-1">${borderCountry.name}</a>`
            ).join('');
        }

        const detailHtml = `
        <div class="col-12 col-lg-6">
                <figure class="mb-0">
                    <img src="${country.flags.svg}" class="img-fluid rounded-2 shadow-sm w-100" alt="${country.name} flag">
                </figure>
            </div>

            <div class="col-12 col-lg-6 mx-auto">
                <article>
                    <h1 class="fw-bold mb-4">${country.name}</h1>

                    <div class="row g-4">
                        <div class="col-12 col-md-6">
                            <dl class="row mb-0">
                                <dt class="col-5 fw-semibold">Native Name:</dt>
                                <dd class="col-7 mb-2">${country.nativeName || 'N/A'}</dd>

                                <dt class="col-5 fw-semibold">Population:</dt>
                                <dd class="col-7 mb-2">${country.population.toLocaleString()}</dd>

                                <dt class="col-5 fw-semibold">Region:</dt>
                                <dd class="col-7 mb-2">${country.region}</dd>

                                <dt class="col-5 fw-semibold">Sub Region:</dt>
                                <dd class="col-7 mb-2">${country.subregion || 'N/A'}</dd>

                                <dt class="col-5 fw-semibold">Capital:</dt>
                                <dd class="col-7 mb-0">${country.capital || 'N/A'}</dd>
                            </dl>
                        </div>

                        <div class="col-12 col-md-6">
                            <dl class="row mb-0">
                                <dt class="col-5 fw-semibold">Top Level Domain:</dt>
                                <dd class="col-7 mb-2">${country.topLevelDomain?.[0] || 'N/A'}</dd>

                                <dt class="col-5 fw-semibold">Currencies:</dt>
                                <dd class="col-7 mb-2">${country.currencies ? country.currencies.map(currency => currency.name).join(', ') : 'N/A'}</dd>

                                <dt class="col-5 fw-semibold">Languages:</dt>
                                <dd class="col-7 mb-0">${country.languages ? country.languages.map(language => language.name).join(', ') : 'N/A'}</dd>
                            </dl>
                        </div>
                    </div>

                    <div class="mt-4 border-countries d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
                        <h2 class="h5 fw-semibold mb-0">Border Countries:</h2>
                        <div class="d-flex flex-wrap gap-2 hover-lift">
                            ${borderButtons || '<span class="text-muted">None</span>'}
                        </div>
                    </div>
                </article>
            </div>`;
        detailsContainer.innerHTML = detailHtml;

    } catch (error) {
        console.log('error pulling country details', error.message);
    }
};

// Run details function if on details page and code exists
if (code && detailsContainer) {
    detailFunction(code);
}