document.addEventListener('DOMContentLoaded', () => {
  displayMon(filterPokemon());
  setUpEventListeners();
})

let searchString = ""

const displayMon = function(pokemon) {
  container = document.querySelector("#pokemon-container")
  container.innerHTML = ""
  pokemon.forEach(buildMon)
}

const buildMon = function(mon, index, pokemon) {

  container = document.querySelector("#pokemon-container")

  monName = document.createElement('h1')
  monName.className = "center-text"
  monName.innerText = mon.name

  monImage = document.createElement('img')
  monImage.dataset.id = mon.id
  monImage.dataset.action = 'flip'
  monImage.className = "toggle-sprite"
  monImage.src = mon.sprites.front
  monImage.addEventListener('click', (event) => {
    if (event.target.src === mon.sprites.front) {
      document.querySelector(`[data-id="${mon.id}"]`).src = mon.sprites.back
    } else {
      document.querySelector(`[data-id="${mon.id}"]`).src = mon.sprites.front
    }
  })

  monImageInnerDiv = document.createElement('div')
  monImageInnerDiv.style = "width:96px;margin:auto"
  monImageInnerDiv.appendChild(monImage)

  monImageOuterDiv = document.createElement('div')
  monImageOuterDiv.style = "width:239px;margin:auto"
  monImageOuterDiv.appendChild(monImageInnerDiv)

  monFrame = document.createElement('div')
  monFrame.className = "pokemon-frame"
  monFrame.style = "width:230px;margin:10px;background:#fecd2f;color:#2d72fc"
  monFrame.appendChild(monName)
  monFrame.appendChild(monImageOuterDiv)

  monContainer = document.createElement('div')

  monContainer.className = "pokemon-container"
  monContainer.appendChild(monFrame)

  container.appendChild(monContainer)
}

const setUpEventListeners = function() {
  document.querySelector("#pokemon-search-form").addEventListener('keydown', searchPokemon)
}

function searchPokemon(event) {
  console.log("searching")
  if (event.keyCode === 8) {
    searchString = searchString.slice(0,-1);
  } else {
    searchString += event.key
  }
  displayMon(filterPokemon())
}

function filterPokemon() {
  pokemonToDisplay = POKEMON.filter(pokemon => {
    return pokemon.name.includes(searchString)
  })
  return pokemonToDisplay
}