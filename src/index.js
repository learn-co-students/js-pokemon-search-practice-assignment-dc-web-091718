ef53cdd436cc6bbbd47174e9452ec464fd5ad9c4

var searchWord = ""
//var pokemonContainer = document.querySelector('#pokemon-container')

function populatePage() {

  //console.log(POKEMON)

  var pokemonContainer = document.querySelector('#pokemon-container')
  pokemonContainer.style.display = 'grid'
  pokemonContainer.style.gridTemplateColumns = 'auto auto auto auto'
  pokemonContainer.style.padding = '30px'



  input = document.querySelector('#pokemon-search-input')
  input.addEventListener('keydown', showSearchResults)

  //YOUR CODE HERE
//array.forEach(function(currentValue, index, arr), thisValue)
  POKEMON.forEach(function(element,index){

    var clicked = false

    //created new div
    var newRow =  document.createElement('div');
    //created class and id for new div
    newRow.className = `pokemon-obj`
    newRow.id = `pokemon_${index}`

    //found existing container and appended new outer div to container
    //var pokemonContainer = document.querySelector('#pokemon-container')
    pokemonContainer.appendChild(newRow)
    // var outerBox = document.getElementById(newRow.id)
    // console.log(newRow.id)

    //style outer box
    var pokemonElement = document.querySelector(`#${newRow.id}`);
    pokemonElement.style.width = '230px'
    pokemonElement.style.height = '159px'
    pokemonElement.style.background = '#fecd2f'
    // pokemonElement.style.display = 'grid'
    pokemonElement.style.gridAutoFlow = 'column'
    pokemonElement.style.margin = '10px '


    //create class for title
    var titleClass = document.createElement('h1')
    titleClass.className = 'title'
    pokemonElement.appendChild(titleClass)
    titleClass.innerText = `${element.name}`
    titleClass.style.color = "#2d72fc"
    titleClass.style.textAlign = "center"

    //create class for img
    var imgClass = document.createElement('div')
    imgClass.className = 'img'
    imgClass.style.paddingBottom = '10px'
    pokemonElement.appendChild(imgClass)

    var frontImage = `<img src = ${element.sprites.front}>`
    var backImage = `<img src = ${element.sprites.back}>`

    pokemonElement.addEventListener('click', function(){
      clicked = !clicked
      setBackgroundImage()
    })

    function setBackgroundImage() {
      if (!clicked) {
        imgClass.innerHTML = frontImage}
      else {
        imgClass.innerHTML= backImage
      }
    }

    setBackgroundImage()

    imgClass.style.textAlign = "center"


    //create class for image


    // found new div and updated innerTEXT and HTML with pokemon data


    //style each div
    //height
    //style title


    //width
    //background color
    //center title
    //add color to title
  } )

  //pokemon-container needs name...sprites{front and back}

}

document.addEventListener('DOMContentLoaded', populatePage)

function showSearchResults(event) {

 // console.log(event.key)
 var pokemonsClasses = document.getElementsByClassName('pokemon-obj')


 if (event.keyCode === 8) {
   searchWord = searchWord.slice(0, -1)
   //console.log(`searchword1 = ${searchWord}`)
 }
 else {
   searchWord = (searchWord + event.key)
   //console.log(`searchword2 = ${searchWord}`)
 }

 populatePage()

 var pokemonContainer = document.querySelector('#pokemon-container')
 // console.log(`LENGTH ${pokemonsClasses.length}`)
 Array.from(pokemonsClasses).forEach(function(pokemonClass) {

   // console.log(`searchword THREE = ${searchWord}`)
   if (pokemonClass.firstElementChild &&
     !(pokemonClass.firstElementChild.innerText.includes(searchWord))) {
     // console.log(`searchword FOUR = ${searchWord}`)
     pokemonContainer.removeChild(pokemonClass)
   }
 }

 )
}
