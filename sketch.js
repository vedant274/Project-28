
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine,world;
var tree,ground;
var boy,boyImage;
var stone1;
var Slingshot1;
var mango1,mango2,mango3,mango4,mango5,mango6, mango7, mango8;

function preload()
{
	boyImage=loadImage("boy.png");
	treeImage=loadImage("tree.png");
}

function setup() {
	createCanvas(800, 700);
		
	groundSprite = createSprite(width/2, height-5, width,10);
	engine = Engine.create();
    world = engine.world;
		
	stone1 = new stone(112,565,40,40);
	
	mango1 = new mango(560,300,50,50);
	mango2= new mango(460,380,50,50);
	mango3= new mango(650,400,50,50);
    mango4 = new mango(480,400,50,50);
    mango5 = new mango(560,400,50,50);
	mango6= new mango(370,400,50,50);
	mango7= new mango(500,350,50,50);
	mango8= new mango(600,340,50,50);
	
	tree = createSprite(540,450,20,20); 
	tree.addImage(treeImage);
	tree.scale = 0.4;
	
	boy = createSprite(160,628,50,60);
	boy.addImage(boyImage);
	boy.scale = 0.1;
	boy = Bodies.rectangle(160,628,50,60, {isStatic:true} );
	World.add(world, boy);
	
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);
	
	 Slingshot1 = new Slingshot(stone1.body,{x:112,y:565});

	Engine.run(engine);
}

function draw() {
  rectMode(CENTER);
  background(255);
  Engine.update(engine);
  drawSprites();
  stone1.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();
  Slingshot1.display();
  detectCollision(stone1,mango1);
  detectCollision(stone1,mango2);
  detectCollision(stone1,mango3);
  detectCollision(stone1,mango4);
  detectCollision(stone1,mango5);
  detectCollision(stone1,mango6);
  detectCollision(stone1,mango7);
  detectCollision(stone1,mango8);

}

function detectCollision(stone,mango){
	mangoBodyPosition=mango.body.position
	stoneBodyPosition=stone.body.position

	var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
	if(distance<=mango.width+stone.width)
	{
		Matter.Body.setStatic(mango.body,false);
	}
	
}
	

function mouseDragged(){
	Matter.Body.setPosition(stone1.body,{x:mouseX,y:mouseY});   
   }
function mouseReleased(){
	Slingshot1.fly();
	Matter.Body.applyForce(stone1.body,stone1.body.position,{x:180,y:-100});
}
function keyPressed(){
	if (keyCode === 32){
		Matter.Body.setPosition(stone1.body, {x:112, y:565})
		Slingshot1.attach(stone1.body);
		
	}
}
