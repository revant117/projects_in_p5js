var ship
var shipImage
var bullets
var bulletImage
var missileImage
var MARGIN = 40;
var mousePosition = {}
var missiles
var launcher_bottom_pos
var launcher_bottom_move

var launcher_side_pos
var launcher_side_move

var launch_health
var score
var score_counter

var explosion
var health_pickup

var clouds
var cloud_img
var cloud

function setup() {

  	createCanvas(800,600);

  	shipImage = loadImage("sprites/plane_smaller.png");
	bulletImage = loadImage("sprites/black-dot.png")
	missileImage = loadImage("sprites/missile_pixel_smaller.png")
	healthImage = loadImage("sprites/heart_pixel_small.png")
	cloud_img = loadImage("sprites/cloud.png")
	explosion = loadAnimation( "sprites/explosion_2.png" , "sprites/plane_smaller.png");
	health_pickup = loadAnimation("sprites/heart.png" ,"sprites/plane_smaller.png" );

	mousePosition.x = width/2
	mousePosition.y = height/2
	clouds = new Group();

	for(var i = 0; i<3; i++) {
	  var ang = random(360);
	  var px = width/2 + 1000 * cos(radians(ang));
	  var py = height/2+ 1000 * sin(radians(ang));
	  createCloud(3, px, py);
  	}

	ship = createSprite(width/2, height/2);
	ship.maxSpeed = 6;
	ship.friction = .98;
	ship.addImage("normal", shipImage);
	ship.value = 500
	
	launcher_bottom_pos = createVector(width/2 , height-10)
	launcher_bottom_move = 0

	launcher_side_pos = createVector(width-10 , height/2)
	launcher_side_move = 0
	launch_health = 0

	score = 0
	score_counter = 0

	healths = new Group();
	missiles = new Group();
	bullets = new Group();
}


  
function draw() {
	background(	0 ,191 , 255);

	if(ship.value < 0 || ship.value == 0){
		score = 0
		ship.value = 500
	}

	healths.overlap(missiles, health_hit)
	missiles.overlap(ship , ship_hit)
	healths.overlap(ship , ship_gained)

	fill(0);
	textSize(15); 
	text("Health : " + ship.value, 20, 20);

	fill(0);
	textSize(15); 
	text("Score : " + score, 20, 35);

	score_counter ++ 
	if(score_counter == 60){
			score_counter = 0
			score ++	
	}

	for(var i=0; i<healths.length; i++){
		healths[i].value = healths[i].value - 1
		if(healths[i].value == 0){
			healths[i].remove()
		}
    }

  	 for(var i=0; i<allSprites.length; i++) {
  		var s = allSprites[i];
	  if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
	  if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
	  if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
	  if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
 	 }


 	fill(120)
 	rectMode(CENTER)
	rect(launcher_bottom_pos.x,launcher_bottom_pos.y , 20 ,20)
	launcher_bottom_move ++
	if(launcher_bottom_move == 90){
		launcher_bottom_move = 0
		var x_move = random(-300, 300)
		var new_x = launcher_bottom_pos.x + x_move
		if(new_x > width || new_x < 0){
			new_x = random(200 , 600)
		}
		launcher_bottom_pos.x = new_x
		missile(new_x, launcher_bottom_pos.y , "bottom")
	}

 	rectMode(CENTER)
	rect(launcher_side_pos.x,launcher_side_pos.y , 20 ,20)
	launcher_side_move ++
	if(launcher_side_move == 90){
		launcher_side_move = 0
		var y_move = random(-200, 200)
		var new_y = launcher_side_pos.y + y_move
		if(new_y > height || new_y < 0){
			new_y = random(100 , 500)
		}
		launcher_side_pos.y = new_y
		missile(launcher_side_pos.x , new_y , "side")
	}

	launch_health++
	if(launch_health == 90){
		launch_health = 0
		var health = createSprite(random(300 , 600),random(200 , 400));
		health.value = 450
	    health.addImage(healthImage);
	    health.setVelocity(random(-4,4) , random(-4,4));
	    healths.add(health);
	}

	  for(var i=0; i<missiles.length; i++){
	  	if(missiles[i].position.y < 0){
	  		missiles[i].remove()
	  	}

	  	if(missiles[i].position.x < 0){
	  		missiles[i].remove()
	  	}

    }

	if(keyDown(LEFT_ARROW)){
    	ship.rotation -= 4;
  	}
    if(keyDown(RIGHT_ARROW)){
    	ship.rotation += 4;
  	}
  	if(keyDown(UP_ARROW)){
    	ship.addSpeed(.5, ship.rotation);
    }
   
  //   if(mouseDown(LEFT)){
  //   	mousePosition.x = mouseX
  //   	mousePosition.y = mouseY
  //   }

  //   var angleDeg = Math.atan2(ship.position.y - mousePosition.y, ship.position.x - mousePosition.x) * 180 / Math.PI;
 	// ship.rotation = angleDeg+180;
 	// ship.velocity.x = (mousePosition.x-ship.position.x)/10;
  // 	ship.velocity.y = (mousePosition.y-ship.position.y)/10;

    if(keyWentDown("a")){
    	console.log('a')
	    var bullet = createSprite(ship.position.x, ship.position.y);
	    bullet.addImage(bulletImage);
	    bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
	    bullet.life = 30;
	    bullets.add(bullet);
    }

    // ------------------------------------  missile functionality 

   //  if(keyWentDown("d")){
   //  	console.log('d')
	    // var missile = createSprite(0,0);
	    // missile.addImage(missileImage);
	    // missile.life = 300;
	    // missile.setVelocity(4,2);
	    // console.log(atan2(missile.velocity.y , missile.velocity.x) * 180 / Math.PI)
	    // console.log(ship.velocity)
	    // console.log(atan2(ship.velocity.y , ship.velocity.x) * 180 / Math.PI)
	    // console.log((atan2(missile.velocity.y , missile.velocity.x) * 180 / Math.PI) - (atan2(ship.velocity.y , ship.velocity.x) * 180 / Math.PI))
	    // missiles.add(missile);
   //  }
   //      for(var i=0; i<missiles.length; i++){
   //  	var angleMissileDeg = Math.atan2(missiles[i].position.y - ship.position.y, missiles[i].position.x - ship.position.x) * 180 / Math.PI;
	 	// console.log(angleMissileDeg)
	 	// missiles[i].rotation = angleMissileDeg+180;
	 	// missiles[i].velocity.x = (ship.position.x-missiles[i].position.x)/10;
	  // 	missiles[i].velocity.y = (ship.position.y-missiles[i].position.y)/10;
   //  }

    drawSprites();
}

function missile(x, y , from){
	
	if(from == "bottom"){
		var missile = createSprite(x,y);
		missile.rotation = -90
	    missile.addImage(missileImage);
	    var vel_y = random(-2 , -3)
	    missile.setVelocity(0,vel_y);
	    missiles.add(missile);
	}else if (from = "side") {
		var missile = createSprite(x,y);
		missile.rotation = -180
	    missile.addImage(missileImage);
	    var vel_x = random(-2 , -3)
	    missile.setVelocity(vel_x , 0);
   	 	missiles.add(missile);
	}
	
}

function health_hit(health , missile){
	health.remove()
	missile.remove()
}

function ship_hit(missile , ship){
	animation(explosion, ship.position.x, ship.position.y)
	animation(explosion, ship.position.x, ship.position.y)
	animation(explosion, ship.position.x, ship.position.y)
	animation(explosion, ship.position.x, ship.position.y)
	animation(explosion, ship.position.x, ship.position.y)
	animation(explosion, ship.position.x, ship.position.y)
	missile.remove()
	ship.value = ship.value - 100
}

function ship_gained(health , ship){
	animation(health_pickup, ship.position.x, ship.position.y)
	animation(health_pickup, ship.position.x, ship.position.y)
	animation(health_pickup, ship.position.x, ship.position.y)
	animation(health_pickup, ship.position.x, ship.position.y)
	animation(health_pickup, ship.position.x, ship.position.y)
	animation(health_pickup, ship.position.x, ship.position.y)
	health.remove()
	ship.value = ship.value + 25
}


function createCloud(x, y) {
  var a = createSprite(x, y);
  a.addImage(cloud_img);
  a.setSpeed(2.5 , random(360));
  a.rotationSpeed = .5;
  //a.debug = true;
  // a.scale = .6;
  clouds.add(a);
  return a;
}