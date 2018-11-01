document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  const pokemonContainer = document.getElementById("pokemon-container")
  let pokemonNames = []
  let pokemonFrontImages = {}
  let pokemonBackImages = {}
  let pokemonImageFlip = {}
  for (x of POKEMON) {
    pokemonNames.push(x.name)
    pokemonFrontImages[x.name] = x.sprites.front
    pokemonImageFlip[x.sprites.front] = x.sprites.back
    pokemonImageFlip[x.sprites.back] = x.sprites.front
  }
  //YOUR CODE HERE

  function generatePokemon(name) {
    let newPokemon = document.createElement('div')
    let render = `<div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img data-id="2" data-action="flip" id="${name}" class="toggle-sprite" src="${pokemonFrontImages[name]}" />
            </div>
          </div>
        </div>`

        newPokemon.innerHTML = render
        newPokemon.setAttribute("class", "pokemon-container")
        pokemonContainer.appendChild(newPokemon)
        let currentPokemon = document.getElementById(name)
        currentPokemon.addEventListener('click', function() {
          currentPokemon.setAttribute("src", `${pokemonImageFlip[currentPokemon.getAttribute("src")]}`)
        })

  }
  let currentPokemon;

  for (x of pokemonNames) {
    generatePokemon(x);
  }

  let searchInput = document.getElementById("pokemon-search-input")
  searchInput.addEventListener('keyup', function() {
  let filterNames = pokemonNames.filter(element => element.includes(searchInput.value))
  pokemonContainer.innerHTML = ""
  console.log(filterNames)
  for (x of filterNames) {
    generatePokemon(x)
  }
  })

})
