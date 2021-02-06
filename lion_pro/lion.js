
//THREEJS RELATED VARIABLES 

var scene, 
    camera,
    controls,
    fieldOfView,
  	aspectRatio,
  	nearPlane,
  	farPlane,
    shadowLight,
    backLight,
    light, 
    renderer,
	container;

//SCENE
var floor, lion, lion2, lion3, fan, sky,
	sun, cloud, tree,
	
    isBlowing = false;

//SCREEN VARIABLES

var HEIGHT,
  	WIDTH,
    windowHalfX,
  	windowHalfY,
    mousePos = {x:0,y:0};
    dist = 0;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init(){
  scene = new THREE.Scene();
  // scene.fog = new THREE.Fog(0xf7d9aa, 1390, 1400); //(#f7d9aa, near, far)
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  if (WIDTH < 700) { //PC-60 Mobile-95
	  fieldOfView = 100;
  } else {
	  fieldOfView = 60;
  }
  nearPlane = 1;
  farPlane = 2000; 
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane);
  camera.position.z = 735;
  camera.position.y = 0;
  camera.lookAt(new THREE.Vector3(0,0,0));
  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(WIDTH, HEIGHT);
  // x=red, y=green, z=blue
  // var axisHelper = new THREE.AxesHelper( 500 );
  // scene.add(axisHelper);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('mousedown', handleMouseDown, false);
  document.addEventListener('mouseup', handleMouseUp, false);
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchend', handleTouchEnd, false);
  document.addEventListener('touchmove',handleTouchMove, false);
  
  //Orbit switch
  // controls = new THREE.OrbitControls( camera, renderer.domElement);
}

function onWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  console.log('WIDTH',WIDTH)
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
  mousePos = {x:event.clientX, y:event.clientY};
}

function handleMouseDown(event) {
  isBlowing = true;
}
function handleMouseUp(event) {
  isBlowing = false;
}

function handleTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
    isBlowing = true;
  }
}

function handleTouchEnd(event) {
    //mousePos = {x:windowHalfX, y:windowHalfY};
    isBlowing = false;
}

function handleTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
    isBlowing = true;
  }
}

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);
 
  shadowLight = new THREE.DirectionalLight(0xffffff, .75);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  
  shadowLight.shadow.camera.left = -600;
  shadowLight.shadow.camera.right = 600;
  shadowLight.shadow.camera.top = 600;
  shadowLight.shadow.camera.bottom = -600;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;
 	
  backLight = new THREE.DirectionalLight(0xffffff, .4);
  backLight.position.set(-100, 200, 50);
  backLight.castShadow = true;

  // const helper = new THREE.DirectionalLightHelper( shadowLight, 5 );
  // scene.add( helper );
  // const helper2 = new THREE.CameraHelper( shadowLight.shadow.camera );
  // scene.add( helper2 );
 	
  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createFloor(){ 
  floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1200,1000), new THREE.MeshLambertMaterial({color: 0xCEBFC5 })); //#CEBFC5 #ebe5e7 
  floor.rotation.x = -Math.PI/2;
  floor.position.y = -100;
  floor.position.z = -180;
  floor.castShadow = false;
  floor.receiveShadow = true;
  scene.add(floor);
}

function createLion(){ //Lion1
  lion = new Lion('lion');
  scene.add(lion.threegroup);
}

function createLion2() { //Lion2
	lion2 = new Lion('lion2');
	scene.add(lion2.threegroup);
}

function createLion3() { //Lion3
	lion3 = new Lion('lion3');
	scene.add(lion3.threegroup);
}

function createFan() {
  fan = new Fan();
  fan.threegroup.position.z = 350;
  scene.add(fan.threegroup);
}

function createTree() {
	tree = new Tree();
	scene.add(tree.threegroup);
}

function createSun() {
	sun = new Sun();
	sun.mesh.scale.set(.9,.9,.2); //(x, y, z)
	sun.mesh.position.set(600,600,-1000); //(x, y, z)
	scene.add(sun.mesh);
}

function createSky() {
	sky = new Sky();
	sky.mesh.position.y = -600;
	scene.add(sky.mesh);
}

function createFlower() {
	flowers = new Flowers();
	scene.add(flowers.mesh);
}

function createText() {
	var textV = new Text('V');
	textV.threegroup.position.z = 300;
	textV.threegroup.position.x = -180;
	textV.threegroup.position.y = -265;
	scene.add(textV.threegroup);
	
	var textJ = new Text('J');
	textJ.threegroup.position.z = 300;
	textJ.threegroup.position.y = -265;
	scene.add(textJ.threegroup);
	
	var textL = new Text('L');
	textL.threegroup.position.z = 300;
	textL.threegroup.position.x = 180;
	textL.threegroup.position.y = -265;
	scene.add(textL.threegroup);
}

function createRings() {
	rings = new Rings();
	rings.group.position.set(600,600,-1000);
	scene.add(rings.group);
}

var obj;
function createTetrahedron() {
		obj = [];
		var group = new THREE.Group();
	
		while(obj.length < 75){
			var item = new Tetrahedron();
			obj.push(item);
		}
	
		for (var i = 0; i < obj.length; i++) {
			group.add(obj[i].shape);
		}
		
		group.rotation.z = 360;
		group.rotation.y = 20;
		group.position.x = 0;
		group.position.y = -20;
		group.position.z = 6;
		scene.add(group);
}

Tetrahedron = function() {
	var colors = [0xDE5006, 0x42447, 0xC0A468, 0xF38D58, 0x615173];
	this.size = Math.random();
	this.color = colors[Math.floor(Math.random()*colors.length)];
	
	this.geometry = new THREE.TetrahedronGeometry(this.size*10,0);
	this.material = new THREE.MeshLambertMaterial({color: this.color, flatShading : true});
	this.shape = new THREE.Mesh(this.geometry,this.material);
	this.circle_rotation = Math.random() * Math.PI * 2;
	this.shape.castShadow = false;
	this.shape.receiveShadow = true;
	this.circle = Math.floor((Math.random()*100)+100);
	
	this.animate = function() {
		this.shape.position.y = Math.sin(this.circle_rotation)*this.circle;
		this.shape.position.z = Math.cos(this.circle_rotation)*this.circle;
		this.shape.rotation.x += this.size*0.05;
		this.shape.rotation.z += this.size*0.1;
		this.circle_rotation += 0.002;
	}
}

Rings = function() {
	var r=410;
    var s_r=r/20+Math.sin(0)*r/20;
    var num_of_corners=7;
    var obj_resolution=360;
    var linewidth=0.03; //0.04
	
	this.group = new THREE.Object3D();
	var all_vertices=[];
	
	var objects=[];
	var num=3;
	var colors=[0xFFCF47,0xFFC020,0xFF9726]; 

	for(var i = 0; i < num ; i++){
		var ringGeom = new THREE.BufferGeometry();
		var points = generate_points(r,s_r,5,i);
		var points2=generate_points(r*(1-linewidth),s_r,5,i);
		var vertices =generate_vertices(points,points2);
		all_vertices.push(vertices);
		ringGeom.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
		var ringMat = new THREE.MeshBasicMaterial( { color: colors[i],wireframe:false });
		var ringMesh = new THREE.Mesh( ringGeom, ringMat );
		ringMesh.anim_shape=num_of_corners;
		ringMesh.anim=-1;
		ringMesh.r_coof=1+linewidth*0.8*i;
		ringMesh.wave_type=i;
		
		objects.push(ringMesh);
		ringMesh.rotation.y =Math.PI/180*180;
		this.group.add(ringMesh);
	  } 
	  
	  function generate_points(radius,wave_height,anim_shape,wave_type){
	      var new_poistions=[];
	      for (var i = 0; i <=  obj_resolution; i++) {
	        var angle=2*Math.PI/obj_resolution*i;
	        var raidus_addon=0;
	        var speed_incrementer=counter/40;
	        var sine_pct=0.5;
	  
	        if(i<sine_pct*obj_resolution||i==obj_resolution){
	          var smoothing_amount=0.14;
	          var smooth_pct=1;
	          if(i<sine_pct*obj_resolution*smoothing_amount)smooth_pct=i/(sine_pct*obj_resolution*smoothing_amount);
	          if(i>sine_pct*obj_resolution*(1-smoothing_amount)&&i<=sine_pct*obj_resolution)smooth_pct=(sine_pct*obj_resolution-i)/(sine_pct*obj_resolution*smoothing_amount);
	          if(i==obj_resolution)smooth_pct=0;
	  
	          if(wave_type==1) raidus_addon=wave_height*smooth_pct*Math.cos((angle+speed_incrementer)*anim_shape);
	          if(wave_type==0) raidus_addon=wave_height*smooth_pct*Math.sin((angle+speed_incrementer)*anim_shape);
	          if(wave_type==2) raidus_addon=wave_height*smooth_pct*Math.cos((angle+Math.PI/180*120+speed_incrementer)*anim_shape);
	        }
	  
	        var x = (radius+raidus_addon) * Math.cos(angle+speed_incrementer);
	        var y = (radius+raidus_addon) * Math.sin(angle+speed_incrementer);
	        var z=0;
	  
	        new_poistions.push([x,y,z]);
	      }
	      return new_poistions;
	    }
		
		 function generate_vertices(points,points2){
		   var vertexPositions=[];
		
		   for (var i = 0; i <  points.length-1; i++) {
		    vertexPositions.push(points[i],points2[i],points[i+1]);
		    vertexPositions.push(points2[i],points2[i+1],points[i+1]);
		  }
		  vertexPositions.push(points[ points.length-1],points2[points.length-1],points[0]);
		  vertices = new Float32Array( vertexPositions.length * 3 ); 
		
		  for ( var i = 0; i < vertexPositions.length; i++ )
		  {
		    vertices[ i*3 + 0 ] = vertexPositions[i][0];
		    vertices[ i*3 + 1 ] = vertexPositions[i][1];
		    vertices[ i*3 + 2 ] = vertexPositions[i][2];
		  }
		  return vertices;
		}
		
		function update_vertices_v_2(points,points2,my_arr){
		  var vertexPositions=[];
		  for (var i = 0; i <  points.length-1; i++) {
		    vertexPositions.push(points[i],points2[i],points[i+1]);
		    vertexPositions.push(points2[i],points2[i+1],points[i+1]);
		  }
		
		  vertexPositions.push(points[ points.length-1],points2[points.length-1],points[0]);
		
		  for ( var i = 0; i < vertexPositions.length; i++ ){
		    my_arr[ i*3 + 0 ] = vertexPositions[i][0];
		    my_arr[ i*3 + 1 ] = vertexPositions[i][1];
		    my_arr[ i*3 + 2 ] = vertexPositions[i][2];
		  }
		}
		
		var counter=0;
		var loopRing = function() {
		  //render in 0.1s 
		  setTimeout(() => {
			   requestAnimationFrame(loopRing);
		  },150)
		 
		  for (var k = 0; k <  objects.length; k++) {
		    var obj=objects[k];
		    var rad=r*obj.r_coof;
		    s_r=rad/15;
		    var points=generate_points(rad,s_r,obj.anim_shape,obj.wave_type); 
		    var points2=generate_points(rad*(1-linewidth),s_r,obj.anim_shape,obj.wave_type); 
		    update_vertices_v_2(points,points2, all_vertices[k]);
		    obj.geometry.attributes.position.needsUpdate = true;
		  }
		  renderRing();
		  // console.log('counter',counter);
		  counter++;
		};
		loopRing();
}

Tree = function() {
	this.greenMat = new THREE.MeshLambertMaterial({
		color: 0x749E1D, //#749E1D
		flatShading: true
	});
	this.brownMat = new THREE.MeshLambertMaterial({
		color: 0x8B4513, //#8B4513
		flatShading: true
	})
	
	this.threegroup = new THREE.Group();
	
	var treeTopYPos = 100;
	for (var layerNum = 0; layerNum < 6; layerNum++) {
		var size = 20 + (4*layerNum);
		var treeGeom = new THREE.CylinderGeometry(1,size, 50, 20, 10);
		this.layer = new THREE.Mesh(treeGeom, this.greenMat);
		
		this.layer.position.y = treeTopYPos;
		this.threegroup.add(this.layer);
		treeTopYPos -= (size - 10);
	}
	
	var trunkGeom = new THREE.CylinderGeometry(2,10,190,25,20);
	var trunk = new THREE.Mesh(trunkGeom, this.brownMat);
	
	var trunk1 = trunk.clone();
	trunk1.position.z = -170;
	trunk1.position.x = 60;
	
	this.threegroup.position.z = -200;
	this.threegroup.position.y = -20;
	this.threegroup.position.x = 500;
	
	this.threegroup.add(trunk);
	this.threegroup.add(trunk1);
}

Sun = function() { 
	this.mesh = new THREE.Object3D();

	var sunGeom = new THREE.SphereGeometry(400, 50, 50);
	var sunMat = new THREE.MeshPhongMaterial({
		color: 0xedeb27, //#edeb27 #F8DBA5 #FFFF7D
		flatShading:false
	})
	var sun = new THREE.Mesh(sunGeom,sunMat);
	sun.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	sun.castShadow = false;
	sun.receiveShadow = false;
	this.mesh.add(sun);
}

Cloud = function() {
	//Create an empty container for the cloud
	this.mesh = new THREE.Object3D();
	//Cube geometry and material
	var cloudGeom = new THREE.DodecahedronGeometry(20,0);
	var cloudMat = new THREE.MeshLambertMaterial({
		color: 0xd8d0d1, //#d8d0d1
	});
	
	var nBlocs = 3 + Math.floor(Math.random()*3);
	
	for (var i = 0; i < nBlocs; i++) {
		//Clone mesh geometry
		var m = new THREE.Mesh(cloudGeom, cloudMat);
		//Randomly position each cube
		m.position.x = i*15;
		m.position.y = Math.random()*10;
		m.position.z = Math.random()*10;
		m.rotation.z = Math.random()*Math.PI*2;
		m.rotation.y = Math.random()*Math.PI*2;
		
		//Randomly scale the cubes
		var s = .1 + Math.random()*.9;
		m.scale.set(s,s,s);
		this.mesh.add(m);
	}
}

Sky = function() {
	this.mesh = new THREE.Object3D();
	//Number of cloud groups
	this.nClouds = 10;
	//Space the consistenly
	var stepAngle = Math.PI*2 / this.nClouds;

	//Create the Clouds 
	for (var i=0; i<this.nClouds; i++) {
		var c = new Cloud();
		
		var a = stepAngle*i;
		
		var h = 800 + Math.random()*2000;

		c.mesh.position.y = 1000 + Math.random()*200;
		c.mesh.position.x = Math.cos(a)*1000;
		
		c.mesh.rotation.z = a + Math.PI/2;
		c.mesh.position.z = -220-Math.random()*400;
		
		var s = 1 + Math.random()*2;
		c.mesh.scale.set(s,s,s);
		
		this.mesh.add(c.mesh);
	}
}

Flower = function() {
	this.mesh = new THREE.Object3D();
	var stemGeom = new THREE.BoxGeometry(5, 120, 5, 1, 1, 1);
	var stemMat = new THREE.MeshLambertMaterial({
		color: 0x458248, //#458248
		flatShading:true
	});
	var stem = new THREE.Mesh(stemGeom,stemMat);
	stem.castShadow = false;
	stem.receiveShadow = true;
	this.mesh.add(stem);
	
	var petalCoreGeom = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
	var petalCoreMat = new THREE.MeshLambertMaterial({
		color: 0xedeb27,
		flatShading:true
	});
	var petalCore = new THREE.Mesh(petalCoreGeom,petalCoreMat);
	petalCore.castShadow = false;
	petalCore.receiveShadow = true;
	
	var petalColors = [0xf25346, 0xedeb27, 0x68c3c0];
	var petalColor = petalColors[Math.floor(Math.random()*3)];
	
	var petalGeom = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
	var petalMat = new THREE.MeshBasicMaterial({
		color: petalColor
	})
	petalGeom.vertices[5].y -= 4;
	petalGeom.vertices[4].y -= 4;
	petalGeom.vertices[7].y += 4;
	petalGeom.vertices[6].y += 4;
	petalGeom.translate(12.5, 0, 3);
	
	var petals = [];
	for (var i = 0; i < 4; i++) {
		petals[i] = new THREE.Mesh(petalGeom, petalMat);
		petals[i].rotation.z = i*Math.PI/2;
		petals[i].castShadow = true;
		petals[i].receiveShadow = true;
	}
	
	petalCore.add(petals[0],petals[1],petals[2],petals[3]);
	petalCore.position.y = 50;
	petalCore.position.z = 3;
	this.mesh.add(petalCore);
}

Flowers = function() {
	    this.mesh = new THREE.Object3D();
		this.nFlowers = 30;
		var stepAngle = Math.PI*2 / this.nFlowers;
	
	
		for(var i=0; i<this.nFlowers; i++){	
	
			var f = new Flower();
			var a = stepAngle*i;
	
			var h = 400;
			// f.mesh.position.y = Math.sin(a)*h;
			f.mesh.position.y = -95;
			f.mesh.position.x = Math.cos(a)*h;
			// f.mesh.rotation.z = a + (Math.PI/2)*3;
			f.mesh.position.z = 100-Math.random()*600;
	
			var s = .1+Math.random()*.5;
			f.mesh.scale.set(s,s,s);
	
			this.mesh.add(f.mesh);
		}
}

Text = function (val) {
	this.threegroup = new THREE.Group();
	var that = this
	const loader = new THREE.FontLoader();
	var textGeom, textMesh; //#EA7564
	var textMat = new THREE.MeshPhongMaterial({ color: 0xEA7564, flatShading: true });
	loader.load('helvetiker_regular.typeface.json', function(font) {
		 textGeom = new THREE.TextGeometry(val, {
			font: font,
			size: 20,
			height: 8,
			curveSegments: 4,
			bevelThickness: 2,
			bevelSize: 1,
			bevelOffset: 1,
			bevelEnabled: true
		})
		
		textGeom = new THREE.BufferGeometry().fromGeometry( textGeom );
		textMesh = new THREE.Mesh(textGeom,textMat);

		that.threegroup.add(textMesh);
	})
}

Fan = function(){
  this.isBlowing = false;
  this.speed = 0;
  this.acc =0;
  this.redMat = new THREE.MeshLambertMaterial ({
    color: 0xad3525, 
    flatShading:true
  });
  this.greyMat = new THREE.MeshLambertMaterial ({
    color: 0x653f4c, 
    flatShading:true
  });
  
  this.yellowMat = new THREE.MeshLambertMaterial ({
    color: 0xfdd276, 
    flatShading:true
  });
  
  var coreGeom = new THREE.BoxGeometry(10,10,20);
  var sphereGeom = new THREE.BoxGeometry(10, 10, 3);
  var propGeom = new THREE.BoxGeometry(10,30,2);
  propGeom.applyMatrix4( new THREE.Matrix4().makeTranslation( 0,25,0) );
  
  this.core = new THREE.Mesh(coreGeom,this.greyMat);
  
  // propellers
  var prop1 = new THREE.Mesh(propGeom, this.redMat);
  prop1.position.z = 15;
  var prop2 = prop1.clone();
  prop2.rotation.z = Math.PI/2;
  var prop3 = prop1.clone();
  prop3.rotation.z = Math.PI;
  var prop4 = prop1.clone();
  prop4.rotation.z = -Math.PI/2;
  
  this.sphere = new THREE.Mesh(sphereGeom, this.yellowMat);
  this.sphere.position.z = 15;
  
  this.propeller = new THREE.Group();
  this.propeller.add(prop1);
  this.propeller.add(prop2);
  this.propeller.add(prop3);
  this.propeller.add(prop4);
  
  this.threegroup = new THREE.Group();
  this.threegroup.add(this.core);
  this.threegroup.add(this.propeller);
  this.threegroup.add(this.sphere);
}

Fan.prototype.update = function(xTarget, yTarget){
  this.threegroup.lookAt(new THREE.Vector3(0,80,60));
  this.tPosX = rule3(xTarget, -200, 200, -250, 250);
  this.tPosY = rule3(yTarget, -200, 200, 250, -250);

  this.threegroup.position.x += (this.tPosX - this.threegroup.position.x) /10;
  this.threegroup.position.y += (this.tPosY - this.threegroup.position.y) /10;
  
  this.targetSpeed = (this.isBlowing) ? .3 : .01;
  if (this.isBlowing && this.speed < .5){
    this.acc +=.001;
    this.speed += this.acc;
  }else if (!this.isBlowing){
    this.acc = 0;
    this.speed *= .98;
  }
  this.propeller.rotation.z += this.speed; 
}

//Lion
Lion = function(type){
  this.windTime = 0;
  this.bodyInitPositions = [];
  this.maneParts = [];
  this.threegroup = new THREE.Group();
  this.yellowMat = new THREE.MeshLambertMaterial ({
    color: 0xfdd276, 
    flatShading:true
  });
  
  this.redMat = new THREE.MeshLambertMaterial ({
    color: 0xad3525, 
    flatShading:true
  });
  
  this.goldenMat = new THREE.MeshLambertMaterial ({
    color: 0xD8BA62, 
   flatShading:true
  });
  
  this.darkRedMat = new THREE.MeshLambertMaterial ({
	  color: 0xE2414D,
	  flatShading:true
  })
  
  this.pinkMat = new THREE.MeshLambertMaterial ({
    color: 0xe55d2b, 
    flatShading:true
  });
  
  this.whiteMat = new THREE.MeshLambertMaterial ({
    color: 0xffffff, 
    flatShading:true
  });
  
  this.purpleMat = new THREE.MeshLambertMaterial ({
    color: 0x451954, 
    flatShading:true
  });
  
  this.greyMat = new THREE.MeshLambertMaterial ({
    color: 0x653f4c, 
   flatShading:true
  });
  
  this.blackMat = new THREE.MeshLambertMaterial ({
    color: 0x302925, 
    flatShading:true
  });
  
  
  var bodyGeom = new THREE.CylinderGeometry(30,80, 140, 4);
  var maneGeom = new THREE.BoxGeometry(40,40,15);
  var faceGeom = new THREE.BoxGeometry(80,80,80);
  var spotGeom = new THREE.BoxGeometry(4,4,4);
  var mustacheGeom = new THREE.BoxGeometry(30,2,1);
  mustacheGeom.applyMatrix4( new THREE.Matrix4().makeTranslation( 15, 0, 0 ) );
  
  var earGeom = new THREE.BoxGeometry(20,20,20);
  var noseGeom = new THREE.BoxGeometry(40,40,20);
  var eyeGeom = new THREE.BoxGeometry(5,30,30);
  var irisGeom = new THREE.BoxGeometry(4,10,10);
  var mouthGeom = new THREE.BoxGeometry(20,20,10);
  var cheekGeom = new THREE.SphereGeometry(7, 30, 30);
  var smileGeom = new THREE.TorusGeometry( 12, 4, 2, 10, Math.PI );
  var lipsGeom = new THREE.BoxGeometry(40,15,20);
  var kneeGeom = new THREE.BoxGeometry(25, 80, 80);
  kneeGeom.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );
  var footGeom = new THREE.BoxGeometry(40, 20, 20);
  
  // body
  this.body = new THREE.Mesh(bodyGeom, this.yellowMat);
  this.body.position.z = -60;
  this.body.position.y = -30;
  this.bodyVertices = [0,1,2,3,4,10];
  
  for (var i=0;i<this.bodyVertices.length; i++){
    var tv = this.body.geometry.vertices[this.bodyVertices[i]];
	// tv.z = 70;
	//tv.x = 0;
	if (tv && tv.x && tv.y && tv.z) {
		var xyz = {x:tv.x, y:tv.y, z:70}
		this.bodyInitPositions.push(xyz);
	}
  }
  
  // knee
  this.leftKnee = new THREE.Mesh(kneeGeom, this.yellowMat);
  this.leftKnee.position.x = 65;
  this.leftKnee.position.z = -20;
  this.leftKnee.position.y = -110;
  this.leftKnee.rotation.z = -.3;
  
  this.rightKnee = new THREE.Mesh(kneeGeom, this.yellowMat);
  this.rightKnee.position.x = -65;
  this.rightKnee.position.z = -20;
  this.rightKnee.position.y = -110;
  this.rightKnee.rotation.z = .3;
  
  // feet
  this.backLeftFoot = new THREE.Mesh(footGeom, this.yellowMat);
  this.backLeftFoot.position.z = 30;
  this.backLeftFoot.position.x = 75;
  this.backLeftFoot.position.y = -90;
  
  this.backRightFoot = new THREE.Mesh(footGeom, this.yellowMat);
  this.backRightFoot.position.z = 30;
  this.backRightFoot.position.x = -75;
  this.backRightFoot.position.y = -90;
  
  this.frontRightFoot = new THREE.Mesh(footGeom, this.yellowMat);
  this.frontRightFoot.position.z = 40;
  this.frontRightFoot.position.x = -22;
  this.frontRightFoot.position.y = -90;
  
  this.frontLeftFoot = new THREE.Mesh(footGeom, this.yellowMat);
  this.frontLeftFoot.position.z = 40;
  this.frontLeftFoot.position.x = 22;
  this.frontLeftFoot.position.y = -90;
  
  // mane
  this.mane = new THREE.Group();
  
  for (var j=0; j<4; j++){
    for (var k=0; k<4; k++){
	  if (type == 'lion') {
		  var manePart = new THREE.Mesh(maneGeom, this.goldenMat);
	  } else {
		   var manePart = new THREE.Mesh(maneGeom, this.redMat);
	  }
      
      manePart.position.x = (j*40)-60;
      manePart.position.y = (k*40)-60;
      
      var amp;
      var zOffset;
      var periodOffset = Math.random()*Math.PI*2;     
      var angleOffsetY, angleOffsetX;
      var angleAmpY, angleAmpX;
      var xInit, yInit;
      
      
      if ((j==0 && k==0) || (j==0 && k==3) || (j==3 && k==0) || (j==3 && k==3)){
        amp = -10-Math.floor(Math.random()*5);
        zOffset = -5;
      }else if (j==0 || k ==0 || j==3 || k==3){
        amp = -5-Math.floor(Math.random()*5);
        zOffset = 0;
      }else{
        amp = 0;
        zOffset = 0;
      }
      
      this.maneParts.push({mesh:manePart, amp:amp, zOffset:zOffset, periodOffset:periodOffset, xInit:manePart.position.x, yInit:manePart.position.y});
      this.mane.add(manePart);
    }
  }
  
  this.mane.position.y = -10;
  this.mane.position.z = 80;
  
  if (type == 'lion') this.mane.rotation.z = Math.PI/4;
  
  // face
  this.face = new THREE.Mesh(faceGeom, this.yellowMat);
  this.face.position.z = 135;
  
  // Mustaches
  
  this.mustaches = [];
  
  this.mustache1 = new THREE.Mesh(mustacheGeom, this.greyMat);
  this.mustache1.position.x = 30;
  this.mustache1.position.y = -5;
  this.mustache1.position.z = 175; 
  this.mustache2 = this.mustache1.clone();
  this.mustache2.position.x = 35;
  this.mustache2.position.y = -12;
  this.mustache3 = this.mustache1.clone();
  this.mustache3.position.y = -19;
  this.mustache3.position.x = 30;  
  this.mustache4 = this.mustache1.clone();
  this.mustache4.rotation.z = Math.PI;
  this.mustache4.position.x = -30;
  this.mustache5 = new THREE.Mesh(mustacheGeom, this.blackMat);
  this.mustache5 = this.mustache2.clone();
  this.mustache5.rotation.z = Math.PI;
  this.mustache5.position.x = -35;
  this.mustache6 = new THREE.Mesh(mustacheGeom, this.blackMat);
  this.mustache6 = this.mustache3.clone();
  this.mustache6.rotation.z = Math.PI;
  this.mustache6.position.x = -30;
  
  this.mustaches.push(this.mustache1);
  this.mustaches.push(this.mustache2);
  this.mustaches.push(this.mustache3);
  this.mustaches.push(this.mustache4);
  this.mustaches.push(this.mustache5);
  this.mustaches.push(this.mustache6);
    
  // spots
  this.spot1 = new THREE.Mesh(spotGeom, this.redMat);
  this.spot1.position.x = 39;
  this.spot1.position.z = 150;
  
  this.spot2 = this.spot1.clone();
  this.spot2.position.z = 160;
  this.spot2.position.y = -10;
  
  this.spot3 = this.spot1.clone();
  this.spot3.position.z = 140;
  this.spot3.position.y = -15;
  
  this.spot4 = this.spot1.clone();
  this.spot4.position.z = 150;
  this.spot4.position.y = -20;
  
  this.spot5 = this.spot1.clone();
  this.spot5.position.x = -39;
  this.spot6 = this.spot2.clone();
  this.spot6.position.x = -39;
  this.spot7 = this.spot3.clone();
  this.spot7.position.x = -39;
  this.spot8 = this.spot4.clone();
  this.spot8.position.x = -39;
    
  // eyes
  this.leftEye = new THREE.Mesh(eyeGeom, this.whiteMat);
  this.leftEye.position.x = 40;
  this.leftEye.position.z = 120;
  this.leftEye.position.y = 25;
  
  this.rightEye = new THREE.Mesh(eyeGeom, this.whiteMat);
  this.rightEye.position.x = -40;
  this.rightEye.position.z = 120;
  this.rightEye.position.y = 25;
  
  // iris
  this.leftIris = new THREE.Mesh(irisGeom, this.purpleMat);
  this.leftIris.position.x = 42;
  this.leftIris.position.z = 120;
  this.leftIris.position.y = 25;
  
  this.rightIris = new THREE.Mesh(irisGeom, this.purpleMat);
  this.rightIris.position.x = -42;
  this.rightIris.position.z = 120;
  this.rightIris.position.y = 25;
  
  // mouth
  if (type == 'lion') {
	  this.mouth = new THREE.Mesh(mouthGeom, this.darkRedMat);
  } else {
	  this.mouth = new THREE.Mesh(mouthGeom, this.blackMat);
  }
  this.mouth.position.z = 171;
  this.mouth.position.y = -30;
  this.mouth.scale.set(.5,.5,1);
  
  // cheek 
  if (type == 'lion') {
	  this.leftCheek = new THREE.Mesh(cheekGeom, this.pinkMat);
	  this.leftCheek.position.z = 171;
	  this.leftCheek.position.y = -15;
	  this.leftCheek.position.x = -22;
	  
	  this.rightCheek = new THREE.Mesh(cheekGeom, this.pinkMat);
	  this.rightCheek.position.z = 171;
	  this.rightCheek.position.y = -15;
	  this.rightCheek.position.x = 22;
  }
 
  // smile
  if (type == 'lion') {
	  this.smile = new THREE.Mesh(smileGeom, this.darkRedMat);
  } else {
  	  this.smile = new THREE.Mesh(smileGeom, this.greyMat);
  }
  this.smile.position.z = 173;  
  this.smile.position.y = -15;
  this.smile.rotation.z = -Math.PI;
  
  // lips
  this.lips = new THREE.Mesh(lipsGeom, this.yellowMat);
  this.lips.position.z = 165;
  this.lips.position.y = -45;
  
   
  // ear
  this.rightEar = new THREE.Mesh(earGeom, this.yellowMat);
  this.rightEar.position.x = -50;
  this.rightEar.position.y = 50;
  this.rightEar.position.z = 105;
  
  this.leftEar = new THREE.Mesh(earGeom, this.yellowMat);
  this.leftEar.position.x = 50;
  this.leftEar.position.y = 50;
  this.leftEar.position.z = 105;
  
  // nose
  this.nose = new THREE.Mesh(noseGeom, this.greyMat);
  this.nose.position.z = 170;
  this.nose.position.y = 25;
  
  // head
  this.head = new THREE.Group();
  this.head.add(this.face);
  this.head.add(this.mane);
  this.head.add(this.rightEar);
  this.head.add(this.leftEar);
  this.head.add(this.nose);
  this.head.add(this.leftEye);
  this.head.add(this.rightEye);
  this.head.add(this.leftIris);
  this.head.add(this.rightIris);
  this.head.add(this.mouth);
  if (type == 'lion') {
	  // this.head.add(this.leftCheek);
	  // this.head.add(this.rightCheek);
  }
  this.head.add(this.smile);
  this.head.add(this.lips);
  this.head.add(this.spot1);
  this.head.add(this.spot2);
  this.head.add(this.spot3);
  this.head.add(this.spot4);
  this.head.add(this.spot5);
  this.head.add(this.spot6);
  this.head.add(this.spot7);
  this.head.add(this.spot8);
  this.head.add(this.mustache1);
  this.head.add(this.mustache2);
  this.head.add(this.mustache3);
  this.head.add(this.mustache4);
  this.head.add(this.mustache5);
  this.head.add(this.mustache6);
  
  this.head.position.y = 60;
  
  this.threegroup.add(this.body);
  this.threegroup.add(this.head);
  this.threegroup.add(this.leftKnee);
  this.threegroup.add(this.rightKnee);
  this.threegroup.add(this.backLeftFoot);
  this.threegroup.add(this.backRightFoot);
  this.threegroup.add(this.frontRightFoot);
  this.threegroup.add(this.frontLeftFoot);
  
  if (type == 'lion') {
	  this.threegroup.scale.set(0.85,0.85,0.85);
	  this.threegroup.position.y = - 15;
  }
  
  if (type == 'lion2') {
	  this.threegroup.position.x = -260;
  }
  
  if (type == 'lion3') {
	  this.threegroup.position.x = 260;
	  this.threegroup.position.y = -50;
	  this.threegroup.scale.set(0.5,0.5,0.5);
  }
  
  this.threegroup.traverse( function ( object ) {
		if ( object instanceof THREE.Mesh ) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
	} );
}


Lion.prototype.updateBody = function(speed){
  
  this.head.rotation.y += (this.tHeagRotY - this.head.rotation.y) / speed;
  this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
  this.head.position.x += (this.tHeadPosX-this.head.position.x) / speed; 
  this.head.position.y += (this.tHeadPosY-this.head.position.y) / speed; 
  this.head.position.z += (this.tHeadPosZ-this.head.position.z) / speed; 
  
  this.leftEye.scale.y += (this.tEyeScale - this.leftEye.scale.y) / (speed*2);
  this.rightEye.scale.y = this.leftEye.scale.y;
  
  this.leftIris.scale.y += (this.tIrisYScale - this.leftIris.scale.y) / (speed*2);
  this.rightIris.scale.y = this.leftIris.scale.y;
  
  this.leftIris.scale.z += (this.tIrisZScale - this.leftIris.scale.z) / (speed*2);
  this.rightIris.scale.z = this.leftIris.scale.z;
  
  this.leftIris.position.y += (this.tIrisPosY - this.leftIris.position.y) / speed;
  this.rightIris.position.y = this.leftIris.position.y;
  this.leftIris.position.z += (this.tLeftIrisPosZ - this.leftIris.position.z) / speed;
  this.rightIris.position.z += (this.tRightIrisPosZ - this.rightIris.position.z) / speed;
  
  this.rightKnee.rotation.z += (this.tRightKneeRotZ - this.rightKnee.rotation.z) / speed;
  this.leftKnee.rotation.z += (this.tLeftKneeRotZ - this.leftKnee.rotation.z) / speed;
  
  this.lips.position.x += (this.tLipsPosX - this.lips.position.x) / speed;
  this.lips.position.y += (this.tLipsPosY - this.lips.position.y) / speed;
  this.smile.position.x += (this.tSmilePosX - this.smile.position.x) / speed;
  this.mouth.position.z += (this.tMouthPosZ - this.mouth.position.z) / speed;
  this.smile.position.z += (this.tSmilePosZ - this.smile.position.z) / speed;
  this.smile.position.y += (this.tSmilePosY - this.smile.position.y) / speed;
  this.smile.rotation.z += (this.tSmileRotZ - this.smile.rotation.z) / speed;
}

Lion.prototype.look = function(xTarget, yTarget){
  this.tHeagRotY = rule3(xTarget, -200, 200, -Math.PI/4, Math.PI/4);
  this.tHeadRotX = rule3(yTarget, -200,200, -Math.PI/4, Math.PI/4);
  this.tHeadPosX = rule3(xTarget, -200, 200, 70,-70);
  this.tHeadPosY = rule3(yTarget, -140, 260, 20, 100);
  this.tHeadPosZ = 0;
  
    
  this.tEyeScale = 1;
  this.tIrisYScale = 1;
  this.tIrisZScale = 1;
  this.tIrisPosY = rule3(yTarget, -200,200, 35,15);
  this.tLeftIrisPosZ = rule3(xTarget, -200, 200, 130, 110);
  this.tRightIrisPosZ = rule3(xTarget, -200, 200, 110, 130);
  
  this.tLipsPosX = 0;
  this.tLipsPosY = -45;
  
  this.tSmilePosX = 0;
  this.tMouthPosZ = 174;
  this.tSmilePosZ = 173;
  this.tSmilePosY = -15;
  this.tSmileRotZ = -Math.PI;
  
  this.tRightKneeRotZ = rule3(xTarget, -200, 200, .3-Math.PI/8, .3+Math.PI/8);
  this.tLeftKneeRotZ = rule3(xTarget, -200, 200, -.3-Math.PI/8, -.3+Math.PI/8)
  
  
  this.updateBody(10);
  
  this.mane.rotation.y = 0;
  this.mane.rotation.x = 0;
 
  for (var i=0; i<this.maneParts.length; i++){
    var m = this.maneParts[i].mesh;
    m.position.z = 0;
    m.rotation.y = 0;
  }
  
  for (var i=0; i<this.mustaches.length; i++){
    var m = this.mustaches[i];
    m.rotation.y = 0;
  }
  
  
  for (var i=0; i<this.bodyVertices.length; i++){
     var tvInit = this.bodyInitPositions[i];
     var tv = this.body.geometry.vertices[this.bodyVertices[i]];
	 if (tv && tvInit) {
		 tv.x = tvInit.x + this.head.position.x;
	 } 
  }
  this.body.geometry.verticesNeedUpdate = true;
}

Lion.prototype.cool = function(xTarget, yTarget){
  this.tHeagRotY = rule3(xTarget, -200, 200, Math.PI/4, -Math.PI/4);
  this.tHeadRotX = rule3(yTarget, -200,200, Math.PI/4, -Math.PI/4);
  this.tHeadPosX = rule3(xTarget, -200, 200, -70,70);
  this.tHeadPosY = rule3(yTarget, -140, 260, 100, 20);
  this.tHeadPosZ = 100;
  
  this.tEyeScale = 0.1;
  this.tIrisYScale = 0.1;
  this.tIrisZScale = 3;
  
  this.tIrisPosY = 20;
  this.tLeftIrisPosZ = 120;
  this.tRightIrisPosZ = 120;
  
  this.tLipsPosX = rule3(xTarget, -200, 200, -15,15);
  this.tLipsPosY = rule3(yTarget, -200, 200, -45,-40);
  
  this.tMouthPosZ = 168;
  this.tSmilePosX = rule3(xTarget, -200, 200, -15,15); 
  this.tSmilePosY = rule3(yTarget, -200, 200, -20,-8); 
  this.tSmilePosZ = 176;
  this.tSmileRotZ = rule3(xTarget, -200, 200, -Math.PI-.3, -Math.PI+.3);
  
  this.tRightKneeRotZ = rule3(xTarget, -200, 200, .3+Math.PI/8, .3-Math.PI/8);
  this.tLeftKneeRotZ = rule3(xTarget, -200, 200, -.3+Math.PI/8, -.3-Math.PI/8);
   
  this.updateBody(10);
  
  this.mane.rotation.y = -.8*this.head.rotation.y;
  this.mane.rotation.x = -.8*this.head.rotation.x;
  
  var dt = 20000 / (xTarget*xTarget+yTarget*yTarget);
  dt = Math.max(Math.min(dt,1), .5);
  this.windTime += dt;
  
  for (var i=0; i<this.maneParts.length; i++){
    var m = this.maneParts[i].mesh;
    var amp = this.maneParts[i].amp;
    var zOffset = this.maneParts[i].zOffset;
    var periodOffset = this.maneParts[i].periodOffset;
        
    m.position.z = zOffset + Math.cos(this.windTime+periodOffset)*amp*dt*2;   
  }
  
  this.leftEar.rotation.x = Math.cos(this.windTime)*Math.PI/16*dt; 
  this.rightEar.rotation.x = -Math.cos(this.windTime)*Math.PI/16*dt; 
  
   
  for (var i=0; i<this.mustaches.length; i++){
    var m = this.mustaches[i];
    var amp = (i<3) ? -Math.PI/8 : Math.PI/8;
    m.rotation.y = amp + Math.cos(this.windTime + i)*dt*amp;   
  };
  
  for (var i=0; i<this.bodyVertices.length; i++){
     var tvInit = this.bodyInitPositions[i];
     var tv = this.body.geometry.vertices[this.bodyVertices[i]];
	 if (tv && tvInit) {
		 tv.x = tvInit.x + this.head.position.x;
	 }
  }
  this.body.geometry.verticesNeedUpdate = true;
}

function loop(){
  render();
  var xTarget = (mousePos.x-windowHalfX);
  var yTarget= (mousePos.y-windowHalfY);
  
  fan.isBlowing = isBlowing;
  fan.update(xTarget, yTarget);
  if(isBlowing) {
    lion.cool(xTarget, yTarget);
	lion2.cool(xTarget, yTarget);
	lion3.cool(xTarget, yTarget);
  }else{
    lion.look(xTarget, yTarget);
	lion2.look(xTarget, yTarget);
	lion3.look(xTarget, yTarget);
  }
  requestAnimationFrame(loop);
}

function render(){
  if (controls) controls.update();
  renderer.render(scene, camera);
}

function renderRing() {
	renderer.render(scene, camera);
}

function tetrahedronAnimate() {
	requestAnimationFrame( tetrahedronAnimate );
	renderer.render( scene, camera );
	for (var i = 0; i < obj.length; i++) {
			obj[i].animate();
	};
}

init();
createLights();
createFloor();
createLion();
createLion2();
createLion3();
createFan();
createTree();
createSun();
createRings();
createSky();
createFlower();
createText();
createTetrahedron();
loop();
tetrahedronAnimate();


function clamp(v,min, max){
  return Math.min(Math.max(v, min), max);
}

function rule3(v,vmin,vmax,tmin, tmax){
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
}
