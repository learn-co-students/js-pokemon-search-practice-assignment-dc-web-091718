document.addEventListener('DOMContentLoaded', () => {
  // console.log(POKEMON)

  parsePokemon(POKEMON)
  
})

function parsePokemon(pokemon_json) {
    let pokemon_card_array = []
    for (let pokemon of pokemon_json) {
        // build card
        // push card into array
        let card = buildPokemonCard(pokemon)
        card.querySelector(".sprite-box").addEventListener("click", function(){console.log('clicked')})
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
    console.log(name)
    let front_img_url = pokemon.sprites.front

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
    sprite_img.setAttribute('src', front_img_url)

    return top_level_div
}

// <div class="pokemon-container">
//         <div class="pokemon-frame">
//           <h1 class="center-text">venusaur</h1>
//           <div class="sprite-container">
//             <div class="sprite-box">
//               <img data-id="3" data-action="flip" class="toggle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png">
//             </div>
//           </div>
//         </div>
//       </div>