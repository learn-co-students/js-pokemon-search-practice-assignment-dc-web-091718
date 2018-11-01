document.addEventListener('DOMContentLoaded', () => {
let searchBar = document.getElementById("pokemon-search-input");
searchBar.addEventListener("input", search)
populatePokemon();
listPokemon(pokemonArray);
})

class Pokemon {
  constructor (data) {
    this.name = data.name;
    this.sprites = data.sprites;
    this.front = true;
  }

  addHTML() {
    let div = document.createElement("div");
    div.className = "pokemon-frame"
    let name = document.createElement("h1");
    name.innerText = this.name;
    name.className = "center-text";
    let image = document.createElement("img");
    image.src = this.sprites.front;
    image.className = "center-image"
    div.appendChild(name);
    div.appendChild(image);
    image.addEventListener("click", (e) => this.toggleImage(e, image))
    return div;
  }

  toggleImage(e, image) {
    this.front = !this.front;
    if (this.front) {
      image.src = this.sprites.front
    } else {
      image.src = this.sprites.back;
    }
  }
}

let pokemonArray = [];

function populatePokemon () {
  POKEMON.forEach( (e) => {
    pokemonArray.push(new Pokemon(e));
  })
};

function listPokemon (arr) {
  let div = document.getElementById("pokemon-container");
  div.remove();
  div = document.createElement("div");
  div.id = "pokemon-container";
  div.innerHTML = "<p><center id='non-found'>There are no Pokémon here</center></p>";
  document.getElementById("container").appendChild(div);
  if (arr.length === 0) {
    document.getElementById("non-found").hidden = false;
  } else {
    arr.forEach((e) => {
    div.appendChild(e.addHTML());
    })
    document.getElementById("non-found").hidden = true;
  }
}

function search(event) {
  let query = event.target.value;
  let filtered = pokemonArray.filter((e) =>{
    return e.name.includes(query);

  });

  listPokemon(filtered);
}
