var canvas;
var c;


var right=false;
var left=false;
var up=false;
var down=true;
var count=0;
var ob=[],fruits=[];
var score=0;

///////////////////////////////////////////////////////////////

function getBounds(){   
    rect = canvas.getBoundingClientRect();
	Width=window.innerWidth;
	Height=window.innerHeight;
	canvas.width="1000";
	canvas.height="500";
	
   
}

///////////////////////////////////////////////////////////////
window.onload=function(){
    canvas = document.querySelector("canvas");
    c= canvas.getContext("2d");
    getBounds();
    c.clearRect(0,0,innerWidth,innerHeight);
	
	 create();
	 setInterval(function(){
	 	  c.clearRect(0,0,window.innerWidth,innerHeight);
          fruits[0].draw();
          for(var i=0;i<count;i++){
          	ob[i].update();
          }

      //    rect3.update();
          check();
          console.log(fruits[0].x,ob[0].x);
          wall();
        },250)

}

///////////////////////////////////////////////////////////////

function create(){
	 wall();
	 ob.push( new Rect(10,20,10,10,'grey',true,false,false,false));
	 ob.push( new Rect(10,10,10,10,'grey',true,false,false,false));
	//rect3 = new Rect(0,0,10,10,'grey');		
	 fruits.push(new fruit(40,30,10,10,'lightgrey'));
	
}

///////////////////////////////////////////////////////////////

function Rect(xpos,ypos,width,height,color,d,u,l,r){
	   count+=1;

	   this.no=count;
	   this.steps=this.no-1;
	   this.x=xpos;
	   this.y=ypos;
	   this.width=width;
	   this.height=height;
	   this.color=color;
	   this.d=d;
	   this.l=l;
	   this.r=r;
	   this.u=u;
	   this.dx=0;
	   this.dy=10;
	   this.draw = function(){
		   	c.fillRect(this.x,this.y,this.width,this.height);
		   	c.fillStyle=this.color;
	   }
       this.update = function(){

       	    take(this);
       	    taker1(ob[0]);
	       	for (var i = 1;i< count; i++) {
	       		//take(ob[i-1]);
		    	//taker1(rect1);
			   	taker2(ob[i-1],ob[i]);
			   //	console.log(count,("rect"+i))
	       	}
		    	
		    
		   // this.steps-=1;
		    
	       	if(this.y+5>canvas.height){
	       		this.y=0;
	       	}
	       	else if(this.y < 0){
	       		this.y=canvas.height;
	       	}
	        else if(this.x < 0){
	       		this.x = canvas.width-10;
	       	}
	       	else if(this.x+5>canvas.width){
	       		this.x=-10;
	       	}
	       	this.y+=this.dy;
		    this.x+=this.dx;
		   // /console.log(rect1.x,rect2.x,rect1.y,rect2.y);
		  	this.draw();

       }
        
}

///////////////////////////////////////////////////////////////

function check(){
	if(fruits[0].x == ob[0].x && fruits[0].y==ob[0].y){
		//alert("won");
	  score++;
	  fruits=[];
	  var fruitlocationX=(Math.floor(Math.random()*10)*10)+(Math.floor(Math.random()*0.9)*100);
	  var fruitlocationY=(Math.floor(Math.random()*10)*10)+(Math.floor(Math.random()*0.4)*100);
	  if(fruitlocationY==0 || fruitlocationY >=canvas.height-10){
	  	fruitlocationY=340;
	  }

	  if(fruitlocationX==0 || fruitlocationX >=canvas.width-10){
	  	fruitlocationX=640;
	  }

	  fruits.push(new fruit(fruitlocationX,fruitlocationY,10,10,'lightgrey'));
	  scores();
      createNew();
	}
	else if(ob[0].x<10 || ob[0].x>=canvas.width-10 || ob[0].y<10 || ob[0].y>=canvas.height-10){
		ob=[];
		//alert("lost");
		count=0;
		score=0;
	    right=false;
	    left=false;
	    up=false;
	    down=true;
	    scores();
		create();
	}
}

///////////////////////////////////////////////////////////////

function scores(){
	document.getElementById("score").innerHTML=score;
}

///////////////////////////////////////////////////////////////

function createNew(){
    if(ob[count-1].d==true){
    	ob.push(new Rect(ob[count-1].x,ob[count-1].y-10,10,10,'grey',true,false,false,false));
    }
    else if(ob[count-1].u==true){
    	ob.push(new Rect(ob[count-1].x,ob[count-1].y+10,10,10,'grey',false,false,false,true));
    }
    else if(ob[count-1].l==true){
    	ob.push(new Rect(ob[count-1].x+10,ob[count-1].y,10,10,'grey',false,true,false,false));
    }
    else if(ob[count-1].r==true){
    	ob.push(new Rect(ob[count-1].x-10,ob[count-1].y,10,10,'grey',false,false,true,false));
    }
}

///////////////////////////////////////////////////////////////

function fruit(xpos,ypos,width,height,color){
	   this.x=xpos;
	   this.y=ypos;
	   this.width=width;
	   this.height=height;
	   this.color=color;
	   
	   this.draw = function(){
		   	c.fillRect(this.x,this.y,this.width,this.height);
		   	c.fillStyle=this.color;
	   }
}

///////////////////////////////////////////////////////////////

function wall(){
	   for(var i=0;i<canvas.width;i=i+10){
		   	 if(i==0 || i==canvas.width-10){
		   	 	for(var j=0;j<canvas.height;j=j+10){
			   		c.fillRect(i,j,10,10);
				    c.fillStyle='#994444';	
		   		}
		   	 }   	
		   	 else{
		   	 	c.fillRect(i,0,10,10);
			    c.fillStyle='#994444';
			    c.fillRect(i,canvas.height-10,10,10);
			    c.fillStyle='#994444';	
		   	 }	
	   }
	     
}

///////////////////////////////////////////////////////////////

function taker1(front){
	if(down){
			       	front.dy=10;
			       	front.dx=0;
			    }
			    if(up){
			    	front.dy=-10;
			    	front.dx=0;
			    }
			    if(left){
			    	front.dy=0;
			    	front.dx=-10;
			    }
			    if(right){
			    	front.dy=0;
			    	front.dx=10;
			    }
			    
}

///////////////////////////////////////////////////////////////

function take(obj){
	if(obj.d){
		obj.dy=10;
		obj.dx=0;
	}
	if(obj.u){
		obj.dy=-10;
		obj.dx=0;
	}
	if(obj.l){
		obj.dy=0;
		obj.dx=-10;
	}
	if(obj.r){
		obj.dy=0;
		obj.dx=10;
	}
}

///////////////////////////////////////////////////////////////

function taker2(front,back){
	if(front.x==back.x+10 && front.y==back.y && front.x>0){
			 back.d=false;
			 back.l=false;
		     back.r=true;
		     back.u=false;
		
	}
	else if((front.x+10==back.x && front.y==back.y && front.x<0) || (front.x+10==back.x && front.y==back.y && front.x>0)){
			 back.d=false;
			 back.l=true;
		     back.r=false;
		     back.u=false;
		
	}
	else if(front.x-10==back.x  && front.y==back.y || front.x-10==canvas.width-10 ){
		
			 back.d=false;
			 back.l=true;
		     back.r=false;
		     back.u=false;
		
	}
	else if(front.x==back.x && front.y+10==back.y){
			 back.d=false;
			 back.l=false;
		     back.r=false;
		     back.u=true;
		
	}
	else if(front.x==back.x && front.y-10==back.y){
			 back.d=true;
			 back.l=false;
		     back.r=false;
		     back.u=false;
		
	}
	
}
		
///////////////////////////////////////////////////////////////

function turnRight(){
	if(left){
		
	}
	else{
		get("right");
	}	
}

function turnLeft(){
	if(right){
		
	}
	else{
		get("left");
	}	
}

function turnUp(){
	if(down){
		
	}
	else{
		get("up");
	}	
}

function turnDown(){
	if(up){
		
	}
	else{
		get("down");
	}	
}

///////////////////////////////////////////////////////////////

function get(el){
	if(el=="left"){
		left=true;
		right=false;
		up=false;
		down=false;
	}
	else if(el=="right"){
		left=false;
		right=true;
		up=false;
		down=false;
	}
	else if(el=="up"){
		left=false;
		right=false;
		up=true;
		down=false;
	}
	else{
		left=false;
		right=false;
		up=false;
		down=true;
	}
}