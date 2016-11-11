var population
var total_frames = 200
var frames = 0
var no =0
var canvas
var frames_para
var para
var target
var button
var slider
var slider_heading
var slider_value
var mydiv


function setup() {
	canvas = createCanvas(640, 480);
  	canvas.class("canvas");
  	mydiv = createDiv("")
  	mydiv.class("info")
	population = new Population(30)
	frames_para = createP()
	para = createP()
	slider_heading = createP()
	slider_value = createP()
	para.html("Generation :" + no)
	slider_heading.html("Choose the population size , click start")
	slider = createSlider(0, 40, 30);
	slider.html(slider.value())
	slider.parent(slider_heading)

	slider_heading.parent(mydiv)
	slider_value.parent(mydiv)
	frames_para.parent(mydiv)
	para.parent(mydiv)

	target = createVector(width/2 , 50)
	button = createButton('Start');
	button.mousePressed(changeBG);
	button.parent(mydiv)
}

function draw() {
	background(0)
	ellipse(target.x , target.y , 20 , 20)
	population.run()
	slider_value.html("Population size : " + slider.value())
	frames_para.html("Life (ends at 200) :"+ frames)
	frames++
	if(frames == total_frames){
		no ++
		para.html("Generation :" + no)
		population.evaluate()
		population.selection()
		frames = 0
	}

}

function changeBG() {
	population = new Population(slider.value())
	no = 0
}

var Population = function(popsize){
	this.rockets = []

	for(var i = 0 ; i<popsize ; i++){
		this.rockets[i] = new Rocket()
	}

	this.run = function(){
		for(var i = 0 ; i<popsize ; i++){
			this.rockets[i].update()
			this.rockets[i].show()
		}
	}

	this.evaluate = function(){
		for(var i = 0 ; i<popsize ; i++){
			this.rockets[i].calculateFitness()
		}
		var total = this.rockets.reduce((acc, rocket) => acc + rocket.fitness, 0)
		
		this.rockets = this.rockets.map((rocket) => {
			rocket.fitness = rocket.fitness/total
			return rocket
		})
	}

	this.select_parent = function(){
		var random = Math.random() 
		for(var i = 0; i < this.rockets.length; i++) {
				var rocket = this.rockets[i]	
				if(random < rocket.fitness) {
						return rocket
				} else { random -= rocket.fitness }
		} return null
	}

	this.selection = function(){
		var newRockets = []
		for(var i=0;i< this.rockets.length ;i++){
			var parent_one_dna = this.select_parent().dna
			var parent_two_dna = this.select_parent().dna
			var child_dna = parent_one_dna.crossover(parent_two_dna)
			child_dna.mutate
			newRockets[i] = new Rocket(child_dna)
		}
		this.rockets = newRockets
	}
}



var Rocket = function(dna){
	this.pos = createVector(width/2 , height)
	this.vel = createVector()
	this.acc = createVector()
	this.bool = false
	if(dna){
		this.dna = dna
	}else{
		this.dna = new DNA()
	}
	this.fitness = 0


	this.applyForce = function(force){
		this.acc.add(force)
	}
	this.update = function(){
		var d = dist(this.pos.x , this.pos.y , target.x , target.y)
		if(d<10){
			this.bool = true
		}
		this.applyForce(this.dna.genes[frames])
		if(this.bool == false){
			this.vel.add(this.acc)
			this.pos.add(this.vel)
			this.acc.mult(0)	
		}

	}

	this.show = function(){
		push()
		translate(this.pos.x , this.pos.y)
		rotate(this.vel.heading())
		rectMode(CENTER)
		rect(0,0 , 20 ,5)
		pop()
	}

	this.calculateFitness = function(){
		var d = dist(this.pos.x ,this.pos.y , target.x , target.y )
		this.fitness = (1/d*10)
		if(this.bool == true){
			this.fitness *= 1.2
		}
	}
}

var DNA = function(genes){
	if(genes){
		this.genes = genes
	}else{
		this.genes = [];
		for (var i=0; i < total_frames ; i++){
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(0.3)
		}
	}

	this.crossover = function(parent_two_dna){
		let newgenes = []
		let mid = floor(random(this.genes.length))
		for(var i=0 ; i<this.genes.length ; i++){
			if(i<mid){
				newgenes[i] = this.genes[i]
			}else{
				newgenes[i] = parent_two_dna.genes[i]
			}
		}

		return new DNA(newgenes)
	}

	this.mutate = function(){
		for(var i=0;i<this.genes.length;i++){
			if(random(1)< .01){
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(0.3)
			}
		}
	}
	
}
