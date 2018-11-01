document.addEventListener('DOMContentLoaded', () => {
  parsePokemon(POKEMON)
  
  window.document.querySelector("#pokemon-search-input").addEventListener("keypress", filterPokemon)

})

function parsePokemon(pokemon_json) {
    let pokemon_card_array = []
    for (let pokemon of pokemon_json) {
        // build card
        // push card into array
        let card = buildPokemonCard(pokemon)
        card.querySelector(".sprite-box").addEventListener("click", flipCard)
        card.querySelector("h1").addEventListener("click", displayModal)
        pokemon_card_array.push(card)

    }
    // push pokemon_card_array into HTML
    let card_container = document.getElementById("pokemon-container")
    for (let card of pokemon_card_array) {
        card_container.appendChild(card)
    }
}

function buildPokemonCard(pokemon) {
    let name = pokemon.name
    let front_img_url = pokemon.sprites.front
    let back_img_url = pokemon.sprites.back

    let id = pokemon.id

    let top_level_div = document.createElement('div')
    top_level_div.className = "pokemon-container"

    let pokemon_frame = document.createElement('div')
    pokemon_frame.className = "pokemon-frame"
    top_level_div.appendChild(pokemon_frame)

    let center_text = document.createElement('h1')
    center_text.className = "center-text"
    center_text.innerText = name
    pokemon_frame.appendChild(center_text)

    let sprite_container = document.createElement('div')
    sprite_container.className = "sprite-container"
    pokemon_frame.appendChild(sprite_container)

    let sprite_box = document.createElement('div')
    sprite_box.className = "sprite-box"
    sprite_container.appendChild(sprite_box)

    let sprite_img = document.createElement('img')
    sprite_img.className = "toggle-sprite"
    sprite_box.appendChild(sprite_img)
    sprite_img.dataset.action = "flip"
    sprite_img.dataset.id = id
    sprite_img.dataset.flipped = "front"
    sprite_img.setAttribute('src', front_img_url)

    return top_level_div
}

function flipCard(event) {
    let card = event.currentTarget
    let image = card.querySelector("img")

    let pokemon_id = image.dataset.id
    let pokemon_flipped = image.dataset.flipped

    let pokemon_hash = getPokemon(pokemon_id)
    if(pokemon_flipped === "back"){
        image.src = pokemon_hash.sprites.front
        image.dataset.flipped = "front"
    }else{
        image.src = pokemon_hash.sprites.back
        image.dataset.flipped = "back"
    }

   
}
function getPokemon(idToFind){
    for (let pokemon of POKEMON) {
        if(pokemon.id == idToFind ){
            return pokemon
        }
    }
}

function filterPokemon(event) {
    let search_query = event.currentTarget.value.toLowerCase()
    let all_containers = document.querySelectorAll(".pokemon-container")
    for (let container of all_containers) {
        if (!container.querySelector("h1").innerText.includes(search_query)) {
            container.style.display = "none"
        }

    }
}

function displayModal(event) {
    let pokemon_id = event.currentTarget.parentElement.querySelector("img").dataset.id
    let pokemon_hash = getPokemon(pokemon_id)
    let moves = pokemon_hash.moves.join("\n")
    let abilities = pokemon_hash.abilities.join("\n")
    let types = pokemon_hash.types.join("\n")
    let modal_container = document.createElement('div')
    modal_container.id = "pokemon-detail"
    modal_container.class = "modal"
    let modal_text = `

      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Moves: ${moves}</p>
        <p>Abilities: ${abilities}</p>
        <p>Types: ${types}</p>
      </div>

    `
    modal_container.innerHTML += modal_text
    document.querySelector("#container").appendChild(modal_container)
    document.querySelector("#pokemon-detail").style.display = "block"
    document.querySelector(".close").addEventListener("click", function(e) {
        e.currentTarget.parentElement.parentElement.style.display = "none"
    })
}