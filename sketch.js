let cvs, sound, fft, peakDetect, amplitude;
let img = [];
 

//let spectrum = fft.analyze ();

let particles;
let race;
let sub1;
let euq;
let bgimg;


//race
let raceX = [256];
let raceY = [256];
let srcD = 256;

let sub2X = [256];
let sub2Y = [256];




let phase1, phase2, phase3, phase4;
let num = 100;

let bgClr = 255;
let ang = -90;
let ang2 = -90;
let spec, wave, level;

let div;


function preload () {
  sound = loadSound ('data/everything black.mp3');
  
  for (let i = 0; i < 4; i ++) {
    img [i] = loadImage ("data/img_" + nf (i, 2) + ".png")
  }    

}

function setup () {
  
  cvs = createCanvas (800, 600);
  cvs.mousePressed (toggle);
  fft = new p5.FFT (0.9,256);
  peakDetect = new p5.PeakDetect();
  amplitude = new p5.Amplitude();

//
  phase1 = 9.682698412698413;
  phase2 = 29.47641723356008;//29.234399092970522;
  phase3 = 48.50065759637188;
  phase4 = 58.82764172335601;//64.52424036281179;
  phase5 = 68.51482993197279;
  phase6 = 88.24333333333334;


  let partX = [num];
  let partY = [num];
  let partSize = [num];
  let partdirX = [num];
  let partdirY = [num];

  let inv = [-2, -1.5, -1, 1, 1.5, 2];

  for (let i = 0; i < num; i ++) {
    partX [i] = int (random (- 400, 400));
    partY [i] = int (random (- 400, 400));
    partSize [i] = int (random (1, 5));
    partdirX [i] = inv[int(random(1,6))];
    partdirY [i] = inv[int(random(1,6))];
  }
  //print (partdirX [12]);
    

  race = new Race (raceX, raceY, srcD);
  particles = new Particles (partX, partY, partSize, partdirX, partdirY);
  sub1 = new Sub1 ();
  euq = new Euq (sub2X, sub2Y);
  bgimg = new Bgimg ();
  
 
}

//draw

function draw () {
  
  //let spectrum = fft.analyze ();
  
  background (bgClr);
  sound.get;
  fft.analyze();
  peakDetect.update(fft);
  wave = fft.waveform ();
  spec = fft.analyze ();
  level = amplitude.getLevel();
  push ();
  imageMode(CENTER);
  translate (width/2, height/2);
  if (sound.currentTime () > phase2 && sound.currentTime () < phase3) {
    bgimg.display ();
    bgimg.action1 ();   
  }
  if (sound.currentTime () > phase3 && sound.currentTime () < phase3 + 3) {
    bgimg.display ();
    bgimg.action2 ();  
  }
  if (sound.currentTime () > phase5 && sound.currentTime () < phase6) {
    bgimg.display ();
    bgimg.action1 ();   
  }
  pop ();

  push ();
  translate (width/2, height/2);
  rotate (radians (ang2));

  
  if (sound.currentTime () > 0) {
    euq.action1 ();
    euq.display1 ();
  }
  if (sound.currentTime () > phase2 && sound.currentTime () < phase3) {
    euq.action2 ();
    euq.display2 ();
  }
  if (sound.currentTime () > phase3 && sound.currentTime () < phase4) {
    euq.action3 ();
    euq.display1 ();
  }
  if (sound.currentTime () > phase4 && sound.currentTime () < phase5) {
    
    euq.action4 ();
    
    euq.display1 ();
  }
  if (sound.currentTime () > phase5 && sound.currentTime () < phase6) {
    euq.action5 ();
    euq.display2 ();
  }
  if (sound.currentTime () > phase6){
    euq.action6 ();
  }
  
  
  pop ();

  push ();
  translate (width / 2, height / 2);
  rotate (radians (ang)) ;
  

  if (sound.currentTime () > 0 && sound.currentTime () < phase1) {
    
    race.action1 ();
    particles.action1 ();
  }
  if (sound.currentTime () > phase1 && sound.currentTime () < phase2) {
    
    ang += 0.155;

    sub1.action1 ();
    sub1.display ();

    race.action2 ();
    particles.action2 ();  
  }

  if (sound.currentTime () > phase2 && sound.currentTime () < phase3) {
    if (peakDetect.isDetected == true) {
      ang += 30;
    } else {
      ang += 1;
    }
    if (ang > 360){
      ang = ang - 360;
    }
    
    race.action3 ();
    particles.action3 ();    
  }

  if (sound.currentTime () > phase3 && sound.currentTime () < phase4) {
    ang += 7;
    if (ang > 360){
      ang = 360;
    }
    race.action4 ();
    particles.action4 ();
    bgClr -= 3;
    if (bgClr < 0) {
      bgClr = 0;
    }
  }

  if (sound.currentTime () > phase4 && sound.currentTime () < phase5) {
  
    
    race.action5 ();
    particles.action5 ();
    if (peakDetect.isDetected) {
      ang += 60;
      if (ang > 360){
        ang = ang - 360;
      }
    }
    if (sound.currentTime() > 64.52424036281179) {
    
    bgClr += 1.5;
      if (bgClr > 255) {
        bgClr = 255;
      }
    }
    
  }
  if (sound.currentTime () > phase5 && sound.currentTime () < phase6) {
    bgClr = 0;
    ang = 0;
    race.action6 ();
    particles.action6 ();
  }
  
  if (sound.currentTime () > phase6){
    race.action7 ();
    particles.action7 ();
    bgClr = 255;
    sound.stop ();
    

    
  }

  
  race.display ();
  
  particles.display ();

  //box (100);
  pop ();

  
  
  var crntm = sound.currentTime();
  print (ang);
  print (crntm);
  print (level);
  //print (wave.length);
  //print (spectrum);
 
}

function toggle (){
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play ();
  }
}

//race

class Race {
  constructor (raceX, raceY, srcD) {
    this.d = srcD; //spectrum.length;
    this.frq = 10;
    this.barSize = 1;
    this.barClr = 0;
    this.inClr = 0;
    this.a;
    this.angle;
    

    this.t = 0;
    this.t2 = 0;
    
  
    this.x = raceX;
    this.y = raceY;
    this.centerX = 0;
    this.centerY = 0;
  
    this.r = 0;
  }
  
  display () { 
    
    this.angle = radians(360/this.d);
    
    for (let i = 0; i < this.d; i++){   
      this.x[i] = cos(this.angle*i) * this.r;    
      this.y[i] = sin(this.angle*i) * this.r;
    }
    stroke (this.barClr, this.t);
    strokeWeight (this.barSize);
    noFill ();
    
    beginShape(); 

    for (let i = 0; i < this.d; i++) {    
    curveVertex( this.x[i] + this.centerX + cos(this.angle * i) * map(wave[i], -1, 1, -this.frq, this.frq), this.y[i] + this.centerY + sin(this.angle * i)  *  map(wave[i], -1, 1, -this.frq, this.frq));    
    }

    endShape(CLOSE);
    
    if (peakDetect.isDetected) {
      print ('yes');
    } else {
      print ('no');
    }
  }
    
  action1 () {
      this.t1 = 0;

      this.frq = 10;
      this.t += 0.5;
      this.r = this.r + 5;
      if (this.r > 150) {
        this.r = 150;
      }
      if (this.t > 255) {
        this.t = 255;
      }
 
  }

  action2 () {
    this.frq = 20;
  }

  action3 () {
  
    this.frq = 30;
    if (peakDetect.isDetected) {   
      this.barSize = 3;
    } else {
      this.barSize = 2;
    } 
    
  }
  action4 () {
    this.barSize *= 0.7;
    if (this.barSize < 1) {
      this.barSize = 1;
    }

    if (peakDetect.isDetected) {
      this.barSize = 1;
    }
         
    this.frq = 10;
    this.r -= 5;
    if (this.r < 100) {
      this.r = 100;
    }
    this.barClr += 2;
    if (this.barClr > 255) {
      this.barClr = 255;
    }
  }
  
  action5 () {
    if (peakDetect.isDetected) {
      this.r -= 3;  
    } else {
      this.r -= 0.1;
      if (this.r < 0) {
        this.r = 0;
      }
    }
  }

  action6 () {
    this.frq = 30;
    this.r = 200;
    this.t = 255;
    this.barClr = 255;
  }

  action7 () {
    this.r = 0;
    this.t = 0;
    this.barClr = 0;
  }
  
}

//particles



class Particles {
  constructor (partX, partY, partSize, partdirX, partdirY, partInv) {
    this.t = 0;
    this.a = 1;
    this.b = 1;
    this.partClr = 0;
    this.inv = partInv;

    this.x = partX;
    this.y = partY;
    this.size = partSize;
    this.dirX = partdirX;
    this.dirY = partdirY;
  }

  

  display () {
    
    fill (this.partClr, this.t);
    noStroke ();
    for (let i = 0; i < num; i ++) { 
    
      ellipse (this.x [i], this.y [i], this.b * this.size [i], this.b * this.size [i]);
      
      this.x [i] += this.a * this.dirX [i];
      this.y [i] += this.a * this.dirY [i];

      if (this.x [i] < - width / 2 || this.x [i] > width / 2) {
        this.dirX [i] = - this.dirX [i];
      }
      if (this.y [i] < - height / 2 || this.y [i] > height / 2) {
        this.dirY [i] = - this.dirY [i];
      }
    }

    
    
  }


  
  action1 () {
      this.t += 0.5;
      if (this.t > 255) {
        this.t = 255;
      }
      
  }


  
  
  action2 () {
    
      this.a = 0.3;
      if (peakDetect.isDetected) {
        this.b = 1.5;
      } else {
        this.b = 1.0;
      }
  }

  action3 () {
    
      this.b = 1.5;
      
      if (peakDetect.isDetected == true) {    
        this.a = 20.0;
      } else {      
        this.a = 1.0;
      }
      
  }

  
  action4 () {
    this.a = 0.2;
      this.b = 0.7;
      this.partClr += 3;
      
      if (this.partClr > 255) {
        this.partClr = 255;
      }
  }

  action5 () {

    if (peakDetect.isDetected) {
      this.b = this.b * 0.9;
    
      this.t -= 10;
      if (this.t < 0) {
        this.t = 0;
      }   
    } 
  }
  
  action6 () {
    this.t = 255;
    this.b = 1.0;
    this.partClr = 255;
    if (peakDetect.isDetected == true) {    
      this.a = 20.0;
    } else {      
      this.a = 2.0;
    }
  }

  action7 () {
    this.partClr = 0;
    this.t = 0;
    this.b = 1.0;
    this.a = 1.0;
  }
  
}

//sub1

class Sub1 {
  constructor () {


  this.sideSize = 0.5;
  this.sideClr = 0;
  this.inClr = 0;
  this.r1 = 0;
  this.r2 = 0;
  
  this.t = 255;

  }
  
  display () {
    noStroke ();
    fill (this.inClr, this.t);
    ellipse (180, 0, this.r1, this.r1);
    ellipse (-180, 0, this.r2, this.r2);    
  }


  action1() {
    this.r1 += 5;
    if (this.r1 > 120) {
      this.r1 = map (level, 0, 1, 115, 125);
    }
    this.r2 += 5;
    if (this.r2 > 120) {
    this.r2 = map (level, 0, 1, 115, 125);
    }

    if (sound.currentTime () > 28.834399092970522) {
      this.r1 -= 10;
    if (this.r1 < 0) {
      this.r1 = 0;
    }

    this.r2 -= 10;
    if (this.r2 < 0) {
      this.r2 = 0;
    }
    }
  }


}


//euq

class Euq {
  constructor (sub2X, sub2Y) {
  this.d = 256;
  this.x = sub2X;
  this.y = sub2Y;
  this.centerX = 0;
  this.centerY = 0;
  this.sideSize = 0.5;
  this.sideClr = 0;
  this.inClr = 0;
  this.r = 600;
  this.angle;
  this.t = 0;
  this.frq = 1;
  this.frq2 = 0.7;
  }
  
  display1 () {
    strokeWeight (this.sideSize);
    stroke (this.sideClr, this.t);
    noFill ();

    this.angle = radians(360/(this.d-30));
    
    for (let i = 0; i < this.d-30; i++){   
      this.x[i] = cos(this.angle*i) * this.r/2;    
      this.y[i] = sin(this.angle*i) * this.r/2;
    }

    
    for (let i = 0; i < this.d-30; i++) {    
    line(this.x[i], this.y[i], this.x[i] * map(spec[i], 0, 255, this.frq, this.frq2), this.y[i] *  map(spec[i], 0, 255, this.frq, this.frq2));    
    }

  }

  display2 () {
    strokeWeight (this.sideSize);
    stroke (this.sideClr, this.t);
    noFill ();

    this.angle = radians(360/(this.d-30));
    
    for (let i = 0; i < this.d-30; i++){   
      this.x[i] = cos(this.angle*i) * this.r/2;    
      this.y[i] = sin(this.angle*i) * this.r/2;
    }

    
    for (let i = 0; i < this.d-30; i++) {    
    line(this.x[i], this.y[i], this.x[i] * map(wave[i], -1, 1, 1, 1.5), this.y[i] *  map(wave[i], -1, 1, 1, 1.5));    
    }

  }

  action1 () {
    this.t += 0.5;
    if (this.t > 255) {
      this.t = 255;
    }
  }

  action2 () {
    this.r = 460;
    this.sideSize = 1;
    if (this.r == 460) {
      this.frq = 1;
      this.frq2 = 1.3; 
    }
  }

  action3 () {
    this.sideSize *= 0.7;
    if (this.sideSize < 0.5) {
      this.sideSize = 0.5;
    }
    this.r -= 10;
    if (this.r < 300) {
      this.r = 300;
    }
    this.sideClr += 3;
    if (this.sideClr > 255) {
      this.sideClr > 255;
    }
    if (sound.currentTime () > 48.857868480725624) {
      this.frq = 1;
      this.frq2 = 1.5;   
    }
  }
  action4 () {
    if (peakDetect.isDetected) {
      this.r += 30;
    } else {
      this.r += 0.3;
    }
  }

  action5 () {
    this.r = 600;
    this.sideSize = 1;
    this.frq = 1;
    this.frq2 = 1.3; 
  }

  action6 () {
    this.t = 0;
    this.r = 600;
    this.sideClr = 0;
    this.sideSize = 0.5;
    this.frq = 1;
    this.frq2 = 0.7;
  }

}

class Bgimg {
  constructor () {


  this.x = 0;
  this.y = 0;
  this.a = 800;
  this.b = 600;

  this.num = 0;
  this.t = 50;

  }

  display () {
    tint(255, this.t);
    image (img [this.num], this.x, this.y, this.a, this.b);
    
  }

  action1 () {
    if (peakDetect.isDetected) {
      this.num += 1;
      if (this.num > 3) {
        this.num = 0;
      }
    }
  }
  action2 () {
    this.t -= 1;
    if (this.t < 0) {
      this.t = 0;
    }
  }
  action3 () {
    this.num = 0;
    this.t = 50;
  }
}
