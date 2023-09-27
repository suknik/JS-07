// Fetch
//
// Post

const BASE_URL = 'https://pokeapi.co/api/v2/';
const cardContainer = document.querySelector('.card--container');

// Fetch no asíncrono

// fetch(BASE_URL+'pokemon/ditto')
//     .then((res) => res.json())
//     .then(data => console.log(data));

// fetch async

const fetchPokemon = async(pokemon) => {
    try{
        // const response = await fetch(BASE_URL+'pokemon/ditto');
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.log(err)
    }
}


document.querySelector('#get-btn').addEventListener('click', async() => {
    const text = document.querySelector('#poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    localStorage.setItem('currentPokeId', pokemon.id);
    displayCard(pokemon);
    console.log(pokemon)
})

document.addEventListener('DOMContentLoaded', async() => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1
    const pokemon = await fetchPokemon(initialId);
    displayCard(pokemon);
    console.log(pokemon.name);
})

// obtener el anterior
//
//
//obtener el siguiente

document.querySelector('#previous-btn').addEventListener('click', async() => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId-1);
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name);
    localStorage.setItem('currentPokeId', newId);
    displayCard(pokemon);
})

document.querySelector('#next-btn').addEventListener('click', async() => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = currentPokeId+1;
    const pokemon = await fetchPokemon(newId);
    console.log(pokemon.name);
    localStorage.setItem('currentPokeId', newId);
    displayCard(pokemon)
})


///////////// POST
//

fetch('https://jsonplaceholder.typicode.com/posts',
    {
        method: 'POST',
        body: JSON.stringify({
            title: 'title1',
            body: 'lorem ipsum dolor sit amet',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(res => res.json()).then(json => console.log(json))


// Ejercicios
// - Arreglar el pokemon en local-storage
// - Manipular el DOM y agregar un tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal
// - La tarjeta debe de mantenerse en la pantalla.
// - La info -> localStorage -> Fetch

let currentCard; 

function displayCard(pokemon) {
    const card = createCard();
    const cardStructure = createStructure();
    const populatedStructure = populateStructure(pokemon, cardStructure);
    card.append(populatedStructure.pokeName, populatedStructure.pokeId, populatedStructure.pokeWeight, populatedStructure.pokeSpriteFront, populatedStructure.pokeSpriteBack);
    let cuenta = cardContainer.childElementCount > 0 ? cardContainer.replaceChild(card, currentCard) : cardContainer.appendChild(card); 
    currentCard = card;

}

function createCard() {
    const pokeCard = document.createElement('div');
    pokeCard.classList.add('card--container');
    return pokeCard;
}

function createStructure() {
    const structure = {
        pokeName: document.createElement('h2'),
        pokeId: document.createElement('P'),
        pokeWeight: document.createElement('P'),
        pokeSpriteFront: document.createElement('img'),
        pokeSpriteBack: document.createElement('img')
    }
    console.log(structure);
    return structure;
}

function populateStructure(pokemon, cardStructure) {
    cardStructure.pokeName.textContent = `Nombre Pokémon: ${pokemon.name}`;
    cardStructure.pokeId.textContent = `Id pokémon: ${pokemon.id}`;
    cardStructure.pokeWeight.textContent = `Peso pokémon: ${pokemon.weight}`;
    cardStructure.pokeSpriteFront.src = pokemon.sprites.back_default;
    cardStructure.pokeSpriteBack.src = pokemon.sprites.front_default;
    return cardStructure;
}