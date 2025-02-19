const baseUrl = "https://pokeapi.co/api/v2"

const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")
const container = document.getElementById("container")
const containerWithDetails = document.getElementById("containerWithDetails")
let currentPokemonData = null

fetchRandomRecommendations()

searchButton.addEventListener("click" , searchPokemon)

// Load SearchHistory in localStorage, or empty array if localStorage is empty
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
renderHistory()

// Execute SearchPokemon when user clicks on a pokemon in History
document.getElementById("historyList").addEventListener("click", function(e) {
    const li = e.target.closest(".history-item")
    if (li) {
        const pokemonName = li.getAttribute("data-name")
        searchInput.value = pokemonName
        searchPokemon()
    }
})


//API Calls to retrieve pokemon data and display them with a new button (more details button)
async function searchPokemon() {
    if (searchInput.value) {
        try {
            const response = await fetch(`${baseUrl}/pokemon/${searchInput.value}`)
            if (!response.ok) {
                throw new Error("Error Status Code :" + response.status)
            }

            const data = await response.json()
            currentPokemonData = data

            addToHistory({name: data.name, image: data.sprites.front_default })


            const speciesResponse = await fetch(`${baseUrl}/pokemon-species/${searchInput.value}`)
            if (!speciesResponse.ok) {
                throw new Error("Error Status Code :" + speciesResponse.status)
            }

            const speciesData = await speciesResponse.json()

            let pokemonTypes = ""
            for (let type of data.types) {
                pokemonTypes += `${type.type.name} `
            }
        
            container.innerHTML = `<div>
            <img src="${data.sprites.front_default}"/>
            <h2>${data.name}</h2>
            <p>Type(s) : ${pokemonTypes}</p>
            <button id="detailsButton">More details</button>
            </div>`

            const detailsButton = document.getElementById("detailsButton")
            detailsButton.addEventListener("click", () => showModal(currentPokemonData, pokemonTypes, speciesData))
            
        }
        catch (error) {
            alert("Aucun pokemon trouvé")
        }
    }
}

// Display more info in modal
function showModal(pokeData, pokeTypes, speciesData) {

    const descriptionText = speciesData.flavor_text_entries.find(entry => entry.language.name === "fr")
    const description = descriptionText.flavor_text.replace(/\n|\f/g, " ")

    container.innerHTML = `
    <div>
            <img src="${pokeData.sprites.front_default}"/>
            <h2>${pokeData.name}</h2>
            <p>Type(s) : ${pokeTypes}</p>
            <button id="detailsButton">More details</button>
    

        <div id="modal" class="modal" style="display: flex;">
            <div class="modal-content">
                <span id="closeModal" class="close">&times;</span>
                <div id="modalDetails">
                    <h3>Description</h3>
                    <p>${description}</p></br>
                    <p><strong>Color :</strong> ${speciesData.color.name}</p>
                    <p><strong>Weight :</strong> ${pokeData.weight}</p>
                    <p><strong>Height :</strong> ${pokeData.height}</p></br>
                    <h3>Stats</h3>
                    <p><strong>HP :</strong> ${pokeData.stats.find(s => s.stat.name === "hp")?.base_stat} </p>
                    <p><strong>Attack :</strong> ${pokeData.stats.find(s => s.stat.name === "attack")?.base_stat} </p>
                    <p><strong>Defense :</strong> ${pokeData.stats.find(s => s.stat.name === "defense")?.base_stat} </p>
                    <p><strong>Special Attack :</strong> ${pokeData.stats.find(s => s.stat.name === "special-attack")?.base_stat} </p>
                    <p><strong>Special Defens :</strong> ${pokeData.stats.find(s => s.stat.name === "special-defense")?.base_stat} </p>
                    <p><strong>Speed :</strong> ${pokeData.stats.find(s => s.stat.name === "speed")?.base_stat} </p></br>
                    <p><strong>Abilitie(s) :</strong> ${pokeData.abilities.map(a => a.ability.name).join(", ")}</p>
                </div>
            </div>

        </div>
    </div>`

    document.getElementById("closeModal").addEventListener("click", function() {
            document.getElementById("modal").style.display = "none"
    })
}

// Add a pokemonObj (name + sprite URL) to History (localstorage)
// This function is called eachtime a pokemon is clicked by user
function addToHistory(pokemonObj) {
    // Don't add if already exists in history
    searchHistory = searchHistory.filter(item => item.name !== pokemonObj.name)

    // add the pokemon to history
    searchHistory.unshift(pokemonObj)

    //Max 5 items
    if (searchHistory.length > 5) {
        searchHistory.pop()
    }

    //Save history in localStorage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))

    renderHistory()

}

// Display/Refresh History 
function renderHistory() {
    const historyList = document.getElementById("historyList")
    historyList.innerHTML = searchHistory.map(item => {
        // Utilise des valeurs par défaut si les données sont manquantes
        const name = item.name || "";
        const image = item.image || "";
        return `
        <li class="history-item" data-name="${name}">
            <img src="${image}" alt="${name}" />
            <span>${name}</span>
        </li>`;
    }).join("");
}

//Draw 5 random numbers between 1 and 1025, then display corresponding pokemons in the right section
async function fetchRandomRecommendations() {
    const recommendationsContainer = document.getElementById("recommendations");

    recommendationsContainer.innerHTML = "<h3>Random Pokemons</h3>";

    // 5 random numbers (no double)
    const randomIds = [];
    while(randomIds.length < 5) {
        const randomId = Math.floor(Math.random() * 1025) + 1; 
        if(!randomIds.includes(randomId)) {
            randomIds.push(randomId);
        }
    }

    // Retrieve data for each number (each pokemon) and display them
    try {
        const promises = randomIds.map(id =>
            fetch(`${baseUrl}/pokemon/${id}`).then(response => response.json())
        );
        const pokemons = await Promise.all(promises);

        pokemons.forEach(pokemon => {
            const div = document.createElement("div");
            div.classList.add("recommendation");
            div.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                <p>${pokemon.name}</p>
            `;
            // Display directly modal and more details when a pokemon is clicked (bug ?)
            div.addEventListener("click", () => {
                addToHistory({name: pokemon.name, image: pokemon.sprites.front_default })
                fetch(`${baseUrl}/pokemon-species/${pokemon.id}`)
                .then(resp => resp.json())
                .then(speciesData => {
                    let pokeTypes = pokemon.types.map(type => type.type.name).join(" ");
                    showModal(pokemon, pokeTypes, speciesData);
                })
                .catch(error => console.error("Erreur lors de la récupération des détails du Pokémon", error));
            });
            recommendationsContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon recommandés", error);
    }
}
