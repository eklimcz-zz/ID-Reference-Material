PVector force;
Mover[] movers = new Mover[1000];
Mover m;
Attractor a;
int width = $(window).width();
int height = $(window).height();
PVector randomForce;
boolean keyFlag = true;
boolean on = false;
boolean gravity = false;

void setup() {

	size(width, height); 
	frameRate(60);
	smooth();
	noStroke();
	background(36, 83, 197);

	for (int i = 0; i < movers.length; i++) {
		movers[i] = new Mover(random(0, width), random(0, height), random(5, 10));	
		movers[i].display();
	}

	a = new Attractor();
	$('#sketch').focus();
}


void keyPressed() {

	if (keyCode == 32 && on == false) {
		on = true;
	}
	if (keyCode == 40 && gravity == false) {
		gravity = true;
	}

}


void keyReleased() {
	
	if (keyCode == 32) {
		on = false;
	}

	if (keyCode == 40 && gravity == true) {
		
		gravity = false;
		
		for (int i = 0; i < movers.length; i++) {			
			force = new PVector(0, random(10, 51));
			movers[i].applyForce(force);
		}
	}


}

void draw() {


	background(36, 83, 197);

	for (int i = 0; i < movers.length; i++) {
		m = movers[i];
		PVector force;
		if (on) {

			force = a.attract(m);
		} else {

			force = new PVector(random(-.1, .1), random(-.1, .1));
		}
		if (gravity) {
			force = new PVector(0, 4);			
		}

		m.applyForce(force);
		m.update();
		m.display();
	}

}


//------------------------ OBJECTS --------------------------------------

class Mover {
	PVector location;
	PVector velocity;
	PVector acceleration;
	float mass;

	Mover(float _x, float _y, float _mass) {
		mass = _mass;
		location = new PVector(_x, _y);
		velocity = new PVector(0, 0);
		acceleration = new PVector(0, 0);
	}

	void display() {
		noStroke();
		fill(250, 128);
		ellipse(location.x, location.y, mass, mass);
	}

	void update() {
		velocity.add(acceleration);
		location.add(velocity);
		checkEdges();
		acceleration.mult(0);
	}

	void applyForce(PVector force) {
		PVector f = PVector.div(force, mass);
		acceleration.add(f);
	}
	void setAcceleration(PVector acc) {
		acceleration.set(acc);
	}

	void checkEdges() {
		if (location.x > width) {
			location.x = width;
			velocity.x *= -.3;
		}

		if (location.x < 0) {
			location.x = 0;
			velocity.x *= -.3;
		}

		if (location.y > height) {
			location.y = height;
			velocity.y *= -.3;
		}
		if (location.y < 0) {
			location.y = 0;
			velocity.y *= -.3;
		}

	}
}


class Attractor {
	PVector location;
	float mass;

	Attractor() {
		location = new PVector(width / 2, height / 2);
		mass = 100;
	}

	void display() {
		// fill(36, 83, 197);
		fill(0, 0);
		stroke(250);
		strokeWeight(2);
		ellipse(location.x, location.y, 50, 50);
	}

	PVector attract(Mover m) {
		float c = 1;
		// Get the distance between the attractor and the object
		PVector force = PVector.sub(location, m.location);
		// Get the magnitude of the vector between them
		float distance = force.mag();
		distance = constrain(distance, 15, 25);
		// Normalize the vector
		force.normalize();
		// Calculate the magnitude of the new force
		float magnitude = (c * mass * m.mass) / (distance * distance);
		// Multiply the magnitude of the new force by the direction of the new force…
		// …to get the new force vector.
		force.mult(magnitude);
		return (force);

	}
}