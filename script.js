"use strict";
const API = `https://restcountries.com/v3.1/`;

const section = document.querySelector(".section");

const searchInput = document.querySelector(".text-input")

let endPoint = "all"

/**
 *
 * Cette fonction permet de récupérer la liste de tous les pays
 *
 */
async function fetchAll() {
  try {
    // Envoie une requette à l'API et attend la réponse
    const response = await fetch(`${API}${endPoint}`);

    // Récupère les données de la réponse en JSON
    const data = await response.json();

    // Crée un tableau avec le premier élément de la liste
    const list = [...data];

    // Appelle la fonction renderCountries pour afficher
    handleCountriesList(list);
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * Cette fonction permet d'afficher la liste des pays
 *
 * @param {Array} list: Un tableau contenant les objets qui représentent les données des pays
 */
function handleCountriesList(list) {
  list.forEach((country) => {
    renderCountry(country);
  });
}

function renderCountry(country) {
  //   console.log(country);
  const currencies = country.currencies;
  const currency = currencies
    ? Object.entries(country.currencies)[0][1].name
    : "No Currency";
  const capital = country.capital ? country.capital[0] : "No Capital";

  let population = 0;

  if(country.population  >= 1000000000){
    population = (country.population / 1000000000).toFixed(1) + " Md";
  }else if(country.population >= 1000000){
    population = (country.population / 1000000).toFixed(1) + " M";
  }else if(country.population >= 1000){
    population = (country.population / 1000).toFixed(1) + " k";
  }else{
    population = country.population
  }
  //   console.log(capital);

  const markup = `<div class="card">
        <img class="card__img" src="${country.flags.png}"/>
        <div class="card__details">
          <p class="text text--md text--bold">${country.name.common}</p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">location_city</span>&nbsp; ${capital}
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">south_america</span>&nbsp;${country.region}
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">diversity_3</span>&nbsp;${population}
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">attach_money</span>&nbsp; ${currency} 
        
          </p>
        </div>
      </div>`;

  section.insertAdjacentHTML("beforeend", markup);
}



function initUI() {
  window.addEventListener("hashchange",()=>{
    const hash = location.hash.slice(1);

    section.innerHTML = "";

    endPoint = (hash == 'all')? `all`: `region/${hash}`;
    fetchAll();
  });

  searchInput.addEventListener("keyup",(e)=>{
    const nameContrie = searchInput.value;

    section.innerHTML = "";

    endPoint = `name/{${nameContrie}}`;
    // fetchAll()
  });
}

function init() {
  initUI();
  fetchAll();
}

init();
