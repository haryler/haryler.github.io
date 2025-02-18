const baseUrl = "https://pokeapi.co/api/v2"

const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")
const container = document.getElementById("container")
const containerWithDetails = document.getElementById("containerWithDetails")

searchButton.addEventListener("click" , searchPokemon)

let currentPokemonData = null

async function searchPokemon() {
    if (searchInput.value) {
        try {
            const response = await fetch(`${baseUrl}/pokemon/${searchInput.value}`)
            if (!response.ok) {
                throw new Error("Error Status Code :" + response.status)
            }

            const data = await response.json()
            currentPokemonData = data
            console.log(data)

            const speciesResponse = await fetch(`${baseUrl}/pokemon-species/${searchInput.value}`)
            if (!speciesResponse.ok) {
                throw new Error("Error Status Code :" + response.status)
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

function showModal(pokeData, pokeTypes, speciesData) {

    const descriptionText = speciesData.flavor_text_entries.find(entry => entry.language.name === "fr")
    const description = descriptionText.flavor_text.replace(/\n|\f/g, " ")

    containerWithDetails.innerHTML = `<div id="modal" class="modal" style="display: block;>
        <div class="modal-content">
            <span id="closeModal" class="close">&times;</span>
            <div id="modalDetails">
            <h3>Description</h3>
            <p>${description}</p>
            <p>Color : ${speciesData.color.name}</p>
            <p>Weight : ${pokeData.weight}</p>
            <p>Height : ${pokeData.height}</p>
            <h3>Stats</h3>
            <p><strong>HP :</strong> ${pokeData.stats.find(s => s.stat.name === "hp")?.base_stat} </p>
            <p><strong>Attack :</strong> ${pokeData.stats.find(s => s.stat.name === "attack")?.base_stat} </p>
            <p><strong>Defense :</strong> ${pokeData.stats.find(s => s.stat.name === "defense")?.base_stat} </p>
            <p><strong>Special Attack :</strong> ${pokeData.stats.find(s => s.stat.name === "special-attack")?.base_stat} </p>
            <p><strong>Special Defens :</strong> ${pokeData.stats.find(s => s.stat.name === "special-defense")?.base_stat} </p>
            <p><strong>Speed :</strong> ${pokeData.stats.find(s => s.stat.name === "speed")?.base_stat} </p>
            <p><strong>Abilitie(s) :</strong> ${pokeData.abilities.map(a => a.ability.name).join(", ")}</p>

            </div>
        </div>

        </div>`

    document.getElementById("closeModal").addEventListener("click", function() {
            document.getElementById("modal").style.display = "none"
    })
    

}