# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).  

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)


## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Bootstrap 5
- Vanilla JS


### What I learned

I leant about code based routing, dived deeper into using the fetch API and understanding queries


```js
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
```

### Continued development
This project made me aware of concepts like code based routing, routing in general and SPA. In future I plan to work more with this concepts. I also plan to learn how to use APIs other than the fetch API


### AI Collaboration

I made use of Github Copilot to learn about concepts I no knowledge before and for generate UI boilerpates



