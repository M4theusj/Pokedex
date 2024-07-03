const BASEURL = "https://pokeapi.co/api/v2/pokemon/";

document.addEventListener("DOMContentLoaded", function() {
    getPokemonList();

    var modalPesquisar = document.getElementById("ModalPesquisar");
    var btnPesquisar = document.getElementById("openModalButton");
    var janelaPesquisar = document.getElementsByClassName("close")[0];
    var inputPokemonId = document.getElementById("pokemonIdInput");
    var searchPokemonButton = document.getElementById("searchPokemonButton");
    modalPesquisar.style.display = "none";

    btnPesquisar.onclick = function() {
        modalPesquisar.style.display = "flex";
    }

    janelaPesquisar.onclick = function() {
        modalPesquisar.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalPesquisar) {
            modalPesquisar.style.display = "none";
        }
    }

    searchPokemonButton.onclick = function() {
        const pokemonId = inputPokemonId.value.trim();
        if (pokemonId) {
            modalPesquisar.style.display = "none";
            scrollToPokemon(pokemonId);
        }
    }


function getPokemonList() {
    fetch(BASEURL + '?limit=1025')
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetchPokemonDetails(pokemon);
            });
        })
        .catch(error => console.error(error));
}

function fetchPokemonDetails(pokemon) {
    const pokemonId = pokemon.url.split('/')[6];
    fetch(BASEURL + pokemonId)
        .then(response => response.json())
        .then(details => {
            displayPokemon(details);
        })
        .catch(error => console.error(error));
}

function displayPokemon(pokemon) {
    const pokemonList = document.getElementById("ListaPokemons");
    const listItem = document.createElement("li");
    listItem.id = `pokemon-${pokemon.id}`;

    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.sprites.front_default;

    const pokemonName = document.createElement("div");
    pokemonName.textContent = `${pokemon.id} - ${pokemon.name}`;
    pokemonName.className = "pokemon-name";

    const pokemonTypes = document.createElement("div");
    pokemonTypes.className = "pokemon-types";
    pokemon.types.forEach(type => {
        const typeUrlParts = type.type.url.split('/');
        const typeId = typeUrlParts[typeUrlParts.length - 2];

        const typeIconContainer = document.createElement("div");
        typeIconContainer.className = "type-icon-container";

        const typeIcon = document.createElement("img");
        typeIcon.src = `img/${typeId}.png`;
        typeIcon.className = "pokemon-type-icon";

        const typeIconDuplicate = document.createElement("img");
        typeIconDuplicate.src = `img/${typeId}.png`;
        typeIconDuplicate.className = "pokemon-type-icon duplicate";

        typeIconContainer.appendChild(typeIcon);

        pokemonTypes.appendChild(typeIconContainer);
    });

    listItem.appendChild(pokemonImage);
    listItem.appendChild(pokemonName);
    listItem.appendChild(pokemonTypes);
    pokemonList.appendChild(listItem);
}

function scrollToPokemon(pokemonId) {
    const targetPokemon = document.getElementById(`pokemon-${pokemonId}`);
    if (targetPokemon) {
        targetPokemon.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetPokemon.classList.add('hover');
        setTimeout(() => {
            targetPokemon.classList.remove('hover');
        }, 1500);
    }
}
});