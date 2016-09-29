//------------------------------------------------------
// Implementing rejection sampling 
// This will be used to select parents from mating pool
// randomly based on how fit a parent is
//------------------------------------------------------

//sample data
let population = [
		["a", 100],
		["b", 404],
		["c", 788],
		["i", 220]
]

// getting total sum
let total = population.reduce((acc, element) => acc + element[1], 0)

// normalizing the sum
let weighted = population.map((element) => [element[0], element[1] / total])

// selecting an element randomly but based on its value
// higher the value , more the chances of that element to be selected  
const select = (array) => {
		let random = Math.random() // any random number between 0 and 1
		for(var i = 0; i < array.length; i++) {
				let [value, weight] = array[i]
				if(random < weight) {
						return value
				} else { random -= weight }
		} return null
}

for(var i =0 ; i<10 ; i++){
	console.log(select(weighted))
}
