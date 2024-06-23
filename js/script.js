const BASEURL = "https://pokeapi.co/api/v2/pokemon/";

document.addEventListener("DOMContentLoaded", getPokemonList);

function getPokemonList() {
    fetch(BASEURL + '?limit=1025')
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                displayPokemon(pokemon);
            });
        })
        .catch(error => console.error(error));
}

function displayPokemon(pokemon) {
    const pokemonList = document.getElementById("ListaPokemons");

    const listItem = document.createElement("li");

    const pokemonImage = document.createElement("img");
    const pokemonId = pokemon.url.split('/')[6];

    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    
    const pokemonName = document.createElement("div");
    pokemonName.textContent = `${pokemon.name} - ${pokemonId}`;
    pokemonName.className = "pokemon-name";

    const pokemonType = document.createElement("div");
    pokemonType.textContent = "⚡";
    pokemonType.className = "pokemon-type";

    listItem.appendChild(pokemonImage);
    listItem.appendChild(pokemonName);
    listItem.appendChild(pokemonType);

    pokemonList.appendChild(listItem);
}
